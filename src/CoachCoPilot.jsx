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

function HeroDashboardVisual({ mobile }) {
  return (
    <div style={{
      borderRadius: mobile ? 12 : 20,
      background: "linear-gradient(145deg, #0a1f2a 0%, #061c27 100%)",
      border: "1px solid rgba(13,154,165,0.3)",
      boxShadow: "0 25px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.05)",
      padding: mobile ? 16 : 32,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background glow effects */}
      <div style={{ position: "absolute", top: -100, right: -100, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(13,154,165,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -50, left: -50, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(154,241,152,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Data Source Icons flowing in */}
      <div style={{ display: "flex", justifyContent: "center", gap: mobile ? 24 : 48, marginBottom: mobile ? 16 : 24, position: "relative" }}>
        {/* Wearable Icon */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ width: mobile ? 40 : 56, height: mobile ? 40 : 56, borderRadius: 12, background: "rgba(13,154,165,0.15)", border: "1px solid rgba(13,154,165,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width={mobile ? 20 : 28} height={mobile ? 20 : 28} viewBox="0 0 24 24" fill="none" stroke={teal} strokeWidth="1.5">
              <rect x="6" y="4" width="12" height="16" rx="2" />
              <path d="M9 8h6M9 12h6M9 16h3" />
            </svg>
          </div>
          <span style={{ fontFamily: f, fontSize: mobile ? 9 : 11, color: "rgba(255,255,255,0.5)", letterSpacing: 0.5 }}>Wearable</span>
          <div style={{ width: 1, height: mobile ? 16 : 24, background: `linear-gradient(180deg, ${teal}, transparent)` }} />
        </div>

        {/* Nutrition Icon */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ width: mobile ? 40 : 56, height: mobile ? 40 : 56, borderRadius: 12, background: "rgba(154,241,152,0.1)", border: "1px solid rgba(154,241,152,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width={mobile ? 20 : 28} height={mobile ? 20 : 28} viewBox="0 0 24 24" fill="none" stroke={mint} strokeWidth="1.5">
              <path d="M12 2C16 2 18 5 18 8C18 11 16 13 16 16V20C16 21 15 21 14 21H10C9 21 8 21 8 20V16C8 13 6 11 6 8C6 5 8 2 12 2Z" />
              <circle cx="12" cy="8" r="2" fill={mint} fillOpacity="0.3" />
            </svg>
          </div>
          <span style={{ fontFamily: f, fontSize: mobile ? 9 : 11, color: "rgba(255,255,255,0.5)", letterSpacing: 0.5 }}>Nutrition</span>
          <div style={{ width: 1, height: mobile ? 16 : 24, background: `linear-gradient(180deg, ${mint}, transparent)` }} />
        </div>

        {/* Body Scan Icon */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ width: mobile ? 40 : 56, height: mobile ? 40 : 56, borderRadius: 12, background: "rgba(13,154,165,0.15)", border: "1px solid rgba(13,154,165,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width={mobile ? 20 : 28} height={mobile ? 20 : 28} viewBox="0 0 24 24" fill="none" stroke={teal} strokeWidth="1.5">
              <circle cx="12" cy="5" r="2" />
              <path d="M12 7v4M8 21v-6l-2-4 6-1 6 1-2 4v6" />
              <path d="M8 11l-3 1M16 11l3 1" />
            </svg>
          </div>
          <span style={{ fontFamily: f, fontSize: mobile ? 9 : 11, color: "rgba(255,255,255,0.5)", letterSpacing: 0.5 }}>Body Scan</span>
          <div style={{ width: 1, height: mobile ? 16 : 24, background: `linear-gradient(180deg, ${teal}, transparent)` }} />
        </div>
      </div>

      {/* Main Dashboard Card */}
      <div style={{
        background: "rgba(255,255,255,0.02)",
        borderRadius: mobile ? 12 : 16,
        border: "1px solid rgba(255,255,255,0.08)",
        padding: mobile ? 16 : 24,
      }}>
        {/* Client Header */}
        <div style={{ display: "flex", alignItems: "center", gap: mobile ? 12 : 16, marginBottom: mobile ? 16 : 24, paddingBottom: mobile ? 16 : 20, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ width: mobile ? 44 : 56, height: mobile ? 44 : 56, borderRadius: "50%", background: `linear-gradient(135deg, ${teal}, ${mint})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: f, fontSize: mobile ? 16 : 20, fontWeight: 600, color: "#061c27" }}>JM</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: f, fontSize: mobile ? 15 : 18, fontWeight: 600, color: "#fff" }}>Jessica Martinez</div>
            <div style={{ fontFamily: f, fontSize: mobile ? 11 : 13, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>12-week program &bull; Week 8</div>
          </div>
          <div style={{ padding: "6px 12px", borderRadius: 100, background: "rgba(154,241,152,0.15)", border: "1px solid rgba(154,241,152,0.3)" }}>
            <span style={{ fontFamily: f, fontSize: mobile ? 10 : 12, fontWeight: 600, color: mint }}>On Track</span>
          </div>
        </div>

        {/* Today's Snapshot Grid */}
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: mobile ? 12 : 16 }}>
          {/* Workout Summary */}
          <div style={{ background: "rgba(13,154,165,0.08)", borderRadius: 12, padding: mobile ? 12 : 16, border: "1px solid rgba(13,154,165,0.15)" }}>
            <div style={{ fontFamily: f, fontSize: mobile ? 9 : 11, fontWeight: 500, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Today&apos;s Workout</div>
            <div style={{ fontFamily: f, fontSize: mobile ? 18 : 24, fontWeight: 600, color: "#fff" }}>Upper A</div>
            <div style={{ fontFamily: f, fontSize: mobile ? 11 : 13, color: teal, marginTop: 4 }}>5/6 exercises done</div>
          </div>

          {/* Macro Breakdown */}
          <div style={{ background: "rgba(154,241,152,0.06)", borderRadius: 12, padding: mobile ? 12 : 16, border: "1px solid rgba(154,241,152,0.12)" }}>
            <div style={{ fontFamily: f, fontSize: mobile ? 9 : 11, fontWeight: 500, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Macros</div>
            <div style={{ fontFamily: f, fontSize: mobile ? 18 : 24, fontWeight: 600, color: "#fff" }}>1,840</div>
            <div style={{ fontFamily: f, fontSize: mobile ? 11 : 13, color: mint, marginTop: 4 }}>P: 142g &bull; C: 185g &bull; F: 58g</div>
          </div>

          {/* Sleep Score */}
          <div style={{ background: "rgba(13,154,165,0.08)", borderRadius: 12, padding: mobile ? 12 : 16, border: "1px solid rgba(13,154,165,0.15)" }}>
            <div style={{ fontFamily: f, fontSize: mobile ? 9 : 11, fontWeight: 500, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Sleep</div>
            <div style={{ fontFamily: f, fontSize: mobile ? 18 : 24, fontWeight: 600, color: "#fff" }}>7.2h</div>
            <div style={{ fontFamily: f, fontSize: mobile ? 11 : 13, color: teal, marginTop: 4 }}>Score: 82</div>
          </div>

          {/* Weekly Trend */}
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: mobile ? 12 : 16, border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontFamily: f, fontSize: mobile ? 9 : 11, fontWeight: 500, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Trend</div>
            {/* Mini trend line SVG */}
            <svg width="100%" height={mobile ? 32 : 40} viewBox="0 0 100 40" preserveAspectRatio="none">
              <defs>
                <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={mint} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={mint} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 35 L15 30 L30 32 L45 25 L60 20 L75 15 L100 8 L100 40 L0 40 Z" fill="url(#trendGrad)" />
              <path d="M0 35 L15 30 L30 32 L45 25 L60 20 L75 15 L100 8" fill="none" stroke={mint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div style={{ fontFamily: f, fontSize: mobile ? 11 : 13, color: mint, marginTop: 4 }}>+12% this week</div>
          </div>
        </div>
      </div>

      {/* Bottom label */}
      <div style={{ textAlign: "center", marginTop: mobile ? 16 : 24 }}>
        <span style={{ fontFamily: f, fontSize: mobile ? 10 : 12, color: "rgba(255,255,255,0.4)", letterSpacing: 2, textTransform: "uppercase" }}>One screen. Everything you need.</span>
      </div>
    </div>
  );
}

function TrackingProfileVisual({ mobile }) {
  const exercises = [
    { name: "Bench Press", sets: "4", reps: "8", load: "155 lbs", done: true },
    { name: "Barbell Squat", sets: "4", reps: "6", load: "225 lbs", done: true },
    { name: "Bent-Over Row", sets: "3", reps: "10", load: "135 lbs", done: true },
  ];

  return (
    <div style={{
      borderRadius: mobile ? 12 : 20,
      background: "linear-gradient(145deg, #0a1f2a 0%, #061c27 100%)",
      border: "1px solid rgba(13,154,165,0.3)",
      boxShadow: "0 25px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.05)",
      padding: mobile ? 16 : 28,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background glow */}
      <div style={{ position: "absolute", top: -80, right: -80, width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(13,154,165,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Client Header */}
      <div style={{ display: "flex", alignItems: "center", gap: mobile ? 12 : 16, marginBottom: mobile ? 20 : 28, paddingBottom: mobile ? 16 : 20, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ 
          width: mobile ? 52 : 64, 
          height: mobile ? 52 : 64, 
          borderRadius: "50%", 
          background: `linear-gradient(135deg, ${teal}, ${mint})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 12px rgba(13,154,165,0.3)",
        }}>
          <span style={{ fontFamily: f, fontSize: mobile ? 18 : 22, fontWeight: 700, color: "#061c27" }}>SM</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: f, fontSize: mobile ? 17 : 20, fontWeight: 600, color: "#fff" }}>Sarah Mitchell</div>
          <div style={{ fontFamily: f, fontSize: mobile ? 12 : 14, color: "rgba(255,255,255,0.5)", marginTop: 3 }}>Strength &bull; 16-week program &bull; Week 11</div>
        </div>
      </div>

      {/* Data Grid */}
      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: mobile ? 16 : 20 }}>
        
        {/* Today's Workout - Completed */}
        <div style={{ 
          background: "rgba(154,241,152,0.06)", 
          borderRadius: 14, 
          padding: mobile ? 16 : 20,
          border: "1px solid rgba(154,241,152,0.15)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <span style={{ fontFamily: f, fontSize: mobile ? 10 : 11, fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1.5 }}>Today&apos;s Workout</span>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 100, background: "rgba(154,241,152,0.15)" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={mint} strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
              <span style={{ fontFamily: f, fontSize: 10, fontWeight: 600, color: mint }}>Completed</span>
            </div>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {exercises.map((ex, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: "rgba(255,255,255,0.03)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ fontFamily: f, fontSize: mobile ? 13 : 14, fontWeight: 500, color: "#fff" }}>{ex.name}</span>
                <span style={{ fontFamily: f, fontSize: mobile ? 11 : 12, color: "rgba(255,255,255,0.6)" }}>{ex.sets}×{ex.reps} @ {ex.load}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Yesterday's Nutrition */}
        <div style={{ 
          background: "rgba(13,154,165,0.08)", 
          borderRadius: 14, 
          padding: mobile ? 16 : 20,
          border: "1px solid rgba(13,154,165,0.2)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <span style={{ fontFamily: f, fontSize: mobile ? 10 : 11, fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1.5 }}>Yesterday&apos;s Nutrition</span>
          </div>
          
          <div style={{ fontFamily: f, fontSize: mobile ? 28 : 34, fontWeight: 700, color: "#fff", marginBottom: 8 }}>2,180 <span style={{ fontSize: mobile ? 14 : 16, fontWeight: 400, color: "rgba(255,255,255,0.5)" }}>cal</span></div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            <div style={{ textAlign: "center", padding: "10px 0", background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
              <div style={{ fontFamily: f, fontSize: mobile ? 16 : 18, fontWeight: 600, color: teal }}>165g</div>
              <div style={{ fontFamily: f, fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>Protein</div>
            </div>
            <div style={{ textAlign: "center", padding: "10px 0", background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
              <div style={{ fontFamily: f, fontSize: mobile ? 16 : 18, fontWeight: 600, color: "#fff" }}>210g</div>
              <div style={{ fontFamily: f, fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>Carbs</div>
            </div>
            <div style={{ textAlign: "center", padding: "10px 0", background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
              <div style={{ fontFamily: f, fontSize: mobile ? 16 : 18, fontWeight: 600, color: "#fff" }}>72g</div>
              <div style={{ fontFamily: f, fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>Fat</div>
            </div>
          </div>
        </div>

        {/* Last Night's Sleep */}
        <div style={{ 
          background: "rgba(255,255,255,0.02)", 
          borderRadius: 14, 
          padding: mobile ? 16 : 20,
          border: "1px solid rgba(255,255,255,0.06)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <span style={{ fontFamily: f, fontSize: mobile ? 10 : 11, fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1.5 }}>Last Night&apos;s Sleep</span>
          </div>
          
          <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
            <div>
              <span style={{ fontFamily: f, fontSize: mobile ? 28 : 34, fontWeight: 700, color: "#fff" }}>7.2</span>
              <span style={{ fontFamily: f, fontSize: mobile ? 14 : 16, fontWeight: 400, color: "rgba(255,255,255,0.5)", marginLeft: 4 }}>hrs</span>
            </div>
            <div style={{ padding: "6px 12px", background: "rgba(13,154,165,0.15)", borderRadius: 8, border: "1px solid rgba(13,154,165,0.25)" }}>
              <span style={{ fontFamily: f, fontSize: 11, color: "rgba(255,255,255,0.6)" }}>HRV </span>
              <span style={{ fontFamily: f, fontSize: 13, fontWeight: 600, color: teal }}>48</span>
            </div>
          </div>
          
          <div style={{ marginTop: 12, display: "flex", gap: 3 }}>
            {[85, 90, 72, 88, 95, 82, 78].map((val, i) => (
              <div key={i} style={{ flex: 1, height: mobile ? 24 : 32, background: `rgba(13,154,165,${0.1 + (val/100) * 0.3})`, borderRadius: 4 }} />
            ))}
          </div>
          <div style={{ fontFamily: f, fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>7-day sleep quality</div>
        </div>

        {/* 30-Day Trend */}
        <div style={{ 
          background: "rgba(154,241,152,0.04)", 
          borderRadius: 14, 
          padding: mobile ? 16 : 20,
          border: "1px solid rgba(154,241,152,0.1)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <span style={{ fontFamily: f, fontSize: mobile ? 10 : 11, fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1.5 }}>30-Day Consistency</span>
            <span style={{ fontFamily: f, fontSize: mobile ? 12 : 14, fontWeight: 600, color: mint }}>+18%</span>
          </div>
          
          {/* Sparkline */}
          <svg width="100%" height={mobile ? 50 : 70} viewBox="0 0 200 70" preserveAspectRatio="none" style={{ display: "block" }}>
            <defs>
              <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={mint} stopOpacity="0.25" />
                <stop offset="100%" stopColor={mint} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path 
              d="M0 60 L10 55 L20 58 L30 50 L40 52 L50 48 L60 45 L70 47 L80 40 L90 42 L100 35 L110 38 L120 30 L130 32 L140 25 L150 28 L160 20 L170 22 L180 15 L190 18 L200 10 L200 70 L0 70 Z" 
              fill="url(#sparkGrad)" 
            />
            <path 
              d="M0 60 L10 55 L20 58 L30 50 L40 52 L50 48 L60 45 L70 47 L80 40 L90 42 L100 35 L110 38 L120 30 L130 32 L140 25 L150 28 L160 20 L170 22 L180 15 L190 18 L200 10" 
              fill="none" 
              stroke={mint} 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            <circle cx="200" cy="10" r="4" fill={mint} />
          </svg>
          
          <div style={{ fontFamily: f, fontSize: mobile ? 12 : 13, color: "rgba(255,255,255,0.6)", marginTop: 8 }}>
            Consistency trending <span style={{ color: mint, fontWeight: 600 }}>upward</span> — best streak in 6 months
          </div>
        </div>
      </div>

      {/* Footer label */}
      <div style={{ textAlign: "center", marginTop: mobile ? 20 : 28 }}>
        <span style={{ fontFamily: f, fontSize: mobile ? 10 : 12, color: "rgba(255,255,255,0.4)", letterSpacing: 2, textTransform: "uppercase" }}>No tabs. No drilling down. Just open and coach.</span>
      </div>
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

          <HeroDashboardVisual mobile={mobile} />

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

          <TrackingProfileVisual mobile={mobile} />

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
