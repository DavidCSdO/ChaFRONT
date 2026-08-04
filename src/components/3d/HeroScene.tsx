"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Instance, Instances, Lightformer } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

import { useThree } from "@react-three/fiber";

// A single petal instance that falls, flutters, and reacts to mouse
function Petal({ data }: { data: { position: [number, number, number]; rotation: [number, number, number] } }) {
  const ref = useRef<any>(null);
  const { viewport } = useThree();
  const speed = useMemo(() => Math.random() * 0.02 + 0.01, []);
  
  useFrame((state) => {
    if (!ref.current) return;
    
    // Falling
    ref.current.position.y -= speed;
    if (ref.current.position.y < -15) {
      ref.current.position.y = 15;
      ref.current.position.x = (Math.random() - 0.5) * 20;
    }
    
    // Fluttering
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.02;
    
    // React to mouse
    const mouseX = (state.pointer.x * viewport.width) / 2;
    const mouseY = (state.pointer.y * viewport.height) / 2;
    
    const dx = ref.current.position.x - mouseX;
    const dy = ref.current.position.y - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 2) {
      ref.current.position.x += dx * 0.05;
      ref.current.position.y += dy * 0.05;
    }
  });

  return (
    <Instance
      ref={ref}
      position={data.position}
      rotation={data.rotation}
      color="#D9A0A0" // Rosa antigo
    />
  );
}

function Petals() {
  const count = 50;
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = Math.random() * 20;
      const z = (Math.random() - 0.5) * 10 - 5;
      const rx = Math.random() * Math.PI;
      const ry = Math.random() * Math.PI;
      const rz = Math.random() * Math.PI;
      temp.push({ position: [x, y, z] as [number, number, number], rotation: [rx, ry, rz] as [number, number, number] });
    }
    return temp;
  }, [count]);

  return (
    <Instances limit={count}>
      <planeGeometry args={[0.2, 0.4]} />
      <meshStandardMaterial side={THREE.DoubleSide} roughness={0.6} />
      {particles.map((data, i) => (
        <Petal key={i} data={data} />
      ))}
    </Instances>
  );
}

function GoldArch() {
  return (
    <Float
      speed={2} // Animation speed, defaults to 1
      rotationIntensity={0.2} // XYZ rotation intensity, defaults to 1
      floatIntensity={0.5} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
    >
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[3, 0.08, 32, 100]} />
        <meshPhysicalMaterial 
          color="#C8A66A"
          metalness={1}
          roughness={0.15}
          envMapIntensity={2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={["#FDF6F5"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#F4EAE8" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#D9A0A0" />
        
        <Environment resolution={256}>
          <group rotation={[-Math.PI / 4, -0.3, 0]}>
            <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
            <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
            <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
          </group>
        </Environment>

        <Petals />
      </Canvas>
    </div>
  );
}
