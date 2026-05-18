'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const WELCOME: Message = {
  role: 'assistant',
  content:
    'Cześć! Jestem Doradcą szkoleniowym pbix.pl.\n\nPomogę Ci wybrać szkolenie dopasowane do Twoich potrzeb. Co Cię interesuje — Power BI, Excel, SQL, czy może coś innego?',
}

// ── SVG icons (inline — no lucide-react dependency) ──────────────────────────

function IconChat() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function IconClose() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function IconSend() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

// ── Typing dots ───────────────────────────────────────────────────────────────

function Dots() {
  return (
    <span style={{ display: 'inline-flex', gap: 3, alignItems: 'center', height: 16 }}>
      {[0, 150, 300].map((d) => (
        <span
          key={d}
          className="animate-bounce"
          style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.25)',
            animationDelay: `${d}ms`,
          }}
        />
      ))}
    </span>
  )
}

// ── FloatingChat ──────────────────────────────────────────────────────────────

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), [])

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
      const t = setTimeout(() => textareaRef.current?.focus(), 300)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function send() {
    const text = input.trim()
    if (!text || loading) return
    const userMsg: Message = { role: 'user', content: text }
    const next = [...messages, userMsg]
    setMessages([...next, { role: 'assistant', content: '' }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })
      if (!res.ok || !res.body) throw new Error()
      const reader = res.body.getReader()
      const dec = new TextDecoder()
      let acc = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        acc += dec.decode(value, { stream: true })
        const snap = acc
        setMessages((m) => {
          const c = [...m]
          c[c.length - 1] = { role: 'assistant', content: snap }
          return c
        })
      }
    } catch {
      setMessages((m) => {
        const c = [...m]
        c[c.length - 1] = {
          role: 'assistant',
          content: 'Przepraszam, wystąpił błąd. Napisz na kontakt@pbix.pl lub zadzwoń: +48 573 195 404.',
        }
        return c
      })
    } finally {
      setLoading(false)
    }
  }

  function handleKeys(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Escape') setIsOpen(false)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 12,
      }}
    >
      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              width: 360,
              borderRadius: 20,
              overflow: 'hidden',
              background: 'rgba(255,255,255,0.88)',
              backdropFilter: 'blur(28px) saturate(180%)',
              WebkitBackdropFilter: 'blur(28px) saturate(180%)',
              border: '1px solid rgba(255,255,255,0.65)',
              boxShadow:
                '0 8px 40px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.90)',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '14px 16px',
                borderBottom: '1px solid rgba(0,0,0,0.07)',
                background:
                  'linear-gradient(135deg, rgba(30,153,83,0.10) 0%, rgba(30,153,83,0.04) 100%)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1e9953, #17803f)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 10px rgba(30,153,83,0.35)',
                  flexShrink: 0,
                }}
              >
                <IconChat />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#1d1d1f', lineHeight: 1.3 }}>
                  Doradca szkoleniowy
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#1e9953',
                      display: 'inline-block',
                    }}
                  />
                  <span style={{ fontSize: 11, color: '#6e6e73' }}>pbix.pl · AI</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Zamknij czat"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 4,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#86868b',
                  fontSize: 20,
                  lineHeight: 1,
                  transition: 'color 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#1d1d1f')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#86868b')}
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div
              style={{
                height: 320,
                overflowY: 'auto',
                padding: '14px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(0,0,0,0.12) transparent',
              }}
            >
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}
                >
                  <p
                    style={{
                      maxWidth: '86%',
                      margin: 0,
                      fontSize: 13,
                      lineHeight: 1.6,
                      padding: '8px 13px',
                      borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                      whiteSpace: 'pre-wrap',
                      ...(m.role === 'user'
                        ? { background: '#1e9953', color: '#fff' }
                        : {
                            background: 'rgba(0,0,0,0.05)',
                            color: '#1d1d1f',
                            border: '1px solid rgba(0,0,0,0.07)',
                          }),
                    }}
                  >
                    {m.content || <Dots />}
                  </p>
                </motion.div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input area */}
            <div
              style={{
                borderTop: '1px solid rgba(0,0,0,0.07)',
                padding: '10px 12px 12px',
                background: 'rgba(255,255,255,0.6)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: 8,
                  borderRadius: 16,
                  padding: '8px 10px 8px 14px',
                  background: 'rgba(0,0,0,0.04)',
                  border: '1px solid rgba(0,0,0,0.08)',
                  transition: 'border-color 0.2s',
                }}
                onFocusCapture={(e) =>
                  (e.currentTarget.style.borderColor = 'rgba(30,153,83,0.35)')
                }
                onBlurCapture={(e) =>
                  (e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)')
                }
              >
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeys}
                  placeholder="Napisz wiadomość…"
                  disabled={loading}
                  rows={1}
                  style={{
                    flex: 1,
                    resize: 'none',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    fontSize: 13,
                    color: '#1d1d1f',
                    fontFamily: 'inherit',
                    lineHeight: 1.55,
                    maxHeight: 72,
                    overflowY: 'auto',
                    caretColor: '#1e9953',
                  }}
                />
                <button
                  onClick={send}
                  disabled={!input.trim() || loading}
                  aria-label="Wyślij"
                  style={{
                    flexShrink: 0,
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: '#1e9953',
                    border: 'none',
                    cursor: input.trim() && !loading ? 'pointer' : 'default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: !input.trim() || loading ? 0.3 : 1,
                    transition: 'opacity 0.15s, box-shadow 0.15s',
                    boxShadow:
                      input.trim() && !loading ? '0 2px 8px rgba(30,153,83,0.40)' : 'none',
                  }}
                >
                  <IconSend />
                </button>
              </div>
              <p style={{ margin: '5px 0 0 4px', fontSize: 10, color: '#86868b' }}>
                Enter – wyślij · Shift+Enter – nowa linia · Esc – zamknij
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={toggleOpen}
        aria-label={isOpen ? 'Zamknij czat' : 'Otwórz czat z doradcą'}
        aria-expanded={isOpen}
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: isOpen ? '#dc2626' : '#1e9953',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isOpen
            ? '0 4px 18px rgba(220,38,38,0.38)'
            : '0 4px 18px rgba(30,153,83,0.42)',
          transition: 'background 0.2s, box-shadow 0.2s',
          position: 'relative',
        }}
      >
        {/* Pulse ring (only when closed) */}
        {!isOpen && (
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: -6,
              borderRadius: '50%',
              border: '2px solid rgba(30,153,83,0.35)',
              animation: 'chatPulse 2.5s ease-out infinite',
            }}
          />
        )}
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <IconClose />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <IconChat />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
