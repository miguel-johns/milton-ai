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
  ChevronDown, X as XIcon, AlertTriangle, FileText, Layers
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

const MILTON_LOGO = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAQ4BDgDASIAAhEBAxEB/8QAHQABAAIDAQEBAQAAAAAAAAAAAAcIBAUGAwIJCf/EAF0QAAEDAwEDBwcIBgUJBAgGAwABAgMEBREGBxIhEzFBUWFxgQgUIjKRobEVI0JSYnKSwTOCorLC0SNDU3OTNERVY5OUs+HwFzRWg6TiJzU3RsPxZGWE/8QAGwEBAAIDAQEAAAAAAAAAAAAAAAQGAgMFAQf/xAA9EQEAAgECAwQHBwMDBQADAQAAAQIDBBEFITEGEkFREyJhcZGx0RQygaHB4fAzQlIjNPEVFiRTYkNygqL/2gAMAwEAAhEDEQA/ALFAAqqiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA...";

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
              The first AI co-pilot for your <span style={{ color: COLORS.teal }}>personal training business.</span>
            </h1>
            <p style={{
              fontSize: "clamp(16px, 1.8vw, 19px)", lineHeight: 1.7, color: "#5a7a88", maxWidth: 540,
              marginTop: 28, fontFamily: "'DM Sans', sans-serif",
              animation: "fadeUp 0.8s ease 0.2s both",
            }}>
              Milton gives every trainer on your staff the intelligence to drive attendance, follow-up, retention, and results - and gives you the visibility to see it all happening in real time.
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
                Watch How It Works
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
            Milton isn&apos;t a replacement for your gym software. It&apos;s the intelligence layer that sits on top. <span style={{ color: COLORS.emerald }}>Your billing, payments, and memberships stay exactly where they are.</span>
          </p>
        </div>
      </section>

      {/* =========== SECTION 3: THE REAL PROBLEM =========== */}
      <Section style={{ padding: "clamp(80px, 10vw, 140px) clamp(20px, 4vw, 48px)", background: "white" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(32px, 4vw, 48px)" }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: COLORS.teal, fontFamily: "'DM Sans', sans-serif" }}>The Real Problem</span>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, lineHeight: 1.12,
              fontFamily: "'DM Sans', sans-serif", color: COLORS.navy,
              marginTop: 16, letterSpacing: -1,
            }}>
              You sell personal training. So why is trainer performance <span style={{ color: COLORS.teal }}>the one thing you can&apos;t manage?</span>
            </h2>
          </div>

          {/* Intro paragraphs */}
          <div style={{ maxWidth: 800, margin: "0 auto clamp(48px, 6vw, 64px)", textAlign: "center" }}>
            <p style={{ fontSize: "clamp(15px, 1.6vw, 17px)", lineHeight: 1.8, color: "#5a7a88", fontFamily: "'DM Sans', sans-serif" }}>
              Your entire business runs on one thing: trainers getting clients results. But finding great trainers is hard. Keeping them is harder. And helping every trainer on your staff perform like your best one? That&apos;s damn near impossible without a system built for it.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "clamp(24px, 3vw, 32px)" }}>
            {/* Card 1 */}
            <div style={{ ...lc, padding: "clamp(28px, 3vw, 40px)", display: "flex", flexDirection: "column" }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14, marginBottom: 24,
                background: `${COLORS.teal}08`, border: `1.5px solid ${COLORS.teal}20`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <ArrowUpRight size={22} color={COLORS.teal} strokeWidth={1.6} />
              </div>
              <h3 style={{ fontSize: "clamp(17px, 2vw, 20px)", fontWeight: 700, color: COLORS.navy, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>
                Your best trainers leave - and the business leaves with them
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "#5a7a88", fontFamily: "'DM Sans', sans-serif" }}>
                They build client relationships, develop their own systems, outgrow your gym, and take half their book with them. You don&apos;t just lose a trainer. You lose the revenue, the retention, and the playbook they never wrote down.
              </p>
            </div>

            {/* Card 2 */}
            <div style={{ ...lc, padding: "clamp(28px, 3vw, 40px)", display: "flex", flexDirection: "column" }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14, marginBottom: 24,
                background: `${COLORS.teal}08`, border: `1.5px solid ${COLORS.teal}20`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Clock size={22} color={COLORS.teal} strokeWidth={1.6} />
              </div>
              <h3 style={{ fontSize: "clamp(17px, 2vw, 20px)", fontWeight: 700, color: COLORS.navy, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>
                New trainers take months before they stop costing you clients
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "#5a7a88", fontFamily: "'DM Sans', sans-serif" }}>
                Every new hire is a gamble. They&apos;re learning on your clients, missing follow-ups, and delivering an inconsistent experience while your veterans carry the floor. By the time they&apos;re good, you&apos;ve already lost the members who noticed.
              </p>
            </div>

            {/* Card 3 */}
            <div style={{ ...lc, padding: "clamp(28px, 3vw, 40px)", display: "flex", flexDirection: "column" }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14, marginBottom: 24,
                background: `${COLORS.teal}08`, border: `1.5px solid ${COLORS.teal}20`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Layers size={22} color={COLORS.teal} strokeWidth={1.6} />
              </div>
              <h3 style={{ fontSize: "clamp(17px, 2vw, 20px)", fontWeight: 700, color: COLORS.navy, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>
                Tracking all of this is a patchwork nightmare
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "#5a7a88", fontFamily: "'DM Sans', sans-serif" }}>
                Who&apos;s executing? Who&apos;s getting results? Who&apos;s retaining clients and who&apos;s bleeding them? The answers exist - scattered across Mindbody reports, health trackers, scheduling tools, and spreadsheets you built yourself because nothing else connected the dots.
              </p>
            </div>
          </div>

          {/* Closing paragraph */}
          <div style={{
            marginTop: "clamp(48px, 6vw, 64px)", padding: "clamp(24px, 3vw, 40px)",
            borderRadius: 20, background: `linear-gradient(135deg, ${COLORS.mint}12, ${COLORS.emerald}08)`,
            border: `1px solid ${COLORS.emerald}15`, maxWidth: 900, margin: "clamp(48px, 6vw, 64px) auto 0",
          }}>
            <p style={{ fontSize: "clamp(15px, 1.6vw, 17px)", lineHeight: 1.8, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif", textAlign: "center" }}>
              You want every trainer performing like your best trainer. But without one connected system that aids them in the moment, develops them over time, and tracks the business metrics that actually matter - <span style={{ fontWeight: 700, color: COLORS.teal }}>you&apos;re managing the most important part of your business with duct tape and gut feel.</span>
            </p>
          </div>
        </div>
      </Section>

      {/* =========== SECTION 4: ONE PLATFORM, THREE REPORTS =========== */}
      <Section style={{ padding: "clamp(80px, 10vw, 140px) clamp(20px, 4vw, 48px)", background: "#fafcfd" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(48px, 6vw, 80px)" }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: COLORS.teal, fontFamily: "'DM Sans', sans-serif" }}>One Platform, Three Reports, Zero Spreadsheets</span>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, lineHeight: 1.12,
              fontFamily: "'DM Sans', sans-serif", color: COLORS.navy,
              marginTop: 16, letterSpacing: -1,
            }}>
              One system for the thing that <span style={{ color: COLORS.teal }}>is your business.</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "clamp(24px, 3vw, 32px)" }}>
            {/* Execution */}
            <div style={{ ...lc, padding: 0, overflow: "hidden" }}>
              {/* Image placeholder */}
              <div style={{
                width: "100%", aspectRatio: "16/9",
                background: `linear-gradient(135deg, ${COLORS.teal}08, ${COLORS.mint}05)`,
                borderBottom: `1px solid ${COLORS.teal}10`,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12,
              }}>
                <ClipboardList size={32} color={COLORS.teal} strokeWidth={1.2} style={{ opacity: 0.4 }} />
                <span style={{ fontSize: 12, color: COLORS.teal, opacity: 0.6, fontWeight: 500 }}>[Execution Report Screenshot]</span>
              </div>
              <div style={{ padding: "clamp(24px, 3vw, 32px)" }}>
                <h3 style={{ fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: COLORS.navy, marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>
                  Execution
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "#5a7a88", fontFamily: "'DM Sans', sans-serif" }}>
                  Are your trainers following up, scheduling, programming, checking in? Milton scores it by trainer, by week - automatically. When a coach falls behind, you see it in days, not at month-end.
                </p>
              </div>
            </div>

            {/* Results */}
            <div style={{ ...lc, padding: 0, overflow: "hidden" }}>
              {/* Image placeholder */}
              <div style={{
                width: "100%", aspectRatio: "16/9",
                background: `linear-gradient(135deg, ${COLORS.teal}08, ${COLORS.mint}05)`,
                borderBottom: `1px solid ${COLORS.teal}10`,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12,
              }}>
                <TrendingUp size={32} color={COLORS.teal} strokeWidth={1.2} style={{ opacity: 0.4 }} />
                <span style={{ fontSize: 12, color: COLORS.teal, opacity: 0.6, fontWeight: 500 }}>[Results Report Screenshot]</span>
              </div>
              <div style={{ padding: "clamp(24px, 3vw, 32px)" }}>
                <h3 style={{ fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: COLORS.navy, marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>
                  Results
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "#5a7a88", fontFamily: "'DM Sans', sans-serif" }}>
                  Are clients reaching their goals? Milton connects programming, nutrition, and health data to show who&apos;s progressing, plateauing, or declining - without pulling from three different trackers.
                </p>
              </div>
            </div>

            {/* Retention & Growth */}
            <div style={{ ...lc, padding: 0, overflow: "hidden" }}>
              {/* Image placeholder */}
              <div style={{
                width: "100%", aspectRatio: "16/9",
                background: `linear-gradient(135deg, ${COLORS.teal}08, ${COLORS.mint}05)`,
                borderBottom: `1px solid ${COLORS.teal}10`,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12,
              }}>
                <Users size={32} color={COLORS.teal} strokeWidth={1.2} style={{ opacity: 0.4 }} />
                <span style={{ fontSize: 12, color: COLORS.teal, opacity: 0.6, fontWeight: 500 }}>[Retention Report Screenshot]</span>
              </div>
              <div style={{ padding: "clamp(24px, 3vw, 32px)" }}>
                <h3 style={{ fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: COLORS.navy, marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>
                  Retention &amp; Growth
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "#5a7a88", fontFamily: "'DM Sans', sans-serif" }}>
                  Client count. New clients. Attendance. Churn. Milton generates the monthly picture continuously - not once a month when someone has time to update the sheet.
                </p>
              </div>
            </div>

            {/* Where They're Getting Stuck */}
            <div style={{ ...lc, padding: 0, overflow: "hidden" }}>
              {/* Image placeholder */}
              <div style={{
                width: "100%", aspectRatio: "16/9",
                background: `linear-gradient(135deg, ${COLORS.emerald}08, ${COLORS.mint}05)`,
                borderBottom: `1px solid ${COLORS.emerald}10`,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12,
              }}>
                <AlertTriangle size={32} color={COLORS.emerald} strokeWidth={1.2} style={{ opacity: 0.4 }} />
                <span style={{ fontSize: 12, color: COLORS.emerald, opacity: 0.6, fontWeight: 500 }}>[Diagnostics Screenshot]</span>
              </div>
              <div style={{ padding: "clamp(24px, 3vw, 32px)" }}>
                <h3 style={{ fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: COLORS.navy, marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>
                  Where They&apos;re Getting Stuck
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "#5a7a88", fontFamily: "'DM Sans', sans-serif" }}>
                  A trainer&apos;s clients are churning - is it execution or results? Milton connects all three layers so you can pinpoint the breakdown and coach to the right problem.
                </p>
              </div>
            </div>
          </div>

          {/* Closing statement */}
          <div style={{
            marginTop: "clamp(32px, 4vw, 48px)", padding: "clamp(24px, 3vw, 40px)",
            borderRadius: 20, background: `${COLORS.teal}08`,
            maxWidth: 900, margin: "clamp(32px, 4vw, 48px) auto 0", textAlign: "center",
            border: `1px solid ${COLORS.teal}15`,
          }}>
            <p style={{ fontSize: "clamp(15px, 1.8vw, 18px)", lineHeight: 1.8, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif" }}>
              When you can see execution, results, and retention across your entire staff - without rebuilding three spreadsheets every week - <span style={{ color: COLORS.teal, fontWeight: 600 }}>you stop managing by gut and start managing by signal.</span>
            </p>
          </div>
        </div>
      </Section>

      {/* =========== SECTION 5: THE COACHING PORTAL =========== */}
      <Section style={{ padding: "clamp(80px, 10vw, 140px) clamp(20px, 4vw, 48px)", background: "white" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(32px, 4vw, 48px)" }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: COLORS.teal, fontFamily: "'DM Sans', sans-serif" }}>For Every Trainer On Your Staff</span>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, lineHeight: 1.12,
              fontFamily: "'DM Sans', sans-serif", color: COLORS.navy,
              marginTop: 16, letterSpacing: -1,
            }}>
              Your best trainer&apos;s intelligence, <span style={{ color: COLORS.teal }}>available to every trainer.</span>
            </h2>
          </div>

          {/* Intro text */}
          <div style={{ maxWidth: 800, margin: "0 auto clamp(48px, 6vw, 64px)", textAlign: "center" }}>
            <p style={{ fontSize: "clamp(15px, 1.6vw, 17px)", lineHeight: 1.8, color: "#5a7a88", fontFamily: "'DM Sans', sans-serif" }}>
              Your best trainer doesn&apos;t just show up and count reps. They know which client&apos;s body scan is trending the wrong direction. They notice when someone&apos;s nutrition logs go quiet. They remember who needs a check-in today and who needs space. They connect dots across devices, data, and conversation - and they do it instinctively.
            </p>
            <p style={{ fontSize: "clamp(16px, 1.8vw, 19px)", lineHeight: 1.8, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, marginTop: 24 }}>
              Now every trainer on your staff can do it too.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "clamp(24px, 3vw, 32px)" }}>
            {/* Feature 1 - Unified View */}
            <div style={{ ...lc, padding: 0, overflow: "hidden" }}>
              {/* Image placeholder */}
              <div style={{
                width: "100%", aspectRatio: "16/9",
                background: `linear-gradient(135deg, ${COLORS.navy}06, ${COLORS.teal}04)`,
                borderBottom: `1px solid ${COLORS.teal}10`,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12,
              }}>
                <Eye size={32} color={COLORS.teal} strokeWidth={1.2} style={{ opacity: 0.4 }} />
                <span style={{ fontSize: 12, color: COLORS.teal, opacity: 0.6, fontWeight: 500 }}>[Unified Client View Screenshot]</span>
              </div>
              <div style={{ padding: "clamp(24px, 3vw, 32px)" }}>
                <h3 style={{ fontSize: "clamp(17px, 2vw, 20px)", fontWeight: 700, color: COLORS.navy, marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>
                  Wearables, body scans, nutrition logs - one view.
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "#5a7a88", fontFamily: "'DM Sans', sans-serif" }}>
                  Milton pulls device data, InBody scans, nutrition tracking, and session history into a single coaching view. Your trainer doesn&apos;t need to check four apps. The full client picture is right there.
                </p>
              </div>
            </div>

            {/* Feature 2 - AI Programming */}
            <div style={{ ...lc, padding: 0, overflow: "hidden" }}>
              {/* Image placeholder */}
              <div style={{
                width: "100%", aspectRatio: "16/9",
                background: `linear-gradient(135deg, ${COLORS.navy}06, ${COLORS.teal}04)`,
                borderBottom: `1px solid ${COLORS.teal}10`,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12,
              }}>
                <Brain size={32} color={COLORS.teal} strokeWidth={1.2} style={{ opacity: 0.4 }} />
                <span style={{ fontSize: 12, color: COLORS.teal, opacity: 0.6, fontWeight: 500 }}>[AI Programming Screenshot]</span>
              </div>
              <div style={{ padding: "clamp(24px, 3vw, 32px)" }}>
                <h3 style={{ fontSize: "clamp(17px, 2vw, 20px)", fontWeight: 700, color: COLORS.navy, marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>
                  AI-guided programming that adapts to real outcomes.
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "#5a7a88", fontFamily: "'DM Sans', sans-serif" }}>
                  Not cookie-cutter templates. Milton sees what&apos;s working for each client - based on actual results, not guesswork - and suggests adjustments your trainer can review and apply in seconds.
                </p>
              </div>
            </div>

            {/* Feature 3 - Follow-ups */}
            <div style={{ ...lc, padding: 0, overflow: "hidden" }}>
              {/* Image placeholder */}
              <div style={{
                width: "100%", aspectRatio: "16/9",
                background: `linear-gradient(135deg, ${COLORS.navy}06, ${COLORS.teal}04)`,
                borderBottom: `1px solid ${COLORS.teal}10`,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12,
              }}>
                <MessageSquare size={32} color={COLORS.teal} strokeWidth={1.2} style={{ opacity: 0.4 }} />
                <span style={{ fontSize: 12, color: COLORS.teal, opacity: 0.6, fontWeight: 500 }}>[Follow-up System Screenshot]</span>
              </div>
              <div style={{ padding: "clamp(24px, 3vw, 32px)" }}>
                <h3 style={{ fontSize: "clamp(17px, 2vw, 20px)", fontWeight: 700, color: COLORS.navy, marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>
                  The follow-up that separates good trainers from great ones.
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "#5a7a88", fontFamily: "'DM Sans', sans-serif" }}>
                  Milton drafts check-ins, flags clients who need attention, and prompts the conversations that keep clients engaged between sessions. The stuff your best trainer does naturally - systematized for everyone.
                </p>
              </div>
            </div>

            {/* Feature 4 - Mobile Intelligence */}
            <div style={{ ...lc, padding: 0, overflow: "hidden" }}>
              {/* Image placeholder */}
              <div style={{
                width: "100%", aspectRatio: "16/9",
                background: `linear-gradient(135deg, ${COLORS.navy}06, ${COLORS.teal}04)`,
                borderBottom: `1px solid ${COLORS.teal}10`,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12,
              }}>
                <Smartphone size={32} color={COLORS.teal} strokeWidth={1.2} style={{ opacity: 0.4 }} />
                <span style={{ fontSize: 12, color: COLORS.teal, opacity: 0.6, fontWeight: 500 }}>[Mobile App Screenshot]</span>
              </div>
              <div style={{ padding: "clamp(24px, 3vw, 32px)" }}>
                <h3 style={{ fontSize: "clamp(17px, 2vw, 20px)", fontWeight: 700, color: COLORS.navy, marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>
                  A better trainer&apos;s brain, in their pocket, 24/7.
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "#5a7a88", fontFamily: "'DM Sans', sans-serif" }}>
                  Your newest hire walks onto the floor with the same client intelligence your ten-year veteran carries in their head. Not replacing the human connection - powering it with data that was always there but never connected.
                </p>
              </div>
            </div>
          </div>

          {/* Closing statement */}
          <div style={{
            marginTop: "clamp(48px, 6vw, 64px)",
            padding: "clamp(24px, 3vw, 40px)",
            borderRadius: 20, background: `linear-gradient(135deg, ${COLORS.mint}15, ${COLORS.emerald}08)`,
            border: `1px solid ${COLORS.emerald}20`,
            maxWidth: 900, margin: "clamp(48px, 6vw, 64px) auto 0",
            textAlign: "center",
          }}>
            <p style={{ fontSize: "clamp(15px, 1.6vw, 17px)", lineHeight: 1.8, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif" }}>
              Milton makes progress visual for your coaches - in real time, in the flow of their work - so they can see what&apos;s happening with every client and <span style={{ fontWeight: 700, color: COLORS.teal }}>coach them to results, not just through workouts.</span>
            </p>
          </div>
        </div>
      </Section>

      {/* =========== SECTION 6: A DAY WITH MILTON =========== */}
      <Section style={{ padding: "clamp(80px, 10vw, 140px) clamp(20px, 4vw, 48px)", background: "#fafcfd" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(48px, 6vw, 80px)" }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: COLORS.teal, fontFamily: "'DM Sans', sans-serif" }}>What Actually Changes</span>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, lineHeight: 1.12,
              fontFamily: "'DM Sans', sans-serif", color: COLORS.navy,
              marginTop: 16, letterSpacing: -1,
            }}>
              Tuesday morning. <span style={{ color: COLORS.teal }}>No spreadsheets. No guessing.</span>
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
                Daily brief: one client missed two sessions, one hit a 12-week streak, one is trending off-plan. Follow-ups drafted. Programming adjustments suggested. She reviews, tweaks, sends. <span style={{ fontWeight: 700, color: COLORS.navy }}>Coaching in 4 minutes, not 40.</span>
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
                  <div style={{ fontSize: 13, color: "#5a7a88" }}>11 trainers on the floor</div>
                </div>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "#5a7a88", fontFamily: "'DM Sans', sans-serif" }}>
                Execution scores are current - two new hires at 60% on follow-ups, rest of the team at 94%. One trainer&apos;s clients are plateauing despite consistent attendance - a programming conversation, not a motivation problem. Another lost three clients in six weeks - you trace it directly to missed check-ins. <span style={{ fontWeight: 700, color: COLORS.navy }}>Same rigor you&apos;d build yourself. Fraction of the time.</span>
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
        </div>
      </Section>

      {/* =========== SECTION 7: HOW IT WORKS =========== */}
      <Section id="how-it-works" style={{ padding: "clamp(80px, 10vw, 140px) clamp(20px, 4vw, 48px)", background: "white" }}>
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
                desc: "Milton layers on top of your current gym software. Everything stays where it is.",
              },
              {
                num: "02",
                icon: FileText,
                title: "Upload your coaching playbook",
                desc: "Your SOPs, your execution scorecard, your standards. Milton doesn't impose a framework. It automates yours.",
              },
              {
                num: "03",
                icon: Zap,
                title: "Your team gets smarter, your Tuesday mornings get shorter",
                desc: "The three reports you built by hand? Milton runs them for you.",
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

      {/* =========== SECTION 8: EARLY RESULTS =========== */}
      <Section style={{ padding: "clamp(80px, 10vw, 140px) clamp(20px, 4vw, 48px)", background: "#fafcfd" }}>
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
                &ldquo;Within the first month, our new hires were following up at the same rate as our 3-year veterans. That&apos;s never happened before.&rdquo;
              </blockquote>
              <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.navy }}>- Brett Reynolds, Owner</div>
              <div style={{
                marginTop: 24, padding: "16px 20px", borderRadius: 12,
                background: `${COLORS.emerald}08`, border: `1px solid ${COLORS.emerald}15`,
                display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center",
              }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: "#5a7a88", marginBottom: 4 }}>Check-in completion increase</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.teal }}>[X]%</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: "#5a7a88", marginBottom: 4 }}>Fewer clients lost in transitions</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.teal }}>[X]</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: "#5a7a88", marginBottom: 4 }}>Hrs/week saved per trainer</div>
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
                &ldquo;Milton showed us which trainers were losing clients and why. We made one scheduling change that paid for the platform in week two.&rdquo;
              </blockquote>
              <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.navy }}>- Bethany [Last Name], Director</div>
              <div style={{
                marginTop: 24, padding: "16px 20px", borderRadius: 12,
                background: `${COLORS.emerald}08`, border: `1px solid ${COLORS.emerald}15`,
                display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center",
              }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: "#5a7a88", marginBottom: 4 }}>Trainer utilization improvement</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.teal }}>[X]%</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: "#5a7a88", marginBottom: 4 }}>Retention lift in 90 days</div>
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

      {/* =========== SECTION 9: WHO IT'S FOR =========== */}
      <Section style={{ padding: "clamp(80px, 10vw, 140px) clamp(20px, 4vw, 48px)", background: "white" }}>
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
                desc: "5-30 trainers and no way to see who's driving attendance and who's losing clients. Milton gives you that visibility.",
              },
              {
                icon: Users,
                title: "Fitness Directors",
                desc: "You built the spreadsheets. Milton automates them.",
              },
              {
                icon: Target,
                title: "Multi-Location Operators",
                desc: "Consistency across locations without micromanaging.",
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

      {/* =========== SECTION 10: LET'S BE CLEAR =========== */}
      <Section style={{ padding: "clamp(80px, 10vw, 140px) clamp(20px, 4vw, 48px)", background: "#fafcfd" }}>
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
                  "Another CRM to maintain",
                  "Months of setup",
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
                  "The first AI co-pilot for personal training businesses",
                  "Execution, client health, and retention - by trainer, in real time",
                  "The three reports you built by hand, running themselves",
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

      {/* =========== SECTION 11: FAQ =========== */}
      <Section style={{ padding: "clamp(80px, 10vw, 140px) clamp(20px, 4vw, 48px)", background: "white" }}>
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
              answer="Barely. Daily brief and suggested actions. Most are running in a week. We onboard your team hands-on."
            />
            <FAQItem
              question="How does it integrate with my current software?"
              answer="Layers on top of Mindbody, ABC Fitness, Trainerize, TrueCoach. Your billing, scheduling, and memberships don't move."
            />
            <FAQItem
              question="You're a small company. How do I know you'll be around?"
              answer="We're working with a small group of gyms intentionally. Early partners get direct access to the founding team. Your data is portable - you're never locked in."
            />
            <FAQItem
              question="Didn't this start as a healthcare tool?"
              answer="Yes. That's where we learned to turn coaching data into outcomes at scale - in one of the most regulated environments in health. The healthcare DNA is a feature, not a pivot."
            />
            <FAQItem
              question="Who owns my data?"
              answer="You do. We don't sell it, we don't train public models on it, and if you cancel, it's exported and deleted. Healthcare-grade data practices by default."
            />
            <FAQItem
              question="What does it cost?"
              answer="Based on team size. Most owners find it pays for itself within 60 days through faster ramp and better retention. Book a demo and we'll build the ROI case with your real numbers."
            />
            <FAQItem
              question="I already built spreadsheets for this. Why do I need Milton?"
              answer="You're exactly who we built this for. Same framework, same rigor - without the hours every week pulling reports, cross-referencing, and double-checking. Milton automates the system you already designed."
            />
            <FAQItem
              question="Why not just hire a better head trainer?"
              answer="You should. Milton makes them more effective. Even the best head trainer can't track execution, results, and retention across 10+ trainers in real time. Milton gives them the data to scale their instincts."
            />
          </div>
        </div>
      </Section>

      {/* =========== SECTION 12: FINAL CTA =========== */}
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
            The first AI co-pilot for personal training. <span style={{ color: COLORS.emerald }}>Built for the people who run it.</span>
          </h2>
          <p style={{ fontSize: "clamp(16px, 1.8vw, 19px)", lineHeight: 1.7, color: "rgba(255,255,255,.7)", marginTop: 24, fontFamily: "'DM Sans', sans-serif", maxWidth: 560, margin: "24px auto 0" }}>
            Attendance. Follow-up. Retention. Results. One system. Every trainer. Every week.
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
              { title: "Connect", links: [{ label: "LinkedIn", href: "#" }, { label: "Twitter", href: "#" }] },
            ].map(({ title, links }, i) => (
              <div key={i} style={{ flex: "0 1 auto", minWidth: 120 }}>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>{title}</h4>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {links.map((link, j) => (
                    <li key={j}>
                      {link.href ? (
                        <a href={link.href} style={{ fontSize: 14, color: "#5a7a88", textDecoration: "none", fontFamily: "'DM Sans', sans-serif" }}>{link.label}</a>
                      ) : (
                        <button onClick={link.action} style={{ fontSize: 14, color: "#5a7a88", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "'DM Sans', sans-serif" }}>{link.label}</button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>

      <DemoModal open={showDemo} onClose={() => setShowDemo(false)} />
    </div>
  );
}
