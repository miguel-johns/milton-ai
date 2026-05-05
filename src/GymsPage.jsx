import { useState, useEffect, useRef } from 'react'
import Footer from './components/Footer'

// ─────────────────────────────────────────────
// Design tokens (same as home page)
// ─────────────────────────────────────────────
const colors = {
  bg: '#FAFBFC',
  bg2: '#F0F7F5',
  paper: '#FFFFFF',
  ink: '#0B1628',
  inkSoft: '#475569',
  inkMute: '#94A3B8',
  line: '#E2E8F0',
  lineSoft: '#F1F5F9',
  accent: '#2BBFAA',
  accentDeep: '#08455E',
  accentSoft: '#E6F8F4',
  mint: '#9AF198',
  mintSoft: '#ECFAEA',
}

const fonts = {
  serif: "'Cormorant Garamond', Georgia, serif",
  sans: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
}

// Milton logo image
const logoImage = "/images/milton-logo.png"

// Image placeholder component
const ImagePlaceholder = ({ hint, aspectRatio = '16/9' }) => (
  <div style={{
    width: '100%',
    aspectRatio,
    background: colors.paper,
    backgroundImage: `
      linear-gradient(135deg, rgba(11, 22, 40, 0.025) 25%, transparent 25%),
      linear-gradient(225deg, rgba(11, 22, 40, 0.025) 25%, transparent 25%),
      linear-gradient(45deg, rgba(11, 22, 40, 0.025) 25%, transparent 25%),
      linear-gradient(315deg, rgba(11, 22, 40, 0.025) 25%, transparent 25%)
    `,
    backgroundPosition: '12px 0, 12px 0, 0 0, 0 0',
    backgroundSize: '24px 24px',
    border: '1.5px dashed rgba(11, 22, 40, 0.18)',
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    padding: '32px 24px',
  }}>
    <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="rgba(11, 22, 40, 0.28)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
    <span style={{
      fontFamily: fonts.sans,
      fontSize: 10.5,
      fontWeight: 700,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'rgba(11, 22, 40, 0.5)',
    }}>Image Placeholder</span>
    <span style={{
      fontFamily: fonts.serif,
      fontStyle: 'italic',
      fontSize: 14,
      lineHeight: 1.45,
      color: colors.inkMute,
      textAlign: 'center',
      maxWidth: '80%',
    }}>{hint}</span>
  </div>
)

