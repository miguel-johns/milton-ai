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

function CTAButton({ mobile, label = "Book a free consultation" }) {
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
      {label}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </button>
  );
}

function StepCard({ number, title, description, mobile }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: mobile ? 12 : 16,
      padding: mobile ? "24px" : "32px",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 16,
      }}>
        <span style={{
          fontFamily: f,
          fontSize: mobile ? 12 : 13,
          fontWeight: 600,
          color: teal,
          letterSpacing: 1,
        }}>{number}</span>
        <h3 style={{
          fontFamily: f,
          fontSize: mobile ? 16 : 18,
          fontWeight: 600,
          color: "#fff",
          margin: 0,
        }}>{title}</h3>
      </div>
      <p style={{
        fontFamily: f,
        fontSize: mobile ? 14 : 15,
        lineHeight: 1.7,
        color: "rgba(255,255,255,0.6)",
        margin: "0 0 20px 0",
      }}>{description}</p>
      <VisualPlaceholder height={200} mobile={mobile} />
    </div>
  );
}

export default function AICoach() {
  const { mobile, tablet } = useBreakpoint();
  const px = mobile ? 20 : tablet ? 32 : 40;
  const sectionPad = mobile ? "48px 0" : "72px 0";

  return (
    <>
      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: `0 ${px}px` }}>

        {/* ═══════ HERO ═══════ */}
        <section style={{
          minHeight: mobile ? "auto" : "50vh",
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: mobile ? "120px 0 48px" : "140px 0 64px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: teal, flexShrink: 0 }} />
            <span style={{ fontFamily: f, fontSize: 12, fontWeight: 500, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>AI Agents / AI Coach</span>
          </div>

          <h1 style={{
            fontFamily: serif,
            fontSize: mobile ? 36 : tablet ? 52 : 64,
            fontWeight: 400, lineHeight: 1.08, color: "#fff",
            margin: "0 0 28px 0",
          }}>
            Your coaching expertise, delivered to <Accent>every member</Accent>.
          </h1>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 20, lineHeight: 1.7,
            color: "rgba(255,255,255,0.6)", maxWidth: 720, margin: "0 0 40px 0",
          }}>
            A fully automated coaching experience — personalized workouts, complete meal plans, and intelligent check-ins. All built on your methods. Running 24/7 without you.
          </p>

          <VisualPlaceholder height={mobile ? 280 : 480} label="Hero Image" mobile={mobile} />

          <div style={{ marginTop: 40 }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ HOW IT WORKS ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="How It Works" />
          <SectionDivider />
          
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : tablet ? 36 : 44,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            One setup. <Accent>Then it runs.</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 40px 0",
          }}>
            You upload your content once — your training philosophy, nutrition approach, programming principles, coaching voice. The AI Coach does the rest for every member, every day.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)",
            gap: mobile ? 16 : 20,
          }}>
            <StepCard
              number="01"
              title="You upload your content"
              description="Training philosophy, nutrition principles, programming style, brand voice."
              mobile={mobile}
            />
            <StepCard
              number="02"
              title="Milton learns it"
              description="The AI builds a model of your methods — not generic advice, your approach."
              mobile={mobile}
            />
            <StepCard
              number="03"
              title="Members get their plan"
              description="Personalized workouts and meal plans built for each individual's goals."
              mobile={mobile}
            />
            <StepCard
              number="04"
              title="The system evolves"
              description="Every session logged, every meal tracked — the AI adapts and progresses automatically."
              mobile={mobile}
            />
          </div>
        </section>

        {/* ═══════ UNIFIED PROFILE ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="The Unified Profile" />
          <SectionDivider />
          
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : tablet ? 36 : 44,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Everything about a member. <Accent>One place.</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            Before the AI Coach builds a single workout or meal plan, it knows who it&apos;s working with. Not just their goals — their full picture.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            Wearables and connected devices feed in recovery data, sleep quality, heart rate trends, and daily activity. Gym equipment logs what they lifted and how they moved. Apps they already use — nutrition trackers, health platforms — sync automatically. Blood work and biometric data paint a deeper picture of what their body needs. And every note a coach has ever written about them is in there too.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 18, lineHeight: 1.75,
            color: mint, fontWeight: 500, margin: "0 0 32px 0",
          }}>
            The AI doesn&apos;t program in a vacuum. It programs from a complete, living profile that updates every time a member trains, eats, sleeps, or checks in. The more data it has, the smarter the plan gets.
          </p>

          <VisualPlaceholder height={350} mobile={mobile} />
        </section>

        {/* ═══════ WORKOUTS ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="Workout Programming" />
          <SectionDivider />
          
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : tablet ? 36 : 44,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Builds the program. Progresses the program. <Accent>Never repeats itself.</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            The AI Coach generates fully individualized programming based on each member&apos;s goals, experience, equipment, and history. A beginner gets a different program than someone training for a half marathon. A member rehabbing a shoulder gets exercises that work around it.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 18, lineHeight: 1.75,
            color: mint, fontWeight: 500, margin: "0 0 32px 0",
          }}>
            When they complete a session, it logs it, tracks it, and automatically advances what comes next. Every member sees real progression over weeks and months — without a trainer writing a single program.
          </p>

          <VisualPlaceholder height={350} mobile={mobile} />
        </section>

        {/* ═══════ NUTRITION ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="Nutrition & Meal Plans" />
          <SectionDivider />
          
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : tablet ? 36 : 44,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Complete meal plans. <Accent>Logged with a photo.</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            The AI Coach builds weekly meal plans matched to each member&apos;s goals and macros — not a generic template, a real plan based on their targets. It adjusts based on what they&apos;re actually eating.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 18, lineHeight: 1.75,
            color: mint, fontWeight: 500, margin: "0 0 32px 0",
          }}>
            Members log meals by snapping a photo, texting what they ate, or scanning a label. The AI processes the meal, tracks their macros, and nudges when they fall short — all without a trainer checking a single dashboard.
          </p>

          <VisualPlaceholder height={350} mobile={mobile} />
        </section>

        {/* ═══════ CHANNELS ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="Meets Members Anywhere" />
          <SectionDivider />
          
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : tablet ? 36 : 44,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            App or text. <Accent>Same intelligence.</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            Some members open the app every morning. Others will never download anything but will respond to a text. The AI Coach works both ways — same personalization, same coaching intelligence, different channel.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 18, lineHeight: 1.75,
            color: mint, fontWeight: 500, margin: "0 0 32px 0",
          }}>
            A member texts a photo of their lunch. They get back their macro count and a suggestion for the afternoon. Another opens the app and sees their weekly dashboard. Both are being coached. Neither required a human to deliver it.
          </p>

          <VisualPlaceholder height={350} mobile={mobile} />
        </section>

        {/* ═══════ FUTURE OF MEMBER EXPERIENCE ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="The Future of Member Experience" />
          <SectionDivider />
          
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : tablet ? 36 : 44,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Your own AI for <Accent>every member.</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            The future of every great business is this: every person who walks through your doors gets their own intelligent guide. Not a chatbot. Not a FAQ page. A real AI concierge that knows them, remembers them, and is available every hour of every day.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            It goes beyond workouts and meal plans. It answers questions the moment they come up. It guides a prospect from their first inquiry to their first session. It checks in on a member who&apos;s been quiet. It recommends the next step at exactly the right moment — a new program, a nutrition challenge, an upgrade to personal training.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            Every interaction is personalized. Every touchpoint is consistent. And none of it requires a human to be available at 10pm on a Sunday.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 18, lineHeight: 1.75,
            color: mint, fontWeight: 500, margin: "0 0 32px 0",
          }}>
            This is what AI makes possible. Not replacing the experience you&apos;ve built — amplifying it. Your best version of service, delivered to everyone, all the time.
          </p>

          <VisualPlaceholder height={350} mobile={mobile} />
        </section>

        {/* ═══════ CTA ═══════ */}
        <section style={{ padding: sectionPad }}>
          <div style={{
            textAlign: "center",
            background: "rgba(13,154,165,0.06)",
            border: "1px solid rgba(13,154,165,0.2)",
            borderRadius: mobile ? 16 : 20,
            padding: mobile ? "32px 24px" : "48px 40px",
          }}>
            <h3 style={{
              fontFamily: serif,
              fontSize: mobile ? 24 : 32,
              fontWeight: 400, color: "#fff",
              margin: "0 0 16px 0",
            }}>See the AI Coach in your facility.</h3>
            <p style={{
              fontFamily: f, fontSize: mobile ? 14 : 16, lineHeight: 1.7,
              color: "rgba(255,255,255,0.6)", margin: "0 0 28px 0",
            }}>
              Book a free consultation and we&apos;ll show you exactly how the AI Coach fits your business.
            </p>
            <CTAButton mobile={mobile} />
          </div>
        </section>

      </div>
    </>
  );
}
