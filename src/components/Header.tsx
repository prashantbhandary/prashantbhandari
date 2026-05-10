'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, FileText } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const scrollToSection = (sectionId: string) => {
    closeMenu()
    
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        const headerHeight = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 100)
  }

  const navItems = [
    { href: 'about', label: 'About' },
    { href: 'skills', label: 'Skills' },
    { href: 'experience', label: 'Experience' },
    { href: 'projects', label: 'Projects' },
    { href: 'certificates', label: 'Certificates' },
    { href: 'contact', label: 'Contact' }
  ]

  return (
    <>
      {/* Mobile Navigation Overlay */}
      <div 
        className={`nav-overlay ${isMenuOpen ? 'open' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md text-white py-4 sticky top-0 z-50 shadow-lg border-b border-indigo-500/20">
        <div className="max-w-6xl mx-auto px-5">
          <nav className="flex justify-between items-center relative" role="navigation" aria-label="Main navigation">
            {/* Logo */}
            <Link 
              href="/"
              className="text-3xl font-bold flex items-center cursor-pointer hover:text-cyan-400 transition-colors"
              aria-label="Prashant Bhandari - Home"
            >
              <span>Prashant</span>
            </Link>

            {/* Hamburger Menu Button (Mobile) */}
            <button
              className="hamburger lg:hidden"
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex space-x-8" role="menubar">
              {navItems.map((item) => (
                <li key={item.href} role="none">
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-white hover:text-yellow-400 font-medium transition-all duration-300 relative py-2 hover:-translate-y-1 after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-yellow-400 after:to-cyan-400 hover:after:w-full after:transition-all after:duration-300"
                    role="menuitem"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              
              {/* Resume Link */}
              <li role="none">
                <Link
                  href="/resume"
                  className="text-white hover:text-green-400 font-medium transition-all duration-300 relative py-2 hover:-translate-y-1 after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-green-400 after:to-emerald-400 hover:after:w-full after:transition-all after:duration-300 flex items-center gap-1"
                  role="menuitem"
                >
                  <FileText size={16} aria-hidden="true" />
                  Resume
                </Link>
              </li>
            </ul>

            {/* Mobile Navigation */}
            <ul 
              id="mobile-menu"
              className={`nav-links ${isMenuOpen ? 'open' : ''}`}
              role="menu"
              aria-hidden={!isMenuOpen}
            >
              {navItems.map((item, index) => (
                <li 
                  key={item.href}
                  style={{ animationDelay: `${(index + 1) * 0.05}s` }}
                  role="none"
                >
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left py-6 px-6 text-white hover:text-yellow-400 font-medium transition-all duration-300 border-b border-white/10 hover:bg-yellow-400/10 rounded-lg cursor-pointer touch-manipulation"
                    style={{ 
                      touchAction: 'manipulation',
                      WebkitTapHighlightColor: 'rgba(255, 255, 255, 0.1)',
                      minHeight: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      userSelect: 'none'
                    }}
                    role="menuitem"
                    tabIndex={isMenuOpen ? 0 : -1}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              
              {/* Resume Link for Mobile */}
              <li style={{ animationDelay: `${7 * 0.05}s` }} role="none">
                <Link
                  href="/resume"
                  onClick={() => closeMenu()}
                  className="flex w-full text-left py-6 px-6 text-white hover:text-green-400 font-medium transition-all duration-300 border-b border-white/10 hover:bg-green-400/10 rounded-lg cursor-pointer touch-manipulation items-center gap-2"
                  style={{ 
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'rgba(255, 255, 255, 0.1)',
                    minHeight: '60px',
                    userSelect: 'none'
                  }}
                  role="menuitem"
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  <FileText size={16} aria-hidden="true" />
                  Resume
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}
