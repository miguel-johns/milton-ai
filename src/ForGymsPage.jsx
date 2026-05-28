import { useState, useEffect, useRef } from 'react'
import SharedNav from './SharedNav'
import SharedFooter from './SharedFooter'

// Custom hook for responsive breakpoints
function useBreakpoint() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  useEffect(() => {
    const h = () => setW(window.innerWidth)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return { mobile: w < 760, tablet: w >= 760 && w < 1024, desktop: w >= 1024, w }
}

// Intersection Observer hook for reveal animations
function useReveal() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.14 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  
  return { ref, isVisible }
}

// CSS variables as constants
const colors = {
  navy: '#0B1628',
  navySoft: '#13233d',
  teal: '#2BBFAA',
  mint: '#9AF198',
  cream: '#F7F4ED',
  creamDim: '#d9d4c7',
  ink: '#0B1628',
  inkSoft: '#39414f',
  tealDeep: '#0E8C7A',
}

const fonts = {
  display: "'Archivo', 'Archivo Black', sans-serif",
  sans: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  mono: "'JetBrains Mono', monospace",
}

const brandwash = `
  radial-gradient(900px 640px at 9% 24%, rgba(43,191,170,.20), transparent 60%),
  radial-gradient(840px 600px at 97% 30%, rgba(255,176,92,.22), transparent 58%),
  radial-gradient(780px 580px at 84% 106%, rgba(154,241,152,.24), transparent 60%),
  radial-gradient(640px 540px at -5% 98%, rgba(120,198,255,.16), transparent 60%),
  #ffffff
`

// Calendly booking URL
const CALENDLY_URL = "https://calendly.com/miguel-johns/milton-demo?hide_gdpr_banner=1&primary_color=1aa4a4"

// Label component
function Label({ children, dark = true, center = false }) {
  return (
    <span style={{
      display: center ? 'block' : 'inline-block',
      textAlign: center ? 'center' : 'left',
      fontFamily: fonts.mono,
      fontSize: '0.72rem',
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: dark ? colors.teal : colors.tealDeep,
    }}>
      {children}
    </span>
  )
}

// Button component
function Button({ children, href = '#book', style = {} }) {
  return (
    <a
      href={href}
      style={{
        display: 'inline-block',
        fontFamily: fonts.sans,
        fontWeight: 700,
        fontSize: '1.05rem',
        color: colors.navy,
        background: colors.mint,
        padding: '18px 38px',
        borderRadius: 100,
        textDecoration: 'none',
        border: `2px solid ${colors.mint}`,
        transition: 'transform .18s ease, box-shadow .18s ease, background .18s ease',
        boxShadow: '0 10px 30px rgba(154,241,152,.18)',
        ...style,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.background = colors.teal
        e.currentTarget.style.borderColor = colors.teal
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(43,191,170,.32)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'none'
        e.currentTarget.style.background = colors.mint
        e.currentTarget.style.borderColor = colors.mint
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(154,241,152,.18)'
      }}
    >
      {children}
    </a>
  )
}

