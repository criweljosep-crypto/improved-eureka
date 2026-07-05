export const phone = "(92) 98138-6162";
export const whatsappUrl =
  "https://wa.me/5592981386162?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20quero%20consultar%20materiais.";

export const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "Produtos", href: "#produtos" },
  { label: "Lojas", href: "#lojas" },
  { label: "História", href: "#nossa-historia" },
  { label: "Trabalhe conosco", href: "#trabalhe-conosco" },
];

export const stats = [
  { value: "1998", label: "operação registrada" },
  { value: "4", label: "lojas em Manaus" },
  { value: "7h", label: "abertura das lojas" },
];

export const categories = [
  {
    title: "Construção",
    text: "Materiais para obra, reforma e manutenção, com atendimento direto para compra rápida.",
  },
  {
    title: "Elétrica e hidráulica",
    text: "Cabos, tomadas, conduítes, tubos, conexões e acessórios para instalações.",
  },
  {
    title: "Ferragens e parafusos",
    text: "Pregos, parafusos, dobradiças, arames, vergalhões e itens para estrutura.",
  },
  {
    title: "Acabamento",
    text: "Tintas, ferramentas, pisos, revestimentos, portas e janelas para finalizar melhor.",
  },
];

export const benefits = [
  "Televendas pelo WhatsApp para consultar produtos antes de ir à loja.",
  "Quatro unidades em Manaus para atender obra, reforma e manutenção.",
  "Horário amplo: segunda a sexta das 7h às 17h e sábado das 7h às 14h.",
  "Mix com construção, elétrica, hidráulica, ferragens, ferramentas e acabamento.",
];

export const timeline = [
  {
    year: "1998",
    title: "Início da operação",
    text: "A Carvalho da Silva & Cia Ltda aparece em registros públicos usando o nome fantasia 4 Irmãos Materiais de Construção e Ferragens.",
    imageLabel: "Origem",
  },
  {
    year: "2024",
    title: "Expansão em Manaus",
    text: "A marca divulga uma nova filial no Novo Aleixo e reforça a presença com quatro lojas na cidade.",
    imageLabel: "Nova filial",
  },
  {
    year: "Hoje",
    title: "Atendimento multicanal",
    text: "A operação combina lojas físicas, televendas e WhatsApp para facilitar consultas de materiais, ofertas e retirada.",
    imageLabel: "WhatsApp e loja",
  },
];

export const stores = [
  {
    name: "Loja Novo Aleixo - Mutirão",
    address: "Rua Neuma Boh, 1 - Novo Aleixo, Manaus-AM",
    hours: "Seg-Sex: 7h-17h | Sáb: 7h-14h",
    phone,
  },
  {
    name: "Loja São José",
    address: "Rua Soldado Brito, 98 - São José, Manaus-AM",
    hours: "Seg-Sex: 7h-17h | Sáb: 7h-14h",
    phone,
  },
  {
    name: "Loja Rua Cartola",
    address: "Rua Cartola, 109 - Novo Aleixo, Manaus-AM",
    hours: "Seg-Sex: 7h-17h | Sáb: 7h-14h",
    phone,
  },
  {
    name: "Loja Coronel Sávio Belota",
    address: "Av. Coronel Sávio Belota, 144 - Novo Aleixo, Manaus-AM",
    hours: "Seg-Sex: 7h-17h | Sáb: 7h-14h",
    phone,
  },
];

const storePhoneE164 = "+55 92 98138-6162";
const instagramUrl = "https://www.instagram.com/4irmaosconstrucao/";

function parseStoreAddress(address: string) {
  const [streetPart, localePart] = address.split(" - ");
  const [bairro, cityState] = (localePart ?? "").split(", ");
  const [city, region] = (cityState ?? "").split("-");

  return {
    streetAddress: bairro ? `${streetPart} - ${bairro}` : streetPart,
    addressLocality: city ?? "Manaus",
    addressRegion: region ?? "AM",
  };
}

export const structuredData = {
  "@context": "https://schema.org",
  "@graph": stores.map((store) => ({
    "@type": "HardwareStore",
    name: `4 Irmãos Materiais de Construção e Ferragens - ${store.name}`,
    alternateName: "4 Irmãos Construção",
    telephone: storePhoneE164,
    address: {
      "@type": "PostalAddress",
      ...parseStoreAddress(store.address),
      addressCountry: "BR",
    },
    openingHours: ["Mo-Fr 07:00-17:00", "Sa 07:00-14:00"],
    sameAs: [instagramUrl],
  })),
};
