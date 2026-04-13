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
const serif = "'Cormorant Garamond', serif";
const teal = "#0d9aa5";
const mint = "#9af198";

function Accent({ children }) {
  return <span style={{ color: teal, fontStyle: "italic" }}>{children}</span>;
}

function SectionLabel({ text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: teal, flexShrink: 0 }} />
      <span style={{ fontFamily: f, fontSize: 12, fontWeight: 500, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>{text}</span>
    </div>
  );
}

function SectionDivider() {
  return <div style={{ height: 1, background: `linear-gradient(90deg, ${teal}60, ${teal}08)`, marginBottom: 28 }} />;
}

function VisualPlaceholder({ height = 320, label = "Visual Here", mobile }) {
  return (
    <div style={{
      height: mobile ? Math.min(height, 220) : height,
      borderRadius: mobile ? 12 : 16,
      border: "1px solid rgba(13,154,165,0.25)",
      background: "linear-gradient(135deg, rgba(13,154,165,0.08) 0%, rgba(8,69,94,0.12) 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "rgba(154,241,152,0.5)", fontSize: mobile ? 12 : 14,
      fontFamily: f, letterSpacing: 2, textTransform: "uppercase",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle at 30% 40%, rgba(13,154,165,0.12) 0%, transparent 60%), radial-gradient(circle at 70% 80%, rgba(154,241,152,0.06) 0%, transparent 50%)",
      }} />
      <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
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

function FeatureCard({ title, body, mobile }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: mobile ? 12 : 16,
      padding: mobile ? "20px" : "28px",
    }}>
      <h4 style={{
        fontFamily: f,
        fontSize: mobile ? 15 : 17,
        fontWeight: 600,
        color: "#fff",
        margin: "0 0 10px 0",
      }}>{title}</h4>
      <p style={{
        fontFamily: f,
        fontSize: mobile ? 13 : 14,
        lineHeight: 1.7,
        color: "rgba(255,255,255,0.55)",
        margin: 0,
      }}>{body}</p>
    </div>
  );
}

