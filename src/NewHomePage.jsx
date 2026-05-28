import { useState, useEffect } from 'react'
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

// Colors
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

// Fonts
const fonts = {
  display: "'Archivo', 'Archivo Black', sans-serif",
  sans: "'DM Sans', sans-serif",
  mono: "'JetBrains Mono', monospace",
}

// Reveal animation hook
function useReveal() {
  const [visible, setVisible] = useState(false)
  const ref = useState(null)[1]
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.14 }
    )
    
    const el = document.querySelector(`[data-reveal="${Math.random()}"]`)
    if (el) observer.observe(el)
    
    return () => observer.disconnect()
  }, [])
  
  return { visible, ref }
}

// Reveal component
function Reveal({ children, delay = 0, style = {} }) {
  const [visible, setVisible] = useState(false)
  const [ref, setRef] = useState(null)

  useEffect(() => {
    if (!ref) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.14 }
    )
    observer.observe(ref)
    return () => observer.disconnect()
  }, [ref, delay])

  return (
    <div
      ref={setRef}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(24px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// Media placeholder component
function MediaPlaceholder({ type = 'image', text, subtext, aspectRatio = '16/9', style = {} }) {
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
      aspectRatio,
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
      <span style={{
        fontFamily: fonts.mono,
        fontSize: '0.68rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: colors.teal,
      }}>{text || (type === 'video' ? 'Video' : 'Image')}</span>
      {subtext && (
        <span style={{
          fontFamily: fonts.mono,
          fontSize: '0.6rem',
          letterSpacing: '0.12em',
          color: colors.creamDim,
          opacity: 0.75,
        }}>{subtext}</span>
      )}
    </div>
  )
}

// Button component
function Button({ href, variant = 'primary', children, style = {} }) {
  const baseStyle = {
    display: 'inline-block',
    fontFamily: fonts.sans,
    fontWeight: 700,
    fontSize: '1.05rem',
    padding: '18px 38px',
    borderRadius: 100,
    textDecoration: 'none',
    transition: 'transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease, color 0.18s ease, border-color 0.18s ease',
    cursor: 'pointer',
  }

  const variants = {
    primary: {
      color: colors.navy,
      background: colors.mint,
      border: `2px solid ${colors.mint}`,
      boxShadow: '0 10px 30px rgba(154,241,152,.18)',
    },
    outline: {
      color: colors.cream,
      background: 'transparent',
      border: '2px solid rgba(43,191,170,.7)',
      boxShadow: 'none',
    },
  }

  const [hovered, setHovered] = useState(false)

  const hoverStyle = hovered ? {
    transform: 'translateY(-3px)',
    background: colors.teal,
    borderColor: colors.teal,
    boxShadow: '0 16px 40px rgba(43,191,170,.32)',
    color: variant === 'outline' ? colors.navy : colors.navy,
  } : {}

  return (
    <a
      href={href}
      style={{ ...baseStyle, ...variants[variant], ...hoverStyle, ...style }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  )
}

export default function NewHomePage() {
  const { mobile } = useBreakpoint()

  return (
    <div style={{ background: colors.navy, color: colors.cream, fontFamily: fonts.sans, fontSize: 18, lineHeight: 1.6 }}>
      <Header />

      {/* HERO */}
      <header style={{
        position: 'relative',
        padding: mobile ? '72px 0 82px' : '92px 0 102px',
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

        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : '1.05fr 0.95fr',
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
                Grow your fitness business.<br/>Just by <em style={{ fontStyle: 'normal', color: colors.mint }}>talking.</em>
              </h1>

              <p style={{
                fontSize: 'clamp(1.15rem, 2.4vw, 1.5rem)',
                maxWidth: 600,
                color: colors.creamDim,
                marginBottom: 36,
              }}>
                Milton is one simple app for the fitness world. You just talk to it. It does the busy work, makes you look pro, and helps you make more money. <b style={{ color: colors.cream, fontWeight: 500 }}>Pick your path to get started.</b>
              </p>

              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <Button href="/for-coaches">For Coaches</Button>
                <Button href="/for-gyms" variant="outline">For Gyms</Button>
              </div>
            </div>

            <Reveal>
              <img
                src={mobile ? '/images/product-hero-mobile.png' : '/images/product-hero-desktop.png'}
                alt="Milton AI coaching assistant interface"
                style={{
                  width: '100%',
                  maxWidth: mobile ? 400 : '100%',
                  height: 'auto',
                  display: 'block',
                  margin: mobile ? '0 auto' : undefined,
                }}
              />
            </Reveal>
          </div>
        </div>
      </header>

      {/* PATHS / FORK */}
      <section style={{
        background: `
          radial-gradient(900px 640px at 9% 24%, rgba(43,191,170,.20), transparent 60%),
          radial-gradient(840px 600px at 97% 30%, rgba(255,176,92,.22), transparent 58%),
          radial-gradient(780px 580px at 84% 106%, rgba(154,241,152,.24), transparent 60%),
          radial-gradient(640px 540px at -5% 98%, rgba(120,198,255,.16), transparent 60%),
          #ffffff
        `,
        color: colors.ink,
        padding: '96px 0',
      }}>
        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 28px' }}>
          <span style={{
            fontFamily: fonts.mono,
            fontSize: '0.72rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: colors.tealDeep,
            display: 'block',
            textAlign: 'center',
          }}>Choose your path</span>

          <h2 style={{
            fontFamily: fonts.display,
            fontWeight: 900,
            fontStretch: '125%',
            lineHeight: 0.98,
            letterSpacing: '-0.005em',
            textAlign: 'center',
            fontSize: 'clamp(2.1rem, 5vw, 3.4rem)',
            margin: '14px auto 12px',
            maxWidth: 760,
          }}>Which one are you?</h2>

          <p style={{
            textAlign: 'center',
            color: colors.inkSoft,
            fontSize: '1.15rem',
            maxWidth: 560,
            margin: '0 auto 46px',
          }}>Milton works a little differently for each. Pick the one that fits you.</p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
            gap: 24,
          }}>
            {/* Coaches card */}
            <PathCard
              eyebrow="Solo coaches & trainers"
              title="Get more clients"
              items={[
                'Look like a pro from day one',
                'Charge more and win referrals',
                'New ways to earn without more hours',
              ]}
              href="/for-coaches"
              buttonText="For Coaches"
            />

            {/* Gyms card */}
            <PathCard
              eyebrow="Gym & studio owners"
              title="Run your whole gym"
              items={[
                'One tool for all your trainers',
                'Group fitness with a personal feel',
                'Keep more members and grow revenue',
              ]}
              href="/for-gyms"
              buttonText="For Gyms"
            />
          </div>
        </div>
      </section>

      {/* WHY SECTION */}
      <section style={{ padding: '96px 0', background: colors.navy }}>
        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 28px' }}>
          <span style={{
            fontFamily: fonts.mono,
            fontSize: '0.72rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: colors.teal,
          }}>Why Milton</span>

          <h2 style={{
            fontFamily: fonts.display,
            fontWeight: 900,
            fontStretch: '125%',
            lineHeight: 0.98,
            letterSpacing: '-0.005em',
            fontSize: 'clamp(2.3rem, 5.2vw, 3.6rem)',
            margin: '14px 0 14px',
          }}>
            One app. You just <em style={{ fontStyle: 'normal', color: colors.mint }}>talk</em> to it.
          </h2>

          <p style={{
            color: colors.creamDim,
            maxWidth: 620,
            marginBottom: 50,
            fontSize: '1.15rem',
          }}>No new system to learn. No clicking around. You tell Milton what you need, and it gets to work.</p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)',
            gap: 22,
          }}>
            <FeatureCard
              num="01"
              title="Just talk to it"
              description={<>Say what you need. Milton gets it done. <b style={{ color: colors.cream, fontWeight: 500 }}>No setup. No learning curve.</b></>}
              image="/images/home-card-1.png"
            />
            <FeatureCard
              num="02"
              title="It learns your way"
              description={<>Give Milton your style and your programs. <b style={{ color: colors.cream, fontWeight: 500 }}>It coaches the way you do, every time.</b></>}
              delay={90}
              image="/images/home-card-2.png"
            />
            <FeatureCard
              num="03"
              title="It grows your business"
              description={<>More clients, more revenue, less busy work. <b style={{ color: colors.cream, fontWeight: 500 }}>That is the whole point.</b></>}
              delay={180}
              image="/images/home-card-3.png"
            />
          </div>
        </div>
      </section>

      {/* VALUE SECTION */}
      <section style={{
        padding: '92px 0',
        background: `
          radial-gradient(900px 640px at 9% 24%, rgba(43,191,170,.20), transparent 60%),
          radial-gradient(840px 600px at 97% 30%, rgba(255,176,92,.22), transparent 58%),
          radial-gradient(780px 580px at 84% 106%, rgba(154,241,152,.24), transparent 60%),
          radial-gradient(640px 540px at -5% 98%, rgba(120,198,255,.16), transparent 60%),
          #ffffff
        `,
        color: colors.ink,
      }}>
        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 28px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : '1.1fr 0.9fr',
            gap: 48,
            alignItems: 'center',
          }}>
            <div>
              <span style={{
                fontFamily: fonts.mono,
                fontSize: '0.72rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: colors.tealDeep,
              }}>The payoff</span>

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
                Help more people. <em style={{ fontStyle: 'normal', color: colors.tealDeep }}>Make more money.</em>
              </h2>

              <p style={{ fontSize: '1.18rem', color: colors.inkSoft }}>
                Milton gives you back your time and makes your coaching look world-class. Coach on your own or run a whole gym, either way you grow. You stay in charge. Milton does the rest.
              </p>
            </div>

            <Reveal>
              <div style={{
                position: 'relative',
                width: '100%',
                paddingBottom: '56.25%',
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 26px 60px rgba(11,22,40,.16)',
              }}>
                <iframe
                  src="https://www.youtube.com/embed/v8umQMr6F3U?si=CXXGTvJSxhELXWae"
                  title="Milton AI - The Payoff"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FINAL FORK */}
      <section style={{
        padding: '110px 0 118px',
        textAlign: 'center',
        background: `
          radial-gradient(700px 380px at 50% 0%, rgba(43,191,170,.22), transparent 62%),
          ${colors.navy}
        `,
      }}>
        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 28px' }}>
          <span style={{
            fontFamily: fonts.mono,
            fontSize: '0.72rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: colors.teal,
          }}>Ready?</span>

          <h2 style={{
            fontFamily: fonts.display,
            fontWeight: 900,
            fontStretch: '125%',
            lineHeight: 0.98,
            letterSpacing: '-0.005em',
            fontSize: 'clamp(2.6rem, 6.4vw, 4.6rem)',
            margin: '16px 0 18px',
          }}>
            Pick your <em style={{ fontStyle: 'normal', color: colors.mint }}>path.</em>
          </h2>

          <p style={{
            fontSize: '1.25rem',
            color: colors.creamDim,
            maxWidth: 520,
            margin: '0 auto 36px',
          }}>See exactly how Milton works for you, and get started in minutes.</p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button href="/for-coaches">For Coaches</Button>
            <Button href="/for-gyms" variant="outline">For Gyms</Button>
          </div>
        </div>
      </section>

      <div style={{ background: '#FAFBFC' }}>
        <Footer />
      </div>
    </div>
  )
}

