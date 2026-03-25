import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  Eye, Zap, Clock, Building2, Dumbbell, Target,
  Star, User, ArrowUpRight, Cpu, Check, Loader,
  ClipboardList, BarChart3, RefreshCw, Sparkles,
  ChevronRight, Shield, TrendingUp, Users, Brain,
  Activity, BellRing, Send, Plug, Smartphone,
  MessageSquare, LayoutDashboard, LineChart, Calendar,
  DollarSign, Wifi, Heart, Settings, Mail, UserCheck,
  Menu, X, Watch, Circle, Droplets, Apple, Scale,
  ChevronDown, X as XIcon
} from "lucide-react";

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const COLORS = {
  mint: "#9af199",
  deepTeal: "#026278",
  teal: "#0d9aa5",
  navy: "#08455e",
  emerald: "#2ee5b1",
};

const MILTON_LOGO = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAQ4BDgDASIAAhEBAxEB/8QAHQABAAIDAQEBAQAAAAAAAAAAAAcIBAUGAwIBCf/EAF0QAAEDAwEDBwcIBgUJBAgGAwABAgMEBREGBxIhEzFBUWFxgQgUIjKRobEVI0JSYnKSwTOCorLC0SNDU3OTNERVY5OUs+HwFzRWoyUmNkV0g6TiJzU3RsPxZGWE/8QAGwEBAAIDAQEAAAAAAAAAAAAAAAQGAgMFAQf/xAA9EQEAAgECAwQHBwMDBQADAQAAAQIDBBEFITEGEkFREyJhcZGx0RQygaHB4fAzQlIjNPEVFiRTYkNygqL/2gAMAwEAAhEDEQA/ALFAAqqiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

/* --- Intersection Observer hook --- */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* --- Section wrapper with fade-in --- */
function Section({ children, className = "", id, style = {} }) {
  const [ref, visible] = useInView(0.08);
  return (
    <section
      ref={ref}
      id={id}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(48px)",
        transition: "opacity 0.9s cubic-bezier(.16,1,.3,1), transform 0.9s cubic-bezier(.16,1,.3,1)",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

/* --- Light card styles --- */
const lc = { borderRadius: 24, background: "white", boxShadow: "0 2px 24px rgba(8,69,94,.06)", border: "1px solid rgba(2,98,120,.06)" };

/* --- Pulsing dot --- */
function PulseDot({ color = COLORS.emerald, size = 10, delay = 0 }) {
  return (
    <span style={{
      display: "inline-block", width: size, height: size, borderRadius: "50%", background: color,
      animation: `pulse 2.4s ease-in-out ${delay}s infinite`, flexShrink: 0,
    }} />
  );
}

/* --- Nav --- */
function Nav({ onNavigate, onDemo }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    const r = () => setIsMobile(window.innerWidth < 768);
    r();
    window.addEventListener("scroll", h);
    window.addEventListener("resize", r);
    return () => { window.removeEventListener("scroll", h); window.removeEventListener("resize", r); };
  }, []);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? "12px clamp(20px, 4vw, 48px)" : "18px clamp(20px, 4vw, 48px)",
        background: scrolled || menuOpen ? "rgba(255,255,255,.92)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(20px) saturate(1.4)" : "none",
        WebkitBackdropFilter: scrolled || menuOpen ? "blur(20px) saturate(1.4)" : "none",
        borderBottom: scrolled ? "1px solid rgba(2,98,120,.06)" : "1px solid transparent",
        transition: "all 0.4s cubic-bezier(.16,1,.3,1)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("home"); }} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, overflow: "hidden" }}>
            <img src={MILTON_LOGO} alt="Milton" style={{ width: 34, height: 34, borderRadius: 10, objectFit: "cover" }} />
          </div>
          <span style={{ fontSize: 20, fontWeight: 700, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif", letterSpacing: -0.5 }}>Milton</span>
        </a>
        {/* Desktop nav */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
            <a href="#how-it-works" style={{ fontSize: 14, fontWeight: 500, color: COLORS.navy, textDecoration: "none", fontFamily: "'DM Sans', sans-serif" }}>How It Works</a>
            <button onClick={onDemo} style={{
              padding: "10px 24px", borderRadius: 10, border: "none",
              background: `linear-gradient(135deg, ${COLORS.navy}, ${COLORS.deepTeal})`,
              color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}>
              Book a Demo
            </button>
          </div>
        )}
        {/* Mobile hamburger */}
        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}>
            {menuOpen ? <X size={24} color={COLORS.navy} /> : <Menu size={24} color={COLORS.navy} />}
          </button>
        )}
      </nav>
      {/* Mobile menu */}
      {isMobile && menuOpen && (
        <div style={{
          position: "fixed", top: 70, left: 0, right: 0, bottom: 0, zIndex: 99,
          background: "rgba(255,255,255,.98)", backdropFilter: "blur(20px)",
          display: "flex", flexDirection: "column", padding: 24, gap: 16,
        }}>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)} style={{ fontSize: 18, fontWeight: 500, color: COLORS.navy, textDecoration: "none", padding: "12px 0" }}>How It Works</a>
          <button onClick={() => { onDemo(); setMenuOpen(false); }} style={{
            padding: "16px 24px", borderRadius: 12, border: "none",
            background: `linear-gradient(135deg, ${COLORS.navy}, ${COLORS.deepTeal})`,
            color: "white", fontSize: 16, fontWeight: 600, cursor: "pointer", marginTop: 16,
          }}>
            Book a Demo
          </button>
        </div>
      )}
    </>
  );
}

