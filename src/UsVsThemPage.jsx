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

// Design tokens
const colors = {
  navy: '#0B1628',
  navySoft: '#13233d',
  cream: '#F7F4ED',
  creamDim: '#d9d4c7',
  teal: '#2BBFAA',
  tealDeep: '#0E8C7A',
  mint: '#9AF198',
  ink: '#0B1628',
  inkSoft: '#39414f',
  muted: 'rgba(247,244,237,.5)',
  line: 'rgba(247,244,237,.08)',
}

const fonts = {
  display: "'Archivo', 'Archivo Black', sans-serif",
  sans: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
  mono: "'JetBrains Mono', monospace",
}

const brandwash = `
  radial-gradient(900px 640px at 9% 24%, rgba(43,191,170,.20), transparent 60%),
  radial-gradient(840px 600px at 97% 30%, rgba(255,176,92,.22), transparent 58%),
  radial-gradient(780px 580px at 84% 106%, rgba(154,241,152,.24), transparent 60%),
  radial-gradient(640px 540px at -5% 98%, rgba(120,198,255,.16), transparent 60%),
  #ffffff
`

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
      { threshold: 0.12 }
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

// Text input icon SVG
const TextIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 7V4h16v3"/>
    <path d="M9 20h6"/>
    <path d="M12 4v16"/>
  </svg>
)

// VS comparison items data
const vsItems = [
  {
    num: '01',
    category: 'Program building',
    themSteps: [
      'Open the builder.',
      'Pick a template.',
      'Drag in exercises.',
      'Set reps, sets, tempo, rest.',
      'Save it as a block.',
      'Build a week. Duplicate. Adjust.',
      'Assign to the client.',
      'Hope they open it.',
    ],
    miltonCommand: '"Build Omar a 4-week strength program with basketball mixed in."',
  },
  {
    num: '02',
    category: 'Client check-ins',
    themSteps: [
      'Open the dashboard.',
      'Filter by client.',
      'Read their last check-in.',
      'Open their messages.',
      'Type a reply.',
      'Pull up their progress.',
      'Copy a stat. Paste it in.',
      'Send.',
    ],
    miltonCommand: '"How\'s Sarah doing this week?"',
  },
  {
    num: '03',
    category: 'Nutrition',
    themSteps: [
      'Set up macro targets.',
      'Build a meal template.',
      'Assign it to the client.',
      'Show them how to log.',
      'Remind them to log.',
      'Review their log.',
      'Adjust. Reassign.',
    ],
    miltonCommand: '"Set Jenna up on a 1,800 calorie cut and check her meals daily."',
  },
  {
    num: '04',
    category: 'Challenges',
    themSteps: [
      'Create a program.',
      'Build the marketing.',
      'Set the pricing.',
      'Build a sign-up flow.',
      'Set up the messages.',
      'Track who\'s in, out, and winning, by hand.',
    ],
    miltonCommand: '"Run a 30-day nutrition challenge for my members."',
  },
  {
    num: '05',
    category: 'Reporting',
    themSteps: [
      'Export the data.',
      'Open a spreadsheet.',
      'Build a chart.',
      'Format it.',
      'Write the takeaways.',
      'Send the email.',
    ],
    miltonCommand: '"Send Collins his 30-day progress report."',
  },
]

// Typing cursor animation
function TypingCursor() {
  return (
    <span style={{
      display: 'inline-block',
      width: 2,
      height: 20,
      background: colors.tealDeep,
      marginLeft: 4,
      animation: 'blink 1s step-end infinite',
    }}>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  )
}

// Send icon SVG
const SendIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
  </svg>
)

// Chat bubble component for phone-style messaging
function ChatBubble({ message, mobile, showInput = true }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Message bubble - sent style (right aligned, teal) */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{
          background: colors.teal,
          borderRadius: 20,
          borderBottomRightRadius: 6,
          padding: mobile ? '14px 18px' : '16px 20px',
          fontSize: mobile ? '1rem' : '1.15rem',
          lineHeight: 1.45,
          color: '#fff',
          fontWeight: 500,
          maxWidth: '90%',
        }}>
          {message}
        </div>
      </div>
      
      {/* Input bar */}
      {showInput && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: 'rgba(11,22,40,.04)',
          borderRadius: 24,
          padding: '10px 12px 10px 18px',
          border: '1px solid rgba(11,22,40,.08)',
        }}>
          <span style={{ 
            flex: 1, 
            color: 'rgba(11,22,40,.35)', 
            fontSize: '0.95rem' 
          }}>Message Milton...</span>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: colors.teal,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <SendIcon size={18} color="#fff" />
          </div>
        </div>
      )}
    </div>
  )
}

