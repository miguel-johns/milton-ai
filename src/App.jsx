import { useState, useEffect } from "react";

function useBreakpoint() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return { mobile: w < 640, tablet: w >= 640 && w < 1024, desktop: w >= 1024, w };
}

function Accent({ children }) {
  return <span style={{ color: "#0d9aa5", fontStyle: "italic" }}>{children}</span>;
}

function Mint({ children }) {
  return <span style={{ color: "#9af198" }}>{children}</span>;
}

function CTA({ children, variant = "primary", style: s = {}, href, onClick }) {
  const base = {
    fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600,
    padding: "14px 32px", borderRadius: 100, cursor: "pointer",
    transition: "all 0.25s ease", textDecoration: "none",
    display: "inline-block", letterSpacing: 0.3, whiteSpace: "nowrap",
  };
  const styles = variant === "primary"
    ? { ...base, background: "#fff", color: "#08455e", border: "none", ...s }
    : { ...base, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", ...s };
  if (href) {
    return <a href={href} style={styles}>{children}</a>;
  }
  return <button style={styles} onClick={onClick}>{children}</button>;
}

function AccentLine() {
  return (
    <div style={{ 
      width: 48, 
      height: 2, 
      background: "linear-gradient(90deg, #0d9aa5, #9af198)", 
      marginBottom: 28 
    }} />
  );
}

function ProductCard({ icon, title, description, mobile, href, variant = "teal" }) {
  const [hovered, setHovered] = useState(false);
  const Wrapper = href ? 'a' : 'div';
  const wrapperProps = href ? { href, style: { textDecoration: 'none', display: 'block', height: '100%' } } : {};
  
  const colors = variant === "mint" 
    ? { bg: "rgba(154,241,152,0.06)", border: "rgba(154,241,152,0.3)", iconBg: "rgba(154,241,152,0.1)" }
    : { bg: "rgba(13,154,165,0.06)", border: "rgba(13,154,165,0.3)", iconBg: "rgba(13,154,165,0.1)" };
  
  return (
    <Wrapper {...wrapperProps}>
      <div 
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? colors.bg : "rgba(255,255,255,0.02)",
          border: hovered ? `1px solid ${colors.border}` : "1px solid rgba(255,255,255,0.06)",
          borderRadius: 16,
          padding: mobile ? "24px 20px" : "32px 24px",
          transition: "all 0.3s ease",
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: href ? "pointer" : "default",
        }}
      >
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: colors.iconBg,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 16,
      }}>
        {icon}
      </div>
      <h3 style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: mobile ? 16 : 17,
        fontWeight: 600, color: "#fff",
        margin: "0 0 10px 0",
      }}>{title}</h3>
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: mobile ? 13 : 14,
        lineHeight: 1.65, color: "rgba(255,255,255,0.55)",
        margin: 0,
        flex: 1,
      }}>{description}</p>
      </div>
    </Wrapper>
  );
}

// Enhanced Agent Card with mockup previews
function AgentCard({ icon, title, description, mobile, href, mockup }) {
  const [hovered, setHovered] = useState(false);
  const Wrapper = href ? 'a' : 'div';
  const wrapperProps = href ? { href, style: { textDecoration: 'none', display: 'block', height: '100%' } } : {};
  
  return (
    <Wrapper {...wrapperProps}>
      <div 
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "rgba(13, 30, 50, 0.6)",
          border: hovered ? "1px solid rgba(43, 191, 170, 0.25)" : "1px solid rgba(43, 191, 170, 0.12)",
          borderRadius: 16,
          padding: mobile ? "28px 24px 24px" : "40px 36px 36px",
          transition: "all 0.3s ease",
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: mobile ? 20 : 28,
          cursor: href ? "pointer" : "default",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top gradient line on hover */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, #0d9aa5, transparent)",
          opacity: hovered ? 0.5 : 0,
          transition: "opacity 0.3s ease",
        }} />
        
        {/* Text content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 10,
            background: "rgba(43, 191, 170, 0.08)",
            border: "1px solid rgba(43, 191, 170, 0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 8,
            color: "#0d9aa5",
          }}>
            {icon}
          </div>
          <h3 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: mobile ? 18 : 22,
            fontWeight: 700, 
            color: "#f0f4f8",
            margin: 0,
            letterSpacing: "-0.01em",
          }}>{title}</h3>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: mobile ? 14 : 15,
            lineHeight: 1.6, 
            color: "rgba(240, 244, 248, 0.72)",
            margin: 0,
            maxWidth: 420,
          }}>{description}</p>
        </div>
        
        {/* Mockup preview */}
        {mockup && (
          <div style={{
            background: "rgba(8, 20, 38, 0.7)",
            border: "1px solid rgba(43, 191, 170, 0.08)",
            borderRadius: 12,
            padding: mobile ? 16 : 20,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}>
            {mockup}
          </div>
        )}
      </div>
    </Wrapper>
  );
}

