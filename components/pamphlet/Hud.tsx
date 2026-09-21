"use client";

import { Wordmark } from "@/components/Wordmark";

type Props = {
  open: boolean;
  flipped: boolean;
  focused: boolean;
  ready: boolean;
  onToggleOpen: () => void;
  onFlip: () => void;
  onReset: () => void;
};

const btn =
  "inline-flex h-12 items-center justify-center rounded-pill px-5 text-[15px] font-medium transition-colors disabled:opacity-40";

export function Hud({ open, flipped, focused, ready, onToggleOpen, onFlip, onReset }: Props) {
  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-20 flex items-start justify-between px-4 pt-[max(1rem,env(safe-area-inset-top))]">
        <Wordmark />
        <p className="max-w-[46%] text-right text-xs leading-snug text-muted">
          {ready ? "Drag · Pinch · Tap a dot" : "Loading…"}
        </p>
      </header>

      <nav
        aria-label="Pamphlet controls"
        className="fixed inset-x-0 bottom-0 z-20 flex justify-center gap-2 px-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
      >
        {/* While a hotspot is focused the sheet owns the bottom of the screen. */}
        {!focused && (
          <>
            <button type="button" onClick={onToggleOpen} disabled={!ready} className={`${btn} bg-paper text-ink hover:bg-white`}>
              {open ? "Close" : "Open"}
            </button>
            <button type="button" onClick={onFlip} disabled={!ready} className={`${btn} bg-white/[0.08] text-paper hover:bg-white/15`}>
              {flipped ? "Flip to front" : "Flip"}
            </button>
            <button type="button" onClick={onReset} disabled={!ready} aria-label="Reset view" className={`${btn} bg-white/[0.08] px-4 text-paper hover:bg-white/15`}>
              ⟲
            </button>
          </>
        )}
      </nav>
    </>
  );
}
