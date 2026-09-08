import { useState, useEffect } from "react";

type Page = "inicio" | "sobre" | "sectores" | "programa" | "entradas" | "expositores" | "llegada" | "contacto";

const NAV_LINKS: { id: Page; label: string }[] = [
  { id: "inicio", label: "Inicio" },
  { id: "sobre", label: "¿Qué es ExpoJuy?" },
  { id: "sectores", label: "Sectores" },
  { id: "programa", label: "Programa" },
  { id: "entradas", label: "Entradas" },
  { id: "expositores", label: "Expositores" },
  { id: "llegada", label: "Cómo llegar" },
  { id: "contacto", label: "Contacto" },
];

// Countdown target: October 9, 2026
function useCountdown() {
  const target = new Date("2026-10-09T08:00:00-03:00").getTime();
  const [diff, setDiff] = useState(target - Date.now());
  useEffect(() => {
    const id = setInterval(() => setDiff(target - Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s };
}

function Nav({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#6B3FA0] text-white text-xs py-1.5 px-4 md:px-10 flex items-center justify-between">
        <span>Organiza: Cámara de Comercio Exterior de Jujuy</span>
        <div className="hidden sm:flex items-center gap-4">
          <span>📞 +54 9 388 421-2955</span>
          <span>✉ info@camcomexjujuy.com.ar</span>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`sticky top-0 z-50 transition-shadow ${
          scrolled ? "shadow-lg" : ""
        } bg-white border-b-2 border-[#6B3FA0]`}
      >
        <div className="px-4 md:px-10 flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => setPage("inicio")}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded bg-[#6B3FA0] flex items-center justify-center flex-shrink-0">
              <span className="text-white font-[family-name:var(--font-display)] font-black text-sm leading-none">
                EJ
              </span>
            </div>
            <div className="text-left">
              <div className="font-[family-name:var(--font-display)] font-black text-[#6B3FA0] text-lg leading-none">
                ExpoJuy
              </div>
              <div className="text-[10px] text-[#00C4C8] font-semibold leading-none mt-0.5">
                17ª Edición · 2026
              </div>
            </div>
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => setPage(l.id)}
                className={`text-xs font-semibold px-3 py-2 rounded transition-colors whitespace-nowrap ${
                  page === l.id
                    ? "bg-[#6B3FA0] text-white"
                    : "text-[#333] hover:text-[#6B3FA0] hover:bg-[#ede8f5]"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => setPage("expositores")}
              className="bg-[#00C4C8] text-white text-xs font-bold px-4 py-2 rounded hover:bg-[#009fa3] transition-colors"
            >
              Participar como expositor
            </button>
          </div>

          {/* Mobile */}
          <button
            className="lg:hidden text-[#6B3FA0] p-2"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <div className="w-5 h-0.5 bg-current mb-1.5" />
            <div className="w-5 h-0.5 bg-current mb-1.5" />
            <div className="w-5 h-0.5 bg-current" />
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => { setPage(l.id); setMenuOpen(false); }}
                className={`text-sm text-left py-2 px-3 rounded ${
                  page === l.id ? "bg-[#6B3FA0] text-white" : "text-[#333]"
                }`}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => { setPage("expositores"); setMenuOpen(false); }}
              className="mt-2 bg-[#00C4C8] text-white text-sm font-bold py-2 px-3 rounded"
            >
              Participar como expositor
            </button>
          </div>
        )}
      </nav>
    </>
  );
}

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center bg-white/10 backdrop-blur rounded px-4 py-3 min-w-[64px]">
      <span className="font-[family-name:var(--font-display)] text-3xl font-black text-white leading-none">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] text-white/70 uppercase tracking-widest mt-1">{label}</span>
    </div>
  );
}

const HERO_SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1711390811937-1b061eaf28ea?w=1600&h=900&fit=crop&auto=format",
    caption: "Stands y exhibidores en ediciones anteriores",
  },
  {
    url: "https://images.unsplash.com/photo-1560439514-4e9645039924?w=1600&h=900&fit=crop&auto=format",
    caption: "Rondas de negocios y networking internacional",
  },
  {
    url: "https://images.unsplash.com/photo-1711390811443-ae5a33144f7d?w=1600&h=900&fit=crop&auto=format",
    caption: "Expositores y visitantes en la muestra",
  },
  {
    url: "https://images.unsplash.com/photo-1530263131525-1c1d26feaa60?w=1600&h=900&fit=crop&auto=format",
    caption: "Encuentro comercial y cultural del NOA",
  },
  {
    url: "https://images.unsplash.com/photo-1715610258976-fc7c6b7290d3?w=1600&h=900&fit=crop&auto=format",
    caption: "Vínculos comerciales entre países del Corredor Bioceánico",
  },
  {
    url: "https://images.unsplash.com/photo-1671395781595-aa93f12a5124?w=1600&h=900&fit=crop&auto=format",
    caption: "Presencia internacional y participación ciudadana",
  },
];

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = (idx: number) => {
    if (transitioning || idx === current) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(idx);
      setTransitioning(false);
    }, 300);
  };

  const prev = () => goTo((current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const next = () => goTo((current + 1) % HERO_SLIDES.length);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={slide.url}
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: i === current ? 1 : 0,
            backgroundImage: `url('${slide.url}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1030]/90 via-[#1a1030]/50 to-[#1a1030]/20" />

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
        aria-label="Anterior"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
        aria-label="Siguiente"
      >
        ›
      </button>

      {/* Dots + caption */}
      <div className="absolute bottom-5 left-0 right-0 z-20 flex flex-col items-center gap-2">
        <p className="text-white/60 text-xs hidden sm:block">{HERO_SLIDES[current].caption}</p>
        <div className="flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all ${i === current ? "w-6 h-2 bg-[#00C4C8]" : "w-2 h-2 bg-white/40 hover:bg-white/70"}`}
              aria-label={`Foto ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Inicio({ setPage }: { setPage: (p: Page) => void }) {
  const { d, h, m, s } = useCountdown();

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-end pb-16">
        <HeroCarousel />
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 w-full">
          <div className="inline-flex items-center gap-2 bg-[#00C4C8] text-white text-xs font-bold px-3 py-1.5 rounded mb-6 uppercase tracking-wider">
            17ª Edición · Jujuy, Argentina
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-4">
            ExpoJuy 2026
          </h1>
          <p className="text-xl md:text-2xl text-[#00C4C8] font-semibold mb-2">
            "Conectando países – creando oportunidades"
          </p>
          <p className="text-white/80 text-base md:text-lg mb-8 max-w-xl">
            9 al 12 de octubre · Ciudad Cultural · San Salvador de Jujuy
          </p>

          {/* Countdown */}
          <div className="flex gap-3 mb-10 flex-wrap">
            <CountdownBox value={d} label="Días" />
            <CountdownBox value={h} label="Horas" />
            <CountdownBox value={m} label="Min" />
            <CountdownBox value={s} label="Seg" />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setPage("expositores")}
              className="bg-[#00C4C8] text-white font-bold px-8 py-3.5 rounded hover:bg-[#009fa3] transition-colors text-sm uppercase tracking-wide"
            >
              Participar como expositor
            </button>
            <button
              onClick={() => setPage("programa")}
              className="border-2 border-white text-white font-bold px-8 py-3.5 rounded hover:bg-white hover:text-[#6B3FA0] transition-colors text-sm uppercase tracking-wide"
            >
              Ver programa
            </button>
          </div>
        </div>
      </section>

      {/* Date highlight strip */}

      <div className="bg-[#6B3FA0] text-white py-4 px-6 md:px-10">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {[
            { icon: "📅", text: "9 al 12 de octubre de 2026" },
            { icon: "📍", text: "Ciudad Cultural · San Salvador de Jujuy" },
            { icon: "🏢", text: "+200 stands esperados" },
            { icon: "🌎", text: "Participación internacional" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-sm">
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* About teaser */}
      <section className="py-20 px-6 md:px-10 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#00C4C8] font-bold text-sm uppercase tracking-widest mb-3">
              La muestra más importante del NOA
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-black text-[#1a1030] mb-5 leading-tight">
              La apuesta productiva, comercial y cultural de Jujuy
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              ExpoJuy es la muestra multisectorial más importante de la región, organizada por la Cámara de Comercio Exterior de Jujuy. Reúne empresas, instituciones, gobiernos y emprendedores en 4 días intensos de negocios, networking y oportunidades.
            </p>
            <button
              onClick={() => setPage("sobre")}
              className="text-[#6B3FA0] font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all"
            >
              Conocer más →
            </button>
          </div>
          <div
            className="h-64 md:h-80 rounded-lg overflow-hidden bg-[#ede8f5]"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1711390811443-ae5a33144f7d?w=700&h=500&fit=crop&auto=format')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
      </section>

      {/* Sectors teaser */}
      <section className="py-16 px-6 md:px-10 bg-[#f5f2fa]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#00C4C8] font-bold text-sm uppercase tracking-widest mb-2 text-center">Sectores participantes</p>
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-black text-[#1a1030] mb-10 text-center">
            Un evento multisectorial
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: "⛏️", label: "Minería" },
              { icon: "🏭", label: "Industria" },
              { icon: "🌿", label: "Agropecuario" },
              { icon: "🛍️", label: "Comercio" },
              { icon: "✈️", label: "Turismo" },
              { icon: "💼", label: "Servicios" },
            ].map((s) => (
              <button
                key={s.label}
                onClick={() => setPage("sectores")}
                className="bg-white border border-[#d0c8ec] rounded-lg p-4 flex flex-col items-center gap-2 hover:border-[#6B3FA0] hover:shadow-md transition-all group"
              >
                <span className="text-3xl">{s.icon}</span>
                <span className="text-xs font-semibold text-[#1a1030] group-hover:text-[#6B3FA0]">
                  {s.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Countries */}
      <section className="py-16 px-6 md:px-10 bg-[#6B3FA0]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-3">Países participantes</p>
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-black text-white mb-8">
            Corredor Bioceánico en acción
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { flag: "🇦🇷", name: "Argentina" },
              { flag: "🇨🇱", name: "Chile" },
              { flag: "🇧🇷", name: "Brasil" },
              { flag: "🇵🇾", name: "Paraguay" },
              { flag: "🇧🇴", name: "Bolivia" },
              { flag: "🇵🇪", name: "Perú" },
              { flag: "🇺🇾", name: "Uruguay" },
            ].map((c) => (
              <div key={c.name} className="flex flex-col items-center gap-1 bg-white/10 rounded-lg px-5 py-3 min-w-[80px]">
                <span className="text-3xl">{c.flag}</span>
                <span className="text-xs text-white/80 font-semibold">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Sobre() {
  return (
    <div className="min-h-screen">
      <div className="bg-[#6B3FA0] py-16 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#00C4C8] font-bold text-sm uppercase tracking-widest mb-3">¿Qué es ExpoJuy?</p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-black text-white leading-tight">
            La feria más importante<br />del noroeste argentino
          </h1>
        </div>
      </div>
      <div className="py-16 px-6 md:px-10 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-black text-[#1a1030] mb-4">
              Historia y propósito
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              ExpoJuy es la muestra multisectorial organizada por la Cámara de Comercio Exterior de Jujuy. En su 17ª edición, convoca a empresas, instituciones y emprendedores de la provincia y de todo el país para generar vínculos comerciales, productivos e institucionales.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              La exposición se realiza en el predio de la Ciudad Cultural de San Salvador de Jujuy, e integra tanto la muestra comercial como rondas de negocios internacionales vinculadas al Corredor Bioceánico.
            </p>
            <p className="text-gray-600 leading-relaxed">
              El objetivo es concentrar la mayor cantidad de actividades en 4 días intensos: por la mañana, rondas de negocios internacionales; por la tarde, la exposición abierta al público.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            {[
              { title: "17ª edición", desc: "Una trayectoria consolidada como el evento comercial más importante de Jujuy." },
              { title: "Formato renovado", desc: "De dos semanas a 4 días intensos con actividad duplicada y foco internacional." },
              { title: "Corredor Bioceánico", desc: "Rondas de negocios internacionales con Argentina, Chile, Brasil, Paraguay y más." },
              { title: "+200 stands esperados", desc: "El mayor pabellón de exposición del NOA, con empresas de todos los sectores." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 items-start">
                <div className="w-2 h-2 rounded-full bg-[#00C4C8] mt-2 flex-shrink-0" />
                <div>
                  <div className="font-bold text-[#1a1030] text-sm mb-1">{item.title}</div>
                  <div className="text-gray-500 text-sm leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#f5f2fa] py-12 px-6 md:px-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { n: "17ª", label: "Edición" },
            { n: "+200", label: "Stands" },
            { n: "7", label: "Países participantes" },
            { n: "4", label: "Días de actividad" },
          ].map((s) => (
            <div key={s.n} className="text-center">
              <div className="font-[family-name:var(--font-display)] text-4xl font-black text-[#6B3FA0] mb-1">{s.n}</div>
              <div className="text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Organizer */}
      <div className="py-16 px-6 md:px-10 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-black text-[#1a1030] mb-6">
            Organizador
          </h2>
          <div className="border border-[#d0c8ec] rounded-lg p-6 flex items-start gap-6">
            <div className="w-14 h-14 bg-[#6B3FA0] rounded flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-lg">CC</span>
            </div>
            <div>
              <div className="font-bold text-[#1a1030] mb-1">Cámara de Comercio Exterior de Jujuy</div>
              <div className="text-sm text-gray-500 mb-3">Institución organizadora desde la primera edición. En 2026 celebra su 34° aniversario.</div>
              <a href="https://camcomexjujuy.com.ar" target="_blank" rel="noreferrer" className="text-[#6B3FA0] text-sm font-semibold hover:underline">
                camcomexjujuy.com.ar →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sectores() {
  const sectores = [
    {
      icon: "⛏️",
      title: "Minería",
      desc: "El sector minero de Jujuy es uno de los más importantes del país. ExpoJuy reúne a las principales empresas y proveedores del sector.",
      empresas: ["CONICET – Investigación minera", "Ministerio de Minería de Jujuy", "Proveedores de insumos y servicios"],
    },
    {
      icon: "🏭",
      title: "Industria",
      desc: "Manufactura, tecnología, producción local e innovación industrial del NOA y de todo el país.",
      empresas: ["Pymes industriales jujeñas", "Cámaras sectoriales", "Proveedores tecnológicos"],
    },
    {
      icon: "🌿",
      title: "Agropecuario",
      desc: "Tabaco, floricultura, quinoa, legumbres y producción agropecuaria de la región.",
      empresas: ["Cooperativas agrícolas", "Productores de tabaco", "Exportadores de quinoa"],
    },
    {
      icon: "🛍️",
      title: "Comercio",
      desc: "Empresas comerciales, distribuidoras y retailers de Jujuy y del NOA.",
      empresas: ["Cámara de Comercio de Jujuy", "Supermercados y retail", "Comercio mayorista"],
    },
    {
      icon: "✈️",
      title: "Turismo",
      desc: "Quebrada de Humahuaca, Puna jujeña, gastronomía y cultura. Jujuy como destino internacional.",
      empresas: ["Operadoras turísticas", "Hoteles y alojamientos", "Agencias de viaje"],
    },
    {
      icon: "💼",
      title: "Servicios",
      desc: "Servicios financieros, tecnológicos, logísticos y profesionales para empresas y emprendedores.",
      empresas: ["Bancos y fintech", "Empresas de logística", "Consultoras y estudios"],
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="bg-[#6B3FA0] py-16 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#00C4C8] font-bold text-sm uppercase tracking-widest mb-3">Sectores</p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-black text-white">
            Una muestra multisectorial
          </h1>
        </div>
      </div>
      <div className="py-16 px-6 md:px-10 bg-[#f5f2fa]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectores.map((s) => (
            <div key={s.title} className="bg-white rounded-lg border border-[#d0c8ec] p-6 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-black text-[#1a1030] mb-3">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{s.desc}</p>
              <div className="border-t border-[#d0c8ec] pt-4">
                <div className="text-xs font-bold text-[#6B3FA0] mb-2 uppercase tracking-wide">Participantes típicos</div>
                <ul className="flex flex-col gap-1">
                  {s.empresas.map((e) => (
                    <li key={e} className="text-xs text-gray-500 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#00C4C8] flex-shrink-0" />
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Programa() {
  const [activeDay, setActiveDay] = useState(0);

  const dias = [
    {
      label: "Jueves 9",
      actividades: [
        { hora: "09:00", tipo: "negocios", titulo: "Apertura oficial — Rondas internacionales de negocios", desc: "Bienvenida institucional con presencia de autoridades de la Cancillería argentina y embajadas del Corredor Bioceánico." },
        { hora: "10:30", tipo: "negocios", titulo: "Mesa redonda: Corredor Bioceánico", desc: "Perspectivas de integración de Argentina, Chile, Paraguay y Brasil en el marco del comercio regional." },
        { hora: "14:00", tipo: "expo", titulo: "Apertura de la exposición al público", desc: "Apertura oficial del pabellón con más de 200 stands de empresas, instituciones y emprendedores." },
        { hora: "18:00", tipo: "cultural", titulo: "Cocina regional de Jujuy", desc: "Degustación y muestra de la gastronomía típica jujeña." },
      ],
    },
    {
      label: "Viernes 10",
      actividades: [
        { hora: "09:00", tipo: "negocios", titulo: "Rondas de negocios: sector minero", desc: "Encuentros B2B entre empresas mineras, proveedores y organismos gubernamentales." },
        { hora: "11:00", tipo: "negocios", titulo: "Panel: Inversión en el NOA", desc: "Oportunidades de inversión en Jujuy y el noroeste argentino." },
        { hora: "14:00", tipo: "expo", titulo: "Exposición abierta al público", desc: "Visita libre a todos los stands con presentaciones especiales de expositores." },
        { hora: "17:00", tipo: "cultural", titulo: "Artesanías y cultura jujeña", desc: "Presentación de artesanos y productores culturales de la Quebrada de Humahuaca." },
      ],
    },
    {
      label: "Sábado 11",
      actividades: [
        { hora: "09:00", tipo: "negocios", titulo: "Foro de emprendedores", desc: "Encuentro de emprendedores jujeños con inversores y aceleradoras." },
        { hora: "11:00", tipo: "negocios", titulo: "Rondas de negocios: turismo internacional", desc: "Matching entre operadoras y agencias de viaje internacionales con destinos de Jujuy." },
        { hora: "14:00", tipo: "expo", titulo: "Exposición abierta al público", desc: "Mayor afluencia esperada. Actividades especiales para familias y jóvenes." },
        { hora: "20:00", tipo: "cultural", titulo: "Noche cultural de Jujuy", desc: "Música, danza y festividades de la cultura andina jujeña." },
      ],
    },
    {
      label: "Domingo 12",
      actividades: [
        { hora: "10:00", tipo: "expo", titulo: "Jornada final — Exposición abierta", desc: "Último día de la muestra con promociones especiales de expositores." },
        { hora: "12:00", tipo: "negocios", titulo: "Cierre de rondas de negocios", desc: "Firma de acuerdos y cartas de intención entre empresas participantes." },
        { hora: "16:00", tipo: "cultural", titulo: "Desfile de cierre y premiación", desc: "Reconocimiento a expositores destacados y cierre oficial de la 17ª edición de ExpoJuy." },
      ],
    },
  ];

  const tipoColors: Record<string, string> = {
    negocios: "bg-[#6B3FA0] text-white",
    expo: "bg-[#00C4C8] text-white",
    cultural: "bg-[#2a7d4f] text-white",
  };
  const tipoLabels: Record<string, string> = {
    negocios: "Negocios",
    expo: "Exposición",
    cultural: "Cultural",
  };

  return (
    <div className="min-h-screen">
      <div className="bg-[#6B3FA0] py-16 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#00C4C8] font-bold text-sm uppercase tracking-widest mb-3">Programa</p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-black text-white mb-2">
            4 días de actividades
          </h1>
          <p className="text-white/70">9 al 12 de octubre de 2026 · Ciudad Cultural</p>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white border-b border-[#d0c8ec] px-6 md:px-10 py-3">
        <div className="max-w-5xl mx-auto flex gap-4 flex-wrap">
          {Object.entries(tipoLabels).map(([k, v]) => (
            <div key={k} className="flex items-center gap-2 text-xs">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${tipoColors[k]}`}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-10 py-12 bg-[#f5f2fa]">
        <div className="max-w-5xl mx-auto">
          {/* Day tabs */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {dias.map((d, i) => (
              <button
                key={d.label}
                onClick={() => setActiveDay(i)}
                className={`px-5 py-2.5 rounded font-semibold text-sm transition-colors ${
                  activeDay === i
                    ? "bg-[#6B3FA0] text-white"
                    : "bg-white border border-[#d0c8ec] text-[#333] hover:border-[#6B3FA0]"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Activities */}
          <div className="flex flex-col gap-4">
            {dias[activeDay].actividades.map((a) => (
              <div key={a.titulo} className="bg-white rounded-lg border border-[#d0c8ec] p-5 flex gap-5">
                <div className="text-[#6B3FA0] font-[family-name:var(--font-display)] font-black text-lg w-14 flex-shrink-0 pt-0.5">
                  {a.hora}
                </div>
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2 flex-wrap">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${tipoColors[a.tipo]}`}>
                      {tipoLabels[a.tipo]}
                    </span>
                    <h3 className="font-semibold text-[#1a1030] text-sm">{a.titulo}</h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Entradas() {
  const tickets = [
    {
      tipo: "Entrada General",
      precio: "Gratis",
      desc: "Acceso libre a la exposición de stands en Ciudad Cultural.",
      incluye: ["Acceso a todos los stands", "Actividades culturales", "Shows y degustaciones"],
      destacado: false,
      badge: null,
    },
    {
      tipo: "Jornada de Negocios",
      precio: "$8.500",
      desc: "Acceso a las rondas de negocios internacionales de la mañana + exposición por la tarde.",
      incluye: ["Rondas de negocios B2B", "Matchmaking internacional", "Coffee break incluido", "Acceso completo a la expo", "Certificado de participación"],
      destacado: true,
      badge: "MÁS ELEGIDO",
    },
    {
      tipo: "Pase Full 4 días",
      precio: "$22.000",
      desc: "Acceso completo a los 4 días: rondas, exposición, foros y actividades especiales.",
      incluye: ["Todo en Jornada de Negocios", "4 días completos", "Acceso a foros especiales", "Kit ExpoJuy 2026", "Almuerzo en jornadas de negocios"],
      destacado: false,
      badge: "MEJOR VALOR",
    },
  ];

  const descuentos = [
    { icon: "🎓", titulo: "Estudiantes universitarios", desc: "50% de descuento con credencial universitaria vigente" },
    { icon: "👥", titulo: "Grupos (+10 personas)", desc: "30% de descuento en Jornada de Negocios y Pase Full" },
    { icon: "🏢", titulo: "Socios de la Cámara", desc: "40% de descuento en todos los pases pagos" },
    { icon: "🌍", titulo: "Delegaciones extranjeras", desc: "Entrada bonificada — consultar con la organización" },
  ];

  return (
    <div className="min-h-screen">
      <div className="bg-[#6B3FA0] py-16 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#00C4C8] font-bold text-sm uppercase tracking-widest mb-3">Entradas</p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-black text-white mb-2">
            Conseguí tu entrada
          </h1>
          <p className="text-white/70">9 al 12 de octubre de 2026 · Ciudad Cultural · San Salvador de Jujuy</p>
        </div>
      </div>

      {/* Ticket cards */}
      <section className="py-16 px-6 md:px-10 bg-[#f5f2fa]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {tickets.map((t) => (
              <div
                key={t.tipo}
                className={`rounded-xl border-2 flex flex-col overflow-hidden ${
                  t.destacado
                    ? "border-[#6B3FA0] shadow-xl shadow-[#6B3FA0]/10"
                    : "border-[#d0c8ec] bg-white"
                }`}
              >
                {t.badge && (
                  <div className={`text-center text-[10px] font-black uppercase tracking-widest py-2 ${t.destacado ? "bg-[#6B3FA0] text-white" : "bg-[#00C4C8] text-white"}`}>
                    {t.badge}
                  </div>
                )}
                <div className={`p-6 flex flex-col flex-1 ${t.destacado ? "bg-white" : ""}`}>
                  <h3 className="font-[family-name:var(--font-display)] font-black text-[#1a1030] text-xl mb-1">{t.tipo}</h3>
                  <p className="text-gray-500 text-xs mb-5 leading-relaxed">{t.desc}</p>
                  <div className="mb-6">
                    <span className="font-[family-name:var(--font-display)] font-black text-4xl text-[#6B3FA0]">{t.precio}</span>
                    {t.precio !== "Gratis" && <span className="text-gray-400 text-sm ml-1">/ persona</span>}
                  </div>
                  <ul className="flex flex-col gap-2 mb-8 flex-1">
                    {t.incluye.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="text-[#00C4C8] font-bold text-xs">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="https://entradas.expojuy.com.ar"
                    target="_blank"
                    rel="noreferrer"
                    className={`block text-center font-bold text-sm py-3 rounded-lg transition-colors ${
                      t.destacado
                        ? "bg-[#6B3FA0] text-white hover:bg-[#4d2d78]"
                        : "border-2 border-[#6B3FA0] text-[#6B3FA0] hover:bg-[#f5f2fa]"
                    }`}
                  >
                    {t.precio === "Gratis" ? "Es gratis — entrá directo" : "Comprar entrada"}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Ticket link CTA */}
          <div className="bg-[#6B3FA0] rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-bold text-white mb-1">🎟 Plataforma oficial de venta</div>
              <div className="text-white/70 text-sm">entradas.expojuy.com.ar — disponible desde el 1 de agosto de 2026</div>
            </div>
            <a
              href="https://entradas.expojuy.com.ar"
              target="_blank"
              rel="noreferrer"
              className="bg-[#00C4C8] text-white font-bold text-sm px-6 py-3 rounded-lg hover:bg-[#009fa3] transition-colors whitespace-nowrap flex-shrink-0"
            >
              Ir a comprar entradas →
            </a>
          </div>
        </div>
      </section>

      {/* Descuentos */}
      <section className="py-16 px-6 md:px-10 bg-white border-t border-[#d0c8ec]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#00C4C8] font-bold text-sm uppercase tracking-widest mb-3">Descuentos</p>
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-black text-[#1a1030] mb-8">
            Beneficios especiales
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {descuentos.map((d) => (
              <div key={d.titulo} className="bg-[#f5f2fa] border border-[#d0c8ec] rounded-xl p-5">
                <div className="text-3xl mb-3">{d.icon}</div>
                <div className="font-bold text-[#1a1030] text-sm mb-2">{d.titulo}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{d.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Puntos de venta físicos */}
      <section className="py-16 px-6 md:px-10 bg-[#f5f2fa] border-t border-[#d0c8ec]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <p className="text-[#00C4C8] font-bold text-sm uppercase tracking-widest mb-3">Puntos de venta presencial</p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-black text-[#1a1030] mb-6">
              ¿Dónde conseguirlas?
            </h2>
            <ul className="flex flex-col gap-4">
              {[
                { lugar: "Cámara de Comercio Exterior de Jujuy", dir: "San Salvador de Jujuy — sede central", horario: "Lun–Vie 9:00–17:00 hs" },
                { lugar: "Secretaría de Turismo de Jujuy", dir: "San Salvador de Jujuy — centro", horario: "Lun–Vie 8:00–16:00 hs" },
                { lugar: "Ciudad Cultural (en el evento)", dir: "Av. de los Estudiantes Jujeños s/n", horario: "9 al 12 de octubre — en puerta" },
              ].map((p) => (
                <li key={p.lugar} className="bg-white rounded-lg border border-[#d0c8ec] p-4">
                  <div className="font-semibold text-[#1a1030] text-sm mb-1">{p.lugar}</div>
                  <div className="text-xs text-gray-500 mb-0.5">📍 {p.dir}</div>
                  <div className="text-xs text-gray-500">🕘 {p.horario}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-center">
            <div className="bg-[#6B3FA0]/5 border-2 border-dashed border-[#6B3FA0]/30 rounded-xl p-8 text-center">
              <div className="text-5xl mb-4">📞</div>
              <h3 className="font-[family-name:var(--font-display)] font-black text-[#1a1030] text-xl mb-2">
                ¿Necesitás ayuda?
              </h3>
              <p className="text-gray-500 text-sm mb-5">
                Consultá por grupos, delegaciones, descuentos especiales o accesibilidad.
              </p>
              <a
                href="mailto:info@camcomexjujuy.com.ar?subject=Consulta%20entradas%20ExpoJuy%202026"
                className="inline-block bg-[#6B3FA0] text-white font-bold text-sm px-6 py-3 rounded-lg hover:bg-[#4d2d78] transition-colors"
              >
                Solicitar información
              </a>
              <div className="mt-3 text-xs text-gray-400">info@camcomexjujuy.com.ar · +54 9 388 421-2955</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Expositores() {
  return (
    <div className="min-h-screen">
      <div className="bg-[#6B3FA0] py-16 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#00C4C8] font-bold text-sm uppercase tracking-widest mb-3">Expositores</p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-black text-white mb-3">
            Participá en ExpoJuy 2026
          </h1>
          <p className="text-white/80 max-w-xl">
            Sumate a la feria más importante del noroeste argentino. Mostrá tu empresa, generá contactos y accedé a rondas internacionales de negocios.
          </p>
        </div>
      </div>

      <div className="py-16 px-6 md:px-10 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: "🏢", title: "Stand estándar", desc: "Módulo de 3×3m. Incluye estructura, iluminación, mesada y 2 sillas." },
            { icon: "🌟", title: "Stand premium", desc: "Módulo de 6×3m. Incluye diseño personalizado, pantalla, y acceso a rondas de negocios." },
            { icon: "🌐", title: "Patrocinio institucional", desc: "Presencia en toda la comunicación del evento. Ideal para empresas que buscan visibilidad regional." },
          ].map((p) => (
            <div key={p.title} className="border border-[#d0c8ec] rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">{p.icon}</div>
              <h3 className="font-[family-name:var(--font-display)] font-black text-[#1a1030] text-lg mb-3">{p.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="max-w-xl mx-auto text-center bg-[#f5f2fa] border-2 border-dashed border-[#d0c8ec] rounded-xl p-10">
          <div className="text-5xl mb-4">🤝</div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-black text-[#1a1030] mb-3">
            ¿Querés participar como expositor?
          </h2>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            Contactá a la Cámara de Comercio Exterior de Jujuy para conocer disponibilidad, precios y condiciones de participación.
          </p>
          <a
            href="mailto:info@camcomexjujuy.com.ar?subject=Consulta%20expositor%20ExpoJuy%202026"
            className="inline-block bg-[#6B3FA0] text-white font-bold text-sm px-8 py-3.5 rounded-lg hover:bg-[#4d2d78] transition-colors mb-3"
          >
            Solicitar información
          </a>
          <div className="text-xs text-gray-400">info@camcomexjujuy.com.ar · +54 9 388 421-2955</div>
        </div>
      </div>
    </div>
  );
}

function ComoLlegar() {
  const lineasDirectas = [
    { num: "16", empresa: "Santa Ana", color: "#e63946", desc: "Ingresa al predio por Av. de los Estudiantes — terminal en Av. de las Carrozas" },
  ];
  const lineasCercanas = [
    { num: "2", color: "#457b9d" },
    { num: "5", color: "#2a9d8f" },
    { num: "6", color: "#e76f51" },
    { num: "7", color: "#264653" },
    { num: "9", color: "#6d6875" },
    { num: "10", color: "#a8dadc" },
    { num: "12", color: "#457b9d" },
    { num: "15", color: "#f4a261" },
    { num: "24", color: "#2a9d8f" },
    { num: "26", color: "#e63946" },
    { num: "34", color: "#264653" },
    { num: "35", color: "#6d6875" },
    { num: "36", color: "#a8dadc" },
    { num: "38", color: "#e76f51" },
    { num: "39", color: "#457b9d" },
    { num: "45", color: "#2a9d8f" },
  ];

  return (
    <div className="min-h-screen">
      <div className="bg-[#6B3FA0] py-16 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#00C4C8] font-bold text-sm uppercase tracking-widest mb-3">Cómo llegar</p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-black text-white mb-2">
            Ciudad Cultural · San Salvador de Jujuy
          </h1>
          <p className="text-white/70">Av. de los Estudiantes Jujeños, Alto Padilla</p>
        </div>
      </div>

      {/* Map */}
      <div className="w-full h-96 bg-[#d0c8ec] relative">
        <iframe
          title="Mapa Ciudad Cultural Jujuy"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-65.315%2C-24.205%2C-65.283%2C-24.170&layer=mapnik&marker=-24.1858%2C-65.2990"
          className="w-full h-full border-0"
          loading="lazy"
        />
        <a
          href="https://www.openstreetmap.org/?mlat=-24.1858&mlon=-65.2990#map=15/-24.1858/-65.2990"
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-3 right-3 bg-white text-[#6B3FA0] text-xs font-semibold px-3 py-1.5 rounded shadow hover:bg-[#ede8f5] transition-colors"
        >
          Ver mapa completo →
        </a>
      </div>

      <div className="py-16 px-6 md:px-10 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">

          {/* Dirección y datos */}
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-black text-[#1a1030] mb-6">
              Dirección del predio
            </h2>
            <div className="flex flex-col gap-4 mb-8">
              {[
                { icon: "📍", label: "Dirección", value: "Av. de los Estudiantes Jujeños s/n, Alto Padilla" },
                { icon: "🏙️", label: "Ciudad", value: "San Salvador de Jujuy, Jujuy, Argentina" },
                { icon: "📅", label: "Fechas", value: "9 al 12 de octubre de 2026" },
                { icon: "🕗", label: "Horario expo", value: "Mañana: rondas de negocios · Tarde: exposición pública" },
                { icon: "💳", label: "Transporte público", value: "Solo se acepta tarjeta SUBE en todos los colectivos" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-[#ede8f5] rounded flex items-center justify-center text-base flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide mb-0.5">{item.label}</div>
                    <div className="text-sm text-[#1a1030]">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Paradas cercanas */}
            <div className="bg-[#f5f2fa] rounded-lg p-5 border border-[#d0c8ec]">
              <div className="font-bold text-[#1a1030] text-sm mb-3">🚏 Paradas más cercanas</div>
              <ul className="flex flex-col gap-2">
                {[
                  { parada: "Suipacha 337", dist: "9 min a pie" },
                  { parada: "Av. Bolivia 1380", dist: "12 min a pie" },
                  { parada: "Av. de las Carrozas (terminal línea 16)", dist: "Dentro del predio" },
                ].map((p) => (
                  <li key={p.parada} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{p.parada}</span>
                    <span className="text-[#6B3FA0] font-semibold text-xs bg-[#ede8f5] px-2 py-0.5 rounded-full">{p.dist}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Colectivos */}
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-black text-[#1a1030] mb-6">
              Líneas de colectivo
            </h2>

            {/* Acceso directo */}
            <div className="mb-6">
              <div className="text-xs font-bold text-[#6B3FA0] uppercase tracking-wide mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#e63946]" />
                Acceso directo al predio
              </div>
              {lineasDirectas.map((l) => (
                <div key={l.num} className="bg-white border-2 border-[#e63946]/30 rounded-lg p-4 flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-[family-name:var(--font-display)] font-black text-xl flex-shrink-0"
                    style={{ backgroundColor: l.color }}
                  >
                    {l.num}
                  </div>
                  <div>
                    <div className="font-bold text-[#1a1030] text-sm mb-1">Línea {l.num} — {l.empresa}</div>
                    <div className="text-xs text-gray-500 leading-relaxed">{l.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Línea 15 */}
            <div className="mb-6">
              <div className="text-xs font-bold text-[#6B3FA0] uppercase tracking-wide mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#f4a261]" />
                Alternativa recomendada (bajada en Av. Bolivia)
              </div>
              <div className="bg-white border border-[#d0c8ec] rounded-lg p-4 flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#f4a261] flex items-center justify-center text-white font-[family-name:var(--font-display)] font-black text-xl flex-shrink-0">
                  15
                </div>
                <div>
                  <div className="font-bold text-[#1a1030] text-sm mb-1">Línea 15 — Santa Ana</div>
                  <div className="text-xs text-gray-500 leading-relaxed">Villa Jardín de Reyes / Ex Terminal. Corredor norte por Av. Bolivia — bajada en nudo vial de Airampo.</div>
                </div>
              </div>
            </div>

            {/* Resto de líneas */}
            <div>
              <div className="text-xs font-bold text-[#6B3FA0] uppercase tracking-wide mb-3">
                Otras líneas con paradas en la zona
              </div>
              <div className="flex flex-wrap gap-2">
                {lineasCercanas.map((l) => (
                  <div
                    key={l.num}
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-[family-name:var(--font-display)] font-black text-sm"
                    style={{ backgroundColor: l.color }}
                    title={`Línea ${l.num}`}
                  >
                    {l.num}
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3">
                Todas por corredor Av. Bolivia / Comandante Pérez / puente de Airampo
              </p>
            </div>

            {/* SUBE reminder */}
            <div className="mt-6 bg-[#f0fafc] border border-[#00C4C8]/30 rounded-lg p-4 flex gap-3">
              <span className="text-xl">💳</span>
              <div>
                <div className="font-bold text-[#006b6e] text-sm mb-1">Recordá tu tarjeta SUBE</div>
                <div className="text-xs text-[#006b6e]/80">El transporte urbano de Jujuy opera exclusivamente con tarjeta SUBE. No se acepta efectivo.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Maps CTA */}
      <div className="bg-[#f5f2fa] py-10 px-6 md:px-10 border-t border-[#d0c8ec]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-bold text-[#1a1030] mb-1">¿Querés planificar tu viaje?</div>
            <div className="text-sm text-gray-500">Usá Moovit o Google Maps para ver horarios en tiempo real</div>
          </div>
          <div className="flex gap-3">
            <a
              href="https://moovitapp.com/index/es/transporte_p%C3%BAblico-Ciudad_Cultural-San_Salvador_de_Juju-site_140161524-5773"
              target="_blank"
              rel="noreferrer"
              className="bg-[#6B3FA0] text-white text-sm font-semibold px-5 py-2.5 rounded hover:bg-[#4d2d78] transition-colors"
            >
              Abrir en Moovit
            </a>
            <a
              href="https://www.google.com/maps/search/Ciudad+Cultural+San+Salvador+de+Jujuy"
              target="_blank"
              rel="noreferrer"
              className="border border-[#6B3FA0] text-[#6B3FA0] text-sm font-semibold px-5 py-2.5 rounded hover:bg-[#ede8f5] transition-colors"
            >
              Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Contacto() {
  return (
    <div className="min-h-screen">
      <div className="bg-[#6B3FA0] py-16 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#00C4C8] font-bold text-sm uppercase tracking-widest mb-3">Contacto</p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-black text-white">
            ¿Tenés consultas?
          </h1>
        </div>
      </div>

      <div className="py-16 px-6 md:px-10 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-black text-[#1a1030] mb-6">
              Información de contacto
            </h2>
            <div className="flex flex-col gap-6 mb-8">
              {[
                { icon: "📞", label: "Teléfono", value: "+54 9 388 421-2955" },
                { icon: "✉️", label: "Email", value: "info@camcomexjujuy.com.ar" },
                { icon: "📍", label: "Sede", value: "San Salvador de Jujuy, Jujuy, Argentina" },
                { icon: "🕘", label: "Horario de atención", value: "Lunes a viernes · 9:00 a 17:00 hs" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#ede8f5] rounded flex items-center justify-center text-lg flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">{item.label}</div>
                    <div className="text-sm text-[#1a1030] font-semibold">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-6 border-t border-[#d0c8ec]">
              <div className="text-xs font-bold text-[#333] uppercase tracking-wide mb-2">Organizador</div>
              <div className="text-sm text-gray-600 mb-1">
                <strong>Cámara de Comercio Exterior de Jujuy</strong><br />
                34° aniversario institucional · 2026
              </div>
              <a href="https://camcomexjujuy.com.ar" target="_blank" rel="noreferrer" className="text-[#6B3FA0] text-sm font-semibold hover:underline">
                camcomexjujuy.com.ar →
              </a>
            </div>
          </div>

          {/* CTA sin form */}
          <div className="flex flex-col gap-5">
            {[
              { icon: "🎟", titulo: "Entradas y accesos", desc: "Consultá precios, descuentos y puntos de venta para visitantes.", href: "mailto:info@camcomexjujuy.com.ar?subject=Consulta%20entradas%20ExpoJuy%202026" },
              { icon: "🏢", titulo: "Participar como expositor", desc: "Información sobre stands, costos y modalidades de participación empresarial.", href: "mailto:info@camcomexjujuy.com.ar?subject=Consulta%20expositor%20ExpoJuy%202026" },
              { icon: "🤝", titulo: "Patrocinios institucionales", desc: "Opciones de visibilidad y patrocinio para marcas e instituciones.", href: "mailto:info@camcomexjujuy.com.ar?subject=Consulta%20patrocinio%20ExpoJuy%202026" },
              { icon: "🌍", titulo: "Delegaciones internacionales", desc: "Gestión de acreditaciones y rondas de negocios para delegaciones del exterior.", href: "mailto:info@camcomexjujuy.com.ar?subject=Delegacion%20internacional%20ExpoJuy%202026" },
            ].map((item) => (
              <a
                key={item.titulo}
                href={item.href}
                className="group flex items-start gap-4 border border-[#d0c8ec] rounded-xl p-5 hover:border-[#6B3FA0] hover:bg-[#f5f2fa] transition-all"
              >
                <div className="w-11 h-11 bg-[#ede8f5] rounded-lg flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-[#6B3FA0]/10 transition-colors">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-[#1a1030] text-sm mb-1 group-hover:text-[#6B3FA0] transition-colors">{item.titulo}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{item.desc}</div>
                </div>
                <div className="text-[#6B3FA0] opacity-0 group-hover:opacity-100 transition-opacity text-sm self-center">→</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const PATROCINADORES = {
  oro: [
    { nombre: "Gobierno de Jujuy", sigla: "GOB", color: "#6B3FA0" },
    { nombre: "Banco Macro", sigla: "BM", color: "#f7b731" },
    { nombre: "YPF", sigla: "YPF", color: "#003087" },
    { nombre: "Ministerio de Economía", sigla: "ME", color: "#1a6b3c" },
  ],
  plata: [
    { nombre: "Telecom Argentina", sigla: "TC", color: "#0050a0" },
    { nombre: "Municipalidad de Jujuy", sigla: "MJ", color: "#00C4C8" },
    { nombre: "Cámara Minera de Jujuy", sigla: "CM", color: "#555" },
    { nombre: "Aerolíneas Argentinas", sigla: "AR", color: "#1a1aff" },
    { nombre: "Banco Nación", sigla: "BN", color: "#003087" },
    { nombre: "Provincia ART", sigla: "PA", color: "#d62828" },
  ],
  bronce: [
    { nombre: "Cooperativa Tabacalera", sigla: "CT", color: "#6b4c11" },
    { nombre: "Hotel Jujuy Palace", sigla: "JP", color: "#4a4a4a" },
    { nombre: "Radio FM Visión", sigla: "RV", color: "#e63946" },
    { nombre: "Diario El Tribuno", sigla: "ET", color: "#222" },
    { nombre: "Cervecería Norte", sigla: "CN", color: "#e76f51" },
    { nombre: "Constructora NOA", sigla: "CN", color: "#2a9d8f" },
    { nombre: "Logística Andina", sigla: "LA", color: "#457b9d" },
    { nombre: "Turismo Jujuy City", sigla: "TJ", color: "#6d6875" },
  ],
};

function SponsorCard({ nombre, sigla, color, size }: { nombre: string; sigla: string; color: string; size: "lg" | "md" | "sm" }) {
  const dims = size === "lg" ? "h-20 px-8" : size === "md" ? "h-16 px-6" : "h-12 px-4";
  const text = size === "lg" ? "text-2xl" : size === "md" ? "text-lg" : "text-sm";
  return (
    <div className={`${dims} bg-white border border-[#d0c8ec] rounded-lg flex items-center justify-center gap-3 hover:shadow-md hover:border-[#6B3FA0]/30 transition-all group`}>
      <div
        className={`rounded flex items-center justify-center text-white font-[family-name:var(--font-display)] font-black flex-shrink-0 ${
          size === "lg" ? "w-10 h-10 text-sm" : size === "md" ? "w-8 h-8 text-xs" : "w-6 h-6 text-[10px]"
        }`}
        style={{ backgroundColor: color }}
      >
        {sigla.slice(0, 2)}
      </div>
      <span className={`font-semibold text-[#1a1030] group-hover:text-[#6B3FA0] transition-colors whitespace-nowrap ${text}`}>
        {nombre}
      </span>
    </div>
  );
}

function SeccionPatrocinadores() {
  return (
    <section className="py-20 px-6 md:px-10 bg-[#f5f2fa] border-t border-[#d0c8ec]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#00C4C8] font-bold text-sm uppercase tracking-widest mb-3">Patrocinadores</p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-black text-[#1a1030]">
            Hacen posible ExpoJuy 2026
          </h2>
        </div>

        {/* Oro */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-[#00C4C8]/30" />
            <div className="flex items-center gap-2 px-4 py-1 bg-[#00C4C8] rounded-full">
              <span className="text-sm">🥇</span>
              <span className="text-white text-xs font-black uppercase tracking-widest">Patrocinadores Oro</span>
            </div>
            <div className="h-px flex-1 bg-[#00C4C8]/30" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PATROCINADORES.oro.map((p) => (
              <SponsorCard key={p.nombre} {...p} size="lg" />
            ))}
          </div>
        </div>

        {/* Plata */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-gray-300" />
            <div className="flex items-center gap-2 px-4 py-1 bg-gray-400 rounded-full">
              <span className="text-sm">🥈</span>
              <span className="text-white text-xs font-black uppercase tracking-widest">Patrocinadores Plata</span>
            </div>
            <div className="h-px flex-1 bg-gray-300" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {PATROCINADORES.plata.map((p) => (
              <SponsorCard key={p.nombre} {...p} size="md" />
            ))}
          </div>
        </div>

        {/* Bronce */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-[#9E8EC0]/30" />
            <div className="flex items-center gap-2 px-4 py-1 bg-[#9E8EC0] rounded-full">
              <span className="text-sm">🥉</span>
              <span className="text-white text-xs font-black uppercase tracking-widest">Patrocinadores Bronce</span>
            </div>
            <div className="h-px flex-1 bg-[#9E8EC0]/30" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
            {PATROCINADORES.bronce.map((p) => (
              <SponsorCard key={p.nombre} {...p} size="sm" />
            ))}
          </div>
        </div>

        {/* CTA sponsor */}
        <div className="bg-white border-2 border-dashed border-[#d0c8ec] rounded-xl p-8 text-center">
          <div className="text-3xl mb-3">🤝</div>
          <h3 className="font-[family-name:var(--font-display)] font-black text-[#1a1030] text-xl mb-2">
            ¿Querés ser patrocinador?
          </h3>
          <p className="text-gray-500 text-sm mb-5 max-w-sm mx-auto">
            Asociá tu marca a la feria más importante del NOA. Alcance regional e internacional.
          </p>
          <a
            href="mailto:info@camcomexjujuy.com.ar?subject=Consulta%20patrocinio%20ExpoJuy%202026"
            className="inline-block bg-[#00C4C8] text-white font-bold text-sm px-6 py-3 rounded hover:bg-[#009fa3] transition-colors"
          >
            Consultar opciones de patrocinio
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <footer className="bg-[#1a1030] text-white">
      <div className="px-6 md:px-10 py-12">
        <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded bg-[#00C4C8] flex items-center justify-center">
                <span className="text-white font-black text-sm">EJ</span>
              </div>
              <div>
                <div className="font-[family-name:var(--font-display)] font-black text-lg leading-none">ExpoJuy</div>
                <div className="text-[10px] text-[#00C4C8] leading-none mt-0.5">17ª Edición · 2026</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4 max-w-xs">
              "Conectando países – creando oportunidades"<br />
              9 al 12 de octubre · Ciudad Cultural · San Salvador de Jujuy
            </p>
            <div className="text-sm text-white/50">
              Organiza: Cámara de Comercio Exterior de Jujuy
            </div>
          </div>
          <div>
            <div className="font-bold text-sm text-white/80 uppercase tracking-wide mb-4">Navegación</div>
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setPage(l.id)}
                  className="text-sm text-white/50 hover:text-white transition-colors text-left"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="font-bold text-sm text-white/80 uppercase tracking-wide mb-4">Contacto</div>
            <div className="flex flex-col gap-2 text-sm text-white/50">
              <span>+54 9 388 421-2955</span>
              <span>info@camcomexjujuy.com.ar</span>
              <a href="https://camcomexjujuy.com.ar" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                camcomexjujuy.com.ar
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 md:px-10 py-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between gap-2 text-xs text-white/30">
          <span>© 2026 Cámara de Comercio Exterior de Jujuy. Todos los derechos reservados.</span>
          <span>San Salvador de Jujuy, Argentina</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>("inicio");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="min-h-screen bg-[#f5f2fa] flex flex-col">
      <Nav page={page} setPage={setPage} />
      <main className="flex-1">
        {page === "inicio" && <Inicio setPage={setPage} />}
        {page === "sobre" && <Sobre />}
        {page === "sectores" && <Sectores />}
        {page === "programa" && <Programa />}
        {page === "entradas" && <Entradas />}
        {page === "expositores" && <Expositores />}
        {page === "llegada" && <ComoLlegar />}
        {page === "contacto" && <Contacto />}
      </main>
      <SeccionPatrocinadores />
      <Footer setPage={setPage} />
    </div>
  );
}
