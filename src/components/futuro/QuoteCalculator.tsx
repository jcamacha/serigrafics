// ============================================================
// QuoteCalculator — Calculadora de cotización instantánea
// Rediseñado al estilo RealThread con control por pills,
// tabla de tiers completa, y efecto de blur dinámico.
// ============================================================

"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Tipos ---
type Proceso = "serigrafia" | "bordado";
type TipoBordado = "standard" | "puff";
type Ubicacion = "frente" | "atras" | "manga-izq" | "manga-der";

interface PrecioTier {
  basePrice: number;
  extraLocationCost: number;
}

// --- Matriz de precios (PRICING_MATRIX con tiered pricing) ---
const PRICING_MATRIX: Record<Proceso, Record<string, Record<string, PrecioTier>>> = {
  serigrafia: {
    estandar: {
      "10-24":  { basePrice: 85, extraLocationCost: 25 },
      "25-49":  { basePrice: 72, extraLocationCost: 22 },
      "50-99":  { basePrice: 58, extraLocationCost: 18 },
      "100-249":{ basePrice: 45, extraLocationCost: 15 },
      "250-499":{ basePrice: 38, extraLocationCost: 12 },
      "500+":   { basePrice: 32, extraLocationCost: 10 },
      "5000+":  { basePrice: 0,  extraLocationCost: 0  },
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
      "5000+":  { basePrice: 0,  extraLocationCost: 0  },
    },
    puff: {
      "50-99":  { basePrice: 78, extraLocationCost: 28 },
      "100-249":{ basePrice: 65, extraLocationCost: 22 },
      "250-499":{ basePrice: 55, extraLocationCost: 18 },
      "500+":   { basePrice: 48, extraLocationCost: 15 },
      "5000+":  { basePrice: 0,  extraLocationCost: 0  },
    },
  },
};

const QUANTITY_TIERS = ["10-24", "25-49", "50-99", "100-249", "250-499", "500+", "5000+"];

