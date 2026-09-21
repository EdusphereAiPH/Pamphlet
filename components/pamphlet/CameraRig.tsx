"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import * as THREE from "three";
import { TOUCH } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { fitDistance, PANEL_H, PANEL_W } from "./geometry";
import type { ZoneMap } from "./Pamphlet";

type Props = {
  zones: React.MutableRefObject<ZoneMap>;
  open: boolean;
  focusId: string | null;
  resetKey: number;
};

const center = new THREE.Vector3();
const normal = new THREE.Vector3();
const up = new THREE.Vector3();
const q = new THREE.Quaternion();
const wantPos = new THREE.Vector3();
const wantLook = new THREE.Vector3();

// The HUD covers the top and bottom of the viewport; fit the pamphlet between them.
const HUD_TOP_PX = 72;
const HUD_BOTTOM_PX = 96;

// Drives the camera whenever the pamphlet's state changes, then hands control back to
// OrbitControls once it has arrived. Focus targets are recomputed every frame so the
// camera follows a panel that is still folding.
export function CameraRig({ zones, open, focusId, resetKey }: Props) {
  const size = useThree((s) => s.size);
  const driving = useRef(true);
  // Camera distance of the fitted (un-zoomed) view; the pan/rotate switch is relative to it.
  const restDist = useRef(4);

  useEffect(() => {
    driving.current = true;
  }, [open, focusId, resetKey, size.width, size.height]);

  useFrame((state, dt) => {
    // OrbitControls is registered with makeDefault, so it lives on the frame state.
    const c = state.controls as unknown as OrbitControlsImpl | null;
    const camera = state.camera;
    if (!c) return;
    const cam = camera as THREE.PerspectiveCamera;
    const aspect = size.width / size.height;

    if (!driving.current) {
      c.enabled = true;
      // Zoomed out, one finger turns the pamphlet. Zoomed in past the fitted view, one
      // finger slides across it like a map (two fingers always pinch + slide).
      c.touches.ONE = c.getDistance() < restDist.current * 0.8 ? TOUCH.PAN : TOUCH.ROTATE;
      // Keep the pamphlet filling the view: the look point may travel only as far as
      // leaves the near edge at the screen edge, so a slide can't lose it off-screen.
      const visibleH = 2 * c.getDistance() * Math.tan((cam.fov * Math.PI) / 360);
      const visibleW = visibleH * aspect;
      const limX = Math.max(0.05, (open ? 1.5 : 0.5) * PANEL_W - visibleW * 0.45);
      const limY = Math.max(0.05, PANEL_H / 2 - visibleH * 0.45);
      c.target.x = THREE.MathUtils.clamp(c.target.x, -limX, limX);
      c.target.y = THREE.MathUtils.clamp(c.target.y, -limY, limY);
      c.target.z = THREE.MathUtils.clamp(c.target.z, -0.6, 0.6);
      return;
    }
    c.enabled = false;
    c.touches.ONE = TOUCH.ROTATE;
    // Fit into the band between the HUD's header and controls: inflate the object's
    // height by viewport/safe so the full-frustum fit leaves that band free.
    const safeRatio = size.height / Math.max(200, size.height - HUD_TOP_PX - HUD_BOTTOM_PX);
    // …and shift the look point so the object centres in that band.
    const shiftFrac = (HUD_BOTTOM_PX - HUD_TOP_PX) / 2 / size.height;
    const zone = focusId ? zones.current.get(focusId) : undefined;

    if (zone) {
      zone.getWorldPosition(center);
      zone.getWorldDirection(normal);
      zone.getWorldQuaternion(q);
      up.set(0, 1, 0).applyQuaternion(q);
      const { width, height } = zone.userData as { width: number; height: number };
      const dist = fitDistance(width, height, cam.fov, aspect, 1.3) + 0.12;
      // Leave the lower half of the screen for the info sheet.
      const visibleH = 2 * dist * Math.tan((cam.fov * Math.PI) / 360);
      wantLook.copy(center).addScaledVector(up, -visibleH * 0.22);
      wantPos.copy(wantLook).addScaledVector(normal, dist);
    } else {
      const width = open ? 3 * PANEL_W : PANEL_W;
      const dist = fitDistance(width, PANEL_H * safeRatio, cam.fov, aspect, 1.04);
      restDist.current = dist;
      const visibleH = 2 * dist * Math.tan((cam.fov * Math.PI) / 360);
      wantLook.set(0, -visibleH * shiftFrac, 0);
      // A slight three-quarter view so edges, thickness and lighting read as an object.
      const az = open ? 0.1 : 0.3;
      const el = 0.09;
      wantPos.set(
        Math.sin(az) * Math.cos(el) * dist,
        Math.sin(el) * dist - visibleH * shiftFrac,
        Math.cos(az) * Math.cos(el) * dist,
      );
    }

    easing.damp3(cam.position, wantPos, 0.45, dt);
    easing.damp3(c.target, wantLook, 0.45, dt);
    c.update();

    if (cam.position.distanceTo(wantPos) < 0.004 && c.target.distanceTo(wantLook) < 0.004) {
      driving.current = false;
    }
  });

  return null;
}
