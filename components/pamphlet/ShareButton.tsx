"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/content/site";

// Native share sheet where available (all modern phones); otherwise copy the link.
export function ShareButton() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  async function share() {
    const url = `${location.origin}/p`;
    const data = { title: `${SITE.name} — ${SITE.tagline}`, text: SITE.description, url };
    try {
      if (navigator.share && (!navigator.canShare || navigator.canShare(data))) {
        await navigator.share(data);
        return;
      }
    } catch {
      return; // user dismissed the sheet
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      prompt("Copy this link", url);
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      aria-label="Share this pamphlet"
      className="pointer-events-auto inline-flex h-9 items-center gap-1.5 rounded-pill bg-white/[0.08] px-3.5 text-[13px] font-medium text-paper transition-colors hover:bg-white/15"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" x2="12" y1="2" y2="15" />
      </svg>
      {copied ? "Link copied" : "Share"}
    </button>
  );
}
