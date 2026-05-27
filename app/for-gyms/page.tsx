'use client'

import { useState, useEffect } from 'react'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

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

// Reusable components
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: fonts.sans,
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: colors.accent,
      marginBottom: 12,
    }}>
      {children}
    </p>
  )
}

function CalendlyEmbed({ mobile }: { mobile: boolean }) {
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
      background: colors.paper,
      borderRadius: 16,
      border: `1px solid ${colors.line}`,
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
      width: '100%',
      maxWidth: mobile ? '100%' : 400,
      overflow: 'hidden',
    }}>
      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/migueljohns/milton-demo?hide_gdpr_banner=1&background_color=ffffff&text_color=0b1628&primary_color=2bbfaa"
        style={{
          minWidth: mobile ? 280 : 320,
          height: mobile ? 580 : 630,
        }}
      />
    </div>
  )
}

// Mockup components for feature cards
function PremiumExperienceMockup({ mobile }: { mobile: boolean }) {
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
          &quot;Your consistency this month has been incredible. Here&apos;s your personalized progress story...&quot;
        </p>
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {['Report', 'Check-in', 'Program'].map((item, i) => (
          <div key={i} style={{
            flex: 1,
            padding: '6px 4px',
            background: i === 0 ? colors.mintSoft : colors.accentSoft,
            borderRadius: 6,
            textAlign: 'center',
            fontSize: 9,
            color: colors.accentDeep,
            fontWeight: 500,
          }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

function CoachingStandardMockup({ mobile }: { mobile: boolean }) {
  const trainers = [
    { name: 'Sarah M.', status: 'Milton-enabled' },
    { name: 'Jake T.', status: 'Milton-enabled' },
    { name: 'New Hire', status: 'Milton-enabled' },
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
        Your Methodology
      </div>
      {trainers.map((trainer, i) => (
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
            color: colors.accentDeep,
            fontWeight: 600,
          }}>
            {trainer.name.charAt(0)}
          </div>
          <span style={{ fontSize: 11, color: colors.ink, flex: 1 }}>{trainer.name}</span>
          <span style={{
            fontSize: 9,
            padding: '2px 6px',
            borderRadius: 4,
            background: colors.mintSoft,
            color: colors.accentDeep,
          }}>
            {trainer.status}
          </span>
        </div>
      ))}
    </div>
  )
}

function RevenueMockup({ mobile }: { mobile: boolean }) {
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
        New Revenue Lines
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {['Nutrition', 'Accountability', 'Semi-Private', 'Online'].map((item, i) => (
          <div key={i} style={{
            padding: '8px 12px',
            background: i === 0 ? colors.mintSoft : colors.accentSoft,
            borderRadius: 8,
            fontSize: 10,
            color: colors.accentDeep,
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="3">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            {item}
          </div>
        ))}
      </div>
      <div style={{
        padding: '8px 10px',
        background: colors.bg,
        borderRadius: 8,
        border: `1px solid ${colors.lineSoft}`,
        textAlign: 'center',
        fontSize: 10,
        color: colors.inkSoft,
      }}>
        Launch in a week, not a quarter
      </div>
    </div>
  )
}

function TrainerRetentionMockup({ mobile }: { mobile: boolean }) {
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
          <div style={{ fontSize: 16, fontWeight: 700, color: colors.accentDeep }}>+40%</div>
          <div style={{ fontSize: 9, color: colors.inkMute }}>Trainer revenue</div>
        </div>
      </div>
      <div style={{
        padding: '8px 10px',
        background: colors.bg,
        borderRadius: 8,
        border: `1px solid ${colors.lineSoft}`,
        fontSize: 10,
        color: colors.inkSoft,
        textAlign: 'center',
        fontStyle: 'italic',
      }}>
        &quot;They build careers here, not exit from.&quot;
      </div>
    </div>
  )
}

function FeatureCard({ title, description, children, mobile }: { title: string; description: string; children: React.ReactNode; mobile: boolean }) {
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

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: colors.bg,
      fontFamily: fonts.sans,
    }}>
      <Header currentPage="for-gyms" />
      
      <main style={{ 
        paddingTop: mobile ? 100 : 120,
      }}>
        {/* Hero Section */}
        <section style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: mobile ? '40px 20px 60px' : '60px 40px 80px',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: mobile ? 'column' : 'row',
            alignItems: mobile ? 'center' : 'flex-start',
            justifyContent: 'space-between',
            gap: mobile ? 40 : 60,
          }}>
            {/* Left: Copy */}
            <div style={{
              flex: 1,
              textAlign: mobile ? 'center' : 'left',
              maxWidth: mobile ? '100%' : 560,
            }}>
              <Eyebrow>FOR GYM OWNERS</Eyebrow>
              <h1 style={{
                fontFamily: fonts.serif,
                fontSize: mobile ? 36 : tablet ? 44 : 52,
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
              }}>
                Milton is the AI operating system for gyms that take coaching seriously. Premium experience for every member. Consistent standard across every trainer. New revenue without new staff.
              </p>
            </div>

            {/* Right: Demo Card */}
            <div style={{
              flexShrink: 0,
              display: 'flex',
              justifyContent: 'center',
            }}>
              <CalendlyEmbed mobile={mobile} />
            </div>
          </div>
        </section>

        {/* What Milton Delivers - Four Cards */}
        <section style={{
          background: colors.bg2,
          padding: mobile ? '60px 20px' : '80px 40px',
        }}>
          <div style={{
            maxWidth: 1200,
            margin: '0 auto',
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: mobile ? 40 : 56,
            }}>
              <Eyebrow>WHAT MILTON DELIVERS</Eyebrow>
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
                <PremiumExperienceMockup mobile={mobile} />
              </FeatureCard>
              <FeatureCard
                mobile={mobile}
                title="One coaching standard across every trainer."
                description="Milton encodes your methodology and applies it across your whole team. New hire or ten-year vet, the experience is the same."
              >
                <CoachingStandardMockup mobile={mobile} />
              </FeatureCard>
              <FeatureCard
                mobile={mobile}
                title="New revenue without new staff."
                description="Nutrition, accountability, semi-private, online roster. Launch the revenue lines you've been talking about for years, in a week."
              >
                <RevenueMockup mobile={mobile} />
              </FeatureCard>
              <FeatureCard
                mobile={mobile}
                title="A place trainers build careers, not exit from."
                description="Milton lets one trainer deliver a premium experience to twice as many members. Their book grows. They stay."
              >
                <TrainerRetentionMockup mobile={mobile} />
              </FeatureCard>
            </div>
          </div>
        </section>

        {/* Testimonial Quote */}
        <section style={{
          padding: mobile ? '60px 20px' : '80px 40px',
          background: colors.bg,
        }}>
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
              fontSize: 15,
              color: colors.inkSoft,
              margin: 0,
            }}>
              <strong style={{ color: colors.ink }}>Kelsey Dunbar</strong>, Complete Strength & Performance
            </p>
          </div>
        </section>

        {/* Final CTA Section */}
        <section style={{
          background: colors.accentDeep,
          padding: mobile ? '60px 20px' : '80px 40px',
        }}>
          <div style={{
            maxWidth: 800,
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
              fontSize: 16,
              color: 'rgba(255,255,255,0.7)',
              margin: '0 0 32px 0',
            }}>
              Backed by a 30-day money-back guarantee.
            </p>

            <a
              href="https://calendly.com/migueljohns/milton-demo"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '16px 48px',
                borderRadius: 10,
                border: 'none',
                background: colors.paper,
                color: colors.accentDeep,
                fontFamily: fonts.sans,
                fontSize: 16,
                fontWeight: 600,
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Book my demo
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
