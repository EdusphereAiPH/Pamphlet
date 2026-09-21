"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { CameraRig } from "./CameraRig";
import { Pamphlet, type ZoneMap } from "./Pamphlet";

type Props = {
  open: boolean;
  flipped: boolean;
  focusId: string | null;
  resetKey: number;
  onTap: (id: string) => void;
  onReady: () => void;
  onMiss: () => void;
};

export default function Scene({ open, flipped, focusId, resetKey, onTap, onReady, onMiss }: Props) {
  const zones = useRef<ZoneMap>(new Map());

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ fov: 40, position: [0, 0, 4], near: 0.05, far: 60 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => gl.setClearColor("#09090b")}
      onPointerMissed={onMiss}
      className="touch-none"
    >
      <hemisphereLight args={["#ffffff", "#26262c", 0.85]} />
      <directionalLight position={[2.5, 3.5, 4]} intensity={1.5} />
      <directionalLight position={[-3, -1.5, 2.5]} intensity={0.35} />

      <Suspense fallback={null}>
        <Pamphlet open={open} flipped={flipped} focusId={focusId} zones={zones} onTap={onTap} onReady={onReady} />
      </Suspense>

      <OrbitControls
        makeDefault
        enablePan
        screenSpacePanning
        panSpeed={0.8}
        enableDamping
        dampingFactor={0.09}
        rotateSpeed={0.55}
        zoomSpeed={0.7}
        minDistance={0.7}
        maxDistance={16}
        minPolarAngle={0.5}
        maxPolarAngle={Math.PI - 0.5}
        minAzimuthAngle={-1.25}
        maxAzimuthAngle={1.25}
      />
      <CameraRig zones={zones} open={open} focusId={focusId} resetKey={resetKey} />
    </Canvas>
  );
}
