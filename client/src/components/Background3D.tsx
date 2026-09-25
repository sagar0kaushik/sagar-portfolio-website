import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useDevicePerformance } from '../hooks/useDevicePerformance';

interface ParticlesProps {
  count: number;
}

const DigitalConstellation: React.FC<ParticlesProps> = ({ count }) => {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate spherical distribution of ambient tech particles
  const positions = useMemo(() => {
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);

      const radius = 3.5 + Math.random() * 4.5;
      coords[i * 3] = radius * Math.sin(theta) * Math.cos(phi);
      coords[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      coords[i * 3 + 2] = radius * Math.cos(theta);
    }
    return coords;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x += delta * 0.02;

      // Subtle reaction to mouse pointer in Normalized Device Coordinates
      const mouse = state.pointer;
      pointsRef.current.position.x = THREE.MathUtils.lerp(
        pointsRef.current.position.x,
        mouse.x * 0.4,
        0.05
      );
      pointsRef.current.position.y = THREE.MathUtils.lerp(
        pointsRef.current.position.y,
        mouse.y * 0.4,
        0.05
      );
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#93c5fd"
          size={0.035}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.35}
        />
      </Points>
    </group>
  );
};

export const Background3D: React.FC = () => {
  const { maxParticles, isLowEnd, prefersReducedMotion } = useDevicePerformance();
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }
  }, []);

  // WebGL fallback or reduced motion
  if (!hasWebGL || prefersReducedMotion || maxParticles === 0) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-900/10 blur-[140px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-white/[0.03] blur-[120px]" />
      </div>
    );
  }

  const particleCount = isLowEnd ? 40 : 120;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60">
      {/* Ambient background glow orbs */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/[0.04] blur-[160px]" />
      <div className="absolute bottom-1/4 left-10 w-[500px] h-[500px] rounded-full bg-cyan-500/[0.03] blur-[140px]" />

      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={isLowEnd ? [1, 1] : [1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.4} />
        <DigitalConstellation count={particleCount} />
      </Canvas>
    </div>
  );
};
