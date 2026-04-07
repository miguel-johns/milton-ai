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

function Accent({ children }) {
  return <span style={{ color: "#0d9aa5", fontStyle: "italic" }}>{children}</span>;
}

function Mint({ children }) {
  return <span style={{ color: "#9af198" }}>{children}</span>;
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

function ProductCard({ icon, title, description, mobile, href }) {
  const [hovered, setHovered] = useState(false);
  const Wrapper = href ? 'a' : 'div';
  const wrapperProps = href ? { href, style: { textDecoration: 'none', display: 'block', height: '100%' } } : {};
  return (
    <Wrapper {...wrapperProps}>
      <div 
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? "rgba(13,154,165,0.06)" : "rgba(255,255,255,0.02)",
          border: hovered ? "1px solid rgba(13,154,165,0.3)" : "1px solid rgba(255,255,255,0.06)",
          borderRadius: 16,
          padding: mobile ? "24px 20px" : "32px 24px",
          transition: "all 0.3s ease",
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: href ? "pointer" : "default",
        }}
      >
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: "rgba(13,154,165,0.1)",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 16,
      }}>
        {icon}
      </div>
      <h3 style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: mobile ? 16 : 17,
        fontWeight: 600, color: "#fff",
        margin: "0 0 10px 0",
      }}>{title}</h3>
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: mobile ? 13 : 14,
        lineHeight: 1.65, color: "rgba(255,255,255,0.55)",
        margin: 0,
        flex: 1,
      }}>{description}</p>
      </div>
    </Wrapper>
  );
}

function CaseStudyCard({ metric, title, description, mobile }) {
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
        cursor: "pointer",
      }}
    >
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: mobile ? 40 : 48,
        fontWeight: 400,
        color: "#9af198",
        lineHeight: 1,
        marginBottom: 12,
      }}>{metric}</div>
      <h3 style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: mobile ? 16 : 18,
        fontWeight: 600, color: "#fff",
        margin: "0 0 10px 0",
      }}>{title}</h3>
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: mobile ? 13 : 14,
        lineHeight: 1.6, color: "rgba(255,255,255,0.55)",
        margin: "0 0 16px 0",
      }}>{description}</p>
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13,
        fontWeight: 500,
        color: "#0d9aa5",
      }}>Read the full story &rarr;</span>
    </div>
  );
}

// Icons for product cards
const CoachIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" stroke="#0d9aa5" strokeWidth="1.5"/>
    <path d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20" stroke="#0d9aa5" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M16 11L17.5 12.5L21 9" stroke="#9af198" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MemberIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z" stroke="#0d9aa5" strokeWidth="1.5"/>
    <path d="M3 21C3 17.134 7.02944 14 12 14C16.9706 14 21 17.134 21 21" stroke="#0d9aa5" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="8" r="2" fill="#9af198"/>
  </svg>
);

const DashboardIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="3" stroke="#0d9aa5" strokeWidth="1.5" fill="none"/>
    <path d="M7 14L10 11L13 13L17 9" stroke="#9af198" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const WebsiteIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="#0d9aa5" strokeWidth="1.5"/>
    <line x1="3" y1="9" x2="21" y2="9" stroke="#0d9aa5" strokeWidth="1.5"/>
    <circle cx="6" cy="6.5" r="1" fill="#9af198"/>
    <circle cx="9" cy="6.5" r="1" fill="#0d9aa5"/>
  </svg>
);

const MarketingIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M4 4L11 7.5V16.5L4 20V4Z" stroke="#0d9aa5" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M11 7.5L20 4V20L11 16.5" stroke="#0d9aa5" strokeWidth="1.5" strokeLinejoin="round"/>
    <circle cx="15" cy="12" r="2" fill="#9af198"/>
  </svg>
);

const ReceptionistIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 18C16.4183 18 20 14.4183 20 10V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V10C4 14.4183 7.58172 18 12 18Z" stroke="#0d9aa5" strokeWidth="1.5"/>
    <path d="M12 18V21" stroke="#0d9aa5" strokeWidth="1.5"/>
    <path d="M8 21H16" stroke="#0d9aa5" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="9" cy="10" r="1.5" fill="#9af198"/>
    <circle cx="15" cy="10" r="1.5" fill="#9af198"/>
  </svg>
);

