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

  const denials = [
    'Milton is not another dashboard your team has to learn.',
    'It is not another system you have to manage.',
    'It is not another tool that creates more work before it creates value.',
  ];

  const demoPoints = [
    'Make every member feel more personally coached',
    'Give coaches instant context on every client',
    'Create workouts, check-ins, reports, and follow-ups just by talking',
    'Support members through SMS and the app between sessions',
    'Launch challenges and new coaching offers without adding more work',
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
          {/* Text content - centered */}
          <div style={{ 
            maxWidth: 720, 
            margin: '0 auto',
            textAlign: 'center',
          }}>
            <div style={{ height: 20 }} />
            <h1 style={{ ...displayStyle, fontSize: mobile ? '2.6rem' : 'clamp(2.6rem,5.6vw,4.8rem)', margin: '22px 0 26px' }}>
              Technology has fallen short.<br /><em style={{ fontStyle: 'normal', color: colors.mint }}>So why would AI be any different?</em>
            </h1>
            <p style={{ fontSize: mobile ? '1.15rem' : 'clamp(1.15rem,2.4vw,1.5rem)', maxWidth: 620, margin: '0 auto 38px', color: colors.creamDim }}>
              You&apos;ve seen the AI tools promising to answer your phones, nurture your leads, and magically fix your business. Most of it is the same thing with a new label. <b style={{ color: colors.cream, fontWeight: 500 }}>Milton is different. You just talk to it.</b>
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
              <button onClick={() => setShowCalendly(true)} style={{ ...btnStyle, cursor: 'pointer' }} onMouseEnter={e => { e.target.style.transform = 'translateY(-3px)'; e.target.style.background = colors.teal; e.target.style.borderColor = colors.teal; e.target.style.boxShadow = '0 16px 40px rgba(43,191,170,0.32)'; }} onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.background = colors.mint; e.target.style.borderColor = colors.mint; e.target.style.boxShadow = '0 10px 30px rgba(154,241,152,0.18)'; }}>
                Book a free call
              </button>
            </div>
          </div>

          {/* Hero video - large, below content */}
          <Reveal>
            <div style={{
              position: 'relative',
              paddingBottom: '56.25%',
              height: 0,
              width: '100%',
              maxWidth: mobile ? 400 : 900,
              margin: mobile ? '48px auto 0' : '64px auto 0',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 30px 70px rgba(0,0,0,.45)',
            }}>
              <iframe
                src="https://www.loom.com/embed/a22f3d9f0648454e95100e7cc762ac07?autoplay=1&hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true"
                frameBorder="0"
                webkitallowfullscreen="true"
                mozallowfullscreen="true"
                allowFullScreen
                allow="autoplay"
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
      </header>

      {/* MILTON IS DIFFERENT */}
      <section style={{ background: brandwash, color: colors.ink, padding: '92px 0' }}>
        <div style={{ ...wrapStyle, maxWidth: 820 }}>
          <span style={{ ...labelStyle, color: colors.tealDeep }}>Milton is different</span>
          <h2 style={{ ...displayStyle, fontSize: mobile ? '2.2rem' : 'clamp(2.2rem,5vw,3.4rem)', margin: '14px 0 26px', maxWidth: 720 }}>
            Most of it feels like the same thing with a new label slapped on it.
          </h2>
          <p style={{ fontSize: '1.2rem', color: colors.inkSoft, maxWidth: 640, marginBottom: 40 }}>
            Another confusing, high-effort piece of software thrown in your face. Milton isn&apos;t that.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 14 }}>
            {denials.map((text, i) => (
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
          <p style={{ marginTop: 36, fontSize: '1.4rem', fontWeight: 500, maxWidth: 640 }}>
            Milton brings a completely new experience to your gym. <span style={{ color: colors.tealDeep, fontWeight: 700 }}>You just talk to it.</span>
          </p>
        </div>
      </section>

      {/* SEE MILTON IN ACTION */}
      <section style={{ padding: '96px 0 90px', background: colors.navy }}>
        <div style={wrapStyle}>
          <span style={labelStyle}>See Milton in action</span>
          <h2 style={{ ...displayStyle, fontSize: mobile ? '2.3rem' : 'clamp(2.3rem,5.2vw,3.6rem)', margin: '14px 0 14px' }}>
            In the demo, you&apos;ll see how Milton helps gym owners:
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 14, marginTop: 44, maxWidth: 760 }}>
            {demoPoints.map((text, i) => (
              <Reveal key={i} style={{
                display: 'flex',
                gap: 16,
                alignItems: 'flex-start',
                background: colors.navySoft,
                border: '1px solid rgba(43,191,170,0.22)',
                borderRadius: 16,
                padding: '22px 24px',
                fontSize: '1.14rem',
              }}>
                <span style={{ flex: '0 0 auto', width: 28, height: 28, borderRadius: '50%', background: colors.mint, color: colors.navy, display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: '0.95rem', marginTop: 2 }}>✓</span>
                <span style={{ color: colors.cream }}>{text}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* NOT AI HYPE */}
      <section style={{
        padding: '108px 0',
        textAlign: 'center',
        background: brandwash,
        color: colors.ink,
        borderTop: '1px solid rgba(11,22,40,0.08)',
        borderBottom: '1px solid rgba(11,22,40,0.08)',
      }}>
        <div style={{ ...wrapStyle, maxWidth: 760 }}>
          <Reveal><span style={{ ...labelStyle, color: colors.tealDeep }}>This is not AI hype</span></Reveal>
          <Reveal><h2 style={{ ...displayStyle, fontSize: mobile ? '2.3rem' : 'clamp(2.3rem,5.4vw,3.6rem)', margin: '18px auto 22px', maxWidth: 680 }}>
            A practical way to create a <em style={{ fontStyle: 'normal', color: colors.tealDeep }}>better member experience.</em>
          </h2></Reveal>
          <Reveal><p style={{ fontSize: '1.22rem', color: colors.inkSoft, maxWidth: 620, margin: '0 auto' }}>
            Support your coaches and generate new revenue, <b style={{ color: colors.ink, fontWeight: 500 }}>without hiring more staff.</b>
          </p></Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="book" style={{
        padding: '110px 0 120px',
        textAlign: 'center',
        background: `radial-gradient(700px 380px at 50% 0%, rgba(43,191,170,0.22), transparent 62%), ${colors.navy}`,
      }}>
        <div style={wrapStyle}>
          <span style={labelStyle}>Want the demo?</span>
          <h2 style={{ ...displayStyle, fontSize: mobile ? '2.8rem' : 'clamp(2.8rem,7vw,5rem)', margin: '16px 0 22px' }}>
            Book a call and see <em style={{ fontStyle: 'normal', color: colors.mint }}>Milton in action.</em>
          </h2>
          <p style={{ fontSize: '1.25rem', color: colors.creamDim, maxWidth: 560, margin: '0 auto 40px' }}>
            See exactly how Milton fits your gym, your coaches, and the way you already work.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <button onClick={() => setShowCalendly(true)} style={btnStyle} onMouseEnter={e => { e.target.style.transform = 'translateY(-3px)'; e.target.style.background = colors.teal; e.target.style.borderColor = colors.teal; e.target.style.boxShadow = '0 16px 40px rgba(43,191,170,0.32)'; }} onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.background = colors.mint; e.target.style.borderColor = colors.mint; e.target.style.boxShadow = '0 10px 30px rgba(154,241,152,0.18)'; }}>
              Book a call
            </button>
          </div>
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
