"use client";

import { type DragEvent, type FormEvent, useRef, useState } from "react";

const careerWhatsappBase = "https://wa.me/5592981386162";

export default function CurriculoUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState("Preencha seus dados e anexe o currículo em PDF.");
  const [messageType, setMessageType] = useState<"info" | "success" | "error">("info");
  const [whatsappHref, setWhatsappHref] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function validateFile(file?: File) {
    if (!file) {
      return;
    }

    if (file.type !== "application/pdf") {
      setFileName("");
      setWhatsappHref("");
      setMessage("Envie apenas arquivos em PDF.");
      setMessageType("error");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFileName("");
      setWhatsappHref("");
      setMessage("O arquivo deve ter no máximo 5 MB.");
      setMessageType("error");
      return;
    }

    setFileName(file.name);
    setWhatsappHref("");
    setMessage("Currículo selecionado com sucesso.");
    setMessageType("success");
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    validateFile(event.dataTransfer.files[0]);
  }

  function buildWhatsappFallbackHref(formData: FormData) {
    const text = [
      "Olá, vim pelo site e quero enviar meu currículo para a 4 Irmãos.",
      `Nome: ${String(formData.get("nome") || "")}`,
      `E-mail: ${String(formData.get("email") || "")}`,
      `Telefone: ${String(formData.get("telefone") || "")}`,
      `Área de interesse: ${String(formData.get("area") || "")}`,
      `Disponibilidade: ${String(formData.get("disponibilidade") || "")}`,
      `Arquivo selecionado: ${fileName}`,
      "Vou anexar o PDF nesta conversa.",
    ].join("\n");

    return `${careerWhatsappBase}?text=${encodeURIComponent(text)}`;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!fileName) {
      setWhatsappHref("");
      setMessage("Selecione um currículo em PDF antes de enviar.");
      setMessageType("error");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);
    setMessage("Enviando candidatura...");
    setMessageType("info");

    try {
      const response = await fetch("/api/curriculo", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        setWhatsappHref(buildWhatsappFallbackHref(formData));
        setMessage(body?.error || "Não foi possível enviar agora. Continue pelo WhatsApp.");
        setMessageType("error");
        return;
      }

      form.reset();
      setFileName("");
      setWhatsappHref("");
      setMessage("Candidatura enviada com sucesso! Em breve entraremos em contato.");
      setMessageType("success");
    } catch {
      setWhatsappHref(buildWhatsappFallbackHref(formData));
      setMessage("Falha de conexão. Continue pelo WhatsApp para não perder sua candidatura.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="form-modern space-y-6" onSubmit={handleSubmit}>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        aria-hidden="true"
      />
      <div>
        <label htmlFor="nome" className="mb-2 block text-sm font-medium">
          Nome completo
        </label>
        <input
          type="text"
          id="nome"
          name="nome"
          className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition-colors focus:border-gold"
          placeholder="Seu nome completo"
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition-colors focus:border-gold"
            placeholder="seu@email.com"
            required
          />
        </div>
        <div>
          <label htmlFor="telefone" className="mb-2 block text-sm font-medium">
            Telefone / WhatsApp
          </label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition-colors focus:border-gold"
            placeholder="(92) 99999-9999"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="area" className="mb-2 block text-sm font-medium">
            Área de interesse
          </label>
          <select
            id="area"
            name="area"
            className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition-colors focus:border-gold"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Selecione uma área
            </option>
            <option value="atendimento">Atendimento</option>
            <option value="vendas">Vendas</option>
            <option value="estoque">Estoque</option>
            <option value="logistica">Logística</option>
            <option value="administrativo">Administrativo</option>
          </select>
        </div>
        <div>
          <label htmlFor="disponibilidade" className="mb-2 block text-sm font-medium">
            Disponibilidade
          </label>
          <select
            id="disponibilidade"
            name="disponibilidade"
            className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition-colors focus:border-gold"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Selecione um turno
            </option>
            <option value="manha">Manhã</option>
            <option value="tarde">Tarde</option>
            <option value="integral">Integral</option>
            <option value="fins-de-semana">Fins de semana</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="curriculo" className="mb-2 block text-sm font-medium">
          Currículo (PDF)
        </label>
        <div
          role="button"
          tabIndex={0}
          className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
            isDragging
              ? "border-gold bg-gold/10"
              : "border-gray-600 hover:border-gold"
          }`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              fileInputRef.current?.click();
            }
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            id="curriculo"
            name="curriculo"
            className="sr-only"
            accept="application/pdf,.pdf"
            onChange={(event) => validateFile(event.target.files?.[0])}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto mb-3 h-10 w-10 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 16V4m0 0 4 4m-4-4-4 4M4 16.5V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1.5"
            />
          </svg>
          <p className="text-sm text-gray-300">
            {fileName || "Arraste e solte seu currículo aqui"}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            ou clique para selecionar um PDF de até 5 MB
          </p>
        </div>
        {message ? (
          <p
            id="curriculo-status"
            className={`mt-3 text-sm ${
              messageType === "success"
                ? "text-emerald-300"
                : messageType === "error"
                  ? "text-red-300"
                  : "text-gray-300"
            }`}
            aria-live="polite"
          >
            {message}
          </p>
        ) : null}
      </div>

      <label className="flex items-start gap-3 text-sm text-gray-300">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-gray-600 bg-gray-950 accent-gold"
          required
        />
        <span>
          Autorizo o contato da equipe 4 Irmãos para processos seletivos e confirmo que os dados enviados são verdadeiros.
        </span>
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="cta-primary w-full rounded-lg bg-gold px-6 py-4 font-bold text-black shadow-lg transition-colors hover:bg-gold-dark disabled:cursor-not-allowed disabled:opacity-60"
        aria-describedby="curriculo-status"
      >
        {isSubmitting ? "Enviando..." : "Enviar candidatura"}
      </button>

      {whatsappHref ? (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-secondary block w-full rounded-lg border border-gold px-6 py-3 text-center font-semibold text-gold transition-colors hover:bg-gold/10"
        >
          Continuar no WhatsApp
        </a>
      ) : null}
    </form>
  );
}
