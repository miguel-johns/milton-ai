import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  ArrowUpRight, Check, Loader, ChevronRight, ChevronDown,
  Users, Brain, Activity, Send, Plug, Smartphone,
  MessageSquare, Calendar, DollarSign, Heart, Settings,
  Menu, X, Clock, Target, BarChart3, UserCheck, Bell,
  Zap, TrendingUp, Award, Coffee, Sun, Building2
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

const MILTON_LOGO = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAQ4BDgDASIAAhEBAxEB/8QAHQABAAIDAQEBAQAAAAAAAAAAAAcIBAUGAwIJCf/EAF0QAAEDAwEDBwcIBgUJBggGAwABAgMEBREGBxIhEzFBUWFxgQgUIjKRobEVI0JSYnKSwTOCorLC0SRTU3STNERVY5OUs+HwFzRWg6TiJzU3RsPxZGWE/8QAGwEBAAIDAQEAAAAAAAAAAAAAAAQGAgMFAQf/xAA9EQEAAgECAwQHBwMDBQADAQAAAQIDBBEFITEGEkFREyJhcZGx0RQygaHB4fAzQlIjNPEVFiRTYkNygqL/2gAMAwEAAhEDEQA/ALFAAqqiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA...";

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
const lc = { borderRadius: 20, background: "white", boxShadow: "0 2px 24px rgba(8,69,94,.06)", border: "1px solid rgba(2,98,120,.06)" };

/* --- Nav --- */
function Nav({ onDemo }) {
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

  const navLinks = ["Operations", "Fitness Directors", "Coaches", "Front Desk", "How It Works"];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? "12px 24px" : "20px 24px",
        background: scrolled ? "rgba(255,255,255,.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(8,69,94,.08)" : "none",
        transition: "all .3s ease",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src={MILTON_LOGO} alt="Milton" style={{ width: 36, height: 36, borderRadius: 10 }} />
            <span style={{ fontSize: 20, fontWeight: 700, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif" }}>Milton</span>
          </div>
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
              {navLinks.map(link => (
                <a key={link} href={`#${link.toLowerCase().replace(/ /g, "-")}`} style={{ fontSize: 14, fontWeight: 500, color: COLORS.navy, textDecoration: "none", fontFamily: "'DM Sans', sans-serif" }}>{link}</a>
              ))}
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {!isMobile && (
              <button onClick={onDemo} style={{
                padding: "10px 20px", borderRadius: 10, border: "none",
                background: COLORS.navy, color: "white", fontSize: 14, fontWeight: 600,
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              }}>Book a Demo</button>
            )}
            {isMobile && (
              <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}>
                {menuOpen ? <X size={24} color={COLORS.navy} /> : <Menu size={24} color={COLORS.navy} />}
              </button>
            )}
          </div>
        </div>
      </nav>
      {menuOpen && isMobile && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 999, background: "white",
          paddingTop: 80, display: "flex", flexDirection: "column", alignItems: "center", gap: 24,
        }}>
          {navLinks.map(link => (
            <a key={link} href={`#${link.toLowerCase().replace(/ /g, "-")}`} onClick={() => setMenuOpen(false)} style={{ fontSize: 18, fontWeight: 600, color: COLORS.navy, textDecoration: "none", fontFamily: "'DM Sans', sans-serif" }}>{link}</a>
          ))}
          <button onClick={() => { onDemo(); setMenuOpen(false); }} style={{
            marginTop: 16, padding: "14px 32px", borderRadius: 12, border: "none",
            background: COLORS.navy, color: "white", fontSize: 16, fontWeight: 600,
            cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          }}>Book a Demo</button>
        </div>
      )}
    </>
  );
}

