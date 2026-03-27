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

function FeatureCard({ title, body, visual = true, visualHeight = 200 }) {
  const { mobile } = useBreakpoint();
  return (
    <div style={{
      background: "rgba(8,69,94,0.2)", border: "1px solid rgba(13,154,165,0.15)",
      borderRadius: mobile ? 12 : 16, padding: mobile ? 20 : 28,
      display: "flex", flexDirection: "column", gap: mobile ? 12 : 16,
    }}>
      {visual && <VisualPlaceholder height={visualHeight} mobileHeight={160} />}
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

function CTA({ children, variant = "primary", style: s = {} }) {
  const base = {
    fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600,
    padding: "14px 32px", borderRadius: 100, cursor: "pointer",
    transition: "all 0.25s ease", textDecoration: "none",
    display: "inline-block", letterSpacing: 0.3, whiteSpace: "nowrap",
  };
  const styles = variant === "primary"
    ? { ...base, background: "#fff", color: "#08455e", border: "none", ...s }
    : { ...base, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", ...s };
  return <button style={styles}>{children}</button>;
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



function HeroVisual({ mobile, tablet }) {
  // Soft gradient background panel with floating dashboard cards
  const teal = "#0d9aa5";
  
  // Stylized metric card
  const MetricCard = ({ label, value, sub, highlight }) => (
    <div style={{
      background: "#fff",
      borderRadius: 10,
      padding: mobile ? "12px 14px" : "14px 18px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    }}>
      <div style={{ fontSize: mobile ? 9 : 10, color: "#8b9a8e", letterSpacing: 0.5, marginBottom: 4, textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontSize: mobile ? 20 : 26, fontWeight: 600, color: highlight ? teal : "#1a1a1a" }}>{value}</div>
      {sub && <div style={{ fontSize: mobile ? 10 : 11, color: "#22c55e", marginTop: 2 }}>{sub}</div>}
    </div>
  );

  // Simple progress ring
  const Ring = ({ value, size = 44 }) => {
    const r = (size - 6) / 2;
    const c = r * 2 * Math.PI;
    const o = c - (value / 100) * c;
    return (
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e8f0e9" strokeWidth={5} />
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={teal} strokeWidth={5} strokeDasharray={c} strokeDashoffset={o} strokeLinecap="round" />
        </svg>
        <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: mobile ? 10 : 12, fontWeight: 600, color: "#1a1a1a" }}>{value}%</span>
      </div>
    );
  };

  // User avatar placeholder
  const Avatar = ({ initials, color = teal }) => (
    <div style={{ width: mobile ? 28 : 32, height: mobile ? 28 : 32, borderRadius: 8, background: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: mobile ? 10 : 11, fontWeight: 600, color: "#fff" }}>{initials}</div>
  );

  // Chat bubble
  const ChatBubble = ({ text, isAi }) => (
    <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
      {isAi && (
        <div style={{ width: 24, height: 24, borderRadius: 6, background: "#e8f5f0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Milton%20Face%20Logo-whMWzOXBgBgulGUqdRthSEMsjeyWPe.png" alt="" style={{ width: 16, height: 16, borderRadius: 3 }} />
        </div>
      )}
      <div style={{ background: isAi ? "#f0f7f4" : "#fff", border: isAi ? "none" : "1px solid #e5ebe7", borderRadius: 10, padding: "8px 12px", fontSize: mobile ? 10 : 11, color: "#2d3a2f", lineHeight: 1.5 }}>{text}</div>
    </div>
  );

  // Quick action pill
  const ActionPill = ({ text }) => (
    <div style={{ padding: "6px 12px", borderRadius: 20, border: "1px solid #d4e0d7", fontSize: mobile ? 9 : 10, color: "#4a6350", background: "#fff" }}>{text}</div>
  );

  // Dashboard card wrapper
  const DashboardCard = ({ children, style = {} }) => (
    <div style={{
      background: "linear-gradient(145deg, #f5f9f6 0%, #e8f0ea 100%)",
      borderRadius: mobile ? 16 : 20,
      padding: mobile ? 16 : 24,
      boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.08)",
      border: "1px solid rgba(255,255,255,0.8)",
      ...style,
    }}>
      {children}
    </div>
  );

  if (mobile) {
    return (
      <div style={{ width: "100%", marginBottom: 36 }}>
        <DashboardCard>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Milton%20Face%20Logo-whMWzOXBgBgulGUqdRthSEMsjeyWPe.png" alt="" style={{ width: 28, height: 28, borderRadius: 6 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>Good morning, Coach!</div>
              <div style={{ fontSize: 10, color: "#6b7c6e" }}>3 sessions today</div>
            </div>
          </div>
          {/* Metrics */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            <MetricCard label="Clients" value="12" sub="+3" />
            <MetricCard label="Attendance" value="83%" highlight />
          </div>
          {/* Chat */}
          <ChatBubble isAi text="Sarah Chen has lower body today. She hit 120x6 last session." />
        </DashboardCard>
      </div>
    );
  }

  return (
    <div style={{
      width: "100%",
      maxWidth: 1000,
      margin: "0 auto",
      marginBottom: tablet ? 48 : 60,
      display: "flex",
      gap: tablet ? 20 : 28,
      alignItems: "flex-start",
    }}>
      {/* LEFT: Coach Dashboard */}
      <DashboardCard style={{ flex: 1, transform: "rotate(-1deg) translateY(12px)" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Milton%20Face%20Logo-whMWzOXBgBgulGUqdRthSEMsjeyWPe.png" alt="" style={{ width: 32, height: 32, borderRadius: 8 }} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a" }}>Good morning, Coach!</div>
              <div style={{ fontSize: 11, color: "#6b7c6e" }}>8 sessions scheduled today</div>
            </div>
          </div>
          <div style={{ fontSize: 10, padding: "4px 10px", borderRadius: 20, background: "rgba(13,154,165,0.1)", color: teal }}>v2.0</div>
        </div>

        {/* Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 12, marginBottom: 20 }}>
          <MetricCard label="Active Clients" value="12" sub="+3" />
          <MetricCard label="Attendance" value="83%" highlight />
          <MetricCard label="Success Rate" value="73%" sub="+8%" />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 8px" }}>
            <Ring value={83} size={tablet ? 40 : 48} />
            <span style={{ fontSize: 9, color: "#8b9a8e", marginTop: 4 }}>Engaged</span>
          </div>
        </div>

        {/* Client queue */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 14, marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#1a1a1a", marginBottom: 10 }}>Today&apos;s Queue</div>
          {[
            { name: "Sarah Chen", status: "Session Today", color: teal },
            { name: "Marcus J.", status: "Assessment Due", color: "#f59e0b" },
          ].map((c, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < 1 ? "1px solid #f0f4f1" : "none" }}>
              <Avatar initials={c.name.split(" ").map(n => n[0]).join("")} color={c.color} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: "#1a1a1a" }}>{c.name}</div>
                <div style={{ fontSize: 10, color: c.color }}>{c.status}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <ChatBubble isAi text="Sarah Chen has lower body today. She hit 120x6 on squats last session — ready to test progression." />
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", paddingLeft: 32 }}>
            <ActionPill text="Pull up Sarah&apos;s program" />
            <ActionPill text="Show squat progression" />
          </div>
        </div>
      </DashboardCard>

      {/* RIGHT: Director Dashboard */}
      <DashboardCard style={{ flex: 1, transform: "rotate(1deg) translateY(-8px)" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Milton%20Face%20Logo-whMWzOXBgBgulGUqdRthSEMsjeyWPe.png" alt="" style={{ width: 32, height: 32, borderRadius: 8 }} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a" }}>Good morning, Director.</div>
              <div style={{ fontSize: 11, color: "#6b7c6e" }}>Team of 6 trainers</div>
            </div>
          </div>
          <button style={{ fontSize: 11, padding: "8px 14px", borderRadius: 8, background: teal, color: "#fff", border: "none", fontWeight: 500 }}>+ Add Trainer</button>
        </div>

        {/* Revenue card */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 16, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div style={{ fontSize: 10, color: "#8b9a8e", letterSpacing: 0.5, marginBottom: 4, textTransform: "uppercase" }}>Weekly Gross</div>
              <div style={{ fontSize: tablet ? 28 : 34, fontWeight: 600, color: "#1a1a1a" }}>$57.6K</div>
              <div style={{ fontSize: 12, color: "#22c55e" }}>+8%</div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 50 }}>
              {[45, 55, 70, 85].map((h, i) => (
                <div key={i} style={{ width: tablet ? 12 : 16, height: `${h}%`, background: i === 3 ? teal : "rgba(13,154,165,0.25)", borderRadius: 3 }} />
              ))}
            </div>
          </div>
        </div>

        {/* Metrics row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 14, display: "flex", alignItems: "center", gap: 14 }}>
            <Ring value={86} size={tablet ? 40 : 48} />
            <div>
              <div style={{ fontSize: 10, color: "#8b9a8e", marginBottom: 2 }}>ATTENDANCE</div>
              <div style={{ fontSize: 9, color: "#6b7c6e" }}>248/287 sessions</div>
            </div>
          </div>
          <div style={{ background: "#fff", borderRadius: 12, padding: 14 }}>
            <div style={{ fontSize: 10, color: "#8b9a8e", marginBottom: 4 }}>+/- CLIENTS</div>
            <div style={{ display: "flex", gap: 10 }}>
              <span style={{ fontSize: 18, fontWeight: 600, color: "#22c55e" }}>+15</span>
              <span style={{ fontSize: 18, fontWeight: 600, color: "#ef4444" }}>-7</span>
            </div>
            <div style={{ fontSize: 10, color: teal }}>Net +8 this month</div>
          </div>
        </div>

        {/* Trainer roster preview */}
        <div style={{ fontSize: 11, fontWeight: 600, color: "#1a1a1a", marginBottom: 10 }}>Trainer Roster</div>
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { init: "JT", color: "#ef4444" },
            { init: "MC", color: teal },
            { init: "BL", color: teal },
            { init: "PS", color: teal },
          ].map((t, i) => (
            <Avatar key={i} initials={t.init} color={t.color} />
          ))}
          <div style={{ width: 32, height: 32, borderRadius: 8, border: "1px dashed #c5d0c8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#8b9a8e" }}>+2</div>
        </div>
      </DashboardCard>
    </div>
  );
}



export default function MiltonHomepage() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { mobile, tablet, desktop } = useBreakpoint();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const sectionEls = sections.filter(s => s.id !== "hero").map(s => ({
        id: s.id, el: document.getElementById(s.id),
      })).filter(s => s.el);
      let current = "hero";
      for (const s of sectionEls) {
        if (s.el.getBoundingClientRect().top <= 200) current = s.id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navSections = sections.filter(s => s.num);
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
    <div style={{ minHeight: "100vh", background: "#061c27", color: "#fff", position: "relative", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap" rel="stylesheet" />

      {/* Aurora bg */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 50% at 20% 20%, rgba(13,154,165,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(154,241,152,0.04) 0%, transparent 50%), radial-gradient(ellipse 90% 60% at 50% 0%, rgba(8,69,94,0.3) 0%, transparent 70%)",
      }} />

      {/* ——— NAV ——— */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: mobile ? "12px 16px" : "16px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled || menuOpen ? "rgba(6,28,39,0.95)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(13,154,165,0.1)" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Milton%20Face%20Logo-whMWzOXBgBgulGUqdRthSEMsjeyWPe.png"
            alt="Milton Logo"
            style={{
              width: mobile ? 36 : 44,
              height: mobile ? 36 : 44,
              borderRadius: 8,
              objectFit: "cover",
            }}
          />
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
            fontSize: mobile ? 16 : 20, color: "#fff", letterSpacing: 2,
          }}>MILTON</span>
        </div>

        {!mobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <CTA variant="secondary" style={{ padding: "10px 24px", fontSize: 14 }}>Login</CTA>
            <CTA variant="secondary" style={{ padding: "10px 24px", fontSize: 14 }}>Request a Demo</CTA>
            <CTA variant="primary" style={{ padding: "10px 24px", fontSize: 14 }}>Get Pricing</CTA>
          </div>
        )}

        {mobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: "none", border: "none", cursor: "pointer", padding: 8,
            display: "flex", flexDirection: "column", gap: 5, position: "relative", zIndex: 101,
          }}>
            <div style={{ width: 22, height: 2, background: "#fff", borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
            <div style={{ width: 22, height: 2, background: "#fff", borderRadius: 2, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
            <div style={{ width: 22, height: 2, background: "#fff", borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
          </button>
        )}
      </nav>

      {/* Mobile menu */}
      {mobile && menuOpen && (
        <div style={{
          position: "fixed", top: 54, left: 0, right: 0, bottom: 0, zIndex: 99,
          background: "rgba(6,28,39,0.98)", backdropFilter: "blur(20px)",
          padding: "28px 24px", display: "flex", flexDirection: "column", gap: 8,
          overflowY: "auto",
        }}>
          {navSections.map(s => (
            <button key={s.id} onClick={() => {
              document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" });
              setMenuOpen(false);
            }} style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "14px 0", textAlign: "left",
              borderBottom: "1px solid rgba(13,154,165,0.1)",
            }}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500,
                color: activeSection === s.id ? "#0d9aa5" : "rgba(255,255,255,0.6)",
                letterSpacing: 1.5, textTransform: "uppercase",
              }}>{s.num} {s.label}</span>
            </button>
          ))}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
            <CTA variant="primary" style={{ width: "100%", textAlign: "center", padding: "14px 0" }}>Get Pricing</CTA>
            <CTA variant="secondary" style={{ width: "100%", textAlign: "center", padding: "14px 0" }}>Request a Demo</CTA>
          </div>
        </div>
      )}

      {/* Side nav — desktop only */}
      {desktop && (
        <div style={{
          position: "fixed", left: 28, top: "50%", transform: "translateY(-50%)",
          zIndex: 90, display: "flex", flexDirection: "column", gap: 2,
        }}>
          {navSections.map(s => (
            <button key={s.id} onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })} style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "7px 12px", textAlign: "left",
              opacity: activeSection === s.id ? 1 : 0.3,
              transition: "opacity 0.3s ease",
              borderLeft: activeSection === s.id ? "2px solid #0d9aa5" : "2px solid transparent",
            }}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500,
                color: "#fff", letterSpacing: 1.5, textTransform: "uppercase",
              }}>{s.num} {s.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* ——— CONTENT ——— */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: `0 ${px}px` }}>

        {/* HERO */}
        <section id="hero" style={{
          minHeight: "100vh", display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "center", textAlign: "center",
          paddingTop: mobile ? 80 : 100, paddingBottom: mobile ? 40 : 0,
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 100, padding: mobile ? "6px 16px" : "8px 20px", marginBottom: mobile ? 24 : 40,
          }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: mobile ? 12 : 14, color: "rgba(255,255,255,0.7)" }}>
              Trusted by personal training businesses nationwide
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: mobile ? 38 : tablet ? 56 : "clamp(56px, 6vw, 80px)",
            fontWeight: 400, lineHeight: 1.1, color: "#fff",
            margin: "0 0 24px 0", maxWidth: 900,
          }}>
            The First AI Co-Pilot for Your{mobile ? " " : <br />}Personal Training Business.
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
            <CTA variant="primary" style={{ fontSize: mobile ? 14 : 15, padding: mobile ? "12px 28px" : "14px 32px" }}>Request a Demo</CTA>
            <CTA variant="secondary" style={{ fontSize: mobile ? 14 : 15, padding: mobile ? "12px 28px" : "14px 32px" }}>Get Pricing</CTA>
          </div>

          <HeroVisual mobile={mobile} tablet={tablet} />

          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: mobile ? 16 : 48, opacity: 0.35, flexWrap: "wrap", paddingBottom: 40,
          }}>
            {["MindBody", "ABC Fitness", "ClubReady", "BuzOps", "SuperSet"].map(name => (
              <span key={name} style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: mobile ? 10 : 14, fontWeight: 600, letterSpacing: mobile ? 1 : 2,
                textTransform: "uppercase", color: "#fff",
              }}>{name}</span>
            ))}
          </div>
        </section>

        {/* 01 HEAD COACH */}
        <section id="coach" style={{ padding: sectionPad }}>
          <SectionLabel text="YOUR COACHING CO-PILOT" />
          <SectionDivider />
          <Headline>Every trainer performs like your <Accent>best</Accent> trainer.</Headline>
          <Body>Your best trainer follows up before the client thinks about canceling. They prep for every session. They track progressive overload without being asked. They know when to push and when to pull back. Milton puts that mind in the pocket of every trainer on your floor.</Body>
          <GridRow cols={2}>
            <FeatureCard title="Session Intelligence" body="Milton briefs your trainer before every session — what you did last time, where the client is in their program, what to focus on today. No more scrambling to remember." />
            <FeatureCard title="Workout Programming & Tracking" body="Build programs, log sessions, track progressive overload, and make progress visual. Clients see their gains. Trainers see what's working. Everyone stays accountable." />
          </GridRow>
          <div style={{ height: mobile ? 16 : 20 }} />
          <GridRow cols={2}>
            <FeatureCard title="Automated Follow-Up" body="Session just ended? Milton drafts the follow-up. Client no-showed? Milton flags it and suggests the re-engagement message. The small things that separate good from great — handled." />
            <FeatureCard title="Nutrition & Challenges" body="Run nutrition challenges that generate revenue. Give your trainers the tools to offer real nutrition guidance through a companion app that makes it simple for clients." />
          </GridRow>
          <div style={{ height: mobile ? 16 : 20 }} />
          <FeatureCard title="Career Development" body="Milton doesn't just help trainers do their job �� it shows them where their gaps are and how to grow. Follow-up habits, coaching skills, client results. Trainers see their path to earning more and building a real career." visualHeight={240} />
        </section>

        {/* 02 FITNESS DIRECTOR */}
        <section id="director" style={{ padding: sectionPad }}>
          <SectionLabel text="YOUR DIRECTOR CO-PILOT" />
          <SectionDivider />
          <Headline>The view you've been building in <Accent>spreadsheets</Accent> for years.</Headline>
          <Body>Tracking attendance in one sheet. Consultations and close rates in another. Follow-ups and weekly check-ins in a third. Cross-referencing your scheduling software and doing the math in your head to figure out who's growing and who's slipping. Milton replaces all of it with one intelligent view.</Body>
          <GridRow cols={2}>
            <FeatureCard title="Trainer Performance at a Glance" body="Every trainer on one screen. Active clients, plus or minus from last week. Projected gross for the month. Retention rate. Follow-up rate. Consultation close rate. Updated in real time." visualHeight={220} />
            <FeatureCard title="The Six-Month Cliff" body="If you keep a client past six months, they typically stay two years or more. Milton tracks every client against that milestone so you can intervene before the drop-off — not after." visualHeight={220} />
          </GridRow>
          <div style={{ height: mobile ? 16 : 20 }} />
          <GridRow cols={2}>
            <FeatureCard title="Gap Identification" body="Is it a coaching skills issue? A follow-up issue? A scheduling issue? Milton identifies which pillar a struggling trainer needs help with — so your next conversation is specific, not a guessing game." visualHeight={220} />
            <FeatureCard title="Trainer Development Paths" body="Milton builds development plans so your newer trainers see exactly how to level up, earn more, and build a career — not just a job that burns them out in 18 months. Your training philosophy, delivered consistently, at scale." visualHeight={220} />
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
            <VisualPlaceholder height={440} mobileHeight={260} />
          </div>
        </section>

        {/* 04 OPS COORDINATOR */}
        <section id="ops" style={{ padding: sectionPad }}>
          <SectionLabel text="AI-POWERED OPS" />
          <SectionDivider />
          <Headline>Don't just connect to your ops stack. Let an agent <Accent>run</Accent> it.</Headline>
          <Body>For teams ready to go further, Milton's Operations Coordinator takes the busywork off your plate entirely. Scheduling, rebooking, payment follow-ups, waitlist management — handled by an AI agent that works inside your existing systems.</Body>
          <Body italic style={{ margin: "-24px 0 48px 0" }}>You don't have to use it. But when your front desk is overwhelmed and your fitness director is spending half their day on admin — it's there.</Body>
          <GridRow cols={3}>
            <FeatureCard title="Smart Scheduling" body="Automated booking, rebooking, and waitlist management that adapts to trainer availability and client preferences." visualHeight={180} />
            <FeatureCard title="Payment & Billing Automation" body="Follow up on missed payments, send invoices, manage package renewals — without your front desk chasing anyone down." visualHeight={180} />
            <FeatureCard title="Operational Alerts" body="Milton flags what slips through the cracks. A trainer's schedule is light. A client hasn't rebooked. Revenue is trending down. You'll know before it's a problem." visualHeight={180} />
          </GridRow>
        </section>

        {/* 05 CONCIERGE */}
        <section id="concierge" style={{ padding: sectionPad }}>
          <SectionLabel text="MEMBER EXPERIENCE" />
          <SectionDivider />
          <Headline>A personal experience your members <Accent>never</Accent> outgrow.</Headline>
          <Body>Milton's Concierge gives your members a companion app that keeps them connected between sessions. Nutrition logging, workout history, progress photos, goal tracking, direct messaging with their trainer — all in one place.</Body>
          <Body italic style={{ margin: "-24px 0 48px 0" }}>You don't have to turn it on. But when you're ready to offer more without hiring more, this is how.</Body>
          <GridRow cols={3}>
            <FeatureCard title="Companion App" body="Your members get a clean, branded experience for logging nutrition, viewing their programs, tracking progress, and communicating with their trainer — all from their phone." visualHeight={180} />
            <FeatureCard title="Nutrition Challenges" body="Launch challenges that drive engagement, build community, and generate new revenue. Milton handles the tracking, the leaderboards, and the nudges." visualHeight={180} />
            <FeatureCard title="Omnichannel Communication" body="SMS, email, in-app — Milton meets your members wherever they are, with the right message at the right time. Pre-session prep. Post-session recaps. Re-engagement when they go quiet." visualHeight={180} />
          </GridRow>
        </section>

        {/* 06 CASE STUDIES */}
        <section id="casestudies" style={{ padding: sectionPad }}>
          <SectionLabel text="REAL RESULTS" />
          <SectionDivider />
          <Headline>Built <Accent>with</Accent> trainers, not for them.</Headline>
          <Body>Milton wasn't designed by engineers guessing from the outside. It was built shoulder-to-shoulder with real gym owners, fitness directors, and personal trainers who've spent decades figuring out what actually works.</Body>

          <GridRow cols={3}>
            <div style={{ background: "rgba(8,69,94,0.15)", border: "1px solid rgba(13,154,165,0.2)", borderRadius: mobile ? 12 : 16, overflow: "hidden" }}>
              <VisualPlaceholder height={200} mobileHeight={160} style={{ borderRadius: 0 }} />
              <div style={{ padding: mobile ? 20 : 28 }}>
                <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: mobile ? 16 : 18, fontWeight: 600, color: "#fff", margin: "0 0 6px 0" }}>Optimal Performance</h4>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#0d9aa5", fontWeight: 500 }}>Wichita, KS</span>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.55)", margin: "14px 0 18px 0" }}>
                  Nearly two decades of personal training. A team ranging from brand new to veteran. They needed a system that develops younger coaches faster and replaces the spreadsheets consuming their week.
                </p>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: "#9af198", cursor: "pointer" }}>Download the Full Case Study →</span>
              </div>
            </div>

            <div style={{ background: "rgba(8,69,94,0.1)", border: "1px solid rgba(13,154,165,0.12)", borderRadius: mobile ? 12 : 16, overflow: "hidden" }}>
              <VisualPlaceholder height={200} mobileHeight={160} style={{ borderRadius: 0 }} />
              <div style={{ padding: mobile ? 20 : 28 }}>
                <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: mobile ? 16 : 18, fontWeight: 600, color: "#fff", margin: "0 0 6px 0" }}>Athletica Health & Fitness</h4>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>Coming Soon</span>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.35)", margin: "14px 0 18px 0" }}>Full case study in development. Get notified when it drops.</p>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: "rgba(154,241,152,0.5)", cursor: "pointer" }}>Notify Me →</span>
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
            <CTA variant="primary" style={{ fontSize: mobile ? 14 : 16, padding: mobile ? "14px 28px" : "16px 40px" }}>Request a Demo</CTA>
            <CTA variant="secondary" style={{ fontSize: mobile ? 14 : 16, padding: mobile ? "14px 28px" : "16px 40px" }}>Get Pricing</CTA>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{
          borderTop: "1px solid rgba(13,154,165,0.1)",
          padding: mobile ? "24px 0" : "40px 0",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexDirection: mobile ? "column" : "row", gap: mobile ? 12 : 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Milton%20Face%20Logo-whMWzOXBgBgulGUqdRthSEMsjeyWPe.png"
              alt="Milton Logo"
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                objectFit: "cover",
              }}
            />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "rgba(255,255,255,0.5)", letterSpacing: 2 }}>MILTON AI</span>
          </div>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.3)" }}>© 2026 MMNT Inc. All rights reserved.</span>
        </footer>
      </div>
    </div>
  );
}
