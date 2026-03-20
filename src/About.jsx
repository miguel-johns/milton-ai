import { useState, useEffect, useRef } from "react";
import {
  Heart, Users, Brain, Activity, Dumbbell, GraduationCap,
  Stethoscope, Building2, MapPin, Clock, Award, Target,
  Sparkles, ChevronRight, ArrowUpRight, Shield, UserCheck,
  FlaskConical, BookOpen, Linkedin
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
      minHeight: "70vh",
      background: `linear-gradient(165deg, ${COLORS.navy} 0%, ${COLORS.deepTeal} 100%)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "clamp(80px, 12vw, 140px) clamp(20px, 5vw, 80px)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background decoration */}
      <div style={{
        position: "absolute",
        top: -200,
        right: -200,
        width: 600,
        height: 600,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${COLORS.emerald}12, transparent 70%)`,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: -150,
        left: -150,
        width: 400,
        height: 400,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${COLORS.teal}15, transparent 70%)`,
        pointerEvents: "none",
      }} />
      
      <div style={{
        maxWidth: 900,
        textAlign: "center",
        position: "relative",
        zIndex: 1,
      }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 16px",
          background: "rgba(255,255,255,0.08)",
          borderRadius: 100,
          marginBottom: 32,
          border: "1px solid rgba(255,255,255,0.12)",
        }}>
          <Heart size={16} color={COLORS.emerald} />
          <span style={{
            fontSize: 14,
            fontWeight: 600,
            color: "rgba(255,255,255,0.9)",
            letterSpacing: 0.5,
          }}>About Milton AI</span>
        </div>
        
        <h1 style={{
          fontSize: "clamp(36px, 6vw, 64px)",
          fontWeight: 800,
          color: COLORS.white,
          lineHeight: 1.1,
          letterSpacing: -2,
          marginBottom: 24,
        }}>
          On a mission to help eradicate{" "}
          <span style={{ color: COLORS.emerald }}>obesity</span>,{" "}
          <span style={{ color: COLORS.mint }}>type-2 diabetes</span>, and{" "}
          <span style={{ color: COLORS.emerald }}>heart disease</span>{" "}
          from the world.
        </h1>
        
        <p style={{
          fontSize: "clamp(18px, 2vw, 22px)",
          color: "rgba(255,255,255,0.7)",
          lineHeight: 1.6,
          maxWidth: 700,
          margin: "0 auto",
        }}>
          We believe that personalized fitness coaching powered by AI and guided by health professionals 
          can transform lives and create lasting change.
        </p>
      </div>
    </section>
  );
}

/* Three Pillars Section */
function PillarsSection() {
  const pillars = [
    {
      icon: Dumbbell,
      title: "Fitness is the Frontline",
      description: "Exercise is medicine. We put fitness at the core of preventive health, believing that consistent movement and strength training are the most powerful tools against chronic disease.",
      color: COLORS.emerald,
    },
    {
      icon: Stethoscope,
      title: "Health Professional In-the-Loop",
      description: "Our AI doesn't replace healthcare providers - it amplifies them. Every recommendation is informed by clinical best practices and designed to work alongside your care team.",
      color: COLORS.teal,
    },
    {
      icon: Brain,
      title: "AI for a Healthier World",
      description: "We harness the power of artificial intelligence to deliver personalized coaching at scale, making world-class fitness guidance accessible to everyone, everywhere.",
      color: COLORS.mint,
    },
  ];

  return (
    <Section style={{
      padding: "clamp(60px, 10vw, 120px) clamp(20px, 5vw, 80px)",
      background: COLORS.offWhite,
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span style={{
            fontSize: 13,
            fontWeight: 700,
            color: COLORS.teal,
            textTransform: "uppercase",
            letterSpacing: 2,
          }}>Our Philosophy</span>
          <h2 style={{
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 800,
            color: COLORS.navy,
            marginTop: 12,
            letterSpacing: -1,
          }}>Three Pillars of Our Approach</h2>
        </div>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 32,
        }}>
          {pillars.map((pillar, index) => (
            <PillarCard key={index} {...pillar} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function PillarCard({ icon: Icon, title, description, color, delay }) {
  const [ref, visible] = useInView(0.15);
  const [hovered, setHovered] = useState(false);
  
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `linear-gradient(165deg, ${COLORS.navy}, ${COLORS.deepTeal})` : COLORS.white,
        borderRadius: 24,
        padding: "clamp(32px, 4vw, 48px)",
        border: hovered ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(8,69,94,0.08)",
        boxShadow: hovered ? "0 24px 64px rgba(8,69,94,0.2)" : "0 4px 24px rgba(8,69,94,0.06)",
        transition: "all 0.5s cubic-bezier(.16,1,.3,1)",
        opacity: visible ? 1 : 0,
        transform: visible ? `translateY(0)${hovered ? " translateY(-8px)" : ""}` : "translateY(40px)",
        transitionDelay: `${delay}s`,
      }}
    >
      <div style={{
        width: 64,
        height: 64,
        borderRadius: 20,
        background: hovered ? "rgba(255,255,255,0.12)" : `${color}15`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 24,
        transition: "all 0.4s",
      }}>
        <Icon size={28} color={hovered ? COLORS.emerald : color} strokeWidth={1.8} />
      </div>
      
      <h3 style={{
        fontSize: "clamp(22px, 2.5vw, 26px)",
        fontWeight: 700,
        color: hovered ? COLORS.white : COLORS.navy,
        marginBottom: 16,
        transition: "color 0.4s",
      }}>{title}</h3>
      
      <p style={{
        fontSize: 16,
        lineHeight: 1.7,
        color: hovered ? "rgba(255,255,255,0.7)" : COLORS.slate,
        transition: "color 0.4s",
      }}>{description}</p>
    </div>
  );
}

/* Leadership Section */
function LeadershipSection() {
  const leaders = [
    {
      name: "Leadership Team",
      role: "Executive Leadership",
      description: "Our founding team brings together decades of experience in fitness, technology, and healthcare.",
    },
  ];

  return (
    <Section style={{
      padding: "clamp(60px, 10vw, 120px) clamp(20px, 5vw, 80px)",
      background: COLORS.white,
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span style={{
            fontSize: 13,
            fontWeight: 700,
            color: COLORS.teal,
            textTransform: "uppercase",
            letterSpacing: 2,
          }}>The Team</span>
          <h2 style={{
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 800,
            color: COLORS.navy,
            marginTop: 12,
            letterSpacing: -1,
          }}>Meet Our Leadership</h2>
        </div>
        
        <div style={{
          background: `linear-gradient(165deg, ${COLORS.navy}, ${COLORS.deepTeal})`,
          borderRadius: 32,
          padding: "clamp(48px, 6vw, 80px)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${COLORS.emerald}10, transparent 70%)`,
          }} />
          
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
            marginBottom: 32,
          }}>
            {[Users, Shield, Target].map((Icon, i) => (
              <div key={i} style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: "rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Icon size={24} color={COLORS.emerald} />
              </div>
            ))}
          </div>
          
          <h3 style={{
            fontSize: "clamp(24px, 3vw, 32px)",
            fontWeight: 700,
            color: COLORS.white,
            marginBottom: 16,
          }}>Building the Future of Fitness</h3>
          
          <p style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.7,
            maxWidth: 600,
            margin: "0 auto",
          }}>
            Our leadership team combines expertise in AI, fitness science, and healthcare 
            to create technology that truly transforms lives.
          </p>
        </div>
      </div>
    </Section>
  );
}

