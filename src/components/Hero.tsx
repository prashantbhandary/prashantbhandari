'use client'

import { useEffect, useMemo, useState } from 'react'
import { Download, ExternalLink } from 'lucide-react'
import { SplineScene } from '@/components/ui/spline'

export default function Hero() {
  const [typedText, setTypedText] = useState('')

  const texts = useMemo(
    () => [
      'Electronics Engineering Student',
      'Robotics Enthusiast',
      'PCB Design Expert',
      'Embedded Systems Developer',
      'Competition Winner',
      'Arduino & ESP32 Pro',
      'Innovation Builder',
    ],
    []
  )

  useEffect(() => {
    let index = 0
    let isDeleting = false
    let isTyping = true
    let textIndex = 0

    const typeText = () => {
      const currentText = texts[textIndex]

      if (isTyping && !isDeleting) {
        if (index < currentText.length) {
          setTypedText(currentText.slice(0, index + 1))
          index++
        } else {
          isTyping = false
          setTimeout(() => {
            isDeleting = true
            isTyping = true
          }, 2000)
        }
      } else if (isTyping && isDeleting) {
        if (index > 0) {
          setTypedText(currentText.slice(0, index - 1))
          index--
        } else {
          isDeleting = false
          textIndex = (textIndex + 1) % texts.length
          setTimeout(() => {
            isTyping = true
          }, 500)
        }
      }
    }

    const timer = setInterval(typeText, isDeleting ? 50 : 120)

    return () => clearInterval(timer)
  }, [texts])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section id="hero" className="hero-grid py-24 md:py-32" aria-label="Hero section">
      <div className="accent-orbs" aria-hidden="true">
        <div className="accent-orb orb-1" />
        <div className="accent-orb orb-2" />
        <div className="accent-orb orb-3" />
      </div>
      <div className="max-w-6xl mx-auto px-5 relative z-10">
        <div className="hero-card depth-card edge-glow">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 p-8 md:p-12">
            <div className="flex-1">
              <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/80 mb-4">
                Prashant Bhandari
              </p>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                Prashant Bhandari
              </h1>
              <p className="text-xl md:text-2xl mb-6 text-gray-200">
                B.E. Electronics, Communication & Information Engineering Student
              </p>

              <div className="text-cyan-300 font-semibold text-lg md:text-xl mb-8 min-h-[2rem]" aria-live="polite">
                {typedText}
                <span className="animate-pulse text-yellow-400 font-bold" aria-hidden="true">|</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="group relative inline-flex items-center justify-center bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-3 px-8 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-400/30 overflow-hidden focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 shine-line"
                >
                  <span className="relative z-10">Get in Touch</span>
                </button>

                <a
                  href="/resume"
                  className="group relative inline-flex items-center justify-center border border-green-400/70 text-green-300 py-3 px-8 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:bg-green-400 hover:text-black hover:shadow-lg hover:shadow-green-400/30 overflow-hidden focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-slate-900 shine-line"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Download size={18} aria-hidden="true" />
                    Download Resume
                  </span>
                </a>

                <a
                  href="https://www.linkedin.com/in/prashantbdri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center border border-yellow-400/70 text-yellow-300 py-3 px-8 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-400 hover:text-black hover:shadow-lg hover:shadow-yellow-400/30 overflow-hidden focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-900 shine-line"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    View LinkedIn
                    <ExternalLink size={16} aria-hidden="true" />
                  </span>
                </a>
              </div>
            </div>

            <div className="flex-1 min-h-[320px] lg:min-h-[420px] relative">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
              <p className="mt-4 text-sm text-cyan-200/80 text-center">
                Drag to explore the 3D robot.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
