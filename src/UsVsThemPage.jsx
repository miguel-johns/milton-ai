import { useState, useEffect } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'

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
// Stripe checkout URL
const STRIPE_URL = "https://buy.stripe.com/8x2eVe0mT1bT6nueDUeUU0X"

// Reusable CTA Button component
function CTA({ children, href, variant = 'primary', onClick, style = {} }) {
  const isPrimary = variant === 'primary'
  
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: fonts.sans,
    fontSize: 15,
    fontWeight: 600,
    padding: '14px 28px',
    borderRadius: 10,
    textDecoration: 'none',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s ease',
    ...style,
  }

  const primaryStyle = {
    ...baseStyle,
    background: colors.ink,
    color: colors.paper,
  }

  const secondaryStyle = {
    ...baseStyle,
    background: 'transparent',
    color: colors.ink,
    border: `1px solid ${colors.line}`,
  }

  const buttonStyle = isPrimary ? primaryStyle : secondaryStyle

  if (onClick) {
    return (
      <button onClick={onClick} style={buttonStyle} className={isPrimary ? 'cta-primary' : 'cta-secondary'}>
        {children}
      </button>
    )
  }

  return (
    <a href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined} style={buttonStyle} className={isPrimary ? 'cta-primary' : 'cta-secondary'}>
      {children}
    </a>
  )
}

