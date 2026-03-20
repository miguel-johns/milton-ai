import { useState, useEffect, useRef } from "react";
import {
  Brain, Users, Dumbbell, BarChart3, MessageSquare, Sparkles,
  Smartphone, Monitor, Tablet, Mail, Bell, Calendar, ArrowRight,
  Zap, Layers, Palette, MousePointer, Globe, UserCheck, Lightbulb,
  CheckCircle2, ChevronRight, Play
} from "lucide-react";

const COLORS = {
  mint: "#9af199",
  deepTeal: "#026278",
  teal: "#0d9aa5",
  navy: "#08455e",
  emerald: "#2ee5b1",
  white: "#ffffff",
  offWhite: "#f8fafb",
  slate: "#5a7a88",
  dark: "#0a1628",
};

/* Intersection Observer hook */
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

/* Section wrapper with fade-in */
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

/* Hero Section */
function HeroSection() {
  return (
    <section style={{
      minHeight: "85vh",
      background: COLORS.dark,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "clamp(100px, 12vw, 160px) clamp(20px, 5vw, 80px)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Gradient orb */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "clamp(400px, 60vw, 800px)",
        height: "clamp(400px, 60vw, 800px)",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${COLORS.teal}40 0%, ${COLORS.deepTeal}20 40%, transparent 70%)`,
        filter: "blur(60px)",
        pointerEvents: "none",
      }} />
      
      <div style={{
        maxWidth: 1000,
        textAlign: "center",
        position: "relative",
        zIndex: 1,
      }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 20px",
          background: "rgba(255,255,255,0.06)",
          borderRadius: 100,
          marginBottom: 40,
          border: "1px solid rgba(255,255,255,0.1)",
        }}>
          <Sparkles size={16} color={COLORS.emerald} />
          <span style={{
            fontSize: 14,
            fontWeight: 600,
            color: "rgba(255,255,255,0.8)",
            letterSpacing: 0.5,
          }}>Our Technology</span>
        </div>
        
        <h1 style={{
          fontSize: "clamp(40px, 7vw, 72px)",
          fontWeight: 800,
          color: COLORS.white,
          lineHeight: 1.05,
          letterSpacing: -2,
          marginBottom: 32,
        }}>
          Three co-pilots.<br />
          <span style={{ color: COLORS.emerald }}>One intelligence.</span><br />
          Built for everyone in the gym.
        </h1>
        
        <p style={{
          fontSize: "clamp(18px, 2vw, 22px)",
          color: "rgba(255,255,255,0.6)",
          lineHeight: 1.7,
          maxWidth: 700,
          margin: "0 auto 48px",
        }}>
          Milton is a multi-sided coaching platform. Every role gets a co-pilot designed 
          specifically for how they think, what they need, and when they need it.
        </p>
        
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          justifyContent: "center",
        }}>
          <button style={{
            padding: "16px 32px",
            background: COLORS.white,
            color: COLORS.dark,
            borderRadius: 100,
            border: "none",
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}>
            Get a Demo <ArrowRight size={18} />
          </button>
          <button style={{
            padding: "16px 32px",
            background: "rgba(255,255,255,0.08)",
            color: COLORS.white,
            borderRadius: 100,
            border: "1px solid rgba(255,255,255,0.15)",
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}>
            <Play size={18} /> Watch Video
          </button>
        </div>
      </div>
    </section>
  );
}

/* Part I Header */
function PartHeader({ part, title }) {
  return (
    <div style={{
      textAlign: "center",
      marginBottom: 64,
    }}>
      <span style={{
        fontSize: 12,
        fontWeight: 700,
        color: COLORS.teal,
        textTransform: "uppercase",
        letterSpacing: 3,
        display: "block",
        marginBottom: 12,
      }}>{part}</span>
      <h2 style={{
        fontSize: "clamp(32px, 5vw, 52px)",
        fontWeight: 800,
        color: COLORS.navy,
        letterSpacing: -1.5,
      }}>{title}</h2>
    </div>
  );
}

/* Co-Pilots Section */
function CoPilotsSection() {
  const copilots = [
    {
      icon: Dumbbell,
      title: "The Coach Co-Pilot",
      description: "Your daily partner in delivering elite coaching at scale. Milton surfaces the right client, at the right moment, with the right context — so you spend less time searching and more time coaching.",
      features: ["Draft check-ins", "Flag at-risk members", "Track habit streaks", "Personalized client context"],
      color: COLORS.emerald,
    },
    {
      icon: BarChart3,
      title: "The Fitness Director & Owner Co-Pilot",
      description: "The intelligence layer your business has always needed. See trainer performance across your entire floor. Spot gaps before they become churn.",
      features: ["Portfolio-level insights", "Trainer performance", "Churn prediction", "Plain language reports"],
      color: COLORS.teal,
    },
    {
      icon: Users,
      title: "The Member Co-Pilot",
      description: "A personal guide that meets members where they are. Whether it's logging a meal, understanding progress, or knowing what to do next — the member co-pilot makes the healthy choice the easy choice.",
      features: ["Meal logging", "Progress tracking", "Session guidance", "Between-session engagement"],
      color: COLORS.mint,
    },
  ];

  return (
    <Section style={{
      padding: "clamp(80px, 12vw, 140px) clamp(20px, 5vw, 80px)",
      background: COLORS.offWhite,
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <PartHeader part="Part I" title="The Platform" />
        
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}>
          {copilots.map((copilot, index) => (
            <CoPilotCard key={index} {...copilot} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function CoPilotCard({ icon: Icon, title, description, features, color, index }) {
  const [ref, visible] = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  const isEven = index % 2 === 0;
  
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 48,
        alignItems: "center",
        background: COLORS.white,
        borderRadius: 32,
        padding: "clamp(32px, 5vw, 56px)",
        border: `1px solid ${hovered ? color + "30" : "rgba(8,69,94,0.06)"}`,
        boxShadow: hovered ? `0 24px 80px ${color}15` : "0 4px 24px rgba(8,69,94,0.04)",
        transition: "all 0.5s cubic-bezier(.16,1,.3,1)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
      }}
    >
      <div style={{ order: isEven ? 1 : 2 }}>
        <div style={{
          width: 72,
          height: 72,
          borderRadius: 22,
          background: `linear-gradient(135deg, ${color}20, ${color}08)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 28,
        }}>
          <Icon size={32} color={color} strokeWidth={1.8} />
        </div>
        
        <h3 style={{
          fontSize: "clamp(26px, 3vw, 34px)",
          fontWeight: 700,
          color: COLORS.navy,
          marginBottom: 20,
          letterSpacing: -0.5,
        }}>{title}</h3>
        
        <p style={{
          fontSize: 17,
          lineHeight: 1.8,
          color: COLORS.slate,
          marginBottom: 28,
        }}>{description}</p>
        
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
        }}>
          {features.map((feature, i) => (
            <span key={i} style={{
              padding: "8px 16px",
              background: `${color}10`,
              borderRadius: 100,
              fontSize: 13,
              fontWeight: 600,
              color: COLORS.navy,
            }}>
              {feature}
            </span>
          ))}
        </div>
      </div>
      
      <div style={{
        order: isEven ? 2 : 1,
        aspectRatio: "4/3",
        background: `linear-gradient(165deg, ${COLORS.dark}, ${COLORS.navy})`,
        borderRadius: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 70% 30%, ${color}25, transparent 60%)`,
        }} />
        <Icon size={64} color="rgba(255,255,255,0.2)" strokeWidth={1} />
      </div>
    </div>
  );
}

/* Milton Intelligence Section */
function IntelligenceSection() {
  return (
    <Section style={{
      padding: "clamp(80px, 12vw, 140px) clamp(20px, 5vw, 80px)",
      background: COLORS.dark,
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span style={{
            fontSize: 12,
            fontWeight: 700,
            color: COLORS.emerald,
            textTransform: "uppercase",
            letterSpacing: 3,
          }}>The Foundation</span>
          <h2 style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800,
            color: COLORS.white,
            marginTop: 16,
            letterSpacing: -1.5,
          }}>Built on Milton Intelligence</h2>
          <p style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.6)",
            maxWidth: 700,
            margin: "20px auto 0",
            lineHeight: 1.7,
          }}>
            Every co-pilot runs on the same foundation: Milton Intelligence — a proprietary system 
            powered by multiple specialized small language models working in concert through an agentic architecture.
          </p>
        </div>
        
        <div style={{
          background: "rgba(255,255,255,0.04)",
          borderRadius: 32,
          padding: "clamp(40px, 6vw, 64px)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 32,
            marginBottom: 48,
          }}>
            {[
              { icon: Brain, label: "Coaching Context", desc: "Understands coaching methodology" },
              { icon: BarChart3, label: "Behavioral Data", desc: "Tracks patterns over time" },
              { icon: MessageSquare, label: "Member Communication", desc: "Natural conversation" },
              { icon: Layers, label: "Business Analytics", desc: "Portfolio-level insights" },
            ].map((item, i) => (
              <div key={i} style={{
                textAlign: "center",
              }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: `linear-gradient(135deg, ${COLORS.teal}30, ${COLORS.emerald}15)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}>
                  <item.icon size={24} color={COLORS.emerald} />
                </div>
                <h4 style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: COLORS.white,
                  marginBottom: 6,
                }}>{item.label}</h4>
                <p style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.5)",
                }}>{item.desc}</p>
              </div>
            ))}
          </div>
          
          <div style={{
            background: `linear-gradient(135deg, ${COLORS.teal}15, ${COLORS.emerald}10)`,
            borderRadius: 20,
            padding: 32,
            textAlign: "center",
            border: "1px solid rgba(255,255,255,0.08)",
          }}>
            <Sparkles size={28} color={COLORS.emerald} style={{ marginBottom: 16 }} />
            <h4 style={{
              fontSize: 20,
              fontWeight: 700,
              color: COLORS.white,
              marginBottom: 12,
            }}>And it's yours to shape.</h4>
            <p style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.7,
              maxWidth: 550,
              margin: "0 auto",
            }}>
              Gym owners and fitness directors can customize Milton Intelligence to reflect their methodology, 
              their language, their standards. Your coaches talk a certain way. Your programs have a certain philosophy. 
              <strong style={{ color: COLORS.emerald }}> Milton learns it.</strong>
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* Part II Header */
function PartTwoHeader() {
  return (
    <Section style={{
      padding: "clamp(80px, 12vw, 120px) clamp(20px, 5vw, 80px) 40px",
      background: COLORS.offWhite,
      textAlign: "center",
    }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <span style={{
          fontSize: 12,
          fontWeight: 700,
          color: COLORS.teal,
          textTransform: "uppercase",
          letterSpacing: 3,
        }}>Part II</span>
        <h2 style={{
          fontSize: "clamp(36px, 5vw, 56px)",
          fontWeight: 800,
          color: COLORS.navy,
          marginTop: 16,
          letterSpacing: -1.5,
        }}>Built for the Real World</h2>
        <p style={{
          fontSize: 20,
          color: COLORS.slate,
          marginTop: 20,
          fontStyle: "italic",
        }}>
          This is where most software stops. This is where we started.
        </p>
        <p style={{
          fontSize: 17,
          color: COLORS.slate,
          marginTop: 24,
          lineHeight: 1.8,
          maxWidth: 650,
          margin: "24px auto 0",
        }}>
          Building AI for fitness isn't a technology problem. It's a human problem. And we've spent years 
          in gyms, on gym floors, inside coaching relationships, learning exactly where software breaks down 
          and people stop using it.
        </p>
      </div>
    </Section>
  );
}

/* Design Principles Section */
function DesignPrinciplesSection() {
  const principles = [
    {
      icon: Palette,
      title: "Beautiful by Design",
      description: "Milton doesn't look like a fitness app. It doesn't look like enterprise software. It looks like something you actually want to open. Clean, considered, and calm — because the people using it are already managing a lot.",
      highlight: "We treat aesthetics as a functional requirement, not a finishing touch.",
    },
    {
      icon: MousePointer,
      title: "Radically Simple",
      description: "Every feature had to earn its place. If it required a tutorial, we redesigned it. If it added friction, we cut it. The goal was always a product so intuitive that anyone could use it without thinking twice.",
      highlight: "Simplicity at this level is harder to build than complexity. We chose it anyway.",
    },
    {
      icon: MessageSquare,
      title: "Natural Language, First of Its Kind",
      description: "Milton is among the first platforms in fitness to make natural language the primary interface — not a chatbot bolted on the side, but the actual way you operate the software.",
      highlight: "This isn't a feature. It's a new paradigm for how coaching software works.",
    },
  ];

  return (
    <Section style={{
      padding: "40px clamp(20px, 5vw, 80px) clamp(80px, 12vw, 120px)",
      background: COLORS.offWhite,
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}>
          {principles.map((principle, i) => (
            <PrincipleCard key={i} {...principle} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function PrincipleCard({ icon: Icon, title, description, highlight, index }) {
  const [ref, visible] = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "80px 1fr",
        gap: 32,
        alignItems: "start",
        background: hovered ? COLORS.white : "transparent",
        borderRadius: 24,
        padding: "clamp(24px, 4vw, 40px)",
        border: `1px solid ${hovered ? "rgba(8,69,94,0.08)" : "transparent"}`,
        boxShadow: hovered ? "0 16px 48px rgba(8,69,94,0.06)" : "none",
        transition: "all 0.4s cubic-bezier(.16,1,.3,1)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${index * 0.08}s`,
      }}
    >
      <div style={{
        width: 72,
        height: 72,
        borderRadius: 20,
        background: `linear-gradient(165deg, ${COLORS.navy}, ${COLORS.deepTeal})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}>
        <Icon size={28} color={COLORS.emerald} />
      </div>
      
      <div>
        <h3 style={{
          fontSize: "clamp(22px, 2.5vw, 28px)",
          fontWeight: 700,
          color: COLORS.navy,
          marginBottom: 16,
        }}>{title}</h3>
        
        <p style={{
          fontSize: 16,
          lineHeight: 1.8,
          color: COLORS.slate,
          marginBottom: 20,
        }}>{description}</p>
        
        <p style={{
          fontSize: 15,
          fontWeight: 600,
          color: COLORS.teal,
          fontStyle: "italic",
        }}>{highlight}</p>
      </div>
    </div>
  );
}

/* Omni Section */
function OmniSection() {
  const omnis = [
    {
      icon: Mail,
      title: "Omni-channel",
      description: "SMS, in-app, email, push — Milton communicates with members and coaches across every channel, natively and intelligently.",
    },
    {
      icon: Monitor,
      title: "Omni-device",
      description: "Mobile, tablet, desktop — every interface is built for the device it lives on, not shrunk or stretched to fit.",
    },
    {
      icon: Calendar,
      title: "Omni-ops",
      description: "Scheduling, coaching, retention, reporting, communications — one platform runs the whole operation without patchwork integrations.",
    },
    {
      icon: Globe,
      title: "Omni-app",
      description: "Milton connects with the tools your team already uses. It doesn't demand a rip-and-replace. It slots in and elevates what's already there.",
    },
  ];

  return (
    <Section style={{
      padding: "clamp(80px, 12vw, 140px) clamp(20px, 5vw, 80px)",
      background: COLORS.white,
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 style={{
            fontSize: "clamp(36px, 5vw, 52px)",
            fontWeight: 800,
            color: COLORS.navy,
            letterSpacing: -1.5,
          }}>Omni-Everything</h2>
          <p style={{
            fontSize: 20,
            color: COLORS.slate,
            marginTop: 16,
          }}>Milton goes wherever your business goes.</p>
        </div>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
        }}>
          {omnis.map((omni, i) => (
            <OmniCard key={i} {...omni} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function OmniCard({ icon: Icon, title, description, index }) {
  const [ref, visible] = useInView(0.12);
  const [hovered, setHovered] = useState(false);
  
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `linear-gradient(165deg, ${COLORS.navy}, ${COLORS.deepTeal})` : COLORS.offWhite,
        borderRadius: 24,
        padding: 36,
        border: `1px solid ${hovered ? "transparent" : "rgba(8,69,94,0.06)"}`,
        transition: "all 0.5s cubic-bezier(.16,1,.3,1)",
        opacity: visible ? 1 : 0,
        transform: visible ? `translateY(0)${hovered ? " scale(1.02)" : ""}` : "translateY(40px)",
        transitionDelay: `${index * 0.08}s`,
        cursor: "default",
      }}
    >
      <div style={{
        width: 56,
        height: 56,
        borderRadius: 16,
        background: hovered ? "rgba(255,255,255,0.12)" : `${COLORS.teal}12`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 24,
        transition: "all 0.4s",
      }}>
        <Icon size={26} color={hovered ? COLORS.emerald : COLORS.teal} />
      </div>
      
      <h3 style={{
        fontSize: 22,
        fontWeight: 700,
        color: hovered ? COLORS.white : COLORS.navy,
        marginBottom: 12,
        transition: "color 0.4s",
      }}>{title}</h3>
      
      <p style={{
        fontSize: 15,
        lineHeight: 1.7,
        color: hovered ? "rgba(255,255,255,0.7)" : COLORS.slate,
        transition: "color 0.4s",
      }}>{description}</p>
    </div>
  );
}

/* User-First Section */
function UserFirstSection() {
  return (
    <Section style={{
      padding: "clamp(80px, 12vw, 140px) clamp(20px, 5vw, 80px)",
      background: `linear-gradient(165deg, ${COLORS.navy} 0%, ${COLORS.deepTeal} 100%)`,
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 64,
          alignItems: "center",
        }}>
          <div>
            <span style={{
              fontSize: 12,
              fontWeight: 700,
              color: COLORS.emerald,
              textTransform: "uppercase",
              letterSpacing: 3,
            }}>Philosophy</span>
            <h2 style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 800,
              color: COLORS.white,
              marginTop: 16,
              letterSpacing: -1,
            }}>User-First, at Every Layer</h2>
            <p style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.7)",
              marginTop: 24,
              lineHeight: 1.8,
            }}>
              Most software is built around the product. Milton is built around the person using it.
            </p>
            <p style={{
              fontSize: 17,
              color: "rgba(255,255,255,0.6)",
              marginTop: 20,
              lineHeight: 1.8,
            }}>
              That means a coach who's between sessions and has 90 seconds gets a different experience 
              than an owner building a quarterly review. A 19-year-old member logging their first meal 
              gets something different than a seasoned athlete tracking performance nutrition.
            </p>
            <p style={{
              fontSize: 18,
              color: COLORS.emerald,
              marginTop: 28,
              fontWeight: 600,
            }}>
              The interface adapts. The intelligence adapts. The communication adapts.
            </p>
          </div>
          
          <div style={{
            background: "rgba(255,255,255,0.06)",
            borderRadius: 28,
            padding: "clamp(32px, 5vw, 48px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}>
              {[
                { icon: UserCheck, text: "Adapts to user role and context" },
                { icon: Zap, text: "Instant value in 90 seconds or less" },
                { icon: Smartphone, text: "Device-native experiences" },
                { icon: Brain, text: "Intelligence that learns your workflow" },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: `${COLORS.emerald}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <item.icon size={20} color={COLORS.emerald} />
                  </div>
                  <span style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: COLORS.white,
                  }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* Co-Design Section */
function CoDesignSection() {
  return (
    <Section style={{
      padding: "clamp(80px, 12vw, 140px) clamp(20px, 5vw, 80px)",
      background: COLORS.offWhite,
    }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
        <Lightbulb size={48} color={COLORS.teal} style={{ marginBottom: 24 }} />
        <h2 style={{
          fontSize: "clamp(32px, 4vw, 48px)",
          fontWeight: 800,
          color: COLORS.navy,
          letterSpacing: -1,
        }}>Crafted Through Co-Design</h2>
        <p style={{
          fontSize: 19,
          color: COLORS.slate,
          marginTop: 28,
          lineHeight: 1.9,
          maxWidth: 800,
          margin: "28px auto 0",
        }}>
          We didn't build Milton in a lab and ship it to gyms. We built it <strong style={{ color: COLORS.navy }}>with</strong> gyms. 
          With coaches who told us what broke their trust in software. With members who showed us where they dropped off. 
          With owners who described what kept them up at night.
        </p>
        <p style={{
          fontSize: 18,
          color: COLORS.slate,
          marginTop: 24,
          lineHeight: 1.8,
          maxWidth: 750,
          margin: "24px auto 0",
        }}>
          Every detail in Milton — the way a check-in reads, the moment a notification fires, the color of a progress ring — 
          was iterated in the real world, with real people, over real time.
        </p>
        
        <div style={{
          background: `linear-gradient(165deg, ${COLORS.navy}, ${COLORS.deepTeal})`,
          borderRadius: 20,
          padding: "32px 40px",
          marginTop: 48,
          display: "inline-block",
        }}>
          <p style={{
            fontSize: 18,
            fontWeight: 600,
            color: COLORS.white,
            fontStyle: "italic",
          }}>
            "That's not a process. That's a philosophy. And it shows in every interaction."
          </p>
        </div>
      </div>
    </Section>
  );
}

/* Closing Section */
function ClosingSection() {
  return (
    <Section style={{
      padding: "clamp(100px, 14vw, 180px) clamp(20px, 5vw, 80px)",
      background: COLORS.dark,
      textAlign: "center",
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{
          fontSize: "clamp(28px, 4vw, 44px)",
          fontWeight: 700,
          color: COLORS.white,
          lineHeight: 1.4,
        }}>
          Milton is the coaching platform that respects the craft —{" "}
          <span style={{ color: COLORS.emerald }}>because it was built by people who understand it.</span>
        </h2>
        
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          justifyContent: "center",
          marginTop: 48,
        }}>
          <button style={{
            padding: "18px 36px",
            background: COLORS.emerald,
            color: COLORS.dark,
            borderRadius: 100,
            border: "none",
            fontSize: 17,
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}>
            Schedule a Demo <ArrowRight size={20} />
          </button>
          <button style={{
            padding: "18px 36px",
            background: "transparent",
            color: COLORS.white,
            borderRadius: 100,
            border: "1px solid rgba(255,255,255,0.2)",
            fontSize: 17,
            fontWeight: 600,
            cursor: "pointer",
          }}>
            Learn More
          </button>
        </div>
      </div>
    </Section>
  );
}

/* Main Technology Page */
export default function Technology({ onNavigate }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      background: COLORS.dark,
      minHeight: "100vh",
    }}>
      {/* Sticky back button */}
      <button
        onClick={() => onNavigate("home")}
        style={{
          position: "fixed",
          top: 24,
          left: 24,
          zIndex: 1000,
          padding: "12px 24px",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(12px)",
          color: COLORS.white,
          borderRadius: 100,
          border: "1px solid rgba(255,255,255,0.15)",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 8,
          transition: "all 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.1)";
        }}
      >
        <ChevronRight size={16} style={{ transform: "rotate(180deg)" }} />
        Back
      </button>
      
      <HeroSection />
      <CoPilotsSection />
      <IntelligenceSection />
      <PartTwoHeader />
      <DesignPrinciplesSection />
      <OmniSection />
      <UserFirstSection />
      <CoDesignSection />
      <ClosingSection />
    </div>
  );
}
