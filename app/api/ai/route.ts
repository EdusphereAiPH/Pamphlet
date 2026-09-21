import { NextResponse } from "next/server";
import { ask, demo, intro, isConfigured } from "@/lib/gemini";
import { LIMITS, type AiMode } from "@/lib/ai-types";
import { allow } from "@/lib/rate-limit";

export const maxDuration = 20;

type Body = { mode?: AiMode; question?: string; lesson?: string; school?: string; audience?: string };

function clientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
}

export async function POST(req: Request) {
  if (!allow(clientIp(req))) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }
  if (!isConfigured()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const audience = typeof body.audience === "string" ? body.audience.slice(0, 20) : undefined;

  try {
    switch (body.mode) {
      case "ask": {
        const q = (body.question ?? "").trim();
        if (!q) return NextResponse.json({ error: "empty" }, { status: 400 });
        const answer = await ask(q.slice(0, LIMITS.questionChars), audience);
        return NextResponse.json({ answer }, { headers: { "cache-control": "no-store" } });
      }
      case "demo": {
        const lesson = (body.lesson ?? "").trim();
        if (lesson.length < 40) return NextResponse.json({ error: "too_short" }, { status: 400 });
        // The lesson text is passed straight through and never logged or stored.
        const result = await demo(lesson.slice(0, LIMITS.lessonChars));
        return NextResponse.json(result, { headers: { "cache-control": "no-store" } });
      }
      case "intro": {
        const school = (body.school ?? "").trim();
        if (school.length < 8) return NextResponse.json({ error: "too_short" }, { status: 400 });
        const chunks = await intro(school.slice(0, LIMITS.schoolChars), audience);
        const encoder = new TextEncoder();
        const stream = new ReadableStream<Uint8Array>({
          async start(controller) {
            try {
              for await (const t of chunks) controller.enqueue(encoder.encode(t));
            } catch (err) {
              console.error("[ai:intro] stream aborted:", err instanceof Error ? err.message : err);
            } finally {
              controller.close();
            }
          },
        });
        return new Response(stream, {
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "no-store",
            "x-accel-buffering": "no",
          },
        });
      }
      default:
        return NextResponse.json({ error: "bad_mode" }, { status: 400 });
    }
  } catch (err) {
    // Log the failure class only — never the visitor's input.
    console.error(`[ai:${body.mode}]`, err instanceof Error ? err.message : "unknown error");
    return NextResponse.json({ error: "upstream" }, { status: 502 });
  }
}
