'use client'

import { useRef, type ReactNode } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion'

/**
 * TiltPanel — a card that lives in real 3D space.
 *
 * Two layers of motion, both GPU-only (transform + opacity):
 *  • Scroll depth — as the card travels the viewport it rises out of the void
 *    (tilted back, sunk into Z), settles perfectly flat while it sits in the
 *    reading zone, then recedes overhead as it leaves. This is the "flying
 *    through space / digging into things" feel on scroll.
 *  • Pointer tilt — while hovered the card banks toward the cursor with a
 *    spring, and a soft starlight glare tracks the pointer across its face.
 *
 * Honours prefers-reduced-motion: it then renders as a plain, still panel.
 */
export default function TiltPanel({
  as = 'div',
  className = '',
  children,
}: {
  as?: 'div' | 'article'
  className?: string
  children: ReactNode
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  // ── scroll depth (outer layer) ──
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const rotateXScroll = useTransform(scrollYProgress, [0, 0.5, 1], [11, 0, -7])
  const yScroll = useTransform(scrollYProgress, [0, 0.5, 1], [44, 0, -20])
  const zScroll = useTransform(scrollYProgress, [0, 0.5, 1], [-140, 0, -70])
  const opacity = useTransform(scrollYProgress, [0, 0.16, 0.9, 1], [0, 1, 1, 0.55])

  // ── pointer tilt (inner layer) ──
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [9, -9]), { stiffness: 170, damping: 16 })
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-12, 12]), { stiffness: 170, damping: 16 })
  const glareX = useTransform(px, [-0.5, 0.5], ['8%', '92%'])
  const glareY = useTransform(py, [-0.5, 0.5], ['8%', '92%'])
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(120,200,255,0.16), transparent 46%)`

  if (reduce) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    px.set(0)
    py.set(0)
  }

  const Inner = as === 'article' ? motion.article : motion.div

  return (
    <motion.div
      ref={ref}
      className="depth-outer"
      style={{ rotateX: rotateXScroll, y: yScroll, z: zScroll, opacity, transformPerspective: 1400 }}
    >
      <Inner
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        whileHover={{ scale: 1.025 }}
        data-tilt=""
        className={`tilt-3d ${className}`}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      >
        {children}
        <motion.span aria-hidden="true" className="tilt-glare" style={{ background: glare }} />
      </Inner>
    </motion.div>
  )
}
