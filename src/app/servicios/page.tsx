import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios — Más Imagen",
  description:
    "Serigrafía, grabado láser, sublimación, lonas y tampografía. Conoce todos nuestros servicios de impresión.",
};

const serviciosDetalle = [
  {
    id: "serigrafia",
    titulo: "Serigrafía",
    descripcion:
      "Técnica de impresión milenaria perfeccionada. Utilizamos mallas de alta precisión para transferir tinta a casi cualquier superficie: textiles, plásticos, vidrio, metal y más.",
    usos: [
      "Playeras, uniformes y ropa corporativa",
      "Botellas, vasos y artículos promocionales",
      "Señalización y letreros industriales",
      "Etiquetas y empaques personalizados",
    ],
    destacado: true,
  },
  {
    id: "tampografia",
    titulo: "Tampografía",
    descripcion:
      "Sistema de impresión indirecta ideal para superficies irregulares, curvas o de difícil acceso. Próximamente disponible en nuestro taller.",
    usos: [
      "Artículos promocionales (plumas, llaveros, USBs)",
      "Piezas industriales y médicas",
      "Juguetes y artículos deportivos",
      "Electrónicos y carcasas",
    ],
    proximamente: true,
  },
  {
    id: "grabado-laser",
    titulo: "Grabado láser",
    descripcion:
      "Marcado de alta precisión con tecnología láser. Ideal para personalización permanente en metal, madera, acrílico, cuero y más materiales.",
    usos: [
      "Trofeos, placas y reconocimientos",
      "Artículos de piel: carteras, cinturones, porta documentos",
      "Señalización corporativa y letreros",
      "Personalización de regalos empresariales",
    ],
  },
  {
    id: "sublimacion",
    titulo: "Sublimación",
    descripcion:
      "Transferencia de tinta a todo color mediante calor y presión. Los colores penetran el material, creando impresiones vibrantes que no se agrietan ni se despintan.",
    usos: [
      "Playeras, gorras y ropa deportiva",
      "Tazas, termos y botellas",
      "Rompecabezas, mouse pads y llaveros",
      "Playeras conmemorativas para eventos",
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
          Conoce cada uno de nuestros procesos. Todos los trabajos se realizan
          con materiales de calidad y atención personalizada.
        </p>
      </div>

      <div className="mt-16 space-y-20">
        {serviciosDetalle.map((srv) => (
          <section
            key={srv.id}
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
        ))}
      </div>

      {/* CTA */}
      <div className="mt-20 text-center border-t border-[var(--border)] pt-16">
        <h2 className="font-heading text-2xl font-bold">
          ¿No sabes qué servicio necesitas?
        </h2>
        <p className="mt-3 text-[var(--muted-foreground)]">
          Contáctanos y te orientamos sin costo.
        </p>
        <Link
          href="/contacto"
          className="mt-6 inline-flex items-center rounded-lg bg-[var(--accent)] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[var(--accent)]/90 transition-colors"
        >
          Solicitar asesoría
        </Link>
      </div>
    </div>
  );
}
