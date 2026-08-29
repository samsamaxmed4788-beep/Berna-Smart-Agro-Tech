import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000,
})

export { pool }

export const db = drizzle(pool, { schema })

export async function verifyDatabaseConnection() {
  const result = await pool.query<{ ok: number }>('SELECT 1 AS ok')
  return result.rows[0]?.ok === 1
}

export async function closeDatabaseConnection() {
  await pool.end()
}
