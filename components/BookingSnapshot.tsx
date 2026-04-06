"use client";

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

export default function BookingSnapshotPage() {
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
    <>
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
              }}>Free Consultation</span>
            </div>

            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: mobile ? 36 : tablet ? 48 : 56,
              fontWeight: 400, lineHeight: 1.15, color: "#fff",
              margin: "0 0 20px 0",
            }}>
              Book Your AI Readiness Snapshot
            </h1>
            <p style={{
              fontFamily: f,
              fontSize: mobile ? 15 : 17,
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.6)",
              maxWidth: 540,
              margin: "0 auto",
            }}>
              Get a personalized assessment of your gym's AI readiness. Pick a time that works for you.
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
              data-url="https://calendly.com/miguel-johns/milton-discovery-call-clone?primary_color=00848c"
              style={{ 
                minWidth: 320, 
                height: mobile ? 650 : 700,
              }}
            />
          </div>
        </section>

        </div>
    </>
  );
}
