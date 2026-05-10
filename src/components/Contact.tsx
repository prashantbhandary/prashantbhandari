'use client'

import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { Mail, Phone, MapPin, Send, Loader2, Linkedin, Github, Twitter, Instagram } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const { name, email, subject, message } = formData
    if (!name || !email || !subject || !message) {
      setStatus('error')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setStatus('error')
      return
    }

    setIsSubmitting(true)
    setStatus('idle')
    
    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const userID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID
    const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@bhandari-prashant.com.np"
    
    if (!serviceID || !templateID || !userID) {
      setStatus('error')
      setIsSubmitting(false)
      return
    }
    
    const templateParams = {
      from_name: name,
      from_email: email,
      subject: subject,
      message: message,
      to_email: contactEmail
    }

    try {
      await emailjs.send(serviceID, templateID, templateParams, userID)
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      info: 'info@bhandari-prashant.com.np',
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      icon: Phone,
      title: 'Phone',
      info: '+977 9867756915',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      icon: MapPin,
      title: 'Location',
      info: 'Pokhara, Nepal',
      gradient: 'from-red-500 to-pink-500'
    }
  ]

  const socialLinks = [
    { href: 'https://www.linkedin.com/in/prashantbdri', icon: Linkedin, color: 'from-blue-600 to-blue-700', label: 'LinkedIn profile' },
    { href: 'https://github.com/prashantbhandary', icon: Github, color: 'from-gray-700 to-gray-800', label: 'GitHub profile' },
    { href: 'https://twitter.com/santhprashant', icon: Twitter, color: 'from-gray-400 to-gray-600', label: 'Twitter profile' },
    { href: 'https://www.instagram.com/_prashant.08/', icon: Instagram, color: 'from-pink-500 to-purple-600', label: 'Instagram profile' }
  ]

  return (
    <section id="contact" className="py-16 md:py-24 relative bg-slate-900/30" aria-labelledby="contact-heading">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-16">
          <h2 id="contact-heading" className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Contact Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-yellow-400 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Get in touch for collaborations, opportunities, or just to discuss technology and innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="flex items-start gap-6 p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${info.gradient} rounded-full flex items-center justify-center flex-shrink-0 shadow-lg`} aria-hidden="true">
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{info.title}</h3>
                  <p className="text-gray-300 font-medium">{info.info}</p>
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="flex gap-4 justify-center lg:justify-start">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-14 h-14 rounded-full bg-gradient-to-r ${social.color} flex items-center justify-center text-white transition-all duration-300 hover:-translate-y-2 hover:scale-110 hover:shadow-lg relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900`}
                >
                  <social.icon className="w-5 h-5 relative z-10" aria-hidden="true" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-indigo-500/20">
            <div className="w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-8" aria-hidden="true"></div>
            
            <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
              <div>
                <label htmlFor="name" className="block text-white font-semibold mb-3">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 border-2 border-indigo-500/20 rounded-lg bg-slate-900/30 text-white transition-all duration-300 focus:outline-none focus:border-indigo-400 focus:bg-slate-900/50 focus:shadow-lg"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white font-semibold mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 border-2 border-indigo-500/20 rounded-lg bg-slate-900/30 text-white transition-all duration-300 focus:outline-none focus:border-indigo-400 focus:bg-slate-900/50 focus:shadow-lg"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-white font-semibold mb-3">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 border-2 border-indigo-500/20 rounded-lg bg-slate-900/30 text-white transition-all duration-300 focus:outline-none focus:border-indigo-400 focus:bg-slate-900/50 focus:shadow-lg"
                  placeholder="Enter message subject"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-semibold mb-3">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-6 py-4 border-2 border-indigo-500/20 rounded-lg bg-slate-900/30 text-white transition-all duration-300 focus:outline-none focus:border-indigo-400 focus:bg-slate-900/50 focus:shadow-lg resize-y"
                  placeholder="Enter your message"
                />
              </div>

              {status === 'success' && (
                <div className="p-4 bg-green-500/20 border border-green-500/40 rounded-lg text-green-300" role="alert">
                  Thank you for your message! I will get back to you soon.
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 bg-red-500/20 border border-red-500/40 rounded-lg text-red-300" role="alert">
                  There was an error sending your message. Please try again or contact me directly at info@bhandari-prashant.com.np
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-4 px-8 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-400/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
