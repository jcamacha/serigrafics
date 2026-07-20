// ============================================================
// Queries de negocio — Rastreo de pedidos (Fase 2)
// ============================================================

import { query } from "./client";

// --- Tipos ---

export interface PedidoRastreo {
  numero_guia: string;
  estado: PedidoEstado;
  fecha_envio: string | null;
  paqueteria: string;
  cliente_nombre: string;
  updated_at: string;
}

export type PedidoEstado =
  | "pendiente"
  | "en_produccion"
  | "enviado"
  | "en_transito"
  | "entregado"
  | "cancelado";

export interface PedidoAdmin {
  id: number;
  cliente_id: number | null;
  modelo_id: number | null;
  numero_guia: string;
  estado: PedidoEstado;
  fecha_envio: string | null;
  paqueteria: string;
  costo_total: number | null;
  costo_envio: number | null;
  created_at: string;
  updated_at: string;
  // JOIN fields
  cliente_nombre?: string;
  modelo_nombre?: string;
}

export interface ClienteRow {
  id: number;
  nombre: string;
  telefono: string;
  email: string | null;
  empresa: string | null;
}

export interface CreatePedidoInput {
  numero_guia: string;
  cliente_id?: number;
  estado?: PedidoEstado;
  paqueteria?: string;
  fecha_envio?: string;
  costo_total?: number;
  costo_envio?: number;
  notas?: string;
}

// --- Queries públicas (rastreo) ---

/** Busca un pedido por número de guía usando la vista pública */
export async function buscarPorGuia(guia: string): Promise<PedidoRastreo | null> {
  const rows = await query<PedidoRastreo>(
    `SELECT numero_guia, estado, fecha_envio, paqueteria,
            cliente_nombre, updated_at
     FROM rastreo_publico
     WHERE numero_guia = $1`,
    [guia]
  );
  return rows[0] ?? null;
}

// --- Queries admin ---

export async function listarPedidos(limit = 50): Promise<PedidoAdmin[]> {
  return query<PedidoAdmin>(
    `SELECT p.*, c.nombre AS cliente_nombre, m.nombre AS modelo_nombre
     FROM pedidos p
     LEFT JOIN clientes c ON p.cliente_id = c.id
     LEFT JOIN modelos m ON p.modelo_id = m.id
     ORDER BY p.created_at DESC
     LIMIT $1`,
    [limit]
  );
}

export async function crearPedido(input: CreatePedidoInput): Promise<PedidoAdmin> {
  const rows = await query<PedidoAdmin>(
    `INSERT INTO pedidos (numero_guia, cliente_id, estado, paqueteria,
                          fecha_envio, costo_total, costo_envio, notas)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [
      input.numero_guia,
      input.cliente_id ?? null,
      input.estado ?? "pendiente",
      input.paqueteria ?? "Por definir",
      input.fecha_envio ?? null,
      input.costo_total ?? null,
      input.costo_envio ?? 0,
      input.notas ?? null,
    ]
  );
  return rows[0];
}

export async function actualizarEstado(
  guia: string,
  estado: PedidoEstado
): Promise<PedidoAdmin | null> {
  const rows = await query<PedidoAdmin>(
    `UPDATE pedidos
     SET estado = $2,
         fecha_envio = CASE WHEN $2 = 'enviado' THEN now() ELSE fecha_envio END,
         updated_at = now()
     WHERE numero_guia = $1
     RETURNING *`,
    [guia, estado]
  );
  return rows[0] ?? null;
}

export async function eliminarPedido(guia: string): Promise<boolean> {
  const result = await query<{ deleted: boolean }>(
    `DELETE FROM pedidos WHERE numero_guia = $1 RETURNING true AS deleted`,
    [guia]
  );
  return result.length > 0;
}

export async function buscarClientes(q: string): Promise<ClienteRow[]> {
  return query<ClienteRow>(
    `SELECT id, nombre, telefono, email, empresa
     FROM clientes
     WHERE nombre ILIKE $1 OR empresa ILIKE $1
     LIMIT 10`,
    [`%${q}%`]
  );
}

export async function crearCliente(
  nombre: string,
  telefono: string,
  email?: string,
  empresa?: string
): Promise<ClienteRow> {
  const rows = await query<ClienteRow>(
    `INSERT INTO clientes (nombre, telefono, email, empresa)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [nombre, telefono, email ?? null, empresa ?? null]
  );
  return rows[0];
}
