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

// Reusable components
function Eyebrow({ children }) {
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

function TrialCard({ mobile }) {
  return (
    <div style={{
      background: colors.paper,
      borderRadius: 16,
      border: `1px solid ${colors.line}`,
      padding: mobile ? '24px 20px' : '32px',
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
      width: '100%',
      maxWidth: 340,
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

      {/* Stripe Buy Button Container */}
      <div style={{ marginBottom: 16 }}>
        <stripe-buy-button
          buy-button-id="buy_btn_1Tbnh4KiPCT0UZDq9NbnM5bk"
          publishable-key="pk_live_51MKZN0KiPCT0UZDqlFgbDoTliM6hXSCzi0Ol3B7QyM1aUV6nSpSQO1fHkEijnOQg0muhaL1QO0SI4ggn3U6L09pC003nURdg7T"
        />
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

function FeatureCard({ title, description, mobile }) {
  return (
    <div style={{
      background: colors.paper,
      borderRadius: 16,
      border: `1px solid ${colors.line}`,
      padding: mobile ? '24px 20px' : '28px 24px',
      height: '100%',
    }}>
      <h3 style={{
        fontFamily: fonts.serif,
        fontSize: mobile ? 20 : 22,
        fontWeight: 500,
        color: colors.ink,
        margin: '0 0 8px 0',
        lineHeight: 1.3,
      }}>
        {title}
      </h3>
      <p style={{
        fontFamily: fonts.sans,
        fontSize: 15,
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

  // Load Stripe Buy Button script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://js.stripe.com/v3/buy-button.js'
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
                Coach like {"you've"} got a team behind you.
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
              />
              <FeatureCard
                mobile={mobile}
                title="Sell more and retain more."
                description="Milton handles the stuff that makes clients stay, refer, and gladly pay more."
              />
              <FeatureCard
                mobile={mobile}
                title="Over-deliver on the small things."
                description="Check-ins and reports that feel like you spent hours creating them."
              />
              <FeatureCard
                mobile={mobile}
                title="Get stuff done. Easy."
                description="Just talk to Milton to take care of the grunt work."
              />
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
              {"\"This is by far the best coaching software and fitness AI I've ever experienced.\""}
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
