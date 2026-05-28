import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'

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

// Calendly booking URL
const CALENDLY_URL = "https://calendly.com/miguel-johns/milton-demo?hide_gdpr_banner=1&primary_color=1aa4a4"

// Reusable section wrapper
function Section({ children, bg = colors.bg, style = {} }) {
  return (
    <section style={{ background: bg, ...style }}>
      {children}
    </section>
  )
}

// Demo Card component with embedded Calendly
function DemoCard({ mobile }) {
  return (
    <div style={{
      background: colors.paper,
      borderRadius: 16,
      border: `1px solid ${colors.line}`,
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
      width: '100%',
      maxWidth: mobile ? '100%' : 420,
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{ 
        padding: mobile ? '16px 20px' : '20px 24px',
        borderBottom: `1px solid ${colors.lineSoft}`,
      }}>
        <h3 style={{
          fontFamily: fonts.sans,
          fontSize: 18,
          fontWeight: 600,
          color: colors.ink,
          margin: '0 0 4px 0',
        }}>
          Milton Demo
        </h3>
        <p style={{
          fontFamily: fonts.sans,
          fontSize: 14,
          color: colors.inkSoft,
          margin: 0,
        }}>
          30 minutes with Miguel Johns
        </p>
      </div>

      {/* Calendly widget - scrollable container */}
      <div style={{ 
        maxHeight: mobile ? 400 : 480,
        overflowY: 'auto',
      }}>
        <div
          className="calendly-inline-widget"
          data-url={CALENDLY_URL}
          style={{
            minWidth: 320,
            height: 600,
          }}
        />
      </div>

      {/* Footer */}
      <div style={{
        padding: mobile ? '12px 20px' : '16px 24px',
        borderTop: `1px solid ${colors.lineSoft}`,
        background: colors.bg,
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: fonts.sans,
          fontSize: 12,
          color: colors.inkMute,
          margin: 0,
        }}>
          No slide deck. No SDR. A real conversation about your gym.
        </p>
      </div>
    </div>
  )
}

// Mockup components for feature cards
function PremiumExperienceMockup() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
      <div style={{
        fontSize: 9,
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: colors.accent,
        marginBottom: 2,
      }}>
        Member Experience
      </div>
      <div style={{
        padding: '10px',
        background: colors.bg,
        borderRadius: 8,
        border: `1px solid ${colors.lineSoft}`,
      }}>
        <p style={{
          fontSize: 10,
          color: colors.inkSoft,
          margin: 0,
          lineHeight: 1.5,
          fontStyle: 'italic',
        }}>
          &quot;Your consistency this month has been remarkable. 12 sessions, up from 8 last month.&quot;
        </p>
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <div style={{
          flex: 1,
          padding: '8px',
          background: colors.mintSoft,
          borderRadius: 6,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: colors.accentDeep }}>247</div>
          <div style={{ fontSize: 8, color: colors.inkMute }}>Members</div>
        </div>
        <div style={{
          flex: 1,
          padding: '8px',
          background: colors.accentSoft,
          borderRadius: 6,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: colors.accentDeep }}>94%</div>
          <div style={{ fontSize: 8, color: colors.inkMute }}>Retention</div>
        </div>
      </div>
    </div>
  )
}

function CoachingStandardMockup() {
  const trainers = [
    { name: 'Sarah K.', status: 'On methodology' },
    { name: 'Mike R.', status: 'On methodology' },
    { name: 'New Hire', status: 'On methodology' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
      <div style={{
        fontSize: 9,
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: colors.accent,
        marginBottom: 2,
      }}>
        Team Consistency
      </div>
      {trainers.map((t, i) => (
        <div key={i} style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 10px',
          background: colors.bg,
          borderRadius: 8,
          border: `1px solid ${colors.lineSoft}`,
        }}>
          <div style={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: colors.accentSoft,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 10,
            fontWeight: 600,
            color: colors.accent,
          }}>
            {t.name.charAt(0)}
          </div>
          <span style={{ fontSize: 11, color: colors.ink, flex: 1 }}>{t.name}</span>
          <span style={{
            fontSize: 9,
            padding: '2px 6px',
            borderRadius: 4,
            background: colors.mintSoft,
            color: colors.accentDeep,
            fontWeight: 500,
          }}>{t.status}</span>
        </div>
      ))}
    </div>
  )
}

