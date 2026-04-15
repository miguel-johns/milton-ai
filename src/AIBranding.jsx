import { useState, useEffect } from 'react';

const f = "'DM Sans', sans-serif";
const serif = "'Instrument Serif', serif";
const teal = "#0d9aa5";
const mint = "#9af198";

function useBreakpoint() {
  const [state, setState] = useState({ mobile: false, tablet: false });
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setState({ mobile: w < 768, tablet: w >= 768 && w < 1024 });
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return state;
}

function Accent({ children }) {
  return <span style={{ fontFamily: serif, fontStyle: "italic", color: mint }}>{children}</span>;
}

function SectionLabel({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: teal, flexShrink: 0 }} />
      <span style={{ fontFamily: f, fontSize: 12, fontWeight: 500, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>{children}</span>
    </div>
  );
}

function VisualPlaceholder({ height = 300, label = "Visual Placeholder", mobile }) {
  return (
    <div style={{
      width: "100%",
      height: mobile ? height * 0.7 : height,
      background: "rgba(13,154,165,0.08)",
      border: "1px dashed rgba(13,154,165,0.3)",
      borderRadius: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 32,
    }}>
      <span style={{ fontFamily: f, fontSize: 14, color: "rgba(255,255,255,0.3)" }}>{label}</span>
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

export default function AIBranding() {
  const { mobile, tablet } = useBreakpoint();
  const sectionPad = mobile ? "64px 0" : "80px 0";
  const px = mobile ? 20 : tablet ? 32 : 40;

  return (
    <>
      <div style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: `0 ${px}px`,
      }}>

        {/* ═══════ HERO ═══════ */}
        <section style={{
          minHeight: mobile ? "auto" : "50vh",
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: mobile ? "120px 0 48px" : "140px 0 64px",
        }}>
          <SectionLabel>AI Branding</SectionLabel>

          <h1 style={{
            fontFamily: serif,
            fontSize: mobile ? 36 : tablet ? 52 : 64,
            fontWeight: 400, lineHeight: 1.08, color: "#fff",
            margin: "0 0 28px 0",
          }}>
            Look like the <Accent>billion-dollar brand</Accent> you compete with
          </h1>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 20, lineHeight: 1.7,
            color: "rgba(255,255,255,0.6)", maxWidth: 720, margin: "0 0 40px 0",
          }}>
            Fitness is the front line of healthcare. You&apos;re changing lives, preventing disease, building people up from the inside out. But most fitness businesses don&apos;t look the part.
          </p>

          <div style={{
            borderRadius: mobile ? 12 : 16,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
          }}>
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-QxT3JlYVGWd0eH5QJQ35bx3sDGpiJA.png"
              alt="Premium fitness brand identity flat lay showing FitForge brand guidelines, business cards, letterhead, phone mockup, and marketing materials"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </div>

          <div style={{ marginTop: 40 }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ BUILT IN DAYS ═══════ */}
        <section style={{ padding: sectionPad }}>
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : 40,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Your brand, built in <Accent>days</Accent> — not months
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 20px 0",
          }}>
            Traditionally, this kind of work takes months and costs tens of thousands of dollars. An agency. A photographer. A web developer. A designer. Rounds of revisions. Endless back and forth. Most gym owners never do it because the time and money aren&apos;t there.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 20px 0",
          }}>
            AI changes that equation completely. Milton generates professional-grade brand assets using AI tools — guided by real design expertise, not just prompts. You get the output of a full creative agency in a fraction of the time and cost. And everything is built to be cohesive, consistent, and unmistakably yours.
          </p>

          <div style={{
            borderRadius: mobile ? 12 : 16,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            marginTop: 32,
          }}>
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-aO0345iYAjrtrhjENwKKKTSyhGhK8E.png"
              alt="Logo design process showing pencil sketch with golden ratio measurements transitioning to finished colored FitForge logo mark"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </div>

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ LOGO & VISUAL IDENTITY ═══════ */}
        <section style={{ padding: sectionPad }}>
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : 40,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Logo & <Accent>Visual Identity</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 20px 0",
          }}>
            Every great brand starts with a mark. Milton&apos;s AI Branding generates logo concepts based on your facility&apos;s name, personality, values, and aesthetic — then refines them until you&apos;ve got something you&apos;re proud to put on everything.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 20px 0",
          }}>
            Not a generic icon from a template library. A real logo with real thought behind it — one that works on your website, your signage, your apparel, your social media, and your business cards.
          </p>

          <div style={{
            borderRadius: mobile ? 12 : 16,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            marginTop: 32,
          }}>
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-T836jU9vNOzxkWCqC6e6ieeW6JAe8B.png"
              alt="FitForge brand identity shown across multiple applications including logo variations, athlete photography, and gym environment contexts"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </div>
        </section>

        {/* ═══════ BRAND GUIDE ═══════ */}
        <section style={{ padding: sectionPad }}>
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : 40,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            <Accent>Brand Guide</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 20px 0",
          }}>
            A logo without a system is just a picture. Milton delivers a complete brand guide — your colors, your typography, your tone of voice, your visual rules — so that everything you put out into the world looks and feels like it came from the same place. Whether it&apos;s a social post, an email, a flyer, or your website, your brand stays consistent.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 20px 0",
          }}>
            This is the thing that separates businesses that look professional from businesses that look like they&apos;re figuring it out as they go. Most gyms don&apos;t have one. You will.
          </p>

          <div style={{
            borderRadius: mobile ? 12 : 16,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            marginTop: 32,
          }}>
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-rkhS4oVavHcGoMowjwyRuhjopi32bn.png"
              alt="Complete brand identity system including brand guidelines book, business cards, letterhead, phone mockup, and marketing collateral arranged in professional flat lay"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </div>

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ PROFESSIONAL PHOTOGRAPHY ═══════ */}
        <section style={{ padding: sectionPad }}>
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : 40,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Professional <Accent>Photography</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 20px 0",
          }}>
            AI-powered photography and image generation means you don&apos;t need to hire a photographer and shut down your gym for a full day shoot. Milton helps you produce professional-quality images of your facility, your team, your equipment, and your member experience — images that look like they belong on a healthcare brand&apos;s website, not a local gym&apos;s Facebook page.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 20px 0",
          }}>
            Need headshots for your trainers? Lifestyle shots for your homepage? Equipment and facility photos for your marketing? Milton handles it — blending real photos with AI enhancement to create visuals that elevate everything they touch.
          </p>

          <div style={{
            borderRadius: mobile ? 12 : 16,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            marginTop: 32,
          }}>
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-LzJgFvXmAylkQ7AcKQWDIclXNI5ZzD.png"
              alt="Professional fitness team wearing branded FitForge apparel standing confidently in modern gym facility"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </div>
        </section>

        {/* ═══════ WEBSITE ═══════ */}
        <section style={{ padding: sectionPad }}>
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : 40,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            <Accent>Website</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 20px 0",
          }}>
            Your website is the first thing people see. For most gyms, it&apos;s also the last — because it doesn&apos;t inspire confidence, doesn&apos;t communicate value, and doesn&apos;t convert visitors into members.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 20px 0",
          }}>
            Milton builds you a professional, modern website that reflects the brand you just created. Clean design. Fast. Mobile-first. Integrated with Milton&apos;s scheduling system so visitors can book a session, a tour, or a consultation directly from the site. Connected to your Stripe-powered CRM so every lead is captured automatically.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 20px 0",
          }}>
            This isn&apos;t a template with your name dropped in. It&apos;s a real website, designed around your brand, your services, and your facility — built to make the right first impression and turn interest into action.
          </p>

          <div style={{
            borderRadius: mobile ? 12 : 16,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            marginTop: 32,
          }}>
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-yVyyIGiQntY2afwcu3pHvheWvhIjl4.png"
              alt="MacBook displaying professional FitForge website with modern design, hero section showing 'Elevate Your Strength & Performance' headline"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </div>

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ CREDIBILITY ═══════ */}
        <section style={{ padding: sectionPad }}>
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : 40,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Credibility is a <Accent>competitive advantage</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 20px 0",
          }}>
            When a prospective member is comparing your gym to the one down the street, the decision often comes down to perception. Who looks more professional? Who feels more trustworthy? Who looks like they take this seriously?
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 20px 0",
          }}>
            Most of the time, the answer has nothing to do with who&apos;s actually better at coaching. It&apos;s whoever looks the part. Milton makes sure that&apos;s you. A cohesive brand, a polished website, professional imagery, and a consistent visual identity across every touchpoint — that&apos;s what makes someone choose your facility before they&apos;ve ever walked through the door.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 17 : 20, lineHeight: 1.75,
            color: mint, fontWeight: 500, margin: "32px 0 0 0", textAlign: "center",
          }}>
            You&apos;re doing healthcare-level work. It&apos;s time you looked like it.
          </p>

          <div style={{
            borderRadius: mobile ? 12 : 16,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            marginTop: 32,
          }}>
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6-9mqs0SCMR0GRBP6UrWVqitMBN7MoFp.png"
              alt="Close-up of premium FitForge logo printed on dark athletic shirt showing professional brand application"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </div>
        </section>

        {/* ═══════ CLOSING CTA ═══════ */}
        <section style={{
          padding: sectionPad,
          textAlign: "center",
        }}>
          <div style={{
            background: "rgba(13,154,165,0.06)",
            border: "1px solid rgba(13,154,165,0.2)",
            borderRadius: mobile ? 16 : 20,
            padding: mobile ? "48px 24px" : "64px 48px",
          }}>
            <h2 style={{
              fontFamily: serif,
              fontSize: mobile ? 26 : 36,
              fontWeight: 400, lineHeight: 1.15, color: "#fff",
              margin: "0 0 16px 0",
            }}>
              Ready to elevate your brand?
            </h2>

            <p style={{
              fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.7,
              color: "rgba(255,255,255,0.6)", maxWidth: 500, margin: "0 auto 32px auto",
            }}>
              Book a free AI Strategy Session and we&apos;ll show you exactly how AI Branding can transform your facility&apos;s presence.
            </p>

            <CTAButton mobile={mobile} />
          </div>
        </section>

      </div>
    </>
  );
}
