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

export default function WearableDevices() {
  const { mobile, tablet } = useBreakpoint();
  const px = mobile ? 20 : tablet ? 32 : 40;
  const sectionPad = mobile ? "48px 0" : "72px 0";

  const featuredIntegrations = ["Apple Watch", "Garmin", "Fitbit", "Oura", "Withings"];
  const allDevices = ["Wahoo", "Polar", "Suunto", "Samsung Health", "Google Fit", "Coros", "Huawei", "Biostrap", "Whoop", "Ultrahuman", "Omron", "Zepp", "XOSS", "Moxy", "Catapult One", "Core"];
  
  const dataPoints = [
    "Resting and active heart rate",
    "Heart rate variability (HRV)",
    "Sleep duration and quality",
    "Daily steps and active calories",
    "Recovery and readiness scores",
    "Blood oxygen (SpO2) where available",
  ];

  return (
    <>
      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: `0 ${px}px` }}>

        {/* ═══════ HERO ═══════ */}
        <section style={{
          minHeight: mobile ? "auto" : "50vh",
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: mobile ? "64px 0 48px" : "100px 0 64px",
        }}>
          <a 
            href="#/partners"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontFamily: f, fontSize: 12, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
              marginBottom: 24,
              transition: "color 0.2s ease",
            }}
            onMouseEnter={e => e.currentTarget.style.color = teal}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Connected Partners / Wearable Devices
          </a>

          <h1 style={{
            fontFamily: serif,
            fontSize: mobile ? 32 : tablet ? 44 : 56,
            fontWeight: 400, lineHeight: 1.12, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Every heartbeat, every step — <Accent>already in your dashboard</Accent>
          </h1>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.7,
            color: "rgba(255,255,255,0.6)", maxWidth: 700, margin: 0,
          }}>
            Milton syncs with 20+ wearable platforms so your trainers never have to ask "are you tracking that?" again. Heart rate, HRV, sleep quality, step count, active calories, and recovery scores flow directly into each member&apos;s profile in real time.
          </p>
        </section>

        {/* ═══════ WHY IT MATTERS ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="Why It Matters For Your Facility" />
          <SectionDivider />
          
          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: 0,
          }}>
            Trainers can see how a member slept last night before their 6am session. They can spot overtraining before it becomes an injury. They can celebrate a member who hit 10,000 steps three days straight — without that member saying a word. This is the kind of proactive, personalized coaching that drives retention.
          </p>
        </section>

        {/* ═══════ HOW IT WORKS ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="How It Works" />
          <SectionDivider />
          
          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: 0,
          }}>
            Members connect their wearable through the Milton app, via SMS sync, or through the coaching portal. From that point forward, data syncs automatically. Trainers see a unified health snapshot on every member profile — regardless of which device they wear.
          </p>
        </section>

        {/* ═══════ CONNECTED WEARABLES ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="Connected Wearables" />
          <SectionDivider />
          
          {/* Featured Integrations */}
          <div style={{ marginBottom: mobile ? 36 : 48 }}>
            <h3 style={{
              fontFamily: f, fontSize: 13, fontWeight: 600,
              letterSpacing: 1, textTransform: "uppercase",
              color: teal, marginBottom: 16,
            }}>Featured Integrations</h3>
            
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
            }}>
              {featuredIntegrations.map((device, i) => (
                <span 
                  key={i}
                  style={{
                    fontFamily: f,
                    fontSize: mobile ? 14 : 15,
                    fontWeight: 500,
                    color: "#fff",
                    background: "rgba(13,154,165,0.15)",
                    border: "1px solid rgba(13,154,165,0.3)",
                    borderRadius: 8,
                    padding: mobile ? "10px 18px" : "12px 24px",
                  }}
                >{device}</span>
              ))}
            </div>
          </div>
          
          {/* All Supported Devices */}
          <div>
            <h3 style={{
              fontFamily: f, fontSize: 13, fontWeight: 600,
              letterSpacing: 1, textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)", marginBottom: 16,
            }}>All Supported Devices</h3>
            
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
            }}>
              {allDevices.map((device, i) => (
                <span 
                  key={i}
                  style={{
                    fontFamily: f,
                    fontSize: mobile ? 12 : 13,
                    color: "rgba(255,255,255,0.5)",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 6,
                    padding: "8px 14px",
                  }}
                >{device}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ DATA POINTS ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="Data Milton Pulls From Wearables" />
          <SectionDivider />
          
          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)",
            gap: mobile ? 12 : 16,
          }}>
            {dataPoints.map((point, i) => (
              <div 
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 10,
                  padding: mobile ? "14px 16px" : "16px 20px",
                }}
              >
                <div style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: mint, flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: f,
                  fontSize: mobile ? 14 : 15,
                  color: "rgba(255,255,255,0.7)",
                }}>{point}</span>
              </div>
            ))}
          </div>
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
            <p style={{
              fontFamily: f,
              fontSize: mobile ? 14 : 16,
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.6)",
              margin: "0 0 20px 0",
            }}>
              Don&apos;t see your members&apos; preferred device? Let us know — we&apos;re adding new integrations regularly.
            </p>
            
            <a
              href="#/consultation"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: f,
                fontSize: mobile ? 14 : 15,
                fontWeight: 600,
                color: teal,
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.color = mint}
              onMouseLeave={e => e.currentTarget.style.color = teal}
            >
              Request an integration
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </section>

      </div>
    </>
  );
}
