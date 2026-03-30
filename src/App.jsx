import { useState, useEffect } from "react";

const sections = [
  { id: "hero", label: "" },
  { id: "coach", num: "01", label: "THE HEAD COACH" },
  { id: "director", num: "02", label: "THE FITNESS DIRECTOR" },
  { id: "integrations", num: "03", label: "INTEGRATIONS" },
  { id: "ops", num: "04", label: "AI-POWERED OPS" },
  { id: "concierge", num: "05", label: "THE CONCIERGE" },
  { id: "casestudies", num: "06", label: "CASE STUDIES" },
  { id: "pricing", num: "07", label: "PRICING" },
];

function useBreakpoint() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return { mobile: w < 640, tablet: w >= 640 && w < 1024, desktop: w >= 1024, w };
}

function VisualPlaceholder({ height = 320, mobileHeight, label = "", style = {} }) {
  const { mobile } = useBreakpoint();
  return (
    <div style={{
      height: mobile ? (mobileHeight || Math.min(height, 220)) : height,
      borderRadius: mobile ? 12 : 16,
      border: "1px solid rgba(13,154,165,0.25)",
      background: "linear-gradient(135deg, rgba(13,154,165,0.08) 0%, rgba(8,69,94,0.12) 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "rgba(154,241,152,0.5)", fontSize: mobile ? 12 : 14,
      fontFamily: "'DM Sans', sans-serif", letterSpacing: 2, textTransform: "uppercase",
      position: "relative", overflow: "hidden", ...style,
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle at 30% 40%, rgba(13,154,165,0.12) 0%, transparent 60%), radial-gradient(circle at 70% 80%, rgba(154,241,152,0.06) 0%, transparent 50%)",
      }} />
      <span style={{ position: "relative", zIndex: 1 }}>{label || "Visual Here"}</span>
    </div>
  );
}

function SectionLabel({ text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#0d9aa5", flexShrink: 0 }} />
      <span style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500,
        letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(255,255,255,0.7)",
      }}>{text}</span>
    </div>
  );
}

function SectionDivider() {
  return <div style={{ height: 1, background: "linear-gradient(90deg, rgba(13,154,165,0.4) 0%, rgba(13,154,165,0.05) 100%)", marginBottom: 28 }} />;
}

function ComingSoonBlur({ mobile }) {
  const f = "'DM Sans', sans-serif";
  const teal = "#0d9aa5";
  
  // Mobile: 1:1 square with simple blurred content
  if (mobile) {
    return (
      <div style={{
        position: "relative",
        aspectRatio: "1/1",
        borderRadius: 12,
        overflow: "hidden",
        background: "rgba(8,69,94,0.3)",
        border: "1px solid rgba(13,154,165,0.2)",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          padding: 20,
          filter: "blur(6px)",
          opacity: 0.4,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}>
          <div style={{ width: "50%", height: 16, background: "rgba(255,255,255,0.3)", borderRadius: 4 }} />
          <div style={{ width: "80%", height: 10, background: "rgba(255,255,255,0.15)", borderRadius: 4 }} />
          <div style={{ width: "65%", height: 10, background: "rgba(255,255,255,0.15)", borderRadius: 4 }} />
          <div style={{ flex: 1, background: "rgba(13,154,165,0.15)", borderRadius: 12, marginTop: 8 }} />
        </div>
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(ellipse at center, rgba(6,28,39,0.3) 0%, rgba(6,28,39,0.7) 100%)",
        }}>
          <div style={{
            background: "rgba(13,154,165,0.15)",
            border: `1px solid ${teal}40`,
            borderRadius: 100,
            padding: "10px 24px",
          }}>
            <span style={{
              fontFamily: f,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: teal,
            }}>Coming Soon</span>
          </div>
        </div>
      </div>
    );
  }

  // Desktop: 3-column grid with blurred feature cards
  return (
    <div style={{
      position: "relative",
      borderRadius: 20,
      overflow: "hidden",
      background: "rgba(8,69,94,0.3)",
      border: "1px solid rgba(13,154,165,0.2)",
    }}>
      <div style={{
        padding: 40,
        filter: "blur(8px)",
        opacity: 0.5,
        pointerEvents: "none",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 24,
      }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{
            background: "rgba(13,154,165,0.15)",
            borderRadius: 12,
            padding: 28,
            minHeight: 240,
          }}>
            <div style={{ width: "60%", height: 14, background: "rgba(255,255,255,0.3)", borderRadius: 4, marginBottom: 12 }} />
            <div style={{ width: "100%", height: 10, background: "rgba(255,255,255,0.15)", borderRadius: 4, marginBottom: 8 }} />
            <div style={{ width: "90%", height: 10, background: "rgba(255,255,255,0.15)", borderRadius: 4, marginBottom: 8 }} />
            <div style={{ width: "75%", height: 10, background: "rgba(255,255,255,0.15)", borderRadius: 4, marginBottom: 20 }} />
            <div style={{ width: "100%", height: 120, background: "rgba(13,154,165,0.2)", borderRadius: 8 }} />
          </div>
        ))}
      </div>
      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse at center, rgba(6,28,39,0.4) 0%, rgba(6,28,39,0.8) 100%)",
      }}>
        <div style={{
          background: "rgba(13,154,165,0.15)",
          border: `1px solid ${teal}40`,
          borderRadius: 100,
          padding: "12px 32px",
          marginBottom: 16,
        }}>
          <span style={{
            fontFamily: f,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: teal,
          }}>Coming Soon</span>
        </div>
        <p style={{
          fontFamily: f,
          fontSize: 16,
          color: "rgba(255,255,255,0.5)",
          textAlign: "center",
          maxWidth: 400,
          margin: 0,
        }}>We're building something special. Stay tuned.</p>
      </div>
    </div>
  );
}

