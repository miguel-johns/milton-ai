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

export default function BookingPage() {
  const { mobile, tablet } = useBreakpoint();
  const [scrolled, setScrolled] = useState(false);
  const f = "'DM Sans', sans-serif";
  const px = mobile ? 20 : tablet ? 32 : 40;

  useEffect(() => {
    // Load Calendly script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#061c27", color: "#fff", position: "relative", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap" rel="stylesheet" />

      {/* Aurora bg */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 50% at 20% 20%, rgba(13,154,165,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(154,241,152,0.04) 0%, transparent 50%), radial-gradient(ellipse 90% 60% at 50% 0%, rgba(8,69,94,0.3) 0%, transparent 70%)",
      }} />

      {/* ——— NAV ——— */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: mobile ? "12px 16px" : "16px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(6,28,39,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(13,154,165,0.1)" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}>
        <a href="#/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Milton%20Face%20Logo-whMWzOXBgBgulGUqdRthSEMsjeyWPe.png"
            alt="Milton Logo"
            style={{
              width: mobile ? 36 : 44,
              height: mobile ? 36 : 44,
              borderRadius: 8,
              objectFit: "cover",
            }}
          />
          <span style={{
            fontFamily: f, fontWeight: 700,
            fontSize: mobile ? 16 : 20, color: "#fff", letterSpacing: 2,
          }}>MILTON</span>
        </a>

        <a 
          href="#/" 
          style={{ 
            fontFamily: f, 
            fontSize: 14, 
            fontWeight: 500,
            color: "rgba(255,255,255,0.6)", 
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 16px",
            borderRadius: 100,
            border: "1px solid rgba(255,255,255,0.15)",
            transition: "all 0.2s ease",
          }}
        >
          <span style={{ fontSize: 16 }}>&larr;</span> Back
        </a>
      </nav>

      {/* Content wrapper */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Hero Section */}
        <section style={{ 
          padding: mobile ? "100px 0 40px" : "140px 0 60px", 
          textAlign: "center",
        }}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: `0 ${px}px` }}>
            {/* Section Label */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#0d9aa5" }} />
              <span style={{
                fontFamily: f, fontSize: 12, fontWeight: 500,
                letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(255,255,255,0.7)",
              }}>Book a Call</span>
            </div>

            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: mobile ? 36 : tablet ? 48 : 56,
              fontWeight: 400, lineHeight: 1.15, color: "#fff",
              margin: "0 0 20px 0",
            }}>
              Schedule a Discovery Call
            </h1>
            <p style={{
              fontFamily: f,
              fontSize: mobile ? 15 : 17,
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.6)",
              maxWidth: 540,
              margin: "0 auto",
            }}>
              See how Milton can transform your training department. Pick a time that works for you.
            </p>
          </div>
        </section>

        {/* Calendly Widget Section */}
        <section style={{ padding: `0 ${px}px 80px` }}>
          <div style={{
            maxWidth: 900,
            margin: "0 auto",
            background: "rgba(8,69,94,0.2)",
            border: "1px solid rgba(13,154,165,0.2)",
            borderRadius: mobile ? 16 : 24,
            overflow: "hidden",
          }}>
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/miguel-johns/milton-discovery-call?primary_color=0d9aa5&text_color=ffffff&background_color=061c27"
              style={{ 
                minWidth: 320, 
                height: mobile ? 650 : 700,
              }}
            />
          </div>
        </section>

        {/* Trust Section */}
        <section style={{ 
          padding: mobile ? "40px 0 60px" : "60px 0 80px",
          borderTop: "1px solid rgba(13,154,165,0.1)",
        }}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: `0 ${px}px`, textAlign: "center" }}>
            <p style={{
              fontFamily: f,
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              margin: "0 0 24px 0",
            }}>
              Trusted by leading training departments
            </p>
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: mobile ? 32 : 48,
              flexWrap: "wrap",
            }}>
              <span style={{
                fontFamily: f,
                fontSize: 15,
                fontWeight: 600,
                color: "rgba(255,255,255,0.4)",
                letterSpacing: 0.5,
              }}>
                Optimal Performance
              </span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          borderTop: "1px solid rgba(13,154,165,0.08)",
          padding: mobile ? "24px 20px" : "32px 40px",
          display: "flex",
          justifyContent: "center",
        }}>
          <span style={{ fontFamily: f, fontSize: 13, color: "rgba(255,255,255,0.25)" }}>
            © 2026 MMNT Inc. All rights reserved.
          </span>
        </footer>
      </div>
    </div>
  );
}
