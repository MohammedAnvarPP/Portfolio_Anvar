"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // Progress animation
    tl.to(
      {},
      {
        duration: 2.5,
        ease: "power2.inOut",
        onUpdate: function () {
          const prog = Math.round(this.progress() * 100)
          setProgress(prog)
        },
      },
    )

    // Scale progress bar
    tl.fromTo(progressBarRef.current, { scaleX: 0 }, { scaleX: 1, duration: 2.5, ease: "power2.inOut" }, 0)

    // Fade out loading screen
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: onComplete,
    })

    return () => {
      tl.kill()
    }
  }, [onComplete])

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Loading content */}
      <div className="relative z-10 text-center">
        {/* Progress bar */}
        <div className="w-64 h-px bg-white/20 mb-8 relative overflow-hidden">
          <div
            ref={progressBarRef}
            className="absolute inset-0 bg-white origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* Counter */}
        <div ref={counterRef} className="text-6xl font-light tracking-wider">
          {progress.toString().padStart(3, "0")}
        </div>
      </div>
    </div>
  )
}
