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
        fontFamily: f, fontSize: mobile ? 16 : 18,
        fontWeight: 600, color: "#fff",
        margin: "0 0 12px 0",
      }}>{title}</h4>
      <p style={{
        fontFamily: f, fontSize: mobile ? 14 : 15,
        lineHeight: 1.7, color: "rgba(255,255,255,0.6)",
        margin: 0,
      }}>{body}</p>
      <div style={{ marginTop: mobile ? 16 : 20 }}>
        <VisualPlaceholder height={180} mobile={mobile} />
      </div>
    </div>
  );
}

export default function CoachCoPilot() {
  const { mobile, tablet } = useBreakpoint();
  const px = mobile ? 20 : tablet ? 32 : 40;
  const sectionPad = mobile ? "48px 0" : "72px 0";

  const features = [
    { title: "Workout Builder", body: "Build and assign programs with AI-assisted exercise selection based on your client's goals, history, and equipment access. Or build from scratch. Your programming, your philosophy — Milton just makes it faster." },
    { title: "Nutrition Tracking", body: "See what your clients are eating without making them switch apps. Data flows in from MyFitnessPal, Cronometer, and others. Set macros, track adherence, and flag gaps — all from one dashboard." },
    { title: "Calendar & Scheduling", body: "Your schedule, your clients' bookings, and your availability in one view. No more double-booking. No more back-and-forth texts to find a time." },
    { title: "Inbox", body: "Every client conversation in one place. Text threads, in-app messages, and follow-ups organized by client — not scattered across your personal phone." },
    { title: "Video Calls", body: "Remote sessions and check-ins built right into the platform. No Zoom links. No switching apps. Your client's data is on screen while you're talking to them." },
    { title: "Goals & Macros", body: "Set targets collaboratively with clients. Milton tracks progress toward those targets and surfaces when someone is on pace, ahead, or falling behind — so you can step in before things go sideways." },
  ];

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
            <span style={{ fontFamily: f, fontSize: 12, fontWeight: 500, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>Coach Co-Pilot</span>
          </div>

          <h1 style={{
            fontFamily: serif,
            fontSize: mobile ? 36 : tablet ? 52 : 64,
            fontWeight: 400, lineHeight: 1.08, color: "#fff",
            margin: "0 0 28px 0",
          }}>
            AI designed to <Accent>embrace you</Accent> — not replace you
          </h1>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 20, lineHeight: 1.7,
            color: "rgba(255,255,255,0.6)", maxWidth: 720, margin: "0 0 40px 0",
          }}>
            This is what AI for coaches should actually look like. Not a robot that writes generic programs. Not a chatbot pretending to understand your client&apos;s bad knee. Not another app that promises to &quot;automate your coaching&quot; while stripping out everything that makes your coaching yours.
          </p>

          <VisualPlaceholder height={mobile ? 280 : 480} label="Dashboard overview — unified client profile with data flowing from wearables, nutrition apps, body scans into one clean screen" mobile={mobile} />

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
            The Coach Co-Pilot is AI built around your life. It handles the parts of coaching that slow you down — tracking, organizing, reporting, scheduling, follow-ups — so you can spend more time doing the part that actually changes lives: coaching.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            Your clients&apos; data from wearables, nutrition apps, equipment, and body scans all flow into one place. AI turns that data into visual progress reports your clients can actually understand. And you can coach from that progress in real time — over text, in-app, or in person — with everything you need right in front of you.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 17 : 20, lineHeight: 1.75,
            color: mint, fontWeight: 500, margin: 0,
          }}>
            One system. Everything connected. Built around the way you already work.
          </p>
        </section>

        {/* ═══════ TRACKING ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="Effortless Tracking" />
          <SectionDivider />
          
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : tablet ? 36 : 44,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Tracking that finally stays <Accent>out of your way</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            You&apos;ve tried the apps. You&apos;ve tried the spreadsheets. You&apos;ve tried asking clients to log things themselves. The problem was never your discipline — it was that every tool you&apos;ve used made tracking feel like a second job on top of the job you already have.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            The Co-Pilot changes this. Workouts log as they happen — through connected equipment, wearable data, or quick input during a session. Nutrition data pulls in from the apps your clients already use. Body composition, sleep, steps, recovery — it all arrives in one place without you copying and pasting from six different screens.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 32px 0",
          }}>
            You open a client&apos;s profile and it&apos;s just there. What they did. What they ate. How they slept. How they&apos;ve been trending. No digging. No asking. No guessing.
          </p>

          <VisualPlaceholder height={350} mobile={mobile} />

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "32px 0 32px 0",
          }}>
            And it&apos;s just as easy for your clients. They connect once — through the Milton app, a text link, or a portal invite — and their data starts flowing. They don&apos;t have to change a single habit. They keep using the wearable they already wear and the nutrition app they already log in. Milton just brings it all together for both of you.
          </p>

          <VisualPlaceholder height={350} mobile={mobile} />

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ PROGRESS ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="Visual Progress" />
          <SectionDivider />
          
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : tablet ? 36 : 44,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Progress becomes <Accent>visual</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            Progress is happening all the time, but most of it is invisible. A client&apos;s squat went from 95 to 135 over eight weeks, but neither of you can remember exactly when the jumps happened. Their body fat dropped 3% but they&apos;re frustrated because the scale barely moved. They&apos;ve been consistent for six straight weeks and don&apos;t even realize that&apos;s the longest streak they&apos;ve ever had.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 32px 0",
          }}>
            The Co-Pilot makes all of this visible — automatically. AI-powered reports turn raw data into progress charts, milestone markers, trend lines, and streak tracking. You didn&apos;t have to build a report. You didn&apos;t have to screenshot a graph. Milton generates it from the data that&apos;s already flowing in, and it&apos;s ready to share with a tap.
          </p>

          <VisualPlaceholder height={350} mobile={mobile} />

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "32px 0 32px 0",
          }}>
            This is where coaching gets powerful. Not because you have more data, but because the right data shows up at the right time and you can use it to do what you do best — motivate, adjust, and guide.
          </p>

          <VisualPlaceholder height={350} mobile={mobile} />

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ COACH FROM DATA ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="Data-Driven Coaching" />
          <SectionDivider />
          
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : tablet ? 36 : 44,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Coach from data, <Accent>whenever and wherever</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            In person between sets. Over text at 8pm. On a video call with a remote client. On the phone with someone who just needs five minutes of direction. It doesn&apos;t matter where or how you&apos;re coaching — the Co-Pilot puts every insight you need within reach the moment you need it.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 32px 0",
          }}>
            Just ask Milton. Pull up a client&apos;s strength trends mid-session to show them how far they&apos;ve come. Check their nutrition consistency before a check-in call. Glance at their sleep and recovery data while you&apos;re texting them back about tomorrow&apos;s workout. It&apos;s all there — on demand, in context, ready to use.
          </p>

          <VisualPlaceholder height={350} mobile={mobile} />

          <div style={{
            background: "rgba(13,154,165,0.08)",
            border: "1px solid rgba(13,154,165,0.2)",
            borderRadius: mobile ? 12 : 16,
            padding: mobile ? "24px" : "32px",
            margin: "32px 0",
          }}>
            <p style={{
              fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
              color: "rgba(255,255,255,0.75)", margin: "0 0 16px 0", fontStyle: "italic",
            }}>
              A client texts you at 8pm saying they&apos;re thinking about skipping tomorrow. You ask Milton for their latest trends — four weeks consistent, strength numbers climbing. You share the progress and a message: &quot;Look at this streak. Don&apos;t break it now.&quot; That&apos;s coaching. And it took you 30 seconds.
            </p>
          </div>

          <VisualPlaceholder height={350} mobile={mobile} />

          <div style={{
            background: "rgba(13,154,165,0.08)",
            border: "1px solid rgba(13,154,165,0.2)",
            borderRadius: mobile ? 12 : 16,
            padding: mobile ? "24px" : "32px",
            margin: "32px 0",
          }}>
            <p style={{
              fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
              color: "rgba(255,255,255,0.75)", margin: "0 0 16px 0", fontStyle: "italic",
            }}>
              A remote client jumps on a video call feeling discouraged. You pull up their report while you&apos;re talking — body fat is down, lean mass is up, and they&apos;ve hit a new PR they forgot about. You show them. The whole conversation shifts.
            </p>
            <p style={{
              fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
              color: "rgba(255,255,255,0.75)", margin: 0, fontStyle: "italic",
            }}>
              A client finishes a set and asks if they&apos;re actually getting stronger. You don&apos;t have to think back or check a notebook. You ask Milton, turn your screen around, and show them the curve. That moment lands differently when the data is right there.
            </p>
          </div>

          <VisualPlaceholder height={350} mobile={mobile} />

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 18, lineHeight: 1.75,
            color: mint, fontWeight: 500, margin: "32px 0 0 0", textAlign: "center",
          }}>
            The coaching happens everywhere. Milton just makes sure the insights are already waiting for you.
          </p>

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ FEATURES ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="Everything Else" />
          <SectionDivider />
          
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : tablet ? 36 : 44,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            AI makes everything else <Accent>easier too</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 32px 0",
          }}>
            Once tracking is effortless, progress is visual, and coaching from data is second nature — the Co-Pilot keeps working behind the scenes. Not adding complexity. Removing it. Making the rest of your coaching life more seamless.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)",
            gap: mobile ? 16 : 20,
          }}>
            {features.map((feature, i) => (
              <FeatureCard key={i} title={feature.title} body={feature.body} mobile={mobile} />
            ))}
          </div>

          <div style={{ marginTop: 48, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ CLOSING ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="The New World For Coaches" />
          <SectionDivider />
          
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : tablet ? 36 : 44,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            This is the new world <Accent>for coaches</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            Not more apps. Not more tabs. Not more things to remember. One AI-powered system built around your life — making tracking seamless, progress visible, communication effortless, and everything in between a little easier than it was yesterday.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 32px 0",
          }}>
            You&apos;re still the coach. You&apos;re still the one who knows when to push and when to listen. Milton just makes sure nothing falls through the cracks.
          </p>

          <VisualPlaceholder height={400} mobile={mobile} />
        </section>

        {/* ═══════ CTA ═══════ */}
        <section style={{ 
          padding: mobile ? "48px 0 80px" : "64px 0 120px",
        }}>
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: mobile ? 16 : 20,
            padding: mobile ? "28px 24px" : "36px 32px",
            textAlign: "center",
          }}>
            <h3 style={{
              fontFamily: serif,
              fontSize: mobile ? 24 : 32,
              fontWeight: 400, color: "#fff",
              margin: "0 0 12px 0",
            }}>Ready to see it in action?</h3>
            
            <p style={{
              fontFamily: f,
              fontSize: mobile ? 14 : 16,
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.6)",
              margin: "0 0 24px 0",
            }}>
              Book a free AI Strategy Session and we&apos;ll show you exactly how the Coach Co-Pilot fits your business.
            </p>
            
            <CTAButton mobile={mobile} />
          </div>
        </section>

      </div>
    </>
  );
}
