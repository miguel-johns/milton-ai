import { useState, useEffect } from "react";

const sections = [
  { id: "hero", label: "" },
  { id: "problem", num: "01", label: "THE PROBLEM" },
  { id: "solution", num: "02", label: "THE SOLUTION" },
  { id: "platform", num: "03", label: "THE PLATFORM" },
  { id: "expertise", num: "04", label: "EXPERTISE" },
  { id: "built-with", num: "05", label: "BUILT WITH YOU" },
  { id: "ai-partner", num: "06", label: "AI PARTNER" },
  { id: "pricing", num: "07", label: "PRICING" },
];

function useBreakpoint() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return { mobile: w < 640, tablet: w >= 640 && w < 1024, desktop: w >= 1024, w };
}

function Accent({ children }) {
  return <span style={{ color: "#0d9aa5" }}>{children}</span>;
}

export default function MiltonHomepage() {
  const { mobile, tablet } = useBreakpoint();

  return (
    <div style={{ 
      position: "relative", 
      zIndex: 1, 
      maxWidth: 1400, 
      margin: "0 auto", 
      padding: mobile ? "0 20px" : "0 60px" 
    }}>

      {/* HERO */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: mobile ? 100 : 140,
        paddingBottom: mobile ? 60 : 100,
      }}>
        <div style={{
          display: "flex",
          flexDirection: mobile ? "column" : "row",
          alignItems: mobile ? "flex-start" : "flex-end",
          justifyContent: "space-between",
          gap: mobile ? 32 : 60,
          marginBottom: mobile ? 40 : 80,
        }}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: mobile ? 42 : tablet ? 64 : 86,
            fontWeight: 400,
            lineHeight: 1.0,
            color: "#fff",
            margin: 0,
            maxWidth: mobile ? "100%" : "60%",
            letterSpacing: "-0.02em",
          }}>
            Great trainers are hard to find, impossible to keep, and expensive to build.
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: mobile ? 16 : 18,
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.6)",
            margin: 0,
            maxWidth: mobile ? "100%" : 380,
          }}>
            Milton is the first platform built to help fitness directors develop, manage, and retain personal trainers.
          </p>
        </div>

        <div style={{ 
          display: "flex", 
          gap: 16, 
          marginBottom: mobile ? 48 : 80,
          flexWrap: "wrap",
        }}>
          <a href="#/book" style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
            fontWeight: 500,
            padding: "14px 32px",
            background: "#fff",
            color: "#0a0a0a",
            borderRadius: 100,
            textDecoration: "none",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}>
            Book a Call
          </a>
          <a href="#/the-platform" style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
            fontWeight: 500,
            padding: "14px 32px",
            background: "transparent",
            color: "#fff",
            borderRadius: 100,
            textDecoration: "none",
            border: "1px solid rgba(255,255,255,0.2)",
          }}>
            See How It Works
          </a>
        </div>

        {/* Hero Image - Full width dramatic */}
        <div style={{
          width: "100%",
          aspectRatio: mobile ? "4/3" : "21/9",
          borderRadius: mobile ? 16 : 24,
          overflow: "hidden",
          background: "linear-gradient(135deg, #0d9aa5 0%, #08455e 100%)",
          position: "relative",
        }}>
          <img
            src="/placeholder.svg?height=600&width=1400"
            alt="Milton dashboard overview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.9,
            }}
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(10,10,10,0.4) 0%, transparent 50%)",
          }} />
        </div>
      </section>

      {/* PROBLEM SECTION - Dramatic full-bleed */}
      <section style={{ 
        padding: mobile ? "80px 0" : "160px 0",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{
          display: "flex",
          flexDirection: mobile ? "column" : "row",
          gap: mobile ? 48 : 100,
        }}>
          {/* Left - Large image */}
          <div style={{
            flex: mobile ? "none" : "1.2",
            position: "relative",
          }}>
            <div style={{
              aspectRatio: mobile ? "4/3" : "3/4",
              borderRadius: mobile ? 16 : 24,
              overflow: "hidden",
              background: "linear-gradient(180deg, rgba(13,154,165,0.1) 0%, rgba(8,69,94,0.2) 100%)",
            }}>
              <img
                src="/placeholder.svg?height=800&width=600"
                alt="Trainer struggling with complexity"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            {/* Floating stat */}
            <div style={{
              position: "absolute",
              bottom: mobile ? -20 : -30,
              right: mobile ? 20 : -40,
              background: "#0a0a0a",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 16,
              padding: mobile ? "20px 24px" : "28px 36px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: mobile ? 48 : 64,
                fontWeight: 400,
                color: "#0d9aa5",
                lineHeight: 1,
              }}>80%</div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: "rgba(255,255,255,0.5)",
                marginTop: 8,
              }}>don&apos;t make it to year five</div>
            </div>
          </div>

          {/* Right - Content */}
          <div style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingTop: mobile ? 40 : 0,
          }}>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#0d9aa5",
              marginBottom: 24,
            }}>THE PROBLEM</span>
            
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: mobile ? 36 : tablet ? 48 : 56,
              fontWeight: 400,
              lineHeight: 1.1,
              color: "#fff",
              margin: "0 0 32px 0",
            }}>
              You already know <Accent>this</Accent> story.
            </h2>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: mobile ? 16 : 18,
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.6)",
              margin: "0 0 24px 0",
            }}>
              You hire a trainer. You spend months getting them up to speed — teaching them your systems, your standards, how to actually keep clients coming back.
            </p>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: mobile ? 16 : 18,
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.6)",
              margin: "0 0 24px 0",
            }}>
              Then they leave. Or they stay — but plateau. Sessions drop off. Clients stop rebooking. And you&apos;re buried in spreadsheets trying to figure out which trainer needs what kind of help.
            </p>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: mobile ? 16 : 18,
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.5)",
              margin: 0,
              fontStyle: "italic",
              borderLeft: "2px solid #0d9aa5",
              paddingLeft: 20,
            }}>
              Meanwhile, your fitness director is spending 15+ hours a week cross-referencing data just to answer: how are my trainers actually doing?
            </p>
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION - Inverted layout */}
      <section style={{ 
        padding: mobile ? "80px 0" : "160px 0",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{
          display: "flex",
          flexDirection: mobile ? "column" : "row-reverse",
          gap: mobile ? 48 : 100,
        }}>
          {/* Right - Large image */}
          <div style={{
            flex: mobile ? "none" : "1.2",
            position: "relative",
          }}>
            <div style={{
              aspectRatio: mobile ? "4/3" : "4/3",
              borderRadius: mobile ? 16 : 24,
              overflow: "hidden",
              background: "linear-gradient(180deg, rgba(13,154,165,0.15) 0%, rgba(8,69,94,0.1) 100%)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <img
                src="/placeholder.svg?height=700&width=900"
                alt="Milton dashboard interface"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>

          {/* Left - Content */}
          <div style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#0d9aa5",
              marginBottom: 24,
            }}>THE SOLUTION</span>
            
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: mobile ? 36 : tablet ? 48 : 56,
              fontWeight: 400,
              lineHeight: 1.1,
              color: "#fff",
              margin: "0 0 32px 0",
            }}>
              That&apos;s why we built <Accent>Milton.</Accent>
            </h2>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: mobile ? 16 : 18,
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.6)",
              margin: "0 0 24px 0",
            }}>
              Every AI tool in fitness is chasing the same two things: an AI coach for your members or an AI receptionist for your front desk.
            </p>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: mobile ? 16 : 18,
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.6)",
              margin: "0 0 24px 0",
            }}>
              Nobody is building AI around the problem that actually drives your revenue, your retention, and your reputation — how well your trainers perform.
            </p>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: mobile ? 16 : 18,
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.6)",
              margin: 0,
            }}>
              Milton gives your fitness director the intelligence to develop every trainer on the floor — and puts a co-pilot in every trainer&apos;s pocket.
            </p>
          </div>
        </div>
      </section>

      {/* PLATFORM SECTION - Feature grid */}
      <section style={{ 
        padding: mobile ? "80px 0" : "160px 0",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ 
          textAlign: "center", 
          marginBottom: mobile ? 48 : 80,
        }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#0d9aa5",
            display: "block",
            marginBottom: 24,
          }}>THE PLATFORM</span>
          
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: mobile ? 36 : tablet ? 48 : 64,
            fontWeight: 400,
            lineHeight: 1.1,
            color: "#fff",
            margin: "0 auto",
            maxWidth: 800,
          }}>
            A platform and a team built around your <Accent>trainers.</Accent>
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)",
          gap: mobile ? 20 : 24,
        }}>
          {[
            {
              label: "For your fitness director",
              title: "One dashboard to rule them all",
              desc: "Replace the spreadsheets, cross-referencing, and guesswork. See which trainers are thriving, which are stuck, and exactly what to do about it.",
            },
            {
              label: "For your coaches",
              title: "AI co-pilot on the floor",
              desc: "Smart session tracking, progressive programming, client insights — all in one screen. Better information, not more software.",
            },
            {
              label: "For your business",
              title: "Performance meets revenue",
              desc: "The connective tissue between trainer performance and business results. When trainers improve, results compound.",
            },
          ].map((item, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: mobile ? 16 : 20,
              padding: mobile ? 28 : 40,
              transition: "border-color 0.3s ease, background 0.3s ease",
            }}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#0d9aa5",
                display: "block",
                marginBottom: 20,
              }}>{item.label}</span>
              <h3 style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: mobile ? 20 : 24,
                fontWeight: 500,
                color: "#fff",
                margin: "0 0 16px 0",
                lineHeight: 1.3,
              }}>{item.title}</h3>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.5)",
                margin: 0,
              }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERTISE SECTION */}
      <section style={{ 
        padding: mobile ? "80px 0" : "160px 0",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{
          display: "flex",
          flexDirection: mobile ? "column" : "row",
          gap: mobile ? 48 : 100,
        }}>
          {/* Left - Content */}
          <div style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#0d9aa5",
              marginBottom: 24,
            }}>EXPERTISE</span>
            
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: mobile ? 36 : tablet ? 48 : 56,
              fontWeight: 400,
              lineHeight: 1.1,
              color: "#fff",
              margin: "0 0 32px 0",
            }}>
              Technology gets you the data. Expertise gets you the <Accent>results.</Accent>
            </h2>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: mobile ? 16 : 18,
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.6)",
              margin: "0 0 24px 0",
            }}>
              Most platforms stop at the dashboard. Milton doesn&apos;t. Our team includes veteran coaches and fitness directors who&apos;ve spent decades on the gym floor.
            </p>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: mobile ? 16 : 18,
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.6)",
              margin: "0 0 32px 0",
            }}>
              Live workshops for your trainers. Performance frameworks your fitness director can actually use. Playbooks built on what works.
            </p>

            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "20px 24px",
              background: "rgba(13,154,165,0.08)",
              borderRadius: 12,
              border: "1px solid rgba(13,154,165,0.15)",
            }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "rgba(13,154,165,0.2)",
                flexShrink: 0,
              }} />
              <div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#fff",
                }}>Led by Johnny Olsen</div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.5)",
                }}>Chief Coach Officer</div>
              </div>
            </div>
          </div>

          {/* Right - Image */}
          <div style={{
            flex: mobile ? "none" : "1",
            position: "relative",
          }}>
            <div style={{
              aspectRatio: mobile ? "4/3" : "1/1",
              borderRadius: mobile ? 16 : 24,
              overflow: "hidden",
              background: "linear-gradient(180deg, rgba(13,154,165,0.1) 0%, rgba(8,69,94,0.2) 100%)",
            }}>
              <img
                src="/placeholder.svg?height=600&width=600"
                alt="Expert coaching team"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* APPROACH SECTION - Full-width image with overlay */}
      <section style={{ 
        padding: mobile ? "80px 0" : "160px 0",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{
          position: "relative",
          borderRadius: mobile ? 16 : 32,
          overflow: "hidden",
        }}>
          <div style={{
            aspectRatio: mobile ? "4/3" : "21/9",
            background: "linear-gradient(135deg, #0d9aa5 0%, #08455e 100%)",
          }}>
            <img
              src="/placeholder.svg?height=500&width=1400"
              alt="Milton team working with gym owners"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.7,
              }}
            />
          </div>
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.6) 50%, transparent 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: mobile ? 32 : 80,
          }}>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#0d9aa5",
              marginBottom: 24,
            }}>OUR APPROACH</span>
            
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: mobile ? 32 : tablet ? 44 : 56,
              fontWeight: 400,
              lineHeight: 1.1,
              color: "#fff",
              margin: "0 0 24px 0",
              maxWidth: 600,
            }}>
              Built <Accent>with</Accent> gym owners, not for them.
            </h2>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: mobile ? 15 : 18,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.7)",
              margin: 0,
              maxWidth: 500,
            }}>
              Every feature came from a real operator solving a real problem. We built Milton sitting next to fitness directors — watching them work, learning their systems.
            </p>
          </div>
        </div>
      </section>

      {/* AI PARTNER SECTION */}
      <section style={{ 
        padding: mobile ? "80px 0" : "160px 0",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{
          display: "flex",
          flexDirection: mobile ? "column" : "row-reverse",
          gap: mobile ? 48 : 100,
          alignItems: "center",
        }}>
          {/* Right - Image grid */}
          <div style={{
            flex: mobile ? "none" : "1",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 16,
          }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{
                aspectRatio: "1",
                borderRadius: 16,
                overflow: "hidden",
                background: "rgba(13,154,165,0.1)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}>
                <img
                  src={`/placeholder.svg?height=300&width=300`}
                  alt={`AI integration ${i}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Left - Content */}
          <div style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#0d9aa5",
              marginBottom: 24,
            }}>AI PARTNER</span>
            
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: mobile ? 36 : tablet ? 48 : 56,
              fontWeight: 400,
              lineHeight: 1.1,
              color: "#fff",
              margin: "0 0 32px 0",
            }}>
              And yes, we&apos;ll help you figure out the rest of <Accent>AI</Accent> too.
            </h2>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: mobile ? 16 : 18,
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.6)",
              margin: 0,
            }}>
              Most gym owners know they need to get up to speed on AI. They just don&apos;t know where to start. As a Milton partner, we&apos;ll show you how to spin up your own scheduling, billing, and member experience tools. We&apos;re not trying to lock you into a suite. We&apos;re trying to make you dangerous.
            </p>
          </div>
        </div>
      </section>

      {/* PRICING CTA */}
      <section style={{ 
        padding: mobile ? "80px 0 120px" : "160px 0 200px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{
          textAlign: "center",
          maxWidth: 800,
          margin: "0 auto",
        }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: mobile ? 40 : tablet ? 56 : 72,
            fontWeight: 400,
            lineHeight: 1.1,
            color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Your trainers are your business. Let&apos;s make them <Accent>better.</Accent>
          </h2>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: mobile ? 16 : 18,
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.6)",
            margin: "0 0 48px 0",
          }}>
            Start with one location. See the difference in 90 days. No long-term contract.
          </p>

          <div style={{
            display: "flex",
            flexDirection: mobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "center",
            gap: mobile ? 16 : 32,
            marginBottom: 48,
          }}>
            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: "24px 40px",
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: mobile ? 36 : 48,
                fontWeight: 400,
                color: "#fff",
              }}>$499</div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: "rgba(255,255,255,0.5)",
              }}>per month</div>
            </div>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              color: "rgba(255,255,255,0.3)",
            }}>or</span>
            <div style={{
              background: "rgba(13,154,165,0.1)",
              border: "1px solid rgba(13,154,165,0.2)",
              borderRadius: 16,
              padding: "24px 40px",
              position: "relative",
            }}>
              <div style={{
                position: "absolute",
                top: -12,
                right: 20,
                background: "#0d9aa5",
                color: "#fff",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                fontWeight: 600,
                padding: "4px 12px",
                borderRadius: 100,
              }}>SAVE 2 MONTHS</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: mobile ? 36 : 48,
                fontWeight: 400,
                color: "#fff",
              }}>$4,800</div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: "rgba(255,255,255,0.5)",
              }}>per year</div>
            </div>
          </div>

          <a href="#/book" style={{
            display: "inline-block",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16,
            fontWeight: 500,
            padding: "18px 48px",
            background: "#fff",
            color: "#0a0a0a",
            borderRadius: 100,
            textDecoration: "none",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}>
            Book Your Discovery Call
          </a>
        </div>
      </section>

    </div>
  );
}
