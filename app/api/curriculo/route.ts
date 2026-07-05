import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_AREAS = ["atendimento", "vendas", "estoque", "logistica", "administrativo"];
const ALLOWED_SHIFTS = ["manha", "tarde", "integral", "fins-de-semana"];
const PDF_MAGIC = Buffer.from("%PDF");
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

// In-memory per-instance limiter: fine for a single container, resets on redeploy/restart.
const submissionTimestampsByIp = new Map<string, number[]>();
const SWEEP_EVERY_N_REQUESTS = 200;
let requestsSinceSweep = 0;

// The map only grows as new IPs show up, so without this it would retain one
// entry per distinct visitor forever. Sweep periodically instead of on every
// request to keep the common case cheap.
function sweepStaleIps(now: number) {
  for (const [ip, timestamps] of submissionTimestampsByIp) {
    if (timestamps.every((timestamp) => now - timestamp >= RATE_LIMIT_WINDOW_MS)) {
      submissionTimestampsByIp.delete(ip);
    }
  }
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  requestsSinceSweep += 1;
  if (requestsSinceSweep >= SWEEP_EVERY_N_REQUESTS) {
    requestsSinceSweep = 0;
    sweepStaleIps(now);
  }

  const recent = (submissionTimestampsByIp.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );
  recent.push(now);
  submissionTimestampsByIp.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX_REQUESTS;
}

function getClientIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  if (isRateLimited(getClientIp(request))) {
    return errorResponse("Muitas tentativas. Aguarde alguns minutos e tente novamente.", 429);
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.CAREER_NOTIFICATION_EMAIL;
  const fromEmail = process.env.CAREER_FROM_EMAIL;

  if (!resendApiKey || !notifyEmail || !fromEmail) {
    console.error("Missing RESEND_API_KEY, CAREER_NOTIFICATION_EMAIL or CAREER_FROM_EMAIL env vars");
    return errorResponse("Serviço de envio indisponível no momento. Tente pelo WhatsApp.", 503);
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return errorResponse("Não foi possível ler os dados enviados.", 400);
  }

  // Honeypot: real users never fill a field hidden via CSS.
  if (String(formData.get("website") ?? "").length > 0) {
    return NextResponse.json({ ok: true });
  }

  const nome = String(formData.get("nome") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const telefone = String(formData.get("telefone") ?? "").trim();
  const area = String(formData.get("area") ?? "").trim();
  const disponibilidade = String(formData.get("disponibilidade") ?? "").trim();
  const curriculo = formData.get("curriculo");

  if (!nome || !email || !telefone || !area || !disponibilidade) {
    return errorResponse("Preencha todos os campos obrigatórios.", 400);
  }

  if (!EMAIL_PATTERN.test(email)) {
    return errorResponse("Informe um e-mail válido.", 400);
  }

  if (!ALLOWED_AREAS.includes(area) || !ALLOWED_SHIFTS.includes(disponibilidade)) {
    return errorResponse("Selecione opções válidas de área e disponibilidade.", 400);
  }

  if (!(curriculo instanceof File)) {
    return errorResponse("Anexe o currículo em PDF.", 400);
  }

  if (curriculo.type !== "application/pdf") {
    return errorResponse("O currículo deve ser um arquivo PDF.", 400);
  }

  if (curriculo.size > MAX_FILE_SIZE) {
    return errorResponse("O arquivo deve ter no máximo 5 MB.", 400);
  }

  const buffer = Buffer.from(await curriculo.arrayBuffer());

  if (!buffer.subarray(0, 4).equals(PDF_MAGIC)) {
    return errorResponse("O arquivo enviado não é um PDF válido.", 400);
  }

  const resend = new Resend(resendApiKey);

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: notifyEmail,
      replyTo: email,
      subject: `Nova candidatura: ${nome} (${area})`,
      text: [
        "Nova candidatura recebida pelo site.",
        "",
        `Nome: ${nome}`,
        `E-mail: ${email}`,
        `Telefone: ${telefone}`,
        `Área de interesse: ${area}`,
        `Disponibilidade: ${disponibilidade}`,
      ].join("\n"),
      attachments: [
        {
          filename: curriculo.name || "curriculo.pdf",
          content: buffer,
        },
      ],
    });

    if (error) {
      console.error("Resend error", error);
      return errorResponse("Falha ao enviar. Tente novamente ou use o WhatsApp.", 502);
    }
  } catch (err) {
    console.error("Curriculo submission failed", err);
    return errorResponse("Falha ao enviar. Tente novamente ou use o WhatsApp.", 500);
  }

  return NextResponse.json({ ok: true });
}