function FeatureCard({ title, body, visual = true, visualHeight = 200, aspectRatio, image, imageAlt }) {
  const { mobile } = useBreakpoint();
  return (
    <div style={{
      background: "rgba(8,69,94,0.2)", border: "1px solid rgba(13,154,165,0.15)",
      borderRadius: mobile ? 12 : 16, padding: mobile ? 20 : 28,
      display: "flex", flexDirection: "column", gap: mobile ? 12 : 16,
    }}>
      {image ? (
        <div style={{ aspectRatio: aspectRatio || "1/1", borderRadius: mobile ? 8 : 12, overflow: "hidden" }}>
          <img src={image} alt={imageAlt || title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
        </div>
      ) : visual && (
        aspectRatio ? (
          <div style={{
            aspectRatio,
            background: "rgba(13,154,165,0.08)", border: "1px dashed rgba(13,154,165,0.25)",
            borderRadius: mobile ? 8 : 12, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(13,154,165,0.4)" }}>Visual</span>
          </div>
        ) : <VisualPlaceholder height={visualHeight} mobileHeight={160} />
      )}
      <h4 style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: mobile ? 17 : 20,
        fontWeight: 600, color: "#fff", margin: 0,
      }}>{title}</h4>
      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: mobile ? 14 : 15,
        lineHeight: 1.7, color: "rgba(255,255,255,0.65)", margin: 0,
      }}>{body}</p>
    </div>
  );
}