export default function GymsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [chatModalOpen, setChatModalOpen] = useState(false)
  const [chatSubmitted, setChatSubmitted] = useState(false)
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', company: '' })
  const [leadSubmitting, setLeadSubmitting] = useState(false)
  const [leadError, setLeadError] = useState(null)
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setMobile(window.innerWidth <= 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Prompt input state
  const [prompt, setPrompt] = useState('')
  const [closingPrompt, setClosingPrompt] = useState('')
  const [attachedFile, setAttachedFile] = useState(null)
  const [closingAttachedFile, setClosingAttachedFile] = useState(null)
  const textareaRef = useRef(null)
  const closingTextareaRef = useRef(null)
  const fileInputRef = useRef(null)
  const closingFileInputRef = useRef(null)

  const handleFileChange = (e, isClosing = false) => {
    const file = e.target.files?.[0]
    if (file) {
      if (isClosing) {
        setClosingAttachedFile(file)
      } else {
        setAttachedFile(file)
      }
    }
  }

  const handleSend = () => {
    setChatModalOpen(true)
  }

  const canSend = prompt.trim().length > 0 || attachedFile
  const canSendClosing = closingPrompt.trim().length > 0 || closingAttachedFile

  const closeChatModal = () => {
    setChatModalOpen(false)
    setTimeout(() => {
      setChatSubmitted(false)
      setLeadForm({ name: '', email: '', phone: '', company: '' })
      setLeadError(null)
    }, 300)
  }

  const handleLeadSubmit = async (e) => {
    e.preventDefault()
    setLeadError(null)
    setLeadSubmitting(true)

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadForm),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setChatSubmitted(true)
    } catch (err) {
      setLeadError(err.message)
    } finally {
      setLeadSubmitting(false)
    }
  }

  // Feature sections data
  const featureSections = [
    {
      title: "You can't be on every floor at once.",
      subtitle: "You know what good looks like. You just can't clone yourself.",
      bullets: [
        'Every trainer sees what you\'d see',
        'Every client gets what you\'d give',
        'The gap between your best coach and your newest one finally closes',
      ],
      imageHint: 'A gym floor with multiple trainers working with clients.',
    },
    {
      title: 'Your methodology. Every session. Every trainer.',
      subtitle: 'The thing that makes your gym different is how you coach. Milton protects that at scale.',
      bullets: [
        'Teach Milton your methodology once',
        'Shows up in every session, in your language',
        'Your gym scales without your coaching diluting',
      ],
      imageHint: 'A trainer following methodology cues on screen during a session.',
    },
    {
      title: 'The software your trainers will actually use.',
      subtitle: "You've bought the tools before. Your trainers ignored them. Milton is different because there's nothing to learn.",
      bullets: [
        "Open it, see who's coming in, see what to do",
        'No tabs, no menus, no training day',
        "If they leave the home screen, we've failed them",
      ],
      imageHint: 'Clean, simple interface showing today\'s sessions and tasks.',
    },
    {
      title: 'Stop being the bottleneck in your own gym.',
      subtitle: "Right now, you're the system. Milton takes that load off you.",
      bullets: [
        'Standards live in the software, not in your head',
        'New hires get coached as they coach',
        'Clients get a consistent experience, with or without you on the floor',
      ],
      imageHint: 'Gym owner working with clients, not stuck at a desk.',
    },
    {
      title: 'You set the rules. Milton enforces them.',
      subtitle: "Every gym has things that aren't optional. Milton lets you lock those in.",
      bullets: [
        'Trainers customize what you let them customize',
        'Different tiers for different clients, different permissions for different coaches',
        'Your gym, your rules, finally enforceable at scale',
      ],
      imageHint: 'Admin panel showing permissions and rules configuration.',
    },
  ]

  // Daily tasks data
  const dailyTasks = [
    {
      title: 'Prep',
      description: "Every trainer walks in knowing who's coming, what they need, and what changed since last session.",
    },
    {
      title: 'Adjust',
      description: 'A client comes in stiff or sore. Milton suggests the swap. The trainer approves. The methodology stays intact.',
    },
    {
      title: 'Coach',
      description: 'Session notes write themselves. Cues and rules show up in real time. Nothing slips through, even with new hires.',
    },
    {
      title: 'Follow up',
      description: "Texts, check-ins, and recovery nudges go out in your gym's voice. Clients feel coached all week, not just during their hour.",
    },
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: `
        radial-gradient(ellipse 1200px 600px at 50% -200px, rgba(43, 191, 170, 0.10) 0%, transparent 60%),
        radial-gradient(ellipse 800px 400px at 100% 100%, rgba(154, 241, 152, 0.08) 0%, transparent 60%),
        ${colors.bg}
      `,
      fontFamily: fonts.sans,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* ===== Header ===== */}
      <header style={{
        padding: mobile ? '20px' : '28px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <a href="/" style={{
          fontFamily: fonts.sans,
          fontSize: 20,
          fontWeight: 600,
          letterSpacing: '-0.02em',
          color: colors.ink,
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <img src={logoImage} alt="Milton" style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            objectFit: 'cover',
            boxShadow: '0 0 0 1px rgba(11, 22, 40, 0.04), 0 1px 3px rgba(11, 22, 40, 0.06)',
          }} />
          <span>Milton</span>
        </a>

        {/* Desktop nav */}
        {!mobile && (
          <nav style={{
            display: 'flex',
            gap: 28,
            fontSize: 14,
            color: colors.inkSoft,
            alignItems: 'center',
          }}>
            <a href="/coaches" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>For Coaches</a>
            <a href="/gyms" className="nav-link" style={{ color: colors.ink, textDecoration: 'none', fontWeight: 600 }}>For Gyms</a>
            <a href="/insights" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>Insights</a>
            <a href="/about" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>About</a>
            <a href="#" className="nav-btn" style={{
              border: `1px solid ${colors.line}`,
              padding: '8px 16px',
              borderRadius: 8,
              background: colors.paper,
              color: 'inherit',
              textDecoration: 'none',
            }}>Sign in</a>
          </nav>
        )}

        {/* Mobile hamburger */}
        {mobile && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              width: 40,
              height: 40,
              border: `1px solid ${colors.line}`,
              background: colors.paper,
              borderRadius: 10,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 60,
            }}
          >
            <div style={{
              width: 18,
              height: 14,
              position: 'relative',
            }}>
              <span style={{
                position: 'absolute',
                left: 0,
                width: '100%',
                height: 1.5,
                background: colors.ink,
                borderRadius: 1,
                top: mobileMenuOpen ? 6 : 0,
                transform: mobileMenuOpen ? 'rotate(45deg)' : 'none',
                transition: 'all 0.3s',
              }} />
              <span style={{
                position: 'absolute',
                left: 0,
                width: '100%',
                height: 1.5,
                background: colors.ink,
                borderRadius: 1,
                top: 6,
                opacity: mobileMenuOpen ? 0 : 1,
                transition: 'all 0.3s',
              }} />
              <span style={{
                position: 'absolute',
                left: 0,
                width: '100%',
                height: 1.5,
                background: colors.ink,
                borderRadius: 1,
                top: mobileMenuOpen ? 6 : 12,
                transform: mobileMenuOpen ? 'rotate(-45deg)' : 'none',
                transition: 'all 0.3s',
              }} />
            </div>
          </button>
        )}
      </header>

      {/* Mobile menu */}
      {mobile && mobileMenuOpen && (
        <>
          <div
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(11, 22, 40, 0.18)',
              backdropFilter: 'blur(2px)',
              zIndex: 50,
            }}
          />
          <div style={{
            position: 'fixed',
            top: 76,
            left: 16,
            right: 16,
            background: colors.paper,
            border: `1px solid ${colors.line}`,
            borderRadius: 16,
            boxShadow: '0 1px 2px rgba(11, 22, 40, 0.04), 0 16px 40px rgba(11, 22, 40, 0.10)',
            zIndex: 55,
            padding: 8,
          }}>
            <a href="/coaches" onClick={() => setMobileMenuOpen(false)} style={{
              display: 'block',
              padding: '14px 16px',
              fontSize: 16,
              fontWeight: 500,
              color: colors.ink,
              textDecoration: 'none',
              borderRadius: 10,
            }}>For Coaches</a>
            <a href="/gyms" onClick={() => setMobileMenuOpen(false)} style={{
              display: 'block',
              padding: '14px 16px',
              fontSize: 16,
              fontWeight: 600,
              color: colors.ink,
              textDecoration: 'none',
              borderRadius: 10,
              background: colors.bg2,
            }}>For Gyms</a>
            <a href="/insights" onClick={() => setMobileMenuOpen(false)} style={{
              display: 'block',
              padding: '14px 16px',
              fontSize: 16,
              fontWeight: 500,
              color: colors.ink,
              textDecoration: 'none',
              borderRadius: 10,
            }}>Insights</a>
            <a href="/about" onClick={() => setMobileMenuOpen(false)} style={{
              display: 'block',
              padding: '14px 16px',
              fontSize: 16,
              fontWeight: 500,
              color: colors.ink,
              textDecoration: 'none',
              borderRadius: 10,
            }}>About</a>
            <a href="#" onClick={() => setMobileMenuOpen(false)} style={{
              display: 'block',
              padding: '14px 16px',
              fontSize: 16,
              fontWeight: 600,
              color: colors.bg,
              textDecoration: 'none',
              borderRadius: 10,
              background: colors.ink,
              textAlign: 'center',
              marginTop: 6,
            }}>Sign in</a>
          </div>
        </>
      )}

      <main>
        {/* ===== Hero ===== */}
        <section style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: mobile ? '48px 20px 32px' : '72px 24px 48px',
          textAlign: 'center',
        }}>
          <h1 style={{
            fontFamily: fonts.serif,
            fontSize: mobile ? 42 : 56,
            lineHeight: 1.08,
            letterSpacing: '-0.025em',
            fontWeight: 500,
            color: colors.ink,
            marginBottom: 20,
          }}>
            Your best coach, on every {"trainer's"} shoulder.
          </h1>

          <p style={{
            fontFamily: fonts.sans,
            fontSize: mobile ? 16 : 18,
            lineHeight: 1.6,
            color: colors.inkSoft,
            maxWidth: 560,
            margin: '0 auto 32px',
          }}>
            Your trainers {"aren't"} doing everything you need them to yet. Milton closes the gap, so every session feels like you ran it.
          </p>

          {/* Composer */}
          <div style={{
            maxWidth: 560,
            margin: '0 auto',
            background: colors.paper,
            border: `1px solid ${colors.line}`,
            borderRadius: 20,
            padding: mobile ? '14px 16px 12px' : '18px 20px 14px',
            boxShadow: '0 1px 2px rgba(11, 22, 40, 0.03), 0 8px 24px rgba(11, 22, 40, 0.06)',
          }}>
            {/* File pill */}
            {attachedFile && (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: colors.accentSoft,
                border: '1px solid rgba(43, 191, 170, 0.25)',
                color: colors.accent,
                padding: '6px 10px 6px 12px',
                borderRadius: 8,
                fontSize: 13,
                marginBottom: 12,
                fontWeight: 500,
              }}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <path d="M14 2v6h6"/>
                </svg>
                <span>{attachedFile.name}</span>
                <button 
                  onClick={() => {
                    setAttachedFile(null)
                    if (fileInputRef.current) fileInputRef.current.value = ''
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                    fontSize: 18,
                    lineHeight: 1,
                    padding: '0 2px',
                    opacity: 0.6,
                  }}
                >
                  ×
                </button>
              </div>
            )}

            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && canSend) {
                  handleSend()
                }
              }}
              placeholder="Tell Milton how your gym coaches..."
              rows={2}
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                resize: 'none',
                fontFamily: fonts.sans,
                fontSize: 16,
                lineHeight: 1.55,
                color: colors.ink,
                background: 'transparent',
                minHeight: 56,
                maxHeight: 240,
              }}
            />

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
              gap: 12,
            }}>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    border: `1px solid ${colors.line}`,
                    background: colors.paper,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: colors.inkSoft,
                  }}
                  title="Upload a program template"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
                  </svg>
                </button>
                {!mobile && (
                  <span style={{ fontSize: 12, color: colors.inkMute, marginLeft: 4 }}>
                    Attach a program, PDF, or doc
                  </span>
                )}
                <input 
                  ref={fileInputRef}
                  type="file"
                  onChange={(e) => handleFileChange(e, false)}
                  accept=".pdf,.doc,.docx,.txt,image/*"
                  style={{ display: 'none' }}
                />
              </div>

              <button
                onClick={handleSend}
                disabled={!canSend}
                style={{
                  background: colors.ink,
                  color: colors.bg,
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: 10,
                  fontFamily: fonts.sans,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: canSend ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  opacity: canSend ? 1 : 0.35,
                  letterSpacing: '0.01em',
                }}
              >
                Begin
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Line below prompt */}
          <p style={{
            fontFamily: fonts.sans,
            fontSize: 13,
            color: colors.inkMute,
            textAlign: 'center',
            marginTop: 16,
          }}>
            Tell Milton how your gym coaches. The standards, the cues, the rules. Milton learns it once, then helps every trainer deliver it.
          </p>
        </section>

        {/* Feature Sections */}
        {featureSections.map((section, idx) => (
          <section key={idx} style={{
            maxWidth: 1080,
            margin: '0 auto',
            padding: mobile ? '56px 20px' : '80px 32px',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
              gap: mobile ? 32 : 56,
              alignItems: 'center',
            }}>
              {/* Text content - alternate sides */}
              <div style={{ order: mobile ? 1 : (idx % 2 === 0 ? 1 : 2) }}>
                <h2 style={{
                  fontFamily: fonts.serif,
                  fontSize: mobile ? 28 : 34,
                  lineHeight: 1.15,
                  fontWeight: 500,
                  color: colors.ink,
                  marginBottom: 12,
                }}>
                  {section.title}
                </h2>
                <p style={{
                  fontFamily: fonts.sans,
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: colors.inkSoft,
                  marginBottom: 20,
                }}>
                  {section.subtitle}
                </p>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}>
                  {section.bullets.map((bullet, i) => (
                    <li key={i} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 12,
                      fontFamily: fonts.sans,
                      fontSize: 15,
                      color: colors.inkSoft,
                      lineHeight: 1.5,
                    }}>
                      <svg viewBox="0 0 20 20" width="18" height="18" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                        <circle cx="10" cy="10" r="10" fill={colors.accentSoft} />
                        <path d="M6 10l3 3 5-5" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image placeholder */}
              <div style={{ order: mobile ? 2 : (idx % 2 === 0 ? 2 : 1) }}>
                <ImagePlaceholder 
                  aspectRatio="4 / 3"
                  hint={section.imageHint}
                />
              </div>
            </div>
          </section>
        ))}

        {/* What Milton Does Every Day */}
        <section style={{
          maxWidth: 1080,
          margin: '0 auto',
          padding: mobile ? '56px 20px' : '80px 32px',
        }}>
          <h2 style={{
            fontFamily: fonts.serif,
            fontSize: mobile ? 28 : 36,
            fontWeight: 500,
            color: colors.ink,
            textAlign: 'center',
            marginBottom: mobile ? 36 : 48,
          }}>
            Open Milton. See what to do. Done.
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : 'repeat(4, 1fr)',
            gap: mobile ? 20 : 24,
            marginBottom: mobile ? 36 : 48,
          }}>
            {dailyTasks.map((task, i) => (
              <div key={i} style={{
                background: colors.paper,
                border: `1px solid ${colors.line}`,
                borderRadius: 16,
                padding: mobile ? '24px 20px' : '28px 24px',
              }}>
                <h3 style={{
                  fontFamily: fonts.serif,
                  fontSize: 20,
                  fontWeight: 500,
                  color: colors.accent,
                  marginBottom: 10,
                }}>
                  {task.title}
                </h3>
                <p style={{
                  fontFamily: fonts.sans,
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: colors.inkSoft,
                }}>
                  {task.description}
                </p>
              </div>
            ))}
          </div>

          <ImagePlaceholder 
            aspectRatio="16 / 7"
            hint="A visual showing the flow from prep to follow-up in Milton for gym teams."
          />
        </section>

        {/* Pull Quote */}
        <section style={{
          maxWidth: 800,
          margin: '0 auto',
          padding: mobile ? '48px 20px' : '64px 24px',
          textAlign: 'center',
        }}>
          <svg 
            width="48" 
            height="48" 
            viewBox="0 0 48 48" 
            fill="none"
            style={{ marginBottom: 24, opacity: 0.12 }}
          >
            <path d="M14 24c-3.3 0-6-2.7-6-6s2.7-6 6-6c1.1 0 2 .9 2 2s-.9 2-2 2-2 .9-2 2 .9 2 2 2h2c3.3 0 6 2.7 6 6v4c0 3.3-2.7 6-6 6h-2c-1.1 0-2-.9-2-2s.9-2 2-2h2c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2h-2zm20 0c-3.3 0-6-2.7-6-6s2.7-6 6-6c1.1 0 2 .9 2 2s-.9 2-2 2-2 .9-2 2 .9 2 2 2h2c3.3 0 6 2.7 6 6v4c0 3.3-2.7 6-6 6h-2c-1.1 0-2-.9-2-2s.9-2 2-2h2c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2h-2z" fill={colors.ink} />
          </svg>
          <blockquote style={{
            fontFamily: fonts.serif,
            fontSize: mobile ? 20 : 26,
            fontWeight: 400,
            fontStyle: 'italic',
            color: colors.ink,
            lineHeight: 1.45,
            marginBottom: 24,
          }}>
            {"\"He's definitely not going to learn a new software. So I usually have to learn it and build the workflows for the team. With Milton, it's already set up and ready to go.\""}
          </blockquote>
          <cite style={{
            fontFamily: fonts.sans,
            fontSize: 15,
            fontWeight: 500,
            color: colors.inkSoft,
            fontStyle: 'normal',
          }}>
            — Bethany, Optimal Performance
          </cite>
        </section>

        {/* Closing CTA */}
        <section style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: mobile ? '48px 20px 72px' : '64px 24px 96px',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontFamily: fonts.serif,
            fontSize: mobile ? 32 : 42,
            fontWeight: 500,
            color: colors.ink,
            lineHeight: 1.15,
            marginBottom: 20,
          }}>
            The first coaching tool your team will actually use.
          </h2>
          <p style={{
            fontFamily: fonts.sans,
            fontSize: mobile ? 15 : 17,
            lineHeight: 1.65,
            color: colors.inkSoft,
            maxWidth: 560,
            margin: '0 auto 32px',
          }}>
            No setup weekend. No training day. No workflows for you to build. Tell Milton how your gym coaches, and watch every trainer level up to your standard.
          </p>

          {/* Closing Composer */}
          <div style={{
            maxWidth: 560,
            margin: '0 auto',
            background: colors.paper,
            border: `1px solid ${colors.line}`,
            borderRadius: 20,
            padding: mobile ? '14px 16px 12px' : '18px 20px 14px',
            boxShadow: '0 1px 2px rgba(11, 22, 40, 0.03), 0 8px 24px rgba(11, 22, 40, 0.06)',
          }}>
            {/* File pill */}
            {closingAttachedFile && (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: colors.accentSoft,
                border: '1px solid rgba(43, 191, 170, 0.25)',
                color: colors.accent,
                padding: '6px 10px 6px 12px',
                borderRadius: 8,
                fontSize: 13,
                marginBottom: 12,
                fontWeight: 500,
              }}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <path d="M14 2v6h6"/>
                </svg>
                <span>{closingAttachedFile.name}</span>
                <button 
                  onClick={() => {
                    setClosingAttachedFile(null)
                    if (closingFileInputRef.current) closingFileInputRef.current.value = ''
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                    fontSize: 18,
                    lineHeight: 1,
                    padding: '0 2px',
                    opacity: 0.6,
                  }}
                >
                  ×
                </button>
              </div>
            )}

            <textarea
              ref={closingTextareaRef}
              value={closingPrompt}
              onChange={(e) => setClosingPrompt(e.target.value)}
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && canSendClosing) {
                  handleSend()
                }
              }}
              placeholder="Tell Milton how your gym coaches..."
              rows={2}
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                resize: 'none',
                fontFamily: fonts.sans,
                fontSize: 16,
                lineHeight: 1.55,
                color: colors.ink,
                background: 'transparent',
                minHeight: 56,
                maxHeight: 240,
              }}
            />

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
              gap: 12,
            }}>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <button 
                  onClick={() => closingFileInputRef.current?.click()}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    border: `1px solid ${colors.line}`,
                    background: colors.paper,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: colors.inkSoft,
                  }}
                  title="Upload a program template"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
                  </svg>
                </button>
                {!mobile && (
                  <span style={{ fontSize: 12, color: colors.inkMute, marginLeft: 4 }}>
                    Attach a program, PDF, or doc
                  </span>
                )}
                <input 
                  ref={closingFileInputRef}
                  type="file"
                  onChange={(e) => handleFileChange(e, true)}
                  accept=".pdf,.doc,.docx,.txt,image/*"
                  style={{ display: 'none' }}
                />
              </div>

              <button
                onClick={handleSend}
                disabled={!canSendClosing}
                style={{
                  background: colors.ink,
                  color: colors.bg,
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: 10,
                  fontFamily: fonts.sans,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: canSendClosing ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  opacity: canSendClosing ? 1 : 0.35,
                  letterSpacing: '0.01em',
                }}
              >
                Begin
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer mobile={mobile} onOpenChat={() => setChatModalOpen(true)} />

      {/* ===== Chat Modal ===== */}
      {chatModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: mobile ? 'flex-end' : 'center',
          justifyContent: 'center',
          padding: mobile ? 16 : 20,
        }}>
          <div
            onClick={closeChatModal}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(11, 22, 40, 0.42)',
              backdropFilter: 'blur(6px)',
            }}
          />
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: 440,
            background: colors.paper,
            borderRadius: 20,
            boxShadow: '0 24px 64px rgba(11, 22, 40, 0.18), 0 4px 16px rgba(11, 22, 40, 0.08)',
            padding: mobile ? '28px 22px 22px' : '32px 28px 28px',
          }}>
            <button
              onClick={closeChatModal}
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                width: 32,
                height: 32,
                borderRadius: 8,
                border: 'none',
                background: 'transparent',
                color: colors.inkMute,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              marginBottom: 20,
            }}>
              <img src={logoImage} alt="Milton" style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                objectFit: 'cover',
                background: colors.mintSoft,
                boxShadow: '0 0 0 1px rgba(11, 22, 40, 0.04)',
              }} />
              <div>
                <h3 style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: colors.ink,
                  letterSpacing: '-0.01em',
                  marginBottom: 4,
                }}>Talk to a human</h3>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 12,
                  color: colors.inkMute,
                }}>
                  <span style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: colors.mint,
                    boxShadow: '0 0 8px rgba(154, 241, 152, 0.6)',
                  }} />
                  We reply within a few hours
                </div>
              </div>
            </div>

            {!chatSubmitted ? (
              <>
                <p style={{
                  fontSize: 14.5,
                  lineHeight: 1.55,
                  color: colors.ink,
                  background: colors.bg2,
                  padding: '14px 16px',
                  borderRadius: 12,
                  borderBottomLeftRadius: 4,
                  marginBottom: 16,
                }}>
                  {"Hi! Leave your info and a real person from the team will get back to you."}
                </p>

                <form onSubmit={handleLeadSubmit}>
                  <input 
                    type="text"
                    placeholder="Your name *"
                    required
                    value={leadForm.name}
                    onChange={(e) => setLeadForm(f => ({ ...f, name: e.target.value }))}
                    style={{
                      width: '100%',
                      border: `1px solid ${colors.line}`,
                      borderRadius: 10,
                      padding: '12px 14px',
                      fontFamily: fonts.sans,
                      fontSize: 14,
                      color: colors.ink,
                      background: colors.paper,
                      marginBottom: 10,
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                  <input 
                    type="email"
                    placeholder="Your email *"
                    required
                    value={leadForm.email}
                    onChange={(e) => setLeadForm(f => ({ ...f, email: e.target.value }))}
                    style={{
                      width: '100%',
                      border: `1px solid ${colors.line}`,
                      borderRadius: 10,
                      padding: '12px 14px',
                      fontFamily: fonts.sans,
                      fontSize: 14,
                      color: colors.ink,
                      background: colors.paper,
                      marginBottom: 10,
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                  <input 
                    type="tel"
                    placeholder="Phone (optional)"
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm(f => ({ ...f, phone: e.target.value }))}
                    style={{
                      width: '100%',
                      border: `1px solid ${colors.line}`,
                      borderRadius: 10,
                      padding: '12px 14px',
                      fontFamily: fonts.sans,
                      fontSize: 14,
                      color: colors.ink,
                      background: colors.paper,
                      marginBottom: 10,
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                  <input 
                    type="text"
                    placeholder="Company (optional)"
                    value={leadForm.company}
                    onChange={(e) => setLeadForm(f => ({ ...f, company: e.target.value }))}
                    style={{
                      width: '100%',
                      border: `1px solid ${colors.line}`,
                      borderRadius: 10,
                      padding: '12px 14px',
                      fontFamily: fonts.sans,
                      fontSize: 14,
                      color: colors.ink,
                      background: colors.paper,
                      marginBottom: 10,
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />

                  {leadError && (
                    <p style={{
                      fontSize: 13,
                      color: '#DC2626',
                      marginBottom: 10,
                      padding: '8px 12px',
                      background: '#FEF2F2',
                      borderRadius: 8,
                    }}>
                      {leadError}
                    </p>
                  )}

                  <button 
                    type="submit"
                    disabled={leadSubmitting}
                    style={{
                      width: '100%',
                      background: leadSubmitting ? colors.inkSoft : colors.ink,
                      color: colors.paper,
                      border: 'none',
                      padding: '12px 18px',
                      borderRadius: 10,
                      fontFamily: fonts.sans,
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: leadSubmitting ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      marginTop: 4,
                      opacity: leadSubmitting ? 0.7 : 1,
                    }}
                  >
                    {leadSubmitting ? 'Sending...' : 'Send'}
                    {!leadSubmitting && (
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6"/>
                      </svg>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '8px 0 12px' }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: colors.mintSoft,
                  color: colors.accentDeep,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}>
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h4 style={{
                  fontFamily: fonts.serif,
                  fontStyle: 'italic',
                  fontWeight: 500,
                  fontSize: 26,
                  color: colors.ink,
                  marginBottom: 8,
                  letterSpacing: '-0.01em',
                }}>{"We'll be in touch."}</h4>
                <p style={{
                  fontSize: 14,
                  color: colors.inkSoft,
                  lineHeight: 1.5,
                  maxWidth: 280,
                  margin: '0 auto',
                }}>A real person from the team will reach out within 24 hours.</p>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        button {
          transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
        }
        button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(11, 22, 40, 0.12);
        }
        button:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: 0 2px 6px rgba(11, 22, 40, 0.08);
        }
        .nav-link {
          transition: color 0.2s ease;
        }
        .nav-link:hover {
          color: #2BBFAA !important;
        }
        .nav-btn {
          transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        }
        .nav-btn:hover {
          background: rgba(43, 191, 170, 0.12) !important;
          border-color: #2BBFAA !important;
          color: #2BBFAA !important;
        }
      `}</style>
    </div>
  )
}
