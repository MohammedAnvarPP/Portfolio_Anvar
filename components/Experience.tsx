"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const experiences = [
  {
    title: "Front-End Developer",
    company: "Polosys Technologies",
    period: "Jul 2024 – Present",
    description: [
      "Developed and maintained an advanced eCommerce web application using **React.js**, focusing on performance optimization, responsiveness, and seamless user experience.",
      "Independently designed and built a customer **Support Ticketing System** using **Next.js**, enabling efficient issue tracking, real-time updates, and streamlined internal communication.",
      "Collaborated with cross-functional teams to ensure smooth **API integrations**, consistent **UI/UX** standards, and scalable architecture for enterprise-level applications.",
      "Currently leading front-end development of **Polosys Books**, an accounting and financial management platform inspired by **Zoho Books**.",
    ],
  },
  {
    title: "Front-End Developer",
    company: "Popular Group (Popit soln)",
    period: "Nov 2023 - Jun 2024",
    description: [
      "Developed user-friendly interfaces for MIS software using **HTML**, **CSS**, and **JavaScript** frameworks.",
      "Leveraged **React.js** to architect and develop responsive and intuitive user interfaces for PopBites' eCommerce and billing software.",
      "Spearheaded front-end development for Poptalk, a comprehensive call and data management software, utilizing **React.js** with **Redux**.",
    ],
  },
  {
    title: "Front-End Developer",
    company: "Datastone Solutions",
    period: "Sep 2022 - Oct 2023",
    description: [
      'Played a pivotal role in developing and maintaining the Campus Management ERP "**SCHOLA**".',
      'Led the development of a Parental Monitoring "**SCHOLA PARENT**" **PWA** using **Next.js**.',
      "Demonstrated expertise in **React.js**, **Next.js**, **TypeScript**, **JavaScript**, **HTML**, and **CSS**.",
    ],
  },
  {
    title: "Front-End Developer",
    company: "Freelancing",
    period: "Feb 2022 - Sep 2022",
    description: [
      "Utilized **React.js**, **JavaScript**, **HTML**, and **CSS** to develop engaging and responsive web applications.",
      "Collaborated closely with clients to gather requirements and deliver customized **UI** solutions.",
    ],
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const decorativeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const section = sectionRef.current
    const title = titleRef.current
    const timeline = timelineRef.current
    const decorative = decorativeRef.current

    if (!section || !title || !timeline) return

    // Floating decorative elements
    if (decorative) {
      gsap.to(decorative.children, {
        y: "random(-30, 30)",
        x: "random(-20, 20)",
        rotation: "random(-180, 180)",
        duration: "random(4, 8)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
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
          { y: 50, opacity: 0, rotationX: 45 },
          { y: 0, opacity: 1, rotationX: 0, duration: 0.8, ease: "power2.out" },
        ).fromTo(
          timeline.children,
          { x: -100, opacity: 0, rotationY: 45 },
          { x: 0, opacity: 1, rotationY: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" },
          "-=0.4",
        )
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} id="experience" className="min-h-screen py-32 px-8 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div ref={decorativeRef} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-20 right-20 w-3 h-3 border border-white/10 rounded-full animate-spin"
          style={{ animationDuration: "10s" }}
        />
        <div className="absolute bottom-40 left-10 w-2 h-2 bg-white/10 rounded-full animate-pulse" />
        <div className="absolute top-60 left-20 w-1 h-12 bg-gradient-to-t from-white/10 to-transparent animate-pulse" />
        <div className="absolute bottom-20 right-40 w-4 h-1 bg-white/5 animate-pulse" />
        <div className="absolute top-40 right-60 w-2 h-2 border border-white/10 rotate-45 animate-bounce" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-light mb-16 tracking-tight hover:scale-105 transition-transform duration-500"
        >
          Experience
        </h2>

        <div ref={timelineRef} className="space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="group bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-white/10"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div className="transform group-hover:translate-x-2 transition-transform duration-300">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-white/90 transition-colors duration-300">
                    {exp.title}
                  </h3>
                  <h4 className="text-white/70 font-bold text-lg group-hover:text-white/80 transition-colors duration-300">
                    {exp.company}
                  </h4>
                </div>
                <span className="text-white/50 text-sm font-light tracking-wide mt-2 lg:mt-0 px-3 py-1 border border-white/10 rounded-full group-hover:border-white/20 transition-colors duration-300">
                  {exp.period}
                </span>
              </div>

              <ul className="space-y-3">
                {exp.description.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-white/70 font-light leading-relaxed group-hover:text-white/80 transition-all duration-300 transform group-hover:translate-x-1"
                  >
                    <div className="w-1 h-1 bg-white/50 mt-2 flex-shrink-0 group-hover:bg-white/70 group-hover:scale-150 transition-all duration-300" />
                    <span>
                      {item.split("**").map((part, i) => (i % 2 === 0 ? part : <strong key={i}>{part}</strong>))}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Progress bar animation */}
              <div className="mt-6 w-full h-px bg-white/5 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-transparent via-white/30 to-transparent w-0 group-hover:w-full transition-all duration-1000 ease-out" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
