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

// CSS variables as constants - matching new design
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

const categories = [
  { id: "all", label: "All" },
  { id: "ai-fitness", label: "AI in Fitness" },
  { id: "trainer-dev", label: "Trainer Development" },
  { id: "director", label: "Fitness Director Playbook" },
  { id: "industry", label: "Industry Data" },
  { id: "milton", label: "Milton Updates" },
]

const articles = [
  {
    id: 1, featured: true,
    category: "ai-fitness",
    tag: "AI IN FITNESS",
    slug: "ai-landscape-fitness",
    title: "The AI Landscape in Fitness: What's Real, What's Hype, and What to Do About It",
    excerpt: "We walked the floor at HFA 2026 and talked to every AI vendor in the space. Here's our honest breakdown of what's actually working in gyms right now — and what's still just a good demo.",
    date: "Mar 24, 2026",
    readTime: "8 min read",
  },
  {
    id: 3,
    category: "director",
    tag: "FITNESS DIRECTOR PLAYBOOK",
    slug: "four-pillars-fitness-director",
    title: "The 4 Pillars Every Fitness Director Should Be Tracking — But Probably Isn't",
    excerpt: "Self-management, coaching skill, communication, teamwork. A framework developed over 20 years of managing trainers, now powered by AI diagnostics.",
    date: "Mar 12, 2026",
    readTime: "7 min read",
  },
  {
    id: 4,
    category: "industry",
    tag: "INDUSTRY DATA",
    slug: "six-month-retention-cliff",
    title: "The 6-Month Retention Cliff: Why It Matters and How to See It Coming",
    excerpt: "If you keep a client past six months, they'll likely stay two years. But most gyms can't see the cliff until the client is already gone. Here's how to change that.",
    date: "Mar 7, 2026",
    readTime: "5 min read",
  },
  {
    id: 5,
    category: "ai-fitness",
    tag: "AI IN FITNESS",
    slug: "ai-receptionist-vs-copilot",
    title: "AI Receptionist vs. AI Co-Pilot: Why the Industry Is Solving the Wrong Problem",
    excerpt: "Every AI startup at HFA was selling the same thing — an AI that picks up your phone. Nobody was building the thing gym owners actually need: intelligence for the people already doing the work.",
    date: "Mar 3, 2026",
    readTime: "8 min read",
  },
  {
    id: 6,
    category: "trainer-dev",
    tag: "TRAINER DEVELOPMENT",
    slug: "best-trainer-leaving-signals",
    title: "Your Best Trainer Is About to Leave. Here Are the Signals You're Missing.",
    excerpt: "Trainer churn rarely happens overnight. There are behavioral signals weeks before the resignation — and most fitness directors aren't tracking them.",
    date: "Feb 19, 2026",
    readTime: "7 min read",
  },
  {
    id: 7,
    category: "director",
    tag: "FITNESS DIRECTOR PLAYBOOK",
    slug: "spreadsheets-to-dashboard-migration",
    title: "From 8 Data Sources to 1 Dashboard: A Fitness Director's Migration Story",
    excerpt: "How one fitness director replaced 20 years of manual tracking with an AI-powered command center — and what she learned along the way.",
    date: "Feb 12, 2026",
    readTime: "7 min read",
  },
  {
    id: 8,
    category: "milton",
    tag: "MILTON UPDATES",
    slug: "introducing-fitness-director-copilot",
    title: "Introducing the Fitness Director Co-Pilot",
    excerpt: "We're launching the most requested feature in Milton's history — a single intelligent dashboard that shows every trainer's performance, gaps, and development path.",
    date: "Feb 5, 2026",
    readTime: "6 min read",
  },
  {
    id: 9,
    category: "industry",
    tag: "INDUSTRY DATA",
    slug: "revenue-per-trainer-how-to-move-it",
    title: "Revenue Per Trainer: You Know the Number. Here's How to Move It.",
    excerpt: "A trainer plateaus at $8,000/month. You know they could be at $12,000. Revenue is a scoreboard — it tells you who's winning, but not how to coach the game.",
    date: "Jan 29, 2026",
    readTime: "7 min read",
  },
]

// Tag color mapping for the new light theme
const tagColors = {
  "AI IN FITNESS": { bg: colors.accentSoft, text: colors.accent },
  "TRAINER DEVELOPMENT": { bg: colors.mintSoft, text: '#22C55E' },
  "FITNESS DIRECTOR PLAYBOOK": { bg: '#F3E8FF', text: '#9333EA' },
  "INDUSTRY DATA": { bg: '#FEF3C7', text: '#D97706' },
  "MILTON UPDATES": { bg: '#DBEAFE', text: '#2563EB' },
}

