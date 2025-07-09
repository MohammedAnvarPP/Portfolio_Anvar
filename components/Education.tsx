"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const education = [
  {
    degree: "BCA (Distance Education)",
    institution: "Rabindranath Tagore University",
    description:
      "Completed while pursuing a Diploma in Computer Engineering, focusing on comprehensive computer applications and software development principles.",
    color: "from-blue-500 to-indigo-600",
    icon: "🎓",
  },
  {
    degree: "Diploma in Computer Engineering",
    institution: "AKNM GPTC, Kerala (Kerala Technical University)",
    description:
      "Specialized in software development and system design with hands-on experience in programming, database management, and web technologies.",
    color: "from-indigo-500 to-purple-600",
    icon: "💻",
  },
  {
    degree: "Computer Science (Higher Secondary)",
    institution: "PPMHSS Kottukara",
    description:
      "Foundation in computer science principles, programming fundamentals, and mathematical concepts essential for software development.",
    color: "from-purple-500 to-pink-600",
    icon: "📚",
  },
]

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const educationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const section = sectionRef.current
    const title = titleRef.current
    const educationContainer = educationRef.current

    if (!section || !title || !educationContainer) return

    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        const tl = gsap.timeline()

        tl.fromTo(
          title,
          { y: 50, opacity: 0, rotationX: 45 },
          { y: 0, opacity: 1, rotationX: 0, duration: 0.8, ease: "power3.out" },
        ).fromTo(
          educationContainer.children,
          { x: -50, opacity: 0, rotationY: 45 },
          { x: 0, opacity: 1, rotationY: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" },
          "-=0.4",
        )
      },
      onLeave: () => {
        gsap.to([title, educationContainer.children], {
          y: -30,
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
        })
      },
      onEnterBack: () => {
        const tl = gsap.timeline()

        tl.fromTo(
          title,
          { y: 50, opacity: 0, rotationX: 45 },
          { y: 0, opacity: 1, rotationX: 0, duration: 0.8, ease: "power3.out" },
        ).fromTo(
          educationContainer.children,
          { x: -50, opacity: 0, rotationY: 45 },
          { x: 0, opacity: 1, rotationY: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" },
          "-=0.4",
        )
      },
      onLeaveBack: () => {
        gsap.to([title, educationContainer.children], {
          y: 30,
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
        })
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="education"
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-indigo-50 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
        >
          Education
        </h2>

        <div ref={educationRef} className="space-y-8">
          {education.map((edu, index) => (
            <div key={index} className="group relative">
              <div className="glass-card p-8 rounded-2xl backdrop-blur-xl bg-white/60 border border-white/20 hover:bg-white/70 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${edu.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg flex-shrink-0`}
                  >
                    {edu.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{edu.degree}</h3>
                    <h4
                      className={`text-lg font-semibold bg-gradient-to-r ${edu.color} bg-clip-text text-transparent mb-4`}
                    >
                      {edu.institution}
                    </h4>
                    <p className="text-slate-600 leading-relaxed text-sm">{edu.description}</p>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${edu.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
