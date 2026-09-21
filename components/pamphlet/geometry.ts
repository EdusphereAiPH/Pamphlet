import type { FaceId } from "@/content/hotspots";

// Tri-fold: three 99×210mm panels, 1 unit = 100mm.
export const PANEL_W = 0.99;
export const PANEL_H = 2.1;
export const THICK = 0.006;

export type Rect = { id: string; x: number; y: number; w: number; h: number };
export type PanelId = "A" | "B" | "C";
export type Side = "front" | "back";

// Which face artwork goes on which side of which panel. "front" = +z (the inside of the
// spread), "back" = −z (the outside). A folds over last, so its outside is the cover.
export const PANEL_FACES: Record<PanelId, Record<Side, FaceId>> = {
  A: { front: "inside-a", back: "front" },
  B: { front: "inside-b", back: "back" },
  C: { front: "inside-c", back: "flap" },
};

export const FACE_TONE: Record<FaceId, "dark" | "paper"> = {
  front: "dark",
  back: "dark",
  flap: "paper",
  "inside-a": "paper",
  "inside-b": "paper",
  "inside-c": "paper",
};

export const TEXTURE_URL = (face: FaceId) => `/panels/${face}.webp`;

// Where a hotspot rect (fractions from the panel's top-left) sits in panel-local space.
// Back-side zones are mirrored in x and rotated to face −z so their +z axis is the
// outward normal — the camera rig relies on that.
export function zoneTransform(rect: Rect, side: Side) {
  const cx = rect.x + rect.w / 2 - 0.5;
  const cy = 0.5 - (rect.y + rect.h / 2);
  const sign = side === "front" ? 1 : -1;
  return {
    position: [sign * cx * PANEL_W, cy * PANEL_H, sign * (THICK / 2 + 0.002)] as [number, number, number],
    rotation: [0, side === "front" ? 0 : Math.PI, 0] as [number, number, number],
    width: rect.w * PANEL_W,
    height: rect.h * PANEL_H,
  };
}

export function fitDistance(width: number, height: number, fovDeg: number, aspect: number, margin = 1.12) {
  const t = Math.tan((fovDeg * Math.PI) / 360);
  return Math.max(height / (2 * t), width / (2 * t * aspect)) * margin;
}
