import type { ComponentType } from "react";
import type { FaceId } from "@/content/hotspots";
import { Back } from "./Back";
import { Flap } from "./Flap";
import { Front } from "./Front";
import { InsideA } from "./InsideA";
import { InsideB } from "./InsideB";
import { InsideC } from "./InsideC";

export const FACE_COMPONENTS: Record<FaceId, ComponentType> = {
  front: Front,
  flap: Flap,
  "inside-a": InsideA,
  "inside-b": InsideB,
  "inside-c": InsideC,
  back: Back,
};