function RevenueMockup() {
  const lines = [
    { name: 'Nutrition', status: 'Live', revenue: '+$4.2k' },
    { name: 'Semi-private', status: 'Live', revenue: '+$8.1k' },
    { name: 'Online', status: 'Ready', revenue: '—' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
      <div style={{
        fontSize: 9,
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: colors.accent,
        marginBottom: 2,
      }}>
        Revenue Lines
      </div>
      {lines.map((line, i) => (
        <div key={i} style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 10px',
          background: colors.bg,
          borderRadius: 8,
          border: `1px solid ${colors.lineSoft}`,
        }}>
          <span style={{ fontSize: 11, color: colors.ink, flex: 1 }}>{line.name}</span>
          <span style={{
            fontSize: 9,
            padding: '2px 6px',
            borderRadius: 4,
            background: line.status === 'Live' ? colors.mintSoft : colors.lineSoft,
            color: line.status === 'Live' ? colors.accentDeep : colors.inkMute,
            fontWeight: 500,
          }}>{line.status}</span>
          <span style={{
            fontSize: 11,
            fontWeight: 600,
            color: line.revenue === '—' ? colors.inkMute : colors.accent,
            minWidth: 50,
            textAlign: 'right',
          }}>{line.revenue}</span>
        </div>
      ))}
    </div>
  )
}

function RetentionMockup() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
      <div style={{
        fontSize: 9,
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: colors.accent,
        marginBottom: 2,
      }}>
        Trainer Growth
      </div>
      <div style={{
        display: 'flex',
        gap: 8,
      }}>
        <div style={{
          flex: 1,
          padding: '10px 8px',
          background: colors.mintSoft,
          borderRadius: 8,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: colors.accentDeep }}>2x</div>
          <div style={{ fontSize: 9, color: colors.inkMute }}>Client capacity</div>
        </div>
        <div style={{
          flex: 1,
          padding: '10px 8px',
          background: colors.accentSoft,
          borderRadius: 8,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: colors.accentDeep }}>18mo</div>
          <div style={{ fontSize: 9, color: colors.inkMute }}>Avg tenure</div>
        </div>
      </div>
      <div style={{
        padding: '8px 10px',
        background: colors.bg,
        borderRadius: 8,
        border: `1px solid ${colors.lineSoft}`,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <div style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: colors.accentSoft,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="3">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        </div>
        <span style={{ fontSize: 10, color: colors.inkSoft }}>Career path, not exit ramp</span>
      </div>
    </div>
  )
}

// Feature Card component
function FeatureCard({ title, description, children, mobile }) {
  return (
    <div style={{
      background: colors.paper,
      borderRadius: 16,
      border: `1px solid ${colors.line}`,
      padding: mobile ? '20px 16px' : '24px 20px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        width: '100%',
        marginBottom: 16,
        padding: mobile ? 12 : 16,
        borderRadius: 12,
        background: colors.paper,
        border: `1px solid ${colors.lineSoft}`,
        minHeight: mobile ? 130 : 150,
        display: 'flex',
        alignItems: 'center',
      }}>
        {children}
      </div>
      <h3 style={{
        fontFamily: fonts.serif,
        fontSize: mobile ? 18 : 20,
        fontWeight: 500,
        color: colors.ink,
        margin: '0 0 6px 0',
        lineHeight: 1.3,
      }}>
        {title}
      </h3>
      <p style={{
        fontFamily: fonts.sans,
        fontSize: 14,
        color: colors.inkSoft,
        margin: 0,
        lineHeight: 1.6,
      }}>
        {description}
      </p>
    </div>
  )
}

