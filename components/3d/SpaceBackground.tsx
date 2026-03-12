"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── Starfield with twinkling stars ───
function Stars({ count = 2000 }) {
  const mesh = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const [positions, sizes, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 80;
      sz[i] = Math.random() * 2 + 0.5;

      // Slight color variation: white, blue-ish, purple-ish
      const colorChoice = Math.random();
      if (colorChoice < 0.6) {
        col[i * 3] = 1;
        col[i * 3 + 1] = 1;
        col[i * 3 + 2] = 1;
      } else if (colorChoice < 0.8) {
        col[i * 3] = 0.6;
        col[i * 3 + 1] = 0.7;
        col[i * 3 + 2] = 1;
      } else {
        col[i * 3] = 0.8;
        col[i * 3 + 1] = 0.5;
        col[i * 3 + 2] = 1;
      }
    }
    return [pos, sz, col];
  }, [count]);

  const handlePointerMove = useCallback((e: { clientX: number; clientY: number }) => {
    mouseRef.current = {
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    };
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime();

    // Gentle rotation following mouse
    mesh.current.rotation.x = mouseRef.current.y * 0.05 + time * 0.01;
    mesh.current.rotation.y = mouseRef.current.x * 0.05 + time * 0.015;

    // Twinkle effect
    const sizes = mesh.current.geometry.attributes.size;
    for (let i = 0; i < count; i++) {
      sizes.array[i] =
        (Math.sin(time * 2 + i * 0.1) * 0.5 + 1) * (Math.random() * 0.3 + 0.7) * 1.5;
    }
    sizes.needsUpdate = true;
  });

  // Listen for mouse move on window
  if (typeof window !== "undefined") {
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
  }

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
        vertexShader={`
          attribute float size;
          varying vec3 vColor;
          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (200.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying vec3 vColor;
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
            gl_FragColor = vec4(vColor, alpha * 0.9);
          }
        `}
      />
    </points>
  );
}

// ─── Shooting Stars ───
function ShootingStar() {
  const ref = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Mesh>(null);

  const config = useMemo(() => ({
    startX: (Math.random() - 0.5) * 80,
    startY: Math.random() * 30 + 15,
    startZ: (Math.random() - 0.5) * 30 - 20,
    speed: Math.random() * 0.8 + 0.4,
    delay: Math.random() * 15,
    angle: Math.random() * 0.3 + 0.2,
  }), []);

  useFrame((state) => {
    if (!ref.current || !trailRef.current) return;
    const time = state.clock.getElapsedTime();
    const cycle = (time + config.delay) % 18;

    if (cycle < 2) {
      const t = cycle / 2;
      ref.current.visible = true;
      trailRef.current.visible = true;

      ref.current.position.x = config.startX + t * 40 * config.angle;
      ref.current.position.y = config.startY - t * 30;
      ref.current.position.z = config.startZ;

      trailRef.current.position.copy(ref.current.position);
      trailRef.current.position.x -= 1.5 * config.angle;
      trailRef.current.position.y += 1.1;

      const opacity = t < 0.3 ? t / 0.3 : t > 0.7 ? (1 - t) / 0.3 : 1;
      (ref.current.material as THREE.MeshBasicMaterial).opacity = opacity;
      (trailRef.current.material as THREE.MeshBasicMaterial).opacity = opacity * 0.4;
    } else {
      ref.current.visible = false;
      trailRef.current.visible = false;
    }
  });

  const angle = Math.atan2(-30, 40 * config.angle);

  return (
    <>
      <mesh ref={ref} visible={false}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshBasicMaterial color="#ffffff" transparent />
      </mesh>
      <mesh ref={trailRef} visible={false} rotation={[0, 0, angle]}>
        <planeGeometry args={[3, 0.05]} />
        <meshBasicMaterial
          color="#a78bfa"
          transparent
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  );
}

