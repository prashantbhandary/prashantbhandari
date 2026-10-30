'use client'

import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { Mail, Phone, MapPin, Send, Loader2, Linkedin, Github, Twitter, Instagram } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal, RevealGroup, RevealItem } from './motion/Motion'

const CONTACT_EMAIL = 'info@bhandari-prashant.com.np'

// EmailJS IDs are public (they ship to the browser), so they live here rather than
// only in .env.local, which the Cloudflare Pages build never sees
const EMAILJS = {
  service: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_vqzpcsn',
  template: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_pmdilpp',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_USER_ID || '90R1DZh0HH_ycIDrs',
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'invalid' | 'error'>('idle')

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
      setStatus('invalid')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setStatus('invalid')
      return
    }

    setIsSubmitting(true)
    setStatus('idle')

    const templateParams = {
      from_name: name,
      from_email: email,
      subject: subject,
      message: message,
      to_email: CONTACT_EMAIL
    }

    try {
      await emailjs.send(EMAILJS.service, EMAILJS.template, templateParams, { publicKey: EMAILJS.publicKey })
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Fallback when sending fails: opens the visitor's mail app with the message filled in
  const mailtoHref = `mailto:${CONTACT_EMAIL}?${new URLSearchParams({
    subject: formData.subject,
    body: `${formData.message}\n\n— ${formData.name}`,
  })
    .toString()
    .replace(/\+/g, '%20')}`

  const contactRows = [
    { icon: Mail, label: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    { icon: Phone, label: 'Phone', value: '+977 9867756915', href: 'tel:+9779867756915' },
    { icon: MapPin, label: 'Location', value: 'Pokhara, Nepal', href: undefined },
  ]

  const socials = [
    { href: 'https://www.linkedin.com/in/prashantbdri', icon: Linkedin, label: 'LinkedIn profile' },
    { href: 'https://github.com/prashantbhandary', icon: Github, label: 'GitHub profile' },
    { href: 'https://twitter.com/santhprashant', icon: Twitter, label: 'Twitter profile' },
    { href: 'https://www.instagram.com/_prashant.08/', icon: Instagram, label: 'Instagram profile' },
  ]

  const fields = [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name', value: formData.name },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', value: formData.email },
    { name: 'subject', label: 'Subject', type: 'text', placeholder: "What's this about?", value: formData.subject },
  ]

  return (
    <section id="contact" className="section section--alt" aria-labelledby="contact-heading">
      <div className="shell">
        <Reveal as="header" className="section-head">
          <p className="section-index">
            <span>06</span> Contact
          </p>
          <h2 id="contact-heading" className="section-title">
            Let&apos;s build something
          </h2>
          <p className="section-lead">
            Open to PhD research positions in robotics, as well as hardware collaborations. The
            fastest way to reach me is email.
          </p>
        </Reveal>

        <RevealGroup className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]" stagger={0.1}>
          {/* Details */}
          <RevealItem>
            <div>
              {contactRows.map((row) => {
                const Row = row.href ? 'a' : 'div'
                return (
                  <Row key={row.label} className="contact-row" {...(row.href ? { href: row.href } : {})}>
                    <span className="contact-row__icon" aria-hidden="true">
                      <row.icon size={16} />
                    </span>
                    <span>
                      <span className="contact-row__label block">{row.label}</span>
                      <span className="contact-row__value">{row.value}</span>
                    </span>
                  </Row>
                )
              })}
            </div>

            <div className="social-row mt-6">
              {socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="social-btn"
                >
                  <social.icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </RevealItem>

          {/* Form */}
          <RevealItem className="card form-card">
            <form onSubmit={handleSubmit} className="grid gap-4" aria-label="Contact form">
              {fields.map((field) => (
                <div key={field.name} className="field">
                  <label htmlFor={field.name}>{field.label}</label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    value={field.value}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required
                    autoComplete={field.name === 'email' ? 'email' : field.name === 'name' ? 'name' : 'off'}
                  />
                </div>
              ))}

              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about the project…"
                  required
                />
              </div>

              <AnimatePresence mode="wait">
                {status !== 'idle' && (
                  <motion.p
                    key={status}
                    className={`note ${status === 'success' ? 'note--ok' : 'note--bad'}`}
                    role={status === 'success' ? 'status' : 'alert'}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
                  >
                    {status === 'success' && "Thanks — your message is on its way. I'll reply soon."}
                    {status === 'invalid' && 'Please fill in every field with a valid email address.'}
                    {status === 'error' && (
                      <>
                        That didn&apos;t send.{' '}
                        <a href={mailtoHref} className="underline font-medium">
                          Send it from your email app instead
                        </a>{' '}
                        — your message is already filled in.
                      </>
                    )}
                  </motion.p>
                )}
              </AnimatePresence>

              <button type="submit" className="btn btn--primary w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" aria-hidden="true" />
                    Send message
                  </>
                )}
              </button>
            </form>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  )
}
