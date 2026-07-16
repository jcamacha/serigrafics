// ============================================================
// QuoteCalculator — Calculadora de cotización instantánea
// FUTURO: integrar cuando haya matriz de precios real
// Estado reactivo + lookup table + renderizado condicional
// ============================================================

"use client";

import { useState, useMemo } from "react";

// --- Tipos ---
type Proceso = "serigrafia" | "bordado";
type TipoBordado = "standard" | "puff";
type Ubicacion = "frente" | "atras" | "manga-izq" | "manga-der";

interface PrecioTier {
  basePrice: number;
  extraLocationCost: number;
}

// --- Matriz de precios (placeholder — reemplazar con datos reales) ---
const PRICING_MATRIX: Record<Proceso, Record<string, Record<string, PrecioTier>>> = {
  serigrafia: {
    estandar: {
      "10-24":  { basePrice: 85, extraLocationCost: 25 },
      "25-49":  { basePrice: 72, extraLocationCost: 22 },
      "50-99":  { basePrice: 58, extraLocationCost: 18 },
      "100-249":{ basePrice: 45, extraLocationCost: 15 },
      "250-499":{ basePrice: 38, extraLocationCost: 12 },
      "500+":   { basePrice: 32, extraLocationCost: 10 },
    },
  },
  bordado: {
    standard: {
      "10-24":  { basePrice: 95, extraLocationCost: 30 },
      "25-49":  { basePrice: 82, extraLocationCost: 27 },
      "50-99":  { basePrice: 68, extraLocationCost: 22 },
      "100-249":{ basePrice: 55, extraLocationCost: 18 },
      "250-499":{ basePrice: 48, extraLocationCost: 15 },
      "500+":   { basePrice: 42, extraLocationCost: 12 },
    },
    puff: {
      "50-99":  { basePrice: 78, extraLocationCost: 28 },
      "100-249":{ basePrice: 65, extraLocationCost: 22 },
      "250-499":{ basePrice: 55, extraLocationCost: 18 },
      "500+":   { basePrice: 48, extraLocationCost: 15 },
    },
  },
};

const QUANTITY_TIERS = ["10-24", "25-49", "50-99", "100-249", "250-499", "500+"];

const TIER_LABELS: Record<string, string> = {
  "10-24": "10 – 24",
  "25-49": "25 – 49",
  "50-99": "50 – 99",
  "100-249": "100 – 249",
  "250-499": "250 – 499",
  "500+": "500+",
};

const UBICACIONES: { id: Ubicacion; label: string }[] = [
  { id: "frente", label: "Frente" },
  { id: "atras", label: "Atrás" },
  { id: "manga-izq", label: "Manga izq." },
  { id: "manga-der", label: "Manga der." },
];

