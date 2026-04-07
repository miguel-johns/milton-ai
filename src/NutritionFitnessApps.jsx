import { useState, useEffect } from 'react';

const f = "'DM Sans', sans-serif";
const fSerif = "'Cormorant Garamond', serif";

function useBreakpoint() {
  const [state, setState] = useState({ mobile: false, tablet: false });
  useEffect(() => {
    const check = () => {
      setState({ mobile: window.innerWidth < 640, tablet: window.innerWidth >= 640 && window.innerWidth < 1024 });
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return state;
}

export default function NutritionFitnessApps() {
  const { mobile, tablet } = useBreakpoint();
  const sectionPad = mobile ? "48px 20px" : tablet ? "64px 40px" : "80px 64px";

  const featuredApps = ["MyFitnessPal", "Strava", "Cronometer", "Training Peaks"];
  const allApps = ["MapMyFitness", "MapMyRun", "MapMyRide", "MapMyWalk", "FatSecret", "NutraCheck", "MacrosFirst", "Keto-Mojo", "My Macros+", "Today's Plan", "Ride with GPS", "Komoot", "Nolio", "Xhale", "CardioMood", "Clue", "Insiders", "Health Gauge"];

  const dataPoints = [
    "Daily calorie and macronutrient intake",
    "Meal logging frequency and consistency",
    "Cardio and endurance workouts outside the gym",
    "Route and distance data (running, cycling)",
    "Cycle tracking and recovery context (where relevant)",
    "Training load and performance metrics",
  ];

  return (
    <div style={{ background: "#061c27", minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ padding: sectionPad, paddingTop: mobile ? 100 : 120 }}>
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
        
        <p style={{
          fontFamily: f,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#0d9aa5",
          marginBottom: 16,
        }}>Connected Partners / Nutrition & Fitness Apps</p>
        
        <h1 style={{
          fontFamily: fSerif,
          fontSize: mobile ? 32 : tablet ? 40 : 48,
          fontWeight: 400,
          color: "#fff",
          lineHeight: 1.15,
          marginBottom: 24,
          maxWidth: 700,
        }}>See what your members are doing between sessions</h1>
        
        <p style={{
          fontFamily: f,
          fontSize: mobile ? 15 : 17,
          color: "rgba(255,255,255,0.6)",
          lineHeight: 1.7,
          maxWidth: 680,
        }}>
          The hour a member spends with their trainer matters. The other 167 hours matter more. Milton connects to the nutrition and fitness apps your members already use — giving trainers visibility into eating habits, extra workouts, and daily activity without asking members to switch tools.
        </p>
      </section>

      {/* Why It Matters */}
      <section style={{ padding: sectionPad, paddingTop: 0 }}>
        <h2 style={{
          fontFamily: fSerif,
          fontSize: mobile ? 24 : 28,
          fontWeight: 400,
          color: "#fff",
          marginBottom: 16,
        }}>Why it matters for your facility</h2>
        <p style={{
          fontFamily: f,
          fontSize: mobile ? 15 : 16,
          color: "rgba(255,255,255,0.6)",
          lineHeight: 1.7,
          maxWidth: 680,
        }}>
          A trainer notices a member's energy has been low in sessions. They glance at Milton and see the member has been logging 1,200 calories a day in MyFitnessPal for two weeks. Now they can have a real conversation. That's the difference between guessing and coaching.
        </p>
      </section>

      {/* How It Works */}
      <section style={{ padding: sectionPad, paddingTop: 0 }}>
        <h2 style={{
          fontFamily: fSerif,
          fontSize: mobile ? 24 : 28,
          fontWeight: 400,
          color: "#fff",
          marginBottom: 16,
        }}>How it works</h2>
        <p style={{
          fontFamily: f,
          fontSize: mobile ? 15 : 16,
          color: "rgba(255,255,255,0.6)",
          lineHeight: 1.7,
          maxWidth: 680,
        }}>
          Members authorize their existing apps through the Milton app, via SMS sync, or through the coaching portal. Data syncs automatically in the background. Trainers see a consolidated nutrition and activity feed — no need to ask members to screenshot their food logs or recall what they did over the weekend.
        </p>
      </section>

      {/* Connected Apps */}
      <section style={{ padding: sectionPad, paddingTop: 0 }}>
        <h2 style={{
          fontFamily: fSerif,
          fontSize: mobile ? 24 : 28,
          fontWeight: 400,
          color: "#fff",
          marginBottom: 32,
        }}>Connected Apps</h2>

        {/* Featured Integrations */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{
            fontFamily: f,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#0d9aa5",
            marginBottom: 16,
          }}>Featured Integrations</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {featuredApps.map((app, i) => (
              <span key={i} style={{
                fontFamily: f,
                fontSize: 13,
                fontWeight: 500,
                color: "#fff",
                background: "rgba(13,154,165,0.15)",
                border: "1px solid rgba(13,154,165,0.3)",
                borderRadius: 8,
                padding: "10px 16px",
              }}>{app}</span>
            ))}
          </div>
        </div>

        {/* All Supported Apps */}
        <div>
          <h3 style={{
            fontFamily: f,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
            marginBottom: 16,
          }}>All Supported Apps</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {allApps.map((app, i) => (
              <span key={i} style={{
                fontFamily: f,
                fontSize: 12,
                color: "rgba(255,255,255,0.5)",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 6,
                padding: "6px 12px",
              }}>{app}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Data Points */}
      <section style={{ padding: sectionPad, paddingTop: 0 }}>
        <h2 style={{
          fontFamily: fSerif,
          fontSize: mobile ? 24 : 28,
          fontWeight: 400,
          color: "#fff",
          marginBottom: 24,
        }}>Data Milton pulls from apps</h2>
        
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
              padding: "16px 20px",
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
                color: "rgba(255,255,255,0.7)",
              }}>{point}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: sectionPad, paddingTop: 0 }}>
        <div style={{
          background: "rgba(13,154,165,0.08)",
          border: "1px solid rgba(13,154,165,0.2)",
          borderRadius: 16,
          padding: mobile ? "28px 24px" : "36px 32px",
        }}>
          <p style={{
            fontFamily: f,
            fontSize: mobile ? 15 : 16,
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.7,
            marginBottom: 20,
          }}>
            Members use an app we don't support yet? We're always expanding — tell us what your members are tracking with.
          </p>
          <a href="#/partners/inquire" style={{
            fontFamily: f,
            fontSize: 14,
            fontWeight: 600,
            color: "#0d9aa5",
            textDecoration: "none",
          }}>Request an Integration &rarr;</a>
        </div>
      </section>
    </div>
  );
}
