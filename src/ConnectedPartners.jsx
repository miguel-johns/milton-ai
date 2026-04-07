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

function PartnerCategory({ title, description, body, partners, icon }) {
  const { mobile, tablet } = useBreakpoint();
  const [hovered, setHovered] = useState(false);
  
  return (
    <div 
      style={{
        background: hovered ? "rgba(13,154,165,0.06)" : "rgba(255,255,255,0.02)",
        border: hovered ? "1px solid rgba(13,154,165,0.3)" : "1px solid rgba(255,255,255,0.06)",
        borderRadius: mobile ? 16 : 20,
        padding: mobile ? "28px 24px" : "36px 32px",
        transition: "all 0.3s ease",
        marginBottom: mobile ? 20 : 24,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: mobile ? 16 : 20, marginBottom: 16 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: "rgba(13,154,165,0.1)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          {icon}
        </div>
        <div>
          <h3 style={{
            fontFamily: serif,
            fontSize: mobile ? 22 : 28,
            fontWeight: 400,
            color: "#fff",
            margin: "0 0 4px 0",
          }}>{title}</h3>
          <p style={{
            fontFamily: f,
            fontSize: mobile ? 13 : 14,
            color: teal,
            margin: 0,
          }}>{description}</p>
        </div>
      </div>
      
      <p style={{
        fontFamily: f,
        fontSize: mobile ? 14 : 16,
        lineHeight: 1.65,
        color: "rgba(255,255,255,0.6)",
        margin: "0 0 20px 0",
      }}>{body}</p>
      
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
      }}>
        {partners.map((partner, i) => (
          <span 
            key={i}
            style={{
              fontFamily: f,
              fontSize: mobile ? 11 : 12,
              color: "rgba(255,255,255,0.5)",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 6,
              padding: "6px 12px",
            }}
          >{partner}</span>
        ))}
      </div>
    </div>
  );
}

// Icons
const WearableIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="6" y="4" width="12" height="16" rx="4" stroke={teal} strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="3" stroke={mint} strokeWidth="1.5"/>
    <path d="M12 9V12L14 14" stroke={mint} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const BodyScanIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 4C14 4 15 5 15 7V10" stroke={teal} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 4C10 4 9 5 9 7V10" stroke={teal} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9 10C7 10 6 11 6 13V17C6 19 7 20 9 20H15C17 20 18 19 18 17V13C18 11 17 10 15 10" stroke={teal} strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="7" r="2" fill={mint}/>
    <path d="M3 12H6" stroke={mint} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M18 12H21" stroke={mint} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const EquipmentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="10" width="4" height="8" rx="1" stroke={teal} strokeWidth="1.5"/>
    <rect x="17" y="10" width="4" height="8" rx="1" stroke={teal} strokeWidth="1.5"/>
    <rect x="7" y="11" width="10" height="2" fill={mint}/>
    <rect x="7" y="15" width="10" height="2" fill={teal}/>
    <path d="M5 10V8C5 7 6 6 7 6" stroke={teal} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M19 10V8C19 7 18 6 17 6" stroke={teal} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const SoftwareIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="14" rx="2" stroke={teal} strokeWidth="1.5"/>
    <path d="M3 15H21" stroke={teal} strokeWidth="1.5"/>
    <circle cx="12" cy="20" r="1" fill={mint}/>
    <path d="M10 20H14" stroke={mint} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 8H16" stroke={mint} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 11H12" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const NutritionIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 3C16.5 3 18 6 18 9C18 12 16 14 16 17V20C16 21 15 21 14 21H10C9 21 8 21 8 20V17C8 14 6 12 6 9C6 6 7.5 3 12 3Z" stroke={teal} strokeWidth="1.5"/>
    <path d="M10 21V17" stroke={mint} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14 21V17" stroke={mint} strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="9" r="2" fill={mint}/>
  </svg>
);

