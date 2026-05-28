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
  return { mobile: w < 760, w }
}

// Design tokens
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

// Reveal animation hook
function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.unobserve(el)
        }
      },
      { threshold: 0.14 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return { ref, visible }
}

function Reveal({ children, delay = 0, style = {} }) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// Video placeholder component
function VideoPlaceholder({ subtitle }) {
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
      aspectRatio: '16/9',
      width: '100%',
      background: `radial-gradient(130% 130% at 50% 0%, rgba(43,191,170,.18), transparent 60%), ${colors.navySoft}`,
      border: '1.5px dashed rgba(43,191,170,.5)',
      color: colors.creamDim,
      boxShadow: '0 30px 70px rgba(0,0,0,.45)',
    }}>
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke={colors.teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"/>
        <path d="M10 8.3l6 3.7-6 3.7z" fill={colors.teal} stroke="none"/>
      </svg>
      <span style={{ fontFamily: fonts.mono, fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: colors.teal }}>Video</span>
      {subtitle && <span style={{ fontFamily: fonts.mono, fontSize: '0.6rem', letterSpacing: '0.12em', color: colors.creamDim, opacity: 0.75 }}>{subtitle}</span>}
    </div>
  )
}

// Image placeholder component
function ImagePlaceholder() {
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
      aspectRatio: '16/10',
      width: '100%',
      marginBottom: 20,
      background: `radial-gradient(130% 130% at 50% 0%, rgba(43,191,170,.18), transparent 60%), ${colors.navySoft}`,
      border: '1.5px dashed rgba(43,191,170,.5)',
      color: colors.creamDim,
    }}>
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke={colors.teal} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.6"/>
        <path d="M21 15l-5-5L5 21"/>
      </svg>
      <span style={{ fontFamily: fonts.mono, fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: colors.teal }}>Image</span>
    </div>
  )
}

