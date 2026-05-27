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

export default function ForCoachesPage() {
  const { mobile } = useBreakpoint()

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
            Start Your Free Trial
          </h1>
          <p style={{
            fontFamily: fonts.sans,
            fontSize: mobile ? 16 : 18,
            color: colors.inkSoft,
            maxWidth: 600,
            margin: '0 auto 40px',
            lineHeight: 1.6,
          }}>
            See for yourself how Milton can help you serve more clients and grow your business.
          </p>
        </section>

        {/* Stripe Embed Section */}
        <section style={{
          maxWidth: 800,
          margin: '0 auto',
          padding: mobile ? '0 20px 60px' : '0 40px 80px',
        }}>
          <div style={{
            background: colors.paper,
            borderRadius: 16,
            border: `1px solid ${colors.line}`,
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
            padding: mobile ? '40px 20px' : '60px 40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: mobile ? 200 : 250,
          }}>
            {/* Stripe Buy Button */}
            <stripe-buy-button
              buy-button-id="buy_btn_1Tbnh4KiPCT0UZDq9NbnM5bk"
              publishable-key="pk_live_51MKZN0KiPCT0UZDqlFgbDoTliM6hXSCzi0Ol3B7QyM1aUV6nSpSQO1fHkEijnOQg0muhaL1QO0SI4ggn3U6L09pC003nURdg7T"
            />
          </div>

          {/* Trust indicators */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: mobile ? 16 : 32,
            marginTop: 32,
          }}>
            {[
              { icon: '🔒', text: 'Secure checkout' },
              { icon: '✓', text: 'Cancel anytime' },
              { icon: '⚡', text: 'Instant access' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                color: colors.inkSoft,
                fontSize: 14,
              }}>
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
