"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Line, useTexture } from "@react-three/drei";
import { easing } from "maath";
import * as THREE from "three";
import rectsJson from "@/content/hotspot-rects.json";
import type { FaceId } from "@/content/hotspots";
import { FACE_TONE, PANEL_FACES, PANEL_H, PANEL_W, THICK, TEXTURE_URL, zoneTransform, type PanelId, type Rect, type Side } from "./geometry";

const RECTS = rectsJson as Record<FaceId, Rect[]>;
const FACES = Object.keys(PANEL_FACES).flatMap((p) => Object.values(PANEL_FACES[p as PanelId])) as FaceId[];

export type ZoneMap = Map<string, THREE.Object3D>;

type Props = {
  open: boolean;
  flipped: boolean;
  focusId: string | null;
  zones: React.MutableRefObject<ZoneMap>;
  onTap: (id: string) => void;
  onMiss?: () => void;
  onReady?: () => void;
};

export function Pamphlet({ open, flipped, focusId, zones, onTap, onMiss, onReady }: Props) {
  const textures = useTexture(Object.fromEntries(FACES.map((f) => [f, TEXTURE_URL(f)])) as Record<FaceId, string>);
  // Selectors, not the whole store: a bare useThree() re-renders this tree on every
  // store change and stalls the fold animation.
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  const camera = useThree((s) => s.camera);

  useEffect(() => {
    for (const t of Object.values(textures)) {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
      t.needsUpdate = true;
    }
    // Upload textures and compile every material now, behind the loader, instead of
    // on the first frame the visitor sees. Synchronous: one-off, and the loader hides it.
    try {
      for (const t of Object.values(textures)) gl.initTexture(t);
      gl.compile(scene, camera);
    } catch {
      /* fall through: the first frame compiles instead */
    }
    onReady?.();
  }, [textures, onReady, gl, scene, camera]);

  const materials = useMemo(() => {
    const edge = new THREE.MeshStandardMaterial({ color: "#d9d9df", roughness: 0.95 });
    const mk = (face: FaceId) => new THREE.MeshStandardMaterial({ map: textures[face], roughness: 0.88, metalness: 0 });
    const set = (p: PanelId) => [edge, edge, edge, edge, mk(PANEL_FACES[p].front), mk(PANEL_FACES[p].back)];
    return { A: set("A"), B: set("B"), C: set("C") };
  }, [textures]);

  const root = useRef<THREE.Group>(null);
  const pivotA = useRef<THREE.Group>(null);
  const pivotC = useRef<THREE.Group>(null);
  const progress = useRef({ open: open ? 1 : 0 });
  const markers = useRef(new Set<THREE.Group>());

  useFrame((state, dt) => {
    easing.damp(progress.current, "open", open ? 1 : 0, 0.45, dt);
    const o = progress.current.open;
    // A (the cover) opens first, then C. Closing runs the same curve backwards.
    const aOpen = THREE.MathUtils.clamp(o * 2, 0, 1);
    const cOpen = THREE.MathUtils.clamp(o * 2 - 1, 0, 1);
    if (pivotA.current) pivotA.current.rotation.y = Math.PI * (1 - aOpen);
    if (pivotC.current) pivotC.current.rotation.y = -Math.PI * (1 - cOpen);
    const t = state.clock.elapsedTime;
    // Idle sway: the pamphlet breathes a little while nobody is focused on a hotspot.
    const sway = focusId ? 0 : Math.sin(t * 0.7) * 0.035;
    if (root.current) easing.damp(root.current.rotation, "y", (flipped ? Math.PI : 0) + sway, 0.5, dt);

    const pulse = (t % 1.8) / 1.8;
    for (const m of markers.current) {
      const ring = m.children[0] as THREE.Mesh | undefined;
      if (!ring) continue;
      ring.scale.setScalar(1 + pulse * 0.9);
      (ring.material as THREE.MeshBasicMaterial).opacity = (1 - pulse) * 0.9;
    }
  });

  const panel = (id: PanelId, position: [number, number, number]) => (
    <group position={position}>
      {/* Tapping the paper (not a dot) while zoomed in closes the sheet, same as tapping
          the dark background: when focused there is often no background left to tap. */}
      <mesh
        material={materials[id]}
        onClick={(e) => {
          e.stopPropagation();
          if (focusId) onMiss?.();
        }}
      >
        <boxGeometry args={[PANEL_W, PANEL_H, THICK]} />
      </mesh>
      {(["front", "back"] as Side[]).map((side) => {
        const face = PANEL_FACES[id][side];
        return (RECTS[face] ?? []).map((rect) => {
          // Marker colour follows what is painted under it (a dark card on a paper face).
          const color = (rect.tone ?? FACE_TONE[face]) === "dark" ? "#f5f5f7" : "#09090b";
          const z = zoneTransform(rect, side);
          const focused = focusId === rect.id;
          return (
            <group key={rect.id} position={z.position} rotation={z.rotation}>
              {/* invisible tap target, registered for the camera rig */}
              <mesh
                ref={(m) => {
                  if (m) {
                    m.userData = { width: z.width, height: z.height };
                    zones.current.set(rect.id, m);
                  } else zones.current.delete(rect.id);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  // Tapping the focused region again closes its sheet; while zoomed in it
                  // fills the screen, so this is the natural "tap outside" gesture.
                  if (focusId === rect.id) onMiss?.();
                  else onTap(rect.id);
                }}
              >
                <planeGeometry args={[z.width, z.height]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
              </mesh>

              {/* pulsing marker at the zone's lower-right corner */}
              {!focusId && (
                <group
                  position={[z.width / 2 - 0.034, -z.height / 2 + 0.034, 0.001]}
                  ref={(g) => {
                    if (!g) return;
                    markers.current.add(g);
                    return () => {
                      markers.current.delete(g);
                    };
                  }}
                >
                  <mesh>
                    <ringGeometry args={[0.022, 0.03, 32]} />
                    <meshBasicMaterial color={color} transparent depthWrite={false} />
                  </mesh>
                  <mesh>
                    <circleGeometry args={[0.013, 24]} />
                    <meshBasicMaterial color={color} />
                  </mesh>
                </group>
              )}

              {focused && (
                <Line
                  points={[
                    [-z.width / 2, -z.height / 2, 0.0015],
                    [z.width / 2, -z.height / 2, 0.0015],
                    [z.width / 2, z.height / 2, 0.0015],
                    [-z.width / 2, z.height / 2, 0.0015],
                    [-z.width / 2, -z.height / 2, 0.0015],
                  ]}
                  color={color}
                  lineWidth={2}
                  transparent
                  opacity={0.9}
                />
              )}
            </group>
          );
        });
      })}
    </group>
  );

  return (
    <group ref={root}>
      {panel("B", [0, 0, 0])}
      <group ref={pivotC} position={[PANEL_W / 2, 0, THICK / 2]}>
        {panel("C", [PANEL_W / 2, 0, -THICK / 2])}
      </group>
      <group ref={pivotA} position={[-PANEL_W / 2, 0, THICK]}>
        {panel("A", [-PANEL_W / 2, 0, -THICK])}
      </group>
    </group>
  );
}

useTexture.preload(FACES.map((f) => TEXTURE_URL(f)));
