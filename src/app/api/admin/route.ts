// POST /api/admin/login
// GET  /api/admin/pedidos
// POST /api/admin/pedidos
// PUT  /api/admin/pedidos/[guia]
// Fase 2 — panel de administración interno
// Punto de separación: eliminar esta carpeta completa

import { NextRequest, NextResponse } from "next/server";
import {
  listarPedidos,
  crearPedido,
  actualizarEstado,
  eliminarPedido,
} from "@/lib/db/queries";
import type { PedidoEstado } from "@/lib/db/queries";

// --- Auth helper simple (mejorar con JWT en producción) ---

function verificarAuth(request: NextRequest): boolean {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  return token === process.env.ADMIN_PASSWORD;
}

function requireAuth(): NextResponse {
  return NextResponse.json({ error: "No autorizado." }, { status: 401 });
}

// --- Handlers ---

export async function GET(request: NextRequest) {
  if (!verificarAuth(request)) return requireAuth();

  try {
    const pedidos = await listarPedidos();
    return NextResponse.json(pedidos);
  } catch (err) {
    console.error("[Admin] Error listando pedidos:", err);
    return NextResponse.json(
      { error: "Error al consultar pedidos." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!verificarAuth(request)) return requireAuth();

  try {
    const body = await request.json();

    // Validar campos requeridos
    if (!body.numero_guia || body.numero_guia.trim().length < 3) {
      return NextResponse.json(
        { error: "El número de guía es obligatorio." },
        { status: 400 }
      );
    }

    const pedido = await crearPedido({
      numero_guia: body.numero_guia.trim(),
      cliente_id: body.cliente_id,
      estado: body.estado || "pendiente",
      paqueteria: body.paqueteria || "Por definir",
      fecha_envio: body.fecha_envio || null,
      costo_total: body.costo_total ? Number(body.costo_total) : undefined,
      costo_envio: body.costo_envio ? Number(body.costo_envio) : 0,
      notas: body.notas || null,
    });

    return NextResponse.json(pedido, { status: 201 });
  } catch (err) {
    console.error("[Admin] Error creando pedido:", err);
    return NextResponse.json(
      { error: "Error al crear el pedido." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  if (!verificarAuth(request)) return requireAuth();

  try {
    const body = await request.json();
    const guia = body.numero_guia;
    const estado = body.estado as PedidoEstado;

    if (!guia || !estado) {
      return NextResponse.json(
        { error: "numero_guia y estado son obligatorios." },
        { status: 400 }
      );
    }

    const actualizado = await actualizarEstado(guia, estado);
    if (!actualizado) {
      return NextResponse.json(
        { error: "Pedido no encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json(actualizado);
  } catch (err) {
    console.error("[Admin] Error actualizando pedido:", err);
    return NextResponse.json(
      { error: "Error al actualizar el pedido." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!verificarAuth(request)) return requireAuth();

  try {
    const guia = request.nextUrl.searchParams.get("guia");
    if (!guia) {
      return NextResponse.json(
        { error: "Parámetro 'guia' requerido." },
        { status: 400 }
      );
    }

    const eliminado = await eliminarPedido(guia);
    if (!eliminado) {
      return NextResponse.json(
        { error: "Pedido no encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Admin] Error eliminando pedido:", err);
    return NextResponse.json(
      { error: "Error al eliminar el pedido." },
      { status: 500 }
    );
  }
}