function CTA({ children, variant = "primary", style: s = {}, href, onClick }) {
  const base = {
    fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600,
    padding: "14px 32px", borderRadius: 100, cursor: "pointer",
    transition: "all 0.25s ease", textDecoration: "none",
    display: "inline-block", letterSpacing: 0.3, whiteSpace: "nowrap",
  };
  const styles = variant === "primary"
    ? { ...base, background: "#fff", color: "#08455e", border: "none", ...s }
    : { ...base, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", ...s };
  if (href) {
    return <a href={href} style={styles}>{children}</a>;
  }
  return <button style={styles} onClick={onClick}>{children}</button>;
}

function Accent({ children }) {
  return <span style={{ color: "#0d9aa5", fontStyle: "italic" }}>{children}</span>;
}

function GridRow({ children, cols = 2 }) {
  const { mobile, tablet } = useBreakpoint();
  const c = mobile ? 1 : tablet ? Math.min(cols, 2) : cols;
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${c}, 1fr)`,
      gap: mobile ? 16 : 20,
    }}>{children}</div>
  );
}



function HeroVisual({ mobile }) {
  return (
    <div style={{
      width: "100%",
      maxWidth: 1000,
      marginBottom: mobile ? 36 : 60,
      borderRadius: mobile ? 12 : 20,
      overflow: "hidden",
      boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)",
    }}>
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hero%20Image-qMFrg2JU59JkiO0EF8MAxOynKIBOPh.png"
        alt="Milton dashboard showing trainer roster, attendance rates, and AI coaching insights"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
      />
    </div>
  );
}



export default function MiltonHomepage() {
  const { mobile, tablet, desktop } = useBreakpoint();
  const px = mobile ? 20 : tablet ? 32 : 40;
  const sectionPad = mobile ? "80px 0" : "120px 0";

  const Headline = ({ children, style = {} }) => (
    <h2 style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: mobile ? 32 : tablet ? 44 : "clamp(36px, 5vw, 64px)",
      fontWeight: 400, lineHeight: 1.15, color: "#fff",
      margin: "0 0 24px 0", ...style,
    }}>{children}</h2>
  );

  const Body = ({ children, italic, style = {} }) => (
    <p style={{
      fontFamily: "'DM Sans', sans-serif", fontSize: mobile ? 15 : 17,
      lineHeight: 1.75, color: italic ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.6)",
      maxWidth: 680, margin: "0 0 48px 0",
      fontStyle: italic ? "italic" : "normal", ...style,
    }}>{children}</p>
  );

  return (
    <>
      {/* ——— CONTENT ——— */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: `0 ${px}px` }}>

        {/* HERO */}
        <section id="hero" style={{
          minHeight: "100vh", display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "center", textAlign: "center",
          paddingTop: mobile ? 80 : 100, paddingBottom: mobile ? 40 : 0,
        }}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: mobile ? 38 : tablet ? 56 : "clamp(56px, 6vw, 80px)",
            fontWeight: 400, lineHeight: 1.1, color: "#fff",
            margin: "0 0 24px 0", maxWidth: 1000,
          }}>
            The First AI Co-Pilot for Your Personal Training Business.
          </h1>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: mobile ? 15 : "clamp(16px, 1.8vw, 20px)",
            lineHeight: 1.65, color: "rgba(255,255,255,0.6)",
            maxWidth: 640, margin: "0 0 32px 0", padding: mobile ? "0 4px" : 0,
          }}>
            The industry loses 80% of its trainers every year. Hiring is brutal. Retention is worse. Milton gives your coaches the tools to perform — and your fitness director the visibility to lead.
          </p>

          <div style={{ display: "flex", gap: 12, marginBottom: mobile ? 36 : 60, flexWrap: "wrap", justifyContent: "center" }}>
            <CTA variant="primary" style={{ fontSize: mobile ? 14 : 15, padding: mobile ? "12px 28px" : "14px 32px" }} href="#/book">Request a Demo</CTA>
            <CTA variant="secondary" style={{ fontSize: mobile ? 14 : 15, padding: mobile ? "12px 28px" : "14px 32px" }} href="#/pricing">Get Pricing</CTA>
          </div>

          <HeroVisual mobile={mobile} tablet={tablet} />
        </section>

        {/* 01 HEAD COACH */}
        <section id="coach" style={{ padding: sectionPad }}>
          <SectionLabel text="YOUR COACHING CO-PILOT" />
          <SectionDivider />
          <Headline>Every trainer performs like your <Accent>best</Accent> trainer.</Headline>
          <Body>Your best trainer follows up before the client thinks about canceling. They prep for every session. They track progressive overload without being asked. They know when to push and when to pull back. Milton puts that mind in the pocket of every trainer on your floor.</Body>
          <GridRow cols={2}>
            <FeatureCard title="Session Intelligence" body="Milton briefs your trainer before every session — what you did last time, where the client is in their program, what to focus on today. No more scrambling to remember." aspectRatio="1/1" image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Coach%20Image%201-HkvFtsfO0H1rcjbsXgD8mcAQzRAr5y.png" imageAlt="Milton coach dashboard showing session briefs" />
            <FeatureCard title="Workout Programming & Tracking" body="Build programs, log sessions, track progressive overload, and make progress visual. Clients see their gains. Trainers see what's working. Everyone stays accountable." aspectRatio="1/1" image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Coach%20Image%202-gTxldyFd8KlEvDftzBsPeRVblJfhcG.png" imageAlt="Workout calendar with custom program schedule" />
          </GridRow>
          <div style={{ height: mobile ? 16 : 20 }} />
          <GridRow cols={2}>
            <FeatureCard title="Automated Follow-Up" body="Session just ended? Milton drafts the follow-up. Client no-showed? Milton flags it and suggests the re-engagement message. The small things that separate good from great — handled." aspectRatio="1/1" image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Coach%20Image%203-Zyv1ZMbFfXEd2ReTSCxSaRgt0Hk0Sl.png" imageAlt="Milton crafting a rebooking message for Emily" />
            <FeatureCard title="Nutrition & Challenges" body="Run nutrition challenges that generate revenue. Give your trainers the tools to offer real nutrition guidance through a companion app that makes it simple for clients." aspectRatio="1/1" image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Coach%20Image%204-HLCvFwx3vSa59mH6clAdW1P1I17T8f.png" imageAlt="Milton mobile app with nutrition logging" />
          </GridRow>
</section>

        {/* 02 FITNESS DIRECTOR */}
        <section id="director" style={{ padding: sectionPad }}>
          <SectionLabel text="YOUR DIRECTOR CO-PILOT" />
          <SectionDivider />
          <Headline>The view you've been building in <Accent>spreadsheets</Accent> for years.</Headline>
          <Body>Tracking attendance in one sheet. Consultations and close rates in another. Follow-ups and weekly check-ins in a third. Cross-referencing your scheduling software and doing the math in your head to figure out who's growing and who's slipping. Milton replaces all of it with one intelligent view.</Body>
          <GridRow cols={2}>
            <FeatureCard title="Trainer Performance at a Glance" body="Every trainer on one screen. Active clients, plus or minus from last week. Projected gross for the month. Retention rate. Follow-up rate. Consultation close rate. Updated in real time." aspectRatio="1/1" image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Director%20Image%201-eEbwM6Ovg8Nf0ZPnFR5hN45wmD62TJ.png" imageAlt="Director dashboard with trainer roster and metrics" />
            <FeatureCard title="The Six-Month Cliff" body="If you keep a client past six months, they typically stay two years or more. Milton tracks every client against that milestone so you can intervene before the drop-off — not after." aspectRatio="1/1" image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Director%20Image%203-WAYQqbTvF2QsbnRBHR4uoBliMiFjZn.png" imageAlt="Client gains and losses tracking with retention cliff data" />
          </GridRow>
          <div style={{ height: mobile ? 16 : 20 }} />
          <GridRow cols={2}>
            <FeatureCard title="Gap Identification" body="Is it a coaching skills issue? A follow-up issue? A scheduling issue? Milton identifies which pillar a struggling trainer needs help with — so your next conversation is specific, not a guessing game." aspectRatio="1/1" image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Director%20Image%204-Jxo6VtCBS28znVG099jiVAzhqijRs1.png" imageAlt="Skill diagnostic showing organizing and communication scores" />
            <FeatureCard title="Trainer Development Paths" body="Milton builds development plans so your newer trainers see exactly how to level up, earn more, and build a career — not just a job that burns them out in 18 months. Your training philosophy, delivered consistently, at scale." aspectRatio="1/1" image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Director%20Image%202-0f7dlr6a3WtEroRYE2ZHiGwzrFnL0C.png" imageAlt="Trainer profile with Milton's recommendations" />
          </GridRow>
        </section>

        {/* 03 INTEGRATIONS */}
        <section id="integrations" style={{ padding: sectionPad }}>
          <SectionLabel text="INTEGRATIONS" />
          <SectionDivider />
          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
            gap: mobile ? 32 : 60, alignItems: "start",
          }}>
            <div>
              <Headline style={{ fontSize: mobile ? 32 : tablet ? 40 : "clamp(36px, 4vw, 56px)" }}>
                Works with the tools you <Accent>already</Accent> use.
              </Headline>
              <Body style={{ margin: "0 0 32px 0" }}>
                Milton connects to your existing scheduling, billing, and management platforms — not replaces them. Your front desk doesn't learn a new system. Your trainers don't switch. Milton layers intelligence on top of what's already running your business.
              </Body>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {["Connects to your scheduling and billing platform", "No rip-and-replace — layer Milton on top", "Set up in days, not months", "Your data stays yours"].map((item, i) => (
                  <div key={i} style={{
                    padding: "14px 0", borderTop: "1px solid rgba(13,154,165,0.15)",
                    display: "flex", alignItems: "center", gap: 12,
                  }}>
                    <span style={{ color: "#0d9aa5", fontSize: 18, flexShrink: 0 }}>✓</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: mobile ? 14 : 15, fontWeight: 500, color: "rgba(255,255,255,0.8)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ borderRadius: mobile ? 12 : 16, overflow: "hidden" }}>
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Website%20Images-SNwTil1Y2uwTR8RFBmu5IXqFYsdBxo.png" 
                alt="Milton integrates with Mindbody, Gymmaster, Pike13, Trainerize, and other fitness platforms"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </div>
        </section>

        {/* 04 OPS COORDINATOR */}
        <section id="ops" style={{ padding: sectionPad }}>
          <SectionLabel text="AI-POWERED OPS" />
          <SectionDivider />
          <Headline>Don't just connect to your ops stack. Let an agent <Accent>run</Accent> it.</Headline>
          <Body>For teams ready to go further, Milton's Operations Coordinator takes the busywork off your plate entirely. Scheduling, rebooking, payment follow-ups, waitlist management — handled by an AI agent that works inside your existing systems.</Body>
<Body italic style={{ margin: "-24px 0 48px 0" }}>You don't have to use it. But when your front desk is overwhelmed and your fitness director is spending half their day on admin — it's there.</Body>
          <ComingSoonBlur mobile={mobile} />
        </section>

        {/* 05 CONCIERGE */}
        <section id="concierge" style={{ padding: sectionPad }}>
          <SectionLabel text="MEMBER EXPERIENCE" />
          <SectionDivider />
          <Headline>A personal experience your members <Accent>never</Accent> outgrow.</Headline>
          <Body>Milton's Concierge gives your members a companion app that keeps them connected between sessions. Nutrition logging, workout history, progress photos, goal tracking, direct messaging with their trainer — all in one place.</Body>
<Body italic style={{ margin: "-24px 0 48px 0" }}>You don't have to turn it on. But when you're ready to offer more without hiring more, this is how.</Body>
          <ComingSoonBlur mobile={mobile} />
        </section>

        {/* 06 CASE STUDIES */}
        <section id="casestudies" style={{ padding: sectionPad }}>
          <SectionLabel text="REAL RESULTS" />
          <SectionDivider />
          <Headline>Built <Accent>with</Accent> trainers, not for them.</Headline>
          <Body>Milton wasn't designed by engineers guessing from the outside. It was built shoulder-to-shoulder with real gym owners, fitness directors, and personal trainers who've spent decades figuring out what actually works.</Body>

          <GridRow cols={3}>
            <div style={{ background: "rgba(8,69,94,0.15)", border: "1px solid rgba(13,154,165,0.2)", borderRadius: mobile ? 12 : 16, overflow: "hidden" }}>
              <div style={{ height: mobile ? 160 : 200, overflow: "hidden" }}>
                <img 
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%2835%29-RRDktgFJFs3AzS1PJRRlyKXvH42KxF.png" 
                  alt="Optimal Performance gym exterior"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: mobile ? 20 : 28 }}>
                <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: mobile ? 16 : 18, fontWeight: 600, color: "#fff", margin: "0 0 6px 0" }}>Optimal Performance</h4>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#0d9aa5", fontWeight: 500 }}>Wichita, KS</span>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.55)", margin: "14px 0 18px 0" }}>
                  Nearly two decades of personal training. A team ranging from brand new to veteran. They needed a system that develops younger coaches faster and replaces the spreadsheets consuming their week.
                </p>
                <a href="#/case-study/optimal-performance" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: "#9af198", cursor: "pointer", textDecoration: "none" }}>Read the Full Case Study →</a>
              </div>
            </div>

            <div style={{
              background: "rgba(8,69,94,0.06)", border: "1px dashed rgba(13,154,165,0.2)",
              borderRadius: mobile ? 12 : 16, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              padding: mobile ? 28 : 40, textAlign: "center", minHeight: mobile ? 260 : 380,
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: "50%",
                border: "1px dashed rgba(13,154,165,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16,
              }}>
                <span style={{ fontSize: 24, color: "rgba(13,154,165,0.5)" }}>+</span>
              </div>
              <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: mobile ? 16 : 18, fontWeight: 600, color: "rgba(255,255,255,0.6)", margin: "0 0 8px 0" }}>Your Gym Here</h4>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.3)", margin: "0 0 16px 0" }}>
                We're looking for forward-thinking personal training businesses to partner with.
              </p>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: "rgba(154,241,152,0.5)", cursor: "pointer" }}>Apply to Be a Partner →</span>
            </div>
          </GridRow>
        </section>

        {/* 07 PRICING */}
        <section id="pricing" style={{ padding: sectionPad }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(13,154,165,0.12) 0%, rgba(8,69,94,0.2) 100%)",
            border: "1px solid rgba(13,154,165,0.2)",
            borderRadius: mobile ? 16 : 24, padding: mobile ? "44px 20px" : "80px 60px",
            textAlign: "center",
          }}>
            <SectionLabel text="PRICING" />
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: mobile ? 28 : "clamp(36px, 4.5vw, 56px)",
              fontWeight: 400, lineHeight: 1.15, color: "#fff", margin: "20px 0 24px 0",
            }}>See exactly what Milton is <Accent>worth</Accent> to your business.</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: mobile ? 14 : 17, lineHeight: 1.75, color: "rgba(255,255,255,0.6)", maxWidth: 600, margin: "0 auto 12px auto" }}>
              Every personal training business is different. How many trainers you have, what you charge, how your packages work — it all changes the math.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: mobile ? 14 : 17, lineHeight: 1.75, color: "rgba(255,255,255,0.6)", maxWidth: 600, margin: "0 auto 28px auto" }}>
              Our pricing calculator shows you time saved, revenue recovered, trainer retention impact, and your projected ROI — specific to your business.
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: mobile ? 18 : 22, fontStyle: "italic", color: "rgba(255,255,255,0.5)", margin: "0 0 32px 0" }}>
              Enter your numbers. See the dream outcome.
            </p>
            <CTA variant="primary" style={{ fontSize: mobile ? 14 : 16, padding: mobile ? "14px 28px" : "16px 40px" }}>Get My Custom Pricing →</CTA>
          </div>
        </section>

        {/* 08 CLOSER */}
        <section style={{ padding: mobile ? "60px 0 80px 0" : "120px 0 160px 0", textAlign: "center" }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: mobile ? 28 : "clamp(36px, 5vw, 64px)",
            fontWeight: 400, lineHeight: 1.15, color: "#fff", margin: "0 0 20px 0",
          }}>
            From private studios to national franchises — Milton scales with you.
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: mobile ? 15 : 18,
            lineHeight: 1.7, color: "rgba(255,255,255,0.55)",
            maxWidth: 620, margin: "0 auto 36px auto",
          }}>
            See how Milton's AI co-pilots help your trainers perform, your fitness director lead, and your business grow.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <CTA variant="primary" style={{ fontSize: mobile ? 14 : 16, padding: mobile ? "14px 28px" : "16px 40px" }} href="#/book">Request a Demo</CTA>
            <CTA variant="secondary" style={{ fontSize: mobile ? 14 : 16, padding: mobile ? "14px 28px" : "16px 40px" }} href="#/pricing">Get Pricing</CTA>
          </div>
        </section>
      </div>
    </>
  );
}