/* Home Base Section */
function HomeBaseSection() {
  return (
    <Section style={{
      padding: "clamp(60px, 10vw, 120px) clamp(20px, 5vw, 80px)",
      background: COLORS.offWhite,
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span style={{
            fontSize: 13,
            fontWeight: 700,
            color: COLORS.teal,
            textTransform: "uppercase",
            letterSpacing: 2,
          }}>Our Roots</span>
          <h2 style={{
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 800,
            color: COLORS.navy,
            marginTop: 12,
            letterSpacing: -1,
          }}>Our Home Base</h2>
        </div>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 40,
          alignItems: "center",
        }}>
          {/* Image placeholder */}
          <div style={{
            aspectRatio: "4/3",
            background: `linear-gradient(165deg, ${COLORS.deepTeal}, ${COLORS.navy})`,
            borderRadius: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(circle at 30% 70%, ${COLORS.emerald}20, transparent 60%)`,
            }} />
            <Building2 size={80} color="rgba(255,255,255,0.3)" strokeWidth={1} />
          </div>
          
          {/* Content */}
          <div>
            <h3 style={{
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 700,
              color: COLORS.navy,
              marginBottom: 24,
            }}>A Partnership Built on Trust</h3>
            
            <p style={{
              fontSize: 17,
              color: COLORS.slate,
              lineHeight: 1.8,
              marginBottom: 32,
            }}>
              We've partnered with a local gym that's been serving our community for nearly 
              <strong style={{ color: COLORS.navy }}> 20 years</strong>. Run by a dedicated husband and wife team 
              with <strong style={{ color: COLORS.navy }}>6 certified trainers</strong>, they own their building and land - 
              a testament to their commitment and stability.
            </p>
            
            <p style={{
              fontSize: 17,
              color: COLORS.slate,
              lineHeight: 1.8,
              marginBottom: 32,
            }}>
              This partnership allows us to work directly with real coaches, real members, and real results. 
              Together, we're creating the best possible experience for our customers, combining their 
              decades of hands-on expertise with our AI-powered technology.
            </p>
            
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
            }}>
              {[
                { icon: Clock, label: "20 Years Experience" },
                { icon: Users, label: "6 Certified Trainers" },
                { icon: Building2, label: "Locally Owned" },
                { icon: MapPin, label: "Our Hometown" },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 16px",
                  background: `${COLORS.teal}10`,
                  borderRadius: 100,
                }}>
                  <item.icon size={16} color={COLORS.teal} />
                  <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.navy }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* Outcomes Team Section */
function OutcomesTeamSection() {
  const team = [
    {
      name: "Dr. Matt",
      role: "MD",
      specialty: "Medical Oversight",
    },
    {
      name: "Chun Yong",
      role: "Exercise Physiologist",
      specialty: "Movement Science",
    },
    {
      name: "Integrated Diabetes Services",
      role: "Clinical Partner",
      specialty: "Diabetes Management",
    },
  ];

  const credentials = [
    "MD",
    "Exercise Physiologist",
    "RDN",
    "Metabolic Health Doctor",
    "CDCES",
    "RN",
  ];

  return (
    <Section style={{
      padding: "clamp(60px, 10vw, 120px) clamp(20px, 5vw, 80px)",
      background: COLORS.white,
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span style={{
            fontSize: 13,
            fontWeight: 700,
            color: COLORS.teal,
            textTransform: "uppercase",
            letterSpacing: 2,
          }}>Clinical Excellence</span>
          <h2 style={{
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 800,
            color: COLORS.navy,
            marginTop: 12,
            letterSpacing: -1,
          }}>Our Outcomes Team</h2>
          <p style={{
            fontSize: 18,
            color: COLORS.slate,
            maxWidth: 600,
            margin: "16px auto 0",
            lineHeight: 1.6,
          }}>
            A multidisciplinary team ensuring every recommendation is clinically sound.
          </p>
        </div>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
          marginBottom: 48,
        }}>
          {team.map((member, i) => (
            <div key={i} style={{
              background: COLORS.offWhite,
              borderRadius: 20,
              padding: 32,
              textAlign: "center",
              border: "1px solid rgba(8,69,94,0.06)",
            }}>
              <div style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: `linear-gradient(165deg, ${COLORS.teal}, ${COLORS.deepTeal})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}>
                <Stethoscope size={32} color={COLORS.white} />
              </div>
              <h4 style={{
                fontSize: 20,
                fontWeight: 700,
                color: COLORS.navy,
                marginBottom: 4,
              }}>{member.name}</h4>
              <p style={{
                fontSize: 14,
                color: COLORS.teal,
                fontWeight: 600,
                marginBottom: 8,
              }}>{member.role}</p>
              <p style={{
                fontSize: 14,
                color: COLORS.slate,
              }}>{member.specialty}</p>
            </div>
          ))}
        </div>
        
        {/* Credentials bar */}
        <div style={{
          background: `linear-gradient(165deg, ${COLORS.navy}, ${COLORS.deepTeal})`,
          borderRadius: 16,
          padding: "24px 32px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 16,
        }}>
          {credentials.map((cred, i) => (
            <div key={i} style={{
              padding: "8px 20px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: 100,
              fontSize: 14,
              fontWeight: 600,
              color: COLORS.white,
            }}>{cred}</div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* Chief Coach Officer Section */
function ChiefCoachSection() {
  return (
    <Section style={{
      padding: "clamp(60px, 10vw, 120px) clamp(20px, 5vw, 80px)",
      background: `linear-gradient(165deg, ${COLORS.navy} 0%, ${COLORS.deepTeal} 100%)`,
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <div style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
          border: "3px solid rgba(255,255,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 32px",
        }}>
          <UserCheck size={48} color={COLORS.emerald} />
        </div>
        
        <span style={{
          fontSize: 13,
          fontWeight: 700,
          color: COLORS.emerald,
          textTransform: "uppercase",
          letterSpacing: 2,
        }}>Chief Coach Officer</span>
        
        <h2 style={{
          fontSize: "clamp(36px, 5vw, 52px)",
          fontWeight: 800,
          color: COLORS.white,
          marginTop: 16,
          letterSpacing: -1,
        }}>Johnny O</h2>
        
        <p style={{
          fontSize: 18,
          color: "rgba(255,255,255,0.7)",
          lineHeight: 1.7,
          maxWidth: 600,
          margin: "24px auto 0",
        }}>
          Leading our coaching philosophy and ensuring every interaction embodies the Milton standard 
          of excellence. Johnny brings years of hands-on coaching experience to guide our AI development.
        </p>
      </div>
    </Section>
  );
}

/* Research Partner Section */
function ResearchPartnerSection() {
  return (
    <Section style={{
      padding: "clamp(60px, 10vw, 120px) clamp(20px, 5vw, 80px)",
      background: COLORS.offWhite,
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 40,
          alignItems: "center",
        }}>
          <div>
            <span style={{
              fontSize: 13,
              fontWeight: 700,
              color: COLORS.teal,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}>Research Partner</span>
            
            <h2 style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 800,
              color: COLORS.navy,
              marginTop: 12,
              letterSpacing: -1,
            }}>Wichita State University</h2>
            
            <p style={{
              fontSize: 17,
              color: COLORS.slate,
              lineHeight: 1.8,
              marginTop: 24,
            }}>
              Partnering with WSU to develop <strong style={{ color: COLORS.navy }}>Small Language Models</strong> specifically 
              designed for fitness coaching. Our research collaboration is pushing the boundaries of 
              what's possible with efficient, specialized AI.
            </p>
            
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginTop: 32,
              padding: 20,
              background: COLORS.white,
              borderRadius: 16,
              border: "1px solid rgba(8,69,94,0.08)",
            }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                background: `${COLORS.teal}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <GraduationCap size={28} color={COLORS.teal} />
              </div>
              <div>
                <p style={{ fontSize: 16, fontWeight: 600, color: COLORS.navy }}>Dr. XYZ</p>
                <p style={{ fontSize: 14, color: COLORS.slate }}>Research Lead</p>
              </div>
            </div>
          </div>
          
          <div style={{
            background: COLORS.white,
            borderRadius: 24,
            padding: 40,
            border: "1px solid rgba(8,69,94,0.08)",
          }}>
            <h3 style={{
              fontSize: 20,
              fontWeight: 700,
              color: COLORS.navy,
              marginBottom: 24,
            }}>Focus Areas</h3>
            
            {[
              { icon: Brain, label: "Small Language Models", desc: "Efficient AI for edge deployment" },
              { icon: FlaskConical, label: "Fitness AI Research", desc: "Domain-specific training methods" },
              { icon: BookOpen, label: "Academic Validation", desc: "Peer-reviewed research" },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 16,
                padding: "16px 0",
                borderBottom: i < 2 ? "1px solid rgba(8,69,94,0.06)" : "none",
              }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: `${COLORS.emerald}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <item.icon size={20} color={COLORS.emerald} />
                </div>
                <div>
                  <p style={{ fontSize: 16, fontWeight: 600, color: COLORS.navy }}>{item.label}</p>
                  <p style={{ fontSize: 14, color: COLORS.slate, marginTop: 2 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* Milton Originals Section */
function OriginalsSection() {
  const originals = [
    { initials: "JO", name: "Coach 1" },
    { initials: "MK", name: "Coach 2" },
    { initials: "SR", name: "Coach 3" },
    { initials: "TB", name: "Coach 4" },
    { initials: "LC", name: "Coach 5" },
    { initials: "AH", name: "Coach 6" },
  ];

  return (
    <Section style={{
      padding: "clamp(60px, 10vw, 120px) clamp(20px, 5vw, 80px)",
      background: COLORS.white,
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 16px",
            background: `${COLORS.emerald}15`,
            borderRadius: 100,
            marginBottom: 16,
          }}>
            <Sparkles size={16} color={COLORS.emerald} />
            <span style={{
              fontSize: 13,
              fontWeight: 700,
              color: COLORS.emerald,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}>The Founders</span>
          </div>
          
          <h2 style={{
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 800,
            color: COLORS.navy,
            letterSpacing: -1,
          }}>Milton Originals</h2>
          
          <p style={{
            fontSize: 18,
            color: COLORS.slate,
            maxWidth: 600,
            margin: "16px auto 0",
            lineHeight: 1.6,
          }}>
            The original coaches who helped shape Milton. Their expertise and feedback 
            built the foundation of everything we do.
          </p>
        </div>
        
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 24,
        }}>
          {originals.map((coach, i) => (
            <div key={i} style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}>
              <div style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: `linear-gradient(165deg, ${COLORS.teal}, ${COLORS.deepTeal})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: 700,
                color: COLORS.white,
              }}>{coach.initials}</div>
              <p style={{
                fontSize: 14,
                fontWeight: 600,
                color: COLORS.navy,
              }}>{coach.name}</p>
            </div>
          ))}
        </div>
        
        <div style={{
          textAlign: "center",
          marginTop: 48,
          padding: "32px",
          background: COLORS.offWhite,
          borderRadius: 16,
        }}>
          <p style={{
            fontSize: 16,
            color: COLORS.slate,
            fontStyle: "italic",
          }}>
            "These coaches didn't just test our product - they shaped it. Every feature, every response, 
            every interaction carries their wisdom."
          </p>
        </div>
      </div>
    </Section>
  );
}

/* Main About Component */
export default function About({ onNavigate }) {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <HeroSection />
      <PillarsSection />
      <LeadershipSection />
      <HomeBaseSection />
      <OutcomesTeamSection />
      <ChiefCoachSection />
      <ResearchPartnerSection />
      <OriginalsSection />
    </div>
  );
}
