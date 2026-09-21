import type { Stat } from "@/content/types";

export function StatGrid({
  stats,
  tone = "dark",
  className = "",
}: {
  stats: readonly Stat[];
  tone?: "dark" | "light";
  className?: string;
}) {
  const cols = stats.length >= 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3";
  const cell = tone === "light" ? "bg-black/[0.05]" : "bg-white/[0.04]";
  const label = tone === "light" ? "text-ink/60" : "text-muted-dark";
  return (
    <dl className={`grid gap-3 ${cols} ${className}`}>
      {stats.map((s) => (
        <div key={s.label} className={`flex flex-col-reverse justify-end rounded-panel p-4 ${cell}`}>
          <dt className={`mt-1 text-xs uppercase tracking-wider ${label}`}>{s.label}</dt>
          <dd className="font-serif text-3xl leading-none tracking-tight">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}
