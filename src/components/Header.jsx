import { useState, useEffect } from 'react'

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
  paper: '#FFFFFF',
  ink: '#0B1628',
  muted: '#64748B',
  line: '#E2E8F0',
  accent: '#2BBFAA',
}

const fonts = {
  sans: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
}

const logoImage = "/images/milton-logo.png"
const CALENDLY_URL = "https://calendly.com/miguel-getmilton/30min"
const STRIPE_URL = "https://buy.stripe.com/8x2eVe0mT1bT6nueDUeUU0X"

export default function Header({ currentPage = 'home' }) {
  const { mobile } = useBreakpoint()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <style>{`
        .header-nav-link {
          transition: color 0.2s ease;
        }
        .header-nav-link:hover {
          color: ${colors.accent} !important;
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
          color: ${colors.accent} !important;
        }
        .header-mobile-cta:hover {
          background: #0a1220 !important;
        }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      
      <header style={{
        padding: mobile ? '20px' : '28px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        background: 'rgba(250, 251, 252, 0.92)',
        backdropFilter: 'blur(12px)',
        zIndex: 40,
        borderBottom: `1px solid ${colors.line}`,
      }}>
        {/* Logo */}
        <a href="/" style={{
          fontFamily: fonts.sans,
          fontSize: 20,
          fontWeight: 600,
          letterSpacing: '-0.02em',
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
              width: 36,
              height: 36,
              borderRadius: '50%',
              objectFit: 'cover',
              boxShadow: '0 0 0 1px rgba(11, 22, 40, 0.04), 0 1px 3px rgba(11, 22, 40, 0.06)',
            }}
          />
          <span>Milton</span>
        </a>

        {/* Desktop nav links */}
        {!mobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <a 
              href="/milton-makes-money"
              className="header-nav-link"
              style={{
                fontFamily: fonts.sans,
                fontSize: 14,
                fontWeight: currentPage === 'milton-makes-money' ? 600 : 500,
                color: currentPage === 'milton-makes-money' ? colors.ink : colors.muted,
                textDecoration: 'none',
                letterSpacing: '0.01em',
              }}
            >
              Milton Makes Money
            </a>
            <a 
              href="/us-vs-them"
              className="header-nav-link"
              style={{
                fontFamily: fonts.sans,
                fontSize: 14,
                fontWeight: currentPage === 'us-vs-them' ? 600 : 500,
                color: currentPage === 'us-vs-them' ? colors.ink : colors.muted,
                textDecoration: 'none',
                letterSpacing: '0.01em',
              }}
            >
              Us vs. Them
            </a>
            <a 
              href="/insights"
              className="header-nav-link"
              style={{
                fontFamily: fonts.sans,
                fontSize: 14,
                fontWeight: currentPage === 'insights' ? 600 : 500,
                color: currentPage === 'insights' ? colors.ink : colors.muted,
                textDecoration: 'none',
                letterSpacing: '0.01em',
              }}
            >
              Insights
            </a>
            <a 
              href="/about"
              className="header-nav-link"
              style={{
                fontFamily: fonts.sans,
                fontSize: 14,
                fontWeight: currentPage === 'about' ? 600 : 500,
                color: currentPage === 'about' ? colors.ink : colors.muted,
                textDecoration: 'none',
                letterSpacing: '0.01em',
              }}
            >
              About
            </a>
            <a 
              href="/coaches"
              className="header-cta-btn"
              style={{
                background: colors.ink,
                color: colors.paper,
                padding: '12px 24px',
                borderRadius: 10,
                fontFamily: fonts.sans,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
                letterSpacing: '0.01em',
              }}
            >
              For Coaches
            </a>
          </div>
        )}

        {/* Mobile menu button */}
        {mobile && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            style={{
              width: 40,
              height: 40,
              border: `1px solid ${colors.line}`,
              background: colors.paper,
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

      {/* Mobile menu dropdown */}
      {mobile && mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(11, 22, 40, 0.1)',
              zIndex: 45,
            }}
          />
          {/* Menu */}
          <div style={{
            position: 'fixed',
            top: 80,
            left: 20,
            right: 20,
            background: colors.paper,
            borderRadius: 16,
            border: `1px solid ${colors.line}`,
            boxShadow: '0 1px 2px rgba(11, 22, 40, 0.04), 0 16px 40px rgba(11, 22, 40, 0.10)',
            zIndex: 55,
            padding: 8,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}>
            <a 
              href="/milton-makes-money"
              onClick={() => setMobileMenuOpen(false)}
              className="header-mobile-link"
              style={{
                display: 'block',
                padding: '14px 16px',
                fontSize: 16,
                fontWeight: currentPage === 'milton-makes-money' ? 600 : 500,
                color: colors.ink,
                textDecoration: 'none',
                borderRadius: 10,
              }}
            >
              Milton Makes Money
            </a>
            <a 
              href="/us-vs-them"
              onClick={() => setMobileMenuOpen(false)}
              className="header-mobile-link"
              style={{
                display: 'block',
                padding: '14px 16px',
                fontSize: 16,
                fontWeight: currentPage === 'us-vs-them' ? 600 : 500,
                color: colors.ink,
                textDecoration: 'none',
                borderRadius: 10,
              }}
            >
              Us vs. Them
            </a>
            <a 
              href="/insights"
              onClick={() => setMobileMenuOpen(false)}
              className="header-mobile-link"
              style={{
                display: 'block',
                padding: '14px 16px',
                fontSize: 16,
                fontWeight: currentPage === 'insights' ? 600 : 500,
                color: colors.ink,
                textDecoration: 'none',
                borderRadius: 10,
              }}
            >
              Insights
            </a>
            <a 
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="header-mobile-link"
              style={{
                display: 'block',
                padding: '14px 16px',
                fontSize: 16,
                fontWeight: currentPage === 'about' ? 600 : 500,
                color: colors.ink,
                textDecoration: 'none',
                borderRadius: 10,
              }}
            >
              About
            </a>
            <a 
              href="/coaches"
              onClick={() => setMobileMenuOpen(false)}
              className="header-mobile-cta"
              style={{
                display: 'block',
                padding: '14px 16px',
                fontSize: 16,
                fontWeight: 600,
                color: colors.paper,
                textDecoration: 'none',
                borderRadius: 10,
                background: colors.ink,
                textAlign: 'center',
                marginTop: 4,
                transition: 'background 0.2s ease',
              }}
            >
              For Coaches
            </a>
          </div>
        </>
      )}
    </>
  )
}
