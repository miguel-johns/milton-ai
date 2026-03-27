import { useState, useEffect, useRef } from "react";
import {
  Eye, Zap, Clock, Building2, Dumbbell, Target,
  Star, User, ArrowUpRight, ArrowRight, Check, X,
  ClipboardList, BarChart3, TrendingUp, TrendingDown,
  ChevronRight, ChevronDown, Shield, Users, Brain,
  Activity, BellRing, Send, Plug, Smartphone,
  MessageSquare, LineChart, Calendar,
  Menu, Play, AlertCircle, CheckCircle2,
  UserCheck, RefreshCw, Sparkles, Timer, Coffee
} from "lucide-react";

const COLORS = {
  mint: "#9af199",
  deepTeal: "#026278",
  teal: "#0d9aa5",
  navy: "#08455e",
  emerald: "#2ee5b1",
  red: "#ef4444",
  amber: "#f59e0b",
};

const MILTON_LOGO = "/placeholder.svg?height=40&width=40";

/* ─── Intersection Observer hook ─── */
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

/* ─── Section wrapper with fade-in ─── */
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

/* ─── Card style helpers ─── */
const cardStyle = {
  borderRadius: 24,
  background: "white",
  boxShadow: "0 4px 32px rgba(8,69,94,.08)",
  border: "1px solid rgba(2,98,120,.06)",
};

