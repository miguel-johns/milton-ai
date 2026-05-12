import { useState, useEffect } from "react";

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

// Design tokens matching the main site
const colors = {
  bg: '#FAFBFC',
  bg2: '#F0F7F5',
  paper: '#FFFFFF',
  ink: '#0B1628',
  inkSoft: '#475569',
  inkMute: '#94A3B8',
  line: '#E2E8F0',
  lineSoft: '#F1F5F9',
  accent: '#2BBFAA',
  accentDeep: '#08455E',
  accentSoft: '#E6F8F4',
  mint: '#9AF198',
  mintSoft: '#ECFAEA',
};

const fonts = {
  serif: "'Cormorant Garamond', Georgia, serif",
  sans: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  mono: "'DM Mono', 'SF Mono', monospace",
};

const logoImage = "/images/milton-logo.png";

// Social icons component
function SocialIcon({ name }) {
  const icons = {
    Facebook: <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3v9h4v-9z"/></svg>,
    Instagram: <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="2.5" width="19" height="19" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"/></svg>,
    X: <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
    Threads: <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.74-1.757-.503-.586-1.279-.883-2.309-.89h-.029c-.825 0-1.947.227-2.66 1.284l-1.668-1.119c.95-1.408 2.498-2.183 4.394-2.183h.043c3.171.02 5.06 1.985 5.247 5.4.107.046.214.094.319.143 1.485.7 2.572 1.76 3.143 3.066.798 1.823.871 4.793-1.548 7.16-1.85 1.81-4.094 2.628-7.236 2.65z"/></svg>,
    TikTok: <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.74a8.16 8.16 0 0 0 4.77 1.52V6.81a4.85 4.85 0 0 1-1.84-.12z"/></svg>,
    YouTube: <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
    LinkedIn: <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  };
  return icons[name] || null;
}

