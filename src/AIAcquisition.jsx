import { useState, useEffect } from "react";

function useBreakpoint() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return { mobile: w < 640, tablet: w >= 640 && w < 1024, desktop: w >= 1024 };
}

const f = "'DM Sans', sans-serif";
const serif = "'Instrument Serif', serif";
const teal = "#0d9aa5";
const mint = "#9af198";

function Accent({ children }) {
  return <em style={{ fontStyle: "italic", color: mint }}>{children}</em>;
}

function ResponsiveImage({ desktopSrc, mobileSrc, alt, mobile }) {
  return (
    <div style={{
      width: "100%",
      borderRadius: mobile ? 16 : 20,
      overflow: "hidden",
      marginTop: 32,
    }}>
      <img
        src={mobile ? mobileSrc : desktopSrc}
        alt={alt}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
      />
    </div>
  );
}

function CTAButton({ mobile }) {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent('openConsultationModal'))}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: f,
        fontSize: mobile ? 13 : 14,
        fontWeight: 600,
        color: "#061c27",
        background: mint,
        border: "none",
        borderRadius: 100,
        padding: mobile ? "12px 24px" : "14px 28px",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = "#b8f5b6";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = mint;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      AI Consultation
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </button>
  );
}

function IllustratedFeatureCard({ icon, title, body, mobile }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: mobile ? 16 : 20,
      padding: mobile ? 24 : 32,
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }}>
      <div style={{
        width: mobile ? 56 : 64,
        height: mobile ? 56 : 64,
        borderRadius: 16,
        background: "rgba(13,154,165,0.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: mobile ? 20 : 24,
      }}>
        {icon}
      </div>
      <h4 style={{
        fontFamily: f,
        fontSize: mobile ? 17 : 20,
        fontWeight: 600,
        color: "#fff",
        margin: "0 0 12px 0",
        lineHeight: 1.3,
      }}>{title}</h4>
      <p style={{
        fontFamily: f,
        fontSize: mobile ? 14 : 15,
        lineHeight: 1.7,
        color: "rgba(255,255,255,0.55)",
        margin: 0,
        flex: 1,
      }}>{body}</p>
    </div>
  );
}

