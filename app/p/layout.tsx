import { Beacon } from "@/components/Beacon";

export default function PamphletLayout({ children }: LayoutProps<"/p">) {
  return (
    <>
      <Beacon event="scan" />
      {children}
    </>
  );
}
