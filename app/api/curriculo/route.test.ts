import { beforeEach, describe, expect, it, vi } from "vitest";

const sendMock = vi.fn();

vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(function Resend() {
    return { emails: { send: sendMock } };
  }),
}));

const { POST } = await import("./route");

const VALID_ENV = {
  RESEND_API_KEY: "re_test_key",
  CAREER_NOTIFICATION_EMAIL: "financeiro@m4irmaos.com",
  CAREER_FROM_EMAIL: "onboarding@resend.dev",
};

function pdfFile(bytes = "%PDF-1.4 fake content") {
  return new File([Buffer.from(bytes)], "curriculo.pdf", { type: "application/pdf" });
}

function buildFormData(overrides: Record<string, string | File> = {}) {
  const formData = new FormData();
  const defaults: Record<string, string | File> = {
    nome: "Maria Silva",
    email: "maria@example.com",
    telefone: "92999999999",
    area: "vendas",
    disponibilidade: "integral",
    curriculo: pdfFile(),
  };

  for (const [key, value] of Object.entries({ ...defaults, ...overrides })) {
    formData.set(key, value);
  }

  return formData;
}

function postRequest(formData: FormData, ip = "203.0.113.1") {
  return new Request("http://localhost/api/curriculo", {
    method: "POST",
    headers: { "x-forwarded-for": ip },
    body: formData,
  });
}

let ipCounter = 0;
function uniqueIp() {
  ipCounter += 1;
  return `203.0.113.${ipCounter}`;
}

describe("POST /api/curriculo", () => {
  beforeEach(() => {
    sendMock.mockReset();
    sendMock.mockResolvedValue({ data: { id: "email_123" }, error: null });
    vi.unstubAllEnvs();
  });

  it("returns 503 when Resend is not configured", async () => {
    const response = await POST(postRequest(buildFormData(), uniqueIp()));
    expect(response.status).toBe(503);
  });

  it("returns 400 when required fields are missing", async () => {
    vi.stubEnv("RESEND_API_KEY", VALID_ENV.RESEND_API_KEY);
    vi.stubEnv("CAREER_NOTIFICATION_EMAIL", VALID_ENV.CAREER_NOTIFICATION_EMAIL);
    vi.stubEnv("CAREER_FROM_EMAIL", VALID_ENV.CAREER_FROM_EMAIL);

    const formData = buildFormData({ nome: "" });
    const response = await POST(postRequest(formData, uniqueIp()));

    expect(response.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("returns 400 for an invalid email address", async () => {
    vi.stubEnv("RESEND_API_KEY", VALID_ENV.RESEND_API_KEY);
    vi.stubEnv("CAREER_NOTIFICATION_EMAIL", VALID_ENV.CAREER_NOTIFICATION_EMAIL);
    vi.stubEnv("CAREER_FROM_EMAIL", VALID_ENV.CAREER_FROM_EMAIL);

    const formData = buildFormData({ email: "not-an-email" });
    const response = await POST(postRequest(formData, uniqueIp()));

    expect(response.status).toBe(400);
  });

  it("returns 400 for an unlisted area or shift", async () => {
    vi.stubEnv("RESEND_API_KEY", VALID_ENV.RESEND_API_KEY);
    vi.stubEnv("CAREER_NOTIFICATION_EMAIL", VALID_ENV.CAREER_NOTIFICATION_EMAIL);
    vi.stubEnv("CAREER_FROM_EMAIL", VALID_ENV.CAREER_FROM_EMAIL);

    const formData = buildFormData({ area: "diretoria" });
    const response = await POST(postRequest(formData, uniqueIp()));

    expect(response.status).toBe(400);
  });

  it("returns 400 when the file is not a PDF mimetype", async () => {
    vi.stubEnv("RESEND_API_KEY", VALID_ENV.RESEND_API_KEY);
    vi.stubEnv("CAREER_NOTIFICATION_EMAIL", VALID_ENV.CAREER_NOTIFICATION_EMAIL);
    vi.stubEnv("CAREER_FROM_EMAIL", VALID_ENV.CAREER_FROM_EMAIL);

    const fakeImage = new File([Buffer.from("not a pdf")], "curriculo.png", { type: "image/png" });
    const formData = buildFormData({ curriculo: fakeImage });
    const response = await POST(postRequest(formData, uniqueIp()));

    expect(response.status).toBe(400);
  });

  it("returns 400 when the file has a spoofed PDF mimetype but bad content", async () => {
    vi.stubEnv("RESEND_API_KEY", VALID_ENV.RESEND_API_KEY);
    vi.stubEnv("CAREER_NOTIFICATION_EMAIL", VALID_ENV.CAREER_NOTIFICATION_EMAIL);
    vi.stubEnv("CAREER_FROM_EMAIL", VALID_ENV.CAREER_FROM_EMAIL);

    const spoofed = new File([Buffer.from("not really a pdf")], "curriculo.pdf", {
      type: "application/pdf",
    });
    const formData = buildFormData({ curriculo: spoofed });
    const response = await POST(postRequest(formData, uniqueIp()));

    expect(response.status).toBe(400);
  });

  it("sends the email and returns 200 for a valid submission", async () => {
    vi.stubEnv("RESEND_API_KEY", VALID_ENV.RESEND_API_KEY);
    vi.stubEnv("CAREER_NOTIFICATION_EMAIL", VALID_ENV.CAREER_NOTIFICATION_EMAIL);
    vi.stubEnv("CAREER_FROM_EMAIL", VALID_ENV.CAREER_FROM_EMAIL);

    const response = await POST(postRequest(buildFormData(), uniqueIp()));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ ok: true });
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock.mock.calls[0][0]).toMatchObject({
      to: VALID_ENV.CAREER_NOTIFICATION_EMAIL,
      from: VALID_ENV.CAREER_FROM_EMAIL,
      replyTo: "maria@example.com",
    });
  });

  it("silently accepts (without emailing) when the honeypot field is filled", async () => {
    vi.stubEnv("RESEND_API_KEY", VALID_ENV.RESEND_API_KEY);
    vi.stubEnv("CAREER_NOTIFICATION_EMAIL", VALID_ENV.CAREER_NOTIFICATION_EMAIL);
    vi.stubEnv("CAREER_FROM_EMAIL", VALID_ENV.CAREER_FROM_EMAIL);

    const formData = buildFormData({ website: "http://spambot.example" });
    const response = await POST(postRequest(formData, uniqueIp()));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ ok: true });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rate limits after 5 requests from the same IP within the window", async () => {
    const ip = uniqueIp();

    const statuses: number[] = [];
    for (let i = 0; i < 6; i += 1) {
      const response = await POST(postRequest(buildFormData(), ip));
      statuses.push(response.status);
    }

    expect(statuses.slice(0, 5)).toEqual([503, 503, 503, 503, 503]);
    expect(statuses[5]).toBe(429);
  });
});
