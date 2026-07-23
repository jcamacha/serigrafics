import type { Metadata } from "next";
import QuoteCalculator from "@/components/futuro/QuoteCalculator";

export const metadata: Metadata = {
  title: "Cotización — Serigrafics",
  description: "Calcula el costo estimado de tu pedido de forma instantánea. Ajusta las opciones y obtén un presupuesto de inmediato.",
};

export default function CotizacionPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
      {/* Encabezado */}
      <div className="max-w-2xl mb-12">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          Estimación en tiempo real
        </span>
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl mt-2">
          Calculadora de cotización
        </h1>
        <p className="mt-4 text-lg text-[var(--muted-foreground)]">
          Ajusta las opciones y obtén un estimado al instante
        </p>
      </div>

      {/* Calculadora */}
      <QuoteCalculator />
    </div>
  );
}
