import { useState, useEffect, useRef } from "react";

const MOVEMENTS = [
  {
    name: "Goblet Squat",
    pose: "Performing a goblet squat holding a dumbbell at chest height, mid-descent with thighs at parallel.",
    angle: "Three-quarter side profile view.",
    cues: [["Chest Up","upper chest"],["Elbows Inside Knees","elbow position"],["Weight In Heels","feet"],["Neutral Spine","lower back"]]
  },
  {
    name: "Romanian Deadlift",
    pose: "Performing a Romanian deadlift with a barbell, hip hinge position with slight knee bend, bar at mid-shin level.",
    angle: "Side profile view.",
    cues: [["Hinge At Hips","hip crease"],["Soft Knee Bend","knees"],["Bar Close To Body","barbell path"],["Neutral Spine","back"]]
  },
  {
    name: "Push-Up",
    pose: "At the bottom of a push-up, arms at 45 degrees from torso, chest near the floor.",
    angle: "Side profile view.",
    cues: [["Core Tight","midsection"],["Elbows 45 Degrees","elbow angle"],["Chin Tucked","head position"],["Straight Body Line","spine"]]
  },
  {
    name: "Kettlebell Swing",
    pose: "At the top of a kettlebell swing, arms fully extended, kettlebell at chest height, hips fully locked out.",
    angle: "Three-quarter front view.",
    cues: [["Drive Hips","hip crease"],["Arms Relaxed","arms"],["Stand Tall At Top","upright torso"],["Eyes Forward","head"]],
    extraAvoid: ", motion blur on face"
  },
  {
    name: "Dumbbell Row",
    pose: "Performing a single-arm dumbbell row with left knee and hand on a flat bench, right arm pulling a dumbbell with elbow driving high past torso.",
    angle: "Three-quarter rear view.",
    cues: [["Elbow Past Torso","elbow"],["Squeeze Shoulder Blade","upper back"],["Neutral Spine","back"],["Core Braced","midsection"]]
  },
  {
    name: "Overhead Press",
    pose: "Pressing dumbbells overhead at full lockout, arms extended, standing upright.",
    angle: "Three-quarter front view.",
    cues: [["Core Tight","midsection"],["Wrists Stacked","wrist alignment"],["Full Lockout","extended arms"],["Ribs Down","rib cage"]]
  },
  {
    name: "Walking Lunge",
    pose: "Mid-stride in a walking lunge holding dumbbells at sides, front knee bent at 90 degrees, back knee approaching the floor.",
    angle: "Side profile view.",
    cues: [["Knee Over Ankle","front knee"],["Back Knee To Floor","rear knee"],["Chest Tall","upper chest"],["Core Braced","midsection"]]
  },
  {
    name: "Plank",
    pose: "Holding a forearm plank with a perfectly straight body line from head to heels.",
    angle: "Side profile view, low angle shooting slightly upward.",
    cues: [["Neutral Spine","back"],["Core Tight","midsection"],["Glutes Squeezed","glutes"],["Shoulders Over Elbows","shoulder-elbow alignment"]]
  },
  {
    name: "Cable Face Pull",
    pose: "Performing a cable face pull at peak contraction, elbows high and wide, hands pulled to either side of face, rope attachment visible.",
    angle: "Front view.",
    cues: [["Elbows High","elbows"],["Pull To Ears","hand position"],["Squeeze Rear Delts","upper back"],["Chest Proud","chest"]]
  },
  {
    name: "Hip Thrust",
    pose: "At the top of a barbell hip thrust, upper back resting against a padded bench, hips at full extension, barbell across hip crease.",
    angle: "Side profile view.",
    cues: [["Chin Tucked","head position"],["Drive Through Heels","feet"],["Full Hip Extension","hips"],["Ribs Down","rib cage"]]
  }
];

