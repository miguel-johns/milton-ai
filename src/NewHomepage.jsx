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

// Design tokens
const colors = {
  darkNavy: "#0B1628",
  mintMist: "#e8f5f3",
  lightMint: "#f8faf7",
  teal: "#0d9aa5",
  mutedWhite: "rgba(255,255,255,0.75)",
  cream: "rgba(255,252,245,0.9)",
};

const fonts = {
  heading: "'Cormorant Garamond', serif",
  body: "'DM Sans', sans-serif",
};

// Sparkle Icon
function SparkleIcon({ size = 16, color = colors.teal }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  );
}

// Voice/Audio Icon
function VoiceIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <rect x="4" y="8" width="3" height="8" rx="1.5" />
      <rect x="9" y="5" width="3" height="14" rx="1.5" />
      <rect x="14" y="8" width="3" height="8" rx="1.5" />
      <rect x="19" y="10" width="3" height="4" rx="1.5" />
    </svg>
  );
}

// Topic Pill Component
function TopicPill({ children, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 18px",
        borderRadius: 100,
        border: "1px solid rgba(11,22,40,0.1)",
        background: "rgba(255,255,255,0.8)",
        fontFamily: fonts.body,
        fontSize: 14,
        fontWeight: 500,
        color: colors.darkNavy,
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "all 0.2s ease",
      }}
    >
      {icon && <span style={{ fontSize: 16 }}>{icon}</span>}
      {children}
    </button>
  );
}

// Chat Input Component
function ChatInput({ mobile, onSubmit, value, onChange, placeholder }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 20,
        boxShadow: isFocused 
          ? `0 8px 40px rgba(13,154,165,0.15), 0 0 0 2px ${colors.teal}20` 
          : "0 8px 40px rgba(11,22,40,0.08)",
        padding: mobile ? "16px" : "20px 24px",
        width: "100%",
        maxWidth: 640,
        transition: "box-shadow 0.2s ease",
      }}
    >
      {/* Input area */}
      <div style={{ position: "relative" }}>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          rows={1}
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            fontFamily: fonts.body,
            fontSize: 16,
            color: colors.darkNavy,
            resize: "none",
            background: "transparent",
            lineHeight: 1.5,
            minHeight: 24,
          }}
        />
      </div>

      {/* Bottom row with actions */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 16,
          paddingTop: 12,
          borderTop: "1px solid rgba(11,22,40,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: fonts.body,
              fontSize: 14,
              color: "rgba(11,22,40,0.5)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: fonts.body,
              fontSize: 14,
              color: "rgba(11,22,40,0.5)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
            Attach
          </button>
        </div>

        <button
          onClick={onSubmit}
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: colors.teal,
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            transition: "transform 0.2s ease, background 0.2s ease",
          }}
        >
          <VoiceIcon />
        </button>
      </div>
    </div>
  );
}

// Grid Background Pattern
function GridBackground({ mobile }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: 0.4,
        background: `
          linear-gradient(rgba(13,154,165,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(13,154,165,0.03) 1px, transparent 1px)
        `,
        backgroundSize: mobile ? "30px 30px" : "50px 50px",
      }}
    />
  );
}

export default function NewHomepage() {
  const { mobile } = useBreakpoint();
  const [inputValue, setInputValue] = useState("");

  const topicPills = [
    { label: "I'm a trainer", icon: "💪" },
    { label: "I manage trainers", icon: "📋" },
    { label: "I'm looking for a coach", icon: "🎯" },
    { label: "I run a gym", icon: "🏋️" },
  ];

  const handleSubmit = () => {
    if (inputValue.trim()) {
      // Handle the chat submission
      console.log("[v0] Chat submitted:", inputValue);
      // Could route to appropriate page based on intent
    }
  };

  const handleTopicClick = (topic) => {
    setInputValue(topic.label);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${colors.lightMint} 0%, ${colors.mintMist} 40%, rgba(13,154,165,0.15) 100%)`,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: mobile ? "120px 20px 60px" : "80px 40px",
      }}
    >
      {/* Grid Pattern */}
      <GridBackground mobile={mobile} />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          maxWidth: 800,
          width: "100%",
        }}
      >
        {/* Headline */}
        <h1
          style={{
            fontFamily: fonts.heading,
            fontSize: mobile ? 36 : 64,
            fontWeight: 400,
            color: colors.darkNavy,
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          Hi I&apos;m{" "}
          <span style={{ position: "relative", display: "inline-block" }}>
            <span style={{ color: colors.teal }}>Milton</span>
            <span
              style={{
                position: "absolute",
                top: mobile ? -8 : -12,
                right: mobile ? -16 : -24,
              }}
            >
              <SparkleIcon size={mobile ? 14 : 20} />
            </span>
          </span>
          . Let me show you what I can do.
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: fonts.body,
            fontSize: mobile ? 16 : 18,
            color: "rgba(11,22,40,0.7)",
            lineHeight: 1.6,
            maxWidth: 520,
            margin: "0 auto 48px",
          }}
        >
          Ask a few questions, and Milton will guide you whether you&apos;re here as a client, a coach, or a clinic.
        </p>

        {/* Chat Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          {/* Topic Pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              justifyContent: "center",
              maxWidth: 600,
            }}
          >
            {topicPills.map((pill, i) => (
              <TopicPill
                key={i}
                icon={pill.icon}
                onClick={() => handleTopicClick(pill)}
              >
                {pill.label}
              </TopicPill>
            ))}
          </div>

          {/* Chat Input */}
          <ChatInput
            mobile={mobile}
            value={inputValue}
            onChange={setInputValue}
            onSubmit={handleSubmit}
            placeholder="I'm a coach looking for my portal..."
          />
        </div>

        {/* Optional: Quick Links */}
        <div
          style={{
            marginTop: 48,
            display: "flex",
            gap: 24,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="#/for-trainer-managers"
            style={{
              fontFamily: fonts.body,
              fontSize: 14,
              color: colors.teal,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "opacity 0.2s ease",
            }}
          >
            For Trainer Managers
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="#/insights"
            style={{
              fontFamily: fonts.body,
              fontSize: 14,
              color: colors.teal,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "opacity 0.2s ease",
            }}
          >
            Read Insights
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