/* --- Demo Modal --- */
function DemoModal({ open, onClose }) {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", trainers: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const { error: supabaseError } = await supabase.from("demo_requests").insert([{
        name: formData.name,
        email: formData.email,
        company: formData.company,
        trainers: formData.trainers,
        message: formData.message,
        created_at: new Date().toISOString(),
      }]);
      if (supabaseError) throw supabaseError;
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
    setSubmitting(false);
  };

  if (!open) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(8,69,94,.6)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }} onClick={onClose}>
      <div style={{
        background: "white", borderRadius: 24, padding: "clamp(24px, 4vw, 40px)",
        maxWidth: 480, width: "100%", position: "relative",
        boxShadow: "0 24px 80px rgba(8,69,94,.25)",
      }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", padding: 8,
        }}>
          <X size={20} color="#9ab5c0" />
        </button>
        {submitted ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: `${COLORS.emerald}15`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <Check size={32} color={COLORS.emerald} />
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: COLORS.navy, marginBottom: 12 }}>Thank you!</h3>
            <p style={{ fontSize: 15, color: "#5a7a88", lineHeight: 1.6 }}>We&apos;ll be in touch within 24 hours to schedule your demo.</p>
          </div>
        ) : (
          <>
            <h3 style={{ fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 700, color: COLORS.navy, marginBottom: 8 }}>Book a Demo</h3>
            <p style={{ fontSize: 14, color: "#5a7a88", marginBottom: 24, lineHeight: 1.5 }}>See how Milton gives your entire training staff the tools, data, and playbook to perform at their best.</p>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <input type="text" placeholder="Your name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ padding: "14px 16px", borderRadius: 10, border: "1px solid rgba(2,98,120,.12)", fontSize: 15, outline: "none" }} />
              <input type="email" placeholder="Work email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ padding: "14px 16px", borderRadius: 10, border: "1px solid rgba(2,98,120,.12)", fontSize: 15, outline: "none" }} />
              <input type="text" placeholder="Gym / Company name" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} style={{ padding: "14px 16px", borderRadius: 10, border: "1px solid rgba(2,98,120,.12)", fontSize: 15, outline: "none" }} />
              <input type="text" placeholder="Number of trainers" value={formData.trainers} onChange={(e) => setFormData({ ...formData, trainers: e.target.value })} style={{ padding: "14px 16px", borderRadius: 10, border: "1px solid rgba(2,98,120,.12)", fontSize: 15, outline: "none" }} />
              <textarea placeholder="Anything else we should know?" rows={3} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} style={{ padding: "14px 16px", borderRadius: 10, border: "1px solid rgba(2,98,120,.12)", fontSize: 15, outline: "none", resize: "none" }} />
              {error && <p style={{ color: "#e74c3c", fontSize: 13 }}>{error}</p>}
              <button type="submit" disabled={submitting} style={{
                padding: "16px 24px", borderRadius: 12, border: "none",
                background: `linear-gradient(135deg, ${COLORS.navy}, ${COLORS.deepTeal})`,
                color: "white", fontSize: 16, fontWeight: 600, cursor: submitting ? "wait" : "pointer",
                opacity: submitting ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}>
                {submitting ? <><Loader size={18} style={{ animation: "spin 1s linear infinite" }} /> Submitting...</> : "Request Demo"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* --- FAQ Accordion Item --- */
function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(2,98,120,.08)" }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", padding: "24px 0", background: "none", border: "none", cursor: "pointer",
        display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, textAlign: "left",
      }}>
        <span style={{ fontSize: "clamp(16px, 2vw, 18px)", fontWeight: 600, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.4 }}>{question}</span>
        <div style={{
          width: 28, height: 28, borderRadius: 8, flexShrink: 0,
          background: open ? `${COLORS.teal}12` : "rgba(2,98,120,.04)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.3s", transform: open ? "rotate(180deg)" : "rotate(0deg)",
        }}>
          <ChevronDown size={16} color={open ? COLORS.teal : "#9ab5c0"} />
        </div>
      </button>
      <div style={{
        maxHeight: open ? 500 : 0, overflow: "hidden", opacity: open ? 1 : 0,
        transition: "all 0.4s cubic-bezier(.16,1,.3,1)", paddingBottom: open ? 24 : 0,
      }}>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: "#5a7a88", fontFamily: "'DM Sans', sans-serif" }}>{answer}</p>
      </div>
    </div>
  );
}

