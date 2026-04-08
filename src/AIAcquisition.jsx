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
      <span style={{ fontFamily: f, fontSize: 13, color: "rgba(255,255,255,0.3)", letterSpacing: 1 }}>[{label}]</span>
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

function MilestoneItem({ title, body, mobile }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 12,
      padding: mobile ? "20px" : "24px",
    }}>
      <h4 style={{
        fontFamily: f,
        fontSize: mobile ? 15 : 16,
        fontWeight: 600,
        color: mint,
        margin: "0 0 8px 0",
      }}>{title}</h4>
      <p style={{
        fontFamily: f,
        fontSize: mobile ? 14 : 15,
        lineHeight: 1.6,
        color: "rgba(255,255,255,0.6)",
        margin: 0,
      }}>{body}</p>
    </div>
  );
}

export default function AIAcquisition() {
  const { mobile, tablet } = useBreakpoint();
  const px = mobile ? 20 : tablet ? 32 : 40;
  const sectionPad = mobile ? "56px 0" : "80px 0";

  const milestones = [
    { title: "Strength milestones", body: "New PRs, progressive overload achievements, weight milestones on key lifts." },
    { title: "Consistency streaks", body: "Four weeks straight, 50 sessions logged, never missed a Monday." },
    { title: "Nutrition wins", body: "Hit protein targets for a full week, logged every meal for 30 days, improved meal consistency by 40%." },
    { title: "Body composition changes", body: "Body fat down 2%, lean mass up, waist measurement decreasing month over month." },
    { title: "Challenge completions", body: "Finished a 28-day nutrition challenge, completed a training program, hit a goal ahead of schedule." },
    { title: "Anniversary markers", body: "Six months as a member, one year of training, 100th session completed." },
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
            <span style={{ fontFamily: f, fontSize: 12, fontWeight: 500, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>AI Acquisition Engine</span>
          </div>

          <h1 style={{
            fontFamily: serif,
            fontSize: mobile ? 36 : tablet ? 52 : 64,
            fontWeight: 400, lineHeight: 1.08, color: "#fff",
            margin: "0 0 28px 0",
          }}>
            Turn every win into your <Accent>next member</Accent>
          </h1>

          <p style={{
            fontFamily: f, fontSize: mobile ? 16 : 20, lineHeight: 1.7,
            color: "rgba(255,255,255,0.6)", maxWidth: 720, margin: "0 0 24px 0",
          }}>
            Your best marketing doesn&apos;t come from ads. It comes from a member posting their progress on Instagram and their friend asking, &quot;Where do you train?&quot; That moment — someone sharing a real result with real people who trust them — is worth more than any campaign you&apos;ll ever run.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.7,
            color: "rgba(255,255,255,0.55)", maxWidth: 720, margin: "0 0 40px 0",
          }}>
            The problem is it almost never happens. Not because members aren&apos;t making progress. They are. But nobody&apos;s packaging that progress into something shareable. Nobody&apos;s making it easy. Nobody&apos;s giving them something they&apos;re proud to post. Milton&apos;s AI Acquisition Engine changes that. It makes every win visible, every milestone shareable, and every member a walking referral machine — with a single tap.
          </p>

          <VisualPlaceholder height={mobile ? 280 : 480} label="Hero Image" mobile={mobile} />

          <div style={{ marginTop: 40 }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ SMALL WINS ═══════ */}
        <section style={{ padding: sectionPad, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : 40,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Small wins, made visual — <Accent>automatically</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: "0 0 20px 0",
          }}>
            Most members don&apos;t realize how much progress they&apos;re making. A 10lb increase on their bench press. A consistent four-week training streak. Hitting their protein goal 25 out of 30 days. Losing two inches off their waist since January. These things happen quietly, buried in data that nobody ever surfaces.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: "0 0 20px 0",
          }}>
            Milton surfaces all of it. The AI Acquisition Engine monitors member progress across workouts, nutrition, body composition, consistency, and milestones — and automatically generates visual progress cards when something worth celebrating happens. Clean, branded, designed graphics that make the win feel real.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: 0,
          }}>
            A member finishes their session and gets a notification: &quot;You just hit a new squat PR — 185lbs. That&apos;s a 40lb increase since you started.&quot; Attached is a sharp, branded graphic with their name, the milestone, and your facility&apos;s logo. They didn&apos;t have to ask for it. They didn&apos;t have to build it. It just appeared.
          </p>

          <VisualPlaceholder height={350} mobile={mobile} />

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ ONE TAP TO SHARE ═══════ */}
        <section style={{ padding: sectionPad, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : 40,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            One tap to share — and your <Accent>brand goes with it</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: "0 0 20px 0",
          }}>
            Here&apos;s where the magic happens. Every progress card Milton generates is designed to be shared. One button. Post it to Instagram, text it to a friend, add it to their story, send it to their family group chat. Whatever they want to do with it — your brand is on it.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: "0 0 20px 0",
          }}>
            The member is celebrating their win. Their network sees it. And attached to every celebration is your gym&apos;s name, your logo, and your brand — showing up organically in front of people who trust the person posting it.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: mint, fontWeight: 500, margin: 0,
          }}>
            No hashtag campaigns. No &quot;tag us for a chance to win.&quot; No begging for user-generated content. Just real results, made beautiful, shared naturally by people who are genuinely proud of what they&apos;ve accomplished. That&apos;s the most powerful marketing that exists.
          </p>

          <VisualPlaceholder height={350} mobile={mobile} />
        </section>

        {/* ═══════ EVERY SHARE IS A REFERRAL ═══════ */}
        <section style={{ padding: sectionPad, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : 40,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Every share is a <Accent>referral waiting to happen</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: "0 0 20px 0",
          }}>
            When someone posts a progress card, their friends and family notice. They ask questions. &quot;What app is that?&quot; &quot;Where do you work out?&quot; &quot;How did you lose that much?&quot; Every one of those conversations is a warm referral — and they started because Milton made it effortless for your member to share.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: "0 0 20px 0",
          }}>
            Milton can take it a step further. Embedded in every shared progress card is a path back to your facility — a link to book an intro session, a landing page for new members, or a special referral offer. The member shares their win. Their friend taps. And now they&apos;re on your calendar.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: mint, fontWeight: 500, margin: 0,
          }}>
            No referral program to manage. No tracking spreadsheets. No awkward &quot;hey, can you tell your friends about us?&quot; conversations. The results do the talking. Milton just makes sure they get heard.
          </p>

          <VisualPlaceholder height={350} mobile={mobile} />

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ MILESTONE TYPES ═══════ */}
        <section style={{ padding: sectionPad, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : 40,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Milestone types that <Accent>drive shares</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: "0 0 32px 0",
          }}>
            Milton tracks and generates progress cards across every dimension of the member journey — not just the big transformations, but the small wins that keep people motivated and sharing along the way.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
            gap: mobile ? 16 : 20,
          }}>
            {milestones.map((milestone, i) => (
              <MilestoneItem key={i} title={milestone.title} body={milestone.body} mobile={mobile} />
            ))}
          </div>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: mint, fontWeight: 500, margin: "32px 0 0 0", textAlign: "center",
          }}>
            Each one gets its own branded visual. Each one is shareable. Each one puts your facility in front of new eyes.
          </p>

          <VisualPlaceholder height={350} mobile={mobile} />
        </section>

        {/* ═══════ YOUR BRAND ON EVERY SHARE ═══════ */}
        <section style={{ padding: sectionPad, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : 40,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Your brand on <Accent>every share</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: "0 0 20px 0",
          }}>
            Every progress card is generated in your brand — your colors, your logo, your facility name. When a member shares their win, it doesn&apos;t look like it came from a generic app. It looks like it came from your gym. Because it did.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: mint, fontWeight: 500, margin: 0,
          }}>
            This is branded content at scale, created automatically, distributed by the people who love what you do. No content calendar. No designer. No social media manager. Just real results, real members, and real reach — powered by AI.
          </p>

          <VisualPlaceholder height={350} mobile={mobile} />

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        {/* ═══════ RESULTS THAT MARKET THEMSELVES ═══════ */}
        <section style={{ padding: sectionPad, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{
            fontFamily: serif,
            fontSize: mobile ? 28 : 40,
            fontWeight: 400, lineHeight: 1.15, color: "#fff",
            margin: "0 0 24px 0",
          }}>
            Results that <Accent>market themselves</Accent>
          </h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)", margin: "0 0 20px 0",
          }}>
            The best gyms in the world don&apos;t need to shout about how good they are. Their members do it for them. Milton&apos;s AI Acquisition Engine just makes that happen faster, more often, and at a scale that turns organic sharing into a genuine growth engine.
          </p>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.75,
            color: mint, fontWeight: 500, margin: 0,
          }}>
            Every win celebrated is a story told. Every story told reaches people who trust the person telling it. And every one of those people is one tap away from becoming your next member.
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
            <h2 style={{
              fontFamily: serif,
              fontSize: mobile ? 26 : 36,
              fontWeight: 400, lineHeight: 1.15, color: "#fff",
              margin: "0 0 16px 0",
            }}>
              Ready to turn wins into members?
            </h2>
            <p style={{
              fontFamily: f, fontSize: mobile ? 15 : 17, lineHeight: 1.7,
              color: "rgba(255,255,255,0.6)", maxWidth: 540, margin: "0 auto 28px auto",
            }}>
              Book an AI Consultation and see how the AI Acquisition Engine can transform your members&apos; results into your strongest marketing channel.
            </p>
            <CTAButton mobile={mobile} />
          </div>
        </section>

        </div>
      </div>
    </>
  );
}
