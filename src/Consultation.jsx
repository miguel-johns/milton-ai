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
const navy = "#08455e";
const red = "#e85454";
const warn = "#f0a030";

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

// Floating buzzword for the noise cloud
function NoiseBuzzword({ text, opacity = 0.3, size = 13, x, y, mobile }) {
  if (mobile) return null;
  return (
    <span style={{
      position: "absolute", left: x, top: y,
      fontFamily: f, fontSize: size, fontWeight: 500,
      color: `rgba(255,255,255,${opacity})`,
      letterSpacing: 0.5, whiteSpace: "nowrap",
      pointerEvents: "none",
    }}>{text}</span>
  );
}

export default function AIConsultation() {
  const { mobile, tablet } = useBreakpoint();
  const px = mobile ? 20 : tablet ? 32 : 40;
  const sectionPad = mobile ? "72px 0" : "100px 0";

  const Headline = ({ children, style = {} }) => (
    <h2 style={{
      fontFamily: serif,
      fontSize: mobile ? 30 : tablet ? 42 : 52,
      fontWeight: 400, lineHeight: 1.15, color: "#fff",
      margin: "0 0 20px 0", ...style,
    }}>{children}</h2>
  );

  const Body = ({ children, style = {} }) => (
    <p style={{
      fontFamily: f, fontSize: mobile ? 15 : 17,
      lineHeight: 1.75, color: "rgba(255,255,255,0.55)",
      maxWidth: 640, margin: "0 0 40px 0", ...style,
    }}>{children}</p>
  );

  const glass = {
    background: "linear-gradient(145deg, rgba(13,154,165,0.07) 0%, rgba(6,28,39,0.4) 100%)",
    border: "1px solid rgba(13,154,165,0.16)",
    backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#061c27", color: "#fff", position: "relative", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap" rel="stylesheet" />

      {/* Aurora */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: "radial-gradient(ellipse 80% 50% at 20% 20%, rgba(13,154,165,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(154,241,152,0.04) 0%, transparent 50%), radial-gradient(ellipse 90% 60% at 50% 0%, rgba(8,69,94,0.3) 0%, transparent 70%)" }} />

      {/* Nav */}
      <nav style={{
        padding: mobile ? "12px 16px" : "16px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid rgba(13,154,165,0.08)", position: "relative", zIndex: 10,
      }}>
        <a href="#/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Milton%20Face%20Logo-whMWzOXBgBgulGUqdRthSEMsjeyWPe.png"
            alt="Milton Logo"
            style={{ width: mobile ? 36 : 44, height: mobile ? 36 : 44, borderRadius: 8, objectFit: "cover" }}
          />
          <span style={{ fontFamily: f, fontWeight: 700, fontSize: mobile ? 16 : 20, color: "#fff", letterSpacing: 2 }}>MILTON</span>
        </a>
        <div style={{ display: "flex", gap: 10 }}>
          <a href="#/" style={{ fontFamily: f, fontSize: 14, fontWeight: 600, padding: "10px 24px", borderRadius: 100, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", textDecoration: "none" }}>← Back</a>
          <a href="#/pricing" style={{ fontFamily: f, fontSize: 14, fontWeight: 600, padding: "10px 24px", borderRadius: 100, background: "#fff", color: navy, border: "none", cursor: "pointer", textDecoration: "none" }}>Get Pricing</a>
        </div>
      </nav>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1000, margin: "0 auto", padding: `0 ${px}px` }}>

        {/* ═══════ HERO ═══════ */}
        <section style={{ padding: mobile ? "52px 0 40px" : "88px 0 60px", textAlign: "center" }}>

          <h1 style={{
            fontFamily: serif,
            fontSize: mobile ? 34 : tablet ? 48 : 60,
            fontWeight: 400, lineHeight: 1.12, color: "#fff",
            margin: "16px 0 20px 0", maxWidth: 800, marginLeft: "auto", marginRight: "auto",
          }}>
            AI is changing personal training. Most of what you're hearing is <Accent>noise</Accent>.
          </h1>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.65,
            color: "rgba(255,255,255,0.5)", maxWidth: 600, margin: "0 auto 36px auto",
          }}>
            Every week there's a new AI tool promising to transform your gym. AI receptionists. AI workout builders. AI marketing. AI everything. But nobody's telling you what actually matters for your business, in what order, and what to ignore.
          </p>

          <p style={{
            fontFamily: serif, fontSize: mobile ? 22 : 28,
            fontStyle: "italic", color: "rgba(255,255,255,0.75)",
            margin: "0 auto 40px auto",
          }}>We will.</p>

          <button style={{
            fontFamily: f, fontSize: mobile ? 15 : 16, fontWeight: 700,
            padding: mobile ? "14px 36px" : "16px 48px",
            borderRadius: 100, border: "none", cursor: "pointer",
            background: `linear-gradient(135deg, ${teal}, #126b80)`,
            color: "#fff", letterSpacing: 0.3,
            boxShadow: `0 8px 32px ${teal}30, 0 0 60px ${teal}10`,
          }}>Book Your Free Consultation</button>
        </section>

        {/* ═══════ THE NOISE ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="THE NOISE" />
          <SectionDivider />

          <Headline>You're being <Accent>pitched</Accent> from every direction.</Headline>

          <Body>
            Since the AI wave hit fitness, the average gym owner has been approached by countless vendors selling AI-powered everything. Some of it's real. Most of it's not ready. And none of them are telling you the full picture — because they're all selling their one thing.
          </Body>

          {/* Noise cloud visualization */}
          <div style={{
            position: "relative", width: "100%",
            height: mobile ? "auto" : 320,
            marginBottom: mobile ? 32 : 48,
            overflow: "hidden",
          }}>
            {mobile ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[
                  { t: "AI Receptionist", o: 0.6 }, { t: "AI Workout Generator", o: 0.35 },
                  { t: "AI Nutrition Coach", o: 0.5 }, { t: "AI Marketing", o: 0.25 },
                  { t: "AI Scheduling", o: 0.4 }, { t: "AI Member Engagement", o: 0.3 },
                  { t: "AI Sales Assistant", o: 0.55 }, { t: "AI Retention Predictor", o: 0.2 },
                  { t: "AI Content Creator", o: 0.45 }, { t: "AI Lead Scoring", o: 0.3 },
                  { t: "AI Billing", o: 0.2 }, { t: "AI Chat Support", o: 0.35 },
                ].map((b, i) => (
                  <span key={i} style={{
                    fontFamily: f, fontSize: 12, fontWeight: 500, color: `rgba(255,255,255,${b.o})`,
                    border: `1px solid rgba(255,255,255,${b.o * 0.3})`,
                    borderRadius: 100, padding: "6px 14px",
                    background: `rgba(255,255,255,${b.o * 0.03})`,
                  }}>{b.t}</span>
                ))}
              </div>
            ) : (
              <div style={{ position: "relative", width: "100%", height: "100%" }}>
                {/* Scattered buzzwords at different sizes, positions, opacities */}
                {[
                  { t: "AI Receptionist", x: "5%", y: "10%", s: 18, o: 0.5 },
                  { t: "AI Workout Generator", x: "55%", y: "5%", s: 16, o: 0.35 },
                  { t: "AI Nutrition Coach", x: "30%", y: "30%", s: 20, o: 0.55 },
                  { t: "AI Marketing", x: "72%", y: "25%", s: 15, o: 0.25 },
                  { t: "AI Scheduling", x: "10%", y: "55%", s: 14, o: 0.3 },
                  { t: "AI Member Engagement", x: "40%", y: "60%", s: 17, o: 0.4 },
                  { t: "AI Sales Assistant", x: "65%", y: "50%", s: 19, o: 0.5 },
                  { t: "AI Retention Predictor", x: "20%", y: "78%", s: 13, o: 0.2 },
                  { t: "AI Content Creator", x: "75%", y: "75%", s: 15, o: 0.35 },
                  { t: "AI Lead Scoring", x: "48%", y: "85%", s: 12, o: 0.2 },
                  { t: "AI Billing Automation", x: "3%", y: "35%", s: 13, o: 0.22 },
                  { t: "AI Chat Support", x: "82%", y: "8%", s: 14, o: 0.28 },
                  { t: "AI Onboarding", x: "50%", y: "42%", s: 12, o: 0.18 },
                  { t: "AI Performance Analytics", x: "15%", y: "90%", s: 14, o: 0.3 },
                  { t: "AI Virtual Trainer", x: "85%", y: "60%", s: 16, o: 0.4 },
                ].map((b, i) => (
                  <span key={i} style={{
                    position: "absolute", left: b.x, top: b.y,
                    fontFamily: f, fontSize: b.s, fontWeight: 500,
                    color: `rgba(255,255,255,${b.o})`,
                    whiteSpace: "nowrap", pointerEvents: "none",
                  }}>{b.t}</span>
                ))}
                {/* Center highlight: the question */}
                <div style={{
                  position: "absolute", left: "50%", top: "50%",
                  transform: "translate(-50%, -50%)",
                  fontFamily: serif, fontSize: 24, fontStyle: "italic",
                  color: teal, textAlign: "center",
                  textShadow: `0 0 40px ${teal}30`,
                  zIndex: 2,
                }}>Which ones actually<br />matter for you?</div>
              </div>
            )}
          </div>

          {/* Pain amplifier cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr",
            gap: mobile ? 14 : 20,
          }}>
            {[
              { icon: "💸", title: "Wrong tool, real cost", body: "The average failed software implementation costs a small business $10K+ in wasted spend, training time, and team morale." },
              { icon: "😩", title: "Change fatigue is real", body: "Your trainers are already stretched thin. Every new tool you ask them to adopt is a withdrawal from a very limited trust account." },
              { icon: "⏳", title: "The window is closing", body: "Early adopters in your market are already implementing. The gyms that figure this out first will have a compounding advantage." },
            ].map((card, i) => (
              <div key={i} style={{
                ...glass, borderRadius: mobile ? 16 : 20,
                padding: mobile ? 22 : 28,
              }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{card.icon}</div>
                <div style={{ fontFamily: f, fontSize: mobile ? 16 : 17, fontWeight: 600, color: "#fff", marginBottom: 8 }}>{card.title}</div>
                <div style={{ fontFamily: f, fontSize: mobile ? 13 : 14, lineHeight: 1.65, color: "rgba(255,255,255,0.45)" }}>{card.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════ WHY US ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="YOUR AI EXPERTS" />
          <SectionDivider />

          <Headline>We've been in the <Accent>trenches</Accent> — not just the pitch deck.</Headline>

          <Body>
            Milton AI was built from inside the personal training business. Our founder was a personal trainer. Our product was shaped shoulder-to-shoulder with gym owners who've been hiring, training, and retaining coaches for decades. We've sat in the spreadsheets. We've heard the pain firsthand.
          </Body>

          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr",
            gap: mobile ? 14 : 20,
          }}>
            {[
              {
                icon: "🏋️", title: "Built from the training floor",
                body: "Our founder was a personal trainer before becoming a technologist. Milton wasn't designed from a whiteboard — it was built from real coaching workflows, real trainer pain, and real gym operations.",
              },
              {
                icon: "🎤", title: "HFA 2026 — we saw it all",
                body: "We exhibited, presented, and walked the floor at the largest fitness industry conference in the country. We talked to hundreds of gym owners and every AI vendor in the space. We know the landscape.",
              },
              {
                icon: "🤝", title: "Real gym partnerships",
                body: "We work shoulder-to-shoulder with gym owners who've been in the business for decades. Our insights come from real operations — not assumptions about how gyms should work.",
              },
            ].map((card, i) => (
              <div key={i} style={{
                ...glass, borderRadius: mobile ? 16 : 20,
                padding: mobile ? 22 : 28,
              }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{card.icon}</div>
                <div style={{ fontFamily: f, fontSize: mobile ? 16 : 17, fontWeight: 600, color: "#fff", marginBottom: 8 }}>{card.title}</div>
                <div style={{ fontFamily: f, fontSize: mobile ? 13 : 14, lineHeight: 1.65, color: "rgba(255,255,255,0.45)" }}>{card.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════ THE CONSULTATION ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="THE CONSULTATION" />
          <SectionDivider />

          <Headline>30 minutes. Zero sales pressure. A clear <Accent>roadmap</Accent>.</Headline>

          <Body>
            This isn't a demo disguised as a consultation. It's a real conversation about your business, your team, and where AI can actually move the needle for you — and where it can't.
          </Body>

          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
            gap: mobile ? 14 : 20,
          }}>
            {[
              {
                num: "01", title: "Your current setup",
                body: "How many trainers, what software you're running, how you manage scheduling, follow-ups, client retention, and trainer development today. We meet you where you are.",
              },
              {
                num: "02", title: "Where AI actually helps right now",
                body: "Not theoretical. Not 'in 2 years.' We'll tell you which areas — coaching, operations, member experience, sales — can benefit from AI today, based on what we've seen working in real gyms.",
              },
              {
                num: "03", title: "What to ignore",
                body: "Just as important as what to do. We'll tell you which tools aren't ready, which categories are overhyped, and where your money is better spent on people instead of software.",
              },
              {
                num: "04", title: "The right order",
                body: "Even the right tools in the wrong order create chaos. We'll help you prioritize based on your team's capacity, your biggest pain points, and where the ROI hits fastest.",
              },
            ].map((step, i) => (
              <div key={i} style={{
                ...glass, borderRadius: mobile ? 16 : 20,
                padding: mobile ? 24 : 32,
                display: "flex", flexDirection: "column", gap: 12,
              }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 36, height: 36, borderRadius: "50%",
                  background: `${teal}15`, border: `1px solid ${teal}30`,
                  fontFamily: f, fontSize: 14, fontWeight: 700, color: teal,
                }}>{step.num}</div>
                <div style={{ fontFamily: f, fontSize: mobile ? 17 : 19, fontWeight: 600, color: "#fff" }}>{step.title}</div>
                <div style={{ fontFamily: f, fontSize: mobile ? 13 : 14, lineHeight: 1.7, color: "rgba(255,255,255,0.45)" }}>{step.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════ THE DELIVERABLE ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="WHAT YOU WALK AWAY WITH" />
          <SectionDivider />

          <Headline>Your personalized <Accent>AI Readiness Snapshot</Accent>.</Headline>

          <Body>
            Within a few days of our call, you'll receive a focused, one-page breakdown built specifically for your business. Not a generic whitepaper. Not a sales deck. A clear-eyed assessment of where AI fits for you.
          </Body>

          {/* Snapshot preview card */}
          <div style={{
            background: `linear-gradient(145deg, ${teal}08, rgba(6,28,39,0.5))`,
            border: `1px solid ${teal}22`,
            borderRadius: mobile ? 20 : 28,
            padding: mobile ? "28px 22px" : "44px 48px",
            boxShadow: `0 20px 60px rgba(0,0,0,0.25), 0 0 60px ${teal}04`,
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: 1, background: `linear-gradient(90deg, transparent, ${teal}30, transparent)` }} />

            <div style={{ fontFamily: f, fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: `${teal}80`, marginBottom: 24 }}>AI READINESS SNAPSHOT — PREVIEW</div>

            <div style={{ display: "flex", flexDirection: "column", gap: mobile ? 20 : 24 }}>
              {[
                {
                  icon: "🎯", title: "Where AI fits today — for you specifically",
                  body: "Based on your team size, current tools, and pain points, we'll map exactly which areas of your business are ready for AI — and which aren't.",
                  color: teal,
                },
                {
                  icon: "⚡", title: "What to prioritize first",
                  body: "The one or two moves that will have the biggest impact with the least disruption. What to do this quarter, not this decade.",
                  color: mint,
                },
                {
                  icon: "🚫", title: "What to skip",
                  body: "Honest recommendations on what to avoid, what's not ready yet, and where the industry is overpromising. This alone could save you thousands.",
                  color: warn,
                },
                {
                  icon: "→", title: "Your clear next step",
                  body: "Whether that's implementing Milton, evaluating another tool, or simply waiting until your team is ready. No pressure. Just clarity.",
                  color: "rgba(255,255,255,0.7)",
                },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", gap: mobile ? 14 : 18,
                  alignItems: "flex-start",
                  paddingBottom: i < 3 ? (mobile ? 20 : 24) : 0,
                  borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none",
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                    background: `${typeof item.color === "string" && item.color.startsWith("#") ? item.color : "rgba(255,255,255,0.1)"}10`,
                    border: `1px solid ${typeof item.color === "string" && item.color.startsWith("#") ? item.color : "rgba(255,255,255,0.1)"}20`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18,
                  }}>{item.icon}</div>
                  <div>
                    <div style={{ fontFamily: f, fontSize: mobile ? 15 : 17, fontWeight: 600, color: "#fff", marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontFamily: f, fontSize: mobile ? 13 : 14, lineHeight: 1.65, color: "rgba(255,255,255,0.45)" }}>{item.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ WHO THIS IS FOR ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="IS THIS FOR YOU?" />
          <SectionDivider />

          <Headline>This consultation is for you if...</Headline>

          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
            gap: mobile ? 10 : 14,
            marginTop: 8,
          }}>
            {[
              "You own or manage a personal training business with 3+ trainers",
              "You keep hearing about AI but don't know where to start",
              "You've been pitched AI tools and aren't sure which ones are real",
              "You're managing trainers with spreadsheets, gut instinct, or clunky software",
              "You want to modernize but can't afford to waste time on the wrong tools",
              "You're a fitness director drowning in admin who knows there has to be a better way",
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: 14,
                padding: mobile ? "14px 16px" : "18px 22px",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: 14,
              }}>
                <span style={{
                  color: teal, fontSize: 16, flexShrink: 0, marginTop: 1,
                  filter: `drop-shadow(0 0 4px ${teal}40)`,
                }}>✓</span>
                <span style={{ fontFamily: f, fontSize: mobile ? 14 : 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.55 }}>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════ SOCIAL PROOF ═══════ */}
        <section style={{ padding: sectionPad }}>
          <div style={{
            background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: mobile ? 20 : 28, padding: mobile ? "36px 24px" : "52px 56px",
          }}>
            <div style={{ fontFamily: f, fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 20 }}>TRUSTED BY OPERATORS WHO'VE SEEN IT ALL</div>

            <div style={{
              fontFamily: serif, fontSize: mobile ? 20 : 26,
              fontStyle: "italic", color: "rgba(255,255,255,0.65)",
              lineHeight: 1.55, marginBottom: 24, maxWidth: 600,
            }}>
              "I feel like you understand exactly what I'm saying. And then boom — less than a week later, there it is. That's not the case with most software people."
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: `linear-gradient(135deg, ${teal}30, ${navy})`,
                border: `1px solid ${teal}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: f, fontSize: 14, fontWeight: 700, color: "#fff",
              }}>BL</div>
              <div>
                <div style={{ fontFamily: f, fontSize: 14, fontWeight: 600, color: "#fff" }}>Bethany Langston</div>
                <div style={{ fontFamily: f, fontSize: 12, color: "rgba(255,255,255,0.35)" }}>Owner & Fitness Director · Optimal Performance, Wichita KS</div>
              </div>
            </div>

            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: `${teal}10`, border: `1px solid ${teal}20`,
              borderRadius: 100, padding: "8px 18px",
            }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: teal }} />
              <span style={{ fontFamily: f, fontSize: 12, fontWeight: 600, color: teal, letterSpacing: 0.5 }}>HFA 2026 — Innovation Alley Exhibitor & Presenter</span>
            </div>
          </div>
        </section>

        {/* ═══════ FINAL CTA ═══════ */}
        <section style={{ padding: mobile ? "60px 0 80px" : "80px 0 120px", textAlign: "center" }}>
          <Headline style={{ margin: "0 auto 16px auto", maxWidth: 700, textAlign: "center" }}>
            Cut through the noise. Book your free <Accent>AI Consultation</Accent>.
          </Headline>

          <p style={{
            fontFamily: f, fontSize: mobile ? 14 : 17, lineHeight: 1.65,
            color: "rgba(255,255,255,0.45)", maxWidth: 560,
            margin: "0 auto 36px auto",
          }}>
            30 minutes with someone who's been in your shoes — as a trainer, a gym partner, and now the team building AI specifically for this industry. No pitch. No pressure. Just clarity.
          </p>

          <button style={{
            fontFamily: f, fontSize: mobile ? 16 : 18, fontWeight: 700,
            padding: mobile ? "16px 40px" : "18px 56px",
            borderRadius: 100, border: "none", cursor: "pointer",
            background: `linear-gradient(135deg, ${teal}, #126b80)`,
            color: "#fff", letterSpacing: 0.3,
            boxShadow: `0 8px 32px ${teal}30, 0 0 60px ${teal}10`,
            marginBottom: 20,
          }}>Book Your Free Consultation →</button>

          <p style={{
            fontFamily: f, fontSize: 12, color: "rgba(255,255,255,0.2)",
            maxWidth: 480, margin: "0 auto", lineHeight: 1.6,
          }}>
            Available for personal training businesses with 3+ trainers. Consultations are conducted via Zoom and typically last 30 minutes. Your AI Readiness Snapshot will be delivered within 3–5 business days.
          </p>
        </section>
      </div>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid rgba(13,154,165,0.08)", padding: mobile ? "24px 20px" : "32px 40px",
        display: "flex", justifyContent: "center", position: "relative", zIndex: 1,
      }}>
        <span style={{ fontFamily: f, fontSize: 13, color: "rgba(255,255,255,0.25)" }}>© 2026 MMNT Inc. All rights reserved.</span>
      </footer>
    </div>
  );
}
