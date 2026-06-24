'use client'

/**
 * Chatbot — a floating AI assistant that answers visitors' questions about
 * Prashant, grounded in his résumé. Replies stream token-by-token from Groq
 * via the /api/chat Cloudflare Pages Function, so the API key never reaches
 * the browser. Launcher sits bottom-left to clear the theme toggle.
 */

import { useEffect, useRef, useState } from 'react'
import { MessageSquare, X, ArrowUp, Loader2, Bot } from 'lucide-react'

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
      {/* Launcher — bottom-right */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open AI assistant'}
        aria-expanded={open}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900"
      >
        {open ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      {/* Chat panel */}
      <div
        role="dialog"
        aria-label="AI assistant"
        aria-hidden={!open}
        className={`fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm origin-bottom-right transition-all duration-300 ${
          open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-[60vh] max-h-[34rem] rounded-2xl overflow-hidden bg-slate-900/95 backdrop-blur-xl border border-white/10 shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white">
            <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5" />
            </span>
            <div className="leading-tight">
              <p className="font-semibold text-sm">Prashant&apos;s AI Assistant</p>
              <p className="text-white/70 text-xs">Ask me anything about his work</p>
            </div>
          </div>

          {/* Transcript */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => {
              const typing = busy && i === messages.length - 1 && !m.content
              return (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] text-sm leading-relaxed rounded-2xl px-4 py-2.5 whitespace-pre-wrap ${
                      m.role === 'user'
                        ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-br-sm'
                        : 'bg-white/5 border border-white/10 text-slate-200 rounded-bl-sm'
                    }`}
                  >
                    {typing ? (
                      <span className="flex gap-1 py-1" aria-label="Assistant is typing">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                      </span>
                    ) : (
                      m.content
                    )}
                  </div>
                </div>
              )
            })}

            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {PROMPTS.map((p) => (
                  <button
                    key={p}
                    onClick={() => send(p)}
                    className="text-xs text-cyan-300 border border-cyan-400/30 rounded-full px-3 py-1.5 hover:bg-cyan-400/10 hover:border-cyan-400/60 transition-colors duration-200"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Composer */}
          <form onSubmit={onSubmit} className="border-t border-white/10 p-3 flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              rows={1}
              placeholder="Type your question…"
              className="flex-1 resize-none bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-400/60 transition-colors duration-200 max-h-28"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send message"
              className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white flex items-center justify-center hover:opacity-90 transition-opacity duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {busy ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowUp className="w-5 h-5" />}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
