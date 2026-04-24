import { useState, useEffect } from "react";

function useBreakpoint() {
  const [state, setState] = useState({ mobile: false, tablet: false, desktop: true });
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setState({ mobile: w < 768, tablet: w >= 768 && w < 1024, desktop: w >= 1024 });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return state;
}

// Design tokens
const colors = {
  darkNavy: "#0B1628",
  mintMist: "#e8f5f3",
  lightMint: "#f8faf7",
  teal: "#0d9aa5",
  mutedWhite: "rgba(255,255,255,0.75)",
  cream: "rgba(255,252,245,0.9)",
};

const fonts = {
  heading: "'Cormorant Garamond', serif",
  body: "'DM Sans', sans-serif",
};

// CTA Button Component
function CTA({ children, variant = "primary", style = {}, href, onClick, icon }) {
  const baseStyles = {
    fontFamily: fonts.body,
    fontSize: 15,
    fontWeight: 600,
    padding: "14px 32px",
    borderRadius: 100,
    cursor: "pointer",
    transition: "all 0.25s ease",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    letterSpacing: 0.3,
    whiteSpace: "nowrap",
  };

  const variants = {
    primary: {
      ...baseStyles,
      background: colors.teal,
      color: "#fff",
      border: "none",
    },
    secondary: {
      ...baseStyles,
      background: "transparent",
      color: colors.teal,
      border: `2px solid ${colors.teal}`,
    },
    primaryDark: {
      ...baseStyles,
      background: colors.teal,
      color: "#fff",
      border: "none",
    },
    secondaryDark: {
      ...baseStyles,
      background: "transparent",
      color: colors.teal,
      border: `2px solid ${colors.teal}`,
    },
  };

  const finalStyles = { ...variants[variant], ...style };

  if (href) {
    return (
      <a href={href} style={finalStyles}>
        {icon}
        {children}
      </a>
    );
  }
  return (
    <button style={finalStyles} onClick={onClick}>
      {icon}
      {children}
    </button>
  );
}

// Play Icon
function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  );
}

// Video Access Form Modal
function VideoAccessModal({ isOpen, onClose, mobile }) {
  const [formData, setFormData] = useState({ name: "", email: "", company: "" });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the form data to your backend
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setFormData({ name: "", email: "", company: "" });
      // Redirect to video or show video
      window.location.href = "#/demo-video";
    }, 2000);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(11,22,40,0.9)",
        backdropFilter: "blur(8px)",
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: colors.darkNavy,
          border: "1px solid rgba(13,154,165,0.3)",
          borderRadius: 20,
          padding: mobile ? 28 : 40,
          maxWidth: 460,
          width: "100%",
          position: "relative",
          boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.6)" strokeWidth="2" fill="none">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {!submitted ? (
          <>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: `rgba(13,154,165,0.15)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill={colors.teal}>
                  <polygon points="8,5 19,12 8,19" />
                </svg>
              </div>
              <h3
                style={{
                  fontFamily: fonts.heading,
                  fontSize: 26,
                  fontWeight: 400,
                  color: "#fff",
                  marginBottom: 8,
                }}
              >
                Watch the Demo
              </h3>
              <p
                style={{
                  fontFamily: fonts.body,
                  fontSize: 15,
                  color: colors.mutedWhite,
                }}
              >
                Enter your details to get instant access to our product walkthrough.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 15,
                    padding: "14px 18px",
                    borderRadius: 10,
                    border: "1px solid rgba(13,154,165,0.25)",
                    background: "rgba(255,255,255,0.05)",
                    color: "#fff",
                    outline: "none",
                  }}
                />
                <input
                  type="email"
                  placeholder="Work email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 15,
                    padding: "14px 18px",
                    borderRadius: 10,
                    border: "1px solid rgba(13,154,165,0.25)",
                    background: "rgba(255,255,255,0.05)",
                    color: "#fff",
                    outline: "none",
                  }}
                />
                <input
                  type="text"
                  placeholder="Company name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 15,
                    padding: "14px 18px",
                    borderRadius: 10,
                    border: "1px solid rgba(13,154,165,0.25)",
                    background: "rgba(255,255,255,0.05)",
                    color: "#fff",
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 15,
                    fontWeight: 600,
                    padding: "16px 32px",
                    borderRadius: 100,
                    background: colors.teal,
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    marginTop: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                  Get Access
                </button>
              </div>
            </form>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: `rgba(13,154,165,0.2)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={colors.teal} strokeWidth="2">
                <polyline points="20,6 9,17 4,12" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: fonts.heading,
                fontSize: 24,
                fontWeight: 400,
                color: "#fff",
                marginBottom: 8,
              }}
            >
              You&apos;re in!
            </h3>
            <p style={{ fontFamily: fonts.body, fontSize: 15, color: colors.mutedWhite }}>
              Redirecting you to the demo...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Section 1 - Hero
