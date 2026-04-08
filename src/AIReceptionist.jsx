import { useState, useEffect } from 'react';

const f = "'DM Sans', sans-serif";
const serif = "'Instrument Serif', serif";
const teal = "#0d9aa5";
const mint = "#9af198";

function useBreakpoint() {
  const [state, setState] = useState({ mobile: false, tablet: false });
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setState({ mobile: w < 768, tablet: w >= 768 && w < 1024 });
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return state;
}

const Accent = ({ children }) => (
  <span style={{ fontFamily: serif, fontStyle: "italic", color: mint }}>{children}</span>
);

function VisualPlaceholder({ height = 300, label = "Visual Placeholder", mobile }) {
  return (
    <div style={{
      width: "100%",
      height: mobile ? height * 0.7 : height,
      background: "rgba(13,154,165,0.08)",
      border: "1px dashed rgba(13,154,165,0.3)",
      borderRadius: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 32,
    }}>
      <span style={{ fontFamily: f, fontSize: 14, color: "rgba(255,255,255,0.3)" }}>{label}</span>
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
    <div style={{ marginBottom: 24 }}>
      <h4 style={{
        fontFamily: f, fontSize: mobile ? 15 : 17, fontWeight: 600, color: "#fff",
        margin: "0 0 8px 0",
      }}>{title}</h4>
      <p style={{
        fontFamily: f, fontSize: mobile ? 14 : 15, lineHeight: 1.7,
        color: "rgba(255,255,255,0.6)", margin: 0,
      }}>{body}</p>
    </div>
  );
}

