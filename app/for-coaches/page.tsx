'use client'

import { useState, useEffect } from 'react'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { Checkout } from '@/app/components/checkout'

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

function TrialCard({ mobile }: { mobile: boolean }) {
  return (
    <div style={{
      background: colors.paper,
      borderRadius: 16,
      border: `1px solid ${colors.line}`,
      padding: mobile ? '24px 20px' : '32px',
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
      width: '100%',
      maxWidth: 380,
    }}>
      <div style={{ marginBottom: 20 }}>
        <h3 style={{
          fontFamily: fonts.sans,
          fontSize: 18,
          fontWeight: 600,
          color: colors.ink,
          margin: '0 0 4px 0',
        }}>
          Milton Subscription
        </h3>
        <p style={{
          fontFamily: fonts.sans,
          fontSize: 14,
          color: colors.inkSoft,
          margin: 0,
        }}>
          <span style={{ color: colors.accent, fontWeight: 600 }}>7 days free</span>
          {' '}then $99 per month
        </p>
      </div>

      {/* Stripe Embedded Checkout */}
      <div style={{ marginBottom: 16 }}>
        <Checkout productId="milton-subscription" />
      </div>

      <p style={{
        fontFamily: fonts.sans,
        fontSize: 13,
        color: colors.inkMute,
        margin: '0 0 16px 0',
        textAlign: 'center',
      }}>
        Cancel anytime in one click.
      </p>

      {/* Payment methods */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        paddingTop: 16,
        borderTop: `1px solid ${colors.lineSoft}`,
      }}>
        {['Amex', 'Mastercard', 'Visa', 'Apple Pay', 'Link'].map((method) => (
          <span key={method} style={{
            fontFamily: fonts.sans,
            fontSize: 11,
            color: colors.inkMute,
          }}>
            {method}
          </span>
        ))}
      </div>
    </div>
  )
}

// Mockup components for feature cards
function ProgrammingMockup({ mobile }: { mobile: boolean }) {
  const exercises = [
    { name: 'Barbell Back Squat', sets: '4 x 6', color: colors.accent },
    { name: 'Romanian Deadlift', sets: '3 x 10', color: colors.mint },
    { name: 'Walking Lunges', sets: '3 x 12', color: colors.accent },
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
        Lower Body Strength
      </div>
      {exercises.map((ex, i) => (
        <div key={i} style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 10px',
          background: colors.bg,
          borderRadius: 8,
          border: `1px solid ${colors.lineSoft}`,
        }}>
          <span style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: ex.color,
            flexShrink: 0,
          }} />
          <span style={{ fontSize: 11, color: colors.ink, flex: 1 }}>{ex.name}</span>
          <span style={{ fontSize: 10, color: colors.inkMute, fontWeight: 500 }}>{ex.sets}</span>
        </div>
      ))}
    </div>
  )
}

function RetentionMockup({ mobile }: { mobile: boolean }) {
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
        Client Retention
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
          <div style={{ fontSize: 16, fontWeight: 700, color: colors.accentDeep }}>92%</div>
          <div style={{ fontSize: 9, color: colors.inkMute }}>Retention</div>
        </div>
        <div style={{
          flex: 1,
          padding: '10px 8px',
          background: colors.accentSoft,
          borderRadius: 8,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: colors.accentDeep }}>+8</div>
          <div style={{ fontSize: 9, color: colors.inkMute }}>Referrals</div>
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
        <span style={{ fontSize: 10, color: colors.inkSoft }}>Check-in sent to Sarah K.</span>
      </div>
    </div>
  )
}

function ReportsMockup({ mobile }: { mobile: boolean }) {
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
        Progress Report
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
          &quot;Your deadlift is up 25 lbs since January. This is the consistency that changes everything.&quot;
        </p>
      </div>
      <div style={{
        display: 'flex',
        gap: 6,
      }}>
        <div style={{
          flex: 1,
          padding: '8px',
          background: colors.mintSoft,
          borderRadius: 6,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: colors.accentDeep }}>+25 lbs</div>
          <div style={{ fontSize: 8, color: colors.inkMute }}>Deadlift</div>
        </div>
        <div style={{
          flex: 1,
          padding: '8px',
          background: colors.accentSoft,
          borderRadius: 6,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: colors.accentDeep }}>86%</div>
          <div style={{ fontSize: 8, color: colors.inkMute }}>Attendance</div>
        </div>
      </div>
    </div>
  )
}

