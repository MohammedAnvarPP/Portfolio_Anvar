"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import LoadingScreen from "@/components/LoadingScreen"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Experience from "@/components/Experience"
import Skills from "@/components/Skills"
import Projects from "@/components/Projects"
import Contact from "@/components/Contact"
import Navigation from "@/components/Navigation"
import { initializeAnimations } from "@/lib/animations"

// Dynamically import 3D components
const Scene3D = dynamic(() => import("@/components/Scene3D"), {
  ssr: false,
})

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("hero")
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize animations
    if (typeof window !== "undefined") {
      initializeAnimations()
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "experience", "skills", "projects", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />
  }

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-white">
      <Scene3D />
      <Navigation activeSection={activeSection} />

      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  )
}
