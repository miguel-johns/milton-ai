import { useState, useEffect } from 'react'
import Footer from './components/Footer'

// Design tokens matching Milton design system
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

export default function CoachesPage() {
  const [mobile, setMobile] = useState(window.innerWidth <= 640)
  const [menuOpen, setMenuOpen] = useState(false)
  const [chatModalOpen, setChatModalOpen] = useState(false)
  const [chatSubmitted, setChatSubmitted] = useState(false)
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', company: '' })
  const [leadSubmitting, setLeadSubmitting] = useState(false)
  const [leadError, setLeadError] = useState(null)

  useEffect(() => {
    const handleResize = () => setMobile(window.innerWidth <= 640)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
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

  // Scene data
  const scenes = [
    {
      num: 'One',
      title: 'First, you make it yours.',
      body: [
        'Tell Milton how you coach. Upload your programs, your methodology, the way you write to clients. He reads it all and turns it into a system that thinks like you do.',
        <>Then add your first client. Not someone else. <strong>You.</strong> The fastest way to feel what Milton actually does is to be the one being coached. In your own program, in your own voice. Nothing teaches you a tool like using it on yourself.</>,
      ],
      imageLabel: 'Scene 1 · Make it yours',
      imageHint: 'Sources Milton absorbed and you as the first client.',
    },
    {
      num: 'Two',
      title: 'Then you bring it to clients.',
      body: [
        'Building a program used to mean a blank spreadsheet. Now it\'s a sentence.',
      ],
      quote: '"Build a 4-week strength block for Sarah, focused on her squat goal."',
      bodyAfterQuote: 'Milton writes the block in your style, with your progressions and your cueing. You review, adjust, send. The first time it takes a minute. By the third time, less than that.',
      imageLabel: 'Scene 2 · Build by talking',
      imageHint: 'Chat-driven program builder. A sentence becomes a program.',
    },
    {
      num: 'Three',
      title: "Every morning, Milton's already worked.",
      body: [
        "Before you open your laptop, Milton has already gone through every client's data, flagged who needs attention today, and prepared a brief.",
        "You don't start your day at zero. You start it at the third or fourth question you would have eventually asked yourself.",
      ],
      imageLabel: 'Scene 3 · Your morning brief',
      imageHint: 'The dashboard waiting for you when you log in.',
    },
    {
      num: 'Four',
      title: "In every session, you're prepared.",
      body: [
        'Walk into a session and Milton has already pulled up the client\'s plan, their progression, and the last thing they told you. The history is right there. No flipping through notes. No "remind me where we left off."',
        "If something needs to change mid-session, a client's nursing a knee, hit a PR, lost motivation, you tell Milton out loud and the program updates in real time. The next session reflects it.",
      ],
      imageLabel: 'Scene 4 · Pre-session prep',
      imageHint: "A client's plan, progression, and last note in one view.",
    },
    {
      num: 'Five',
      title: 'Your clients feel it too.',
      body: [
        "Coaching used to end when the session ended. Now it doesn't.",
        "Your clients get their workouts on their phone. Milton checks in between sessions. When something needs your attention, you get a notification with a draft message already written in your voice. Approve, edit, send. Under a minute.",
        "The result: clients stay engaged. You stay sane.",
      ],
      imageLabel: 'Scene 5 · Client engagement',
      imageHint: 'Your client on mobile, your draft message ready to send.',
    },
    {
      num: 'Six',
      title: 'The compound effect.',
      body: [
        "Every session you run, every note you take, every adjustment you make, Milton remembers all of it. The next morning's brief is a little smarter. The next program suggestion is a little more you.",
        "After six months, Milton coaches alongside you the way a senior trainer who's worked with you for years would. By that point, you don't think of it as software anymore.",
      ],
      imageLabel: 'Scene 6 · Six months in',
      imageHint: 'A coach at the end of a good day. The work has paid off.',
    },
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: `
        radial-gradient(ellipse 1200px 600px at 50% -200px, rgba(43, 191, 170, 0.10) 0%, transparent 60%),
        radial-gradient(ellipse 800px 400px at 100% 100%, rgba(154, 241, 152, 0.08) 0%, transparent 60%),
        ${colors.bg}`,
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
        animation: 'fadeIn 0.6s ease-out',
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
            <a href="/coaches" className="nav-link" style={{ color: colors.ink, textDecoration: 'none', fontWeight: 600 }}>For Coaches</a>
            <a href="/gyms" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>For Gyms</a>
            <a href="/insights" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>Insights</a>
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
            onClick={() => setMenuOpen(!menuOpen)}
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
            <span style={{
              display: 'block',
              width: 18,
              height: 1.5,
              background: menuOpen ? 'transparent' : colors.ink,
              borderRadius: 1,
              position: 'relative',
              transition: 'all 0.3s',
            }}>
              <span style={{
                content: '""',
                position: 'absolute',
                left: 0,
                width: 18,
                height: 1.5,
                background: colors.ink,
                borderRadius: 1,
                top: menuOpen ? 0 : -6,
                transform: menuOpen ? 'rotate(45deg)' : 'none',
                transition: 'all 0.3s',
              }} />
              <span style={{
                content: '""',
                position: 'absolute',
                left: 0,
                width: 18,
                height: 1.5,
                background: colors.ink,
                borderRadius: 1,
                top: menuOpen ? 0 : 6,
                transform: menuOpen ? 'rotate(-45deg)' : 'none',
                transition: 'all 0.3s',
              }} />
            </span>
          </button>
        )}
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <>
          <div 
            onClick={() => setMenuOpen(false)}
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
            <a href="/coaches" style={{
              display: 'block',
              padding: '14px 16px',
              fontFamily: fonts.sans,
              fontSize: 16,
              fontWeight: 500,
              color: colors.ink,
              textDecoration: 'none',
              borderRadius: 10,
              background: colors.bg2,
            }}>For Coaches</a>
            <a href="/gyms" style={{
              display: 'block',
              padding: '14px 16px',
              fontFamily: fonts.sans,
              fontSize: 16,
              fontWeight: 500,
              color: colors.ink,
              textDecoration: 'none',
              borderRadius: 10,
            }}>For Gyms</a>
            <a href="/insights" style={{
              display: 'block',
              padding: '14px 16px',
              fontFamily: fonts.sans,
              fontSize: 16,
              fontWeight: 500,
              color: colors.ink,
              textDecoration: 'none',
              borderRadius: 10,
            }}>Insights</a>
            <a href="#" style={{
              display: 'block',
              padding: '14px 16px',
              fontFamily: fonts.sans,
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
        {/* Hero */}
        <section style={{
          maxWidth: 760,
          margin: '0 auto',
          padding: mobile ? '56px 20px 48px' : '80px 24px 64px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Eyebrow */}
          <div style={{
            textAlign: 'center',
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
            }}>For Coaches</span>
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
            animation: 'fadeUp 0.7s ease-out 0.1s both',
          }}>
            <em style={{ fontStyle: 'italic', fontWeight: 500 }}>A day with Milton.</em>
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
            animation: 'fadeUp 0.7s ease-out 0.2s both',
          }}>
            {"From your first upload to your hundredth session, here's what changes."}
          </p>
        </section>

        {/* Hero media placeholder */}
        <div style={{
          maxWidth: 1040,
          margin: '0 auto',
          padding: mobile ? '0 20px' : '0 32px 32px',
        }}>
          <ImagePlaceholder 
            aspectRatio="16 / 9"
            label="Hero · The day begins"
            hint="A coach in their element. Editorial wide shot to set the tone."
          />
        </div>

        {/* Scenes */}
        {scenes.map((scene, idx) => (
          <section key={idx} style={{
            maxWidth: 1080,
            margin: '0 auto',
            padding: mobile ? '56px 20px' : '80px 32px',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
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
            }}>
              <em style={{ fontStyle: 'italic', fontWeight: 500 }}>{scene.title}</em>
            </h2>

            {scene.body.map((text, i) => (
              <p key={i} style={{
                fontSize: 17,
                lineHeight: 1.7,
                color: colors.inkSoft,
                margin: '0 auto 18px',
                maxWidth: 600,
              }}>{text}</p>
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
              }}>
                <em>{scene.quote}</em>
              </p>
            )}

            {scene.bodyAfterQuote && (
              <p style={{
                fontSize: 17,
                lineHeight: 1.7,
                color: colors.inkSoft,
                margin: '0 auto 18px',
                maxWidth: 600,
              }}>{scene.bodyAfterQuote}</p>
            )}

            <div style={{ margin: mobile ? '36px auto 0' : '48px auto 0', maxWidth: 1040 }}>
              <ImagePlaceholder 
                aspectRatio="16 / 9"
                label={scene.imageLabel}
                hint={scene.imageHint}
              />
            </div>
          </section>
        ))}

        {/* Finale */}
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
          }}>
            <em>{"That's the day with Milton."}</em>
          </p>

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
            transition: 'all 0.2s',
          }}>
            Begin your day with Milton
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </a>
        </section>
      </main>

      <Footer mobile={mobile} onOpenChat={() => setChatModalOpen(true)} />

      {/* Chat Modal */}
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
            animation: 'modalIn 0.4s cubic-bezier(0.32, 0.72, 0, 1)',
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

            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
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
                <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.ink, letterSpacing: '-0.01em', marginBottom: 4 }}>Talk to a human</h3>
                <p style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: colors.inkMute }}>
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
                  animation: 'pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
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
                }}>Someone from the team will be in touch shortly.</p>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pop {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
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

// Image placeholder component
function ImagePlaceholder({ aspectRatio, label, hint }) {
  const colors = {
    paper: '#FFFFFF',
    ink: '#0B1628',
    inkMute: '#94A3B8',
  }
  const fonts = {
    serif: "'Cormorant Garamond', Georgia, serif",
    sans: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  }

  return (
    <div style={{
      width: '100%',
      aspectRatio,
      background: colors.paper,
      backgroundImage: `
        linear-gradient(135deg, rgba(11, 22, 40, 0.025) 25%, transparent 25%),
        linear-gradient(225deg, rgba(11, 22, 40, 0.025) 25%, transparent 25%),
        linear-gradient(45deg, rgba(11, 22, 40, 0.025) 25%, transparent 25%),
        linear-gradient(315deg, rgba(11, 22, 40, 0.025) 25%, transparent 25%)`,
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
      <svg 
        viewBox="0 0 24 24" 
        width="40" 
        height="40" 
        fill="none" 
        stroke="rgba(11, 22, 40, 0.28)" 
        strokeWidth="1.4" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2.5"/>
        <circle cx="8.5" cy="9" r="1.5"/>
        <path d="M21 16l-5-5L7 20"/>
      </svg>
      <div style={{
        fontFamily: fonts.sans,
        fontSize: 10.5,
        fontWeight: 700,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: 'rgba(11, 22, 40, 0.5)',
        textAlign: 'center',
      }}>{label}</div>
      <div style={{
        fontFamily: fonts.serif,
        fontStyle: 'italic',
        fontSize: 14,
        lineHeight: 1.45,
        color: colors.inkMute,
        textAlign: 'center',
        maxWidth: '80%',
      }}>{hint}</div>
    </div>
  )
}


