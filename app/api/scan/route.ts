// Scan + view + AI-interaction logging. Accepts a small JSON event, writes it to
// Postgres, and always returns 204 — analytics must never break the pamphlet.

import { db } from "@/lib/db";

const ALLOWED = new Set(["scan", "view_track", "section_view", "ai_demo", "ai_intro", "ai_ask"]);

function str(v: unknown, max: number): string | null {
  return typeof v === "string" && v.length > 0 ? v.slice(0, max) : null;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return new Response(null, { status: 204 });
  }

  const name = str(body.name, 40);
  if (!name || !ALLOWED.has(name)) return new Response(null, { status: 204 });

  const row = {
    name,
    audience: str(body.audience, 20),
    status: str(body.status, 40),
    source: str(body.source, 40),
    path: str(body.path, 120),
    ua: str(request.headers.get("user-agent"), 300),
    client_ts: typeof body.ts === "number" && Number.isFinite(body.ts) ? Math.trunc(body.ts) : null,
  };

  const sql = db();
  if (!sql) {
    console.log("[pamphlet] (no DATABASE_URL)", JSON.stringify(row));
    return new Response(null, { status: 204 });
  }

  try {
    await sql`insert into pamphlet_events ${sql(row)}`;
  } catch (err) {
    console.error("[pamphlet] insert failed:", err instanceof Error ? err.message : err);
  }

  return new Response(null, { status: 204 });
}
