"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const projects = [
  {
    title: "Polosys Books – Accounting & Inventory Management System",
    category: "Enterprise Application",
    year: "2024",
    description:
      "Developed as an alternative to **Zoho Books**, supporting **billing**, **invoicing**, **expenses**, **payments**, **GST reports**, and **profit & loss tracking**. Included features like **inventory control**, **customer/supplier management**, and **multi-user access**.",
    technologies: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
    gradient: "from-blue-500/10 to-purple-500/10",
  },
  {
    title: "Ticketing App – Customer Support Management System",
    category: "Customer Management",
    year: "2024",
    description:
      "Built a user-friendly ticketing system for managing customer queries, complaints, and support requests efficiently. Features included ticket assignment, status tracking, priority levels, and real-time updates.",
    technologies: ["Next.js", "React.js", "TypeScript", "Redux"],
    gradient: "from-green-500/10 to-teal-500/10",
  },
  {
    title: "Schola Parent App",
    category: "Progressive Web App",
    year: "2023",
    description:
      "Developed a Progressive Web App (PWA) using Next.js, designed to empower parents with real-time access to vital student information including exam results, timetables, fee status, and homework assignments.",
    technologies: ["Next.js", "PWA", "React.js", "TypeScript"],
    gradient: "from-orange-500/10 to-red-500/10",
  },
  {
    title: "Schola – School Management ERP",
    category: "Educational Platform",
    year: "2023",
    description:
      "Developed a comprehensive ERP system to streamline school operations, featuring modules for Student Management, Accounts & Finance, Fee Management, HR & Payroll, Exam Management, and more.",
    technologies: ["React.js", "Next.js", "TypeScript", "Redux"],
    gradient: "from-purple-500/10 to-pink-500/10",
  },
  {
    title: "RT ARCADES",
    category: "Responsive Web Application",
    year: "2022",
    description:
      "Implemented the Bootstrap framework to ensure a responsive and consistent design across different devices and screen sizes.",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    link: "https://rtarcades.netlify.app/",
    gradient: "from-indigo-500/10 to-blue-500/10",
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const section = sectionRef.current
    const title = titleRef.current
    const projectsContainer = projectsRef.current
    const background = backgroundRef.current

    if (!section || !title || !projectsContainer) return

    // Animate background elements
    if (background) {
      gsap.to(background.children, {
        y: "random(-40, 40)",
        x: "random(-20, 20)",
        rotation: "random(-180, 180)",
        duration: "random(6, 12)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.4,
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
          { y: 50, opacity: 0, rotationX: 30 },
          { y: 0, opacity: 1, rotationX: 0, duration: 0.8, ease: "power2.out" },
        ).fromTo(
          projectsContainer.children,
          { y: 50, opacity: 0, scale: 0.9, rotationY: 15 },
          { y: 0, opacity: 1, scale: 1, rotationY: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" },
          "-=0.4",
        )

        // Add continuous floating animation
        gsap.to(projectsContainer.children, {
          y: "random(-10, 10)",
          duration: "random(4, 7)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.2,
          delay: 1.5,
        })
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="min-h-screen py-32 px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div ref={backgroundRef} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-20 left-20 w-4 h-4 border border-blue-500/20 rounded-full animate-spin"
          style={{ animationDuration: "12s" }}
        />
        <div className="absolute bottom-40 right-20 w-3 h-3 bg-purple-500/10 rounded-full animate-pulse" />
        <div className="absolute top-60 right-40 w-2 h-8 bg-gradient-to-t from-green-500/20 to-transparent animate-pulse" />
        <div className="absolute bottom-60 left-40 w-6 h-1 bg-gradient-to-r from-orange-500/20 to-transparent animate-pulse" />
        <div className="absolute top-40 left-60 w-2 h-2 border border-teal-500/20 rotate-45 animate-bounce" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-light mb-16 tracking-tight hover:scale-105 transition-transform duration-500"
        >
          Selected Work
        </h2>

        <div ref={projectsRef} className="space-y-16">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-8 bg-gradient-to-br ${project.gradient} hover:border-white/20 hover:bg-black/70 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-white/10`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1 transform group-hover:translate-x-2 transition-transform duration-300">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-white/50 text-sm font-light tracking-wide px-3 py-1 border border-white/20 rounded-full group-hover:border-white/40 transition-colors duration-300">
                      {project.category}
                    </span>
                    <span className="text-white/30 text-sm font-light">{project.year}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-white/90 transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>
              </div>

              <p className="text-white/70 font-light leading-relaxed mb-6 max-w-4xl group-hover:text-white/80 transition-colors duration-300">
                {project.description
                  .split("**")
                  .map((part, i) => (i % 2 === 0 ? part : <strong key={i}>{part}</strong>))}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 border border-white/20 text-white/60 text-xs font-light tracking-wide hover:border-white/40 hover:text-white/80 hover:scale-105 transition-all duration-300 cursor-pointer"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-all duration-300 font-light text-sm group-hover:translate-x-1 transform"
                >
                  View Project
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="group-hover:scale-110 transition-transform duration-300"
                  >
                    <path
                      d="M1 11L11 1M11 1H1M11 1V11"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              )}

              {/* Animated progress bar */}
              <div className="mt-6 w-full h-px bg-white/10 overflow-hidden rounded-full">
                <div className="h-full bg-gradient-to-r from-transparent via-white/40 to-transparent w-0 group-hover:w-full transition-all duration-1000 ease-out" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
