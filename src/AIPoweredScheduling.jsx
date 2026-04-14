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
const serif = "'Cormorant Garamond', serif";
const teal = "#0d9aa5";
const mint = "#9af198";

function Accent({ children }) {
  return <span style={{ color: teal, fontStyle: "italic" }}>{children}</span>;
}

function SectionLabel({ text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: teal, flexShrink: 0 }} />
      <span style={{ fontFamily: f, fontSize: 12, fontWeight: 500, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>{text}</span>
    </div>
  );
}

function SectionDivider() {
  return <div style={{ height: 1, background: `linear-gradient(90deg, ${teal}60, ${teal}08)`, marginBottom: 28 }} />;
}

function VisualPlaceholder({ height = 320, label = "Visual Here", mobile }) {
  return (
    <div style={{
      height: mobile ? Math.min(height, 220) : height,
      borderRadius: mobile ? 12 : 16,
      border: "1px solid rgba(13,154,165,0.25)",
      background: "linear-gradient(135deg, rgba(13,154,165,0.08) 0%, rgba(8,69,94,0.12) 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "rgba(154,241,152,0.5)", fontSize: mobile ? 12 : 14,
      fontFamily: f, letterSpacing: 2, textTransform: "uppercase",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle at 30% 40%, rgba(13,154,165,0.12) 0%, transparent 60%), radial-gradient(circle at 70% 80%, rgba(154,241,152,0.06) 0%, transparent 50%)",
      }} />
      <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
    </div>
  );
}

function SchedulingImage({ desktopSrc, mobileSrc, alt, mobile }) {
  return (
    <div style={{
      width: "100%",
      borderRadius: mobile ? 16 : 20,
      overflow: "hidden",
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

function BookingFlowCarousel({ mobile }) {
  const [current, setCurrent] = useState(0);
  const steps = [
    { desktop: "/images/base-book-session-desktop.jpeg", mobile: "/images/base-book-session-mobile.jpeg", label: "Book a Session" },
    { desktop: "/images/base-choose-trainer-desktop.jpeg", mobile: "/images/base-choose-trainer-mobile.jpeg", label: "Choose a Trainer" },
    { desktop: "/images/base-pick-date-desktop.jpeg", mobile: "/images/base-pick-date-mobile.jpeg", label: "Pick a Date" },
    { desktop: "/images/base-pick-time-desktop.jpeg", mobile: "/images/base-pick-time-mobile.jpeg", label: "Pick a Time" },
    { desktop: "/images/base-your-info-desktop.jpeg", mobile: "/images/base-your-info-mobile.jpeg", label: "Your Info" },
  ];

  const goTo = (index) => {
    if (index < 0) setCurrent(steps.length - 1);
    else if (index >= steps.length) setCurrent(0);
    else setCurrent(index);
  };

  return (
    <div style={{ marginBottom: 40 }}>
      {/* Image Container */}
      <div style={{
        position: "relative",
        width: "100%",
        maxWidth: mobile ? "100%" : 400,
        margin: "0 auto",
      }}>
        <div style={{
          aspectRatio: mobile ? "4 / 5" : "9 / 16",
          borderRadius: mobile ? 16 : 20,
          overflow: "hidden",
          background: "#0a1a24",
        }}>
          <img
            src={mobile ? steps[current].mobile : steps[current].desktop}
            alt={steps[current].label}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "opacity 0.3s ease",
            }}
          />
        </div>
      </div>

      {/* Label */}
      <p style={{
        fontFamily: f,
        fontSize: mobile ? 14 : 16,
        fontWeight: 500,
        color: "#fff",
        textAlign: "center",
        margin: "16px 0 0 0",
      }}>{steps[current].label}</p>

      {/* Navigation */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        marginTop: 16,
      }}>
        {/* Left Arrow */}
        <button
          onClick={() => goTo(current - 1)}
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.05)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
          }}
          aria-label="Previous step"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Dots */}
        <div style={{ display: "flex", gap: 8 }}>
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: current === i ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: current === i ? teal : "rgba(255,255,255,0.2)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }}
              aria-label={`Go to ${steps[i].label}`}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => goTo(current + 1)}
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.05)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
          }}
          aria-label="Next step"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

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

