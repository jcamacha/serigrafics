import type { Metadata } from "next";
import Link from "next/link";
import OrderForm from "@/components/futuro/OrderForm";

export const metadata: Metadata = {
  title: "Vaso Cubero Personalizado — Serigrafics",
  description: "Personaliza vasos cuberos de vidrio con sublimación a todo color. Ideal para eventos y marcas.",
};

const colores = [
  { id: "cristal", label: "Cristal Transparente" },
  { id: "satinado", label: "Satinado / Frost" },
];

const cantidades = [
  { id: "12", label: "12 piezas", precio: 85 },
  { id: "36", label: "36 piezas", precio: 80 },
  { id: "72", label: "72 piezas", precio: 75 },
  { id: "144", label: "144 piezas", precio: 70 },
];

export default function VasoCuberoPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Volver */}
      <div className="mb-8">
        <Link
          href="/productos"
          className="inline-flex items-center text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
        >
          <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver a productos
        </Link>
      </div>

      {/* Grid principal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Info del producto */}
        <div className="lg:col-span-6 space-y-8">
          <div className="flex items-center justify-center bg-[var(--muted)]/30 rounded-2xl border border-[var(--border)] h-80 sm:h-96">
            <span className="text-9xl select-none" role="img" aria-label="Vaso cubero">
              🥤
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] bg-[var(--muted)] px-2.5 py-1 rounded-md">
                Sublimación
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-green-500 bg-green-500/10 px-2.5 py-1 rounded-md">
                Desde $85 MXN
              </span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">
              Vaso cubero
            </h1>
            <p className="mt-4 text-base text-[var(--muted-foreground)] leading-relaxed">
              El vaso cubero es un clásico indiscutible para eventos, bares y celebraciones de marca. Fabricado con vidrio templado de alta resistencia, permite plasmar diseños vibrantes con la técnica de sublimación a todo color. Perfectos para mantener la presencia de tu marca en cada brindis.
            </p>
          </div>

          <div className="border-t border-[var(--border)] pt-8">
            <h2 className="font-heading text-lg font-semibold mb-4">Especificaciones</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div className="border-b border-[var(--border)]/50 pb-2">
                <dt className="text-[var(--muted-foreground)]">Material</dt>
                <dd className="font-medium mt-1">Vidrio de alta resistencia</dd>
              </div>
              <div className="border-b border-[var(--border)]/50 pb-2">
                <dt className="text-[var(--muted-foreground)]">Capacidad</dt>
                <dd className="font-medium mt-1">10 oz (approx. 300 ml)</dd>
              </div>
              <div className="border-b border-[var(--border)]/50 pb-2">
                <dt className="text-[var(--muted-foreground)]">Área de impresión</dt>
                <dd className="font-medium mt-1">Impresión cilíndrica completa</dd>
              </div>
              <div className="border-b border-[var(--border)]/50 pb-2">
                <dt className="text-[var(--muted-foreground)]">Cuidado</dt>
                <dd className="font-medium mt-1">Lavado a mano recomendado</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Formulario de pedido */}
        <div className="lg:col-span-6 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 h-fit shadow-sm">
          <OrderForm
            productoNombre="Vaso cubero"
            precioBase={85}
            colores={colores}
            cantidades={cantidades}
          />
        </div>
      </div>
    </div>
  );
}
