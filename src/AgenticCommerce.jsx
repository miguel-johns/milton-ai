import { useState } from "react";
import useBreakpoint from "./useBreakpoint";

const f = "'DM Sans', sans-serif";
const serif = "'Instrument Serif', serif";
const teal = "#0d9aa5";
const mint = "#9af198";

function Accent({ children }) {
  return <em style={{ fontStyle: "italic", color: mint }}>{children}</em>;
}

function VisualPlaceholder({ height = 300, label = "Visual", mobile }) {
  return (
    <div style={{
      width: "100%",
      height: mobile ? height * 0.7 : height,
      background: "linear-gradient(135deg, rgba(13,154,165,0.08) 0%, rgba(154,241,152,0.05) 100%)",
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

function WorkflowStep({ title, body, mobile }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 16,
      padding: mobile ? "24px 20px" : "28px 24px",
      marginBottom: 20,
    }}>
      <h4 style={{
        fontFamily: serif,
        fontSize: mobile ? 20 : 24,
        fontWeight: 400,
        color: "#fff",
        margin: "0 0 12px 0",
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

export default function AgenticCommerce() {
  const { mobile, tablet } = useBreakpoint();
  const sectionPad = mobile ? "56px 0" : "80px 0";

  return (
    <>
      <div style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: mobile ? "0 20px" : tablet ? "0 32px" : "0 40px",
      }}>

        {/* ═══════ HERO ═══════ */}
        <section style={{
          minHeight: mobile ? "auto" : "50vh",
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: mobile ? "120px 0 48px" : "140px 0 64px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: teal, flexShrink: 0 }} />
            <span style={{ fontFamily: f, fontSize: 12, fontWeight: 500, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>Agentic Commerce</span>
          </div>

          <h1 style={{
            fontFamily: serif,
            fontSize: mobile ? 36 : tablet ? 52 : 64,
            fontWeight: 400, lineHeight: 1.08, color: "#fff",
            margin: "0 0 28px 0",
          }}>
            An AI that knows what you sell — and <Accent>how to sell it</Accent>
          </h1>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 20, lineHeight: 1.7,
            color: "rgba(255,255,255,0.6)", maxWidth: 720, margin: "0 0 24px 0",
          }}>
            You&apos;ve got memberships, PT packages, nutrition programs, recovery add-ons, merchandise, supplements, challenges, and more. Right now, selling any of it requires a human to remember what&apos;s available, who to pitch it to, and when to follow up. That&apos;s a lot of things to keep track of — and a lot of revenue that falls through the cracks when nobody does.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 20, lineHeight: 1.7,
            color: "rgba(255,255,255,0.6)", maxWidth: 720, margin: "0 0 40px 0",
          }}>
            Milton&apos;s Agentic Commerce is an AI-powered sales engine that knows your entire catalog, understands where every lead and member is in their journey, and works across text, phone, and app to move them toward the right offer at the right time. You upload what you sell. Milton figures out who needs it, when to reach out, and how to close it.
          </p>

          <VisualPlaceholder height={mobile ? 280 : 480} label="Hero Image" mobile={mobile} />

          <div style={{ marginTop: 40 }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ UPLOAD YOUR STORE ═══════ */}
        <section style={{ padding: sectionPad, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : 38,
            fontWeight: 400,
            color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Upload your store. Milton <Accent>learns the playbook.</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            Drop in your offerings — memberships, packages, add-ons, challenges, retail, whatever you sell. Milton learns what each product is, who it&apos;s for, what it costs, and how it fits into the member journey. From that point forward, it knows what to recommend, when to recommend it, and how to position it based on where that person is in their relationship with your facility.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 0 0",
          }}>
            A brand new lead gets a different conversation than a six-month member. Someone who just finished a nutrition challenge gets a different offer than someone who&apos;s never tried one. Milton understands the context and adapts — just like your best salesperson would, except it never forgets and it never takes a day off.
          </p>

          <VisualPlaceholder height={350} mobile={mobile} />

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ FULL WORKFLOW ═══════ */}
        <section style={{ padding: sectionPad, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : 38,
            fontWeight: 400,
            color: "#fff",
            margin: "0 0 24px 0",
          }}>
            From first touch to transaction — <Accent>handled</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 32px 0",
          }}>
            Agentic Commerce isn&apos;t one tool. It&apos;s a full AI-powered workflow that moves people through your pipeline from the moment they raise their hand to the moment they pay — and beyond.
          </p>

          <WorkflowStep
            title="Welcome new leads"
            body="Someone fills out a form, calls your AI Receptionist, or gets referred by a member. Milton picks them up immediately with a personalized text or call. No delay. No waiting for someone on your team to follow up tomorrow."
            mobile={mobile}
          />
          <VisualPlaceholder height={280} label="Welcome Flow Visual" mobile={mobile} />

          <div style={{ height: 32 }} />

          <WorkflowStep
            title="Nurture with intelligence"
            body="Not every lead is ready to buy today. Milton keeps the conversation going — checking in, answering questions, sharing relevant content, and building trust over days or weeks. It knows when to push and when to wait because it's tracking engagement signals the whole time."
            mobile={mobile}
          />
          <VisualPlaceholder height={280} label="Nurture Flow Visual" mobile={mobile} />

          <div style={{ height: 32 }} />

          <WorkflowStep
            title="Book them in"
            body="When a lead is ready, Milton doesn't hand them a link and hope for the best. It has the conversation, finds a time that works, books the session or tour, and confirms it — over text, on a call, or in-app. Connected directly to your scheduling system and Stripe CRM."
            mobile={mobile}
          />
          <VisualPlaceholder height={280} label="Booking Flow Visual" mobile={mobile} />

          <div style={{ height: 32 }} />

          <WorkflowStep
            title="Move them through workflows"
            body="This is where it gets powerful. Milton automatically shifts people between workflows based on their actions. A lead who books an intro session moves into a post-visit follow-up workflow. A member who hasn't rebooked in two weeks moves into a re-engagement workflow. Someone who just bought a PT package moves into an onboarding workflow. You set the logic once. Milton runs it forever."
            mobile={mobile}
          />
          <VisualPlaceholder height={280} label="Workflows Visual" mobile={mobile} />

          <div style={{ height: 32 }} />

          <WorkflowStep
            title="Transact"
            body="Milton can process payments directly through text or in-app. A member gets a message: "Your 10-pack is down to one session. Want to renew?" They reply yes. Milton handles the payment through Stripe. Done. No portal. No front desk. No friction."
            mobile={mobile}
          />
          <VisualPlaceholder height={280} label="Transaction Visual" mobile={mobile} />

          <div style={{ height: 32 }} />

          <WorkflowStep
            title="Renew and retain"
            body="Packages expiring. Memberships coming up for renewal. Challenge re-enrollment windows. Milton tracks all of it and reaches out proactively — before the member lapses, before the revenue disappears, and before your team has to remember to follow up."
            mobile={mobile}
          />
          <VisualPlaceholder height={280} label="Renewal Visual" mobile={mobile} />

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ OMNI-CHANNEL ═══════ */}
        <section style={{ padding: sectionPad, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : 38,
            fontWeight: 400,
            color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Omni-channel — <Accent>text, phone, app, all of it</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            Agentic Commerce doesn&apos;t live in one channel. It reaches people wherever they&apos;re most likely to respond.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            A new lead might get a text within 60 seconds of filling out a form. If they don&apos;t respond, Milton follows up with a phone call the next day through the AI Receptionist. A long-time member might get an in-app notification about a new recovery package. Another member might get a text at the perfect moment — right after they finish a session — asking if they want to add nutrition tracking.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: 0,
          }}>
            Milton picks the channel, picks the timing, and picks the offer. All based on data. All running in the background while your team focuses on coaching and operations.
          </p>

          <VisualPlaceholder height={350} label="Omni-channel Visual" mobile={mobile} />

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ BEST SALESPERSON ═══════ */}
        <section style={{ padding: sectionPad, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : 38,
            fontWeight: 400,
            color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Your best salesperson — who <Accent>never clocks out</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            Think about your highest-performing salesperson. They know the products cold. They remember every lead&apos;s name. They follow up at exactly the right time. They never let a hot lead go cold. They always ask for the renewal before the package runs out.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            Now imagine that person working every channel, every hour, for every lead and every member simultaneously.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: 0,
          }}>
            That&apos;s Agentic Commerce. It doesn&apos;t replace the human conversations that close big deals — your team still handles the high-touch moments. But it makes sure no lead gets forgotten, no renewal gets missed, and no revenue opportunity sits on the table because someone got busy.
          </p>

          <VisualPlaceholder height={350} mobile={mobile} />
        </section>

        {/* ═══════ CONNECTED ═══════ */}
        <section style={{ padding: sectionPad, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : 38,
            fontWeight: 400,
            color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Connected to <Accent>everything in Milton</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            Agentic Commerce isn&apos;t a standalone sales tool. It&apos;s wired into the entire Milton ecosystem. It sees scheduling data, member engagement, training history, nutrition adherence, and attendance patterns. That context makes every outreach smarter.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            A member who&apos;s been crushing their workouts and hitting their nutrition targets for six weeks? That&apos;s the perfect time to pitch them on a goal-setting session with a trainer. A member who just hit their six-month anniversary? Time for a renewal conversation with a loyalty incentive. A lead who visited once and never came back? A re-engagement sequence with a limited-time offer.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: 0,
          }}>
            Milton connects the dots between what&apos;s happening in your facility and what your members need to hear next. Then it reaches out and handles it.
          </p>

          <VisualPlaceholder height={350} mobile={mobile} />

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ REVENUE ON AUTOPILOT ═══════ */}
        <section style={{ padding: sectionPad, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : 38,
            fontWeight: 400,
            color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Revenue on autopilot — <Accent>directed by you</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0",
          }}>
            You decide what gets sold, to whom, and how. You set the workflows, the triggers, the pricing, and the rules. Milton executes — relentlessly, consistently, and at a scale your team could never match manually.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 17 : 20, lineHeight: 1.75,
            color: mint, fontWeight: 500, margin: 0,
          }}>
            Upload your store. Set your playbook. Let Milton sell.
          </p>

          <VisualPlaceholder height={350} mobile={mobile} />
        </section>

        {/* ═══════ CLOSING CTA ═══════ */}
        <section style={{
          padding: sectionPad,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          textAlign: "center",
        }}>
          <div style={{
            background: "rgba(13,154,165,0.06)",
            border: "1px solid rgba(13,154,165,0.2)",
            borderRadius: 20,
            padding: mobile ? "40px 24px" : "56px 48px",
          }}>
            <h3 style={{
              fontFamily: serif,
              fontSize: mobile ? 26 : 34,
              fontWeight: 400,
              color: "#fff",
              margin: "0 0 16px 0",
            }}>
              Ready to put your sales on <Accent>autopilot</Accent>?
            </h3>

            <p style={{
              fontFamily: f,
              fontSize: mobile ? 15 : 17,
              color: "rgba(255,255,255,0.6)",
              margin: "0 0 28px 0",
              maxWidth: 500,
              marginLeft: "auto",
              marginRight: "auto",
            }}>
              Book a free AI Strategy Session and we&apos;ll show you how Agentic Commerce can drive revenue for your facility.
            </p>

            <CTAButton mobile={mobile} />
          </div>
        </section>

      </div>
    </>
  );
}
