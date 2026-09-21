import { Beacon } from "@/components/Beacon";
import { Footer } from "@/components/Footer";

export default function PamphletLayout({ children }: LayoutProps<"/p">) {
  return (
    <>
      <Beacon event="scan" />
      <div className="mx-auto w-full max-w-[720px] flex-1 px-4">{children}</div>
      <Footer />
    </>
  );
}
