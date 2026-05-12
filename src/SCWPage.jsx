import { useState } from "react";

function useBreakpoint() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  if (typeof window !== "undefined") {
    window.addEventListener("resize", () => setW(window.innerWidth));
  }
  return { mobile: w < 640, tablet: w >= 640 && w < 1024, desktop: w >= 1024, w };
}

export default function SCWPage() {
  const { mobile } = useBreakpoint();
  const [submitted, setSubmitted] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    phone: "",
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          phone: formData.phone,
          email: formData.email,
          businessName: "SCW Summit Lead",
          prompt: "SCW Nutrition Coaching Summit Guide Request",
          chips: ["scw-summit", "nutrition-coaching"],
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#FAF9F7",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {/* Main Content */}
      <main style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: mobile ? "48px 24px 64px" : "80px 32px 96px",
      }}>
        {!submitted ? (
          <>
            {/* Hero Section */}
            <section style={{ marginBottom: mobile ? 48 : 64 }}>
              {/* Eyebrow */}
              <p style={{
                fontFamily: "'DM Mono', 'SF Mono', monospace",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#6B6B6B",
                marginBottom: 20,
              }}>
                SCW Nutrition Coaching Summit · Take-Home Guide
              </p>

              {/* Headline */}
              <h1 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: mobile ? 42 : 56,
                fontWeight: 500,
                lineHeight: 1.1,
                color: "#1A1A1A",
                marginBottom: 16,
                letterSpacing: "-0.02em",
              }}>
                The Missing Data in Nutrition.
              </h1>

              {/* Subhead */}
              <p style={{
                fontSize: mobile ? 18 : 20,
                lineHeight: 1.5,
                color: "#4A4A4A",
                marginBottom: 12,
              }}>
                Every prompt I just used. Every system instruction. Every demo workflow. Yours.
              </p>

              {/* Body line */}
              <p style={{
                fontSize: mobile ? 15 : 16,
                lineHeight: 1.6,
                color: "#6B6B6B",
              }}>
                Drop your number below and we&apos;ll text you the guide before you leave the room.
              </p>
            </section>

            {/* Who's Behind This */}
            <section style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: mobile ? 40 : 56,
              padding: "20px 0",
              borderTop: "1px solid #E8E6E3",
              borderBottom: "1px solid #E8E6E3",
            }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #1A1A1A, #3A3A3A)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 22,
                fontWeight: 600,
                flexShrink: 0,
              }}>
                MJ
              </div>
              <div>
                <p style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#1A1A1A",
                  marginBottom: 2,
                }}>
                  Miguel Johns
                </p>
                <p style={{
                  fontSize: 14,
                  color: "#6B6B6B",
                  lineHeight: 1.4,
                }}>
                  Coach · Founder · Builder. The lecture you just heard, in one guide.
                </p>
              </div>
            </section>

            {/* Form Section */}
            <section style={{ marginBottom: mobile ? 56 : 72 }}>
              <p style={{
                fontFamily: "'DM Mono', 'SF Mono', monospace",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#1A1A1A",
                marginBottom: 24,
              }}>
                Send Me the Guide
              </p>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 20 }}>
                  <label style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#4A4A4A",
                    marginBottom: 8,
                  }}>
                    First name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      fontSize: 16,
                      border: "1px solid #D4D2CE",
                      borderRadius: 8,
                      background: "#fff",
                      color: "#1A1A1A",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#1A1A1A"}
                    onBlur={(e) => e.target.style.borderColor = "#D4D2CE"}
                  />
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#4A4A4A",
                    marginBottom: 8,
                  }}>
                    Mobile number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      fontSize: 16,
                      border: "1px solid #D4D2CE",
                      borderRadius: 8,
                      background: "#fff",
                      color: "#1A1A1A",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#1A1A1A"}
                    onBlur={(e) => e.target.style.borderColor = "#D4D2CE"}
                  />
                  <p style={{
                    fontSize: 12,
                    color: "#8A8A8A",
                    marginTop: 8,
                    lineHeight: 1.5,
                  }}>
                    We text it so it&apos;s on your phone tomorrow when you sit down to try it.
                  </p>
                </div>

                <div style={{ marginBottom: 28 }}>
                  <label style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#4A4A4A",
                    marginBottom: 8,
                  }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      fontSize: 16,
                      border: "1px solid #D4D2CE",
                      borderRadius: 8,
                      background: "#fff",
                      color: "#1A1A1A",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#1A1A1A"}
                    onBlur={(e) => e.target.style.borderColor = "#D4D2CE"}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "16px 24px",
                    fontSize: 15,
                    fontWeight: 600,
                    background: "#1A1A1A",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    cursor: loading ? "default" : "pointer",
                    opacity: loading ? 0.7 : 1,
                    transition: "opacity 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={(e) => !loading && (e.target.style.transform = "translateY(-1px)")}
                  onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
                >
                  {loading ? "Sending..." : "Text me the guide →"}
                </button>

                <p style={{
                  fontSize: 12,
                  color: "#8A8A8A",
                  marginTop: 16,
                  textAlign: "center",
                  lineHeight: 1.5,
                }}>
                  One text, the link to the guide, no follow-up spam. We&apos;ll email a backup copy too.
                </p>
              </form>
            </section>

            {/* What's In It Section */}
            <section style={{ marginBottom: mobile ? 48 : 64 }}>
              <p style={{
                fontFamily: "'DM Mono', 'SF Mono', monospace",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#6B6B6B",
                marginBottom: 12,
              }}>
                What You Get
              </p>

              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: mobile ? 28 : 34,
                fontWeight: 500,
                lineHeight: 1.2,
                color: "#1A1A1A",
                marginBottom: mobile ? 32 : 40,
                letterSpacing: "-0.01em",
              }}>
                Three workflows. One ChatGPT chat. Twenty minutes per client.
              </h2>

              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: 32,
              }}>
                {/* Workflow 1 */}
                <div style={{
                  paddingLeft: 24,
                  borderLeft: "2px solid #1A1A1A",
                }}>
                  <p style={{
                    fontFamily: "'DM Mono', 'SF Mono', monospace",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#1A1A1A",
                    marginBottom: 8,
                  }}>
                    01 · CAPTURE
                  </p>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: mobile ? 22 : 26,
                    fontWeight: 500,
                    fontStyle: "italic",
                    color: "#1A1A1A",
                    marginBottom: 8,
                  }}>
                    The week, in.
                  </h3>
                  <p style={{
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: "#6B6B6B",
                  }}>
                    A week of mixed inputs into one chat. Out comes the per-input read, the behavior pattern, and one coaching question for next session.
                  </p>
                </div>

                {/* Workflow 2 */}
                <div style={{
                  paddingLeft: 24,
                  borderLeft: "2px solid #1A1A1A",
                }}>
                  <p style={{
                    fontFamily: "'DM Mono', 'SF Mono', monospace",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#1A1A1A",
                    marginBottom: 8,
                  }}>
                    02 · PLAN
                  </p>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: mobile ? 22 : 26,
                    fontWeight: 500,
                    fontStyle: "italic",
                    color: "#1A1A1A",
                    marginBottom: 8,
                  }}>
                    The four weeks.
                  </h3>
                  <p style={{
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: "#6B6B6B",
                  }}>
                    From the week&apos;s story to a personalized review and a four-week plan, plus the one-page client handout you can send tonight.
                  </p>
                </div>

                {/* Workflow 3 */}
                <div style={{
                  paddingLeft: 24,
                  borderLeft: "2px solid #1A1A1A",
                }}>
                  <p style={{
                    fontFamily: "'DM Mono', 'SF Mono', monospace",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#1A1A1A",
                    marginBottom: 8,
                  }}>
                    03 · VISUALIZE
                  </p>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: mobile ? 22 : 26,
                    fontWeight: 500,
                    fontStyle: "italic",
                    color: "#1A1A1A",
                    marginBottom: 8,
                  }}>
                    The library.
                  </h3>
                  <p style={{
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: "#6B6B6B",
                  }}>
                    Recipe cards, plate diagrams, niche food guides. On brand, on demand. Fifty assets in an afternoon.
                  </p>
                </div>
              </div>
            </section>

            {/* Bonus Line */}
            <section style={{
              textAlign: "center",
              padding: mobile ? "32px 0" : "40px 0",
              borderTop: "1px solid #E8E6E3",
              borderBottom: "1px solid #E8E6E3",
              marginBottom: mobile ? 48 : 64,
            }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: mobile ? 16 : 18,
                fontStyle: "italic",
                lineHeight: 1.7,
                color: "#4A4A4A",
                maxWidth: 560,
                margin: "0 auto",
              }}>
                Plus the brand setup, the report card prompt, and the three-prompt system for niche guides like the Costco run and the road trip.
              </p>
            </section>
          </>
        ) : (
          /* Post-Submit Confirmation */
          <section style={{ textAlign: "center", padding: mobile ? "40px 0" : "60px 0" }}>
            {/* Success Icon */}
            <div style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "#E8F5E8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px auto",
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2D8A2D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: mobile ? 32 : 42,
              fontWeight: 500,
              lineHeight: 1.2,
              color: "#1A1A1A",
              marginBottom: 16,
              letterSpacing: "-0.02em",
            }}>
              You&apos;re in. Check your texts.
            </h2>

            <p style={{
              fontSize: mobile ? 16 : 18,
              lineHeight: 1.6,
              color: "#6B6B6B",
              marginBottom: 40,
              maxWidth: 440,
              margin: "0 auto 40px auto",
            }}>
              The link is on its way to your phone right now. The backup copy is in your inbox too.
            </p>

            {/* Transition Line */}
            <div style={{
              padding: "32px 0",
              borderTop: "1px solid #E8E6E3",
              marginBottom: 0,
            }}>
              <p style={{
                fontSize: 15,
                lineHeight: 1.6,
                color: "#6B6B6B",
                marginBottom: 24,
              }}>
                While you&apos;re here, want to see what this looks like when it&apos;s not a workaround? Fifteen minutes, no pressure, totally optional.
              </p>

              <button
                onClick={() => setShowDemoModal(true)}
                style={{
                  padding: "16px 32px",
                  fontSize: 15,
                  fontWeight: 600,
                  background: "#1A1A1A",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  marginBottom: 16,
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => e.target.style.transform = "translateY(-1px)"}
                onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
              >
                Show me Milton →
              </button>

              <p style={{
                fontSize: 13,
                color: "#8A8A8A",
              }}>
                <button
                  onClick={() => window.location.href = "/"}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#8A8A8A",
                    textDecoration: "underline",
                    cursor: "pointer",
                    fontSize: 13,
                  }}
                >
                  No thanks, just the guide →
                </button>
              </p>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer style={{
          textAlign: "center",
          paddingTop: 32,
          borderTop: submitted ? "none" : "1px solid #E8E6E3",
        }}>
          <p style={{
            fontSize: 13,
            color: "#8A8A8A",
          }}>
            <a 
              href="https://getmilton.com" 
              style={{ color: "#6B6B6B", textDecoration: "none" }}
            >
              getmilton.com
            </a>
            {" · "}
            <a 
              href="mailto:miguel@getmilton.com" 
              style={{ color: "#6B6B6B", textDecoration: "none" }}
            >
              miguel@getmilton.com
            </a>
          </p>
        </footer>
      </main>

      {/* Demo Modal */}
      {showDemoModal && (
        <DemoModal 
          mobile={mobile} 
          onClose={() => setShowDemoModal(false)} 
        />
      )}
    </div>
  );
}

function DemoModal({ mobile, onClose }) {
  return (
    <div 
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: 20,
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: mobile ? "32px 24px" : "40px 36px",
          maxWidth: 480,
          width: "100%",
          position: "relative",
          boxShadow: "0 24px 48px rgba(0,0,0,0.15)",
        }}
      >
        <button 
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "transparent",
            border: "none",
            color: "#8A8A8A",
            cursor: "pointer",
            fontSize: 24,
            lineHeight: 1,
            padding: 4,
          }}
        >
          ×
        </button>

        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: mobile ? 26 : 32,
          fontWeight: 500,
          color: "#1A1A1A",
          marginBottom: 12,
        }}>
          See Milton in action
        </h3>
        
        <p style={{
          fontSize: 15,
          lineHeight: 1.6,
          color: "#6B6B6B",
          marginBottom: 28,
        }}>
          Book a 15-minute walkthrough. No pitch deck, just the product doing what you saw in the demo — but built for your clients, your brand.
        </p>

        <a
          href="https://cal.com/getmilton/demo"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            width: "100%",
            padding: "16px 24px",
            fontSize: 15,
            fontWeight: 600,
            background: "#1A1A1A",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            textAlign: "center",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          Book a time →
        </a>
      </div>
    </div>
  );
}
