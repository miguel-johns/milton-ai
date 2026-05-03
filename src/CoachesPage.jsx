import { useState, useEffect } from 'react'

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
            <a href="/coaches" style={{ color: colors.ink, textDecoration: 'none', fontWeight: 600 }}>For Coaches</a>
            <a href="/gyms" style={{ color: 'inherit', textDecoration: 'none' }}>For Gyms</a>
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

      {/* Footer */}
      <footer style={{
        padding: mobile ? '48px 20px 32px' : '64px 40px 48px',
        borderTop: `1px solid ${colors.line}`,
        background: 'linear-gradient(180deg, transparent 0%, rgba(43, 191, 170, 0.02) 100%)',
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
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
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            marginBottom: mobile ? 28 : 36,
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
              {['Facebook', 'Instagram', 'X', 'Threads', 'TikTok', 'YouTube', 'LinkedIn'].map(platform => (
                <a 
                  key={platform}
                  href="#" 
                  aria-label={platform}
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
                  <SocialIcon platform={platform} />
                </a>
              ))}
            </nav>
          </div>

          <div style={{ height: 1, background: colors.line, marginBottom: 24 }} />

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

// Social icons component
function SocialIcon({ platform }) {
  const icons = {
    Facebook: <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3v9h4v-9z"/></svg>,
    Instagram: <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="2.5" width="19" height="19" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"/></svg>,
    X: <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
    Threads: <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.74-1.757-.503-.586-1.279-.883-2.309-.89h-.029c-.825 0-1.947.227-2.66 1.284l-1.668-1.119c.95-1.408 2.498-2.183 4.394-2.183h.043c3.171.02 5.06 1.985 5.247 5.4.107.046.214.094.319.143 1.485.7 2.572 1.76 3.143 3.066.798 1.823.871 4.793-1.548 7.16-1.85 1.81-4.094 2.628-7.236 2.65zm1.157-9.343c-.86 0-1.654.151-2.255.4-.612.255-1.04.586-1.32.978-.265.371-.397.795-.36 1.243.045.534.32.94.84 1.22.482.26 1.122.39 1.84.357 1.07-.057 1.86-.42 2.398-1.092.519-.65.83-1.557.93-2.738-.518-.226-1.226-.368-1.93-.368h-.143z"/></svg>,
    TikTok: <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.74a8.16 8.16 0 0 0 4.77 1.52V6.81a4.85 4.85 0 0 1-1.84-.12z"/></svg>,
    YouTube: <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
    LinkedIn: <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  }
  return icons[platform] || null
}
