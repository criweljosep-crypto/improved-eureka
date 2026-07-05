import { ImageResponse } from "next/og";

export const alt = "4 Irmãos Materiais de Construção e Ferragens";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          backgroundImage:
            "radial-gradient(circle at 25% 20%, rgba(212,175,55,0.25), transparent 45%), radial-gradient(circle at 80% 80%, rgba(212,175,55,0.18), transparent 45%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 140,
            height: 140,
            borderRadius: 9999,
            background: "#d4af37",
            color: "#000000",
            fontSize: 84,
            fontWeight: 700,
            marginBottom: 36,
          }}
        >
          4
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: -1,
          }}
        >
          4 IRMÃOS
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 32,
            color: "#d4af37",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 4,
          }}
        >
          Materiais de Construção e Ferragens
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 28,
            color: "#d1d5db",
          }}
        >
          4 lojas em Manaus · Televendas no WhatsApp
        </div>
      </div>
    ),
    { ...size }
  );
}
