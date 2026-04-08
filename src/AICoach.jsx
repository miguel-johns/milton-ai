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
            <span style={{ fontFamily: f, fontSize: 12, fontWeight: 500, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>AI Coach</span>
          </div>

          <h1 style={{
            fontFamily: serif,
            fontSize: mobile ? 36 : tablet ? 52 : 64,
            fontWeight: 400, lineHeight: 1.08, color: "#fff",
            margin: "0 0 28px 0",
          }}>
            Every member, <Accent>coached</Accent> — by your AI
          </h1>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 20, lineHeight: 1.7,
            color: "rgba(255,255,255,0.6)", maxWidth: 720, margin: "0 0 24px 0",
          }}>
            Imagine dropping everything you&apos;ve built — your training philosophy, your nutrition approach, your recovery protocols, your coaching voice, your best content — into one system. And that system builds a fully personalized coaching experience for every single member who walks through your doors.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 20, lineHeight: 1.7,
            color: "rgba(255,255,255,0.6)", maxWidth: 720, margin: "0 0 40px 0",
          }}>
            That&apos;s the AI Coach. A fully autonomous, always-on coaching experience that lives on your members&apos; phones. It delivers workouts, tracks nutrition, manages recovery, sends check-ins, drips education, and monitors progress — all customized to your facility, your methods, and each individual member&apos;s goals. No trainer hours required. No limit on how many members it can serve. Your expertise, scaled to everyone.
          </p>

          <VisualPlaceholder height={mobile ? 280 : 480} label="Hero Image" mobile={mobile} />

          <div style={{ marginTop: 40 }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ YOUR LANGUAGE ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="Your Voice" />
          <SectionDivider />
          
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : tablet ? 36 : 44,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            It speaks <Accent>your language</Accent>, not ours
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            This isn&apos;t a generic chatbot giving cookie-cutter advice. Before the AI Coach ever talks to a member, it&apos;s loaded with your content — your training philosophy, your nutrition approach, your recovery protocols, your coaching style, your brand voice. When it builds a workout, it follows your programming principles. When it sends a meal suggestion, it sounds like your team. When it recommends a recovery sequence, it&apos;s pulling from your methods. When it checks in on a Monday morning, it feels like your gym.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 32px 0",
          }}>
            You upload your content once. Milton learns it. And from that point forward, every interaction your members have with the AI Coach is an extension of your facility — not some disconnected app that has nothing to do with the experience you&apos;ve built.
          </p>

          <VisualPlaceholder height={350} mobile={mobile} />

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ WORKOUTS ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="Personalized Programming" />
          <SectionDivider />
          
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : tablet ? 36 : 44,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Workouts built for each member — <Accent>automatically</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            The AI Coach builds and delivers individualized workout programming based on a member&apos;s goals, experience level, available equipment, and training history. Not a random workout of the day. Not a PDF they&apos;ll never open. A real program that progresses over time, adapts to what they&apos;ve done, and meets them where they are.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            A new member who&apos;s never touched a barbell gets a different program than someone training for a half marathon. A member rehabbing a shoulder gets exercises that work around it. A member who&apos;s been consistent for eight weeks gets progressed to the next phase. All of this happens without a trainer writing a single program.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 32px 0",
          }}>
            Members see their workout on their phone. They complete it. The AI Coach logs it, tracks their progress, and adjusts what comes next. Over weeks and months, they&apos;re building a training history that shows real progression — and they can see it.
          </p>

          <VisualPlaceholder height={350} mobile={mobile} />

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ NUTRITION ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="Nutrition Tracking" />
          <SectionDivider />
          
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : tablet ? 36 : 44,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Nutrition tracking that members <Accent>actually do</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            Members log meals by snapping a photo, texting what they ate, or scanning a food label. That&apos;s it. No searching databases. No weighing portions. No tedious manual entry that people abandon after three days.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            The AI processes the meal, breaks down the macros, and builds a running picture of how that member is eating — day over day, week over week. It celebrates consistency. It flags gaps. It nudges when someone goes quiet. And it does all of this automatically, without a trainer having to check a single dashboard.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 18, lineHeight: 1.75,
            color: mint, fontWeight: 500, margin: "0 0 32px 0",
          }}>
            For your members, it feels like having a nutrition coach in their pocket. For your business, it&apos;s a service you can charge for that costs you almost nothing to deliver.
          </p>

          <VisualPlaceholder height={350} mobile={mobile} />

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ RECOVERY ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="Complete Wellness" />
          <SectionDivider />
          
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : tablet ? 36 : 44,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Recovery, mobility, and the <Accent>full picture</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            Beyond workouts and nutrition, the AI Coach can manage a member&apos;s entire wellness experience — recovery schedules, mobility routines, contrast therapy sequences, supplement guidance, and more. All personalized. All based on what you&apos;ve built.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            A member opens their phone and sees their week laid out. Training on Monday, Wednesday, Friday. Recovery on Tuesday and Thursday — this week it&apos;s the burn sequence with cold plunge. A new recipe to try tonight based on their goals. A check-in asking how their energy&apos;s been. A one-month progress recap showing they&apos;ve logged 85% of their meals, completed every scheduled workout, and hit their protein target 20 out of 30 days.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 18, lineHeight: 1.75,
            color: mint, fontWeight: 500, margin: "0 0 32px 0",
          }}>
            That&apos;s the experience. And nobody on your staff had to build it, send it, or follow up on it.
          </p>

          <VisualPlaceholder height={350} mobile={mobile} />

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ CHANNELS ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="Meet Members Anywhere" />
          <SectionDivider />
          
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : tablet ? 36 : 44,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Meets members where they are — <Accent>text or app</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            Some members will download the app and use it every day. Others won&apos;t download anything but will respond to a text. The AI Coach works both ways. Members can log meals, log workouts, ask questions, get reminders, and receive coaching prompts over text message or through the Milton app. Same intelligence, same personalization, different channel.
          </p>

          <div style={{
            background: "rgba(13,154,165,0.08)",
            border: "1px solid rgba(13,154,165,0.2)",
            borderRadius: mobile ? 12 : 16,
            padding: mobile ? "24px" : "32px",
            margin: "0 0 24px 0",
          }}>
            <p style={{
              fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
              color: "rgba(255,255,255,0.75)", margin: 0, fontStyle: "italic",
            }}>
              A member texts a photo of their lunch. The AI Coach logs it, responds with their running macro count for the day, and reminds them they&apos;re 30g short on protein with a suggestion for an afternoon snack. Thirty seconds. No app required.
            </p>
          </div>

          <div style={{
            background: "rgba(13,154,165,0.08)",
            border: "1px solid rgba(13,154,165,0.2)",
            borderRadius: mobile ? 12 : 16,
            padding: mobile ? "24px" : "32px",
            margin: "0 0 32px 0",
          }}>
            <p style={{
              fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
              color: "rgba(255,255,255,0.75)", margin: 0, fontStyle: "italic",
            }}>
              Another member opens the app and checks their weekly dashboard — workouts completed, meals logged, recovery sessions done, progress toward their goals. They see a new message from their AI Coach with tomorrow&apos;s workout and a seasonal grocery list for the week.
            </p>
          </div>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 18, lineHeight: 1.75,
            color: mint, fontWeight: 500, margin: "0 0 32px 0", textAlign: "center",
          }}>
            Both members are getting coached. Neither required a human to deliver it.
          </p>

          <VisualPlaceholder height={350} mobile={mobile} />

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ NEW REVENUE ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="New Revenue Stream" />
          <SectionDivider />
          
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : tablet ? 36 : 44,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            A new membership tier you <Accent>couldn&apos;t offer before</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            The AI Coach creates a revenue layer that didn&apos;t exist until now. Members who would never pay for personal training will pay for a lower-ticket coaching membership — one that gives them personalized workouts, nutrition tracking, recovery programming, and weekly check-ins, all delivered by AI.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            It sits between your base gym membership and your premium PT packages. Affordable enough that most members say yes. Valuable enough that they stay longer. And it costs you almost nothing to deliver because the AI does the work.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 32px 0",
          }}>
            The members who love it become your easiest upsell into human coaching. The ones who stay at this tier are still generating revenue they never would have before — and they&apos;re more engaged, more consistent, and far less likely to cancel.
          </p>

          <VisualPlaceholder height={350} mobile={mobile} />

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ DATA FLOWS BACK ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="Connected System" />
          <SectionDivider />
          
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : tablet ? 36 : 44,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Data flows back to your <Accent>trainers and directors</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            Even though the AI Coach runs autonomously, nothing happens in a vacuum. Every workout completed, every meal logged, every recovery session tracked — it all feeds back into Milton&apos;s connected system. If a member also works with a human trainer, that trainer sees everything in their Coach Co-Pilot. If your fitness director wants a facility-wide view of engagement, training adherence, and nutrition data, it&apos;s there in the Director Co-Pilot.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 32px 0",
          }}>
            The AI Coach doesn&apos;t compete with your trainers. It feeds them. Members who start with the AI Coach and see results become your easiest upsell into personal training. And trainers who can see a member&apos;s workout history and nutrition data before they ever meet them can coach smarter from session one.
          </p>

          <VisualPlaceholder height={350} mobile={mobile} />

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ CLOSING ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="Scale Your Expertise" />
          <SectionDivider />
          
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : tablet ? 36 : 44,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Your content. Your members. <Accent>Your revenue.</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            The AI Coach is the most scalable thing you can deploy in your facility. One setup. Your content loaded once. And from that point forward, every member — whether they&apos;re paying for training or not — gets a personalized, intelligent coaching experience that keeps them engaged, accountable, and coming back.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 18, lineHeight: 1.75,
            color: mint, fontWeight: 500, margin: "0 0 32px 0",
          }}>
            No new hires. No additional trainer hours. No burnout. Just better outcomes for more members and a new line of revenue that didn&apos;t exist before.
          </p>

          <VisualPlaceholder height={350} mobile={mobile} />

          <div style={{
            marginTop: 48,
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
            }}>Ready to see it in action?</h3>
            <p style={{
              fontFamily: f, fontSize: mobile ? 14 : 16, lineHeight: 1.7,
              color: "rgba(255,255,255,0.6)", margin: "0 0 28px 0",
            }}>
              Book a free AI consultation and we&apos;ll show you exactly how the AI Coach fits your business.
            </p>
            <CTAButton mobile={mobile} />
          </div>
        </section>

      </div>
    </>
  );
}
