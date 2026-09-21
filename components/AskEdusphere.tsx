"use client";

import { useState } from "react";
import { SUGGESTED_QUESTIONS } from "@/content/samples";
import type { AudienceSlug } from "@/content/audiences";
import { aiJSON, AiError } from "@/lib/ai-client";
import { LIMITS } from "@/lib/ai-types";
import { track } from "@/lib/analytics";

type Turn = { q: string; a: string };

export function AskEdusphere({ audience }: { audience: AudienceSlug }) {
  const [q, setQ] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function ask(question: string) {
    const clean = question.trim().slice(0, LIMITS.questionChars);
    if (!clean || busy) return;
    setBusy(true);
    setError(null);
    setQ("");
    track("ai_ask", { audience, status: "start" });
    try {
      const { answer } = await aiJSON<{ answer: string }>({ mode: "ask", question: clean, audience }, 10_000);
      setTurns((t) => [{ q: clean, a: answer }, ...t].slice(0, 3));
      track("ai_ask", { audience, status: "ok" });
    } catch (err) {
      const kind = err instanceof AiError ? err.kind : "unknown";
      setError(
        kind === "rate_limited"
          ? "Give it a moment — that's a lot of questions at once."
          : "Couldn't reach the AI right now. Ask the team at the booth, or email us below.",
      );
      track("ai_ask", { audience, status: `error:${kind}` });
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="rounded-card bg-surface p-6 ring-1 ring-white/[0.06] sm:p-8">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-dark">Ask anything</p>
      <h2 className="mt-3 font-serif text-[2rem] leading-[1.05] tracking-tight sm:text-4xl">
        A pamphlet that answers back.
      </h2>
      <p className="mt-4 text-[17px] leading-relaxed text-paper/80">
        Answers come only from what&apos;s in this pamphlet. If we don&apos;t know, we&apos;ll say so.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {SUGGESTED_QUESTIONS[audience].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => ask(s)}
            disabled={busy}
            className="rounded-pill bg-white/[0.06] px-3 py-1.5 text-left text-sm text-paper/85 transition-colors hover:bg-white/10 disabled:opacity-50"
          >
            {s}
          </button>
        ))}
      </div>

      <form
        className="mt-4 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          ask(q);
        }}
      >
        <label className="flex-1">
          <span className="sr-only">Your question</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value.slice(0, LIMITS.questionChars))}
            placeholder="Type a question…"
            className="h-12 w-full rounded-pill bg-ink px-4 text-[16px] text-paper placeholder:text-muted ring-1 ring-white/10 focus:outline-none focus:ring-white/30"
          />
        </label>
        <button
          type="submit"
          disabled={busy || !q.trim()}
          className="inline-flex h-12 shrink-0 items-center rounded-pill bg-paper px-5 font-medium text-ink transition-colors hover:bg-white disabled:opacity-40"
        >
          {busy ? "…" : "Ask"}
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-muted-dark">{error}</p>}

      {turns.length > 0 && (
        <ul className="mt-6 space-y-4">
          {turns.map((t, i) => (
            <li key={i} className="rounded-panel bg-white/[0.04] p-4">
              <p className="text-sm text-muted-dark">{t.q}</p>
              <p className="mt-2 text-[16px] leading-relaxed text-paper/90">{t.a}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