const STYLES = [
  {
    name: "Studio Dark",
    tag: "Peloton / Apple Fitness+ / Ladder",
    emoji: "🎬",
    color: "#0d9aa5",
    env: "Pure black background. Dramatic Rembrandt side lighting with warm highlights and matte skin texture.",
    lens: "35mm f/1.4",
    annoFont: "clean white handwritten font",
    avoid: "distorted hands, extra fingers, plastic skin, shirtless, barefoot",
    desc: "Pure black background with dramatic side lighting. Premium, cinematic. Best for hero images, app screenshots, website headers."
  },
  {
    name: "Bright & Clean",
    tag: "SWEAT / Kayla Itsines / Tone & Sculpt",
    emoji: "☀️",
    color: "#9af198",
    env: "Modern sunlit studio with white walls and light wood floors. Soft natural window light, airy and warm.",
    lens: "85mm f/2.0",
    annoFont: "clean dark charcoal handwritten font",
    avoid: "distorted hands, extra fingers, plastic skin, shirtless, barefoot, harsh shadows",
    desc: "White or light background with soft natural light. Airy, aspirational, approachable. Best for Instagram, client materials, welcoming brand feel."
  },
  {
    name: "Gritty Gym",
    tag: "Nike Training Club / Gymshark / CrossFit",
    emoji: "🏋️",
    color: "#e8a849",
    env: "Dimly lit industrial gym with exposed brick walls and worn metal equipment. High contrast moody lighting with warm tungsten tones, gritty atmosphere.",
    lens: "23mm f/1.4, slight film grain",
    annoFont: "clean white handwritten font",
    avoid: "distorted hands, extra fingers, plastic skin, shirtless, barefoot, clean or polished look",
    desc: "Industrial setting with exposed brick, high-contrast moody lighting. Raw, authentic, intense. Best for hardcore audiences, Reels/TikTok content."
  },
  {
    name: "Clinical",
    tag: "ACE / NASM / ExRx / Physical Therapy",
    emoji: "📋",
    color: "#7eb8c9",
    env: "Plain white seamless background. Flat even studio lighting with no harsh shadows, full body visible with clear joint angles.",
    lens: "50mm f/4",
    annoFont: "clean black sans-serif font with thin black arrows",
    avoid: "distorted hands, extra fingers, plastic skin, shirtless, barefoot, dramatic shadows",
    desc: "Plain white background, flat even lighting. Pure form reference. Best for trainer education, exercise libraries, certification materials."
  }
];

const CLOTHING = "Wearing a dark grey athletic t-shirt, black shorts, and dark athletic shoes.";

function buildPrompt(movement, style, annotated) {
  const cueStr = movement.cues.map(([t, p]) => `'${t}' arrow pointing to ${p}`).join(", ");
  const extraAvoid = movement.extraAvoid || "";
  const annoLine = annotated
    ? ` Include ${style.name === "Clinical" ? "clean" : "handwritten-style"} coaching annotation arrows and text labels pointing to key form cues: ${cueStr}. Annotations in ${style.annoFont}.`
    : "";
  return `Full body professional fitness photography of the subject from the attached reference image, strictly maintaining exact facial likeness. ${CLOTHING} ${movement.pose} ${movement.angle} ${style.env}${annoLine} Shot at ${style.lens}. 1080x1080, 1:1 aspect ratio. Avoid: ${style.avoid}${extraAvoid}.`;
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} style={{
      background: copied ? "#9af198" : "rgba(13,154,165,0.15)",
      color: copied ? "#060d13" : "#0d9aa5",
      border: "1px solid " + (copied ? "#9af198" : "rgba(13,154,165,0.3)"),
      borderRadius: 6, padding: "6px 14px", fontSize: 12, fontWeight: 600,
      cursor: "pointer", transition: "all 0.2s", letterSpacing: "0.03em",
      fontFamily: "'DM Sans', sans-serif"
    }}>
      {copied ? "✓ Copied" : "Copy Prompt"}
    </button>
  );
}

