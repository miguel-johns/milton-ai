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

function VisualPlaceholder({ height = 300, label = "Visual", mobile }) {
  return (
    <div style={{
      width: "100%",
      height: mobile ? height * 0.7 : height,
      background: "linear-gradient(135deg, rgba(13,154,165,0.08) 0%, rgba(154,241,152,0.05) 100%)",
      border: "1px dashed rgba(13,154,165,0.3)",
      borderRadius: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 32,
    }}>
      <span style={{ fontFamily: f, fontSize: 14, color: "rgba(255,255,255,0.3)" }}>[{label}]</span>
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

export default function AgenticCommerce() {
  const { mobile, tablet } = useBreakpoint();
  const sectionPad = mobile ? "56px 0" : "80px 0";

  return (
    <>
      <div style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: mobile ? "0 20px" : tablet ? "0 32px" : "0 40px",
      }}>

        {/* ═══════ HERO ═══════ */}
        <section style={{
          minHeight: mobile ? "auto" : "50vh",
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: mobile ? "120px 0 48px" : "140px 0 64px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: teal, flexShrink: 0 }} />
            <span style={{ fontFamily: f, fontSize: 12, fontWeight: 500, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>Agentic Commerce</span>
          </div>

          <h1 style={{
            fontFamily: serif,
            fontSize: mobile ? 36 : tablet ? 52 : 64,
            fontWeight: 400, lineHeight: 1.08, color: "#fff",
            margin: "0 0 28px 0",
          }}>
            An AI that knows what you sell — and <Accent>how to sell it</Accent>
          </h1>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 20, lineHeight: 1.7,
            color: "rgba(255,255,255,0.6)", maxWidth: 720, margin: "0 0 24px 0",
          }}>
            You&apos;ve got memberships, PT packages, nutrition programs, challenges, recovery add-ons, and more. Right now, selling any of it requires a human to remember what&apos;s available, who to pitch it to, and when to follow up. Revenue falls through the cracks when nobody does.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 20, lineHeight: 1.7,
            color: "rgba(255,255,255,0.6)", maxWidth: 720, margin: "0 0 40px 0",
          }}>
            Milton&apos;s Agentic Commerce knows your entire catalog, understands where every lead and member is in their journey, and works across text, phone, and app to move them toward the right offer at the right time.
          </p>

          <VisualPlaceholder height={mobile ? 280 : 480} label="Hero Image" mobile={mobile} />

          <div style={{ marginTop: 40 }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ UPLOAD YOUR STORE ═══════ */}
        <section style={{ padding: sectionPad, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : 38,
            fontWeight: 400,
            color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Upload your store. Milton <Accent>learns the playbook.</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            Drop in your offerings — memberships, packages, add-ons, challenges, retail, whatever you sell. Milton learns what each product is, who it&apos;s for, what it costs, and how it fits into the member journey.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 0 0",
          }}>
            A brand new lead gets a different conversation than a six-month member. Someone who just finished a nutrition challenge gets a different offer than someone who&apos;s never tried one. Milton reads the context and adapts — like your best salesperson would, except it never forgets and it never takes a day off.
          </p>

          <VisualPlaceholder height={350} mobile={mobile} />
        </section>

        {/* ═══════ PIPELINE ═══════ */}
        <section style={{ padding: sectionPad, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : 38,
            fontWeight: 400,
            color: "#fff",
            margin: "0 0 24px 0",
          }}>
            From first touch to transaction — <Accent>handled</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 32px 0",
          }}>
            Every step of the pipeline, running automatically.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)",
            gap: mobile ? 16 : 24,
          }}>
            <IllustratedFeatureCard
              icon={
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  <circle cx="12" cy="2" r="1" fill={teal} />
                </svg>
              }
              title="Welcome"
              body="Someone fills out a form or calls your AI Receptionist. Milton picks them up within 60 seconds with a personalized text or call. No delay. No waiting on your team."
              mobile={mobile}
            />

            <IllustratedFeatureCard
              icon={
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
                  <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
                  <path d="M19 11h2m-1 -1v2" />
                </svg>
              }
              title="Nurture"
              body="Not every lead is ready today. Milton keeps the conversation going — answering questions, building trust, tracking engagement — and knows when to push and when to wait."
              mobile={mobile}
            />

            <IllustratedFeatureCard
              icon={
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <path d="M9 16l2 2 4-4" />
                </svg>
              }
              title="Book"
              body="When a lead is ready, Milton has the conversation, finds a time that works, and books the session directly into your scheduling system. No link. No hope."
              mobile={mobile}
            />

            <IllustratedFeatureCard
              icon={
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                  <path d="M12 15h.01" />
                  <path d="M17 15h.01" />
                  <path d="M7 15h.01" />
                </svg>
              }
              title="Transact"
              body="A member's 10-pack is down to one session. Milton texts them. They reply yes. Payment processes through Stripe. Done — no portal, no front desk, no friction."
              mobile={mobile}
            />

            <IllustratedFeatureCard
              icon={
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 8v4l3 3" />
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 3v1" />
                  <path d="M12 20v1" />
                  <path d="M3 12h1" />
                  <path d="M20 12h1" />
                </svg>
              }
              title="Retain"
              body="Packages expiring. Memberships coming up for renewal. Milton reaches out before the lapse, before the revenue disappears, before your team has to remember."
              mobile={mobile}
            />
          </div>
        </section>

        {/* ═══════ BEST SALESPERSON ═══════ */}
        <section style={{ padding: sectionPad, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : 38,
            fontWeight: 400,
            color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Your best salesperson. Every channel. <Accent>All the time.</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            Think about your highest-performing closer. They know the products cold. They follow up at exactly the right moment. They never let a hot lead go cold and never miss a renewal window.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            Now imagine that person working every channel, every hour, for every lead and member simultaneously.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: 0,
          }}>
            That&apos;s Agentic Commerce. Your team still handles the high-touch moments that close big deals. Milton makes sure nothing else gets forgotten.
          </p>

          <VisualPlaceholder height={350} mobile={mobile} />
        </section>

        {/* ═══════ CLOSING CTA ═══════ */}
        <section style={{
          padding: sectionPad,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          textAlign: "center",
        }}>
          <h3 style={{
            fontFamily: serif,
            fontSize: mobile ? 26 : 34,
            fontWeight: 400,
            color: "#fff",
            margin: "0 0 16px 0",
          }}>
            Ready to put your sales on <Accent>autopilot</Accent>?
          </h3>

          <p style={{
            fontFamily: f,
            fontSize: mobile ? 15 : 17,
            color: "rgba(255,255,255,0.6)",
            margin: "0 0 28px 0",
            maxWidth: 500,
            marginLeft: "auto",
            marginRight: "auto",
          }}>
            Book a free AI Strategy Session and we&apos;ll show you how Agentic Commerce can drive revenue for your facility.
          </p>

          <CTAButton mobile={mobile} />
        </section>

      </div>
    </>
  );
}
