import { useState, useEffect, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import Footer from './components/Footer'

// Initialize Supabase client - use VITE_ prefixed vars for client-side access
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

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

// Milton logo image
const logoImage = "/images/milton-logo.png"

export default function NewHomePage() {
  const { mobile } = useBreakpoint()
  const [prompt, setPrompt] = useState('')
  const [attachedFile, setAttachedFile] = useState(null)
  const [addedChips, setAddedChips] = useState(new Set())
  const [captureScreen, setCaptureScreen] = useState(false)
  const [successScreen, setSuccessScreen] = useState(false)
  const [captureForm, setCaptureForm] = useState({ firstName: '', businessName: '', phone: '', email: '' })
  const [captureSubmitting, setCaptureSubmitting] = useState(false)
  const [captureError, setCaptureError] = useState(null)
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
    setCaptureScreen(true)
  }

  const handleCaptureBack = () => {
    setCaptureScreen(false)
    setCaptureError(null)
  }

  const handleCaptureSubmit = async (e) => {
    e.preventDefault()
    setCaptureError(null)

    // Validate first name
    if (!captureForm.firstName || !captureForm.firstName.trim()) {
      setCaptureError('First name is required')
      return
    }

    // Validate business name
    if (!captureForm.businessName || !captureForm.businessName.trim()) {
      setCaptureError('Business name is required')
      return
    }

    // Validate phone
    const phoneDigits = captureForm.phone.replace(/\D/g, '')
    if (phoneDigits.length < 10) {
      setCaptureError('Phone number must have at least 10 digits')
      return
    }

    // Validate email
    if (!captureForm.email || !captureForm.email.includes('@')) {
      setCaptureError('Please enter a valid email address')
      return
    }

    setCaptureSubmitting(true)

    try {
      if (!supabase) {
        throw new Error('Database connection not configured')
      }

      // Insert lead directly into Supabase
      const { error } = await supabase
        .from('leads')
        .insert({
          name: captureForm.firstName.trim(),
          email: captureForm.email.toLowerCase().trim(),
          phone: captureForm.phone.trim(),
          company: captureForm.businessName.trim(),
          prompt: prompt || null,
          chips: Array.from(addedChips),
          has_file: false,
        })

      if (error) {
        // Handle duplicate email
        if (error.code === '23505') {
          throw new Error('This email is already registered')
        }
        console.error('[v0] Supabase error:', error)
        throw new Error('Failed to save your information')
      }

      setSuccessScreen(true)
    } catch (err) {
      setCaptureError(err.message)
    } finally {
      setCaptureSubmitting(false)
    }
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

  // Render success screen
  if (successScreen) {
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
          animation: 'fadeUp 0.4s ease-out',
        }}>
          {/* Animated checkmark */}
          <div style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: colors.accentSoft,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
            animation: 'springPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}>
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke={colors.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>

          <h2 style={{
            fontFamily: fonts.serif,
            fontSize: mobile ? 36 : 48,
            fontStyle: 'italic',
            color: colors.ink,
            marginBottom: 16,
            fontWeight: 500,
            letterSpacing: '-0.02em',
          }}>Talk soon.</h2>
          
          <p style={{
            fontFamily: fonts.serif,
            fontStyle: 'italic',
            fontSize: mobile ? 17 : 18,
            color: colors.inkSoft,
            maxWidth: 420,
            lineHeight: 1.65,
            margin: '0 auto 20px',
          }}>
            {"I've got what you sent and I'm starting to learn how you coach. You'll hear from me within 24 hours"}
            {captureForm.firstName && `, ${captureForm.firstName}`}.
          </p>
          
          <p style={{
            fontSize: 14,
            color: colors.inkMute,
            maxWidth: 400,
            lineHeight: 1.55,
          }}>
            In the meantime, anything else you want me to know?{' '}
            <a 
              href="mailto:milton@getmilton.com"
              style={{ color: colors.accentDeep, textDecoration: 'none' }}
            >
              milton@getmilton.com
            </a>
          </p>
        </div>
        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes springPop {
            0% { opacity: 0; transform: scale(0.3); }
            50% { transform: scale(1.1); }
            100% { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </div>
    )
  }

  // Render capture screen
  if (captureScreen) {
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
          animation: 'fadeUp 0.4s ease-out',
        }}>
          <div style={{ maxWidth: 540, width: '100%' }}>
            <h2 style={{
              fontFamily: fonts.serif,
              fontSize: mobile ? 36 : 48,
              color: colors.ink,
              marginBottom: 16,
              fontWeight: 500,
              letterSpacing: '-0.02em',
            }}>
              Got <span style={{ fontStyle: 'italic', color: colors.accent }}>it.</span>
            </h2>
            
            <p style={{
              fontFamily: fonts.serif,
              fontStyle: 'italic',
              fontSize: mobile ? 16 : 17,
              color: colors.inkSoft,
              lineHeight: 1.65,
              marginBottom: 28,
            }}>
              {"I'm reading what you sent and starting to build skills around how you coach. This part takes a few hours of human review before I'm ready for you. What's the best number to text when you are?"}
            </p>

            {/* Form card */}
            <form onSubmit={handleCaptureSubmit} style={{
              background: colors.paper,
              border: `1px solid ${colors.line}`,
              borderRadius: 20,
              padding: mobile ? '20px 18px' : '24px 28px',
              boxShadow: '0 1px 2px rgba(11, 22, 40, 0.03), 0 8px 24px rgba(11, 22, 40, 0.06)',
            }}>
              {/* Row: First name + Business name */}
              <div style={{
                display: 'flex',
                gap: 12,
                marginBottom: 12,
                flexDirection: mobile ? 'column' : 'row',
              }}>
                <input
                  type="text"
                  placeholder="First name *"
                  required
                  value={captureForm.firstName}
                  onChange={(e) => setCaptureForm(f => ({ ...f, firstName: e.target.value }))}
                  style={{
                    flex: 1,
                    border: `1px solid ${colors.line}`,
                    borderRadius: 10,
                    padding: '12px 14px',
                    fontFamily: fonts.sans,
                    fontSize: 15,
                    color: colors.ink,
                    background: colors.bg,
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                <input
                  type="text"
                  placeholder="Business name *"
                  required
                  value={captureForm.businessName}
                  onChange={(e) => setCaptureForm(f => ({ ...f, businessName: e.target.value }))}
                  style={{
                    flex: 1,
                    border: `1px solid ${colors.line}`,
                    borderRadius: 10,
                    padding: '12px 14px',
                    fontFamily: fonts.sans,
                    fontSize: 15,
                    color: colors.ink,
                    background: colors.bg,
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <input
                type="tel"
                placeholder="Mobile number *"
                required
                value={captureForm.phone}
                onChange={(e) => setCaptureForm(f => ({ ...f, phone: e.target.value }))}
                style={{
                  width: '100%',
                  border: `1px solid ${colors.line}`,
                  borderRadius: 10,
                  padding: '12px 14px',
                  fontFamily: fonts.sans,
                  fontSize: 15,
                  color: colors.ink,
                  background: colors.bg,
                  marginBottom: 12,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />

              <input
                type="email"
                placeholder="Email *"
                required
                value={captureForm.email}
                onChange={(e) => setCaptureForm(f => ({ ...f, email: e.target.value }))}
                style={{
                  width: '100%',
                  border: `1px solid ${colors.line}`,
                  borderRadius: 10,
                  padding: '12px 14px',
                  fontFamily: fonts.sans,
                  fontSize: 15,
                  color: colors.ink,
                  background: colors.bg,
                  marginBottom: 16,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />

              {/* Error message */}
              {captureError && (
                <p style={{
                  fontSize: 13,
                  color: '#DC2626',
                  marginBottom: 12,
                  padding: '10px 14px',
                  background: '#FEF2F2',
                  borderRadius: 8,
                }}>
                  {captureError}
                </p>
              )}

              {/* Action row */}
              <div style={{
                display: 'flex',
                flexDirection: mobile ? 'column-reverse' : 'row',
                justifyContent: 'space-between',
                alignItems: mobile ? 'stretch' : 'center',
                gap: mobile ? 8 : 12,
              }}>
                <button
                  type="button"
                  onClick={handleCaptureBack}
                  style={{
                    background: 'transparent',
                    color: colors.inkSoft,
                    border: 'none',
                    padding: '10px 14px',
                    borderRadius: 10,
                    fontFamily: fonts.sans,
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 6l-6 6 6 6"/>
                  </svg>
                  Back
                </button>

                <button
                  type="submit"
                  disabled={captureSubmitting}
                  style={{
                    background: `linear-gradient(135deg, ${colors.ink} 0%, ${colors.accent} 100%)`,
                    color: colors.paper,
                    border: 'none',
                    padding: mobile ? '14px 20px' : '12px 20px',
                    borderRadius: 10,
                    fontFamily: fonts.sans,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: captureSubmitting ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    opacity: captureSubmitting ? 0.7 : 1,
                    width: mobile ? '100%' : 'auto',
                  }}
                >
                  {captureSubmitting ? 'Sending...' : (mobile ? 'Text me' : "Text me when you're ready")}
                  {!captureSubmitting && (
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6"/>
                    </svg>
                  )}
                </button>
              </div>
            </form>

            {/* Fineprint */}
            <p style={{
              fontSize: 12,
              color: colors.inkMute,
              textAlign: 'center',
              marginTop: 16,
              lineHeight: 1.5,
            }}>
              {"I'll text you once. No marketing spam. We don't share your info."}
            </p>
          </div>
        </div>
        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
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
            <a href="/coaches" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>For Coaches</a>
            <a href="/gyms" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>For Gyms</a>
            <a href="/insights" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>Insights</a>
            <a href="/about" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>About</a>
            <a href="#" className="nav-btn" style={{
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
              fontWeight: 500,
              color: colors.ink,
              textDecoration: 'none',
              borderRadius: 10,
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
            The first coaching tool you don&apos;t have to learn. No setup. No workflows. Milton fits to you.
          </p>
          
          <p style={{
            fontSize: 15,
            lineHeight: 1.65,
            color: colors.inkSoft,
            textAlign: 'center',
            maxWidth: 520,
            marginBottom: 28,
          }}>
            Try anything. Your methodology, your client types, your rules, your style. I learn it from the first sentence.
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

      <Footer mobile={mobile} onOpenChat={() => setChatModalOpen(true)} />

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
