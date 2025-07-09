"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const skillCategories = [
  {
    title: "Frontend Technologies",
    skills: ["ReactJS", "NextJS", "TypeScript", "JavaScript", "HTML", "CSS", "SCSS", "Tailwind CSS"],
    color: "from-blue-500/20 to-purple-500/20",
  },
  {
    title: "Backend & Tools",
    skills: ["NodeJS", "ExpressJS", "Redux Toolkit", "React Query", "Hook Form", "Jest", "Vitest", "Git"],
    color: "from-green-500/20 to-teal-500/20",
  },
  {
    title: "Development Tools",
    skills: ["Webpack", "Babel", "NPM", "AWS", "Postman", "Bootstrap"],
    color: "from-orange-500/20 to-red-500/20",
  },
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const section = sectionRef.current
    const title = titleRef.current
    const skills = skillsRef.current
    const particles = particlesRef.current

    if (!section || !title || !skills) return

    // Animate floating particles
    if (particles) {
      gsap.to(particles.children, {
        y: "random(-50, 50)",
        x: "random(-30, 30)",
        rotation: "random(-360, 360)",
        duration: "random(5, 10)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      })
    }

    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        const tl = gsap.timeline()

        tl.fromTo(
          title,
          { y: 50, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
        ).fromTo(
          skills.children,
          { y: 30, opacity: 0, rotationX: 45 },
          { y: 0, opacity: 1, rotationX: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" },
          "-=0.4",
        )

        // Add continuous floating animation
        gsap.to(skills.children, {
          y: "random(-8, 8)",
          duration: "random(3, 6)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.3,
          delay: 1,
        })
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} id="skills" className="min-h-screen py-32 px-8 relative overflow-hidden">
      {/* Animated background particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-2 h-2 bg-blue-500/20 rounded-full animate-pulse" />
        <div
          className="absolute top-40 right-20 w-3 h-3 border border-green-500/20 rounded-full animate-spin"
          style={{ animationDuration: "8s" }}
        />
        <div className="absolute bottom-60 left-40 w-1 h-1 bg-purple-500/30 rounded-full animate-ping" />
        <div className="absolute top-80 right-10 w-2 h-2 border border-orange-500/20 rotate-45 animate-bounce" />
        <div className="absolute bottom-40 right-60 w-4 h-1 bg-gradient-to-r from-teal-500/20 to-transparent animate-pulse" />
        <div className="absolute top-20 right-40 w-1 h-6 bg-gradient-to-t from-red-500/20 to-transparent animate-pulse" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-light mb-16 tracking-tight hover:scale-105 transition-transform duration-500"
        >
          Technical Skills
        </h2>

        <div ref={skillsRef} className="grid md:grid-cols-3 gap-12">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className={`group space-y-6 p-8 rounded-2xl bg-black/60 backdrop-blur-sm bg-gradient-to-br ${category.color} border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/10`}
            >
              <h3 className="text-xl font-bold text-white/90 border-b border-white/20 pb-4 group-hover:text-white transition-colors duration-300">
                {category.title}
              </h3>

              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="group/skill cursor-pointer py-3 px-4 border border-white/5 rounded-lg hover:border-white/20 hover:bg-white/5 transition-all duration-300 transform hover:scale-105 hover:translate-x-2"
                  >
                    <span className="text-white/70 font-bold group-hover/skill:text-white transition-colors duration-300 flex items-center justify-between">
                      {skill}
                      <div className="w-2 h-2 bg-white/20 rounded-full group-hover/skill:bg-white/50 group-hover/skill:animate-pulse transition-all duration-300" />
                    </span>
                  </div>
                ))}
              </div>

              {/* Animated border */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/40 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
