"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Instance, Instances, Lightformer } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// Suppress THREE.Clock deprecation warning from R3F internals
if (typeof console !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) return;
    originalWarn(...args);
  };
}

import { useThree } from "@react-three/fiber";

// Shape for the Heart
const createHeartShape = () => {
  const shape = new THREE.Shape();
  const x = -0.25, y = -0.5;
  shape.moveTo(x + 0.25, y + 0.25);
  shape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
  shape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
  shape.bezierCurveTo(x - 0.3, y + 0.55, x - 0.15, y + 0.77, x + 0.25, y + 0.95);
  shape.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
  shape.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
  shape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);
  return shape;
};

const heartShape = createHeartShape();
const heartExtrudeSettings = { depth: 0.05, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.02, bevelThickness: 0.02 };

function FallingItem({ type, startPos, easterEggActive, triggerEasterEgg }: any) {
  const ref = useRef<any>(null);
  const { viewport } = useThree();
  const speed = useMemo(() => Math.random() * 0.005 + 0.005, []);
  const rotSpeed = useMemo(() => [Math.random() * 0.05, Math.random() * 0.05, Math.random() * 0.05], []);
  const scale = useMemo(() => (type === 'heart' ? 0.4 : 1), [type]);
  
  // Interactions for Easter Egg
  const isEasterEgg = type === 'diamond';
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!ref.current) return;
    
    if (easterEggActive && !isEasterEgg) {
      // Reverse gravity when easter egg is found!
      ref.current.position.y += speed * 8;
      ref.current.rotation.x += rotSpeed[0] * 3;
    } else {
      // Normal falling
      ref.current.position.y -= speed;
      if (ref.current.position.y < -30) {
        ref.current.position.y = 30;
        ref.current.position.x = (Math.random() - 0.5) * 40;
      }
      ref.current.rotation.x += rotSpeed[0];
      ref.current.rotation.y += rotSpeed[1];
      ref.current.rotation.z += rotSpeed[2];
    }
    
    // Easter Egg floating oscillation
    if (isEasterEgg && !easterEggActive) {
      ref.current.position.x += Math.sin(state.clock.elapsedTime * 2) * 0.01;
    }
  });

  return (
    <mesh
      ref={ref}
      position={startPos}
      scale={scale}
      rotation={type === 'heart' ? [Math.PI, 0, 0] : [0, 0, 0]}
      onPointerOver={() => isEasterEgg && setHovered(true)}
      onPointerOut={() => isEasterEgg && setHovered(false)}
      onClick={() => isEasterEgg && triggerEasterEgg()}
    >
      {type === 'confetti' && <planeGeometry args={[0.15, 0.3]} />}
      {type === 'ring' && <torusGeometry args={[0.15, 0.04, 16, 32]} />}
      {type === 'heart' && <extrudeGeometry args={[heartShape, heartExtrudeSettings]} />}
      {type === 'diamond' && <octahedronGeometry args={[0.4, 0]} />}

      {type === 'confetti' && <meshStandardMaterial color={Math.random() > 0.5 ? "#FDF6F5" : "#D9A0A0"} side={THREE.DoubleSide} roughness={0.5} />}
      {type === 'ring' && <meshPhysicalMaterial color="#C8A66A" metalness={1} roughness={0.15} clearcoat={1} />}
      {type === 'heart' && <meshStandardMaterial color="#D9A0A0" roughness={0.3} />}
      {type === 'diamond' && (
        <meshPhysicalMaterial 
          color={hovered ? "#ffb6c1" : "#ffffff"} 
          metalness={0.2} 
          roughness={0} 
          transmission={1} 
          thickness={0.5} 
          emissive={hovered ? "#ff69b4" : "#000000"}
          emissiveIntensity={hovered ? 0.5 : 0}
        />
      )}
    </mesh>
  );
}

import { Text } from "@react-three/drei";
import { useState } from "react";

function SceneObjects() {
  const [easterEggActive, setEasterEggActive] = useState(false);
  const count = 80;

  const items = useMemo(() => {
    const temp = [];
    const types = ['confetti', 'ring', 'heart', 'confetti', 'heart', 'confetti'];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 40;
      const y = Math.random() * 60 - 30;
      const z = (Math.random() - 0.5) * 10 - 5;
      const type = types[i % types.length];
      temp.push({ id: i, type, position: [x, y, z] });
    }
    // O Easter Egg: O Diamante Solitário
    temp.push({ id: 999, type: 'diamond', position: [0, 8, -2] });
    return temp;
  }, [count]);

  const triggerEasterEgg = () => {
    if (easterEggActive) return;
    setEasterEggActive(true);
    setTimeout(() => setEasterEggActive(false), 6000);
  };

  return (
    <>
      {items.map((data) => (
        <FallingItem 
          key={data.id} 
          type={data.type} 
          startPos={data.position} 
          easterEggActive={easterEggActive}
          triggerEasterEgg={triggerEasterEgg}
        />
      ))}

      {easterEggActive && (
        <Float speed={3} floatIntensity={1.5} rotationIntensity={0.2}>
          <Text
            position={[0, 0, 2]}
            fontSize={0.8}
            color="#C8A66A"
            outlineWidth={0.02}
            outlineColor="#ffffff"
            textAlign="center"
          >
            Vocês acharam o Easter Egg!{"\n"}O amor está no ar! 💍✨
          </Text>
        </Float>
      )}
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 20], fov: 45 }} gl={{ antialias: true, alpha: true }}>
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

        <SceneObjects />
      </Canvas>
    </div>
  );
}