const TIER_LABELS: Record<string, string> = {
  "10-24": "10 – 24",
  "25-49": "25 – 49",
  "50-99": "50 – 99",
  "100-249": "100 – 249",
  "250-499": "250 – 499",
  "500+": "500 – 4,999",
  "5000+": "5,000+",
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
  const [isBlurring, setIsBlurring] = useState(false);

  // Helper para disparar el efecto blur
  const triggerBlur = () => {
    setIsBlurring(true);
    const timer = setTimeout(() => {
      setIsBlurring(false);
    }, 300);
    return timer;
  };

  const handleProcesoChange = (proc: Proceso) => {
    setProceso(proc);
    const timer = triggerBlur();
    // Restricción para Puff (mínimo 50)
    if (proc === "bordado" && tipoBordado === "puff" && (quantityTier === "10-24" || quantityTier === "25-49")) {
      setQuantityTier("50-99");
    }
    return () => clearTimeout(timer);
  };

  const handleTipoBordadoChange = (tipo: TipoBordado) => {
    setTipoBordado(tipo);
    const timer = triggerBlur();
    // Restricción para Puff (mínimo 50)
    if (tipo === "puff" && (quantityTier === "10-24" || quantityTier === "25-49")) {
      setQuantityTier("50-99");
    }
    return () => clearTimeout(timer);
  };

  const handleQuantityChange = (tier: string) => {
    // Si es Puff y seleccionan menos de 50, ignorar o no permitir
    if (proceso === "bordado" && tipoBordado === "puff" && (tier === "10-24" || tier === "25-49")) {
      return;
    }
    setQuantityTier(tier);
    const timer = triggerBlur();
    return () => clearTimeout(timer);
  };

  const toggleUbicacion = (loc: Ubicacion) => {
    setUbicaciones((prev) =>
      prev.includes(loc)
        ? prev.length > 1 ? prev.filter((u) => u !== loc) : prev
        : [...prev, loc]
    );
    const timer = triggerBlur();
    return () => clearTimeout(timer);
  };

  // Calcular tabla de precios completa
  const priceBreakdown = useMemo(() => {
    const locs = ubicaciones.length;
    return QUANTITY_TIERS.map((tier) => {
      if (tier === "5000+") {
        return {
          tier,
          unitPrice: null,
          total: null,
        };
      }

      // Si es bordado Puff, los tiers menores a 50 no están disponibles
      if (proceso === "bordado" && tipoBordado === "puff" && (tier === "10-24" || tier === "25-49")) {
        return {
          tier,
          unitPrice: 0,
          total: 0,
          disabled: true,
        };
      }

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

      // El total se calcula con el MÍNIMO del rango (ej: para 50-99, usa 50)
      const qtyMin = parseInt(tier.replace("+", "").split("-")[0]) || 10;
      return {
        tier,
        unitPrice,
        total: unitPrice * qtyMin,
        disabled: false,
      };
    });
  }, [proceso, tipoBordado, ubicaciones]);

  const active = priceBreakdown.find((p) => p.tier === quantityTier) || {
    unitPrice: 0,
    total: 0,
    disabled: false,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Columna Izquierda: Controles (2/3) */}
        <div className="lg:col-span-2 space-y-8 bg-[var(--card)] p-6 rounded-2xl border border-[var(--border)] shadow-sm">
          {/* 1. Production Process */}
          <div>
            <h3 className="text-base font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent)]/10 text-xs font-bold text-[var(--accent)]">
                1
              </span>
              Proceso de producción
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {([
                { id: "serigrafia" as Proceso, label: "Serigrafía (Print)", desc: "Ideal para tirajes grandes y diseños vibrantes", icon: "🖨️" },
                { id: "bordado" as Proceso, label: "Bordado (Embroidery)", desc: "Acabado elegante y de alta durabilidad", icon: "🧵" },
              ]).map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleProcesoChange(p.id)}
                  className={`p-5 rounded-xl border text-left flex gap-4 items-start transition-all hover:shadow-md ${
                    proceso === p.id
                      ? "border-[var(--accent)] ring-2 ring-[var(--accent)] bg-[var(--accent)]/5"
                      : "border-[var(--border)] hover:border-[var(--muted-foreground)] bg-transparent"
                  }`}
                >
                  <span className="text-3xl mt-1">{p.icon}</span>
                  <div>
                    <p className="font-bold text-base text-[var(--foreground)]">{p.label}</p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1 leading-normal">{p.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Tipo de Bordado (Condicional) */}
          {proceso === "bordado" && (
            <div className="animate-dropdown">
              <h3 className="text-base font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent)]/10 text-xs font-bold text-[var(--accent)]">
                  2
                </span>
                Tipo de bordado
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {([
                  { id: "standard" as TipoBordado, label: "Estándar", desc: "Puntada plana clásica de alta definición" },
                  { id: "puff" as TipoBordado, label: "Puff 3D (Mínimo 50 pcs)", desc: "Bordado realzado tridimensional premium" },
                ]).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleTipoBordadoChange(t.id)}
                    className={`p-4 rounded-xl border text-left flex flex-col transition-all hover:shadow-sm ${
                      tipoBordado === t.id
                        ? "border-[var(--accent)] ring-2 ring-[var(--accent)] bg-[var(--accent)]/5"
                        : "border-[var(--border)] hover:border-[var(--muted-foreground)] bg-transparent"
                    }`}
                  >
                    <p className="font-bold text-sm text-[var(--foreground)]">{t.label}</p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1 leading-normal">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3. Quantity: Pills Redondeados */}
          <div>
            <h3 className="text-base font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent)]/10 text-xs font-bold text-[var(--accent)]">
                {proceso === "bordado" ? 3 : 2}
              </span>
              Cantidad de piezas
            </h3>
            <div className="flex flex-wrap gap-2">
              {QUANTITY_TIERS.map((tier) => {
                const isSelected = quantityTier === tier;
                const isPuffDisabled = proceso === "bordado" && tipoBordado === "puff" && (tier === "10-24" || tier === "25-49");
                return (
                  <button
                    key={tier}
                    disabled={isPuffDisabled}
                    onClick={() => handleQuantityChange(tier)}
                    className={`px-5 py-2.5 rounded-full border text-sm font-semibold transition-all ${
                      isPuffDisabled
                        ? "opacity-30 cursor-not-allowed border-[var(--border)] bg-[var(--muted)] text-[var(--muted-foreground)]"
                        : isSelected
                        ? "bg-[var(--accent)] text-white border-[var(--accent)] shadow-sm scale-105"
                        : "bg-transparent border-[var(--border)] text-[var(--foreground)] hover:border-[var(--muted-foreground)]"
                    }`}
                  >
                    {TIER_LABELS[tier] || tier}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Print Locations */}
          <div>
            <h3 className="text-base font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent)]/10 text-xs font-bold text-[var(--accent)]">
                {proceso === "bordado" ? 4 : 3}
              </span>
              Ubicaciones a personalizar
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {UBICACIONES.map((loc) => {
                const isSelected = ubicaciones.includes(loc.id);
                return (
                  <button
                    key={loc.id}
                    onClick={() => toggleUbicacion(loc.id)}
                    className={`py-3.5 px-4 rounded-xl border text-sm font-semibold transition-all flex justify-between items-center ${
                      isSelected
                        ? "border-[var(--accent)] ring-2 ring-[var(--accent)] bg-[var(--accent)]/5 text-[var(--foreground)] font-bold"
                        : "border-[var(--border)] hover:border-[var(--muted-foreground)] bg-transparent text-[var(--muted-foreground)]"
                    }`}
                  >
                    <span>{loc.label}</span>
                    <span
                      className={`w-5 h-5 rounded-full border flex items-center justify-center text-[11px] ${
                        isSelected
                          ? "bg-[var(--accent)] border-[var(--accent)] text-white font-bold"
                          : "border-[var(--border)]"
                      }`}
                    >
                      {isSelected && "✓"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Columna Derecha: Sidebar de Precios (1/3) */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--muted)] p-6 sticky top-24 shadow-sm">
            <h3 className="text-sm font-bold text-[var(--muted-foreground)] uppercase tracking-wider">
              Tu cotización instantánea:
            </h3>

            {/* Precio Total Grande con Efecto Blur */}
            <div className={`mt-4 transition-all duration-300 ${isBlurring ? "blur-md" : ""}`}>
              {active.total === null ? (
                <p className="font-heading text-4xl font-black text-[var(--foreground)] tracking-tight">
                  Contáctanos
                </p>
              ) : (
                <p className="font-heading text-4xl sm:text-5xl font-black text-[var(--foreground)] tracking-tight">
                  ${active.total.toLocaleString("es-MX")}{" "}
                  <span className="text-lg font-normal text-[var(--muted-foreground)]">MXN</span>
                </p>
              )}

              {active.total !== null && (
                <p className="text-xs text-[var(--muted-foreground)] mt-2 font-medium">
                  ${active.unitPrice} / pieza &middot; {ubicaciones.length} ubicación(es)
                </p>
              )}
            </div>

            {/* Tabla de precios por volumen (Tiers mostrados simultáneamente) */}
            <div className="mt-8">
              <div className="grid grid-cols-3 text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider pb-3 border-b border-[var(--border)] px-2">
                <span>Cantidad</span>
                <span className="text-center">Precio/Pz</span>
                <span className="text-right">Total Est.</span>
              </div>
              <div className={`mt-2 space-y-1 transition-all duration-300 ${isBlurring ? "blur-md" : ""}`}>
                {priceBreakdown.map((row) => {
                  const isCurrent = row.tier === quantityTier;
                  if (row.disabled) {
                    return (
                      <div
                        key={row.tier}
                        className="grid grid-cols-3 text-xs py-2 px-2 rounded-lg opacity-25 cursor-not-allowed select-none bg-transparent"
                      >
                        <span className="font-medium">{TIER_LABELS[row.tier] || row.tier}</span>
                        <span className="text-center">—</span>
                        <span className="text-right">—</span>
                      </div>
                    );
                  }

                  const isContact = row.tier === "5000+";

                  return (
                    <button
                      key={row.tier}
                      onClick={() => handleQuantityChange(row.tier)}
                      className={`w-full grid grid-cols-3 text-xs py-2.5 px-3 rounded-lg transition-all text-left items-center ${
                        isCurrent
                          ? "bg-[var(--card)] shadow-sm font-bold text-[var(--foreground)] border-l-4 border-[var(--accent)]"
                          : "text-[var(--muted-foreground)] hover:bg-[var(--card)]/40 hover:text-[var(--foreground)]"
                      }`}
                    >
                      <span className="font-semibold">{TIER_LABELS[row.tier] || row.tier}</span>
                      <span className="text-center">
                        {isContact ? "Contacto" : `$${row.unitPrice}`}
                      </span>
                      <span className="text-right font-semibold">
                        {isContact ? "Contáctanos" : `$${row.total?.toLocaleString("es-MX")}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notas Informativas */}
            <div className="mt-6 pt-4 border-t border-[var(--border)] space-y-2">
              <p className="text-[11px] text-[var(--muted-foreground)] flex items-center gap-1.5 leading-relaxed">
                <span className="text-[var(--accent)] font-bold">&middot;</span>
                Pedidos 2XL+ tienen costo extra
              </p>
              <p className="text-[11px] text-[var(--muted-foreground)] flex items-center gap-1.5 leading-relaxed">
                <span className="text-[var(--accent)] font-bold">&middot;</span>
                Para el tier 5000+ mostrar &quot;Contáctanos para precio&quot;
              </p>
            </div>

            <button className="mt-6 w-full rounded-xl bg-[var(--accent)] px-6 py-4 text-sm font-bold text-white hover:bg-[var(--accent)]/90 transition-colors shadow-sm hover:shadow-md">
              Solicitar cotización formal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
