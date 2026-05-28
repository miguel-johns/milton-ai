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
              <span style={{ fontFamily: fonts.mono, fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: colors.teal }}>For coaches</span>
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
            {[
              { num: '01', title: 'Look like a pro', desc: 'Clean programs, check-ins, and reports, every time.', bold: 'New clients trust you right away.' },
              { num: '02', title: 'Charge more', desc: 'When you look sharp and get results,', bold: 'you can raise your prices.', after: ' Milton helps you back it up.' },
              { num: '03', title: 'Get referrals', desc: 'Happy clients bring friends. Milton keeps every client feeling cared for,', bold: 'so they spread the word.' },
              { num: '04', title: 'New ways to earn', desc: 'Run challenges and group programs.', bold: 'Make money without trading more hours.', after: ' Your time stays yours.' },
            ].map((card, i) => (
              <Reveal key={card.num} delay={i * 90}>
                <HowCard {...card} />
              </Reveal>
            ))}
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
                <VideoPlaceholder subtitle="Coaching clip goes here" />
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

      <div style={{ background: '#FAFBFC' }}>
        <Footer />
      </div>
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
