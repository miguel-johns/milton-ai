import { useState, useEffect } from 'react'
import Footer from './components/Footer'

// Custom hook for responsive breakpoints
function useBreakpoint() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  useEffect(() => {
    const h = () => setW(window.innerWidth)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return { mobile: w < 640, tablet: w >= 640 && w < 1024, desktop: w >= 1024 }
}

// Design tokens matching the new light theme
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

const logoImage = "/images/milton-logo.png"

export default function AboutPage() {
  const { mobile, tablet } = useBreakpoint()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [chatModalOpen, setChatModalOpen] = useState(false)

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.bg,
      fontFamily: fonts.sans,
      color: colors.ink,
    }}>
      {/* ═══════ NAV ═══════ */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(250, 251, 252, 0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${colors.lineSoft}`,
      }}>
        <nav style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: mobile ? '14px 20px' : '16px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <a href="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            textDecoration: 'none',
            fontFamily: fonts.serif,
            fontSize: 22,
            fontWeight: 600,
            color: colors.ink,
          }}>
            <img 
              src={logoImage}
              alt="Milton"
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
            <span>Milton</span>
          </a>

          {/* Desktop Nav */}
          {!mobile && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 32,
              fontFamily: fonts.sans,
              fontSize: 15,
              fontWeight: 500,
              color: colors.inkSoft,
            }}>
              <a href="/coaches" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>For Coaches</a>
              <a href="/gyms" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>For Gyms</a>
              <a href="/insights" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>Insights</a>
              <a href="/about" className="nav-link" style={{ color: colors.ink, textDecoration: 'none', fontWeight: 600 }}>About</a>
              <a href="#" className="nav-btn" style={{
                color: 'inherit',
                textDecoration: 'none',
                border: `1px solid ${colors.line}`,
                padding: '8px 16px',
                borderRadius: 8,
                background: colors.paper,
              }}>Sign in</a>
            </div>
          )}

          {/* Mobile Menu Button */}
          {mobile && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                padding: 8,
                cursor: 'pointer',
                color: colors.ink,
              }}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {mobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          )}
        </nav>

        {/* Mobile Menu */}
        {mobile && mobileMenuOpen && (
          <>
            <div
              onClick={() => setMobileMenuOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(11, 22, 40, 0.3)',
                zIndex: 40,
              }}
            />
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: colors.paper,
              borderBottom: `1px solid ${colors.line}`,
              padding: '12px 20px 20px',
              zIndex: 50,
              boxShadow: '0 8px 32px rgba(11, 22, 40, 0.08)',
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
                fontWeight: 600,
                color: colors.accent,
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
      </header>

      <main>
        {/* ═══════ HERO ═══════ */}
        <section style={{
          padding: mobile ? '60px 20px 48px' : '100px 40px 80px',
          maxWidth: 1000,
          margin: '0 auto',
          textAlign: 'center',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: colors.accentSoft,
            border: `1px solid ${colors.accent}20`,
            borderRadius: 100,
            padding: mobile ? '6px 16px' : '8px 20px',
            marginBottom: 28,
          }}>
            <span style={{
              fontFamily: fonts.sans,
              fontSize: mobile ? 12 : 14,
              fontWeight: 500,
              color: colors.accent,
            }}>About Milton AI</span>
          </div>

          <h1 style={{
            fontFamily: fonts.serif,
            fontSize: mobile ? 32 : tablet ? 48 : 60,
            fontWeight: 400,
            lineHeight: 1.1,
            color: colors.ink,
            margin: '0 0 24px 0',
          }}>
            Empowering the humans on the front lines of the global{' '}
            <span style={{ color: colors.accent, fontStyle: 'italic' }}>metabolic health crisis</span>.
          </h1>

          <p style={{
            fontFamily: fonts.sans,
            fontSize: mobile ? 16 : 19,
            lineHeight: 1.65,
            color: colors.inkSoft,
            maxWidth: 640,
            margin: '0 auto 36px auto',
          }}>
            700 million people live with obesity. 500 million with diabetes. The real frontline isn't hospitals — it's the coaches who show up every morning to change lives one session at a time.
          </p>

          <div style={{
            background: colors.paper,
            border: `1px solid ${colors.line}`,
            borderRadius: mobile ? 16 : 20,
            padding: mobile ? '20px 22px' : '28px 40px',
            maxWidth: 680,
            margin: '0 auto',
            boxShadow: '0 4px 24px rgba(11, 22, 40, 0.04)',
          }}>
            <p style={{
              fontFamily: fonts.serif,
              fontSize: mobile ? 18 : 24,
              fontStyle: 'italic',
              lineHeight: 1.45,
              color: colors.inkSoft,
              margin: 0,
            }}>
              "This is not a technology company that happens to serve fitness. This is a fitness company that happens to build technology."
            </p>
          </div>
        </section>

        {/* ═══════ WHY NOW ═══════ */}
        <section style={{
          padding: mobile ? '48px 20px' : '80px 40px',
          background: colors.paper,
        }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 16,
            }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: colors.accent,
              }} />
              <span style={{
                fontFamily: fonts.sans,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: colors.inkMute,
              }}>The Moment</span>
            </div>

            <h2 style={{
              fontFamily: fonts.serif,
              fontSize: mobile ? 28 : 44,
              fontWeight: 400,
              lineHeight: 1.15,
              color: colors.ink,
              margin: '0 0 32px 0',
            }}>
              Three forces converging. The window won't stay{' '}
              <span style={{ color: colors.accent, fontStyle: 'italic' }}>open</span>.
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)',
              gap: mobile ? 16 : 24,
            }}>
              {[
                {
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08A2.5 2.5 0 0 0 12 19.5a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 12 4.5"/><circle cx="12" cy="12" r="2"/></svg>,
                  title: "AI is finally ready",
                  body: "For the first time, AI can understand coaching nuance — session context, progressive overload, follow-up timing. Not replace the coach. Amplify them."
                },
                {
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
                  title: "The trainer crisis",
                  body: "80% annual turnover. The industry burns through coaches faster than it can train them. The model is broken."
                },
                {
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>,
                  title: "The health epidemic",
                  body: "$4.1 trillion in chronic disease costs annually. The trainers we lose are the healthcare workers we can't afford to lose."
                },
              ].map((card, i) => (
                <div key={i} style={{
                  background: colors.bg,
                  border: `1px solid ${colors.line}`,
                  borderRadius: mobile ? 16 : 20,
                  padding: mobile ? 22 : 28,
                }}>
                  <div style={{ marginBottom: 14 }}>{card.icon}</div>
                  <div style={{
                    fontFamily: fonts.sans,
                    fontSize: mobile ? 17 : 18,
                    fontWeight: 600,
                    color: colors.ink,
                    marginBottom: 8,
                  }}>{card.title}</div>
                  <div style={{
                    fontFamily: fonts.sans,
                    fontSize: mobile ? 14 : 15,
                    lineHeight: 1.65,
                    color: colors.inkSoft,
                  }}>{card.body}</div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 32,
              paddingLeft: mobile ? 0 : 20,
              borderLeft: mobile ? 'none' : `3px solid ${colors.accentSoft}`,
            }}>
              <p style={{
                fontFamily: fonts.serif,
                fontSize: mobile ? 17 : 20,
                fontStyle: 'italic',
                lineHeight: 1.5,
                color: colors.inkSoft,
                margin: 0,
              }}>
                We intend to be the company that solves this intersection.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════ VALUES ═══════ */}
        <section style={{
          padding: mobile ? '48px 20px' : '80px 40px',
        }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 16,
            }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: colors.accent,
              }} />
              <span style={{
                fontFamily: fonts.sans,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: colors.inkMute,
              }}>What We Believe</span>
            </div>

            <h2 style={{
              fontFamily: fonts.serif,
              fontSize: mobile ? 28 : 44,
              fontWeight: 400,
              lineHeight: 1.15,
              color: colors.ink,
              margin: '0 0 32px 0',
            }}>
              The human is the product. The technology is the{' '}
              <span style={{ color: colors.accent, fontStyle: 'italic' }}>amplifier</span>.
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: mobile ? 14 : 18 }}>
              {[
                { num: "01", title: "The coach is the front line of healthcare", body: "Personal trainers aren't gym employees — they're preventive healthcare workers who change behavior, reverse chronic disease, and keep people out of hospital beds. It's time we treated them accordingly." },
                { num: "02", title: "AI makes the human more valuable, not less", body: "As AI handles the routine, the human skills — empathy, intuition, presence, accountability — become the premium. The trainers who develop those skills will be the most valuable professionals in the room." },
                { num: "03", title: "Relationships can't be downloaded", body: "People hire trainers because they need someone who knows their story and won't let them quit. That relationship is the product. Everything Milton builds exists to strengthen that bond." },
                { num: "04", title: "Higher standards, not just higher tech", body: "Be outcomes-driven. Track results. Build credibility through consistency. Milton gives trainers the tools to operate at a healthcare-professional level — and the data to prove they belong there." },
                { num: "05", title: "Empowerment is the only strategy that scales", body: "When a trainer can see their own growth, track their impact, and build a career they're proud of — they don't leave. They lead." },
              ].map((v, i) => (
                <div key={i} style={{
                  display: 'grid',
                  gridTemplateColumns: mobile ? '1fr' : '56px 1fr',
                  gap: mobile ? 8 : 24,
                  padding: mobile ? '20px 18px' : '28px 28px',
                  background: colors.paper,
                  border: `1px solid ${colors.line}`,
                  borderRadius: mobile ? 14 : 18,
                }}>
                  <div style={{
                    fontFamily: fonts.sans,
                    fontSize: mobile ? 24 : 32,
                    fontWeight: 700,
                    color: colors.accentSoft,
                    lineHeight: 1,
                  }}>{v.num}</div>
                  <div>
                    <div style={{
                      fontFamily: fonts.sans,
                      fontSize: mobile ? 16 : 18,
                      fontWeight: 600,
                      color: colors.ink,
                      marginBottom: 6,
                    }}>{v.title}</div>
                    <div style={{
                      fontFamily: fonts.sans,
                      fontSize: mobile ? 14 : 15,
                      lineHeight: 1.7,
                      color: colors.inkSoft,
                    }}>{v.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ TEAM ═══════ */}
        <section style={{
          padding: mobile ? '48px 20px' : '80px 40px',
          background: colors.paper,
        }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 16,
            }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: colors.accent,
              }} />
              <span style={{
                fontFamily: fonts.sans,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: colors.inkMute,
              }}>The People</span>
            </div>

            <h2 style={{
              fontFamily: fonts.serif,
              fontSize: mobile ? 28 : 44,
              fontWeight: 400,
              lineHeight: 1.15,
              color: colors.ink,
              margin: '0 0 36px 0',
            }}>
              Built by people who've been on the{' '}
              <span style={{ color: colors.accent, fontStyle: 'italic' }}>training floor</span>.
            </h2>

            {/* Leadership */}
            <div style={{ marginBottom: mobile ? 32 : 40 }}>
              <div style={{
                fontFamily: fonts.sans,
                fontSize: 11,
                fontWeight: 600,
                color: colors.inkMute,
                letterSpacing: 2,
                textTransform: 'uppercase',
                marginBottom: mobile ? 16 : 20,
              }}>Leadership</div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(4, 1fr)',
                gap: mobile ? 14 : 20,
              }}>
                {[
                  { img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Miguel%20Johns%2C%20CEO-lZEJGQjNYl6kZ7EGW2kmb9QchdFiBa.png", name: "Miguel Johns", title: "CEO" },
                  { img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/John%20Elliott%2C%20COO-7lVzroaIzjIATXzzdZZpcbd34XjVTA.png", name: "John Elliott", title: "COO" },
                  { img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Srinivas%20Palthepu%2C%20CTO-6UiUB7zTETdyCdXIxsDcWLehDAfVj2.png", name: "Srinivas Palthepu", title: "CTO" },
                  { img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jeff%20Turner%2C%20Investor%20%26%20Chair-YglZ83IINB3BwhO0RgB7VLYCaCw0Wv.png", name: "Jeff Turner", title: "Investor & Chair" },
                ].map((p, i) => (
                  <div key={i} style={{
                    background: colors.bg,
                    border: `1px solid ${colors.line}`,
                    borderRadius: mobile ? 16 : 20,
                    padding: mobile ? 18 : 24,
                    textAlign: 'center',
                  }}>
                    <img
                      src={p.img}
                      alt={p.name}
                      style={{
                        width: mobile ? 72 : 100,
                        height: mobile ? 72 : 100,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        border: `3px solid ${colors.accentSoft}`,
                        marginBottom: 14,
                      }}
                    />
                    <div style={{
                      fontFamily: fonts.sans,
                      fontSize: mobile ? 14 : 17,
                      fontWeight: 600,
                      color: colors.ink,
                      marginBottom: 2,
                    }}>{p.name}</div>
                    <div style={{
                      fontFamily: fonts.sans,
                      fontSize: 12,
                      color: colors.accent,
                      fontWeight: 500,
                    }}>{p.title}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Engineering */}
            <div>
              <div style={{
                fontFamily: fonts.sans,
                fontSize: 11,
                fontWeight: 600,
                color: colors.inkMute,
                letterSpacing: 2,
                textTransform: 'uppercase',
                marginBottom: mobile ? 16 : 20,
              }}>Engineering</div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(4, 1fr)',
                gap: mobile ? 14 : 20,
              }}>
                {[
                  { img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sanjay%20Kumar%20Murudi%2C%20VP%2C%20Engineering-aOLDFFYqmRwSlqGFlgHroagMVugAc4.png", name: "Sanjay Kumar Murudi", title: "VP, Engineering" },
                  { img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Udaya%20Thalabattula%2C%20SR%20Architect-txS8zzFk2X7qAxBINdcWNldo3Qsdvs.png", name: "Udaya Thalabattula", title: "SR Architect" },
                  { img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Srinath%20Bellamkonda%2C%20AI%20Engineer-WTAU7ZR6RIlkSGCCTEwQy4cjCeTw0N.png", name: "Srinath Bellamkonda", title: "AI Engineer" },
                  { img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sujit%20Kumar%20Pradhan%2C%20AI%20Engineer-lVHIxn46bx508ziTats0XqrdwxZDdK.png", name: "Sujit Kumar Pradhan", title: "AI Engineer" },
                ].map((p, i) => (
                  <div key={i} style={{
                    background: colors.bg,
                    border: `1px solid ${colors.line}`,
                    borderRadius: mobile ? 14 : 18,
                    padding: mobile ? 16 : 20,
                    textAlign: 'center',
                  }}>
                    <img
                      src={p.img}
                      alt={p.name}
                      style={{
                        width: mobile ? 60 : 80,
                        height: mobile ? 60 : 80,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        border: `2px solid ${colors.accentSoft}`,
                        marginBottom: 12,
                      }}
                    />
                    <div style={{
                      fontFamily: fonts.sans,
                      fontSize: mobile ? 13 : 15,
                      fontWeight: 600,
                      color: colors.ink,
                      marginBottom: 2,
                    }}>{p.name}</div>
                    <div style={{
                      fontFamily: fonts.sans,
                      fontSize: mobile ? 10 : 11,
                      color: colors.accent,
                      fontWeight: 500,
                    }}>{p.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ CHIEF COACH OFFICER ═══════ */}
        <section style={{
          padding: mobile ? '48px 20px' : '80px 40px',
        }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 16,
            }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: colors.accent,
              }} />
              <span style={{
                fontFamily: fonts.sans,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: colors.inkMute,
              }}>A Role Only We Have</span>
            </div>

            <div style={{
              background: `linear-gradient(145deg, ${colors.accentSoft}, ${colors.paper})`,
              border: `1px solid ${colors.accent}30`,
              borderRadius: mobile ? 20 : 28,
              padding: mobile ? '28px 22px' : '40px 44px',
              boxShadow: '0 8px 32px rgba(43, 191, 170, 0.08)',
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: mobile ? '1fr' : 'auto 1fr',
                gap: mobile ? 24 : 36,
                alignItems: 'start',
              }}>
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Johnny%20O-f85QO3MehtjKe6jNVZZzn4Som59E6J.png"
                  alt="Johnny Olsen"
                  style={{
                    width: mobile ? 120 : 180,
                    height: mobile ? 120 : 180,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    border: `4px solid ${colors.paper}`,
                    boxShadow: `0 8px 32px rgba(43, 191, 170, 0.2)`,
                    flexShrink: 0,
                    margin: mobile ? '0 auto' : 0,
                  }}
                />
                <div>
                  <div style={{
                    fontFamily: fonts.sans,
                    fontSize: mobile ? 22 : 26,
                    fontWeight: 700,
                    color: colors.ink,
                    marginBottom: 4,
                  }}>Johnny Olsen</div>
                  <div style={{
                    fontFamily: fonts.sans,
                    fontSize: 15,
                    color: colors.accent,
                    fontWeight: 600,
                    marginBottom: 18,
                  }}>Chief Coach Officer</div>
                  <p style={{
                    fontFamily: fonts.sans,
                    fontSize: mobile ? 15 : 16,
                    lineHeight: 1.7,
                    color: colors.inkSoft,
                    margin: '0 0 12px 0',
                  }}>
                    No AI company has a Chief Coach Officer. We do — because building for coaches without one is like building a hospital without asking a doctor.
                  </p>
                  <p style={{
                    fontFamily: fonts.sans,
                    fontSize: mobile ? 14 : 15,
                    lineHeight: 1.7,
                    color: colors.inkMute,
                    margin: 0,
                  }}>
                    Every AI recommendation, session brief, and development path in Milton is filtered through decades of real coaching experience. This is what separates us.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ HOME BASE GYM ═══════ */}
        <section style={{
          padding: mobile ? '48px 20px' : '80px 40px',
          background: colors.paper,
        }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 16,
            }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: colors.accent,
              }} />
              <span style={{
                fontFamily: fonts.sans,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: colors.inkMute,
              }}>Our Proving Ground</span>
            </div>

            <h2 style={{
              fontFamily: fonts.serif,
              fontSize: mobile ? 28 : 44,
              fontWeight: 400,
              lineHeight: 1.15,
              color: colors.ink,
              margin: '0 0 20px 0',
            }}>
              Optimal Performance — where Milton is{' '}
              <span style={{ color: colors.accent, fontStyle: 'italic' }}>forged</span>.
            </h2>

            <p style={{
              fontFamily: fonts.sans,
              fontSize: mobile ? 15 : 17,
              lineHeight: 1.7,
              color: colors.inkSoft,
              maxWidth: 680,
              margin: '0 0 32px 0',
            }}>
              A privately-owned personal training studio in Wichita, KS. Nearly two decades in operation. This is where Milton is tested with real trainers, real clients, and real stakes — every week.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
              gap: mobile ? 16 : 24,
              marginBottom: mobile ? 24 : 36,
            }}>
              <div style={{
                borderRadius: mobile ? 14 : 18,
                overflow: 'hidden',
                height: mobile ? 180 : 260,
              }}>
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%2835%29-RRDktgFJFs3AzS1PJRRlyKXvH42KxF.png"
                  alt="Optimal Performance gym exterior"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: mobile ? 10 : 12,
              }}>
                {[
                  { num: "~20", label: "Years in operation" },
                  { num: "6", label: "Trainers on roster" },
                  { num: "4", label: "Pillar framework" },
                  { num: "∞", label: "Spreadsheets killed" },
                ].map((s, i) => (
                  <div key={i} style={{
                    background: colors.bg,
                    border: `1px solid ${colors.line}`,
                    borderRadius: mobile ? 12 : 14,
                    padding: mobile ? 16 : 20,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}>
                    <div style={{
                      fontFamily: fonts.sans,
                      fontSize: mobile ? 26 : 32,
                      fontWeight: 700,
                      color: colors.accent,
                      lineHeight: 1,
                    }}>{s.num}</div>
                    <div style={{
                      fontFamily: fonts.sans,
                      fontSize: 11,
                      color: colors.inkMute,
                      marginTop: 6,
                    }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              background: colors.bg,
              border: `1px solid ${colors.line}`,
              borderRadius: mobile ? 14 : 18,
              padding: mobile ? '22px 18px' : '28px 32px',
            }}>
              <div style={{
                fontFamily: fonts.serif,
                fontSize: mobile ? 17 : 20,
                fontStyle: 'italic',
                color: colors.inkSoft,
                lineHeight: 1.5,
                marginBottom: 14,
              }}>
                "I feel like you understand exactly what I'm saying. And then boom — less than a week later, there it is."
              </div>
              <div style={{
                fontFamily: fonts.sans,
                fontSize: 13,
                fontWeight: 600,
                color: colors.inkMute,
              }}>
                Bethany Langston{' '}
                <span style={{ fontWeight: 400 }}>· Owner, Optimal Performance</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ BACKED BY ═══════ */}
        <section style={{
          padding: mobile ? '32px 20px' : '48px 40px',
        }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{
              background: colors.paper,
              border: `1px solid ${colors.line}`,
              borderRadius: mobile ? 14 : 18,
              padding: mobile ? '24px 20px' : '32px 40px',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: fonts.sans,
                fontSize: mobile ? 15 : 18,
                fontWeight: 500,
                color: colors.inkSoft,
              }}>
                Backed by operators and investors in{' '}
                <span style={{ color: colors.ink, fontWeight: 600 }}>fitness</span>,{' '}
                <span style={{ color: colors.ink, fontWeight: 600 }}>healthcare</span>, and{' '}
                <span style={{ color: colors.ink, fontWeight: 600 }}>AI</span>.
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ CLOSING CTA ═══════ */}
        <section style={{
          padding: mobile ? '60px 20px 80px' : '80px 40px 120px',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <h2 style={{
              fontFamily: fonts.serif,
              fontSize: mobile ? 28 : 44,
              fontWeight: 400,
              lineHeight: 1.15,
              color: colors.ink,
              margin: '0 0 16px 0',
            }}>
              The front lines need better tools. We're{' '}
              <span style={{ color: colors.accent, fontStyle: 'italic' }}>building them</span>.
            </h2>

            <p style={{
              fontFamily: fonts.sans,
              fontSize: mobile ? 15 : 17,
              lineHeight: 1.65,
              color: colors.inkSoft,
              maxWidth: 540,
              margin: '0 auto 32px auto',
            }}>
              See how Milton's AI co-pilots help your trainers perform, your fitness director lead, and your business grow.
            </p>

            <div style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
              <a href="#" style={{
                fontFamily: fonts.sans,
                fontSize: 16,
                fontWeight: 600,
                padding: '16px 44px',
                borderRadius: 100,
                border: 'none',
                background: colors.ink,
                color: colors.paper,
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'inline-block',
              }}>AI Consultation</a>
            </div>
          </div>
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
          padding: mobile ? 0 : 20,
        }}>
          <div
            onClick={() => setChatModalOpen(false)}
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
            maxWidth: 400,
            background: colors.paper,
            borderRadius: mobile ? '20px 20px 0 0' : 20,
            boxShadow: '0 24px 64px rgba(11, 22, 40, 0.18)',
            padding: '28px 24px',
          }}>
            <button
              onClick={() => setChatModalOpen(false)}
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
                <path d="M18 6L6 18M6 6l12 12" />
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
                }}
              />
              <div>
                <h3 style={{ fontFamily: fonts.sans, fontSize: 16, fontWeight: 600, color: colors.ink, marginBottom: 4 }}>Talk to a human</h3>
                <p style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.inkMute, margin: 0 }}>
                  Usually replies within a few hours
                </p>
              </div>
            </div>

            <p style={{
              fontFamily: fonts.sans,
              fontSize: 14,
              lineHeight: 1.55,
              color: colors.ink,
              background: colors.bg,
              padding: '14px 16px',
              borderRadius: 12,
              marginBottom: 16,
            }}>
              {"Have questions about Milton? Reach out and a real person will get back to you."}
            </p>

            <a
              href="mailto:milton@getmilton.com"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                width: '100%',
                padding: '14px 20px',
                background: colors.ink,
                color: colors.bg,
                borderRadius: 12,
                fontFamily: fonts.sans,
                fontSize: 15,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Email us
            </a>
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
