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

function Accent({ children }) {
  return <span style={{ color: teal, fontStyle: "italic" }}>{children}</span>;
}

function AnimatedNumber({ value, prefix = "", suffix = "", duration = 1200 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    let start = 0;
    const end = value;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + (end - start) * eased));
      if (progress < 1) ref.current = requestAnimationFrame(tick);
    };
    ref.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(ref.current);
  }, [value, duration]);
  return <>{prefix}{display.toLocaleString()}{suffix}</>;
}

function SliderInput({ label, value, onChange, min, max, step = 1, format, description }) {
  const { mobile } = useBreakpoint();
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: mobile ? 32 : 40 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
        <label style={{ fontFamily: f, fontSize: mobile ? 14 : 16, fontWeight: 600, color: "#fff" }}>{label}</label>
        <span style={{ fontFamily: f, fontSize: mobile ? 22 : 28, fontWeight: 700, color: teal }}>{format ? format(value) : value}</span>
      </div>
      {description && <p style={{ fontFamily: f, fontSize: 13, color: "rgba(255,255,255,0.35)", margin: "0 0 14px 0" }}>{description}</p>}
      <div style={{ position: "relative", height: 40, display: "flex", alignItems: "center" }}>
        <div style={{
          position: "absolute", left: 0, right: 0, height: 6, borderRadius: 3,
          background: "rgba(255,255,255,0.06)",
        }} />
        <div style={{
          position: "absolute", left: 0, height: 6, borderRadius: 3,
          width: `${pct}%`,
          background: `linear-gradient(90deg, ${teal}, ${mint}80)`,
          boxShadow: `0 0 12px ${teal}30`,
        }} />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{
            position: "absolute", left: 0, right: 0, width: "100%", height: 40,
            WebkitAppearance: "none", appearance: "none", background: "transparent",
            cursor: "pointer", zIndex: 2, margin: 0,
          }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
        <span style={{ fontFamily: f, fontSize: 11, color: "rgba(255,255,255,0.2)" }}>{format ? format(min) : min}</span>
        <span style={{ fontFamily: f, fontSize: 11, color: "rgba(255,255,255,0.2)" }}>{format ? format(max) : max}</span>
      </div>
    </div>
  );
}

function CheckboxGroup({ label, options, selected, onChange, description }) {
  const { mobile } = useBreakpoint();
  return (
    <div style={{ marginBottom: mobile ? 32 : 40 }}>
      <label style={{ fontFamily: f, fontSize: mobile ? 14 : 16, fontWeight: 600, color: "#fff", display: "block", marginBottom: 4 }}>{label}</label>
      {description && <p style={{ fontFamily: f, fontSize: 13, color: "rgba(255,255,255,0.35)", margin: "0 0 14px 0" }}>{description}</p>}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {options.map(opt => {
          const active = selected.includes(opt);
          return (
            <button key={opt} onClick={() => {
              onChange(active ? selected.filter(s => s !== opt) : [...selected, opt]);
            }} style={{
              fontFamily: f, fontSize: 14, fontWeight: 500,
              padding: "10px 20px", borderRadius: 100, cursor: "pointer",
              border: `1px solid ${active ? teal : "rgba(255,255,255,0.1)"}`,
              background: active ? `${teal}15` : "rgba(255,255,255,0.03)",
              color: active ? teal : "rgba(255,255,255,0.5)",
              transition: "all 0.2s ease",
            }}>{opt}</button>
          );
        })}
      </div>
    </div>
  );
}