/* --- Demo Modal --- */
function DemoModal({ open, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", gym: "", size: "" });
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await supabase.from("demo_requests").insert([{ ...form, created_at: new Date().toISOString() }]);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(8,69,94,.6)", backdropFilter: "blur(4px)" }} onClick={onClose}>
      <div style={{ background: "white", borderRadius: 24, padding: 40, maxWidth: 480, width: "90%", position: "relative" }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer" }}><X size={24} color={COLORS.navy} /></button>
        {status === "success" ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: `${COLORS.emerald}20`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <Check size={32} color={COLORS.emerald} />
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: COLORS.navy, marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>We&apos;ll be in touch!</h3>
            <p style={{ fontSize: 15, color: "#5a7a88", fontFamily: "'DM Sans', sans-serif" }}>Look for an email from our team within 24 hours.</p>
          </div>
        ) : (
          <>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: COLORS.navy, marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>Book a Demo</h3>
            <p style={{ fontSize: 15, color: "#5a7a88", marginBottom: 24, fontFamily: "'DM Sans', sans-serif" }}>See how Milton works with your numbers.</p>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <input type="text" placeholder="Your name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ padding: "14px 16px", borderRadius: 10, border: `1px solid ${COLORS.teal}20`, fontSize: 15, fontFamily: "'DM Sans', sans-serif" }} />
              <input type="email" placeholder="Email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={{ padding: "14px 16px", borderRadius: 10, border: `1px solid ${COLORS.teal}20`, fontSize: 15, fontFamily: "'DM Sans', sans-serif" }} />
              <input type="text" placeholder="Gym name" value={form.gym} onChange={e => setForm({ ...form, gym: e.target.value })} style={{ padding: "14px 16px", borderRadius: 10, border: `1px solid ${COLORS.teal}20`, fontSize: 15, fontFamily: "'DM Sans', sans-serif" }} />
              <select value={form.size} onChange={e => setForm({ ...form, size: e.target.value })} style={{ padding: "14px 16px", borderRadius: 10, border: `1px solid ${COLORS.teal}20`, fontSize: 15, fontFamily: "'DM Sans', sans-serif", background: "white" }}>
                <option value="">Number of trainers</option>
                <option value="1-5">1-5</option>
                <option value="6-15">6-15</option>
                <option value="16-30">16-30</option>
                <option value="30+">30+</option>
              </select>
              <button type="submit" disabled={status === "loading"} style={{
                padding: "14px 24px", borderRadius: 10, border: "none",
                background: COLORS.navy, color: "white", fontSize: 15, fontWeight: 600,
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}>
                {status === "loading" ? <Loader size={18} style={{ animation: "spin 1s linear infinite" }} /> : "Request Demo"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* --- FAQ Item --- */
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${COLORS.teal}15`, padding: "20px 0" }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "none", border: "none", cursor: "pointer", textAlign: "left",
      }}>
        <span style={{ fontSize: 16, fontWeight: 600, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif", paddingRight: 16 }}>{q}</span>
        <ChevronDown size={20} color={COLORS.teal} style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform .2s", flexShrink: 0 }} />
      </button>
      {open && <p style={{ fontSize: 15, lineHeight: 1.7, color: "#5a7a88", marginTop: 12, fontFamily: "'DM Sans', sans-serif" }}>{a}</p>}
    </div>
  );
}

/* --- Co-Pilot Card --- */
function CoPilotCard({ eyebrow, headline, bullets, link, icon: Icon, visual }) {
  return (
    <div style={{ ...lc, padding: 0, overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
        <div style={{ padding: "clamp(32px, 5vw, 48px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.emerald})`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icon size={20} color="white" strokeWidth={2} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.teal, textTransform: "uppercase", letterSpacing: 1, fontFamily: "'DM Sans', sans-serif" }}>{eyebrow}</span>
          </div>
          <h3 style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 700, color: COLORS.navy, marginBottom: 20, lineHeight: 1.3, fontFamily: "'DM Sans', sans-serif" }}>{headline}</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px 0", display: "flex", flexDirection: "column", gap: 12 }}>
            {bullets.map((b, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 15, lineHeight: 1.6, color: "#5a7a88", fontFamily: "'DM Sans', sans-serif" }}>
                <div style={{ width: 20, height: 20, borderRadius: 6, background: `${COLORS.emerald}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                  <Check size={12} color={COLORS.emerald} strokeWidth={3} />
                </div>
                {b}
              </li>
            ))}
          </ul>
          <a href={link} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600, color: COLORS.teal, textDecoration: "none", fontFamily: "'DM Sans', sans-serif" }}>
            See the full page <ChevronRight size={16} />
          </a>
        </div>
        {visual}
      </div>
    </div>
  );
}

/* --- Main App --- */
export default function MiltonSite() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#fafcfd", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #fafcfd; }
        @keyframes fadeUp { 0% { opacity: 0; transform: translateY(32px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        ::selection { background: ${COLORS.emerald}30; }
      `}</style>

      <Nav onDemo={() => setDemoOpen(true)} />
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />

      {/* 1. HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "120px clamp(20px, 5vw, 80px) 80px",
        background: `linear-gradient(180deg, white 0%, #f4f9fa 100%)`,
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "clamp(40px, 6vw, 80px)" }}>
          <div style={{ flex: "1 1 480px", animation: "fadeUp 1s ease both" }}>
            <h1 style={{
              fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 800, color: COLORS.navy,
              lineHeight: 1.1, marginBottom: 24, fontFamily: "'DM Sans', sans-serif",
            }}>
              AI co-pilots for every level of your personal training business.
            </h1>
            <p style={{ fontSize: "clamp(17px, 2vw, 20px)", lineHeight: 1.7, color: "#5a7a88", marginBottom: 32, maxWidth: 540, fontFamily: "'DM Sans', sans-serif" }}>
              Operations. Coaching. Programming. Front desk. One connected system. On top of whatever tools you already use.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              <button onClick={() => setDemoOpen(true)} style={{
                padding: "16px 28px", borderRadius: 12, border: "none",
                background: COLORS.navy, color: "white", fontSize: 16, fontWeight: 600,
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                display: "flex", alignItems: "center", gap: 8,
              }}>Book a Demo <ArrowUpRight size={18} /></button>
              <button style={{
                padding: "16px 28px", borderRadius: 12,
                border: `2px solid ${COLORS.teal}30`, background: "transparent",
                color: COLORS.navy, fontSize: 16, fontWeight: 600,
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              }}>Watch It Work</button>
            </div>
          </div>

          {/* Hero Visual */}
          <div style={{ flex: "1 1 480px", display: "flex", justifyContent: "center", animation: "fadeUp 1s ease 0.3s both" }}>
            <div style={{ position: "relative", width: "100%", maxWidth: 520 }}>
              <div style={{
                background: "white", borderRadius: 20, padding: 24,
                boxShadow: "0 32px 64px rgba(8,69,94,.12), 0 8px 24px rgba(8,69,94,.06)",
                border: `1px solid ${COLORS.teal}10`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.emerald})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "white" }}>M</span>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif" }}>4 Co-Pilots Active</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
                  {[
                    { icon: Settings, label: "Operations", status: "3 tasks queued" },
                    { icon: BarChart3, label: "Director", status: "Scoring trainers" },
                    { icon: Brain, label: "Coach", status: "14 briefs sent" },
                    { icon: UserCheck, label: "Front Desk", status: "Ready" },
                  ].map((c, i) => (
                    <div key={i} style={{ padding: 16, borderRadius: 12, background: `${COLORS.teal}06`, border: `1px solid ${COLORS.teal}10` }}>
                      <c.icon size={20} color={COLORS.teal} strokeWidth={1.5} style={{ marginBottom: 8 }} />
                      <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif" }}>{c.label}</div>
                      <div style={{ fontSize: 11, color: COLORS.teal, fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>{c.status}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{
                position: "absolute", bottom: -16, right: -16, padding: "12px 16px", borderRadius: 12,
                background: `linear-gradient(135deg, ${COLORS.navy}, ${COLORS.deepTeal})`,
                boxShadow: "0 12px 32px rgba(8,69,94,.2)",
              }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.7)", marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>This morning</div>
                <div style={{ fontSize: 13, color: "white", fontFamily: "'DM Sans', sans-serif" }}>14 messages drafted</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CLARITY BAR */}
      <Section style={{ padding: "0 clamp(20px, 5vw, 80px)" }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "32px 40px", borderRadius: 16,
          background: COLORS.navy, textAlign: "center",
        }}>
          <p style={{ fontSize: "clamp(15px, 1.8vw, 18px)", color: "rgba(255,255,255,.9)", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
            Keep your tools. Cancel them. Up to you. <span style={{ color: COLORS.emerald }}>Milton is the intelligence layer</span> that connects everything and makes every person in your building smarter.
          </p>
        </div>
      </Section>

      {/* 3. THE REAL PROBLEM */}
      <Section style={{ padding: "clamp(80px, 10vw, 120px) clamp(20px, 5vw, 80px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: COLORS.navy, marginBottom: 24, lineHeight: 1.2, fontFamily: "'DM Sans', sans-serif" }}>
            6 tools. 4 dashboards. Nobody&apos;s job is getting easier.
          </h2>
          <p style={{ fontSize: "clamp(16px, 1.8vw, 19px)", lineHeight: 1.8, color: "#5a7a88", marginBottom: 24, fontFamily: "'DM Sans', sans-serif" }}>
            None of your tools talk to each other. Your directors pull reports all week. Your trainers do admin instead of coaching. Your front desk has zero context. And you&apos;re stitching the picture together yourself every Monday morning.
          </p>
          <p style={{ fontSize: "clamp(16px, 1.8vw, 19px)", lineHeight: 1.8, color: COLORS.navy, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
            You have all the data. Nothing connects it, acts on it, or helps anyone do their job better. That&apos;s what Milton is.
          </p>
        </div>
      </Section>

      {/* 4. AI-POWERED OPERATIONS */}
      <Section id="operations" style={{ padding: "0 clamp(20px, 5vw, 80px) clamp(60px, 8vw, 80px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <CoPilotCard
            icon={Settings}
            eyebrow="Your AI Operations Coordinator"
            headline="Milton checks your memberships every morning. Then gets to work."
            bullets={[
              "Renewals due this week — personalized messages sent through their trainer.",
              "Clients who haven't booked in 10 days — flagged, follow-up drafted.",
              "Churn risks — scored daily, surfaced before they cancel.",
              "Upcoming appointments — custom reminders sent.",
              "Missed sessions — same-day follow-up.",
            ]}
            link="#operations"
            visual={
              <div style={{ padding: 24, background: `linear-gradient(135deg, ${COLORS.teal}06, ${COLORS.mint}04)`, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 320 }}>
                <div style={{ background: "white", borderRadius: 16, padding: 20, width: "100%", maxWidth: 300, boxShadow: "0 8px 24px rgba(8,69,94,.08)" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.navy, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>This Morning&apos;s Queue</div>
                  {[
                    { label: "Renewals due", count: 3, color: COLORS.teal },
                    { label: "Churn risks", count: 2, color: "#c45c5c" },
                    { label: "Win-back opportunity", count: 1, color: COLORS.emerald },
                    { label: "Messages drafted", count: 14, color: COLORS.navy },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < 3 ? `1px solid ${COLORS.teal}10` : "none" }}>
                      <span style={{ fontSize: 13, color: "#5a7a88", fontFamily: "'DM Sans', sans-serif" }}>{item.label}</span>
                      <span style={{ fontSize: 15, fontWeight: 700, color: item.color, fontFamily: "'DM Sans', sans-serif" }}>{item.count}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 16, padding: "10px 14px", borderRadius: 8, background: `${COLORS.emerald}10`, display: "flex", alignItems: "center", gap: 8 }}>
                    <Coffee size={14} color={COLORS.emerald} />
                    <span style={{ fontSize: 12, color: COLORS.emerald, fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>Before you finish your coffee</span>
                  </div>
                </div>
              </div>
            }
          />
        </div>
      </Section>

      {/* 5. AI-POWERED FITNESS DIRECTOR */}
      <Section id="fitness-directors" style={{ padding: "0 clamp(20px, 5vw, 80px) clamp(60px, 8vw, 80px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <CoPilotCard
            icon={BarChart3}
            eyebrow="Your AI Fitness Director"
            headline="Milton scores your coaching staff every week. Here's what that looks like."
            bullets={[
              "Trainer A: 96% follow-up rate, zero clients lost, three ahead of goals.",
              "Trainer B: 61% follow-ups, two clients gone, four stale programs.",
              "Why is Trainer B losing clients? Milton traces it to the exact breakdown.",
              "That's a coaching conversation you can have tomorrow morning.",
            ]}
            link="#fitness-directors"
            visual={
              <div style={{ padding: 24, background: `linear-gradient(135deg, ${COLORS.navy}06, ${COLORS.teal}04)`, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 320 }}>
                <div style={{ width: "100%", maxWidth: 300 }}>
                  {[
                    { name: "Aisha W.", score: 96, trend: "up", detail: "0 lost, 3 ahead" },
                    { name: "Jake T.", score: 61, trend: "down", detail: "2 lost, 4 stale" },
                  ].map((t, i) => (
                    <div key={i} style={{
                      background: "white", borderRadius: 12, padding: 16, marginBottom: 12,
                      border: `1px solid ${t.trend === "down" ? "rgba(196,92,92,.2)" : COLORS.teal + "15"}`,
                      boxShadow: "0 4px 12px rgba(8,69,94,.06)",
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 32, height: 32, borderRadius: 8, background: t.trend === "down" ? "rgba(196,92,92,.1)" : COLORS.emerald, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontSize: 11, fontWeight: 600, color: t.trend === "down" ? "#c45c5c" : "white" }}>{t.name.split(" ")[0][0]}{t.name.split(" ")[1][0]}</span>
                          </div>
                          <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif" }}>{t.name}</span>
                        </div>
                        <span style={{ fontSize: 22, fontWeight: 700, color: t.trend === "down" ? "#c45c5c" : COLORS.navy, fontFamily: "'DM Sans', sans-serif" }}>{t.score}</span>
                      </div>
                      <div style={{ fontSize: 12, color: t.trend === "down" ? "#c45c5c" : "#5a7a88", fontFamily: "'DM Sans', sans-serif" }}>{t.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            }
          />
        </div>
      </Section>

      {/* 6. AI-POWERED ASSISTANT COACH */}
      <Section id="coaches" style={{ padding: "0 clamp(20px, 5vw, 80px) clamp(60px, 8vw, 80px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <CoPilotCard
            icon={Brain}
            eyebrow="Your AI Head Coach"
            headline="Every trainer opens their day with a brief."
            bullets={[
              "Client missed two sessions — check-in drafted.",
              "Client hit a 12-week streak — celebration ready.",
              "Client's nutrition went quiet — programming adjustment suggested.",
              "New client, week two — onboarding cadence set, program built.",
            ]}
            link="#coaches"
            visual={
              <div style={{ padding: 24, background: `linear-gradient(135deg, ${COLORS.teal}06, ${COLORS.mint}04)`, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 320 }}>
                <div style={{ background: "white", borderRadius: 16, padding: 20, width: "100%", maxWidth: 280, boxShadow: "0 8px 24px rgba(8,69,94,.08)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.emerald})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "white" }}>M</span>
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif" }}>Good morning, Coach!</div>
                      <div style={{ fontSize: 11, color: COLORS.teal, fontFamily: "'DM Sans', sans-serif" }}>8 sessions today</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.navy, marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>Needs attention:</div>
                  {[
                    { name: "Sarah Chen", note: "Missed 2 sessions" },
                    { name: "Marcus J.", note: "Assessment due" },
                  ].map((c, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, background: `${COLORS.teal}06`, marginBottom: 8 }}>
                      <div style={{ width: 6, height: 6, borderRadius: 3, background: i === 0 ? "#c45c5c" : COLORS.teal }} />
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif" }}>{c.name}</div>
                        <div style={{ fontSize: 11, color: "#5a7a88", fontFamily: "'DM Sans', sans-serif" }}>{c.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            }
          />
        </div>
      </Section>

      {/* 7. AI-POWERED FRONT DESK */}
      <Section id="front-desk" style={{ padding: "0 clamp(20px, 5vw, 80px) clamp(60px, 8vw, 80px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <CoPilotCard
            icon={UserCheck}
            eyebrow="Your AI Concierge"
            headline="Every interaction is informed. Before they walk through the door."
            bullets={[
              "Member checks in — she just hit 50 sessions, worth a shoutout.",
              "New prospect walks in — matched to a trainer, trial session ready.",
              "Client calls to cancel — she's 6 pounds from her goal and your front desk knows it.",
            ]}
            link="#front-desk"
            visual={
              <div style={{ padding: 24, background: `linear-gradient(135deg, ${COLORS.navy}06, ${COLORS.teal}04)`, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 320 }}>
                <div style={{ background: "white", borderRadius: 16, padding: 20, width: "100%", maxWidth: 280, boxShadow: "0 8px 24px rgba(8,69,94,.08)" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.navy, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>Member Check-in</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: COLORS.emerald, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "white" }}>JM</span>
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif" }}>Jessica Miller</div>
                      <div style={{ fontSize: 12, color: COLORS.teal, fontFamily: "'DM Sans', sans-serif" }}>Session #50</div>
                    </div>
                  </div>
                  <div style={{ padding: "12px 14px", borderRadius: 10, background: `${COLORS.emerald}10`, border: `1px solid ${COLORS.emerald}20` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <Award size={14} color={COLORS.emerald} />
                      <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.emerald, fontFamily: "'DM Sans', sans-serif" }}>Milestone Alert</span>
                    </div>
                    <p style={{ fontSize: 12, color: "#5a7a88", lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif" }}>Worth a shoutout! Consider a small celebration.</p>
                  </div>
                </div>
              </div>
            }
          />
        </div>
      </Section>

      {/* 8. ONE CONNECTED SYSTEM */}
      <Section style={{ padding: "clamp(80px, 10vw, 120px) clamp(20px, 5vw, 80px)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: COLORS.navy, marginBottom: 24, lineHeight: 1.2, fontFamily: "'DM Sans', sans-serif" }}>
            Four co-pilots. One brain. Every number connected.
          </h2>
          <p style={{ fontSize: "clamp(16px, 1.8vw, 19px)", lineHeight: 1.8, color: "#5a7a88", marginBottom: 48, fontFamily: "'DM Sans', sans-serif" }}>
            Operations catches the churn risk. The coach gets the follow-up. The director sees the pattern. The owner sees the revenue. One system. Every action feeds the same picture.
          </p>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 16 }}>
            {[
              { icon: Settings, label: "Operations" },
              { icon: BarChart3, label: "Director" },
              { icon: Brain, label: "Coach" },
              { icon: UserCheck, label: "Front Desk" },
            ].map((c, i) => (
              <div key={i} style={{ ...lc, padding: "20px 28px", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.emerald})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <c.icon size={18} color="white" strokeWidth={2} />
                </div>
                <span style={{ fontSize: 15, fontWeight: 600, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif" }}>{c.label}</span>
                {i < 3 && <ChevronRight size={16} color={COLORS.teal} style={{ marginLeft: 8 }} />}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 9. BEFORE ANYONE CLOCKS IN */}
      <Section style={{ padding: "0 clamp(20px, 5vw, 80px) clamp(80px, 10vw, 120px)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "clamp(40px, 6vw, 64px)", borderRadius: 24, background: `linear-gradient(135deg, ${COLORS.navy}, ${COLORS.deepTeal})` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <Sun size={24} color={COLORS.emerald} />
            <span style={{ fontSize: 18, fontWeight: 700, color: "white", fontFamily: "'DM Sans', sans-serif" }}>6:00 AM</span>
          </div>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: "white", marginBottom: 32, lineHeight: 1.3, fontFamily: "'DM Sans', sans-serif" }}>
            Milton has already:
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {[
              "Flagged 3 renewals, 2 churn risks, 1 win-back opportunity.",
              "Scored every trainer on execution and client health.",
              "Built every trainer's daily brief.",
              "Prepped the front desk with today's context.",
              "Drafted 14 messages.",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: 16, borderRadius: 12, background: "rgba(255,255,255,.06)" }}>
                <div style={{ width: 20, height: 20, borderRadius: 6, background: `${COLORS.emerald}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                  <Check size={12} color={COLORS.emerald} strokeWidth={3} />
                </div>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,.85)", lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>{item}</span>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 32, fontSize: 16, color: COLORS.emerald, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
            Your team walks in and the thinking is done.
          </p>
        </div>
      </Section>

      {/* 10. HOW IT WORKS */}
      <Section id="how-it-works" style={{ padding: "clamp(80px, 10vw, 120px) clamp(20px, 5vw, 80px)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: COLORS.navy, marginBottom: 48, lineHeight: 1.2, fontFamily: "'DM Sans', sans-serif" }}>
            Live in 2 weeks, not 2 quarters.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {[
              { step: "1", icon: Plug, title: "Connect your tools", desc: "Stripe, Mindbody, calendars, health trackers, CRM. Milton plugs in." },
              { step: "2", icon: Send, title: "Upload your playbook", desc: "Your SOPs, your standards, your voice. Milton learns your gym." },
              { step: "3", icon: Zap, title: "Milton goes to work", desc: "Four co-pilots. Running every morning. Your team sees what matters." },
            ].map((s, i) => (
              <div key={i} style={{ ...lc, padding: 32, textAlign: "left" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: COLORS.navy, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: "white", fontFamily: "'DM Sans', sans-serif" }}>{s.step}</span>
                  </div>
                  <s.icon size={24} color={COLORS.teal} strokeWidth={1.5} />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: COLORS.navy, marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>{s.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "#5a7a88", fontFamily: "'DM Sans', sans-serif" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 11. EARLY RESULTS */}
      <Section style={{ padding: "0 clamp(20px, 5vw, 80px) clamp(80px, 10vw, 120px)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 800, color: COLORS.navy, marginBottom: 40, textAlign: "center", fontFamily: "'DM Sans', sans-serif" }}>
            We don&apos;t expect you to take our word for it.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {[
              { gym: "Athletica Health & Fitness", quote: "Our new hires were following up at the same rate as our 3-year veterans within the first month.", name: "Brett Reynolds", title: "Owner" },
              { gym: "Optimal Performance", quote: "We made one scheduling change that paid for the platform in week two.", name: "Bethany", title: "Director" },
            ].map((t, i) => (
              <div key={i} style={{ ...lc, padding: 32 }}>
                <p style={{ fontSize: 17, lineHeight: 1.7, color: COLORS.navy, marginBottom: 24, fontStyle: "italic", fontFamily: "'DM Sans', sans-serif" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif" }}>{t.name}, {t.title}</div>
                  <div style={{ fontSize: 14, color: COLORS.teal, fontFamily: "'DM Sans', sans-serif" }}>{t.gym}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 12. LET'S BE CLEAR */}
      <Section style={{ padding: "0 clamp(20px, 5vw, 80px) clamp(80px, 10vw, 120px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          <div style={{ ...lc, padding: 32 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#c45c5c", marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>Milton is not:</h3>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {["A replacement for your gym software.", "A client-facing app.", "Another CRM.", "Months of setup."].map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15, color: "#5a7a88", fontFamily: "'DM Sans', sans-serif" }}>
                  <X size={16} color="#c45c5c" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ ...lc, padding: 32, background: `linear-gradient(135deg, ${COLORS.navy}, ${COLORS.deepTeal})` }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "white", marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>Milton is:</h3>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {["Four AI co-pilots.", "One connected layer.", "Built on your existing tools.", "Live in weeks."].map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15, color: "rgba(255,255,255,.9)", fontFamily: "'DM Sans', sans-serif" }}>
                  <div style={{ width: 20, height: 20, borderRadius: 6, background: `${COLORS.emerald}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Check size={12} color={COLORS.emerald} strokeWidth={3} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 13. FAQ */}
      <Section style={{ padding: "0 clamp(20px, 5vw, 80px) clamp(80px, 10vw, 120px)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 800, color: COLORS.navy, marginBottom: 40, textAlign: "center", fontFamily: "'DM Sans', sans-serif" }}>
            Frequently Asked Questions
          </h2>
          <FAQItem q="Do my trainers need to learn a new platform?" a="Daily brief and suggested actions. Running in a week." />
          <FAQItem q="How does it integrate?" a="Connects to Stripe, Mindbody, ABC, Trainerize, TrueCoach, health trackers, calendars. Adapts to your stack." />
          <FAQItem q="Who owns my data?" a="You do. We don't sell it. If you cancel, it's exported and deleted." />
          <FAQItem q="What does it cost?" a="Based on gym size. Most owners see ROI within 60 days. Book a demo and we'll build the case with your numbers." />
          <FAQItem q="Why not just hire more staff?" a="Four co-pilots running 24/7 cost less than one part-time trainer. And they never call in sick." />
        </div>
      </Section>

      {/* 14. FINAL CTA */}
      <Section style={{ padding: "0 clamp(20px, 5vw, 80px) clamp(80px, 10vw, 120px)" }}>
        <div style={{
          maxWidth: 900, margin: "0 auto", padding: "clamp(48px, 6vw, 72px)", borderRadius: 24,
          background: `linear-gradient(135deg, ${COLORS.navy}, ${COLORS.deepTeal})`,
          textAlign: "center",
        }}>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, color: "white", marginBottom: 24, lineHeight: 1.3, fontFamily: "'DM Sans', sans-serif" }}>
            Four AI co-pilots. One system. Every level of your gym.
          </h2>
          <button onClick={() => setDemoOpen(true)} style={{
            padding: "18px 36px", borderRadius: 12, border: "none",
            background: "white", color: COLORS.navy, fontSize: 17, fontWeight: 700,
            cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            display: "inline-flex", alignItems: "center", gap: 10,
          }}>
            Book a Demo <ArrowUpRight size={20} />
          </button>
        </div>
      </Section>

      {/* Footer */}
      <footer style={{ padding: "40px clamp(20px, 5vw, 80px)", borderTop: `1px solid ${COLORS.teal}10` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src={MILTON_LOGO} alt="Milton" style={{ width: 32, height: 32, borderRadius: 8 }} />
            <span style={{ fontSize: 16, fontWeight: 600, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif" }}>Milton</span>
          </div>
          <p style={{ fontSize: 14, color: "#5a7a88", fontFamily: "'DM Sans', sans-serif" }}>© 2026 Milton AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