function PromptCard({ movement, style, annotated }) {
  const prompt = buildPrompt(movement, style, annotated);
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 10, padding: "16px 18px", marginBottom: 12
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            background: style.color + "22", color: style.color,
            fontSize: 11, fontWeight: 600, padding: "3px 10px",
            borderRadius: 20, letterSpacing: "0.03em",
            fontFamily: "'DM Sans', sans-serif"
          }}>{style.name}</span>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>
            {annotated ? "With Coaching Cues" : "Clean"}
          </span>
        </div>
        <CopyButton text={prompt} />
      </div>
      <p style={{
        fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
        fontSize: 11.5, lineHeight: 1.65, color: "rgba(255,255,255,0.55)",
        margin: 0, wordBreak: "break-word"
      }}>{prompt}</p>
    </div>
  );
}

function Section({ id, children, style: s }) {
  return (
    <section id={id} style={{ padding: "80px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", ...s }}>
      {children}
    </section>
  );
}

function StepCard({ num, title, desc }) {
  return (
    <div style={{
      display: "flex", gap: 20, marginBottom: 32, alignItems: "flex-start"
    }}>
      <div style={{
        minWidth: 48, height: 48, borderRadius: "50%",
        background: "linear-gradient(135deg, #0d9aa5, #126b80)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 22, fontWeight: 700, color: "#fff"
      }}>{num}</div>
      <div>
        <h4 style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700,
          color: "#fff", margin: "0 0 6px"
        }}>{title}</h4>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.7,
          color: "rgba(255,255,255,0.6)", margin: 0
        }}>{desc}</p>
      </div>
    </div>
  );
}

function StyleCard({ style }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 12, padding: 24, flex: "1 1 280px", minWidth: 260
    }}>
      <div style={{ fontSize: 28, marginBottom: 8 }}>{style.emoji}</div>
      <h4 style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 17, fontWeight: 700,
        color: style.color, margin: "0 0 4px"
      }}>{style.name}</h4>
      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)",
        margin: "0 0 12px", fontStyle: "italic"
      }}>{style.tag}</p>
      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, lineHeight: 1.65,
        color: "rgba(255,255,255,0.6)", margin: 0
      }}>{style.desc}</p>
    </div>
  );
}

