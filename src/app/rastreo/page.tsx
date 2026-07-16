// Página de rastreo — Fase 2 (integrada)
// Punto de separación: eliminar src/app/rastreo/ completo

"use client";

import { useState, FormEvent } from "react";

interface ResultadoRastreo {
  numero_guia: string;
  estado: string;
  fecha_envio: string | null;
  paqueteria: string;
  cliente_nombre: string;
  updated_at: string;
}

const ESTADOS: Record<string, { label: string; color: string; paso: number }> =
  {
    pendiente: { label: "Pendiente", color: "bg-zinc-600", paso: 0 },
    en_produccion: {
      label: "En producción",
      color: "bg-blue-600",
      paso: 1,
    },
    enviado: { label: "Enviado", color: "bg-amber-500", paso: 2 },
    en_transito: { label: "En tránsito", color: "bg-amber-500", paso: 3 },
    entregado: { label: "Entregado", color: "bg-green-600", paso: 4 },
    cancelado: { label: "Cancelado", color: "bg-red-600", paso: -1 },
  };

const PASOS = ["Pendiente", "En producción", "Enviado", "En tránsito", "Entregado"];

export default function Rastreo() {
  const [guia, setGuia] = useState("");
  const [resultado, setResultado] = useState<ResultadoRastreo | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function consultar(e: FormEvent) {
    e.preventDefault();
    setError("");
    setResultado(null);

    if (guia.trim().length < 3) {
      setError("Ingresa un número de guía válido.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/rastreo?guia=${encodeURIComponent(guia.trim())}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al consultar.");
        return;
      }

      setResultado(data);
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  const estadoInfo = resultado ? ESTADOS[resultado.estado] : null;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-lg mx-auto">
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl text-center">
          Rastrea tu <span className="text-[var(--accent)]">pedido</span>
        </h1>
        <p className="mt-4 text-[var(--muted-foreground)] text-center">
          Ingresa tu número de guía para conocer el estado de tu envío.
        </p>

        <form onSubmit={consultar} className="mt-8 space-y-4">
          <input
            type="text"
            value={guia}
            onChange={(e) => setGuia(e.target.value)}
            placeholder="Ej: MX-2026-000142"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-center text-lg font-mono tracking-wider text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--accent)]/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Consultando..." : "Consultar estado"}
          </button>
        </form>

        {/* Resultado */}
        {(resultado || error) && (
          <div className="mt-10">
            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-center">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {resultado && estadoInfo && (
              <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-6">
                {/* Guía + nombre */}
                <div className="text-center">
                  <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider">
                    Guía
                  </p>
                  <p className="mt-1 font-mono text-lg font-semibold">
                    {resultado.numero_guia}
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                    {resultado.cliente_nombre}
                  </p>
                </div>

                {/* Barra de progreso */}
                {resultado.estado !== "cancelado" && (
                  <div className="flex items-center justify-between">
                    {PASOS.map((paso, i) => {
                      const activo = estadoInfo.paso >= i;
                      const actual = estadoInfo.paso === i;
                      return (
                        <div key={paso} className="flex items-center flex-1 last:flex-none">
                          <div className="flex flex-col items-center">
                            <div
                              className={`h-4 w-4 rounded-full border-2 transition-colors ${
                                actual
                                  ? "border-[var(--accent)] bg-[var(--accent)]"
                                  : activo
                                  ? "border-green-500 bg-green-500"
                                  : "border-[var(--border)] bg-transparent"
                              }`}
                            />
                            <span
                              className={`mt-2 text-[10px] leading-tight text-center max-w-[60px] ${
                                activo
                                  ? "text-[var(--foreground)]"
                                  : "text-[var(--muted-foreground)]"
                              }`}
                            >
                              {paso}
                            </span>
                          </div>
                          {i < PASOS.length - 1 && (
                            <div
                              className={`flex-1 h-0.5 mx-1 transition-colors ${
                                estadoInfo.paso > i
                                  ? "bg-green-500"
                                  : "bg-[var(--border)]"
                              }`}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Detalles */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--border)]">
                  <div>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      Paquetería
                    </p>
                    <p className="text-sm font-medium">
                      {resultado.paqueteria}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      Fecha de envío
                    </p>
                    <p className="text-sm font-medium">
                      {resultado.fecha_envio
                        ? new Date(resultado.fecha_envio).toLocaleDateString(
                            "es-MX",
                            { year: "numeric", month: "long", day: "numeric" }
                          )
                        : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      Estado
                    </p>
                    <span
                      className={`inline-block mt-0.5 rounded-full px-2.5 py-0.5 text-xs font-medium text-white ${estadoInfo.color}`}
                    >
                      {estadoInfo.label}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      Última actualización
                    </p>
                    <p className="text-sm font-medium">
                      {new Date(resultado.updated_at).toLocaleDateString(
                        "es-MX",
                        { year: "numeric", month: "short", day: "numeric" }
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
