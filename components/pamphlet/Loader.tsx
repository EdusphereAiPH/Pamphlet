"use client";

import { AnimatePresence, motion } from "motion/react";
import { Wordmark } from "@/components/Wordmark";

const EASE = [0.22, 1, 0.36, 1] as const;

// Branded cover while the textures and the 3D scene load; fades out on ready.
export function Loader({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          role="status"
          aria-live="polite"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: EASE } }}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-ink text-paper"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } }}
            className="flex flex-col items-center gap-6"
          >
            <Wordmark className="scale-125" />
            <div className="h-px w-40 overflow-hidden rounded-pill bg-white/10">
              <div className="animate-loader h-full w-1/3 bg-paper" />
            </div>
            <p className="text-[13px] tracking-[0.02em] text-muted">Loading your pamphlet</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
