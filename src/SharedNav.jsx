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

function CTA({ children, variant = "primary", style: s = {}, href, onClick }) {
  const base = {
    fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600,
    padding: "14px 32px", borderRadius: 100, cursor: "pointer",
    transition: "all 0.25s ease", textDecoration: "none",
    display: "inline-block", letterSpacing: 0.3, whiteSpace: "nowrap",
  };
  const styles = variant === "primary"
    ? { ...base, background: "#fff", color: "#08455e", border: "none", ...s }
    : { ...base, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", ...s };
  if (href) {
    return <a href={href} style={styles}>{children}</a>;
  }
  return <button style={styles} onClick={onClick}>{children}</button>;
}

export default function SharedNav({ onInquireClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [partnersDropdownOpen, setPartnersDropdownOpen] = useState(false);
  const { mobile, tablet } = useBreakpoint();

  const partnerCategories = [
    { label: "Wearable Devices", description: "Connect fitness trackers and smartwatches.", href: "#/partners/wearables" },
    { label: "Body Scans", description: "Connect body composition analyzers.", href: "#/partners/body-scans" },
    { label: "Strength & Cardio Equipment", description: "Connect smart gym machines.", href: "#/partners/equipment" },
    { label: "Management Software", description: "Connect gym management platforms.", href: "#/partners/software" },
    { label: "Apps", description: "Connect fitness and wellness apps.", href: "#/partners/apps" },
  ];

  const productsMenuItems = [
    { label: "Coach Co-Pilot", description: "AI for people coaching clients.", href: "#/coach-copilot" },
    { label: "Director Co-Pilot", description: "AI for people managing trainers.", href: "#/director-dashboard" },
    { label: "AI Coach", description: "AI for people without a coach.", href: "#/ai-coach" },
    { label: "AI Branding", description: "AI for professional brands.", href: "#/websites" },
    { label: "AI-Powered Scheduling", description: "AI for self-serve scheduling and booking.", href: "#/scheduling" },
    { label: "AI Receptionist", description: "AI for voicemail and follow up.", href: "#/receptionist" },
    { label: "AI Acquisition Engine", description: "AI for turning results into referrals.", href: "#/acquisition" },
    { label: "Agentic Commerce", description: "AI-powered workflows driving leads the stuff you sell.", href: "#/agentic-commerce" },
    { label: "Stripe-Powered CRM & POS", description: "Payments, memberships, and client management.", href: "#/stripe-crm" },
  ];

  const servicesMenuItems = [
    { label: "AI Consultation", description: "Free one-on-one consultation and AI audit.", href: "#/consultation" },
    { label: "Implementation Science", description: "Hands-on deployment with your team.", href: "#/implementation" },
    { label: "Milton Academy", description: "Certification for coaches and managers.", href: "#/academy" },
    { label: "Prompt Library", description: "Ready-to-use prompts for fitness professionals.", href: "#/prompts" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => {
    const handleHashChange = () => setMenuOpen(false);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navLinks = [
    { label: "AI Agents & Services", hasDropdown: "agents" },
    { label: "Connected Partners", hasDropdown: "partners" },
    { label: "Insights", href: "#/insights" },
    { label: "About Us", href: "#/about" },
  ];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: mobile ? "12px 16px" : "16px 40px",
        display: "grid",
        gridTemplateColumns: mobile ? "1fr auto" : "1fr auto 1fr",
        alignItems: "center",
        background: scrolled || menuOpen ? "rgba(6,28,39,0.95)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(13,154,165,0.1)" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}>
        <a href="#/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Milton%20Face%20Logo-whMWzOXBgBgulGUqdRthSEMsjeyWPe.png"
            alt="Milton Logo"
            style={{
              width: mobile ? 36 : 44,
              height: mobile ? 36 : 44,
              borderRadius: 8,
              objectFit: "cover",
            }}
          />
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
            fontSize: mobile ? 16 : 20, color: "#fff", letterSpacing: 2,
          }}>MILTON</span>
        </a>

        {/* Centered text nav links */}
        {!mobile && (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: tablet ? 24 : 36,
          }}>
            {navLinks.map(link => (
              link.hasDropdown === "agents" ? (
                <div
                  key={link.label}
                  style={{ position: "relative" }}
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 14,
                      fontWeight: 500,
                      color: dropdownOpen ? "#fff" : "rgba(255,255,255,0.7)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      padding: 0,
                      transition: "color 0.2s ease",
                    }}
                  >
                    {link.label}
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transform: dropdownOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }}>
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  
                  {dropdownOpen && (
                    <div style={{
                      position: "absolute",
                      top: "100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      paddingTop: 12,
                    }}>
                      <div style={{
                        background: "rgba(6,28,39,0.98)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(13,154,165,0.2)",
                        borderRadius: 12,
                        padding: "16px 0",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                        display: "flex",
                        gap: 0,
                      }}>
                        {/* AI Agents Column */}
                        <div style={{ minWidth: 280 }}>
                          <div style={{
                            padding: "4px 20px 10px",
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 11,
                            fontWeight: 600,
                            color: "#0d9aa5",
                            textTransform: "uppercase",
                            letterSpacing: 1,
                          }}>AI Agents</div>
                          {productsMenuItems.map(item => (
                            <a
                              key={item.label}
                              href={item.href}
                              style={{
                                display: "block",
                                padding: "8px 20px",
                                textDecoration: "none",
                                transition: "background 0.2s ease",
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = "rgba(13,154,165,0.1)"}
                              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                            >
                              <div style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: 14,
                                fontWeight: 600,
                                color: "#fff",
                                marginBottom: 2,
                              }}>{item.label}</div>
                              <div style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: 12,
                                color: "rgba(255,255,255,0.5)",
                              }}>{item.description}</div>
                            </a>
                          ))}
                        </div>
                        
                        {/* Vertical Divider */}
                        <div style={{
                          width: 1,
                          background: "rgba(13,154,165,0.15)",
                          margin: "8px 0",
                        }} />
                        
                        {/* AI Services Column */}
                        <div style={{ minWidth: 260 }}>
                          <div style={{
                            padding: "4px 20px 10px",
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 11,
                            fontWeight: 600,
                            color: "#9af198",
                            textTransform: "uppercase",
                            letterSpacing: 1,
                          }}>AI Services</div>
                          {servicesMenuItems.map(item => (
                            <a
                              key={item.label}
                              href={item.href}
                              style={{
                                display: "block",
                                padding: "8px 20px",
                                textDecoration: "none",
                                transition: "background 0.2s ease",
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = "rgba(13,154,165,0.1)"}
                              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                            >
                              <div style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: 14,
                                fontWeight: 600,
                                color: "#fff",
                                marginBottom: 2,
                              }}>{item.label}</div>
                              <div style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: 12,
                                color: "rgba(255,255,255,0.5)",
                              }}>{item.description}</div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : link.hasDropdown === "partners" ? (
                <div
                  key={link.label}
                  style={{ position: "relative" }}
                  onMouseEnter={() => setPartnersDropdownOpen(true)}
                  onMouseLeave={() => setPartnersDropdownOpen(false)}
                >
                  <button
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 14,
                      fontWeight: 500,
                      color: partnersDropdownOpen ? "#fff" : "rgba(255,255,255,0.7)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      padding: 0,
                      transition: "color 0.2s ease",
                    }}
                  >
                    {link.label}
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transform: partnersDropdownOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }}>
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  
                  {partnersDropdownOpen && (
                    <div style={{
                      position: "absolute",
                      top: "100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      paddingTop: 12,
                    }}>
                      <div style={{
                        background: "rgba(6,28,39,0.98)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(13,154,165,0.2)",
                        borderRadius: 12,
                        padding: "16px 0",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                        display: "flex",
                        gap: 0,
                      }}>
                        {/* Connected Partners Column */}
                        <div style={{ minWidth: 320 }}>
                          <div style={{
                            padding: "4px 20px 10px",
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 11,
                            fontWeight: 600,
                            color: "#0d9aa5",
                            textTransform: "uppercase",
                            letterSpacing: 1,
                          }}>Connected Partners</div>
                          <div style={{ padding: "0 20px 12px" }}>
                            <p style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: 13,
                              color: "rgba(255,255,255,0.6)",
                              lineHeight: 1.5,
                              margin: "0 0 10px 0",
                            }}>
                              Milton connects leading fitness brands with AI-powered digital solutions, smart equipment, and integrated experiences.
                            </p>
                            <a
                              href="#/partners"
                              style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: 13,
                                fontWeight: 600,
                                color: "#0d9aa5",
                                textDecoration: "none",
                              }}
                              onMouseEnter={e => e.target.style.textDecoration = "underline"}
                              onMouseLeave={e => e.target.style.textDecoration = "none"}
                            >Learn More &rarr;</a>
                          </div>
                          
                          <div style={{
                            height: 1,
                            background: "rgba(13,154,165,0.15)",
                            margin: "4px 20px 12px",
                          }} />
                          
                          <div style={{
                            padding: "0 20px 12px",
                          }}>
                            <div style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: 11,
                              fontWeight: 600,
                              color: "#9af198",
                              textTransform: "uppercase",
                              letterSpacing: 1,
                              marginBottom: 8,
                            }}>Product Integrations</div>
                            <p style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: 13,
                              color: "rgba(255,255,255,0.6)",
                              lineHeight: 1.5,
                              margin: "0 0 10px 0",
                            }}>
                              Interested in integrating your product with the Milton ecosystem? Explore becoming a Connected Partner.
                            </p>
