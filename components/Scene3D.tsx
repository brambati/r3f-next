// components/Scene3D.tsx
// npm install @react-three/fiber @react-three/drei three
// ATENÇÃO: precisa de "use client" no Next.js App Router

"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, MeshDistortMaterial } from "@react-three/drei";
import type { Mesh } from "three";

// ─────────────────────────────────────────────────
// Componente da esfera animada e distorcida
// ─────────────────────────────────────────────────
function AnimatedSphere({ color }: { color: string }) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // useFrame: roda a cada frame SEM causar re-render do React
  // state.clock.getElapsedTime() = tempo em segundos desde o início
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    // Rotação baseada em tempo (mesmo em qualquer fps)
    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.rotation.y = t * 0.3;

    // Flutuação suave no eixo Y
    meshRef.current.position.y = Math.sin(t * 0.8) * 0.15;

    // Escala no hover
    const scale = hovered ? 1.1 : 1.0;
    meshRef.current.scale.setScalar(
      meshRef.current.scale.x + (scale - meshRef.current.scale.x) * 0.1
    );
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* args = argumentos do construtor: SphereGeometry(radius, widthSeg, heightSeg) */}
      <sphereGeometry args={[1.5, 64, 64]} />

      {/* MeshDistortMaterial do Drei: distorce a geometria de forma orgânica */}
      <MeshDistortMaterial
        color={color}
        distort={0.4}    // intensidade da distorção (0 = normal, 1 = muito distorcido)
        speed={2}        // velocidade da animação de distorção
        roughness={0.1}  // superfície lisa
        metalness={0.1}
      />
    </mesh>
  );
}

// ─────────────────────────────────────────────────
// Objeto 2: TorusKnot simples para compor a cena
// ─────────────────────────────────────────────────
function FloatingKnot() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.5;
    meshRef.current.rotation.z = t * 0.3;
    meshRef.current.position.x = Math.sin(t * 0.4) * 3;
    meshRef.current.position.y = Math.cos(t * 0.3) * 0.5;
  });

  return (
    <mesh ref={meshRef} scale={0.4}>
      <torusKnotGeometry args={[1, 0.35, 100, 16]} />
      <meshStandardMaterial color="#00e5ff" roughness={0.2} metalness={0.3} />
    </mesh>
  );
}

// ─────────────────────────────────────────────────
// Componente principal: Canvas + toda a cena
// ─────────────────────────────────────────────────
export function Scene3D() {
  const [color, setColor] = useState("#a78bfa");

  const colors = ["#a78bfa", "#00e5ff", "#ff6b35", "#34d399", "#fbbf24"];

  return (
    <div className="scene-wrapper">

      {/* Canvas = Scene + Camera + Renderer do Three.js em JSX */}
      <Canvas
        camera={{ position: [0, 0, 4], fov: 75 }}
        gl={{ antialias: true }}
      >
        {/* Luzes */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 3]} intensity={2} />
        <directionalLight position={[-3, -1, -3]} intensity={0.5} color="#a78bfa" />

        {/* Objetos */}
        <AnimatedSphere color={color} />
        <FloatingKnot />

        {/* Helpers do Drei */}
        <Stars radius={100} depth={50} count={3000} factor={4} fade speed={1} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      {/* UI fora do Canvas — React normal */}
      <div className="scene-ui">
        <h2>Mude a cor</h2>
        <div className="color-buttons">
          {colors.map((c) => (
            <button
              key={c}
              className="color-btn"
              style={{ background: c, outline: c === color ? "2px solid white" : "none" }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
