import { Database, FileUp, Sparkles, UserCheck, type LucideIcon } from "lucide-react";

// Monochrome line icons (the site uses lucide) for the AI Teacher steps.
export type StepIconName = "file-up" | "sparkles" | "user-check" | "database";

const ICONS: Record<StepIconName, LucideIcon> = {
  "file-up": FileUp,
  sparkles: Sparkles,
  "user-check": UserCheck,
  database: Database,
};

export function StepIcon({ name, size = 36, className = "" }: { name: StepIconName; size?: number; className?: string }) {
  const Icon = ICONS[name];
  return <Icon size={size} strokeWidth={1.5} absoluteStrokeWidth className={className} aria-hidden />;
}