// ─── Nebula Clouds ───
function NebulaCloud({ position, color, scale }: { position: [number, number, number]; color: string; scale: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();
    ref.current.rotation.z = time * 0.02;
    ref.current.scale.setScalar(scale + Math.sin(time * 0.5) * 0.3);
  });

  return (
    <mesh ref={ref} position={position}>
      <planeGeometry args={[20, 20]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.03}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

// ─── Floating Wireframe Geometries ───
function FloatingGeometry({
  position,
  geometry,
  color,
  speed,
  rotationAxis,
}: {
  position: [number, number, number];
  geometry: "icosahedron" | "octahedron" | "torus" | "dodecahedron" | "torusKnot";
  color: string;
  speed: number;
  rotationAxis: [number, number, number];
}) {
  const ref = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const initialPos = useRef(position);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();

    // Float animation
    ref.current.position.x = initialPos.current[0] + Math.sin(time * speed * 0.5) * 2;
    ref.current.position.y = initialPos.current[1] + Math.cos(time * speed * 0.3) * 1.5;
    ref.current.position.z = initialPos.current[2] + Math.sin(time * speed * 0.2) * 1;

    // Rotation
    ref.current.rotation.x += rotationAxis[0] * 0.005;
    ref.current.rotation.y += rotationAxis[1] * 0.005;
    ref.current.rotation.z += rotationAxis[2] * 0.005;

    // Mouse reactivity
    ref.current.position.x += mouseRef.current.x * 0.5;
    ref.current.position.y += mouseRef.current.y * 0.5;
  });

  if (typeof window !== "undefined") {
    window.addEventListener(
      "mousemove",
      (e) => {
        mouseRef.current = {
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: -(e.clientY / window.innerHeight) * 2 + 1,
        };
      },
      { passive: true }
    );
  }

  const renderGeometry = () => {
    switch (geometry) {
      case "icosahedron":
        return <icosahedronGeometry args={[1, 0]} />;
      case "octahedron":
        return <octahedronGeometry args={[1, 0]} />;
      case "torus":
        return <torusGeometry args={[1, 0.3, 8, 16]} />;
      case "dodecahedron":
        return <dodecahedronGeometry args={[1, 0]} />;
      case "torusKnot":
        return <torusKnotGeometry args={[0.8, 0.25, 64, 8]} />;
    }
  };

  return (
    <mesh ref={ref} position={position}>
      {renderGeometry()}
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// ─── Main Scene ───
function Scene() {
  const shootingStars = useMemo(
    () => Array.from({ length: 6 }, (_, i) => <ShootingStar key={i} />),
    []
  );

  return (
    <>
      <Stars count={1800} />
      {shootingStars}

      {/* Nebula clouds */}
      <NebulaCloud position={[-15, 10, -30]} color="#7c3aed" scale={4} />
      <NebulaCloud position={[20, -5, -25]} color="#3b82f6" scale={5} />
      <NebulaCloud position={[0, 15, -35]} color="#ec4899" scale={3} />

      {/* Floating geometries */}
      <FloatingGeometry
        position={[-12, 8, -15]}
        geometry="icosahedron"
        color="#a78bfa"
        speed={0.6}
        rotationAxis={[1, 0.5, 0.3]}
      />
      <FloatingGeometry
        position={[15, -5, -20]}
        geometry="octahedron"
        color="#60a5fa"
        speed={0.4}
        rotationAxis={[0.3, 1, 0.5]}
      />
      <FloatingGeometry
        position={[-8, -10, -18]}
        geometry="torus"
        color="#f472b6"
        speed={0.5}
        rotationAxis={[0.5, 0.3, 1]}
      />
      <FloatingGeometry
        position={[10, 12, -22]}
        geometry="dodecahedron"
        color="#34d399"
        speed={0.3}
        rotationAxis={[1, 1, 0.5]}
      />
      <FloatingGeometry
        position={[0, -8, -12]}
        geometry="torusKnot"
        color="#fbbf24"
        speed={0.35}
        rotationAxis={[0.5, 1, 1]}
      />
    </>
  );
}

export default function SpaceBackground() {
  return (
    <div className="fixed inset-0 z-0" style={{ background: "radial-gradient(ellipse at center, #0a0015 0%, #000000 70%)" }}>
      <Canvas
        camera={{ position: [0, 0, 25], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ position: "absolute", inset: 0 }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
