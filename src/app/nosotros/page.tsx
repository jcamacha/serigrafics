import Link from "next/link";
import SectionReveal from "@/components/SectionReveal";

export default function Nosotros() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="max-w-3xl">
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
          Sobre <span className="text-[var(--accent)]">nosotros</span>
        </h1>
        <p className="mt-4 text-lg text-[var(--muted-foreground)] leading-relaxed">
          Conoce nuestra misión, visión y la historia detrás de Serigrafics.
        </p>
      </div>

      {/* Misión y Visión */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <SectionReveal delay={0}>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-8 h-full">
            <h2 className="font-heading text-2xl font-semibold text-[var(--accent)]">Misión</h2>
            <p className="mt-4 text-[var(--muted-foreground)] leading-relaxed">
              Brindar soluciones de impresión industrial de alta calidad para botellas, envases y productos promocionales, combinando tecnología de precisión con atención personalizada.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-8 h-full">
            <h2 className="font-heading text-2xl font-semibold text-[var(--accent)]">Visión</h2>
            <p className="mt-4 text-[var(--muted-foreground)] leading-relaxed">
              Ser el taller de impresión de referencia en México para la decoración de botellas y envases, reconocido por calidad, innovación y cumplimiento.
            </p>
          </div>
        </SectionReveal>
      </div>

      {/* Historia y Valores */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <SectionReveal delay={0.2}>
          <div>
            <h2 className="font-heading text-2xl font-semibold">Nuestra historia</h2>
            <div className="mt-6 space-y-4 text-[var(--muted-foreground)] leading-relaxed">
              <p>
                Más de 15 años de experiencia en impresión industrial. Comenzamos como un taller de serigrafía y evolucionamos para especializarnos en la decoración de botellas, termos y envases para las industrias de bebidas, cosmética y promocionales.
              </p>
              <p>
                A lo largo de los años hemos incorporado tecnologías avanzadas para ofrecer acabados de alta resistencia y definición sobre vidrio, plástico y metal.
              </p>
              <p>
                Hoy, nuestro compromiso sigue siendo el mismo: atención personalizada, máxima precisión en cada tiraje y cumplimiento puntual con cada cliente.
              </p>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.3}>
          <div className="space-y-8">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-8">
              <h3 className="font-heading text-xl font-semibold">
                Valores
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-[var(--muted-foreground)]">
                {[
                  "Calidad",
                  "Atención personalizada",
                  "Compromiso con plazos",
                  "Innovación",
                  "Cuidado del detalle",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/contacto"
              className="block w-full rounded-lg bg-[var(--accent)] px-6 py-3.5 text-center text-sm font-semibold text-white hover:bg-[var(--accent)]/90 transition-colors"
            >
              Trabaja con nosotros
            </Link>
          </div>
        </SectionReveal>
      </div>
    </div>
  );
}