export default function AIPoweredScheduling() {
  const { mobile, tablet } = useBreakpoint();
  const px = mobile ? 20 : tablet ? 40 : 64;
  const sectionPad = mobile ? "56px 0" : "80px 0";

  const baseFeatures = [
    { title: "Self-serve booking pages", body: "Every trainer gets their own branded booking page. Members pick a session type, choose a time, and confirm. Done." },
    { title: "Real-time availability", body: "Syncs with trainer calendars so members only see open slots. No double-booking. No manual updates." },
    { title: "Round-robin distribution", body: "New members or unassigned sessions get routed to available trainers automatically. Balance workloads without micromanaging the schedule." },
    { title: "Integrated payments", body: "Powered by Stripe. Members pay when they book. Packages, single sessions, memberships — all handled. Reduces no-shows and simplifies your billing." },
    { title: "Automated reminders", body: "Confirmation emails, session reminders, and post-session follow-ups go out automatically. No one on your team has to remember to send them." },
    { title: "Weekly reports", body: "A recurring summary of bookings, utilization, no-show rates, and revenue by trainer. Delivered to you automatically." },
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
            <span style={{ fontFamily: f, fontSize: 12, fontWeight: 500, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>AI-Powered Scheduling</span>
          </div>

          <h1 style={{
            fontFamily: serif,
            fontSize: mobile ? 36 : tablet ? 52 : 64,
            fontWeight: 400, lineHeight: 1.08, color: "#fff",
            margin: "0 0 28px 0",
          }}>
            Self-serve scheduling that <Accent>runs your book</Accent> for you
          </h1>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 20, lineHeight: 1.7,
            color: "rgba(255,255,255,0.6)", maxWidth: 720, margin: "0 0 40px 0",
          }}>
            Scheduling should be the simplest part of running a fitness business. But for most gyms, it&apos;s still a mess — back-and-forth texts, double bookings, no-shows, and staff spending time on the phone that should be spent on the floor.
          </p>

          <VisualPlaceholder height={mobile ? 280 : 480} label="Hero Image" mobile={mobile} />

          <div style={{ marginTop: 40 }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ INTRO ═══════ */}
        <section style={{ padding: sectionPad }}>
          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            Milton&apos;s scheduling system eliminates all of it. Members book themselves. Trainers manage their own availability. And your front desk stops being a switchboard. It works directly with Milton&apos;s Stripe-powered CRM and POS system, so bookings, payments, and client management are all connected in one place.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 17 : 20, lineHeight: 1.75,
            color: mint, fontWeight: 500, margin: 0,
          }}>
            Two versions. Pick the one that fits.
          </p>

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ BASE SCHEDULING ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="Base Scheduling" />
          <SectionDivider />

          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : tablet ? 36 : 44,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 20px 0",
          }}>
            Everything you need, <Accent>nothing you don&apos;t</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: "0 0 40px 0",
          }}>
            The base version gives your facility a clean, professional self-serve booking system. Members see real-time trainer availability, book sessions on their own, and pay at the time of booking. No phone calls. No waiting for a callback. No forgotten appointments.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)",
            gap: mobile ? 16 : 20,
            marginBottom: 40,
          }}>
            {baseFeatures.map((feature, i) => (
              <FeatureCard key={i} title={feature.title} body={feature.body} mobile={mobile} />
            ))}
          </div>

          <VisualPlaceholder height={350} label="Base Scheduling Interface" mobile={mobile} />

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ INTELLIGENT SCHEDULING ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="Intelligent Scheduling" />
          <SectionDivider />

          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : tablet ? 36 : 44,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 20px 0",
          }}>
            With <Accent>Milton AI</Accent> on top
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: "0 0 20px 0",
          }}>
            Everything in the base version, plus Milton AI actively working the schedule on behalf of your members, your coaches, and you.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: "0 0 40px 0",
          }}>
            This isn&apos;t just a booking system that waits for someone to click a link. It&apos;s a scheduling agent that reaches out, follows up, re-engages, and optimizes — all on its own.
          </p>

          {/* For Members */}
          <div style={{ marginBottom: 48 }}>
            <h3 style={{
              fontFamily: f, fontSize: mobile ? 16 : 18, fontWeight: 600,
              color: mint, margin: "0 0 16px 0",
            }}>For your members</h3>
            <p style={{
              fontFamily: f, fontSize: mobile ? 14 : 16, lineHeight: 1.75,
              color: "rgba(255,255,255,0.6)", margin: "0 0 24px 0",
            }}>
              Milton notices a member hasn&apos;t booked in two weeks and sends a text: &quot;It&apos;s been a minute. Want me to get you on the schedule this week? Here are three times that work with your trainer.&quot; The member replies &quot;Tuesday works&quot; and Milton books it. No link. No portal. Just a conversation.
            </p>
            <VisualPlaceholder height={280} label="Member Conversation" mobile={mobile} />
          </div>

          {/* For Coaches */}
          <div style={{ marginBottom: 48 }}>
            <h3 style={{
              fontFamily: f, fontSize: mobile ? 16 : 18, fontWeight: 600,
              color: mint, margin: "0 0 16px 0",
            }}>For your coaches</h3>
            <p style={{
              fontFamily: f, fontSize: mobile ? 14 : 16, lineHeight: 1.75,
              color: "rgba(255,255,255,0.6)", margin: "0 0 24px 0",
            }}>
              Milton sees a trainer has a gap on Thursday afternoon and three clients who haven&apos;t booked this week. It reaches out to those clients on the trainer&apos;s behalf, suggests the open slot, and fills it. The trainer&apos;s schedule gets tighter without them doing a thing.
            </p>
            <VisualPlaceholder height={280} label="Coach Schedule Optimization" mobile={mobile} />
          </div>

          {/* For You */}
          <div style={{ marginBottom: 40 }}>
            <h3 style={{
              fontFamily: f, fontSize: mobile ? 16 : 18, fontWeight: 600,
              color: mint, margin: "0 0 16px 0",
            }}>For you</h3>
            <p style={{
              fontFamily: f, fontSize: mobile ? 14 : 16, lineHeight: 1.75,
              color: "rgba(255,255,255,0.6)", margin: "0 0 24px 0",
            }}>
              Milton flags scheduling patterns you&apos;d miss on your own. A trainer who&apos;s consistently underbooked on Fridays. A member who used to come three times a week and is now down to one. A time slot that never fills and could be repurposed. It doesn&apos;t just report — it recommends what to do about it and can act on your direction.
            </p>
            <VisualPlaceholder height={280} label="Director Insights" mobile={mobile} />
          </div>

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ CONNECTED ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="Connected System" />
          <SectionDivider />

          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : tablet ? 36 : 44,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 20px 0",
          }}>
            Connected to your <Accent>CRM, POS</Accent>, and the rest of Milton
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: "0 0 20px 0",
          }}>
            Scheduling doesn&apos;t live in a silo. Every booking flows into Milton&apos;s Stripe-powered CRM and POS system — so session history, payment status, package balances, and client records are always up to date. No reconciling between systems. No manual data entry.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: "0 0 32px 0",
          }}>
            And because it&apos;s part of the Milton ecosystem, scheduling data also feeds into the Coach Co-Pilot, the Director Co-Pilot, and the Member Co-Pilot. A trainer can see their upcoming sessions alongside client progress data. A fitness director can see team utilization alongside retention trends. The Member Co-Pilot can prompt members to book based on their training plan.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 18, lineHeight: 1.75,
            color: mint, fontWeight: 500, margin: "0 0 32px 0",
          }}>
            Everything connected. Everything in one place.
          </p>

          <VisualPlaceholder height={350} label="Connected Ecosystem" mobile={mobile} />

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ CLOSING ═══════ */}
        <section style={{ padding: sectionPad }}>
          <div style={{
            background: "rgba(13,154,165,0.06)",
            border: "1px solid rgba(13,154,165,0.2)",
            borderRadius: mobile ? 16 : 24,
            padding: mobile ? "40px 24px" : "56px 48px",
            textAlign: "center",
          }}>
            <h2 style={{
              fontFamily: serif,
              fontSize: mobile ? 26 : tablet ? 34 : 42,
              fontWeight: 400, lineHeight: 1.15, color: "#fff",
              margin: "0 0 20px 0",
            }}>
              Stop losing sessions to <Accent>friction</Accent>
            </h2>

            <p style={{
              fontFamily: f, fontSize: mobile ? 14 : 16, lineHeight: 1.75,
              color: "rgba(255,255,255,0.6)", maxWidth: 600, margin: "0 auto 20px auto",
            }}>
              Every time a member has to call, text, or wait to book — you lose some of them. They meant to reschedule but forgot. They wanted to add a session but didn&apos;t want to bother anyone. They fell off the schedule and nobody noticed until they were gone.
            </p>

            <p style={{
              fontFamily: f, fontSize: mobile ? 14 : 16, lineHeight: 1.75,
              color: "rgba(255,255,255,0.6)", maxWidth: 600, margin: "0 auto 32px auto",
            }}>
              Milton&apos;s scheduling system removes that friction entirely. Members book in seconds. Trainers stay full. Gaps get filled. And with the intelligent version, Milton is actively working to keep your schedule tight and your members engaged — before anyone has to ask.
            </p>

            <div style={{ marginTop: 32 }}>
              <CTAButton mobile={mobile} />
            </div>
          </div>
        </section>

        </div>
      </div>
    </>
  );
}
