import { useState, useEffect, useRef } from "react";
import {
  Brain, Users, Dumbbell, BarChart3, MessageSquare, Sparkles,
  Smartphone, Monitor, Tablet, Mail, Bell, Calendar, ArrowRight,
  Zap, Layers, Palette, MousePointer, Globe, UserCheck, Lightbulb,
  CheckCircle2, ChevronRight, Play
} from "lucide-react";

const COLORS = {
  primary: "#0d9488",
  primaryLight: "#14b8a6",
  text: "#1e293b",
  textMuted: "#64748b",
  textLight: "#94a3b8",
  border: "#e2e8f0",
  borderLight: "#f1f5f9",
  background: "#ffffff",
  backgroundAlt: "#f8fafc",
  accent: "#0f766e",
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
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
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
      minHeight: "90vh",
      background: COLORS.background,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "120px 24px 80px",
      position: "relative",
    }}>
      <div style={{
        maxWidth: 800,
        textAlign: "center",
      }}>
        <span style={{
          fontSize: 11,
          fontWeight: 600,
          color: COLORS.primary,
          textTransform: "uppercase",
          letterSpacing: 1.5,
          display: "block",
          marginBottom: 24,
        }}>Our Technology</span>
        
        <h1 style={{
          fontSize: "clamp(36px, 5vw, 56px)",
          fontWeight: 600,
          color: COLORS.text,
          lineHeight: 1.15,
          letterSpacing: -1,
          marginBottom: 24,
        }}>
          Three co-pilots. One intelligence.<br />
          Built for everyone in the gym.
        </h1>
        
        <p style={{
          fontSize: 18,
          color: COLORS.textMuted,
          lineHeight: 1.7,
          maxWidth: 560,
          margin: "0 auto 40px",
        }}>
          Milton is a multi-sided coaching platform. Every role gets a co-pilot designed 
          specifically for how they think, what they need, and when they need it.
        </p>
        
        <div style={{
          display: "flex",
          gap: 12,
          justifyContent: "center",
          flexWrap: "wrap",
        }}>
          <button style={{
            padding: "14px 28px",
            background: COLORS.text,
            color: COLORS.background,
            borderRadius: 8,
            border: "none",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}>
            Get a Demo <ArrowRight size={16} />
          </button>
          <button style={{
            padding: "14px 28px",
            background: COLORS.background,
            color: COLORS.text,
            borderRadius: 8,
            border: `1px solid ${COLORS.border}`,
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}>
            <Play size={16} /> Watch Video
          </button>
        </div>
      </div>
    </section>
  );
}

