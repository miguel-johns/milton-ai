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

function CTAButton({ mobile, label = "AI Consultation" }) {
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

// Step Mockup Icons
const DocIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#0d9aa5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 2V8H20" stroke="#0d9aa5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="#0d9aa5" strokeWidth="1.5"/>
    <path d="M7 17V13" stroke="#9af198" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 17V9" stroke="#0d9aa5" strokeWidth="2" strokeLinecap="round"/>
    <path d="M17 17V11" stroke="#9af198" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const TargetIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="#0d9aa5" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="5" stroke="#0d9aa5" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="2" fill="#9af198"/>
  </svg>
);

const BrainIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M12 4C8 4 6 6 6 9C4 9 2 11 2 13C2 15 4 17 6 17H18C20 17 22 15 22 13C22 11 20 9 18 9C18 6 16 4 12 4Z" stroke="#0d9aa5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 4V17" stroke="#9af198" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 9C9 10 11 10 12 9" stroke="#0d9aa5" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 9C13 10 15 10 16 9" stroke="#0d9aa5" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GraphIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 16L12 11L15 14L21 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BoltIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" stroke="#0d9aa5" strokeWidth="1.5"/>
    <path d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20" stroke="#0d9aa5" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const DumbbellIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M6 7V17M18 7V17M6 12H18M4 9V15M20 9V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M12 3C12 3 14 1 16 3C18 5 16 7 16 7M17 8C19 8 21 10 21 13C21 18 17 22 12 22C7 22 3 18 3 13C3 10 5 8 7 8C9 8 10 9 12 9C14 9 15 8 17 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Step Mockup Components - Light Theme
