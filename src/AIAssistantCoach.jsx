import { useState, useEffect, useRef } from 'react'
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
  return { mobile: w < 760, tablet: w >= 760 && w < 1024, desktop: w >= 1024, w }
}

// Design tokens matching new dark theme
const colors = {
  // Dark theme
  navy: '#0B1628',
  navySoft: '#13233d',
  cream: '#F7F4ED',
  creamDim: '#d9d4c7',
  teal: '#2BBFAA',
  tealDeep: '#0E8C7A',
  mint: '#9AF198',
  // Light theme (brandwash)
  ink: '#0B1628',
  inkSoft: '#39414f',
  paper: '#FFFFFF',
}

const fonts = {
  display: "'Archivo', 'Archivo Black', sans-serif",
  sans: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  mono: "'JetBrains Mono', monospace",
}

// Reveal animation component
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.14 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(24px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      {children}
    </div>
  )
}

// Media placeholder component
function MediaPlaceholder({ type = 'image', text, subtext, style = {} }) {
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
      {type === 'video' ? (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke={colors.teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9"/>
          <path d="M10 8.3l6 3.7-6 3.7z" fill={colors.teal} stroke="none"/>
        </svg>
      ) : (
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke={colors.teal} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <circle cx="8.5" cy="8.5" r="1.6"/>
          <path d="M21 15l-5-5L5 21"/>
        </svg>
      )}
      <span style={{ fontFamily: fonts.mono, fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: colors.teal }}>{text}</span>
      {subtext && <span style={{ fontFamily: fonts.mono, fontSize: '0.6rem', letterSpacing: '0.12em', color: colors.creamDim, opacity: 0.75 }}>{subtext}</span>}
    </div>
  )
}

// Way card component
function WayCard({ number, title, body, mobile, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div style={{
        background: 'rgba(255,255,255,.72)',
        border: '1px solid rgba(11,22,40,.08)',
        borderRadius: 22,
        padding: mobile ? '24px 22px 28px' : '28px 30px 34px',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: '0 12px 30px rgba(11,22,40,.06)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-5px)'
        e.currentTarget.style.boxShadow = '0 24px 50px rgba(11,22,40,.10)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'none'
        e.currentTarget.style.boxShadow = '0 12px 30px rgba(11,22,40,.06)'
      }}
      >
        <MediaPlaceholder 
          type="image" 
          text="Image" 
          style={{ aspectRatio: '16/10', width: '100%', marginBottom: 18 }} 
        />
        <span style={{ fontFamily: fonts.mono, fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: colors.tealDeep }}>{number}</span>
        <h3 style={{
          fontFamily: fonts.display,
          fontWeight: 800,
          fontStretch: '125%',
          fontSize: mobile ? '1.4rem' : '1.65rem',
          lineHeight: 1.04,
          letterSpacing: '-0.005em',
          margin: '10px 0',
          color: colors.ink,
        }}>{title}</h3>
        <p style={{ color: colors.inkSoft, fontSize: mobile ? '1rem' : '1.06rem', lineHeight: 1.6 }}>{body}</p>
      </div>
    </Reveal>
  )
}

