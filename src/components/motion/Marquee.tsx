'use client'

import { motion } from 'framer-motion'

/**
 * Infinite ticker. The list is rendered twice and the track is translated
 * exactly -50%, so the second copy lands where the first started and the
 * loop is seamless. Duplicates are aria-hidden — screen readers read the
 * list once.
 */
export default function Marquee({
  items,
  duration = 32,
  label,
}: {
  items: string[]
  duration?: number
  label: string
}) {
  return (
    <div className="marquee">
      <motion.ul
        className="marquee__track"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
        aria-label={label}
      >
        {items.map((item) => (
          <li key={item} className="marquee__item">
            {item}
          </li>
        ))}
        {items.map((item) => (
          <li key={`dup-${item}`} className="marquee__item" aria-hidden="true">
            {item}
          </li>
        ))}
      </motion.ul>
    </div>
  )
}
