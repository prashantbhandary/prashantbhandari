'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, Download, MapPin } from 'lucide-react'
import Image from 'next/image'
import { animate, motion, useInView, useScroll, useTransform, type Variants } from 'framer-motion'
import Marquee from './motion/Marquee'

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
  { to: 10, suffix: '+', label: 'Projects' },
  { to: 5, suffix: '+', label: 'Awards' },
  { to: 3, suffix: '+', label: 'Years Exp.' },
]

const TICKER = [
  'PCB Design', 'KiCad', 'STM32 Bare-Metal C', 'NuttX RTOS', 'ESP32', 'FreeRTOS',
  'LoRa', 'CubeSat Subsystems', 'Embedded Firmware', 'BLE', 'Power Electronics',
  'Robotics', 'Fusion 360', 'C/C++', 'MicroPython',
]

/** Counts up once, when the strip scrolls into view. */
function Stat({ to, suffix, label }: { to: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })
  // starts at the real figure so the pre-rendered HTML (and anyone without
  // JS, and crawlers) shows "10+", not "0+"; the count-up takes over on view
  const [n, setN] = useState(to)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration: 1.1,
      ease: [0.22, 0.61, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, to])

  return (
    <div ref={ref}>
      <strong>
        {n}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  )
}

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

  const { scrollY } = useScroll()
  // portrait drifts up a little slower than the page
  const portraitY = useTransform(scrollY, [0, 600], [0, -34])

  return (
    <section id="hero" className="hero" aria-label="Introduction">
      <div className="shell">
        <div className="hero__grid">
          {/* ── Left: the pitch ── */}
          <motion.div variants={container} initial={'hidden'} animate="show">
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
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                View work
                <ArrowRight size={16} aria-hidden="true" />
              </motion.button>
              <motion.a
                href="/resume_prashant-v2.pdf"
                download="Prashant-Bhandari-Resume.pdf"
                className="btn btn--outline"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Download size={16} aria-hidden="true" />
                Résumé
              </motion.a>
            </motion.div>

            <motion.div variants={rise} className="stat-strip max-w-lg">
              {STATS.map((stat) => (
                <Stat key={stat.label} {...stat} />
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: portrait. object-fit + the mirror live on
              .hero__figure img so the arch crops the photo's straight edges ── */}
          <div className="hero__stage">
            {/* the curve the portrait sits into */}
            <span className="hero__curve" aria-hidden="true" />

            {/* signal pulse — three rings expanding on a long, staggered loop */}
            <span className="hero__pulse" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="hero__ring"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: [0.5, 1.18], opacity: [0, 0.5, 0] }}
                  transition={{ duration: 6.6, repeat: Infinity, delay: i * 2.2, ease: 'easeOut' }}
                />
              ))}
            </span>

            <motion.div
            className="hero__figure"
            style={{ y: portraitY }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          >
            <Image
              src="/images/prashant-figure.webp"
              alt="Prashant Bhandari"
              fill
              sizes="(max-width: 940px) 80vw, 27rem"
              priority
            />
            </motion.div>

          </div>
        </div>
      </div>

      <div className="hero__ticker">
        <Marquee items={TICKER} label="Technologies Prashant works with" />
      </div>
    </section>
  )
}
