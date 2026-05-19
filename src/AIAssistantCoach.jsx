import { useState, useEffect } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import TestimonialVideos from './components/TestimonialVideos'

// Custom hook for responsive breakpoints (matching NewHomePage)
function useBreakpoint() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  useEffect(() => {
    const h = () => setW(window.innerWidth)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return { mobile: w < 640, tablet: w >= 640 && w < 1024, desktop: w >= 1024, w }
}

// Design tokens matching NewHomePage light theme
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

const STRIPE_URL = "https://buy.stripe.com/8x2eVe0mT1bT6nueDUeUU0X"
const CALENDLY_URL = "https://calendly.com/miguel-getmilton/30min"

function CTA({ children, variant = "primary", style: s = {}, href, onClick }) {
  const base = {
    fontFamily: fonts.sans,
    fontSize: 15,
    fontWeight: 600,
    padding: "14px 32px",
    borderRadius: 10,
    cursor: "pointer",
    transition: "all 0.25s ease",
    textDecoration: "none",
    display: "inline-block",
    letterSpacing: 0.3,
    whiteSpace: "nowrap",
  }
  const styles = variant === "primary"
    ? { ...base, background: colors.ink, color: colors.paper, border: "none", ...s }
    : { ...base, background: "transparent", color: colors.ink, border: `1px solid ${colors.line}`, ...s }
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
      gap: mobile ? 20 : 32,
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
        gap: mobile ? 24 : 64,
        alignItems: 'center',
      }}>
        {/* Text side */}
        <div>
          <h2 style={{
            fontFamily: fonts.serif,
            fontSize: mobile ? 24 : 36,
            lineHeight: 1.2,
            fontWeight: 500,
            color: colors.ink,
            marginBottom: 12,
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
          }}>
            {title}
          </h2>
          <p style={{
            fontFamily: fonts.sans,
            fontSize: mobile ? 14 : 16,
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
          padding: mobile ? 16 : 32,
          minHeight: mobile ? 180 : 280,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        }}>
          {children || (
            <div style={{
              width: '100%',
              height: '100%',
              background: `linear-gradient(135deg, ${colors.accentSoft}, ${colors.mintSoft})`,
              borderRadius: 12,
              minHeight: mobile ? 140 : 200,
            }} />
          )}
        </div>
      </div>
    </div>
  )
}

export default function AIAssistantCoach() {
  const { mobile } = useBreakpoint()
  const [calendlyModalOpen, setCalendlyModalOpen] = useState(false)

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
      title: "An AI assistant coach holds all your client history in its memory so you don't have to hold it in yours.",
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
      title: "An AI assistant coach surfaces the important information that needs your attention so you don't waste time digging around to hold clients accountable.",
      body: "Open Milton and it tells you who needs a check-in, who missed a session, and who's about to fall off. No digging. No guessing.",
    },
    {
      number: '05',
      label: '05 / Story',
      title: "An AI assistant coach helps you tell a story about your client's progress so you can keep them motivated and showing up.",
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
      <Header currentPage="ai-assistant-coach" />

      <main>
        {/* Hero Section */}
        <section style={{
          padding: mobile ? '48px 16px 64px' : '100px 24px 120px',
          maxWidth: 900,
          margin: '0 auto',
          textAlign: 'center',
        }}>
          {/* Eyebrow */}
          <span style={{
            display: 'inline-block',
            fontFamily: fonts.sans,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: colors.accent,
            marginBottom: 20,
          }}>
            For coaches
          </span>

          {/* Headline */}
          <h1 style={{
            fontFamily: fonts.serif,
            fontSize: mobile ? 32 : 56,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            fontWeight: 500,
            marginBottom: 24,
            color: colors.ink,
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
            <CTA variant="secondary" onClick={() => setCalendlyModalOpen(true)}>Book a call</CTA>
          </div>
        </section>

        {/* Hero media */}
        <section style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: mobile ? '0 16px 48px' : '0 24px 100px',
        }}>
          <img 
            src="/images/milton-hero.png"
            alt="Milton AI assistant showing your daily brief with sessions, client appointments, and items needing attention"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: mobile ? 16 : 24,
              display: 'block',
            }}
          />
        </section>

        {/* Testimonial Videos */}
        <TestimonialVideos mobile={mobile} />

        {/* Intro Section */}
        <section style={{
          padding: mobile ? '48px 16px' : '100px 40px',
          textAlign: 'center',
          background: colors.bg2,
        }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
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
              What changes
            </div>

            {/* Headline */}
            <h2 style={{
              fontFamily: fonts.serif,
              fontSize: mobile ? 28 : 44,
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
          padding: mobile ? '0 16px 48px' : '0 40px 100px',
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
          background: colors.bg2,
          padding: mobile ? '48px 16px 64px' : '100px 40px 120px',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
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
              The whole point
            </div>

            {/* Headline */}
            <h2 style={{
              fontFamily: fonts.serif,
              fontSize: mobile ? 28 : 48,
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
              <CTA variant="secondary" onClick={() => setCalendlyModalOpen(true)}>Book a call</CTA>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Calendly Modal */}
      {calendlyModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: mobile ? 16 : 20,
          }}
        >
          <div
            onClick={() => setCalendlyModalOpen(false)}
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
            maxWidth: 700,
            height: mobile ? 'calc(100vh - 32px)' : 750,
            maxHeight: 'calc(100vh - 40px)',
            background: colors.paper,
            borderRadius: 20,
            boxShadow: '0 24px 64px rgba(11, 22, 40, 0.18), 0 4px 16px rgba(11, 22, 40, 0.08)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <button 
              onClick={() => setCalendlyModalOpen(false)}
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                width: 32,
                height: 32,
                borderRadius: 8,
                border: 'none',
                background: 'rgba(255,255,255,0.9)',
                color: colors.inkMute,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
              }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <iframe 
              src="https://calendly.com/miguel-johns/milton-demo?hide_gdpr_banner=1&primary_color=006c55"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              title="Schedule a call with Milton"
            />
          </div>
        </div>
      )}
    </div>
  )
}

// Mockup Components with light theme colors
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
          background: colors.bg,
          borderRadius: 10,
          border: `1px solid ${colors.lineSoft}`,
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
            color: colors.accentDeep,
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
          background: colors.bg,
          borderRadius: 10,
          border: `1px solid ${colors.lineSoft}`,
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
          background: colors.bg,
          borderRadius: 10,
          border: `1px solid ${colors.lineSoft}`,
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
    high: { bg: '#FEE2E2', color: '#DC2626' },
    medium: { bg: '#FEF3C7', color: '#D97706' },
    low: { bg: colors.accentSoft, color: colors.accentDeep },
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
          background: colors.bg,
          borderRadius: 10,
          border: `1px solid ${colors.lineSoft}`,
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
        background: colors.bg,
        borderRadius: 10,
        border: `1px solid ${colors.lineSoft}`,
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
          <div style={{ fontSize: 20, fontWeight: 700, color: colors.accentDeep }}>+25 lbs</div>
          <div style={{ fontSize: 11, color: colors.inkMute, marginTop: 2 }}>Deadlift</div>
        </div>
        <div style={{
          flex: 1,
          padding: '12px 14px',
          background: colors.accentSoft,
          borderRadius: 10,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: colors.accentDeep }}>86%</div>
          <div style={{ fontSize: 11, color: colors.inkMute, marginTop: 2 }}>Attendance</div>
        </div>
      </div>
    </div>
  )
}
