import { useState, useEffect, useRef } from 'react'

// Custom hook for responsive breakpoints
function useBreakpoint() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  useEffect(() => {
    const h = () => setW(window.innerWidth)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return { mobile: w < 760, tablet: w >= 760 && w < 1024, desktop: w >= 1024, w }
}

// Intersection Observer hook for reveal animations
function useReveal() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.14 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  
  return { ref, isVisible }
}

// CSS variables as constants
const colors = {
  navy: '#0B1628',
  navySoft: '#13233d',
  teal: '#2BBFAA',
  mint: '#9AF198',
  cream: '#F7F4ED',
  creamDim: '#d9d4c7',
  ink: '#0B1628',
  inkSoft: '#39414f',
  tealDeep: '#0E8C7A',
}

const fonts = {
  display: "'Archivo', 'Archivo Black', sans-serif",
  sans: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  mono: "'JetBrains Mono', monospace",
}

// Header Component
function Header({ mobile }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  return (
    <>
      <style>{`
        .header-nav-link {
          transition: color 0.2s ease;
        }
        .header-nav-link:hover {
          color: ${colors.teal} !important;
        }
        .header-cta-btn {
          transition: background 0.2s ease, transform 0.15s ease;
        }
        .header-cta-btn:hover {
          background: #0a1220 !important;
          transform: translateY(-1px);
        }
        .header-mobile-link {
          transition: background 0.2s ease, color 0.2s ease;
        }
        .header-mobile-link:hover {
          background: rgba(43, 191, 170, 0.08);
          color: ${colors.teal} !important;
        }
        .header-mobile-cta:hover {
          background: #0a1220 !important;
        }
      `}</style>
      
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'rgba(11, 22, 40, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: mobile ? '16px 20px' : '18px 40px',
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
          }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${colors.teal}, ${colors.mint})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{
                fontFamily: fonts.display,
                fontWeight: 900,
                fontSize: 18,
                color: colors.navy,
              }}>M</span>
            </div>
            <span style={{
              fontFamily: fonts.display,
              fontWeight: 800,
              fontStretch: '125%',
              fontSize: 20,
              color: '#fff',
              letterSpacing: '-0.01em',
            }}>Milton</span>
          </a>

          {/* Desktop Navigation */}
          {!mobile && (
            <nav style={{
              display: 'flex',
              alignItems: 'center',
              gap: 32,
            }}>
              <a href="/for-coaches" className="header-nav-link" style={{
                fontFamily: fonts.sans,
                fontSize: 14,
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.7)',
                textDecoration: 'none',
              }}>For Coaches</a>
              <a href="/for-gyms" className="header-nav-link" style={{
                fontFamily: fonts.sans,
                fontSize: 14,
                fontWeight: 500,
                color: colors.teal,
                textDecoration: 'none',
              }}>For Gym Owners</a>
              <a href="/insights" className="header-nav-link" style={{
                fontFamily: fonts.sans,
                fontSize: 14,
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.7)',
                textDecoration: 'none',
              }}>Insights</a>
            </nav>
          )}

          {/* Desktop CTA */}
          {!mobile && (
            <a
              href="#book-demo"
              className="header-cta-btn"
              style={{
                fontFamily: fonts.sans,
                fontSize: 14,
                fontWeight: 600,
                color: '#fff',
                background: colors.navy,
                border: `1px solid rgba(43, 191, 170, 0.3)`,
                borderRadius: 100,
                padding: '10px 24px',
                textDecoration: 'none',
              }}
            >
              Book a Demo
            </a>
          )}

          {/* Mobile Menu Button */}
          {mobile && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                padding: 8,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
              }}
            >
              <span style={{
                width: 22,
                height: 2,
                background: '#fff',
                borderRadius: 1,
                transition: 'transform 0.2s ease',
                transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
              }} />
              <span style={{
                width: 22,
                height: 2,
                background: '#fff',
                borderRadius: 1,
                opacity: mobileMenuOpen ? 0 : 1,
                transition: 'opacity 0.2s ease',
              }} />
              <span style={{
                width: 22,
                height: 2,
                background: '#fff',
                borderRadius: 1,
                transition: 'transform 0.2s ease',
                transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
              }} />
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {mobile && mobileMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(11, 22, 40, 0.98)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            padding: '20px',
          }}>
            <nav style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}>
              <a href="/for-coaches" onClick={() => setMobileMenuOpen(false)} className="header-mobile-link" style={{
                fontFamily: fonts.sans,
                fontSize: 16,
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.7)',
                textDecoration: 'none',
                padding: '12px 16px',
                borderRadius: 8,
              }}>For Coaches</a>
              <a href="/for-gyms" onClick={() => setMobileMenuOpen(false)} className="header-mobile-link" style={{
                fontFamily: fonts.sans,
                fontSize: 16,
                fontWeight: 500,
                color: colors.teal,
                textDecoration: 'none',
                padding: '12px 16px',
                borderRadius: 8,
              }}>For Gym Owners</a>
              <a href="/insights" onClick={() => setMobileMenuOpen(false)} className="header-mobile-link" style={{
                fontFamily: fonts.sans,
                fontSize: 16,
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.7)',
                textDecoration: 'none',
                padding: '12px 16px',
                borderRadius: 8,
              }}>Insights</a>
              <div style={{ height: 12 }} />
              <a
                href="#book-demo"
                onClick={() => setMobileMenuOpen(false)}
                className="header-mobile-cta"
                style={{
                  fontFamily: fonts.sans,
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#fff',
                  background: colors.navy,
                  border: `1px solid rgba(43, 191, 170, 0.3)`,
                  borderRadius: 100,
                  padding: '14px 24px',
                  textDecoration: 'none',
                  textAlign: 'center',
                }}
              >
                Book a Demo
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}

