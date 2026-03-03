/**
 * Neon Postgres Connection
 *
 * Uses @neondatabase/serverless for edge-compatible,
 * connection-pooled database access.
 *
 * Requires DATABASE_URL env var (Neon connection string).
 */

import { neon } from '@neondatabase/serverless';

function getDbUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      '[DB] DATABASE_URL is not set. Add your Neon connection string to .env.local'
    );
  }
  return url;
}

/**
 * Returns a Neon SQL tagged-template function.
 * Each call creates a fresh one-shot HTTP connection (Neon serverless model).
 */
export function getDb() {
  return neon(getDbUrl());
}
