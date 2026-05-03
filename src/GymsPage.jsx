import { useState, useEffect } from 'react'
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

  // Scene data for the gyms page
  const scenes = [
    {
      num: 'Monday',
      title: <><em>Everyone walks in knowing.</em></>,
      body: [
        "Before your first trainer arrives, Milton has already pulled the weekend's data. He knows which members trained, which didn't, who hit a milestone, and who slipped.",
        "By the time your trainers clock in, each one has the week's focus pulled up on their screen. The clients who need extra attention, the assessments due, the messages waiting. No one starts the week wondering what to do.",
      ],
      imageHint: "A trainer reviewing the week-ahead briefing on screen.",
    },
    {
      num: 'Tuesday',
      title: <><em>Coach the coach.</em></>,
      body: [
        "A retention dip in one of your trainers' clients used to be invisible until it was too late. Now Milton shows you the pattern as it's forming. Three of Jordan's clients have skipped their last two sessions. Their session quality scores are drifting.",
        "You sit down with Jordan, screen open, the data right there. The conversation isn't about whether there's a problem. It's about what to do about it. That's how trainers actually get better.",
      ],
      imageHint: "A 1:1 with a trainer, screen with data between you.",
    },
    {
      num: 'Wednesday',
      title: <><em>The team meeting that writes itself.</em></>,
      body: [
        "By Wednesday morning, Milton has surfaced the week's wins and bottlenecks. The clients who hit milestones, the ones drifting, the trainers who are crushing it, the ones who need support. You walk into your team huddle prepared.",
        "The agenda is already laid out. The data your team needs is already pulled. Twenty minutes later, your team walks out aligned on what matters. No one wasted an hour Tuesday night building reports.",
      ],
      imageHint: "A team meeting in progress, focused and brief.",
    },
    {
      num: 'Thursday',
      title: <><em>A save before it's a loss.</em></>,
      body: [
        "Mid-week, Milton flags Maya Patel. She's been quieter, her sessions less consistent, her body language in the last check-in noticeably off. She's not gone. But she's drifting.",
        "You and her trainer get the alert at the same time. Milton has drafted the outreach message. Within twenty minutes, she's booked for a Friday session and a check-in. The save took twenty minutes. Replacing her would have cost you thousands.",
      ],
      imageHint: "Member-at-risk alert with drafted outreach visible.",
    },
    {
      num: 'Friday',
      title: <><em>The whole week, on one screen.</em></>,
      body: [
        "Friday afternoon, you ask Milton one question.",
      ],
      quote: '"Where did we make money this week? Where could we have made more?"',
      bodyAfterQuote: [
        "Sign-ups, departures, revenue, trainer hours, retention movement. The members who joined and why. The ones who left, and why. Saturday morning, you walk in with three clear priorities for next week.",
      ],
      imageHint: "End-of-week dashboard. Sign-ups, retention, revenue.",
    },
    {
      num: 'Three months in',
      title: <><em>The gym you've been trying to run all along.</em></>,
      body: [
        "After three months, you can feel the difference. Trainers are organized without being told. Retention is climbing. Team meetings are decisions, not status updates. You spend less time on spreadsheets and more time on the floor.",
        "After a year, everyone feels it. Trainers who used to leave for slightly better pay stay because they're getting better at their craft. Members tell their friends. Your gym becomes the place people want to be.",
      ],
      imageHint: "A bustling gym, the work paying off. Trainers and members alike.",
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
          maxWidth: 760,
          margin: '0 auto',
          padding: mobile ? '56px 20px 48px' : '80px 24px 64px',
          textAlign: 'center',
        }}>
          <div style={{
            marginBottom: 28,
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
            }}>For Gyms</span>
            <span style={{ width: 28, height: 1, background: colors.line }} />
          </div>

          <h1 style={{
            fontFamily: fonts.serif,
            fontSize: 'clamp(48px, 7vw, 84px)',
            lineHeight: 1.02,
            letterSpacing: '-0.025em',
            fontWeight: 500,
            color: colors.ink,
            marginBottom: 16,
          }}>
            <em>A week with Milton.</em>
          </h1>

          <p style={{
            fontFamily: fonts.serif,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(20px, 2.5vw, 26px)',
            lineHeight: 1.4,
            color: colors.inkSoft,
            maxWidth: 540,
            margin: '0 auto',
          }}>
            {"From Monday's first session to Friday's review, here's what changes inside your gym."}
          </p>
        </section>

        {/* Hero media placeholder */}
        <div style={{
          maxWidth: 1040,
          margin: '0 auto',
          padding: mobile ? '0 20px 32px' : '0 32px 32px',
        }}>
          <ImagePlaceholder 
            hint="A gym waking up Monday morning. Editorial wide shot to set the tone."
            aspectRatio="21/9"
          />
        </div>

        {/* ===== Scenes ===== */}
        {scenes.map((scene, i) => (
          <section key={i} style={{
            maxWidth: 1080,
            margin: '0 auto',
            padding: mobile ? '56px 20px' : '80px 32px',
            textAlign: 'center',
          }}>
            <div style={{
              fontFamily: fonts.serif,
              fontStyle: 'italic',
              fontWeight: 500,
              fontSize: 22,
              color: colors.accent,
              marginBottom: 8,
              letterSpacing: '-0.005em',
            }}>{scene.num}</div>

            <h2 style={{
              fontFamily: fonts.serif,
              fontSize: 'clamp(34px, 4.6vw, 52px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              fontWeight: 500,
              color: colors.ink,
              margin: '0 auto 24px',
              maxWidth: 720,
            }}>{scene.title}</h2>

            {scene.body.map((p, j) => (
              <p key={j} style={{
                fontSize: 17,
                lineHeight: 1.7,
                color: colors.inkSoft,
                margin: '0 auto 18px',
                maxWidth: 600,
              }}>{p}</p>
            ))}

            {scene.quote && (
              <p style={{
                fontFamily: fonts.serif,
                fontStyle: 'italic',
                fontSize: 'clamp(22px, 2.6vw, 28px)',
                lineHeight: 1.4,
                color: colors.ink,
                margin: '12px auto 22px',
                maxWidth: 600,
              }}><em>{scene.quote}</em></p>
            )}

            {scene.bodyAfterQuote && scene.bodyAfterQuote.map((p, j) => (
              <p key={j} style={{
                fontSize: 17,
                lineHeight: 1.7,
                color: colors.inkSoft,
                margin: '0 auto 18px',
                maxWidth: 600,
              }}>{p}</p>
            ))}

            <div style={{
              marginTop: mobile ? 36 : 48,
              maxWidth: 1040,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
              <ImagePlaceholder hint={scene.imageHint} />
            </div>
          </section>
        ))}

        {/* ===== Finale ===== */}
        <section style={{
          maxWidth: 1080,
          margin: '0 auto',
          padding: mobile ? '32px 20px 80px' : '40px 32px 120px',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: fonts.serif,
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: 'clamp(26px, 3.4vw, 36px)',
            color: colors.ink,
            lineHeight: 1.3,
            margin: '0 auto 36px',
            maxWidth: 600,
            letterSpacing: '-0.015em',
          }}><em>{"That's a week with Milton."}</em></p>

          <a href="/" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: colors.ink,
            color: colors.paper,
            padding: '14px 24px',
            borderRadius: 12,
            fontFamily: fonts.sans,
            fontSize: 15,
            fontWeight: 600,
            textDecoration: 'none',
          }}>
            Begin your week with Milton
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </a>
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
