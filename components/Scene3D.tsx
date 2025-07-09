"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Sphere, Box, Torus, Icosahedron, Ring } from "@react-three/drei"
import type * as THREE from "three"

function CursorResponsiveGeometry() {
  const groupRef = useRef<THREE.Group>(null)
  const sphereRef = useRef<THREE.Mesh>(null)
  const boxRef = useRef<THREE.Mesh>(null)
  const torusRef = useRef<THREE.Mesh>(null)
  const icoRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { viewport } = useThree()

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    const mouseInfluence = 0.5

    if (groupRef.current) {
      // Base rotation with cursor influence
      groupRef.current.rotation.y = time * 0.1 + mousePosition.x * 0.2
      groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.1 + mousePosition.y * 0.1
    }

    if (sphereRef.current) {
      // Main globe with cursor tracking
      sphereRef.current.position.y = Math.sin(time * 0.5) * 2 + mousePosition.y * 0.5
      sphereRef.current.position.x = mousePosition.x * 0.3
      sphereRef.current.rotation.x = time * 0.3 + mousePosition.y * 0.2
      sphereRef.current.rotation.z = time * 0.2 + mousePosition.x * 0.1

      // Scale based on cursor proximity to center
      const distanceFromCenter = Math.sqrt(mousePosition.x ** 2 + mousePosition.y ** 2)
      const scale = 1 + (1 - distanceFromCenter) * 0.3
      sphereRef.current.scale.setScalar(scale)
    }

    if (boxRef.current) {
      boxRef.current.position.y = Math.cos(time * 0.7) * 1.5 - mousePosition.y * 0.4
      boxRef.current.position.x = 4 + mousePosition.x * 0.6
      boxRef.current.rotation.x = time * 0.4 + mousePosition.x * 0.3
      boxRef.current.rotation.y = time * 0.3 + mousePosition.y * 0.2
      boxRef.current.rotation.z = time * 0.2
    }

    if (torusRef.current) {
      torusRef.current.position.y = Math.sin(time * 0.3) * 1 + mousePosition.y * 0.3
      torusRef.current.position.x = -3 - mousePosition.x * 0.4
      torusRef.current.rotation.x = time * 0.5 + mousePosition.y * 0.4
      torusRef.current.rotation.y = time * 0.4 + mousePosition.x * 0.3
    }

    if (icoRef.current) {
      icoRef.current.position.y = Math.cos(time * 0.4) * 2.5 + mousePosition.y * 0.6
      icoRef.current.position.x = 2 + mousePosition.x * 0.5
      icoRef.current.rotation.x = time * 0.2 + mousePosition.x * 0.2
      icoRef.current.rotation.y = time * 0.6 + mousePosition.y * 0.3
    }

    // Spiral rings that follow cursor
    if (ringRef.current) {
      ringRef.current.position.x = mousePosition.x * 2
      ringRef.current.position.y = mousePosition.y * 1.5
      ringRef.current.rotation.z = time * 0.8 + mousePosition.x * 0.5
      ringRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.2)
    }

    if (ring2Ref.current) {
      ring2Ref.current.position.x = -mousePosition.x * 1.5
      ring2Ref.current.position.y = -mousePosition.y * 1.2
      ring2Ref.current.rotation.z = -time * 0.6 - mousePosition.y * 0.4
      ring2Ref.current.scale.setScalar(0.8 + Math.cos(time * 1.5) * 0.3)
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main Globe/Sphere - cursor responsive */}
      <Sphere ref={sphereRef} args={[1.2, 32, 32]} position={[0, 0, -5]}>
        <meshStandardMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.7}
          emissive="#ffffff"
          emissiveIntensity={0.15}
        />
      </Sphere>

      {/* Floating Box */}
      <Box ref={boxRef} args={[0.8, 0.8, 0.8]} position={[4, 0, -3]}>
        <meshStandardMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.5}
          emissive="#ffffff"
          emissiveIntensity={0.08}
        />
      </Box>

      {/* Torus Ring */}
      <Torus ref={torusRef} args={[1, 0.3, 16, 32]} position={[-3, 0, -4]}>
        <meshStandardMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.6}
          emissive="#ffffff"
          emissiveIntensity={0.1}
        />
      </Torus>

      {/* Icosahedron */}
      <Icosahedron ref={icoRef} args={[0.8, 1]} position={[2, 3, -6]}>
        <meshStandardMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.4}
          emissive="#ffffff"
          emissiveIntensity={0.08}
        />
      </Icosahedron>

      {/* Cursor-following spiral rings */}
      <Ring ref={ringRef} args={[1.5, 2, 32]} position={[0, 0, -2]}>
        <meshStandardMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.3}
          emissive="#ffffff"
          emissiveIntensity={0.05}
        />
      </Ring>

      <Ring ref={ring2Ref} args={[0.8, 1.2, 24]} position={[0, 0, -3]}>
        <meshStandardMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.4}
          emissive="#ffffff"
          emissiveIntensity={0.06}
        />
      </Ring>

      {/* Additional smaller spheres with cursor influence */}
      <Sphere args={[0.3, 16, 16]} position={[-4, 2, -2]}>
        <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.5} />
      </Sphere>

      <Sphere args={[0.4, 16, 16]} position={[3, -2, -3]}>
        <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.4} />
      </Sphere>
    </group>
  )
}

function CursorResponsiveParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const points2Ref = useRef<THREE.Points>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.02 + mousePosition.x * 0.05
      pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.1 + mousePosition.y * 0.03

      // Particle attraction to cursor
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        const originalX = positions[i]
        const originalY = positions[i + 1]

        // Subtle attraction to mouse position
        positions[i] += (mousePosition.x * 5 - originalX) * 0.001
        positions[i + 1] += (mousePosition.y * 5 - originalY) * 0.001
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }

    if (points2Ref.current) {
      points2Ref.current.rotation.y = -time * 0.015 - mousePosition.x * 0.03
      points2Ref.current.rotation.z = Math.cos(time * 0.08) * 0.05 + mousePosition.y * 0.02
    }
  })

  const particleCount = 1000
  const positions = new Float32Array(particleCount * 3)
  const positions2 = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 25
    positions[i + 1] = (Math.random() - 0.5) * 25
    positions[i + 2] = (Math.random() - 0.5) * 15

    positions2[i] = (Math.random() - 0.5) * 40
    positions2[i + 1] = (Math.random() - 0.5) * 40
    positions2[i + 2] = (Math.random() - 0.5) * 25
  }

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.025} color="#ffffff" transparent opacity={0.7} sizeAttenuation />
      </points>

      <points ref={points2Ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={positions2} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.4} sizeAttenuation />
      </points>
    </>
  )
}

function CursorResponsiveGrid() {
  const gridRef = useRef<THREE.GridHelper>(null)
  const grid2Ref = useRef<THREE.GridHelper>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (gridRef.current) {
      gridRef.current.position.z = (time * 0.5) % 8
      gridRef.current.position.x = mousePosition.x * 2
      gridRef.current.material.opacity = 0.2 + Math.sin(time * 0.5) * 0.1 + Math.abs(mousePosition.x) * 0.1
    }

    if (grid2Ref.current) {
      grid2Ref.current.position.z = ((time * 0.5) % 8) - 8
      grid2Ref.current.position.x = -mousePosition.x * 1.5
      grid2Ref.current.material.opacity = 0.15 + Math.cos(time * 0.3) * 0.05 + Math.abs(mousePosition.y) * 0.08
    }
  })

  return (
    <>
      <gridHelper ref={gridRef} args={[40, 40, "#444444", "#333333"]} position={[0, -8, 0]} />
      <gridHelper ref={grid2Ref} args={[40, 40, "#444444", "#333333"]} position={[0, -8, -8]} />
    </>
  )
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 2, 8], fov: 60 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.6} />
        <spotLight position={[0, 20, 0]} angle={0.3} penumbra={1} intensity={0.8} />

        <CursorResponsiveGeometry />
        <CursorResponsiveParticles />
        <CursorResponsiveGrid />

        <fog attach="fog" args={["#000000", 8, 35]} />
      </Canvas>
    </div>
  )
}
