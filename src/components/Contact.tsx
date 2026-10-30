'use client'

import { useEffect, useRef, useState } from 'react'
import { Mail, Phone, MapPin, Send, Loader2, Linkedin, Github, Twitter, Instagram } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal, RevealGroup, RevealItem } from './motion/Motion'
import { checkFields, validateContact, type ContactErrors, type ContactForm } from '@/lib/contact-validation'

const CONTACT_EMAIL = 'info@bhandari-prashant.com.np'

// Web3Forms emails each submission to the address the key was created with.
// The key is public by design (it ships to the browser), so it lives here.
// Get one at https://web3forms.com
const WEB3FORMS_KEY = '7b15b754-c79d-4604-aa8a-20730f05526e'

const EMPTY: ContactForm = { name: '', email: '', subject: '', message: '' }
/** A person takes longer than this to fill the form; scripts don't */
const MIN_FILL_MS = 3000
/** One message a minute per browser */
const COOLDOWN_MS = 60_000
const LAST_SENT_KEY = 'contact:lastSent'

type Status = 'idle' | 'checking' | 'sending' | 'success' | 'invalid' | 'cooldown' | 'error'

function lastSent() {
  try {
    return Number(localStorage.getItem(LAST_SENT_KEY)) || 0
  } catch {
    return 0
  }
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactForm>(EMPTY)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [trap, setTrap] = useState('')
  const openedAt = useRef(0)
  const formRef = useRef<HTMLFormElement>(null)
  const busy = status === 'checking' || status === 'sending'

  useEffect(() => {
    openedAt.current = Date.now()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = e.target.name as keyof ContactForm
    setFormData({ ...formData, [field]: e.target.value })
    if (errors[field]) setErrors({ ...errors, [field]: undefined })
  }

  // Format errors show as soon as a field is left, not only on submit
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = e.target.name as keyof ContactForm
    if (!formData[field].trim()) return
    setErrors({ ...errors, [field]: checkFields(formData)[field] })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (busy) return

    // Bots fill the hidden field or submit instantly: act as if it worked, send nothing
    if (trap || Date.now() - openedAt.current < MIN_FILL_MS) {
      setStatus('success')
      setFormData(EMPTY)
      return
    }

    if (Date.now() - lastSent() < COOLDOWN_MS) {
      setStatus('cooldown')
      return
    }

    setStatus('checking')
    const found = await validateContact(formData)
    setErrors(found)
    const firstBad = (Object.keys(EMPTY) as (keyof ContactForm)[]).find((f) => found[f])
    if (firstBad) {
      setStatus('invalid')
      formRef.current?.querySelector<HTMLElement>(`#${firstBad}`)?.focus()
      return
    }

    setStatus('sending')
    try {
      // Plain form data keeps this a "simple" request: no CORS preflight to fail
      const body = new FormData()
      body.append('access_key', WEB3FORMS_KEY)
      body.append('from_name', 'bhandari-prashant.com.np')
      body.append('subject', `Website: ${formData.subject.trim()}`)
      body.append('name', formData.name.trim())
      body.append('email', formData.email.trim())
      body.append('replyto', formData.email.trim())
      body.append('message', formData.message.trim())
      body.append('botcheck', '') // Web3Forms' own honeypot: rejected unless empty

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body,
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.message)
      try {
        localStorage.setItem(LAST_SENT_KEY, String(Date.now()))
      } catch {
        // storage blocked: no cooldown, still sent
      }
      setStatus('success')
      setFormData(EMPTY)
    } catch {
      setStatus('error')
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
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name', autoComplete: 'name', maxLength: 80 },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', autoComplete: 'email', maxLength: 254 },
    { name: 'subject', label: 'Subject', type: 'text', placeholder: "What's this about?", autoComplete: 'off', maxLength: 120 },
  ] as const

  const fieldProps = (name: keyof ContactForm) => ({
    id: name,
    name,
    value: formData[name],
    onChange: handleChange,
    onBlur: handleBlur,
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })

  const fieldError = (name: keyof ContactForm) =>
    errors[name] && (
      <p id={`${name}-error`} className="field__error">
        {errors[name]}
      </p>
    )

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
            <form ref={formRef} onSubmit={handleSubmit} className="grid gap-4" aria-label="Contact form" noValidate>
              {fields.map((field) => (
                <div key={field.name} className="field">
                  <label htmlFor={field.name}>{field.label}</label>
                  <input
                    {...fieldProps(field.name)}
                    type={field.type}
                    placeholder={field.placeholder}
                    autoComplete={field.autoComplete}
                    maxLength={field.maxLength}
                    required
                  />
                  {fieldError(field.name)}
                </div>
              ))}

              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea
                  {...fieldProps('message')}
                  rows={5}
                  maxLength={5000}
                  placeholder="Tell me about the project…"
                  required
                />
                {fieldError('message')}
              </div>

              {/* Hidden from people, irresistible to form-filling bots */}
              <div className="hp-field" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={trap}
                  onChange={(e) => setTrap(e.target.value)}
                />
              </div>

              <AnimatePresence mode="wait">
                {(status === 'success' || status === 'invalid' || status === 'cooldown' || status === 'error') && (
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
                    {status === 'invalid' && 'Please fix the highlighted fields.'}
                    {status === 'cooldown' && 'Message already sent. Please wait a minute before sending another.'}
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

              <button type="submit" className="btn btn--primary w-full" disabled={busy}>
                {busy ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    {status === 'checking' ? 'Checking your email…' : 'Sending…'}
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
