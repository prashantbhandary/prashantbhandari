'use client'

import { useEffect } from 'react'

/**
 * Lightweight, library-free scroll reveal.
 * - Adds `.js-reveal` to <html> so reveal styles only apply when JS runs
 *   (content stays visible if JS is disabled).
 * - Elements with `.reveal` fade/slide in once when they enter the viewport.
 * - Children of `.reveal-group` are auto-marked `.reveal` and staggered.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement
    root.classList.add('js-reveal')

    // Stagger direct children of any reveal-group (capped so long lists
    // don't trail off with an awkwardly long delay).
    document.querySelectorAll<HTMLElement>('.reveal-group').forEach((group) => {
      Array.from(group.children).forEach((child, i) => {
        const el = child as HTMLElement
        el.style.setProperty('--reveal-delay', `${Math.min(i, 6) * 60}ms`)
        el.classList.add('reveal')
      })
    })

    const targets = document.querySelectorAll<HTMLElement>('.reveal')

    // Fallback: no IntersectionObserver -> just show everything.
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('in-view'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -12% 0px' }
    )

    targets.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return null
}