function VoiceMockup({ mobile }: { mobile: boolean }) {
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
        Just talk to Milton
      </div>
      <div style={{
        padding: '10px',
        background: colors.accentSoft,
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <div style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: colors.accent,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill={colors.paper} stroke="none">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" fill="none" stroke={colors.paper} strokeWidth="2"/>
            <line x1="12" y1="19" x2="12" y2="23" stroke={colors.paper} strokeWidth="2"/>
          </svg>
        </div>
        <span style={{ fontSize: 11, color: colors.accentDeep, fontStyle: 'italic' }}>
          &quot;Create a leg day for Mike...&quot;
        </span>
      </div>
      <div style={{
        padding: '8px 10px',
        background: colors.bg,
        borderRadius: 8,
        border: `1px solid ${colors.lineSoft}`,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }}>
        <span style={{
          fontSize: 10,
          padding: '2px 6px',
          borderRadius: 4,
          background: colors.mintSoft,
          color: colors.accentDeep,
          fontWeight: 600,
        }}>Done</span>
        <span style={{ fontSize: 10, color: colors.inkSoft }}>Program created for Mike T.</span>
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

export default function ForCoachesPage() {
  const { mobile, tablet } = useBreakpoint()

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: colors.bg,
      fontFamily: fonts.sans,
    }}>
      <Header currentPage="for-coaches" />
      
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
              <Eyebrow>YOUR AI ASSISTANT COACH</Eyebrow>
              <h1 style={{
                fontFamily: fonts.serif,
                fontSize: mobile ? 36 : tablet ? 44 : 52,
                fontWeight: 500,
                color: colors.ink,
                margin: '0 0 20px 0',
                lineHeight: 1.15,
              }}>
                Coach like you&apos;ve got a team behind you.
              </h1>
              <p style={{
                fontFamily: fonts.sans,
                fontSize: mobile ? 16 : 18,
                color: colors.inkSoft,
                margin: 0,
                lineHeight: 1.7,
              }}>
                Milton is the AI assistant coach that handles the work great coaches wish they had time to do. The check-ins, the programming, the reports, the follow-ups. You just talk to it.
              </p>
            </div>

            {/* Right: Trial Card */}
            <div style={{
              flexShrink: 0,
              display: 'flex',
              justifyContent: 'center',
            }}>
              <TrialCard mobile={mobile} />
            </div>
          </div>
        </section>

        {/* What Milton Does - Four Cards */}
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
              <Eyebrow>WHAT MILTON DOES</Eyebrow>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: mobile ? '1fr' : tablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gap: mobile ? 16 : 20,
            }}>
              <FeatureCard
                mobile={mobile}
                title="Create custom programming in seconds."
                description="Customized to your methodology. Powered by AI."
              >
                <ProgrammingMockup mobile={mobile} />
              </FeatureCard>
              <FeatureCard
                mobile={mobile}
                title="Sell more and retain more."
                description="Milton handles the stuff that makes clients stay, refer, and gladly pay more."
              >
                <RetentionMockup mobile={mobile} />
              </FeatureCard>
              <FeatureCard
                mobile={mobile}
                title="Over-deliver on the small things."
                description="Check-ins and reports that feel like you spent hours creating them."
              >
                <ReportsMockup mobile={mobile} />
              </FeatureCard>
              <FeatureCard
                mobile={mobile}
                title="Get stuff done. Easy."
                description="Just talk to Milton to take care of the grunt work."
              >
                <VoiceMockup mobile={mobile} />
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
              margin: '0 0 40px 0',
              lineHeight: 1.2,
            }}>
              Try Milton free for 7 days.
            </h2>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
            }}>
              <TrialCard mobile={mobile} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
