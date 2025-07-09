"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const floatingElementsRef = useRef<HTMLDivElement>(null)
  const cursorTrailRef = useRef<HTMLDivElement>(null)

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHeroSection, setIsHeroSection] = useState(true)

  useEffect(() => {
    if (typeof window === "undefined") return

    const title = titleRef.current
    const subtitle = subtitleRef.current
    const floatingElements = floatingElementsRef.current
    const cursorTrail = cursorTrailRef.current

    if (!title || !subtitle) return

    // Mouse tracking for cursor effects
    const handleMouseMove = (event: MouseEvent) => {
      const x = event.clientX
      const y = event.clientY
      setMousePosition({ x, y })

      // Update cursor trail position
      if (cursorTrail && isHeroSection) {
        gsap.to(cursorTrail, {
          x: x - 25,
          y: y - 25,
          duration: 0.1,
          ease: "power2.out",
        })
      }
    }

    // Check if we're in hero section
    const handleScroll = () => {
      const heroElement = heroRef.current
      if (heroElement) {
        const rect = heroElement.getBoundingClientRect()
        const inHeroSection = rect.top <= 100 && rect.bottom >= 100
        setIsHeroSection(inHeroSection)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    // Initial animation
    const tl = gsap.timeline({ delay: 4 })

    tl.fromTo(
      title.children,
      { y: 100, opacity: 0, rotationX: 90 },
      { y: 0, opacity: 1, rotationX: 0, duration: 1.2, stagger: 0.2, ease: "power3.out" },
    ).fromTo(
      subtitle,
      { y: 50, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
      "-=0.6",
    )

    // Floating elements animation with cursor influence
    if (floatingElements) {
      gsap.to(floatingElements.children, {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        rotation: "random(-15, 15)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      })
    }

    // Continuous title animation with mouse influence
    gsap.to(title, {
      y: "random(-5, 5)",
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isHeroSection])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-8 overflow-hidden"
    >
      {/* Custom cursor trail - only visible in hero section */}
      <div
        ref={cursorTrailRef}
        className={`fixed w-12 h-12 pointer-events-none z-50 transition-opacity duration-300 ${
          isHeroSection ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.2)",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="absolute inset-2 border border-white/30 rounded-full animate-pulse" />
        <div className="absolute inset-4 bg-white/20 rounded-full animate-ping" />
      </div>

      {/* Floating decorative elements with cursor interaction */}
      <div ref={floatingElementsRef} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse transition-transform duration-300"
          style={{
            top: "20%",
            left: "10%",
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        />
        <div
          className="absolute w-1 h-1 bg-white/30 rounded-full animate-ping transition-transform duration-300"
          style={{
            top: "40%",
            right: "20%",
            transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * 0.03}px)`,
          }}
        />
        <div
          className="absolute w-3 h-3 border border-white/20 rotate-45 animate-spin transition-transform duration-300"
          style={{
            animationDuration: "8s",
            bottom: "40%",
            left: "20%",
            transform: `translate(${mousePosition.x * 0.04}px, ${mousePosition.y * -0.02}px) rotate(45deg)`,
          }}
        />
        <div
          className="absolute w-2 h-2 border border-white/15 rounded-full animate-bounce transition-transform duration-300"
          style={{
            top: "60%",
            right: "40%",
            transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.03}px)`,
          }}
        />
        <div
          className="absolute w-1 h-8 bg-gradient-to-t from-white/20 to-transparent animate-pulse transition-transform duration-300"
          style={{
            bottom: "60%",
            right: "10%",
            transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.04}px)`,
          }}
        />
        <div
          className="absolute w-4 h-1 bg-white/10 animate-pulse transition-transform duration-300"
          style={{
            top: "80%",
            left: "40%",
            transform: `translate(${mousePosition.x * -0.04}px, ${mousePosition.y * 0.02}px)`,
          }}
        />
      </div>

      <div className="text-center max-w-4xl mx-auto relative z-10">
        <h1 ref={titleRef} className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight mb-8 leading-none">
          <span
            className="block transform hover:scale-105 transition-all duration-500"
            style={{
              transform: `translateX(${mousePosition.x * 0.01}px) translateY(${mousePosition.y * 0.01}px)`,
            }}
          >
            Mohammed
          </span>
          <span
            className="block text-white/60 transform hover:scale-105 transition-all duration-500"
            style={{
              transform: `translateX(${mousePosition.x * -0.01}px) translateY(${mousePosition.y * -0.01}px)`,
            }}
          >
            Anvar PP
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-white/70 mb-16 max-w-2xl mx-auto font-light leading-relaxed transform hover:scale-105 transition-all duration-500"
          style={{
            transform: `translateX(${mousePosition.x * 0.005}px) translateY(${mousePosition.y * 0.005}px)`,
          }}
        >
          Front-End Developer crafting exceptional digital experiences through innovative web technologies and
          cutting-edge design
        </p>
      </div>

      {/* Enhanced scroll indicator moved further down with cursor influence */}
      <div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
        onClick={() => scrollToSection("about")}
        style={{
          transform: `translateX(-50%) translateX(${mousePosition.x * 0.01}px) translateY(${mousePosition.y * 0.01}px)`,
        }}
      >
        <div className="text-white/40 text-xs font-light mb-4 tracking-wider uppercase animate-pulse">
          Scroll to explore
        </div>

        <div className="relative mb-4 animate-bounce hover:scale-110 transition-transform duration-300">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center relative overflow-hidden hover:border-white/50 transition-colors duration-300">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>

          <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
            <div className="w-0.5 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "0.5s" }} />
          </div>
        </div>

        <div className="flex flex-col items-center space-y-1">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="text-white/40 animate-bounce">
            <path
              d="M1 1L6 6L11 1"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            className="text-white/30 animate-bounce"
            style={{ animationDelay: "0.2s" }}
          >
            <path
              d="M1 1L6 6L11 1"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            className="text-white/20 animate-bounce"
            style={{ animationDelay: "0.4s" }}
          >
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
    </section>
  )
}
