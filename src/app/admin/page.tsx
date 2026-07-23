// /admin — Panel de administración interno (Fase 2)
// Punto de separación: eliminar src/app/admin/ completo

"use client";

import { useState, useEffect, FormEvent } from "react";

interface Pedido {
  id: number;
  numero_guia: string;
  estado: string;
  paqueteria: string;
  cliente_nombre: string | null;
  costo_total: number | null;
  fecha_envio: string | null;
  created_at: string;
}

const ESTADOS = [
  "pendiente",
  "en_produccion",
  "enviado",
  "en_transito",
  "entregado",
  "cancelado",
] as const;

const ESTADO_LABELS: Record<string, string> = {
  pendiente: "Pendiente",
  en_produccion: "En producción",
  enviado: "Enviado",
  en_transito: "En tránsito",
  entregado: "Entregado",
  cancelado: "Cancelado",
};

const ESTADO_COLORS: Record<string, string> = {
  pendiente: "bg-zinc-600",
  en_produccion: "bg-blue-600",
  enviado: "bg-amber-500",
  en_transito: "bg-amber-500",
  entregado: "bg-green-600",
  cancelado: "bg-red-600",
};

export default function AdminPage() {
  const [autenticado, setAutenticado] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [token, setToken] = useState("");

  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form crear pedido
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    numero_guia: "",
    cliente_nombre: "",
    estado: "pendiente",
    paqueteria: "Por definir",
    costo_total: "",
  });
  const [formMsg, setFormMsg] = useState("");

  // --- Auth ---
  async function login(e: FormEvent) {
    e.preventDefault();
    setAuthError("");
    setToken(password); // Simple: password como Bearer token
    setAutenticado(true);
  }

  // --- Cargar pedidos ---
  async function cargarPedidos() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        setAutenticado(false);
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setPedidos(data);
    } catch (err: any) {
      setError(err.message || "Error al cargar pedidos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (autenticado) cargarPedidos();
  }, [autenticado]);

  // --- Actualizar estado ---
  async function cambiarEstado(guia: string, nuevoEstado: string) {
    try {
      const res = await fetch("/api/admin", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ numero_guia: guia, estado: nuevoEstado }),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Error al actualizar.");
        return;
      }
      cargarPedidos();
    } catch {
      alert("Error de conexión.");
    }
  }

  // --- Crear pedido ---
  async function crearPedido(e: FormEvent) {
    e.preventDefault();
    setFormMsg("");
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          numero_guia: formData.numero_guia,
          estado: formData.estado,
          paqueteria: formData.paqueteria,
          costo_total: formData.costo_total
            ? Number(formData.costo_total)
            : undefined,
          notas: formData.cliente_nombre
            ? `Cliente: ${formData.cliente_nombre}`
            : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setFormMsg("Pedido creado ✅");
      setFormData({
        numero_guia: "",
        cliente_nombre: "",
        estado: "pendiente",
        paqueteria: "Por definir",
        costo_total: "",
      });
      setShowForm(false);
      cargarPedidos();
    } catch (err: any) {
      setFormMsg(err.message || "Error al crear.");
    }
  }

  // --- Login screen ---
  if (!autenticado) {
    return (
      <div className="mx-auto max-w-md px-4 py-20">
        <h1 className="font-heading text-3xl font-bold text-center mb-8">
          Admin <span className="text-[var(--accent)]">Serigrafics</span>
        </h1>
        <form onSubmit={login} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-center text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
          />
          {authError && (
            <p className="text-sm text-red-400 text-center">{authError}</p>
          )}
          <button
            type="submit"
            className="w-full rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--accent)]/90 transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }

  // --- Dashboard ---
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-2xl font-bold">
          Panel de <span className="text-[var(--accent)]">pedidos</span>
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium hover:bg-[var(--muted)] transition-colors"
          >
            {showForm ? "Cancelar" : "+ Nuevo pedido"}
          </button>
          <button
            onClick={cargarPedidos}
            disabled={loading}
            className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium hover:bg-[var(--muted)] transition-colors"
          >
            ↻ Refrescar
          </button>
        </div>
      </div>

      {/* Form crear */}
      {showForm && (
        <form
          onSubmit={crearPedido}
          className="mb-8 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-4"
        >
          <h2 className="font-heading font-semibold text-lg">Nuevo pedido</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Número de guía *"
              value={formData.numero_guia}
              onChange={(e) =>
                setFormData({ ...formData, numero_guia: e.target.value })
              }
              required
              className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
            />
            <input
              type="text"
              placeholder="Nombre del cliente"
              value={formData.cliente_nombre}
              onChange={(e) =>
                setFormData({ ...formData, cliente_nombre: e.target.value })
              }
              className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
            />
            <select
              value={formData.paqueteria}
              onChange={(e) =>
                setFormData({ ...formData, paqueteria: e.target.value })
              }
              className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
            >
              <option>Por definir</option>
              <option>FedEx</option>
              <option>DHL</option>
              <option>Estafeta</option>
              <option>RedPack</option>
              <option>PaqueteExpress</option>
            </select>
            <input
              type="number"
              placeholder="Costo total ($)"
              value={formData.costo_total}
              onChange={(e) =>
                setFormData({ ...formData, costo_total: e.target.value })
              }
              className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
            />
          </div>
          {formMsg && (
            <p
              className={`text-sm ${
                formMsg.includes("✅") ? "text-green-400" : "text-red-400"
              }`}
            >
              {formMsg}
            </p>
          )}
          <button
            type="submit"
            className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--accent)]/90 transition-colors"
          >
            Crear pedido
          </button>
        </form>
      )}

      {/* Tabla de pedidos */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/5 p-4">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {loading ? (
        <p className="text-sm text-[var(--muted-foreground)]">Cargando...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] text-left text-xs uppercase tracking-wider text-[var(--muted-foreground)]">
                <th className="py-3 px-2">Guía</th>
                <th className="py-3 px-2">Cliente</th>
                <th className="py-3 px-2">Estado</th>
                <th className="py-3 px-2">Paquetería</th>
                <th className="py-3 px-2">Costo</th>
                <th className="py-3 px-2">Acción</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-6 text-center text-[var(--muted-foreground)]"
                  >
                    No hay pedidos aún. Crea el primero.
                  </td>
                </tr>
              )}
              {pedidos.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-[var(--border)] hover:bg-[var(--muted)]/50 transition-colors"
                >
                  <td className="py-3 px-2 font-mono text-xs">{p.numero_guia}</td>
                  <td className="py-3 px-2">
                    {p.cliente_nombre || "—"}
                  </td>
                  <td className="py-3 px-2">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium text-white ${
                        ESTADO_COLORS[p.estado] || "bg-zinc-600"
                      }`}
                    >
                      {ESTADO_LABELS[p.estado] || p.estado}
                    </span>
                  </td>
                  <td className="py-3 px-2">{p.paqueteria}</td>
                  <td className="py-3 px-2">
                    {p.costo_total ? `$${p.costo_total}` : "—"}
                  </td>
                  <td className="py-3 px-2">
                    <select
                      value={p.estado}
                      onChange={(e) => cambiarEstado(p.numero_guia, e.target.value)}
                      className="rounded border border-[var(--border)] bg-[var(--background)] px-2 py-1 text-xs"
                    >
                      {ESTADOS.map((e) => (
                        <option key={e} value={e}>
                          {ESTADO_LABELS[e]}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
