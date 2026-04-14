import { useState, useEffect } from "react";

function useBreakpoint() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return { mobile: w < 640, tablet: w >= 640 && w < 1024, desktop: w >= 1024 };
}

const f = "'DM Sans', sans-serif";
const serif = "'Instrument Serif', serif";
const teal = "#0d9aa5";
const mint = "#9af198";

function Accent({ children }) {
  return <em style={{ fontStyle: "italic", color: mint }}>{children}</em>;
}

function VisualPlaceholder({ height = 300, label = "Visual Placeholder", mobile }) {
  return (
    <div style={{
      height: mobile ? height * 0.7 : height,
      background: "rgba(13,154,165,0.08)",
      border: "1px dashed rgba(13,154,165,0.3)",
      borderRadius: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 32,
    }}>
      <span style={{ fontFamily: f, fontSize: 14, color: "rgba(255,255,255,0.3)" }}>[{label}]</span>
    </div>
  );
}

function ResponsiveImage({ desktopSrc, mobileSrc, alt, mobile }) {
  return (
    <div style={{
      width: "100%",
      borderRadius: mobile ? 16 : 20,
      overflow: "hidden",
      marginTop: 32,
    }}>
      <img
        src={mobile ? mobileSrc : desktopSrc}
        alt={alt}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
      />
    </div>
  );
}

function CTAButton({ mobile }) {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent('openConsultationModal'))}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: f,
        fontSize: mobile ? 13 : 14,
        fontWeight: 600,
        color: "#061c27",
        background: mint,
        border: "none",
        borderRadius: 100,
        padding: mobile ? "12px 24px" : "14px 28px",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = "#b8f5b6";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = mint;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      AI Consultation
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </button>
  );
}

function FeatureItem({ title, body, mobile }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h4 style={{
        fontFamily: f,
        fontSize: mobile ? 16 : 18,
        fontWeight: 600,
        color: "#fff",
        margin: "0 0 8px 0",
      }}>{title}</h4>
      <p style={{
        fontFamily: f,
        fontSize: mobile ? 14 : 15,
        lineHeight: 1.7,
        color: "rgba(255,255,255,0.6)",
        margin: 0,
      }}>{body}</p>
    </div>
  );
}

function AIFeatureItem({ title, body, mobile }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h4 style={{
        fontFamily: f,
        fontSize: mobile ? 16 : 18,
        fontWeight: 600,
        color: mint,
        margin: "0 0 8px 0",
      }}>{title}</h4>
      <p style={{
        fontFamily: f,
        fontSize: mobile ? 14 : 15,
        lineHeight: 1.7,
        color: "rgba(255,255,255,0.6)",
        margin: 0,
      }}>{body}</p>
    </div>
  );
}

function IllustratedFeatureCard({ icon, title, body, mobile }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: mobile ? 16 : 20,
      padding: mobile ? 24 : 32,
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }}>
      <div style={{
        width: mobile ? 56 : 64,
        height: mobile ? 56 : 64,
        borderRadius: 16,
        background: "rgba(13,154,165,0.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: mobile ? 20 : 24,
      }}>
        {icon}
      </div>
      <h4 style={{
        fontFamily: f,
        fontSize: mobile ? 17 : 20,
        fontWeight: 600,
        color: "#fff",
        margin: "0 0 12px 0",
        lineHeight: 1.3,
      }}>{title}</h4>
      <p style={{
        fontFamily: f,
        fontSize: mobile ? 14 : 15,
        lineHeight: 1.7,
        color: "rgba(255,255,255,0.55)",
        margin: 0,
        flex: 1,
      }}>{body}</p>
    </div>
  );
}

