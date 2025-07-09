"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function ParticleBackground() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const particlesRef = useRef<THREE.Points>()

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    rendererRef.current = renderer

    mountRef.current.appendChild(renderer.domElement)

    // Enhanced particles with more colors and effects
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 3000 // Increased count for more density

    const posArray = new Float32Array(particlesCount * 3)
    const colorArray = new Float32Array(particlesCount * 3)
    const sizeArray = new Float32Array(particlesCount)

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // More spread out positioning
      posArray[i] = (Math.random() - 0.5) * 30
      posArray[i + 1] = (Math.random() - 0.5) * 30
      posArray[i + 2] = (Math.random() - 0.5) * 30

      // Enhanced color palette - space-like colors
      const colorVariant = Math.random()
      let color

      if (colorVariant < 0.3) {
        // Deep space blues
        color = new THREE.Color().setHSL(0.6 + Math.random() * 0.1, 0.8, 0.4 + Math.random() * 0.3)
      } else if (colorVariant < 0.6) {
        // Nebula purples and magentas
        color = new THREE.Color().setHSL(0.8 + Math.random() * 0.15, 0.7, 0.5 + Math.random() * 0.3)
      } else if (colorVariant < 0.8) {
        // Cosmic teals and cyans
        color = new THREE.Color().setHSL(0.5 + Math.random() * 0.1, 0.6, 0.6 + Math.random() * 0.2)
      } else {
        // Stellar whites and light blues
        color = new THREE.Color().setHSL(0.55 + Math.random() * 0.05, 0.3, 0.8 + Math.random() * 0.2)
      }

      colorArray[i] = color.r
      colorArray[i + 1] = color.g
      colorArray[i + 2] = color.b

      // Varying particle sizes
      sizeArray[i / 3] = Math.random() * 0.03 + 0.01
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3))
    particlesGeometry.setAttribute("size", new THREE.BufferAttribute(sizeArray, 1))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.025,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    particlesRef.current = particles
    scene.add(particles)

    camera.position.z = 5

    // Animation
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      requestAnimationFrame(animate)

      if (particles) {
        // Slower, more graceful rotation
        particles.rotation.x += 0.0005
        particles.rotation.y += 0.001
        particles.rotation.z += 0.0003

        // Enhanced mouse interaction with smoother movement
        particles.rotation.x += mouseY * 0.0003
        particles.rotation.y += mouseX * 0.0003

        // Add subtle pulsing effect
        const time = Date.now() * 0.001
        particles.material.opacity = 0.7 + Math.sin(time * 0.5) * 0.2
      }

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }

      renderer.dispose()
      particlesGeometry.dispose()
      particlesMaterial.dispose()
    }
  }, [])

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" style={{ background: "transparent" }} />
}
