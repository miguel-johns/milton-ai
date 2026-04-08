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

function SectionLabel({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: teal, flexShrink: 0 }} />
      <span style={{ fontFamily: f, fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>{children}</span>
    </div>
  );
}

function SectionDivider() {
  return <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "0 0 48px 0" }} />;
}

function VisualPlaceholder({ height = 300, label = "Visual", mobile }) {
  return (
    <div style={{
      width: "100%",
      height: mobile ? height * 0.65 : height,
      background: "linear-gradient(135deg, rgba(13,154,165,0.08) 0%, rgba(154,241,152,0.04) 100%)",
      border: "1px dashed rgba(13,154,165,0.25)",
      borderRadius: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 32,
    }}>
      <span style={{ fontFamily: f, fontSize: 13, color: "rgba(255,255,255,0.25)", letterSpacing: 1 }}>[{label}]</span>
    </div>
  );
}

function CTAButton({ mobile, text = "AI Consultation" }) {
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
            color: "rgba(255,255,255,0.6)", maxWidth: 720, margin: "0 0 40px 0",
          }}>
            Whether you work with us or not. Most AI companies want to sell you software. We want to understand your business first.
          </p>

          <VisualPlaceholder height={mobile ? 280 : 420} label="Hero Image" mobile={mobile} />

          <div style={{ marginTop: 40 }}>
            <CTAButton mobile={mobile} text="Book Your AI Consultation" />
          </div>
        </section>

        {/* ═══════ INTRO ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionDivider />
          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            Milton&apos;s AI Consultation is a free, one-on-one consultation where we sit down with you, learn how your facility operates, and map out exactly where AI fits — and where it doesn&apos;t.
          </p>
          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            You walk away with a clear picture of your current tech stack, your biggest operational gaps, and a practical AI game plan built around your specific business. If you decide to work with us, great — we&apos;ll start executing. If you decide to take that plan and run with it on your own, that&apos;s fine too. Either way, you get something real for your time.
          </p>
        </section>

        {/* ═══════ WHAT WE DO ON THE CALL ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionDivider />
          <SectionLabel>What we actually do</SectionLabel>
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : 40,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Here&apos;s what we actually do on the call
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: "0 0 32px 0",
          }}>
            This isn&apos;t a demo disguised as a consultation. We spend most of the time listening. We want to understand how you run your business before we talk about ours.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div>
              <h4 style={{ fontFamily: serif, fontSize: mobile ? 20 : 24, fontWeight: 400, color: mint, margin: "0 0 12px 0" }}>We learn how you operate</h4>
              <p style={{ fontFamily: f, fontSize: mobile ? 14 : 16, lineHeight: 1.75, color: "rgba(255,255,255,0.6)", margin: 0 }}>
                How many locations? How many trainers? Are they W2s or contractors? What does your training model look like — one-on-one, semi-private, group, hybrid? How do you handle scheduling, billing, member communication? What does your fitness director&apos;s day actually look like? We ask the questions that matter because every facility is different — and cookie-cutter AI doesn&apos;t work.
              </p>
            </div>
            <div>
              <h4 style={{ fontFamily: serif, fontSize: mobile ? 20 : 24, fontWeight: 400, color: mint, margin: "0 0 12px 0" }}>We learn what technology you&apos;re currently using</h4>
              <p style={{ fontFamily: f, fontSize: mobile ? 14 : 16, lineHeight: 1.75, color: "rgba(255,255,255,0.6)", margin: 0 }}>
                MindBody? ABC Fitness? Recess? Go High Level? A combination of spreadsheets and text messages? We need to see the full picture — what&apos;s working, what&apos;s disconnected, and where your team is spending time on things that should be automated.
              </p>
            </div>
            <div>
              <h4 style={{ fontFamily: serif, fontSize: mobile ? 20 : 24, fontWeight: 400, color: mint, margin: "0 0 12px 0" }}>We learn how you&apos;re thinking about AI</h4>
              <p style={{ fontFamily: f, fontSize: mobile ? 14 : 16, lineHeight: 1.75, color: "rgba(255,255,255,0.6)", margin: 0 }}>
                Maybe you&apos;re already using ChatGPT or Claude for content. Maybe you&apos;ve got smart equipment on the floor. Maybe you know you need to be doing something but have no idea where to start. All of that is useful. We meet you where you are.
              </p>
            </div>
          </div>

          <VisualPlaceholder height={320} label="Consultation Visual" mobile={mobile} />

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ WHAT'S POSSIBLE ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionDivider />
          <SectionLabel>What&apos;s possible</SectionLabel>
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : 40,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Then we show you what&apos;s <Accent>possible</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: "0 0 24px 0",
          }}>
            Once we understand your business, we give you a brief overview of what we&apos;ve built and how it applies to your specific situation — not a generic pitch deck, but a targeted look at where Milton&apos;s AI agents and tools would make the biggest impact for you.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: "0 0 24px 0",
          }}>
            Maybe it&apos;s nutrition — the fastest way to generate new revenue and prove the concept. Maybe it&apos;s the Coach Co-Pilot — because your trainers need better tools and your fitness director is buried in spreadsheets. Maybe it&apos;s scheduling and your AI Receptionist — because you&apos;re losing leads to missed calls every week. Maybe it&apos;s all of it, phased over time.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 18, lineHeight: 1.75,
            color: mint, fontWeight: 500, margin: 0,
          }}>
            We don&apos;t try to sell you everything on the first call. We try to find the low-hanging fruit — the one or two things that will deliver ROI fastest — and build from there.
          </p>

          <VisualPlaceholder height={320} label="Possibilities Visual" mobile={mobile} />
        </section>

        {/* ═══════ WHAT YOU WALK AWAY WITH ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionDivider />
          <SectionLabel>What you get</SectionLabel>
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : 40,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            What you walk away with
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: "0 0 32px 0",
          }}>
            By the end of the AI Consultation, you&apos;ll have clarity on three things:
          </p>

          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)", gap: 20 }}>
            <WalkawayItem 
              title="Where you are today" 
              body="A clear-eyed look at your current tools, workflows, and gaps — and how they compare to what the best-run facilities are doing with AI right now."
              mobile={mobile}
            />
            <WalkawayItem 
              title="Where AI fits in your business" 
              body="Not in theory. Specifically. Which parts of your operation would benefit most from AI, which tools address those needs, and what the priority order should be."
              mobile={mobile}
            />
            <WalkawayItem 
              title="What the next step looks like" 
              body="If there's a fit, we'll schedule a deeper dive. If there's not a fit, you still leave with a framework you can act on."
              mobile={mobile}
            />
          </div>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 18, lineHeight: 1.75,
            color: mint, fontWeight: 500, margin: "32px 0 0 0", textAlign: "center",
          }}>
            No pressure. No obligation. Just a real conversation with the people who are building AI for this industry.
          </p>

          <VisualPlaceholder height={300} label="Walkaway Visual" mobile={mobile} />

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ WHY FREE ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionDivider />
          <SectionLabel>Why it&apos;s free</SectionLabel>
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : 40,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Why we do this for <Accent>free</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: "0 0 24px 0",
          }}>
            We&apos;re selective about who we work with. We spend serious time with every partner — our CEO meets with some facilities three times a week during implementation. That means we can&apos;t work with everyone, and we need to make sure there&apos;s real alignment before we start.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: "0 0 24px 0",
          }}>
            The AI Consultation is how we figure that out — together. It&apos;s valuable for you because you get a real plan. It&apos;s valuable for us because we learn whether we can actually help. If the answer is yes, we&apos;ll earn your business by showing you what we can do. If the answer is no, you still walk away better off than when you walked in.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 18, lineHeight: 1.75,
            color: mint, fontWeight: 500, margin: 0,
          }}>
            That&apos;s how we think partnerships should start.
          </p>

          <VisualPlaceholder height={300} label="Partnership Visual" mobile={mobile} />
        </section>

        {/* ═══════ CLOSING CTA ═══════ */}
        <section style={{ padding: mobile ? "64px 0 100px" : "88px 0 120px" }}>
          <SectionDivider />
          <div style={{
            background: "linear-gradient(135deg, rgba(13,154,165,0.12) 0%, rgba(154,241,152,0.06) 100%)",
            border: "1px solid rgba(13,154,165,0.2)",
            borderRadius: 20,
            padding: mobile ? "40px 24px" : "56px 48px",
            textAlign: "center",
          }}>
            <h2 style={{
              fontFamily: serif,
              fontSize: mobile ? 28 : 40,
              fontWeight: 400, lineHeight: 1.15, color: "#fff",
              margin: "0 0 16px 0",
            }}>
              Book your AI Consultation
            </h2>
            <p style={{
              fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.7,
              color: "rgba(255,255,255,0.6)", maxWidth: 600, margin: "0 auto 32px auto",
            }}>
              One call. No cost. A real game plan for AI in your facility — built around how you actually operate, not how we think you should.
            </p>
            <CTAButton mobile={mobile} text="Book Your AI Consultation" />
          </div>
        </section>

      </div>
    </div>
  );
}
