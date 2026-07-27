'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Download, MapPin } from 'lucide-react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'framer-motion'

const EASE = [0.22, 0.61, 0.36, 1] as const

/* The hero is above the fold, so it plays on mount rather than on scroll */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
}

const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

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
      'Satellite Research Fellow',
      'Robotics Enthusiast',
      'PCB Design Expert',
      'Embedded Systems Developer',
      'Arduino , Esp 32 , Raspberry Pi S',
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

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  // portrait drifts up a little slower than the page
  const portraitY = useTransform(scrollY, [0, 600], [0, -34])

  return (
    <section id="hero" className="hero" aria-label="Introduction">
      <div className="shell">
        <div className="hero__grid">
          {/* ── Left: the pitch ── */}
          <motion.div variants={container} initial={reduce ? false : 'hidden'} animate="show">
            <motion.div variants={rise} className="flex flex-wrap items-center gap-2 mb-7">
              <span className="pin">
                <span className="dot-live" aria-hidden="true" />
                Open to work
              </span>
              <span className="pin">
                <MapPin size={11} aria-hidden="true" />
                Pokhara, Nepal
              </span>
            </motion.div>

            <motion.h1 variants={rise} className="display mb-5">
              Prashant
              <br />
              Bhandari
            </motion.h1>

            <motion.div variants={rise} className="hero__role mb-6" aria-live="polite">
              {typedText}
              <span aria-hidden="true" style={{ color: 'var(--ink-4)' }}>
                |
              </span>
            </motion.div>

            <motion.p variants={rise} className="hero__lead mb-9">
              B.E. Electronics, Communication &amp; Information Engineering student building
              hardware end to end — PCB design, embedded firmware, and satellite subsystems, from
              schematic through to a working board.
            </motion.p>

            <motion.div variants={rise} className="flex flex-wrap gap-3 mb-10">
              <motion.button
                type="button"
                className="btn btn--primary"
                onClick={() => scrollTo('projects')}
                whileHover={reduce ? undefined : { y: -2 }}
                whileTap={reduce ? undefined : { scale: 0.97 }}
              >
                View work
                <ArrowRight size={16} aria-hidden="true" />
              </motion.button>
              <motion.a
                href="/resume"
                className="btn btn--outline"
                whileHover={reduce ? undefined : { y: -2 }}
                whileTap={reduce ? undefined : { scale: 0.97 }}
              >
                <Download size={16} aria-hidden="true" />
                Résumé
              </motion.a>
            </motion.div>

            <motion.div variants={rise} className="stat-strip max-w-lg">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: portrait ── */}
          <motion.div
            className="hero__portrait"
            style={reduce ? undefined : { y: portraitY }}
            initial={reduce ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          >
            <Image
              src="/images/IMG_6446.jpeg"
              alt="Prashant Bhandari"
              fill
              sizes="(max-width: 940px) 90vw, 22rem"
              className="object-cover object-top"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