// Media placeholder component
function MediaPlaceholder({ type = 'image', label, sublabel, style = {} }) {
  const isVideo = type === 'video'
  return (
    <div style={{
      position: 'relative',
      borderRadius: 16,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      textAlign: 'center',
      padding: 20,
      background: `radial-gradient(130% 130% at 50% 0%, rgba(43,191,170,.18), transparent 60%), ${colors.navySoft}`,
      border: '1.5px dashed rgba(43,191,170,.5)',
      color: colors.creamDim,
      ...style,
    }}>
      {isVideo ? (
        <svg width={60} height={60} viewBox="0 0 24 24" fill="none" stroke={colors.teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9"/>
          <path d="M10 8.3l6 3.7-6 3.7z" fill={colors.teal} stroke="none"/>
        </svg>
      ) : (
        <svg width={42} height={42} viewBox="0 0 24 24" fill="none" stroke={colors.teal} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <circle cx="8.5" cy="8.5" r="1.6"/>
          <path d="M21 15l-5-5L5 21"/>
        </svg>
      )}
      <span style={{
        fontFamily: fonts.mono,
        fontSize: '0.68rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: colors.teal,
      }}>
        {label || (isVideo ? 'Video' : 'Image')}
      </span>
      {sublabel && (
        <span style={{
          fontFamily: fonts.mono,
          fontSize: '0.6rem',
          letterSpacing: '0.12em',
          color: colors.creamDim,
          opacity: 0.75,
        }}>
          {sublabel}
        </span>
      )}
    </div>
  )
}

// Reveal wrapper component
function Reveal({ children, delay = 0 }) {
  const { ref, isVisible } = useReveal()
  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : 'translateY(24px)',
        transition: `opacity .7s ease ${delay}ms, transform .7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// Pain item component
function PainItem({ children, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div style={{
        display: 'flex',
        gap: 14,
        alignItems: 'flex-start',
        background: 'rgba(255,255,255,.66)',
        border: '1px solid rgba(11,22,40,.08)',
        borderRadius: 16,
        padding: '22px 24px',
        fontSize: '1.12rem',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: '0 12px 30px rgba(11,22,40,.06)',
      }}>
        <span style={{
          flex: '0 0 auto',
          width: 26,
          height: 26,
          borderRadius: '50%',
          background: colors.navy,
          color: colors.mint,
          display: 'grid',
          placeItems: 'center',
          fontWeight: 700,
          fontSize: '0.95rem',
          marginTop: 2,
        }}>
          ✕
        </span>
        <span>{children}</span>
      </div>
    </Reveal>
  )
}

// Card component
function Card({ num, title, children, mobile, delay = 0 }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Reveal delay={delay}>
      <div
        style={{
          background: colors.navySoft,
          border: `1px solid ${hovered ? colors.teal : 'rgba(43,191,170,.22)'}`,
          borderRadius: 20,
          padding: '34px 32px',
          transition: 'transform .2s ease, border-color .2s ease',
          transform: hovered ? 'translateY(-5px)' : 'none',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <MediaPlaceholder 
          type="image" 
          style={{ 
            aspectRatio: '16/10', 
            width: '100%', 
            marginBottom: 20 
          }} 
        />
        <span style={{
          fontFamily: fonts.mono,
          fontSize: '0.75rem',
          letterSpacing: '0.18em',
          color: colors.teal,
        }}>
          {num}
        </span>
        <h3 style={{
          fontFamily: fonts.display,
          fontWeight: 800,
          fontStretch: '125%',
          fontVariationSettings: '"wdth" 125',
          fontSize: '1.7rem',
          margin: '12px 0',
          lineHeight: 1.02,
          letterSpacing: '-0.005em',
          color: colors.cream,
        }}>
          {title}
        </h3>
        <p style={{
          color: colors.creamDim,
          fontSize: '1.08rem',
          margin: 0,
          lineHeight: 1.6,
        }}>
          {children}
        </p>
      </div>
    </Reveal>
  )
}

// Risk card component
function RiskCard({ big, children, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div style={{
        textAlign: 'center',
        border: '1px solid rgba(11,22,40,.10)',
        borderRadius: 18,
        padding: '34px 24px',
        background: 'rgba(255,255,255,.6)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: '0 12px 30px rgba(11,22,40,.06)',
      }}>
        <div style={{
          fontFamily: fonts.display,
          fontWeight: 900,
          fontStretch: '125%',
          fontVariationSettings: '"wdth" 125',
          fontSize: '2.8rem',
          color: colors.tealDeep,
          lineHeight: 1,
          marginBottom: 10,
        }}>
          {big}
        </div>
        <p style={{
          color: colors.inkSoft,
          fontSize: '1.05rem',
          margin: 0,
        }}>
          {children}
        </p>
      </div>
    </Reveal>
  )
}

export default function ForGymsPage() {
  const { mobile } = useBreakpoint()
  
  // Load Calendly script
  useEffect(() => {
    if (!document.querySelector('script[src*="calendly"]')) {
      const script = document.createElement('script')
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  const wrap = {
    maxWidth: 1040,
    margin: '0 auto',
    padding: '0 28px',
  }

  return (
    <div style={{
      background: colors.navy,
      color: colors.cream,
      fontFamily: fonts.sans,
      fontSize: 18,
      lineHeight: 1.6,
      WebkitFontSmoothing: 'antialiased',
      overflowX: 'hidden',
    }}>
      <SharedNav />

      {/* HERO */}
      <header style={{
        position: 'relative',
        padding: mobile ? '60px 0 80px' : '74px 0 96px',
        background: `
          radial-gradient(900px 420px at 78% -8%, rgba(43,191,170,.20), transparent 60%),
          radial-gradient(700px 380px at 8% 16%, rgba(154,241,152,.10), transparent 60%),
          ${colors.navy}
        `,
        overflow: 'hidden',
      }}>
        {/* Dot pattern overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(247,244,237,.05) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          pointerEvents: 'none',
        }} />
        
        <div style={wrap}>
          <div style={{
            position: 'relative',
            zIndex: 2,
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : '1.05fr .95fr',
            gap: mobile ? 40 : 56,
            alignItems: 'center',
          }}>
            <div style={{ maxWidth: mobile ? 'none' : 600 }}>
              <Label>For gym owners</Label>
              <h1 style={{
                fontFamily: fonts.display,
                fontWeight: 900,
                fontStretch: '125%',
                fontVariationSettings: '"wdth" 125',
                fontSize: mobile ? 'clamp(2.4rem, 8vw, 2.8rem)' : 'clamp(2.6rem, 5.6vw, 4.8rem)',
                lineHeight: 0.98,
                letterSpacing: '-0.005em',
                margin: '22px 0 26px',
                color: colors.cream,
              }}>
                Run your whole gym<br />by just <em style={{ fontStyle: 'normal', color: colors.mint }}>talking.</em>
              </h1>
              <p style={{
                fontSize: mobile ? '1.1rem' : 'clamp(1.15rem, 2.4vw, 1.5rem)',
                maxWidth: 660,
                color: colors.creamDim,
                marginBottom: 38,
                lineHeight: 1.5,
              }}>
                Milton is one app for your gym. You don&apos;t click around or set things up. You just <b style={{ color: colors.cream, fontWeight: 500 }}>talk to it, like texting a friend.</b> It learns how you coach. Then it does the boring work for you.
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 26,
                flexWrap: 'wrap',
              }}>
                <Button href="#book">Book a free call</Button>
                <span style={{
                  fontFamily: fonts.mono,
                  fontSize: '0.74rem',
                  letterSpacing: '0.04em',
                  color: colors.creamDim,
                }}>
                  30 minutes. See it work. No pressure.
                </span>
              </div>
            </div>
            <Reveal>
              <MediaPlaceholder 
                type="video" 
                label="Video"
                sublabel="Hero demo goes here"
                style={{
                  aspectRatio: '16/9',
                  width: '100%',
                  boxShadow: '0 30px 70px rgba(0,0,0,.45)',
                }}
              />
            </Reveal>
          </div>
        </div>
      </header>

      {/* PAIN */}
      <section style={{
        background: brandwash,
        color: colors.ink,
        padding: mobile ? '70px 0' : '92px 0',
      }}>
        <div style={wrap}>
          <Label dark={false}>Does this sound like you?</Label>
          <h2 style={{
            fontFamily: fonts.display,
            fontWeight: 900,
            fontStretch: '125%',
            fontVariationSettings: '"wdth" 125',
            fontSize: mobile ? 'clamp(1.8rem, 6vw, 2.2rem)' : 'clamp(2.2rem, 5vw, 3.4rem)',
            lineHeight: 0.98,
            letterSpacing: '-0.005em',
            margin: '14px 0 40px',
            maxWidth: 720,
            color: colors.ink,
          }}>
            You run a gym. You&apos;re busy. You&apos;re tired.
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
            gap: 16,
          }}>
            <PainItem delay={0}>You pay for too many apps. None of them talk to each other.</PainItem>
            <PainItem delay={90}>Your trainers all do their own thing. Nothing looks the same.</PainItem>
            <PainItem delay={180}>You spend hours chasing new leads and following up.</PainItem>
            <PainItem delay={270}>People quit your gym, and you didn&apos;t see it coming.</PainItem>
            <PainItem delay={360}>You want every member to feel special, even in a big class.</PainItem>
            <PainItem delay={450}>You work all the time. The gym runs you, not the other way around.</PainItem>
          </div>
          <p style={{
            marginTop: 34,
            fontSize: '1.25rem',
            fontWeight: 500,
            color: colors.ink,
          }}>
            If you nodded at even one of these, <span style={{ color: colors.tealDeep, fontWeight: 700 }}>Milton was built for you.</span>
          </p>
        </div>
      </section>

      {/* HOW */}
      <section style={{
        padding: mobile ? '70px 0' : '96px 0 90px',
        background: colors.navy,
      }}>
        <div style={wrap}>
          <Label>Here&apos;s how Milton helps</Label>
          <h2 style={{
            fontFamily: fonts.display,
            fontWeight: 900,
            fontStretch: '125%',
            fontVariationSettings: '"wdth" 125',
            fontSize: mobile ? 'clamp(1.9rem, 6vw, 2.3rem)' : 'clamp(2.3rem, 5.2vw, 3.6rem)',
            lineHeight: 0.98,
            letterSpacing: '-0.005em',
            margin: '14px 0 14px',
            color: colors.cream,
          }}>
            One app. You just talk to it.
          </h2>
          <p style={{
            color: colors.creamDim,
            maxWidth: 620,
            marginBottom: 52,
            fontSize: '1.15rem',
          }}>
            No new system to learn. No clicking around. You tell Milton what you need, and it gets to work.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
            gap: 22,
          }}>
            <Card num="01" title="Just talk to it" mobile={mobile} delay={0}>
              Say <b style={{ color: colors.cream, fontWeight: 500 }}>&quot;help me prep for today,&quot;</b> and Milton gets you ready in seconds. It pulls up your client, their last workout, and what to focus on. No setup needed.
            </Card>
            <Card num="02" title="It learns your way" mobile={mobile} delay={90}>
              Hand Milton your old workouts and notes. <b style={{ color: colors.cream, fontWeight: 500 }}>It learns how you coach.</b> Now all six trainers coach the same way, with no clunky tools to manage.
            </Card>
            <Card num="03" title="It does the busy work" mobile={mobile} delay={180}>
              Milton writes the workouts, sends the check-ins, and <b style={{ color: colors.cream, fontWeight: 500 }}>remembers every client.</b> You just say &quot;yes,&quot; or change it. Done in minutes, not hours.
            </Card>
            <Card num="04" title="It helps you grow" mobile={mobile} delay={270}>
              Milton makes it easy to run challenges, follow up with leads, and keep members happy. <b style={{ color: colors.cream, fontWeight: 500 }}>More money. Less stress. Less time in the weeds.</b>
            </Card>
          </div>
        </div>
      </section>

      {/* STILL THE COACH */}
      <section style={{
        padding: mobile ? '80px 0' : '108px 0',
        textAlign: 'center',
        background: brandwash,
        color: colors.ink,
        borderTop: '1px solid rgba(11,22,40,.08)',
        borderBottom: '1px solid rgba(11,22,40,.08)',
      }}>
        <div style={{ ...wrap, maxWidth: 760 }}>
          <Reveal>
            <Label dark={false}>You&apos;re still the coach</Label>
          </Reveal>
          <Reveal delay={100}>
            <h2 style={{
              fontFamily: fonts.display,
              fontWeight: 900,
              fontStretch: '125%',
              fontVariationSettings: '"wdth" 125',
              fontSize: mobile ? 'clamp(1.9rem, 6vw, 2.3rem)' : 'clamp(2.3rem, 5.4vw, 3.6rem)',
              lineHeight: 0.98,
              letterSpacing: '-0.005em',
              margin: '18px auto 22px',
              maxWidth: 680,
              color: colors.ink,
            }}>
              Milton helps you. It does <em style={{ fontStyle: 'normal', color: colors.tealDeep }}>not</em> replace you.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p style={{
              fontSize: '1.22rem',
              color: colors.inkSoft,
              maxWidth: 620,
              margin: '0 auto',
              lineHeight: 1.6,
            }}>
              You are the boss. Milton never sends anything until you say so. We believe the best coaching is still human. <b style={{ color: colors.ink, fontWeight: 500 }}>Milton just hands you back the time to do it.</b>
            </p>
          </Reveal>
        </div>
      </section>

      {/* GROUP */}
      <section style={{
        padding: mobile ? '70px 0' : '90px 0',
        color: colors.cream,
        background: `
          radial-gradient(720px 400px at 88% 6%, rgba(43,191,170,.15), transparent 60%),
          ${colors.navy}
        `,
      }}>
        <div style={wrap}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : '1.1fr .9fr',
            gap: 48,
            alignItems: 'center',
          }}>
            <div>
              <Label>Big classes, personal feel</Label>
              <h2 style={{
                fontFamily: fonts.display,
                fontWeight: 900,
                fontStretch: '125%',
                fontVariationSettings: '"wdth" 125',
                fontSize: mobile ? 'clamp(1.8rem, 5.5vw, 2.1rem)' : 'clamp(2.1rem, 4.8vw, 3.2rem)',
                lineHeight: 0.98,
                letterSpacing: '-0.005em',
                margin: '14px 0 18px',
                maxWidth: 520,
                color: colors.cream,
              }}>
                Group fitness with a personal touch.
              </h2>
              <p style={{
                fontSize: '1.18rem',
                color: colors.creamDim,
                lineHeight: 1.6,
              }}>
                Run a class with 20 people? Milton helps every single one feel like they get one-on-one care. It remembers their goals, their progress, and their wins. Happy members stay longer and bring their friends.
              </p>
            </div>
            <Reveal>
              <MediaPlaceholder 
                type="video" 
                label="Video"
                sublabel="Group session clip goes here"
                style={{
                  aspectRatio: '16/9',
                  width: '100%',
                  boxShadow: '0 26px 60px rgba(0,0,0,.4)',
                }}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* RISK */}
      <section style={{
        padding: mobile ? '70px 0' : '88px 0',
        background: brandwash,
        color: colors.ink,
      }}>
        <div style={wrap}>
          <Label dark={false} center>Try it with zero risk</Label>
          <h2 style={{
            fontFamily: fonts.display,
            fontWeight: 900,
            fontStretch: '125%',
            fontVariationSettings: '"wdth" 125',
            fontSize: mobile ? 'clamp(1.7rem, 5vw, 2rem)' : 'clamp(2rem, 4.6vw, 3rem)',
            lineHeight: 0.98,
            letterSpacing: '-0.005em',
            margin: '14px 0 44px',
            textAlign: 'center',
            color: colors.ink,
          }}>
            Easy to start. Easy to <em style={{ fontStyle: 'normal', color: colors.tealDeep }}>stop.</em>
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)',
            gap: 20,
          }}>
            <RiskCard big="$0" delay={0}>No setup fee. We help you get going.</RiskCard>
            <RiskCard big="30" delay={100}>Try it 30 days. Don&apos;t love it? Get every dollar back. No questions.</RiskCard>
            <RiskCard big="∞" delay={200}>No long contract. Cancel any month you want.</RiskCard>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="book" style={{
        padding: mobile ? '90px 0 100px' : '110px 0 120px',
        textAlign: 'center',
        background: `
          radial-gradient(700px 380px at 50% 0%, rgba(43,191,170,.22), transparent 62%),
          ${colors.navy}
        `,
      }}>
        <div style={wrap}>
          <Label>Let&apos;s talk</Label>
          <h2 style={{
            fontFamily: fonts.display,
            fontWeight: 900,
            fontStretch: '125%',
            fontVariationSettings: '"wdth" 125',
            fontSize: mobile ? 'clamp(2.2rem, 7vw, 2.8rem)' : 'clamp(2.8rem, 7vw, 5rem)',
            lineHeight: 0.98,
            letterSpacing: '-0.005em',
            margin: '16px 0 22px',
            color: colors.cream,
          }}>
            See Milton work in <em style={{ fontStyle: 'normal', color: colors.mint }}>30 minutes.</em>
          </h2>
          <p style={{
            fontSize: '1.25rem',
            color: colors.creamDim,
            maxWidth: 560,
            margin: '0 auto 40px',
            lineHeight: 1.6,
          }}>
            Hop on a quick call. We&apos;ll show you exactly how Milton fits your gym, your trainers, and the way you already coach.
          </p>
          <Button>Book a free call</Button>
          <p style={{
            fontFamily: fonts.mono,
            fontSize: '0.74rem',
            letterSpacing: '0.06em',
            color: colors.creamDim,
            marginTop: 22,
          }}>
            Milton. Better coaching, for more people. Slow and steady.
          </p>
        </div>
      </section>

      <SharedFooter />
    </div>
  )
}
