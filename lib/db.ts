// Direct Postgres for analytics writes, via the Supabase transaction pooler.
// The connecting role (pamphlet_writer) can only INSERT into pamphlet_events.
// Server-only.

import postgres, { type Sql } from "postgres";

let sql: Sql | null | undefined;

export function db(): Sql | null {
  if (sql !== undefined) return sql;
  const url = process.env.DATABASE_URL;
  if (!url) return (sql = null);
  sql = postgres(url, {
    ssl: "require",
    prepare: false, // required in transaction-pooling mode
    max: 2, // serverless: keep the footprint tiny
    idle_timeout: 20,
    connect_timeout: 5,
  });
  return sql;
}
