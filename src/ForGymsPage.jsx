import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

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
};

const fonts = {
  display: "'Archivo', 'Archivo Black', sans-serif",
  sans: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

function Reveal({ children, style }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.14 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(24px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      {children}
    </div>
  );
}

export default function ForGymsPage() {
  const [mobile, setMobile] = useState(window.innerWidth < 760);
  const [showCalendly, setShowCalendly] = useState(false);

  useEffect(() => {
    const handleResize = () => setMobile(window.innerWidth < 760);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load Calendly script when modal opens
  useEffect(() => {
    if (showCalendly) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [showCalendly]);

  const painPoints = [
    "You pay for too many apps. None of them talk to each other.",
    "Your trainers all do their own thing. Nothing looks the same.",
    "You spend hours chasing new leads and following up.",
    "People quit your gym, and you didn't see it coming.",
    "You want every member to feel special, even in a big class.",
    "You work all the time. The gym runs you, not the other way around.",
  ];

  const cards = [
    { num: '01', title: 'Just talk to it', text: <>Say <b style={{ color: colors.cream, fontWeight: 500 }}>"help me prep for today,"</b> and Milton gets you ready in seconds. It pulls up your client, their last workout, and what to focus on. No setup needed.</> },
    { num: '02', title: 'It learns your way', text: <>Hand Milton your old workouts and notes. <b style={{ color: colors.cream, fontWeight: 500 }}>It learns how you coach.</b> Now all six trainers coach the same way, with no clunky tools to manage.</> },
    { num: '03', title: 'It does the busy work', text: <>Milton writes the workouts, sends the check-ins, and <b style={{ color: colors.cream, fontWeight: 500 }}>remembers every client.</b> You just say "yes," or change it. Done in minutes, not hours.</> },
    { num: '04', title: 'It helps you grow', text: <>Milton makes it easy to run challenges, follow up with leads, and keep members happy. <b style={{ color: colors.cream, fontWeight: 500 }}>More money. Less stress. Less time in the weeds.</b></> },
  ];

  const riskCards = [
    { big: '$0', text: 'No setup fee. We help you get going.' },
    { big: '30', text: "Try it 30 days. Don't love it? Get every dollar back. No questions." },
    { big: '∞', text: 'No long contract. Cancel any month you want.' },
  ];

  const wrapStyle = { maxWidth: 1040, margin: '0 auto', padding: '0 28px' };
  const brandwash = 'radial-gradient(900px 640px at 9% 24%, rgba(43,191,170,0.20), transparent 60%), radial-gradient(840px 600px at 97% 30%, rgba(255,176,92,0.22), transparent 58%), radial-gradient(780px 580px at 84% 106%, rgba(154,241,152,0.24), transparent 60%), radial-gradient(640px 540px at -5% 98%, rgba(120,198,255,0.16), transparent 60%), #ffffff';

  const labelStyle = {
    fontFamily: fonts.mono,
    fontSize: '0.72rem',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: colors.teal,
  };

  const displayStyle = {
    fontFamily: fonts.display,
    fontWeight: 900,
    fontStretch: '125%',
    fontVariationSettings: '"wdth" 125',
    lineHeight: 0.98,
    letterSpacing: '-0.005em',
  };

  const btnStyle = {
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
    transition: 'transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease',
    boxShadow: '0 10px 30px rgba(154,241,152,0.18)',
    cursor: 'pointer',
  };

  const phStyle = {
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
    background: `radial-gradient(130% 130% at 50% 0%, rgba(43,191,170,0.18), transparent 60%), ${colors.navySoft}`,
    border: '1.5px dashed rgba(43,191,170,0.5)',
    color: colors.creamDim,
  };

  return (
    <div style={{ background: colors.navy, color: colors.cream, fontFamily: fonts.sans, fontSize: 18, lineHeight: 1.6, overflowX: 'hidden' }}>
      <Header />

      {/* HERO */}
      <header style={{
        position: 'relative',
        padding: '74px 0 96px',
        background: `radial-gradient(900px 420px at 78% -8%, rgba(43,191,170,0.20), transparent 60%), radial-gradient(700px 380px at 8% 16%, rgba(154,241,152,0.10), transparent 60%), ${colors.navy}`,
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(247,244,237,0.05) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          pointerEvents: 'none',
        }} />
        <div style={{ ...wrapStyle, position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : '1.05fr 0.95fr',
            gap: 56,
            alignItems: 'center',
          }}>
            <div style={{ maxWidth: mobile ? 'none' : 600 }}>
              <div style={{ height: 20 }} />
              <h1 style={{ ...displayStyle, fontSize: mobile ? '2.6rem' : 'clamp(2.6rem,5.6vw,4.8rem)', margin: '22px 0 26px' }}>
                Run your whole gym<br />by just <em style={{ fontStyle: 'normal', color: colors.mint }}>talking.</em>
              </h1>
              <p style={{ fontSize: mobile ? '1.15rem' : 'clamp(1.15rem,2.4vw,1.5rem)', maxWidth: 660, color: colors.creamDim, marginBottom: 38 }}>
                Milton is one app for your gym. You don&apos;t click around or set things up. You just <b style={{ color: colors.cream, fontWeight: 500 }}>talk to it, like texting a friend.</b> It learns how you coach. Then it does the boring work for you.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <a href="https://coach.getmilton.com/auth" style={btnStyle} onMouseEnter={e => { e.target.style.transform = 'translateY(-3px)'; e.target.style.background = colors.teal; e.target.style.borderColor = colors.teal; e.target.style.boxShadow = '0 16px 40px rgba(43,191,170,0.32)'; }} onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.background = colors.mint; e.target.style.borderColor = colors.mint; e.target.style.boxShadow = '0 10px 30px rgba(154,241,152,0.18)'; }}>
                  Try 7 Days Free
                </a>
                <button onClick={() => setShowCalendly(true)} style={{ ...btnStyle, background: 'transparent', borderColor: colors.cream, color: colors.cream, boxShadow: 'none', cursor: 'pointer' }} onMouseEnter={e => { e.target.style.transform = 'translateY(-3px)'; e.target.style.background = 'rgba(255,255,255,0.1)'; }} onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.background = 'transparent'; }}>
                  Book a free call
                </button>
                <span style={{ fontFamily: fonts.mono, fontSize: '0.74rem', letterSpacing: '0.04em', color: colors.creamDim }}>No card required.</span>
              </div>
            </div>
            <Reveal>
              <div style={{ ...phStyle, aspectRatio: '16/9', width: '100%', boxShadow: '0 30px 70px rgba(0,0,0,0.45)' }}>
                <svg style={{ width: 60, height: 60, color: colors.teal }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M10 8.3l6 3.7-6 3.7z" fill="currentColor" stroke="none" /></svg>
                <span style={{ fontFamily: fonts.mono, fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: colors.teal }}>Video</span>
                <span style={{ fontFamily: fonts.mono, fontSize: '0.6rem', letterSpacing: '0.12em', color: colors.creamDim, opacity: 0.75 }}>Hero demo goes here</span>
              </div>
            </Reveal>
          </div>
        </div>
      </header>

      {/* PAIN */}
      <section style={{ background: brandwash, color: colors.ink, padding: '92px 0' }}>
        <div style={wrapStyle}>
          <span style={{ ...labelStyle, color: colors.tealDeep }}>Does this sound like you?</span>
          <h2 style={{ ...displayStyle, fontSize: mobile ? '2.2rem' : 'clamp(2.2rem,5vw,3.4rem)', margin: '14px 0 40px', maxWidth: 720 }}>
            You run a gym. You&apos;re busy. You&apos;re tired.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 16 }}>
            {painPoints.map((text, i) => (
              <Reveal key={i} style={{
                display: 'flex',
                gap: 14,
                alignItems: 'flex-start',
                background: 'rgba(255,255,255,0.66)',
                border: '1px solid rgba(11,22,40,0.08)',
                borderRadius: 16,
                padding: '22px 24px',
                fontSize: '1.12rem',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 12px 30px rgba(11,22,40,0.06)',
              }}>
                <span style={{ flex: '0 0 auto', width: 26, height: 26, borderRadius: '50%', background: colors.navy, color: colors.mint, display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: '0.95rem', marginTop: 2 }}>✕</span>
                <span>{text}</span>
              </Reveal>
            ))}
          </div>
          <p style={{ marginTop: 34, fontSize: '1.25rem', fontWeight: 500 }}>
            If you nodded at even one of these, <span style={{ color: colors.tealDeep, fontWeight: 700 }}>Milton was built for you.</span>
          </p>
        </div>
      </section>

      {/* HOW */}
      <section style={{ padding: '96px 0 90px', background: colors.navy }}>
        <div style={wrapStyle}>
          <span style={labelStyle}>Here&apos;s how Milton helps</span>
          <h2 style={{ ...displayStyle, fontSize: mobile ? '2.3rem' : 'clamp(2.3rem,5.2vw,3.6rem)', margin: '14px 0 14px' }}>
            One app. You just talk to it.
          </h2>
          <p style={{ color: colors.creamDim, maxWidth: 620, marginBottom: 52, fontSize: '1.15rem' }}>
            No new system to learn. No clicking around. You tell Milton what you need, and it gets to work.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 22 }}>
            {cards.map((card, i) => (
              <Reveal key={i} style={{
                background: colors.navySoft,
                border: '1px solid rgba(43,191,170,0.22)',
                borderRadius: 20,
                padding: '34px 32px',
                transition: 'transform 0.2s ease, border-color 0.2s ease',
              }}>
                <div style={{ ...phStyle, aspectRatio: '16/10', width: '100%', marginBottom: 20 }}>
                  <svg style={{ width: 42, height: 42, color: colors.teal }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.6" /><path d="M21 15l-5-5L5 21" /></svg>
                  <span style={{ fontFamily: fonts.mono, fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: colors.teal }}>Image</span>
                </div>
                <span style={{ fontFamily: fonts.mono, fontSize: '0.75rem', letterSpacing: '0.18em', color: colors.teal }}>{card.num}</span>
                <h3 style={{ fontFamily: fonts.display, fontWeight: 800, fontStretch: '125%', fontSize: '1.7rem', margin: '12px 0 12px', lineHeight: 1.02, letterSpacing: '-0.005em' }}>{card.title}</h3>
                <p style={{ color: colors.creamDim, fontSize: '1.08rem' }}>{card.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STILL THE COACH */}
      <section style={{
        padding: '108px 0',
        textAlign: 'center',
        background: brandwash,
        color: colors.ink,
        borderTop: '1px solid rgba(11,22,40,0.08)',
        borderBottom: '1px solid rgba(11,22,40,0.08)',
      }}>
        <div style={{ ...wrapStyle, maxWidth: 760 }}>
          <Reveal><span style={{ ...labelStyle, color: colors.tealDeep }}>You&apos;re still the coach</span></Reveal>
          <Reveal><h2 style={{ ...displayStyle, fontSize: mobile ? '2.3rem' : 'clamp(2.3rem,5.4vw,3.6rem)', margin: '18px auto 22px', maxWidth: 680 }}>
            Milton helps you. It does <em style={{ fontStyle: 'normal', color: colors.tealDeep }}>not</em> replace you.
          </h2></Reveal>
          <Reveal><p style={{ fontSize: '1.22rem', color: colors.inkSoft, maxWidth: 620, margin: '0 auto' }}>
            You are the boss. Milton never sends anything until you say so. We believe the best coaching is still human. <b style={{ color: colors.ink, fontWeight: 500 }}>Milton just hands you back the time to do it.</b>
          </p></Reveal>
        </div>
      </section>

      {/* GROUP */}
      <section style={{
        padding: '90px 0',
        color: colors.cream,
        background: `radial-gradient(720px 400px at 88% 6%, rgba(43,191,170,0.15), transparent 60%), ${colors.navy}`,
      }}>
        <div style={wrapStyle}>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1.1fr 0.9fr', gap: 48, alignItems: 'center' }}>
            <div>
              <span style={labelStyle}>Big classes, personal feel</span>
              <h2 style={{ ...displayStyle, fontSize: mobile ? '2.1rem' : 'clamp(2.1rem,4.8vw,3.2rem)', margin: '14px 0 18px', maxWidth: 520 }}>
                Group fitness with a personal touch.
              </h2>
              <p style={{ fontSize: '1.18rem', color: colors.creamDim }}>
                Run a class with 20 people? Milton helps every single one feel like they get one-on-one care. It remembers their goals, their progress, and their wins. Happy members stay longer and bring their friends.
              </p>
            </div>
            <Reveal>
              <div style={{ ...phStyle, aspectRatio: '16/9', width: '100%', boxShadow: '0 26px 60px rgba(0,0,0,0.4)' }}>
                <svg style={{ width: 48, height: 48, color: colors.teal }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none" /><path d="M21 15l-5-5L5 21" /></svg>
                <span style={{ fontFamily: fonts.mono, fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: colors.teal }}>Image</span>
                <span style={{ fontFamily: fonts.mono, fontSize: '0.6rem', letterSpacing: '0.12em', color: colors.creamDim, opacity: 0.75 }}>Group session image goes here</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* RISK */}
      <section style={{ padding: '88px 0', background: brandwash, color: colors.ink }}>
        <div style={wrapStyle}>
          <span style={{ ...labelStyle, color: colors.tealDeep, display: 'block', textAlign: 'center' }}>Try it with zero risk</span>
          <h2 style={{ ...displayStyle, fontSize: mobile ? '2rem' : 'clamp(2rem,4.6vw,3rem)', margin: '14px 0 44px', textAlign: 'center' }}>
            Easy to start. Easy to <em style={{ fontStyle: 'normal', color: colors.tealDeep }}>stop.</em>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: 20 }}>
            {riskCards.map((card, i) => (
              <Reveal key={i} style={{
                textAlign: 'center',
                border: '1px solid rgba(11,22,40,0.10)',
                borderRadius: 18,
                padding: '34px 24px',
                background: 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 12px 30px rgba(11,22,40,0.06)',
              }}>
                <div style={{ fontFamily: fonts.display, fontWeight: 900, fontStretch: '125%', fontSize: '2.8rem', color: colors.tealDeep, lineHeight: 1, marginBottom: 10 }}>{card.big}</div>
                <p style={{ color: colors.inkSoft, fontSize: '1.05rem' }}>{card.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="book" style={{
        padding: '110px 0 120px',
        textAlign: 'center',
        background: `radial-gradient(700px 380px at 50% 0%, rgba(43,191,170,0.22), transparent 62%), ${colors.navy}`,
      }}>
        <div style={wrapStyle}>
          <span style={labelStyle}>Let&apos;s talk</span>
          <h2 style={{ ...displayStyle, fontSize: mobile ? '2.8rem' : 'clamp(2.8rem,7vw,5rem)', margin: '16px 0 22px' }}>
            See Milton work in <em style={{ fontStyle: 'normal', color: colors.mint }}>30 minutes.</em>
          </h2>
          <p style={{ fontSize: '1.25rem', color: colors.creamDim, maxWidth: 560, margin: '0 auto 40px' }}>
            Hop on a quick call. We&apos;ll show you exactly how Milton fits your gym, your trainers, and the way you already coach.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <a href="https://coach.getmilton.com/auth" style={btnStyle} onMouseEnter={e => { e.target.style.transform = 'translateY(-3px)'; e.target.style.background = colors.teal; e.target.style.borderColor = colors.teal; e.target.style.boxShadow = '0 16px 40px rgba(43,191,170,0.32)'; }} onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.background = colors.mint; e.target.style.borderColor = colors.mint; e.target.style.boxShadow = '0 10px 30px rgba(154,241,152,0.18)'; }}>
              Try 7 Days Free
            </a>
            <button onClick={() => setShowCalendly(true)} style={{ ...btnStyle, background: 'transparent', borderColor: colors.cream, color: colors.cream, boxShadow: 'none', cursor: 'pointer' }} onMouseEnter={e => { e.target.style.transform = 'translateY(-3px)'; e.target.style.background = 'rgba(255,255,255,0.1)'; }} onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.background = 'transparent'; }}>
              Book a free call
            </button>
          </div>
          <p style={{ fontFamily: fonts.mono, fontSize: '0.74rem', letterSpacing: '0.06em', color: colors.creamDim, marginTop: 22 }}>
            No card required.
          </p>
        </div>
      </section>

      <Footer />

      {/* Calendly Modal */}
      {showCalendly && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(11, 22, 40, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
          onClick={() => setShowCalendly(false)}
        >
          <div 
            style={{
              background: colors.cream,
              borderRadius: 20,
              width: '100%',
              maxWidth: 600,
              maxHeight: '90vh',
              overflow: 'hidden',
              position: 'relative',
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowCalendly(false)}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: 'none',
                background: colors.navy,
                color: colors.cream,
                fontSize: 20,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
              }}
            >
              ×
            </button>
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/miguel-johns/milton-demo?hide_gdpr_banner=1&primary_color=00987c" 
              style={{ minWidth: 320, height: 700 }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