// Button component
function Button({ children, href, style = {} }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      style={{
        display: 'inline-block',
        fontFamily: fonts.sans,
        fontWeight: 700,
        fontSize: '1.05rem',
        color: colors.navy,
        background: hovered ? colors.teal : colors.mint,
        padding: '18px 38px',
        borderRadius: 100,
        textDecoration: 'none',
        border: `2px solid ${hovered ? colors.teal : colors.mint}`,
        transition: 'transform .18s ease, box-shadow .18s ease, background .18s ease',
        boxShadow: hovered ? '0 16px 40px rgba(43,191,170,.32)' : '0 10px 30px rgba(154,241,152,.18)',
        transform: hovered ? 'translateY(-3px)' : 'none',
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  )
}

export default function ForCoachesPage() {
  const { mobile } = useBreakpoint()

  const brandwash = `
    radial-gradient(900px 640px at 9% 24%, rgba(43,191,170,.20), transparent 60%),
    radial-gradient(840px 600px at 97% 30%, rgba(255,176,92,.22), transparent 58%),
    radial-gradient(780px 580px at 84% 106%, rgba(154,241,152,.24), transparent 60%),
    radial-gradient(640px 540px at -5% 98%, rgba(120,198,255,.16), transparent 60%),
    #ffffff
  `

  return (
    <div style={{ background: colors.navy, color: colors.cream, fontFamily: fonts.sans, fontSize: 18, lineHeight: 1.6, overflowX: 'hidden' }}>
      <Header />

      {/* Hero */}
      <header style={{
        position: 'relative',
        padding: '90px 0 100px',
        background: `
          radial-gradient(900px 420px at 78% -8%, rgba(43,191,170,.20), transparent 60%),
          radial-gradient(700px 380px at 8% 16%, rgba(154,241,152,.10), transparent 60%),
          ${colors.navy}
        `,
        overflow: 'hidden',
      }}>
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
            gap: 56,
            alignItems: 'center',
          }}>
            <div style={{ maxWidth: mobile ? 'none' : 600 }}>
              <div style={{ height: 20 }} />
              <h1 style={{
                fontFamily: fonts.display,
                fontWeight: 900,
                fontStretch: '125%',
                lineHeight: 0.98,
                letterSpacing: '-0.005em',
                fontSize: 'clamp(2.6rem, 5.6vw, 4.8rem)',
                margin: '22px 0 26px',
              }}>
                Get more clients.<br />Look like a <span style={{ color: colors.mint }}>pro.</span>
              </h1>
              <p style={{ fontSize: 'clamp(1.15rem, 2.4vw, 1.5rem)', maxWidth: 600, color: colors.creamDim, marginBottom: 36 }}>
                Milton is one simple app for coaches. You just talk to it. It helps you win new clients, charge more, and make more money. <b style={{ color: colors.cream, fontWeight: 500 }}>Brand new or 20 years in, Milton works for you.</b>
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
                <Button href="https://coach.getmilton.com/auth">Try 7 Days Free</Button>
                <span style={{ fontFamily: fonts.mono, fontSize: '0.74rem', letterSpacing: '0.04em', color: colors.creamDim }}>No card required.</span>
              </div>
            </div>
            <Reveal>
              <VideoPlaceholder subtitle="Coach demo goes here" />
            </Reveal>
          </div>
        </div>
      </header>

      {/* Split: Every Coach */}
      <section style={{ background: brandwash, color: colors.ink, padding: '96px 0' }}>
        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 28px' }}>
          <span style={{ fontFamily: fonts.mono, fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: colors.tealDeep }}>Built for every coach</span>
          <h2 style={{
            fontFamily: fonts.display,
            fontWeight: 900,
            fontStretch: '125%',
            lineHeight: 0.98,
            letterSpacing: '-0.005em',
            fontSize: 'clamp(2.1rem, 5vw, 3.4rem)',
            margin: '14px 0 8px',
            maxWidth: 720,
          }}>
            New coach or seasoned pro? <span style={{ color: colors.tealDeep }}>Milton fits.</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 24, marginTop: 44 }}>
            <Reveal>
              <div style={{
                background: 'rgba(255,255,255,.66)',
                border: '1px solid rgba(11,22,40,.08)',
                borderRadius: 22,
                padding: '42px 38px',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                boxShadow: '0 12px 30px rgba(11,22,40,.06)',
              }}>
                <span style={{ fontFamily: fonts.mono, fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: colors.tealDeep }}>Just starting out</span>
                <h3 style={{ fontFamily: fonts.display, fontWeight: 800, fontStretch: '125%', fontSize: '1.9rem', lineHeight: 1.04, letterSpacing: '-0.005em', margin: '14px 0', color: colors.ink }}>Look like a pro from day one</h3>
                <p style={{ color: colors.inkSoft, fontSize: '1.1rem' }}>Milton makes your programs, check-ins, and reports look clean and sharp. New clients trust you fast. You can charge more. And happy clients tell their friends.</p>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div style={{
                background: 'rgba(255,255,255,.66)',
                border: '1px solid rgba(11,22,40,.08)',
                borderRadius: 22,
                padding: '42px 38px',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                boxShadow: '0 12px 30px rgba(11,22,40,.06)',
              }}>
                <span style={{ fontFamily: fonts.mono, fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: colors.tealDeep }}>20+ years in</span>
                <h3 style={{ fontFamily: fonts.display, fontWeight: 800, fontStretch: '125%', fontSize: '1.9rem', lineHeight: 1.04, letterSpacing: '-0.005em', margin: '14px 0', color: colors.ink }}>Earn from your experience</h3>
                <p style={{ color: colors.inkSoft, fontSize: '1.1rem' }}>You already have the skills. Milton turns them into new income that does not eat your time. Help more people at once. Make money even when you are not in the room.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How */}
      <section style={{ padding: '96px 0 90px', background: colors.navy }}>
        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 28px' }}>
          <span style={{ fontFamily: fonts.mono, fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: colors.teal }}>Here&apos;s how it works</span>
          <h2 style={{
            fontFamily: fonts.display,
            fontWeight: 900,
            fontStretch: '125%',
            lineHeight: 0.98,
            letterSpacing: '-0.005em',
            fontSize: 'clamp(2.3rem, 5.2vw, 3.6rem)',
            margin: '14px 0',
          }}>
            More clients, the <span style={{ color: colors.mint }}>simple</span> way.
          </h2>
          <p style={{ color: colors.creamDim, maxWidth: 620, marginBottom: 52, fontSize: '1.15rem' }}>You just talk to Milton. It does the heavy lifting, so you can focus on coaching.</p>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 22 }}>
            <Reveal><LookLikeProCard /></Reveal>
            <Reveal delay={90}><ChargeMoreCard /></Reveal>
            <Reveal delay={180}><GetReferralsCard /></Reveal>
            <Reveal delay={270}><NewWaysToEarnCard /></Reveal>
          </div>
        </div>
      </section>

      {/* Value */}
      <section style={{ padding: '92px 0', background: brandwash, color: colors.ink }}>
        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1.1fr .9fr', gap: 48, alignItems: 'center' }}>
            <div>
              <span style={{ fontFamily: fonts.mono, fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: colors.tealDeep }}>Your time back</span>
              <h2 style={{
                fontFamily: fonts.display,
                fontWeight: 900,
                fontStretch: '125%',
                lineHeight: 0.98,
                letterSpacing: '-0.005em',
                fontSize: 'clamp(2.1rem, 4.8vw, 3.2rem)',
                margin: '14px 0 18px',
                maxWidth: 520,
              }}>
                Help more people. <span style={{ color: colors.tealDeep }}>Work less.</span>
              </h2>
              <p style={{ fontSize: '1.18rem', color: colors.inkSoft }}>Milton does the busy work, so you can do what you love. Build programs in minutes. Send check-ins with one tap. Keep every client on track without living on your phone.</p>
            </div>
            <Reveal>
              <div style={{ boxShadow: '0 26px 60px rgba(11,22,40,.16)' }}>
                <ImagePlaceholder subtitle="Coaching image goes here" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Still the Coach */}
      <section style={{
        padding: '108px 0',
        textAlign: 'center',
        color: colors.cream,
        background: `radial-gradient(680px 360px at 50% 28%, rgba(43,191,170,.16), transparent 65%), #0e1c33`,
        borderTop: '1px solid rgba(154,241,152,.16)',
        borderBottom: '1px solid rgba(154,241,152,.16)',
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 28px' }}>
          <Reveal>
            <span style={{ fontFamily: fonts.mono, fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: colors.teal }}>You&apos;re still the coach</span>
          </Reveal>
          <Reveal delay={90}>
            <h2 style={{
              fontFamily: fonts.display,
              fontWeight: 900,
              fontStretch: '125%',
              lineHeight: 0.98,
              letterSpacing: '-0.005em',
              fontSize: 'clamp(2.3rem, 5.4vw, 3.6rem)',
              margin: '18px auto 22px',
              maxWidth: 680,
            }}>
              Milton helps you. It does <span style={{ color: colors.mint }}>not</span> replace you.
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p style={{ fontSize: '1.22rem', color: colors.creamDim, maxWidth: 620, margin: '0 auto' }}>
              You are the coach. Milton never sends anything until you say so. The best coaching is still human. <b style={{ color: colors.cream, fontWeight: 500 }}>Milton just hands you back the time to do it.</b>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Risk */}
      <section style={{ padding: '88px 0', background: brandwash, color: colors.ink }}>
        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 28px' }}>
          <span style={{ fontFamily: fonts.mono, fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: colors.tealDeep, display: 'block', textAlign: 'center' }}>Try it free</span>
          <h2 style={{
            fontFamily: fonts.display,
            fontWeight: 900,
            fontStretch: '125%',
            lineHeight: 0.98,
            letterSpacing: '-0.005em',
            fontSize: 'clamp(2rem, 4.6vw, 3rem)',
            margin: '14px 0 44px',
            textAlign: 'center',
          }}>
            Start today. <span style={{ color: colors.tealDeep }}>No risk.</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { big: '7', text: 'Free for 7 days. Try everything Milton can do.' },
              { big: '$0', text: 'No card needed to start. No catch.' },
              { big: '∞', text: 'Cancel anytime. It really is that simple.' },
            ].map((item, i) => (
              <Reveal key={item.big} delay={i * 90}>
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
                  <div style={{ fontFamily: fonts.display, fontWeight: 900, fontStretch: '125%', fontSize: '2.8rem', color: colors.tealDeep, lineHeight: 1, marginBottom: 10 }}>{item.big}</div>
                  <p style={{ color: colors.inkSoft, fontSize: '1.05rem' }}>{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="start" style={{
        padding: '110px 0 120px',
        textAlign: 'center',
        background: `radial-gradient(700px 380px at 50% 0%, rgba(43,191,170,.22), transparent 62%), ${colors.navy}`,
      }}>
        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 28px' }}>
          <span style={{ fontFamily: fonts.mono, fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: colors.teal }}>Let&apos;s go</span>
          <h2 style={{
            fontFamily: fonts.display,
            fontWeight: 900,
            fontStretch: '125%',
            lineHeight: 0.98,
            letterSpacing: '-0.005em',
            fontSize: 'clamp(2.8rem, 7vw, 5rem)',
            margin: '16px 0 22px',
          }}>
            Win your next client <span style={{ color: colors.mint }}>this week.</span>
          </h2>
          <p style={{ fontSize: '1.25rem', color: colors.creamDim, maxWidth: 560, margin: '0 auto 38px' }}>Start free today. See how Milton helps you get more clients, charge more, and get your time back.</p>
          <Button href="https://coach.getmilton.com/auth">Try 7 Days Free</Button>
          <p style={{ fontFamily: fonts.mono, fontSize: '0.78rem', letterSpacing: '0.06em', color: colors.creamDim, marginTop: 20 }}>No card required.</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// How card component
function HowCard({ num, title, desc, bold, after = '' }) {
  const [hovered, setHovered] = useState(false)
  return (
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
  <ImagePlaceholder />
  <span style={{ fontFamily: fonts.mono, fontSize: '0.75rem', letterSpacing: '0.18em', color: colors.teal }}>{num}</span>
  <h3 style={{
  fontFamily: fonts.display,
  fontWeight: 800,
  fontStretch: '125%',
  fontSize: '1.7rem',
  margin: '12px 0',
  lineHeight: 1.02,
  letterSpacing: '-0.005em',
  color: colors.cream,
  }}>{title}</h3>
  <p style={{ color: colors.creamDim, fontSize: '1.08rem' }}>
  {desc} <b style={{ color: colors.cream, fontWeight: 500 }}>{bold}</b>{after}
  </p>
  </div>
  )
}

// Card 01 - Look like a pro visual
function LookLikeProCard() {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{
        background: `radial-gradient(120% 90% at 78% 8%, rgba(43,191,170,.16) 0%, transparent 46%), ${colors.navySoft}`,
        border: `1px solid ${hovered ? colors.teal : 'rgba(43,191,170,.22)'}`,
        borderRadius: 20,
        padding: '24px 24px 28px',
        transition: 'transform .2s ease, border-color .2s ease',
        transform: hovered ? 'translateY(-5px)' : 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Grid texture */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(rgba(43,191,170,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(43,191,170,.05) 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
        maskImage: 'radial-gradient(100% 100% at 70% 0%, #000 0%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(100% 100% at 70% 0%, #000 0%, transparent 75%)',
        opacity: 0.6, pointerEvents: 'none',
      }} />

      {/* Professional program preview */}
      <div style={{ position: 'relative', zIndex: 1, marginBottom: 20 }}>
        <div style={{
          background: 'rgba(15,30,51,.78)',
          border: '1px solid rgba(43,191,170,.22)',
          borderRadius: 14,
          padding: '16px',
          boxShadow: '0 12px 32px rgba(0,0,0,.3)',
        }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #2BBFAA, #9AF198)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B1628" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
            </div>
            <div>
              <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: '0.9rem', color: colors.cream }}>6-Week Strength</div>
              <div style={{ fontFamily: fonts.mono, fontSize: '0.6rem', letterSpacing: '0.1em', color: colors.creamDim }}>CUSTOM PROGRAM</div>
            </div>
            <div style={{ marginLeft: 'auto', background: 'rgba(154,241,152,.15)', border: '1px solid rgba(154,241,152,.3)', borderRadius: 6, padding: '4px 8px' }}>
              <span style={{ fontFamily: fonts.mono, fontSize: '0.58rem', color: colors.mint, fontWeight: 600 }}>SENT</span>
            </div>
          </div>
          
          {/* Mini workout preview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {['Week 1: Foundation', 'Week 2: Build', 'Week 3: Push'].map((week, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'rgba(43,191,170,.08)',
                borderRadius: 8,
                padding: '8px 10px',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.teal} strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
                <span style={{ fontSize: '0.72rem', color: colors.cream }}>{week}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card label */}
      <span style={{ fontFamily: fonts.mono, fontSize: '0.75rem', letterSpacing: '0.18em', color: colors.teal }}>01</span>
      <h3 style={{ fontFamily: fonts.display, fontWeight: 800, fontStretch: '125%', fontSize: '1.7rem', margin: '12px 0', lineHeight: 1.02, letterSpacing: '-0.005em', color: colors.cream }}>Look like a pro</h3>
      <p style={{ color: colors.creamDim, fontSize: '1.08rem' }}>Clean programs, check-ins, and reports, every time. <b style={{ color: colors.cream, fontWeight: 500 }}>New clients trust you right away.</b></p>
    </div>
  )
}

// Card 02 - Charge more visual
function ChargeMoreCard() {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{
        background: `radial-gradient(120% 90% at 20% 12%, rgba(154,241,152,.14) 0%, transparent 48%), ${colors.navySoft}`,
        border: `1px solid ${hovered ? colors.teal : 'rgba(43,191,170,.22)'}`,
        borderRadius: 20,
        padding: '24px 24px 28px',
        transition: 'transform .2s ease, border-color .2s ease',
        transform: hovered ? 'translateY(-5px)' : 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Grid texture */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(rgba(43,191,170,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(43,191,170,.05) 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
        maskImage: 'radial-gradient(100% 100% at 20% 0%, #000 0%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(100% 100% at 20% 0%, #000 0%, transparent 75%)',
        opacity: 0.6, pointerEvents: 'none',
      }} />

      {/* Pricing visual */}
      <div style={{ position: 'relative', zIndex: 1, marginBottom: 20 }}>
        <div style={{
          background: 'rgba(15,30,51,.78)',
          border: '1px solid rgba(43,191,170,.22)',
          borderRadius: 14,
          padding: '16px',
          boxShadow: '0 12px 32px rgba(0,0,0,.3)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: 12 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: '0.58rem', letterSpacing: '0.2em', color: colors.creamDim, marginBottom: 6 }}>YOUR RATE</div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 4 }}>
              <span style={{ fontFamily: fonts.display, fontSize: '2.4rem', fontWeight: 900, color: colors.mint }}>$150</span>
              <span style={{ fontFamily: fonts.mono, fontSize: '0.7rem', color: colors.creamDim }}>/session</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 8 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9AF198" strokeWidth="2.5"><path d="m18 15-6-6-6 6"/></svg>
              <span style={{ fontFamily: fonts.mono, fontSize: '0.68rem', color: colors.mint }}>+25% from last year</span>
            </div>
          </div>
          
          {/* Value indicators */}
          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { label: 'Results', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/></svg> },
              { label: 'Service', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg> },
            ].map((item, i) => (
              <div key={i} style={{ flex: 1, background: 'rgba(43,191,170,.08)', borderRadius: 8, padding: '10px', textAlign: 'center' }}>
                <div style={{ width: 20, height: 20, color: colors.teal, margin: '0 auto 4px' }}>{item.icon}</div>
                <div style={{ fontFamily: fonts.mono, fontSize: '0.58rem', letterSpacing: '0.1em', color: colors.creamDim }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card label */}
      <span style={{ fontFamily: fonts.mono, fontSize: '0.75rem', letterSpacing: '0.18em', color: colors.teal }}>02</span>
      <h3 style={{ fontFamily: fonts.display, fontWeight: 800, fontStretch: '125%', fontSize: '1.7rem', margin: '12px 0', lineHeight: 1.02, letterSpacing: '-0.005em', color: colors.cream }}>Charge more</h3>
      <p style={{ color: colors.creamDim, fontSize: '1.08rem' }}>When you look sharp and get results, <b style={{ color: colors.cream, fontWeight: 500 }}>you can raise your prices.</b> Milton helps you back it up.</p>
    </div>
  )
}

// Card 03 - Get referrals visual
function GetReferralsCard() {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{
        background: `radial-gradient(120% 90% at 75% 10%, rgba(43,191,170,.16) 0%, transparent 46%), ${colors.navySoft}`,
        border: `1px solid ${hovered ? colors.teal : 'rgba(43,191,170,.22)'}`,
        borderRadius: 20,
        padding: '24px 24px 28px',
        transition: 'transform .2s ease, border-color .2s ease',
        transform: hovered ? 'translateY(-5px)' : 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Grid texture */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(rgba(43,191,170,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(43,191,170,.05) 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
        maskImage: 'radial-gradient(100% 100% at 75% 0%, #000 0%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(100% 100% at 75% 0%, #000 0%, transparent 75%)',
        opacity: 0.6, pointerEvents: 'none',
      }} />

      {/* Referral network visual */}
      <div style={{ position: 'relative', zIndex: 1, marginBottom: 20 }}>
        <div style={{
          background: 'rgba(15,30,51,.78)',
          border: '1px solid rgba(43,191,170,.22)',
          borderRadius: 14,
          padding: '20px 16px',
          boxShadow: '0 12px 32px rgba(0,0,0,.3)',
        }}>
          {/* Network visualization */}
          <div style={{ position: 'relative', height: 100 }}>
            {/* Center node - you */}
            <div style={{
              position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
              width: 44, height: 44, borderRadius: '50%',
              background: 'linear-gradient(135deg, #2BBFAA, #9AF198)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(43,191,170,.4)',
              zIndex: 3,
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B1628" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            
            {/* Connected clients */}
            {[
              { x: '15%', y: '30%' },
              { x: '85%', y: '30%' },
              { x: '25%', y: '80%' },
              { x: '75%', y: '80%' },
            ].map((pos, i) => (
              <div key={i} style={{
                position: 'absolute', left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)',
                width: 28, height: 28, borderRadius: '50%',
                background: 'rgba(43,191,170,.15)',
                border: '2px solid rgba(43,191,170,.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 2,
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={colors.teal} strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
            ))}
            
            {/* New referral with glow */}
            <div style={{
              position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)',
              width: 32, height: 32, borderRadius: '50%',
              background: 'rgba(154,241,152,.2)',
              border: '2px dashed rgba(154,241,152,.6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: 'pulse 2s ease-in-out infinite',
              zIndex: 2,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.mint} strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
            </div>
          </div>
          
          {/* Referral message */}
          <div style={{
            marginTop: 12,
            background: 'rgba(154,241,152,.1)',
            border: '1px solid rgba(154,241,152,.25)',
            borderRadius: 10,
            padding: '10px 12px',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.mint} strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span style={{ fontSize: '0.72rem', color: colors.cream }}>&quot;My friend wants to train with you!&quot;</span>
          </div>
        </div>
      </div>

      {/* Card label */}
      <span style={{ fontFamily: fonts.mono, fontSize: '0.75rem', letterSpacing: '0.18em', color: colors.teal }}>03</span>
      <h3 style={{ fontFamily: fonts.display, fontWeight: 800, fontStretch: '125%', fontSize: '1.7rem', margin: '12px 0', lineHeight: 1.02, letterSpacing: '-0.005em', color: colors.cream }}>Get referrals</h3>
      <p style={{ color: colors.creamDim, fontSize: '1.08rem' }}>Happy clients bring friends. Milton keeps every client feeling cared for, <b style={{ color: colors.cream, fontWeight: 500 }}>so they spread the word.</b></p>
    </div>
  )
}

// Card 04 - New ways to earn visual
function NewWaysToEarnCard() {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{
        background: `radial-gradient(120% 90% at 30% 8%, rgba(154,241,152,.15) 0%, transparent 46%), ${colors.navySoft}`,
        border: `1px solid ${hovered ? colors.teal : 'rgba(43,191,170,.22)'}`,
        borderRadius: 20,
        padding: '24px 24px 28px',
        transition: 'transform .2s ease, border-color .2s ease',
        transform: hovered ? 'translateY(-5px)' : 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Grid texture */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(rgba(43,191,170,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(43,191,170,.05) 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
        maskImage: 'radial-gradient(100% 100% at 30% 0%, #000 0%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(100% 100% at 30% 0%, #000 0%, transparent 75%)',
        opacity: 0.6, pointerEvents: 'none',
      }} />

      {/* Revenue streams visual */}
      <div style={{ position: 'relative', zIndex: 1, marginBottom: 20 }}>
        <div style={{
          background: 'rgba(15,30,51,.78)',
          border: '1px solid rgba(43,191,170,.22)',
          borderRadius: 14,
          padding: '16px',
          boxShadow: '0 12px 32px rgba(0,0,0,.3)',
        }}>
          {/* Revenue cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { title: '6-Week Challenge', amount: '$1,200', clients: '8 clients', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>, accent: true },
              { title: 'Group Program', amount: '$800', clients: '12 clients', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
              { title: 'Nutrition Add-on', amount: '$400', clients: '10 clients', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><path d="M6 1v3"/><path d="M10 1v3"/><path d="M14 1v3"/></svg> },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: item.accent ? 'rgba(154,241,152,.12)' : 'rgba(43,191,170,.08)',
                border: `1px solid ${item.accent ? 'rgba(154,241,152,.25)' : 'rgba(43,191,170,.15)'}`,
                borderRadius: 10,
                padding: '10px 12px',
              }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: item.accent ? 'rgba(154,241,152,.2)' : 'rgba(43,191,170,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 14, height: 14, color: item.accent ? colors.mint : colors.teal }}>{item.icon}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 600, color: colors.cream }}>{item.title}</div>
                  <div style={{ fontFamily: fonts.mono, fontSize: '0.58rem', color: colors.creamDim }}>{item.clients}</div>
                </div>
                <div style={{ fontFamily: fonts.display, fontSize: '1rem', fontWeight: 800, color: item.accent ? colors.mint : colors.cream }}>{item.amount}</div>
              </div>
            ))}
          </div>
          
          {/* Total */}
          <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(43,191,170,.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: fonts.mono, fontSize: '0.6rem', letterSpacing: '0.15em', color: colors.creamDim }}>THIS MONTH</span>
            <span style={{ fontFamily: fonts.display, fontSize: '1.2rem', fontWeight: 900, color: colors.mint }}>$2,400</span>
          </div>
        </div>
      </div>

      {/* Card label */}
      <span style={{ fontFamily: fonts.mono, fontSize: '0.75rem', letterSpacing: '0.18em', color: colors.teal }}>04</span>
      <h3 style={{ fontFamily: fonts.display, fontWeight: 800, fontStretch: '125%', fontSize: '1.7rem', margin: '12px 0', lineHeight: 1.02, letterSpacing: '-0.005em', color: colors.cream }}>New ways to earn</h3>
      <p style={{ color: colors.creamDim, fontSize: '1.08rem' }}>Run challenges and group programs. <b style={{ color: colors.cream, fontWeight: 500 }}>Make money without trading more hours.</b> Your time stays yours.</p>
    </div>
  )
}
