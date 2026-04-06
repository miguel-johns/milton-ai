"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

function useBreakpoint() {
  const [state, setState] = useState({ mobile: false, tablet: false, desktop: true });
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setState({ mobile: w < 768, tablet: w >= 768 && w < 1024, desktop: w >= 1024 });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return state;
}

export default function SharedFooter() {
  const { mobile } = useBreakpoint();
  const f = "'DM Sans', sans-serif";
  const teal = "#0d9aa5";

  return (
    <footer style={{
      borderTop: "1px solid rgba(13,154,165,0.1)",
      padding: mobile ? "24px 20px" : "40px 40px",
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center",
      flexDirection: mobile ? "column" : "row", 
      gap: mobile ? 16 : 0,
      background: "linear-gradient(180deg, transparent, rgba(6,28,39,0.3))",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Milton%20Face%20Logo-whMWzOXBgBgulGUqdRthSEMsjeyWPe.png"
          alt="Milton Logo"
          style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            objectFit: "cover",
          }}
        />
        <span style={{ fontFamily: f, fontWeight: 600, fontSize: 14, color: "rgba(255,255,255,0.5)", letterSpacing: 2 }}>MILTON AI</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/terms" style={{ fontFamily: f, fontSize: 13, color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }}>Terms of Service</Link>
        <Link href="/privacy" style={{ fontFamily: f, fontSize: 13, color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }}>Privacy Policy</Link>
        <span style={{ fontFamily: f, fontSize: 13, color: "rgba(255,255,255,0.25)" }}>© 2026 MMNT Inc.</span>
      </div>
    </footer>
  );
}