export default function ForGymsPage() {
  const { mobile, tablet } = useBreakpoint()

  // Load Calendly widget script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: colors.bg,
      fontFamily: fonts.sans,
    }}>
      <Header currentPage="for-gyms" />
      
      <main style={{ paddingTop: mobile ? 80 : 100 }}>
        {/* Hero Section */}
        <Section style={{ padding: mobile ? '40px 20px 60px' : '60px 40px 80px' }}>
          <div style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: mobile ? 'block' : 'flex',
            alignItems: 'flex-start',
            gap: 60,
          }}>
            {/* Left column - Copy */}
            <div style={{ 
              flex: 1, 
              marginBottom: mobile ? 40 : 0,
              maxWidth: mobile ? '100%' : 560,
            }}>
              <span style={{
                display: 'inline-block',
                fontFamily: fonts.sans,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: colors.accent,
                marginBottom: 16,
              }}>
                FOR GYM OWNERS
              </span>
              
              <h1 style={{
                fontFamily: fonts.serif,
                fontSize: mobile ? 36 : 48,
                fontWeight: 500,
                color: colors.ink,
                margin: '0 0 20px 0',
                lineHeight: 1.15,
              }}>
                Run an actual coaching business.
              </h1>
              
              <p style={{
                fontFamily: fonts.sans,
                fontSize: mobile ? 16 : 18,
                color: colors.inkSoft,
                margin: 0,
                lineHeight: 1.7,
                maxWidth: 480,
              }}>
                Milton is the AI operating system for gyms that take coaching seriously. Premium experience for every member. Consistent standard across every trainer. New revenue without new staff.
              </p>
            </div>

            {/* Right column - Demo Card */}
            <div style={{ 
              width: mobile ? '100%' : 420,
              flexShrink: 0,
            }}>
              <DemoCard mobile={mobile} />
            </div>
          </div>
        </Section>

        {/* What Milton Delivers Section */}
        <Section bg={colors.bg2} style={{ padding: mobile ? '60px 20px' : '80px 40px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: mobile ? 40 : 56 }}>
              <span style={{
                display: 'inline-block',
                fontFamily: fonts.sans,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: colors.accent,
                marginBottom: 16,
              }}>
                WHAT MILTON DELIVERS
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: mobile ? '1fr' : tablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gap: mobile ? 16 : 20,
            }}>
              <FeatureCard
                mobile={mobile}
                title="A premium experience for every member."
                description="Story-based reports, personalized check-ins, and progressive programming. Not just for your top 20. For all of them."
              >
                <PremiumExperienceMockup />
              </FeatureCard>
              <FeatureCard
                mobile={mobile}
                title="One coaching standard across every trainer."
                description="Milton encodes your methodology and applies it across your whole team. New hire or ten-year vet, the experience is the same."
              >
                <CoachingStandardMockup />
              </FeatureCard>
              <FeatureCard
                mobile={mobile}
                title="New revenue without new staff."
                description="Nutrition, accountability, semi-private, online roster. Launch the revenue lines you've been talking about for years, in a week."
              >
                <RevenueMockup />
              </FeatureCard>
              <FeatureCard
                mobile={mobile}
                title="A place trainers build careers, not exit from."
                description="Milton lets one trainer deliver a premium experience to twice as many members. Their book grows. They stay."
              >
                <RetentionMockup />
              </FeatureCard>
            </div>
          </div>
        </Section>

        {/* Testimonial Section */}
        <Section style={{ padding: mobile ? '60px 20px' : '80px 40px' }}>
          <div style={{
            maxWidth: 800,
            margin: '0 auto',
            textAlign: 'center',
          }}>
            <blockquote style={{
              fontFamily: fonts.serif,
              fontSize: mobile ? 24 : 32,
              fontWeight: 400,
              fontStyle: 'italic',
              color: colors.ink,
              margin: '0 0 24px 0',
              lineHeight: 1.4,
            }}>
              &quot;This is by far the best coaching software and fitness AI I&apos;ve ever experienced.&quot;
            </blockquote>
            <p style={{
              fontFamily: fonts.sans,
              fontSize: 14,
              color: colors.inkSoft,
              margin: 0,
            }}>
              <strong style={{ color: colors.ink }}>Kelsey Dunbar</strong>, Complete Strength &amp; Performance
            </p>
          </div>
        </Section>

        {/* Final CTA Section */}
        <Section bg={colors.accentDeep} style={{ padding: mobile ? '60px 20px' : '80px 40px' }}>
          <div style={{
            maxWidth: 900,
            margin: '0 auto',
            textAlign: 'center',
          }}>
            <h2 style={{
              fontFamily: fonts.serif,
              fontSize: mobile ? 32 : 40,
              fontWeight: 500,
              color: colors.paper,
              margin: '0 0 16px 0',
              lineHeight: 1.2,
            }}>
              See what Milton would do for your gym.
            </h2>
            <p style={{
              fontFamily: fonts.sans,
              fontSize: 14,
              color: 'rgba(255,255,255,0.7)',
              margin: '0 0 32px 0',
            }}>
              Backed by a 30-day money-back guarantee.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <DemoCard mobile={mobile} />
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  )
}