/* ─── Nav ─── */
function Nav({ onDemo }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? "12px clamp(20px, 4vw, 48px)" : "18px clamp(20px, 4vw, 48px)",
      background: scrolled ? "rgba(255,255,255,.95)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(2,98,120,.06)" : "1px solid transparent",
      transition: "all 0.4s cubic-bezier(.16,1,.3,1)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <img src={MILTON_LOGO} alt="Milton" style={{ width: 34, height: 34, borderRadius: 10 }} />
        <span style={{ fontSize: 20, fontWeight: 700, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif" }}>Milton</span>
      </a>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button onClick={onDemo} style={{
          padding: "12px 24px", borderRadius: 12, border: "none",
          background: COLORS.teal, color: "white", fontSize: 14, fontWeight: 600,
          cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          Book a Demo <ArrowRight size={16} />
        </button>
      </div>
    </nav>
  );
}

/* ─── 1. Hero Section ─── */
function HeroSection({ onDemo }) {
  return (
    <Section style={{
      minHeight: "100vh",
      background: `linear-gradient(165deg, #f8fffe 0%, ${COLORS.mint}15 50%, ${COLORS.emerald}08 100%)`,
      padding: "140px clamp(20px, 4vw, 48px) 80px",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{ maxWidth: 900, textAlign: "center" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "8px 16px", borderRadius: 100,
          background: `${COLORS.teal}10`, border: `1px solid ${COLORS.teal}20`,
          marginBottom: 24,
        }}>
          <Sparkles size={14} color={COLORS.teal} />
          <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.teal, fontFamily: "'DM Sans', sans-serif" }}>
            AI-Powered Trainer Intelligence
          </span>
        </div>
        
        <h1 style={{
          fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 800, color: COLORS.navy,
          lineHeight: 1.1, marginBottom: 24, fontFamily: "'DM Sans', sans-serif",
          letterSpacing: -2,
        }}>
          The first AI co-pilot for your personal training business.
        </h1>
        
        <p style={{
          fontSize: "clamp(16px, 2vw, 20px)", lineHeight: 1.7, color: "#5a7a88",
          maxWidth: 720, margin: "0 auto 40px", fontFamily: "'DM Sans', sans-serif",
        }}>
          Milton gives every trainer on your staff the intelligence to drive attendance, follow-up, retention, and results — and gives you the visibility to see it all happening in real time.
        </p>
        
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={onDemo} style={{
            padding: "16px 32px", borderRadius: 14, border: "none",
            background: COLORS.teal, color: "white", fontSize: 16, fontWeight: 600,
            cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            display: "flex", alignItems: "center", gap: 10,
            boxShadow: `0 8px 32px ${COLORS.teal}30`,
          }}>
            Book a Demo <ArrowRight size={18} />
          </button>
          <button style={{
            padding: "16px 32px", borderRadius: 14,
            border: `2px solid ${COLORS.navy}15`, background: "white",
            color: COLORS.navy, fontSize: 16, fontWeight: 600,
            cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <Play size={18} fill={COLORS.navy} /> Watch How It Works
          </button>
        </div>
      </div>
      
      {/* Hero Visual */}
      <div style={{ marginTop: 60, width: "100%", maxWidth: 1100 }}>
        <div style={{
          ...cardStyle,
          padding: 0, overflow: "hidden",
          boxShadow: "0 24px 80px rgba(8,69,94,.12)",
        }}>
          <img 
            src="/placeholder.svg?height=600&width=1100" 
            alt="Milton Dashboard Preview"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </div>
    </Section>
  );
}

/* ─── 2. Clarity Bar ─── */
function ClarityBar() {
  return (
    <div style={{
      padding: "32px clamp(20px, 4vw, 48px)",
      background: COLORS.navy,
      textAlign: "center",
    }}>
      <p style={{
        fontSize: "clamp(14px, 1.8vw, 18px)", color: "rgba(255,255,255,.9)",
        maxWidth: 900, margin: "0 auto", fontFamily: "'DM Sans', sans-serif",
        lineHeight: 1.6,
      }}>
        <strong style={{ color: COLORS.emerald }}>Milton isn&apos;t a replacement for your gym software.</strong>{" "}
        It&apos;s the intelligence layer that sits on top. Your billing, payments, and memberships stay exactly where they are.
      </p>
    </div>
  );
}

/* ─── 3. The Real Problem ─── */
function ProblemSection() {
  const problems = [
    {
      icon: UserCheck,
      title: "Your best trainers leave — and the business leaves with them",
      desc: "They build client relationships, develop their own systems, outgrow your gym, and take half their book with them. You don't just lose a trainer. You lose the revenue, the retention, and the playbook they never wrote down.",
      color: COLORS.red,
    },
    {
      icon: Timer,
      title: "New trainers take months before they stop costing you clients",
      desc: "Every new hire is a gamble. They're learning on your clients, missing follow-ups, and delivering an inconsistent experience while your veterans carry the floor. By the time they're good, you've already lost the members who noticed.",
      color: COLORS.amber,
    },
    {
      icon: ClipboardList,
      title: "Tracking all of this is a patchwork nightmare",
      desc: "Who's executing? Who's getting results? Who's retaining clients and who's bleeding them? The answers exist — scattered across Mindbody reports, health trackers, scheduling tools, and spreadsheets you built yourself because nothing else connected the dots.",
      color: COLORS.teal,
    },
  ];

  return (
    <Section style={{
      padding: "clamp(80px, 10vw, 120px) clamp(20px, 4vw, 48px)",
      background: "#fafcfd",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span style={{
            fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
            color: COLORS.teal, fontFamily: "'DM Sans', sans-serif",
          }}>The Real Problem</span>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: COLORS.navy,
            marginTop: 12, fontFamily: "'DM Sans', sans-serif", letterSpacing: -1,
            maxWidth: 800, margin: "12px auto 0",
          }}>
            You sell personal training. So why is trainer performance the one thing you can&apos;t manage?
          </h2>
        </div>
        
        <p style={{
          fontSize: 18, lineHeight: 1.7, color: "#5a7a88", textAlign: "center",
          maxWidth: 800, margin: "0 auto 48px", fontFamily: "'DM Sans', sans-serif",
        }}>
          Your entire business runs on one thing: trainers getting clients results. But finding great trainers is hard. Keeping them is harder. And helping every trainer on your staff perform like your best one? That&apos;s damn near impossible without a system built for it.
        </p>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
          {problems.map((p, i) => (
            <div key={i} style={{
              ...cardStyle,
              padding: "32px",
              borderTop: `4px solid ${p.color}`,
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: `${p.color}12`, display: "flex",
                alignItems: "center", justifyContent: "center", marginBottom: 20,
              }}>
                <p.icon size={24} color={p.color} />
              </div>
              <h3 style={{
                fontSize: 18, fontWeight: 700, color: COLORS.navy,
                marginBottom: 12, fontFamily: "'DM Sans', sans-serif",
              }}>{p.title}</h3>
              <p style={{
                fontSize: 15, lineHeight: 1.7, color: "#5a7a88",
                fontFamily: "'DM Sans', sans-serif",
              }}>{p.desc}</p>
            </div>
          ))}
        </div>
        
        <p style={{
          fontSize: 16, lineHeight: 1.7, color: "#5a7a88", textAlign: "center",
          maxWidth: 800, margin: "48px auto 0", fontFamily: "'DM Sans', sans-serif",
          fontStyle: "italic",
        }}>
          You want every trainer performing like your best trainer. But without one connected system that aids them in the moment, develops them over time, and tracks the business metrics that actually matter — you&apos;re managing the most important part of your business with duct tape and gut feel.
        </p>
      </div>
    </Section>
  );
}

/* ─── 4. One Platform, Three Reports - VISUAL ─── */
function PlatformSection() {
  const [activeTab, setActiveTab] = useState(0);
  
  const reports = [
    {
      id: "execution",
      title: "Execution",
      icon: ClipboardList,
      color: COLORS.teal,
      desc: "Are your trainers following up, scheduling, programming, checking in? Milton scores it by trainer, by week — automatically. When a coach falls behind, you see it in days, not at month-end.",
    },
    {
      id: "results",
      title: "Results",
      icon: TrendingUp,
      color: COLORS.emerald,
      desc: "Are clients reaching their goals? Milton connects programming, nutrition, and health data to show who's progressing, plateauing, or declining — without pulling from three different trackers.",
    },
    {
      id: "retention",
      title: "Retention & Growth",
      icon: Users,
      color: COLORS.deepTeal,
      desc: "Client count. New clients. Attendance. Churn. Milton generates the monthly picture continuously — not once a month when someone has time to update the sheet.",
    },
  ];

  return (
    <Section style={{
      padding: "clamp(80px, 10vw, 120px) clamp(20px, 4vw, 48px)",
      background: `linear-gradient(180deg, white 0%, ${COLORS.mint}08 100%)`,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span style={{
            fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
            color: COLORS.teal, fontFamily: "'DM Sans', sans-serif",
          }}>One Platform, Three Reports, Zero Spreadsheets</span>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: COLORS.navy,
            marginTop: 12, fontFamily: "'DM Sans', sans-serif", letterSpacing: -1,
          }}>
            One system for the thing that is your business.
          </h2>
        </div>

        {/* Visual Dashboard */}
        <div style={{
          ...cardStyle,
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(8,69,94,.1)",
        }}>
          {/* Tab Navigation */}
          <div style={{
            display: "flex", borderBottom: "1px solid rgba(2,98,120,.08)",
            background: "#fafcfd",
          }}>
            {reports.map((r, i) => (
              <button key={r.id} onClick={() => setActiveTab(i)} style={{
                flex: 1, padding: "20px 24px",
                background: activeTab === i ? "white" : "transparent",
                border: "none", borderBottom: activeTab === i ? `3px solid ${r.color}` : "3px solid transparent",
                cursor: "pointer", transition: "all 0.3s",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              }}>
                <r.icon size={20} color={activeTab === i ? r.color : "#9ab5c0"} />
                <span style={{
                  fontSize: 15, fontWeight: activeTab === i ? 700 : 500,
                  color: activeTab === i ? COLORS.navy : "#9ab5c0",
                  fontFamily: "'DM Sans', sans-serif",
                }}>{r.title}</span>
              </button>
            ))}
          </div>

          {/* Dashboard Content */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {/* Header */}
            <div style={{
              padding: "24px 32px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              borderBottom: "1px solid rgba(2,98,120,.06)",
            }}>
              <div>
                <h3 style={{
                  fontSize: 20, fontWeight: 700, color: COLORS.navy,
                  fontFamily: "'DM Sans', sans-serif", marginBottom: 4,
                }}>{reports[activeTab].title} Dashboard</h3>
                <p style={{ fontSize: 14, color: "#9ab5c0", fontFamily: "'DM Sans', sans-serif" }}>
                  Week of March 24 - 30, 2026
                </p>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <span style={{
                  padding: "8px 16px", borderRadius: 8, background: `${COLORS.emerald}15`,
                  fontSize: 13, fontWeight: 600, color: COLORS.emerald,
                  fontFamily: "'DM Sans', sans-serif",
                }}>Live Data</span>
              </div>
            </div>

            {/* Placeholder Visual */}
            <div style={{ padding: "32px" }}>
              <img 
                src={`/placeholder.svg?height=400&width=1100&text=${reports[activeTab].title}+Report`}
                alt={`${reports[activeTab].title} Dashboard`}
                style={{ width: "100%", height: "auto", borderRadius: 16 }}
              />
            </div>

            {/* Description */}
            <div style={{
              padding: "24px 32px",
              background: "#fafcfd",
              borderTop: "1px solid rgba(2,98,120,.06)",
            }}>
              <p style={{
                fontSize: 15, lineHeight: 1.7, color: "#5a7a88",
                fontFamily: "'DM Sans', sans-serif",
              }}>{reports[activeTab].desc}</p>
            </div>
          </div>
        </div>

        {/* Where They're Getting Stuck */}
        <div style={{
          marginTop: 48,
          padding: "32px",
          ...cardStyle,
          background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.deepTeal} 100%)`,
          border: "none",
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
            <div style={{
              width: 56, height: 56, borderRadius: 14,
              background: "rgba(255,255,255,.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <Brain size={28} color={COLORS.emerald} />
            </div>
            <div style={{ flex: 1, minWidth: 280 }}>
              <h3 style={{
                fontSize: 20, fontWeight: 700, color: "white",
                fontFamily: "'DM Sans', sans-serif", marginBottom: 8,
              }}>Where They&apos;re Getting Stuck</h3>
              <p style={{
                fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,.8)",
                fontFamily: "'DM Sans', sans-serif",
              }}>
                A trainer&apos;s clients are churning — is it execution or results? Milton connects all three layers so you can pinpoint the breakdown and coach to the right problem.
              </p>
            </div>
          </div>
        </div>

        <p style={{
          fontSize: 16, lineHeight: 1.7, color: "#5a7a88", textAlign: "center",
          maxWidth: 800, margin: "48px auto 0", fontFamily: "'DM Sans', sans-serif",
        }}>
          When you can see execution, results, and retention across your entire staff — without rebuilding three spreadsheets every week — you stop managing by gut and start managing by signal.
        </p>
      </div>
    </Section>
  );
}

/* ─── 5. The Coaching Portal - VISUAL ─── */
function CoachingPortalSection() {
  const features = [
    {
      icon: Activity,
      title: "Wearables, body scans, nutrition logs — one view",
      desc: "Milton pulls device data, InBody scans, nutrition tracking, and session history into a single coaching view. Your trainer doesn't need to check four apps.",
    },
    {
      icon: Sparkles,
      title: "AI-guided programming that adapts to real outcomes",
      desc: "Not cookie-cutter templates. Milton sees what's working for each client — based on actual results, not guesswork — and suggests adjustments your trainer can review and apply in seconds.",
    },
    {
      icon: MessageSquare,
      title: "The follow-up that separates good trainers from great ones",
      desc: "Milton drafts check-ins, flags clients who need attention, and prompts the conversations that keep clients engaged between sessions.",
    },
    {
      icon: Brain,
      title: "A better trainer's brain, in their pocket, 24/7",
      desc: "Your newest hire walks onto the floor with the same client intelligence your ten-year veteran carries in their head. Not replacing the human connection — powering it with data.",
    },
  ];

  return (
    <Section style={{
      padding: "clamp(80px, 10vw, 120px) clamp(20px, 4vw, 48px)",
      background: `linear-gradient(165deg, ${COLORS.navy} 0%, ${COLORS.deepTeal} 100%)`,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 60, alignItems: "center" }}>
          {/* Left Content */}
          <div>
            <span style={{
              fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
              color: COLORS.emerald, fontFamily: "'DM Sans', sans-serif",
            }}>For Every Trainer On Your Staff</span>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "white",
              marginTop: 12, marginBottom: 24, fontFamily: "'DM Sans', sans-serif", letterSpacing: -1,
            }}>
              Your best trainer&apos;s intelligence, available to every trainer.
            </h2>
            <p style={{
              fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,.75)",
              marginBottom: 40, fontFamily: "'DM Sans', sans-serif",
            }}>
              Your best trainer doesn&apos;t just show up and count reps. They know which client&apos;s body scan is trending the wrong direction. They notice when someone&apos;s nutrition logs go quiet. They remember who needs a check-in today and who needs space.
            </p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {features.map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <f.icon size={20} color={COLORS.emerald} />
                  </div>
                  <div>
                    <h4 style={{
                      fontSize: 16, fontWeight: 700, color: "white",
                      fontFamily: "'DM Sans', sans-serif", marginBottom: 6,
                    }}>{f.title}</h4>
                    <p style={{
                      fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,.6)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual - Coaching Portal Mockup */}
          <div style={{
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 32px 100px rgba(0,0,0,.3)",
          }}>
            <img 
              src="/placeholder.svg?height=700&width=500&text=Coaching+Portal"
              alt="Coaching Portal Interface"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </div>

        <p style={{
          fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,.7)", textAlign: "center",
          maxWidth: 800, margin: "60px auto 0", fontFamily: "'DM Sans', sans-serif",
        }}>
          Milton makes progress visual for your coaches — in real time, in the flow of their work — so they can see what&apos;s happening with every client and coach them to results, not just through workouts.
        </p>
      </div>
    </Section>
  );
}

/* ─── 6. A Day With Milton - VISUAL ─── */
function DayWithMiltonSection() {
  return (
    <Section style={{
      padding: "clamp(80px, 10vw, 120px) clamp(20px, 4vw, 48px)",
      background: "white",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span style={{
            fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
            color: COLORS.teal, fontFamily: "'DM Sans', sans-serif",
          }}>What Actually Changes</span>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: COLORS.navy,
            marginTop: 12, fontFamily: "'DM Sans', sans-serif", letterSpacing: -1,
          }}>
            Tuesday morning. No spreadsheets. No guessing.
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 32 }}>
          {/* Sarah - Trainer View */}
          <div style={{
            ...cardStyle,
            overflow: "hidden",
          }}>
            {/* Header */}
            <div style={{
              padding: "24px 28px",
              background: `linear-gradient(135deg, ${COLORS.mint}20 0%, ${COLORS.emerald}10 100%)`,
              borderBottom: "1px solid rgba(2,98,120,.06)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: `linear-gradient(135deg, ${COLORS.teal} 0%, ${COLORS.deepTeal} 100%)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Dumbbell size={24} color="white" />
                </div>
                <div>
                  <h3 style={{
                    fontSize: 20, fontWeight: 700, color: COLORS.navy,
                    fontFamily: "'DM Sans', sans-serif",
                  }}>Sarah, Trainer</h3>
                  <p style={{
                    fontSize: 14, color: "#5a7a88",
                    fontFamily: "'DM Sans', sans-serif",
                  }}>6 clients today</p>
                </div>
              </div>
            </div>

            {/* Visual Content */}
            <div style={{ padding: "24px 28px" }}>
              <img 
                src="/placeholder.svg?height=300&width=500&text=Trainer+Daily+Brief"
                alt="Sarah's Daily Brief"
                style={{ width: "100%", height: "auto", borderRadius: 12, marginBottom: 20 }}
              />
              <p style={{
                fontSize: 15, lineHeight: 1.7, color: "#5a7a88",
                fontFamily: "'DM Sans', sans-serif",
              }}>
                <strong style={{ color: COLORS.navy }}>Daily brief:</strong> one client missed two sessions, one hit a 12-week streak, one is trending off-plan. Follow-ups drafted. Programming adjustments suggested. She reviews, tweaks, sends.
              </p>
              <div style={{
                marginTop: 16, padding: "16px 20px",
                background: `${COLORS.emerald}10`, borderRadius: 12,
                display: "flex", alignItems: "center", gap: 12,
              }}>
                <Timer size={20} color={COLORS.emerald} />
                <span style={{
                  fontSize: 14, fontWeight: 600, color: COLORS.emerald,
                  fontFamily: "'DM Sans', sans-serif",
                }}>Coaching in 4 minutes, not 40.</span>
              </div>
            </div>
          </div>

          {/* Owner View */}
          <div style={{
            ...cardStyle,
            overflow: "hidden",
          }}>
            {/* Header */}
            <div style={{
              padding: "24px 28px",
              background: `linear-gradient(135deg, ${COLORS.teal}15 0%, ${COLORS.deepTeal}10 100%)`,
              borderBottom: "1px solid rgba(2,98,120,.06)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.deepTeal} 100%)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Building2 size={24} color="white" />
                </div>
                <div>
                  <h3 style={{
                    fontSize: 20, fontWeight: 700, color: COLORS.navy,
                    fontFamily: "'DM Sans', sans-serif",
                  }}>You, The Owner</h3>
                  <p style={{
                    fontSize: 14, color: "#5a7a88",
                    fontFamily: "'DM Sans', sans-serif",
                  }}>11 trainers on the floor</p>
                </div>
              </div>
            </div>

            {/* Visual Content */}
            <div style={{ padding: "24px 28px" }}>
              <img 
                src="/placeholder.svg?height=300&width=500&text=Owner+Dashboard"
                alt="Owner Dashboard View"
                style={{ width: "100%", height: "auto", borderRadius: 12, marginBottom: 20 }}
              />
              <p style={{
                fontSize: 15, lineHeight: 1.7, color: "#5a7a88",
                fontFamily: "'DM Sans', sans-serif",
              }}>
                <strong style={{ color: COLORS.navy }}>Execution scores are current</strong> — two new hires at 60% on follow-ups, rest of the team at 94%. One trainer&apos;s clients are plateauing despite consistent attendance — a programming conversation, not a motivation problem.
              </p>
              <div style={{
                marginTop: 16, padding: "16px 20px",
                background: `${COLORS.teal}10`, borderRadius: 12,
                display: "flex", alignItems: "center", gap: 12,
              }}>
                <BarChart3 size={20} color={COLORS.teal} />
                <span style={{
                  fontSize: 14, fontWeight: 600, color: COLORS.teal,
                  fontFamily: "'DM Sans', sans-serif",
                }}>Same rigor you&apos;d build yourself. Fraction of the time.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─── 7. How It Works ─── */
function HowItWorksSection() {
  const steps = [
    {
      num: "1",
      title: "Connect your existing tools",
      desc: "Milton layers on top of your current gym software. Everything stays where it is.",
      icon: Plug,
    },
    {
      num: "2",
      title: "Upload your coaching playbook",
      desc: "Your SOPs, your execution scorecard, your standards. Milton doesn't impose a framework. It automates yours.",
      icon: ClipboardList,
    },
    {
      num: "3",
      title: "Your team gets smarter, your Tuesday mornings get shorter",
      desc: "The three reports you built by hand? Milton runs them for you.",
      icon: Sparkles,
    },
  ];

  return (
    <Section style={{
      padding: "clamp(80px, 10vw, 120px) clamp(20px, 4vw, 48px)",
      background: "#fafcfd",
    }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span style={{
            fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
            color: COLORS.teal, fontFamily: "'DM Sans', sans-serif",
          }}>How It Works</span>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: COLORS.navy,
            marginTop: 12, fontFamily: "'DM Sans', sans-serif", letterSpacing: -1,
          }}>
            Live in 2 weeks, not 2 quarters.
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              ...cardStyle,
              padding: "32px",
              display: "flex", alignItems: "flex-start", gap: 24,
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: 16,
                background: `linear-gradient(135deg, ${COLORS.teal} 0%, ${COLORS.deepTeal} 100%)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <span style={{
                  fontSize: 28, fontWeight: 800, color: "white",
                  fontFamily: "'DM Sans', sans-serif",
                }}>{s.num}</span>
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: 20, fontWeight: 700, color: COLORS.navy,
                  fontFamily: "'DM Sans', sans-serif", marginBottom: 8,
                }}>{s.title}</h3>
                <p style={{
                  fontSize: 16, lineHeight: 1.7, color: "#5a7a88",
                  fontFamily: "'DM Sans', sans-serif",
                }}>{s.desc}</p>
              </div>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: `${COLORS.teal}10`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <s.icon size={24} color={COLORS.teal} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── 8. Early Results / Testimonials ─── */
function TestimonialsSection() {
  const testimonials = [
    {
      company: "Athletica Health & Fitness",
      quote: "Within the first month, our new hires were following up at the same rate as our 3-year veterans. That's never happened before.",
      author: "Brett Reynolds",
      role: "Owner",
      stats: ["32% check-in increase", "8 fewer clients lost", "6 hrs/week saved"],
    },
    {
      company: "Optimal Performance",
      quote: "Milton showed us which trainers were losing clients and why. We made one scheduling change that paid for the platform in week two.",
      author: "Bethany Chen",
      role: "Director",
      stats: ["24% utilization improvement", "18% retention lift", "ROI positive in 3 weeks"],
    },
  ];

  return (
    <Section style={{
      padding: "clamp(80px, 10vw, 120px) clamp(20px, 4vw, 48px)",
      background: "white",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span style={{
            fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
            color: COLORS.teal, fontFamily: "'DM Sans', sans-serif",
          }}>Early Results</span>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: COLORS.navy,
            marginTop: 12, fontFamily: "'DM Sans', sans-serif", letterSpacing: -1,
          }}>
            We don&apos;t expect you to take our word for it.
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 32 }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{
              ...cardStyle,
              padding: "36px",
              display: "flex", flexDirection: "column",
            }}>
              <div style={{
                fontSize: 14, fontWeight: 700, color: COLORS.teal,
                fontFamily: "'DM Sans', sans-serif", marginBottom: 16,
              }}>{t.company}</div>
              <blockquote style={{
                fontSize: 18, lineHeight: 1.7, color: COLORS.navy,
                fontFamily: "'DM Sans', sans-serif", fontStyle: "italic",
                margin: "0 0 24px 0", flex: 1,
              }}>
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div style={{
                display: "flex", alignItems: "center", gap: 12,
                paddingTop: 20, borderTop: "1px solid rgba(2,98,120,.08)",
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: `${COLORS.navy}10`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <User size={24} color={COLORS.navy} />
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif" }}>
                    {t.author}
                  </div>
                  <div style={{ fontSize: 13, color: "#5a7a88", fontFamily: "'DM Sans', sans-serif" }}>
                    {t.role}
                  </div>
                </div>
              </div>
              <div style={{
                display: "flex", gap: 8, flexWrap: "wrap", marginTop: 20,
              }}>
                {t.stats.map((stat, j) => (
                  <span key={j} style={{
                    padding: "6px 12px", borderRadius: 8,
                    background: `${COLORS.emerald}10`, fontSize: 12,
                    fontWeight: 600, color: COLORS.emerald,
                    fontFamily: "'DM Sans', sans-serif",
                  }}>{stat}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── 9. Who It's For ─── */
function WhoItsForSection() {
  const audiences = [
    {
      icon: Building2,
      title: "Gym Owners",
      desc: "5–30 trainers and no way to see who's driving attendance and who's losing clients. Milton gives you that visibility.",
    },
    {
      icon: ClipboardList,
      title: "Fitness Directors",
      desc: "You built the spreadsheets. Milton automates them.",
    },
    {
      icon: Target,
      title: "Multi-Location Operators",
      desc: "Consistency across locations without micromanaging.",
    },
  ];

  return (
    <Section style={{
      padding: "clamp(80px, 10vw, 120px) clamp(20px, 4vw, 48px)",
      background: "#fafcfd",
    }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span style={{
            fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
            color: COLORS.teal, fontFamily: "'DM Sans', sans-serif",
          }}>Who It&apos;s For</span>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: COLORS.navy,
            marginTop: 12, fontFamily: "'DM Sans', sans-serif", letterSpacing: -1,
          }}>
            Built for owners who manage trainers, not just memberships.
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {audiences.map((a, i) => (
            <div key={i} style={{
              ...cardStyle,
              padding: "32px", textAlign: "center",
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: 16,
                background: `${COLORS.teal}10`,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 20px",
              }}>
                <a.icon size={28} color={COLORS.teal} />
              </div>
              <h3 style={{
                fontSize: 18, fontWeight: 700, color: COLORS.navy,
                fontFamily: "'DM Sans', sans-serif", marginBottom: 12,
              }}>{a.title}</h3>
              <p style={{
                fontSize: 15, lineHeight: 1.7, color: "#5a7a88",
                fontFamily: "'DM Sans', sans-serif",
              }}>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── 10. Let's Be Clear ─── */
function LetsBeClearSection() {
  const isNot = [
    "A replacement for your gym management software",
    "A client-facing fitness app",
    "Another CRM to maintain",
    "Months of setup",
  ];

  const is = [
    "The first AI co-pilot for personal training businesses",
    "Execution, client health, and retention — by trainer, in real time",
    "The three reports you built by hand, running themselves",
    "Live in weeks, not months",
  ];

  return (
    <Section style={{
      padding: "clamp(80px, 10vw, 120px) clamp(20px, 4vw, 48px)",
      background: "white",
    }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: COLORS.navy,
            fontFamily: "'DM Sans', sans-serif", letterSpacing: -1,
          }}>
            Let&apos;s be clear.
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 32 }}>
          {/* Not */}
          <div style={{
            ...cardStyle,
            padding: "32px",
            borderTop: `4px solid ${COLORS.red}`,
          }}>
            <h3 style={{
              fontSize: 18, fontWeight: 700, color: COLORS.navy,
              fontFamily: "'DM Sans', sans-serif", marginBottom: 24,
            }}>Milton is not:</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {isNot.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <X size={20} color={COLORS.red} style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{
                    fontSize: 15, color: "#5a7a88",
                    fontFamily: "'DM Sans', sans-serif",
                  }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Is */}
          <div style={{
            ...cardStyle,
            padding: "32px",
            borderTop: `4px solid ${COLORS.emerald}`,
          }}>
            <h3 style={{
              fontSize: 18, fontWeight: 700, color: COLORS.navy,
              fontFamily: "'DM Sans', sans-serif", marginBottom: 24,
            }}>Milton is:</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {is.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <Check size={20} color={COLORS.emerald} style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{
                    fontSize: 15, color: COLORS.navy, fontWeight: 500,
                    fontFamily: "'DM Sans', sans-serif",
                  }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─── 11. FAQ ─── */
function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "Do my trainers need to learn a new platform?",
      a: "Barely. Daily brief and suggested actions. Most are running in a week. We onboard your team hands-on.",
    },
    {
      q: "How does it integrate with my current software?",
      a: "Layers on top of Mindbody, ABC Fitness, Trainerize, TrueCoach. Your billing, scheduling, and memberships don't move.",
    },
    {
      q: "You're a small company. How do I know you'll be around?",
      a: "We're working with a small group of gyms intentionally. Early partners get direct access to the founding team. Your data is portable — you're never locked in.",
    },
    {
      q: "Didn't this start as a healthcare tool?",
      a: "Yes. That's where we learned to turn coaching data into outcomes at scale — in one of the most regulated environments in health. The healthcare DNA is a feature, not a pivot.",
    },
    {
      q: "Who owns my data?",
      a: "You do. We don't sell it, we don't train public models on it, and if you cancel, it's exported and deleted. Healthcare-grade data practices by default.",
    },
    {
      q: "What does it cost?",
      a: "Based on team size. Most owners find it pays for itself within 60 days through faster ramp and better retention. Book a demo and we'll build the ROI case with your real numbers.",
    },
    {
      q: "I already built spreadsheets for this. Why do I need Milton?",
      a: "You're exactly who we built this for. Same framework, same rigor — without the hours every week pulling reports, cross-referencing, and double-checking. Milton automates the system you already designed.",
    },
    {
      q: "Why not just hire a better head trainer?",
      a: "You should. Milton makes them more effective. Even the best head trainer can't track execution, results, and retention across 10+ trainers in real time. Milton gives them the data to scale their instincts.",
    },
  ];

  return (
    <Section style={{
      padding: "clamp(80px, 10vw, 120px) clamp(20px, 4vw, 48px)",
      background: "#fafcfd",
    }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span style={{
            fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
            color: COLORS.teal, fontFamily: "'DM Sans', sans-serif",
          }}>FAQ</span>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: COLORS.navy,
            marginTop: 12, fontFamily: "'DM Sans', sans-serif", letterSpacing: -1,
          }}>
            Questions we&apos;d ask too.
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{
              ...cardStyle,
              overflow: "hidden",
            }}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: "100%", padding: "20px 24px",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  background: "transparent", border: "none", cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span style={{
                  fontSize: 16, fontWeight: 600, color: COLORS.navy,
                  fontFamily: "'DM Sans', sans-serif",
                }}>{faq.q}</span>
                <ChevronDown
                  size={20}
                  color={COLORS.teal}
                  style={{
                    transform: openIndex === i ? "rotate(180deg)" : "rotate(0)",
                    transition: "transform 0.3s",
                    flexShrink: 0,
                    marginLeft: 16,
                  }}
                />
              </button>
              {openIndex === i && (
                <div style={{
                  padding: "0 24px 20px",
                }}>
                  <p style={{
                    fontSize: 15, lineHeight: 1.7, color: "#5a7a88",
                    fontFamily: "'DM Sans', sans-serif",
                  }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── 12. Final CTA ─── */
function FinalCTASection({ onDemo }) {
  return (
    <Section style={{
      padding: "clamp(80px, 10vw, 120px) clamp(20px, 4vw, 48px)",
      background: `linear-gradient(165deg, ${COLORS.navy} 0%, ${COLORS.deepTeal} 100%)`,
    }}>
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{
          fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "white",
          fontFamily: "'DM Sans', sans-serif", letterSpacing: -1, marginBottom: 16,
        }}>
          The first AI co-pilot for personal training.
          <br />Built for the people who run it.
        </h2>
        <p style={{
          fontSize: "clamp(16px, 2vw, 20px)", lineHeight: 1.7, color: "rgba(255,255,255,.8)",
          fontFamily: "'DM Sans', sans-serif", marginBottom: 40,
        }}>
          Attendance. Follow-up. Retention. Results. One system. Every trainer. Every week.
        </p>
        <button onClick={onDemo} style={{
          padding: "18px 40px", borderRadius: 14, border: "none",
          background: COLORS.emerald, color: COLORS.navy, fontSize: 18, fontWeight: 700,
          cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          display: "inline-flex", alignItems: "center", gap: 12,
          boxShadow: `0 8px 32px ${COLORS.emerald}40`,
        }}>
          Book a Demo <ArrowRight size={20} />
        </button>
      </div>
    </Section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer style={{
      padding: "48px clamp(20px, 4vw, 48px)",
      background: COLORS.navy,
      borderTop: "1px solid rgba(255,255,255,.1)",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 24,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src={MILTON_LOGO} alt="Milton" style={{ width: 28, height: 28, borderRadius: 8 }} />
          <span style={{
            fontSize: 16, fontWeight: 600, color: "white",
            fontFamily: "'DM Sans', sans-serif",
          }}>Milton</span>
        </div>
        <p style={{
          fontSize: 14, color: "rgba(255,255,255,.5)",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          &copy; 2026 Milton AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ─── Main App ─── */
export default function App() {
  const handleDemo = () => {
    window.open("https://calendly.com", "_blank");
  };

  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <Nav onDemo={handleDemo} />
      <HeroSection onDemo={handleDemo} />
      <ClarityBar />
      <ProblemSection />
      <PlatformSection />
      <CoachingPortalSection />
      <DayWithMiltonSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <WhoItsForSection />
      <LetsBeClearSection />
      <FAQSection />
      <FinalCTASection onDemo={handleDemo} />
      <Footer />
    </div>
  );
}
