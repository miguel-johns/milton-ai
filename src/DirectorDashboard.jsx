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

function SectionLabel({ text }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <span style={{
        fontFamily: "'DM Sans', sans-serif", 
        fontSize: 11, 
        fontWeight: 600,
        letterSpacing: "0.15em", 
        textTransform: "uppercase", 
        color: "#0d9aa5",
      }}>{text}</span>
    </div>
  );
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

function CTAButton({ mobile }) {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent('openConsultationModal'))}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: mobile ? 13 : 14,
        fontWeight: 600,
        color: "#061c27",
        background: "#9af198",
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
        e.currentTarget.style.background = "#9af198";
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

function Mint({ children }) {
  return <span style={{ color: "#9af198" }}>{children}</span>;
}

function Strong({ children }) {
  return <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>{children}</span>;
}

function ImagePlaceholder({ label, height = 400, mobile }) {
  return (
    <div style={{
      width: "100%",
      height: mobile ? height * 0.6 : height,
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: mobile ? 12 : 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: mobile ? 32 : 48,
    }}>
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 14,
        color: "rgba(255,255,255,0.25)",
        textAlign: "center",
        padding: 20,
      }}>{label}</span>
    </div>
  );
}

function FeatureIcon({ type }) {
  if (type === "director") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="#0d9aa5" strokeWidth="1.5" fill="none"/>
        <path d="M7 14L10 11L13 13L17 9" stroke="#9af198" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (type === "coach") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke="#0d9aa5" strokeWidth="1.5"/>
        <path d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20" stroke="#0d9aa5" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M16 11L17.5 12.5L21 9" stroke="#9af198" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (type === "business") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" fill="#9af198"/>
        <circle cx="5" cy="6" r="2" stroke="#0d9aa5" strokeWidth="1.5"/>
        <circle cx="19" cy="6" r="2" stroke="#0d9aa5" strokeWidth="1.5"/>
        <circle cx="5" cy="18" r="2" stroke="#0d9aa5" strokeWidth="1.5"/>
        <circle cx="19" cy="18" r="2" stroke="#0d9aa5" strokeWidth="1.5"/>
        <line x1="7" y1="7" x2="10" y2="10" stroke="#0d9aa5" strokeWidth="1.5"/>
        <line x1="17" y1="7" x2="14" y2="10" stroke="#0d9aa5" strokeWidth="1.5"/>
        <line x1="7" y1="17" x2="10" y2="14" stroke="#0d9aa5" strokeWidth="1.5"/>
        <line x1="17" y1="17" x2="14" y2="14" stroke="#0d9aa5" strokeWidth="1.5"/>
      </svg>
    );
  }
  return null;
}

function FeatureCard({ icon, title, description, mobile }) {
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
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
      }}
    >
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: "rgba(13,154,165,0.1)",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 20,
      }}>
        <FeatureIcon type={icon} />
      </div>
      <h3 style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: mobile ? 17 : 18,
        fontWeight: 600, color: "#fff",
        margin: "0 0 12px 0",
      }}>{title}</h3>
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: mobile ? 14 : 15,
        lineHeight: 1.7, color: "rgba(255,255,255,0.55)",
        margin: 0,
      }}>{description}</p>
    </div>
  );
}

