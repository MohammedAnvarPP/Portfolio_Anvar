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
    description: "Completed while pursuing a Diploma in Computer Engineering.",
  },
  {
    degree: "Diploma in Computer Engineering",
    institution: "AKNM GPTC, Kerala (Kerala Technical University)",
    description: "Focus on software development and system design.",
  },
  {
    degree: "Computer Science (Higher Secondary)",
    institution: "PPMHSS Kottukara",
    description: "Foundation in computer science principles.",
  },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const section = sectionRef.current
    const title = titleRef.current
    const content = contentRef.current

    if (!section || !title || !content) return

    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        const tl = gsap.timeline()

        tl.fromTo(title, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }).fromTo(
          content.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
          "-=0.4",
        )
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} id="about" className="min-h-screen py-32 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 ref={titleRef} className="text-4xl md:text-6xl font-light mb-16 tracking-tight">
          About
        </h2>

        <div ref={contentRef} className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-bold mb-4 text-white/90">Expertise</h3>
              <p className="text-white/70 font-light leading-relaxed">
                With <b>3 years</b> of experience in front-end development, I specialize in creating modern, responsive
                web applications using <b>React.js</b>, <b>Next.js</b>, and <b>TypeScript</b>. My passion lies in
                crafting exceptional user experiences through clean code and innovative design.
              </p>
            </div>

            <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-bold mb-4 text-white/90">Technical Focus</h3>
              <p className="text-white/70 font-light leading-relaxed">
                I have extensive experience in developing enterprise-level applications, eCommerce platforms, and
                management systems. My expertise spans across the entire front-end development lifecycle, from UI/UX
                design to performance optimization and deployment.
              </p>
            </div>

            <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-bold mb-4 text-white/90">Continuous Learning</h3>
              <p className="text-white/70 font-light leading-relaxed">
                I'm committed to staying at the forefront of web development technologies. I continuously explore new
                frameworks, tools, and best practices to deliver cutting-edge solutions that meet modern business
                requirements.
              </p>
            </div>
          </div>

          <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-light mb-8 text-white/90">Education</h3>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="border-b border-white/10 pb-6 last:border-b-0">
                  <h4 className="text-lg font-bold text-white mb-2">{edu.degree}</h4>
                  <h5 className="text-white/70 font-bold mb-2">{edu.institution}</h5>
                  <p className="text-white/60 font-light text-sm">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