// Command Card component for hero
function CommandCard({ mobile }) {
  return (
    <Reveal>
      <div style={{
        background: '#fff',
        borderRadius: 28,
        padding: mobile ? '24px 20px' : '28px 26px',
        boxShadow: '0 34px 80px rgba(0,0,0,.45)',
        color: colors.ink,
        maxWidth: 420,
      }}>
        {/* Phone header bar */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: 20,
          paddingBottom: 14,
          borderBottom: '1px solid rgba(11,22,40,.06)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: colors.mint,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: fonts.display,
              fontWeight: 800,
              fontSize: '1.1rem',
              color: colors.ink,
            }}>M</div>
            <div>
              <div style={{ 
                fontWeight: 600, 
                fontSize: '0.95rem',
                color: colors.ink,
              }}>Milton</div>
              <div style={{ 
                fontSize: '0.72rem', 
                color: 'rgba(11,22,40,.5)',
              }}>Online</div>
            </div>
          </div>
          <span style={{
            fontFamily: fonts.mono,
            fontSize: '0.65rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: colors.tealDeep,
          }}>Just text it</span>
        </div>
        
        {/* Chat area */}
        <ChatBubble 
          message="Build Sarah a 4-week program for her shoulder rehab. She can train 3 days a week."
          mobile={mobile}
        />
        
        {/* Tagline */}
        <div style={{
          marginTop: 18,
          fontFamily: fonts.mono,
          fontSize: '0.68rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: colors.tealDeep,
          textAlign: 'center',
        }}>One message. Done.</div>
      </div>
    </Reveal>
  )
}

