'use client'

import { useState, useEffect } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    console.log('Menu toggled:', !isMenuOpen)
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
    console.log('Scrolling to section:', sectionId)
    
    // Close menu first
    closeMenu()
    
    // Small delay to let menu close, then scroll
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
      } else {
        console.log('Element not found:', sectionId)
      }
    }, 100)
  }

  return (
    <>
      {/* Mobile Navigation Overlay */}
      <div 
        className={`nav-overlay ${isMenuOpen ? 'open' : ''}`}
        onClick={closeMenu}
      />

      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md text-white py-4 sticky top-0 z-50 shadow-lg border-b border-indigo-500/20">
        <div className="max-w-6xl mx-auto px-5">
          <nav className="flex justify-between items-center relative">
            {/* Logo */}
            <div 
              className="text-3xl font-bold flex items-center cursor-pointer"
              onClick={() => window.location.reload()}
            >
              <i className="fas fa-microchip mr-3 text-yellow-400 animate-pulse"></i>
              <span>Prashant</span>
            </div>

            {/* Hamburger Menu Button (Mobile) */}
            <button
              className="hamburger lg:hidden"
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
            >
              <i className="fas fa-bars"></i>
            </button>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex space-x-8">
              {[
                { href: 'about', label: 'About' },
                { href: 'skills', label: 'Skills' },
                { href: 'experience', label: 'Experience' },
                { href: 'projects', label: 'Projects' },
                { href: 'achievements', label: 'Achievements' },
                { href: 'contact', label: 'Contact' }
              ].map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-white hover:text-yellow-400 font-medium transition-all duration-300 relative py-2 hover:-translate-y-1 after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-yellow-400 after:to-cyan-400 hover:after:w-full after:transition-all after:duration-300"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              
              {/* Resume Link - External */}
              <li>
                <a
                  href="/resume"
                  className="text-white hover:text-green-400 font-medium transition-all duration-300 relative py-2 hover:-translate-y-1 after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-green-400 after:to-emerald-400 hover:after:w-full after:transition-all after:duration-300 flex items-center gap-1"
                >
                  <i className="fas fa-file-alt text-sm"></i>
                  Resume
                </a>
              </li>
            </ul>

            {/* Mobile Navigation */}
            <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
              {[
                { href: 'about', label: 'About' },
                { href: 'skills', label: 'Skills' },
                { href: 'experience', label: 'Experience' },
                { href: 'projects', label: 'Projects' },
                { href: 'achievements', label: 'Achievements' },
                { href: 'contact', label: 'Contact' }
              ].map((item, index) => (
                <li 
                  key={item.href}
                  style={{ animationDelay: `${(index + 1) * 0.05}s` }}
                >
                  <div
                    onTouchStart={(e) => {
                      e.stopPropagation()
                      console.log('Touch start:', item.href)
                    }}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      console.log('Mobile nav clicked:', item.href)
                      scrollToSection(item.href)
                    }}
                    className="block w-full text-left py-6 px-6 text-white hover:text-yellow-400 font-medium transition-all duration-300 border-b border-white/10 hover:bg-yellow-400/10 rounded-lg cursor-pointer touch-manipulation"
                    style={{ 
                      touchAction: 'manipulation',
                      WebkitTapHighlightColor: 'rgba(255, 255, 255, 0.1)',
                      minHeight: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      userSelect: 'none'
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    {item.label}
                  </div>
                </li>
              ))}
              
              {/* Resume Link for Mobile */}
              <li style={{ animationDelay: `${7 * 0.05}s` }}>
                <a
                  href="/resume"
                  onClick={() => closeMenu()}
                  className="flex w-full text-left py-6 px-6 text-white hover:text-green-400 font-medium transition-all duration-300 border-b border-white/10 hover:bg-green-400/10 rounded-lg cursor-pointer touch-manipulation items-center gap-2"
                  style={{ 
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'rgba(255, 255, 255, 0.1)',
                    minHeight: '60px',
                    userSelect: 'none'
                  }}
                >
                  <i className="fas fa-file-alt text-sm"></i>
                  Resume
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}
