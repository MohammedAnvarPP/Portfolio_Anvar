"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import type * as THREE from "three"

function GridPlane() {
  const gridRef = useRef<THREE.GridHelper>(null)

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.elapsedTime * 0.2) % 4
      gridRef.current.material.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  return (
    <>
      <gridHelper ref={gridRef} args={[30, 30, "#333333", "#333333"]} position={[0, -8, 0]} rotation={[0, 0, 0]} />
      <gridHelper args={[30, 30, "#333333", "#333333"]} position={[0, -8, -4]} rotation={[0, 0, 0]} />
    </>
  )
}

function SubtleParticles() {
  const particlesRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
      particlesRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.5
    }
  })

  const particlesCount = 200
  const positions = new Float32Array(particlesCount * 3)

  for (let i = 0; i < particlesCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 30
    positions[i + 1] = (Math.random() - 0.5) * 20
    positions[i + 2] = (Math.random() - 0.5) * 30
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particlesCount} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.01} color="#D4A017" transparent opacity={0.3} sizeAttenuation />
    </points>
  )
}

export default function SpatialBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 2, 10], fov: 60 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.05} />
        <pointLight position={[0, 10, 0]} intensity={0.1} />

        <GridPlane />
        <SubtleParticles />

        <fog attach="fog" args={["#1a1a1a", 15, 35]} />
      </Canvas>
    </div>
  )
}
