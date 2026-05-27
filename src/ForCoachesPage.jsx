import { useState, useEffect, useRef } from 'react'
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

// Section component for consistent spacing
function Section({ children, bg = colors.bg, id, style = {} }) {
  const { mobile } = useBreakpoint()
  return (
    <section id={id} style={{
      padding: mobile ? '60px 20px' : '100px 40px',
      background: bg,
      ...style,
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {children}
      </div>
    </section>
  )
}

// Eyebrow text component
function Eyebrow({ children, color = colors.accent }) {
  return (
    <span style={{
      display: 'inline-block',
      fontFamily: fonts.sans,
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: color,
      marginBottom: 16,
    }}>
      {children}
    </span>
  )
}

// Heading component
function Heading({ children, as = 'h2', style = {} }) {
  const { mobile } = useBreakpoint()
  const sizes = {
    h1: mobile ? 36 : 52,
    h2: mobile ? 28 : 40,
    h3: mobile ? 22 : 28,
  }
  const Tag = as
  return (
    <Tag style={{
      fontFamily: fonts.serif,
      fontSize: sizes[as],
      fontWeight: 500,
      lineHeight: 1.15,
      color: colors.ink,
      margin: 0,
      textWrap: 'balance',
      ...style,
    }}>
      {children}
    </Tag>
  )
}

// Body text
function Body({ children, style = {} }) {
  const { mobile } = useBreakpoint()
  return (
    <p style={{
      fontFamily: fonts.sans,
      fontSize: mobile ? 16 : 18,
      lineHeight: 1.65,
      color: colors.inkSoft,
      margin: 0,
      ...style,
    }}>
      {children}
    </p>
  )
}

// Primary CTA button
function CTAButton({ children, href, onClick, large = false }) {
  const { mobile } = useBreakpoint()
  const [hovered, setHovered] = useState(false)
  
  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    background: hovered ? colors.accentDeep : colors.ink,
    color: colors.paper,
    padding: large ? (mobile ? '18px 36px' : '20px 44px') : (mobile ? '14px 28px' : '16px 32px'),
    borderRadius: 12,
    fontFamily: fonts.sans,
    fontSize: large ? (mobile ? 16 : 18) : (mobile ? 14 : 15),
    fontWeight: 600,
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: hovered ? '0 8px 24px rgba(11, 22, 40, 0.2)' : '0 4px 12px rgba(11, 22, 40, 0.1)',
  }

  const props = {
    style,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  }

  if (href) {
    return <a href={href} {...props}>{children}</a>
  }
  return <button onClick={onClick} {...props}>{children}</button>
}

// Feature card for the premium service stack
function FeatureCard({ icon, title, description, index }) {
  const { mobile } = useBreakpoint()
  const [hovered, setHovered] = useState(false)
  
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? colors.accentSoft : colors.paper,
        border: `1px solid ${hovered ? colors.accent : colors.line}`,
        borderRadius: 16,
        padding: mobile ? '28px 24px' : '36px 32px',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 12px 32px rgba(43, 191, 170, 0.12)' : '0 2px 8px rgba(11, 22, 40, 0.04)',
      }}
    >
      <div style={{
        width: 48,
        height: 48,
        borderRadius: 12,
        background: index === 0 ? `linear-gradient(135deg, ${colors.accent}, ${colors.mint})` : colors.accentSoft,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        color: index === 0 ? colors.paper : colors.accent,
      }}>
        {icon}
      </div>
      <h3 style={{
        fontFamily: fonts.sans,
        fontSize: mobile ? 18 : 20,
        fontWeight: 600,
        color: colors.ink,
        marginBottom: 12,
      }}>
        {title}
      </h3>
      <p style={{
        fontFamily: fonts.sans,
        fontSize: mobile ? 14 : 15,
        lineHeight: 1.65,
        color: colors.inkSoft,
        margin: 0,
      }}>
        {description}
      </p>
    </div>
  )
}

// Persona card for "Who this is for"
function PersonaCard({ title, description }) {
  const { mobile } = useBreakpoint()
  const [hovered, setHovered] = useState(false)
  
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: colors.paper,
        border: `1px solid ${hovered ? colors.accent : colors.line}`,
        borderRadius: 16,
        padding: mobile ? '28px 24px' : '36px 32px',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 12px 32px rgba(43, 191, 170, 0.12)' : '0 2px 8px rgba(11, 22, 40, 0.04)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h3 style={{
        fontFamily: fonts.sans,
        fontSize: mobile ? 17 : 19,
        fontWeight: 600,
        color: colors.ink,
        marginBottom: 14,
        lineHeight: 1.35,
      }}>
        {title}
      </h3>
      <p style={{
        fontFamily: fonts.sans,
        fontSize: mobile ? 14 : 15,
        lineHeight: 1.65,
        color: colors.inkSoft,
        margin: 0,
        flex: 1,
      }}>
        {description}
      </p>
    </div>
  )
}