// Mockup Components for Agent Cards
function CoachCoPilotMockup({ mobile }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{
        padding: mobile ? "8px 12px" : "10px 14px",
        borderRadius: 10,
        fontSize: mobile ? 12 : 13,
        lineHeight: 1.5,
        maxWidth: "85%",
        color: "rgba(240, 244, 248, 0.72)",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.06)",
        alignSelf: "flex-end",
      }}>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4, display: "block", color: "rgba(255,255,255,0.35)" }}>Coach</span>
        Sarah says her left knee is flaring up again
      </div>
      <div style={{
        padding: mobile ? "8px 12px" : "10px 14px",
        borderRadius: 10,
        fontSize: mobile ? 12 : 13,
        lineHeight: 1.5,
        maxWidth: "85%",
        color: "rgba(240, 244, 248, 0.72)",
        background: "rgba(43, 191, 170, 0.08)",
        border: "1px solid rgba(43, 191, 170, 0.12)",
        alignSelf: "flex-start",
      }}>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4, display: "block", color: "#0d9aa5" }}>Milton</span>
        Sarah reported knee pain 3x in 6 weeks. Suggest swapping lunges for hip hinge variations.
      </div>
    </div>
  );
}

function DirectorCoPilotMockup({ mobile }) {
  const trainers = [
    { name: "Marcus T.", sessions: "24 sessions / week", retention: "92%", status: "good" },
    { name: "Jenna R.", sessions: "18 sessions / week", retention: "74%", status: "warn" },
    { name: "Kyle D.", sessions: "12 sessions / week", retention: "58%", status: "low" },
  ];
  const statusColors = {
    good: { bg: "rgba(154, 241, 152, 0.1)", color: "#9af198" },
    warn: { bg: "rgba(255, 200, 50, 0.1)", color: "#f0c832" },
    low: { bg: "rgba(255, 100, 100, 0.08)", color: "#ff8a8a" },
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {trainers.map((t, i) => (
        <div key={i} style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: mobile ? "8px 12px" : "10px 14px",
          background: "rgba(255,255,255,0.03)",
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.04)",
        }}>
          <div>
            <div style={{ fontSize: mobile ? 12 : 13, fontWeight: 500, color: "#f0f4f8" }}>{t.name}</div>
            <div style={{ fontSize: 11, color: "rgba(240, 244, 248, 0.55)" }}>{t.sessions}</div>
          </div>
          <span style={{
            fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 6,
            background: statusColors[t.status].bg,
            color: statusColors[t.status].color,
          }}>{t.retention} retention</span>
        </div>
      ))}
    </div>
  );
}

