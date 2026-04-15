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
  return <span style={{ color: teal, fontStyle: "italic" }}>{children}</span>;
}

function SectionDivider() {
  return <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "0 0 48px 0" }} />;
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

function CTAButton({ mobile, text = "Book Your AI Consultation" }) {
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
      {text}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </button>
  );
}

function WalkawayItem({ title, body, mobile }) {
  return (
    <div style={{
      background: "rgba(13,154,165,0.06)",
      border: "1px solid rgba(13,154,165,0.15)",
      borderRadius: 12,
      padding: mobile ? 24 : 28,
    }}>
      <h4 style={{
        fontFamily: serif,
        fontSize: mobile ? 20 : 22,
        fontWeight: 400,
        color: "#fff",
        margin: "0 0 12px 0",
      }}>{title}</h4>
      <p style={{
        fontFamily: f,
        fontSize: mobile ? 14 : 15,
        lineHeight: 1.7,
        color: "rgba(255,255,255,0.6)",
        margin: 0,
      }}>{body}</p>
    </div>
  );
}

export default function AIConsultation() {
  const { mobile, tablet } = useBreakpoint();
  const px = mobile ? 20 : tablet ? 40 : 64;
  const sectionPad = mobile ? "64px 0" : "88px 0";

  return (
    <div style={{ background: "#061c27", minHeight: "100vh", color: "#fff" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: `0 ${px}px` }}>

        {/* ═══════ HERO ═══════ */}
        <section style={{
          minHeight: mobile ? "auto" : "50vh",
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: mobile ? "120px 0 48px" : "140px 0 64px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: teal, flexShrink: 0 }} />
            <span style={{ fontFamily: f, fontSize: 12, fontWeight: 500, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>AI Consultation</span>
          </div>

          <h1 style={{
            fontFamily: serif,
            fontSize: mobile ? 36 : tablet ? 52 : 64,
            fontWeight: 400, lineHeight: 1.08, color: "#fff",
            margin: "0 0 28px 0",
          }}>
            A free consultation that gives you a <Accent>real game plan</Accent>
          </h1>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 20, lineHeight: 1.7,
            color: "rgba(255,255,255,0.6)", maxWidth: 720, margin: "0 0 24px 0",
          }}>
            Whether you work with us or not. Most AI companies want to sell you software. We want to understand your business first.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.7,
            color: "rgba(255,255,255,0.55)", maxWidth: 720, margin: "0 0 40px 0",
          }}>
            Milton&apos;s AI Consultation is a free, one-on-one session where we sit down with you, learn how your facility operates, and map out exactly where AI fits — and where it doesn&apos;t. You walk away with a clear picture of your current gaps and a practical AI game plan built around your specific business.
          </p>

          <ResponsiveImage 
            desktopSrc="/images/consultation-hero-desktop.png"
            mobileSrc="/images/consultation-hero-mobile.png"
            alt="Consultation meeting in gym office with whiteboard showing brainstorming metrics"
            mobile={mobile}
          />

          <div style={{ marginTop: 40 }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ WHAT WE DO ON THE CALL ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionDivider />
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : 40,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            What we actually do <Accent>on the call</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: "0 0 24px 0",
          }}>
            This isn&apos;t a demo disguised as a consultation. We spend most of the time listening.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: "0 0 24px 0",
          }}>
            <strong style={{ color: "#fff" }}>We learn how you operate:</strong> locations, trainers, training model, scheduling, billing, member communication. Every facility is different — cookie-cutter AI doesn&apos;t work.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: "0 0 24px 0",
          }}>
            <strong style={{ color: "#fff" }}>We learn your tech stack:</strong> MindBody, ABC Fitness, Recess, spreadsheets, whatever it is. We need the full picture — what&apos;s working, what&apos;s disconnected, and where your team is doing things that should be automated.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: 0,
          }}>
            Once we understand your business, we show you where Milton makes the biggest impact for your specific situation. Not a generic pitch deck. Maybe it&apos;s the AI Receptionist because you&apos;re losing leads to missed calls every week. Maybe it&apos;s the Coach Co-Pilot because your fitness director is buried in spreadsheets. We find the one or two things that will deliver ROI fastest and build from there.
          </p>

          <ResponsiveImage 
            desktopSrc="/images/consultation-call-desktop.png"
            mobileSrc="/images/consultation-call-mobile.png"
            alt="Gym owner reviewing dashboard analytics during video consultation"
            mobile={mobile}
          />
        </section>

        {/* ═══════ WHAT YOU WALK AWAY WITH ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionDivider />
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : 40,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 32px 0",
          }}>
            What you walk away with
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)", gap: 20 }}>
            <WalkawayItem 
              title="Where you are today" 
              body="A clear-eyed look at your current tools, workflows, and gaps — and how they compare to what the best-run facilities are doing with AI right now."
              mobile={mobile}
            />
            <WalkawayItem 
              title="Where AI fits" 
              body="Not in theory. Specifically — which parts of your operation benefit most, which tools address those needs, and what the priority order should be."
              mobile={mobile}
            />
            <WalkawayItem 
              title="What's next" 
              body="If there's a fit, we'll schedule a deeper dive. If there's not, you still leave with a framework you can act on. No pressure. No obligation."
              mobile={mobile}
            />
          </div>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: "32px 0 0 0",
          }}>
            We&apos;re selective about who we work with — our team meets with some partners three times a week during implementation. The consultation is how we figure out together whether there&apos;s real alignment. It&apos;s valuable for you because you get a real plan. It&apos;s valuable for us because we learn whether we can actually help.
          </p>

          <ResponsiveImage 
            desktopSrc="/images/consultation-walkaway-desktop.png"
            mobileSrc="/images/consultation-walkaway-mobile.png"
            alt="Gym owner reviewing AI game plan documents in facility lobby"
            mobile={mobile}
          />
        </section>

        {/* ═══════ CLOSING CTA ═══════ */}
        <section style={{
          padding: mobile ? "64px 0 100px" : "88px 0 120px",
          textAlign: "center",
        }}>
          <SectionDivider />
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : 40,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 16px 0",
          }}>
            One call. No cost. A real game plan for AI in your facility.
          </h2>
          <div style={{ marginTop: 32 }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

      </div>
    </div>
  );
}