function ArticleCard({ article, featured = false, mobile }) {
  const tagStyle = tagColors[article.tag] || { bg: colors.accentSoft, text: colors.accent }

  if (featured) {
    return (
      <a href={`/insights/${article.slug}`} style={{
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
        background: colors.paper,
        border: `1px solid ${colors.line}`,
        borderRadius: mobile ? 16 : 24,
        overflow: 'hidden',
        textDecoration: 'none',
        boxShadow: '0 4px 24px rgba(11, 22, 40, 0.06)',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
      }}>
        {/* Image placeholder */}
        <div style={{
          background: `linear-gradient(135deg, ${colors.accentSoft} 0%, ${colors.bg2} 100%)`,
          minHeight: mobile ? 200 : 320,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}>
          <div style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: colors.paper,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(11, 22, 40, 0.08)',
          }}>
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke={colors.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </div>
          <span style={{
            position: 'absolute',
            top: mobile ? 16 : 20,
            right: mobile ? 16 : 20,
            fontFamily: fonts.sans,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: 1,
            color: colors.accent,
            background: colors.paper,
            padding: '6px 12px',
            borderRadius: 100,
            boxShadow: '0 2px 8px rgba(11, 22, 40, 0.08)',
          }}>FEATURED</span>
        </div>

        {/* Content */}
        <div style={{ padding: mobile ? '28px 22px' : '40px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{
            fontFamily: fonts.sans,
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: 1.2,
            color: tagStyle.text,
            background: tagStyle.bg,
            borderRadius: 100,
            padding: '5px 12px',
            alignSelf: 'flex-start',
            marginBottom: 16,
          }}>{article.tag}</span>

          <h2 style={{
            fontFamily: fonts.serif,
            fontSize: mobile ? 24 : 30,
            fontWeight: 500,
            lineHeight: 1.25,
            color: colors.ink,
            margin: '0 0 14px 0',
          }}>{article.title}</h2>

          <p style={{
            fontFamily: fonts.sans,
            fontSize: mobile ? 14 : 15,
            lineHeight: 1.7,
            color: colors.inkSoft,
            margin: '0 0 20px 0',
          }}>{article.excerpt}</p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: fonts.sans, fontSize: 13, color: colors.inkMute }}>{article.date}</span>
            <span style={{ fontFamily: fonts.sans, fontSize: 13, color: colors.line }}>·</span>
            <span style={{ fontFamily: fonts.sans, fontSize: 13, color: colors.inkMute }}>{article.readTime}</span>
          </div>

          <span style={{
            fontFamily: fonts.sans,
            fontSize: 14,
            fontWeight: 600,
            color: colors.accent,
            marginTop: 20,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}>
            Read Article
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </span>
        </div>
      </a>
    )
  }

  // Standard card
  return (
    <a href={`/insights/${article.slug}`} style={{
      background: colors.paper,
      border: `1px solid ${colors.line}`,
      borderRadius: mobile ? 14 : 18,
      overflow: 'hidden',
      textDecoration: 'none',
      boxShadow: '0 2px 12px rgba(11, 22, 40, 0.04)',
      transition: 'box-shadow 0.2s ease, transform 0.2s ease',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Image placeholder */}
      <div style={{
        background: `linear-gradient(135deg, ${tagStyle.bg} 0%, ${colors.bg2} 100%)`,
        height: mobile ? 160 : 180,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: colors.paper,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(11, 22, 40, 0.06)',
        }}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={tagStyle.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: mobile ? '20px 18px' : '24px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <span style={{
          fontFamily: fonts.sans,
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: 1.2,
          color: tagStyle.text,
          background: tagStyle.bg,
          borderRadius: 100,
          padding: '4px 10px',
          alignSelf: 'flex-start',
          marginBottom: 12,
        }}>{article.tag}</span>

        <h3 style={{
          fontFamily: fonts.sans,
          fontSize: mobile ? 16 : 17,
          fontWeight: 600,
          lineHeight: 1.35,
          color: colors.ink,
          margin: '0 0 10px 0',
        }}>{article.title}</h3>

        <p style={{
          fontFamily: fonts.sans,
          fontSize: 13,
          lineHeight: 1.6,
          color: colors.inkSoft,
          margin: '0 0 16px 0',
          flex: 1,
        }}>{article.excerpt}</p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 'auto' }}>
          <span style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.inkMute }}>{article.date}</span>
          <span style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.line }}>·</span>
          <span style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.inkMute }}>{article.readTime}</span>
        </div>
      </div>
    </a>
  )
}