// Comparison column for pricing
function ComparisonColumn({ title, price, points, highlight = false }) {
  const { mobile } = useBreakpoint()
  
  return (
    <div style={{
      background: highlight ? colors.ink : colors.paper,
      border: highlight ? 'none' : `1px solid ${colors.line}`,
      borderRadius: 16,
      padding: mobile ? '28px 24px' : '36px 32px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {highlight && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${colors.accent}, ${colors.mint})`,
        }} />
      )}
      <h4 style={{
        fontFamily: fonts.sans,
        fontSize: mobile ? 16 : 18,
        fontWeight: 600,
        color: highlight ? colors.paper : colors.ink,
        margin: 0,
      }}>
        {title}
      </h4>
      <div style={{
        fontFamily: fonts.serif,
        fontSize: mobile ? 28 : 36,
        fontWeight: 500,
        color: highlight ? colors.mint : colors.accent,
      }}>
        {price}
      </div>
      <p style={{
        fontFamily: fonts.sans,
        fontSize: mobile ? 13 : 14,
        lineHeight: 1.6,
        color: highlight ? 'rgba(255,255,255,0.7)' : colors.inkSoft,
        margin: 0,
      }}>
        {points}
      </p>
    </div>
  )
}

// Step card for How It Works
function StepCard({ number, title, description }) {
  const { mobile } = useBreakpoint()
  
  return (
    <div style={{
      display: 'flex',
      gap: mobile ? 16 : 24,
      alignItems: 'flex-start',
    }}>
      <div style={{
        width: mobile ? 40 : 48,
        height: mobile ? 40 : 48,
        borderRadius: '50%',
        background: colors.accentSoft,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: fonts.serif,
        fontSize: mobile ? 20 : 24,
        fontWeight: 500,
        color: colors.accent,
        flexShrink: 0,
      }}>
        {number}
      </div>
      <div>
        <h4 style={{
          fontFamily: fonts.sans,
          fontSize: mobile ? 17 : 19,
          fontWeight: 600,
          color: colors.ink,
          marginBottom: 8,
        }}>
          {title}
        </h4>
        <p style={{
          fontFamily: fonts.sans,
          fontSize: mobile ? 14 : 15,
          lineHeight: 1.65,
          color: colors.inkSoft,
          margin: 0,
        }}>
          {description}
        </p>
      </div>
    </div>
  )
}

// FAQ Accordion item
function FAQItem({ question, answer }) {
  const { mobile } = useBreakpoint()
  const [open, setOpen] = useState(false)
  
  return (
    <div style={{
      borderBottom: `1px solid ${colors.line}`,
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: mobile ? '20px 0' : '24px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span style={{
          fontFamily: fonts.sans,
          fontSize: mobile ? 16 : 18,
          fontWeight: 500,
          color: colors.ink,
          paddingRight: 16,
        }}>
          {question}
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={colors.inkSoft}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
            flexShrink: 0,
          }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div style={{
        maxHeight: open ? 500 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.3s ease',
      }}>
        <p style={{
          fontFamily: fonts.sans,
          fontSize: mobile ? 15 : 16,
          lineHeight: 1.7,
          color: colors.inkSoft,
          paddingBottom: mobile ? 20 : 24,
          margin: 0,
        }}>
          {answer}
        </p>
      </div>
    </div>
  )
}