<button
                                              onClick={(e) => {
                                                e.preventDefault();
                                                setPartnersDropdownOpen(false);
                                                onInquireClick?.();
                                              }}
                                              style={{
                                                fontFamily: "'DM Sans', sans-serif",
                                                fontSize: 13,
                                                fontWeight: 600,
                                                color: "#9af198",
                                                textDecoration: "none",
                                                background: "none",
                                                border: "none",
                                                padding: 0,
                                                cursor: "pointer",
                                              }}
                                              onMouseEnter={e => e.target.style.textDecoration = "underline"}
                                              onMouseLeave={e => e.target.style.textDecoration = "none"}
                                            >Inquire Now &rarr;</button>
                          </div>
                        </div>
                        
                        {/* Vertical Divider */}
                        <div style={{
                          width: 1,
                          background: "rgba(13,154,165,0.15)",
                          margin: "8px 0",
                        }} />
                        
                        {/* Partner Overview Column */}
                        <div style={{ minWidth: 260 }}>
                          <div style={{
                            padding: "4px 20px 10px",
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 11,
                            fontWeight: 600,
                            color: "#0d9aa5",
                            textTransform: "uppercase",
                            letterSpacing: 1,
                          }}>Partner Overview</div>
                          {partnerCategories.map(item => (
                            <a
                              key={item.label}
                              href={item.href}
                              style={{
                                display: "block",
                                padding: "8px 20px",
                                textDecoration: "none",
                                transition: "background 0.2s ease",
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = "rgba(13,154,165,0.1)"}
                              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                            >
                              <div style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: 14,
                                fontWeight: 600,
                                color: "#fff",
                                marginBottom: 2,
                              }}>{item.label}</div>
                              <div style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: 12,
                                color: "rgba(255,255,255,0.5)",
                              }}>{item.description}</div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={e => e.target.style.color = "#fff"}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.7)"}
                >
                  {link.label}
                </a>
              )
            ))}
          </div>
        )}

        {/* Right side button */}
        {!mobile && (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <CTA variant="primary" style={{ padding: "10px 24px", fontSize: 14 }} href="#/book">AI Consultation</CTA>
          </div>
        )}

        {mobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: "none", border: "none", cursor: "pointer", padding: 8,
            display: "flex", flexDirection: "column", gap: 5, position: "relative", zIndex: 101,
          }}>
            <div style={{ width: 22, height: 2, background: "#fff", borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
            <div style={{ width: 22, height: 2, background: "#fff", borderRadius: 2, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
            <div style={{ width: 22, height: 2, background: "#fff", borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
          </button>
        )}
      </nav>

      {/* Mobile menu */}
      {mobile && menuOpen && (
        <div style={{
          position: "fixed", top: 54, left: 0, right: 0, bottom: 0, zIndex: 99,
          background: "rgba(6,28,39,0.98)", backdropFilter: "blur(20px)",
          padding: "28px 24px", display: "flex", flexDirection: "column", gap: 8,
          overflowY: "auto",
        }}>
          {navLinks.map(link => (
            link.hasDropdown === "agents" ? (
              <div key={link.label}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 16,
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.7)",
                    background: "none",
                    border: "none",
                    padding: "14px 0",
                    borderBottom: "1px solid rgba(13,154,165,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    cursor: "pointer",
                  }}
                >
                  {link.label}
                  <svg width="12" height="7" viewBox="0 0 10 6" fill="none" style={{ transform: dropdownOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }}>
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {dropdownOpen && (
                  <div style={{ paddingLeft: 16, paddingTop: 8, paddingBottom: 8 }}>
                    {/* AI Agents Section */}
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#0d9aa5",
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      padding: "8px 0 4px",
                    }}>AI Agents</div>
                    {productsMenuItems.map(item => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        style={{
                          display: "block",
                          padding: "10px 12px",
                          margin: "0 -12px",
                          borderRadius: 8,
                          textDecoration: "none",
                          transition: "background 0.2s ease",
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(13,154,165,0.1)"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <div style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#fff",
                          marginBottom: 2,
                        }}>{item.label}</div>
                        <div style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 12,
                          color: "rgba(255,255,255,0.5)",
                        }}>{item.description}</div>
                      </a>
                    ))}
                    
                    {/* AI Services Section */}
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#9af198",
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      padding: "16px 0 4px",
                    }}>AI Services</div>
                    {servicesMenuItems.map(item => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        style={{
                          display: "block",
                          padding: "10px 12px",
                          margin: "0 -12px",
                          borderRadius: 8,
                          textDecoration: "none",
                          transition: "background 0.2s ease",
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(13,154,165,0.1)"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <div style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#fff",
                          marginBottom: 2,
                        }}>{item.label}</div>
                        <div style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 12,
                          color: "rgba(255,255,255,0.5)",
                        }}>{item.description}</div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : link.hasDropdown === "partners" ? (
              <div key={link.label}>
                <button
                  onClick={() => setPartnersDropdownOpen(!partnersDropdownOpen)}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 16,
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.7)",
                    background: "none",
                    border: "none",
                    padding: "14px 0",
                    borderBottom: "1px solid rgba(13,154,165,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    cursor: "pointer",
                  }}
                >
                  {link.label}
                  <svg width="12" height="7" viewBox="0 0 10 6" fill="none" style={{ transform: partnersDropdownOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }}>
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {partnersDropdownOpen && (
                  <div style={{ paddingLeft: 16, paddingTop: 8, paddingBottom: 8 }}>
                    {/* Connected Partners Section */}
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#0d9aa5",
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      padding: "8px 0 4px",
                    }}>Connected Partners</div>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      color: "rgba(255,255,255,0.6)",
                      lineHeight: 1.5,
                      margin: "0 0 10px 0",
                    }}>
                      Milton connects leading fitness brands with AI-powered digital solutions.
                    </p>
                    <a
                      href="#/partners"
                      onClick={() => setMenuOpen(false)}
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#0d9aa5",
                        textDecoration: "none",
                        display: "block",
                        marginBottom: 16,
                      }}
                    >Learn More &rarr;</a>
                    
                    {/* Product Integrations */}
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#9af198",
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      padding: "8px 0 4px",
                    }}>Product Integrations</div>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      color: "rgba(255,255,255,0.6)",
                      lineHeight: 1.5,
                      margin: "0 0 10px 0",
                    }}>
                      Interested in integrating your product? Become a Connected Partner.
                    </p>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        onInquireClick?.();
                      }}
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#9af198",
                        textDecoration: "none",
                        display: "block",
                        marginBottom: 16,
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                      }}
                    >Inquire Now &rarr;</button>
                    
                    {/* Partner Overview Section */}
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#0d9aa5",
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      padding: "8px 0 4px",
                    }}>Partner Overview</div>
                    {partnerCategories.map(item => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        style={{
                          display: "block",
                          padding: "10px 12px",
                          margin: "0 -12px",
                          borderRadius: 8,
                          textDecoration: "none",
                          transition: "background 0.2s ease",
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(13,154,165,0.1)"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <div style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#fff",
                          marginBottom: 2,
                        }}>{item.label}</div>
                        <div style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 12,
                          color: "rgba(255,255,255,0.5)",
                        }}>{item.description}</div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 16,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  padding: "14px 12px",
                  margin: "0 -12px",
                  borderRadius: 8,
                  display: "block",
                  transition: "background 0.2s ease, color 0.2s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(13,154,165,0.1)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                }}
              >
                {link.label}
              </a>
            )
          ))}
          
          <div style={{ marginTop: 24 }}>
            <CTA variant="primary" style={{ width: "100%", textAlign: "center", padding: "14px 0" }} href="#/book">AI Consultation</CTA>
          </div>
        </div>
      )}
    </>
  );
}