export default function DirectorDashboard() {
  const { mobile, tablet } = useBreakpoint();
  const px = mobile ? 20 : tablet ? 32 : 40;
  const sectionPad = mobile ? "80px 0" : "120px 0";

  const Headline = ({ children, style = {} }) => (
    <h2 style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: mobile ? 32 : tablet ? 40 : "clamp(40px, 4.5vw, 68px)",
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

  return (
    <>
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: `0 ${px}px` }}>

        {/* SECTION 1 — HERO */}
        <section id="hero" style={{
          minHeight: mobile ? "auto" : "50vh",
          display: "flex", flexDirection: "column",
          justifyContent: "center",
          padding: mobile ? "120px 0 48px" : "140px 0 64px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#0d9aa5", flexShrink: 0 }} />
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: 2.5,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
            }}>Director Co-Pilot</span>
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: mobile ? 36 : tablet ? 52 : 64,
            fontWeight: 400, lineHeight: 1.08, color: "#fff",
            margin: "0 0 28px 0",
          }}>
            Great trainers are hard to find, impossible to keep, and expensive to build. <Accent>We fix that.</Accent>
          </h1>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: mobile ? 16 : 20,
            lineHeight: 1.7, color: "rgba(255,255,255,0.6)",
            maxWidth: 720, margin: "0 0 40px 0",
          }}>
            Milton is the first platform built to help fitness directors develop, manage, and retain personal trainers — so your business grows instead of starting over every time a coach walks out the door.
          </p>

          <div style={{
            borderRadius: mobile ? 12 : 16,
            overflow: "hidden",
            boxShadow: "0 20px 50px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.08)",
          }}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_8260-ZXksj4knhcDaRItpyEpzJ9MbO2vYea.png"
              alt="Fitness director overseeing trainers on the gym floor"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>

          <div style={{ marginTop: 40 }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* SECTION 2 — THE REALITY */}
        <section id="problem" style={{ padding: sectionPad }}>
          
          <AccentLine />
          <Headline>You already <Accent>know</Accent> this story.</Headline>
          
          <Body>
            You hire a trainer. You spend months getting them up to speed — teaching them your systems, your standards, how to actually keep clients coming back.
          </Body>
          
          <Body>
            Then one of two things happens.
          </Body>
          
          <Body>
            <Strong>They leave.</Strong> Maybe they burn out, maybe they go start their own gym, maybe the industry just chews them up. 80% don&apos;t make it to year five.
          </Body>
          
          <Body>
            <Strong>Or they stay — but they plateau.</Strong> Sessions drop off. Clients stop rebooking. And you can see it happening, but you&apos;re buried in spreadsheets trying to figure out which trainer needs what kind of help.
          </Body>
          
          <Body style={{ marginBottom: mobile ? 48 : 64 }}>
            Meanwhile, your fitness director is spending 15+ hours a week cross-referencing session data, client results, and business metrics across three different tools just to answer one question: <Mint>how are my trainers actually doing?</Mint>
          </Body>

          {/* Stats Strip */}
          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)",
            gap: mobile ? 24 : 0,
            borderTop: "1px solid rgba(13,154,165,0.15)",
            borderBottom: "1px solid rgba(13,154,165,0.15)",
            padding: mobile ? "32px 0" : "40px 0",
          }}>
            {[
              { num: "80%", label: "of trainers leave within 5 years" },
              { num: "15+", label: "hours/week lost to manual tracking" },
              { num: "3x", label: "tools your FD juggles daily" },
            ].map((stat, i) => (
              <div key={i} style={{
                textAlign: mobile ? "left" : "center",
                borderLeft: !mobile && i > 0 ? "1px solid rgba(13,154,165,0.1)" : "none",
                paddingLeft: !mobile && i > 0 ? 32 : 0,
              }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: mobile ? 40 : 48,
                  fontWeight: 400,
                  color: "#9af198",
                  lineHeight: 1,
                  marginBottom: 8,
                }}>{stat.num}</div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3 — THE SOLUTION */}
        <section id="solution" style={{ padding: sectionPad }}>
          
          <AccentLine />
          <Headline>That&apos;s why we built <Accent>Milton.</Accent></Headline>
          
          <Body>
            Every AI tool in fitness is chasing the same two things: an AI coach for your members or an AI receptionist for your front desk.
          </Body>
          
          <Body>
            Nobody is building AI around the problem that actually drives your revenue, your retention, and your reputation — <Strong>how well your trainers perform.</Strong>
          </Body>
          
          <Body>
            Milton exists because we sat shoulder-to-shoulder with fitness directors and watched them work. We saw the three spreadsheets. The Mindbody cross-referencing. The hours spent manually tracking what should take minutes.
          </Body>
          
          <Body style={{ marginBottom: 0 }}>
            So we built AI that does something different. It gives your fitness director the intelligence to develop every trainer on the floor — and <Mint>puts a co-pilot in every trainer&apos;s pocket</Mint> while they&apos;re doing the work.
          </Body>

          <div style={{
            borderRadius: mobile ? 12 : 16,
            overflow: "hidden",
            boxShadow: "0 20px 50px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.08)",
            marginTop: mobile ? 32 : 48,
          }}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_8261-l0nmWrWcO3sFAVeKP5LwwjLotqMCHh.png"
              alt="Milton team collaborating with gym owners at a desk"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>

          <div style={{ marginTop: 40 }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* SECTION 4 — THE PLATFORM */}
        <section id="platform" style={{ padding: sectionPad }}>
          
          <AccentLine />
          <Headline>A platform and a team built around <Accent>your trainers.</Accent></Headline>
          
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: mobile ? 15 : 17,
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.55)",
            maxWidth: 600,
            margin: "0 0 40px 0",
          }}>
            Three connected systems, one goal — trainer performance driving business growth.
          </p>
          
          {/* Subsection: For your fitness director */}
          <div style={{ marginBottom: mobile ? 48 : 64 }}>
            <h3 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: mobile ? 20 : 24,
              fontWeight: 600,
              color: "#fff",
              margin: "0 0 20px 0",
            }}>For your fitness director</h3>
            
            <div style={{
              borderRadius: mobile ? 12 : 16,
              overflow: "hidden",
              marginBottom: 20,
            }}>
              <img 
                src="/placeholder.svg?height=400&width=800"
                alt="Fitness director dashboard showing trainer performance metrics"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
            
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: mobile ? 15 : 17,
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.6)",
              margin: 0,
            }}>
              One dashboard that replaces the spreadsheets, the cross-referencing, and the guesswork. See which trainers are thriving, which are stuck, and exactly what to do about it — powered by real session data, client outcomes, and business metrics married together.
            </p>
          </div>

          {/* Subsection: For your coaches */}
          <div style={{ marginBottom: mobile ? 48 : 64 }}>
            <h3 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: mobile ? 20 : 24,
              fontWeight: 600,
              color: "#fff",
              margin: "0 0 20px 0",
            }}>For your coaches</h3>
            
            <div style={{
              borderRadius: mobile ? 12 : 16,
              overflow: "hidden",
              marginBottom: 20,
            }}>
              <img 
                src="/placeholder.svg?height=400&width=800"
                alt="Coach co-pilot interface with session tracking and client insights"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
            
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: mobile ? 15 : 17,
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.6)",
              margin: 0,
            }}>
              An AI co-pilot on the gym floor. Smart session tracking, progressive programming, client insights — all in one screen. Your trainers perform better because they have better information, not more software.
            </p>
          </div>

          {/* Subsection: For your business */}
          <div style={{ marginBottom: mobile ? 24 : 32 }}>
            <h3 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: mobile ? 20 : 24,
              fontWeight: 600,
              color: "#fff",
              margin: "0 0 20px 0",
            }}>For your business</h3>
            
            <div style={{
              borderRadius: mobile ? 12 : 16,
              overflow: "hidden",
              marginBottom: 20,
            }}>
              <img 
                src="/placeholder.svg?height=400&width=800"
                alt="Business analytics connecting trainer performance to growth metrics"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
            
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: mobile ? 15 : 17,
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.6)",
              margin: 0,
            }}>
              The connective tissue between trainer performance and business results. When your trainers improve, attendance goes up, follow-through increases, clients stay longer, and results compound. Milton makes that visible and actionable.
            </p>
          </div>

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* SECTION 5 — EXPERTISE */}
        <section id="expertise" style={{ padding: sectionPad }}>
          
          <AccentLine />
          
          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
            gap: mobile ? 40 : 60,
            alignItems: "start",
          }}>
            <div>
              <Headline style={{ marginBottom: 24 }}>
                Technology gets you the data. <Accent>Expertise gets you the results.</Accent>
              </Headline>
              
              <Body>
                Most platforms stop at the dashboard. Milton doesn&apos;t.
              </Body>
              
              <Body>
                Our team includes veteran coaches and fitness directors who&apos;ve spent decades on the gym floor — building trainers, growing programs, and solving the exact problems you&apos;re dealing with right now. Led by Chief Coach Officer Johnny Olsen, this isn&apos;t a support team reading from a script. It&apos;s a coaching operation that lives inside your business.
              </Body>
              
              <Body style={{ marginBottom: 0 }}>
                The platform shows you where the gaps are. Our team helps you close them.
              </Body>
            </div>

            <div style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 20,
              padding: mobile ? "32px 24px" : "44px 36px",
            }}>
              {[
                "Live workshops for your trainers",
                "Performance frameworks your FD can actually use",
                "Playbooks built on what works — not what sounds good in a demo",
              ].map((item, i, arr) => (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                  paddingBottom: i < arr.length - 1 ? 20 : 0,
                  marginBottom: i < arr.length - 1 ? 20 : 0,
                  borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: "#0d9aa5", flexShrink: 0, marginTop: 6,
                  }} />
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: mobile ? 14 : 15,
                    lineHeight: 1.6,
                    color: "rgba(255,255,255,0.7)",
                  }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5 — OUR APPROACH */}
        <section id="approach" style={{ padding: sectionPad }}>
          <AccentLine />
          <Headline>
            Built <Accent>with</Accent> gym owners, not for them.
          </Headline>
          
          <Body>
            We didn&apos;t build Milton in a lab. We built it sitting next to fitness directors — watching them work, learning their systems, and understanding why the tools they have keep failing them.
          </Body>
          
          <Body>
            Every feature in Milton came from a real operator solving a real problem. The dashboard exists because we watched a 20-year veteran manage her entire training staff across three spreadsheets and a Mindbody account. The coach portal exists because trainers told us what they actually need on the gym floor — not what a product team assumed they&apos;d want.
          </Body>
          
          <Body style={{ marginBottom: 40 }}>
            That&apos;s why gym owners from single-location studios to 100+ location networks are paying attention. Not because of the technology. <Mint>Because we&apos;re talking about the problem they feel every single day.</Mint>
          </Body>
          
          <div style={{
            borderRadius: mobile ? 12 : 16,
            overflow: "hidden",
            boxShadow: "0 20px 50px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.08)",
          }}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_8262-REWDKxl5JjX28bTxgQ61SfpI97qims.png"
              alt="Fitness professionals walking through gym discussing trainer development"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </section>

        {/* SECTION 6 — AI CONSULTING */}
        <section id="ai" style={{ padding: sectionPad }}>
          
          
          <div style={{
            background: "linear-gradient(135deg, rgba(13,154,165,0.07), rgba(8,69,94,0.1))",
            border: "1px solid rgba(13,154,165,0.15)",
            borderRadius: 20,
            padding: mobile ? "40px 24px" : "56px 48px",
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
              <Headline style={{ marginBottom: 20 }}>
                And yes, we&apos;ll help you figure out the <Accent>rest of AI</Accent> too.
              </Headline>
              
              <Body style={{ marginBottom: 0, maxWidth: 800 }}>
                Most gym owners know they need to get up to speed on AI. They just don&apos;t know where to start. As a Milton partner, we&apos;ll show you how to spin up your own scheduling, billing, and member experience tools — whether you use our platform for those or not. We&apos;re not trying to lock you into a suite. <Mint>We&apos;re trying to make you dangerous.</Mint>
              </Body>
            </div>
          </div>
        </section>

        {/* SECTION 7 — CTA / CLOSE */}
        <section id="pricing" style={{ padding: sectionPad }}>
          <div style={{
            textAlign: "center",
            position: "relative",
          }}>
            {/* Subtle radial glow behind */}
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              height: 400,
              background: "radial-gradient(ellipse, rgba(13,154,165,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />
            
            <div style={{ position: "relative", zIndex: 1 }}>
              <Headline style={{ 
                fontSize: mobile ? 28 : tablet ? 40 : "clamp(36px, 4vw, 56px)",
                maxWidth: 700,
                margin: "0 auto 24px auto",
              }}>
                Your trainers are your business. <Accent>Let&apos;s make them better.</Accent>
              </Headline>
              
              <Body style={{ 
                maxWidth: 580, 
                margin: "0 auto 32px auto",
                textAlign: "center",
              }}>
                Start with one location. See the difference in 90 days. No long-term contract. No massive implementation. Just a better way to develop, manage, and retain the people who drive your revenue.
              </Body>
              
              <CTAButton mobile={mobile} />
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
