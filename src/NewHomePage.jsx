import { useState, useEffect, useRef } from 'react'

// Custom hook for responsive breakpoints
function useBreakpoint() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  useEffect(() => {
    const h = () => setW(window.innerWidth)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return { mobile: w < 640, tablet: w >= 640 && w < 1024, desktop: w >= 1024, w }
}

// CSS variables as constants
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

// Logo image as base64 (Milton avatar)
const logoImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"

export default function NewHomePage() {
  const { mobile } = useBreakpoint()
  const [prompt, setPrompt] = useState('')
  const [attachedFile, setAttachedFile] = useState(null)
  const [addedChips, setAddedChips] = useState(new Set())
  const [listening, setListening] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [chatModalOpen, setChatModalOpen] = useState(false)
  const [chatSubmitted, setChatSubmitted] = useState(false)
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', company: '' })
  const [leadSubmitting, setLeadSubmitting] = useState(false)
  const [leadError, setLeadError] = useState(null)
  const fileInputRef = useRef(null)
  const textareaRef = useRef(null)

  const chips = [
    { text: "I'm a solo trainer.", label: "I'm a solo trainer" },
    { text: "I run a team of trainers.", label: "I run a team of trainers" },
    { text: "I'm a fitness director at a commercial gym.", label: "I'm a fitness director" },
    { text: "I do nutrition coaching with my clients.", label: "I do nutrition coaching" },
    { text: "I coach hybrid clients, both in-person and online.", label: "I coach hybrid clients" },
    { text: "I write custom workout programs for my clients.", label: "I write workout programs" },
  ]

  const canSend = prompt.trim().length >= 4 || attachedFile !== null

  const handleChipClick = (chipText) => {
    const newAddedChips = new Set(addedChips)
    if (newAddedChips.has(chipText)) {
      newAddedChips.delete(chipText)
      setPrompt(prev => prev.replace(chipText, '').replace(/\s\s+/g, ' ').trim())
    } else {
      newAddedChips.add(chipText)
      setPrompt(prev => (prev.trim() ? prev.trim() + ' ' + chipText : chipText))
    }
    setAddedChips(newAddedChips)
    textareaRef.current?.focus()
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setAttachedFile(file)
    }
  }

  const handleSend = () => {
    setListening(true)
  }

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

  // Render listening state
  if (listening) {
    return (
      <div style={{
        minHeight: '100vh',
        background: colors.bg,
        fontFamily: fonts.sans,
      }}>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontFamily: fonts.serif,
            fontSize: 48,
            fontStyle: 'italic',
            color: colors.ink,
            marginBottom: 16,
            fontWeight: 500,
            letterSpacing: '-0.02em',
          }}>Got it.</h2>
          <p style={{
            fontSize: 16,
            color: colors.inkSoft,
            maxWidth: 480,
            lineHeight: 1.6,
            margin: '0 auto',
          }}>
            {"I'm reading what you sent and starting to learn how you coach. This takes a few minutes. I'll have some follow-up questions to fill in the gaps."}
          </p>
          <div style={{ marginTop: 32, display: 'flex', gap: 8 }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: colors.accent,
                animation: `pulse 1.4s infinite ease-in-out ${i * 0.2}s`,
              }} />
            ))}
          </div>
        </div>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.25; transform: scale(0.85); }
            50% { opacity: 1; transform: scale(1.15); }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: `
        radial-gradient(ellipse 1200px 600px at 50% -200px, rgba(43, 191, 170, 0.10) 0%, transparent 60%),
        radial-gradient(ellipse 800px 400px at 100% 100%, rgba(154, 241, 152, 0.08) 0%, transparent 60%),
        ${colors.bg}
      `,
      fontFamily: fonts.sans,
      color: colors.ink,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      
      {/* Header */}
      <header style={{
        padding: mobile ? '20px' : '28px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <a href="#" style={{
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
          <img 
            src={logoImage}
            alt="Milton"
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              objectFit: 'cover',
              boxShadow: '0 0 0 1px rgba(11, 22, 40, 0.04), 0 1px 3px rgba(11, 22, 40, 0.06)',
            }}
          />
          <span>Milton</span>
          <span style={{
            width: 7,
            height: 7,
            background: colors.mint,
            borderRadius: '50%',
            marginLeft: 1,
            boxShadow: '0 0 12px rgba(154, 241, 152, 0.6)',
          }} />
        </a>

        {/* Desktop Nav */}
        {!mobile && (
          <nav style={{
            display: 'flex',
            gap: 28,
            fontSize: 14,
            color: colors.inkSoft,
            alignItems: 'center',
          }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>For Coaches</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>For Gyms</a>
            <a href="#" style={{
              color: 'inherit',
              textDecoration: 'none',
              border: `1px solid ${colors.line}`,
              padding: '8px 16px',
              borderRadius: 8,
              background: colors.paper,
            }}>Sign in</a>
          </nav>
        )}

        {/* Mobile menu toggle */}
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
            <div style={{ position: 'relative', width: 18, height: 14 }}>
              <span style={{
                position: 'absolute',
                left: 0,
                width: 18,
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
                width: 18,
                height: 1.5,
                background: mobileMenuOpen ? 'transparent' : colors.ink,
                borderRadius: 1,
                top: 6,
                transition: 'all 0.3s',
              }} />
              <span style={{
                position: 'absolute',
                left: 0,
                width: 18,
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
            display: 'flex',
            flexDirection: 'column',
          }}>
            <a href="#" onClick={() => setMobileMenuOpen(false)} style={{
              display: 'block',
              padding: '14px 16px',
              fontSize: 16,
              fontWeight: 500,
              color: colors.ink,
              textDecoration: 'none',
              borderRadius: 10,
            }}>For Coaches</a>
            <a href="#" onClick={() => setMobileMenuOpen(false)} style={{
              display: 'block',
              padding: '14px 16px',
              fontSize: 16,
              fontWeight: 500,
              color: colors.ink,
              textDecoration: 'none',
              borderRadius: 10,
            }}>For Gyms</a>
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
        {/* Hero Section */}
        <section style={{
          minHeight: mobile ? 'calc(100vh - 76px)' : 'calc(100vh - 84px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: mobile ? '20px 16px 60px' : '40px 24px 80px',
          maxWidth: 760,
          margin: '0 auto',
          width: '100%',
        }}>
          <img 
            src={logoImage}
            alt="Milton"
            style={{
              width: 'clamp(180px, 20vw, 220px)',
              aspectRatio: '1 / 1',
              display: 'block',
              margin: '0 auto 22px',
              borderRadius: '50%',
            }}
          />
          
          <h1 style={{
            fontFamily: fonts.serif,
            fontSize: 'clamp(46px, 7vw, 80px)',
            lineHeight: 1.02,
            letterSpacing: '-0.02em',
            textAlign: 'center',
            marginBottom: 8,
            fontWeight: 500,
          }}>
            {"Hi, I'm "}<em style={{ fontStyle: 'italic', color: colors.accent }}>Milton</em>.
          </h1>
          
          <p style={{
            fontFamily: fonts.serif,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(24px, 3.2vw, 32px)',
            lineHeight: 1.3,
            color: colors.inkSoft,
            textAlign: 'center',
            marginBottom: 36,
          }}>
            Let me show you what I can do.
          </p>
          
          <p style={{
            fontSize: 15,
            lineHeight: 1.65,
            color: colors.inkSoft,
            textAlign: 'center',
            maxWidth: 520,
            marginBottom: 28,
          }}>
            Tell me how you coach. Share a program template, your methodology, or just describe your business in a few sentences. {"I'll"} learn how you work and design an AI system that fits.
          </p>

          {/* Composer */}
          <div style={{
            width: '100%',
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
              placeholder="Describe your coaching business, your clients, your methodology..."
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
                  onChange={handleFileChange}
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

          {/* Chips */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            justifyContent: 'center',
            marginTop: 28,
          }}>
            <div style={{
              width: '100%',
              textAlign: 'center',
              fontSize: 12,
              color: colors.inkMute,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: 4,
            }}>
              Or start with one of these
            </div>
            {chips.map((chip, i) => (
              <button
                key={i}
                onClick={() => handleChipClick(chip.text)}
                style={{
                  background: addedChips.has(chip.text) ? colors.accentSoft : colors.paper,
                  border: `1px solid ${addedChips.has(chip.text) ? 'rgba(43, 191, 170, 0.35)' : colors.line}`,
                  padding: '9px 16px',
                  borderRadius: 100,
                  fontFamily: fonts.sans,
                  fontSize: 13,
                  color: addedChips.has(chip.text) ? colors.accent : colors.inkSoft,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                {addedChips.has(chip.text) && <span style={{ fontSize: 11 }}>✓</span>}
                {chip.label}
              </button>
            ))}
          </div>
        </section>

        {/* After Section - Steps */}
        <section style={{
          maxWidth: 1080,
          margin: '0 auto',
          padding: mobile ? '72px 20px' : '110px 24px 100px',
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
          }}>
            <span style={{ width: 28, height: 1, background: colors.line }} />
            <span style={{
              fontFamily: fonts.sans,
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: colors.inkMute,
              fontWeight: 500,
            }}>Hire Milton</span>
            <span style={{ width: 28, height: 1, background: colors.line }} />
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: mobile ? 64 : 88,
            maxWidth: 920,
            margin: '0 auto 96px',
          }}>
            {/* Step 1 */}
            <Step 
              number="01"
              title="I will prep your sessions."
              description="Before each client walks in, I'll have your brief ready. Goals, last session, what to focus on today, what to ask. You stop running on memory."
              mobile={mobile}
              illustration={<Step1Illustration />}
            />

            {/* Step 2 */}
            <Step 
              number="02"
              title="I will help you modify plans."
              description="When an injury changes things, a client plateaus, or life gets in the way, I'll suggest the adjustment. You approve, the program updates."
              mobile={mobile}
              illustration={<Step2Illustration />}
              reverse
            />

            {/* Step 3 */}
            <Step 
              number="03"
              title="I will capture what happened."
              description="Talk it out or jot a few notes. I'll structure what got done, what felt off, and what to follow up on. Nothing slips between sessions."
              mobile={mobile}
              illustration={<Step3Illustration />}
            />

            {/* Step 4 */}
            <Step 
              number="04"
              title="I will prep your follow-ups."
              description="Recap messages, check-ins, accountability nudges. Drafted in your voice and ready to send when you are."
              mobile={mobile}
              illustration={<Step4Illustration />}
              reverse
            />

            {/* Step 5 */}
            <Step 
              number="05"
              title="I will show you what's working over time."
              description="Patterns across all your clients. What programs land, who's progressing, who needs attention. So you coach on evidence, not just feel."
              mobile={mobile}
              illustration={<Step5Illustration />}
            />
          </div>
        </section>

        {/* Pricing Section */}
        <section style={{
          maxWidth: 920,
          margin: '0 auto',
          padding: mobile ? '0 20px 80px' : '0 24px 120px',
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
          }}>
            <span style={{ width: 28, height: 1, background: colors.line }} />
            <span style={{
              fontFamily: fonts.sans,
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: colors.inkMute,
              fontWeight: 500,
            }}>Pricing</span>
            <span style={{ width: 28, height: 1, background: colors.line }} />
          </div>

          <h2 style={{
            fontFamily: fonts.serif,
            fontSize: 'clamp(34px, 4.6vw, 50px)',
            lineHeight: 1.15,
            letterSpacing: '-0.015em',
            textAlign: 'center',
            marginBottom: 16,
            fontWeight: 500,
            color: colors.ink,
          }}>
            <em style={{ fontStyle: 'italic' }}>Built to make every coach<br/>more valuable.</em>
          </h2>

          <p style={{
            fontFamily: fonts.serif,
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: 'clamp(22px, 2.8vw, 28px)',
            lineHeight: 1.35,
            letterSpacing: '-0.005em',
            color: colors.ink,
            textAlign: 'center',
            margin: '0 auto 32px',
          }}>
            Fourteen free days. Then you decide.
          </p>

          <p style={{
            fontSize: 17,
            lineHeight: 1.65,
            color: colors.inkSoft,
            textAlign: 'center',
            margin: '0 auto 64px',
            maxWidth: 580,
          }}>
            Whether you run your own book of clients or lead a team of trainers. Free for 14 days, then priced to earn its place every month.
          </p>

          {/* Plans */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
            gap: mobile ? 16 : 20,
            marginBottom: 48,
          }}>
            <PlanCard 
              name="Solo Coach"
              price="$99"
              cap="Up to 25 clients"
              forText="For the coach who runs their own book and wants every client to get the best of their methodology."
              features={[
                "An AI assistant that briefs you every day on what to do now, next, and later",
                "Every coaching mode: 1-on-1, semi-private, nutrition, in-person, online",
                "Client management, goal setting, and accountability, built in",
                "Communication and automated workflows that run themselves",
                "Reporting that shows you what's working and what isn't",
              ]}
              mobile={mobile}
            />
            <PlanCard 
              name="Coaching Team"
              price="$499"
              cap="Up to 250 clients"
              forText="For the gym or team where every trainer should coach at the level of your best."
              includedLabel="Everything in Solo, plus"
              features={[
                "A Fitness Director Agent watching trainer performance and reporting up",
                "Master rules at the manager level, applying your methodology across every trainer",
              ]}
              mobile={mobile}
              isTeam
            />
          </div>

          <p style={{
            textAlign: 'center',
            fontFamily: fonts.sans,
            fontSize: 14,
            color: colors.inkMute,
            letterSpacing: '0.01em',
          }}>
            Cancel anytime. No contracts.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        padding: mobile ? '48px 20px 32px' : '64px 40px 48px',
        borderTop: `1px solid ${colors.line}`,
        background: 'linear-gradient(180deg, transparent 0%, rgba(43, 191, 170, 0.02) 100%)',
      }}>
        <div style={{
          maxWidth: 760,
          margin: '0 auto',
          textAlign: 'center',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            marginBottom: mobile ? 28 : 36,
          }}>
            <img 
              src={logoImage}
              alt="Milton"
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                objectFit: 'cover',
                boxShadow: '0 0 0 1px rgba(11, 22, 40, 0.04), 0 1px 3px rgba(11, 22, 40, 0.06)',
              }}
            />
            <p style={{
              fontFamily: fonts.serif,
              fontStyle: 'italic',
              fontSize: mobile ? 16 : 18,
              lineHeight: 1.4,
              color: colors.inkSoft,
              maxWidth: 380,
            }}>
              <em>Milton learns your way of coaching. It does not replace it.</em>
            </p>
          </div>

          <div style={{
            display: 'flex',
            alignItems: mobile ? 'center' : 'center',
            justifyContent: 'space-between',
            gap: 24,
            marginBottom: mobile ? 28 : 36,
            flexWrap: 'wrap',
            flexDirection: mobile ? 'column' : 'row',
          }}>
            <button 
              onClick={() => setChatModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: colors.paper,
                border: `1px solid ${colors.line}`,
                color: colors.ink,
                padding: '10px 16px',
                borderRadius: 100,
                fontFamily: fonts.sans,
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span>Talk to a human</span>
            </button>

            <nav style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              {['Facebook', 'Instagram', 'X', 'Threads', 'TikTok', 'YouTube', 'LinkedIn'].map((social) => (
                <a 
                  key={social}
                  href="#"
                  aria-label={social}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    color: colors.inkSoft,
                  }}
                >
                  <SocialIcon name={social} />
                </a>
              ))}
            </nav>
          </div>

          <div style={{
            height: 1,
            background: colors.line,
            margin: '0 0 24px',
          }} />

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: mobile ? 8 : 12,
            fontSize: mobile ? 12 : 13,
            color: colors.inkMute,
          }}>
            <span>© 2026 Milton AI</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <a href="#" style={{ color: colors.inkMute, textDecoration: 'none' }}>Terms of Service</a>
            <span style={{ opacity: 0.5 }}>·</span>
            <a href="#" style={{ color: colors.inkMute, textDecoration: 'none' }}>Privacy Policy</a>
          </div>
        </div>
      </footer>

      {/* Chat Modal */}
      {chatModalOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: mobile ? 'flex-end' : 'center',
            justifyContent: 'center',
            padding: mobile ? 16 : 20,
          }}
        >
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
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            {!chatSubmitted ? (
              <>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  marginBottom: 20,
                }}>
                  <img 
                    src={logoImage}
                    alt="Milton"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      background: colors.mintSoft,
                      boxShadow: '0 0 0 1px rgba(11, 22, 40, 0.04)',
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <h3 style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: colors.ink,
                      letterSpacing: '-0.01em',
                      marginBottom: 4,
                    }}>Talk to a human</h3>
                    <p style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 12,
                      color: colors.inkMute,
                      margin: 0,
                    }}>
                      <span style={{
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        background: colors.mint,
                        boxShadow: '0 0 8px rgba(154, 241, 152, 0.6)',
                      }} />
                      Usually replies within a few hours
                    </p>
                  </div>
                </div>

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
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"/>
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
                }}>We got your note.</h4>
                <p style={{
                  fontSize: 14,
                  color: colors.inkSoft,
                  lineHeight: 1.5,
                  maxWidth: 280,
                  margin: '0 auto',
                }}>
                  Someone from the team will be in touch shortly.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

