"use client";

import { useState, useEffect } from "react";

/** Desofusca un string codificado en base64 — evita scraping básico */
function decode(encoded: string): string {
  try {
    return atob(encoded);
  } catch {
    return "[pendiente]";
  }
}

// DATOS OFUSCADOS — reemplazar con los reales codificados en base64
// Para codificar: btoa("texto real") en la consola del navegador
const DIRECCION = "Guadalupe Victoria, Estado de México";
const HORARIO = decode("WzNQTSAtIDlQTV0="); // "3PM - 9PM"
const TELEFONO = "+52 55 7719 6924";
const CORREO = decode("W0NvcnJlbyBwZW5kaWVudGVd");
const WHATSAPP_NUM = "5210000000000"; // Sin ofuscar — wa.me lo requiere en el link

export default function ContactoInfo() {
  const [datos, setDatos] = useState({
    direccion: "",
    horario: "",
    telefono: "",
    correo: "",
  });

  // Los datos se renderizan solo en el cliente — los bots que no ejecutan JS no los ven
  useEffect(() => {
    setDatos({
      direccion: DIRECCION,
      horario: HORARIO,
      telefono: TELEFONO,
      correo: CORREO,
    });
  }, []);

  if (!datos.direccion) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-lg bg-[var(--muted)]" />
            <div className="flex-1 space-y-1.5">
              <div className="h-4 w-16 rounded bg-[var(--muted)]" />
              <div className="h-3 w-32 rounded bg-[var(--muted)]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--muted)] text-sm shrink-0">
          📍
        </span>
        <div>
          <h3 className="text-sm font-medium">Dirección</h3>
          <p className="text-sm text-[var(--muted-foreground)]">
            {datos.direccion}
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--muted)] text-sm shrink-0">
          🕐
        </span>
        <div>
          <h3 className="text-sm font-medium">Horario</h3>
          <p className="text-sm text-[var(--muted-foreground)]">
            {datos.horario}
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--muted)] text-sm shrink-0">
          📞
        </span>
        <div>
          <h3 className="text-sm font-medium">Teléfono</h3>
          <p className="text-sm text-[var(--muted-foreground)]">
            {datos.telefono}
          </p>
        </div>
      </div>
    </div>
  );
}
