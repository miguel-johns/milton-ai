import { useState, useEffect, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import Footer from './components/Footer'
import Header from './components/Header'
import TestimonialVideos from './components/TestimonialVideos'

// Initialize Supabase client - use VITE_ prefixed vars for client-side access
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

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

// Milton logo image
const logoImage = "/images/milton-logo.png"

// Calendly booking URL
const CALENDLY_URL = "https://calendly.com/miguel-getmilton/30min"
// Stripe checkout URL
const STRIPE_URL = "https://buy.stripe.com/8x2eVe0mT1bT6nueDUeUU0X"

export default function NewHomePage() {
  const { mobile } = useBreakpoint()
  const [chatModalOpen, setChatModalOpen] = useState(false)
  const [chatSubmitted, setChatSubmitted] = useState(false)
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', company: '' })
  const [leadSubmitting, setLeadSubmitting] = useState(false)
  const [leadError, setLeadError] = useState(null)
  const [calendlyModalOpen, setCalendlyModalOpen] = useState(false)

  const closeChatModal = () => {
    setChatModalOpen(false)
    setTimeout(() => {
      setChatSubmitted(false)
      setLeadForm({ name: '', email: '', phone: '', company: '' })
      setLeadError(null)
    }, 300)
  }

  const handleLeadSubmit = async (e) => {
    e.preventDefault()
    setLeadError(null)
    setLeadSubmitting(true)

    try {
      if (!supabase) {
        throw new Error('Database connection not configured')
      }

      const { error } = await supabase
        .from('leads')
        .insert({
          name: leadForm.name.trim(),
          email: leadForm.email.toLowerCase().trim(),
          phone: leadForm.phone.trim(),
          company: leadForm.company?.trim() || null,
        })

      if (error) {
        if (error.code === '23505') {
          throw new Error('This email is already registered')
        }
        throw new Error('Failed to save your information')
      }

      setChatSubmitted(true)
    } catch (err) {
      setLeadError(err.message)
    } finally {
      setLeadSubmitting(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.bg,
      fontFamily: fonts.sans,
      color: colors.ink,
    }}>
      <Header currentPage="milton-makes-money" />

      <main>
        {/* Hero Section */}
        <section style={{
          padding: mobile ? '64px 20px 80px' : '100px 24px 120px',
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
            For gyms &amp; coaches
          </span>

          {/* Headline */}
          <h1 style={{
            fontFamily: fonts.serif,
            fontSize: mobile ? 38 : 56,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            fontWeight: 500,
            marginBottom: 24,
            color: colors.ink,
          }}>
            Three ways to make more per member.{' '}
            <em style={{ fontStyle: 'italic', color: colors.inkSoft }}>
              No new staff. No new members.
            </em>
          </h1>

          {/* Sub */}
          <p style={{
            fontFamily: fonts.sans,
            fontSize: mobile ? 17 : 20,
            lineHeight: 1.55,
            color: colors.inkSoft,
            maxWidth: 600,
            margin: '0 auto 40px',
          }}>
            Milton is AI for fitness businesses. You don&apos;t set it up. You just talk to it.
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex',
            flexDirection: mobile ? 'column' : 'row',
            gap: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <a 
              href={STRIPE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-link"
              style={{
                background: colors.ink,
                color: colors.bg,
                padding: '16px 32px',
                borderRadius: 10,
                fontFamily: fonts.sans,
                fontSize: 15,
                fontWeight: 600,
                textDecoration: 'none',
                letterSpacing: '0.01em',
              }}
            >
              Start free trial
            </a>
            <button 
              onClick={() => setCalendlyModalOpen(true)}
              className="cta-link"
              style={{
                background: 'transparent',
                color: colors.ink,
                padding: '16px 32px',
                borderRadius: 10,
                fontFamily: fonts.sans,
                fontSize: 15,
                fontWeight: 500,
                textDecoration: 'none',
                border: `1px solid ${colors.line}`,
                cursor: 'pointer',
              }}
            >
              Book a call
            </button>
          </div>

          {/* Hero animation - responsive desktop/mobile versions */}
          <div style={{
            marginTop: 64,
            borderRadius: 20,
            overflow: 'hidden',
            border: `1px solid ${colors.line}`,
            boxShadow: '0 4px 24px rgba(11, 22, 40, 0.08)',
            position: 'relative',
            paddingBottom: mobile ? '177.78%' : '56.25%', // 9:16 for mobile, 16:9 for desktop
            height: 0,
            background: colors.paper,
          }}>
            <iframe
              src={mobile ? '/animations/milton-experience-hero-mobile.html' : '/animations/milton-experience-hero-desktop.html'}
              title="Milton AI Experience"
              frameBorder="0"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
              }}
            />
          </div>
        </section>

        {/* Testimonial Videos */}
        <TestimonialVideos mobile={mobile} />

        {/* Three Ways - Intro */}
        <section style={{
          padding: mobile ? '64px 20px 48px' : '100px 24px 64px',
          maxWidth: 800,
          margin: '0 auto',
          textAlign: 'center',
        }}>
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
            The three ways
          </span>

          <h2 style={{
            fontFamily: fonts.serif,
            fontSize: mobile ? 32 : 44,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            fontWeight: 500,
            marginBottom: 16,
            color: colors.ink,
          }}>
            Same gym. Same coaches.{' '}
            <em style={{ fontStyle: 'italic' }}>More revenue per member.</em>
          </h2>

          <p style={{
            fontFamily: fonts.sans,
            fontSize: mobile ? 16 : 18,
            lineHeight: 1.55,
            color: colors.inkSoft,
          }}>
            Each one starts paying back in days, not months.
          </p>
        </section>

        {/* Way 01 - Challenges */}
        <WaySection
          mobile={mobile}
          number="01"
          label="Challenges"
          headline="Run an AI-powered challenge."
          body="Tell Milton you want to run a 30-day nutrition challenge. It builds the structure, drafts the welcome email, sends the text, and keeps every client accountable. Your coach checks in ten minutes a week."
          revenueLabel="Example revenue"
          revenueAmount="$17,880 / year"
          revenueNote="30 members at $149, run quarterly"
          media={<ChatDemo mobile={mobile} messages={[
            { sender: 'user', text: "I want to run a 30-day nutrition challenge." },
            { sender: 'milton', text: "Great. I'll build the challenge structure, draft the welcome email, and create the daily text check-ins." },
            { sender: 'user', text: "Can you make it simple for beginners?" },
            { sender: 'milton', text: "Yes. I'll focus week one on logging meals, drinking water, and hitting a simple protein target." },
            { sender: 'user', text: "What do I need to do each week?" },
            { sender: 'milton', text: "Review the weekly summary, celebrate wins, and check in with anyone falling behind." },
            { sender: 'user', text: "Okay, build it." },
            { sender: 'milton', text: "Done. Your challenge outline, welcome email, signup form, and first week of texts are ready." },
          ]} />}
        />

        {/* Way 02 - New Service */}
        <WaySection
          mobile={mobile}
          number="02"
          label="New service"
          headline="Sell AI personal training as a new service."
          body="Milton builds the programs, tracks the meals, and follows up. One coach can serve up to 100 members. You finally have a lower-tier option for the members who can&apos;t afford traditional PT."
          revenueLabel="Example revenue"
          revenueAmount="$4,950 / month"
          revenueNote="50 members at $99, from your existing base"
          reverse
          media={<ChatDemo mobile={mobile} messages={[
            { sender: 'user', text: "I want to launch AI personal training for members who don't buy 1-on-1 coaching." },
            { sender: 'milton', text: "Great. I can help you build the offer, create the onboarding flow, and generate the first 30 days of workouts, nutrition check-ins, and progress tracking." },
            { sender: 'user', text: "What does my trainer actually do?" },
            { sender: 'milton', text: "One monthly check-in per member. I handle the workouts, meal tracking, daily follow-ups, and progress reports." },
            { sender: 'user', text: "Build the launch plan." },
            { sender: 'milton', text: "Done. Here's your 14-day rollout: offer page, trainer script, member invite text, onboarding form, and first progress report template." },
          ]} />}
        />

        {/* Way 03 - Every Offer */}
        <WaySection
          mobile={mobile}
          number="03"
          label="Every offer"
          headline="Make every offer you already sell worth more."
          body="Personalized programs and real support between sessions. Coaches walk into every session knowing what&apos;s going on with the client. Retention goes up, upgrades happen on their own, referrals follow."
          revenueLabel="Example payback"
          revenueAmount="1 extra month"
          revenueNote="One extra month of retention from one member covers Milton"
          media={<ChatDemo mobile={mobile} messages={[
            { sender: 'user', text: "I want my clients to get more support between sessions." },
            { sender: 'milton', text: "Great. I can build personalized programs, track meals, and send daily check-ins between appointments." },
            { sender: 'user', text: "Can you help me see what's going on before each session?" },
            { sender: 'milton', text: "Yes. I'll organize their progress, habits, and check-in data into a simple summary for you." },
            { sender: 'user', text: "What does that change for me?" },
            { sender: 'milton', text: "You walk into every session with context. Clients feel more supported, stay longer, and are more likely to upgrade." },
            { sender: 'user', text: "Okay, set it up." },
            { sender: 'milton', text: "Done. Your programs, follow-ups, and session summaries are ready." },
          ]} />}
        />

        {/* How It Works */}
        <section style={{
          padding: mobile ? '80px 20px' : '120px 24px',
          background: colors.paper,
          borderTop: `1px solid ${colors.line}`,
          borderBottom: `1px solid ${colors.line}`,
        }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: mobile ? 48 : 64 }}>
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
                How it works
              </span>

              <h2 style={{
                fontFamily: fonts.serif,
                fontSize: mobile ? 32 : 44,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                fontWeight: 500,
                marginBottom: 16,
                color: colors.ink,
              }}>
                You don&apos;t set up Milton.{' '}
                <em style={{ fontStyle: 'italic' }}>You just talk to it.</em>
              </h2>

              <p style={{
                fontFamily: fonts.sans,
                fontSize: mobile ? 16 : 18,
                lineHeight: 1.55,
                color: colors.inkSoft,
                maxWidth: 560,
                margin: '0 auto',
              }}>
              Nothing to build out. You upload your client base and your methodology. Milton learns both. From that day on, you talk.
              </p>
            </div>

            {/* Steps */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)',
              gap: mobile ? 32 : 24,
            }}>
              <HowItWorksStep
                number="1"
                title="You upload."
                description="Your member base and your coaching methodology."
                mobile={mobile}
              />
              <HowItWorksStep
                number="2"
                title="Milton learns."
                description="Your members, your programs, your standards."
                mobile={mobile}
              />
              <HowItWorksStep
                number="3"
                title="You talk."
                description="Build programs, run challenges, prep for sessions. By talking."
                mobile={mobile}
              />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section style={{
          padding: mobile ? '80px 20px' : '120px 24px',
          textAlign: 'center',
          background: `
            radial-gradient(ellipse 800px 400px at 50% 100%, rgba(43, 191, 170, 0.08) 0%, transparent 60%),
            ${colors.bg}
          `,
        }}>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
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

            <h2 style={{
              fontFamily: fonts.serif,
              fontSize: mobile ? 36 : 48,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              fontWeight: 500,
              marginBottom: 16,
              color: colors.ink,
            }}>
              Start making more per member.
            </h2>

            <p style={{
              fontFamily: fonts.sans,
              fontSize: mobile ? 16 : 18,
              lineHeight: 1.55,
              color: colors.inkSoft,
              marginBottom: 40,
            }}>
              Try Milton free or have us walk you through it. Either way, you&apos;ll see it in minutes.
            </p>

            <div style={{
              display: 'flex',
              flexDirection: mobile ? 'column' : 'row',
              gap: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <a 
                href={STRIPE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-link"
                style={{
                  background: colors.ink,
                  color: colors.bg,
                  padding: '16px 32px',
                  borderRadius: 10,
                  fontFamily: fonts.sans,
                  fontSize: 15,
                  fontWeight: 600,
                  textDecoration: 'none',
                  letterSpacing: '0.01em',
                }}
              >
                Start free trial
              </a>
              <button 
                onClick={() => setCalendlyModalOpen(true)}
                className="cta-link"
                style={{
                  background: 'transparent',
                  color: colors.ink,
                  padding: '16px 32px',
                  borderRadius: 10,
                  fontFamily: fonts.sans,
                  fontSize: 15,
                  fontWeight: 500,
                  textDecoration: 'none',
                  border: `1px solid ${colors.line}`,
                  cursor: 'pointer',
                }}
              >
                Book a call
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer mobile={mobile} onOpenChat={() => setChatModalOpen(true)} />

      {/* Chat Modal */}
      {chatModalOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: mobile ? 'flex-end' : 'center',
            justifyContent: 'center',
            padding: mobile ? 16 : 20,
          }}
        >
          <div 
            onClick={closeChatModal}
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
            maxWidth: 440,
            maxHeight: mobile ? 'calc(100vh - 32px)' : 'calc(100vh - 40px)',
            overflowY: 'auto',
            background: colors.paper,
            borderRadius: 20,
            boxShadow: '0 24px 64px rgba(11, 22, 40, 0.18), 0 4px 16px rgba(11, 22, 40, 0.08)',
            padding: mobile ? '40px 24px 36px' : '48px 36px 44px',
          }}>
            <button 
              onClick={closeChatModal}
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

            {!chatSubmitted ? (
              <>
                <h3 style={{
                  fontFamily: fonts.serif,
                  fontSize: 28,
                  fontWeight: 500,
                  fontStyle: 'italic',
                  color: colors.ink,
                  lineHeight: 1.2,
                  marginBottom: 12,
                  letterSpacing: '-0.01em',
                }}>
                  Let&apos;s talk.
                </h3>

                <p style={{
                  fontSize: 15,
                  lineHeight: 1.5,
                  color: colors.inkSoft,
                  marginBottom: 24,
                }}>
                  Drop your info and we&apos;ll reach out to set up a call.
                </p>

                <form onSubmit={handleLeadSubmit}>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{
                      display: 'block',
                      fontSize: 13,
                      color: colors.inkMute,
                      marginBottom: 6,
                    }}>
                      Your name
                    </label>
                    <input 
                      type="text"
                      placeholder="First Last"
                      required
                      value={leadForm.name || ''}
                      onChange={(e) => setLeadForm(f => ({ ...f, name: e.target.value }))}
                      style={{
                        width: '100%',
                        border: `1px solid ${colors.line}`,
                        borderRadius: 8,
                        padding: '12px 14px',
                        fontFamily: fonts.sans,
                        fontSize: 15,
                        color: colors.ink,
                        background: colors.paper,
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{
                      display: 'block',
                      fontSize: 13,
                      color: colors.inkMute,
                      marginBottom: 6,
                    }}>
                      Email address
                    </label>
                    <input 
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={leadForm.email || ''}
                      onChange={(e) => setLeadForm(f => ({ ...f, email: e.target.value }))}
                      style={{
                        width: '100%',
                        border: `1px solid ${colors.line}`,
                        borderRadius: 8,
                        padding: '12px 14px',
                        fontFamily: fonts.sans,
                        fontSize: 15,
                        color: colors.ink,
                        background: colors.paper,
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{
                      display: 'block',
                      fontSize: 13,
                      color: colors.inkMute,
                      marginBottom: 6,
                    }}>
                      Phone number
                    </label>
                    <input 
                      type="tel"
                      placeholder="(555) 555 0100"
                      required
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm(f => ({ ...f, phone: e.target.value }))}
                      style={{
                        width: '100%',
                        border: `1px solid ${colors.line}`,
                        borderRadius: 8,
                        padding: '12px 14px',
                        fontFamily: fonts.sans,
                        fontSize: 15,
                        color: colors.ink,
                        background: colors.paper,
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={{
                      display: 'block',
                      fontSize: 13,
                      color: colors.inkMute,
                      marginBottom: 6,
                    }}>
                      Business name (optional)
                    </label>
                    <input 
                      type="text"
                      placeholder="Your gym or coaching business"
                      value={leadForm.company || ''}
                      onChange={(e) => setLeadForm(f => ({ ...f, company: e.target.value }))}
                      style={{
                        width: '100%',
                        border: `1px solid ${colors.line}`,
                        borderRadius: 8,
                        padding: '12px 14px',
                        fontFamily: fonts.sans,
                        fontSize: 15,
                        color: colors.ink,
                        background: colors.paper,
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={leadSubmitting}
                    style={{
                      width: '100%',
                      background: colors.ink,
                      color: colors.bg,
                      border: 'none',
                      padding: '14px 20px',
                      borderRadius: 10,
                      fontFamily: fonts.sans,
                      fontSize: 15,
                      fontWeight: 600,
                      cursor: leadSubmitting ? 'not-allowed' : 'pointer',
                      opacity: leadSubmitting ? 0.7 : 1,
                    }}
                  >
                    {leadSubmitting ? 'Sending...' : 'Get in touch'}
                  </button>

                  {leadError && (
                    <p style={{
                      fontSize: 13,
                      color: '#DC2626',
                      marginTop: 12,
                      padding: '8px 12px',
                      background: '#FEF2F2',
                      borderRadius: 8,
                    }}>
                      {leadError}
                    </p>
                  )}
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '8px 0 12px' }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: colors.mintSoft,
                  color: colors.accentDeep,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}>
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <h4 style={{
                  fontFamily: fonts.serif,
                  fontStyle: 'italic',
                  fontWeight: 500,
                  fontSize: 26,
                  color: colors.ink,
                  marginBottom: 8,
                  letterSpacing: '-0.01em',
                }}>Talk soon.</h4>
                <p style={{
                  fontSize: 14,
                  color: colors.inkSoft,
                  lineHeight: 1.5,
                  maxWidth: 280,
                  margin: '0 auto',
                }}>
                  We&apos;ll reach out within 24 hours to set up a time.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
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
        .cta-link {
          transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
        }
        .cta-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(11, 22, 40, 0.12);
        }
      `}</style>

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

// Chat Demo Component for Way sections
function ChatDemo({ mobile, messages, senderLabel = 'owner' }) {
  return (
    <div style={{
      background: colors.paper,
      borderRadius: 16,
      border: `1px solid ${colors.line}`,
      boxShadow: '0 2px 12px rgba(11, 22, 40, 0.06)',
      overflow: 'hidden',
    }}>
      <style>{`
        .chat-messages-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .chat-messages-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-messages-scroll::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.15);
          border-radius: 4px;
        }
        .chat-messages-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.25);
        }
        .chat-messages-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(0, 0, 0, 0.15) transparent;
        }
      `}</style>
      {/* Chat header */}
      <div style={{
        padding: '14px 18px',
        borderBottom: `1px solid ${colors.line}`,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: colors.bg,
      }}>
        <div style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: colors.accentSoft,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <img 
            src="/images/milton-logo.png"
            alt="Milton"
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
        </div>
        <span style={{
          fontFamily: fonts.sans,
          fontSize: 14,
          fontWeight: 600,
          color: colors.ink,
        }}>
          Milton
        </span>
        <span style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: colors.accent,
          marginLeft: -4,
        }} />
      </div>

      {/* Messages */}
      <div 
        className="chat-messages-scroll"
        style={{
          padding: mobile ? '16px 14px' : '20px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          maxHeight: mobile ? 340 : 380,
          overflowY: 'auto',
        }}
      >
        {messages.map((msg, i) => (
          <div 
            key={i}
            style={{
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <div style={{
              maxWidth: '85%',
              padding: '10px 14px',
              borderRadius: msg.sender === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
              background: msg.sender === 'user' ? colors.ink : colors.accentSoft,
              color: msg.sender === 'user' ? colors.paper : colors.ink,
              fontFamily: fonts.sans,
              fontSize: mobile ? 13 : 14,
              lineHeight: 1.5,
            }}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Way Section Component
function WaySection({ mobile, number, label, headline, body, revenueLabel, revenueAmount, revenueNote, reverse, media }) {
  return (
    <section style={{
      padding: mobile ? '64px 20px' : '80px 24px',
      maxWidth: 1100,
      margin: '0 auto',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
        gap: mobile ? 40 : 80,
        alignItems: 'center',
      }}>
        {/* Content */}
        <div style={{ order: mobile ? 1 : (reverse ? 2 : 1) }}>
          {/* Number / Label */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 20,
          }}>
            <span style={{
              fontFamily: fonts.serif,
              fontStyle: 'italic',
              fontSize: 32,
              fontWeight: 500,
              color: colors.accent,
              lineHeight: 1,
            }}>
              {number}
            </span>
            <span style={{
              fontFamily: fonts.sans,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: colors.inkMute,
            }}>
              {label}
            </span>
          </div>

          {/* Headline */}
          <h3 style={{
            fontFamily: fonts.serif,
            fontSize: mobile ? 28 : 36,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            fontWeight: 500,
            marginBottom: 16,
            color: colors.ink,
          }}>
            {headline}
          </h3>

          {/* Body */}
          <p style={{
            fontFamily: fonts.sans,
            fontSize: mobile ? 15 : 17,
            lineHeight: 1.65,
            color: colors.inkSoft,
            marginBottom: 28,
          }}>
            {body}
          </p>

          {/* Revenue callout */}
          <div style={{
            background: colors.accentSoft,
            border: `1px solid rgba(43, 191, 170, 0.25)`,
            borderRadius: 12,
            padding: mobile ? '16px 18px' : '20px 24px',
          }}>
            <span style={{
              display: 'block',
              fontFamily: fonts.sans,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: colors.accent,
              marginBottom: 6,
            }}>
              {revenueLabel}
            </span>
            <span style={{
              display: 'block',
              fontFamily: fonts.serif,
              fontStyle: 'italic',
              fontSize: mobile ? 28 : 34,
              fontWeight: 500,
              color: colors.accentDeep,
              lineHeight: 1.1,
              marginBottom: 4,
            }}>
              {revenueAmount}
            </span>
            <span style={{
              fontFamily: fonts.sans,
              fontSize: 13,
              color: colors.inkSoft,
            }}>
              {revenueNote}
            </span>
          </div>
        </div>

        {/* Media */}
        <div style={{ order: mobile ? 2 : (reverse ? 1 : 2) }}>
          {media || (
            <div style={{
              background: `linear-gradient(135deg, ${colors.bg2} 0%, ${colors.accentSoft} 100%)`,
              borderRadius: 16,
              aspectRatio: '4/3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${colors.line}`,
            }}>
              <span style={{
                fontFamily: fonts.sans,
                fontSize: 14,
                color: colors.inkMute,
              }}>
                [Media]
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// How It Works Step Component
function HowItWorksStep({ number, title, description, mobile }) {
  return (
    <>
      <style>{`
        .how-it-works-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .how-it-works-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(11, 22, 40, 0.1);
        }
      `}</style>
      <div 
        className="how-it-works-card"
        style={{
          background: colors.paper,
          borderRadius: 16,
          border: `1px solid ${colors.line}`,
          padding: mobile ? '28px 24px' : '32px 28px',
          textAlign: mobile ? 'center' : 'left',
          boxShadow: '0 2px 8px rgba(11, 22, 40, 0.04)',
        }}>
        <span style={{
          display: 'block',
          fontFamily: fonts.serif,
          fontSize: mobile ? 48 : 56,
          fontWeight: 700,
          color: colors.accent,
          lineHeight: 1,
          marginBottom: 16,
        }}>
          {number}
        </span>
        <h4 style={{
          fontFamily: fonts.sans,
          fontSize: 18,
          fontWeight: 600,
          color: colors.ink,
          marginBottom: 10,
        }}>
          {title}
        </h4>
        <p style={{
          fontFamily: fonts.sans,
          fontSize: 15,
          lineHeight: 1.6,
          color: colors.inkSoft,
        }}>
          {description}
        </p>
      </div>
    </>
  )
}
