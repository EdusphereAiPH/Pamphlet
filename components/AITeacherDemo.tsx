"use client";

import { useEffect, useRef, useState } from "react";
import { FALLBACK_DEMO, SAMPLE_LESSONS } from "@/content/samples";
import { aiJSON, AiError } from "@/lib/ai-client";
import { LIMITS, type DemoResult } from "@/lib/ai-types";
import { track } from "@/lib/analytics";

type Status = "idle" | "loading" | "done" | "fallback";
type Decision = "approved" | "changes" | null;

// Cycled while the model works, so the wait reads as the product doing something.
const STAGES = ["Reading your lesson…", "Understanding the concepts…", "Writing the summary…", "Drafting the quiz…"];

export function AITeacherDemo({ audience }: { audience: string }) {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [stage, setStage] = useState(0);
  const [result, setResult] = useState<DemoResult | null>(null);
  const [picked, setPicked] = useState<Record<number, number>>({});
  const [decision, setDecision] = useState<Decision>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status !== "loading") return;
    const id = setInterval(() => setStage((s) => Math.min(s + 1, STAGES.length - 1)), 1100);
    return () => clearInterval(id);
  }, [status]);

  useEffect(() => {
    if (status === "done" || status === "fallback") {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [status]);

  const tooShort = text.trim().length < 40;

  async function run() {
    if (tooShort || status === "loading") return;
    setStage(0);
    setStatus("loading");
    setResult(null);
    setPicked({});
    setDecision(null);
    track("ai_demo", { audience, status: "start" });
    try {
      const r = await aiJSON<DemoResult>({ mode: "demo", lesson: text }, 12_000);
      setResult(r);
      setStatus("done");
      track("ai_demo", { audience, status: "ok" });
    } catch (err) {
      const kind = err instanceof AiError ? err.kind : "unknown";
      setResult(FALLBACK_DEMO);
      setStatus("fallback");
      track("ai_demo", { audience, status: `fallback:${kind}` });
    }
  }

  function decide(d: Exclude<Decision, null>) {
    setDecision(d);
    track("ai_demo", { audience, status: d });
  }

  return (
    <section className="rounded-card bg-surface p-6 ring-1 ring-white/[0.06] sm:p-8">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-dark">Try it now</p>
      <h2 className="mt-3 font-serif text-[2rem] leading-[1.05] tracking-tight sm:text-4xl">
        Paste a lesson. Watch the AI Teacher draft it.
      </h2>
      <p className="mt-4 text-[17px] leading-relaxed text-paper/80">
        Any paragraph from any lesson. In a few seconds you get a student summary and a quiz — and then
        <em> you</em> decide whether students ever see it.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {SAMPLE_LESSONS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setText(s.text)}
            className="rounded-pill bg-white/[0.06] px-3 py-1.5 text-left text-sm text-paper/85 transition-colors hover:bg-white/10"
          >
            {s.label}
          </button>
        ))}
      </div>

      <label className="mt-4 block">
        <span className="sr-only">Lesson text</span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, LIMITS.lessonChars))}
          rows={6}
          placeholder="…or paste your own lesson text here."
          className="w-full resize-y rounded-panel bg-ink px-4 py-3 text-[16px] leading-relaxed text-paper placeholder:text-muted ring-1 ring-white/10 focus:outline-none focus:ring-white/30"
        />
      </label>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={run}
          disabled={tooShort || status === "loading"}
          className="inline-flex h-12 items-center rounded-pill bg-paper px-5 font-medium text-ink transition-colors hover:bg-white disabled:opacity-40"
        >
          {status === "loading" ? STAGES[stage] : "Draft with AI"}
        </button>
        <span className="text-xs text-muted">Processed and discarded — your text is never stored.</span>
      </div>

      {result && (
        <div ref={resultRef} className="mt-8 scroll-mt-24">
          {status === "fallback" && (
            <p className="mb-4 rounded-panel bg-white/[0.06] px-4 py-3 text-sm text-paper/80">
              Booth wifi is slow — showing a saved example instead of a live draft.
            </p>
          )}

          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-muted-dark">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-paper/70" />
            AI draft · hidden from students until a teacher approves
          </div>

          <h3 className="mt-4 text-sm font-medium">Student summary</h3>
          <p className="mt-2 text-[17px] leading-relaxed text-paper/85">{result.summary}</p>

          <h3 className="mt-6 text-sm font-medium">Quiz · 3 items</h3>
          <ol className="mt-2 space-y-4">
            {result.questions.map((q, qi) => {
              const chosen = picked[qi];
              return (
                <li key={qi} className="rounded-panel bg-white/[0.04] p-4">
                  <p className="text-[16px] leading-snug">
                    <span className="mr-2 text-muted-dark">{qi + 1}.</span>
                    {q.question}
                  </p>
                  <ul className="mt-3 grid gap-2">
                    {q.options.map((opt, oi) => {
                      const revealed = chosen !== undefined;
                      const isAnswer = oi === q.answer;
                      const cls = !revealed
                        ? "bg-ink/60 text-paper/85 hover:bg-ink"
                        : isAnswer
                          ? "bg-paper text-ink"
                          : oi === chosen
                            ? "bg-ink/60 text-paper/50 line-through"
                            : "bg-ink/40 text-paper/50";
                      return (
                        <li key={oi}>
                          <button
                            type="button"
                            disabled={revealed}
                            onClick={() => setPicked((p) => ({ ...p, [qi]: oi }))}
                            className={`w-full rounded-[14px] px-3 py-2.5 text-left text-[15px] leading-snug transition-colors ${cls}`}
                          >
                            {opt}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ol>

          <p className="mt-5 text-sm text-muted-dark">
            <span className="font-medium text-paper/80">Note to teacher:</span> {result.note}
          </p>

          <div className="mt-6 border-t border-white/10 pt-5">
            {decision === null ? (
              <>
                <p className="text-sm text-paper/80">AI proposes. The teacher approves.</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => decide("approved")}
                    className="inline-flex h-11 items-center rounded-pill bg-paper px-5 font-medium text-ink transition-colors hover:bg-white"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => decide("changes")}
                    className="inline-flex h-11 items-center rounded-pill bg-white/[0.06] px-5 font-medium text-paper transition-colors hover:bg-white/10"
                  >
                    Request changes
                  </button>
                </div>
              </>
            ) : decision === "approved" ? (
              <p className="text-[16px] text-paper/85">
                <span className="mr-2">✓</span>Approved. Now this — and only this — reaches students.
              </p>
            ) : (
              <p className="text-[16px] text-paper/85">
                Sent back to draft. Nothing reached students. That&apos;s the whole point.
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
