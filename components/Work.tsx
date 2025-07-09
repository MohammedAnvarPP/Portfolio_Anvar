"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const projects = [
  {
    title: "Polosys Books",
    category: "Enterprise Application",
    year: "2024",
    description: "Comprehensive accounting and inventory management system",
  },
  {
    title: "Support Ticketing System",
    category: "Customer Management",
    year: "2024",
    description: "Real-time customer support platform with advanced tracking",
  },
  {
    title: "Schola ERP",
    category: "Educational Platform",
    year: "2023",
    description: "Complete school management system with multiple modules",
  },
  {
    title: "Schola Parent App",
    category: "Progressive Web App",
    year: "2023",
    description: "Mobile-first parent portal for educational engagement",
  },
]

export default function Work() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tl = gsap.timeline()

            tl.fromTo(
              titleRef.current,
              { y: 50, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
            ).fromTo(
              projectsRef.current?.children || [],
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
              "-=0.4",
            )
          }
        })
      },
      { threshold: 0.3 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="flex items-center justify-center min-h-screen px-8">
      <div className="max-w-6xl w-full">
        <h2 ref={titleRef} className="text-4xl md:text-6xl font-light mb-16 tracking-tight">
          Selected Work
        </h2>

        <div ref={projectsRef} className="space-y-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group border-b border-white/10 pb-8 cursor-pointer transition-all duration-500 hover:border-white/30"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-light mb-2 group-hover:text-white/80 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-white/50 text-sm font-light tracking-wide">{project.category}</p>
                </div>
                <span className="text-white/40 text-sm font-light">{project.year}</span>
              </div>

              <p className="text-white/70 font-light max-w-2xl">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