export default function ExerciseLibrary() {
  const [activeMovement, setActiveMovement] = useState(0);
  const [activeStyle, setActiveStyle] = useState(null);
  const [showAnnotated, setShowAnnotated] = useState(null);
  const [visibleSections, setVisibleSections] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, e.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll("section[id]").forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const w = { maxWidth: 720, margin: "0 auto", padding: "0 24px" };

  return (
    <div style={{
      background: "#060d13", minHeight: "100vh", color: "#fff",
      fontFamily: "'DM Sans', sans-serif"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&family=Cormorant+Garamond:wght@400;600;700&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet" />

      {/* ─── HERO ─── */}
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        justifyContent: "center", position: "relative", overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", top: "-20%", right: "-10%",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(13,154,165,0.08) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute", bottom: "-10%", left: "-10%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(154,241,152,0.05) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />
        <div style={{ textAlign: "center", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-block", padding: "6px 16px", borderRadius: 20,
            background: "rgba(13,154,165,0.1)", border: "1px solid rgba(13,154,165,0.2)",
            fontSize: 12, fontWeight: 600, color: "#0d9aa5", letterSpacing: "0.08em",
            textTransform: "uppercase", marginBottom: 28
          }}>Free Guide — 80 Prompts</div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(36px, 7vw, 64px)", fontWeight: 700,
            lineHeight: 1.1, margin: "0 0 20px",
            background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>The AI Movement<br />Library Guide</h1>
          <p style={{
            fontSize: "clamp(15px, 2.5vw, 18px)", lineHeight: 1.6,
            color: "rgba(255,255,255,0.5)", maxWidth: 480, margin: "0 auto 12px"
          }}>
            Create your own branded exercise content with AI.<br />
            No studio. No photographer. No budget.
          </p>
          <p style={{
            fontSize: 14, color: "rgba(255,255,255,0.35)", marginBottom: 40
          }}>
            10 Movements · 4 Visual Styles · Clean + Coaching Cue Versions
          </p>
          <a href="#start" style={{
            display: "inline-block", padding: "14px 36px", borderRadius: 8,
            background: "linear-gradient(135deg, #0d9aa5, #126b80)",
            color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none",
            letterSpacing: "0.03em", transition: "transform 0.2s, box-shadow 0.2s",
            boxShadow: "0 4px 24px rgba(13,154,165,0.3)"
          }}>Get the Prompts ↓</a>
          <p style={{
            fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 48,
            letterSpacing: "0.06em", textTransform: "uppercase"
          }}>by Milton AI · getmilton.com</p>
        </div>
      </div>

      {/* ─── WHAT IS THIS ─── */}
      <Section id="start">
        <div style={w}>
          <p style={{
            fontSize: 11, fontWeight: 600, color: "#0d9aa5", letterSpacing: "0.1em",
            textTransform: "uppercase", marginBottom: 12
          }}>What Is This Guide?</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 32, fontWeight: 700, lineHeight: 1.2, marginBottom: 20
          }}>80 ready-to-use AI prompts that generate professional exercise images featuring <span style={{ color: "#0d9aa5" }}>you and your actual trainers</span> as the models.</h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.55)", marginBottom: 16 }}>
            Professional exercise photography has always been expensive and time-consuming. A single shoot with a photographer and studio can eat an entire quarter's content budget.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.55)", marginBottom: 16 }}>
            This guide gives you something different. Every prompt has been tested and refined to produce consistent, high-quality results across four visual styles that match what you see from the biggest fitness brands in the world.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.55)" }}>
            You get <strong style={{ color: "#fff" }}>clean versions</strong> (just the exercise) and <strong style={{ color: "#fff" }}>annotated versions</strong> (with coaching cues, arrows, and form callouts) for every single movement.
          </p>
        </div>
      </Section>

      {/* ─── WHAT YOU NEED ─── */}
      <Section id="setup">
        <div style={w}>
          <p style={{
            fontSize: 11, fontWeight: 600, color: "#0d9aa5", letterSpacing: "0.1em",
            textTransform: "uppercase", marginBottom: 12
          }}>Setup — 5 Minutes</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 32, fontWeight: 700, lineHeight: 1.2, marginBottom: 36
          }}>What You'll Need</h2>

          {[
            { t: "A Google Account (Free)", d: "The AI tool we use is called Nano Banana. It's built into Google's Gemini. If you have a Gmail account, you already have access. Go to gemini.google.com and sign in." },
            { t: "1–3 Reference Photos of Your Trainer", d: "Good lighting (face a window or go outside). Clear face (no sunglasses, no hat). Waist-up minimum so the AI can see your build. Simple background." },
            { t: "This Guide", d: "Keep it open while you work in Gemini. Copy a prompt, paste it, upload your photo, hit generate. That's it." }
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", gap: 16, marginBottom: 28, alignItems: "flex-start"
            }}>
              <div style={{
                minWidth: 32, height: 32, borderRadius: 8,
                background: "rgba(13,154,165,0.1)", border: "1px solid rgba(13,154,165,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700, color: "#0d9aa5"
              }}>{String.fromCharCode(65 + i)}</div>
              <div>
                <h4 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 4px", color: "#fff" }}>{item.t}</h4>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.55)", margin: 0 }}>{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── STEP BY STEP ─── */}
      <Section id="steps">
        <div style={w}>
          <p style={{
            fontSize: 11, fontWeight: 600, color: "#0d9aa5", letterSpacing: "0.1em",
            textTransform: "uppercase", marginBottom: 12
          }}>Your First Image</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 32, fontWeight: 700, lineHeight: 1.2, marginBottom: 36
          }}>Step-by-Step</h2>
          {[
            ["Go to gemini.google.com", "Sign in with your Google account. You'll see a chat interface. This is where you'll paste prompts and upload reference photos."],
            ["Upload your reference photo(s)", "Click the image icon in the chat box. Select 1–3 photos of yourself or your trainer. Upload them before pasting the prompt."],
            ["Copy a prompt from this guide", "Pick any prompt below. For your first try, start with the Goblet Squat in Studio Dark style. Copy the entire prompt text."],
            ["Paste and hit Enter", "Paste into the Gemini chat box right after your uploaded photos. Don't change anything yet. Just paste and send."],
            ["Wait 10–30 seconds", "If you like the result, download it. If something is off, tell it in plain English: \"Keep everything but zoom out more\" or \"Add shoes.\" It will edit without starting over."],
            ["Repeat", "Once you've nailed your first image, the rest is copy, paste, generate. Most people find a rhythm after 3–5 images."]
          ].map(([t, d], i) => <StepCard key={i} num={i + 1} title={t} desc={d} />)}
        </div>
      </Section>

      {/* ─── 4 STYLES ─── */}
      <Section id="styles">
        <div style={w}>
          <p style={{
            fontSize: 11, fontWeight: 600, color: "#0d9aa5", letterSpacing: "0.1em",
            textTransform: "uppercase", marginBottom: 12
          }}>Visual Styles</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 32, fontWeight: 700, lineHeight: 1.2, marginBottom: 36
          }}>4 Styles. Pick Your Brand.</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {STYLES.map((s, i) => <StyleCard key={i} style={s} />)}
          </div>
        </div>
      </Section>

      {/* ─── TIPS ─── */}
      <Section id="tips">
        <div style={w}>
          <p style={{
            fontSize: 11, fontWeight: 600, color: "#0d9aa5", letterSpacing: "0.1em",
            textTransform: "uppercase", marginBottom: 12
          }}>Pro Tips</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 32, fontWeight: 700, lineHeight: 1.2, marginBottom: 36
          }}>Best Results</h2>
          {[
            ["Upload 2–3 reference photos, not just 1", "Multiple angles mean more consistent facial likeness."],
            ["Don't describe your trainer's body", "The AI reads appearance from the photo. Text descriptions confuse it."],
            ["Always include the clothing line", "Without it, the AI defaults to shirtless and barefoot."],
            ["Use conversational editing", "If 80% right, just say \"zoom out\" or \"warmer lighting.\" Don't start over."],
            ["Start with Studio Dark", "Black backgrounds produce the most consistent results."],
            ["Batch by movement, not by style", "Do all 8 versions of goblet squat before moving to RDL."],
            ["Save favorites as seed images", "Upload a great result as reference for future generations."]
          ].map(([t, d], i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 4px", color: "#fff" }}>{t}</h4>
              <p style={{ fontSize: 13.5, lineHeight: 1.65, color: "rgba(255,255,255,0.5)", margin: 0 }}>{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── THE PROMPTS ─── */}
      <Section id="prompts" style={{ borderBottom: "none" }}>
        <div style={w}>
          <p style={{
            fontSize: 11, fontWeight: 600, color: "#0d9aa5", letterSpacing: "0.1em",
            textTransform: "uppercase", marginBottom: 12
          }}>The Prompts</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 32, fontWeight: 700, lineHeight: 1.2, marginBottom: 8
          }}>10 Movements × 4 Styles × 2 Versions</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", marginBottom: 32 }}>
            Copy the prompt. Upload your photo to Gemini. Paste. Generate.
          </p>

          {/* Movement selector */}
          <div style={{
            display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32
          }}>
            {MOVEMENTS.map((m, i) => (
              <button key={i} onClick={() => { setActiveMovement(i); setActiveStyle(null); setShowAnnotated(null); }} style={{
                padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                cursor: "pointer", transition: "all 0.2s",
                fontFamily: "'DM Sans', sans-serif",
                background: activeMovement === i ? "linear-gradient(135deg, #0d9aa5, #126b80)" : "rgba(255,255,255,0.04)",
                color: activeMovement === i ? "#fff" : "rgba(255,255,255,0.5)",
                border: activeMovement === i ? "1px solid #0d9aa5" : "1px solid rgba(255,255,255,0.08)"
              }}>{m.name}</button>
            ))}
          </div>

          {/* Active movement */}
          {(() => {
            const m = MOVEMENTS[activeMovement];
            return (
              <div>
                <div style={{
                  display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6
                }}>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 14, color: "rgba(255,255,255,0.3)"
                  }}>Movement {activeMovement + 1} of 10</span>
                </div>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 28, fontWeight: 700, margin: "0 0 12px", color: "#0d9aa5"
                }}>{m.name}</h3>
                <div style={{
                  display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28
                }}>
                  {m.cues.map(([c], j) => (
                    <span key={j} style={{
                      padding: "4px 12px", borderRadius: 6,
                      background: "rgba(154,241,152,0.08)",
                      border: "1px solid rgba(154,241,152,0.15)",
                      fontSize: 12, color: "#9af198", fontWeight: 500
                    }}>{c}</span>
                  ))}
                </div>

                {/* Style filter */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                  <button onClick={() => { setActiveStyle(null); setShowAnnotated(null); }} style={{
                    padding: "6px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600,
                    cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                    background: activeStyle === null ? "rgba(255,255,255,0.1)" : "transparent",
                    color: activeStyle === null ? "#fff" : "rgba(255,255,255,0.4)",
                    border: "1px solid rgba(255,255,255,0.1)"
                  }}>All Styles</button>
                  {STYLES.map((s, i) => (
                    <button key={i} onClick={() => { setActiveStyle(i); setShowAnnotated(null); }} style={{
                      padding: "6px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600,
                      cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                      background: activeStyle === i ? s.color + "22" : "transparent",
                      color: activeStyle === i ? s.color : "rgba(255,255,255,0.4)",
                      border: `1px solid ${activeStyle === i ? s.color + "44" : "rgba(255,255,255,0.08)"}`
                    }}>{s.emoji} {s.name}</button>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
                  {[null, false, true].map((val, i) => (
                    <button key={i} onClick={() => setShowAnnotated(val)} style={{
                      padding: "6px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600,
                      cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                      background: showAnnotated === val ? "rgba(255,255,255,0.1)" : "transparent",
                      color: showAnnotated === val ? "#fff" : "rgba(255,255,255,0.4)",
                      border: "1px solid rgba(255,255,255,0.1)"
                    }}>{val === null ? "Both" : val ? "With Cues" : "Clean Only"}</button>
                  ))}
                </div>

                {/* Prompt cards */}
                {STYLES.filter((_, i) => activeStyle === null || activeStyle === i).map((style, si) => (
                  <div key={si}>
                    {(showAnnotated === null || showAnnotated === false) && (
                      <PromptCard movement={m} style={style} annotated={false} />
                    )}
                    {(showAnnotated === null || showAnnotated === true) && (
                      <PromptCard movement={m} style={style} annotated={true} />
                    )}
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </Section>

      {/* ─── FOOTER CTA ─── */}
      <div style={{
        padding: "80px 24px", textAlign: "center",
        background: "linear-gradient(180deg, transparent, rgba(13,154,165,0.05))"
      }}>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 28, fontWeight: 700, marginBottom: 16
        }}>Want to take this further?</h2>
        <p style={{
          fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.5)",
          maxWidth: 520, margin: "0 auto 28px"
        }}>
          Milton AI is building the operating system for fitness facilities. Trainer performance tracking, session logging, progressive overload programming, client retention intelligence, and more. All powered by AI.
        </p>
        <a href="https://getmilton.com" target="_blank" rel="noopener" style={{
          display: "inline-block", padding: "14px 36px", borderRadius: 8,
          background: "linear-gradient(135deg, #0d9aa5, #126b80)",
          color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none",
          letterSpacing: "0.03em", boxShadow: "0 4px 24px rgba(13,154,165,0.3)"
        }}>Learn More at getmilton.com</a>
        <p style={{
          fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 48,
          letterSpacing: "0.05em"
        }}>© 2026 Milton AI · getmilton.com · All rights reserved.</p>
      </div>
    </div>
  );
}