export default function ConnectedPartners() {
  const { mobile, tablet } = useBreakpoint();
  const px = mobile ? 20 : tablet ? 32 : 40;
  const sectionPad = mobile ? "72px 0" : "100px 0";

  const categories = [
    {
      title: "Wearable Devices",
      description: "Connect fitness trackers and smartwatches",
      body: "Milton syncs with every major wearable platform — pulling heart rate, HRV, sleep, steps, and activity data directly into your coaching dashboard. Real-time member insights, zero manual entry.",
      partners: ["Apple Watch", "Garmin", "Fitbit", "Oura", "Withings", "Wahoo", "Polar", "Suunto", "Samsung Health", "Coros", "Huawei", "Biostrap", "Whoop", "Ultrahuman", "Omron", "Zepp", "XOSS", "Moxy", "Catapult One", "Core"],
      icon: <WearableIcon />,
    },
    {
      title: "Body Scans",
      description: "Connect body composition analyzers",
      body: "Track member body composition over time with data from leading analyzers. Milton turns scan results into actionable coaching insights and progress narratives your trainers can share.",
      partners: ["InBody", "Withings Body+", "Omron Body Composition", "Samsung Body Composition"],
      icon: <BodyScanIcon />,
    },
    {
      title: "Strength & Cardio Equipment",
      description: "Connect smart gym machines",
      body: "Through our partnership with Fit-X, Milton connects to nearly all major strength and cardio equipment on your floor. Session data flows straight into member profiles — reps, sets, load, duration, watts — giving trainers a complete picture without clipboards.",
      partners: ["Fit-X Integration Hub", "Peloton", "Concept 2", "iFIT / NordicTrack", "Zwift", "Rouvy", "Hammerhead", "Lezyne", "Xert", "Decathlon"],
      icon: <EquipmentIcon />,
    },
    {
      title: "Management Software",
      description: "Connect gym management platforms",
      body: "Milton layers intelligence on top of the systems your facility already runs. We integrate with leading gym management platforms so member data, scheduling, and billing context feed directly into Milton's AI agents.",
      partners: ["MindBody", "ABC Fitness", "Wellness Living", "ZenPlanner", "Exercise.com", "GymMaster", "Push Press", "Virtuagym"],
      icon: <SoftwareIcon />,
    },
    {
      title: "Nutrition & Fitness Apps",
      description: "Connect fitness and wellness apps",
      body: "Your members already track nutrition and workouts across dozens of apps. Milton pulls it all together — giving trainers a unified view of what members are eating, how they're training, and where the gaps are.",
      partners: ["MyFitnessPal", "Strava", "Cronometer", "Training Peaks", "MapMyFitness", "MapMyRun", "MapMyRide", "MapMyWalk", "FatSecret", "NutraCheck", "MacrosFirst", "Keto-Mojo", "My Macros+", "Today's Plan", "Ride with GPS", "Komoot", "Nolio", "Xhale", "CardioMood", "Clue", "Insiders", "Health Gauge"],
      icon: <NutritionIcon />,
    },
  ];

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
          minHeight: mobile ? "auto" : "60vh",
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
            <span style={{ fontFamily: f, fontSize: mobile ? 12 : 14, color: "rgba(255,255,255,0.7)" }}>Connected Partners</span>
          </div>

          <h1 style={{
            fontFamily: serif,
            fontSize: mobile ? 36 : tablet ? 52 : 68,
            fontWeight: 400, lineHeight: 1.08, color: "#fff",
            margin: "0 auto 28px auto", maxWidth: 900,
          }}>
            Milton connects to the tools your facility <Accent>already uses</Accent>
          </h1>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 19, lineHeight: 1.65,
            color: "rgba(255,255,255,0.5)", maxWidth: 700, margin: "0 auto 40px auto",
          }}>
            61+ integrations across wearables, equipment, body composition analyzers, management platforms, and nutrition apps — so your trainers get the full picture without changing a thing.
          </p>

          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: mobile ? 12 : 16,
            flexWrap: "wrap",
          }}>
            <span style={{
              fontFamily: f,
              fontSize: mobile ? 32 : 48,
              fontWeight: 600,
              color: teal,
            }}>61+</span>
            <span style={{
              fontFamily: f,
              fontSize: mobile ? 14 : 16,
              color: "rgba(255,255,255,0.5)",
              alignSelf: "center",
            }}>integrations and growing</span>
          </div>
        </section>

        {/* ═══════ PARTNER CATEGORIES ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="Integrations" />
          <SectionDivider />

          {categories.map((category, i) => (
            <PartnerCategory
              key={i}
              title={category.title}
              description={category.description}
              body={category.body}
              partners={category.partners}
              icon={category.icon}
            />
          ))}
        </section>

        {/* ═══════ BECOME A PARTNER CTA ═══════ */}
        <section style={{ 
          padding: mobile ? "60px 0 80px" : "80px 0 120px",
          textAlign: "center",
        }}>
          <div style={{
            background: "linear-gradient(145deg, rgba(13,154,165,0.1) 0%, rgba(6,28,39,0.5) 100%)",
            border: "1px solid rgba(13,154,165,0.2)",
            borderRadius: mobile ? 20 : 28,
            padding: mobile ? "40px 24px" : "56px 48px",
          }}>
            <h2 style={{
              fontFamily: serif,
              fontSize: mobile ? 28 : 40,
              fontWeight: 400,
              color: "#fff",
              margin: "0 0 16px 0",
            }}>Become a Connected Partner</h2>
            
            <p style={{
              fontFamily: f,
              fontSize: mobile ? 14 : 16,
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.6)",
              maxWidth: 500,
              margin: "0 auto 32px auto",
            }}>
              Interested in integrating your product with the Milton ecosystem? Explore becoming a Connected Partner.
            </p>
            
            <a
              href="#/partners/inquire"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: f,
                fontSize: mobile ? 14 : 16,
                fontWeight: 600,
                color: "#061c27",
                background: mint,
                border: "none",
                borderRadius: 8,
                padding: mobile ? "14px 28px" : "16px 36px",
                textDecoration: "none",
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
              Inquire Now
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
