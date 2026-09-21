import { notFound } from "next/navigation";
import { FACE_COMPONENTS } from "@/components/panels";
import { FACES, type FaceId } from "@/content/hotspots";

export const dynamicParams = false;

export function generateStaticParams() {
  return FACES.map((face) => ({ face }));
}

export default async function PanelPage({ params }: PageProps<"/panels/[face]">) {
  const { face } = await params;
  const Face = FACE_COMPONENTS[face as FaceId];
  if (!Face) notFound();
  return <Face />;
}
