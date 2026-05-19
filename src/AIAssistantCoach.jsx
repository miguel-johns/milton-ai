import { useState, useEffect } from 'react'
import Footer from './components/Footer'

// Design tokens matching Milton dark design system
const colors = {
  bg: '#061c27',
  bgDeep: '#051722',
  paper: '#0a2a3a',
  ink: '#ffffff',
  inkSoft: 'rgba(255, 255, 255, 0.7)',
  inkMute: 'rgba(255, 255, 255, 0.5)',
  line: 'rgba(13, 154, 165, 0.2)',
  lineSoft: 'rgba(13, 154, 165, 0.1)',
  accent: '#0d9aa5',
  accentLight: '#2BBFAA',
  accentSoft: 'rgba(13, 154, 165, 0.15)',
  mint: '#9af198',
  mintSoft: 'rgba(154, 241, 152, 0.15)',
}

const fonts = {
  serif: "'Cormorant Garamond', Georgia, serif",
  sans: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
}

const logoImage = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Milton%20Face%20Logo-whMWzOXBgBgulGUqdRthSEMsjeyWPe.png"
const STRIPE_URL = "https://buy.stripe.com/8x2eVe0mT1bT6nueDUeUU0X"
const CALENDLY_URL = "https://calendly.com/miguel-getmilton/30min"

function CTA({ children, variant = "primary", style: s = {}, href, onClick }) {
  const base = {
    fontFamily: fonts.sans,
    fontSize: 15,
    fontWeight: 600,
    padding: "14px 32px",
    borderRadius: 100,
    cursor: "pointer",
    transition: "all 0.25s ease",
    textDecoration: "none",
    display: "inline-block",
    letterSpacing: 0.3,
    whiteSpace: "nowrap",
  }
  const styles = variant === "primary"
    ? { ...base, background: "#fff", color: "#08455e", border: "none", ...s }
    : { ...base, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", ...s }
  if (href) {
    return <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} style={styles}>{children}</a>
  }
  return <button style={styles} onClick={onClick}>{children}</button>
}

function FeatureCard({ number, label, title, body, children, mobile }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: mobile ? 24 : 32,
    }}>
      {/* Label */}
      <div style={{
        fontFamily: fonts.sans,
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: colors.accent,
      }}>
        {label}
      </div>
      
      {/* Content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
        gap: mobile ? 32 : 64,
        alignItems: 'center',
      }}>
        {/* Text side */}
        <div>
          <h2 style={{
            fontFamily: fonts.serif,
            fontSize: mobile ? 28 : 36,
            lineHeight: 1.15,
            fontWeight: 500,
            color: colors.ink,
            marginBottom: 16,
          }}>
            {title}
          </h2>
          <p style={{
            fontFamily: fonts.sans,
            fontSize: mobile ? 15 : 16,
            lineHeight: 1.7,
            color: colors.inkSoft,
          }}>
            {body}
          </p>
        </div>
        
        {/* Media side */}
        <div style={{
          background: colors.paper,
          border: `1px solid ${colors.line}`,
          borderRadius: 16,
          padding: mobile ? 20 : 32,
          minHeight: mobile ? 200 : 280,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {children || (
            <div style={{
              width: '100%',
              height: '100%',
              background: `linear-gradient(135deg, ${colors.accentSoft}, ${colors.mintSoft})`,
              borderRadius: 12,
              minHeight: mobile ? 160 : 200,
            }} />
          )}
        </div>
      </div>
    </div>
  )
}

