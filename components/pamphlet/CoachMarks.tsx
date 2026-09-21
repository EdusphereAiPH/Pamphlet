"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";

// One-time gesture hint after the loader: three steps appear in turn, then fade.
// Dismissed early by any tap; remembered per device (best effort).
const KEY = "pamphlet:coached";
const EASE = [0.22, 1, 0.36, 1] as const;
const noop = () => () => {};
const seen = () => {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
};

const STEPS = [
  {
    label: "Tap a dot",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="8" opacity=".5" />
      </svg>
    ),
  },
  {
    label: "Pinch to zoom",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 10V4h6M20 14v6h-6M4 4l6 6M20 20l-6-6" />
      </svg>
    ),
  },
  {
    label: "Press Open",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h6l3 3h9v9H3z" />
      </svg>
    ),
  },
];

export function CoachMarks({ active }: { active: boolean }) {
  const already = useSyncExternalStore(noop, seen, () => true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!active || already) return;
    const start = setTimeout(() => setShow(true), 500);
    const stop = setTimeout(() => setShow(false), 6500);
    const dismiss = () => setShow(false);
    window.addEventListener("pointerdown", dismiss, { once: true, capture: true });
    return () => {
      clearTimeout(start);
      clearTimeout(stop);
      window.removeEventListener("pointerdown", dismiss, { capture: true });
    };
  }, [active, already]);

  useEffect(() => {
    if (!show) return;
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* private mode: show again next time, harmless */
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="coach"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: EASE } }}
          className="pointer-events-none fixed inset-x-0 bottom-[calc(max(1rem,env(safe-area-inset-bottom))+4.5rem)] z-20 flex justify-center px-4"
        >
          <ul className="flex flex-wrap justify-center gap-2">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.label}
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.15 + i * 0.55, duration: 0.5, ease: EASE }}
                className="inline-flex h-10 items-center gap-2 rounded-pill bg-paper/95 pl-3 pr-4 text-[13px] font-medium text-ink shadow-[0_8px_24px_rgba(0,0,0,.45)]"
              >
                <span className="size-5 text-ink/70">{s.icon}</span>
                {s.label}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