export default function SCWPage() {
  const { mobile } = useBreakpoint();
  const [submitted, setSubmitted] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    phone: "",
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    console.log("[v0] Form submitted with data:", formData);
    
    try {
      const payload = {
        firstName: formData.firstName,
        phone: formData.phone,
        email: formData.email,
        businessName: "SCW Summit Lead",
        prompt: "SCW Nutrition Coaching Summit Guide Request",
        chips: ["scw-summit", "nutrition-coaching"],
      };
      console.log("[v0] Sending payload:", payload);
      
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log("[v0] Response status:", response.status);
      const data = await response.json();
      console.log("[v0] Response data:", data);

      if (response.ok) {
        setSubmitted(true);
        setShowConfirmationPopup(true);
        // Auto-open calendar booking after a short delay
        setTimeout(() => {
          setShowDemoModal(true);
        }, 1500);
      } else {
        console.error("[v0] API error:", data.error);
        alert(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("[v0] Error submitting form:", error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: colors.bg,
      fontFamily: fonts.sans,
    }}>
      <style>{`
        .nav-link {
          transition: color 0.2s ease;
        }
        .nav-link:hover {
          color: ${colors.accent} !important;
        }
        .nav-btn {
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .nav-btn:hover {
          background: ${colors.accentSoft} !important;
          border-color: ${colors.accent} !important;
        }
        .footer-link {
          transition: color 0.2s ease;
        }
        .footer-link:hover {
          color: ${colors.accent} !important;
        }
        .footer-social {
          transition: color 0.2s ease, background 0.2s ease;
        }
        .footer-social:hover {
          color: ${colors.accent} !important;
          background: ${colors.accentSoft};
        }
      `}</style>

      {/* Header */}
      <header style={{
        padding: mobile ? '20px' : '28px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <a href="/" style={{
          fontFamily: fonts.sans,
          fontSize: 20,
          fontWeight: 600,
          letterSpacing: '-0.02em',
          color: colors.ink,
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <img 
            src={logoImage}
            alt="Milton"
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              objectFit: 'cover',
              boxShadow: '0 0 0 1px rgba(11, 22, 40, 0.04), 0 1px 3px rgba(11, 22, 40, 0.06)',
            }}
          />
          <span>Milton</span>
        </a>

        {/* Desktop Nav */}
        {!mobile && (
          <nav style={{
            display: 'flex',
            gap: 28,
            fontSize: 14,
            color: colors.inkSoft,
            alignItems: 'center',
          }}>
            <a href="/coaches" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>For Coaches</a>
            <a href="/gyms" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>For Gyms</a>
            <a href="/insights" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>Insights</a>
            <a href="/about" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>About</a>
            <a href="/" className="nav-btn" style={{
              color: 'inherit',
              textDecoration: 'none',
              border: `1px solid ${colors.line}`,
              padding: '8px 16px',
              borderRadius: 8,
              background: colors.paper,
            }}>Sign in</a>
          </nav>
        )}

        {/* Mobile menu toggle */}
        {mobile && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              width: 40,
              height: 40,
              border: `1px solid ${colors.line}`,
              background: colors.paper,
              borderRadius: 10,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 60,
            }}
          >
            <div style={{ position: 'relative', width: 18, height: 14 }}>
              <span style={{
                position: 'absolute',
                left: 0,
                width: 18,
                height: 1.5,
                background: colors.ink,
                borderRadius: 1,
                top: mobileMenuOpen ? 6 : 0,
                transform: mobileMenuOpen ? 'rotate(45deg)' : 'none',
                transition: 'all 0.3s',
              }} />
              <span style={{
                position: 'absolute',
                left: 0,
                width: 18,
                height: 1.5,
                background: mobileMenuOpen ? 'transparent' : colors.ink,
                borderRadius: 1,
                top: 6,
                transition: 'all 0.3s',
              }} />
              <span style={{
                position: 'absolute',
                left: 0,
                width: 18,
                height: 1.5,
                background: colors.ink,
                borderRadius: 1,
                top: mobileMenuOpen ? 6 : 12,
                transform: mobileMenuOpen ? 'rotate(-45deg)' : 'none',
                transition: 'all 0.3s',
              }} />
            </div>
          </button>
        )}
      </header>

      {/* Mobile menu */}
      {mobile && mobileMenuOpen && (
        <>
          <div 
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.3)',
              zIndex: 40,
            }}
          />
          <div style={{
            position: 'fixed',
            top: 72,
            left: 20,
            right: 20,
            background: colors.paper,
            borderRadius: 16,
            padding: 24,
            zIndex: 50,
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          }}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <a href="/coaches" style={{ fontFamily: fonts.sans, fontSize: 16, color: colors.ink, textDecoration: 'none' }}>For Coaches</a>
              <a href="/gyms" style={{ fontFamily: fonts.sans, fontSize: 16, color: colors.ink, textDecoration: 'none' }}>For Gyms</a>
              <a href="/insights" style={{ fontFamily: fonts.sans, fontSize: 16, color: colors.ink, textDecoration: 'none' }}>Insights</a>
              <a href="/about" style={{ fontFamily: fonts.sans, fontSize: 16, color: colors.ink, textDecoration: 'none' }}>About</a>
              <a href="/" style={{
                fontFamily: fonts.sans,
                fontSize: 16,
                color: colors.ink,
                textDecoration: 'none',
                border: `1px solid ${colors.line}`,
                padding: '12px 20px',
                borderRadius: 8,
                textAlign: 'center',
                marginTop: 8,
              }}>Sign in</a>
            </nav>
          </div>
        </>
      )}

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
                color: colors.inkMute,
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
                color: colors.ink,
                marginBottom: 16,
                letterSpacing: "-0.02em",
              }}>
                The Missing Data in Nutrition.
              </h1>

              {/* Subhead */}
              <p style={{
                fontSize: mobile ? 18 : 20,
                lineHeight: 1.5,
                color: colors.inkSoft,
                marginBottom: 12,
              }}>
                Every prompt I just used. Every system instruction. Every demo workflow. Yours.
              </p>

              {/* Body line */}
              <p style={{
                fontSize: mobile ? 15 : 16,
                lineHeight: 1.6,
                color: colors.inkMute,
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
              borderTop: `1px solid ${colors.line}`,
              borderBottom: `1px solid ${colors.line}`,
            }}>
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Migs%20Email%20Profile-sDpO8RbOxng0ZN2GcWdgrzNZkAzoCv.png"
                alt="Miguel Johns"
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  objectFit: "cover",
                  flexShrink: 0,
                  boxShadow: "0 0 0 1px rgba(11, 22, 40, 0.04), 0 1px 3px rgba(11, 22, 40, 0.06)",
                }}
              />
              <div>
                <p style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: colors.ink,
                  marginBottom: 2,
                }}>
                  Miguel Johns
                </p>
                <p style={{
                  fontSize: 14,
                  color: colors.inkMute,
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
                color: colors.ink,
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
                    color: colors.inkSoft,
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
                      background: colors.paper,
                      color: colors.ink,
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => e.target.style.borderColor = colors.ink}
                    onBlur={(e) => e.target.style.borderColor = colors.line}
                  />
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 500,
                    color: colors.inkSoft,
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
                      background: colors.paper,
                      color: colors.ink,
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => e.target.style.borderColor = colors.ink}
                    onBlur={(e) => e.target.style.borderColor = colors.line}
                  />
                  <p style={{
                    fontSize: 12,
                    color: colors.inkMute,
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
                    color: colors.inkSoft,
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
                      background: colors.paper,
                      color: colors.ink,
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => e.target.style.borderColor = colors.ink}
                    onBlur={(e) => e.target.style.borderColor = colors.line}
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
                    background: colors.ink,
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
                  color: colors.inkMute,
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
                color: colors.inkMute,
                marginBottom: 12,
              }}>
                What You Get
              </p>

              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: mobile ? 28 : 34,
                fontWeight: 500,
                lineHeight: 1.2,
                color: colors.ink,
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
                  borderLeft: `2px solid ${colors.accent}`,
                }}>
                  <p style={{
                    fontFamily: "'DM Mono', 'SF Mono', monospace",
                    fontSize: 12,
                    fontWeight: 500,
                    color: colors.ink,
                    marginBottom: 8,
                  }}>
                    01 · CAPTURE
                  </p>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: mobile ? 22 : 26,
                    fontWeight: 500,
                    fontStyle: "italic",
                    color: colors.ink,
                    marginBottom: 8,
                  }}>
                    The week, in.
                  </h3>
                  <p style={{
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: colors.inkMute,
                  }}>
                    A week of mixed inputs into one chat. Out comes the per-input read, the behavior pattern, and one coaching question for next session.
                  </p>
                </div>

                {/* Workflow 2 */}
                <div style={{
                  paddingLeft: 24,
                  borderLeft: `2px solid ${colors.accent}`,
                }}>
                  <p style={{
                    fontFamily: "'DM Mono', 'SF Mono', monospace",
                    fontSize: 12,
                    fontWeight: 500,
                    color: colors.ink,
                    marginBottom: 8,
                  }}>
                    02 · PLAN
                  </p>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: mobile ? 22 : 26,
                    fontWeight: 500,
                    fontStyle: "italic",
                    color: colors.ink,
                    marginBottom: 8,
                  }}>
                    The four weeks.
                  </h3>
                  <p style={{
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: colors.inkMute,
                  }}>
                    From the week&apos;s story to a personalized review and a four-week plan, plus the one-page client handout you can send tonight.
                  </p>
                </div>

                {/* Workflow 3 */}
                <div style={{
                  paddingLeft: 24,
                  borderLeft: `2px solid ${colors.accent}`,
                }}>
                  <p style={{
                    fontFamily: "'DM Mono', 'SF Mono', monospace",
                    fontSize: 12,
                    fontWeight: 500,
                    color: colors.ink,
                    marginBottom: 8,
                  }}>
                    03 · VISUALIZE
                  </p>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: mobile ? 22 : 26,
                    fontWeight: 500,
                    fontStyle: "italic",
                    color: colors.ink,
                    marginBottom: 8,
                  }}>
                    The library.
                  </h3>
                  <p style={{
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: colors.inkMute,
                  }}>
                    Recipe cards, plate diagrams, niche food guides. On brand, on demand. Fifty assets in an afternoon.
                  </p>
                </div>
              </div>
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
              background: colors.accentSoft,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px auto",
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: mobile ? 32 : 42,
              fontWeight: 500,
              lineHeight: 1.2,
              color: colors.ink,
              marginBottom: 16,
              letterSpacing: "-0.02em",
            }}>
              You&apos;re in. Check your texts.
            </h2>

            <p style={{
              fontSize: mobile ? 16 : 18,
              lineHeight: 1.6,
              color: colors.inkMute,
              marginBottom: 40,
              maxWidth: 440,
              margin: "0 auto 40px auto",
            }}>
              The link is on its way to your phone right now. The backup copy is in your inbox too.
            </p>

            {/* Transition Line */}
            <div style={{
              padding: "32px 0",
              borderTop: `1px solid ${colors.line}`,
              marginBottom: 0,
            }}>
              <p style={{
                fontSize: 15,
                lineHeight: 1.6,
                color: colors.inkMute,
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
                  background: colors.ink,
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
                color: colors.inkMute,
              }}>
                <button
                  onClick={() => window.location.href = "/"}
                  style={{
                    background: "none",
                    border: "none",
                    color: colors.inkMute,
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

      </main>

      {/* Footer */}
      <footer style={{
        padding: mobile ? '48px 20px 32px' : '64px 40px 48px',
        borderTop: `1px solid ${colors.line}`,
        background: 'linear-gradient(180deg, transparent 0%, rgba(43, 191, 170, 0.02) 100%)',
      }}>
        <div style={{
          maxWidth: 760,
          margin: '0 auto',
          textAlign: 'center',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            marginBottom: mobile ? 28 : 36,
          }}>
            <img 
              src={logoImage}
              alt="Milton"
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                objectFit: 'cover',
                boxShadow: '0 0 0 1px rgba(11, 22, 40, 0.04), 0 1px 3px rgba(11, 22, 40, 0.06)',
              }}
            />
            <p style={{
              fontFamily: fonts.serif,
              fontStyle: 'italic',
              fontSize: mobile ? 16 : 18,
              lineHeight: 1.4,
              color: colors.inkSoft,
              maxWidth: 380,
            }}>
              <em>Milton learns your way of coaching. It does not replace it.</em>
            </p>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
            marginBottom: mobile ? 28 : 36,
            flexWrap: 'wrap',
          }}>
            <nav style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              {[
                { name: 'Facebook', url: 'https://www.facebook.com/people/Milton-AI/61577932761346/' },
                { name: 'Instagram', url: 'https://www.instagram.com/milton_ai' },
                { name: 'YouTube', url: 'https://www.youtube.com/@MiltonAI' },
                { name: 'TikTok', url: 'https://www.tiktok.com/@getmilton' },
                { name: 'Threads', url: 'https://www.threads.com/@milton_ai' },
                { name: 'X', url: 'https://x.com/getmilton_ai' },
                { name: 'LinkedIn', url: 'https://www.linkedin.com/company/milton-ai/' },
              ].map((social) => (
                <a 
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="footer-social"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    color: colors.inkSoft,
                  }}
                >
                  <SocialIcon name={social.name} />
                </a>
              ))}
            </nav>
          </div>

          <div style={{
            height: 1,
            background: colors.line,
            margin: '0 0 24px',
          }} />

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: mobile ? 8 : 12,
            fontSize: mobile ? 12 : 13,
            color: colors.inkMute,
          }}>
            <span>© 2026 Milton AI</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <a href="/terms" className="footer-link" style={{ color: colors.inkMute, textDecoration: 'none' }}>Terms of Service</a>
            <span style={{ opacity: 0.5 }}>·</span>
            <a href="/privacy" className="footer-link" style={{ color: colors.inkMute, textDecoration: 'none' }}>Privacy Policy</a>
          </div>
        </div>
      </footer>

      {/* Confirmation Popup */}
      {showConfirmationPopup && !showDemoModal && (
        <div 
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9998,
            padding: 20,
          }}
        >
          <div 
            style={{
              background: colors.paper,
              borderRadius: 16,
              padding: mobile ? "40px 28px" : "48px 40px",
              maxWidth: 420,
              width: "100%",
              textAlign: "center",
              boxShadow: "0 24px 48px rgba(0,0,0,0.15)",
              animation: "popIn 0.3s ease-out",
            }}
          >
            <style>{`
              @keyframes popIn {
                from { transform: scale(0.9); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
              }
            `}</style>
            
            {/* Success checkmark */}
            <div style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: colors.accentSoft,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px auto",
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h3 style={{
              fontFamily: fonts.serif,
              fontSize: mobile ? 28 : 34,
              fontWeight: 500,
              color: colors.ink,
              marginBottom: 12,
              letterSpacing: "-0.02em",
            }}>
              You&apos;re in!
            </h3>
            
            <p style={{
              fontSize: 16,
              lineHeight: 1.6,
              color: colors.inkSoft,
              marginBottom: 8,
            }}>
              Check your texts — the guide is on its way.
            </p>
            <p style={{
              fontSize: 14,
              color: colors.inkMute,
            }}>
              Opening calendar booking...
            </p>
          </div>
        </div>
      )}

      {/* Demo Modal */}
      {showDemoModal && (
        <DemoModal 
          mobile={mobile} 
          onClose={() => {
            setShowDemoModal(false);
            setShowConfirmationPopup(false);
          }} 
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
          background: colors.paper,
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
            color: colors.inkMute,
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
          color: colors.ink,
          marginBottom: 12,
        }}>
          See Milton in action
        </h3>
        
        <p style={{
          fontSize: 15,
          lineHeight: 1.6,
          color: colors.inkMute,
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
            background: colors.ink,
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