export default function InsightsPage() {
  const { mobile, tablet } = useBreakpoint()
  const [activeCategory, setActiveCategory] = useState("all")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [chatModalOpen, setChatModalOpen] = useState(false)

  const featuredArticle = articles.find(a => a.featured)

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.bg,
      fontFamily: fonts.sans,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* ═══════ HEADER ═══════ */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(250, 251, 252, 0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${colors.lineSoft}`,
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: mobile ? '14px 20px' : '16px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <a href="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            textDecoration: 'none',
            fontFamily: fonts.serif,
            fontSize: 22,
            fontWeight: 500,
            color: colors.ink,
          }}>
            <img src={logoImage} alt="Milton" style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              objectFit: 'cover',
            }} />
            <span>Milton</span>
          </a>

          {/* Desktop Nav */}
          {!mobile && (
            <nav style={{
              display: 'flex',
              alignItems: 'center',
              gap: 32,
              fontFamily: fonts.sans,
              fontSize: 14,
              fontWeight: 500,
              color: colors.inkSoft,
            }}>
              <a href="/coaches" style={{ color: 'inherit', textDecoration: 'none' }}>For Coaches</a>
              <a href="/gyms" style={{ color: 'inherit', textDecoration: 'none' }}>For Gyms</a>
              <a href="/insights" style={{ color: colors.accent, textDecoration: 'none' }}>Insights</a>
            </nav>
          )}

          {/* Mobile menu button */}
          {mobile && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                padding: 8,
                cursor: 'pointer',
              }}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={colors.ink} strokeWidth="2" strokeLinecap="round">
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          )}
        </div>

        {/* Mobile dropdown menu */}
        {mobile && mobileMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: colors.paper,
            borderBottom: `1px solid ${colors.line}`,
            padding: '12px 20px 20px',
            boxShadow: '0 8px 24px rgba(11, 22, 40, 0.08)',
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
              fontWeight: 500,
              color: colors.accent,
              textDecoration: 'none',
              borderRadius: 10,
            }}>Insights</a>
          </div>
        )}
      </header>

      {/* ═══════ MAIN CONTENT ═══════ */}
      <main style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: mobile ? '0 20px' : '0 40px',
      }}>

        {/* Hero Section */}
        <section style={{ padding: mobile ? '48px 0 32px' : '80px 0 56px' }}>
          <h1 style={{
            fontFamily: fonts.serif,
            fontSize: mobile ? 36 : tablet ? 48 : 56,
            fontWeight: 500,
            lineHeight: 1.12,
            color: colors.ink,
            margin: '0 0 16px 0',
          }}>
            AI, training, and the business of{' '}
            <span style={{ fontStyle: 'italic', color: colors.accent }}>building coaches</span>.
          </h1>

          <p style={{
            fontFamily: fonts.sans,
            fontSize: mobile ? 16 : 18,
            lineHeight: 1.65,
            color: colors.inkSoft,
            maxWidth: 600,
            margin: 0,
          }}>
            Expert perspectives on AI in fitness, trainer development, and running a personal training business that actually retains its people.
          </p>
        </section>

        {/* Featured Article */}
        {featuredArticle && activeCategory === "all" && (
          <section style={{ paddingBottom: mobile ? 40 : 56 }}>
            <ArticleCard article={featuredArticle} featured mobile={mobile} />
          </section>
        )}

        {/* Category Filter */}
        <section style={{ paddingBottom: mobile ? 28 : 40 }}>
          <div style={{
            display: 'flex',
            gap: mobile ? 6 : 8,
            flexWrap: 'wrap',
            paddingBottom: mobile ? 20 : 28,
            borderBottom: `1px solid ${colors.lineSoft}`,
          }}>
            {categories.map(cat => {
              const active = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: mobile ? 12 : 13,
                    fontWeight: 500,
                    padding: mobile ? '8px 14px' : '9px 18px',
                    borderRadius: 100,
                    cursor: 'pointer',
                    border: `1px solid ${active ? colors.accent : colors.line}`,
                    background: active ? colors.accentSoft : colors.paper,
                    color: active ? colors.accent : colors.inkSoft,
                    transition: 'all 0.2s ease',
                    letterSpacing: 0.2,
                  }}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>
        </section>

        {/* Article Grid */}
        <section style={{ paddingBottom: mobile ? 48 : 72 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : tablet ? '1fr 1fr' : '1fr 1fr 1fr',
            gap: mobile ? 16 : 24,
          }}>
            {(activeCategory === "all"
              ? articles.filter(a => !a.featured)
              : articles.filter(a => a.category === activeCategory)
            ).map(article => (
              <ArticleCard key={article.id} article={article} mobile={mobile} />
            ))}
          </div>

          {activeCategory !== "all" && articles.filter(a => a.category === activeCategory).length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <p style={{ fontFamily: fonts.sans, fontSize: 16, color: colors.inkMute }}>
                More articles in this category coming soon.
              </p>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section style={{ paddingBottom: mobile ? 72 : 100 }}>
          <div style={{
            background: colors.paper,
            border: `1px solid ${colors.line}`,
            borderRadius: mobile ? 20 : 28,
            padding: mobile ? '36px 24px' : '56px 56px',
            boxShadow: '0 4px 24px rgba(11, 22, 40, 0.06)',
            textAlign: 'center',
          }}>
            <p style={{
              fontFamily: fonts.sans,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              color: colors.accent,
              margin: '0 0 12px 0',
            }}>Free Consultation</p>

            <h2 style={{
              fontFamily: fonts.serif,
              fontSize: mobile ? 26 : 36,
              fontWeight: 500,
              color: colors.ink,
              margin: '0 0 14px 0',
            }}>
              Not sure where AI fits for your gym?
            </h2>

            <p style={{
              fontFamily: fonts.sans,
              fontSize: mobile ? 14 : 16,
              lineHeight: 1.65,
              color: colors.inkSoft,
              maxWidth: 520,
              margin: '0 auto 28px auto',
            }}>
              {"Book a free AI Readiness Snapshot call. We'll assess your current operations and give you a clear picture of where AI can (and can't) help."}
            </p>

            <a href="/" style={{
              fontFamily: fonts.sans,
              fontSize: 15,
              fontWeight: 600,
              padding: '14px 32px',
              borderRadius: 100,
              background: colors.ink,
              color: colors.paper,
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}>
              Get Started with Milton
            </a>
          </div>
        </section>
      </main>

      <Footer mobile={mobile} onOpenChat={() => setChatModalOpen(true)} />

      {/* ═══════ CHAT MODAL ═══════ */}
      {chatModalOpen && (
        <div
          onClick={() => setChatModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(11, 22, 40, 0.4)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: mobile ? 'flex-end' : 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: mobile ? 0 : 24,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: colors.paper,
              borderRadius: mobile ? '20px 20px 0 0' : 20,
              width: '100%',
              maxWidth: 400,
              padding: '24px 22px 28px',
              boxShadow: '0 16px 48px rgba(11, 22, 40, 0.18)',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img src={logoImage} alt="Milton" style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  objectFit: 'cover',
                }} />
                <div>
                  <div style={{ fontFamily: fonts.sans, fontSize: 15, fontWeight: 600, color: colors.ink }}>Milton Team</div>
                  <div style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.inkMute }}>Usually replies within 24h</div>
                </div>
              </div>
              <button
                onClick={() => setChatModalOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: 4,
                  cursor: 'pointer',
                  color: colors.inkMute,
                }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <p style={{
              fontSize: 14.5,
              lineHeight: 1.55,
              color: colors.ink,
              background: colors.bg2,
              padding: '14px 16px',
              borderRadius: 12,
              borderBottomLeftRadius: 4,
              marginBottom: 16,
            }}>
              {"Hi! Leave your info and a real person from the team will get back to you."}
            </p>

            <input
              type="email"
              placeholder="Your email"
              style={{
                width: '100%',
                border: `1px solid ${colors.line}`,
                borderRadius: 10,
                padding: '12px 14px',
                fontFamily: fonts.sans,
                fontSize: 14,
                color: colors.ink,
                background: colors.paper,
                marginBottom: 10,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            <button
              style={{
                width: '100%',
                background: colors.ink,
                color: colors.paper,
                border: 'none',
                padding: '12px 18px',
                borderRadius: 10,
                fontFamily: fonts.sans,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                marginTop: 4,
              }}
            >
              Send
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </button>
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
        a:hover {
          opacity: 0.8;
        }
      `}</style>
    </div>
  )
}