/* Part Header */
function PartHeader({ part, title, description }) {
  return (
    <div style={{
      textAlign: "center",
      marginBottom: 64,
    }}>
      <span style={{
        fontSize: 11,
        fontWeight: 600,
        color: COLORS.primary,
        textTransform: "uppercase",
        letterSpacing: 1.5,
        display: "block",
        marginBottom: 12,
      }}>{part}</span>
      <h2 style={{
        fontSize: "clamp(28px, 4vw, 40px)",
        fontWeight: 600,
        color: COLORS.text,
        letterSpacing: -0.5,
      }}>{title}</h2>
      {description && (
        <p style={{
          fontSize: 16,
          color: COLORS.textMuted,
          marginTop: 16,
          maxWidth: 600,
          margin: "16px auto 0",
          lineHeight: 1.6,
        }}>{description}</p>
      )}
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
      features: ["Draft check-ins", "Flag at-risk members", "Track habit streaks", "Personalized context"],
    },
    {
      icon: BarChart3,
      title: "The Fitness Director & Owner Co-Pilot",
      description: "The intelligence layer your business has always needed. See trainer performance across your entire floor. Spot gaps before they become churn.",
      features: ["Portfolio insights", "Trainer performance", "Churn prediction", "Plain language reports"],
    },
    {
      icon: Users,
      title: "The Member Co-Pilot",
      description: "A personal guide that meets members where they are. Whether it's logging a meal, understanding progress, or knowing what to do next — the member co-pilot makes the healthy choice the easy choice.",
      features: ["Meal logging", "Progress tracking", "Session guidance", "Daily engagement"],
    },
  ];

  return (
    <Section style={{
      padding: "80px 24px",
      background: COLORS.backgroundAlt,
    }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <PartHeader part="Part I" title="The Platform" />
        
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}>
          {copilots.map((copilot, index) => (
            <CoPilotCard key={index} {...copilot} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function CoPilotCard({ icon: Icon, title, description, features }) {
  const [ref, visible] = useInView(0.1);
  
  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 40,
        alignItems: "center",
        background: COLORS.background,
        borderRadius: 12,
        padding: "40px",
        border: `1px solid ${COLORS.border}`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
      <div>
        <div style={{
          width: 48,
          height: 48,
          borderRadius: 10,
          background: COLORS.backgroundAlt,
          border: `1px solid ${COLORS.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}>
          <Icon size={22} color={COLORS.text} strokeWidth={1.5} />
        </div>
        
        <h3 style={{
          fontSize: 22,
          fontWeight: 600,
          color: COLORS.text,
          marginBottom: 12,
          letterSpacing: -0.3,
        }}>{title}</h3>
        
        <p style={{
          fontSize: 15,
          lineHeight: 1.7,
          color: COLORS.textMuted,
          marginBottom: 20,
        }}>{description}</p>
        
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
        }}>
          {features.map((feature, i) => (
            <span key={i} style={{
              padding: "6px 12px",
              background: COLORS.backgroundAlt,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 500,
              color: COLORS.textMuted,
            }}>
              {feature}
            </span>
          ))}
        </div>
      </div>
      
      <div style={{
        aspectRatio: "16/10",
        background: COLORS.backgroundAlt,
        borderRadius: 8,
        border: `1px solid ${COLORS.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Icon size={40} color={COLORS.borderLight} strokeWidth={1} />
      </div>
    </div>
  );
}

/* Milton Intelligence Section */
function IntelligenceSection() {
  return (
    <Section style={{
      padding: "80px 24px",
      background: COLORS.background,
    }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{
            fontSize: 11,
            fontWeight: 600,
            color: COLORS.primary,
            textTransform: "uppercase",
            letterSpacing: 1.5,
          }}>The Foundation</span>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 600,
            color: COLORS.text,
            marginTop: 12,
            letterSpacing: -0.5,
          }}>Built on Milton Intelligence</h2>
          <p style={{
            fontSize: 16,
            color: COLORS.textMuted,
            maxWidth: 640,
            margin: "16px auto 0",
            lineHeight: 1.7,
          }}>
            Every co-pilot runs on the same foundation: Milton Intelligence — a proprietary system 
            powered by multiple specialized small language models working in concert.
          </p>
        </div>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}>
          {[
            { icon: Brain, label: "Coaching Context", desc: "Understands methodology" },
            { icon: BarChart3, label: "Behavioral Data", desc: "Tracks patterns over time" },
            { icon: MessageSquare, label: "Communication", desc: "Natural conversation" },
            { icon: Layers, label: "Analytics", desc: "Portfolio-level insights" },
          ].map((item, i) => (
            <div key={i} style={{
              padding: 24,
              background: COLORS.backgroundAlt,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 10,
              textAlign: "center",
            }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                background: COLORS.background,
                border: `1px solid ${COLORS.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 12px",
              }}>
                <item.icon size={18} color={COLORS.text} strokeWidth={1.5} />
              </div>
              <h4 style={{
                fontSize: 14,
                fontWeight: 600,
                color: COLORS.text,
                marginBottom: 4,
              }}>{item.label}</h4>
              <p style={{
                fontSize: 13,
                color: COLORS.textLight,
              }}>{item.desc}</p>
            </div>
          ))}
        </div>
        
        <div style={{
          background: COLORS.backgroundAlt,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 10,
          padding: 32,
          textAlign: "center",
        }}>
          <h4 style={{
            fontSize: 16,
            fontWeight: 600,
            color: COLORS.text,
            marginBottom: 8,
          }}>And it's yours to shape.</h4>
          <p style={{
            fontSize: 14,
            color: COLORS.textMuted,
            lineHeight: 1.7,
            maxWidth: 520,
            margin: "0 auto",
          }}>
            Customize Milton Intelligence to reflect your methodology, language, and standards. 
            Your coaches talk a certain way. Your programs have a philosophy. Milton learns it.
          </p>
        </div>
      </div>
    </Section>
  );
}

/* Part II Header */
function PartTwoHeader() {
  return (
    <Section style={{
      padding: "80px 24px 48px",
      background: COLORS.backgroundAlt,
      textAlign: "center",
    }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <span style={{
          fontSize: 11,
          fontWeight: 600,
          color: COLORS.primary,
          textTransform: "uppercase",
          letterSpacing: 1.5,
        }}>Part II</span>
        <h2 style={{
          fontSize: "clamp(28px, 4vw, 40px)",
          fontWeight: 600,
          color: COLORS.text,
          marginTop: 12,
          letterSpacing: -0.5,
        }}>Built for the Real World</h2>
        <p style={{
          fontSize: 15,
          color: COLORS.textMuted,
          marginTop: 16,
          lineHeight: 1.7,
        }}>
          Building AI for fitness isn't a technology problem. It's a human problem. We've spent years 
          in gyms, on floors, inside coaching relationships, learning exactly where software breaks down.
        </p>
      </div>
    </Section>
  );
}

/* Design Principles Section with Images */
function DesignPrinciplesSection() {
  const principles = [
    {
      icon: Palette,
      title: "Beautiful by Design",
      description: "Milton doesn't look like enterprise software. It looks like something you want to open. Clean, considered, and calm — because the people using it are already managing a lot.",
      highlight: "We treat aesthetics as a functional requirement.",
      image: "/images/beautiful-design.jpg",
      reverse: false,
    },
    {
      icon: MousePointer,
      title: "Radically Simple",
      description: "Every feature had to earn its place. If it required a tutorial, we redesigned it. If it added friction, we cut it. The goal was always a product so intuitive anyone could use it.",
      highlight: "Simplicity at this level is harder than complexity.",
      image: "/images/radically-simple.jpg",
      reverse: true,
    },
    {
      icon: MessageSquare,
      title: "Natural Language First",
      description: "Milton is among the first platforms in fitness to make natural language the primary interface — not a chatbot bolted on, but the actual way you operate the software.",
      highlight: "A new paradigm for coaching software.",
      image: "/images/natural-language.jpg",
      reverse: false,
    },
  ];

  return (
    <Section style={{
      padding: "48px 24px 80px",
      background: COLORS.backgroundAlt,
    }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 64,
        }}>
          {principles.map((principle, i) => (
            <PrincipleCard key={i} {...principle} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function PrincipleCard({ icon: Icon, title, description, highlight, image, reverse }) {
  const [ref, visible] = useInView(0.1);
  
  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: 48,
        alignItems: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
      <div style={{ order: reverse ? 2 : 1 }}>
        <div style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          background: COLORS.background,
          border: `1px solid ${COLORS.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}>
          <Icon size={20} color={COLORS.text} strokeWidth={1.5} />
        </div>
        
        <h3 style={{
          fontSize: 24,
          fontWeight: 600,
          color: COLORS.text,
          marginBottom: 12,
          letterSpacing: -0.3,
        }}>{title}</h3>
        
        <p style={{
          fontSize: 15,
          lineHeight: 1.7,
          color: COLORS.textMuted,
          marginBottom: 16,
        }}>{description}</p>
        
        <p style={{
          fontSize: 14,
          fontWeight: 500,
          color: COLORS.primary,
        }}>{highlight}</p>
      </div>
      
      <div style={{ order: reverse ? 1 : 2 }}>
        <div style={{
          borderRadius: 12,
          overflow: "hidden",
          border: `1px solid ${COLORS.border}`,
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        }}>
          <img 
            src={image} 
            alt={title}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              aspectRatio: "4/3",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* Omni Section with Hero Image */
function OmniSection() {
  const [ref, visible] = useInView(0.1);
  
  const omnis = [
    {
      icon: Mail,
      title: "Omni-channel",
      description: "SMS, in-app, email, push — communicate across every channel natively.",
    },
    {
      icon: Monitor,
      title: "Omni-device",
      description: "Mobile, tablet, desktop — built for the device it lives on.",
    },
    {
      icon: Calendar,
      title: "Omni-ops",
      description: "Scheduling, coaching, retention, reporting — one platform runs it all.",
    },
    {
      icon: Globe,
      title: "Omni-app",
      description: "Connects with tools you already use. No rip-and-replace required.",
    },
  ];

  return (
    <Section style={{
      padding: "80px 24px",
      background: COLORS.background,
    }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        {/* Hero Image */}
        <div 
          ref={ref}
          style={{
            marginBottom: 64,
            borderRadius: 16,
            overflow: "hidden",
            border: `1px solid ${COLORS.border}`,
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <img 
            src="/images/omni-everything.jpg" 
            alt="Omni-channel devices"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              aspectRatio: "21/9",
              objectFit: "cover",
            }}
          />
        </div>
        
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 600,
            color: COLORS.text,
            letterSpacing: -0.5,
          }}>Omni-Everything</h2>
          <p style={{
            fontSize: 15,
            color: COLORS.textMuted,
            marginTop: 12,
          }}>Milton goes wherever your business goes.</p>
        </div>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
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
  
  return (
    <div
      ref={ref}
      style={{
        background: COLORS.backgroundAlt,
        borderRadius: 10,
        padding: 28,
        border: `1px solid ${COLORS.border}`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease-out ${index * 0.1}s, transform 0.5s ease-out ${index * 0.1}s`,
      }}
    >
      <div style={{
        width: 40,
        height: 40,
        borderRadius: 8,
        background: COLORS.background,
        border: `1px solid ${COLORS.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
      }}>
        <Icon size={18} color={COLORS.text} strokeWidth={1.5} />
      </div>
      
      <h3 style={{
        fontSize: 16,
        fontWeight: 600,
        color: COLORS.text,
        marginBottom: 8,
      }}>{title}</h3>
      
      <p style={{
        fontSize: 14,
        lineHeight: 1.6,
        color: COLORS.textMuted,
      }}>{description}</p>
    </div>
  );
}

/* User-First Section with Image */
function UserFirstSection() {
  const [ref, visible] = useInView(0.1);
  
  return (
    <Section style={{
      padding: "80px 24px",
      background: COLORS.backgroundAlt,
    }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 48,
          alignItems: "center",
        }}>
          {/* Image */}
          <div 
            ref={ref}
            style={{
              borderRadius: 12,
              overflow: "hidden",
              border: `1px solid ${COLORS.border}`,
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
          >
            <img 
              src="/images/user-first.jpg" 
              alt="People using Milton"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                aspectRatio: "4/3",
                objectFit: "cover",
              }}
            />
          </div>
          
          <div>
            <span style={{
              fontSize: 11,
              fontWeight: 600,
              color: COLORS.primary,
              textTransform: "uppercase",
              letterSpacing: 1.5,
            }}>Philosophy</span>
            <h2 style={{
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 600,
              color: COLORS.text,
              marginTop: 12,
              letterSpacing: -0.3,
            }}>User-First, at Every Layer</h2>
            <p style={{
              fontSize: 15,
              color: COLORS.textMuted,
              marginTop: 16,
              lineHeight: 1.7,
            }}>
              Most software is built around the product. Milton is built around the person using it.
            </p>
            <p style={{
              fontSize: 14,
              color: COLORS.textMuted,
              marginTop: 12,
              lineHeight: 1.7,
            }}>
              A coach between sessions gets a different experience than an owner building a quarterly review. 
              A first-time member logging meals gets something different than a seasoned athlete.
            </p>
            <p style={{
              fontSize: 14,
              color: COLORS.primary,
              marginTop: 16,
              fontWeight: 500,
            }}>
              The interface adapts. The intelligence adapts. The communication adapts.
            </p>
            
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginTop: 24,
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
                  gap: 10,
                }}>
                  <CheckCircle2 size={16} color={COLORS.primary} strokeWidth={2} />
                  <span style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: COLORS.text,
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

/* Co-Design Section with Image */
function CoDesignSection() {
  const [ref, visible] = useInView(0.1);
  
  return (
    <Section style={{
      padding: "80px 24px",
      background: COLORS.background,
    }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 48,
          alignItems: "center",
        }}>
          <div>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: COLORS.backgroundAlt,
              border: `1px solid ${COLORS.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}>
              <Lightbulb size={20} color={COLORS.text} strokeWidth={1.5} />
            </div>
            
            <h2 style={{
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 600,
              color: COLORS.text,
              letterSpacing: -0.3,
            }}>Crafted Through Co-Design</h2>
            
            <p style={{
              fontSize: 15,
              color: COLORS.textMuted,
              marginTop: 20,
              lineHeight: 1.8,
            }}>
              We didn't build Milton in a lab and ship it to gyms. We built it with gyms. 
              With coaches who told us what broke their trust in software. With members who showed us 
              where they dropped off. With owners who described what kept them up at night.
            </p>
            
            <p style={{
              fontSize: 14,
              color: COLORS.textMuted,
              marginTop: 16,
              lineHeight: 1.7,
            }}>
              Every detail — the way a check-in reads, the moment a notification fires, the color of a progress ring — 
              was iterated in the real world, with real people, over real time.
            </p>
            
            <div style={{
              background: COLORS.backgroundAlt,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 10,
              padding: "20px 24px",
              marginTop: 24,
            }}>
              <p style={{
                fontSize: 15,
                fontWeight: 500,
                color: COLORS.text,
                fontStyle: "italic",
              }}>
                "That's not a process. That's a philosophy."
              </p>
            </div>
          </div>
          
          {/* Image */}
          <div 
            ref={ref}
            style={{
              borderRadius: 12,
              overflow: "hidden",
              border: `1px solid ${COLORS.border}`,
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
          >
            <img 
              src="/images/co-design.jpg" 
              alt="Team collaboration"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                aspectRatio: "4/3",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

/* Closing Section */
function ClosingSection() {
  return (
    <Section style={{
      padding: "100px 24px",
      background: COLORS.backgroundAlt,
      textAlign: "center",
      borderTop: `1px solid ${COLORS.border}`,
    }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <h2 style={{
          fontSize: "clamp(22px, 3vw, 28px)",
          fontWeight: 600,
          color: COLORS.text,
          lineHeight: 1.5,
        }}>
          Milton is the coaching platform that respects the craft — because it was built by people who understand it.
        </h2>
        
        <div style={{
          display: "flex",
          gap: 12,
          justifyContent: "center",
          marginTop: 40,
          flexWrap: "wrap",
        }}>
          <button style={{
            padding: "14px 28px",
            background: COLORS.text,
            color: COLORS.background,
            borderRadius: 8,
            border: "none",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}>
            Schedule a Demo <ArrowRight size={16} />
          </button>
          <button style={{
            padding: "14px 28px",
            background: COLORS.background,
            color: COLORS.text,
            borderRadius: 8,
            border: `1px solid ${COLORS.border}`,
            fontSize: 14,
            fontWeight: 500,
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
      background: COLORS.background,
      minHeight: "100vh",
    }}>
      {/* Back button */}
      <button
        onClick={() => onNavigate("home")}
        style={{
          position: "fixed",
          top: 24,
          left: 24,
          zIndex: 1000,
          padding: "10px 20px",
          background: COLORS.background,
          color: COLORS.text,
          borderRadius: 8,
          border: `1px solid ${COLORS.border}`,
          fontSize: 13,
          fontWeight: 500,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <ChevronRight size={14} style={{ transform: "rotate(180deg)" }} />
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