function HeroSection({ mobile }) {
  const [showVideoForm, setShowVideoForm] = useState(false);

  return (
    <>
      <VideoAccessModal isOpen={showVideoForm} onClose={() => setShowVideoForm(false)} mobile={mobile} />
      <section
        style={{
          background: colors.darkNavy,
          padding: mobile ? "120px 20px 0" : "160px 40px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <h1
            style={{
              fontFamily: fonts.heading,
              fontSize: mobile ? 36 : 56,
              fontWeight: 400,
              color: "#fff",
              lineHeight: 1.15,
              marginBottom: 24,
              maxWidth: 900,
              margin: "0 auto 24px",
            }}
          >
            The <span style={{ fontWeight: 600 }}>FIRST</span> AI that makes it easier to{" "}
            <span style={{ color: colors.teal, fontStyle: "italic" }}>manage</span> your trainers.
          </h1>

          <p
            style={{
              fontFamily: fonts.body,
              fontSize: mobile ? 16 : 20,
              color: colors.mutedWhite,
              lineHeight: 1.5,
              maxWidth: 720,
              margin: "0 auto 32px",
              fontWeight: 400,
            }}
          >
            Milton is the operating system for personal training businesses. Your trainers get
            organized, communicate better, and coach like your best one — from day one.
          </p>

          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: mobile ? 40 : 60,
            }}
          >
            <CTA
              variant="primary"
              icon={<PlayIcon />}
              onClick={() => setShowVideoForm(true)}
            >
              Watch the demo
            </CTA>
            <CTA variant="secondary" href="#/book">
              Book a call
            </CTA>
          </div>

          {/* Hero Image - cut off at bottom */}
          <div
            style={{
              maxWidth: mobile ? 400 : 600,
              margin: "0 auto",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "100%",
                height: mobile ? 320 : 480,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <img
                src="/images/hero-dashboard.png"
                alt="Milton AI Coach Interface showing daily session overview and client recommendations"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  position: "relative",
                  top: 0,
                }}
              />
            </div>

            {/* Fade out at the bottom edge */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 100,
                background: `linear-gradient(180deg, transparent 0%, ${colors.darkNavy} 100%)`,
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}

// Section 2 - The Problem
function ProblemSection({ mobile }) {
  const pillars = [
    {
      title: "Organized.",
      description:
        "The best coaches spend hours outside sessions preparing for them. Most don't have the tools or the time.",
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={colors.teal} strokeWidth="1.5">
          <rect x="8" y="6" width="32" height="36" rx="3" />
          <line x1="14" y1="14" x2="34" y2="14" />
          <line x1="14" y1="22" x2="34" y2="22" />
          <line x1="14" y1="30" x2="26" y2="30" />
          <circle cx="36" cy="10" r="6" fill="none" stroke={colors.teal} />
          <line x1="36" y1="7" x2="36" y2="10" />
          <line x1="36" y1="10" x2="39" y2="10" />
        </svg>
      ),
    },
    {
      title: "Communicative.",
      description:
        "Schedule, follow up, sell, keep members engaged. Every hour spent here is an hour not coaching.",
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={colors.teal} strokeWidth="1.5">
          <rect x="8" y="10" width="24" height="18" rx="3" />
          <path d="M32 14h8v16a3 3 0 01-3 3H16" />
          <line x1="14" y1="16" x2="26" y2="16" />
          <line x1="14" y1="21" x2="22" y2="21" />
        </svg>
      ),
    },
    {
      title: "A real coach.",
      description:
        "Knowing where every client is on their journey, what to do today, and why. The best trainers do this instinctively. The rest need help.",
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={colors.teal} strokeWidth="1.5">
          <circle cx="24" cy="24" r="16" />
          <polygon points="24,12 26,22 24,20 22,22" fill={colors.teal} stroke="none" />
          <circle cx="24" cy="24" r="3" fill={colors.teal} />
        </svg>
      ),
    },
  ];

  return (
    <section
      style={{
        background: `linear-gradient(135deg, ${colors.lightMint} 0%, ${colors.mintMist} 100%)`,
        padding: mobile ? "60px 20px" : "100px 40px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: fonts.heading,
            fontSize: mobile ? 28 : 42,
            fontWeight: 400,
            color: colors.darkNavy,
            lineHeight: 1.2,
            marginBottom: 24,
            textAlign: "center",
            maxWidth: 800,
            margin: "0 auto 24px",
          }}
        >
          Good trainers are hard to find. Expensive to develop. Nearly impossible to keep.
        </h2>

        <p
          style={{
            fontFamily: fonts.body,
            fontSize: mobile ? 16 : 18,
            color: colors.darkNavy,
            lineHeight: 1.6,
            maxWidth: 800,
            margin: "0 auto 48px",
            textAlign: "center",
          }}
        >
          Every gym owner and fitness director has lived this. You invest months developing a
          trainer. They finally get consistent. They finally start delivering the quality that
          matches your brand. And then they leave. Or they plateau. Or they quietly stop doing the
          work that made them great in the first place.
        </p>

        <p
          style={{
            fontFamily: fonts.body,
            fontSize: mobile ? 15 : 17,
            color: colors.darkNavy,
            lineHeight: 1.6,
            textAlign: "center",
            marginBottom: 40,
          }}
        >
          Here&apos;s the thing almost nobody says out loud. Being a great trainer isn&apos;t one
          skill. It&apos;s three.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)",
            gap: 32,
            marginBottom: 48,
          }}
        >
          {pillars.map((pillar, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                padding: mobile ? "24px 16px" : "32px 24px",
              }}
            >
              <div
                style={{
                  width: 100,
                  height: 100,
                  margin: "0 auto 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(13,154,165,0.08)",
                  borderRadius: 20,
                }}
              >
                {pillar.icon}
              </div>
              <h3
                style={{
                  fontFamily: fonts.body,
                  fontSize: 20,
                  fontWeight: 700,
                  color: colors.darkNavy,
                  marginBottom: 12,
                }}
              >
                {pillar.title}
              </h3>
              <p
                style={{
                  fontFamily: fonts.body,
                  fontSize: 15,
                  color: "rgba(11,22,40,0.7)",
                  lineHeight: 1.5,
                }}
              >
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        <p
          style={{
            fontFamily: fonts.body,
            fontSize: mobile ? 16 : 18,
            fontStyle: "italic",
            color: "rgba(11,22,40,0.7)",
            textAlign: "center",
            maxWidth: 600,
            margin: "0 auto",
          }}
        >
          Three skills. Rare to find one trainer who&apos;s great at all three. Nearly impossible
          to find ten.
        </p>
      </div>
    </section>
  );
}

