"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type * as THREE from "three"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

function AnimatedGeometry() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth rotation based on time
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      meshRef.current.rotation.y += 0.005

      // Mouse interaction
      meshRef.current.rotation.x += mousePosition.y * 0.1
      meshRef.current.rotation.y += mousePosition.x * 0.1

      // Floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.6} />
      </mesh>
    </Float>
  )
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  const particlesCount = 1000
  const positions = new Float32Array(particlesCount * 3)

  for (let i = 0; i < particlesCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20
    positions[i + 1] = (Math.random() - 0.5) * 20
    positions[i + 2] = (Math.random() - 0.5) * 20
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particlesCount} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

export default function Hero3D() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const hero = heroRef.current
    const title = titleRef.current
    const subtitle = subtitleRef.current

    if (!hero || !title || !subtitle) return

    // Initial animations
    const tl = gsap.timeline()

    tl.fromTo(
      title.children,
      {
        y: 100,
        opacity: 0,
        rotationX: 90,
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
      },
    ).fromTo(
      subtitle,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.6",
    )

    // Parallax effect
    ScrollTrigger.create({
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress
        gsap.to(hero, {
          y: progress * 200,
          duration: 0.3,
          ease: "none",
        })
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section ref={heroRef} id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} />

          <ParticleField />
          <AnimatedGeometry />

          <fog attach="fog" args={["#1a1a1a", 5, 15]} />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-8 leading-tight tracking-wide"
        >
          <span className="block">Mohammed</span>
          <span className="block text-accent">Anvar PP</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Crafting digital experiences through innovative front-end development and cutting-edge web technologies
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            onClick={() => scrollToSection("projects")}
            className="group relative px-8 py-4 border border-white/20 text-white font-light rounded-none overflow-hidden transition-all duration-500 hover:border-accent hover:text-accent"
          >
            <span className="relative z-10">View Work</span>
            <div className="absolute inset-0 bg-accent/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="group px-8 py-4 bg-accent/10 border border-accent/30 text-accent font-light rounded-none hover:bg-accent/20 transition-all duration-300"
          >
            Get In Touch
          </button>
        </div>
      </div>

      {/* Floating "Know More" button */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
        <button
          onClick={() => scrollToSection("about")}
          className="group relative px-6 py-3 border border-white/20 text-white/80 font-light text-sm rounded-full overflow-hidden transition-all duration-500 hover:border-accent hover:text-white backdrop-blur-sm"
        >
          <span className="relative z-10 flex items-center gap-2">
            Know More
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transform group-hover:translate-x-1 transition-transform duration-300"
            >
              <path d="M8 1V15M1 8H15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </span>
          <div className="absolute inset-0 bg-accent/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></div>
        </button>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <div className="text-white/60 text-sm font-light mb-4 tracking-wide">Scroll to explore</div>
        <div className="relative">
          <div className="w-px h-16 bg-gradient-to-b from-white/60 via-accent/60 to-transparent"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="text-accent animate-pulse">
              <path
                d="M1 1L6 6L11 1"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