function FeatureCard({ title, body, mobile, mockup }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: mobile ? 12 : 16,
      padding: mobile ? "20px" : "28px",
      display: "flex",
      flexDirection: "column",
    }}>
      <h4 style={{
        fontFamily: f,
        fontSize: mobile ? 15 : 17,
        fontWeight: 600,
        color: "#fff",
        margin: "0 0 10px 0",
      }}>{title}</h4>
      <p style={{
        fontFamily: f,
        fontSize: mobile ? 13 : 14,
        lineHeight: 1.7,
        color: "rgba(255,255,255,0.55)",
        margin: 0,
        marginBottom: mockup ? 16 : 0,
      }}>{body}</p>
      {mockup}
    </div>
  );
}

function BookingPageMockup() {
  return (
    <div style={{ background: "rgba(8, 20, 38, 0.7)", border: "1px solid rgba(13, 154, 165, 0.12)", borderRadius: 10, padding: 12, marginTop: "auto" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg, #0d9aa5, #9af198)" }} />
          <span style={{ fontFamily: f, fontSize: 11, fontWeight: 600, color: "#fff" }}>Coach Alex</span>
        </div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {["9:00 AM", "10:30 AM", "2:00 PM"].map((time, i) => (
            <div key={i} style={{ padding: "5px 8px", borderRadius: 5, background: i === 1 ? "#0d9aa5" : "rgba(255,255,255,0.06)", fontSize: 10, fontFamily: f, color: i === 1 ? "#fff" : "rgba(255,255,255,0.6)", fontWeight: 500 }}>{time}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AvailabilityMockup() {
  const days = ["M", "T", "W", "T", "F"];
  return (
    <div style={{ background: "rgba(8, 20, 38, 0.7)", border: "1px solid rgba(13, 154, 165, 0.12)", borderRadius: 10, padding: 12, marginTop: "auto" }}>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        {days.map((day, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <span style={{ fontSize: 9, fontFamily: f, color: "rgba(255,255,255,0.4)" }}>{day}</span>
            <div style={{ width: 20, height: 26, borderRadius: 3, background: [0, 2, 4].includes(i) ? "rgba(13, 154, 165, 0.3)" : "rgba(255,255,255,0.06)", border: [0, 2, 4].includes(i) ? "1px solid rgba(13, 154, 165, 0.5)" : "1px solid transparent" }} />
          </div>
        ))}
        <div style={{ marginLeft: 6, display: "flex", alignItems: "center", padding: "3px 6px", borderRadius: 3, background: "rgba(13, 154, 165, 0.15)" }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0d9aa5" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
          <span style={{ fontSize: 9, fontFamily: f, color: "#0d9aa5", marginLeft: 3 }}>Synced</span>
        </div>
      </div>
    </div>
  );
}

function RoundRobinMockup() {
  return (
    <div style={{ background: "rgba(8, 20, 38, 0.7)", border: "1px solid rgba(13, 154, 165, 0.12)", borderRadius: 10, padding: 12, marginTop: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#9af198" }} />
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#0d9aa5" }} />
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.3)" }} />
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        <div style={{ display: "flex" }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ width: 20, height: 20, borderRadius: "50%", background: ["#0d9aa5", "#9af198", "#f0f4f8"][i], border: "2px solid #061c27", marginLeft: i > 0 ? -6 : 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 8, fontWeight: 600, color: i === 2 ? "#061c27" : "#fff" }}>{["A", "B", "C"][i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PaymentMockup() {
  return (
    <div style={{ background: "rgba(8, 20, 38, 0.7)", border: "1px solid rgba(13, 154, 165, 0.12)", borderRadius: 10, padding: 12, marginTop: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 28, height: 18, borderRadius: 3, background: "linear-gradient(135deg, #635bff, #a259ff)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 7, fontWeight: 700, color: "#fff" }}>STRIPE</span>
          </div>
          <span style={{ fontSize: 10, fontFamily: f, color: "rgba(255,255,255,0.6)" }}>•••• 4242</span>
        </div>
        <div style={{ padding: "3px 8px", borderRadius: 3, background: "rgba(154, 241, 152, 0.15)", display: "flex", alignItems: "center", gap: 3 }}>
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#9af198" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
          <span style={{ fontSize: 9, fontFamily: f, color: "#9af198", fontWeight: 500 }}>Paid</span>
        </div>
      </div>
    </div>
  );
}

function ReminderMockup() {
  return (
    <div style={{ background: "rgba(8, 20, 38, 0.7)", border: "1px solid rgba(13, 154, 165, 0.12)", borderRadius: 10, padding: 12, marginTop: "auto" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {[{ label: "Confirmation", time: "Instant", active: true }, { label: "Reminder", time: "24h before", active: true }, { label: "Follow-up", time: "After", active: false }].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 12, height: 12, borderRadius: 2, background: item.active ? "#0d9aa5" : "transparent", border: item.active ? "none" : "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {item.active && <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>}
              </div>
              <span style={{ fontSize: 9, fontFamily: f, color: item.active ? "#fff" : "rgba(255,255,255,0.4)" }}>{item.label}</span>
            </div>
            <span style={{ fontSize: 8, fontFamily: f, color: "rgba(255,255,255,0.35)" }}>{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportMockup() {
  const bars = [65, 80, 45, 90, 70];
  return (
    <div style={{ background: "rgba(8, 20, 38, 0.7)", border: "1px solid rgba(13, 154, 165, 0.12)", borderRadius: 10, padding: 12, marginTop: "auto" }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 36 }}>
        {bars.map((h, i) => (
          <div key={i} style={{ width: 14, height: `${h}%`, borderRadius: 2, background: i === 3 ? "#9af198" : "rgba(13, 154, 165, 0.5)" }} />
        ))}
        <div style={{ marginLeft: 6, display: "flex", flexDirection: "column", gap: 1 }}>
          <span style={{ fontSize: 12, fontFamily: f, fontWeight: 600, color: "#9af198" }}>92%</span>
          <span style={{ fontSize: 8, fontFamily: f, color: "rgba(255,255,255,0.4)" }}>Utilization</span>
        </div>
      </div>
    </div>
  );
}

export default function AIPoweredScheduling() {
  const { mobile, tablet } = useBreakpoint();
  const px = mobile ? 20 : tablet ? 40 : 64;
  const sectionPad = mobile ? "56px 0" : "80px 0";

  const baseFeatures = [
    { title: "Self-serve booking pages", body: "Every trainer gets their own branded booking page. Members pick a session type, choose a time, and confirm. Done.", mockup: <BookingPageMockup /> },
    { title: "Real-time availability", body: "Syncs with trainer calendars so members only see open slots. No double-booking. No manual updates.", mockup: <AvailabilityMockup /> },
    { title: "Round-robin distribution", body: "New members or unassigned sessions get routed to available trainers automatically. Balance workloads without micromanaging the schedule.", mockup: <RoundRobinMockup /> },
    { title: "Integrated payments", body: "Powered by Stripe. Members pay when they book. Packages, single sessions, memberships — all handled. Reduces no-shows and simplifies your billing.", mockup: <PaymentMockup /> },
    { title: "Automated reminders", body: "Confirmation emails, session reminders, and post-session follow-ups go out automatically. No one on your team has to remember to send them.", mockup: <ReminderMockup /> },
    { title: "Weekly reports", body: "A recurring summary of bookings, utilization, no-show rates, and revenue by trainer. Delivered to you automatically.", mockup: <ReportMockup /> },
  ];

  return (
    <>
      <div style={{
        background: "#061c27",
        minHeight: "100vh",
        paddingLeft: px,
        paddingRight: px,
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
            <span style={{ fontFamily: f, fontSize: 12, fontWeight: 500, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>AI-Powered Scheduling</span>
          </div>

          <h1 style={{
            fontFamily: serif,
            fontSize: mobile ? 36 : tablet ? 52 : 64,
            fontWeight: 400, lineHeight: 1.08, color: "#fff",
            margin: "0 0 28px 0",
          }}>
            Self-serve scheduling that <Accent>runs your book</Accent> for you
          </h1>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 20, lineHeight: 1.7,
            color: "rgba(255,255,255,0.6)", maxWidth: 720, margin: "0 0 24px 0",
          }}>
            Scheduling should be the simplest part of running a fitness business. But for most gyms, it&apos;s still a mess — back-and-forth texts, double bookings, no-shows, and staff spending time on the phone that should be spent on the floor.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 20, lineHeight: 1.7,
            color: "rgba(255,255,255,0.6)", maxWidth: 720, margin: "0 0 40px 0",
          }}>
            Milton&apos;s scheduling system eliminates all of it. Members book themselves. Trainers manage their own availability.
          </p>

          <SchedulingImage 
              desktopSrc="/images/hero-scheduling-desktop.jpeg"
              mobileSrc="/images/hero-scheduling-desktop.jpeg"
              alt="Milton AI Scheduling - Book a Session"
              mobile={mobile}
            />

          <div style={{ marginTop: 40 }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ BASE SCHEDULING ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="Base Scheduling" />
          <SectionDivider />

          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : tablet ? 36 : 44,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 20px 0",
          }}>
            Everything you need, <Accent>nothing you don&apos;t</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: "0 0 40px 0",
          }}>
            The base version gives your facility a clean, professional self-serve booking system. Members see real-time trainer availability, book sessions on their own, and pay at the time of booking. No phone calls. No waiting for a callback. No forgotten appointments.
          </p>

          {/* Booking Flow Carousel */}
          <BookingFlowCarousel mobile={mobile} />

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ INTELLIGENT SCHEDULING ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="Intelligent Scheduling" />
          <SectionDivider />

          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : tablet ? 36 : 44,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 20px 0",
          }}>
            With <Accent>Milton AI</Accent> on top
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: "0 0 20px 0",
          }}>
            Everything in the base version, plus Milton AI actively working the schedule on behalf of your members, your coaches, and you.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: "0 0 40px 0",
          }}>
            This isn&apos;t just a booking system that waits for someone to click a link. It&apos;s a scheduling agent that reaches out, follows up, re-engages, and optimizes — all on its own.
          </p>

          {/* For Members */}
          <div style={{ marginBottom: 48 }}>
            <h3 style={{
              fontFamily: f, fontSize: mobile ? 16 : 18, fontWeight: 600,
              color: mint, margin: "0 0 16px 0",
            }}>For your members</h3>
            <p style={{
              fontFamily: f, fontSize: mobile ? 14 : 16, lineHeight: 1.75,
              color: "rgba(255,255,255,0.6)", margin: "0 0 24px 0",
            }}>
              Milton notices a member hasn&apos;t booked in two weeks and sends a text: &quot;It&apos;s been a minute. Want me to get you on the schedule this week? Here are three times that work with your trainer.&quot; The member replies &quot;Tuesday works&quot; and Milton books it. No link. No portal. Just a conversation.
            </p>
            <SchedulingImage 
              desktopSrc="/images/persona-members-desktop.jpeg"
              mobileSrc="/images/persona-members-mobile.jpeg"
              alt="Member conversation with Milton AI"
              mobile={mobile}
            />
          </div>

          {/* For Coaches */}
          <div style={{ marginBottom: 48 }}>
            <h3 style={{
              fontFamily: f, fontSize: mobile ? 16 : 18, fontWeight: 600,
              color: mint, margin: "0 0 16px 0",
            }}>For your coaches</h3>
            <p style={{
              fontFamily: f, fontSize: mobile ? 14 : 16, lineHeight: 1.75,
              color: "rgba(255,255,255,0.6)", margin: "0 0 24px 0",
            }}>
              Milton sees a trainer has a gap on Thursday afternoon and three clients who haven&apos;t booked this week. It reaches out to those clients on the trainer&apos;s behalf, suggests the open slot, and fills it. The trainer&apos;s schedule gets tighter without them doing a thing.
            </p>
            <SchedulingImage 
              desktopSrc="/images/persona-coaches-desktop.jpeg"
              mobileSrc="/images/persona-coaches-mobile.jpeg"
              alt="Coach schedule optimization"
              mobile={mobile}
            />
          </div>

          {/* For You */}
          <div style={{ marginBottom: 40 }}>
            <h3 style={{
              fontFamily: f, fontSize: mobile ? 16 : 18, fontWeight: 600,
              color: mint, margin: "0 0 16px 0",
            }}>For you</h3>
            <p style={{
              fontFamily: f, fontSize: mobile ? 14 : 16, lineHeight: 1.75,
              color: "rgba(255,255,255,0.6)", margin: "0 0 24px 0",
            }}>
              Milton flags scheduling patterns you&apos;d miss on your own. A trainer who&apos;s consistently underbooked on Fridays. A member who used to come three times a week and is now down to one. A time slot that never fills and could be repurposed. It doesn&apos;t just report — it recommends what to do about it and can act on your direction.
            </p>
            <SchedulingImage 
              desktopSrc="/images/persona-directors-desktop.jpeg"
              mobileSrc="/images/persona-directors-mobile.jpeg"
              alt="Director insights and recommendations"
              mobile={mobile}
            />
          </div>

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ CONNECTED ═══════ */}
        <section style={{ padding: sectionPad }}>
          <SectionLabel text="Connected System" />
          <SectionDivider />

          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : tablet ? 36 : 44,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 20px 0",
          }}>
            Connected to your <Accent>CRM, POS</Accent>, and the rest of Milton
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: "0 0 20px 0",
          }}>
            Scheduling doesn&apos;t live in a silo. Every booking flows into Milton&apos;s Stripe-powered CRM and POS system — so session history, payment status, package balances, and client records are always up to date. No reconciling between systems. No manual data entry.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: "0 0 32px 0",
          }}>
            And because it&apos;s part of the Milton ecosystem, scheduling data also feeds into the Coach Co-Pilot, the Director Co-Pilot, and the Member Co-Pilot. A trainer can see their upcoming sessions alongside client progress data. A fitness director can see team utilization alongside retention trends. The Member Co-Pilot can prompt members to book based on their training plan.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 18, lineHeight: 1.75,
            color: mint, fontWeight: 500, margin: "0 0 32px 0",
          }}>
            Everything connected. Everything in one place.
          </p>

          <SchedulingImage 
            desktopSrc="/images/connected-crm-desktop.jpeg"
            mobileSrc="/images/connected-crm-desktop.jpeg"
            alt="Clients dashboard powered by Stripe"
            mobile={mobile}
          />

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ CLOSING ═══════ */}
        <section style={{ padding: sectionPad }}>
          <div style={{
            background: "rgba(13,154,165,0.06)",
            border: "1px solid rgba(13,154,165,0.2)",
            borderRadius: mobile ? 16 : 24,
            padding: mobile ? "40px 24px" : "56px 48px",
            textAlign: "center",
          }}>
            <h2 style={{
              fontFamily: serif,
              fontSize: mobile ? 26 : tablet ? 34 : 42,
              fontWeight: 400, lineHeight: 1.15, color: "#fff",
              margin: "0 0 20px 0",
            }}>
              Stop losing sessions to <Accent>friction</Accent>
            </h2>

            <p style={{
              fontFamily: f, fontSize: mobile ? 14 : 16, lineHeight: 1.75,
              color: "rgba(255,255,255,0.6)", maxWidth: 600, margin: "0 auto 20px auto",
            }}>
              Every time a member has to call, text, or wait to book — you lose some of them. They meant to reschedule but forgot. They wanted to add a session but didn&apos;t want to bother anyone. They fell off the schedule and nobody noticed until they were gone.
            </p>

            <p style={{
              fontFamily: f, fontSize: mobile ? 14 : 16, lineHeight: 1.75,
              color: "rgba(255,255,255,0.6)", maxWidth: 600, margin: "0 auto 32px auto",
            }}>
              Milton&apos;s scheduling system removes that friction entirely. Members book in seconds. Trainers stay full. Gaps get filled. And with the intelligent version, Milton is actively working to keep your schedule tight and your members engaged — before anyone has to ask.
            </p>

            <div style={{ marginTop: 32 }}>
              <CTAButton mobile={mobile} />
            </div>
          </div>
        </section>

        </div>
      </div>
    </>
  );
}
