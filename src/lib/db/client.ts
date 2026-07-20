// ============================================================
// Módulo de base de datos — Abstracción sobre PostgreSQL
// ============================================================
// Punto de separación Fase 2:
//   - Eliminar este archivo + queries.ts + schema.sql
//   - Eliminar src/app/api/rastreo/ + src/app/api/admin/
//   - Eliminar src/app/rastreo/ + src/app/admin/
//   - Eliminar variables de entorno DATABASE_URL + PHASE2
//   - Quitar imports de Header/Footer (están gateados con env)
// ============================================================

import { Pool, PoolClient } from "pg";

// Singleton — una sola conexión por instancia de Next.js
let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error("DATABASE_URL no está configurada");
    }
    pool = new Pool({
      connectionString: url,
      max: 5, // Pool pequeño — sitio de bajo tráfico
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
    });
  }
  return pool;
}

/** Verifica si la Fase 2 está activa */
export function isPhase2Enabled(): boolean {
  return process.env.NEXT_PUBLIC_PHASE2 === "true";
}

/** Verifica conectividad con la BD */
export async function healthCheck(): Promise<boolean> {
  try {
    const client = await getPool().connect();
    await client.query("SELECT 1");
    client.release();
    return true;
  } catch {
    return false;
  }
}

/**
 * Ejecuta una query y devuelve las filas.
 * Lanza si no hay DATABASE_URL configurada.
 */
export async function query<T = Record<string, unknown>>(
  sql: string,
  params?: unknown[]
): Promise<T[]> {
  const client = await getPool().connect();
  try {
    const result = await client.query(sql, params);
    return result.rows as T[];
  } finally {
    client.release();
  }
}

/**
 * Ejecuta una transacción.
 * Si el callback lanza, hace ROLLBACK automático.
 */
export async function transaction<T>(
  fn: (client: PoolClient) => Promise<T>
): Promise<T> {
  const client = await getPool().connect();
  try {
    await client.query("BEGIN");
    const result = await fn(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Cierra el pool. Llamar en procesos que terminen (ej. cron jobs).
 */
export async function close(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
