import Link from "next/link";
import AnimatedStat from "./animated-stat";
import CurriculoUpload from "./curriculo-upload";
import ScrollReveal from "./scroll-reveal";
import SiteHeader from "./site-header";

const phone = "(92) 98138-6162";
const whatsappUrl =
  "https://wa.me/5592981386162?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20quero%20consultar%20materiais.";

const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "Produtos", href: "#produtos" },
  { label: "Lojas", href: "#lojas" },
  { label: "História", href: "#nossa-historia" },
  { label: "Trabalhe conosco", href: "#trabalhe-conosco" },
];

const stats = [
  { value: "1998", label: "operação registrada" },
  { value: "4", label: "lojas em Manaus" },
  { value: "7h", label: "abertura das lojas" },
];

const categories = [
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

const benefits = [
  "Televendas pelo WhatsApp para consultar produtos antes de ir à loja.",
  "Quatro unidades em Manaus para atender obra, reforma e manutenção.",
  "Horário amplo: segunda a sexta das 7h às 17h e sábado das 7h às 14h.",
  "Mix com construção, elétrica, hidráulica, ferragens, ferramentas e acabamento.",
];

const timeline = [
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

const stores = [
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

const structuredData = {
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

function PinIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 21s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10.5h.01" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="mr-1 h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-black"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m21 8-9-5-9 5 9 5 9-5ZM3 8v8l9 5 9-5V8M12 13v8"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-7 w-7 text-white"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2a9.91 9.91 0 0 0-8.43 15.14L2.4 21.6l4.56-1.2A9.91 9.91 0 1 0 12.04 2Zm0 1.99a7.93 7.93 0 0 1 6.72 12.14 7.93 7.93 0 0 1-10.5 2.47l-.33-.2-2.7.71.72-2.63-.22-.34A7.93 7.93 0 0 1 12.04 3.99Zm-3.4 3.83c-.17 0-.43.06-.65.31-.22.25-.86.84-.86 2.05 0 1.2.88 2.37 1 2.54.12.16 1.7 2.72 4.2 3.7 2.08.82 2.5.66 2.95.62.45-.04 1.45-.6 1.65-1.17.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.47-.29-.25-.12-1.45-.72-1.68-.8-.22-.08-.39-.12-.55.13-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.1-.5.11-.1.25-.28.37-.42.12-.14.16-.24.25-.41.08-.16.04-.31-.02-.43-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.46Z" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main id="inicio" className="min-h-screen overflow-x-hidden bg-black text-white">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <div className="page-intro" aria-hidden="true">
        <div className="page-intro-card">
          <span className="page-intro-mark">4</span>
          <span className="page-intro-name">4 IRMÃOS</span>
          <span className="page-intro-line" />
        </div>
      </div>
      <SiteHeader navItems={navItems} />

      <section id="conteudo" className="hero-section site-grid-bg relative overflow-hidden border-b border-gray-900">
        <div className="brushed-steel absolute inset-0" />
        <div className="hero-dim absolute inset-0" />
        <div className="floating-hero-bg" aria-hidden="true">
          <span className="blueprint-ring ring-one" />
          <span className="blueprint-ring ring-two" />
          <span className="float-panel panel-one" />
          <span className="float-panel panel-two" />
          <span className="float-panel panel-three" />
          <span className="float-line line-one" />
          <span className="float-line line-two" />
          <span className="float-spark spark-one" />
          <span className="float-spark spark-two" />
          <span className="float-spark spark-three" />
        </div>
        <div className="relative z-10 mx-auto grid min-h-[88vh] max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div className="hero-copy max-w-3xl">
            <p className="eyebrow mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-gold">
              Materiais de construção e ferragens
            </p>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-6xl">
              Tudo para sua obra, reforma e manutenção em Manaus
            </h1>
            <p className="mb-8 max-w-2xl text-base leading-7 text-gray-200 md:text-lg">
              4 Irmãos reúne construção, elétrica, hidráulica, ferragens,
              ferramentas e acabamento com 4 lojas em Manaus e televendas pelo WhatsApp.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-primary rounded-lg bg-gold px-8 py-4 text-center font-semibold text-black shadow-lg transition-colors hover:bg-gold-dark"
              >
                Pedir pelo WhatsApp
              </a>
              <Link
                href="#lojas"
                className="cta-secondary rounded-lg border-2 border-gold px-8 py-4 text-center font-semibold text-gold transition-colors hover:bg-gold/10"
              >
                Encontrar loja
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-wide text-gray-300">
              <span className="hero-chip">Televendas</span>
              <span className="hero-chip">4 lojas</span>
              <span className="hero-chip">Retirada em loja</span>
            </div>
            <div className="scroll-cue mt-10 hidden items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-gray-400 md:flex">
              <span />
              Role para explorar
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="shelf-visual" aria-label="Prateleiras de materiais de construção">
              <div className="shelf-row">
                <span className="bag tall" />
                <span className="box wide" />
                <span className="pipe" />
              </div>
              <div className="shelf-row">
                <span className="paint" />
                <span className="bag" />
                <span className="box" />
                <span className="pipe short" />
              </div>
              <div className="shelf-row">
                <span className="box wide" />
                <span className="paint dark" />
                <span className="bag" />
              </div>
            </div>
          </div>
        </div>

        <div className="stats-strip relative mx-auto grid max-w-7xl grid-cols-1 border-t border-gray-800 px-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="border-gray-800 py-5 sm:border-r sm:last:border-r-0">
              <AnimatedStat value={stat.value} />
              <p className="mt-1 text-sm text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="produtos" className="section-band py-20">
        <ScrollReveal>
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="eyebrow mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-gold">
                  Linha de produtos
                </p>
                <h2 className="text-3xl font-bold">Categorias para cada etapa da obra</h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-gray-400">
                Consulte disponibilidade, ofertas e retirada pelo WhatsApp {phone}.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => (
                <article
                  key={category.title}
                  className="modern-card rounded-lg border border-gray-800 bg-gray-950 p-6 transition-colors hover:border-gold"
                >
                  <span className="icon-tile mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-gold">
                    <BoxIcon />
                  </span>
                  <h3 className="mb-3 text-lg font-semibold">{category.title}</h3>
                  <p className="text-sm leading-6 text-gray-400">{category.text}</p>
                </article>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="section-band bg-gray-950 py-20">
        <ScrollReveal>
          <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-gold">
                Diferenciais
              </p>
              <h2 className="text-3xl font-bold">Mais canais, mais agilidade para comprar</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {benefits.map((benefit) => (
                <div key={benefit} className="benefit-card flex gap-3 rounded-lg border border-gray-800 bg-black p-5">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-gold" />
                  <p className="text-sm leading-6 text-gray-300">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section id="lojas" className="section-band py-20">
        <ScrollReveal>
          <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="eyebrow mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-gold">
                Atendimento local
              </p>
              <h2 className="text-3xl font-bold">4 lojas em Manaus</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-gray-400">
              Horário divulgado: segunda a sexta das 7h às 17h e sábado das 7h às 14h.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {stores.map((store) => (
              <article
                key={store.name}
                className="store-card overflow-hidden rounded-lg border border-gray-800 bg-black transition-colors hover:border-gold"
              >
                <div className="store-top flex h-36 items-center justify-center bg-steel">
                  <div className="p-4 text-center">
                    <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gold">
                      <PinIcon className="h-6 w-6 text-black" />
                    </span>
                    <h3 className="font-bold">{store.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="mb-3 flex items-start text-sm text-gray-300">
                    <PinIcon className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    {store.address}
                  </p>
                  <p className="mb-3 flex items-center text-xs text-gray-400">
                    <ClockIcon />
                    {store.hours}
                  </p>
                  <p className="mb-5 text-sm text-gray-300">{store.phone}</p>
                  <div className="grid grid-cols-1 gap-3">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta-secondary rounded-lg border border-gold px-4 py-2 text-center text-sm font-medium text-gold transition-colors hover:bg-gold/10"
                    >
                      Ver rota
                    </a>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta-primary rounded-lg bg-gold px-4 py-2 text-center text-sm font-semibold text-black transition-colors hover:bg-gold-dark"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          </div>
        </ScrollReveal>
      </section>

      <section id="nossa-historia" className="section-band bg-gray-950 py-20">
        <ScrollReveal>
          <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Nossa história</h2>
          <div className="mx-auto max-w-4xl">
            <div className="relative">
              <div className="absolute left-1/2 hidden h-full w-px -translate-x-1/2 bg-gray-700 md:block" />

              {timeline.map((event, index) => {
                const isReversed = index % 2 === 1;

                return (
                  <div
                    key={event.year}
                    className="mb-16 grid items-center gap-8 md:grid-cols-2 last:mb-0"
                  >
                    <div className={`relative ${isReversed ? "md:order-2 md:text-left" : "md:text-right"}`}>
                      <span className="timeline-dot hidden md:block" aria-hidden="true" />
                      <h3 className="mb-2 text-2xl font-bold text-gold">{event.year}</h3>
                      <h4 className="mb-3 text-xl font-semibold">{event.title}</h4>
                      <p className="text-gray-300">{event.text}</p>
                    </div>
                    <div className={`${isReversed ? "md:order-1" : ""} flex justify-center`}>
                      <div className="timeline-frame flex h-48 w-48 items-center justify-center rounded-lg border-2 border-gray-700 bg-gray-900">
                        <span className="px-4 text-center text-sm text-gray-500">
                          {event.imageLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          </div>
        </ScrollReveal>
      </section>

      <section id="trabalhe-conosco" className="section-band py-20">
        <ScrollReveal>
          <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="eyebrow mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-gold">
                Faça parte
              </p>
              <h2 className="mb-5 text-3xl font-bold">Trabalhe conosco</h2>
              <p className="text-sm leading-6 text-gray-400">
                Buscamos pessoas organizadas, comunicativas e comprometidas com atendimento em loja, estoque, logística e vendas.
                Envie seu currículo em PDF para futuras oportunidades.
              </p>
            </div>
            <div className="form-shell rounded-lg bg-gray-950 p-6 md:p-8">
              <CurriculoUpload />
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="border-y border-gray-800 bg-gold py-10 text-black">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Precisa consultar materiais para sua obra?</h2>
            <p className="mt-2 text-sm text-black/70">
              Chame no WhatsApp {phone} e confirme disponibilidade antes da retirada.
            </p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-black px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-gray-900"
          >
            Chamar no WhatsApp
          </a>
        </div>
      </section>

      <footer className="bg-black py-12">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} 4 Irmãos Materiais de Construção e Ferragens. Todos os direitos reservados.
          </p>
          <p className="mt-2">Manaus, AM - Brasil | Instagram: @4irmaosconstrucao</p>
        </div>
      </footer>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed-whatsapp"
        aria-label="Solicitar atendimento via WhatsApp"
      >
        <WhatsAppIcon />
      </a>

      <div className="mobile-action-bar md:hidden">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
        <Link href="#lojas">Lojas</Link>
      </div>
    </main>
  );
}