function ResultCard({ label, value, prefix, suffix, description, highlight, mobile }) {
  return (
    <div style={{
      background: highlight
        ? "linear-gradient(145deg, rgba(13,154,165,0.15) 0%, rgba(6,28,39,0.5) 100%)"
        : "linear-gradient(145deg, rgba(13,154,165,0.06) 0%, rgba(6,28,39,0.35) 100%)",
      border: `1px solid ${highlight ? `${teal}40` : "rgba(13,154,165,0.15)"}`,
      borderRadius: 20, padding: mobile ? 24 : 32,
      backdropFilter: "blur(16px)",
      boxShadow: highlight
        ? `0 16px 48px rgba(0,0,0,0.3), 0 0 40px ${teal}08`
        : "0 8px 32px rgba(0,0,0,0.2)",
      display: "flex", flexDirection: "column", gap: 6,
    }}>
      <span style={{ fontFamily: f, fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>{label}</span>
      <span style={{ fontFamily: f, fontSize: mobile ? 32 : 40, fontWeight: 700, color: highlight ? mint : "#fff", lineHeight: 1 }}>
        <AnimatedNumber value={value} prefix={prefix || ""} suffix={suffix || ""} />
      </span>
      {description && <span style={{ fontFamily: f, fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.5, marginTop: 4 }}>{description}</span>}
    </div>
  );
}

export default function PricingCalculator() {
  const { mobile, tablet } = useBreakpoint();
  const [trainers, setTrainers] = useState(5);
  const [avgPackage, setAvgPackage] = useState(250);
  const [clientsPer, setClientsPer] = useState(15);
  const [sessionTypes, setSessionTypes] = useState(["1-on-1"]);
  const [showResults, setShowResults] = useState(false);
  const [resultsVisible, setResultsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadGym, setLeadGym] = useState("");
  const [leadRole, setLeadRole] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const resultsRef = useRef(null);

  useEffect(() => {
    if (showModal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [showModal]);

  // ——— Calculations ———
  const totalClients = trainers * clientsPer;
  const monthlyRevenue = totalClients * avgPackage;

  // Time saved: ~2hrs/week per trainer on follow-ups + 5hrs/week fitness director admin
  const trainerTimeSaved = trainers * 2;
  const directorTimeSaved = 5;
  const totalTimeSavedWeek = trainerTimeSaved + directorTimeSaved;
  const totalTimeSavedMonth = totalTimeSavedWeek * 4;

  // Revenue recovered: assume 8% churn reduction, avg 4-month client lifetime recovered
  const churnReduction = 0.08;
  const clientsRecovered = Math.round(totalClients * churnReduction);
  const revenueRecovered = clientsRecovered * avgPackage * 4;

  // Trainer retention: industry loses 80%, Milton reduces by ~25%
  const trainerRetentionLift = 25;

  // ROI - pricing is $499/month
  const miltonMonthly = 499;
  const annualValue = revenueRecovered + (totalTimeSavedMonth * 35 * 12); // $35/hr value on saved time
  const annualCost = miltonMonthly * 12; // $5,988 annually
  const roi = Math.round((annualValue / annualCost) * 100);

  const handleCalculate = () => {
    setShowModal(true);
  };

  const handleLeadSubmit = () => {
    if (!leadName.trim() || !leadEmail.trim()) return;
    setLeadSubmitted(true);
    // In production: send lead data to CRM / API here
    setTimeout(() => {
      setShowModal(false);
      setShowResults(true);
      setTimeout(() => {
        setResultsVisible(true);
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }, 50);
    }, 600);
  };

  const px = mobile ? 20 : tablet ? 32 : 40;

  return (
    <>
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 24px; height: 24px; border-radius: 50%;
          background: linear-gradient(135deg, ${teal}, #126b80);
          box-shadow: 0 2px 10px ${teal}50, 0 0 20px ${teal}20;
          border: 2px solid rgba(255,255,255,0.15);
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 24px; height: 24px; border-radius: 50%;
          background: linear-gradient(135deg, ${teal}, #126b80);
          box-shadow: 0 2px 10px ${teal}50;
          border: 2px solid rgba(255,255,255,0.15);
          cursor: pointer;
        }
      `}</style>

      {/* Lead Capture Modal */}
      {showModal && (
        <div
          onClick={() => !leadSubmitted && setShowModal(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            background: "rgba(4,16,22,0.85)",
            backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: mobile ? 16 : 40,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: "100%", maxWidth: 460,
              background: "linear-gradient(145deg, rgba(13,154,165,0.08) 0%, rgba(6,28,39,0.95) 100%)",
              border: `1px solid ${teal}25`,
              borderRadius: mobile ? 20 : 24,
              padding: mobile ? "32px 24px" : "44px 40px",
              boxShadow: `0 32px 80px rgba(0,0,0,0.5), 0 0 100px ${teal}06`,
              position: "relative", overflow: "hidden",
            }}
          >
            {/* Top accent line */}
            <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: 1, background: `linear-gradient(90deg, transparent, ${teal}40, transparent)` }} />

            {leadSubmitted ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
                <h3 style={{ fontFamily: f, fontSize: 20, fontWeight: 700, color: "#fff", margin: "0 0 8px 0" }}>You're in.</h3>
                <p style={{ fontFamily: f, fontSize: 14, color: "rgba(255,255,255,0.45)", margin: 0 }}>Loading your results...</p>
              </div>
            ) : (
              <>
                <h3 style={{
                  fontFamily: serif, fontSize: mobile ? 24 : 28,
                  fontWeight: 400, color: "#fff", margin: "0 0 8px 0",
                }}>Almost there.</h3>
                <p style={{
                  fontFamily: f, fontSize: 14, color: "rgba(255,255,255,0.4)",
                  margin: "0 0 28px 0", lineHeight: 1.6,
                }}>
                  Enter your details and we'll show you your personalized ROI, time savings, and revenue impact — instantly.
                </p>

                {[
                  { label: "Your name", value: leadName, set: setLeadName, placeholder: "First Last", required: true },
                  { label: "Work email", value: leadEmail, set: setLeadEmail, placeholder: "you@yourgym.com", type: "email", required: true },
                  { label: "Gym / Business name", value: leadGym, set: setLeadGym, placeholder: "e.g. Optimal Performance" },
                  { label: "Your role", value: leadRole, set: setLeadRole, placeholder: "e.g. Owner, Fitness Director, GM" },
                ].map((field, i) => (
                  <div key={i} style={{ marginBottom: 18 }}>
                    <label style={{
                      fontFamily: f, fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)",
                      display: "block", marginBottom: 6,
                    }}>
                      {field.label}{field.required && <span style={{ color: teal, marginLeft: 3 }}>*</span>}
                    </label>
                    <input
                      type={field.type || "text"}
                      value={field.value}
                      onChange={e => field.set(e.target.value)}
                      placeholder={field.placeholder}
                      style={{
                        width: "100%", boxSizing: "border-box",
                        fontFamily: f, fontSize: 15,
                        padding: "12px 16px", borderRadius: 12,
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#fff", outline: "none",
                        transition: "border-color 0.2s ease",
                      }}
                      onFocus={e => e.target.style.borderColor = `${teal}60`}
                      onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                    />
                  </div>
                ))}

                <button
                  onClick={handleLeadSubmit}
                  disabled={!leadName.trim() || !leadEmail.trim()}
                  style={{
                    width: "100%", marginTop: 8,
                    fontFamily: f, fontSize: 16, fontWeight: 700,
                    padding: "16px 0", borderRadius: 100, border: "none",
                    background: (!leadName.trim() || !leadEmail.trim())
                      ? "rgba(255,255,255,0.08)"
                      : `linear-gradient(135deg, ${teal}, #126b80)`,
                    color: (!leadName.trim() || !leadEmail.trim())
                      ? "rgba(255,255,255,0.25)"
                      : "#fff",
                    cursor: (!leadName.trim() || !leadEmail.trim()) ? "not-allowed" : "pointer",
                    boxShadow: (leadName.trim() && leadEmail.trim())
                      ? `0 8px 32px ${teal}30`
                      : "none",
                    transition: "all 0.3s ease",
                    letterSpacing: 0.3,
                  }}
                >
                  Show Me My Results →
                </button>

                <p style={{
                  fontFamily: f, fontSize: 11, color: "rgba(255,255,255,0.2)",
                  textAlign: "center", margin: "16px 0 0 0", lineHeight: 1.5,
                }}>
                  No spam. We'll send your results and one follow-up — that's it.
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1000, margin: "0 auto", padding: `0 ${px}px` }}>

        {/* ——— HEADER ——— */}
        <div style={{ textAlign: "center", padding: mobile ? "48px 0 40px" : "80px 0 60px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 20 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: teal }} />
            <span style={{ fontFamily: f, fontSize: 12, fontWeight: 500, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>PRICING</span>
          </div>

          <h1 style={{
            fontFamily: serif, fontSize: mobile ? 32 : tablet ? 44 : 56,
            fontWeight: 400, lineHeight: 1.15, color: "#fff", margin: "0 0 20px 0",
          }}>
            See exactly what Milton is <Accent>worth</Accent> to your business.
          </h1>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.65,
            color: "rgba(255,255,255,0.5)", maxWidth: 560, margin: "0 auto",
          }}>
            Enter your numbers. We'll show you time saved, revenue recovered, and your projected ROI — specific to your business.
          </p>
        </div>

        {/* ——— CALCULATOR ——— */}
        <div style={{
          background: "linear-gradient(145deg, rgba(13,154,165,0.06) 0%, rgba(6,28,39,0.4) 100%)",
          border: "1px solid rgba(13,154,165,0.15)",
          borderRadius: mobile ? 20 : 28,
          padding: mobile ? "32px 24px" : tablet ? "48px 40px" : "56px 56px",
          backdropFilter: "blur(16px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)",
          marginBottom: 40,
        }}>
          <h2 style={{
            fontFamily: serif, fontSize: mobile ? 24 : 32,
            fontWeight: 400, color: "#fff", margin: "0 0 8px 0",
          }}>Tell us about your business</h2>
          <p style={{ fontFamily: f, fontSize: 14, color: "rgba(255,255,255,0.35)", margin: "0 0 36px 0" }}>
            Adjust the sliders to match your operation. We'll calculate the rest.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
            gap: mobile ? 0 : "0 48px",
          }}>
            <SliderInput
              label="Number of trainers"
              value={trainers} onChange={setTrainers}
              min={1} max={15}
              description="Per location — we provide custom pricing for multi-location businesses"
            />
            <SliderInput
              label="Average clients per trainer"
              value={clientsPer} onChange={setClientsPer}
              min={5} max={40}
              description="Active clients each trainer manages"
            />
            <SliderInput
              label="Average monthly package price"
              value={avgPackage} onChange={setAvgPackage}
              min={100} max={800} step={25}
              format={v => `$${v}`}
              description="What a typical client pays per month"
            />
            <CheckboxGroup
              label="Session types offered"
              options={["1-on-1", "Semi-Private", "Group", "Bootcamp"]}
              selected={sessionTypes} onChange={setSessionTypes}
              description="Select all that apply"
            />
          </div>

          {/* Summary before calculate */}
          <div style={{
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 16, padding: mobile ? "18px 20px" : "20px 28px",
            marginBottom: 32, display: "flex",
            flexDirection: mobile ? "column" : "row",
            gap: mobile ? 12 : 32, alignItems: mobile ? "flex-start" : "center",
          }}>
            <div style={{ flex: 1 }}>
              <span style={{ fontFamily: f, fontSize: 12, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: 1 }}>Your business snapshot</span>
              <div style={{ fontFamily: f, fontSize: mobile ? 14 : 15, color: "rgba(255,255,255,0.6)", marginTop: 6, lineHeight: 1.6 }}>
                <span style={{ color: "#fff", fontWeight: 600 }}>{trainers} trainers</span> managing{" "}
                <span style={{ color: "#fff", fontWeight: 600 }}>{totalClients} clients</span> generating{" "}
                <span style={{ color: teal, fontWeight: 600 }}>${monthlyRevenue.toLocaleString()}/mo</span> in revenue
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <button onClick={handleCalculate} style={{
              fontFamily: f, fontSize: mobile ? 16 : 18, fontWeight: 700,
              padding: mobile ? "16px 40px" : "18px 56px",
              borderRadius: 100, border: "none", cursor: "pointer",
              background: `linear-gradient(135deg, ${teal}, #126b80)`,
              color: "#fff", letterSpacing: 0.5,
              boxShadow: `0 8px 32px ${teal}30, 0 0 60px ${teal}10`,
              transition: "all 0.3s ease",
            }}>
              Show Me My Results
            </button>
          </div>
        </div>

        {/* ——— RESULTS ——— */}
        {showResults && (
          <div
            ref={resultsRef}
            style={{
              opacity: resultsVisible ? 1 : 0,
              transform: resultsVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
              paddingBottom: mobile ? 60 : 100,
            }}
          >
            {/* Results header */}
            <div style={{ textAlign: "center", marginBottom: mobile ? 36 : 48 }}>
              <h2 style={{
                fontFamily: serif, fontSize: mobile ? 28 : tablet ? 40 : 48,
                fontWeight: 400, lineHeight: 1.15, color: "#fff", margin: "0 0 12px 0",
              }}>
                Your <Accent>dream outcome</Accent> with Milton
              </h2>
              <p style={{ fontFamily: f, fontSize: mobile ? 14 : 16, color: "rgba(255,255,255,0.4)", margin: 0 }}>
                Based on {trainers} trainers, {totalClients} clients, and ${avgPackage}/mo packages
              </p>
            </div>

            {/* ROI hero card */}
            <div style={{
              background: `linear-gradient(145deg, ${teal}18 0%, rgba(6,28,39,0.6) 100%)`,
              border: `1px solid ${teal}30`,
              borderRadius: mobile ? 20 : 28,
              padding: mobile ? "36px 24px" : "48px 56px",
              textAlign: "center", marginBottom: mobile ? 20 : 28,
              boxShadow: `0 24px 60px rgba(0,0,0,0.3), 0 0 80px ${teal}06`,
              backdropFilter: "blur(20px)",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: 1, background: `linear-gradient(90deg, transparent, ${teal}40, transparent)` }} />
              <span style={{ fontFamily: f, fontSize: 10, fontWeight: 600, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>PROJECTED ANNUAL ROI</span>
              <div style={{ fontFamily: f, fontSize: mobile ? 56 : 80, fontWeight: 700, color: mint, lineHeight: 1, margin: "12px 0 8px 0" }}>
                <AnimatedNumber value={roi} suffix="%" duration={1500} />
              </div>
              <p style={{ fontFamily: f, fontSize: mobile ? 14 : 16, color: "rgba(255,255,255,0.45)", margin: 0 }}>
                ${annualValue.toLocaleString()} in annual value vs. ${annualCost.toLocaleString()} annual cost
              </p>
            </div>

            {/* Metric cards */}
            <div style={{
              display: "grid",
              gridTemplateColumns: mobile ? "1fr" : tablet ? "1fr 1fr" : "1fr 1fr 1fr",
              gap: mobile ? 14 : 20,
              marginBottom: mobile ? 20 : 28,
            }}>
              <ResultCard
                mobile={mobile}
                label="REVENUE RECOVERED"
                value={revenueRecovered}
                prefix="$"
                suffix="/yr"
                description={`${clientsRecovered} clients saved from churning × $${avgPackage} × 4 months avg lifetime`}
                highlight
              />
              <ResultCard
                mobile={mobile}
                label="TIME SAVED"
                value={totalTimeSavedMonth}
                suffix=" hrs/mo"
                description={`${trainerTimeSaved}hrs/wk from trainer follow-ups + ${directorTimeSaved}hrs/wk from director admin`}
              />
              <ResultCard
                mobile={mobile}
                label="TRAINER RETENTION LIFT"
                value={trainerRetentionLift}
                suffix="%"
                description="Reduced turnover through development paths, gap identification, and career visibility"
              />
            </div>

            {/* Milton cost + breakdown */}
            <div style={{
              display: "grid",
              gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
              gap: mobile ? 14 : 20,
              marginBottom: mobile ? 40 : 56,
            }}>
              <div style={{
                background: "linear-gradient(145deg, rgba(13,154,165,0.06) 0%, rgba(6,28,39,0.35) 100%)",
                border: "1px solid rgba(13,154,165,0.15)",
                borderRadius: 20, padding: mobile ? 24 : 32,
                backdropFilter: "blur(16px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              }}>
                <span style={{ fontFamily: f, fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>STARTING AT</span>
                <div style={{ fontFamily: f, fontSize: mobile ? 36 : 44, fontWeight: 700, color: "#fff", lineHeight: 1, margin: "10px 0 8px 0" }}>
                  $499<span style={{ fontSize: mobile ? 18 : 22, fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>/mo</span>
                </div>
                <p style={{ fontFamily: f, fontSize: 12, color: teal, margin: 0, fontStyle: "italic" }}>
                  Custom pricing based on your unique needs.
                </p>
              </div>

              <div style={{
                background: "linear-gradient(145deg, rgba(13,154,165,0.06) 0%, rgba(6,28,39,0.35) 100%)",
                border: "1px solid rgba(13,154,165,0.15)",
                borderRadius: 20, padding: mobile ? 24 : 32,
                backdropFilter: "blur(16px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                display: "flex", flexDirection: "column", justifyContent: "center",
              }}>
                <span style={{ fontFamily: f, fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>WHAT'S INCLUDED</span>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
                  {[
                    "Coaching co-pilot for every trainer",
                    "Fitness director dashboard & analytics",
                    "Automated follow-ups & session briefs",
                    "Nutrition tools & challenge engine",
                    "Integrations with your existing stack",
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ color: teal, fontSize: 14, flexShrink: 0 }}>✓</span>
                      <span style={{ fontFamily: f, fontSize: 13, color: "rgba(255,255,255,0.55)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* The narrative / dream outcome */}
            <div style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: mobile ? 20 : 28,
              padding: mobile ? "32px 24px" : "48px 56px",
              marginBottom: mobile ? 40 : 56,
            }}>
              <h3 style={{
                fontFamily: serif, fontSize: mobile ? 24 : 32,
                fontWeight: 400, color: "#fff", margin: "0 0 20px 0",
              }}>Here's what changes</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <p style={{ fontFamily: f, fontSize: mobile ? 14 : 16, lineHeight: 1.7, color: "rgba(255,255,255,0.5)", margin: 0 }}>
                  Your <span style={{ color: "#fff", fontWeight: 600 }}>{trainers} trainers</span> stop guessing and start performing like your best. Every session is prepped. Every follow-up goes out. Every no-show gets a re-engagement message — automatically.
                </p>
                <p style={{ fontFamily: f, fontSize: mobile ? 14 : 16, lineHeight: 1.7, color: "rgba(255,255,255,0.5)", margin: 0 }}>
                  Your fitness director gets <span style={{ color: "#fff", fontWeight: 600 }}>{directorTimeSaved} hours back every week</span> — no more cross-referencing spreadsheets. One dashboard shows who's growing, who's slipping, and exactly where to intervene.
                </p>
                <p style={{ fontFamily: f, fontSize: mobile ? 14 : 16, lineHeight: 1.7, color: "rgba(255,255,255,0.5)", margin: 0 }}>
                  You save <span style={{ color: teal, fontWeight: 600 }}>{clientsRecovered} clients per year</span> from churning — that's <span style={{ color: teal, fontWeight: 600 }}>${revenueRecovered.toLocaleString()}</span> in revenue you're currently losing. And your trainers stick around longer because they can see a career path, not just a schedule.
                </p>
              </div>
            </div>

            {/* Final CTA */}
            <div style={{ textAlign: "center", paddingBottom: mobile ? 40 : 60 }}>
              <h2 style={{
                fontFamily: serif, fontSize: mobile ? 28 : 40,
                fontWeight: 400, color: "#fff", margin: "0 0 16px 0",
              }}>Ready to see it in action?</h2>
              <p style={{
                fontFamily: f, fontSize: mobile ? 14 : 16,
                color: "rgba(255,255,255,0.4)", maxWidth: 480,
                margin: "0 auto 32px auto",
              }}>
                Book a 30-minute demo and we'll walk through exactly how Milton works for a team of {trainers} — with your numbers, not ours.
              </p>
              <a href="#/book" style={{
                  fontFamily: f, fontSize: 16, fontWeight: 700,
                  padding: "16px 44px", borderRadius: 100, border: "none",
                  background: "#fff", color: navy, cursor: "pointer",
                  textDecoration: "none", display: "inline-block",
                }}>Request a Demo</a>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid rgba(13,154,165,0.08)",
        padding: mobile ? "24px 20px" : "32px 40px",
        display: "flex", justifyContent: "center",
        position: "relative", zIndex: 1,
      }}>
        <span style={{ fontFamily: f, fontSize: 13, color: "rgba(255,255,255,0.25)" }}>© 2026 MMNT Inc. All rights reserved.</span>
      </footer>
    </>
  );
}
