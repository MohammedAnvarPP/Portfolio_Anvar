"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

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
              contentRef.current?.children || [],
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
      <div className="max-w-4xl w-full text-center bg-black/60 backdrop-blur-sm rounded-2xl p-12 border border-white/10">
        <h2 ref={titleRef} className="text-4xl md:text-6xl font-light mb-16 tracking-tight">
          Let's Connect
        </h2>

        <div ref={contentRef} className="space-y-12">
          <p className="text-xl text-white/70 font-light leading-relaxed max-w-2xl mx-auto">
            Ready to bring your digital vision to life? Let's discuss how we can create something extraordinary
            together.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <a
              href="mailto:mohammedanvarpp1@gmail.com"
              className="group text-lg font-bold tracking-wide border-b border-white/20 pb-1 hover:border-white transition-colors duration-300"
            >
              mohammedanvarpp1@gmail.com
            </a>

            <a
              href="tel:+918301998293"
              className="group text-lg font-bold tracking-wide border-b border-white/20 pb-1 hover:border-white transition-colors duration-300"
            >
              +91 8301998293
            </a>
          </div>

          <div className="flex justify-center space-x-8">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors duration-300 font-light text-sm tracking-wide"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors duration-300 font-light text-sm tracking-wide"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
