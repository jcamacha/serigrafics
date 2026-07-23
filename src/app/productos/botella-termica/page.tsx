import type { Metadata } from "next";
import Link from "next/link";
import OrderForm from "@/components/futuro/OrderForm";

export const metadata: Metadata = {
  title: "Botella Térmica Personalizada — Serigrafics",
  description: "Personaliza botellas térmicas de acero inoxidable con grabado láser de alta precisión.",
};

const colores = [
  { id: "negro-mate", label: "Negro Mate" },
  { id: "acero", label: "Acero Inoxidable" },
  { id: "azul-marino", label: "Azul Marino" },
  { id: "blanco", label: "Blanco" },
];

const cantidades = [
  { id: "6", label: "6 piezas", precio: 180 },
  { id: "12", label: "12 piezas", precio: 170 },
  { id: "24", label: "24 piezas", precio: 160 },
  { id: "48", label: "48 piezas", precio: 150 },
];

export default function BotellaTermicaPage() {
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
            <span className="text-9xl select-none" role="img" aria-label="Botella térmica">
              🧴
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] bg-[var(--muted)] px-2.5 py-1 rounded-md">
                Grabado láser
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-green-500 bg-green-500/10 px-2.5 py-1 rounded-md">
                Desde $180 MXN
              </span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">
              Botella térmica
            </h1>
            <p className="mt-4 text-base text-[var(--muted-foreground)] leading-relaxed">
              Botella térmica de doble pared construida en acero inoxidable de grado alimenticio. Equipada con tecnología de aislamiento al vacío para mantener tus bebidas frías hasta por 24 horas o calientes por 12 horas. El logotipo o diseño es grabado con láser de alta definición, removiendo la capa de pintura exterior para revelar un acabado metálico elegante y permanente.
            </p>
          </div>

          <div className="border-t border-[var(--border)] pt-8">
            <h2 className="font-heading text-lg font-semibold mb-4">Especificaciones</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div className="border-b border-[var(--border)]/50 pb-2">
                <dt className="text-[var(--muted-foreground)]">Material</dt>
                <dd className="font-medium mt-1">Acero Inoxidable 18/8 (Doble pared)</dd>
              </div>
              <div className="border-b border-[var(--border)]/50 pb-2">
                <dt className="text-[var(--muted-foreground)]">Capacidad</dt>
                <dd className="font-medium mt-1">500 ml</dd>
              </div>
              <div className="border-b border-[var(--border)]/50 pb-2">
                <dt className="text-[var(--muted-foreground)]">Tecnología de Marcado</dt>
                <dd className="font-medium mt-1">Grabado Láser permanente</dd>
              </div>
              <div className="border-b border-[var(--border)]/50 pb-2">
                <dt className="text-[var(--muted-foreground)]">Aislamiento</dt>
                <dd className="font-medium mt-1">Vacío (Sin condensación exterior)</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Formulario de pedido */}
        <div className="lg:col-span-6 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 h-fit shadow-sm">
          <OrderForm
            productoNombre="Botella térmica"
            precioBase={180}
            colores={colores}
            cantidades={cantidades}
          />
        </div>
      </div>
    </div>
  );
}
