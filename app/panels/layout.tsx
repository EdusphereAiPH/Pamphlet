import type { Metadata } from "next";

// Source artwork for the pamphlet textures. Not linked from anywhere; rendered by
// scripts/render-panels.mjs. Kept out of search engines.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function PanelsLayout({ children }: LayoutProps<"/panels">) {
  return <div className="h-[1086px] w-[512px] overflow-hidden">{children}</div>;
}
