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
const CALENDLY_URL = "https://calendly.com/miguel-getmilton/30min"

export default function ForGymsPage() {
  const { mobile } = useBreakpoint()

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
      
      <main style={{ 
        paddingTop: mobile ? 100 : 120,
        paddingBottom: mobile ? 60 : 80,
      }}>
        {/* Hero Section */}
        <section style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: mobile ? '40px 20px' : '60px 40px',
          textAlign: 'center',
        }}>
          <h1 style={{
            fontFamily: fonts.serif,
            fontSize: mobile ? 36 : 48,
            fontWeight: 500,
            color: colors.ink,
            marginBottom: 16,
            lineHeight: 1.2,
          }}>
            Book a Demo for Your Gym
          </h1>
          <p style={{
            fontFamily: fonts.sans,
            fontSize: mobile ? 16 : 18,
            color: colors.inkSoft,
            maxWidth: 600,
            margin: '0 auto 40px',
            lineHeight: 1.6,
          }}>
            See how Milton can help your gym increase member retention, automate operations, and drive revenue growth.
          </p>
        </section>

        {/* Calendly Embed Section */}
        <section style={{
          maxWidth: 1000,
          margin: '0 auto',
          padding: mobile ? '0 20px 60px' : '0 40px 80px',
        }}>
          <div style={{
            background: colors.paper,
            borderRadius: 16,
            border: `1px solid ${colors.line}`,
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
          }}>
            {/* Calendly Inline Widget */}
            <div 
              className="calendly-inline-widget" 
              data-url={`${CALENDLY_URL}?hide_gdpr_banner=1&background_color=ffffff&text_color=0B1628&primary_color=2BBFAA`}
              style={{ 
                minWidth: 320, 
                height: mobile ? 700 : 680,
              }} 
            />
          </div>
        </section>

        {/* What to Expect Section */}
        <section style={{
          maxWidth: 900,
          margin: '0 auto',
          padding: mobile ? '40px 20px' : '60px 40px',
          borderTop: `1px solid ${colors.line}`,
        }}>
          <h2 style={{
            fontFamily: fonts.serif,
            fontSize: mobile ? 28 : 32,
            fontWeight: 500,
            color: colors.ink,
            textAlign: 'center',
            marginBottom: 40,
          }}>
            What to Expect
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)',
            gap: 24,
          }}>
            {[
              {
                num: '01',
                title: 'Discovery',
                desc: 'We learn about your gym, current challenges, and goals for growth.',
              },
              {
                num: '02',
                title: 'Live Demo',
                desc: 'See Milton in action with a personalized walkthrough of key features.',
              },
              {
                num: '03',
                title: 'Custom Plan',
                desc: 'Get a tailored implementation plan and pricing for your facility.',
              },
            ].map((step, i) => (
              <div key={i} style={{
                background: colors.paper,
                borderRadius: 12,
                padding: 24,
                border: `1px solid ${colors.line}`,
              }}>
                <span style={{
                  fontFamily: fonts.sans,
                  fontSize: 13,
                  fontWeight: 600,
                  color: colors.accent,
                  letterSpacing: '0.05em',
                }}>
                  {step.num}
                </span>
                <h3 style={{
                  fontFamily: fonts.sans,
                  fontSize: 18,
                  fontWeight: 600,
                  color: colors.ink,
                  marginTop: 12,
                  marginBottom: 8,
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontFamily: fonts.sans,
                  fontSize: 15,
                  color: colors.inkSoft,
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Section */}
        <section style={{
          maxWidth: 700,
          margin: '0 auto',
          padding: mobile ? '40px 20px' : '60px 40px',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: fonts.sans,
            fontSize: 15,
            color: colors.inkMute,
            marginBottom: 24,
          }}>
            Trusted by leading fitness facilities
          </p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: mobile ? 24 : 40,
          }}>
            {['500+ Gyms', '1M+ Members', '98% Retention'].map((stat, i) => (
              <div key={i} style={{
                fontFamily: fonts.sans,
                fontSize: 16,
                fontWeight: 600,
                color: colors.ink,
              }}>
                {stat}
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
