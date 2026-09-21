"use client";

import { useState } from "react";
import { aiStream, AiError } from "@/lib/ai-client";
import { LIMITS } from "@/lib/ai-types";
import { track } from "@/lib/analytics";

type Status = "idle" | "streaming" | "done" | "error";

export function SchoolIntro({ audience }: { audience: string }) {
  const [school, setSchool] = useState("");
  const [out, setOut] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const tooShort = school.trim().length < 8;

  async function run() {
    if (tooShort || status === "streaming") return;
    setOut("");
    setStatus("streaming");
    track("ai_intro", { audience, status: "start" });
    try {
      await aiStream({ mode: "intro", school, audience }, (t) => setOut((o) => o + t));
      setStatus("done");
      track("ai_intro", { audience, status: "ok" });
    } catch (err) {
      setStatus("error");
      track("ai_intro", { audience, status: `error:${err instanceof AiError ? err.kind : "unknown"}` });
    }
  }

  return (
    <section className="rounded-card bg-panel/60 p-6 ring-1 ring-white/[0.06] sm:p-8">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-dark">Make this about your school</p>
      <p className="mt-3 text-[17px] leading-relaxed text-paper/80">
        One line about your school, and the pamphlet rewrites itself for you.
      </p>

      <form
        className="mt-4 flex flex-col gap-3 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          run();
        }}
      >
        <label className="flex-1">
          <span className="sr-only">Describe your school</span>
          <input
            value={school}
            onChange={(e) => setSchool(e.target.value.slice(0, LIMITS.schoolChars))}
            placeholder="e.g. A K-12 private school in Cebu, about 800 students"
            className="h-12 w-full rounded-pill bg-ink px-4 text-[16px] text-paper placeholder:text-muted ring-1 ring-white/10 focus:outline-none focus:ring-white/30"
          />
        </label>
        <button
          type="submit"
          disabled={tooShort || status === "streaming"}
          className="inline-flex h-12 shrink-0 items-center justify-center rounded-pill bg-paper px-5 font-medium text-ink transition-colors hover:bg-white disabled:opacity-40"
        >
          {status === "streaming" ? "Writing…" : status === "done" ? "Write it again" : "Write it"}
        </button>
      </form>

      {(status === "streaming" || status === "done") && (
        <div className="mt-5">
          <p className="font-serif text-xl leading-snug text-paper/90 sm:text-2xl">
            {out}
            {status === "streaming" && <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-paper/80">&nbsp;</span>}
          </p>
          {status === "done" && (
            <p className="mt-3 text-xs text-muted">
              Written by EduSphere AI from this pamphlet&apos;s own content — nothing invented.
            </p>
          )}
        </div>
      )}

      {status === "error" && (
        <p className="mt-4 text-sm text-muted-dark">
          Couldn&apos;t reach the AI right now — booth wifi, probably. The rest of the pamphlet works fine.
        </p>
      )}
    </section>
  );
}
