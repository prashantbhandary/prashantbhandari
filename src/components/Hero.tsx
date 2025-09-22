'use client'

import { useEffect, useState, useMemo } from 'react'

export default function Hero() {
  const [typedText, setTypedText] = useState('')
  
  const texts = useMemo(() => [
    'Electronics Engineering Student 🎓',
    'Robotics Enthusiast 🤖',
    'PCB Design Expert 🔧',
    'Embedded Systems Developer 💻',
    'Competition Winner 🏆',
    'Arduino & ESP32 Pro ⚡',
    'Innovation Builder 🚀'
  ], [])

  useEffect(() => {
    let index = 0
    let isDeleting = false
    let isTyping = true
    let textIndex = 0
    
    const typeText = () => {
      const currentText = texts[textIndex]
      
      if (isTyping && !isDeleting) {
        // Typing phase
        if (index < currentText.length) {
          setTypedText(currentText.slice(0, index + 1))
          index++
        } else {
          // Finished typing, wait then start deleting
          isTyping = false
          setTimeout(() => {
            isDeleting = true
            isTyping = true
          }, 2000) // Wait 2 seconds before deleting
        }
      } else if (isTyping && isDeleting) {
        // Deleting phase
        if (index > 0) {
          setTypedText(currentText.slice(0, index - 1))
          index--
        } else {
          // Finished deleting, move to next text
          isDeleting = false
          textIndex = (textIndex + 1) % texts.length
          setTimeout(() => {
            isTyping = true
          }, 500) // Wait 0.5 second before typing next text
        }
      }
    }

    const timer = setInterval(typeText, isDeleting ? 50 : 120) // Faster when deleting

    return () => clearInterval(timer)
  }, [texts])

  const scrollToSection = (sectionId: string) => {
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
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden py-40">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-purple-900/30 to-slate-900/50" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full animate-float blur-3xl"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full animate-float blur-3xl" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full animate-spin-slow blur-2xl"></div>
        
        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-cyan-400/50 rounded-full animate-float`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${4 + i}s`
            }}
          />
        ))}
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-5 text-center">
        <div className="bg-slate-900/40 backdrop-blur-md p-12 rounded-3xl border border-indigo-500/20 shadow-2xl">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
              Prashant Bhandari
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl mb-8 text-gray-200">
            B.E. Electronics, Communication & Information Engineering Student
          </p>
          
          <div className="text-cyan-400 font-semibold text-xl md:text-2xl mb-12 min-h-[2rem]">
            {typedText}
            <span className="animate-pulse text-yellow-400 font-bold">|</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => scrollToSection('contact')}
              className="group relative inline-block bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-4 px-10 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-400/30 overflow-hidden"
            >
              <span className="relative z-10">Get in Touch</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
            
            <a
              href="/resume"
              className="group relative inline-block border-2 border-green-400 text-green-400 py-4 px-10 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:bg-green-400 hover:text-white hover:shadow-xl hover:shadow-green-400/30 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <i className="fas fa-download"></i>
                Download Resume
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </a>
            
            <a
              href="https://www.linkedin.com/in/prashantbdri"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block border-2 border-yellow-400 text-yellow-400 py-4 px-10 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-400 hover:text-white hover:shadow-xl hover:shadow-yellow-400/30 overflow-hidden"
            >
              <span className="relative z-10">View LinkedIn</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
