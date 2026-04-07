import { useState, useEffect } from 'react';
import SharedNav from './SharedNav.jsx';
import SharedFooter from './SharedFooter.jsx';

const f = "'DM Sans', sans-serif";
const h = "'Cormorant Garamond', serif";

function useBreakpoint() {
  const [state, setState] = useState({ mobile: false, tablet: false });
  useEffect(() => {
    const check = () => {
      setState({ mobile: window.innerWidth < 768, tablet: window.innerWidth >= 768 && window.innerWidth < 1024 });
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return state;
}

export default function ManagementSoftware() {
  const { mobile, tablet } = useBreakpoint();
  const sectionPad = mobile ? "60px 20px" : tablet ? "80px 40px" : "100px 80px";

  const featuredIntegrations = ["MindBody", "ABC Fitness", "Wellness Living"];
  const allPlatforms = ["ZenPlanner", "Exercise.com", "GymMaster", "Push Press", "Virtuagym"];

  const dataPoints = [
    "Member rosters and contact info",
    "Session bookings and attendance history",
    "Package and membership status",
    "Trainer schedules and assignments",
    "Revenue and billing context",
    "Check-in frequency and trends",
  ];

  return (
    <div style={{ background: "#061c27", minHeight: "100vh" }}>
      <SharedNav />
      
      {/* Hero */}
      <section style={{ padding: sectionPad, paddingTop: mobile ? 100 : 140 }}>
        <a href="#/partners" style={{
          fontFamily: f,
          fontSize: 12,
          color: "#0d9aa5",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 24,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Connected Partners
        </a>
        
        <span style={{
          fontFamily: f,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#0d9aa5",
          display: "block",
          marginBottom: 16,
        }}>Connected Partners / Management Software</span>
        
        <h1 style={{
          fontFamily: h,
          fontSize: mobile ? 36 : tablet ? 48 : 56,
          fontWeight: 400,
          lineHeight: 1.1,
          color: "#fff",
          margin: "0 0 24px 0",
          maxWidth: 800,
        }}>
          Intelligence layered on top of the systems you already run
        </h1>
        
        <p style={{
          fontFamily: f,
          fontSize: mobile ? 16 : 18,
          lineHeight: 1.7,
          color: "rgba(255,255,255,0.6)",
          maxWidth: 700,
          margin: 0,
        }}>
          Milton doesn&apos;t replace your gym management platform — it makes it smarter. By integrating with your existing management software, Milton&apos;s AI agents gain the context they need to surface actionable insights about scheduling, membership trends, and trainer utilization.
        </p>
      </section>

      {/* Why It Matters */}
      <section style={{ padding: sectionPad, paddingTop: 0 }}>
        <h2 style={{
          fontFamily: h,
          fontSize: mobile ? 28 : 36,
          fontWeight: 400,
          color: "#fff",
          margin: "0 0 20px 0",
        }}>Why it matters for your facility</h2>
        <p style={{
          fontFamily: f,
          fontSize: mobile ? 15 : 17,
          lineHeight: 1.7,
          color: "rgba(255,255,255,0.6)",
          maxWidth: 800,
          margin: 0,
        }}>
          Your management platform knows who&apos;s a member and when they booked. Milton knows why they&apos;re at risk of leaving, which trainer is the best fit for them, and what to do about the 30% of members who haven&apos;t booked a session in three weeks. The combination is where the magic happens.
        </p>
      </section>

      {/* How It Works */}
      <section style={{ padding: sectionPad, paddingTop: 0 }}>
        <h2 style={{
          fontFamily: h,
          fontSize: mobile ? 28 : 36,
          fontWeight: 400,
          color: "#fff",
          margin: "0 0 20px 0",
        }}>How it works</h2>
        <p style={{
          fontFamily: f,
          fontSize: mobile ? 15 : 17,
          lineHeight: 1.7,
          color: "rgba(255,255,255,0.6)",
          maxWidth: 800,
          margin: 0,
        }}>
          Milton connects to your management platform via API. Your team initiates the connection through the coaching portal, and from there, member rosters, session bookings, package purchases, and attendance history sync continuously. Milton&apos;s Fitness Director and Operations agents use this data alongside wearable, nutrition, and training data to generate facility-level intelligence.
        </p>
      </section>

      {/* Connected Platforms */}
      <section style={{ padding: sectionPad, paddingTop: 0 }}>
        <h2 style={{
          fontFamily: h,
          fontSize: mobile ? 28 : 36,
          fontWeight: 400,
          color: "#fff",
          margin: "0 0 32px 0",
        }}>Connected Platforms</h2>
        
        {/* Featured Integrations */}
        <div style={{ marginBottom: 40 }}>
          <h3 style={{
            fontFamily: f,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#0d9aa5",
            marginBottom: 16,
          }}>Featured Integrations</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {featuredIntegrations.map((platform, i) => (
              <span key={i} style={{
                fontFamily: f,
                fontSize: 14,
                fontWeight: 600,
                color: "#fff",
                background: "rgba(13,154,165,0.15)",
                border: "1px solid rgba(13,154,165,0.3)",
                borderRadius: 8,
                padding: "10px 18px",
              }}>{platform}</span>
            ))}
          </div>
        </div>

        {/* All Supported Platforms */}
        <div>
          <h3 style={{
            fontFamily: f,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
            marginBottom: 16,
          }}>All Supported Platforms</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {allPlatforms.map((platform, i) => (
              <span key={i} style={{
                fontFamily: f,
                fontSize: 13,
                color: "rgba(255,255,255,0.5)",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 6,
                padding: "8px 14px",
              }}>{platform}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Data Points */}
      <section style={{ padding: sectionPad, paddingTop: 0 }}>
        <h2 style={{
          fontFamily: h,
          fontSize: mobile ? 28 : 36,
          fontWeight: 400,
          color: "#fff",
          margin: "0 0 32px 0",
        }}>Data Milton pulls from management software</h2>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: mobile ? "1fr" : tablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
          gap: 16,
        }}>
          {dataPoints.map((point, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12,
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#9af198",
                flexShrink: 0,
              }} />
              <span style={{
                fontFamily: f,
                fontSize: 14,
                color: "rgba(255,255,255,0.8)",
              }}>{point}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: sectionPad, textAlign: "center" }}>
        <p style={{
          fontFamily: f,
          fontSize: mobile ? 15 : 17,
          color: "rgba(255,255,255,0.6)",
          marginBottom: 24,
        }}>
          Use a different platform? We&apos;re building new integrations based on partner demand — let us know what you&apos;re running.
        </p>
        <a href="#/partners/inquire" style={{
          fontFamily: f,
          fontSize: 14,
          fontWeight: 600,
          color: "#061c27",
          background: "#0d9aa5",
          border: "none",
          borderRadius: 8,
          padding: "14px 28px",
          textDecoration: "none",
          display: "inline-block",
          transition: "all 0.2s ease",
        }}>Request an Integration</a>
      </section>

      <SharedFooter />
    </div>
  );
}