function AICoachMockup({ mobile }) {
  const exercises = [
    { name: "Barbell Back Squat", sets: "4 × 6" },
    { name: "Romanian Deadlift", sets: "3 × 10" },
    { name: "Bulgarian Split Squat", sets: "3 × 8/side" },
    { name: "Hip Thrust", sets: "3 × 12" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#0d9aa5", marginBottom: 2 }}>
        Today — Lower Body Strength
      </div>
      {exercises.map((e, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: mobile ? "6px 10px" : "8px 12px",
          background: "rgba(255,255,255,0.03)",
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.04)",
          fontSize: mobile ? 12 : 13,
          color: "rgba(240, 244, 248, 0.72)",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#0d9aa5", flexShrink: 0 }} />
          {e.name}
          <span style={{ marginLeft: "auto", fontSize: 11, color: "rgba(240, 244, 248, 0.55)", fontWeight: 500 }}>{e.sets}</span>
        </div>
      ))}
    </div>
  );
}

function AIBrandingMockup({ mobile }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: 14,
        background: "rgba(255,255,255,0.03)",
        borderRadius: 8,
        border: "1px solid rgba(255,255,255,0.04)",
      }}>
        <div style={{
          width: 48, height: 48, borderRadius: 10,
          background: "linear-gradient(135deg, #0d9aa5, #2BBFAA)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 20, fontWeight: 700, color: "#0B1628",
          flexShrink: 0,
        }}>EP</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#f0f4f8" }}>Elite Performance</div>
          <div style={{ fontSize: 11, color: "rgba(240, 244, 248, 0.55)" }}>Train Smarter. Live Stronger.</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {["#1a1a2e", "#16213e", "#0f3460", "#e94560", "#f5f5f5"].map((c, i) => (
          <div key={i} style={{ width: 28, height: 28, borderRadius: 6, background: c, border: "1px solid rgba(255,255,255,0.06)" }} />
        ))}
      </div>
    </div>
  );
}

function SchedulingMockup({ mobile }) {
  const slots = [
    { time: "6:00 AM", name: "Marcus — Boot Camp", status: "Booked" },
    { time: "7:30 AM", name: "Sarah K. — 1-on-1", status: "Booked" },
    { time: "9:00 AM", name: "Available", status: "Open" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {slots.map((s, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: mobile ? "8px 12px" : "10px 14px",
          background: "rgba(255,255,255,0.03)",
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.04)",
        }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#0d9aa5", minWidth: 58 }}>{s.time}</span>
          <span style={{ fontSize: 13, color: "rgba(240, 244, 248, 0.72)" }}>{s.name}</span>
          <span style={{
            marginLeft: "auto",
            fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em",
            padding: "3px 8px", borderRadius: 4,
            background: s.status === "Open" ? "rgba(255,255,255,0.05)" : "rgba(43, 191, 170, 0.1)",
            color: s.status === "Open" ? "rgba(240, 244, 248, 0.55)" : "#0d9aa5",
          }}>{s.status}</span>
        </div>
      ))}
    </div>
  );
}

function ReceptionistMockup({ mobile }) {
  const entries = [
    { caller: "James P.", action: "Missed call → AI follow-up sent" },
    { caller: "Maria G.", action: "Voicemail → Consultation booked" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {entries.map((e, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: mobile ? "8px 12px" : "10px 14px",
          background: "rgba(255,255,255,0.03)",
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.04)",
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "rgba(43, 191, 170, 0.1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, color: "#0d9aa5",
          }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 7h12M8 2l5 5-5 5"/></svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#f0f4f8" }}>{e.caller}</div>
            <div style={{ fontSize: 11, color: "rgba(240, 244, 248, 0.55)" }}>{e.action}</div>
          </div>
          <span style={{
            marginLeft: "auto",
            fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 4,
            background: "rgba(154, 241, 152, 0.1)",
            color: "#9af198",
            textTransform: "uppercase", letterSpacing: "0.05em",
          }}>Handled</span>
        </div>
      ))}
    </div>
  );
}

