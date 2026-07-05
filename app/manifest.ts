import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "4 Irmãos Materiais de Construção e Ferragens",
    short_name: "4 Irmãos",
    description:
      "4 Irmãos Materiais de Construção e Ferragens em Manaus. Construção, elétrica, hidráulica, ferragens, ferramentas e acabamento.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    lang: "pt-BR",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
