import { useState, useEffect } from "react";

function useBreakpoint() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return { mobile: width < 768, tablet: width >= 768 && width < 1024, desktop: width >= 1024 };
}

export default function BookingPage() {
  const { mobile, tablet } = useBreakpoint();
  const f = "'DM Sans', sans-serif";
  const navy = "#08455e";
  const teal = "#0d9aa5";

  useEffect(() => {
    // Load Calendly script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(180deg, ${navy} 0%, #061c27 100%)`,
      fontFamily: f,
    }}>
      {/* Header */}
      <header style={{
        padding: mobile ? "16px 20px" : "20px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(13,154,165,0.1)",
      }}>
        <a href="#/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: `linear-gradient(135deg, ${teal} 0%, #0a7a83 100%)`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>M</span>
          </div>
          <span style={{ fontFamily: f, fontWeight: 700, fontSize: 18, color: "#fff", letterSpacing: -0.5 }}>Milton</span>
        </a>
        <a 
          href="#/" 
          style={{ 
            fontFamily: f, 
            fontSize: 14, 
            color: "rgba(255,255,255,0.6)", 
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span style={{ fontSize: 18 }}>&larr;</span> Back to Home
        </a>
      </header>

      {/* Content */}
      <div style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: mobile ? "40px 20px 60px" : "60px 40px 80px",
      }}>
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: mobile ? 32 : 48 }}>
          <h1 style={{
            fontFamily: f,
            fontSize: mobile ? 28 : 40,
            fontWeight: 700,
            color: "#fff",
            margin: "0 0 16px 0",
            letterSpacing: -1,
          }}>
            Schedule a Discovery Call
          </h1>
          <p style={{
            fontFamily: f,
            fontSize: mobile ? 16 : 18,
            color: "rgba(255,255,255,0.6)",
            margin: 0,
            maxWidth: 500,
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.6,
          }}>
            See how Milton can transform your training department. Pick a time that works for you.
          </p>
        </div>

        {/* Calendly Widget Container */}
        <div style={{
          background: "#fff",
          borderRadius: mobile ? 16 : 24,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}>
          <div 
            className="calendly-inline-widget" 
            data-url="https://calendly.com/miguel-johns/milton-discovery-call?primary_color=00957b"
            style={{ 
              minWidth: 320, 
              height: mobile ? 650 : 700,
            }}
          />
        </div>

        {/* Trust indicators */}
        <div style={{
          marginTop: mobile ? 40 : 56,
          textAlign: "center",
        }}>
          <p style={{
            fontFamily: f,
            fontSize: 14,
            color: "rgba(255,255,255,0.4)",
            margin: "0 0 20px 0",
          }}>
            Trusted by leading training departments
          </p>
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: mobile ? 24 : 40,
            flexWrap: "wrap",
          }}>
            {["Optimal Performance"].map((name, i) => (
              <span key={i} style={{
                fontFamily: f,
                fontSize: 14,
                fontWeight: 600,
                color: "rgba(255,255,255,0.25)",
                letterSpacing: 1,
                textTransform: "uppercase",
              }}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

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
  );
}
