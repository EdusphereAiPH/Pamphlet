import type { ReactNode } from "react";

// One face of the tri-fold at 512×1086 CSS px (99×210mm). Rendered to a texture by
// scripts/render-panels.mjs, so everything here must fit — no scrolling, no overflow.
export function Panel({ tone, children }: { tone: "dark" | "paper"; children: ReactNode }) {
  return (
    <div
      data-panel={tone}
      className={`relative flex h-[1086px] w-[512px] flex-col overflow-hidden px-10 py-10 ${
        tone === "dark" ? "bg-ink text-paper" : "bg-paper text-ink"
      }`}
    >
      {children}
    </div>
  );
}

export function Eyebrow({ children, tone = "paper" }: { children: ReactNode; tone?: "dark" | "paper" }) {
  return (
    <p className={`text-[12px] font-medium uppercase tracking-[0.2em] ${tone === "dark" ? "text-muted-dark" : "text-muted"}`}>
      {children}
    </p>
  );
}