export default function StripeCRM() {
  const { mobile, tablet } = useBreakpoint();
  const px = mobile ? 20 : tablet ? 32 : 40;
  const sectionPad = mobile ? "64px 0" : "80px 0";

  return (
    <>
      <div style={{ background: "#061c27", minHeight: "100vh" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: `0 ${px}px` }}>

          {/* ═══════ HERO ═══════ */}
          <section style={{
            minHeight: mobile ? "auto" : "50vh",
            display: "flex", flexDirection: "column", justifyContent: "center",
            padding: mobile ? "120px 0 48px" : "140px 0 64px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: teal, flexShrink: 0 }} />
              <span style={{ fontFamily: f, fontSize: 12, fontWeight: 500, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>Stripe-Powered CRM & POS</span>
            </div>

            <h1 style={{
              fontFamily: serif,
              fontSize: mobile ? 36 : tablet ? 52 : 64,
              fontWeight: 400, lineHeight: 1.08, color: "#fff",
              margin: "0 0 28px 0",
            }}>
              Stripe is your CRM now — and <Accent>Milton runs it</Accent>
            </h1>

            <p style={{
              fontFamily: f, fontSize: mobile ? 16 : 20, lineHeight: 1.7,
              color: "rgba(255,255,255,0.6)", maxWidth: 720, margin: "0 0 40px 0",
            }}>
              Here&apos;s something most gym owners don&apos;t realize: Stripe already does almost everything a CRM does. It stores your customers. It manages subscriptions. It processes payments. It tracks transaction history. It handles invoicing, recurring billing, package management, and self-service portals.
            </p>

            <ResponsiveImage 
              desktopSrc="/images/stripe-hero-desktop.png"
              mobileSrc="/images/stripe-hero-mobile.png"
              alt="Clients dashboard powered by Stripe"
              mobile={mobile}
            />

            <div style={{ marginTop: 40 }}>
              <CTAButton mobile={mobile} />
            </div>
          </section>

          {/* ═══════ EVERYTHING A GYM CRM DOES ═══════ */}
          <section style={{ padding: sectionPad }}>
            <h2 style={{
              fontFamily: serif,
              fontSize: mobile ? 28 : 40,
              fontWeight: 400, lineHeight: 1.15, color: "#fff",
              margin: "0 0 32px 0",
            }}>
              Everything a gym CRM does — <Accent>powered by Stripe</Accent>
            </h2>

            <div style={{
              display: "grid",
              gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)",
              gap: mobile ? 16 : 24,
            }}>
              <IllustratedFeatureCard
                icon={
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                }
                title="Client management"
                body="Every member is a Stripe customer record. Contact info, payment methods, subscription status, transaction history, and notes — all in one place."
                mobile={mobile}
              />

              <IllustratedFeatureCard
                icon={
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v4" />
                    <path d="M12 18v4" />
                    <path d="M4.93 4.93l2.83 2.83" />
                    <path d="M16.24 16.24l2.83 2.83" />
                    <path d="M2 12h4" />
                    <path d="M18 12h4" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                }
                title="Memberships and subscriptions"
                body="Monthly memberships, annual contracts, tiered packages, family plans, class packs. Stripe handles recurring billing with AI-powered smart retries."
                mobile={mobile}
              />

              <IllustratedFeatureCard
                icon={
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M9 21V9" />
                  </svg>
                }
                title="Session packages"
                body="Sell 5-packs, 10-packs, or custom bundles. Milton tracks remaining sessions and alerts members when they're running low."
                mobile={mobile}
              />

              <IllustratedFeatureCard
                icon={
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                }
                title="Point of sale"
                body="Process payments in person with Stripe Terminal. Sell supplements, merchandise, drop-ins — right from the floor. No separate POS system."
                mobile={mobile}
              />

              <IllustratedFeatureCard
                icon={
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                }
                title="Invoicing"
                body="Send professional invoices for one-time services or custom pricing. Stripe tracks payment status and sends automatic reminders."
                mobile={mobile}
              />

              <IllustratedFeatureCard
                icon={
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                }
                title="Self-service portal"
                body="Members manage payment methods, view history, upgrade plans, and handle cancellations through a secure portal. Less work for your front desk."
                mobile={mobile}
              />

              <IllustratedFeatureCard
                icon={
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                }
                title="Revenue reporting"
                body="Real-time revenue by product, trainer, membership type. MRR, churn rate, lifetime value — all generated automatically from your Stripe data."
                mobile={mobile}
              />
            </div>

            <div style={{ marginTop: 40, textAlign: "center" }}>
              <CTAButton mobile={mobile} />
            </div>
          </section>

          {/* ═══════ MILTON AI ═══════ */}
          <section style={{ padding: sectionPad }}>
            <h2 style={{
              fontFamily: serif,
              fontSize: mobile ? 28 : 40,
              fontWeight: 400, lineHeight: 1.15, color: "#fff",
              margin: "0 0 24px 0",
            }}>
              Milton AI sits on top — and makes it <Accent>intelligent</Accent>
            </h2>

            <p style={{
              fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
              color: "rgba(255,255,255,0.65)", margin: "0 0 32px 0",
            }}>
              Stripe is the engine. Milton is the brain. While Stripe handles the transactions, Milton adds the intelligence layer that turns a payment system into an actual business operating system.
            </p>

            <div style={{
              display: "grid",
              gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)",
              gap: mobile ? 16 : 24,
            }}>
              <IllustratedFeatureCard
                icon={
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 8v4l3 3" />
                    <circle cx="12" cy="12" r="9" />
                    <path d="M17 17l2 2" />
                  </svg>
                }
                title="Automated renewal outreach"
                body="Milton knows when a package is running low or a membership is about to expire. It reaches out proactively — via text, call, or in-app — to renew before there's a gap in revenue."
                mobile={mobile}
              />

              <IllustratedFeatureCard
                icon={
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <path d="M12 12h.01" />
                    <path d="M17 9l-5 5-2-2" />
                  </svg>
                }
                title="Failed payment recovery"
                body="Stripe's smart retries handle the technical side. Milton handles the human side — reaching out to members with friendly, personalized messages when a payment needs attention."
                mobile={mobile}
              />

              <IllustratedFeatureCard
                icon={
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v4" />
                    <path d="M12 18v4" />
                    <path d="M4.93 4.93l2.83 2.83" />
                    <path d="M16.24 16.24l2.83 2.83" />
                    <path d="M2 12h4" />
                    <path d="M18 12h4" />
                    <path d="M4.93 19.07l2.83-2.83" />
                    <path d="M16.24 7.76l2.83-2.83" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                }
                title="Upsell and cross-sell triggers"
                body="Milton sees the full member picture — training, nutrition, engagement — and knows when someone is ready for the next offer. The CRM data and coaching data work together."
                mobile={mobile}
              />

              <IllustratedFeatureCard
                icon={
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                }
                title="Churn prediction"
                body="Milton identifies members showing early warning signs — declining attendance, skipped payments, booking gaps — and triggers re-engagement workflows before they cancel."
                mobile={mobile}
              />
            </div>

            <div style={{ marginTop: 40, textAlign: "center" }}>
              <CTAButton mobile={mobile} />
            </div>
          </section>

          {/* ═══════ TRUSTED INFRASTRUCTURE + CTA ═══════ */}
          <section style={{ padding: sectionPad }}>
            <h2 style={{
              fontFamily: serif,
              fontSize: mobile ? 28 : 40,
              fontWeight: 400, lineHeight: 1.15, color: "#fff",
              margin: "0 0 24px 0",
            }}>
              Built on the most <Accent>trusted financial infrastructure</Accent> in the world
            </h2>

            <ResponsiveImage 
              desktopSrc="/images/stripe-infrastructure-desktop.png"
              mobileSrc="/images/stripe-infrastructure-mobile.png"
              alt="Stripe global infrastructure - 99.99% uptime, $1T+ processed yearly, 197 countries"
              mobile={mobile}
            />

            <h2 style={{
              fontFamily: serif,
              fontSize: mobile ? 26 : 36,
              fontWeight: 400, lineHeight: 1.2, color: "#fff",
              margin: "48px 0 16px 0",
              textAlign: "center",
            }}>
              Ready to cut out the middleman?
            </h2>
            <p style={{
              fontFamily: f,
              fontSize: mobile ? 15 : 17,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.6)",
              maxWidth: 500,
              margin: "0 auto 28px auto",
              textAlign: "center",
            }}>
              Book a free AI Strategy Session and we&apos;ll show you how Milton on Stripe can simplify your payments, clients, and operations.
            </p>
            <div style={{ textAlign: "center" }}>
              <CTAButton mobile={mobile} />
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
