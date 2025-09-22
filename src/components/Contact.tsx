'use client'

import { useState } from 'react'
import emailjs from '@emailjs/browser'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    const { name, email, subject, message } = formData
    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields.')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.')
      return
    }

    setIsSubmitting(true)
    
    // EmailJS configuration from environment variables
    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_vqzpcsn"
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_pmdilpp"
    const userID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID || "90R1DZh0HH_ycIDrs"
    const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "santhprashant@gmail.com"
    
    const templateParams = {
      from_name: name,
      from_email: email,
      subject: subject,
      message: message,
      to_email: contactEmail
    }

    try {
      const response = await emailjs.send(serviceID, templateID, templateParams, userID)
      console.log('SUCCESS!', response.status, response.text)
      alert(`Thank you for your message, ${name}! I will get back to you at ${email} soon.`)
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.log('FAILED...', error)
      
      // Fallback to mailto link
      const mailtoLink = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`
      
      if (confirm('There was an error sending your message. Would you like to open your default email client to send the message?')) {
        window.location.href = mailtoLink
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        alert(`Please contact me directly at ${contactEmail}`)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      info: 'info@bhandari-prashant.com.np',
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      icon: 'fas fa-phone',
      title: 'Phone',
      info: '+977 9867756915',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Location',
      info: 'Pokhara, Nepal',
      gradient: 'from-red-500 to-pink-500'
    }
  ]

  return (
    <section id="contact" className="py-24 relative bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Contact Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-yellow-400 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
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
                <div className={`w-16 h-16 bg-gradient-to-r ${info.gradient} rounded-full flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <i className={`${info.icon} text-2xl text-white`}></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{info.title}</h3>
                  <p className="text-gray-300 font-medium">{info.info}</p>
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="flex gap-4 justify-center lg:justify-start">
              {[
                { href: 'https://www.linkedin.com/in/prashantbdri', icon: 'fab fa-linkedin', color: 'from-blue-600 to-blue-700' },
                { href: 'https://github.com/prashantbhandary', icon: 'fab fa-github', color: 'from-gray-700 to-gray-800' },
                { href: 'https://twitter.com/santhprashant', icon: 'fab fa-twitter', color: 'from-blue-400 to-blue-500' },
                { href: 'https://www.instagram.com/_prashant.08/', icon: 'fab fa-instagram', color: 'from-pink-500 to-purple-600' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-14 h-14 rounded-full bg-gradient-to-r ${social.color} flex items-center justify-center text-white transition-all duration-300 hover:-translate-y-2 hover:scale-110 hover:shadow-lg relative overflow-hidden group`}
                >
                  <i className={`${social.icon} text-xl relative z-10`}></i>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-indigo-500/20">
            <div className="w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-8"></div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="w-full px-6 py-4 border-2 border-indigo-500/20 rounded-lg bg-slate-900/30 text-white transition-all duration-300 focus:outline-none focus:border-indigo-400 focus:bg-slate-900/50 focus:shadow-lg resize-vertical"
                  placeholder="Enter your message"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-4 px-8 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-400/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
              >
                <span className="relative z-10">
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner animate-spin mr-2"></i>
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane mr-2"></i>
                      Send Message
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