// Step component
function Step({ number, title, description, illustration, mobile, reverse }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
      gap: mobile ? 28 : 64,
      alignItems: 'center',
    }}>
      {mobile ? (
        <>
          <div style={{ textAlign: 'center' }}>
            <span style={{
              fontFamily: fonts.serif,
              fontStyle: 'italic',
              fontSize: 18,
              color: colors.accent,
              letterSpacing: '0.02em',
              display: 'block',
              marginBottom: 8,
            }}>Step {number}</span>
            <h3 style={{
              fontFamily: fonts.sans,
              fontSize: 'clamp(22px, 2.6vw, 26px)',
              fontWeight: 500,
              color: colors.ink,
              letterSpacing: '-0.018em',
              lineHeight: 1.22,
              margin: 0,
            }}>{title}</h3>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {illustration}
          </div>
          <p style={{
            fontSize: 15.5,
            lineHeight: 1.65,
            color: colors.inkSoft,
            textAlign: 'center',
          }}>{description}</p>
        </>
      ) : (
        <>
          {reverse ? (
            <>
              <div>
                <span style={{
                  fontFamily: fonts.serif,
                  fontStyle: 'italic',
                  fontSize: 18,
                  color: colors.accent,
                  letterSpacing: '0.02em',
                  display: 'block',
                  marginBottom: 14,
                }}>Step {number}</span>
                <h3 style={{
                  fontFamily: fonts.sans,
                  fontSize: 'clamp(22px, 2.6vw, 26px)',
                  fontWeight: 500,
                  color: colors.ink,
                  marginBottom: 12,
                  letterSpacing: '-0.018em',
                  lineHeight: 1.22,
                }}>{title}</h3>
                <p style={{
                  fontSize: 15.5,
                  lineHeight: 1.65,
                  color: colors.inkSoft,
                }}>{description}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {illustration}
              </div>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {illustration}
              </div>
              <div>
                <span style={{
                  fontFamily: fonts.serif,
                  fontStyle: 'italic',
                  fontSize: 18,
                  color: colors.accent,
                  letterSpacing: '0.02em',
                  display: 'block',
                  marginBottom: 14,
                }}>Step {number}</span>
                <h3 style={{
                  fontFamily: fonts.sans,
                  fontSize: 'clamp(22px, 2.6vw, 26px)',
                  fontWeight: 500,
                  color: colors.ink,
                  marginBottom: 12,
                  letterSpacing: '-0.018em',
                  lineHeight: 1.22,
                }}>{title}</h3>
                <p style={{
                  fontSize: 15.5,
                  lineHeight: 1.65,
                  color: colors.inkSoft,
                }}>{description}</p>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

// Plan Card component
function PlanCard({ name, price, cap, forText, includedLabel, features, mobile, isTeam }) {
  return (
    <div style={{
      background: colors.paper,
      border: `1px solid ${colors.line}`,
      borderRadius: 20,
      padding: mobile ? '32px 24px' : '40px 32px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        marginBottom: 24,
        paddingBottom: 24,
        borderBottom: `1px solid ${colors.line}`,
      }}>
        <span style={{
          display: 'block',
          fontFamily: fonts.sans,
          fontSize: 12,
          fontWeight: 600,
          color: colors.inkSoft,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          marginBottom: 18,
        }}>{name}</span>
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 6,
          marginBottom: 10,
        }}>
          <span style={{
            fontFamily: fonts.serif,
            fontStyle: 'italic',
            fontSize: mobile ? 52 : 60,
            fontWeight: 500,
            color: colors.ink,
            lineHeight: 1,
            letterSpacing: '-0.025em',
          }}>{price}</span>
          <span style={{
            fontFamily: fonts.sans,
            fontSize: 15,
            color: colors.inkSoft,
          }}>/month</span>
        </div>
        <span style={{
          fontFamily: fonts.sans,
          fontSize: 14,
          color: colors.inkMute,
        }}>{cap}</span>
      </div>

      <p style={{
        fontFamily: fonts.serif,
        fontStyle: 'italic',
        fontSize: 18,
        lineHeight: 1.5,
        color: colors.ink,
        marginBottom: 24,
        fontWeight: 500,
      }}>
        <em>{forText}</em>
      </p>

      {includedLabel && (
        <span style={{
          fontFamily: fonts.sans,
          fontSize: 12,
          fontWeight: 600,
          color: colors.accent,
          marginBottom: 14,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>{includedLabel}</span>
      )}

      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}>
        {features.map((feature, i) => (
          <li key={i} style={{
            position: 'relative',
            paddingLeft: 22,
            fontSize: 14.5,
            lineHeight: 1.55,
            color: colors.inkSoft,
          }}>
            <span style={{
              position: 'absolute',
              left: 2,
              top: 8,
              width: 6,
              height: 6,
              background: isTeam ? colors.mint : colors.accent,
              borderRadius: '50%',
              boxShadow: isTeam ? '0 0 8px rgba(154, 241, 152, 0.5)' : 'none',
            }} />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}

// Social icons
function SocialIcon({ name }) {
  const icons = {
    Facebook: <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3v9h4v-9z"/></svg>,
    Instagram: <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="2.5" width="19" height="19" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"/></svg>,
    X: <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
    Threads: <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.74-1.757-.503-.586-1.279-.883-2.309-.89h-.029c-.825 0-1.947.227-2.66 1.284l-1.668-1.119c.95-1.408 2.498-2.183 4.394-2.183h.043c3.171.02 5.06 1.985 5.247 5.4.107.046.214.094.319.143 1.485.7 2.572 1.76 3.143 3.066.798 1.823.871 4.793-1.548 7.16-1.85 1.81-4.094 2.628-7.236 2.65z"/></svg>,
    TikTok: <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.74a8.16 8.16 0 0 0 4.77 1.52V6.81a4.85 4.85 0 0 1-1.84-.12z"/></svg>,
    YouTube: <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
    LinkedIn: <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  }
  return icons[name] || null
}

// Step illustrations as SVG components
function Step1Illustration() {
  return (
    <svg style={{ width: '100%', maxWidth: 380, height: 'auto' }} viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-prep" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FAFBFC"/>
          <stop offset="100%" stopColor="#F0F7F5"/>
        </linearGradient>
      </defs>
      <rect width="320" height="220" fill="url(#bg-prep)" rx="16"/>
      <rect x="60" y="36" width="200" height="148" rx="12" fill="white" stroke="#E2E8F0" strokeWidth="1"/>
      <rect x="76" y="56" width="68" height="20" rx="10" fill="#E6F8F4"/>
      <circle cx="86" cy="66" r="2.5" fill="#2BBFAA"/>
      <text x="94" y="69.5" fontSize="9" fontFamily="DM Sans, sans-serif" fill="#08455E" fontWeight="600">9:00 AM</text>
      <text x="76" y="100" fontSize="13" fontFamily="DM Sans, sans-serif" fontWeight="600" fill="#0B1628">Sarah Chen</text>
      <text x="76" y="115" fontSize="9" fontFamily="DM Sans, sans-serif" fill="#94A3B8">Strength · Wk 4</text>
      <line x1="76" y1="124" x2="244" y2="124" stroke="#F0F7F5"/>
      <circle cx="84" cy="138" r="2.5" fill="#2BBFAA"/>
      <text x="92" y="141" fontSize="9" fontFamily="DM Sans, sans-serif" fill="#475569">Knee tight last session</text>
      <circle cx="84" cy="154" r="2.5" fill="#2BBFAA"/>
      <text x="92" y="157" fontSize="9" fontFamily="DM Sans, sans-serif" fill="#475569">Try tempo squats today</text>
      <circle cx="84" cy="170" r="2.5" fill="#9AF198"/>
      <text x="92" y="173" fontSize="9" fontFamily="DM Sans, sans-serif" fill="#475569">Ask about sleep</text>
    </svg>
  )
}

function Step2Illustration() {
  return (
    <svg style={{ width: '100%', maxWidth: 380, height: 'auto' }} viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-modify" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FAFBFC"/>
          <stop offset="100%" stopColor="#F0F7F5"/>
        </linearGradient>
      </defs>
      <rect width="320" height="220" fill="url(#bg-modify)" rx="16"/>
      <rect x="50" y="30" width="220" height="160" rx="12" fill="white" stroke="#E2E8F0" strokeWidth="1"/>
      <text x="68" y="52" fontSize="10" fontFamily="DM Sans, sans-serif" fontWeight="600" fill="#0B1628">Week 4 · Lower Body</text>
      <line x1="68" y1="62" x2="252" y2="62" stroke="#F0F7F5"/>
      <text x="68" y="80" fontSize="9" fontFamily="DM Sans, sans-serif" fill="#475569">Back Squat</text>
      <text x="232" y="80" fontSize="9" fontFamily="DM Sans, sans-serif" fill="#94A3B8">3×8</text>
      <rect x="60" y="90" width="200" height="22" rx="5" fill="#FFF7E0"/>
      <text x="68" y="104" fontSize="9" fontFamily="DM Sans, sans-serif" fill="#A05B00" opacity="0.65">Barbell Lunges</text>
      <line x1="66" y1="103" x2="138" y2="103" stroke="#A05B00" strokeWidth="1" opacity="0.65"/>
      <text x="232" y="104" fontSize="9" fontFamily="DM Sans, sans-serif" fill="#A05B00" opacity="0.65">3×10</text>
      <rect x="60" y="116" width="200" height="22" rx="5" fill="#E6F8F4"/>
      <circle cx="70" cy="127" r="2.5" fill="#2BBFAA"/>
      <text x="78" y="130" fontSize="9" fontFamily="DM Sans, sans-serif" fill="#0B1628" fontWeight="600">Goblet Squats</text>
      <text x="232" y="130" fontSize="9" fontFamily="DM Sans, sans-serif" fill="#08455E" fontWeight="600">3×10</text>
      <text x="68" y="154" fontSize="9" fontFamily="DM Sans, sans-serif" fill="#475569">Romanian Deadlift</text>
      <text x="232" y="154" fontSize="9" fontFamily="DM Sans, sans-serif" fill="#94A3B8">3×8</text>
      <text x="68" y="178" fontSize="7.5" fontFamily="DM Sans, sans-serif" fill="#94A3B8" fontStyle="italic">Reason: knee discomfort flagged</text>
    </svg>
  )
}

function Step3Illustration() {
  return (
    <svg style={{ width: '100%', maxWidth: 380, height: 'auto' }} viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-capture" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FAFBFC"/>
          <stop offset="100%" stopColor="#F0F7F5"/>
        </linearGradient>
      </defs>
      <rect width="320" height="220" fill="url(#bg-capture)" rx="16"/>
      <g transform="translate(60 88)">
        <rect x="-12" y="0" width="24" height="36" rx="12" fill="#0B1628"/>
        <circle cx="0" cy="14" r="3" fill="#9AF198"/>
        <path d="M -16 40 Q 0 50 16 40" stroke="#0B1628" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <line x1="0" y1="50" x2="0" y2="58" stroke="#0B1628" strokeWidth="2" strokeLinecap="round"/>
        <line x1="-8" y1="58" x2="8" y2="58" stroke="#0B1628" strokeWidth="2" strokeLinecap="round"/>
      </g>
      <rect x="138" y="40" width="146" height="140" rx="10" fill="white" stroke="#E2E8F0" strokeWidth="1"/>
      <text x="154" y="60" fontSize="10" fontFamily="DM Sans, sans-serif" fontWeight="600" fill="#0B1628">Session notes</text>
      <rect x="240" y="50" width="32" height="14" rx="7" fill="#9AF198" opacity="0.4"/>
      <text x="256" y="60" textAnchor="middle" fontSize="6.5" fontFamily="DM Sans, sans-serif" fill="#0B5938" fontWeight="600">Saved</text>
      <line x1="154" y1="72" x2="268" y2="72" stroke="#F0F7F5"/>
      <text x="154" y="90" fontSize="7" fontFamily="DM Sans, sans-serif" fill="#94A3B8" fontWeight="600" letterSpacing="0.6">WORKED</text>
      <text x="154" y="103" fontSize="8.5" fontFamily="DM Sans, sans-serif" fill="#475569">Tempo squats, 3×8 @ 185</text>
      <text x="154" y="124" fontSize="7" fontFamily="DM Sans, sans-serif" fill="#94A3B8" fontWeight="600" letterSpacing="0.6">FELT OFF</text>
      <text x="154" y="137" fontSize="8.5" fontFamily="DM Sans, sans-serif" fill="#475569">Deadlifts, low back tight</text>
      <text x="154" y="158" fontSize="7" fontFamily="DM Sans, sans-serif" fill="#94A3B8" fontWeight="600" letterSpacing="0.6">FOLLOW UP</text>
      <text x="154" y="171" fontSize="8.5" fontFamily="DM Sans, sans-serif" fill="#475569">Form check next session</text>
    </svg>
  )
}

function Step4Illustration() {
  return (
    <svg style={{ width: '100%', maxWidth: 380, height: 'auto' }} viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-followup" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FAFBFC"/>
          <stop offset="100%" stopColor="#F0F7F5"/>
        </linearGradient>
      </defs>
      <rect width="320" height="220" fill="url(#bg-followup)" rx="16"/>
      <g transform="translate(56 30)">
        <rect x="32" y="0" width="180" height="40" rx="8" fill="white" stroke="#E2E8F0" strokeWidth="1" opacity="0.5"/>
        <rect x="16" y="20" width="180" height="50" rx="8" fill="white" stroke="#E2E8F0" strokeWidth="1" opacity="0.78"/>
        <rect x="0" y="44" width="200" height="100" rx="10" fill="white" stroke="#E2E8F0" strokeWidth="1"/>
        <circle cx="22" cy="68" r="11" fill="#FFF1E0" stroke="#FFA64C" strokeWidth="1"/>
        <text x="22" y="72" textAnchor="middle" fontSize="9" fontFamily="DM Sans, sans-serif" fill="#A05B00" fontWeight="600">M</text>
        <text x="40" y="64" fontSize="9.5" fontFamily="DM Sans, sans-serif" fill="#0B1628" fontWeight="600">Marcus Reid</text>
        <text x="40" y="76" fontSize="7.5" fontFamily="DM Sans, sans-serif" fill="#94A3B8">Quiet 14d · Reach out</text>
        <line x1="14" y1="92" x2="186" y2="92" stroke="#F0F7F5"/>
        <text x="14" y="108" fontSize="8" fontFamily="DM Sans, sans-serif" fill="#475569">Hey Marcus, been a couple weeks.</text>
        <text x="14" y="120" fontSize="8" fontFamily="DM Sans, sans-serif" fill="#475569">{"How's the training holding up? Want"}</text>
        <text x="14" y="132" fontSize="8" fontFamily="DM Sans, sans-serif" fill="#475569">to grab a session this week?</text>
      </g>
      <rect x="200" y="184" width="80" height="22" rx="11" fill="#0B1628"/>
      <circle cx="216" cy="195" r="3" fill="#9AF198"/>
      <text x="226" y="199" fontSize="9" fontFamily="DM Sans, sans-serif" fill="white" fontWeight="500">3 ready</text>
    </svg>
  )
}

function Step5Illustration() {
  return (
    <svg style={{ width: '100%', maxWidth: 380, height: 'auto' }} viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-insights" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FAFBFC"/>
          <stop offset="100%" stopColor="#F0F7F5"/>
        </linearGradient>
        <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2BBFAA" stopOpacity="0.28"/>
          <stop offset="100%" stopColor="#2BBFAA" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <rect width="320" height="220" fill="url(#bg-insights)" rx="16"/>
      <rect x="40" y="30" width="240" height="160" rx="12" fill="white" stroke="#E2E8F0" strokeWidth="1"/>
      <text x="58" y="52" fontSize="10" fontFamily="DM Sans, sans-serif" fontWeight="600" fill="#0B1628">Client retention</text>
      <text x="58" y="65" fontSize="8" fontFamily="DM Sans, sans-serif" fill="#94A3B8">Last 5 months</text>
      <rect x="218" y="44" width="48" height="20" rx="10" fill="#9AF198" opacity="0.35"/>
      <text x="246" y="58" fontSize="9" fontFamily="DM Sans, sans-serif" fill="#08455E" fontWeight="600">+12%</text>
      <line x1="58" y1="92" x2="262" y2="92" stroke="#F0F7F5"/>
      <line x1="58" y1="118" x2="262" y2="118" stroke="#F0F7F5"/>
      <line x1="58" y1="144" x2="262" y2="144" stroke="#F0F7F5"/>
      <path d="M 58 138 L 92 130 L 126 122 L 160 116 L 194 102 L 228 90 L 262 78 L 262 156 L 58 156 Z" fill="url(#chart-fill)"/>
      <path d="M 58 138 L 92 130 L 126 122 L 160 116 L 194 102 L 228 90 L 262 78" stroke="#2BBFAA" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="58" cy="138" r="3" fill="white" stroke="#2BBFAA" strokeWidth="1.5"/>
      <circle cx="92" cy="130" r="3" fill="white" stroke="#2BBFAA" strokeWidth="1.5"/>
      <circle cx="126" cy="122" r="3" fill="white" stroke="#2BBFAA" strokeWidth="1.5"/>
      <circle cx="160" cy="116" r="3" fill="white" stroke="#2BBFAA" strokeWidth="1.5"/>
      <circle cx="194" cy="102" r="3" fill="white" stroke="#2BBFAA" strokeWidth="1.5"/>
      <circle cx="228" cy="90" r="3" fill="white" stroke="#2BBFAA" strokeWidth="1.5"/>
      <circle cx="262" cy="78" r="7" fill="#2BBFAA" opacity="0.22"/>
      <circle cx="262" cy="78" r="3.5" fill="#2BBFAA"/>
      <text x="58" y="174" fontSize="7.5" fontFamily="DM Sans, sans-serif" fill="#94A3B8">Jan</text>
      <text x="160" y="174" textAnchor="middle" fontSize="7.5" fontFamily="DM Sans, sans-serif" fill="#94A3B8">Mar</text>
      <text x="262" y="174" textAnchor="end" fontSize="7.5" fontFamily="DM Sans, sans-serif" fill="#94A3B8">May</text>
    </svg>
  )
}