function AcquisitionMockup({ mobile }) {
  const funnelData = [
    { label: "Results posted", num: 142, width: "90%" },
    { label: "Referrals sent", num: 78, width: "55%" },
    { label: "Consults booked", num: 34, width: "28%" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {funnelData.map((f, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "8px 14px",
          borderRadius: 8,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.04)",
        }}>
          <span style={{ fontSize: 12, color: "rgba(240, 244, 248, 0.72)", minWidth: 80 }}>{f.label}</span>
          <div style={{ flex: 1 }}>
            <div style={{ height: 4, borderRadius: 2, background: "linear-gradient(90deg, #0d9aa5, #2BBFAA)", width: f.width }} />
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#f0f4f8" }}>{f.num}</span>
        </div>
      ))}
    </div>
  );
}

function AgenticCommerceMockup({ mobile }) {
  const steps = [
    { text: "Client hits 12-week milestone", active: true },
    { text: "AI generates progress summary", active: true },
    { text: "Personalized upsell: 6-month package", active: true },
    { text: "Client converts → $1,200 revenue", active: false },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {steps.map((s, i) => (
        <div key={i}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "8px 12px",
            fontSize: 12,
            color: "rgba(240, 244, 248, 0.72)",
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: "50%",
              border: "2px solid #0d9aa5",
              background: s.active ? "#0d9aa5" : "transparent",
              flexShrink: 0,
            }} />
            {s.text}
          </div>
          {i < steps.length - 1 && (
            <div style={{ width: 2, height: 16, background: "rgba(43, 191, 170, 0.2)", marginLeft: 15 }} />
          )}
        </div>
      ))}
    </div>
  );
}

function StripeCRMMockup({ mobile }) {
  const rows = [
    { label: "Sarah K. — Monthly", sub: "Auto-renews May 1", amount: "$299/mo" },
    { label: "James P. — 10-Pack", sub: "3 sessions remaining", amount: "$750" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {rows.map((r, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: mobile ? "8px 12px" : "10px 14px",
          background: "rgba(255,255,255,0.03)",
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.04)",
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 6,
            background: "rgba(99, 91, 255, 0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#635bff"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/></svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <div style={{ fontSize: 13, color: "#f0f4f8", fontWeight: 500 }}>{r.label}</div>
            <div style={{ fontSize: 11, color: "rgba(240, 244, 248, 0.55)" }}>{r.sub}</div>
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#9af198", marginLeft: "auto" }}>{r.amount}</span>
        </div>
      ))}
    </div>
  );
}

function CaseStudyCard({ metric, title, description, mobile }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(13,154,165,0.06)" : "rgba(255,255,255,0.02)",
        border: hovered ? "1px solid rgba(13,154,165,0.3)" : "1px solid rgba(255,255,255,0.06)",
        borderRadius: 16,
        padding: mobile ? "28px 24px" : "36px 28px",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
    >
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: mobile ? 40 : 48,
        fontWeight: 400,
        color: "#9af198",
        lineHeight: 1,
        marginBottom: 12,
      }}>{metric}</div>
      <h3 style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: mobile ? 16 : 18,
        fontWeight: 600, color: "#fff",
        margin: "0 0 10px 0",
      }}>{title}</h3>
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: mobile ? 13 : 14,
        lineHeight: 1.6, color: "rgba(255,255,255,0.55)",
        margin: "0 0 16px 0",
      }}>{description}</p>
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13,
        fontWeight: 500,
        color: "#0d9aa5",
      }}>Read the full story &rarr;</span>
    </div>
  );
}

// Icons for product cards
const CoachIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" stroke="#0d9aa5" strokeWidth="1.5"/>
    <path d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20" stroke="#0d9aa5" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M16 11L17.5 12.5L21 9" stroke="#9af198" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MemberIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z" stroke="#0d9aa5" strokeWidth="1.5"/>
    <path d="M3 21C3 17.134 7.02944 14 12 14C16.9706 14 21 17.134 21 21" stroke="#0d9aa5" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="8" r="2" fill="#9af198"/>
  </svg>
);

const DashboardIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="3" stroke="#0d9aa5" strokeWidth="1.5" fill="none"/>
    <path d="M7 14L10 11L13 13L17 9" stroke="#9af198" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const WebsiteIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="#0d9aa5" strokeWidth="1.5"/>
    <line x1="3" y1="9" x2="21" y2="9" stroke="#0d9aa5" strokeWidth="1.5"/>
    <circle cx="6" cy="6.5" r="1" fill="#9af198"/>
    <circle cx="9" cy="6.5" r="1" fill="#0d9aa5"/>
  </svg>
);

const MarketingIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M4 4L11 7.5V16.5L4 20V4Z" stroke="#0d9aa5" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M11 7.5L20 4V20L11 16.5" stroke="#0d9aa5" strokeWidth="1.5" strokeLinejoin="round"/>
    <circle cx="15" cy="12" r="2" fill="#9af198"/>
  </svg>
);

const ReceptionistIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 18C16.4183 18 20 14.4183 20 10V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V10C4 14.4183 7.58172 18 12 18Z" stroke="#0d9aa5" strokeWidth="1.5"/>
    <path d="M12 18V21" stroke="#0d9aa5" strokeWidth="1.5"/>
    <path d="M8 21H16" stroke="#0d9aa5" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="9" cy="10" r="1.5" fill="#9af198"/>
    <circle cx="15" cy="10" r="1.5" fill="#9af198"/>
  </svg>
);

const CRMIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="6" width="18" height="12" rx="2" stroke="#0d9aa5" strokeWidth="1.5"/>
    <path d="M3 10H21" stroke="#0d9aa5" strokeWidth="1.5"/>
    <path d="M7 14H10" stroke="#9af198" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const AICoachIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" stroke="#0d9aa5" strokeWidth="1.5"/>
    <path d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20" stroke="#0d9aa5" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 4V2" stroke="#9af198" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M15.5 5L17 3.5" stroke="#9af198" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8.5 5L7 3.5" stroke="#9af198" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const SchedulingIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="#0d9aa5" strokeWidth="1.5"/>
    <path d="M3 9H21" stroke="#0d9aa5" strokeWidth="1.5"/>
    <path d="M8 2V5" stroke="#0d9aa5" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M16 2V5" stroke="#0d9aa5" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="15" r="2" fill="#9af198"/>
  </svg>
);

const StrategyIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="#0d9aa5" strokeWidth="1.5"/>
    <path d="M12 7V12L15 15" stroke="#9af198" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ImplementationIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M9 11L12 14L22 4" stroke="#9af198" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16" stroke="#0d9aa5" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const AcademyIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 3L2 9L12 15L22 9L12 3Z" stroke="#0d9aa5" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M2 9V15" stroke="#0d9aa5" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M6 11V17C6 17 8 20 12 20C16 20 18 17 18 17V11" stroke="#0d9aa5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="9" r="2" fill="#9af198"/>
  </svg>
);

const PromptIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="2" stroke="#0d9aa5" strokeWidth="1.5"/>
    <path d="M8 9H16" stroke="#9af198" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 12H14" stroke="#0d9aa5" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 15H12" stroke="#0d9aa5" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export default function MiltonHomepage() {
  const { mobile, tablet } = useBreakpoint();
  const px = mobile ? 20 : tablet ? 32 : 40;
  const sectionPad = mobile ? "80px 0" : "120px 0";

  const Headline = ({ children, style = {} }) => (
    <h2 style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: mobile ? 32 : tablet ? 40 : "clamp(40px, 4.5vw, 56px)",
      fontWeight: 400, lineHeight: 1.15, color: "#fff",
      margin: "0 0 28px 0", ...style,
    }}>{children}</h2>
  );

  const Body = ({ children, style = {} }) => (
    <p style={{
      fontFamily: "'DM Sans', sans-serif", fontSize: mobile ? 15 : 17,
      lineHeight: 1.75, color: "rgba(255,255,255,0.55)",
      maxWidth: 660, margin: "0 0 24px 0", ...style,
    }}>{children}</p>
  );

  // AI Agents with enhanced descriptions and mockups
  const agents = [
    { 
      icon: <CoachIcon />, 
      title: "Coach Co-Pilot", 
      description: "Real-time AI that rides shotgun with your trainers — surfacing client history, flagging risk, and suggesting programming adjustments mid-session.", 
      href: "#/coach-copilot",
      mockup: <CoachCoPilotMockup mobile={mobile} />
    },
    { 
      icon: <DashboardIcon />, 
      title: "Director Co-Pilot", 
      description: "Give your fitness director a command center — trainer utilization, session quality scores, and retention risk all in one view so nothing slips through the cracks.", 
      href: "#/director-dashboard",
      mockup: <DirectorCoPilotMockup mobile={mobile} />
    },
    { 
      icon: <AICoachIcon />, 
      title: "AI Coach", 
      description: "A fully autonomous AI trainer for members who don't work with a coach — delivering NASM-compliant programming, check-ins, and progressive overload without human intervention.", 
      href: "#/ai-coach",
      mockup: <AICoachMockup mobile={mobile} />
    },
    { 
      icon: <WebsiteIcon />, 
      title: "AI Branding", 
      description: "Generate a complete brand identity for any trainer — logo, color palette, and marketing copy — in minutes instead of weeks.", 
      href: "#/websites",
      mockup: <AIBrandingMockup mobile={mobile} />
    },
    { 
      icon: <SchedulingIcon />, 
      title: "AI-Powered Scheduling", 
      description: "Self-serve booking that fills your trainers' calendars automatically — members book sessions, consults, or group classes without a single back-and-forth.", 
      href: "#/scheduling",
      mockup: <SchedulingMockup mobile={mobile} />
    },
    { 
      icon: <ReceptionistIcon />, 
      title: "AI Receptionist", 
      description: "Never miss a lead again. AI answers calls, captures voicemails, and follows up automatically — so your front desk runs 24/7 even when nobody's there.", 
      href: "#/receptionist",
      mockup: <ReceptionistMockup mobile={mobile} />
    },
    { 
      icon: <MarketingIcon />, 
      title: "AI Acquisition Engine", 
      description: "Turn your best client results into a referral flywheel — AI identifies success stories, generates social proof, and triggers outreach to warm prospects.", 
      href: "#/acquisition",
      mockup: <AcquisitionMockup mobile={mobile} />
    },
    { 
      icon: <MemberIcon />, 
      title: "Agentic Commerce", 
      description: "AI-powered workflows that drive leads toward the stuff you sell — packages, memberships, supplements, and merch — at exactly the right moment.", 
      href: "#/agentic-commerce",
      mockup: <AgenticCommerceMockup mobile={mobile} />
    },
    { 
      icon: <CRMIcon />, 
      title: "Stripe-Powered CRM & POS", 
      description: "Payments, memberships, and client management unified through Stripe — one system for revenue, not five disconnected tools.", 
      href: "#/stripe-crm",
      mockup: <StripeCRMMockup mobile={mobile} />
    },
  ];

  // AI Services
  const services = [
    { icon: <StrategyIcon />, title: "AI Strategy Session", description: "Free one-on-one consultation and AI audit.", href: "#/consultation" },
    { icon: <ImplementationIcon />, title: "Implementation Science", description: "Hands-on deployment with your team.", href: "#/implementation" },
    { icon: <AcademyIcon />, title: "Milton Academy", description: "Coming Soon", href: "#/academy" },
    { icon: <PromptIcon />, title: "Prompt Library", description: "Coming Soon", href: "#/prompts" },
  ];

  const caseStudies = [
    { metric: "+34%", title: "Session Rebooking Rate", description: "Optimal Performance saw a dramatic increase in session rebooking within the first 90 days of implementing Milton." },
    { metric: "12hrs", title: "Saved Per Week", description: "Director time reclaimed from manual tracking and cross-referencing spreadsheets." },
    { metric: "0%", title: "Trainer Turnover", description: "Zero trainer departures since implementing the coach co-pilot system." },
  ];

  return (
    <>
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: `0 ${px}px` }}>

        {/* SECTION 1 — HERO */}
        <section id="hero" style={{
          minHeight: "100vh", display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "center", textAlign: "center",
          paddingTop: mobile ? 80 : 100, paddingBottom: mobile ? 40 : 60,
        }}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: mobile ? 36 : tablet ? 48 : "clamp(40px, 5vw, 64px)",
            fontWeight: 400, lineHeight: 1.12, color: "#fff",
            margin: "0 0 24px 0", maxWidth: 850,
          }}>
            Milton is the AI operating system for personal training businesses.
          </h1>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: mobile ? 15 : 18,
            lineHeight: 1.65, color: "rgba(255,255,255,0.5)",
            maxWidth: 600, margin: "0 0 36px 0", padding: mobile ? "0 4px" : 0,
          }}>
            AI tools, co-pilots, and expert guidance for every part of your operation.
          </p>

          <div style={{ display: "flex", gap: 12, marginBottom: mobile ? 48 : 64, flexWrap: "wrap", justifyContent: "center" }}>
            <CTA variant="primary" style={{ fontSize: mobile ? 14 : 15, padding: mobile ? "12px 28px" : "14px 32px" }} href="#/book">See it in action</CTA>
            <CTA variant="secondary" style={{ fontSize: mobile ? 14 : 15, padding: mobile ? "12px 28px" : "14px 32px" }} href="#/book">AI Consultation</CTA>
          </div>

          {/* Logo Carousel */}
          <div style={{ width: "100%", marginTop: 20 }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              marginBottom: 20,
            }}>Trusted by leading personal training businesses</p>
            <div style={{
              display: "flex",
              gap: mobile ? 32 : 48,
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              opacity: 0.5,
            }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#fff", fontWeight: 500 }}>Optimal Performance</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#fff", fontWeight: 500 }}>Athletica</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#fff", fontWeight: 500 }}>FitCore</span>
            </div>
          </div>
        </section>

        {/* SECTION 2 — AI IS HERE */}
        <section id="system" style={{ padding: sectionPad }}>
          <AccentLine />
          <Headline>AI is here. <Accent>We make it work for you.</Accent></Headline>
          
          <Body>
            AI is changing everything — but if you&apos;re running a gym, you don&apos;t have time to figure out which tools matter, how to set them up, or what&apos;s actually worth it. That&apos;s where Milton comes in.
          </Body>
          
          <Body>
            We take the most powerful AI capabilities available today and apply them to the workflows you already live in — programming sessions, following up with members, filling your schedule, managing your team, growing your revenue. The stuff that eats your day, keeps you up at night, or just never gets done.
          </Body>
          
          <Body>
            The result? Your trainers coach better without working harder. Your members feel seen and stay longer. Your front desk runs itself. Your marketing actually happens. And you stop duct-taping five different tools together just to get through the week.
          </Body>
          
          <Body>
            Milton is one system that touches every role in your business — with an expert team behind it that makes sure it actually works. Not a login you&apos;ll forget about. Not a demo that goes nowhere. Real tools, deployed in your operation, producing results this week.
          </Body>
          
          <Body style={{ marginBottom: 0 }}>
            <Mint>You don&apos;t need to become an AI expert. You just need the right one in your corner.</Mint>
          </Body>
        </section>

        {/* SECTION 3 — AI AGENTS & SERVICES */}
        <section id="products" style={{ padding: sectionPad }}>
          <div style={{ textAlign: "center", marginBottom: mobile ? 40 : 56 }}>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#0d9aa5",
              marginBottom: 16,
              display: "block",
            }}>AI Agents & Services</span>
            <Headline style={{ maxWidth: 700, margin: "0 auto" }}>
              The complete AI toolkit for <Accent>personal training businesses.</Accent>
            </Headline>
          </div>
          
          {/* AI Agents */}
          <div style={{ marginBottom: mobile ? 48 : 64 }}>
            <h3 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#0d9aa5",
              marginBottom: 20,
}}>AI Agents</h3>
  <div style={{
  display: "grid",
  gridTemplateColumns: mobile ? "1fr" : "repeat(auto-fit, minmax(340px, 1fr))",
  gap: mobile ? 16 : 24,
  }}>
  {agents.map((agent, i) => (
  <AgentCard
  key={i}
  icon={agent.icon}
  title={agent.title}
  description={agent.description}
  mobile={mobile}
  href={agent.href}
  mockup={agent.mockup}
  />
  ))}
            </div>
          </div>
          
          {/* AI Services */}
          <div>
            <h3 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#9af198",
              marginBottom: 20,
            }}>AI Services</h3>
            <div style={{
              display: "grid",
              gridTemplateColumns: mobile ? "1fr" : tablet ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
              gap: mobile ? 16 : 20,
            }}>
              {services.map((service, i) => (
                <ProductCard 
                  key={i}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  mobile={mobile}
                  href={service.href}
                  variant="mint"
                />
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4 — CASE STUDIES / PROOF */}
        <section id="proof" style={{ padding: sectionPad }}>
          <AccentLine />
          <Headline>Results that speak for <Accent>themselves.</Accent></Headline>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : tablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
            gap: mobile ? 16 : 20,
            marginTop: mobile ? 32 : 48,
          }}>
            {caseStudies.map((study, i) => (
              <a key={i} href="#/case-study/optimal-performance" style={{ textDecoration: "none" }}>
                <CaseStudyCard 
                  metric={study.metric}
                  title={study.title}
                  description={study.description}
                  mobile={mobile}
                />
              </a>
            ))}
          </div>
        </section>

        {/* SECTION 5 — CTA */}
        <section id="cta" style={{ padding: sectionPad }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(13,154,165,0.07), rgba(8,69,94,0.1))",
            border: "1px solid rgba(13,154,165,0.15)",
            borderRadius: 20,
            padding: mobile ? "48px 24px" : "72px 56px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Subtle radial glow */}
            <div style={{
              position: "absolute",
              top: -100,
              right: -100,
              width: 300,
              height: 300,
              background: "radial-gradient(circle, rgba(13,154,165,0.15) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />
            
            <div style={{ position: "relative", zIndex: 1 }}>
              <Headline style={{ maxWidth: 600, margin: "0 auto 16px auto" }}>
                Ready to run your gym <Accent>smarter?</Accent>
              </Headline>
              
              <Body style={{ maxWidth: 520, margin: "0 auto 32px auto", textAlign: "center" }}>
                Book a free strategy call — or let us build your AI-powered website first, on us.
              </Body>
              
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <CTA variant="primary" style={{ fontSize: mobile ? 14 : 15, padding: mobile ? "14px 28px" : "16px 36px" }} href="#/book">
                  AI Consultation
                </CTA>
                <CTA variant="secondary" style={{ fontSize: mobile ? 14 : 15, padding: mobile ? "14px 28px" : "16px 36px" }} href="#/book-snapshot">
                  See your free site
                </CTA>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6 — THE ECOSYSTEM CLOSER */}
        <section id="ecosystem" style={{ padding: sectionPad }}>
          <AccentLine />
          <Headline>Everything connects. <Accent>Everything compounds.</Accent></Headline>
          
          <Body>
            Most gyms run on five disconnected tools that don&apos;t talk to each other. Milton is one system — your coach co-pilot knows what your member assistant surfaced. Your director dashboard reflects what&apos;s actually happening on the floor.
          </Body>
          
          <Body style={{ marginBottom: 0 }}>
            Every interaction feeds the intelligence that makes the next one better. <Mint>That&apos;s not a feature. That&apos;s a moat.</Mint>
          </Body>
        </section>

      </div>
    </>
  );
}