export default function AIAssistantCoach() {
  const [mobile, setMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => setMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Feature sections data from the provided content
  const features = [
    {
      number: '01',
      label: '01 / Methodology',
      title: 'An AI assistant coach learns your methodologies, protocols, and guides so it can coach exactly like you.',
      body: 'Upload how you do it. Milton learns the way you write programs, the way you talk to clients, the standards you hold. From then on, what it produces sounds like you.',
    },
    {
      number: '02',
      label: '02 / Memory',
      title: 'An AI assistant coach holds all your client history in its memory so you don\'t have to hold it in yours.',
      body: 'Every session, every check-in, every injury, every PR. You walk in already knowing where they left off.',
    },
    {
      number: '03',
      label: '03 / Programs & meals',
      title: 'An AI assistant coach helps you create custom workouts for your clients and makes it easy to track meals, so their plan is always evolving and getting results.',
      body: 'Ask for a program. Ask for a meal plan. Ask for an adjustment. Faster than opening a spreadsheet, and built on your methodology, not a template.',
    },
    {
      number: '04',
      label: '04 / Attention',
      title: 'An AI assistant coach surfaces the important information that needs your attention so you don\'t waste time digging around to hold clients accountable.',
      body: 'Open Milton and it tells you who needs a check-in, who missed a session, and who\'s about to fall off. No digging. No guessing.',
    },
    {
      number: '05',
      label: '05 / Story',
      title: 'An AI assistant coach helps you tell a story about your client\'s progress so you can keep them motivated and showing up.',
      body: 'It pulls the numbers, the trends, the wins, and gives you the words. Every check-in feels like progress, not paperwork.',
    },
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.bg,
      fontFamily: fonts.sans,
      color: colors.ink,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <header style={{
        padding: mobile ? '16px 20px' : '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        background: 'rgba(6, 28, 39, 0.95)',
        backdropFilter: 'blur(20px)',
        zIndex: 100,
        borderBottom: `1px solid ${colors.lineSoft}`,
      }}>
        <a href="/" style={{
          fontFamily: fonts.sans,
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: 2,
          color: colors.ink,
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}>
          <img 
            src={logoImage}
            alt="Milton"
            style={{
              width: mobile ? 36 : 44,
              height: mobile ? 36 : 44,
              borderRadius: 8,
              objectFit: 'cover',
            }}
          />
          <span>MILTON</span>
        </a>

        {/* Desktop Nav */}
        {!mobile && (
          <nav style={{
            display: 'flex',
            gap: 32,
            fontSize: 14,
            color: colors.inkSoft,
            alignItems: 'center',
          }}>
            <a href="/coaches" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>For Coaches</a>
            <a href="/gyms" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>For Gyms</a>
            <a href="/ai-assistant-coach" style={{ color: colors.ink, textDecoration: 'none', fontWeight: 600 }}>Your AI Assistant Coach</a>
            <a href="/insights" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Insights</a>
            <a href="/about" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>About</a>
            <CTA href={STRIPE_URL}>Start free trial</CTA>
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
              background: 'transparent',
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
      {mobileMenuOpen && (
        <>
          <div 
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(4px)',
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
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
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
            <a href="/ai-assistant-coach" onClick={() => setMobileMenuOpen(false)} style={{
              display: 'block',
              padding: '14px 16px',
              fontSize: 16,
              fontWeight: 600,
              color: colors.accent,
              textDecoration: 'none',
              borderRadius: 10,
              background: colors.accentSoft,
            }}>Your AI Assistant Coach</a>
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
            <a href={STRIPE_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} style={{
              display: 'block',
              padding: '14px 16px',
              fontSize: 16,
              fontWeight: 600,
              color: colors.bg,
              textDecoration: 'none',
              borderRadius: 10,
              background: '#fff',
              textAlign: 'center',
              marginTop: 6,
            }}>Start free trial</a>
          </div>
        </>
      )}

      <main>
        {/* Hero Section */}
        <section style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(13, 154, 165, 0.15), transparent 60%),
            radial-gradient(ellipse 60% 40% at 100% 100%, rgba(154, 241, 152, 0.1), transparent 50%),
            ${colors.bg}
          `,
          padding: mobile ? '64px 20px 48px' : '100px 40px 80px',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            {/* Eyebrow */}
            <div style={{
              fontFamily: fonts.sans,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: colors.accent,
              marginBottom: 24,
            }}>
              For coaches
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: fonts.serif,
              fontSize: mobile ? 38 : 56,
              lineHeight: 1.1,
              fontWeight: 500,
              color: colors.ink,
              marginBottom: 24,
              letterSpacing: '-0.02em',
            }}>
              What it&apos;s like having an AI assistant coach.
            </h1>

            {/* Sub */}
            <p style={{
              fontFamily: fonts.sans,
              fontSize: mobile ? 17 : 20,
              lineHeight: 1.6,
              color: colors.inkSoft,
              maxWidth: 600,
              margin: '0 auto 40px',
            }}>
              It learns how you coach. Then it does the rest.
            </p>

            {/* CTAs */}
            <div style={{
              display: 'flex',
              flexDirection: mobile ? 'column' : 'row',
              gap: 16,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <CTA href={STRIPE_URL}>Start free trial</CTA>
              <CTA variant="secondary" href={CALENDLY_URL}>Book a call</CTA>
            </div>
          </div>

          {/* Hero media placeholder */}
          <div style={{
            maxWidth: 1000,
            margin: '64px auto 0',
            background: colors.paper,
            border: `1px solid ${colors.line}`,
            borderRadius: 20,
            padding: mobile ? 24 : 48,
            minHeight: mobile ? 200 : 400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              background: `linear-gradient(135deg, ${colors.accentSoft}, ${colors.mintSoft})`,
              borderRadius: 12,
              minHeight: mobile ? 160 : 320,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.inkMute,
              fontFamily: fonts.sans,
              fontSize: 14,
            }}>
              Hero media
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section style={{
          padding: mobile ? '64px 20px' : '100px 40px',
          textAlign: 'center',
          borderTop: `1px solid ${colors.lineSoft}`,
        }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            {/* Eyebrow */}
            <div style={{
              fontFamily: fonts.sans,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: colors.mint,
              marginBottom: 24,
            }}>
              What changes
            </div>

            {/* Headline */}
            <h2 style={{
              fontFamily: fonts.serif,
              fontSize: mobile ? 32 : 44,
              lineHeight: 1.15,
              fontWeight: 500,
              color: colors.ink,
              marginBottom: 20,
            }}>
              It does the parts that drain you. You do the parts that matter.
            </h2>

            {/* Sub */}
            <p style={{
              fontFamily: fonts.sans,
              fontSize: mobile ? 16 : 18,
              lineHeight: 1.65,
              color: colors.inkSoft,
            }}>
              Here&apos;s what&apos;s different the day Milton joins your practice.
            </p>
          </div>
        </section>

        {/* Feature Sections */}
        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: mobile ? '0 20px 64px' : '0 40px 100px',
        }}>
          {features.map((feature, idx) => (
            <section 
              key={idx}
              style={{
                padding: mobile ? '48px 0' : '72px 0',
                borderTop: idx === 0 ? 'none' : `1px solid ${colors.lineSoft}`,
              }}
            >
              <FeatureCard
                number={feature.number}
                label={feature.label}
                title={feature.title}
                body={feature.body}
                mobile={mobile}
              >
                {/* Mockup content based on feature */}
                {idx === 0 && (
                  <MethodologyMockup mobile={mobile} />
                )}
                {idx === 1 && (
                  <MemoryMockup mobile={mobile} />
                )}
                {idx === 2 && (
                  <ProgramMockup mobile={mobile} />
                )}
                {idx === 3 && (
                  <AttentionMockup mobile={mobile} />
                )}
                {idx === 4 && (
                  <StoryMockup mobile={mobile} />
                )}
              </FeatureCard>
            </section>
          ))}
        </div>

        {/* Final CTA Section */}
        <section style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 100%, rgba(13, 154, 165, 0.15), transparent 60%),
            ${colors.bgDeep}
          `,
          padding: mobile ? '64px 20px 80px' : '100px 40px 120px',
          textAlign: 'center',
          borderTop: `1px solid ${colors.lineSoft}`,
        }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            {/* Eyebrow */}
            <div style={{
              fontFamily: fonts.sans,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: colors.mint,
              marginBottom: 24,
            }}>
              The whole point
            </div>

            {/* Headline */}
            <h2 style={{
              fontFamily: fonts.serif,
              fontSize: mobile ? 32 : 48,
              lineHeight: 1.12,
              fontWeight: 500,
              color: colors.ink,
              marginBottom: 20,
            }}>
              An AI assistant coach makes everything about your coaching job easier.
            </h2>

            {/* Sub */}
            <p style={{
              fontFamily: fonts.sans,
              fontSize: mobile ? 16 : 18,
              lineHeight: 1.65,
              color: colors.inkSoft,
              marginBottom: 40,
            }}>
              The boring parts disappear. The good parts get better. You do more coaching, less admin.
            </p>

            {/* CTAs */}
            <div style={{
              display: 'flex',
              flexDirection: mobile ? 'column' : 'row',
              gap: 16,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <CTA href={STRIPE_URL}>Start free trial</CTA>
              <CTA variant="secondary" href={CALENDLY_URL}>Book a call</CTA>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

// Mockup Components
function MethodologyMockup({ mobile }) {
  const docs = [
    { name: 'Warm-up Protocol.pdf', type: 'PDF' },
    { name: 'Progression Standards.doc', type: 'DOC' },
    { name: 'Client Intake Form.pdf', type: 'PDF' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
      <div style={{
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: colors.accent,
        marginBottom: 4,
      }}>
        Learning your methodology
      </div>
      {docs.map((doc, i) => (
        <div key={i} style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 14px',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: 10,
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: colors.accentSoft,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <path d="M14 2v6h6"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: colors.ink }}>{doc.name}</div>
          </div>
          <span style={{
            fontSize: 10,
            fontWeight: 600,
            padding: '4px 8px',
            borderRadius: 4,
            background: colors.mintSoft,
            color: colors.mint,
          }}>Learned</span>
        </div>
      ))}
    </div>
  )
}

function MemoryMockup({ mobile }) {
  const history = [
    { date: 'Jan 15', note: 'Left knee flared up after squats' },
    { date: 'Feb 3', note: 'PR on deadlift: 315 lbs' },
    { date: 'Feb 20', note: 'Traveling next week, needs hotel workouts' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
      <div style={{
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: colors.accent,
        marginBottom: 4,
      }}>
        Sarah K. — Client history
      </div>
      {history.map((item, i) => (
        <div key={i} style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 12,
          padding: '12px 14px',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: 10,
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <span style={{
            fontSize: 11,
            fontWeight: 600,
            color: colors.inkMute,
            minWidth: 50,
            paddingTop: 2,
          }}>{item.date}</span>
          <p style={{
            fontSize: 14,
            color: colors.inkSoft,
            margin: 0,
            lineHeight: 1.5,
          }}>{item.note}</p>
        </div>
      ))}
    </div>
  )
}

function ProgramMockup({ mobile }) {
  const exercises = [
    { name: 'Barbell Back Squat', sets: '4 x 6' },
    { name: 'Romanian Deadlift', sets: '3 x 10' },
    { name: 'Walking Lunges', sets: '3 x 12/leg' },
    { name: 'Leg Press', sets: '3 x 15' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
      <div style={{
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: colors.accent,
        marginBottom: 4,
      }}>
        Today — Lower body strength
      </div>
      {exercises.map((ex, i) => (
        <div key={i} style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '10px 14px',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: 10,
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <span style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: colors.accent,
            flexShrink: 0,
          }} />
          <span style={{ fontSize: 14, color: colors.ink, flex: 1 }}>{ex.name}</span>
          <span style={{ fontSize: 13, color: colors.inkMute, fontWeight: 500 }}>{ex.sets}</span>
        </div>
      ))}
    </div>
  )
}

function AttentionMockup({ mobile }) {
  const alerts = [
    { client: 'James P.', issue: 'Missed last 2 sessions', priority: 'high' },
    { client: 'Maria G.', issue: 'Check-in due today', priority: 'medium' },
    { client: 'Kyle D.', issue: 'Goal deadline in 5 days', priority: 'low' },
  ]
  const priorityColors = {
    high: { bg: 'rgba(255, 100, 100, 0.1)', color: '#ff8a8a' },
    medium: { bg: 'rgba(255, 200, 50, 0.1)', color: '#f0c832' },
    low: { bg: colors.accentSoft, color: colors.accent },
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
      <div style={{
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: colors.accent,
        marginBottom: 4,
      }}>
        Needs your attention
      </div>
      {alerts.map((alert, i) => (
        <div key={i} style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 14px',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: 10,
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: priorityColors[alert.priority].bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontSize: 14,
            fontWeight: 600,
            color: priorityColors[alert.priority].color,
          }}>
            {alert.client.charAt(0)}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: colors.ink }}>{alert.client}</div>
            <div style={{ fontSize: 12, color: colors.inkMute }}>{alert.issue}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function StoryMockup({ mobile }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
      <div style={{
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: colors.accent,
        marginBottom: 4,
      }}>
        Progress summary for Sarah K.
      </div>
      <div style={{
        padding: '16px',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: 10,
        border: '1px solid rgba(255,255,255,0.06)',
      }}>
        <p style={{
          fontSize: 14,
          color: colors.inkSoft,
          margin: 0,
          lineHeight: 1.7,
          fontStyle: 'italic',
        }}>
          &quot;Sarah, you&apos;ve hit 12 of your last 14 sessions. Your deadlift is up 25 lbs since January, and your body weight is trending exactly where we wanted. This is the consistency that changes everything.&quot;
        </p>
      </div>
      <div style={{
        display: 'flex',
        gap: 12,
      }}>
        <div style={{
          flex: 1,
          padding: '12px 14px',
          background: colors.mintSoft,
          borderRadius: 10,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: colors.mint }}>+25 lbs</div>
          <div style={{ fontSize: 11, color: colors.inkMute, marginTop: 2 }}>Deadlift</div>
        </div>
        <div style={{
          flex: 1,
          padding: '12px 14px',
          background: colors.accentSoft,
          borderRadius: 10,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: colors.accent }}>86%</div>
          <div style={{ fontSize: 11, color: colors.inkMute, marginTop: 2 }}>Attendance</div>
        </div>
      </div>
    </div>
  )
}