// VS Item component
function VSItem({ item, mobile }) {
  return (
    <Reveal>
      <div style={{ marginBottom: 48 }}>
        {/* Category header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
          <span style={{
            fontFamily: fonts.mono,
            fontSize: '0.74rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: colors.teal,
            whiteSpace: 'nowrap',
          }}>{item.num} · {item.category}</span>
          <span style={{ flex: 1, height: 1, background: 'rgba(43,191,170,.22)' }} />
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
          gap: 22,
          alignItems: 'stretch',
        }}>
          {/* Them column */}
          <div style={{
            background: '#101d31',
            border: '1px solid rgba(247,244,237,.08)',
            borderRadius: 20,
            padding: '30px 30px',
          }}>
            <div style={{
              fontFamily: fonts.mono,
              fontSize: '0.72rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: colors.muted,
              marginBottom: 16,
            }}>Them</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {item.themSteps.map((step, i) => (
                <li key={i} style={{
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start',
                  fontSize: '0.98rem',
                  color: colors.muted,
                  padding: '7px 0',
                  borderBottom: i < item.themSteps.length - 1 ? '1px solid rgba(247,244,237,.05)' : 'none',
                }}>
                  <span style={{
                    flexShrink: 0,
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: 'rgba(247,244,237,.3)',
                    marginTop: 9,
                  }} />
                  {step}
                </li>
              ))}
            </ul>
          </div>

          {/* Milton column - chat style */}
          <div style={{
            background: `radial-gradient(120% 120% at 100% 0%, rgba(43,191,170,.16), transparent 60%), ${colors.navySoft}`,
            border: '1.5px solid',
            borderColor: colors.teal,
            boxShadow: '0 22px 50px rgba(43,191,170,.16)',
            borderRadius: 20,
            padding: '24px 24px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* Chat header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 16,
              paddingBottom: 12,
              borderBottom: '1px solid rgba(43,191,170,.2)',
            }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: colors.mint,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: fonts.display,
                fontWeight: 800,
                fontSize: '0.85rem',
                color: colors.ink,
              }}>M</div>
              <span style={{
                fontFamily: fonts.mono,
                fontSize: '0.68rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: colors.teal,
              }}>Milton</span>
            </div>
            
            {/* Sent message bubble */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
              <div style={{
                background: colors.teal,
                borderRadius: 16,
                borderBottomRightRadius: 4,
                padding: '12px 16px',
                maxWidth: '95%',
              }}>
                <div style={{
                  fontFamily: fonts.display,
                  fontWeight: 600,
                  fontStretch: '105%',
                  fontSize: mobile ? '1rem' : '1.15rem',
                  lineHeight: 1.25,
                  color: '#fff',
                }}>{item.miltonCommand}</div>
              </div>
            </div>
            
            {/* Input bar */}
            <div style={{
              marginTop: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(247,244,237,.06)',
              borderRadius: 20,
              padding: '8px 10px 8px 14px',
              border: '1px solid rgba(247,244,237,.1)',
            }}>
              <span style={{ 
                flex: 1, 
                color: 'rgba(247,244,237,.3)', 
                fontSize: '0.8rem',
                fontFamily: fonts.sans,
              }}>Message...</span>
              <div style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: colors.teal,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <SendIcon size={14} color="#fff" />
              </div>
            </div>
            
            <div style={{
              marginTop: 12,
              fontFamily: fonts.mono,
              fontSize: '0.68rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: colors.mint,
              textAlign: 'center',
            }}>One message. Done.</div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export default function UsVsThemPage() {
  const { mobile } = useBreakpoint()
  const [chatModalOpen, setChatModalOpen] = useState(false)

  const labelStyle = {
    fontFamily: fonts.mono,
    fontSize: '0.72rem',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: colors.teal,
  }

  const displayStyle = {
    fontFamily: fonts.display,
    fontWeight: 900,
    fontStretch: '125%',
    lineHeight: 0.98,
    letterSpacing: '-0.005em',
  }

  const btnStyle = {
    display: 'inline-block',
    fontFamily: fonts.sans,
    fontWeight: 700,
    fontSize: '1.05rem',
    color: colors.ink,
    background: colors.mint,
    padding: '18px 38px',
    borderRadius: 100,
    textDecoration: 'none',
    border: `2px solid ${colors.mint}`,
    transition: 'transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease, color 0.18s ease, border-color 0.18s ease',
    boxShadow: '0 10px 30px rgba(154,241,152,.18)',
    cursor: 'pointer',
  }

  return (
    <div style={{ minHeight: '100vh', background: colors.navy, fontFamily: fonts.sans, color: colors.cream }}>
      <Header currentPage="us-vs-them" />

      {/* ═══════ HERO (DARK) ═══════ */}
      <header style={{
        position: 'relative',
        padding: mobile ? '72px 0 80px' : '92px 0 100px',
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

        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : '1.02fr 0.98fr',
            gap: mobile ? 40 : 54,
            alignItems: 'center',
          }}>
            {/* Hero copy */}
            <div style={{ maxWidth: mobile ? 'none' : 600 }}>
              <span style={labelStyle}>Milton vs the rest</span>
              <h1 style={{
                ...displayStyle,
                fontSize: mobile ? '2.6rem' : 'clamp(2.6rem,5.6vw,4.8rem)',
                margin: '22px 0 22px',
                color: colors.cream,
              }}>
                They built software.<br />We built an <em style={{ fontStyle: 'normal', color: colors.mint }}>assistant.</em>
              </h1>
              <p style={{
                fontSize: mobile ? '1.15rem' : 'clamp(1.15rem,2.4vw,1.5rem)',
                maxWidth: 560,
                color: colors.creamDim,
                marginBottom: 34,
              }}>One you have to learn. One you just talk to.</p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <a href="/for-coaches" style={btnStyle}
                  onMouseEnter={e => { e.target.style.transform = 'translateY(-3px)'; e.target.style.background = colors.teal; e.target.style.borderColor = colors.teal; }}
                  onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.background = colors.mint; e.target.style.borderColor = colors.mint; }}
                >For Coaches</a>
                <a href="/for-gyms" style={{ ...btnStyle, background: 'transparent', color: colors.cream, border: `2px solid rgba(43,191,170,.7)`, boxShadow: 'none' }}
                  onMouseEnter={e => { e.target.style.background = colors.teal; e.target.style.color = colors.ink; e.target.style.borderColor = colors.teal; }}
                  onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = colors.cream; e.target.style.borderColor = 'rgba(43,191,170,.7)'; }}
                >For Gyms</a>
              </div>
            </div>

            {/* Command card */}
            <CommandCard mobile={mobile} />
          </div>
        </div>
      </header>

      {/* ═══════ DIFFERENCE (LIGHT) ═══════ */}
      <section style={{ background: brandwash, color: colors.ink, padding: mobile ? '64px 0' : '92px 0' }}>
        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 28px' }}>
          <span style={{ ...labelStyle, color: colors.tealDeep }}>The difference</span>
          <h2 style={{
            ...displayStyle,
            fontSize: mobile ? '2.2rem' : 'clamp(2.2rem,5.2vw,3.6rem)',
            margin: '14px 0 22px',
            maxWidth: 760,
            color: colors.ink,
          }}>{"The juice isn't worth the squeeze."}</h2>
          <p style={{ fontSize: '1.22rem', color: colors.inkSoft, maxWidth: 680 }}>
            Other coaching software promises a lot. Then it asks you to learn it, set it up, teach your members, and click around forever to actually use it. <b style={{ color: colors.ink, fontWeight: 600 }}>Milton just listens.</b>
          </p>
        </div>
      </section>

      {/* ═══════ VS (DARK) ═══════ */}
      <section style={{ padding: mobile ? '64px 0 56px' : '96px 0 90px', background: colors.navy }}>
        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 28px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={labelStyle}>Side by side</span>
            <h2 style={{
              ...displayStyle,
              fontSize: mobile ? '2.3rem' : 'clamp(2.3rem,5.4vw,3.6rem)',
              margin: '14px 0 0',
              color: colors.cream,
            }}>Ten steps, or <em style={{ fontStyle: 'normal', color: colors.mint }}>one sentence.</em></h2>
          </div>

          {/* VS Items */}
          {vsItems.map((item, i) => (
            <VSItem key={i} item={item} mobile={mobile} />
          ))}
        </div>
      </section>

      {/* ═══════ PATTERN (LIGHT) ═══════ */}
      <section style={{ background: brandwash, color: colors.ink, padding: mobile ? '72px 0' : '100px 0', textAlign: 'center' }}>
        <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 28px' }}>
          <span style={{ ...labelStyle, color: colors.tealDeep }}>The pattern</span>
          <h2 style={{
            ...displayStyle,
            fontSize: mobile ? '2.6rem' : 'clamp(2.6rem,6vw,4.4rem)',
            margin: '16px auto 22px',
            color: colors.ink,
          }}>One sentence in.<br />Work <em style={{ fontStyle: 'normal', color: colors.tealDeep }}>done.</em></h2>
          <p style={{ fontSize: '1.24rem', color: colors.inkSoft, maxWidth: 620, margin: '0 auto' }}>
            That is the whole product. Coaches stay on Milton for the same reason they leave everyone else. <b style={{ color: colors.ink, fontWeight: 600 }}>{"They don't have to think about the software. They just coach."}</b>
          </p>
        </div>
      </section>

      {/* ═══════ FINAL CTA (DARK) ═══════ */}
      <section style={{
        padding: mobile ? '80px 0 88px' : '108px 0 116px',
        textAlign: 'center',
        background: `radial-gradient(700px 380px at 50% 0%, rgba(43,191,170,.22), transparent 62%), ${colors.navy}`,
      }}>
        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 28px' }}>
          <span style={labelStyle}>See it for yourself</span>
          <h2 style={{
            ...displayStyle,
            fontSize: mobile ? '2.6rem' : 'clamp(2.6rem,6.4vw,4.6rem)',
            margin: '16px 0 18px',
            color: colors.cream,
          }}>Just coach. <em style={{ fontStyle: 'normal', color: colors.mint }}>Milton listens.</em></h2>
          <p style={{ fontSize: '1.25rem', color: colors.creamDim, maxWidth: 520, margin: '0 auto 36px' }}>
            Pick your path and see how simple coaching software should feel.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="/for-coaches" style={btnStyle}
              onMouseEnter={e => { e.target.style.transform = 'translateY(-3px)'; e.target.style.background = colors.teal; e.target.style.borderColor = colors.teal; }}
              onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.background = colors.mint; e.target.style.borderColor = colors.mint; }}
            >For Coaches</a>
            <a href="/for-gyms" style={{ ...btnStyle, background: 'transparent', color: colors.cream, border: `2px solid rgba(43,191,170,.7)`, boxShadow: 'none' }}
              onMouseEnter={e => { e.target.style.background = colors.teal; e.target.style.color = colors.ink; e.target.style.borderColor = colors.teal; }}
              onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = colors.cream; e.target.style.borderColor = 'rgba(43,191,170,.7)'; }}
            >For Gyms</a>
          </div>
        </div>
      </section>

      <Footer mobile={mobile} onOpenChat={() => setChatModalOpen(true)} />
    </div>
  )
}
