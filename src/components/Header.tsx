'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, ArrowUpRight, FileText, NotebookPen } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

/** Sections scroll on the home page; pages are their own routes */
type NavItem = { id: string; label: string } | { href: string; label: string; icon: typeof FileText }

const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { href: '/projects', label: 'Projects', icon: NotebookPen },
  { id: 'certificates', label: 'Certificates' },
  { href: '/resume', label: 'Résumé', icon: FileText },
]

const SECTION_IDS = NAV_ITEMS.flatMap((item) => ('id' in item ? [item.id] : []))

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')
  const router = useRouter()
  const pathname = usePathname() ?? ''

  // Highlight whichever section is currently in the reading zone
  useEffect(() => {
    // 'hero' has no nav item, so reaching it clears the highlight
    const sections = ['hero', ...SECTION_IDS].map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el)
    )
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // Lock page scroll while the mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const goTo = useCallback((id: string) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    // the sections live on the home page; from any other page, go there first
    if (!el) {
      router.push(`/#${id}`)
      return
    }
    // let the sheet close before the scroll starts
    requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }, [router])

  return (
    <>
      <header className="site-header">
        <motion.nav
          className="nav-pill"
          aria-label="Main navigation"
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1], delay: 0.1 }}
        >
          <Link href="/" className="nav-brand">
            Prashant<span style={{ color: 'var(--accent)' }}>.</span>
          </Link>

          <ul className="nav-list">
            {NAV_ITEMS.map((item) =>
              'href' in item ? (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="nav-link"
                    aria-current={pathname.startsWith(item.href) ? 'page' : undefined}
                  >
                    <item.icon size={13} aria-hidden="true" />
                    {item.label}
                  </Link>
                </li>
              ) : (
                <li key={item.id} className="relative">
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-[var(--r-pill)]"
                      style={{ background: 'var(--accent-soft)' }}
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      aria-hidden="true"
                    />
                  )}
                  <button
                    type="button"
                    className="nav-link relative"
                    aria-current={active === item.id ? 'true' : undefined}
                    onClick={() => goTo(item.id)}
                  >
                    {item.label}
                  </button>
                </li>
              )
            )}
          </ul>

          <motion.button
            type="button"
            className="nav-cta"
            onClick={() => goTo('contact')}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.96 }}
          >
            Contact
            <ArrowUpRight size={13} aria-hidden="true" />
          </motion.button>

          <button
            type="button"
            className="nav-toggle"
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={18} aria-hidden="true" />
          </button>
        </motion.nav>
      </header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            className="nav-sheet"
            data-open="true"
            onClick={() => setMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
        <div />
        <motion.div
          className="nav-sheet__panel"
          onClick={(e) => e.stopPropagation()}
          initial={{ y: '12%' }}
          animate={{ y: 0 }}
          exit={{ y: '12%' }}
          transition={{ type: 'spring', stiffness: 320, damping: 34 }}
        >
          <div className="flex items-center justify-between px-3 pb-2">
            <span className="eyebrow">Navigate</span>
            <button
              type="button"
              className="nav-toggle"
              aria-label="Close navigation menu"
              onClick={() => setMenuOpen(false)}
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          {NAV_ITEMS.map((item) =>
            'href' in item ? (
              <Link
                key={item.href}
                href={item.href}
                className="nav-sheet__link"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
                <item.icon size={16} aria-hidden="true" style={{ color: 'var(--ink-4)' }} />
              </Link>
            ) : (
              <button
                key={item.id}
                type="button"
                className="nav-sheet__link"
                onClick={() => goTo(item.id)}
              >
                {item.label}
                <ArrowUpRight size={16} aria-hidden="true" style={{ color: 'var(--ink-4)' }} />
              </button>
            )
          )}

          <button
            type="button"
            className="btn btn--primary w-full mt-2"
            onClick={() => goTo('contact')}
          >
            Get in touch
          </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
