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
            You&apos;re not going to hire someone to sit by the phone 24/7. Your front desk has enough going on, your trainers are coaching, and you&apos;ve got a business to run. But every call that goes to voicemail is a booking that probably won&apos;t happen. People don&apos;t leave messages. They just call somewhere else.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 20, lineHeight: 1.7,
            color: "rgba(255,255,255,0.6)", maxWidth: 720, margin: "0 0 40px 0",
          }}>
            Milton&apos;s AI Receptionist picks up, has a real conversation, answers questions, and books or reschedules on the spot. It&apos;s not replacing your front desk. It&apos;s catching everything they can&apos;t get to.
          </p>

          <ResponsiveImage 
            desktopSrc="/images/receptionist-hero-desktop.png"
            mobileSrc="/images/receptionist-hero-mobile.png"
            alt="AI Receptionist handling live call - Incoming call, transcript, and calendar update"
            mobile={mobile}
          />

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
            Instead of a beep and a message nobody listens to, callers get a friendly, conversational greeting — branded to your gym, informed about your services, and capable of actually doing something useful.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: "0 0 20px 0",
          }}>
            Someone calls at 9pm curious about personal training. It walks them through your offerings and books an intro session. They get a confirmation text. The session shows up on the trainer&apos;s calendar. You didn&apos;t touch a thing.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.75,
            color: "rgba(255,255,255,0.65)", margin: 0,
          }}>
            It connects directly to Milton&apos;s scheduling system and CRM. Every call becomes a contact, every booking lands on the calendar, and call notes are captured so your team sees exactly what happened — no recordings to dig through.
          </p>

          <ResponsiveImage 
            desktopSrc="/images/receptionist-calllog-desktop.png"
            mobileSrc="/images/receptionist-calllog-mobile.png"
            alt="Call log showing 0 missed calls with activity: Booked intro session, Rescheduled Thursday session, Answered pricing question, Re-engaged cold lead"
            mobile={mobile}
          />
        </section>

        {/* ═══════ EVERY CALL TYPE ═══════ */}
        <section style={{ padding: sectionPad, borderTop: "1px solid rgba(13,154,165,0.15)" }}>
          <h2 style={{
            fontFamily: serif, fontSize: mobile ? 28 : 40, fontWeight: 400, color: "#fff",
            margin: "0 0 24px 0", lineHeight: 1.15,
          }}>
            Every call type, <Accent>handled</Accent>
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)",
            gap: mobile ? 16 : 24,
            marginTop: 32,
          }}>
            <IllustratedFeatureCard
              icon={
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <path d="M9 16l2 2 4-4" />
                </svg>
              }
              title="Books appointments"
              body="Checks real-time availability, offers open slots, and confirms the booking before the caller hangs up. No &quot;someone will call you back.&quot;"
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
              title="Reschedules and cancels"
              body="A member wants to move Thursday to Friday. Handled instantly. Calendar updated. Confirmation sent."
              mobile={mobile}
            />

            <IllustratedFeatureCard
              icon={
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0 1 22 16.92z" />
                  <path d="M14.05 2a9 9 0 0 1 8 7.94" />
                  <path d="M14.05 6A5 5 0 0 1 18 10" />
                </svg>
              }
              title="Follows up on no-shows"
              body="A member missed their morning session. The AI calls that afternoon with a friendly check-in and an offer to rebook."
              mobile={mobile}
            />

            <IllustratedFeatureCard
              icon={
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              }
              title="Re-engages cold leads"
              body="Someone called last week about memberships but never booked. The AI follows up and gets them on the calendar."
              mobile={mobile}
            />

            <IllustratedFeatureCard
              icon={
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              }
              title="Covers every window"
              body="5pm rush, evenings, weekends, holidays. Every caller gets answered. Every booking opportunity gets captured."
              mobile={mobile}
            />
          </div>

          <ResponsiveImage 
            desktopSrc="/images/receptionist-calltypes-desktop.png"
            mobileSrc="/images/receptionist-calltypes-mobile.png"
            alt="Call type cards showing Books Appointments, Reschedules, Follows Up, and Re-engages Leads"
            mobile={mobile}
          />
        </section>

        {/* ═══════ CLOSING ═══════ */}
        <section style={{
          padding: sectionPad,
          borderTop: "1px solid rgba(13,154,165,0.15)",
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
            color: "rgba(255,255,255,0.65)", maxWidth: 540, margin: "0 auto 28px auto",
          }}>
            Book an AI Consultation and see the AI Receptionist in action.
          </p>

          <CTAButton mobile={mobile} />
        </section>

        </div>
      </div>
    </>
  );
}