export default function QuoteCalculator() {
  const [quantityTier, setQuantityTier] = useState("50-99");
  const [proceso, setProceso] = useState<Proceso>("serigrafia");
  const [tipoBordado, setTipoBordado] = useState<TipoBordado>("standard");
  const [ubicaciones, setUbicaciones] = useState<Ubicacion[]>(["frente"]);

  const toggleUbicacion = (loc: Ubicacion) => {
    setUbicaciones((prev) =>
      prev.includes(loc)
        ? prev.length > 1 ? prev.filter((u) => u !== loc) : prev
        : [...prev, loc]
    );
  };

  const priceBreakdown = useMemo(() => {
    const locs = ubicaciones.length;
    return QUANTITY_TIERS.map((tier) => {
      let unitPrice = 0;
      try {
        const categoria = proceso === "bordado" ? tipoBordado : "estandar";
        const pricing = PRICING_MATRIX[proceso]?.[categoria]?.[tier];
        if (pricing) {
          unitPrice = pricing.basePrice + pricing.extraLocationCost * (locs - 1);
        }
      } catch {
        unitPrice = 0;
      }
      const qtyMin = parseInt(tier.split("-")[0]) || 500;
      return {
        tier,
        unitPrice,
        total: unitPrice * qtyMin,
      };
    });
  }, [proceso, tipoBordado, ubicaciones]);

  const active = priceBreakdown.find((p) => p.tier === quantityTier) || {
    unitPrice: 0,
    total: 0,
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Controles */}
        <div className="lg:col-span-3 space-y-8">
          {/* Proceso */}
          <div>
            <label className="block text-sm font-semibold mb-3">
              Proceso de producción
            </label>
            <div className="grid grid-cols-2 gap-3">
              {([
                { id: "serigrafia" as Proceso, label: "Serigrafía", desc: "Tintas base agua de alta calidad", icon: "👕" },
                { id: "bordado" as Proceso, label: "Bordado", desc: "Hilo de algodón combinado", icon: "🧵" },
              ]).map((p) => (
                <button
                  key={p.id}
                  onClick={() => setProceso(p.id)}
                  className={`p-4 rounded-xl border text-left flex gap-3 items-center transition-all ${
                    proceso === p.id
                      ? "border-[var(--accent)] ring-1 ring-[var(--accent)]"
                      : "border-[var(--border)] hover:border-[var(--muted-foreground)]"
                  }`}
                >
                  <span className="text-2xl">{p.icon}</span>
                  <div>
                    <p className="font-bold text-sm">{p.label}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">{p.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tipo de bordado (condicional) */}
          {proceso === "bordado" && (
            <div className="animate-dropdown">
              <label className="block text-sm font-semibold mb-3">
                Tipo de bordado
              </label>
              <div className="grid grid-cols-2 gap-3">
                {([
                  { id: "standard" as TipoBordado, label: "Estándar", desc: "Puntada plana clásica" },
                  { id: "puff" as TipoBordado, label: "Puff 3D", desc: "Realzado tridimensional" },
                ]).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTipoBordado(t.id)}
                    className={`p-4 rounded-xl border text-left flex gap-3 items-center transition-all ${
                      tipoBordado === t.id
                        ? "border-[var(--accent)] ring-1 ring-[var(--accent)]"
                        : "border-[var(--border)] hover:border-[var(--muted-foreground)]"
                    }`}
                  >
                    <div>
                      <p className="font-bold text-sm">{t.label}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">{t.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Ubicaciones */}
          <div>
            <label className="block text-sm font-semibold mb-3">
              Ubicaciones de impresión
            </label>
            <div className="grid grid-cols-4 gap-2">
              {UBICACIONES.map((loc) => {
                const sel = ubicaciones.includes(loc.id);
                return (
                  <button
                    key={loc.id}
                    onClick={() => toggleUbicacion(loc.id)}
                    className={`py-2.5 px-3 rounded-lg border text-sm font-medium transition-all flex justify-between items-center ${
                      sel
                        ? "border-[var(--accent)] ring-1 ring-[var(--accent)] bg-[var(--accent)]/5"
                        : "border-[var(--border)] hover:border-[var(--muted-foreground)]"
                    }`}
                  >
                    <span>{loc.label}</span>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                        sel
                          ? "bg-[var(--accent)] border-[var(--accent)] text-white"
                          : "border-[var(--border)]"
                      }`}
                    >
                      {sel && "✓"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sticky top-24">
            <p className="text-xs text-[var(--muted-foreground)] font-semibold uppercase tracking-wider">
              Tu cotización
            </p>
            <p className="mt-1 font-heading text-3xl font-bold">
              ${active.total.toLocaleString("es-MX")} <span className="text-sm font-normal text-[var(--muted-foreground)]">MXN</span>
            </p>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">
              ${active.unitPrice} / pieza &middot; {ubicaciones.length} ubicación(es)
            </p>

            {/* Tabla de precios por volumen */}
            <div className="mt-6 space-y-2">
              <div className="grid grid-cols-3 text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider pb-2 border-b border-[var(--border)]">
                <span>Cantidad</span>
                <span>Precio / pieza</span>
                <span className="text-right">Total</span>
              </div>
              <div className="max-h-[280px] overflow-y-auto space-y-0.5">
                {priceBreakdown.map((row) => {
                  const isCurrent = row.tier === quantityTier;
                  return (
                    <button
                      key={row.tier}
                      onClick={() => setQuantityTier(row.tier)}
                      className={`w-full grid grid-cols-3 text-xs py-2 px-2 rounded-lg transition-all text-left ${
                        isCurrent
                          ? "bg-[var(--accent)]/10 font-bold text-[var(--foreground)]"
                          : "text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
                      }`}
                    >
                      <span>{TIER_LABELS[row.tier] || row.tier}</span>
                      <span>${row.unitPrice}</span>
                      <span className="text-right">
                        ${row.total.toLocaleString("es-MX")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button className="mt-6 w-full rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--accent)]/90 transition-colors">
              Solicitar cotización formal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
