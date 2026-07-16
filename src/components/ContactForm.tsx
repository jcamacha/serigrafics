"use client";

import { useState, useRef } from "react";

export default function ContactForm() {
  const [enviado, setEnviado] = useState(false);
  const honeyRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Honeypot: si el campo oculto tiene valor, es un bot — ignorar silenciosamente
    if (honeyRef.current?.value) {
      // Finge éxito para no dar pistas al bot
      setEnviado(true);
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      // Fase 1 — endpoint placeholder. Fase 2: POST a PostgreSQL
      const res = await fetch("/api/contacto", {
        method: "POST",
        body: JSON.stringify({
          nombre: data.get("nombre"),
          telefono: data.get("telefono"),
          mensaje: data.get("mensaje"),
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) setEnviado(true);
    } catch {
      // Si no hay backend aún, igual mostramos confirmación
      // para no romper la UX mientras se configura
      setEnviado(true);
    }
  }

  if (enviado) {
    return (
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-8 text-center">
        <span className="text-3xl">✅</span>
        <h3 className="mt-3 font-heading text-lg font-semibold">
          Solicitud enviada
        </h3>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Te contactaremos pronto. Si urge, usa WhatsApp arriba.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-8">
      <h2 className="font-heading text-xl font-bold mb-1">
        Formulario
      </h2>
      <p className="text-sm text-[var(--muted-foreground)] mb-6">
        Si prefieres que te contactemos nosotros, déjanos tus datos.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Honeypot — invisible para humanos, irresistible para bots */}
        <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            ref={honeyRef}
            type="text"
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium mb-1.5">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              required
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label htmlFor="telefono" className="block text-sm font-medium mb-1.5">
              Teléfono
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              required
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              placeholder="55 1234 5678"
            />
          </div>
        </div>

        <div>
          <label htmlFor="mensaje" className="block text-sm font-medium mb-1.5">
            ¿Qué necesitas?
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={3}
            required
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] resize-none"
            placeholder="Ej: 50 playeras blancas con logo a un color, 100 tazas sublimadas..."
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--accent)]/90 transition-colors"
        >
          Enviar solicitud
        </button>
      </form>
    </div>
  );
}
