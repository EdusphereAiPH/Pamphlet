"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { AUDIENCES } from "@/content/audiences";

const EASE = [0.22, 1, 0.36, 1] as const;

export function AudiencePicker() {
  const reduce = useReducedMotion();
  const pickable = AUDIENCES.filter((a) => a.slug !== "everyone");

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {pickable.map((a, i) => (
        <motion.li
          key={a.slug}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 + i * 0.07, ease: EASE }}
        >
          <Link
            href={`/p/${a.slug}`}
            className="group flex min-h-[88px] items-center justify-between gap-4 rounded-panel bg-surface p-5 ring-1 ring-white/[0.06] transition-colors duration-300 hover:bg-panel active:bg-panel"
          >
            <span>
              <span className="block font-serif text-2xl leading-tight">{a.label}</span>
              <span className="mt-1 block text-sm text-muted-dark">{a.tagline}</span>
            </span>
            <span
              aria-hidden
              className="shrink-0 text-muted-dark transition-transform duration-300 ease-apple group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}
