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
    titulo: "Serigrafía",
    descripcion:
      "Tu marca merece verse impecable. Nuestra serigrafía industrial logra impresiones nítidas, duraderas y con colores sólidos que resisten el uso diario. Desde botellas de vidrio hasta envases cilíndricos, cada pieza recibe el mismo cuidado artesanal. Ideal para producciones en volumen donde la calidad no se negocia.",
    imagenes: [
      "/serigrafia-1.jpg",
      "/serigrafia-2.jpg",
      "/serigrafia-3.jpg",
    ],
    usos: [
      "Botellas de vidrio y plástico",
      "Termos y vasos",
      "Envases cosméticos",
      "Empaques premium",
      "Productos promocionales",
    ],
  },
  {
    id: "tampografia",
    titulo: "Tampografía",
    descripcion:
      "¿Necesitas imprimir en superficies curvas, irregulares o de difícil acceso? La tampografía es la solución precisa y versátil. Perfecta para detalles pequeños, logotipos finos y marcajes técnicos en tapas, bolígrafos, envases pequeños y piezas industriales.",
    imagenes: [
      "/tampografia-1.jpg",
    ],
    usos: [
      "Tapas y cápsulas",
      "Bolígrafos y llaveros",
      "Envases pequeños",
      "Piezas industriales",
      "Electrónicos",
    ],
  },
  {
    id: "grabado-laser",
    titulo: "Grabado láser",
    descripcion:
      "Elegancia permanente. El grabado láser marca tus productos con una precisión imposible de igualar. Sin tintas, sin desgaste: solo luz y material fundidos en un acabado premium. Ideal para branding de alto impacto en termos, botellas metálicas y regalos corporativos que hablan por sí solos.",
    imagenes: [
      "/grabado-1.jpg",
    ],
    usos: [
      "Termos y botellas metálicas",
      "Placas y reconocimientos",
      "Regalos corporativos",
      "Artículos de piel",
      "Madera y acrílico",
    ],
  },
  {
    id: "sublimacion",
    titulo: "Sublimación",
    descripcion:
      "Colores vibrantes que no se despintan. La sublimación fusiona la tinta con el material a nivel molecular, creando impresiones fotográficas resistentes al lavado y al tiempo. Perfecta para tazas, botellas plásticas y artículos promocionales a todo color.",
    imagenes: [
      "/sublimacion-1.jpg",
    ],
    usos: [
      "Tazas y termos plásticos",
      "Playeras deportivas",
      "Rompecabezas y mousepads",
      "Artículos promocionales",
      "Regalos personalizados",
    ],
  },
  {
    id: "lonas",
    titulo: "Lonas",
    descripcion:
      "Comunica en grande. Nuestras lonas publicitarias de alta resistencia están diseñadas para exteriores exigentes: sol, lluvia y viento. Impresión de gran formato con colores intensos que capturan la atención. Desde ferias hasta fachadas comerciales.",
    imagenes: [
      "/lonas-1.jpg",
    ],
    usos: [
      "Publicidad exterior",
      "Backdrops para eventos",
      "Pendones y banners",
      "Ferias y exposiciones",
      "Señalización de obra",
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
              <div className="space-y-6">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                    {srv.titulo}
                  </h2>
                </div>

                <p className="text-base sm:text-lg text-[var(--muted-foreground)] leading-relaxed max-w-3xl">
                  {srv.descripcion}
                </p>

                <div className={srv.imagenes.length > 1 ? "overflow-x-auto flex gap-4 snap-x mandatory py-2" : "py-2"}>
                  {srv.imagenes.map((imgSrc, imgIdx) => (
                    <img
                      key={imgIdx}
                      src={imgSrc}
                      alt={`${srv.titulo} - Muestra ${imgIdx + 1}`}
                      className={srv.imagenes.length > 1
                        ? "w-64 sm:w-80 h-48 flex-shrink-0 rounded-xl object-contain snap-center shadow-md bg-white p-2"
                        : "w-full max-h-64 rounded-xl object-contain shadow-md bg-white p-4"
                      }
                    />
                  ))}
                </div>

                <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
                  <h3 className="text-sm font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-4">
                    Ideal para:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
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
            </section>
          </SectionReveal>
        ))}
      </div>

      {/* CTA */}
      <SectionReveal delay={0}>
        <div className="mt-20 text-center border-t border-[var(--border)] pt-16">
          <h2 className="font-heading text-2xl font-bold">
            ¿No sabes qué servicio necesitas?
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