function UploadContentMockup({ mobile }) {
  const files = [
    { name: "Training Philosophy.pdf", Icon: DocIcon },
    { name: "Nutrition Guide.docx", Icon: DocIcon },
    { name: "Program Templates.xlsx", Icon: ChartIcon },
    { name: "Brand Voice.pdf", Icon: TargetIcon },
  ];
  return (
    <div style={{ 
      background: "linear-gradient(135deg, #e8f5f4 0%, #d4f5e9 100%)",
      borderRadius: mobile ? 10 : 12,
      padding: mobile ? 12 : 16,
      minWidth: 0, maxWidth: "100%",
    }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: mobile ? "8px 10px" : "10px 14px",
        background: "#fff",
        borderRadius: 8,
        marginBottom: 12,
        boxShadow: "0 2px 8px rgba(13, 154, 165, 0.1)",
      }}>
        <span style={{ fontSize: mobile ? 11 : 12, fontWeight: 600, color: "#0d4a4f" }}>Milton AI</span>
        <span style={{ fontSize: mobile ? 9 : 10, color: "#0d9aa5", fontWeight: 600 }}>Ready to import</span>
      </div>
      <div style={{
        border: "2px dashed #0d9aa5",
        borderRadius: 10,
        padding: mobile ? 10 : 14,
        background: "rgba(255,255,255,0.5)",
        display: "flex", flexDirection: "column", gap: 6,
      }}>
        <div style={{ fontSize: mobile ? 10 : 11, color: "#0d9aa5", textAlign: "center", marginBottom: 4, fontWeight: 500 }}>Drag & Drop</div>
        {files.map((f, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: mobile ? "6px 8px" : "8px 10px",
            background: "#fff",
            borderRadius: 6,
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          }}>
            <f.Icon />
            <span style={{ fontSize: mobile ? 10 : 11, color: "#0d4a4f", fontWeight: 500 }}>{f.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiltonLearnsMockup({ mobile }) {
  const nodes = [
    { label: "Progressive Overload", angle: -45 },
    { label: "Protein-First Nutrition", angle: 45 },
    { label: "Your Coaching Voice", angle: 180 },
  ];
  
  const orbitRadius = mobile ? 75 : 95;
  const centerSize = mobile ? 54 : 68;
  const nodeWidth = mobile ? 90 : 110;
  const containerSize = mobile ? 220 : 280;
  
  return (
    <div style={{ 
      background: "linear-gradient(135deg, #e8f5f4 0%, #d4f5e9 100%)",
      borderRadius: mobile ? 10 : 12,
      padding: mobile ? 12 : 16,
      minWidth: 0, maxWidth: "100%",
    }}>
      {/* Orbital container */}
      <div style={{
        position: "relative",
        width: containerSize,
        height: containerSize,
        margin: "0 auto",
      }}>
        {/* Orbital ring */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: orbitRadius * 2 + 20,
          height: orbitRadius * 2 + 20,
          borderRadius: "50%",
          border: "2px dashed rgba(13, 154, 165, 0.25)",
        }} />
        
        {/* AI Chip center */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: centerSize, height: centerSize,
          background: "linear-gradient(135deg, #0d9aa5, #0d7a82)",
          borderRadius: 12,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(13, 154, 165, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
          zIndex: 10,
        }}>
          {/* Chip circuit lines */}
          <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: 12 }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{
                position: "absolute",
                background: "rgba(255,255,255,0.1)",
                ...(i === 0 ? { top: "25%", left: 0, right: 0, height: 1 } : {}),
                ...(i === 1 ? { top: "75%", left: 0, right: 0, height: 1 } : {}),
                ...(i === 2 ? { left: "25%", top: 0, bottom: 0, width: 1 } : {}),
                ...(i === 3 ? { left: "75%", top: 0, bottom: 0, width: 1 } : {}),
              }} />
            ))}
          </div>
          {/* Database/AI icon */}
          <svg width={mobile ? 20 : 26} height={mobile ? 20 : 26} viewBox="0 0 24 24" fill="none" style={{ position: "relative", zIndex: 1 }}>
            <ellipse cx="12" cy="6" rx="8" ry="3" stroke="#fff" strokeWidth="1.5" fill="rgba(255,255,255,0.15)" />
            <path d="M4 6v4c0 1.66 3.58 3 8 3s8-1.34 8-3V6" stroke="#fff" strokeWidth="1.5" />
            <path d="M4 10v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4" stroke="#fff" strokeWidth="1.5" />
            <path d="M4 14v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4" stroke="#fff" strokeWidth="1.5" />
          </svg>
          <span style={{ fontSize: mobile ? 7 : 8, fontWeight: 700, color: "#fff", marginTop: 2, letterSpacing: "0.05em" }}>MILTON</span>
        </div>
        
        {/* Orbiting nodes */}
        {nodes.map((n, i) => {
          const angleRad = (n.angle * Math.PI) / 180;
          const x = Math.cos(angleRad) * orbitRadius;
          const y = Math.sin(angleRad) * orbitRadius;
          
          return (
            <div key={i}>
              {/* Connection line */}
              <svg style={{
                position: "absolute",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: containerSize,
                height: containerSize,
                pointerEvents: "none",
                zIndex: 1,
              }}>
                <line
                  x1={containerSize / 2}
                  y1={containerSize / 2}
                  x2={containerSize / 2 + x}
                  y2={containerSize / 2 + y}
                  stroke="rgba(13, 154, 165, 0.4)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                {/* Pulse dot on line */}
                <circle
                  cx={containerSize / 2 + x * 0.5}
                  cy={containerSize / 2 + y * 0.5}
                  r="3"
                  fill="#0d9aa5"
                />
              </svg>
              
              {/* Node card */}
              <div style={{
                position: "absolute",
                top: "50%", left: "50%",
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                width: nodeWidth,
                padding: mobile ? "6px 8px" : "8px 10px",
                background: "#fff",
                borderRadius: 8,
                boxShadow: "0 2px 12px rgba(13, 154, 165, 0.15)",
                border: "1px solid rgba(13, 154, 165, 0.2)",
                zIndex: 5,
                textAlign: "center",
              }}>
                <span style={{ 
                  fontSize: mobile ? 9 : 10, 
                  fontWeight: 600, 
                  color: "#0d4a4f",
                  lineHeight: 1.3,
                  display: "block",
                }}>{n.label}</span>
              </div>
            </div>
          );
        })}
      </div>
      
      <div style={{ fontSize: mobile ? 9 : 10, color: "#0d9aa5", textAlign: "center", marginTop: 12, fontStyle: "italic" }}>
        Building your unique coaching model...
      </div>
    </div>
  );
}