// Video testimonial card
function VideoTestimonial({ name, videoPlaceholder }) {
  const { mobile } = useBreakpoint()
  
  return (
    <div style={{
      background: colors.paper,
      borderRadius: 16,
      border: `1px solid ${colors.line}`,
      overflow: 'hidden',
      boxShadow: '0 4px 16px rgba(11, 22, 40, 0.06)',
    }}>
      {/* Video placeholder - 9:16 aspect ratio */}
      <div style={{
        position: 'relative',
        width: '100%',
        paddingBottom: '177.78%',
        background: `linear-gradient(180deg, ${colors.accentSoft} 0%, ${colors.bg} 100%)`,
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: colors.paper,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(11, 22, 40, 0.1)',
            marginBottom: 16,
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill={colors.ink}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span style={{
            fontFamily: fonts.sans,
            fontSize: 14,
            fontWeight: 500,
            color: colors.inkSoft,
          }}>
            {name}
          </span>
          <span style={{
            fontFamily: fonts.sans,
            fontSize: 12,
            color: colors.inkMute,
            marginTop: 4,
          }}>
            Video coming soon
          </span>
        </div>
      </div>
    </div>
  )
}

// Icons
const icons = {
  report: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  program: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="M4.93 4.93l2.83 2.83" />
      <path d="M16.24 16.24l2.83 2.83" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
      <path d="M4.93 19.07l2.83-2.83" />
      <path d="M16.24 7.76l2.83-2.83" />
    </svg>
  ),
  checkin: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  timeline: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  nutrition: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  ),
  followup: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
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
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  const scrollToCTA = () => {
    document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: colors.bg,
      fontFamily: fonts.sans,
    }}>
      <Header currentPage="for-coaches" />
      
      <main>
        {/* Hero Section */}
        <Section style={{ paddingTop: mobile ? 40 : 60 }}>
          <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
            <Eyebrow>YOUR AI ASSISTANT COACH</Eyebrow>
            <Heading as="h1" style={{ marginBottom: mobile ? 20 : 28 }}>
              Make every client feel like your only client.
            </Heading>
            <Body style={{ 
              maxWidth: 640, 
              margin: '0 auto', 
              marginBottom: mobile ? 32 : 40,
              fontSize: mobile ? 17 : 19,
            }}>
              Milton handles the premium touches that separate average coaches from elite ones. The check-ins, the story-based reports, the progressive programming, the nutrition tracking. The stuff that makes clients stay, refer, and gladly pay more.
            </Body>
            <CTAButton large onClick={scrollToCTA}>
              Start my 7-day trial
            </CTAButton>
            <p style={{
              fontFamily: fonts.sans,
              fontSize: 13,
              color: colors.inkMute,
              marginTop: 16,
            }}>
              No charge for 7 days. Cancel anytime in one click.
            </p>
          </div>
        </Section>

        {/* From/To Comparison Section */}
        <Section>
          <div style={{
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
            gap: mobile ? 24 : 32,
          }}>
            {/* Without Milton */}
            <div style={{
              background: colors.paper,
              border: `1px solid ${colors.line}`,
              borderRadius: 20,
              padding: mobile ? '32px 24px' : '44px 36px',
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#DC2626',
                padding: '6px 14px',
                borderRadius: 100,
                fontFamily: fonts.sans,
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 24,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Without Milton
              </div>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}>
                {[
                  "Cookie-cutter programs because you don't have time to customize.",
                  "Check-ins that are a thumbs-up emoji.",
                  "Clients who quietly churn at month four because nothing felt special.",
                  "A ceiling on what you can charge because your service feels like everyone else's.",
                ].map((item, i) => (
                  <li key={i} style={{
                    fontFamily: fonts.sans,
                    fontSize: mobile ? 15 : 16,
                    lineHeight: 1.6,
                    color: colors.inkSoft,
                    paddingLeft: 24,
                    position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      top: 6,
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: colors.line,
                    }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* With Milton */}
            <div style={{
              background: colors.ink,
              borderRadius: 20,
              padding: mobile ? '32px 24px' : '44px 36px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: `linear-gradient(90deg, ${colors.accent}, ${colors.mint})`,
              }} />
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(43, 191, 170, 0.15)',
                color: colors.mint,
                padding: '6px 14px',
                borderRadius: 100,
                fontFamily: fonts.sans,
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 24,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                With Milton
              </div>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}>
                {[
                  "Programs that progress every week, built around what actually happened in the last session.",
                  "Check-ins that read like you spent an hour writing them.",
                  "Story-based reports clients screenshot and send to their friends.",
                  "Clients who stay twice as long and tell three people about you.",
                ].map((item, i) => (
                  <li key={i} style={{
                    fontFamily: fonts.sans,
                    fontSize: mobile ? 15 : 16,
                    lineHeight: 1.6,
                    color: 'rgba(255,255,255,0.85)',
                    paddingLeft: 24,
                    position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      top: 6,
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: colors.mint,
                    }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Premium Service Stack Section */}
        <Section bg={colors.bg2}>
          <div style={{ textAlign: 'center', marginBottom: mobile ? 40 : 56 }}>
            <Eyebrow>THE PREMIUM SERVICE STACK</Eyebrow>
            <Heading as="h2">
              The things great coaches wish they had time to do. Milton just does them.
            </Heading>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: mobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gap: mobile ? 16 : 24,
          }}>
            {[
              { icon: icons.report, title: "Story-based progress reports" },
              { icon: icons.program, title: "Progressive programming" },
              { icon: icons.checkin, title: "Personal check-ins" },
              { icon: icons.timeline, title: "Historical timelines" },
              { icon: icons.nutrition, title: "Simple nutrition tracking" },
              { icon: icons.followup, title: "Automated follow-ups" },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  background: colors.paper,
                  border: `1px solid ${colors.line}`,
                  borderRadius: 16,
                  padding: mobile ? '24px 16px' : '32px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 12,
                }}
              >
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: index === 0 ? `linear-gradient(135deg, ${colors.accent}, ${colors.mint})` : colors.accentSoft,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: index === 0 ? colors.paper : colors.accent,
                }}>
                  {item.icon}
                </div>
                <h3 style={{
                  fontFamily: fonts.sans,
                  fontSize: mobile ? 15 : 17,
                  fontWeight: 600,
                  color: colors.ink,
                  margin: 0,
                  lineHeight: 1.3,
                }}>
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </Section>

        {/* Social Proof / Testimonials Section */}
        <Section>
          <div style={{ textAlign: 'center', marginBottom: mobile ? 40 : 56 }}>
            <Eyebrow>COACHES WHO ALREADY DO THIS</Eyebrow>
            <Heading as="h2">
              Hear from coaches using Milton
            </Heading>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : tablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gap: mobile ? 20 : 24,
            maxWidth: mobile ? 280 : 'none',
            margin: '0 auto',
          }}>
            <VideoTestimonial name="Bethany, Optimal Performance" />
            <VideoTestimonial name="Johnny O, Johnny O's Gym" />
            <VideoTestimonial name="Landon, Optimal Performance" />
          </div>

          <p style={{
            fontFamily: fonts.sans,
            fontSize: mobile ? 14 : 15,
            color: colors.inkSoft,
            textAlign: 'center',
            marginTop: mobile ? 32 : 40,
            maxWidth: 600,
            margin: `${mobile ? 32 : 40}px auto 0`,
            lineHeight: 1.6,
          }}>
            Built alongside coaches at Optimal Performance and {"Johnny O's"} Gym. Designed by a NASM-certified coach and former gym owner who built it because he needed it.
          </p>
        </Section>

        {/* The Math Section */}
        <Section bg={colors.bg2}>
          <div style={{ textAlign: 'center', marginBottom: mobile ? 40 : 56 }}>
            <Eyebrow>WHAT THIS REPLACES</Eyebrow>
            <Heading as="h2">
              Milton does the work of a full-time coach and a VA. For less than either one.
            </Heading>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)',
            gap: mobile ? 20 : 24,
          }}>
            <ComparisonColumn
              title="A full-time assistant coach"
              price="$2,000 to $3,000/mo"
              points="Limited hours. Needs training. Can quit."
            />
            <ComparisonColumn
              title="A virtual assistant"
              price="$500 to $800/mo"
              points="Handles admin. Can't program, can't coach, can't write in your voice."
            />
            <ComparisonColumn
              title="Milton"
              price="$99/mo"
              points="Does more than both. Works 24/7. Scales infinitely. Sounds exactly like you."
              highlight
            />
          </div>

          <p style={{
            fontFamily: fonts.serif,
            fontStyle: 'italic',
            fontSize: mobile ? 18 : 22,
            color: colors.ink,
            textAlign: 'center',
            marginTop: mobile ? 36 : 48,
            maxWidth: 700,
            margin: `${mobile ? 36 : 48}px auto 0`,
            lineHeight: 1.5,
          }}>
            One client retained one extra month covers Milton for a year. One new client at premium pricing covers it for a decade.
          </p>
        </Section>

        {/* Who This Is For Section */}
        <Section>
          <div style={{ textAlign: 'center', marginBottom: mobile ? 40 : 56 }}>
            <Eyebrow>THREE COACHES, ONE TOOL</Eyebrow>
            <Heading as="h2">
              Wherever you are, Milton meets you there.
            </Heading>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)',
            gap: mobile ? 20 : 24,
          }}>
            <PersonaCard
              title="The hungry coach charging $50 to $80"
              description="You know your service should feel more premium. You see other coaches charging triple and wonder what they have that you don't. Milton gives you the polish to justify charging what you're actually worth."
            />
            <PersonaCard
              title="The established coach charging $150+"
              description="Your service is already good. The bottleneck is you. Milton lets you take on more clients without diluting the experience, or keep your roster the same and finally have a life."
            />
            <PersonaCard
              title="The gym-employed coach building a book"
              description="You're trading hours for dollars and your side roster is suffering because you're tired at 8pm. Milton runs the side business while you're on the floor."
            />
          </div>
        </Section>

        {/* How It Works Section */}
        <Section bg={colors.bg2}>
          <div style={{ textAlign: 'center', marginBottom: mobile ? 40 : 56 }}>
            <Eyebrow>NO SETUP. JUST TALK.</Eyebrow>
            <Heading as="h2">
              {"Here's"} how it works
            </Heading>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: mobile ? 36 : 48,
            maxWidth: 680,
            margin: '0 auto',
          }}>
            <StepCard
              number="1"
              title="Tell Milton how you coach."
              description="One conversation. Drop in your programs, your intake form, your client notes. Milton learns your voice and your method in under an hour."
            />
            <StepCard
              number="2"
              title="Watch the premium layer turn on."
              description="Progress reports start writing themselves. Check-ins get drafted. Programs progress. Follow-ups get tracked. You approve, you send, you look like a $300 coach."
            />
            <StepCard
              number="3"
              title="Charge more. Keep longer. Refer more."
              description="The service feels different. Clients feel it. They stay. They tell people. Your average ticket goes up. Your churn goes down. The business works."
            />
          </div>
        </Section>

        {/* FAQ Section */}
        <Section>
          <div style={{ textAlign: 'center', marginBottom: mobile ? 40 : 56 }}>
            <Heading as="h2">
              What coaches ask before signing up
            </Heading>
          </div>

          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <FAQItem
              question="What if I'm not techy?"
              answer="You don't set Milton up. You talk to it. If you can text a client, you can use Milton."
            />
            <FAQItem
              question="Will it sound like me?"
              answer="Yes. Milton learns your voice from your existing programs, messages, and intake forms in the first session. Most coaches say it sounds like them within an hour."
            />
            <FAQItem
              question="Will my clients know it's AI?"
              answer="They'll know your service got noticeably better. They won't know how. Milton works behind you, not in front of you."
            />
            <FAQItem
              question="What if I don't have time to set this up?"
              answer="That's the point. There's no setup. You have a 20-minute conversation with Milton and the premium layer turns on. If you can find 20 minutes, you can run this."
            />
            <FAQItem
              question="What if I cancel?"
              answer="One click. No phone call, no retention pitch. Your data exports in one click. It's yours forever."
            />
            <FAQItem
              question="How is this different from ChatGPT?"
              answer="ChatGPT is a blank slate every time. Milton knows your clients, your programs, your voice, and your business. It's the difference between a tool and an assistant."
            />
            <FAQItem
              question="Will it replace me?"
              answer="No. It makes you look like the coach you've always wanted to be. Clients still see you, talk to you, train with you. Milton just makes sure none of the premium stuff falls through the cracks."
            />
          </div>
        </Section>

        {/* Final CTA Section */}
        <Section bg={colors.ink} id="final-cta">
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
            <Heading as="h2" style={{ color: colors.paper, marginBottom: mobile ? 20 : 24 }}>
              Try Milton free for 7 days.
            </Heading>
            <p style={{
              fontFamily: fonts.sans,
              fontSize: mobile ? 16 : 18,
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.75)',
              marginBottom: mobile ? 36 : 44,
            }}>
              No charge for the first week. $99 per month after that, locked in at founder pricing. Cancel anytime in one click. If you hate it, walk away. If you love it, your clients will too.
            </p>

            {/* Stripe Embed */}
            <div style={{
              background: colors.paper,
              borderRadius: 16,
              padding: mobile ? '32px 20px' : '44px 36px',
              marginBottom: 24,
            }}>
              <stripe-buy-button
                buy-button-id="buy_btn_1Tbnh4KiPCT0UZDq9NbnM5bk"
                publishable-key="pk_live_51MKZN0KiPCT0UZDqlFgbDoTliM6hXSCzi0Ol3B7QyM1aUV6nSpSQO1fHkEijnOQg0muhaL1QO0SI4ggn3U6L09pC003nURdg7T"
              />
            </div>

            <p style={{
              fontFamily: fonts.sans,
              fontSize: 13,
              color: 'rgba(255,255,255,0.5)',
            }}>
              Supported payment methods: Amex, Mastercard, Visa, Apple Pay, Link
            </p>
          </div>
        </Section>
      </main>

      <Footer mobile={mobile} />
    </div>
  )
}
