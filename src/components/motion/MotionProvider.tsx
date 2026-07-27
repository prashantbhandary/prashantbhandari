'use client'

import { MotionConfig } from 'framer-motion'
import { type ReactNode } from 'react'

/**
 * Reduced motion is handled here, once, for the whole tree.
 *
 * The components used to branch on `useReducedMotion()` and render a plain
 * element instead of a motion one. That reads fine locally but breaks in
 * production: the server always renders the animated branch (it can't know
 * the user's preference), so any visitor with "reduce motion" enabled got
 * different markup on the client — a hydration mismatch, which surfaces as
 * "Application error: a client-side exception has occurred".
 *
 * `reducedMotion="user"` keeps the markup identical for everyone and lets
 * Motion drop transform/layout animations at runtime instead.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
