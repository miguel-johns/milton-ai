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
const navy = "#08455e";

function Accent({ children }) {
  return <span style={{ color: teal, fontStyle: "italic" }}>{children}</span>;
}

const categories = [
  { id: "all", label: "All" },
  { id: "ai-fitness", label: "AI in Fitness" },
  { id: "trainer-dev", label: "Trainer Development" },
  { id: "director", label: "Fitness Director Playbook" },
  { id: "industry", label: "Industry Data" },
  { id: "milton", label: "Milton Updates" },
];

const articles = [
  {
    id: 1, featured: true,
    category: "ai-fitness",
    tag: "AI IN FITNESS",
    title: "The AI Landscape in Fitness: What's Real, What's Hype, and What to Do About It",
    excerpt: "We walked the floor at HFA 2026 and talked to every AI vendor in the space. Here's our honest breakdown of what's actually working in gyms right now — and what's still just a good demo.",
    date: "Mar 24, 2026",
    readTime: "8 min read",
  },
  {
    id: 2,
    category: "trainer-dev",
    tag: "TRAINER DEVELOPMENT",
    title: "80% of Personal Trainers Quit Within a Year. Here's What the Other 20% Do Differently.",
    excerpt: "The fitness industry's trainer turnover crisis isn't a hiring problem — it's a development problem. We break down what high-retention gyms are doing to keep their coaches.",
    date: "Mar 18, 2026",
    readTime: "6 min read",
  },
  {
    id: 3,
    category: "director",
    tag: "FITNESS DIRECTOR PLAYBOOK",
    title: "The 4 Pillars Every Fitness Director Should Be Tracking — But Probably Isn't",
    excerpt: "Self-management, coaching skill, communication, teamwork. A framework developed over 20 years of managing trainers, now powered by AI diagnostics.",
    date: "Mar 12, 2026",
    readTime: "7 min read",
  },
  {
    id: 4,
    category: "industry",
    tag: "INDUSTRY DATA",
    title: "The 6-Month Retention Cliff: Why It Matters and How to See It Coming",
    excerpt: "If you keep a client past six months, they'll likely stay two years. But most gyms can't see the cliff until the client is already gone. Here's how to change that.",
    date: "Mar 7, 2026",
    readTime: "5 min read",
  },
  {
    id: 5,
    category: "ai-fitness",
    tag: "AI IN FITNESS",
    title: "AI Receptionist vs. AI Co-Pilot: Why the Industry Is Solving the Wrong Problem",
    excerpt: "Every AI startup at HFA was selling the same thing — an AI that picks up your phone. Nobody was building the thing gym owners actually need: intelligence for the people already doing the work.",
    date: "Mar 3, 2026",
    readTime: "6 min read",
  },
  {
    id: 6,
    category: "trainer-dev",
    tag: "TRAINER DEVELOPMENT",
    title: "Your Best Trainer Is About to Leave. Here Are the Signals You're Missing.",
    excerpt: "Trainer churn rarely happens overnight. There are behavioral signals weeks before the resignation — and most fitness directors aren't tracking them.",
    date: "Feb 26, 2026",
    readTime: "5 min read",
  },
  {
    id: 7,
    category: "director",
    tag: "FITNESS DIRECTOR PLAYBOOK",
    title: "From 3 Spreadsheets to 1 Dashboard: A Fitness Director's Migration Story",
    excerpt: "How one fitness director replaced 20 years of manual tracking with an AI-powered command center — and what she learned along the way.",
    date: "Feb 20, 2026",
    readTime: "9 min read",
  },
  {
    id: 8,
    category: "milton",
    tag: "MILTON UPDATES",
    title: "Introducing the Fitness Director Co-Pilot: The View You've Been Building in Spreadsheets",
    excerpt: "We're launching the most requested feature in Milton's history — a single intelligent dashboard that shows every trainer's performance, gaps, and development path.",
    date: "Feb 14, 2026",
    readTime: "4 min read",
  },
  {
    id: 9,
    category: "industry",
    tag: "INDUSTRY DATA",
    title: "Personal Training Revenue Per Trainer: Benchmarks From 200+ Gyms",
    excerpt: "We aggregated revenue data across private studios and training teams to build the first AI-informed benchmark for personal training businesses. Here's where you stand.",
    date: "Feb 8, 2026",
    readTime: "7 min read",
  },
];

