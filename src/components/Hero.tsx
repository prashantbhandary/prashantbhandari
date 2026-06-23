'use client'

import { useEffect, useMemo, useState } from 'react'
import { Download, ExternalLink, ChevronDown } from 'lucide-react'
import Image from 'next/image'

const TECH_BADGES = [
  { label: 'Robotics', color: 'bg-purple-500/20 border-purple-400/50 text-purple-300', style: { top: '10%', left: '-14%' }, delay: '0s' },
  { label: 'PCB Design', color: 'bg-green-500/20 border-green-400/50 text-green-300', style: { bottom: '14%', left: '-12%' }, delay: '1.2s' },
  { label: 'ESP32', color: 'bg-blue-500/20 border-blue-400/50 text-blue-300', style: { top: '38%', right: '-12%' }, delay: '0.6s' },
]

const STATS = [
  { value: '10+', label: 'Projects' },
  { value: '5+', label: 'Awards' },
  { value: '3+', label: 'Years Exp.' },
]

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
      const offsetPosition =
        element.getBoundingClientRect().top + window.pageYOffset - 100
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="relative py-24 md:py-32 overflow-hidden" aria-label="Hero section">
      {/* Ambient glow orbs */}
      <div aria-hidden="true">
        <div className="pointer-events-none absolute top-0 left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-5 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── Left: text content ── */}
          <div className="flex-1 text-center lg:text-left">
            <p className="inline-block text-xs uppercase tracking-[0.4em] text-cyan-300/80 mb-5 px-4 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5">
              Prashant Bhandari
            </p>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-5 bg-gradient-to-br from-white via-yellow-100 to-yellow-400 bg-clip-text text-transparent leading-tight">
              Prashant<br />Bhandari
            </h1>

            <p className="text-lg md:text-xl text-slate-300/90 mb-5 max-w-xl mx-auto lg:mx-0">
              B.E. Electronics, Communication &amp; Information Engineering Student
            </p>

            {/* Typing animation */}
            <div
              className="text-cyan-300 font-semibold text-lg md:text-xl mb-8 min-h-[2rem]"
              aria-live="polite"
            >
              {typedText}
              <span className="animate-pulse text-yellow-400 font-bold" aria-hidden="true">|</span>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <button
                onClick={() => scrollToSection('contact')}
                className="relative inline-flex items-center justify-center bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-3 px-8 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-400/30 overflow-hidden focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0a0a16]"
              >
                Get in Touch
              </button>

              <a
                href="/resume"
                className="inline-flex items-center justify-center gap-2 border border-green-400/60 text-green-300 py-3 px-8 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:bg-green-400 hover:text-black hover:shadow-lg hover:shadow-green-400/30 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-[#0a0a16]"
              >
                <Download size={18} aria-hidden="true" />
                Download Resume
              </a>

              <a
                href="https://www.linkedin.com/in/prashantbdri"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-yellow-400/60 text-yellow-300 py-3 px-8 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-400 hover:text-black hover:shadow-lg hover:shadow-yellow-400/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-[#0a0a16]"
              >
                View LinkedIn
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-6 justify-center lg:justify-start">
              {STATS.map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                    {s.value}
                  </p>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: profile photo ── */}
          <div className="relative flex-shrink-0 w-64 h-80 md:w-72 md:h-96 lg:w-[340px] lg:h-[440px]">
            {/* Soft glow behind the card */}
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-cyan-400/20 via-indigo-500/10 to-purple-600/20 blur-2xl"
            />
            {/* Decorative offset border */}
            <div
              aria-hidden="true"
              className="absolute -inset-2 rounded-[1.75rem] border border-dashed border-cyan-400/20"
            />
            {/* Photo frame */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden ring-1 ring-cyan-400/40 shadow-[0_0_45px_rgba(6,182,212,0.25)]">
              <Image
                src="/images/IMG_6446.jpeg"
                alt="Prashant Bhandari"
                fill
                className="object-cover object-top"
                priority
              />
              {/* Bottom gradient for depth */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent"
              />
            </div>

            {/* Floating tech badges (kept minimal) */}
            {TECH_BADGES.map((badge) => (
              <span
                key={badge.label}
                className={`absolute px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm animate-float ${badge.color}`}
                style={{ ...badge.style, animationDelay: badge.delay }}
                aria-hidden="true"
              >
                {badge.label}
              </span>
            ))}

            {/* Status dot */}
            <div
              aria-hidden="true"
              className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-slate-900/80 border border-green-400/40 rounded-full px-3 py-1.5 text-xs text-green-300 font-medium backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Open to work
            </div>
          </div>

        </div>

        {/* Scroll cue */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => scrollToSection('about')}
            aria-label="Scroll to about section"
            className="flex flex-col items-center gap-1 text-slate-500 hover:text-cyan-400 transition-colors duration-300 group"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <ChevronDown size={18} className="animate-bounce group-hover:text-cyan-400" />
          </button>
        </div>
      </div>
    </section>
  )
}
