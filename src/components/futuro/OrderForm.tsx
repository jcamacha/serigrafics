// ============================================================
// OrderForm — Componente para pedidos de productos estándar
// FUTURO: integrar cuando haya fotos y catálogo de productos
// Inspirado en barrelmakerprinting.com
// ============================================================

"use client";

import { useState } from "react";

interface ProductOption {
  id: string;
  label: string;
  precio?: number;
}

export interface OrderFormProps {
  productoNombre: string;
  precioBase: number;
  colores: ProductOption[];
  tallas?: ProductOption[];
  cantidades: ProductOption[];
}

export default function OrderForm({
  productoNombre,
  precioBase,
  colores,
  tallas = [{ id: "unica", label: "Única (ajustable)" }],
  cantidades,
}: OrderFormProps) {
  const [color, setColor] = useState(colores[0]?.id || "");
  const [talla, setTalla] = useState(tallas[0]?.id || "");
  const [cantidad, setCantidad] = useState(cantidades[0]?.id || "");
  const [tecnicas, setTecnicas] = useState<string[]>([]);

  const precioUnitario =
    cantidades.find((c) => c.id === cantidad)?.precio ||
    precioBase;
  const total = precioUnitario * parseInt(cantidad || "1");

  const toggleTecnica = (id: string) => {
    setTecnicas((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Producto */}
      <div>
        <h1 className="font-heading text-2xl font-bold">{productoNombre}</h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Personalización profesional para tu marca o evento.
        </p>
      </div>

      {/* Color */}
      {colores.length > 0 && (
        <div>
          <label className="block text-sm font-semibold mb-3">Color</label>
          <div className="flex flex-wrap gap-2">
            {colores.map((c) => (
              <button
                key={c.id}
                onClick={() => setColor(c.id)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                  color === c.id
                    ? "border-[var(--accent)] ring-1 ring-[var(--accent)] bg-[var(--accent)]/10"
                    : "border-[var(--border)] hover:border-[var(--muted-foreground)]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Talla */}
      {tallas.length > 0 && (
        <div>
          <label className="block text-sm font-semibold mb-3">Talla</label>
          <div className="flex flex-wrap gap-2">
            {tallas.map((t) => (
              <button
                key={t.id}
                onClick={() => setTalla(t.id)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                  talla === t.id
                    ? "border-[var(--accent)] ring-1 ring-[var(--accent)] bg-[var(--accent)]/10"
                    : "border-[var(--border)] hover:border-[var(--muted-foreground)]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Técnica de personalización */}
      <div>
        <label className="block text-sm font-semibold mb-3">
          Técnica de personalización
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: "serigrafia", label: "Serigrafía", desc: "Hasta 4 colores" },
            { id: "bordado", label: "Bordado", desc: "Hilos de alta calidad" },
            { id: "sublimacion", label: "Sublimación", desc: "Full color" },
            { id: "laser", label: "Grabado láser", desc: "Precisión permanente" },
          ].map((tec) => {
            const active = tecnicas.includes(tec.id);
            return (
              <button
                key={tec.id}
                onClick={() => toggleTecnica(tec.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  active
                    ? "border-[var(--accent)] ring-1 ring-[var(--accent)] bg-[var(--accent)]/5"
                    : "border-[var(--border)] hover:border-[var(--muted-foreground)]"
                }`}
              >
                <p className="font-semibold text-sm">{tec.label}</p>
                <p className="text-xs text-[var(--muted-foreground)] mt-1">
                  {tec.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cantidad */}
      {cantidades.length > 0 && (
        <div>
          <label className="block text-sm font-semibold mb-3">Cantidad</label>
          <div className="flex flex-wrap gap-2">
            {cantidades.map((c) => (
              <button
                key={c.id}
                onClick={() => setCantidad(c.id)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                  cantidad === c.id
                    ? "border-[var(--accent)] ring-1 ring-[var(--accent)] bg-[var(--accent)]/10"
                    : "border-[var(--border)] hover:border-[var(--muted-foreground)]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Resumen */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-[var(--muted-foreground)]">Precio unitario</span>
          <span className="font-semibold">${precioUnitario} MXN</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[var(--muted-foreground)]">Cantidad</span>
          <span className="font-semibold">{cantidad} piezas</span>
        </div>
        <div className="flex justify-between text-sm border-t border-[var(--border)] pt-3">
          <span className="font-semibold">Total estimado</span>
          <span className="font-heading text-lg font-bold text-[var(--accent)]">
            ${total.toLocaleString("es-MX")} MXN
          </span>
        </div>
      </div>

      <button className="w-full rounded-lg bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[var(--accent)]/90 transition-colors">
        Solicitar cotización formal
      </button>
    </div>
  );
}
