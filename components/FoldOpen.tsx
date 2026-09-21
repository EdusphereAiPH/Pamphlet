"use client";

// The pamphlet arrives folded, like paper — then unfolds and dissolves into the page.
// One second, once per session, skipped entirely for reduced-motion users.

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

const KEY = "pamphlet:unfolded";
const EASE = [0.22, 1, 0.36, 1] as const;

export function FoldOpen() {
  const [show, setShow] = useState(false);

  // Run once. Reading the media query here (rather than via useReducedMotion) keeps the
  // effect from re-running and clearing the dismiss timer mid-animation.
  // Idempotent on purpose: React StrictMode runs effects twice in dev, so the session
  // flag is only written when the animation completes (or is tapped away) — never here.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      if (sessionStorage.getItem(KEY)) return;
    } catch {
      /* storage blocked — still play once */
    }
    setShow(true);
    const t = setTimeout(dismiss, 1500);
    return () => clearTimeout(t);
  }, []);

  function dismiss() {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    setShow(false);
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="fold"
          aria-hidden
          onPointerDown={dismiss}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink [perspective:1200px]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: EASE } }}
        >
          <div className="flex h-[52vh] max-h-[420px] w-[min(86vw,360px)]">
            {/* left leaf: folds open from the centre panel's left edge */}
            <motion.div
              className="h-full flex-1 rounded-l-[18px] bg-paper shadow-[inset_-12px_0_24px_rgba(0,0,0,0.08)] [transform-origin:right_center] [backface-visibility:hidden]"
              initial={{ rotateY: 179 }}
              animate={{ rotateY: 0 }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.05 }}
            />
            {/* centre panel */}
            <div className="flex h-full flex-1 flex-col items-center justify-center gap-3 bg-paper text-ink">
              <Image src="/brand/edusphere-mark-black.png" alt="" width={952} height={777} className="h-10 w-auto" priority />
              <span className="font-serif text-lg leading-none tracking-tight">EduSphere</span>
            </div>
            {/* right leaf */}
            <motion.div
              className="h-full flex-1 rounded-r-[18px] bg-paper shadow-[inset_12px_0_24px_rgba(0,0,0,0.08)] [transform-origin:left_center] [backface-visibility:hidden]"
              initial={{ rotateY: -179 }}
              animate={{ rotateY: 0 }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.15 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
