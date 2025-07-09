"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface NavigationProps {
  activeSection: string
}

export default function Navigation({ activeSection }: NavigationProps) {
  const navRef = useRef<HTMLElement>(null)

  const navItems = [
    { label: "Home", id: "hero" },
    { label: "About", id: "about" },
    { label: "Experience", id: "experience" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ]

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 3.5, ease: "power2.out" },
      )
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-40 p-8 backdrop-blur-sm bg-black/20">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-light tracking-wider">Mohammed Anvar PP</div>

        {/* Navigation */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`group relative text-sm font-light tracking-wide transition-all duration-300 py-2 px-4 rounded-sm hover:bg-white/5 hover:scale-105 ${
                activeSection === item.id ? "text-white bg-white/10" : "text-white/50 hover:text-white/80"
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                {item.label}
                {activeSection === item.id && <div className="w-1 h-1 bg-white rounded-full animate-pulse" />}
              </span>
              {activeSection === item.id && (
                <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent" />
              )}
            </button>
          ))}
        </div>

        {/* Menu indicator */}
        <div className="flex flex-col space-y-1">
          <div className="w-6 h-px bg-white/50" />
          <div className="w-4 h-px bg-white/30" />
        </div>
      </div>
    </nav>
  )
}
