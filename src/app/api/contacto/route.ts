// Fase 1: endpoint placeholder — solo valida y responde
// Fase 2: conectará a PostgreSQL para guardar cotizaciones

import { NextRequest, NextResponse } from "next/server";

// Rate limiting simple en memoria — reinicia con cada deploy (suficiente para Fase 1)
const rateMap = new Map<string, number>();

export async function POST(request: NextRequest) {
  // Rate limit: 3 solicitudes por minuto por IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  const now = Date.now();
  const windowStart = now - 60_000;

  // Limpiar entradas viejas
  for (const [key, timestamp] of rateMap) {
    if (timestamp < windowStart) rateMap.delete(key);
  }

  const recentRequests = [...rateMap.entries()].filter(
    ([key, ts]) => key.startsWith(ip) && ts > windowStart
  ).length;

  if (recentRequests >= 3) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Intenta de nuevo en un minuto." },
      { status: 429 }
    );
  }

  rateMap.set(`${ip}-${now}`, now);

  // Validar body
  let body: { nombre?: string; telefono?: string; mensaje?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  // Validación server-side
  if (!body.nombre || body.nombre.trim().length < 2) {
    return NextResponse.json(
      { error: "El nombre es obligatorio." },
      { status: 400 }
    );
  }
  if (!body.telefono || body.telefono.trim().length < 7) {
    return NextResponse.json(
      { error: "El teléfono es obligatorio." },
      { status: 400 }
    );
  }
  if (!body.mensaje || body.mensaje.trim().length < 10) {
    return NextResponse.json(
      { error: "Descríbenos tu proyecto (mínimo 10 caracteres)." },
      { status: 400 }
    );
  }

  // HACK: teléfono mexicano simple (10 dígitos)
  const telLimpio = body.telefono.replace(/\D/g, "");
  if (telLimpio.length < 10) {
    return NextResponse.json(
      { error: "El teléfono debe tener al menos 10 dígitos." },
      { status: 400 }
    );
  }

  // Fase 1: solo loguear. Fase 2: INSERT en PostgreSQL
  console.log(
    `[Cotización] ${body.nombre} | ${body.telefono} | ${body.mensaje.slice(0, 80)}... | Enviar a crtainboy@gmail.com`
  );

  return NextResponse.json({
    ok: true,
    mensaje: "Solicitud recibida. Te contactaremos pronto.",
  });
}
