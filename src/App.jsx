import { useState, useEffect } from "react";

const sections = [
  { id: "hero", label: "" },
  { id: "problem", num: "01", label: "THE PROBLEM" },
  { id: "solution", num: "02", label: "THE SOLUTION" },
  { id: "platform", num: "03", label: "THE PLATFORM" },
  { id: "expertise", num: "04", label: "EXPERTISE" },
  { id: "built-with", num: "05", label: "BUILT WITH YOU" },
  { id: "ai-partner", num: "06", label: "AI PARTNER" },
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

function Accent({ children }) {
  return <span style={{ color: "#0d9aa5", fontStyle: "italic" }}>{children}</span>;
}

function HeroVisual({ mobile }) {
  return (
    <div style={{
      width: "100%",
      maxWidth: 1000,
      marginBottom: mobile ? 36 : 60,
      borderRadius: mobile ? 12 : 20,
      overflow: "hidden",
      boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)",
    }}>
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hero%20Image-qMFrg2JU59JkiO0EF8MAxOynKIBOPh.png"
        alt="Milton dashboard showing trainer roster, attendance rates, and AI coaching insights"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
      />
    </div>
  );
}

export default function MiltonHomepage() {
  const { mobile, tablet } = useBreakpoint();
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

  const Body = ({ children, style = {} }) => (
    <p style={{
      fontFamily: "'DM Sans', sans-serif", fontSize: mobile ? 15 : 17,
      lineHeight: 1.75, color: "rgba(255,255,255,0.6)",
      maxWidth: 680, margin: "0 0 32px 0", ...style,
    }}>{children}</p>
  );

  return (
    <>
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: `0 ${px}px` }}>

        {/* HERO */}
        <section id="hero" style={{
          minHeight: "100vh", display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "center", textAlign: "center",
          paddingTop: mobile ? 80 : 100, paddingBottom: mobile ? 40 : 0,
        }}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: mobile ? 38 : tablet ? 56 : "clamp(56px, 6vw, 80px)",
            fontWeight: 400, lineHeight: 1.1, color: "#fff",
            margin: "0 0 24px 0", maxWidth: 1000,
          }}>
            Great trainers are hard to find, impossible to keep, and expensive to build. <Accent>We fix that.</Accent>
          </h1>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: mobile ? 15 : "clamp(16px, 1.8vw, 20px)",
            lineHeight: 1.65, color: "rgba(255,255,255,0.6)",
            maxWidth: 720, margin: "0 0 32px 0", padding: mobile ? "0 4px" : 0,
          }}>
            Milton is the first platform built to help fitness directors develop, manage, and retain personal trainers — so your business grows instead of starting over every time a coach walks out the door.
          </p>

          <div style={{ display: "flex", gap: 12, marginBottom: mobile ? 36 : 60, flexWrap: "wrap", justifyContent: "center" }}>
            <CTA variant="primary" style={{ fontSize: mobile ? 14 : 15, padding: mobile ? "12px 28px" : "14px 32px" }} href="#/book">Book a Call</CTA>
            <CTA variant="secondary" style={{ fontSize: mobile ? 14 : 15, padding: mobile ? "12px 28px" : "14px 32px" }} href="#/the-platform">See How It Works</CTA>
          </div>

          <HeroVisual mobile={mobile} tablet={tablet} />
        </section>

        {/* YOU ALREADY KNOW THIS STORY */}
        <section id="problem" style={{ padding: sectionPad }}>
          <SectionLabel text="THE PROBLEM" />
          <SectionDivider />
          <Headline>You already know <Accent>this</Accent> story.</Headline>
          
          <Body>
            You hire a trainer. You spend months getting them up to speed — teaching them your systems, your standards, how to actually keep clients coming back.
          </Body>
          
          <Body>
            Then one of two things happens.
          </Body>
          
          <Body>
            They leave. Maybe they burn out, maybe they go start their own gym, maybe the industry just chews them up. 80% don&apos;t make it to year five.
          </Body>
          
          <Body>
            Or they stay — but they plateau. Sessions drop off. Clients stop rebooking. And you can see it happening, but you&apos;re buried in spreadsheets trying to figure out which trainer needs what kind of help.
          </Body>
          
          <Body style={{ marginBottom: 0 }}>
            Meanwhile, your fitness director is spending 15+ hours a week cross-referencing session data, client results, and business metrics across three different tools just to answer one question: <Accent>how are my trainers actually doing?</Accent>
          </Body>
        </section>

        {/* THAT'S WHY WE BUILT MILTON */}
        <section id="solution" style={{ padding: sectionPad }}>
          <SectionLabel text="THE SOLUTION" />
          <SectionDivider />
          <Headline>That&apos;s why we built <Accent>Milton.</Accent></Headline>
          
          <Body>
            Every AI tool in fitness is chasing the same two things: an AI coach for your members or an AI receptionist for your front desk.
          </Body>
          
          <Body>
            Nobody is building AI around the problem that actually drives your revenue, your retention, and your reputation — how well your trainers perform.
          </Body>
          
          <Body>
            Milton exists because we sat shoulder-to-shoulder with fitness directors and watched them work. We saw the three spreadsheets. The Mindbody cross-referencing. The hours spent manually tracking what should take minutes.
          </Body>
          
          <Body style={{ marginBottom: 0 }}>
            So we built AI that does something different. It gives your fitness director the intelligence to develop every trainer on the floor — and puts a co-pilot in every trainer&apos;s pocket while they&apos;re doing the work.
          </Body>
        </section>

        {/* A PLATFORM AND A TEAM BUILT AROUND YOUR TRAINERS */}
        <section id="platform" style={{ padding: sectionPad }}>
          <SectionLabel text="THE PLATFORM" />
          <SectionDivider />
          <Headline>A platform and a team built around your <Accent>trainers.</Accent></Headline>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)",
            gap: mobile ? 24 : 32,
            marginTop: mobile ? 32 : 48,
          }}>
            {/* For your fitness director */}
            <div style={{
              background: "rgba(8,69,94,0.2)",
              border: "1px solid rgba(13,154,165,0.15)",
              borderRadius: mobile ? 12 : 16,
              padding: mobile ? 24 : 32,
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: "rgba(13,154,165,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 20,
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0d9aa5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <line x1="3" y1="9" x2="21" y2="9"/>
                  <line x1="9" y1="21" x2="9" y2="9"/>
                </svg>
              </div>
              <h3 style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: mobile ? 18 : 20,
                fontWeight: 600, color: "#fff",
                margin: "0 0 12px 0",
              }}>For your fitness director</h3>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: mobile ? 14 : 15,
                lineHeight: 1.7, color: "rgba(255,255,255,0.6)",
                margin: 0,
              }}>
                One dashboard that replaces the spreadsheets, the cross-referencing, and the guesswork. See which trainers are thriving, which are stuck, and exactly what to do about it — powered by real session data, client outcomes, and business metrics married together.
              </p>
            </div>

            {/* For your coaches */}
            <div style={{
              background: "rgba(8,69,94,0.2)",
              border: "1px solid rgba(13,154,165,0.15)",
              borderRadius: mobile ? 12 : 16,
              padding: mobile ? 24 : 32,
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: "rgba(13,154,165,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 20,
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0d9aa5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: mobile ? 18 : 20,
                fontWeight: 600, color: "#fff",
                margin: "0 0 12px 0",
              }}>For your coaches</h3>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: mobile ? 14 : 15,
                lineHeight: 1.7, color: "rgba(255,255,255,0.6)",
                margin: 0,
              }}>
                An AI co-pilot on the gym floor. Smart session tracking, progressive programming, client insights — all in one screen. Your trainers perform better because they have better information, not more software.
              </p>
            </div>

            {/* For your business */}
            <div style={{
              background: "rgba(8,69,94,0.2)",
              border: "1px solid rgba(13,154,165,0.15)",
              borderRadius: mobile ? 12 : 16,
              padding: mobile ? 24 : 32,
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: "rgba(13,154,165,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 20,
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0d9aa5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="20" x2="12" y2="10"/>
                  <line x1="18" y1="20" x2="18" y2="4"/>
                  <line x1="6" y1="20" x2="6" y2="16"/>
                </svg>
              </div>
              <h3 style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: mobile ? 18 : 20,
                fontWeight: 600, color: "#fff",
                margin: "0 0 12px 0",
              }}>For your business</h3>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: mobile ? 14 : 15,
                lineHeight: 1.7, color: "rgba(255,255,255,0.6)",
                margin: 0,
              }}>
                The connective tissue between trainer performance and business results. When your trainers improve, attendance goes up, follow-through increases, clients stay longer, and results compound. Milton makes that visible and actionable.
              </p>
            </div>
          </div>
        </section>

        {/* TECHNOLOGY GETS YOU THE DATA. EXPERTISE GETS YOU THE RESULTS. */}
        <section id="expertise" style={{ padding: sectionPad }}>
          <SectionLabel text="EXPERTISE" />
          <SectionDivider />
          <Headline>Technology gets you the data. Expertise gets you the <Accent>results.</Accent></Headline>
          
          <Body>
            Most platforms stop at the dashboard. Milton doesn&apos;t.
          </Body>
          
          <Body>
            Our team includes veteran coaches and fitness directors who&apos;ve spent decades on the gym floor — building trainers, growing programs, and solving the exact problems you&apos;re dealing with right now. Led by Chief Coach Officer Johnny Olsen, this isn&apos;t a support team reading from a script. It&apos;s a coaching operation that lives inside your business.
          </Body>
          
          <Body>
            Live workshops for your trainers. Performance frameworks your fitness director can actually use. Playbooks built on what works — not what sounds good in a demo.
          </Body>
          
          <Body style={{ 
            marginBottom: 0, 
            fontStyle: "italic", 
            color: "rgba(255,255,255,0.5)",
            borderLeft: "3px solid #0d9aa5",
            paddingLeft: 20,
          }}>
            The platform shows you where the gaps are. Our team helps you close them.
          </Body>
        </section>

        {/* BUILT WITH GYM OWNERS, NOT FOR THEM */}
        <section id="built-with" style={{ padding: sectionPad }}>
          <SectionLabel text="OUR APPROACH" />
          <SectionDivider />
          <Headline>Built <Accent>with</Accent> gym owners, not for them.</Headline>
          
          <Body>
            We didn&apos;t build Milton in a lab. We built it sitting next to fitness directors — watching them work, learning their systems, and understanding why the tools they have keep failing them.
          </Body>
          
          <Body>
            Every feature in Milton came from a real operator solving a real problem. The dashboard exists because we watched a 20-year veteran manage her entire training staff across three spreadsheets and a Mindbody account. The coach portal exists because trainers told us what they actually need on the gym floor — not what a product team assumed they&apos;d want.
          </Body>
          
          <Body style={{ marginBottom: 0 }}>
            That&apos;s why gym owners from single-location studios to 100+ location networks are paying attention. Not because of the technology. Because we&apos;re talking about the problem they feel every single day.
          </Body>
        </section>

        {/* AND YES, WE'LL HELP YOU FIGURE OUT THE REST OF AI TOO */}
        <section id="ai-partner" style={{ padding: sectionPad }}>
          <SectionLabel text="AI PARTNER" />
          <SectionDivider />
          <Headline>And yes, we&apos;ll help you figure out the rest of <Accent>AI</Accent> too.</Headline>
          
          <Body style={{ marginBottom: 0 }}>
            Most gym owners know they need to get up to speed on AI. They just don&apos;t know where to start. As a Milton partner, we&apos;ll show you how to spin up your own scheduling, billing, and member experience tools — whether you use our platform for those or not. We&apos;re not trying to lock you into a suite. We&apos;re trying to make you dangerous.
          </Body>
        </section>

        {/* PRICING / FINAL CTA */}
        <section id="pricing" style={{ padding: sectionPad }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(13,154,165,0.12) 0%, rgba(8,69,94,0.2) 100%)",
            border: "1px solid rgba(13,154,165,0.2)",
            borderRadius: mobile ? 16 : 24, 
            padding: mobile ? "44px 20px" : "80px 60px",
            textAlign: "center",
          }}>
            <SectionLabel text="GET STARTED" />
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: mobile ? 28 : "clamp(36px, 4.5vw, 56px)",
              fontWeight: 400, lineHeight: 1.15, color: "#fff", 
              margin: "20px 0 24px 0",
            }}>
              Your trainers are your business. Let&apos;s make them <Accent>better.</Accent>
            </h2>
            
            <p style={{ 
              fontFamily: "'DM Sans', sans-serif", 
              fontSize: mobile ? 14 : 17, 
              lineHeight: 1.75, 
              color: "rgba(255,255,255,0.6)", 
              maxWidth: 600, 
              margin: "0 auto 28px auto" 
            }}>
              Start with one location. See the difference in 90 days. No long-term contract. No massive implementation. Just a better way to develop, manage, and retain the people who drive your revenue.
            </p>
            
            <div style={{
              display: "flex",
              flexDirection: mobile ? "column" : "row",
              alignItems: "center",
              justifyContent: "center",
              gap: mobile ? 8 : 24,
              marginBottom: 32,
            }}>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: mobile ? 24 : 32,
                fontWeight: 600,
                color: "#fff",
              }}>
                $499<span style={{ fontSize: mobile ? 14 : 16, fontWeight: 400, color: "rgba(255,255,255,0.5)" }}>/month</span>
              </div>
              <span style={{ 
                fontFamily: "'DM Sans', sans-serif", 
                fontSize: 14, 
                color: "rgba(255,255,255,0.4)" 
              }}>or</span>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: mobile ? 24 : 32,
                fontWeight: 600,
                color: "#fff",
              }}>
                $4,800<span style={{ fontSize: mobile ? 14 : 16, fontWeight: 400, color: "rgba(255,255,255,0.5)" }}>/year</span>
                <span style={{ 
                  fontSize: 12, 
                  fontWeight: 500, 
                  color: "#9af198", 
                  marginLeft: 8,
                  background: "rgba(154,241,152,0.1)",
                  padding: "4px 10px",
                  borderRadius: 100,
                }}>Save 2 months</span>
              </div>
            </div>
            
            <CTA variant="primary" style={{ fontSize: mobile ? 14 : 16, padding: mobile ? "14px 28px" : "16px 40px" }} href="#/book">
              Book Your Discovery Call
            </CTA>
          </div>
        </section>

      </div>
    </>
  );
}
