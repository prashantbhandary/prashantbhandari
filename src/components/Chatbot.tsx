'use client'

/**
 * Chatbot — a floating AI assistant that answers visitors' questions about
 * Prashant, grounded in his résumé. Replies stream token-by-token from Groq
 * via the /api/chat Cloudflare Pages Function, so the API key never reaches
 * the browser. Launcher sits bottom-left to clear the theme toggle.
 */

import { useEffect, useRef, useState } from 'react'
import { MessageSquare, X, ArrowUp, Loader2, Bot } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 0.61, 0.36, 1] as const

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const GREETING: Message = {
  role: 'assistant',
  content:
    "Hi! I'm Prashant's AI assistant. Ask me about his projects, skills, experience, or how to get in touch.",
}

const PROMPTS = [
  'What does Prashant work on?',
  'Show me his best projects',
  'What are his top skills?',
  'How can I contact him?',
]

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([GREETING])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const reduce = useReducedMotion()

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, busy])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const send = async (text: string) => {
    const content = text.trim()
    if (!content || busy) return

    setInput('')
    const next = [...messages, { role: 'user' as const, content }]
    setMessages([...next, { role: 'assistant', content: '' }])
    setBusy(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.filter((m) => m !== GREETING) }),
      })

      if (!res.ok || !res.body) throw new Error('bad response')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let reply = ''

      // Parse the Groq SSE stream: lines of `data: {json}`, ending with [DONE].
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''

        for (const line of lines) {
          const trimmed = line.trim()
          if (!trimmed.startsWith('data:')) continue
          const data = trimmed.slice(5).trim()
          if (data === '[DONE]') continue
          try {
            const token = JSON.parse(data)?.choices?.[0]?.delta?.content
            if (token) {
              reply += token
              setMessages((prev) => {
                const copy = [...prev]
                copy[copy.length - 1] = { role: 'assistant', content: reply }
                return copy
              })
            }
          } catch {
            /* ignore keep-alive / partial frames */
          }
        }
      }

      if (!reply) throw new Error('empty reply')
    } catch {
      setMessages((prev) => {
        const copy = [...prev]
        copy[copy.length - 1] = {
          role: 'assistant',
          content:
            "Sorry, I couldn't reach the assistant just now. Please try again, or email Prashant at santhprashant@gmail.com.",
        }
        return copy
      })
    } finally {
      setBusy(false)
    }
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    send(input)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  return (
    <>
      {/* Launcher */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open AI assistant'}
        aria-expanded={open}
        className="bot-fab"
        initial={reduce ? false : { opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 380, damping: 24, delay: 0.6 }}
        whileHover={reduce ? undefined : { scale: 1.06 }}
        whileTap={reduce ? undefined : { scale: 0.94 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'close' : 'open'}
            initial={reduce ? false : { opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, rotate: 90, scale: 0.6 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="grid place-items-center"
          >
            {open ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="AI assistant"
            className="bot-panel"
            initial={reduce ? false : { opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          >
        <div className="bot-head">
          <span
            className="grid place-items-center w-8 h-8 rounded-[var(--r-sm)] shrink-0"
            style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
          >
            <Bot className="w-4 h-4" />
          </span>
          <div className="leading-tight">
            <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--ink)' }}>
              Prashant&apos;s AI Assistant
            </p>
            <p className="mono" style={{ color: 'var(--ink-4)' }}>
              Ask anything about his work
            </p>
          </div>
        </div>

        {/* Transcript */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5">
          {messages.map((m, i) => {
            const typing = busy && i === messages.length - 1 && !m.content
            return (
              <motion.div
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                initial={reduce ? false : { opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.24, ease: EASE }}
              >
                <div className={`bubble ${m.role === 'user' ? 'bubble--user' : 'bubble--bot'}`}>
                  {typing ? (
                    <span className="flex gap-1 py-1" aria-label="Assistant is typing">
                      <span className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:-0.3s]" style={{ background: 'var(--ink-4)' }} />
                      <span className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:-0.15s]" style={{ background: 'var(--ink-4)' }} />
                      <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'var(--ink-4)' }} />
                    </span>
                  ) : (
                    m.content
                  )}
                </div>
              </motion.div>
            )
          })}

          {messages.length === 1 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {PROMPTS.map((p) => (
                <button key={p} onClick={() => send(p)} className="tag" style={{ cursor: 'pointer' }}>
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Composer */}
        <form onSubmit={onSubmit} className="p-2.5 flex items-end gap-2" style={{ borderTop: '1px solid var(--line)' }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            rows={1}
            placeholder="Type your question…"
            aria-label="Message"
            className="flex-1 resize-none max-h-28 px-3 py-2 text-sm rounded-[var(--r-sm)]"
            style={{ border: '1px solid var(--line)', background: 'var(--surface-sunk)', color: 'var(--ink)' }}
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            aria-label="Send message"
            className="btn btn--primary shrink-0"
            style={{ minHeight: 38, width: 38, padding: 0 }}
          >
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowUp className="w-4 h-4" />}
          </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