function MembersGetPlanMockup({ mobile }) {
  const members = [
    { name: "Alex J.", goal: "Build Muscle", macro: "2,400 cal" },
    { name: "Sarah M.", goal: "Fat Loss", macro: "1,800 cal" },
  ];
  return (
    <div style={{ 
      background: "linear-gradient(135deg, #e8f5f4 0%, #d4f5e9 100%)",
      borderRadius: mobile ? 10 : 12,
      padding: mobile ? 12 : 16,
      minWidth: 0, maxWidth: "100%",
    }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {members.map((m, i) => (
          <div key={i} style={{
            padding: mobile ? "12px" : "14px",
            background: "#fff",
            borderRadius: 10,
            boxShadow: "0 2px 8px rgba(13, 154, 165, 0.1)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: mobile ? 28 : 32, height: mobile ? 28 : 32, borderRadius: "50%",
                  background: "linear-gradient(135deg, #e8f5f4, #d4f5e9)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}><UserIcon /></div>
                <span style={{ fontSize: mobile ? 12 : 13, fontWeight: 600, color: "#0d4a4f" }}>{m.name}</span>
              </div>
              <span style={{
                fontSize: mobile ? 9 : 10, fontWeight: 600,
                padding: "3px 8px", borderRadius: 12,
                background: "#e8f5f4", color: "#0d9aa5",
              }}>{m.goal}</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{
                flex: 1, padding: mobile ? "8px" : "10px",
                background: "#e8f5f4",
                borderRadius: 8, textAlign: "center",
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginBottom: 4 }}>
                  <span style={{ color: "#0d9aa5" }}><DumbbellIcon /></span>
                  <span style={{ fontSize: mobile ? 8 : 9, color: "#0d9aa5", fontWeight: 600 }}>WORKOUT</span>
                </div>
                <div style={{ fontSize: mobile ? 11 : 12, color: "#0d4a4f", fontWeight: 700 }}>Ready</div>
              </div>
              <div style={{
                flex: 1, padding: mobile ? "8px" : "10px",
                background: "#d4f5e9",
                borderRadius: 8, textAlign: "center",
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginBottom: 4 }}>
                  <span style={{ color: "#0d9aa5" }}><AppleIcon /></span>
                  <span style={{ fontSize: mobile ? 8 : 9, color: "#0d9aa5", fontWeight: 600 }}>NUTRITION</span>
                </div>
                <div style={{ fontSize: mobile ? 11 : 12, color: "#0d4a4f", fontWeight: 700 }}>{m.macro}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SystemEvolvesMockup({ mobile }) {
  const events = [
    { Icon: CheckIcon, text: "Session logged", time: "2m ago", color: "#22c55e" },
    { Icon: GraphIcon, text: "Nutrition tracked", time: "1h ago", color: "#0d9aa5" },
    { Icon: BoltIcon, text: "Program updated", time: "3h ago", color: "#f59e0b" },
  ];
  return (
    <div style={{ 
      background: "linear-gradient(135deg, #e8f5f4 0%, #d4f5e9 100%)",
      borderRadius: mobile ? 10 : 12,
      padding: mobile ? 12 : 16,
      minWidth: 0, maxWidth: "100%",
    }}>
      <div style={{
        fontSize: mobile ? 10 : 11, fontWeight: 700, color: "#0d9aa5",
        letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 10,
        textAlign: "center",
      }}>Real-Time Adaptation</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {events.map((e, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: mobile ? "10px 12px" : "12px 14px",
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          }}>
            <div style={{
              width: mobile ? 28 : 32, height: mobile ? 28 : 32, borderRadius: 8,
              background: `${e.color}15`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: e.color,
            }}><e.Icon /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: mobile ? 11 : 12, color: "#0d4a4f", fontWeight: 600 }}>{e.text}</div>
            </div>
            <span style={{ fontSize: mobile ? 9 : 10, color: "#0d9aa5", fontWeight: 500 }}>{e.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Unified Profile Mockup - Central profile with data sources connected
function UnifiedProfileMockup({ mobile }) {
  const dataSources = [
    { label: "Wearables", color: "#10b981", angle: -60 },
    { label: "Gym Equipment", color: "#f59e0b", angle: 0 },
    { label: "Health Apps", color: "#8b5cf6", angle: 60 },
    { label: "Blood Work", color: "#ef4444", angle: 120 },
    { label: "Coach Notes", color: "#0d9aa5", angle: 180 },
    { label: "Sleep Data", color: "#6366f1", angle: 240 },
  ];
  
  const orbitRadius = mobile ? 80 : 105;
  const centerSize = mobile ? 64 : 80;
  const nodeSize = mobile ? 48 : 56;
  const containerSize = mobile ? 240 : 300;
  
  return (
    <div style={{ 
      background: "linear-gradient(135deg, #0d1a2d 0%, #0a1525 100%)",
      borderRadius: mobile ? 12 : 16,
      padding: mobile ? 20 : 32,
      border: "1px solid rgba(255,255,255,0.06)",
    }}>
      <div style={{
        position: "relative",
        width: containerSize,
        height: containerSize,
        margin: "0 auto",
      }}>
        {/* Glow */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: orbitRadius * 2 + 40,
          height: orbitRadius * 2 + 40,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(13, 154, 165, 0.1) 0%, transparent 70%)",
        }} />
        
        {/* Orbit ring */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: orbitRadius * 2 + 16,
          height: orbitRadius * 2 + 16,
          borderRadius: "50%",
          border: "1px dashed rgba(13, 154, 165, 0.3)",
        }} />
        
        {/* Central Profile */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: centerSize, height: centerSize,
          background: "linear-gradient(135deg, rgba(13, 154, 165, 0.25), rgba(154, 241, 152, 0.15))",
          border: "2px solid rgba(13, 154, 165, 0.5)",
          borderRadius: 16,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 32px rgba(13, 154, 165, 0.3)",
          zIndex: 10,
        }}>
          <div style={{
            width: mobile ? 26 : 32, height: mobile ? 26 : 32,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #0d9aa5, #9af198)",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 4,
          }}>
            <svg width={mobile ? 12 : 16} height={mobile ? 12 : 16} viewBox="0 0 24 24" fill="none" stroke="#0B1628" strokeWidth="2.5">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
            </svg>
          </div>
          <span style={{ fontSize: mobile ? 7 : 9, fontWeight: 700, color: "#fff", textAlign: "center", lineHeight: 1.2 }}>MEMBER<br/>PROFILE</span>
        </div>
        
        {/* Data source nodes */}
        {dataSources.map((source, i) => {
          const angleRad = (source.angle * Math.PI) / 180;
          const x = Math.cos(angleRad) * orbitRadius;
          const y = Math.sin(angleRad) * orbitRadius;
          
          return (
            <div key={i}>
              {/* Connection line */}
              <svg style={{
                position: "absolute",
                top: 0, left: 0,
                width: containerSize,
                height: containerSize,
                pointerEvents: "none",
                zIndex: 1,
              }}>
                <line
                  x1={containerSize / 2}
                  y1={containerSize / 2}
                  x2={containerSize / 2 + x * 0.85}
                  y2={containerSize / 2 + y * 0.85}
                  stroke={source.color}
                  strokeWidth="2"
                  strokeOpacity="0.4"
                />
                <circle
                  cx={containerSize / 2 + x * 0.6}
                  cy={containerSize / 2 + y * 0.6}
                  r="3"
                  fill={source.color}
                />
              </svg>
              
              {/* Node */}
              <div style={{
                position: "absolute",
                top: "50%", left: "50%",
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                width: nodeSize,
                height: nodeSize,
                background: "rgba(15, 25, 40, 0.95)",
                border: `1px solid ${source.color}50`,
                borderRadius: 10,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                boxShadow: `0 4px 12px ${source.color}30`,
                zIndex: 5,
              }}>
                <div style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: source.color,
                  marginBottom: 4,
                }} />
                <span style={{ 
                  fontSize: mobile ? 6 : 7, 
                  fontWeight: 600, 
                  color: "rgba(255,255,255,0.85)",
                  textAlign: "center",
                  lineHeight: 1.2,
                  padding: "0 2px",
                }}>{source.label}</span>
              </div>
            </div>
          );
        })}
      </div>
      
      <div style={{ 
        textAlign: "center", 
        marginTop: mobile ? 14 : 20,
        fontSize: mobile ? 10 : 11,
        color: "rgba(255,255,255,0.45)",
        fontStyle: "italic",
      }}>
        All data streams feed into one living profile
      </div>
    </div>
  );
}

function StepCard({ number, title, description, mobile, mockup }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: mobile ? 12 : 16,
      padding: mobile ? "20px 16px" : "32px",
      display: "flex",
      flexDirection: "column",
      minWidth: 0,
      width: "100%",
      boxSizing: "border-box",
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
        fontSize: mobile ? 13 : 15,
        lineHeight: 1.7,
        color: "rgba(255,255,255,0.6)",
        margin: "0 0 20px 0",
      }}>{description}</p>
      {mockup && (
        <div style={{
          background: "rgba(8, 20, 38, 0.5)",
          border: "1px solid rgba(13, 154, 165, 0.12)",
          borderRadius: mobile ? 10 : 12,
          padding: mobile ? 12 : 16,
          minWidth: 0,
          width: "100%",
          boxSizing: "border-box",
        }}>
          {mockup}
        </div>
      )}
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

          <div style={{
            borderRadius: mobile ? 12 : 16,
            overflow: "hidden",
            boxShadow: "0 20px 50px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.08)",
            aspectRatio: mobile ? "1 / 1" : "16 / 9",
          }}>
            <img
              src={mobile 
                ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AI%20Coach%20Page%20Mobile%20Hero-UA01I1S25lvaBgrzzbCWshIXjB3BDH.png"
                : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AI%20Coach%20Hero%20Desktop.png-eswd6m7AXATbQcXZNwSlMVblwyFWLn.jpeg"
              }
              alt="Person holding phone with Milton AI notification saying Good morning Connor, will we see you later today for the usual?"
              style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
            />
          </div>

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
            width: "100%",
            minWidth: 0,
          }}>
            <StepCard
              number="01"
              title="You upload your content"
              description="Training philosophy, nutrition principles, programming style, brand voice."
              mobile={mobile}
              mockup={<UploadContentMockup mobile={mobile} />}
            />
            <StepCard
              number="02"
              title="Milton learns it"
              description="The AI builds a model of your methods — not generic advice, your approach."
              mobile={mobile}
              mockup={<MiltonLearnsMockup mobile={mobile} />}
            />
            <StepCard
              number="03"
              title="Members get their plan"
              description="Personalized workouts and meal plans built for each individual's goals."
              mobile={mobile}
              mockup={<MembersGetPlanMockup mobile={mobile} />}
            />
            <StepCard
              number="04"
              title="The system evolves"
              description="Every session logged, every meal tracked — the AI adapts and progresses automatically."
              mobile={mobile}
              mockup={<SystemEvolvesMockup mobile={mobile} />}
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

          <UnifiedProfileMockup mobile={mobile} />
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

          <div style={{
            borderRadius: mobile ? 12 : 16,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            ...(mobile ? { aspectRatio: "1 / 1" } : {}),
          }}>
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Workout-DjTLfnuYtbscyYDLIevy0mWM9KXoNu.png"
              alt="Person completing workout on phone with notification showing workout complete and weekly goal progress"
              style={{
                width: "100%",
                height: mobile ? "100%" : "auto",
                display: "block",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
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

          <div style={{
            borderRadius: mobile ? 12 : 16,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            ...(mobile ? { aspectRatio: "1 / 1" } : {}),
          }}>
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Meal%20Planning-cDX2qfYys6zOOsBApMwQLybNhtUPTB.png"
              alt="Person photographing food with phone, AI responds with meal logging encouragement"
              style={{
                width: "100%",
                height: mobile ? "100%" : "auto",
                display: "block",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
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

          <div style={{
            borderRadius: mobile ? 12 : 16,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            ...(mobile ? { aspectRatio: "1 / 1" } : {}),
          }}>
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Omni%20Channel-ERkC2LAPR0ezawetpKlsri8OBB56B4.png"
              alt="Good morning notification from AI coach showing daily plan on cozy bed background"
              style={{
                width: "100%",
                height: mobile ? "100%" : "auto",
                display: "block",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
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
            color: mint, fontWeight: 500, margin: 0,
          }}>
            This is what AI makes possible. Not replacing the experience you&apos;ve built — amplifying it. Your best version of service, delivered to everyone, all the time.
          </p>
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
