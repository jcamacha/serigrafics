// GET /api/rastreo?guia=XXX
// Fase 2 — endpoint público de rastreo de pedidos
// Punto de separación: eliminar esta carpeta completa

import { NextRequest, NextResponse } from "next/server";
import { buscarPorGuia } from "@/lib/db/queries";

// Rate limiting simple en memoria
const rateMap = new Map<string, number>();

export async function GET(request: NextRequest) {
  // Verificar que Fase 2 está activa
  if (process.env.NEXT_PUBLIC_PHASE2 !== "true") {
    return NextResponse.json(
      { error: "Funcionalidad no disponible." },
      { status: 404 }
    );
  }

  // Rate limit: 10 consultas por minuto por IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  const now = Date.now();
  const windowStart = now - 60_000;

  for (const [key, ts] of rateMap) {
    if (ts < windowStart) rateMap.delete(key);
  }

  const recent = [...rateMap.entries()].filter(
    ([key, ts]) => key.startsWith(ip) && ts > windowStart
  ).length;

  if (recent >= 10) {
    return NextResponse.json(
      { error: "Demasiadas consultas. Intenta de nuevo en un minuto." },
      { status: 429 }
    );
  }

  rateMap.set(`${ip}-${now}`, now);

  // Validar parámetro
  const guia = request.nextUrl.searchParams.get("guia")?.trim();
  if (!guia || guia.length < 3) {
    return NextResponse.json(
      { error: "Ingresa un número de guía válido (mínimo 3 caracteres)." },
      { status: 400 }
    );
  }

  // Sanitizar: solo letras, números, guiones y guiones bajos
  if (!/^[a-zA-Z0-9\-_]+$/.test(guia)) {
    return NextResponse.json(
      { error: "El número de guía contiene caracteres no válidos." },
      { status: 400 }
    );
  }

  try {
    const pedido = await buscarPorGuia(guia);

    if (!pedido) {
      return NextResponse.json(
        { error: "No se encontró ningún pedido con ese número de guía." },
        { status: 404 }
      );
    }

    return NextResponse.json(pedido);
  } catch (err) {
    console.error("[Rastreo] Error de BD:", err);
    return NextResponse.json(
      { error: "Error al consultar. Intenta de nuevo más tarde." },
      { status: 500 }
    );
  }
}
