import type { Metadata } from "next";
import Link from "next/link";
import OrderForm from "@/components/futuro/OrderForm";

export const metadata: Metadata = {
  title: "Playera Algodón Personalizada — Más Imagen",
  description: "Personaliza playeras de algodón premium con serigrafía tradicional de alta definición.",
};

const colores = [
  { id: "negro", label: "Negro" },
  { id: "blanco", label: "Blanco" },
  { id: "gris-jaspe", label: "Gris Jaspe" },
  { id: "azul-marino", label: "Azul Marino" },
];

const tallas = [
  { id: "chica", label: "Chica (S)" },
  { id: "mediana", label: "Mediana (M)" },
  { id: "grande", label: "Grande (L)" },
  { id: "extra-grande", label: "Extra Grande (XL)" },
];

const cantidades = [
  { id: "12", label: "12 piezas", precio: 120 },
  { id: "36", label: "36 piezas", precio: 110 },
  { id: "72", label: "72 piezas", precio: 100 },
  { id: "144", label: "144 piezas", precio: 90 },
];

export default function PlayeraAlgodonPage() {
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
            <span className="text-9xl select-none" role="img" aria-label="Playera algodón">
              👕
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] bg-[var(--muted)] px-2.5 py-1 rounded-md">
                Serigrafía
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-green-500 bg-green-500/10 px-2.5 py-1 rounded-md">
                Desde $120 MXN
              </span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">
              Playera algodón
            </h1>
            <p className="mt-4 text-base text-[var(--muted-foreground)] leading-relaxed">
              Playera de algodón 100% de peso completo, diseñada para ofrecer la máxima durabilidad y suavidad al tacto. Ideal para uniformar a tu equipo de trabajo, promocionar campañas masivas o lanzar tu propia línea de ropa. Empleamos serigrafía textil tradicional con tintas ecológicas de alta opacidad y registro perfecto que garantizan que el estampado no se agriete ni pierda color tras las lavadas.
            </p>
          </div>

          <div className="border-t border-[var(--border)] pt-8">
            <h2 className="font-heading text-lg font-semibold mb-4">Especificaciones</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div className="border-b border-[var(--border)]/50 pb-2">
                <dt className="text-[var(--muted-foreground)]">Composición</dt>
                <dd className="font-medium mt-1">100% Algodón (Gris Jaspe: 90% Algodón, 10% Poliéster)</dd>
              </div>
              <div className="border-b border-[var(--border)]/50 pb-2">
                <dt className="text-[var(--muted-foreground)]">Peso del tejido</dt>
                <dd className="font-medium mt-1">200 g/m² (Peso Completo)</dd>
              </div>
              <div className="border-b border-[var(--border)]/50 pb-2">
                <dt className="text-[var(--muted-foreground)]">Área Máxima de Estampado</dt>
                <dd className="font-medium mt-1">35 cm x 45 cm (Frente o Espalda)</dd>
              </div>
              <div className="border-b border-[var(--border)]/50 pb-2">
                <dt className="text-[var(--muted-foreground)]">Técnica Recomendada</dt>
                <dd className="font-medium mt-1">Serigrafía (Hasta 4 colores sólidos)</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Formulario de pedido */}
        <div className="lg:col-span-6 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 h-fit shadow-sm">
          <OrderForm
            productoNombre="Playera algodón"
            precioBase={120}
            colores={colores}
            tallas={tallas}
            cantidades={cantidades}
          />
        </div>
      </div>
    </div>
  );
}