// Path Card Component
function PathCard({ eyebrow, title, items, href, buttonText }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Reveal>
      <div
        style={{
          background: 'rgba(255,255,255,.72)',
          border: '1px solid rgba(11,22,40,.08)',
          borderRadius: 24,
          padding: '46px 42px',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: hovered ? '0 26px 56px rgba(11,22,40,.12)' : '0 16px 40px rgba(11,22,40,.07)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          transform: hovered ? 'translateY(-5px)' : 'none',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span style={{
          fontFamily: fonts.mono,
          fontSize: '0.68rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: colors.tealDeep,
        }}>{eyebrow}</span>

        <h3 style={{
          fontFamily: fonts.display,
          fontWeight: 800,
          fontStretch: '125%',
          fontSize: '2.1rem',
          lineHeight: 1.02,
          letterSpacing: '-0.005em',
          margin: '12px 0 20px',
          color: colors.ink,
        }}>{title}</h3>

        <ul style={{ listStyle: 'none', margin: '0 0 30px', padding: 0 }}>
          {items.map((item, i) => (
            <li key={i} style={{
              display: 'flex',
              gap: 11,
              alignItems: 'flex-start',
              color: colors.inkSoft,
              fontSize: '1.1rem',
              marginBottom: 12,
            }}>
              <span style={{ flex: '0 0 auto', color: colors.tealDeep, fontWeight: 800, marginTop: 1 }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <Button href={href} style={{ alignSelf: 'flex-start', marginTop: 'auto' }}>{buttonText}</Button>
      </div>
    </Reveal>
  )
}

// Feature Card Component
function FeatureCard({ num, title, description, delay = 0, image }) {
  const [hovered, setHovered] = useState(false)
  
  return (
  <Reveal delay={delay}>
  <div
  style={{
  background: colors.navySoft,
  border: `1px solid ${hovered ? colors.teal : 'rgba(43,191,170,.22)'}`,
  borderRadius: 20,
  padding: '34px 30px',
  transition: 'transform 0.2s ease, border-color 0.2s ease',
  transform: hovered ? 'translateY(-5px)' : 'none',
  }}
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}
  >
  {image ? (
    <img 
      src={image} 
      alt={title}
      style={{ 
        width: '100%', 
        aspectRatio: '16/10', 
        objectFit: 'cover', 
        borderRadius: 12, 
        marginBottom: 18 
      }}
    />
  ) : (
    <MediaPlaceholder
      type="image"
      text="Image"
      aspectRatio="16/10"
      style={{ width: '100%', marginBottom: 18 }}
    />
  )}

        <span style={{
          fontFamily: fonts.mono,
          fontSize: '0.75rem',
          letterSpacing: '0.18em',
          color: colors.teal,
        }}>{num}</span>

        <h3 style={{
          fontFamily: fonts.display,
          fontWeight: 800,
          fontStretch: '125%',
          fontSize: '1.55rem',
          margin: '12px 0 12px',
          lineHeight: 1.04,
          letterSpacing: '-0.005em',
          color: colors.cream,
        }}>{title}</h3>

        <p style={{ color: colors.creamDim, fontSize: '1.06rem' }}>{description}</p>
      </div>
    </Reveal>
  )
}
