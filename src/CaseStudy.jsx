import { useState, useEffect, useRef } from "react";

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

function StatCard({ number, label, sublabel, color = "#fff", mobile }) {
  return (
    <div style={{
      background: "linear-gradient(145deg, rgba(13,154,165,0.08) 0%, rgba(6,28,39,0.4) 100%)",
      border: "1px solid rgba(13,154,165,0.18)",
      borderRadius: mobile ? 16 : 20, padding: mobile ? "24px 20px" : "32px 28px",
      backdropFilter: "blur(16px)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)",
      textAlign: "center",
    }}>
      <div style={{ fontFamily: f, fontSize: mobile ? 36 : 48, fontWeight: 700, color, lineHeight: 1 }}>{number}</div>
      <div style={{ fontFamily: f, fontSize: mobile ? 13 : 14, fontWeight: 600, color: "rgba(255,255,255,0.7)", marginTop: 8 }}>{label}</div>
      {sublabel && <div style={{ fontFamily: f, fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>{sublabel}</div>}
    </div>
  );
}

function BeforeAfterRow({ before, after, label, mobile }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr auto 1fr",
      gap: mobile ? 12 : 0, alignItems: "center",
      padding: mobile ? "16px 0" : "20px 0",
      borderBottom: "1px solid rgba(255,255,255,0.04)",
    }}>
      <div style={{
        background: "rgba(232,84,84,0.06)", border: "1px solid rgba(232,84,84,0.15)",
        borderRadius: 14, padding: mobile ? "16px 18px" : "20px 24px",
      }}>
        <div style={{ fontFamily: f, fontSize: 10, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: `${red}80`, marginBottom: 6 }}>BEFORE</div>
        <div style={{ fontFamily: f, fontSize: mobile ? 13 : 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{before}</div>
      </div>
      {!mobile && (
        <div style={{ padding: "0 20px", display: "flex", alignItems: "center" }}>
          <span style={{ fontFamily: f, fontSize: 20, color: teal }}>→</span>
        </div>
      )}
      {mobile && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span style={{ fontFamily: f, fontSize: 18, color: teal }}>↓</span>
        </div>
      )}
      <div style={{
        background: `rgba(13,154,165,0.06)`, border: `1px solid ${teal}20`,
        borderRadius: 14, padding: mobile ? "16px 18px" : "20px 24px",
      }}>
        <div style={{ fontFamily: f, fontSize: 10, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: `${teal}90`, marginBottom: 6 }}>WITH MILTON</div>
        <div style={{ fontFamily: f, fontSize: mobile ? 13 : 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{after}</div>
      </div>
    </div>
  );
}

function FlowStep({ number, title, description, visual, mobile }) {
  const isEven = number % 2 === 0;
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
      gap: mobile ? 20 : 48,
      alignItems: "center",
      padding: mobile ? "32px 0" : "48px 0",
      borderBottom: "1px solid rgba(255,255,255,0.04)",
      direction: (!mobile && isEven) ? "rtl" : "ltr",
    }}>
      <div style={{ direction: "ltr" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 36, height: 36, borderRadius: "50%",
          background: `${teal}15`, border: `1px solid ${teal}30`,
          fontFamily: f, fontSize: 14, fontWeight: 700, color: teal,
          marginBottom: 16,
        }}>{number}</div>
        <h3 style={{ fontFamily: f, fontSize: mobile ? 20 : 24, fontWeight: 700, color: "#fff", margin: "0 0 12px 0" }}>{title}</h3>
        <p style={{ fontFamily: f, fontSize: mobile ? 14 : 15, lineHeight: 1.7, color: "rgba(255,255,255,0.5)", margin: 0 }}>{description}</p>
      </div>
      <div style={{ direction: "ltr" }}>{visual}</div>
    </div>
  );
}

