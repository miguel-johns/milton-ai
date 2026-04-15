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

function SectionDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "0 0 20px 0" }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: teal, flexShrink: 0 }} />
      <div style={{ flex: 1, height: 1, background: "rgba(13,154,165,0.3)" }} />
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

function ResponsiveImage({ desktopSrc, mobileSrc, alt, mobile }) {
  return (
    <div style={{
      width: "100%",
      borderRadius: mobile ? 16 : 20,
      overflow: "hidden",
      marginTop: 32,
    }}>
      <img
        src={mobile ? mobileSrc : desktopSrc}
        alt={alt}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
      />
    </div>
  );
}

export default function ImplementationScience() {
  const { mobile, tablet } = useBreakpoint();
  const sectionPad = mobile ? "64px 0" : "100px 0";

  return (
    <div style={{ position: "relative", zIndex: 1, fontFamily: f, padding: mobile ? "0 20px" : tablet ? "0 40px" : "0 60px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* ═══════ HERO ═══════ */}
        <section style={{
          minHeight: mobile ? "auto" : "50vh",
          display: "flex", flexDirection: "column",
          justifyContent: "center",
          padding: mobile ? "120px 0 48px" : "140px 0 64px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: teal, flexShrink: 0 }} />
            <span style={{ fontFamily: f, fontSize: 12, fontWeight: 500, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>Implementation Science</span>
          </div>

          <h1 style={{
            fontFamily: serif,
            fontSize: mobile ? 36 : tablet ? 52 : 64,
            fontWeight: 400, lineHeight: 1.08, color: "#fff",
            margin: "0 0 28px 0",
          }}>
            We don&apos;t just sell you software. <Accent>We deploy it with you.</Accent>
          </h1>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 20, lineHeight: 1.7,
            color: "rgba(255,255,255,0.6)", maxWidth: 720, margin: "0 0 40px 0",
          }}>
            Implementation Science is our hands-on deployment methodology. We work alongside your team to configure, customize, and launch Milton — so it actually fits the way your business runs.
          </p>

          <ResponsiveImage 
            desktopSrc="/images/implementation-hero-desktop.png"
            mobileSrc="/images/implementation-hero-mobile.png"
            alt="Team meeting in gym office discussing performance dashboard with metrics and charts"
            mobile={mobile}
          />

          <div style={{ marginTop: 40 }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ WHY IT MATTERS ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionDivider />
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : 40,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Why implementation <Accent>makes or breaks</Accent> software
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            Most software fails not because of the product — but because of how it&apos;s deployed. Teams get handed login credentials, a help doc, and a &quot;good luck.&quot; Three months later, adoption is at 20% and the software gets blamed.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            We do it differently. Milton isn&apos;t something you figure out alone. It&apos;s something we build with you — configured to your workflows, trained on your language, and launched alongside your team.
          </p>

          <ResponsiveImage 
            desktopSrc="/images/implementation-workflow-desktop.png"
            mobileSrc="/images/implementation-workflow-mobile.png"
            alt="Team reviewing operations process workflow on laptop with performance dashboard"
            mobile={mobile}
          />

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ THE PROCESS ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionDivider />
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : 40,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            How <Accent>Implementation Science</Accent> works
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 32, marginTop: 32 }}>
            {[
              { num: "01", title: "Discovery & Audit", body: "We start by understanding your current systems, workflows, and pain points. What software are you using? What's working? What's broken? We map everything before we touch a single setting." },
              { num: "02", title: "Custom Configuration", body: "Milton gets configured to match your business — your membership types, your scheduling rules, your trainer compensation structure, your reporting needs. No generic templates." },
              { num: "03", title: "Data Migration", body: "We handle the migration of your existing data — members, payments, schedules, history. Clean, accurate, and verified before go-live." },
              { num: "04", title: "Team Training", body: "Your team gets trained on Milton in person or via video. Not a generic webinar — real training tailored to their roles and your workflows." },
              { num: "05", title: "Parallel Run", body: "We run Milton alongside your existing systems for a period to ensure everything works. No hard cutover until you're confident." },
              { num: "06", title: "Go-Live Support", body: "When you flip the switch, we're there. Real-time support during your first days and weeks to handle anything that comes up." },
            ].map((step, i) => (
              <div key={i} style={{
                display: "flex", gap: mobile ? 16 : 24, alignItems: "flex-start",
              }}>
                <div style={{
                  fontFamily: f,
                  fontSize: mobile ? 14 : 16,
                  fontWeight: 600,
                  color: teal,
                  minWidth: 36,
                }}>
                  {step.num}
                </div>
                <div>
                  <h3 style={{
                    fontFamily: serif,
                    fontSize: mobile ? 20 : 24,
                    fontWeight: 400, color: "#fff",
                    margin: "0 0 8px 0",
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    fontFamily: f, fontSize: mobile ? 14 : 16, lineHeight: 1.7,
                    color: "rgba(255,255,255,0.6)", margin: 0,
                  }}>
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 48, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ ONGOING SUPPORT ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionDivider />
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : 40,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Implementation is just <Accent>the beginning</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            After go-live, you&apos;re not on your own. Every Milton partner gets ongoing support, regular check-ins, and access to our team when you need help. We track your adoption metrics and proactively reach out when we see opportunities to improve.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 18, lineHeight: 1.75,
            color: mint, fontWeight: 500, margin: 0,
          }}>
            We succeed when you succeed. That&apos;s why we stay involved long after launch.
          </p>

          <ResponsiveImage 
            desktopSrc="/images/implementation-support-desktop.png"
            mobileSrc="/images/implementation-support-mobile.png"
            alt="Gym owner on phone with performance dashboard visible, representing ongoing Milton support"
            mobile={mobile}
          />
        </section>

        {/* ═══════ CLOSING CTA ═══════ */}
        <section style={{ padding: sectionPad }}>
          <div style={{
            background: "rgba(13,154,165,0.08)",
            border: "1px solid rgba(13,154,165,0.2)",
            borderRadius: 20,
            padding: mobile ? "40px 24px" : "56px 48px",
            textAlign: "center",
          }}>
            <h2 style={{
              fontFamily: serif,
              fontSize: mobile ? 26 : 36,
              fontWeight: 400, lineHeight: 1.2, color: "#fff",
              margin: "0 0 16px 0",
            }}>
              Ready to see how we deploy?
            </h2>
            <p style={{
              fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.7,
              color: "rgba(255,255,255,0.6)", maxWidth: 500, margin: "0 auto 28px auto",
            }}>
              Book an AI Consultation and we&apos;ll walk you through exactly how Implementation Science works for your business.
            </p>
            <CTAButton mobile={mobile} />
          </div>
        </section>

      </div>
    </div>
  );
}
