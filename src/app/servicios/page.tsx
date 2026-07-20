import Link from "next/link";
import type { Metadata } from "next";
import SectionReveal from "@/components/SectionReveal";

export const metadata: Metadata = {
  title: "Servicios — Más Imagen",
  description:
    "Especialistas en impresión de botellas, envases de vidrio y plástico, termos, grabado láser, tampografía, sublimación y lonas.",
};

const serviciosDetalle = [
  {
    id: "serigrafia",
    titulo: "Serigrafía en botellas y envases",
    descripcion:
      "Técnica de impresión industrial de alta precisión especializada en botellas cilíndricas, envases de vidrio, termos y contenedores de plástico o metal. Ofrecemos acabados de alta durabilidad y resistencia al lavado.",
    usos: [
      "Botellas cilíndricas de vidrio y plástico",
      "Envases de vidrio para bebidas, licores y cosmética",
      "Termos, vasos y envases promocionales",
      "Playeras y textiles (servicio secundario)",
    ],
    destacado: true,
  },
  {
    id: "tampografia",
    titulo: "Tampografía",
    descripcion:
      "Sistema de impresión indirecta ideal para botellas pequeñas, tapas, frascos y superficies curvas o de difícil acceso. Permite lograr detalles finos en áreas no planas.",
    usos: [
      "Botellas pequeñas y frascos cosméticos",
      "Tapas y cierres de envases",
      "Superficies curvas e irregulares",
      "Artículos promocionales (plumas, llaveros, USBs)",
    ],
    proximamente: true,
  },
  {
    id: "grabado-laser",
    titulo: "Grabado láser",
    descripcion:
      "Marcado de alta precisión con tecnología láser. Ideal para termos metálicos, botellas de acero inoxidable, metal, madera y acrílico con un acabado permanente e imborrable.",
    usos: [
      "Termos metálicos y botellas de acero",
      "Cilindros de aluminio y vasos térmicos",
      "Trofeos, placas y reconocimientos",
      "Personalización permanente de regalos empresariales",
    ],
  },
  {
    id: "sublimacion",
    titulo: "Sublimación",
    descripcion:
      "Transferencia de tinta a todo color mediante calor y presión. Aplica a botellas plásticas, termos con recubrimiento de polímero, tazas y una amplia variedad de promocionales.",
    usos: [
      "Botellas plásticas y termos deportivos",
      "Tazas y recipientes personalizados",
      "Rompecabezas, mouse pads y llaveros",
      "Playeras y promocionales textiles",
    ],
  },
  {
    id: "lonas",
    titulo: "Lonas",
    descripcion:
      "Impresión de gran formato en lona de alta resistencia. Perfectas para publicidad exterior, ferias, eventos y fachadas comerciales.",
    usos: [
      "Lonas publicitarias para exteriores",
      "Backdrops para eventos y ferias",
      "Pendones y banners promocionales",
      "Señalización para construcciones y obras",
    ],
  },
];

export default function Servicios() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-3xl">
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
          Nuestros <span className="text-[var(--accent)]">servicios</span>
        </h1>
        <p className="mt-4 text-lg text-[var(--muted-foreground)] leading-relaxed">
          Conoce cada uno de nuestros procesos de impresión y decoración sobre botellas, envases y promocionales.
        </p>
      </div>

      <div className="mt-16 space-y-20">
        {serviciosDetalle.map((srv, idx) => (
          <SectionReveal key={srv.id} delay={idx * 0.1}>
            <section
              id={srv.id}
              className="scroll-mt-20"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div>
                  <h2 className="font-heading text-2xl font-bold tracking-tight flex items-center gap-3">
                    {srv.titulo}
                    {srv.proximamente && (
                      <span className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-400">
                        Próximamente
                      </span>
                    )}
                  </h2>
                  <p className="mt-4 text-[var(--muted-foreground)] leading-relaxed">
                    {srv.descripcion}
                  </p>
                </div>

                <div className="lg:col-span-2">
                  <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
                    <h3 className="text-sm font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-4">
                      Aplicaciones comunes
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {srv.usos.map((uso) => (
                        <div
                          key={uso}
                          className="flex items-start gap-2 text-sm text-[var(--muted-foreground)]"
                        >
                          <svg
                            className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--accent)]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {uso}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </SectionReveal>
        ))}
      </div>

      {/* CTA */}
      <SectionReveal delay={0}>
        <div className="mt-20 text-center border-t border-[var(--border)] pt-16">
          <h2 className="font-heading text-2xl font-bold">
            ¿No sabes qué servicio necesitas para tus botellas o envases?
          </h2>
          <p className="mt-3 text-[var(--muted-foreground)]">
            Contáctanos y te orientamos sin costo sobre el proceso de impresión ideal.
          </p>
          <Link
            href="/contacto"
            className="mt-6 inline-flex items-center rounded-lg bg-[var(--accent)] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[var(--accent)]/90 transition-colors"
          >
            Solicitar asesoría
          </Link>
        </div>
      </SectionReveal>
    </div>
  );
}