// Footer Component
function Footer({ mobile }) {
  return (
    <footer style={{
      background: colors.navy,
      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      padding: mobile ? '48px 20px 32px' : '64px 40px 40px',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: mobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: mobile ? 'flex-start' : 'flex-start',
          gap: mobile ? 40 : 60,
          marginBottom: mobile ? 40 : 48,
        }}>
          {/* Brand */}
          <div style={{ maxWidth: 280 }}>
            <a href="/" style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
              marginBottom: 16,
            }}>
              <div style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${colors.teal}, ${colors.mint})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{
                  fontFamily: fonts.display,
                  fontWeight: 900,
                  fontSize: 16,
                  color: colors.navy,
                }}>M</span>
              </div>
              <span style={{
                fontFamily: fonts.display,
                fontWeight: 800,
                fontStretch: '125%',
                fontSize: 18,
                color: '#fff',
                letterSpacing: '-0.01em',
              }}>Milton</span>
            </a>
            <p style={{
              fontFamily: fonts.sans,
              fontSize: 14,
              lineHeight: 1.6,
              color: 'rgba(255, 255, 255, 0.5)',
            }}>
              AI-powered coaching that helps gyms increase revenue per member without adding staff.
            </p>
          </div>

          {/* Links */}
          <div style={{
            display: 'flex',
            gap: mobile ? 48 : 80,
          }}>
            <div>
              <h4 style={{
                fontFamily: fonts.mono,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: colors.teal,
                marginBottom: 16,
              }}>Product</h4>
              <nav style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}>
                <a href="/for-coaches" style={{
                  fontFamily: fonts.sans,
                  fontSize: 14,
                  color: 'rgba(255, 255, 255, 0.6)',
                  textDecoration: 'none',
                }}>For Coaches</a>
                <a href="/for-gyms" style={{
                  fontFamily: fonts.sans,
                  fontSize: 14,
                  color: 'rgba(255, 255, 255, 0.6)',
                  textDecoration: 'none',
                }}>For Gym Owners</a>
                <a href="/insights" style={{
                  fontFamily: fonts.sans,
                  fontSize: 14,
                  color: 'rgba(255, 255, 255, 0.6)',
                  textDecoration: 'none',
                }}>Insights</a>
              </nav>
            </div>
            <div>
              <h4 style={{
                fontFamily: fonts.mono,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: colors.teal,
                marginBottom: 16,
              }}>Company</h4>
              <nav style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}>
                <a href="/about" style={{
                  fontFamily: fonts.sans,
                  fontSize: 14,
                  color: 'rgba(255, 255, 255, 0.6)',
                  textDecoration: 'none',
                }}>About</a>
                <a href="/privacy" style={{
                  fontFamily: fonts.sans,
                  fontSize: 14,
                  color: 'rgba(255, 255, 255, 0.6)',
                  textDecoration: 'none',
                }}>Privacy</a>
                <a href="/terms" style={{
                  fontFamily: fonts.sans,
                  fontSize: 14,
                  color: 'rgba(255, 255, 255, 0.6)',
                  textDecoration: 'none',
                }}>Terms</a>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: 24,
          display: 'flex',
          flexDirection: mobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: mobile ? 'flex-start' : 'center',
          gap: 16,
        }}>
          <p style={{
            fontFamily: fonts.sans,
            fontSize: 13,
            color: 'rgba(255, 255, 255, 0.4)',
          }}>
            © 2025 Milton AI. All rights reserved.
          </p>
          <p style={{
            fontFamily: fonts.display,
            fontWeight: 800,
            fontStretch: '125%',
            fontSize: 13,
            color: 'rgba(255, 255, 255, 0.5)',
          }}>
            Still the coach. Just with superpowers.
          </p>
        </div>
      </div>
    </footer>
  )
}