export default function AIReceptionist() {
  const { mobile, tablet } = useBreakpoint();
  const px = mobile ? 20 : tablet ? 32 : 40;
  const sectionPad = mobile ? "56px 0" : "80px 0";

  return (
    <>
      <div style={{
        minHeight: "100vh", background: "#061c27",
        paddingLeft: px, paddingRight: px,
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* ═══════ HERO ═══════ */}
        <section style={{
          minHeight: mobile ? "auto" : "50vh",
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: mobile ? "120px 0 48px" : "140px 0 64px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: teal, flexShrink: 0 }} />
            <span style={{ fontFamily: f, fontSize: 12, fontWeight: 500, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>AI Receptionist</span>
          </div>

          <h1 style={{
            fontFamily: serif,
            fontSize: mobile ? 36 : tablet ? 52 : 64,
            fontWeight: 400, lineHeight: 1.08, color: "#fff",
            margin: "0 0 28px 0",
          }}>
            Voicemail that actually <Accent>does something</Accent>
          </h1>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 20, lineHeight: 1.7,
            color: "rgba(255,255,255,0.6)", maxWidth: 720, margin: "0 0 24px 0",
          }}>
            You&apos;re not going to hire someone to sit by the phone 24/7. You know that. Your front desk has enough going on, your trainers are coaching, and you&apos;ve got a business to run. But every call that goes to voicemail is a booking that probably won&apos;t happen. People don&apos;t leave messages. They just call somewhere else.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 20, lineHeight: 1.7,
            color: "rgba(255,255,255,0.6)", maxWidth: 720, margin: "0 0 40px 0",
          }}>
            Milton&apos;s AI Receptionist is a smarter voicemail — one that picks up, has a real conversation, answers questions, and can book, reschedule, or manage your calendar on the spot. It&apos;s not trying to replace your front desk. It&apos;s catching everything they can&apos;t get to.
          </p>

          <VisualPlaceholder height={mobile ? 280 : 480} label="Hero Image" mobile={mobile} />

          <div style={{ marginTop: 40 }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ PICKS UP ═══════ */}
        <section style={{ padding: sectionPad, borderTop: "1px solid rgba(13,154,165,0.15)" }}>
          <h2 style={{
            fontFamily: serif, fontSize: mobile ? 28 : 40, fontWeight: 400, color: "#fff",
            margin: "0 0 24px 0", lineHeight: 1.15,
          }}>
            It picks up. It talks. <Accent>It handles it.</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 20px 0",
          }}>
            This is voicemail powered by AI. Instead of a beep and a message nobody listens to, callers get a friendly, conversational greeting — branded to your gym, informed about your services, and capable of actually doing something useful.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 20px 0",
          }}>
            Someone calls asking about class times. It answers. Someone calls wanting to reschedule their Thursday session. It checks the calendar and moves it. Someone calls at 9pm curious about personal training. It walks them through what you offer and books an intro session. They get a confirmation text. The session shows up on the trainer&apos;s calendar. You didn&apos;t touch a thing.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 18, lineHeight: 1.75,
            color: mint, fontWeight: 500, margin: 0,
          }}>
            It&apos;s not pretending to be a person. It&apos;s just way more useful than a voicemail box.
          </p>

          <VisualPlaceholder height={350} mobile={mobile} />

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ BOOKING ═══════ */}
        <section style={{ padding: sectionPad, borderTop: "1px solid rgba(13,154,165,0.15)" }}>
          <h2 style={{
            fontFamily: serif, fontSize: mobile ? 28 : 40, fontWeight: 400, color: "#fff",
            margin: "0 0 24px 0", lineHeight: 1.15,
          }}>
            Books, reschedules, and fills your calendar <Accent>automatically</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 32px 0",
          }}>
            The AI Receptionist connects directly to Milton&apos;s scheduling system and Stripe-powered CRM. It doesn&apos;t just take messages — it takes action.
          </p>

          <FeatureItem 
            title="Books appointments on the call"
            body="It checks real-time availability, offers open slots, and confirms the booking before the caller hangs up. No &quot;someone will call you back.&quot; No lost leads."
            mobile={mobile}
          />

          <FeatureItem 
            title="Reschedules and cancels"
            body="A member calls to move their Thursday session to Friday. Handled instantly. Calendar updated. New confirmation sent."
            mobile={mobile}
          />

          <FeatureItem 
            title="Follows up on no-shows"
            body="A member missed their session this morning. The AI calls them that afternoon with a friendly check-in and offers to rebook."
            mobile={mobile}
          />

          <FeatureItem 
            title="Confirms upcoming sessions"
            body="Automated reminder calls go out before scheduled appointments. They use the member's name and know what session they're coming in for."
            mobile={mobile}
          />

          <FeatureItem 
            title="Re-engages cold leads"
            body="Someone called last week asking about memberships but never booked. The AI follows up to see if they're still interested and offers to get them on the calendar."
            mobile={mobile}
          />

          <VisualPlaceholder height={350} mobile={mobile} />

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ HANDLES CALLS ═══════ */}
        <section style={{ padding: sectionPad, borderTop: "1px solid rgba(13,154,165,0.15)" }}>
          <h2 style={{
            fontFamily: serif, fontSize: mobile ? 28 : 40, fontWeight: 400, color: "#fff",
            margin: "0 0 24px 0", lineHeight: 1.15,
          }}>
            Handles the calls your team <Accent>can&apos;t get to</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 20px 0",
          }}>
            During the 5pm rush, your front desk is slammed. Three calls come in. Two go to voicemail. Those two callers may never call back.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 20px 0",
          }}>
            The AI Receptionist handles all of them at once. Every caller gets answered. Every question gets addressed. Every booking opportunity gets captured. This matters most during your highest-traffic windows — early morning, lunch, after work — and during the hours when nobody&apos;s at the desk at all. Evenings. Weekends. Holidays. It&apos;s always on.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 18, lineHeight: 1.75,
            color: mint, fontWeight: 500, margin: 0,
          }}>
            Your front desk focuses on the people standing in front of them. The AI Receptionist catches everyone else.
          </p>

          <VisualPlaceholder height={350} mobile={mobile} />

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ CONNECTED ═══════ */}
        <section style={{ padding: sectionPad, borderTop: "1px solid rgba(13,154,165,0.15)" }}>
          <h2 style={{
            fontFamily: serif, fontSize: mobile ? 28 : 40, fontWeight: 400, color: "#fff",
            margin: "0 0 24px 0", lineHeight: 1.15,
          }}>
            Connected to your CRM, scheduling, and <Accent>the rest of Milton</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 20px 0",
          }}>
            Every call flows into Milton&apos;s Stripe-powered CRM. New callers become contacts. Bookings become sessions on the calendar. Call notes and context are captured so your team can see exactly what happened without listening to a recording.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: 0,
          }}>
            And because it&apos;s part of the Milton ecosystem, the AI Receptionist knows your members. It can pull up their name, their trainer, their session history, and their membership status — all in real time during the call. A returning member calls and the AI already knows who they are, who they train with, and when their next session is.
          </p>

          <VisualPlaceholder height={350} mobile={mobile} />

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ CUSTOMIZATION ═══════ */}
        <section style={{ padding: sectionPad, borderTop: "1px solid rgba(13,154,165,0.15)" }}>
          <h2 style={{
            fontFamily: serif, fontSize: mobile ? 28 : 40, fontWeight: 400, color: "#fff",
            margin: "0 0 24px 0", lineHeight: 1.15,
          }}>
            Your number, your voice, <Accent>your rules</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 32px 0",
          }}>
            The AI Receptionist gets its own dedicated phone number — or you can port your existing one. You control everything about how it operates.
          </p>

          <FeatureItem 
            title="Custom scripts"
            body="Write exactly what the AI should say for different call types. Intake calls, scheduling calls, FAQ calls, follow-ups — each gets its own flow."
            mobile={mobile}
          />

          <FeatureItem 
            title="Tone and personality"
            body="Friendly and casual? Professional and polished? Match it to your brand."
            mobile={mobile}
          />

          <FeatureItem 
            title="Escalation rules"
            body="If a call needs a human — a billing dispute, a complaint, something complex — the AI transfers it seamlessly with full context so your team picks up right where the conversation left off."
            mobile={mobile}
          />

          <FeatureItem 
            title="Call summaries and reporting"
            body="Every call is logged with a summary. Weekly reports show call volume, bookings made, questions asked, and follow-up outcomes."
            mobile={mobile}
          />

          <VisualPlaceholder height={350} mobile={mobile} />

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ CLOSING ═══════ */}
        <section style={{ padding: sectionPad, borderTop: "1px solid rgba(13,154,165,0.15)" }}>
          <div style={{
            background: "rgba(13,154,165,0.08)",
            border: "1px solid rgba(13,154,165,0.2)",
            borderRadius: mobile ? 16 : 20,
            padding: mobile ? "40px 24px" : "56px 48px",
            textAlign: "center",
          }}>
            <h2 style={{
              fontFamily: serif, fontSize: mobile ? 28 : 40, fontWeight: 400, color: "#fff",
              margin: "0 0 20px 0", lineHeight: 1.15,
            }}>
              Stop losing bookings to <Accent>missed calls</Accent>
            </h2>

            <p style={{
              fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
              color: "rgba(255,255,255,0.65)", maxWidth: 600, margin: "0 auto 20px auto",
            }}>
              You don&apos;t need to man the phone all day. You just need something smarter than a voicemail box picking up when you can&apos;t. The AI Receptionist catches every call, handles the simple stuff on the spot, and makes sure nothing slips through the cracks.
            </p>

            <p style={{
              fontFamily: f, fontSize: mobile ? 16 : 18, lineHeight: 1.75,
              color: mint, fontWeight: 500, margin: "0 0 32px 0",
            }}>
              It&apos;s not replacing your team. It&apos;s the safety net they&apos;ve always needed.
            </p>

            <CTAButton mobile={mobile} />
          </div>

          <VisualPlaceholder height={350} mobile={mobile} />
        </section>

        </div>
      </div>
    </>
  );
}
