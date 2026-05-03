import { useState, useEffect } from 'react'
import Footer from './components/Footer'

function useBreakpoint() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  useEffect(() => {
    const h = () => setW(window.innerWidth)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return { mobile: w < 640, tablet: w >= 640 && w < 1024, desktop: w >= 1024, w }
}

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

const logoImage = "/images/milton-logo.png"

// Import article content from ArticleDetail
import { articlesContent } from './ArticleDetail.jsx'

export default function ArticlePage({ slug }) {
  const { mobile, tablet } = useBreakpoint()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [chatModalOpen, setChatModalOpen] = useState(false)

  const article = articlesContent[slug]

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!article) {
    return (
      <div style={{
        minHeight: '100vh',
        background: colors.bg,
        fontFamily: fonts.sans,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 40,
      }}>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <h1 style={{ fontFamily: fonts.serif, fontSize: 48, color: colors.ink, marginBottom: 16 }}>Article not found</h1>
        <p style={{ color: colors.inkSoft, marginBottom: 24 }}>The article you&apos;re looking for doesn&apos;t exist.</p>
        <a href="/insights" style={{
          background: colors.ink,
          color: colors.paper,
          padding: '12px 24px',
          borderRadius: 10,
          textDecoration: 'none',
          fontWeight: 600,
        }}>Back to Insights</a>
      </div>
    )
  }
  
  const renderContent = (block, index) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p key={index} style={{
            fontSize: mobile ? 17 : 18,
            lineHeight: 1.75,
            color: colors.ink,
            marginBottom: 24,
          }}>{block.text}</p>
        )
      case 'heading':
        return (
          <h2 key={index} style={{
            fontFamily: fonts.serif,
            fontSize: mobile ? 28 : 32,
            fontWeight: 500,
            color: colors.ink,
            marginTop: 48,
            marginBottom: 20,
          }}>{block.text}</h2>
        )
      case 'subheading':
        return (
          <h3 key={index} style={{
            fontFamily: fonts.sans,
            fontSize: mobile ? 20 : 22,
            fontWeight: 600,
            color: colors.ink,
            marginTop: 32,
            marginBottom: 16,
          }}>{block.text}</h3>
        )
      case 'quote':
        return (
          <blockquote key={index} style={{
            borderLeft: `4px solid ${colors.accent}`,
            paddingLeft: 24,
            marginLeft: 0,
            marginRight: 0,
            marginTop: 32,
            marginBottom: 32,
            fontFamily: fonts.serif,
            fontStyle: 'italic',
            fontSize: mobile ? 20 : 24,
            lineHeight: 1.6,
            color: colors.inkSoft,
          }}>{block.text}</blockquote>
        )
      case 'callout':
        return (
          <div key={index} style={{
            background: colors.accentSoft,
            borderRadius: 16,
            padding: mobile ? '20px 24px' : '28px 32px',
            marginTop: 32,
            marginBottom: 32,
            fontFamily: fonts.serif,
            fontStyle: 'italic',
            fontSize: mobile ? 18 : 20,
            lineHeight: 1.6,
            color: colors.accentDeep,
          }}>{block.text}</div>
        )
      case 'list':
        return (
          <ul key={index} style={{
            marginBottom: 24,
            paddingLeft: 24,
          }}>
            {block.items.map((item, i) => (
              <li key={i} style={{
                fontSize: mobile ? 17 : 18,
                lineHeight: 1.75,
                color: colors.ink,
                marginBottom: 12,
              }}>{item}</li>
            ))}
          </ul>
        )
      case 'advice':
        return (
          <div key={index} style={{
            background: colors.bg2,
            borderRadius: 16,
            padding: mobile ? '20px 24px' : '24px 28px',
            marginTop: 24,
            marginBottom: 24,
          }}>
            <h4 style={{
              fontFamily: fonts.sans,
              fontSize: 16,
              fontWeight: 600,
              color: colors.accent,
              marginBottom: 8,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>{block.title}</h4>
            <p style={{
              fontSize: mobile ? 16 : 17,
              lineHeight: 1.7,
              color: colors.ink,
              margin: 0,
            }}>{block.text}</p>
          </div>
        )
      case 'sources':
        return (
          <div key={index} style={{
            borderTop: `1px solid ${colors.line}`,
            marginTop: 48,
            paddingTop: 24,
          }}>
            <p style={{
              fontSize: 14,
              lineHeight: 1.7,
              color: colors.inkMute,
            }}>{block.text}</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.bg,
      fontFamily: fonts.sans,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        background: 'rgba(250, 251, 252, 0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${colors.line}`,
        zIndex: 100,
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: mobile ? '14px 20px' : '16px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <a href="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            textDecoration: 'none',
            fontFamily: fonts.serif,
            fontSize: 22,
            fontWeight: 600,
            color: colors.ink,
          }}>
            <img src={logoImage} alt="Milton" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
            <span>Milton</span>
          </a>

          {/* Desktop nav */}
          {!mobile && (
            <nav style={{ display: 'flex', alignItems: 'center', gap: 32, fontSize: 15, color: colors.inkSoft }}>
              <a href="/coaches" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>For Coaches</a>
              <a href="/gyms" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>For Gyms</a>
              <a href="/insights" className="nav-link" style={{ color: colors.ink, textDecoration: 'none', fontWeight: 600 }}>Insights</a>
              <a href="#" className="nav-btn" style={{
                background: colors.ink,
                color: colors.paper,
                padding: '10px 20px',
                borderRadius: 10,
                textDecoration: 'none',
                fontWeight: 600,
              }}>Sign in</a>
            </nav>
          )}

          {/* Mobile menu button */}
          {mobile && (
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{
              background: 'none',
              border: 'none',
              padding: 8,
              cursor: 'pointer',
            }}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={colors.ink} strokeWidth="2">
                {mobileMenuOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          )}
        </div>
      </header>

      {/* Mobile menu */}
      {mobile && mobileMenuOpen && (
        <>
          <div onClick={() => setMobileMenuOpen(false)} style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.3)',
            zIndex: 90,
          }} />
          <div style={{
            position: 'fixed',
            top: 65,
            left: 16,
            right: 16,
            background: colors.paper,
            borderRadius: 16,
            padding: 16,
            zIndex: 95,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
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
            <a href="/insights" onClick={() => setMobileMenuOpen(false)} style={{
              display: 'block',
              padding: '14px 16px',
              fontSize: 16,
              fontWeight: 600,
              color: colors.ink,
              textDecoration: 'none',
              borderRadius: 10,
            }}>Insights</a>
            <a href="#" style={{
              display: 'block',
              padding: '14px 16px',
              fontSize: 16,
              fontWeight: 600,
              color: colors.bg,
              textDecoration: 'none',
              borderRadius: 10,
              background: colors.ink,
              textAlign: 'center',
              marginTop: 6,
            }}>Sign in</a>
          </div>
        </>
      )}

      {/* Article content */}
      <main style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: mobile ? '40px 20px 80px' : '64px 40px 120px',
      }}>
        {/* Back link */}
        <a href="/insights" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          color: colors.inkSoft,
          textDecoration: 'none',
          fontSize: 14,
          fontWeight: 500,
          marginBottom: 32,
        }}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 6l-6 6 6 6" />
          </svg>
          Back to Insights
        </a>

        {/* Title */}
        <h1 style={{
          fontFamily: fonts.serif,
          fontSize: mobile ? 32 : 48,
          fontWeight: 500,
          color: colors.ink,
          lineHeight: 1.2,
          marginBottom: 20,
          letterSpacing: '-0.02em',
        }}>{article.title}</h1>

        {/* Meta */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          color: colors.inkMute,
          fontSize: 14,
          marginBottom: 48,
          paddingBottom: 32,
          borderBottom: `1px solid ${colors.line}`,
        }}>
          <span>{article.date}</span>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: colors.inkMute }} />
          <span>{article.readTime}</span>
        </div>

        {/* Article body */}
        <article>
          {article.content.map((block, index) => renderContent(block, index))}
        </article>

        {/* CTA */}
        <div style={{
          marginTop: 64,
          padding: mobile ? '32px 24px' : '48px 40px',
          background: colors.paper,
          border: `1px solid ${colors.line}`,
          borderRadius: 20,
          textAlign: 'center',
        }}>
          <h3 style={{
            fontFamily: fonts.serif,
            fontSize: mobile ? 24 : 28,
            fontWeight: 500,
            color: colors.ink,
            marginBottom: 12,
          }}>Ready to see Milton in action?</h3>
          <p style={{
            color: colors.inkSoft,
            fontSize: 16,
            lineHeight: 1.6,
            marginBottom: 24,
            maxWidth: 400,
            margin: '0 auto 24px',
          }}>Start a conversation and experience how AI can transform your coaching practice.</p>
          <a href="/" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: colors.ink,
            color: colors.paper,
            padding: '14px 28px',
            borderRadius: 12,
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: 15,
          }}>
            Talk to Milton
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </main>

      <Footer mobile={mobile} onOpenChat={() => setChatModalOpen(true)} />

      {/* Chat Modal */}
      {chatModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: mobile ? 'flex-end' : 'center',
          justifyContent: 'center',
          padding: mobile ? 0 : 20,
        }}>
          <div 
            onClick={() => setChatModalOpen(false)}
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
            maxWidth: 400,
            background: colors.paper,
            borderRadius: mobile ? '20px 20px 0 0' : 20,
            boxShadow: '0 24px 64px rgba(11, 22, 40, 0.18)',
            padding: '28px 24px',
          }}>
            <button
              onClick={() => setChatModalOpen(false)}
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                width: 32,
                height: 32,
                borderRadius: 8,
                border: 'none',
                background: 'transparent',
                color: colors.inkMute,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              <img 
                src={logoImage}
                alt="Milton"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
              <div>
                <h3 style={{ fontFamily: fonts.sans, fontSize: 16, fontWeight: 600, color: colors.ink, marginBottom: 4 }}>Talk to a human</h3>
                <p style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.inkMute }}>
                  Usually replies within a few hours
                </p>
              </div>
            </div>

            <p style={{
              fontFamily: fonts.sans,
              fontSize: 14,
              lineHeight: 1.55,
              color: colors.ink,
              background: colors.bg,
              padding: '14px 16px',
              borderRadius: 12,
              marginBottom: 16,
            }}>
              {"Have questions about Milton? Reach out and a real person will get back to you."}
            </p>

            <a 
              href="mailto:milton@getmilton.com"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                width: '100%',
                padding: '14px 20px',
                background: colors.ink,
                color: colors.bg,
                borderRadius: 12,
                fontFamily: fonts.sans,
                fontSize: 15,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Email us
            </a>
          </div>
        </div>
      )}

      <style>{`
        button {
          transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
        }
        button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(11, 22, 40, 0.12);
        }
        button:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: 0 2px 6px rgba(11, 22, 40, 0.08);
        }
        .nav-link {
          transition: color 0.2s ease;
        }
        .nav-link:hover {
          color: #2BBFAA !important;
        }
        .nav-btn {
          transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        }
        .nav-btn:hover {
          background: rgba(43, 191, 170, 0.12) !important;
          border-color: #2BBFAA !important;
          color: #2BBFAA !important;
        }
      `}</style>
    </div>
  )
}