// Comparison Card component for the "Us vs Them" sections - Visual version
function ComparisonCard({ number, title, themContent, miltonContent, themMedia, miltonMedia, mobile }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: mobile ? 24 : 32,
      paddingTop: mobile ? 48 : 80,
    }}>
      {/* Section header */}
      <div style={{
        fontFamily: fonts.sans,
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: colors.accent,
        textAlign: 'center',
      }}>
        {number} — {title}
      </div>

      {/* Visual comparison grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
        gap: mobile ? 20 : 32,
      }}>
        {/* Them side */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}>
          {/* Them label */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <div style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: colors.inkMute,
            }} />
            <span style={{
              fontFamily: fonts.sans,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: colors.inkMute,
            }}>
              Them
            </span>
          </div>

          {/* Them media container */}
          <div style={{
            background: colors.paper,
            border: `1px solid ${colors.line}`,
            borderRadius: mobile ? 12 : 16,
            overflow: 'hidden',
            aspectRatio: mobile ? '4/3' : '16/10',
            position: 'relative',
          }}>
            {themMedia?.type === 'video' ? (
              <video
                src={themMedia.src}
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : themMedia?.type === 'loom' ? (
              <iframe
                src={themMedia.src}
                frameBorder="0"
                allowFullScreen
                style={{
                  width: '100%',
                  height: '100%',
                }}
                title={`Them - ${title}`}
              />
            ) : themMedia?.type === 'iframe' ? (
              <iframe
                src={themMedia.src}
                frameBorder="0"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
                title={`Them - ${title}`}
              />
            ) : themMedia?.type === 'image' ? (
              <img
                src={themMedia.src}
                alt={`Traditional software - ${title}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              /* Placeholder */
              <div style={{
                width: '100%',
                height: '100%',
                background: `linear-gradient(135deg, ${colors.lineSoft} 0%, #E8EAED 100%)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
              }}>
                {/* Fake UI elements */}
                <div style={{
                  width: '80%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}>
                  <div style={{ height: 8, background: colors.line, borderRadius: 4, width: '60%' }} />
                  <div style={{ height: 6, background: colors.line, borderRadius: 3, width: '80%' }} />
                  <div style={{ height: 6, background: colors.line, borderRadius: 3, width: '70%' }} />
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <div style={{ height: 24, background: colors.line, borderRadius: 6, width: 60 }} />
                    <div style={{ height: 24, background: colors.line, borderRadius: 6, width: 60 }} />
                    <div style={{ height: 24, background: colors.line, borderRadius: 6, width: 60 }} />
                  </div>
                </div>
                <span style={{
                  fontFamily: fonts.sans,
                  fontSize: 11,
                  color: colors.inkMute,
                  marginTop: 8,
                }}>
                  Complex UI walkthrough
                </span>
              </div>
            )}
          </div>

          {/* Them description */}
          <p style={{
            fontFamily: fonts.sans,
            fontSize: mobile ? 13 : 14,
            lineHeight: 1.6,
            color: colors.inkSoft,
            margin: 0,
          }}>
            {themContent}
          </p>
        </div>

        {/* Milton side */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}>
          {/* Milton label */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <div style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: colors.accent,
            }} />
            <span style={{
              fontFamily: fonts.sans,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: colors.accent,
            }}>
              Milton
            </span>
          </div>

          {/* Milton media container */}
          <div style={{
            background: colors.accentSoft,
            border: `1px solid ${colors.accent}30`,
            borderRadius: mobile ? 12 : 16,
            overflow: 'hidden',
            aspectRatio: mobile ? '4/3' : '16/10',
            position: 'relative',
          }}>
            {miltonMedia?.type === 'video' ? (
              <video
                src={miltonMedia.src}
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : miltonMedia?.type === 'loom' ? (
              <iframe
                src={miltonMedia.src}
                frameBorder="0"
                allowFullScreen
                style={{
                  width: '100%',
                  height: '100%',
                }}
                title={`Milton - ${title}`}
              />
            ) : miltonMedia?.type === 'iframe' ? (
              <iframe
                src={miltonMedia.src}
                frameBorder="0"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
                title={`Milton - ${title}`}
              />
            ) : miltonMedia?.type === 'image' ? (
              <img
                src={miltonMedia.src}
                alt={`Milton - ${title}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              /* Placeholder - chat bubble style */
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: mobile ? 16 : 24,
              }}>
                {/* Chat message mockup */}
                <div style={{
                  background: colors.paper,
                  borderRadius: 12,
                  padding: mobile ? '12px 16px' : '16px 20px',
                  maxWidth: '90%',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 8,
                  }}>
                    <div style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: colors.accent,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                      </svg>
                    </div>
                    <span style={{
                      fontFamily: fonts.sans,
                      fontSize: 11,
                      fontWeight: 600,
                      color: colors.inkMute,
                    }}>
                      Voice command
                    </span>
                  </div>
                  <p style={{
                    fontFamily: fonts.serif,
                    fontSize: mobile ? 14 : 16,
                    fontStyle: 'italic',
                    color: colors.ink,
                    margin: 0,
                    lineHeight: 1.4,
                  }}>
                    {`"${miltonContent}"`}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Milton one-liner */}
          <p style={{
            fontFamily: fonts.serif,
            fontSize: mobile ? 15 : 17,
            fontStyle: 'italic',
            lineHeight: 1.5,
            color: colors.ink,
            margin: 0,
          }}>
            One sentence. Done.
          </p>
        </div>
      </div>
    </div>
  )
}

// Revenue card component
function RevenueCard({ number, title, amount, description, mobile }) {
  return (
    <div style={{
      background: colors.paper,
      border: `1px solid ${colors.line}`,
      borderRadius: 16,
      padding: mobile ? 20 : 28,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }}>
      <div style={{
        fontFamily: fonts.sans,
        fontSize: 12,
        fontWeight: 600,
        color: colors.accent,
      }}>
        {number}
      </div>
      <h3 style={{
        fontFamily: fonts.serif,
        fontSize: mobile ? 20 : 24,
        fontWeight: 500,
        color: colors.ink,
        margin: 0,
        lineHeight: 1.3,
      }}>
        {title}
      </h3>
      <div style={{
        fontFamily: fonts.sans,
        fontSize: mobile ? 14 : 15,
        fontWeight: 600,
        color: colors.accent,
      }}>
        {amount}
      </div>
      <p style={{
        fontFamily: fonts.sans,
        fontSize: mobile ? 13 : 14,
        lineHeight: 1.6,
        color: colors.inkSoft,
        margin: 0,
      }}>
        {description}
      </p>
    </div>
  )
}

export default function UsVsThemPage() {
  const { mobile } = useBreakpoint()
  const [calendlyModalOpen, setCalendlyModalOpen] = useState(false)

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.bg,
      fontFamily: fonts.sans,
      color: colors.ink,
    }}>
      <style>{`
        .cta-primary:hover {
          background: #0a1220 !important;
          transform: translateY(-1px);
        }
        .cta-secondary:hover {
          background: ${colors.lineSoft} !important;
          border-color: ${colors.inkMute} !important;
        }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <Header currentPage="us-vs-them" />

      <main>
        {/* Hero Section */}
        <section style={{
          padding: mobile ? '48px 16px 64px' : '100px 24px 120px',
          maxWidth: 900,
          margin: '0 auto',
          textAlign: 'center',
        }}>
          {/* Eyebrow */}
          <span style={{
            display: 'inline-block',
            fontFamily: fonts.sans,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: colors.accent,
            marginBottom: 20,
          }}>
            Us vs them
          </span>

          {/* Headline */}
          <h1 style={{
            fontFamily: fonts.serif,
            fontSize: mobile ? 32 : 56,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            fontWeight: 500,
            marginBottom: 24,
            color: colors.ink,
          }}>
            They built software.{' '}
            <em style={{ fontStyle: 'italic', color: colors.inkSoft }}>
              We built an assistant.
            </em>
          </h1>

          {/* Sub */}
          <p style={{
            fontFamily: fonts.sans,
            fontSize: mobile ? 16 : 18,
            lineHeight: 1.6,
            color: colors.inkSoft,
            maxWidth: 600,
            margin: '0 auto 32px',
          }}>
            One you have to learn. One you just talk to.
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex',
            flexDirection: mobile ? 'column' : 'row',
            gap: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <CTA href={STRIPE_URL}>Start free trial</CTA>
            <CTA variant="secondary" onClick={() => setCalendlyModalOpen(true)}>Book a call</CTA>
          </div>
        </section>

        {/* Hero media - Milton chat bubble visual */}
        <section style={{
          maxWidth: 800,
          margin: '0 auto',
          padding: mobile ? '0 16px 48px' : '0 24px 100px',
        }}>
          <div style={{
            background: colors.accentSoft,
            border: `1px solid ${colors.accent}30`,
            borderRadius: 20,
            padding: mobile ? 32 : 56,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: mobile ? 20 : 28,
          }}>
            {/* Chat message mockup */}
            <div style={{
              background: colors.paper,
              borderRadius: 16,
              padding: mobile ? '20px 24px' : '28px 36px',
              maxWidth: 500,
              width: '100%',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 16,
              }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: colors.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                  </svg>
                </div>
                <span style={{
                  fontFamily: fonts.sans,
                  fontSize: 13,
                  fontWeight: 600,
                  color: colors.inkMute,
                  letterSpacing: '0.02em',
                }}>
                  Just say it
                </span>
              </div>
              <p style={{
                fontFamily: fonts.serif,
                fontSize: mobile ? 20 : 26,
                fontStyle: 'italic',
                color: colors.ink,
                margin: 0,
                lineHeight: 1.35,
              }}>
                {`"Build Sarah a 4-week program for her shoulder rehab. She can train 3 days a week."`}
              </p>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section style={{
          padding: mobile ? '48px 16px' : '100px 40px',
          textAlign: 'center',
          background: colors.bg2,
        }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            {/* Eyebrow */}
            <span style={{
              display: 'inline-block',
              fontFamily: fonts.sans,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: colors.accent,
              marginBottom: 20,
            }}>
              The difference
            </span>

            {/* Headline */}
            <h2 style={{
              fontFamily: fonts.serif,
              fontSize: mobile ? 28 : 44,
              lineHeight: 1.15,
              fontWeight: 500,
              color: colors.ink,
              marginBottom: 20,
            }}>
              The juice isn&apos;t worth the squeeze.
            </h2>

            {/* Sub */}
            <p style={{
              fontFamily: fonts.sans,
              fontSize: mobile ? 15 : 17,
              lineHeight: 1.7,
              color: colors.inkSoft,
              maxWidth: 700,
              margin: '0 auto',
            }}>
              Traditional coaching software promises a lot. Then it asks you to learn it, set it up, teach your members, and click around forever to actually use it. Milton just listens.
            </p>
          </div>
        </section>

        {/* Comparison Sections */}
        <div style={{
          maxWidth: 1000,
          margin: '0 auto',
          padding: mobile ? '0 16px 48px' : '0 40px 100px',
        }}>
          <ComparisonCard
            number="01"
            title="PROGRAM BUILDING"
            themContent="Open the builder. Pick a template. Drag in exercises. Set reps, sets, tempo, rest. Save as a block. Build a week. Duplicate. Adjust. Assign to client. Hope they open it."
            themMedia={{ type: 'iframe', src: '/animations/them-program-building.html' }}
            miltonContent="Build Omar a 4-week strength program with basketball mixed in."
            mobile={mobile}
          />

          <ComparisonCard
            number="02"
            title="CLIENT CHECK-INS"
            themContent="Open the dashboard. Filter by client. Read their last check-in. Open their messages. Type a reply. Pull up their progress. Copy a stat. Paste it in. Send."
            miltonContent="How's Sarah doing this week?"
            mobile={mobile}
          />

          <ComparisonCard
            number="03"
            title="NUTRITION"
            themContent="Set up macro targets. Build a meal template. Assign to client. Show them how to log. Remind them to log. Review their log. Adjust. Reassign."
            miltonContent="Set Jenna up on a 1,800 calorie cut and check her meals daily."
            mobile={mobile}
          />

          <ComparisonCard
            number="04"
            title="CHALLENGES"
            themContent="Create a program. Build the marketing. Set the pricing. Build a sign-up flow. Set up the messaging cadence. Manually track who's in, who's out, who's winning."
            miltonContent="Run a 30-day nutrition challenge for my members."
            mobile={mobile}
          />

          <ComparisonCard
            number="05"
            title="REPORTING"
            themContent="Export the data. Open a spreadsheet. Build a chart. Format it. Write the takeaways. Send the email."
            miltonContent="Send Collins his 30-day progress report."
            mobile={mobile}
          />
        </div>

        {/* The Pattern Section */}
        <section style={{
          padding: mobile ? '48px 16px' : '100px 40px',
          textAlign: 'center',
          background: colors.bg2,
        }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            {/* Eyebrow */}
            <span style={{
              display: 'inline-block',
              fontFamily: fonts.sans,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: colors.accent,
              marginBottom: 20,
            }}>
              The pattern
            </span>

            {/* Headline */}
            <h2 style={{
              fontFamily: fonts.serif,
              fontSize: mobile ? 28 : 44,
              lineHeight: 1.15,
              fontWeight: 500,
              color: colors.ink,
              marginBottom: 20,
            }}>
              One sentence in. Work done.
            </h2>

            {/* Sub */}
            <p style={{
              fontFamily: fonts.sans,
              fontSize: mobile ? 15 : 17,
              lineHeight: 1.7,
              color: colors.inkSoft,
              maxWidth: 700,
              margin: '0 auto',
            }}>
              That&apos;s it. That&apos;s the whole product. The reason coaches stay on Milton is the reason they leave everyone else: they don&apos;t have to think about the software. They just coach.
            </p>
          </div>
        </section>

        {/* Revenue Section */}
        <section style={{
          maxWidth: 1000,
          margin: '0 auto',
          padding: mobile ? '48px 16px' : '100px 40px',
        }}>
          <div style={{ textAlign: 'center', marginBottom: mobile ? 32 : 48 }}>
            {/* Eyebrow */}
            <span style={{
              display: 'inline-block',
              fontFamily: fonts.sans,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: colors.accent,
              marginBottom: 20,
            }}>
              While you&apos;re here
            </span>

            {/* Headline */}
            <h2 style={{
              fontFamily: fonts.serif,
              fontSize: mobile ? 28 : 44,
              lineHeight: 1.15,
              fontWeight: 500,
              color: colors.ink,
              marginBottom: 12,
            }}>
              And once you stop fighting your software, here&apos;s what it pays for.
            </h2>
          </div>

          {/* Revenue cards grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)',
            gap: mobile ? 16 : 24,
            marginBottom: mobile ? 32 : 48,
          }}>
            <RevenueCard
              number="01"
              title="Run an AI-powered challenge."
              amount="$17,880 / year"
              description="30 members at $149, run quarterly."
              mobile={mobile}
            />
            <RevenueCard
              number="02"
              title="Sell AI personal training as a new service."
              amount="$4,950 / month"
              description="50 members at $99, from your existing base."
              mobile={mobile}
            />
            <RevenueCard
              number="03"
              title="Make every offer you already sell worth more."
              amount="1 extra month"
              description="of retention from one member covers Milton."
              mobile={mobile}
            />
          </div>

          {/* See how it works link */}
          <div style={{ textAlign: 'center' }}>
            <a 
              href="/"
              style={{
                fontFamily: fonts.sans,
                fontSize: 15,
                fontWeight: 600,
                color: colors.accent,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              See how it works
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10m0 0L9 4m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </section>

        {/* Final CTA Section */}
        <section style={{
          background: colors.bg2,
          padding: mobile ? '48px 16px 64px' : '100px 40px 120px',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            {/* Eyebrow */}
            <span style={{
              display: 'inline-block',
              fontFamily: fonts.sans,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: colors.accent,
              marginBottom: 20,
            }}>
              Get started
            </span>

            {/* Headline */}
            <h2 style={{
              fontFamily: fonts.serif,
              fontSize: mobile ? 28 : 48,
              lineHeight: 1.12,
              fontWeight: 500,
              color: colors.ink,
              marginBottom: 20,
            }}>
              Stop learning software. Start talking.
            </h2>

            {/* Sub */}
            <p style={{
              fontFamily: fonts.sans,
              fontSize: mobile ? 15 : 17,
              lineHeight: 1.7,
              color: colors.inkSoft,
              marginBottom: 32,
            }}>
              Try Milton free or have us walk you through it. Either way, you&apos;ll be running it in minutes.
            </p>

            {/* CTAs */}
            <div style={{
              display: 'flex',
              flexDirection: mobile ? 'column' : 'row',
              gap: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <CTA href={STRIPE_URL}>Start free trial</CTA>
              <CTA variant="secondary" onClick={() => setCalendlyModalOpen(true)}>Book a call</CTA>
            </div>
          </div>
        </section>

        <Footer />
      </main>

      {/* Calendly Modal */}
      {calendlyModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: mobile ? 16 : 20,
          }}
        >
          <div
            onClick={() => setCalendlyModalOpen(false)}
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
            maxWidth: 700,
            height: mobile ? 'calc(100vh - 32px)' : 750,
            maxHeight: 'calc(100vh - 40px)',
            background: colors.paper,
            borderRadius: 20,
            boxShadow: '0 24px 64px rgba(11, 22, 40, 0.18), 0 4px 16px rgba(11, 22, 40, 0.08)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <button 
              onClick={() => setCalendlyModalOpen(false)}
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                width: 32,
                height: 32,
                borderRadius: 8,
                border: 'none',
                background: 'rgba(255,255,255,0.9)',
                color: colors.inkMute,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
              }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <iframe 
              src="https://calendly.com/miguel-johns/milton-demo?hide_gdpr_banner=1&primary_color=006c55"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              title="Schedule a call with Milton"
            />
          </div>
        </div>
      )}
    </div>
  )
}