// Section 3 - How Milton Works
function HowItWorksSection({ mobile }) {
  const features = [
    {
      eyebrow: "ORGANIZE",
      headline: "The session is ready before the trainer is.",
      body: [
        "Every morning, every trainer opens Milton and sees their day. Every client. What happened last session. What's coming up. Milton has already prepped every session, pulled from your gym's Playbook, individualized to each client.",
        "In a semi-private session, Milton opens the control panel — four clients, four individualized workouts, all on one screen. The trainer sees what every client is doing in real time.",
        "And here's what that means on the floor: the trainer doesn't have to stop and update anything. They just tell Milton. \"Jess crushed her deadlifts, progress her hinge next session.\" Milton updates her profile. Next time Jess trains, her program reflects it.",
      ],
      closing: "Your trainers just got organized. Not because they're suddenly more disciplined. Because Milton does the work that discipline used to require.",
      imageAlt: "Milton Coach Canvas morning dashboard",
    },
    {
      eyebrow: "COMMUNICATE",
      headline: "Every client hears from their coach every week. Without fail.",
      body: [
        "Milton watches every client's engagement in real time.",
        "Session coming up tomorrow? Milton drafts a reminder in your gym's voice. Missed session? Milton drafts the follow-up the way you would write it. Great session? Milton prompts the trainer to send a quick note while the moment is still fresh.",
        "And every week, Milton drafts a personal check-in from the trainer to every active client. Not a blast. Not a template. A real message, tailored to where that client is right now. Every client hears from their coach every week, without fail.",
      ],
      closing: "Your trainers just became better communicators. Not because you trained them harder. Because Milton made it almost impossible to drop the ball.",
      imageAlt: "Milton drafting a client follow-up message",
    },
    {
      eyebrow: "COACH",
      headline: "Milton is in the session with them.",
      body: [
        "Coaching is knowing where every client is on their journey. Why they're here. What's working. What isn't. What they need next — and why. The best trainers do this instinctively after ten years. Your newer trainers don't.",
        "Milton sees every client's history, every session, every weight logged, every note. Milton shows the trainer, in plain language, what's working and what to do next. Backed by actual research.",
      ],
      closing: "Your trainers just got better at coaching. Not because you hired differently. Because Milton is in the session with them.",
      imageAlt: "Milton's Research-Backed Why progression panel",
    },
  ];

  return (
    <section
      style={{
        background: colors.darkNavy,
        padding: mobile ? "60px 20px" : "100px 40px",
        position: "relative",
      }}
    >
      {/* Mint mist accent at edges */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 100,
          background: `linear-gradient(180deg, rgba(232,245,243,0.05) 0%, transparent 100%)`,
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <p
          style={{
            fontFamily: fonts.body,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: colors.teal,
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          HOW MILTON WORKS
        </p>

        <h2
          style={{
            fontFamily: fonts.heading,
            fontSize: mobile ? 28 : 42,
            fontWeight: 400,
            color: "#fff",
            lineHeight: 1.2,
            textAlign: "center",
            maxWidth: 700,
            margin: "0 auto 64px",
          }}
        >
          Three things your trainers need to do well. Milton makes each one easier.
        </h2>

        {features.map((feature, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: mobile ? "column" : i % 2 === 0 ? "row" : "row-reverse",
              gap: mobile ? 32 : 64,
              alignItems: "center",
              marginBottom: i < features.length - 1 ? (mobile ? 64 : 100) : 0,
            }}
          >
            {/* Text */}
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontFamily: fonts.body,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: colors.teal,
                  marginBottom: 12,
                }}
              >
                {feature.eyebrow}
              </p>
              <h3
                style={{
                  fontFamily: fonts.heading,
                  fontSize: mobile ? 24 : 32,
                  fontWeight: 400,
                  color: "#fff",
                  lineHeight: 1.2,
                  marginBottom: 24,
                }}
              >
                {feature.headline}
              </h3>
              {feature.body.map((para, j) => (
                <p
                  key={j}
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 15,
                    color: colors.cream,
                    lineHeight: 1.6,
                    marginBottom: 16,
                  }}
                >
                  {para}
                </p>
              ))}
              <p
                style={{
                  fontFamily: fonts.body,
                  fontSize: 15,
                  fontStyle: "italic",
                  color: colors.teal,
                  lineHeight: 1.6,
                  marginTop: 8,
                }}
              >
                {feature.closing}
              </p>
            </div>

            {/* Image placeholder */}
            <div
              style={{
                flex: 1,
                aspectRatio: "4/3",
                borderRadius: 16,
                background: `linear-gradient(135deg, rgba(13,154,165,0.15), rgba(13,154,165,0.05))`,
                border: "1px solid rgba(13,154,165,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Glow effect */}
              <div
                style={{
                  position: "absolute",
                  inset: -20,
                  background: "radial-gradient(circle at center, rgba(13,154,165,0.2) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />
              <p
                style={{
                  fontFamily: fonts.body,
                  fontSize: 14,
                  color: "rgba(255,255,255,0.5)",
                  textAlign: "center",
                  padding: 20,
                }}
              >
                {/* Product screenshot: {feature.imageAlt} */}
                Product screenshot placeholder
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Section 4 - The Playbook
function PlaybookSection({ mobile }) {
  return (
    <section
      style={{
        background: `linear-gradient(135deg, ${colors.lightMint} 0%, ${colors.mintMist} 100%)`,
        padding: mobile ? "60px 20px" : "100px 40px",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          flexDirection: mobile ? "column" : "row",
          gap: mobile ? 40 : 64,
          alignItems: "center",
        }}
      >
        {/* Mobile-only header above image */}
        {mobile && (
          <div style={{ textAlign: "center", marginBottom: -20 }}>
            <p
              style={{
                fontFamily: fonts.body,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: colors.teal,
                marginBottom: 16,
              }}
            >
              THE PLAYBOOK
            </p>
            <h2
              style={{
                fontFamily: fonts.heading,
                fontSize: 28,
                fontWeight: 400,
                color: colors.darkNavy,
                lineHeight: 1.2,
              }}
            >
              Milton runs on your rules, not generic defaults.
            </h2>
          </div>
        )}

        {/* Image */}
        <div
          style={{
            flex: 1,
            aspectRatio: "4/3",
            borderRadius: 16,
            background: "#fff",
            border: "1px solid rgba(11,22,40,0.1)",
            boxShadow: "0 20px 40px rgba(11,22,40,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 14,
              color: "rgba(11,22,40,0.4)",
              textAlign: "center",
              padding: 20,
            }}
          >
            {/* Screenshot: Milton Playbook landing with chapter grid */}
            Product screenshot placeholder
          </p>
        </div>

        {/* Text */}
        <div style={{ flex: 1 }}>
          {/* Desktop-only header */}
          {!mobile && (
            <>
              <p
                style={{
                  fontFamily: fonts.body,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: colors.teal,
                  marginBottom: 16,
                }}
              >
                THE PLAYBOOK
              </p>
              <h2
                style={{
                  fontFamily: fonts.heading,
                  fontSize: 38,
                  fontWeight: 400,
                  color: colors.darkNavy,
                  lineHeight: 1.2,
                  marginBottom: 24,
                }}
              >
                Milton runs on your rules, not generic defaults.
              </h2>
            </>
          )}
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 16,
              color: colors.darkNavy,
              lineHeight: 1.6,
              marginBottom: 16,
            }}
          >
            Every gym has its own way of doing things. Its own programming philosophy. Its own
            communication style. Its own standards for what a session should feel like.
          </p>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 16,
              color: colors.darkNavy,
              lineHeight: 1.6,
              marginBottom: 16,
            }}
          >
            Most software forces you to work its way. Milton works yours.
          </p>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 16,
              color: colors.darkNavy,
              lineHeight: 1.6,
              marginBottom: 16,
            }}
          >
            Upload your existing programming documents. Your coaching standards. Your follow-up
            protocols. Milton reads them, learns them, and runs on them. Every workout it generates,
            every message it drafts, every suggestion it makes — shaped by what your business
            actually stands for.
          </p>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 16,
              fontStyle: "italic",
              color: "rgba(11,22,40,0.7)",
              lineHeight: 1.6,
            }}
          >
            We call it the Playbook. It&apos;s the difference between AI that sounds like anyone and
            AI that sounds like you.
          </p>
        </div>
      </div>
    </section>
  );
}