export default function AIAssistantCoach() {
  const { mobile } = useBreakpoint()
  const [chatModalOpen, setChatModalOpen] = useState(false)

  // Brandwash gradient for light sections
  const brandwash = `
    radial-gradient(900px 640px at 9% 24%, rgba(43,191,170,.20), transparent 60%),
    radial-gradient(840px 600px at 97% 30%, rgba(255,176,92,.22), transparent 58%),
    radial-gradient(780px 580px at 84% 106%, rgba(154,241,152,.24), transparent 60%),
    radial-gradient(640px 540px at -5% 98%, rgba(120,198,255,.16), transparent 60%),
    #ffffff
  `

  const labelStyle = {
    fontFamily: fonts.mono,
    fontSize: '0.72rem',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
  }

  const displayStyle = {
    fontFamily: fonts.display,
    fontWeight: 900,
    fontStretch: '125%',
    lineHeight: 0.98,
    letterSpacing: '-0.005em',
  }

  const btnBase = {
    display: 'inline-block',
    fontFamily: fonts.sans,
    fontWeight: 700,
    fontSize: '1.05rem',
    padding: '18px 38px',
    borderRadius: 100,
    textDecoration: 'none',
    transition: 'transform .18s ease, box-shadow .18s ease, background .18s ease, color .18s ease, border-color .18s ease',
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.navy,
      fontFamily: fonts.sans,
      fontSize: 18,
      lineHeight: 1.6,
      color: colors.cream,
    }}>
      <Header currentPage="milton-makes-money" />

      {/* HERO (DARK) */}
      <header style={{
        position: 'relative',
        padding: mobile ? '72px 0 80px' : '92px 0 102px',
        background: `
          radial-gradient(900px 420px at 78% -8%, rgba(43,191,170,.20), transparent 60%),
          radial-gradient(700px 380px at 8% 16%, rgba(154,241,152,.10), transparent 60%),
          ${colors.navy}
        `,
        overflow: 'hidden',
      }}>
        {/* Dot pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(247,244,237,.05) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 28px' }}>
          <div style={{
            position: 'relative',
            zIndex: 2,
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : '1.05fr .95fr',
            gap: mobile ? 40 : 56,
            alignItems: 'center',
          }}>
            {/* Hero Copy */}
            <div style={{ maxWidth: 600 }}>
              <h1 style={{
                ...displayStyle,
                fontSize: mobile ? '2.4rem' : 'clamp(2.6rem,5.6vw,4.8rem)',
                margin: '22px 0 26px',
                color: colors.cream,
              }}>
                Milton helps you<br/>make more <em style={{ fontStyle: 'normal', color: colors.mint }}>money.</em>
              </h1>
              <p style={{
                fontSize: mobile ? '1.1rem' : 'clamp(1.15rem,2.4vw,1.5rem)',
                maxWidth: 600,
                color: colors.creamDim,
                marginBottom: 36,
              }}>
                One simple app. You just talk to it. Here are four easy ways Milton puts more money in your pocket, <b style={{ color: colors.cream, fontWeight: 500 }}>with no extra work.</b>
              </p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <a href="/for-coaches" style={{
                  ...btnBase,
                  background: colors.mint,
                  color: colors.navy,
                  border: `2px solid ${colors.mint}`,
                  boxShadow: '0 10px 30px rgba(154,241,152,.18)',
                }}>For Coaches</a>
                <a href="/for-gyms" style={{
                  ...btnBase,
                  background: 'transparent',
                  color: colors.cream,
                  border: '2px solid rgba(43,191,170,.7)',
                  boxShadow: 'none',
                }}>For Gyms</a>
              </div>
            </div>

            {/* Hero Media */}
            <Reveal>
              <MediaPlaceholder 
                type="video" 
                text="Video" 
                subtext="Money story goes here"
                style={{ aspectRatio: '16/9', width: '100%', boxShadow: '0 30px 70px rgba(0,0,0,.45)' }}
              />
            </Reveal>
          </div>
        </div>
      </header>

      {/* FOUR WAYS (LIGHT) */}
      <section style={{ background: brandwash, color: colors.ink, padding: mobile ? '64px 0' : '96px 0' }}>
        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 28px' }}>
          <span style={{ ...labelStyle, color: colors.tealDeep }}>Four ways to earn</span>
          <h2 style={{
            ...displayStyle,
            fontSize: mobile ? '2rem' : 'clamp(2.1rem,5vw,3.4rem)',
            margin: '14px 0 8px',
            maxWidth: 720,
            color: colors.ink,
          }}>
            Four easy ways to <em style={{ fontStyle: 'normal', color: colors.tealDeep }}>make money.</em>
          </h2>
          <p style={{ color: colors.inkSoft, fontSize: '1.15rem', maxWidth: 560, margin: '0 0 46px' }}>
            Each one is normally a big project. With Milton, it is one sentence.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
            gap: 24,
          }}>
            <WayCard
              number="01"
              title="Get more clients"
              body="Milton helps you look pro and wow new people. Happy clients tell their friends. You get more clients without chasing them."
              mobile={mobile}
              delay={0}
            />
            <WayCard
              number="02"
              title="Launch a challenge"
              body="Want to run a challenge? Just ask. Milton builds it, signs people up, and runs it for you. A fun, fast way to bring in cash."
              mobile={mobile}
              delay={90}
            />
            <WayCard
              number="03"
              title="AI personal training"
              body="Help more people in less time. Milton does the work between check-ins. You meet once a month, Milton handles the rest."
              mobile={mobile}
              delay={180}
            />
            <WayCard
              number="04"
              title="Give more value"
              body="Treat every member like a VIP. Custom plans, check-ins, and reports. People stay longer and happily pay more."
              mobile={mobile}
              delay={270}
            />
          </div>
        </div>
      </section>

      {/* BAND (DARK) */}
      <section style={{
        padding: mobile ? '72px 0' : '104px 0',
        textAlign: 'center',
        color: colors.cream,
        background: `radial-gradient(680px 360px at 50% 28%, rgba(43,191,170,.16), transparent 65%), #0e1c33`,
        borderTop: '1px solid rgba(154,241,152,.16)',
        borderBottom: '1px solid rgba(154,241,152,.16)',
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 28px' }}>
          <Reveal>
            <span style={{ ...labelStyle, color: colors.teal }}>The best part</span>
          </Reveal>
          <Reveal delay={90}>
            <h2 style={{
              ...displayStyle,
              fontSize: mobile ? '2.2rem' : 'clamp(2.3rem,5.4vw,3.6rem)',
              margin: '18px auto 22px',
              maxWidth: 680,
              color: colors.cream,
            }}>
              You just <em style={{ fontStyle: 'normal', color: colors.mint }}>talk.</em> Milton does the rest.
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p style={{ fontSize: '1.22rem', color: colors.creamDim, maxWidth: 620, margin: '0 auto' }}>
              No new software to learn. No extra hours. Tell Milton what you want, and it makes it happen. <b style={{ color: colors.cream, fontWeight: 500 }}>Earning more has never been this simple.</b>
            </p>
          </Reveal>
        </div>
      </section>

      {/* VALUE (LIGHT) */}
      <section style={{ padding: mobile ? '64px 0' : '92px 0', background: brandwash, color: colors.ink }}>
        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 28px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : '1.1fr .9fr',
            gap: mobile ? 32 : 48,
            alignItems: 'center',
          }}>
            <div>
              <span style={{ ...labelStyle, color: colors.tealDeep }}>The payoff</span>
              <h2 style={{
                ...displayStyle,
                fontSize: mobile ? '2rem' : 'clamp(2.1rem,4.8vw,3.2rem)',
                margin: '14px 0 18px',
                maxWidth: 520,
                color: colors.ink,
              }}>
                Grow your income. <em style={{ fontStyle: 'normal', color: colors.tealDeep }}>Keep your time.</em>
              </h2>
              <p style={{ fontSize: '1.18rem', color: colors.inkSoft }}>
                Milton turns your skills and your gym into new income, without asking for more of your hours. More money in your pocket. More time in your life. You stay in charge. Milton does the rest.
              </p>
            </div>
            <Reveal>
              <MediaPlaceholder 
                text="Image" 
                subtext="Payoff image goes here"
                style={{ aspectRatio: '16/9', width: '100%', boxShadow: '0 26px 60px rgba(11,22,40,.16)' }}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* FINAL FORK (DARK) */}
      <section style={{
        padding: mobile ? '80px 0 88px' : '110px 0 118px',
        textAlign: 'center',
        background: `radial-gradient(700px 380px at 50% 0%, rgba(43,191,170,.22), transparent 62%), ${colors.navy}`,
      }}>
        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 28px' }}>
          <span style={{ ...labelStyle, color: colors.teal }}>Ready to earn?</span>
          <h2 style={{
            ...displayStyle,
            fontSize: mobile ? '2.4rem' : 'clamp(2.6rem,6.4vw,4.6rem)',
            margin: '16px 0 18px',
            color: colors.cream,
          }}>
            Start making more <em style={{ fontStyle: 'normal', color: colors.mint }}>today.</em>
          </h2>
          <p style={{ fontSize: '1.25rem', color: colors.creamDim, maxWidth: 520, margin: '0 auto 36px' }}>
            Pick your path and see exactly how Milton makes you money.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="/for-coaches" style={{
              ...btnBase,
              background: colors.mint,
              color: colors.navy,
              border: `2px solid ${colors.mint}`,
              boxShadow: '0 10px 30px rgba(154,241,152,.18)',
            }}>For Coaches</a>
            <a href="/for-gyms" style={{
              ...btnBase,
              background: 'transparent',
              color: colors.cream,
              border: '2px solid rgba(43,191,170,.7)',
              boxShadow: 'none',
            }}>For Gyms</a>
          </div>
        </div>
      </section>

      <Footer onOpenChat={() => setChatModalOpen(true)} />
    </div>
  )
}
