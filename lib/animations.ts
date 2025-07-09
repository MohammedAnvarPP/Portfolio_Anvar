import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export const initializeAnimations = () => {
  if (typeof window === "undefined") return

  gsap.registerPlugin(ScrollTrigger)

  // Global animation settings
  gsap.defaults({
    ease: "power2.out",
    duration: 0.8,
  })

  // Enhanced cursor system - only for non-hero sections
  const cursor = document.createElement("div")
  cursor.className = "custom-cursor"
  cursor.style.cssText = `
    position: fixed;
    width: 8px;
    height: 8px;
    background: white;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: difference;
    transition: transform 0.2s ease, background-color 0.2s ease, opacity 0.3s ease;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    opacity: 0;
  `
  document.body.appendChild(cursor)

  const cursorFollower = document.createElement("div")
  cursorFollower.className = "cursor-follower"
  cursorFollower.style.cssText = `
    position: fixed;
    width: 32px;
    height: 32px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transition: transform 0.3s ease, border-color 0.2s ease, width 0.2s ease, height 0.2s ease, opacity 0.3s ease;
    opacity: 0;
  `
  document.body.appendChild(cursorFollower)

  // Track current section
  const currentSection = "hero"

  // Enhanced cursor interactions
  document.addEventListener("mousemove", (e) => {
    // Show/hide cursor based on section
    const heroSection = document.getElementById("hero")
    const isInHero =
      heroSection && heroSection.getBoundingClientRect().top <= 100 && heroSection.getBoundingClientRect().bottom >= 100

    if (isInHero) {
      cursor.style.opacity = "0"
      cursorFollower.style.opacity = "0"
    } else {
      cursor.style.opacity = "1"
      cursorFollower.style.opacity = "1"
    }

    gsap.to(cursor, {
      x: e.clientX - 4,
      y: e.clientY - 4,
      duration: 0.1,
    })

    gsap.to(cursorFollower, {
      x: e.clientX - 16,
      y: e.clientY - 16,
      duration: 0.3,
    })
  })

  // Cursor hover effects for interactive elements
  document.addEventListener("mouseover", (e) => {
    const target = e.target as HTMLElement
    if (target.matches('button, a, [role="button"]')) {
      cursor.style.transform = "scale(1.5)"
      cursor.style.background = "rgba(255, 255, 255, 0.8)"
      cursorFollower.style.width = "48px"
      cursorFollower.style.height = "48px"
      cursorFollower.style.borderColor = "rgba(255, 255, 255, 0.6)"
    }
  })

  document.addEventListener("mouseout", (e) => {
    const target = e.target as HTMLElement
    if (target.matches('button, a, [role="button"]')) {
      cursor.style.transform = "scale(1)"
      cursor.style.background = "white"
      cursorFollower.style.width = "32px"
      cursorFollower.style.height = "32px"
      cursorFollower.style.borderColor = "rgba(255, 255, 255, 0.3)"
    }
  })

  // Hide cursors on mobile
  if (window.innerWidth <= 768) {
    cursor.style.display = "none"
    cursorFollower.style.display = "none"
  }
}