// Pain Point Card Component
function PainCard({ icon, title, description, mobile }) {
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.06)',
      borderRadius: 16,
      padding: mobile ? '24px 20px' : '28px 24px',
    }}>
      <div style={{
        width: 48,
        height: 48,
        borderRadius: 12,
        background: 'rgba(43, 191, 170, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        fontSize: 24,
      }}>
        {icon}
      </div>
      <h3 style={{
        fontFamily: fonts.display,
        fontWeight: 800,
        fontStretch: '125%',
        fontSize: mobile ? 18 : 20,
        color: '#fff',
        marginBottom: 8,
        lineHeight: 1.1,
      }}>{title}</h3>
      <p style={{
        fontFamily: fonts.sans,
        fontSize: 14,
        lineHeight: 1.6,
        color: 'rgba(255, 255, 255, 0.6)',
      }}>{description}</p>
    </div>
  )
}

// How Milton Helps Card Component
function HelpCard({ number, title, description, highlight, mobile }) {
  return (
    <div style={{
      background: colors.cream,
      borderRadius: 20,
      padding: mobile ? '28px 24px' : '32px 28px',
      height: '100%',
    }}>
      <span style={{
        fontFamily: fonts.mono,
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: '0.15em',
        color: colors.teal,
        marginBottom: 16,
        display: 'block',
      }}>{number}</span>
      <h3 style={{
        fontFamily: fonts.display,
        fontWeight: 800,
        fontStretch: '125%',
        fontSize: mobile ? 22 : 26,
        color: colors.ink,
        marginBottom: 12,
        lineHeight: 1.1,
      }}>{title}</h3>
      <p style={{
        fontFamily: fonts.sans,
        fontSize: 15,
        lineHeight: 1.6,
        color: colors.inkSoft,
        marginBottom: 16,
      }}>{description}</p>
      <p style={{
        fontFamily: fonts.sans,
        fontSize: 14,
        fontWeight: 600,
        color: colors.tealDeep,
      }}>{highlight}</p>
    </div>
  )
}

// Risk Free Card Component
function RiskCard({ icon, title, description, mobile }) {
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.04)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: 16,
      padding: mobile ? '24px 20px' : '28px 24px',
      textAlign: 'center',
    }}>
      <div style={{
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: 'rgba(43, 191, 170, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 16px',
        fontSize: 28,
      }}>
        {icon}
      </div>
      <h3 style={{
        fontFamily: fonts.display,
        fontWeight: 800,
        fontStretch: '125%',
        fontSize: mobile ? 18 : 20,
        color: '#fff',
        marginBottom: 8,
        lineHeight: 1.1,
      }}>{title}</h3>
      <p style={{
        fontFamily: fonts.sans,
        fontSize: 14,
        lineHeight: 1.6,
        color: 'rgba(255, 255, 255, 0.6)',
      }}>{description}</p>
    </div>
  )
}