/* --- Main App --- */
export default function MiltonSite() {
  const [page, setPage] = useState("home");
  const [showDemo, setShowDemo] = useState(false);
  const navigate = (p) => { setPage(p); window.scrollTo(0, 0); };
  
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fafcfd", color: COLORS.navy, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #fafcfd; }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.7); } }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes fadeUp { 0% { opacity: 0; transform: translateY(32px); } 100% { opacity: 1; transform: translateY(0); } }
        ::selection { background: ${COLORS.emerald}30; }
      `}</style>

      <Nav onNavigate={navigate} onDemo={() => setShowDemo(true)} />

      {page === "home" && (<>

      {/* =========== SECTION 1: HERO =========== */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "140px clamp(20px, 4vw, 48px) 80px",
        background: `linear-gradient(135deg, ${COLORS.teal}12 0%, ${COLORS.mint}15 50%, ${COLORS.emerald}10 100%)`,
        position: "relative", overflow: "hidden",
      }}>
        {/* Subtle grid */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.025,
          backgroundImage: `linear-gradient(${COLORS.navy} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.navy} 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }} />
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(40px, 6vw, 80px)", maxWidth: 1280, margin: "0 auto", width: "100%", position: "relative", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 520px", minWidth: 300 }}>
            <div style={{ animation: "fadeUp 0.8s ease both" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px",
                borderRadius: 100, background: `${COLORS.emerald}12`, border: `1px solid ${COLORS.emerald}25`,
                marginBottom: 32,
              }}>
                <Sparkles size={14} color={COLORS.emerald} strokeWidth={2} />
                <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.teal, letterSpacing: 0.5, fontFamily: "'DM Sans', sans-serif" }}>AI-Powered Trainer Intelligence</span>
              </div>
            </div>
            <h1 style={{
              fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, lineHeight: 1.08,
              fontFamily: "'DM Sans', sans-serif", color: COLORS.navy,
              animation: "fadeUp 0.8s ease 0.1s both", letterSpacing: -2,
            }}>
              Your best trainer&apos;s instincts, available to <span style={{ color: COLORS.teal }}>every trainer.</span>
            </h1>
            <p style={{
              fontSize: "clamp(16px, 1.8vw, 19px)", lineHeight: 1.7, color: "#5a7a88", maxWidth: 540,
              marginTop: 28, fontFamily: "'DM Sans', sans-serif",
              animation: "fadeUp 0.8s ease 0.2s both",
            }}>
              Milton gives gym owners and fitness directors an intelligence layer for their coaching staff - so new trainers ramp faster, top trainers stay longer, and every client gets a consistent experience.
            </p>
            <div style={{ display: "flex", gap: 16, marginTop: 40, animation: "fadeUp 0.8s ease 0.3s both", flexWrap: "wrap" }}>
              <button onClick={() => setShowDemo(true)} style={{
                padding: "16px 36px", borderRadius: 14, border: "none",
                background: `linear-gradient(135deg, ${COLORS.navy}, ${COLORS.deepTeal})`,
                color: "white", fontSize: 16, fontWeight: 600, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", boxShadow: `0 8px 32px rgba(8,69,94,.25)`,
                transition: "all 0.3s", display: "flex", alignItems: "center", gap: 8,
              }}>
                Book a Demo <ChevronRight size={18} />
              </button>
              <button onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })} style={{
                padding: "16px 36px", borderRadius: 14,
                border: `1.5px solid rgba(2,98,120,.12)`, background: "white",
                color: COLORS.navy, fontSize: 16, fontWeight: 600, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", transition: "all 0.3s",
              }}>
                See How It Works
              </button>
            </div>
          </div>
          {/* Hero Visual Placeholder */}
          <div style={{ flex: "1 1 400px", display: "flex", justifyContent: "center", animation: "fadeUp 1s ease 0.4s both" }}>
            <div style={{
              width: "100%", maxWidth: 480, aspectRatio: "4/3", borderRadius: 24,
              background: `linear-gradient(145deg, ${COLORS.navy}08, ${COLORS.teal}06, ${COLORS.emerald}04)`,
              border: `2px dashed ${COLORS.teal}30`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12,
            }}>
              <LayoutDashboard size={48} color={COLORS.teal} strokeWidth={1} style={{ opacity: 0.4 }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.teal, opacity: 0.5 }}>Hero Visual</span>
              <span style={{ fontSize: 12, color: "#9ab5c0" }}>960 x 720</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========== SECTION 2: CLARITY BAR =========== */}
      <section style={{
        padding: "clamp(32px, 4vw, 48px) clamp(20px, 4vw, 48px)",
        background: `linear-gradient(145deg, ${COLORS.navy}, ${COLORS.deepTeal})`,
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
          <p style={{
            fontSize: "clamp(15px, 1.8vw, 18px)", lineHeight: 1.7, color: "rgba(255,255,255,.85)",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            Milton isn&apos;t a replacement for your gym software. It&apos;s the intelligence layer that sits on top - turning trainer activity, client outcomes, and scheduling data into actionable insight. <span style={{ color: COLORS.emerald }}>Your billing, payments, and memberships stay exactly where they are.</span>
          </p>
        </div>
      </section>

      {/* =========== SECTION 3: THE REAL PROBLEM =========== */}
      <Section style={{ padding: "clamp(80px, 10vw, 140px) clamp(20px, 4vw, 48px)", background: "white" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(48px, 6vw, 80px)" }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: COLORS.teal, fontFamily: "'DM Sans', sans-serif" }}>The Real Problem</span>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, lineHeight: 1.12,
              fontFamily: "'DM Sans', sans-serif", color: COLORS.navy,
              marginTop: 16, letterSpacing: -1,
            }}>
              Gym owners don&apos;t have a software problem.<br />
              <span style={{ color: COLORS.teal }}>They have a staff problem.</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "clamp(24px, 3vw, 40px)" }}>
            {/* Card 1 */}
            <div style={{ ...lc, padding: "clamp(28px, 3vw, 40px)", display: "flex", flexDirection: "column" }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14, marginBottom: 24,
                background: `${COLORS.teal}08`, border: `1.5px solid ${COLORS.teal}20`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Clock size={22} color={COLORS.teal} strokeWidth={1.6} />
              </div>
              <h3 style={{ fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: COLORS.navy, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>
                New trainers take months to ramp up
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "#5a7a88", fontFamily: "'DM Sans', sans-serif", marginBottom: 24 }}>
                You hire someone promising, then spend 3-6 months hoping they figure it out. Meanwhile, clients notice the gap between your veteran trainers and the new hire. Some don&apos;t come back.
              </p>
              <div style={{
                marginTop: "auto", padding: "20px 24px", borderRadius: 16,
                background: `linear-gradient(135deg, ${COLORS.mint}15, ${COLORS.emerald}10)`,
                border: `1px solid ${COLORS.emerald}20`,
              }}>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif" }}>
                  <span style={{ fontWeight: 700, color: COLORS.teal }}>Milton gives new trainers a playbook</span> built from your best trainers&apos; patterns - programming, check-in cadence, follow-up timing - so they perform at a higher level from week one.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div style={{ ...lc, padding: "clamp(28px, 3vw, 40px)", display: "flex", flexDirection: "column" }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14, marginBottom: 24,
                background: `${COLORS.teal}08`, border: `1.5px solid ${COLORS.teal}20`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <ArrowUpRight size={22} color={COLORS.teal} strokeWidth={1.6} />
              </div>
              <h3 style={{ fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: COLORS.navy, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>
                Your best trainers leave - and take clients with them
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "#5a7a88", fontFamily: "'DM Sans', sans-serif", marginBottom: 24 }}>
                Top trainers build relationships, outgrow your gym, and walk out the door with half their book of business. The knowledge they built? Gone. The client loyalty? With them.
              </p>
              <div style={{
                marginTop: "auto", padding: "20px 24px", borderRadius: 16,
                background: `linear-gradient(135deg, ${COLORS.mint}15, ${COLORS.emerald}10)`,
                border: `1px solid ${COLORS.emerald}20`,
              }}>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif" }}>
                  <span style={{ fontWeight: 700, color: COLORS.teal }}>Milton captures institutional knowledge</span> at the gym level - client history, programming logic, outcome data - so the relationship lives in your business, not in one person&apos;s head.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* =========== SECTION 4: ONE PLATFORM, TWO SUPERPOWERS =========== */}
      <Section style={{ padding: "clamp(80px, 10vw, 140px) clamp(20px, 4vw, 48px)", background: "#fafcfd" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(48px, 6vw, 80px)" }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: COLORS.teal, fontFamily: "'DM Sans', sans-serif" }}>One Platform, Two Superpowers</span>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, lineHeight: 1.12,
              fontFamily: "'DM Sans', sans-serif", color: COLORS.navy,
              marginTop: 16, letterSpacing: -1,
            }}>
              Data for coaching. <span style={{ color: COLORS.teal }}>Data for operations.</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "clamp(24px, 3vw, 40px)" }}>
            {/* For Trainers - Dark Card */}
            <div style={{
              borderRadius: 24, padding: "clamp(32px, 4vw, 48px)",
              background: `linear-gradient(145deg, ${COLORS.navy}, ${COLORS.deepTeal})`,
              boxShadow: "0 8px 40px rgba(8,69,94,.2)",
            }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px",
                borderRadius: 100, background: "rgba(255,255,255,.1)", marginBottom: 24,
              }}>
                <Dumbbell size={16} color={COLORS.emerald} />
                <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.8)", letterSpacing: 0.5 }}>For Trainers</span>
              </div>
              <h3 style={{ fontSize: "clamp(22px, 2.5vw, 28px)", fontWeight: 700, color: "white", marginBottom: 24, fontFamily: "'DM Sans', sans-serif" }}>
                Coaching Intelligence
              </h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  "AI-assisted programming that adapts to client outcomes",
                  "Client engagement signals - who's trending up, who needs attention",
                  "Nutrition tracking and macro visibility across the client roster",
                  "Guided follow-up prompts so no client falls through the cracks",
                ].map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <Check size={18} color={COLORS.emerald} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,.8)", fontFamily: "'DM Sans', sans-serif" }}>{item}</span>
                  </li>
                ))}
              </ul>
              {/* Visual Placeholder */}
              <div style={{
                marginTop: 32, width: "100%", aspectRatio: "16/9", borderRadius: 16,
                background: "rgba(255,255,255,.08)", border: "2px dashed rgba(255,255,255,.15)",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
              }}>
                <LayoutDashboard size={32} color="rgba(255,255,255,.3)" strokeWidth={1} />
                <span style={{ fontSize: 12, color: "rgba(255,255,255,.3)" }}>Trainer Dashboard Visual</span>
              </div>
            </div>

            {/* For Owners - Light Card */}
            <div style={{ ...lc, padding: "clamp(32px, 4vw, 48px)" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px",
                borderRadius: 100, background: `${COLORS.teal}10`, marginBottom: 24,
              }}>
                <Building2 size={16} color={COLORS.teal} />
                <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.teal, letterSpacing: 0.5 }}>For Owners &amp; Directors</span>
              </div>
              <h3 style={{ fontSize: "clamp(22px, 2.5vw, 28px)", fontWeight: 700, color: COLORS.navy, marginBottom: 24, fontFamily: "'DM Sans', sans-serif" }}>
                Operational Intelligence
              </h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  "Trainer performance benchmarks - session load, retention rates, client outcomes",
                  "Scheduling visibility and utilization across your entire team",
                  "Automated follow-up and re-engagement workflows",
                  "Staff development tracking - see who's improving, who needs coaching",
                ].map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <Check size={18} color={COLORS.teal} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 15, lineHeight: 1.6, color: "#5a7a88", fontFamily: "'DM Sans', sans-serif" }}>{item}</span>
                  </li>
                ))}
              </ul>
              {/* Visual Placeholder */}
              <div style={{
                marginTop: 32, width: "100%", aspectRatio: "16/9", borderRadius: 16,
                background: `linear-gradient(145deg, ${COLORS.navy}06, ${COLORS.teal}04)`,
                border: `2px dashed ${COLORS.teal}20`,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
              }}>
                <BarChart3 size={32} color={COLORS.teal} strokeWidth={1} style={{ opacity: 0.3 }} />
                <span style={{ fontSize: 12, color: COLORS.teal, opacity: 0.5 }}>Owner Dashboard Visual</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* =========== SECTION 5: A DAY WITH MILTON =========== */}
      <Section style={{ padding: "clamp(80px, 10vw, 140px) clamp(20px, 4vw, 48px)", background: "white" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(48px, 6vw, 80px)" }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: COLORS.teal, fontFamily: "'DM Sans', sans-serif" }}>What Actually Changes</span>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, lineHeight: 1.12,
              fontFamily: "'DM Sans', sans-serif", color: COLORS.navy,
              marginTop: 16, letterSpacing: -1,
            }}>
              Tuesday morning, <span style={{ color: COLORS.teal }}>before your first session.</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "clamp(24px, 3vw, 40px)" }}>
            {/* Sarah's story */}
            <div style={{ ...lc, padding: "clamp(28px, 3vw, 40px)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14, background: `linear-gradient(135deg, ${COLORS.mint}40, ${COLORS.emerald}30)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Dumbbell size={22} color={COLORS.teal} strokeWidth={1.6} />
                </div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif" }}>Sarah, trainer</div>
                  <div style={{ fontSize: 13, color: "#5a7a88" }}>6 clients today</div>
                </div>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "#5a7a88", fontFamily: "'DM Sans', sans-serif" }}>
                She opens Milton and sees a daily brief: two clients missed check-ins this week, one hit a new PR streak worth celebrating, and a new client&apos;s nutrition log is trending off-plan. She didn&apos;t have to dig for any of this. Her follow-up messages are drafted. Her programming adjustments are suggested. She reviews, tweaks, sends - and she&apos;s coaching in <span style={{ fontWeight: 700, color: COLORS.navy }}>4 minutes, not 40.</span>
              </p>
              {/* Visual Placeholder */}
              <div style={{
                marginTop: 24, width: "100%", aspectRatio: "16/10", borderRadius: 16,
                background: `linear-gradient(145deg, ${COLORS.navy}06, ${COLORS.teal}04)`,
                border: `2px dashed ${COLORS.teal}20`,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
              }}>
                <MessageSquare size={28} color={COLORS.teal} strokeWidth={1} style={{ opacity: 0.3 }} />
                <span style={{ fontSize: 12, color: COLORS.teal, opacity: 0.5 }}>Trainer Daily Brief Visual</span>
              </div>
            </div>

            {/* Owner's story */}
            <div style={{ ...lc, padding: "clamp(28px, 3vw, 40px)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14, background: `linear-gradient(135deg, ${COLORS.teal}30, ${COLORS.deepTeal}20)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Building2 size={22} color={COLORS.teal} strokeWidth={1.6} />
                </div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif" }}>You, the owner</div>
                  <div style={{ fontSize: 13, color: "#5a7a88" }}>11 trainers on the floor this week</div>
                </div>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "#5a7a88", fontFamily: "'DM Sans', sans-serif" }}>
                You open Milton and see that one trainer&apos;s client retention is dropping, two new hires are ahead of their ramp benchmarks, and your 6pm time slots are under-utilized across the board. You didn&apos;t ask for a report. You didn&apos;t pull a spreadsheet. <span style={{ fontWeight: 700, color: COLORS.navy }}>The patterns are just there.</span>
              </p>
              {/* Visual Placeholder */}
              <div style={{
                marginTop: 24, width: "100%", aspectRatio: "16/10", borderRadius: 16,
                background: `linear-gradient(145deg, ${COLORS.navy}06, ${COLORS.teal}04)`,
                border: `2px dashed ${COLORS.teal}20`,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
              }}>
                <BarChart3 size={28} color={COLORS.teal} strokeWidth={1} style={{ opacity: 0.3 }} />
                <span style={{ fontSize: 12, color: COLORS.teal, opacity: 0.5 }}>Owner Dashboard Visual</span>
              </div>
            </div>
          </div>

          {/* Closing line */}
          <div style={{
            marginTop: "clamp(40px, 5vw, 64px)", padding: "clamp(24px, 3vw, 40px)",
            borderRadius: 20, background: `linear-gradient(135deg, ${COLORS.mint}15, ${COLORS.emerald}08)`,
            border: `1px solid ${COLORS.emerald}20`, textAlign: "center",
          }}>
            <p style={{ fontSize: "clamp(15px, 1.8vw, 18px)", lineHeight: 1.7, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif", maxWidth: 720, margin: "0 auto" }}>
              No new login for your trainers to fight. Milton meets them inside the workflow they already have - daily brief, suggested actions, one-tap follow-ups. <span style={{ fontWeight: 700, color: COLORS.teal }}>The learning curve is days, not weeks.</span>
            </p>
          </div>
        </div>
      </Section>

      {/* =========== SECTION 6: HOW IT WORKS =========== */}
      <Section id="how-it-works" style={{ padding: "clamp(80px, 10vw, 140px) clamp(20px, 4vw, 48px)", background: "#fafcfd" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(48px, 6vw, 80px)" }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: COLORS.teal, fontFamily: "'DM Sans', sans-serif" }}>How It Works</span>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, lineHeight: 1.12,
              fontFamily: "'DM Sans', sans-serif", color: COLORS.navy,
              marginTop: 16, letterSpacing: -1,
            }}>
              Live in 2 weeks, <span style={{ color: COLORS.teal }}>not 2 quarters.</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(24px, 3vw, 40px)" }}>
            {[
              {
                num: "01",
                icon: Plug,
                title: "Connect your existing tools",
                desc: "Milton layers on top of your current gym software. Your scheduling, billing, and membership systems stay exactly where they are.",
              },
              {
                num: "02",
                icon: ClipboardList,
                title: "Upload your coaching playbook",
                desc: "Share your SOPs, programming templates, and best practices. Milton learns what \"great\" looks like at your gym - not someone else's.",
              },
              {
                num: "03",
                icon: Zap,
                title: "Your team gets smarter, fast",
                desc: "Trainers see AI-guided client insights in their daily workflow. You see performance data across your entire staff. Decisions get easier.",
              },
            ].map(({ num, icon: Icon, title, desc }, i) => (
              <div key={i} style={{ ...lc, padding: "clamp(28px, 3vw, 40px)", textAlign: "center" }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14, margin: "0 auto 24px",
                  background: `${COLORS.teal}10`, border: `1.5px solid ${COLORS.teal}25`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={22} color={COLORS.teal} strokeWidth={1.6} />
                </div>
                <div style={{
                  fontSize: 12, fontWeight: 700, color: COLORS.teal, marginBottom: 12,
                  fontFamily: "'DM Sans', sans-serif", letterSpacing: 1,
                }}>STEP {num}</div>
                <h3 style={{ fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: COLORS.navy, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>
                  {title}
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "#5a7a88", fontFamily: "'DM Sans', sans-serif" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* =========== SECTION 7: EARLY RESULTS =========== */}
      <Section style={{ padding: "clamp(80px, 10vw, 140px) clamp(20px, 4vw, 48px)", background: "white" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(48px, 6vw, 80px)" }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: COLORS.teal, fontFamily: "'DM Sans', sans-serif" }}>Early Results</span>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, lineHeight: 1.12,
              fontFamily: "'DM Sans', sans-serif", color: COLORS.navy,
              marginTop: 16, letterSpacing: -1,
            }}>
              We don&apos;t expect you to take our word for it.
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "clamp(24px, 3vw, 40px)" }}>
            {/* Testimonial 1 */}
            <div style={{ ...lc, padding: "clamp(28px, 3vw, 40px)" }}>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif" }}>Athletica Health &amp; Fitness</div>
              </div>
              <blockquote style={{ fontSize: 15, lineHeight: 1.7, color: "#5a7a88", fontFamily: "'DM Sans', sans-serif", fontStyle: "italic", marginBottom: 24 }}>
                &ldquo;We onboarded 8 trainers in 10 days. Within the first month, our new hires were following up with clients at the same rate as our 3-year veterans. That&apos;s never happened before.&rdquo;
              </blockquote>
              <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.navy }}>- Brett Reynolds, Owner</div>
              <div style={{
                marginTop: 24, padding: "16px 20px", borderRadius: 12,
                background: `${COLORS.emerald}08`, border: `1px solid ${COLORS.emerald}15`,
                display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center",
              }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: "#5a7a88", marginBottom: 4 }}>Check-in completion</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.teal }}>[X]%</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: "#5a7a88", marginBottom: 4 }}>Clients lost during transitions</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.teal }}>[X] fewer</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: "#5a7a88", marginBottom: 4 }}>Hours saved/week</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.teal }}>[X]</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div style={{ ...lc, padding: "clamp(28px, 3vw, 40px)" }}>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif" }}>Optimal Performance</div>
              </div>
              <blockquote style={{ fontSize: 15, lineHeight: 1.7, color: "#5a7a88", fontFamily: "'DM Sans', sans-serif", fontStyle: "italic", marginBottom: 24 }}>
                &ldquo;Milton showed us things about our own operation we couldn&apos;t see - which trainers were losing clients and why, where scheduling gaps were costing us revenue. We made one scheduling change that paid for the platform in week two.&rdquo;
              </blockquote>
              <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.navy }}>- Bethany [Last Name], Director</div>
              <div style={{
                marginTop: 24, padding: "16px 20px", borderRadius: 12,
                background: `${COLORS.emerald}08`, border: `1px solid ${COLORS.emerald}15`,
                display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center",
              }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: "#5a7a88", marginBottom: 4 }}>Trainer utilization</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.teal }}>[X]%</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: "#5a7a88", marginBottom: 4 }}>Retention lift (90 days)</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.teal }}>[X]%</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: "#5a7a88", marginBottom: 4 }}>ROI positive in</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.teal }}>[X] weeks</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* =========== SECTION 8: WHO IT'S FOR =========== */}
      <Section style={{ padding: "clamp(80px, 10vw, 140px) clamp(20px, 4vw, 48px)", background: "#fafcfd" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(48px, 6vw, 80px)" }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: COLORS.teal, fontFamily: "'DM Sans', sans-serif" }}>Who It&apos;s For</span>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, lineHeight: 1.12,
              fontFamily: "'DM Sans', sans-serif", color: COLORS.navy,
              marginTop: 16, letterSpacing: -1,
            }}>
              Built for owners who manage trainers, <span style={{ color: COLORS.teal }}>not just memberships.</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(24px, 3vw, 40px)" }}>
            {[
              {
                icon: Building2,
                title: "Gym Owners",
                desc: "You have 5-30 trainers and no way to know if they're all delivering the same quality. Milton gives you that visibility.",
              },
              {
                icon: Users,
                title: "Fitness Directors",
                desc: "You're responsible for staff development and retention but flying blind on performance data. Milton is your operating system.",
              },
              {
                icon: Target,
                title: "Multi-Location Operators",
                desc: "Consistency across locations is your biggest challenge. Milton standardizes coaching quality without micromanaging.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} style={{ ...lc, padding: "clamp(28px, 3vw, 40px)" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 16, marginBottom: 24,
                  background: `${COLORS.teal}08`, border: `1.5px solid ${COLORS.teal}20`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={26} color={COLORS.teal} strokeWidth={1.6} />
                </div>
                <h3 style={{ fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: COLORS.navy, marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>
                  {title}
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "#5a7a88", fontFamily: "'DM Sans', sans-serif" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* =========== SECTION 9: LET'S BE CLEAR =========== */}
      <Section style={{ padding: "clamp(80px, 10vw, 140px) clamp(20px, 4vw, 48px)", background: "white" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, lineHeight: 1.12,
            fontFamily: "'DM Sans', sans-serif", color: COLORS.navy,
            textAlign: "center", marginBottom: "clamp(48px, 6vw, 64px)", letterSpacing: -1,
          }}>
            Let&apos;s be clear.
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "clamp(32px, 4vw, 48px)" }}>
            {/* Milton is NOT */}
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#5a7a88", marginBottom: 24, fontFamily: "'DM Sans', sans-serif" }}>Milton is not:</h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  "A replacement for your gym management software",
                  "A client-facing fitness app",
                  "Another CRM you need to maintain",
                  "A tool that requires months of setup",
                ].map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <X size={20} color="#e74c3c" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 15, lineHeight: 1.6, color: "#5a7a88", fontFamily: "'DM Sans', sans-serif" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Milton IS */}
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.navy, marginBottom: 24, fontFamily: "'DM Sans', sans-serif" }}>Milton is:</h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  "An intelligence layer for your training staff",
                  "A coaching consistency tool for owners and directors",
                  "An operational dashboard that surfaces what you can't see today",
                  "Live in weeks, not months",
                ].map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <Check size={20} color={COLORS.emerald} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 15, lineHeight: 1.6, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* =========== SECTION 10: FAQ =========== */}
      <Section style={{ padding: "clamp(80px, 10vw, 140px) clamp(20px, 4vw, 48px)", background: "#fafcfd" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, lineHeight: 1.12,
            fontFamily: "'DM Sans', sans-serif", color: COLORS.navy,
            textAlign: "center", marginBottom: "clamp(48px, 6vw, 64px)", letterSpacing: -1,
          }}>
            Questions we&apos;d ask too.
          </h2>

          <div style={{ borderTop: "1px solid rgba(2,98,120,.08)" }}>
            <FAQItem
              question="Do my trainers need to learn a new platform?"
              answer="Barely. Milton's trainer experience is a daily brief and suggested actions - not a complex dashboard. Most trainers are up and running in their first week. We also provide hands-on onboarding for your team, not a link to a help center."
            />
            <FAQItem
              question="How does Milton integrate with my current software?"
              answer="Milton layers on top of tools like Mindbody, ABC Fitness, Trainerize, and TrueCoach. Your billing, payments, scheduling, and memberships stay where they are. Milton reads data from those systems and adds intelligence - it doesn't replace them."
            />
            <FAQItem
              question="You're a small company. How do I know you'll be around?"
              answer="Fair question. Milton is built by a team that's been in the health coaching data space for years. We're intentionally working with a small group of gyms right now because we want to get this right, not because we're struggling. Our early partners get direct access to the founding team, and your data is portable - you're never locked in."
            />
            <FAQItem
              question="Didn't Milton start as a healthcare tool?"
              answer="It did. That's where we learned how to turn coaching data into outcomes at scale - in one of the most regulated, high-stakes environments in health. We brought that rigor to the fitness industry because the problem is the same: coaches need better data, and the people managing them need visibility. The healthcare DNA is a feature, not a pivot."
            />
            <FAQItem
              question="Who owns my data?"
              answer="You do. Full stop. We don't sell your data, we don't train public AI models on it, and if you cancel, your data is exported and deleted. Milton is built with healthcare-grade data practices - not because we're required to, but because it's the right standard."
            />
            <FAQItem
              question="What does Milton cost?"
              answer="Pricing is based on the size of your training staff. We'd rather walk you through the ROI math on a call - most gym owners find the platform pays for itself through reduced trainer ramp time and improved client retention within the first 60 days. Book a demo and we'll build the case with your real numbers."
            />
            <FAQItem
              question="Why can't I just hire a better head trainer?"
              answer="You should - and Milton makes them more effective. A great head trainer still can't be in every session, review every client's nutrition log, or catch every scheduling gap across 10+ trainers. Milton gives your best leader the data to actually scale their instincts across the whole team, instead of relying on walk-the-floor intuition."
            />
          </div>
        </div>
      </Section>

      {/* =========== SECTION 11: FINAL CTA =========== */}
      <Section style={{ padding: "clamp(100px, 12vw, 180px) clamp(20px, 4vw, 48px)", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(145deg, ${COLORS.navy}, ${COLORS.deepTeal})`,
        }} />
        {/* Decorative */}
        <div style={{ position: "absolute", top: -200, right: -200, width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.emerald}10, transparent 70%)` }} />
        <div style={{ position: "absolute", bottom: -150, left: -150, width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.teal}10, transparent 70%)` }} />

        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <h2 style={{
            fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, lineHeight: 1.1,
            fontFamily: "'DM Sans', sans-serif", color: "white", letterSpacing: -1.5,
          }}>
            Stop losing clients to <span style={{ color: COLORS.emerald }}>inconsistent coaching.</span>
          </h2>
          <p style={{ fontSize: "clamp(16px, 1.8vw, 19px)", lineHeight: 1.7, color: "rgba(255,255,255,.7)", marginTop: 24, fontFamily: "'DM Sans', sans-serif", maxWidth: 560, margin: "24px auto 0" }}>
            See how Milton gives your entire training staff the tools, data, and playbook to perform at their best - every session.
          </p>
          <button onClick={() => setShowDemo(true)} style={{
            marginTop: 40, padding: "18px 48px", borderRadius: 14, border: "none",
            background: COLORS.emerald,
            color: COLORS.navy, fontSize: 17, fontWeight: 700, cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            transition: "all 0.3s",
            boxShadow: `0 8px 32px rgba(46,229,177,.3)`,
            display: "inline-flex", alignItems: "center", gap: 8,
          }}>
            Book a Demo <ChevronRight size={20} />
          </button>
        </div>
      </Section>

      </>)}

      {/* =========== FOOTER =========== */}
      <footer style={{
        padding: "clamp(48px, 6vw, 80px) clamp(20px, 4vw, 48px) clamp(32px, 4vw, 48px)",
        background: "white",
        borderTop: "1px solid rgba(2,98,120,.08)",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "clamp(32px, 4vw, 48px)" }}>
            {/* Logo + tagline */}
            <div style={{ flex: "1 1 240px", minWidth: 200, maxWidth: 280 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, overflow: "hidden" }}>
                  <img src={MILTON_LOGO} alt="Milton" style={{ width: 30, height: 30, borderRadius: 8, objectFit: "cover" }} />
                </div>
                <span style={{ fontSize: 17, fontWeight: 700, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif" }}>Milton</span>
              </div>
              <p style={{ fontSize: 13, color: "#5a7a88", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>
                AI-powered trainer intelligence for gym owners and fitness directors.
              </p>
              <p style={{ fontSize: 12, color: "#9ab5c0", fontFamily: "'DM Sans', sans-serif", marginTop: 16 }}>
                &copy; 2026 Milton AI - All rights reserved.
              </p>
            </div>
            {/* Link columns */}
            {[
              { title: "Product", links: [{ label: "How It Works", href: "#how-it-works" }, { label: "Book a Demo", action: () => setShowDemo(true) }] },
              { title: "Connect", links: [
                { label: "LinkedIn", href: "https://www.linkedin.com/company/milton-ai" },
                { label: "Instagram", href: "https://www.instagram.com/milton_ai" },
                { label: "X (Twitter)", href: "https://x.com/getmilton_ai" },
              ] },
            ].map(({ title, links }, i) => (
              <div key={i} style={{ flex: "0 0 auto", minWidth: 140 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif", marginBottom: 16 }}>{title}</div>
                {links.map((link, j) => (
                  link.action ? (
                    <button key={j} onClick={link.action} style={{
                      display: "block", fontSize: 14, color: "#5a7a88", background: "none", border: "none", cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif", padding: "6px 0", textAlign: "left",
                    }}>{link.label}</button>
                  ) : (
                    <a key={j}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      style={{
                        display: "block", fontSize: 14, color: "#5a7a88", textDecoration: "none",
                        fontFamily: "'DM Sans', sans-serif", padding: "6px 0", transition: "color 0.2s",
                      }}
                    >{link.label}</a>
                  )
                ))}
              </div>
            ))}
          </div>
        </div>
      </footer>
      <DemoModal open={showDemo} onClose={() => setShowDemo(false)} />
    </div>
  );
}
