"use client";

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

function VisualPlaceholder({ height = 280, mobileHeight, label = "", style = {} }) {
  const { mobile } = useBreakpoint();
  return (
    <div style={{
      height: mobile ? (mobileHeight || Math.min(height, 200)) : height,
      borderRadius: mobile ? 12 : 16,
      border: "1px solid rgba(13,154,165,0.25)",
      background: "linear-gradient(135deg, rgba(13,154,165,0.08) 0%, rgba(8,69,94,0.12) 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "rgba(154,241,152,0.5)", fontSize: mobile ? 11 : 13,
      fontFamily: f, letterSpacing: 2, textTransform: "uppercase",
      position: "relative", overflow: "hidden", ...style,
    }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 30% 40%, rgba(13,154,165,0.12) 0%, transparent 60%)" }} />
      <span style={{ position: "relative", zIndex: 1 }}>{label || "Visual Here"}</span>
    </div>
  );
}

export default function AboutPage() {
  const { mobile, tablet } = useBreakpoint();
  const px = mobile ? 20 : tablet ? 32 : 40;
  const sectionPad = mobile ? "72px 0" : "100px 0";

  const glass = {
    background: "linear-gradient(145deg, rgba(13,154,165,0.07) 0%, rgba(6,28,39,0.4) 100%)",
    border: "1px solid rgba(13,154,165,0.16)",
    backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)",
  };

  const Headline = ({ children, style = {} }) => (
    <h2 style={{
      fontFamily: serif, fontSize: mobile ? 30 : tablet ? 42 : 52,
      fontWeight: 400, lineHeight: 1.15, color: "#fff",
      margin: "0 0 20px 0", ...style,
    }}>{children}</h2>
  );

  return (
    <>
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1000, margin: "0 auto", padding: `0 ${px}px` }}>

        {/* ═══════ HERO ═══════ */}
        <section style={{
          minHeight: mobile ? "auto" : "80vh",
          display: "flex", flexDirection: "column", justifyContent: "center",
          textAlign: "center",
          padding: mobile ? "64px 0 48px" : "100px 0 80px",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 100, padding: mobile ? "6px 16px" : "8px 20px",
            margin: "0 auto 32px auto",
          }}>
            <span style={{ fontFamily: f, fontSize: mobile ? 12 : 14, color: "rgba(255,255,255,0.7)" }}>About Milton AI</span>
          </div>

          <h1 style={{
            fontFamily: serif,
            fontSize: mobile ? 36 : tablet ? 52 : 68,
            fontWeight: 400, lineHeight: 1.08, color: "#fff",
            margin: "0 auto 28px auto", maxWidth: 900,
          }}>
            Empowering the humans on the front lines of the global <Accent>metabolic health crisis</Accent>.
          </h1>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 19, lineHeight: 1.65,
            color: "rgba(255,255,255,0.5)", maxWidth: 620, margin: "0 auto 40px auto",
          }}>
            700 million people live with obesity. 500 million with diabetes. The real frontline isn't hospitals — it's the coaches who show up every morning to change lives one session at a time.
          </p>

          <div style={{
            background: `${teal}0a`, border: `1px solid ${teal}20`,
            borderRadius: mobile ? 16 : 20, padding: mobile ? "20px 22px" : "28px 40px",
            maxWidth: 660, margin: "0 auto",
          }}>
            <p style={{
              fontFamily: serif, fontSize: mobile ? 18 : 24,
              fontStyle: "italic", lineHeight: 1.45,
              color: "rgba(255,255,255,0.7)", margin: 0,
            }}>
              This is not a technology company that happens to serve fitness. This is a fitness company that happens to build technology.
            </p>
          </div>
        </section>

        {/* ══════����� WHY NOW ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="THE MOMENT" />
          <SectionDivider />

          <Headline>Three forces converging. The window won't stay <Accent>open</Accent>.</Headline>

          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr",
            gap: mobile ? 14 : 20, marginBottom: mobile ? 24 : 36,
          }}>
            {[
              { 
                icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08A2.5 2.5 0 0 0 12 19.5a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 12 4.5"/><path d="m15.7 10.4-.9.4"/><path d="m9.2 13.2-.9.4"/><path d="m13.6 15.7-.4-.9"/><path d="m10.8 9.2-.4-.9"/><path d="m15.7 13.5-.9-.4"/><path d="m9.2 10.9-.9-.4"/><path d="m10.5 15.7.4-.9"/><path d="m13.1 9.2.4-.9"/><circle cx="12" cy="12" r="2"/></svg>,
                title: "AI is finally ready", 
                body: "For the first time, AI can understand coaching nuance — session context, progressive overload, follow-up timing. Not replace the coach. Amplify them." 
              },
              { 
                icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/><line x1="18" y1="8" x2="22" y2="8"/></svg>,
                title: "The trainer crisis", 
                body: "80% annual turnover. The industry burns through coaches faster than it can train them. The model is broken." 
              },
              { 
                icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"/><path d="m18 15-2-2"/><path d="m15 18-2-2"/></svg>,
                title: "The health epidemic", 
                body: "$4.1 trillion in chronic disease costs annually. The trainers we lose are the healthcare workers we can't afford to lose." 
              },
            ].map((card, i) => (
              <div key={i} style={{ ...glass, borderRadius: mobile ? 16 : 20, padding: mobile ? 22 : 28 }}>
                <div style={{ marginBottom: 12 }}>{card.icon}</div>
                <div style={{ fontFamily: f, fontSize: mobile ? 16 : 17, fontWeight: 600, color: "#fff", marginBottom: 8 }}>{card.title}</div>
                <div style={{ fontFamily: f, fontSize: mobile ? 13 : 14, lineHeight: 1.65, color: "rgba(255,255,255,0.45)" }}>{card.body}</div>
              </div>
            ))}
          </div>

          <div style={{
            fontFamily: serif, fontSize: mobile ? 17 : 20, fontStyle: "italic",
            color: "rgba(255,255,255,0.45)", lineHeight: 1.5,
            paddingLeft: mobile ? 0 : 20,
            borderLeft: mobile ? "none" : `2px solid ${teal}40`,
          }}>
            We intend to be the company that solves this intersection.
          </div>
        </section>

        {/* ═══════ VALUES ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="WHAT WE BELIEVE" />
          <SectionDivider />

          <Headline>The human is the product. The technology is the <Accent>amplifier</Accent>.</Headline>

          <div style={{ display: "flex", flexDirection: "column", gap: mobile ? 14 : 18 }}>
            {[
              { num: "01", title: "The coach is the front line of healthcare", body: "Personal trainers aren't gym employees — they're preventive healthcare workers who change behavior, reverse chronic disease, and keep people out of hospital beds. It's time we treated them accordingly." },
              { num: "02", title: "AI makes the human more valuable, not less", body: "As AI handles the routine, the human skills — empathy, intuition, presence, accountability — become the premium. The trainers who develop those skills will be the most valuable professionals in the room." },
              { num: "03", title: "Relationships can't be downloaded", body: "People hire trainers because they need someone who knows their story and won't let them quit. That relationship is the product. Everything Milton builds exists to strengthen that bond." },
              { num: "04", title: "Higher standards, not just higher tech", body: "Be outcomes-driven. Track results. Build credibility through consistency. Milton gives trainers the tools to operate at a healthcare-professional level — and the data to prove they belong there." },
              { num: "05", title: "Empowerment is the only strategy that scales", body: "When a trainer can see their own growth, track their impact, and build a career they're proud of — they don't leave. They lead." },
            ].map((v, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: mobile ? "1fr" : "56px 1fr",
                gap: mobile ? 8 : 24, padding: mobile ? "20px 18px" : "28px 28px",
                background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.04)",
                borderRadius: mobile ? 14 : 18,
              }}>
                <div style={{ fontFamily: f, fontSize: mobile ? 24 : 32, fontWeight: 700, color: `${teal}28`, lineHeight: 1 }}>{v.num}</div>
                <div>
                  <div style={{ fontFamily: f, fontSize: mobile ? 16 : 18, fontWeight: 600, color: "#fff", marginBottom: 6 }}>{v.title}</div>
                  <div style={{ fontFamily: f, fontSize: mobile ? 13 : 14, lineHeight: 1.7, color: "rgba(255,255,255,0.45)" }}>{v.body}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════ TEAM ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="THE PEOPLE" />
          <SectionDivider />

          <Headline>Built by people who've been on the <Accent>training floor</Accent>.</Headline>

          {/* Leadership */}
          <div style={{ marginBottom: mobile ? 24 : 32 }}>
            <div style={{ fontFamily: f, fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: 2, textTransform: "uppercase", marginBottom: mobile ? 14 : 18 }}>Leadership</div>
            <div style={{
              display: "grid",
              gridTemplateColumns: mobile ? "1fr" : "repeat(4, 1fr)",
              gap: mobile ? 14 : 20,
            }}>
              {[
                { img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Miguel%20Johns%2C%20CEO-lZEJGQjNYl6kZ7EGW2kmb9QchdFiBa.png", name: "Miguel Johns", title: "CEO" },
                { img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/John%20Elliott%2C%20COO-7lVzroaIzjIATXzzdZZpcbd34XjVTA.png", name: "John Elliott", title: "COO" },
                { img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Srinivas%20Palthepu%2C%20CTO-6UiUB7zTETdyCdXIxsDcWLehDAfVj2.png", name: "Srinivas Palthepu", title: "CTO" },
                { img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jeff%20Turner%2C%20Investor%20%26%20Chair-YglZ83IINB3BwhO0RgB7VLYCaCw0Wv.png", name: "Jeff Turner", title: "Investor & Chair" },
              ].map((p, i) => (
                <div key={i} style={{ ...glass, borderRadius: mobile ? 16 : 20, padding: mobile ? 20 : 24, textAlign: "center" }}>
                  <img
                    src={p.img}
                    alt={p.name}
                    style={{
                      width: mobile ? 80 : 100, height: mobile ? 80 : 100, borderRadius: "50%",
                      objectFit: "cover", objectPosition: "center top",
                      border: `2px solid ${teal}30`,
                      marginBottom: 14,
                    }}
                  />
                  <div style={{ fontFamily: f, fontSize: mobile ? 15 : 17, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{p.name}</div>
                  <div style={{ fontFamily: f, fontSize: 12, color: teal, fontWeight: 500 }}>{p.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Engineering */}
          <div>
            <div style={{ fontFamily: f, fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: 2, textTransform: "uppercase", marginBottom: mobile ? 14 : 18 }}>Engineering</div>
            <div style={{
              display: "grid",
              gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4, 1fr)",
              gap: mobile ? 14 : 20,
            }}>
              {[
                { img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sanjay%20Kumar%20Murudi%2C%20VP%2C%20Engineering-aOLDFFYqmRwSlqGFlgHroagMVugAc4.png", name: "Sanjay Kumar Murudi", title: "VP, Engineering" },
                { img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Udaya%20Thalabattula%2C%20SR%20Architect-txS8zzFk2X7qAxBINdcWNldo3Qsdvs.png", name: "Udaya Thalabattula", title: "SR Architect" },
                { img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Srinath%20Bellamkonda%2C%20AI%20Engineer-WTAU7ZR6RIlkSGCCTEwQy4cjCeTw0N.png", name: "Srinath Bellamkonda", title: "AI Engineer" },
                { img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sujit%20Kumar%20Pradhan%2C%20AI%20Engineer-lVHIxn46bx508ziTats0XqrdwxZDdK.png", name: "Sujit Kumar Pradhan", title: "AI Engineer" },
              ].map((p, i) => (
                <div key={i} style={{ ...glass, borderRadius: mobile ? 14 : 18, padding: mobile ? 16 : 20, textAlign: "center" }}>
                  <img
                    src={p.img}
                    alt={p.name}
                    style={{
                      width: mobile ? 64 : 80, height: mobile ? 64 : 80, borderRadius: "50%",
                      objectFit: "cover", objectPosition: "center top",
                      border: `2px solid ${teal}20`,
                      marginBottom: 12,
                    }}
                  />
                  <div style={{ fontFamily: f, fontSize: mobile ? 13 : 15, fontWeight: 600, color: "#fff", marginBottom: 2 }}>{p.name}</div>
                  <div style={{ fontFamily: f, fontSize: mobile ? 10 : 11, color: teal, fontWeight: 500 }}>{p.title}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ CHIEF COACH OFFICER ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="A ROLE ONLY WE HAVE" />
          <SectionDivider />

          <div style={{
            background: `linear-gradient(145deg, ${teal}0a, rgba(6,28,39,0.5))`,
            border: `1px solid ${teal}22`, borderRadius: mobile ? 20 : 28,
            padding: mobile ? "28px 22px" : "40px 44px",
            boxShadow: `0 16px 48px rgba(0,0,0,0.25), 0 0 60px ${teal}04`,
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: 1, background: `linear-gradient(90deg, transparent, ${teal}30, transparent)` }} />

            <div style={{
              display: "grid", gridTemplateColumns: mobile ? "1fr" : "auto 1fr",
              gap: mobile ? 20 : 32, alignItems: "start",
            }}>
<img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Johnny%20O-f85QO3MehtjKe6jNVZZzn4Som59E6J.png"
              alt="Johnny Olsen"
              style={{
                width: mobile ? 120 : 180, height: mobile ? 120 : 180, borderRadius: "50%",
                objectFit: "cover", objectPosition: "center top",
                border: `3px solid ${teal}40`,
                boxShadow: `0 0 40px ${teal}20`, flexShrink: 0,
              }}
            />
              <div>
                <div style={{ fontFamily: f, fontSize: mobile ? 20 : 24, fontWeight: 700, color: "#fff", marginBottom: 2 }}>Johnny Olsen</div>
                <div style={{ fontFamily: f, fontSize: 14, color: teal, fontWeight: 600, marginBottom: 14 }}>Chief Coach Officer</div>
                <p style={{ fontFamily: f, fontSize: mobile ? 14 : 15, lineHeight: 1.7, color: "rgba(255,255,255,0.5)", margin: "0 0 12px 0" }}>
                  No AI company has a Chief Coach Officer. We do — because building for coaches without one is like building a hospital without asking a doctor.
                </p>
                <p style={{ fontFamily: f, fontSize: mobile ? 13 : 14, lineHeight: 1.7, color: "rgba(255,255,255,0.4)", margin: 0 }}>
                  Every AI recommendation, session brief, and development path in Milton is filtered through decades of real coaching experience. This is what separates us.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ HOME BASE GYM ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="OUR PROVING GROUND" />
          <SectionDivider />

          <Headline>Optimal Performance — where Milton is <Accent>forged</Accent>.</Headline>

          <p style={{ fontFamily: f, fontSize: mobile ? 15 : 16, lineHeight: 1.7, color: "rgba(255,255,255,0.5)", maxWidth: 640, margin: "0 0 32px 0" }}>
            A privately-owned personal training studio in Wichita, KS. Nearly two decades in operation. This is where Milton is tested with real trainers, real clients, and real stakes — every week.
          </p>

          <div style={{
            display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
            gap: mobile ? 16 : 24, marginBottom: mobile ? 24 : 36,
          }}>
            <div style={{
              borderRadius: mobile ? 14 : 18,
              overflow: "hidden",
              height: mobile ? 180 : 260,
            }}>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%2835%29-RRDktgFJFs3AzS1PJRRlyKXvH42KxF.png"
                alt="Optimal Performance gym exterior"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: mobile ? 10 : 12 }}>
              {[
                { num: "~20", label: "Years in operation" },
                { num: "6", label: "Trainers on roster" },
                { num: "4", label: "Pillar framework" },
                { num: "∞", label: "Spreadsheets killed" },
              ].map((s, i) => (
                <div key={i} style={{ ...glass, borderRadius: mobile ? 12 : 14, padding: mobile ? 16 : 20, textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ fontFamily: f, fontSize: mobile ? 26 : 30, fontWeight: 700, color: teal, lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontFamily: f, fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: mobile ? 14 : 18, padding: mobile ? "22px 18px" : "28px 32px",
          }}>
            <div style={{ fontFamily: serif, fontSize: mobile ? 17 : 20, fontStyle: "italic", color: "rgba(255,255,255,0.6)", lineHeight: 1.5, marginBottom: 14 }}>
              "I feel like you understand exactly what I'm saying. And then boom — less than a week later, there it is."
            </div>
            <div style={{ fontFamily: f, fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>Bethany Langston <span style={{ color: "rgba(255,255,255,0.25)", fontWeight: 400 }}>· Owner, Optimal Performance</span></div>
          </div>
        </section>

        {/* ═══════ BACKED BY ═══════ */}
        <section style={{ padding: mobile ? "32px 0" : "48px 0" }}>
          <div style={{
            background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: mobile ? 14 : 18, padding: mobile ? "24px 20px" : "32px 40px", textAlign: "center",
          }}>
            <div style={{ fontFamily: f, fontSize: mobile ? 15 : 18, fontWeight: 500, color: "rgba(255,255,255,0.55)" }}>
              Backed by operators and investors in <span style={{ color: "#fff", fontWeight: 600 }}>fitness</span>, <span style={{ color: "#fff", fontWeight: 600 }}>healthcare</span>, and <span style={{ color: "#fff", fontWeight: 600 }}>AI</span>.
            </div>
          </div>
        </section>

        

        {/* ════��══ CLOSING CTA ═══════ */}
        <section style={{ padding: mobile ? "60px 0 80px" : "80px 0 120px", textAlign: "center" }}>
          <Headline style={{ margin: "0 auto 16px auto", maxWidth: 660, textAlign: "center" }}>
            The front lines need better tools. We're <Accent>building them</Accent>.
          </Headline>

          <p style={{
            fontFamily: f, fontSize: mobile ? 14 : 16, lineHeight: 1.65,
            color: "rgba(255,255,255,0.4)", maxWidth: 520, margin: "0 auto 32px auto",
          }}>
            See how Milton's AI co-pilots help your trainers perform, your fitness director lead, and your business grow.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#/book" style={{ fontFamily: f, fontSize: 16, fontWeight: 700, padding: "16px 44px", borderRadius: 100, border: "none", background: "#fff", color: navy, cursor: "pointer", textDecoration: "none", display: "inline-block" }}>Request a Demo</a>
            <button style={{ fontFamily: f, fontSize: 16, fontWeight: 600, padding: "16px 44px", borderRadius: 100, cursor: "pointer", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}>Get Pricing</button>
          </div>
        </section>
      </div>
    </>
  );
}
