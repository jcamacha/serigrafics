import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Productos — Más Imagen",
  description: "Catálogo de productos personalizables con técnicas de sublimación, grabado láser y serigrafía.",
};

const productos = [
  {
    slug: "vaso-cubero",
    nombre: "Vaso cubero",
    tecnica: "Sublimación",
    precio: "Desde $85 MXN",
    emoji: "🥤",
    desc: "Vaso de vidrio ideal para eventos, fiestas y promociones con personalización a todo color.",
  },
  {
    slug: "taza-ceramica",
    nombre: "Taza cerámica",
    tecnica: "Sublimación",
    precio: "Desde $95 MXN",
    emoji: "☕",
    desc: "Clásica taza de cerámica de 11oz, excelente para regalos corporativos o uso diario en la oficina.",
  },
  {
    slug: "botella-termica",
    nombre: "Botella térmica",
    tecnica: "Grabado láser",
    precio: "Desde $180 MXN",
    emoji: "🧴",
    desc: "Botella de acero inoxidable de doble pared que mantiene tus bebidas a la temperatura ideal.",
  },
  {
    slug: "playera-algodon",
    nombre: "Playera algodón",
    tecnica: "Serigrafía",
    precio: "Desde $120 MXN",
    emoji: "👕",
    desc: "Playera de algodón premium, suave y duradera, personalizada con serigrafía de alta definición.",
  },
];

export default function ProductosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
      {/* Encabezado */}
      <div className="max-w-2xl mb-12">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          Catálogo Exclusivo
        </span>
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl mt-2">
          Productos <span className="text-[var(--accent)]">Personalizados</span>
        </h1>
        <p className="mt-4 text-lg text-[var(--muted-foreground)]">
          Elige de nuestro catálogo de productos seleccionados y adáptalos a la identidad de tu marca o evento.
        </p>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {productos.map((prod) => (
          <div
            key={prod.slug}
            className="flex flex-col h-full rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden hover:border-[var(--accent)]/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            {/* Imagen Placeholder */}
            <div className="flex items-center justify-center bg-[var(--muted)]/30 h-64 border-b border-[var(--border)]">
              <span className="text-8xl select-none" role="img" aria-label={prod.nombre}>
                {prod.emoji}
              </span>
            </div>

            {/* Contenido */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] bg-[var(--muted)] px-2.5 py-1 rounded-md">
                  {prod.tecnica}
                </span>
                <span className="font-heading font-bold text-[var(--accent)] text-lg">
                  {prod.precio}
                </span>
              </div>
              <h2 className="mt-4 font-heading text-2xl font-bold text-[var(--foreground)]">
                {prod.nombre}
              </h2>
              <p className="mt-2 text-sm text-[var(--muted-foreground)] leading-relaxed flex-grow">
                {prod.desc}
              </p>
              <div className="mt-6">
                <Link
                  href={`/productos/${prod.slug}`}
                  className="inline-flex w-full items-center justify-center rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--accent)]/90 transition-colors"
                >
                  Personalizar
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
