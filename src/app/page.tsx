import Link from "next/link";

const servicios = [
  {
    titulo: "Serigrafía",
    desc: "Impresión de alta calidad sobre textiles, plásticos, vidrio y más.",
    href: "/servicios#serigrafia",
    icon: "🖨️",
  },
  {
    titulo: "Grabado láser",
    desc: "Marcado y grabado de precisión en metal, madera, acrílico y cuero.",
    href: "/servicios#grabado-laser",
    icon: "⚡",
  },
  {
    titulo: "Sublimación",
    desc: "Transferencia de imágenes a todo color sobre playeras, tazas y artículos promocionales.",
    href: "/servicios#sublimacion",
    icon: "🎨",
  },
  {
    titulo: "Lonas",
    desc: "Lonas publicitarias de gran formato para exteriores e interiores.",
    href: "/servicios#lonas",
    icon: "🏗️",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Damos vida a
              <span className="text-[var(--accent)]"> tus ideas</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[var(--muted-foreground)] max-w-xl">
              Somos un taller de impresiones con años de experiencia en
              serigrafía, grabado láser, sublimación y lonas. Cada proyecto
              recibe atención personalizada.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/servicios"
                className="inline-flex items-center rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--accent)]/90 transition-colors"
              >
                Ver servicios
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center rounded-lg border border-[var(--border)] px-6 py-3 text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
              >
                Solicitar cotización
              </Link>
            </div>
          </div>
        </div>

        {/* Value badges — MSP-inspired */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "CALIDAD", arrow: "GARANTIZADA" },
              { label: "TRATO", arrow: "DIRECTO" },
              { label: "ENTREGA", arrow: "PUNTUAL" },
            ].map(({ label, arrow }) => (
              <div
                key={label}
                className="group rounded-xl border border-[var(--border)] bg-[var(--card)]/50 px-5 py-4 text-center hover:border-[var(--accent)]/30 transition-all duration-300"
              >
                <span className="font-heading text-sm font-semibold tracking-wider text-[var(--foreground)]">
                  {label}
                </span>
                <span className="mx-2 text-[var(--accent)]">→</span>
                <span className="text-sm text-[var(--muted-foreground)]">
                  {arrow}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Decoración sutil */}
        <div className="absolute right-0 top-0 -z-10 h-full w-1/2 opacity-[0.03]">
          <div className="h-full w-full bg-[radial-gradient(circle_at_center,_var(--accent)_0%,_transparent_70%)]" />
        </div>
      </section>

      {/* Servicios — Bento Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Nuestros servicios
          </h2>
          <p className="mt-3 text-[var(--muted-foreground)] max-w-lg mx-auto">
            Cubrimos todo el espectro de impresión y marcado para tu negocio o
            proyecto personal.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {servicios.map((srv) => (
            <Link
              key={srv.titulo}
              href={srv.href}
              className="group rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 hover:border-[var(--accent)]/30 transition-all duration-300"
            >
              <span className="text-3xl">{srv.icon}</span>
              <h3 className="mt-4 font-heading text-lg font-semibold group-hover:text-[var(--accent)] transition-colors">
                {srv.titulo}
              </h3>
              <p className="mt-2 text-sm text-[var(--muted-foreground)] leading-relaxed">
                {srv.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            ¿Listo para empezar?
          </h2>
          <p className="mt-4 text-[var(--muted-foreground)] max-w-md mx-auto">
            Cuéntanos tu proyecto y te damos una cotización sin compromiso.
          </p>
          <Link
            href="/contacto"
            className="mt-8 inline-flex items-center rounded-lg bg-[var(--accent)] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[var(--accent)]/90 transition-colors"
          >
            Contáctanos
          </Link>
        </div>
      </section>
    </>
  );
}