// Mini bar chart component
function MiniBarChart({ data, mobile }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div style={{
      background: "linear-gradient(145deg, rgba(13,154,165,0.06) 0%, rgba(6,28,39,0.4) 100%)",
      border: "1px solid rgba(13,154,165,0.15)",
      borderRadius: 16, padding: mobile ? 20 : 24,
      backdropFilter: "blur(12px)",
    }}>
      <div style={{ display: "flex", gap: mobile ? 6 : 10, alignItems: "flex-end", height: mobile ? 120 : 160, marginBottom: 12 }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <span style={{ fontFamily: f, fontSize: 10, fontWeight: 600, color: d.highlight ? mint : "rgba(255,255,255,0.4)" }}>{d.label2}</span>
            <div style={{
              width: "100%", maxWidth: 40,
              height: `${(d.value / max) * 100}%`,
              background: d.highlight
                ? `linear-gradient(180deg, ${mint}, ${teal})`
                : `linear-gradient(180deg, ${teal}60, ${teal}20)`,
              borderRadius: 6,
              minHeight: 8,
              boxShadow: d.highlight ? `0 0 12px ${teal}30` : "none",
            }} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: mobile ? 6 : 10 }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center" }}>
            <span style={{ fontFamily: f, fontSize: mobile ? 9 : 10, color: "rgba(255,255,255,0.3)" }}>{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Donut chart
function DonutChart({ percentage, label, sublabel, color = teal, size = 100, mobile }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: mobile ? 16 : 20 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={`${(percentage / 100) * circ} ${circ}`}
          strokeDashoffset={circ * 0.25} strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 8px ${color}40)` }}
        />
        <text x="50%" y="52%" textAnchor="middle" dominantBaseline="middle"
          style={{ fontFamily: f, fontSize: size * 0.22, fontWeight: 700, fill: "#fff" }}>
          {percentage}%
        </text>
      </svg>
      <div>
        <div style={{ fontFamily: f, fontSize: mobile ? 14 : 16, fontWeight: 600, color: "#fff" }}>{label}</div>
        {sublabel && <div style={{ fontFamily: f, fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 4 }}>{sublabel}</div>}
      </div>
    </div>
  );
}

// Pillar diagnostic card
function PillarCard({ icon, title, description, status, mobile }) {
  const colors = { strong: mint, developing: warn, gap: red };
  const c = colors[status] || teal;
  return (
    <div style={{
      background: "linear-gradient(145deg, rgba(13,154,165,0.06) 0%, rgba(6,28,39,0.35) 100%)",
      border: `1px solid ${c}20`,
      borderRadius: 16, padding: mobile ? 20 : 24,
      backdropFilter: "blur(12px)",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontSize: 22 }}>{icon}</span>
        <span style={{
          fontFamily: f, fontSize: 10, fontWeight: 600, letterSpacing: 1,
          textTransform: "uppercase", color: c,
          background: `${c}15`, borderRadius: 100, padding: "3px 10px",
        }}>{status}</span>
      </div>
      <div style={{ fontFamily: f, fontSize: mobile ? 15 : 16, fontWeight: 600, color: "#fff", marginBottom: 6 }}>{title}</div>
      <div style={{ fontFamily: f, fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{description}</div>
    </div>
  );
}

export default function CaseStudy() {
  const { mobile, tablet } = useBreakpoint();
  const px = mobile ? 20 : tablet ? 32 : 40;

  return (
    <div style={{ minHeight: "100vh", background: "#061c27", color: "#fff", position: "relative" }}>
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

        {/* ═══════════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════════ */}
        <section style={{ padding: mobile ? "48px 0 40px" : "80px 0 60px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <span style={{ fontFamily: f, fontSize: 12, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>CASE STUDY</span>
          </div>

          <h1 style={{
            fontFamily: serif, fontSize: mobile ? 34 : tablet ? 48 : 60,
            fontWeight: 400, lineHeight: 1.12, color: "#fff", margin: "0 0 16px 0",
          }}>
            How Optimal Performance replaced <Accent>20 years of spreadsheets</Accent> with one intelligent view.
          </h1>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.65,
            color: "rgba(255,255,255,0.5)", maxWidth: 640, margin: "0 0 40px 0",
          }}>
            A privately-owned personal training studio in Wichita, KS — with nearly two decades of hard-won systems, a team of developing trainers, and a fitness director who knew exactly what she needed but couldn't find it in any software.
          </p>

          {/* Hero stats row */}
          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4, 1fr)",
            gap: mobile ? 12 : 16,
          }}>
            <StatCard mobile={mobile} number="~20 yrs" label="In business" />
            <StatCard mobile={mobile} number="6" label="Trainers on roster" sublabel="Mix of new and veteran" />
            <StatCard mobile={mobile} number="3" label="Spreadsheets replaced" sublabel="Weekly tasks, consultations, intake" />
            <StatCard mobile={mobile} number="4" label="Trainer pillars tracked" sublabel="Milton's gap identification" />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            THE CHALLENGE
        ═══════════════════════════════════════════════ */}
        <section style={{ padding: mobile ? "60px 0" : "80px 0" }}>
          <SectionLabel text="THE CHALLENGE" />
          <SectionDivider />

          <h2 style={{
            fontFamily: serif, fontSize: mobile ? 28 : 44,
            fontWeight: 400, color: "#fff", margin: "0 0 20px 0",
          }}>
            The fitness director's week — <Accent>before Milton</Accent>.
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 14 : 16, lineHeight: 1.7,
            color: "rgba(255,255,255,0.5)", maxWidth: 640, margin: "0 0 40px 0",
          }}>
            Bethany ran a tight ship. But the systems holding it together were duct tape and discipline — not software. Here's what a typical week looked like.
          </p>

          {/* The spreadsheet hell visualization */}
          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr",
            gap: mobile ? 14 : 20, marginBottom: mobile ? 32 : 48,
          }}>
            {[
              {
                icon: "📋", title: "Spreadsheet #1", subtitle: "Weekly Trainer Tasks",
                items: ["Follow-up checklist items", "Friday check-in with manager", "Written improvement plan if 2 weeks behind", "Manual accountability tracking"],
              },
              {
                icon: "📊", title: "Spreadsheet #2", subtitle: "Consultations & Prospects",
                items: ["Referral sources & tracking", "Consultation scheduling", "Close rate calculations", "Revenue attribution by trainer"],
              },
              {
                icon: "📝", title: "Spreadsheet #3", subtitle: "Client Intake & Goals",
                items: ["Fitness assessments", "SMART goal setting", "Progress tracking per client", "Bridging gap identification"],
              },
            ].map((sheet, i) => (
              <div key={i} style={{
                background: `${red}06`, border: `1px solid ${red}15`,
                borderRadius: 16, padding: mobile ? 20 : 24,
              }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{sheet.icon}</div>
                <div style={{ fontFamily: f, fontSize: mobile ? 16 : 18, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{sheet.title}</div>
                <div style={{ fontFamily: f, fontSize: 12, color: `${red}80`, fontWeight: 600, letterSpacing: 0.5, marginBottom: 14 }}>{sheet.subtitle}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {sheet.items.map((item, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <span style={{ color: `${red}50`, fontSize: 14, marginTop: 1, flexShrink: 0 }}>·</span>
                      <span style={{ fontFamily: f, fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Plus MindBody cross-referencing */}
          <div style={{
            background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 20, padding: mobile ? "24px 20px" : "32px 36px",
            display: "flex", flexDirection: mobile ? "column" : "row",
            gap: mobile ? 16 : 32, alignItems: mobile ? "flex-start" : "center",
            marginBottom: mobile ? 32 : 48,
          }}>
            <div style={{ fontSize: 36, flexShrink: 0 }}>⚡</div>
            <div>
              <div style={{ fontFamily: f, fontSize: mobile ? 16 : 18, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Plus: cross-referencing MindBody for everything else</div>
              <p style={{ fontFamily: f, fontSize: mobile ? 13 : 14, lineHeight: 1.65, color: "rgba(255,255,255,0.45)", margin: 0 }}>
                Checking sessions, payments, and schedules in MindBody — which Bethany described as "so clunky that even when we had a dedicated front desk person, that's all they did all day. Click, wait. Click, wait. Click, wait."
              </p>
            </div>
          </div>

          {/* Industry context stats */}
          <div style={{
            background: `linear-gradient(145deg, ${red}08, rgba(6,28,39,0.4))`,
            border: `1px solid ${red}18`,
            borderRadius: 20, padding: mobile ? "28px 24px" : "40px 44px",
          }}>
            <div style={{ fontFamily: f, fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: `${red}70`, marginBottom: 20 }}>THE INDUSTRY PROBLEM</div>
            <div style={{
              display: "grid",
              gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr",
              gap: mobile ? 20 : 32,
            }}>
              <div>
                <div style={{ fontFamily: f, fontSize: mobile ? 40 : 52, fontWeight: 700, color: red, lineHeight: 1 }}>80%</div>
                <div style={{ fontFamily: f, fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 8 }}>Annual trainer turnover rate industry-wide</div>
              </div>
              <div>
                <div style={{ fontFamily: f, fontSize: mobile ? 40 : 52, fontWeight: 700, color: red, lineHeight: 1 }}>3/5</div>
                <div style={{ fontFamily: f, fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 8 }}>Trainers don't make it three years in the profession</div>
              </div>
              <div>
                <div style={{ fontFamily: f, fontSize: mobile ? 40 : 52, fontWeight: 700, color: red, lineHeight: 1 }}>6 mo</div>
                <div style={{ fontFamily: f, fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 8 }}>The retention cliff — clients who leave before this rarely come back</div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            THE TRANSFORMATION — Before / After
        ═══════════════════════════════════════════════ */}
        <section style={{ padding: mobile ? "60px 0" : "80px 0" }}>
          <SectionLabel text="THE TRANSFORMATION" />
          <SectionDivider />

          <h2 style={{
            fontFamily: serif, fontSize: mobile ? 28 : 44,
            fontWeight: 400, color: "#fff", margin: "0 0 20px 0",
          }}>
            Spreadsheets out. <Accent>Intelligence</Accent> in.
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 14 : 16, lineHeight: 1.7,
            color: "rgba(255,255,255,0.5)", maxWidth: 640, margin: "0 0 40px 0",
          }}>
            Every manual process Bethany had built over 20 years mapped directly into Milton. Here's the side-by-side.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <BeforeAfterRow mobile={mobile}
              before="Friday sit-downs with every trainer going through a paper checklist to review their week"
              after="Milton tracks follow-ups, attendance, consultations, and goals in real time — the Friday check-in becomes a strategic conversation, not an accountability audit"
            />
            <BeforeAfterRow mobile={mobile}
              before="Manually calculating each trainer's close rate, client count, and revenue by cross-referencing two spreadsheets and MindBody"
              after="One dashboard: every trainer's active clients, gross, attendance rate, follow-up rate, and retention — updated live, week-over-week deltas included"
            />
            <BeforeAfterRow mobile={mobile}
              before="No visibility into which trainers are actually getting results for their clients vs. just logging sessions"
              after="Milton identifies coaching skill gaps vs. follow-up gaps vs. scheduling gaps — so the director knows exactly which conversation to have"
            />
            <BeforeAfterRow mobile={mobile}
              before="New trainers left to figure it out themselves — high washout rate in the first 12 months"
              after="Automated development paths with clear milestones. Newer trainers see exactly how to level up, earn more, and grow into the role"
            />
            <BeforeAfterRow mobile={mobile}
              before="Client retention tracked by feel — 'we think we're keeping people about 80% of the time'"
              after="The 6-month cliff is now a metric. Every client is tracked against that milestone. Interventions happen before the drop-off, not after"
            />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            THE 4 PILLARS — Bethany's Framework
        ═══════════════════════════════════════════════ */}
        <section style={{ padding: mobile ? "60px 0" : "80px 0" }}>
          <SectionLabel text="THE FRAMEWORK" />
          <SectionDivider />

          <h2 style={{
            fontFamily: serif, fontSize: mobile ? 28 : 44,
            fontWeight: 400, color: "#fff", margin: "0 0 16px 0",
          }}>
            Bethany's <Accent>4 pillars</Accent> — now powered by AI.
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 14 : 16, lineHeight: 1.7,
            color: "rgba(255,255,255,0.5)", maxWidth: 640, margin: "0 0 40px 0",
          }}>
            Over 20 years, Optimal Performance developed a four-pillar framework for evaluating and developing trainers. Milton turned it into an automated diagnostic system.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
            gap: mobile ? 14 : 20,
            marginBottom: mobile ? 40 : 56,
          }}>
            <PillarCard mobile={mobile} icon="📅" title="Self-Management" status="developing"
              description="Can they manage their own schedule, organize their day, and hit their weekly targets without constant oversight?" />
            <PillarCard mobile={mobile} icon="🏋️" title="Coaching Skill" status="strong"
              description="Are they getting real results for clients? Can they set goals, bridge the gap, and communicate progress in a way that keeps people coming back?" />
            <PillarCard mobile={mobile} icon="💬" title="Communication" status="gap"
              description="How are their follow-ups? Do they follow up urgently? Do they capitalize on excitement? Can they handle the hard conversations about pausing and commitment?" />
            <PillarCard mobile={mobile} icon="🤝" title="Teamwork" status="strong"
              description="Are they a net positive for the team? When they're at capacity, do they route consultations to teammates? Are they contributing to the culture?" />
          </div>

          <div style={{
            background: `${teal}08`, border: `1px solid ${teal}18`,
            borderRadius: 20, padding: mobile ? "24px 20px" : "32px 36px",
            display: "flex", flexDirection: mobile ? "column" : "row",
            gap: mobile ? 16 : 28, alignItems: mobile ? "flex-start" : "center",
          }}>
            <div style={{ fontSize: 28, flexShrink: 0 }}>💡</div>
            <div>
              <div style={{ fontFamily: f, fontSize: mobile ? 15 : 16, fontWeight: 600, color: "#fff", marginBottom: 6 }}>The key insight</div>
              <p style={{ fontFamily: f, fontSize: mobile ? 13 : 14, lineHeight: 1.65, color: "rgba(255,255,255,0.5)", margin: 0 }}>
                When a trainer is losing clients, the instinct is "they need to be a better trainer." But Bethany discovered the issue is almost never coaching skill alone — it's usually urgency, follow-up, or scheduling. Milton separates these pillars so the director knows exactly where to focus.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            HOW IT WORKS — Day in the Life Flow
        ═══════════════════════════════════════════════ */}
        <section style={{ padding: mobile ? "60px 0" : "80px 0" }}>
          <SectionLabel text="A DAY WITH MILTON" />
          <SectionDivider />

          <h2 style={{
            fontFamily: serif, fontSize: mobile ? 28 : 44,
            fontWeight: 400, color: "#fff", margin: "0 0 16px 0",
          }}>
            See the flow — from Monday morning to <Accent>month-end results</Accent>.
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 14 : 16, lineHeight: 1.7,
            color: "rgba(255,255,255,0.5)", maxWidth: 640, margin: "0 0 20px 0",
          }}>
            Here's how Milton runs inside a business like Optimal Performance — not as another tool to manage, but as the intelligence layer that makes everything else work better.
          </p>

          <FlowStep number={1} mobile={mobile}
            title="Monday morning brief"
            description="The fitness director opens Milton and sees the week's snapshot: total active clients across all trainers, weekly gross trending, attendance gaps, and which trainers need attention. No spreadsheet cross-referencing. No MindBody digging. Just one view."
            visual={
              <MiniBarChart mobile={mobile} data={[
                { label: "Jake", value: 22, label2: "22", highlight: false },
                { label: "Marcus", value: 18, label2: "18", highlight: false },
                { label: "Bethany L", value: 15, label2: "15", highlight: false },
                { label: "Priya", value: 14, label2: "14", highlight: false },
                { label: "Derek", value: 11, label2: "11", highlight: false },
                { label: "Aisha", value: 8, label2: "8", highlight: true },
              ]} />
            }
          />

          <FlowStep number={2} mobile={mobile}
            title="Trainer gets their session brief"
            description="Before Sarah walks in for her 9am, the coach opens Milton. Last session's weights, her current program phase, her goal, and a note: 'Squat hit 120×6 last time — ready to test progression.' The coach walks in prepared. The client notices."
            visual={
              <div style={{
                background: "linear-gradient(145deg, rgba(13,154,165,0.08) 0%, rgba(6,28,39,0.4) 100%)",
                border: `1px solid ${teal}18`, borderRadius: 16, padding: mobile ? 20 : 24,
              }}>
                <div style={{ fontFamily: f, fontSize: 12, fontWeight: 600, color: teal, marginBottom: 12 }}>SESSION BRIEF · 9:00 AM</div>
                <div style={{ fontFamily: f, fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Sarah Chen</div>
                <div style={{ fontFamily: f, fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: 14 }}>Fat Loss — Phase 2 · Session 2 of 3 this week</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {["Lower body focus today", "Squat: 120×6 last session → test 125×5", "Mentioned knee tightness last week — check in", "Goal: lose 20 lbs (down 8 so far)"].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <span style={{ color: teal, fontSize: 12, marginTop: 2, flexShrink: 0 }}>▸</span>
                      <span style={{ fontFamily: f, fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            }
          />

          <FlowStep number={3} mobile={mobile}
            title="Automatic post-session follow-up"
            description="Session ends. Milton drafts a follow-up message personalized to what happened — the progression, the win, what's coming next session. The trainer reviews, taps send. Total time: 10 seconds. The client feels seen."
            visual={
              <div style={{
                background: "linear-gradient(145deg, rgba(13,154,165,0.06) 0%, rgba(6,28,39,0.35) 100%)",
                border: `1px solid ${teal}15`, borderRadius: 16, padding: mobile ? 20 : 24,
              }}>
                <div style={{ fontFamily: f, fontSize: 12, fontWeight: 600, color: mint, marginBottom: 14 }}>FOLLOW-UP READY TO SEND</div>
                <div style={{
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 12, padding: 16, fontFamily: f, fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.7,
                }}>
                  Great session today Sarah! 💪 You hit 125×5 on squat — that's a PR. Your consistency is paying off. Thursday we'll push into tempo work on the deadlift. Keep the protein up tonight!
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                  <span style={{ fontFamily: f, fontSize: 12, color: mint, fontWeight: 600, cursor: "pointer", background: `${mint}12`, borderRadius: 100, padding: "6px 16px" }}>✓ Send</span>
                  <span style={{ fontFamily: f, fontSize: 12, color: "rgba(255,255,255,0.35)", cursor: "pointer", background: "rgba(255,255,255,0.04)", borderRadius: 100, padding: "6px 16px" }}>Edit first</span>
                </div>
              </div>
            }
          />

          <FlowStep number={4} mobile={mobile}
            title="Director spots a gap — Milton already flagged it"
            description="Jake Torres has 22 clients but a 41% follow-up rate. He lost 4 clients this month. Milton's diagnostic: this isn't a coaching skill issue — it's urgency and communication. The director can now have a specific conversation, not a vague 'you need to do better.'"
            visual={
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}>
                <div style={{
                  background: `${red}08`, border: `1px solid ${red}15`,
                  borderRadius: 14, padding: mobile ? 16 : 20, textAlign: "center",
                }}>
                  <div style={{ fontFamily: f, fontSize: 28, fontWeight: 700, color: red }}>41%</div>
                  <div style={{ fontFamily: f, fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>Follow-up rate</div>
                </div>
                <div style={{
                  background: `${red}08`, border: `1px solid ${red}15`,
                  borderRadius: 14, padding: mobile ? 16 : 20, textAlign: "center",
                }}>
                  <div style={{ fontFamily: f, fontSize: 28, fontWeight: 700, color: red }}>-4</div>
                  <div style={{ fontFamily: f, fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>Clients lost this month</div>
                </div>
                <div style={{
                  gridColumn: "1 / -1",
                  background: `${warn}08`, border: `1px solid ${warn}18`,
                  borderRadius: 14, padding: mobile ? 16 : 20,
                  display: "flex", alignItems: "center", gap: 12,
                }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>🔍</span>
                  <div>
                    <div style={{ fontFamily: f, fontSize: 13, fontWeight: 600, color: warn }}>Milton's Diagnosis</div>
                    <div style={{ fontFamily: f, fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 4, lineHeight: 1.5 }}>Coaching skills are solid — clients who stay are seeing results. The gap is urgency: 20 sessions not rescheduled, slow follow-up on no-shows.</div>
                  </div>
                </div>
              </div>
            }
          />

          <FlowStep number={5} mobile={mobile}
            title="The 6-month cliff becomes visible"
            description="4 clients are approaching the six-month mark. Bethany knows from two decades of experience: if they stick past this point, they'll likely stay 2+ years. Milton tracks every client against this milestone and surfaces who needs attention right now."
            visual={
              <div style={{
                background: "linear-gradient(145deg, rgba(13,154,165,0.06) 0%, rgba(6,28,39,0.35) 100%)",
                border: `1px solid ${teal}18`, borderRadius: 16, padding: mobile ? 20 : 24,
              }}>
                <div style={{ fontFamily: f, fontSize: 12, fontWeight: 600, color: teal, marginBottom: 16 }}>6-MONTH RETENTION CLIFF</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { name: "Maria Santos", months: 5.5, risk: "high" },
                    { name: "Tom Wright", months: 5.2, risk: "medium" },
                    { name: "Lisa Park", months: 5.8, risk: "high" },
                    { name: "James Cooper", months: 5.1, risk: "low" },
                  ].map((c, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "10px 14px", borderRadius: 10,
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.04)",
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: f, fontSize: 13, fontWeight: 600, color: "#fff" }}>{c.name}</div>
                        <div style={{ fontFamily: f, fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{c.months} months</div>
                      </div>
                      {/* Progress bar to 6 months */}
                      <div style={{ width: 80, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
                        <div style={{
                          position: "absolute", left: 0, top: 0, bottom: 0,
                          width: `${(c.months / 6) * 100}%`, borderRadius: 3,
                          background: c.risk === "high" ? `linear-gradient(90deg, ${warn}, ${red})` : c.risk === "medium" ? warn : teal,
                        }} />
                      </div>
                      <span style={{
                        fontFamily: f, fontSize: 9, fontWeight: 600, textTransform: "uppercase",
                        color: c.risk === "high" ? red : c.risk === "medium" ? warn : mint,
                        letterSpacing: 0.5,
                      }}>{c.risk}</span>
                    </div>
                  ))}
                </div>
              </div>
            }
          />
        </section>

        {/* ═══════════════════════════════════════════════
            RESULTS / OUTCOMES
        ═══════════════════════════════════════════════ */}
        <section style={{ padding: mobile ? "60px 0" : "80px 0" }}>
          <SectionLabel text="THE OUTCOME" />
          <SectionDivider />

          <h2 style={{
            fontFamily: serif, fontSize: mobile ? 28 : 44,
            fontWeight: 400, color: "#fff", margin: "0 0 40px 0",
          }}>
            From duct tape and discipline to <Accent>one intelligent system</Accent>.
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
            gap: mobile ? 20 : 28, marginBottom: mobile ? 40 : 56,
          }}>
            <div style={{
              background: `${teal}08`, border: `1px solid ${teal}20`,
              borderRadius: 20, padding: mobile ? 28 : 36,
            }}>
              <DonutChart mobile={mobile} percentage={86} label="Attendance tracked" sublabel="248/287 sessions — automatically" size={mobile ? 80 : 100} />
            </div>
            <div style={{
              background: `${teal}08`, border: `1px solid ${teal}20`,
              borderRadius: 20, padding: mobile ? 28 : 36,
            }}>
              <DonutChart mobile={mobile} percentage={77} label="Follow-up rate visible" sublabel="41%–98% range across trainers" size={mobile ? 80 : 100} />
            </div>
            <div style={{
              background: `${mint}06`, border: `1px solid ${mint}18`,
              borderRadius: 20, padding: mobile ? 28 : 36,
            }}>
              <DonutChart mobile={mobile} percentage={100} label="Trainer gaps identified" sublabel="All 4 pillars, per trainer, in real time" color={mint} size={mobile ? 80 : 100} />
            </div>
            <div style={{
              background: `${mint}06`, border: `1px solid ${mint}18`,
              borderRadius: 20, padding: mobile ? 28 : 36,
            }}>
              <DonutChart mobile={mobile} percentage={100} label="Retention cliff tracked" sublabel="Every client measured against the 6-month mark" color={mint} size={mobile ? 80 : 100} />
            </div>
          </div>

          {/* Bethany quote */}
          <div style={{
            background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 20, padding: mobile ? "32px 24px" : "44px 48px",
          }}>
            <div style={{ fontFamily: serif, fontSize: mobile ? 22 : 28, fontStyle: "italic", color: "rgba(255,255,255,0.7)", lineHeight: 1.5, marginBottom: 20 }}>
              "I feel like you understand exactly what I'm saying. And then boom — less than a week later, there it is. That's not the case with most software people."
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%",
                background: `linear-gradient(135deg, ${teal}30, ${navy})`,
                border: `1px solid ${teal}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: f, fontSize: 14, fontWeight: 700, color: "#fff",
              }}>BL</div>
              <div>
                <div style={{ fontFamily: f, fontSize: 14, fontWeight: 600, color: "#fff" }}>Bethany Langston</div>
                <div style={{ fontFamily: f, fontSize: 12, color: "rgba(255,255,255,0.35)" }}>Owner & Fitness Director · Optimal Performance</div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            CTA
        ═══════════════════════════════════════════════ */}
        <section style={{ padding: mobile ? "60px 0 80px" : "80px 0 120px", textAlign: "center" }}>
          <h2 style={{
            fontFamily: serif, fontSize: mobile ? 28 : 44,
            fontWeight: 400, color: "#fff", margin: "0 0 16px 0",
          }}>
            Your gym has the same pain. <Accent>Milton</Accent> has the same fix.
          </h2>
          <p style={{
            fontFamily: f, fontSize: mobile ? 14 : 16, color: "rgba(255,255,255,0.45)",
            maxWidth: 520, margin: "0 auto 36px auto", lineHeight: 1.65,
          }}>
            See what Milton looks like with your trainers, your metrics, and your business.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{ fontFamily: f, fontSize: 16, fontWeight: 700, padding: "16px 44px", borderRadius: 100, border: "none", background: "#fff", color: navy, cursor: "pointer" }}>Request a Demo</button>
            <button style={{ fontFamily: f, fontSize: 16, fontWeight: 600, padding: "16px 44px", borderRadius: 100, cursor: "pointer", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}>Get Pricing</button>
          </div>
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