// Section 5 - Partnership
function PartnershipSection({ mobile }) {
  return (
    <section
      style={{
        background: colors.darkNavy,
        padding: mobile ? "60px 20px" : "100px 40px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <p
          style={{
            fontFamily: fonts.body,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: colors.teal,
            marginBottom: 16,
          }}
        >
          PARTNERSHIP
        </p>
        <h2
          style={{
            fontFamily: fonts.heading,
            fontSize: mobile ? 28 : 42,
            fontWeight: 400,
            color: "#fff",
            lineHeight: 1.2,
            marginBottom: 24,
          }}
        >
          Most software sells you a login and disappears. That&apos;s not what Milton is.
        </h2>
        <p
          style={{
            fontFamily: fonts.body,
            fontSize: mobile ? 16 : 18,
            color: colors.cream,
            lineHeight: 1.6,
          }}
        >
          Every month, we send you a full business review. How your trainers are performing. Where
          your clients are engaged. What&apos;s working. What needs attention. And we walk through
          it with you — not as a support call, as a partnership.
        </p>
        <p
          style={{
            fontFamily: fonts.body,
            fontSize: mobile ? 16 : 18,
            color: colors.cream,
            lineHeight: 1.6,
            marginTop: 16,
          }}
        >
          Because software alone doesn&apos;t change how a business runs. A partner does.
        </p>
      </div>
    </section>
  );
}

// Section 6 - Pricing
function PricingSection({ mobile }) {
  return (
    <section
      style={{
        background: `linear-gradient(135deg, ${colors.lightMint} 0%, ${colors.mintMist} 100%)`,
        padding: mobile ? "60px 20px" : "100px 40px",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <p
          style={{
            fontFamily: fonts.body,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: colors.teal,
            marginBottom: 16,
          }}
        >
          PRICING
        </p>
        <h2
          style={{
            fontFamily: fonts.heading,
            fontSize: mobile ? 28 : 42,
            fontWeight: 400,
            color: colors.darkNavy,
            lineHeight: 1.2,
            marginBottom: 48,
          }}
        >
          Simple, honest pricing. Try it free for 14 days.
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: mobile ? "column" : "row",
            gap: 24,
            justifyContent: "center",
            marginBottom: 32,
          }}
        >
          {/* Monthly Card */}
          <div
            style={{
              flex: mobile ? "none" : 1,
              maxWidth: 400,
              background: "#fff",
              borderRadius: 16,
              padding: mobile ? "32px 24px" : "40px 32px",
              boxShadow: "0 8px 24px rgba(11,22,40,0.08)",
              position: "relative",
            }}
          >
            <p
              style={{
                fontFamily: fonts.body,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(11,22,40,0.5)",
                marginBottom: 16,
              }}
            >
              Monthly
            </p>
            <div style={{ marginBottom: 8 }}>
              <span
                style={{
                  fontFamily: fonts.heading,
                  fontSize: mobile ? 48 : 56,
                  fontWeight: 400,
                  color: colors.darkNavy,
                }}
              >
                $499
              </span>
              <span
                style={{
                  fontFamily: fonts.body,
                  fontSize: 16,
                  color: "rgba(11,22,40,0.5)",
                  marginLeft: 8,
                }}
              >
                / month
              </span>
            </div>
            <p
              style={{
                fontFamily: fonts.body,
                fontSize: 14,
                color: "rgba(11,22,40,0.5)",
                marginBottom: 24,
              }}
            >
              Billed monthly. Cancel anytime.
            </p>
            <CTA
              variant="secondaryDark"
              href="#/book"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Start free trial
            </CTA>
          </div>

          {/* Annual Card */}
          <div
            style={{
              flex: mobile ? "none" : 1,
              maxWidth: 400,
              background: "#fff",
              borderRadius: 16,
              padding: mobile ? "32px 24px" : "40px 32px",
              boxShadow: "0 12px 32px rgba(11,22,40,0.12)",
              position: "relative",
              border: `2px solid ${colors.teal}`,
            }}
          >
            {/* Best value badge */}
            <div
              style={{
                position: "absolute",
                top: -12,
                right: 24,
                background: colors.teal,
                color: "#fff",
                fontFamily: fonts.body,
                fontSize: 12,
                fontWeight: 600,
                padding: "6px 14px",
                borderRadius: 100,
              }}
            >
              Best value
            </div>

            <p
              style={{
                fontFamily: fonts.body,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(11,22,40,0.5)",
                marginBottom: 16,
              }}
            >
              Annual
            </p>
            <div style={{ marginBottom: 8 }}>
              <span
                style={{
                  fontFamily: fonts.heading,
                  fontSize: mobile ? 48 : 56,
                  fontWeight: 400,
                  color: colors.darkNavy,
                }}
              >
                $4,800
              </span>
              <span
                style={{
                  fontFamily: fonts.body,
                  fontSize: 16,
                  color: "rgba(11,22,40,0.5)",
                  marginLeft: 8,
                }}
              >
                / year
              </span>
            </div>
            <p
              style={{
                fontFamily: fonts.body,
                fontSize: 14,
                color: "rgba(11,22,40,0.5)",
                marginBottom: 24,
              }}
            >
              That&apos;s $400/month, billed once.
            </p>
            <CTA
              variant="primaryDark"
              href="#/book"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Start free trial
            </CTA>
          </div>
        </div>

        <p
          style={{
            fontFamily: fonts.body,
            fontSize: 15,
            color: "rgba(11,22,40,0.6)",
            lineHeight: 1.6,
            maxWidth: 720,
            margin: "0 auto",
          }}
        >
          Both tiers include everything: full platform access for unlimited trainers and clients,
          the Playbook, monthly business reviews, and onboarding support. If Milton isn&apos;t
          changing how your business runs in fourteen days, you don&apos;t pay us a dollar.
        </p>
      </div>
    </section>
  );
}

// Section 7 - Questions
function QuestionsSection({ mobile }) {
  const questions = [
    {
      q: "Is this going to replace my existing tools, or just add another one?",
      a: "Milton replaces your programming software, your communication tools, and the spreadsheets your trainers live in. One system. One place. Your trainers open Milton in the morning and everything they need to coach is there.",
    },
    {
      q: "How is this different from just using ChatGPT?",
      a: "ChatGPT doesn't know your gym, your trainers, your clients, or your standards. Milton does. Milton runs on your Playbook — the rules your business operates on — and every output is shaped by what your business actually stands for.",
    },
    {
      q: "Will my trainers actually use it?",
      a: "Within a week, they won't know how they worked without it.",
    },
  ];

  return (
    <section
      style={{
        background: colors.darkNavy,
        padding: mobile ? "60px 20px" : "100px 40px",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
        <p
          style={{
            fontFamily: fonts.body,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: colors.teal,
            marginBottom: 16,
          }}
        >
          QUESTIONS
        </p>
        <h2
          style={{
            fontFamily: fonts.heading,
            fontSize: mobile ? 28 : 42,
            fontWeight: 400,
            color: "#fff",
            lineHeight: 1.2,
            marginBottom: 48,
          }}
        >
          Questions you&apos;re probably asking.
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {questions.map((item, i) => (
            <div key={i} style={{ textAlign: "left" }}>
              <p
                style={{
                  fontFamily: fonts.body,
                  fontSize: 18,
                  fontWeight: 700,
                  color: colors.teal,
                  marginBottom: 8,
                }}
              >
                {item.q}
              </p>
              <p
                style={{
                  fontFamily: fonts.body,
                  fontSize: 16,
                  color: colors.cream,
                  lineHeight: 1.6,
                }}
              >
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Section 8 - Case Studies
function CaseStudiesSection({ mobile }) {
  const caseStudies = [
    {
      name: "Optimal Performance",
      location: "Wichita, KS",
      quote: "[Bethany's authentic quote to be captured in interview]",
      description:
        "How Bethany uses Milton to deliver consistent coaching across her team, streamline session prep, and give every client the Optimal Performance experience from day one.",
    },
    {
      name: "Johnny O",
      location: "[City, State]",
      quote: "[Johnny's authentic quote to be captured in interview]",
      description:
        "How Johnny uses Milton to personalize per-client programming, scale semi-private, and keep trainers on system.",
    },
  ];

  return (
    <section
      style={{
        background: `linear-gradient(135deg, ${colors.lightMint} 0%, ${colors.mintMist} 100%)`,
        padding: mobile ? "60px 20px" : "100px 40px",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <p
          style={{
            fontFamily: fonts.body,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: colors.teal,
            marginBottom: 16,
          }}
        >
          CASE STUDIES
        </p>
        <h2
          style={{
            fontFamily: fonts.heading,
            fontSize: mobile ? 28 : 42,
            fontWeight: 400,
            color: colors.darkNavy,
            lineHeight: 1.2,
            marginBottom: 12,
          }}
        >
          How our partners use Milton.
        </h2>
        <p
          style={{
            fontFamily: fonts.body,
            fontSize: 16,
            color: "rgba(11,22,40,0.6)",
            marginBottom: 48,
          }}
        >
          Real gyms. Real trainers. Real results.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)",
            gap: 32,
          }}
        >
          {caseStudies.map((study, i) => (
            <a
              key={i}
              href="#/case-study/optimal-performance"
              style={{ textDecoration: "none", display: "block" }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 8px 24px rgba(11,22,40,0.08)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 16px 40px rgba(11,22,40,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(11,22,40,0.08)";
                }}
              >
                {/* Image placeholder */}
                <div
                  style={{
                    aspectRatio: "4/3",
                    background: `linear-gradient(135deg, rgba(13,154,165,0.1), rgba(13,154,165,0.05))`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p
                    style={{
                      fontFamily: fonts.body,
                      fontSize: 14,
                      color: "rgba(11,22,40,0.4)",
                    }}
                  >
                    Case study image placeholder
                  </p>
                </div>

                {/* Content */}
                <div style={{ padding: 24, textAlign: "left" }}>
                  <p
                    style={{
                      fontFamily: fonts.body,
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: colors.teal,
                      marginBottom: 8,
                    }}
                  >
                    CASE STUDY
                  </p>
                  <p
                    style={{
                      fontFamily: fonts.body,
                      fontSize: 18,
                      fontWeight: 700,
                      color: colors.darkNavy,
                      marginBottom: 8,
                    }}
                  >
                    {study.name} · {study.location}
                  </p>
                  <p
                    style={{
                      fontFamily: fonts.heading,
                      fontSize: 20,
                      fontStyle: "italic",
                      color: colors.darkNavy,
                      lineHeight: 1.4,
                      marginBottom: 12,
                    }}
                  >
                    &quot;{study.quote}&quot;
                  </p>
                  <p
                    style={{
                      fontFamily: fonts.body,
                      fontSize: 14,
                      color: "rgba(11,22,40,0.6)",
                      lineHeight: 1.5,
                      marginBottom: 16,
                    }}
                  >
                    {study.description}
                  </p>
                  <p
                    style={{
                      fontFamily: fonts.body,
                      fontSize: 14,
                      fontWeight: 700,
                      color: colors.teal,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    Read their story
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        <a
          href="#/insights"
          style={{
            fontFamily: fonts.body,
            fontSize: 15,
            fontWeight: 600,
            color: colors.teal,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            marginTop: 40,
          }}
        >
          More partner stories
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}

// Section 9 - The Close
function CloseSection({ mobile }) {
  return (
    <section
      style={{
        background: colors.darkNavy,
        padding: mobile ? "80px 20px" : "120px 40px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: fonts.heading,
            fontSize: mobile ? 32 : 48,
            fontWeight: 400,
            color: "#fff",
            lineHeight: 1.2,
            marginBottom: 24,
          }}
        >
          Your trainers are about to get the help they&apos;ve needed.
        </h2>
        <p
          style={{
            fontFamily: fonts.body,
            fontSize: mobile ? 16 : 18,
            color: colors.cream,
            lineHeight: 1.6,
            marginBottom: 40,
          }}
        >
          Your clients are going to see the difference. Your trainers are going to wonder how they
          ever worked without it. And you&apos;re going to wish you&apos;d started sooner.
        </p>

        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 24,
          }}
        >
          <CTA variant="primary" href="#/book">
            Start your free trial
          </CTA>
          <CTA variant="secondary" href="#/book">
            Book a call
          </CTA>
        </div>

        <p
          style={{
            fontFamily: fonts.body,
            fontSize: 13,
            color: "rgba(255,255,255,0.4)",
          }}
        >
          14 days free. No credit card required. Cancel anytime.
        </p>
      </div>
    </section>
  );
}

// Main Component
export default function NewHomepage() {
  const { mobile } = useBreakpoint();

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <HeroSection mobile={mobile} />
      <ProblemSection mobile={mobile} />
      <HowItWorksSection mobile={mobile} />
      <PlaybookSection mobile={mobile} />
      <PartnershipSection mobile={mobile} />
      <PricingSection mobile={mobile} />
      <QuestionsSection mobile={mobile} />
      <CaseStudiesSection mobile={mobile} />
      <CloseSection mobile={mobile} />
    </div>
  );
}
