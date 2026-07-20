"use client";

import { useState, useRef } from "react";

export default function ContactForm() {
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [telefono, setTelefono] = useState("");
  const honeyRef = useRef<HTMLInputElement>(null);

  // Solo dígitos, máximo 10
  const handleTelefono = (e: React.ChangeEvent<HTMLInputElement>) => {
    const soloNumeros = e.target.value.replace(/\D/g, "").slice(0, 10);
    setTelefono(soloNumeros);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (honeyRef.current?.value) {
      setEnviado(true);
      return;
    }

    // Validación client-side del teléfono
    if (telefono.length !== 10) {
      setError("El teléfono debe tener exactamente 10 dígitos.");
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);
    setEnviando(true);

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        body: JSON.stringify({
          nombre: data.get("nombre"),
          telefono: telefono,
          mensaje: data.get("mensaje"),
        }),
        headers: { "Content-Type": "application/json" },
      });

      const body = await res.json();

      if (res.ok) {
        setEnviado(true);
      } else {
        setError(body.error || "Error al enviar. Intenta de nuevo.");
      }
    } catch {
      setError("Error de conexión. Revisa tu internet.");
    } finally {
      setEnviando(false);
    }
  }

  if (enviado) {
    return (
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-8 text-center">
        <span className="text-3xl">✅</span>
        <h3 className="mt-3 font-heading text-lg font-semibold">Solicitud enviada</h3>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Te contactaremos pronto. Si urge, usa WhatsApp arriba.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-8">
      <h2 className="font-heading text-xl font-bold mb-1">Formulario</h2>
      <p className="text-sm text-[var(--muted-foreground)] mb-6">
        Si prefieres que te contactemos nosotros, déjanos tus datos.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input ref={honeyRef} type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium mb-1.5">Nombre</label>
            <input
              type="text" id="nombre" name="nombre" required
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label htmlFor="telefono" className="block text-sm font-medium mb-1.5">
              Teléfono <span className="text-[var(--muted-foreground)] font-normal">(10 dígitos)</span>
            </label>
            <input
              type="tel" id="telefono" name="telefono" required
              value={telefono}
              onChange={handleTelefono}
              maxLength={10}
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              placeholder="5512345678"
            />
          </div>
        </div>

        <div>
          <label htmlFor="mensaje" className="block text-sm font-medium mb-1.5">¿Qué necesitas?</label>
          <textarea
            id="mensaje" name="mensaje" rows={3} required
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] resize-none"
            placeholder="Ej: 50 botellas de vidrio con logo a un color..."
          />
        </div>

        {error && (
          <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>
        )}

        <button
          type="submit"
          disabled={enviando}
          className="w-full rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--accent)]/90 transition-colors disabled:opacity-50"
        >
          {enviando ? "Enviando..." : "Enviar solicitud"}
        </button>
      </form>
    </div>
  );
}
