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

export default function SharedNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { mobile, tablet } = useBreakpoint();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => {
    const handleHashChange = () => setMenuOpen(false);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navLinks = [
    { label: "The Platform", href: "/the-platform" },
    { label: "AI Readiness Snapshot", href: "/consultation" },
    { label: "Insights", href: "/insights" },
    { label: "About Us", href: "/about" },
    { label: "Pricing", href: "/pricing" },
  ];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: mobile ? "12px 16px" : "16px 40px",
        display: "grid",
        gridTemplateColumns: mobile ? "1fr auto" : "1fr auto 1fr",
        alignItems: "center",
        background: scrolled || menuOpen ? "rgba(6,28,39,0.95)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(13,154,165,0.1)" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
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
            fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
            fontSize: mobile ? 16 : 20, color: "#fff", letterSpacing: 2,
          }}>MILTON</span>
        </Link>

        {/* Centered text nav links */}
        {!mobile && (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: tablet ? 24 : 36,
          }}>
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={e => e.target.style.color = "#fff"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.7)"}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Right side button */}
        {!mobile && (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <CTA variant="primary" style={{ padding: "10px 24px", fontSize: 14 }} href="/book">Request a Demo</CTA>
          </div>
        )}

        {mobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: "none", border: "none", cursor: "pointer", padding: 8,
            display: "flex", flexDirection: "column", gap: 5, position: "relative", zIndex: 101,
          }}>
            <div style={{ width: 22, height: 2, background: "#fff", borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
            <div style={{ width: 22, height: 2, background: "#fff", borderRadius: 2, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
            <div style={{ width: 22, height: 2, background: "#fff", borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
          </button>
        )}
      </nav>

      {/* Mobile menu */}
      {mobile && menuOpen && (
        <div style={{
          position: "fixed", top: 54, left: 0, right: 0, bottom: 0, zIndex: 99,
          background: "rgba(6,28,39,0.98)", backdropFilter: "blur(20px)",
          padding: "28px 24px", display: "flex", flexDirection: "column", gap: 8,
          overflowY: "auto",
        }}>
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16,
                fontWeight: 500,
                color: "rgba(255,255,255,0.7)",
                textDecoration: "none",
                padding: "14px 0",
                borderBottom: "1px solid rgba(13,154,165,0.1)",
                display: "block",
              }}
            >
              {link.label}
            </a>
          ))}
          
          <div style={{ marginTop: 24 }}>
            <CTA variant="primary" style={{ width: "100%", textAlign: "center", padding: "14px 0" }} href="/book">Request a Demo</CTA>
          </div>
        </div>
      )}
    </>
  );
}