export default function MiltonHomepage() {
  const { mobile, tablet } = useBreakpoint();
  const px = mobile ? 20 : tablet ? 32 : 40;
  const sectionPad = mobile ? "80px 0" : "120px 0";

  const Headline = ({ children, style = {} }) => (
    <h2 style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: mobile ? 32 : tablet ? 40 : "clamp(40px, 4.5vw, 56px)",
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

  const products = [
    { icon: <CoachIcon />, title: "Coach Co-Pilot", description: "AI that helps trainers program smarter, track progressive overload, and level up their coaching.", href: "#/coach-copilot" },
    { icon: <MemberIcon />, title: "Member AI Assistant", description: "Handles engagement, follow-up, reminders, and scheduling so no member falls through the cracks." },
    { icon: <DashboardIcon />, title: "Director Dashboard", description: "Shows which trainers need support, which members are at risk, and where revenue is leaking.", href: "#/director-dashboard" },
    { icon: <WebsiteIcon />, title: "AI Websites & Booking", description: "Done-for-you sites wired to Stripe with scheduling, payments, and no middlemen." },
    { icon: <MarketingIcon />, title: "AI Marketing Engine", description: "Professional photos, social content, email campaigns, and outreach built for you." },
    { icon: <ReceptionistIcon />, title: "AI Receptionist", description: "Handles inbound calls, answers questions, books appointments, never takes a day off." },
  ];

  const caseStudies = [
    { metric: "+34%", title: "Session Rebooking Rate", description: "Optimal Performance saw a dramatic increase in session rebooking within the first 90 days of implementing Milton." },
    { metric: "12hrs", title: "Saved Per Week", description: "Director time reclaimed from manual tracking and cross-referencing spreadsheets." },
    { metric: "0%", title: "Trainer Turnover", description: "Zero trainer departures since implementing the coach co-pilot system." },
  ];

  return (
    <>
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: `0 ${px}px` }}>

        {/* SECTION 1 — HERO */}
        <section id="hero" style={{
          minHeight: "100vh", display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "center", textAlign: "center",
          paddingTop: mobile ? 80 : 100, paddingBottom: mobile ? 40 : 60,
        }}>
          <div style={{ marginBottom: 20 }}>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#0d9aa5",
            }}>The AI operating system for fitness</span>
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: mobile ? 36 : tablet ? 48 : "clamp(40px, 5vw, 64px)",
            fontWeight: 400, lineHeight: 1.12, color: "#fff",
            margin: "0 0 24px 0", maxWidth: 850,
          }}>
            Milton is the AI operating system for fitness businesses — <Accent>plug-in tools, co-pilots, and expert guidance</Accent> for every part of your operation.
          </h1>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: mobile ? 15 : 18,
            lineHeight: 1.65, color: "rgba(255,255,255,0.5)",
            maxWidth: 600, margin: "0 0 36px 0", padding: mobile ? "0 4px" : 0,
          }}>
            Everything you need to run a smarter gym — from trainer development to member engagement to automated marketing.
          </p>

          <div style={{ display: "flex", gap: 12, marginBottom: mobile ? 48 : 64, flexWrap: "wrap", justifyContent: "center" }}>
            <CTA variant="primary" style={{ fontSize: mobile ? 14 : 15, padding: mobile ? "12px 28px" : "14px 32px" }} href="#/book">See it in action</CTA>
            <CTA variant="secondary" style={{ fontSize: mobile ? 14 : 15, padding: mobile ? "12px 28px" : "14px 32px" }} href="#/book">AI Consultation</CTA>
          </div>

          {/* Logo Carousel */}
          <div style={{ width: "100%", marginTop: 20 }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              marginBottom: 20,
            }}>Trusted by leading fitness businesses</p>
            <div style={{
              display: "flex",
              gap: mobile ? 32 : 48,
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              opacity: 0.5,
            }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#fff", fontWeight: 500 }}>Optimal Performance</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#fff", fontWeight: 500 }}>Athletica</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#fff", fontWeight: 500 }}>FitCore</span>
            </div>
          </div>
        </section>

        {/* SECTION 2 — THE SYSTEM */}
        <section id="system" style={{ padding: sectionPad }}>
          <AccentLine />
          <Headline>One system. Every role. <Accent>Instant impact.</Accent></Headline>
          
          <Body>
            Milton simplifies the complex world of running a fitness business by putting AI to work across your entire operation — not someday, this week.
          </Body>
          
          <Body>
            Our co-pilots help trainers coach better. Our agents handle member engagement, scheduling, and follow-up automatically. Our director tools surface which trainers need support and which members are about to leave. And our done-for-you builds — websites, booking systems, marketing — come wired to Stripe so you own everything with no middlemen.
          </Body>
          
          <Body style={{ marginBottom: 0 }}>
            Every piece works together. And behind all of it, <Mint>an expert team that knows your business and deploys the right tools at the right time.</Mint>
          </Body>
        </section>

        {/* SECTION 3 — PRODUCTS & TOOLS */}
        <section id="products" style={{ padding: sectionPad }}>
          <div style={{ textAlign: "center", marginBottom: mobile ? 40 : 56 }}>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#0d9aa5",
              marginBottom: 16,
              display: "block",
            }}>Products & Tools</span>
            <Headline style={{ maxWidth: 700, margin: "0 auto" }}>
              Everything your gym needs. <Accent>Nothing it doesn&apos;t.</Accent>
            </Headline>
          </div>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : tablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
            gap: mobile ? 16 : 20,
          }}>
            {products.map((product, i) => (
              <ProductCard 
                key={i}
                icon={product.icon}
                title={product.title}
                description={product.description}
                mobile={mobile}
                href={product.href}
              />
            ))}
          </div>
        </section>

        {/* SECTION 4 — CASE STUDIES / PROOF */}
        <section id="proof" style={{ padding: sectionPad }}>
          <AccentLine />
          <Headline>Results that speak for <Accent>themselves.</Accent></Headline>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : tablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
            gap: mobile ? 16 : 20,
            marginTop: mobile ? 32 : 48,
          }}>
            {caseStudies.map((study, i) => (
              <a key={i} href="#/case-study/optimal-performance" style={{ textDecoration: "none" }}>
                <CaseStudyCard 
                  metric={study.metric}
                  title={study.title}
                  description={study.description}
                  mobile={mobile}
                />
              </a>
            ))}
          </div>
        </section>

        {/* SECTION 5 — CTA */}
        <section id="cta" style={{ padding: sectionPad }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(13,154,165,0.07), rgba(8,69,94,0.1))",
            border: "1px solid rgba(13,154,165,0.15)",
            borderRadius: 20,
            padding: mobile ? "48px 24px" : "72px 56px",
            textAlign: "center",
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
              <Headline style={{ maxWidth: 600, margin: "0 auto 16px auto" }}>
                Ready to run your gym <Accent>smarter?</Accent>
              </Headline>
              
              <Body style={{ maxWidth: 520, margin: "0 auto 32px auto", textAlign: "center" }}>
                Book a free strategy call — or let us build your AI-powered website first, on us.
              </Body>
              
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <CTA variant="primary" style={{ fontSize: mobile ? 14 : 15, padding: mobile ? "14px 28px" : "16px 36px" }} href="#/book">
                  AI Consultation
                </CTA>
                <CTA variant="secondary" style={{ fontSize: mobile ? 14 : 15, padding: mobile ? "14px 28px" : "16px 36px" }} href="#/book-snapshot">
                  See your free site
                </CTA>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6 — THE ECOSYSTEM CLOSER */}
        <section id="ecosystem" style={{ padding: sectionPad }}>
          <AccentLine />
          <Headline>Everything connects. <Accent>Everything compounds.</Accent></Headline>
          
          <Body>
            Most gyms run on five disconnected tools that don&apos;t talk to each other. Milton is one system — your coach co-pilot knows what your member assistant surfaced. Your director dashboard reflects what&apos;s actually happening on the floor.
          </Body>
          
          <Body style={{ marginBottom: 0 }}>
            Every interaction feeds the intelligence that makes the next one better. <Mint>That&apos;s not a feature. That&apos;s a moat.</Mint>
          </Body>
        </section>

      </div>
    </>
  );
}