export default function AIAcquisition() {
  const { mobile, tablet } = useBreakpoint();
  const px = mobile ? 20 : tablet ? 32 : 40;
  const sectionPad = mobile ? "56px 0" : "80px 0";

  const milestoneCards = [
    { 
      title: "Strength milestones", 
      body: "New PRs, progressive overload achievements, key lift records.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6.5 6.5h11v11h-11z" />
          <path d="M6.5 11h-4v2h4" />
          <path d="M17.5 11h4v2h-4" />
          <path d="M11 6.5v-4h2v4" />
          <path d="M11 17.5v4h2v-4" />
        </svg>
      )
    },
    { 
      title: "Consistency streaks", 
      body: "Four weeks straight, 50 sessions logged, never missed a Monday.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4" />
          <path d="M12 18v4" />
          <path d="M4.93 4.93l2.83 2.83" />
          <path d="M16.24 16.24l2.83 2.83" />
          <path d="M2 12h4" />
          <path d="M18 12h4" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      )
    },
    { 
      title: "Nutrition wins", 
      body: "Protein targets hit, meal logging streaks, consistency improvements.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
          <path d="M12 2a10 10 0 0 1 10 10" />
          <path d="M12 12l7-7" />
        </svg>
      )
    },
    { 
      title: "Body composition", 
      body: "Body fat down, lean mass up, measurements shifting month over month.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20" />
          <path d="M2 12h20" />
          <path d="M4 4l4 4" />
          <path d="M4 20l4-4" />
          <path d="M20 4l-4 4" />
          <path d="M20 20l-4-4" />
        </svg>
      )
    },
    { 
      title: "Challenge completions", 
      body: "28-day nutrition challenge finished, training program completed.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.11" />
          <circle cx="12" cy="8" r="7" />
          <path d="M9 8l2 2 4-4" />
        </svg>
      )
    },
    { 
      title: "Anniversary markers", 
      body: "Six months as a member, 100th session, one year of training.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <path d="M12 14l2 2 4-4" />
        </svg>
      )
    },
  ];

  return (
    <>
      <div style={{
        background: "#061c27",
        minHeight: "100vh",
        paddingLeft: px,
        paddingRight: px,
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* ═══════ HERO ═══════ */}
        <section style={{
          minHeight: mobile ? "auto" : "50vh",
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: mobile ? "120px 0 48px" : "140px 0 64px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: teal, flexShrink: 0 }} />
            <span style={{ fontFamily: f, fontSize: 12, fontWeight: 500, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>AI Acquisition Engine</span>
          </div>

          <h1 style={{
            fontFamily: serif,
            fontSize: mobile ? 36 : tablet ? 52 : 64,
            fontWeight: 400, lineHeight: 1.08, color: "#fff",
            margin: "0 0 28px 0",
          }}>
            Turn every win into your <Accent>next member</Accent>
          </h1>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 20, lineHeight: 1.7,
            color: "rgba(255,255,255,0.6)", maxWidth: 720, margin: "0 0 24px 0",
          }}>
            Your best marketing doesn&apos;t come from ads. It comes from a member posting their progress and their friend asking, &quot;Where do you train?&quot; That moment — a real result, shared by someone trusted — is worth more than any campaign you&apos;ll run.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.7,
            color: "rgba(255,255,255,0.55)", maxWidth: 720, margin: "0 0 40px 0",
          }}>
            The problem is it almost never happens. Not because members aren&apos;t making progress. They are. But nobody&apos;s packaging it into something shareable. Milton does.
          </p>

          <ResponsiveImage 
            desktopSrc="/images/acquisition-hero-desktop.png"
            mobileSrc="/images/acquisition-hero-mobile.png"
            alt="Client transformation summary with share options - Instagram, Facebook, Messages, Email"
            mobile={mobile}
          />

          <div style={{ marginTop: 40 }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ EVERY MILESTONE ═══════ */}
        <section style={{ padding: sectionPad, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : 40,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Every milestone, made visible — <Accent>automatically</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: "0 0 20px 0",
          }}>
            Most members don&apos;t realize how much progress they&apos;re making. A 10lb PR. A four-week training streak. Hitting protein targets 25 out of 30 days. These things happen quietly, buried in data nobody ever surfaces.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: "0 0 20px 0",
          }}>
            Milton surfaces all of it. The AI Acquisition Engine monitors progress across workouts, nutrition, body composition, consistency, and milestones — and automatically generates a branded visual card when something worth celebrating happens.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: "0 0 20px 0",
          }}>
            A member finishes their session and gets a notification: &quot;You just hit a new squat PR — 185lbs. That&apos;s a 40lb increase since you started.&quot; A clean, branded graphic with their name, the milestone, and your facility&apos;s logo. They didn&apos;t ask for it. It just appeared.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 18, lineHeight: 1.75,
            color: mint, fontWeight: 500, margin: 0,
          }}>
            One tap to share. Instagram, a text, a story, a family group chat. Your brand travels with it every time.
          </p>

          <ResponsiveImage 
            desktopSrc="/images/acquisition-milestones-desktop.png"
            mobileSrc="/images/acquisition-milestones-mobile.png"
            alt="Milestone types - New PR, Streak, Nutrition, Body comp, Challenge, 1 Year"
            mobile={mobile}
          />
        </section>

        {/* ═══════ MILESTONE TYPES ═══════ */}
        <section style={{ padding: sectionPad, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : 40,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Milestone types that <Accent>drive shares</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: "0 0 32px 0",
          }}>
            Milton generates progress cards across every dimension of the member journey — not just big transformations, but the small wins that keep people motivated.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)",
            gap: mobile ? 16 : 24,
          }}>
            {milestoneCards.map((card, i) => (
              <IllustratedFeatureCard 
                key={i} 
                icon={card.icon}
                title={card.title} 
                body={card.body} 
                mobile={mobile} 
              />
            ))}
          </div>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 18, lineHeight: 1.75,
            color: mint, fontWeight: 500, margin: "40px 0 0 0", textAlign: "center",
          }}>
            Each one gets a branded visual. Each one is shareable. Each one puts your facility in front of new eyes.
          </p>
        </section>

        {/* ═══════ EVERY SHARE IS A REFERRAL ═══════ */}
        <section style={{ padding: sectionPad, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : 40,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Every share is a referral — <Accent>handled</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: "0 0 20px 0",
          }}>
            When someone posts a progress card, their network notices. &quot;What app is that?&quot; &quot;Where do you work out?&quot; Every one of those conversations is a warm referral — and it started because Milton made sharing effortless.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: "0 0 20px 0",
          }}>
            Embedded in every card is a path back to your facility: a link to book an intro session or a referral landing page. The member shares their win. Their friend taps. Now they&apos;re on your calendar.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 18, lineHeight: 1.75,
            color: mint, fontWeight: 500, margin: 0,
          }}>
            No referral program to manage. No tracking spreadsheets. The results do the talking. Milton just makes sure they get heard.
          </p>

          <ResponsiveImage 
            desktopSrc="/images/acquisition-referral-desktop.png"
            mobileSrc="/images/acquisition-referral-mobile.png"
            alt="Share to referral flow - Progress card shared to Instagram, friend books intro session"
            mobile={mobile}
          />
        </section>

        {/* ═══════ CLOSING CTA ═══════ */}
        <section style={{
          padding: sectionPad,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          textAlign: "center",
        }}>
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 26 : 36,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 16px 0",
          }}>
            Ready to turn wins into members?
          </h2>
          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.7,
            color: "rgba(255,255,255,0.6)", maxWidth: 540, margin: "0 auto 28px auto",
          }}>
            Book an AI Consultation and see how the AI Acquisition Engine can transform your members&apos; results into your strongest marketing channel.
          </p>
          <CTAButton mobile={mobile} />
        </section>

        </div>
      </div>
    </>
  );
}