function ArticleCard({ article, featured = false, mobile, tablet }) {
  const tagColors = {
    "AI IN FITNESS": teal,
    "TRAINER DEVELOPMENT": mint,
    "FITNESS DIRECTOR PLAYBOOK": "#a78bfa",
    "INDUSTRY DATA": "#f0a030",
    "MILTON UPDATES": "#60a5fa",
  };
  const tagColor = tagColors[article.tag] || teal;

  if (featured) {
    return (
      <div style={{
        display: "grid",
        gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
        gap: mobile ? 0 : 0,
        background: "linear-gradient(145deg, rgba(13,154,165,0.08) 0%, rgba(6,28,39,0.45) 100%)",
        border: "1px solid rgba(13,154,165,0.2)",
        borderRadius: mobile ? 16 : 24,
        overflow: "hidden",
        cursor: "pointer",
        transition: "border-color 0.3s ease",
        boxShadow: "0 12px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}>
        {/* Image placeholder */}
        <div style={{
          background: `linear-gradient(135deg, ${teal}12, rgba(6,28,39,0.6))`,
          minHeight: mobile ? 200 : 320,
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 40% 50%, ${teal}15 0%, transparent 60%)` }} />
          <span style={{ fontFamily: f, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: `${teal}50` }}>Featured Visual</span>
        </div>

        {/* Content */}
        <div style={{ padding: mobile ? "28px 22px" : "40px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span style={{
              fontFamily: f, fontSize: 10, fontWeight: 600, letterSpacing: 1.5,
              color: tagColor, background: `${tagColor}12`,
              borderRadius: 100, padding: "4px 12px",
            }}>{article.tag}</span>
            <span style={{ fontFamily: f, fontSize: 12, color: "rgba(255,255,255,0.25)" }}>FEATURED</span>
          </div>

          <h2 style={{
            fontFamily: serif, fontSize: mobile ? 24 : 30,
            fontWeight: 400, lineHeight: 1.25, color: "#fff",
            margin: "0 0 14px 0",
          }}>{article.title}</h2>

          <p style={{
            fontFamily: f, fontSize: mobile ? 14 : 15, lineHeight: 1.7,
            color: "rgba(255,255,255,0.45)", margin: "0 0 20px 0",
          }}>{article.excerpt}</p>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontFamily: f, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{article.date}</span>
            <span style={{ fontFamily: f, fontSize: 12, color: "rgba(255,255,255,0.2)" }}>·</span>
            <span style={{ fontFamily: f, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{article.readTime}</span>
          </div>

          <span style={{
            fontFamily: f, fontSize: 14, fontWeight: 600, color: teal,
            marginTop: 20, display: "inline-flex", alignItems: "center", gap: 6,
          }}>Read Article <span style={{ fontSize: 16 }}>→</span></span>
        </div>
      </div>
    );
  }

  // Standard card
  return (
    <div style={{
      background: "linear-gradient(145deg, rgba(13,154,165,0.05) 0%, rgba(6,28,39,0.35) 100%)",
      border: "1px solid rgba(13,154,165,0.13)",
      borderRadius: mobile ? 14 : 18,
      overflow: "hidden", cursor: "pointer",
      transition: "border-color 0.3s ease, transform 0.3s ease",
      boxShadow: "0 6px 24px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.03)",
      display: "flex", flexDirection: "column",
    }}>
      {/* Image placeholder */}
      <div style={{
        background: `linear-gradient(135deg, ${tagColor}08, rgba(6,28,39,0.5))`,
        height: mobile ? 160 : 180,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 50% 60%, ${tagColor}10 0%, transparent 60%)` }} />
        <span style={{ fontFamily: f, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: `${tagColor}40` }}>Visual Here</span>
      </div>

      {/* Content */}
      <div style={{ padding: mobile ? "20px 18px" : "24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{
            fontFamily: f, fontSize: 9, fontWeight: 600, letterSpacing: 1.5,
            color: tagColor, background: `${tagColor}12`,
            borderRadius: 100, padding: "3px 10px",
          }}>{article.tag}</span>
        </div>

        <h3 style={{
          fontFamily: f, fontSize: mobile ? 16 : 18, fontWeight: 600,
          lineHeight: 1.35, color: "#fff", margin: "0 0 10px 0",
        }}>{article.title}</h3>

        <p style={{
          fontFamily: f, fontSize: 13, lineHeight: 1.6,
          color: "rgba(255,255,255,0.4)", margin: "0 0 16px 0",
          flex: 1,
        }}>{article.excerpt}</p>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "auto" }}>
          <span style={{ fontFamily: f, fontSize: 11, color: "rgba(255,255,255,0.25)" }}>{article.date}</span>
          <span style={{ fontFamily: f, fontSize: 11, color: "rgba(255,255,255,0.15)" }}>·</span>
          <span style={{ fontFamily: f, fontSize: 11, color: "rgba(255,255,255,0.25)" }}>{article.readTime}</span>
        </div>
      </div>
    </div>
  );
}

