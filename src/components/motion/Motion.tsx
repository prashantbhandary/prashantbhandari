'use client'

import { type ReactNode } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion'

/**
 * Shared motion primitives.
 *
 * Rules this file enforces so the whole site moves with one rhythm:
 *  • transform + opacity only (GPU-friendly, never triggers layout)
 *  • enter once, on scroll into the reading zone — nothing re-animates
 *    when you scroll back up
 *  • every component collapses to a plain element under
 *    prefers-reduced-motion
 */

const EASE = [0.22, 0.61, 0.36, 1] as const
const VIEWPORT = { once: true, margin: '-12% 0px -12% 0px' } as const

/** Render as the element the layout actually needs (grid child, article, …) */
type Tag = 'div' | 'article' | 'header' | 'section' | 'ul' | 'li'
const tagged = { div: motion.div, article: motion.article, header: motion.header, section: motion.section, ul: motion.ul, li: motion.li }

/** A single block that rises into place. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  as?: Tag
}) {
  const reduce = useReducedMotion()
  const Tag = tagged[as]
  const Plain = as

  if (reduce) return <Plain className={className}>{children}</Plain>

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.55, ease: EASE, delay }}
    >
      {children}
    </Tag>
  )
}

/**
 * A container whose direct <RevealItem> children come in one after
 * another. 60ms apart reads as a sequence without feeling slow.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.06,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  stagger?: number
  delay?: number
}) {
  const reduce = useReducedMotion()

  if (reduce) return <div className={className}>{children}</div>

  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  )
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

export function RevealItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  as?: Tag
}) {
  const reduce = useReducedMotion()
  const Tag = tagged[as]
  const Plain = as

  if (reduce) return <Plain className={className}>{children}</Plain>

  return (
    <Tag className={className} variants={itemVariants}>
      {children}
    </Tag>
  )
}

/** Thin accent bar across the top showing how far down the page you are. */
export function ScrollProgress() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })

  if (reduce) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[90]"
    >
      <div className="w-full h-full" style={{ background: 'var(--accent)' }} />
    </motion.div>
  )
}

/**
 * Drifts its children against the scroll direction. Small offsets only —
 * anything larger reads as the page coming apart.
 */
export function Parallax({
  children,
  className,
  offset = 40,
}: {
  children: ReactNode
  className?: string
  offset?: number
}) {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -offset])

  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div className={className} style={{ y }}>
      {children}
    </motion.div>
  )
}
