'use client'

import { useEffect, useState } from 'react'

export default function Hero() {
  const [typedText, setTypedText] = useState('')
  const fullText = 'Embedded Systems Developer | PCB Designer | Web Developer'

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 50)

    return () => clearInterval(timer)
  }, [])

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
      
      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-5 text-center">
        <div className="bg-slate-900/40 backdrop-blur-md p-12 rounded-3xl border border-indigo-500/20 shadow-2xl">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
              Prashant Bhandari
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl mb-8 text-gray-200">
            Electronics Engineering Student & Robotics Enthusiast
          </p>
          
          <div className="text-cyan-400 font-semibold text-xl md:text-2xl mb-12 min-h-[2rem]">
            {typedText}
            <span className="animate-pulse">|</span>
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