export default function Insights() {
  const { mobile, tablet } = useBreakpoint();
  const [activeCategory, setActiveCategory] = useState("all");
  const [email, setEmail] = useState("");
  const px = mobile ? 20 : tablet ? 32 : 40;

  const featuredArticle = articles.find(a => a.featured);
  const filteredArticles = articles.filter(a => {
    if (activeCategory === "all") return !a.featured;
    return a.category === activeCategory && !a.featured;
  });

  return (
    <>
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1060, margin: "0 auto", padding: `0 ${px}px` }}>

        {/* ═══════ HEADER ═══════ */}
        <section style={{ padding: mobile ? "48px 0 32px" : "80px 0 48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: teal }} />
            <span style={{ fontFamily: f, fontSize: 12, fontWeight: 500, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>INSIGHTS</span>
          </div>

          <h1 style={{
            fontFamily: serif,
            fontSize: mobile ? 34 : tablet ? 48 : 56,
            fontWeight: 400, lineHeight: 1.12, color: "#fff",
            margin: "0 0 16px 0",
          }}>
            AI, training, and the business of <Accent>building coaches</Accent>.
          </h1>

          <p style={{
            fontFamily: f, fontSize: mobile ? 15 : 18, lineHeight: 1.65,
            color: "rgba(255,255,255,0.5)", maxWidth: 580, margin: 0,
          }}>
            Expert perspectives on AI in fitness, trainer development, and running a personal training business that actually retains its people.
          </p>
        </section>

        {/* ═══════ FEATURED ARTICLE ═══════ */}
        {featuredArticle && activeCategory === "all" && (
          <section style={{ paddingBottom: mobile ? 40 : 56 }}>
            <ArticleCard article={featuredArticle} featured mobile={mobile} tablet={tablet} />
          </section>
        )}

        {/* ═══════ CATEGORY FILTER ═══════ */}
        <section style={{ paddingBottom: mobile ? 28 : 40 }}>
          <div style={{
            display: "flex", gap: mobile ? 6 : 8, flexWrap: "wrap",
            paddingBottom: mobile ? 20 : 28,
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}>
            {categories.map(cat => {
              const active = activeCategory === cat.id;
              return (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)} style={{
                  fontFamily: f, fontSize: mobile ? 12 : 13, fontWeight: 500,
                  padding: mobile ? "7px 14px" : "8px 18px",
                  borderRadius: 100, cursor: "pointer",
                  border: `1px solid ${active ? teal : "rgba(255,255,255,0.08)"}`,
                  background: active ? `${teal}15` : "rgba(255,255,255,0.02)",
                  color: active ? teal : "rgba(255,255,255,0.45)",
                  transition: "all 0.2s ease",
                  letterSpacing: 0.3,
                }}>{cat.label}</button>
              );
            })}
          </div>
        </section>

        {/* ═══════ ARTICLE GRID ═══════ */}
        <section style={{ paddingBottom: mobile ? 48 : 72 }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : tablet ? "1fr 1fr" : "1fr 1fr 1fr",
            gap: mobile ? 16 : 22,
          }}>
            {(activeCategory === "all" ? articles.filter(a => !a.featured) : articles.filter(a => a.category === activeCategory)).map(article => (
              <ArticleCard key={article.id} article={article} mobile={mobile} tablet={tablet} />
            ))}
          </div>

          {filteredArticles.length === 0 && activeCategory !== "all" && (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <p style={{ fontFamily: f, fontSize: 16, color: "rgba(255,255,255,0.3)" }}>More articles in this category coming soon.</p>
            </div>
          )}
        </section>

        {/* ═══════ NEWSLETTER CAPTURE ═══════ */}
        <section style={{ paddingBottom: mobile ? 72 : 100 }}>
          <div style={{
            background: "linear-gradient(145deg, rgba(13,154,165,0.1) 0%, rgba(6,28,39,0.5) 100%)",
            border: "1px solid rgba(13,154,165,0.2)",
            borderRadius: mobile ? 20 : 28,
            padding: mobile ? "36px 22px" : "56px 56px",
            boxShadow: "0 16px 48px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)",
            position: "relative", overflow: "hidden",
            textAlign: "center",
          }}>
            <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: 1, background: `linear-gradient(90deg, transparent, ${teal}30, transparent)` }} />

            <h2 style={{
              fontFamily: serif, fontSize: mobile ? 26 : 36,
              fontWeight: 400, color: "#fff", margin: "0 0 12px 0",
            }}>
              Stay ahead of the <Accent>curve</Accent>.
            </h2>

            <p style={{
              fontFamily: f, fontSize: mobile ? 14 : 16, lineHeight: 1.65,
              color: "rgba(255,255,255,0.45)",
              maxWidth: 480, margin: "0 auto 28px auto",
            }}>
              Weekly insights on AI in fitness, trainer retention, and building a personal training business that scales. No fluff. Just what's working.
            </p>

            <div style={{
              display: "flex", gap: 10, maxWidth: 440, margin: "0 auto",
              flexDirection: mobile ? "column" : "row",
            }}>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  flex: 1, fontFamily: f, fontSize: 15,
                  padding: "13px 18px", borderRadius: 100,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff", outline: "none",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={e => e.target.style.borderColor = `${teal}60`}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
              />
              <button style={{
                fontFamily: f, fontSize: 15, fontWeight: 600,
                padding: "13px 28px", borderRadius: 100, border: "none",
                background: `linear-gradient(135deg, ${teal}, #126b80)`,
                color: "#fff", cursor: "pointer", whiteSpace: "nowrap",
                boxShadow: `0 4px 16px ${teal}25`,
              }}>Subscribe</button>
            </div>

            <p style={{
              fontFamily: f, fontSize: 11, color: "rgba(255,255,255,0.2)",
              margin: "14px auto 0 auto",
            }}>One email per week. Unsubscribe anytime.</p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid rgba(13,154,165,0.08)", padding: mobile ? "24px 20px" : "32px 40px",
        display: "flex", justifyContent: "center", position: "relative", zIndex: 1,
      }}>
        <span style={{ fontFamily: f, fontSize: 13, color: "rgba(255,255,255,0.25)" }}>© 2026 MMNT Inc. All rights reserved.</span>
      </footer>
    </>
  );
}