export default function ForGymsPage() {
  const { mobile } = useBreakpoint()
  
  // Load Calendly script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])
  
  const heroReveal = useReveal()
  const painReveal = useReveal()
  const helpReveal = useReveal()
  const stillReveal = useReveal()
  const groupReveal = useReveal()
  const riskReveal = useReveal()
  const ctaReveal = useReveal()
  
  return (
    <div style={{
      background: colors.navy,
      minHeight: '100vh',
    }}>
      <style>{`
        .cta-primary {
          transition: background 0.2s ease, transform 0.15s ease;
        }
        .cta-primary:hover {
          background: ${colors.tealDeep} !important;
          transform: translateY(-2px);
        }
        .cta-secondary {
          transition: border-color 0.2s ease, color 0.2s ease;
        }
        .cta-secondary:hover {
          border-color: ${colors.teal} !important;
          color: ${colors.teal} !important;
        }
      `}</style>
      
      <Header mobile={mobile} />
      
      {/* Hero Section */}
      <section
        ref={heroReveal.ref}
        style={{
          paddingTop: mobile ? 120 : 160,
          paddingBottom: mobile ? 60 : 100,
          paddingLeft: mobile ? 20 : 40,
          paddingRight: mobile ? 20 : 40,
          opacity: heroReveal.isVisible ? 1 : 0,
          transform: heroReveal.isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        <div style={{
          maxWidth: 900,
          margin: '0 auto',
          textAlign: 'center',
        }}>
          <span style={{
            fontFamily: fonts.mono,
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: colors.teal,
            marginBottom: 24,
            display: 'block',
          }}>For Gym Owners</span>
          
          <h1 style={{
            fontFamily: fonts.display,
            fontWeight: 900,
            fontStretch: '125%',
            fontSize: mobile ? 36 : 64,
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            color: '#fff',
            marginBottom: 24,
          }}>
            Run your whole gym<br />
            <span style={{ color: colors.teal }}>by just talking.</span>
          </h1>
          
          <p style={{
            fontFamily: fonts.sans,
            fontSize: mobile ? 17 : 20,
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: 600,
            margin: '0 auto 40px',
          }}>
            Milton is the AI assistant that handles scheduling, member communication, and coaching support - so you can focus on what matters.
          </p>
          
          <div style={{
            display: 'flex',
            flexDirection: mobile ? 'column' : 'row',
            gap: 16,
            justifyContent: 'center',
          }}>
            <a
              href="#book-demo"
              className="cta-primary"
              style={{
                fontFamily: fonts.sans,
                fontSize: 15,
                fontWeight: 600,
                color: colors.navy,
                background: colors.teal,
                borderRadius: 100,
                padding: '16px 32px',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Book a Demo
            </a>
            <a
              href="/for-coaches"
              className="cta-secondary"
              style={{
                fontFamily: fonts.sans,
                fontSize: 15,
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.7)',
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 100,
                padding: '16px 32px',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              For Coaches
            </a>
          </div>
        </div>
      </section>
      
      {/* Pain Points Section */}
      <section
        ref={painReveal.ref}
        style={{
          padding: mobile ? '60px 20px' : '100px 40px',
          background: 'rgba(0, 0, 0, 0.2)',
          opacity: painReveal.isVisible ? 1 : 0,
          transform: painReveal.isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
        }}
      >
        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
        }}>
          <div style={{ textAlign: 'center', marginBottom: mobile ? 40 : 56 }}>
            <span style={{
              fontFamily: fonts.mono,
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: colors.teal,
              marginBottom: 16,
              display: 'block',
            }}>The Problem</span>
            <h2 style={{
              fontFamily: fonts.display,
              fontWeight: 900,
              fontStretch: '125%',
              fontSize: mobile ? 28 : 44,
              lineHeight: 1.05,
              color: '#fff',
            }}>
              Sound familiar?
            </h2>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)',
            gap: mobile ? 16 : 24,
          }}>
            <PainCard
              mobile={mobile}
              icon="📱"
              title="Drowning in messages"
              description="Members texting at all hours. Questions about schedules, billing, class times. You're always on."
            />
            <PainCard
              mobile={mobile}
              icon="📋"
              title="Manual everything"
              description="Scheduling, check-ins, program updates. Hours of admin work that doesn't grow the business."
            />
            <PainCard
              mobile={mobile}
              icon="💸"
              title="Leaving money on the table"
              description="Members who could upgrade, PT sessions going unsold, retention issues you catch too late."
            />
          </div>
        </div>
      </section>
      
      {/* How Milton Helps Section */}
      <section
        ref={helpReveal.ref}
        style={{
          padding: mobile ? '60px 20px' : '100px 40px',
          opacity: helpReveal.isVisible ? 1 : 0,
          transform: helpReveal.isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
        }}
      >
        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
        }}>
          <div style={{ textAlign: 'center', marginBottom: mobile ? 40 : 56 }}>
            <span style={{
              fontFamily: fonts.mono,
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: colors.teal,
              marginBottom: 16,
              display: 'block',
            }}>How Milton Helps</span>
            <h2 style={{
              fontFamily: fonts.display,
              fontWeight: 900,
              fontStretch: '125%',
              fontSize: mobile ? 28 : 44,
              lineHeight: 1.05,
              color: '#fff',
            }}>
              Three ways to make more per member
            </h2>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)',
            gap: mobile ? 16 : 24,
          }}>
            <HelpCard
              mobile={mobile}
              number="01"
              title="24/7 member support"
              description="Milton answers questions, handles scheduling, and manages communication - instantly, any time."
              highlight="→ Save 15+ hours per week"
            />
            <HelpCard
              mobile={mobile}
              number="02"
              title="Smart upsell detection"
              description="Milton identifies members ready for PT, nutrition coaching, or premium plans - and warms them up."
              highlight="→ 23% increase in upgrades"
            />
            <HelpCard
              mobile={mobile}
              number="03"
              title="Retention radar"
              description="Spot at-risk members before they cancel. Milton flags engagement drops and suggests interventions."
              highlight="→ 31% reduction in churn"
            />
          </div>
        </div>
      </section>
      
      {/* Still The Coach Section */}
      <section
        ref={stillReveal.ref}
        style={{
          padding: mobile ? '60px 20px' : '100px 40px',
          background: colors.cream,
          opacity: stillReveal.isVisible ? 1 : 0,
          transform: stillReveal.isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
        }}
      >
        <div style={{
          maxWidth: 800,
          margin: '0 auto',
          textAlign: 'center',
        }}>
          <span style={{
            fontFamily: fonts.mono,
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: colors.tealDeep,
            marginBottom: 16,
            display: 'block',
          }}>Your Gym, Your Way</span>
          
          <h2 style={{
            fontFamily: fonts.display,
            fontWeight: 900,
            fontStretch: '125%',
            fontSize: mobile ? 32 : 48,
            lineHeight: 1.05,
            color: colors.ink,
            marginBottom: 24,
          }}>
            Still the coach.<br />
            <span style={{ color: colors.tealDeep }}>Just with superpowers.</span>
          </h2>
          
          <p style={{
            fontFamily: fonts.sans,
            fontSize: mobile ? 16 : 18,
            lineHeight: 1.7,
            color: colors.inkSoft,
            maxWidth: 600,
            margin: '0 auto 32px',
          }}>
            Milton learns your coaching philosophy, your gym&apos;s voice, your way of doing things. 
            It&apos;s not a replacement - it&apos;s an amplifier. Every interaction still feels like you, 
            just available 24/7.
          </p>
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(14, 140, 122, 0.1)',
            borderRadius: 100,
            padding: '12px 20px',
          }}>
            <span style={{ fontSize: 20 }}>✓</span>
            <span style={{
              fontFamily: fonts.sans,
              fontSize: 14,
              fontWeight: 600,
              color: colors.tealDeep,
            }}>Milton learns your voice in 48 hours</span>
          </div>
        </div>
      </section>
      
      {/* Group Fitness Section */}
      <section
        ref={groupReveal.ref}
        style={{
          padding: mobile ? '60px 20px' : '100px 40px',
          opacity: groupReveal.isVisible ? 1 : 0,
          transform: groupReveal.isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
        }}
      >
        <div style={{
          maxWidth: 1000,
          margin: '0 auto',
          display: 'flex',
          flexDirection: mobile ? 'column' : 'row',
          alignItems: 'center',
          gap: mobile ? 40 : 80,
        }}>
          <div style={{ flex: 1 }}>
            <span style={{
              fontFamily: fonts.mono,
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: colors.teal,
              marginBottom: 16,
              display: 'block',
            }}>Perfect For</span>
            
            <h2 style={{
              fontFamily: fonts.display,
              fontWeight: 900,
              fontStretch: '125%',
              fontSize: mobile ? 28 : 40,
              lineHeight: 1.05,
              color: '#fff',
              marginBottom: 20,
            }}>
              Group fitness facilities
            </h2>
            
            <p style={{
              fontFamily: fonts.sans,
              fontSize: mobile ? 16 : 17,
              lineHeight: 1.7,
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: 24,
            }}>
              CrossFit boxes, boutique studios, F45s, OrangeTheory locations - 
              any gym where community matters and personal touch drives retention.
            </p>
            
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}>
              {['Handles class bookings and waitlists', 'Sends personalized workout recaps', 'Manages billing questions automatically', 'Coordinates coach schedules'].map((item, i) => (
                <li key={i} style={{
                  fontFamily: fonts.sans,
                  fontSize: 15,
                  color: 'rgba(255, 255, 255, 0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}>
                  <span style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: 'rgba(43, 191, 170, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    color: colors.teal,
                  }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div style={{
            flex: 1,
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 24,
            padding: mobile ? 24 : 32,
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 20,
            }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${colors.teal}, ${colors.mint})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{
                  fontFamily: fonts.display,
                  fontWeight: 900,
                  fontSize: 18,
                  color: colors.navy,
                }}>M</span>
              </div>
              <div>
                <p style={{
                  fontFamily: fonts.sans,
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#fff',
                }}>Milton</p>
                <p style={{
                  fontFamily: fonts.sans,
                  fontSize: 12,
                  color: 'rgba(255, 255, 255, 0.5)',
                }}>Just now</p>
              </div>
            </div>
            <div style={{
              background: 'rgba(43, 191, 170, 0.1)',
              borderRadius: 16,
              borderTopLeftRadius: 4,
              padding: '16px 20px',
            }}>
              <p style={{
                fontFamily: fonts.sans,
                fontSize: 15,
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.9)',
              }}>
                &quot;Hey Sarah! Great work in today&apos;s 6am class - you hit a new PR on your clean! 
                I noticed you&apos;ve been crushing it lately. Want me to book you into Coach Mike&apos;s 
                Oly lifting clinic next Saturday? Only 2 spots left.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Risk Free Section */}
      <section
        ref={riskReveal.ref}
        style={{
          padding: mobile ? '60px 20px' : '100px 40px',
          background: 'rgba(0, 0, 0, 0.2)',
          opacity: riskReveal.isVisible ? 1 : 0,
          transform: riskReveal.isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
        }}
      >
        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
        }}>
          <div style={{ textAlign: 'center', marginBottom: mobile ? 40 : 56 }}>
            <span style={{
              fontFamily: fonts.mono,
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: colors.teal,
              marginBottom: 16,
              display: 'block',
            }}>Risk-Free Trial</span>
            <h2 style={{
              fontFamily: fonts.display,
              fontWeight: 900,
              fontStretch: '125%',
              fontSize: mobile ? 28 : 44,
              lineHeight: 1.05,
              color: '#fff',
            }}>
              Try Milton free for 30 days
            </h2>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)',
            gap: mobile ? 16 : 24,
          }}>
            <RiskCard
              mobile={mobile}
              icon="🚀"
              title="Live in 48 hours"
              description="We'll have Milton trained on your gym's voice and ready to go in two days."
            />
            <RiskCard
              mobile={mobile}
              icon="💳"
              title="No credit card required"
              description="Start your trial without any payment info. No surprise charges."
            />
            <RiskCard
              mobile={mobile}
              icon="🤝"
              title="White-glove setup"
              description="Our team handles everything. You just tell us how you coach."
            />
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section
        id="book-demo"
        ref={ctaReveal.ref}
        style={{
          padding: mobile ? '80px 20px' : '120px 40px',
          opacity: ctaReveal.isVisible ? 1 : 0,
          transform: ctaReveal.isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
        }}
      >
        <div style={{
          maxWidth: 700,
          margin: '0 auto',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontFamily: fonts.display,
            fontWeight: 900,
            fontStretch: '125%',
            fontSize: mobile ? 32 : 48,
            lineHeight: 1.05,
            color: '#fff',
            marginBottom: 20,
          }}>
            Ready to scale your gym<br />
            <span style={{ color: colors.teal }}>without the headcount?</span>
          </h2>
          
          <p style={{
            fontFamily: fonts.sans,
            fontSize: mobile ? 16 : 18,
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: 500,
            margin: '0 auto 40px',
          }}>
            Book a 15-minute call. We&apos;ll show you exactly how Milton 
            can work for your gym - no pressure, no pitch deck.
          </p>
          
          {/* Calendly Embed */}
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/migueljohns/quick-intro?hide_gdpr_banner=1&primary_color=2bbfaa"
            style={{
              minWidth: 320,
              height: 700,
              borderRadius: 16,
              overflow: 'hidden',
            }}
          />
        </div>
      </section>
      
      <Footer mobile={mobile} />
    </div>
  )
}
