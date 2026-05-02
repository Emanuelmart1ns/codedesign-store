"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial, Sphere, Torus } from "@react-three/drei";
import * as THREE from "three";

function FloatingSphere({ position, color, speed = 1, scale = 1 }: { position: [number, number, number], color: string, speed?: number, scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
      meshRef.current.rotation.x += 0.005 * speed;
      meshRef.current.rotation.y += 0.01 * speed;
    }
  });

  return (
    <Sphere ref={meshRef} args={[scale, 32, 32]} position={position} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <MeshDistortMaterial
        color={color}
        distort={hovered ? 0.6 : 0.3}
        speed={hovered ? 4 : 2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

function RotatingTorus({ position, color }: { position: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Torus ref={meshRef} args={[2, 0.1, 16, 100]} position={position}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </Torus>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 500;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial size={0.03} color="#00f5ff" transparent opacity={0.6} />
    </points>
  );
}

function GridFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
      <planeGeometry args={[20, 20, 20, 20]} />
      <meshStandardMaterial color="#8b5cf6" wireframe transparent opacity={0.1} />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00f5ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />
      <pointLight position={[0, 5, 5]} intensity={0.8} color="#8b5cf6" />
      
      <FloatingSphere position={[-3, 1, 0]} color="#00f5ff" speed={1.2} scale={0.8} />
      <FloatingSphere position={[3, -0.5, -1]} color="#8b5cf6" speed={0.8} scale={1} />
      <FloatingSphere position={[0, 2, -2]} color="#ec4899" speed={1.5} scale={0.6} />
      <FloatingSphere position={[-2, -1.5, 1]} color="#10b981" speed={1} scale={0.5} />
      <FloatingSphere position={[2, 1.5, 2]} color="#00f5ff" speed={0.9} scale={0.7} />
      
      <RotatingTorus position={[0, 0, -3]} color="#8b5cf6" />
      
      <ParticleField />
      <GridFloor />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  );
}
