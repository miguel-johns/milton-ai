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

          {/* ═══════ INTRO ═══════ */}
          <section style={{ padding: sectionPad }}>
            <p style={{
              fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
              color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
            }}>
              The only reason gyms haven&apos;t used Stripe as their CRM is because it wasn&apos;t designed with a gym-friendly interface. So the industry built layers of software — MindBody, ABC Fitness, Wellness Living — just to make billing and client management usable for fitness businesses. You&apos;ve been paying a middleman to sit between you and Stripe.
            </p>

            <p style={{
              fontFamily: f, fontSize: mobile ? 17 : 20, lineHeight: 1.75,
              color: mint, fontWeight: 500, margin: 0,
            }}>
              That middleman is no longer necessary. Milton connects directly to Stripe and gives you the interface, the automations, and the AI intelligence to run your entire client and payment operation.
            </p>
          </section>

          {/* ═══════ NO MORE MIDDLEMAN ═══════ */}
          <section style={{ padding: sectionPad }}>
            <h2 style={{
              fontFamily: serif,
              fontSize: mobile ? 28 : 40,
              fontWeight: 400, lineHeight: 1.15, color: "#fff",
              margin: "0 0 24px 0",
            }}>
              No more middleman between you and <Accent>your money</Accent>
            </h2>

            <p style={{
              fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
              color: "rgba(255,255,255,0.65)", margin: "0 0 20px 0",
            }}>
              Traditional gym management software charges you monthly, takes a cut of your transactions, and sits on top of Stripe (or a similar processor) anyway. You&apos;re paying twice — once for the software, once for the processing. And you&apos;re trusting a middleman to get it right.
            </p>

            <p style={{
              fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
              color: "rgba(255,255,255,0.65)", margin: "0 0 20px 0",
            }}>
              Milton eliminates that layer. Stripe handles your payments, subscriptions, invoicing, and customer records directly. Milton provides the gym-specific interface and AI automations on top. You keep more of your revenue. You get more control. And the system underneath is built by the company that powers payments for half the Fortune 100.
            </p>

            <VisualPlaceholder height={350} mobile={mobile} />

            <div style={{ marginTop: 40, textAlign: "center" }}>
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

            <FeatureItem
              title="Client management"
              body="Every member is a Stripe customer record. Contact info, payment methods, subscription status, transaction history, and notes — all in one place. Milton surfaces it in a clean, gym-friendly dashboard."
              mobile={mobile}
            />

            <FeatureItem
              title="Memberships and subscriptions"
              body="Set up any pricing model you want. Monthly memberships, annual contracts, tiered packages, family plans, class packs, hybrid models. Stripe handles recurring billing automatically with AI-powered smart retries that recover failed payments before you even know they happened."
              mobile={mobile}
            />

            <FeatureItem
              title="Session packages"
              body="Sell 5-packs, 10-packs, or custom bundles. Milton tracks remaining sessions and alerts members (and their trainers) when they're running low."
              mobile={mobile}
            />

            <FeatureItem
              title="Point of sale"
              body="Process payments in person with Stripe Terminal. Sell supplements, merchandise, recovery sessions, drop-ins, or anything else — right from the floor. No separate POS system. No additional hardware fees."
              mobile={mobile}
            />

            <FeatureItem
              title="Invoicing"
              body="Send professional invoices for one-time services, personal training blocks, or custom pricing. Stripe tracks payment status and sends automatic reminders for overdue balances."
              mobile={mobile}
            />

            <FeatureItem
              title="Self-service portal"
              body="Members manage their own payment methods, view transaction history, upgrade or downgrade their plans, and handle cancellations through a secure, branded portal. Less work for your front desk."
              mobile={mobile}
            />

            <FeatureItem
              title="Revenue reporting"
              body="See real-time revenue by product, by trainer, by membership type. Monthly recurring revenue, churn rate, lifetime value — all the metrics that matter, generated automatically from your Stripe data."
              mobile={mobile}
            />

            <VisualPlaceholder height={350} mobile={mobile} />

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

            <AIFeatureItem
              title="Automated renewal outreach"
              body="Milton knows when a package is running low or a membership is about to expire. It reaches out proactively — via text, call, or in-app — to renew before there's a gap in revenue."
              mobile={mobile}
            />

            <AIFeatureItem
              title="Failed payment recovery"
              body="Stripe's smart retries handle the technical side. Milton handles the human side — reaching out to members with friendly, personalized messages when a payment needs attention. No awkward front desk conversations."
              mobile={mobile}
            />

            <AIFeatureItem
              title="Upsell and cross-sell triggers"
              body="Milton sees the full member picture — training data, nutrition, engagement, attendance — and knows when someone is ready for the next offer. A member who's been consistent for three months might get a nudge about upgrading to a PT package. A member finishing a nutrition challenge might get an offer for ongoing tracking. The CRM data and the coaching data work together."
              mobile={mobile}
            />

            <AIFeatureItem
              title="Churn prediction"
              body="Milton identifies members showing early warning signs — declining attendance, skipped payments, booking gaps — and triggers re-engagement workflows before they cancel. You see it in the dashboard. Milton's already acting on it."
              mobile={mobile}
            />

            <VisualPlaceholder height={350} mobile={mobile} />

            <div style={{ marginTop: 40, textAlign: "center" }}>
              <CTAButton mobile={mobile} />
            </div>
          </section>

          {/* ═══════ ONE SYSTEM ═══════ */}
          <section style={{ padding: sectionPad }}>
            <h2 style={{
              fontFamily: serif,
              fontSize: mobile ? 28 : 40,
              fontWeight: 400, lineHeight: 1.15, color: "#fff",
              margin: "0 0 24px 0",
            }}>
              One system for payments, clients, and <Accent>AI</Accent>
            </h2>

            <p style={{
              fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
              color: "rgba(255,255,255,0.65)", margin: "0 0 20px 0",
            }}>
              The biggest problem with most gym tech stacks is fragmentation. Your CRM is one system. Your billing is another. Your scheduling is another. Your coaching tools are another. Nothing talks to each other, and you&apos;re the one holding it all together.
            </p>

            <p style={{
              fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
              color: "rgba(255,255,255,0.65)", margin: "0 0 20px 0",
            }}>
              Milton on Stripe eliminates that. Payments, client records, subscriptions, scheduling, coaching data, nutrition tracking, and AI automation — all flowing through one connected system. When a member books a session, it shows up in the schedule and the CRM. When they pay, it hits Stripe and updates their record. When they complete a workout, it feeds the Coach Co-Pilot. When their package is running low, Milton reaches out to renew.
            </p>

            <p style={{
              fontFamily: f, fontSize: mobile ? 16 : 18, lineHeight: 1.75,
              color: mint, fontWeight: 500, margin: 0,
            }}>
              No reconciling. No exporting. No switching between tabs. Just one system that runs your business.
            </p>

            <VisualPlaceholder height={350} mobile={mobile} />

            <div style={{ marginTop: 40, textAlign: "center" }}>
              <CTAButton mobile={mobile} />
            </div>
          </section>

          {/* ═══════ TRUSTED INFRASTRUCTURE ═══════ */}
          <section style={{ padding: sectionPad }}>
            <h2 style={{
              fontFamily: serif,
              fontSize: mobile ? 28 : 40,
              fontWeight: 400, lineHeight: 1.15, color: "#fff",
              margin: "0 0 24px 0",
            }}>
              Built on the most <Accent>trusted financial infrastructure</Accent> in the world
            </h2>

            <p style={{
              fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
              color: "rgba(255,255,255,0.65)", margin: "0 0 20px 0",
            }}>
              Stripe processes payments for Amazon, Google, Shopify, and millions of businesses worldwide. It supports 135+ currencies and payment methods. It&apos;s PCI compliant out of the box. It has built-in fraud detection. And it maintains 99.999% historical uptime.
            </p>

            <p style={{
              fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
              color: "rgba(255,255,255,0.65)", margin: "0 0 20px 0",
            }}>
              That&apos;s the infrastructure running your gym&apos;s finances now. Not a fitness-specific startup that might get acquired next year. Not a legacy platform built in 2012. Stripe — the same system the biggest companies on the planet trust with their revenue.
            </p>

            <p style={{
              fontFamily: f, fontSize: mobile ? 16 : 18, lineHeight: 1.75,
              color: mint, fontWeight: 500, margin: 0,
            }}>
              Milton just makes it work for your gym.
            </p>

            <VisualPlaceholder height={350} mobile={mobile} />
          </section>

          {/* ═══════ CLOSING CTA ═══════ */}
          <section style={{ padding: sectionPad }}>
            <div style={{
              background: "rgba(13,154,165,0.08)",
              border: "1px solid rgba(13,154,165,0.2)",
              borderRadius: mobile ? 16 : 24,
              padding: mobile ? "40px 24px" : "56px 48px",
              textAlign: "center",
            }}>
              <h2 style={{
                fontFamily: serif,
                fontSize: mobile ? 26 : 36,
                fontWeight: 400, lineHeight: 1.2, color: "#fff",
                margin: "0 0 16px 0",
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
              }}>
                Book a free AI Strategy Session and we&apos;ll show you how Milton on Stripe can simplify your payments, clients, and operations.
              </p>
              <CTAButton mobile={mobile} />
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
