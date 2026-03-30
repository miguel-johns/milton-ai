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

// Article content database
const articlesContent = {
  "ai-landscape-fitness": {
    id: 1,
    slug: "ai-landscape-fitness",
    category: "AI IN FITNESS",
    categoryColor: teal,
    title: "The AI Landscape in Fitness: What's Real, What's Hype, and What to Do About It",
    date: "March 24, 2026",
    readTime: "8 min read",
    content: [
      { type: "paragraph", text: "We spent three days on the floor at HFA 2026 in San Diego. We exhibited. We presented. We talked to hundreds of gym owners, fitness directors, equipment manufacturers, and software companies. And we talked to every AI vendor in the building." },
      { type: "paragraph", text: "Here's what we saw: 43 booths mentioning artificial intelligence. AI receptionists. AI workout generators. AI marketing tools. AI scheduling assistants. AI chatbots. AI everything." },
      { type: "paragraph", text: "Here's what we heard from gym owners walking the floor: \"I don't know what's real anymore.\"" },
      { type: "paragraph", text: "That's a problem. And it's exactly why we're writing this." },
      
      { type: "heading", text: "Everybody's Selling the Same Thing" },
      { type: "paragraph", text: "Walk the Innovation Alley at HFA and you'd think the entire fitness industry was about to be automated. Every other booth had a screen showing a chatbot answering a phone call, generating a workout, or sending a text message." },
      { type: "paragraph", text: "The pitch was always some version of the same story: \"Your front desk is overwhelmed. Your trainers are inconsistent. Your members are leaving. Our AI fixes it.\"" },
      { type: "paragraph", text: "The problem isn't that these claims are false. Some of them are partially true. The problem is that they're all solving the periphery. The receptionist. The phone call. The marketing email. The booking confirmation." },
      { type: "paragraph", text: "Nobody was solving the center." },
      
      { type: "heading", text: "The Center of the Problem" },
      { type: "paragraph", text: "Here's what we know from working inside personal training businesses (not just selling to them): the most expensive problem in the fitness industry isn't missed phone calls. It's trainer turnover." },
      { type: "paragraph", text: "80% annual turnover. Three out of five trainers don't make it past three years. Every time a trainer leaves, the gym loses their clients, their institutional knowledge, their relationships, and the thousands of dollars it took to recruit, onboard, and develop them." },
      { type: "paragraph", text: "The gym then starts over. New hire. New onboarding. New mistakes. The clients who stayed now have to rebuild trust with someone new. Many don't bother. They just leave." },
      { type: "paragraph", text: "This is a $4.1 trillion problem hiding inside a $35 billion industry. Chronic disease costs the US healthcare system more than any other category, and the frontline workers best positioned to prevent it (personal trainers and health coaches) are churning out of the profession before they can make an impact." },
      { type: "paragraph", text: "No AI receptionist fixes this." },
      
      { type: "heading", text: "Three Categories of AI at HFA" },
      { type: "paragraph", text: "After three days of demos, conversations, and vendor pitches, we sorted the AI landscape into three categories." },
      
      { type: "subheading", text: "Category 1: AI That Answers the Phone" },
      { type: "paragraph", text: "This was the biggest category at HFA by far. AI receptionists, AI chatbots, AI text responders. The pitch: never miss a lead again." },
      { type: "paragraph", text: "Is it real? Mostly. The technology works. Voice AI has gotten good enough that a caller might not immediately realize they're talking to a machine. For gyms losing leads to missed calls, this solves a real (if narrow) problem." },
      { type: "paragraph", text: "The catch: this is a commodity. Every vendor at HFA was selling roughly the same thing with different branding. There's no moat, no differentiation, and no connection to the actual operations of your training business. It's a band-aid on the front door while the back door is wide open." },
      
      { type: "subheading", text: "Category 2: AI That Generates Content" },
      { type: "paragraph", text: "Workout generators. Program builders. Marketing copy tools. AI that writes your Instagram captions or designs a 12-week training plan." },
      { type: "paragraph", text: "Is it real? Partially. AI can generate a workout. Whether that workout is safe, progressive, and appropriate for the specific human doing it is a different question entirely. We saw demos where the AI suggested exercises that don't exist and programming logic that would injure a deconditioned client." },
      { type: "paragraph", text: "The deeper issue: generating a workout is not coaching. A personal trainer's value isn't the set-and-rep scheme. It's knowing that Sarah mentioned her back was tight last session, that she's been stressed about work, that she responds better to encouragement than correction, and that she's four weeks away from a squat PR if you manage her load correctly." },
      { type: "paragraph", text: "No generator captures that." },
      
      { type: "subheading", text: "Category 3: AI That Makes Humans Better" },
      { type: "paragraph", text: "This was the smallest category at HFA. Almost invisible. And it's the one that actually matters." },
      { type: "paragraph", text: "This is AI that doesn't replace the trainer or the director. It amplifies them. It watches the data they're already generating (session attendance, follow-up rates, client tenure, consultation close rates) and turns it into intelligence." },
      { type: "quote", text: "Instead of answering the phone, it answers the question every fitness director is asking at 6am on Monday: Who needs my attention today? Which trainer is slipping? Which client is about to leave? Where should I spend my time?" },
      { type: "paragraph", text: "This is the category Milton lives in. And it's the category that will define the next era of this industry." },
      
      { type: "heading", text: "What Gym Owners Were Actually Asking" },
      { type: "paragraph", text: "The most revealing part of HFA wasn't the vendor booths. It was the conversations with gym owners between sessions, at lunch, in the hallways." },
      { type: "paragraph", text: "Nobody asked us: \"Can your AI answer my phone?\"" },
      { type: "paragraph", text: "They asked:" },
      { type: "list", items: [
        "\"How do I know which of my trainers is actually following up with clients?\"",
        "\"I'm running three spreadsheets and cross-referencing MindBody every week. Is there a better way?\"",
        "\"My best trainer just left. I had no idea it was coming. How do I see that earlier?\"",
        "\"I know AI is coming but I don't know where to start and I don't want to waste money on the wrong thing.\""
      ]},
      { type: "paragraph", text: "These aren't receptionist problems. These are operational intelligence problems. They're the problems that live in the gap between what a fitness director knows intuitively and what they can actually track, measure, and act on." },
      { type: "paragraph", text: "One fitness director we work closely with was managing her entire training team using three Google Sheets: one for weekly tasks, one for consultations, and one for client intake. She'd cross-reference those with MindBody every week to figure out who was performing and who wasn't. It took hours. And she still couldn't see the full picture." },
      { type: "paragraph", text: "That's not a technology failure. That's an intelligence failure. The data existed. Nobody was connecting it." },
      
      { type: "heading", text: "The Question Nobody Was Asking (But Should Be)" },
      { type: "paragraph", text: "Here's what struck us most at HFA: with all the noise about AI in fitness, almost no one was talking about the trainers themselves." },
      { type: "paragraph", text: "The humans." },
      { type: "paragraph", text: "The people who show up at 5am to coach a session. The ones who text clients at 9pm because they care. The ones who track progressive overload in their heads because their software doesn't do it for them. The ones burning out, leaving, and taking their clients with them." },
      { type: "paragraph", text: "If AI in fitness doesn't start with making those humans more effective, more supported, and more likely to stay in the profession, then it's solving the wrong problem. Beautifully. Expensively. But the wrong one." },
      
      { type: "heading", text: "What We'd Tell a Gym Owner Right Now" },
      { type: "paragraph", text: "If you're a gym owner or fitness director reading this, here's our honest advice (not a sales pitch):" },
      { type: "advice", title: "Start with your people, not your phone lines.", text: "The biggest ROI in your business isn't automating lead capture. It's retaining the trainers you've already invested in and giving them the tools to perform consistently. A trainer who stays three years instead of one is worth more than any chatbot." },
      { type: "advice", title: "Audit before you buy.", text: "Before you sign up for any AI tool, ask yourself: what problem am I actually solving? If it's \"we miss too many calls,\" fine. Get a receptionist bot. But know that it won't move the needle on retention, revenue per trainer, or coaching quality." },
      { type: "advice", title: "Look for intelligence, not automation.", text: "The AI tools that will matter most in the next two years aren't the ones that do things for you. They're the ones that help you see things you couldn't see before: which trainer needs a coaching conversation, which client is about to leave, where your revenue is leaking, and what your team should focus on this week." },
      { type: "advice", title: "Demand integration, not replacement.", text: "If an AI tool requires you to rip out your existing systems and start over, run. The best AI layers on top of what's already working: your scheduling software, your billing platform, your team's existing workflows. Intelligence on top, not disruption underneath." },
      { type: "advice", title: "Talk to someone who's been in your shoes.", text: "The AI landscape in fitness is noisy and confusing. Talk to people who've actually run training businesses, managed trainers, and sat in the spreadsheets. Not just people who've built software about it." },
      
      { type: "heading", text: "What Comes Next" },
      { type: "paragraph", text: "The fitness industry is about to split into two groups: the gyms that figured out AI early and the gyms that bought the wrong tools and got burned." },
      { type: "paragraph", text: "The difference won't be who spent the most money. It'll be who asked the right questions. Who focused on their people instead of their phone lines. Who chose intelligence over automation." },
      { type: "paragraph", text: "We built Milton because we've been on both sides. We've been the trainer on the floor. We've been the partner in the gym. We've sat in the spreadsheets and done the mental math. And we believe the trainers fighting the global metabolic health crisis deserve better tools than a chatbot and a prayer." },
      { type: "paragraph", text: "The AI landscape in fitness is big, loud, and growing. Most of it is noise." },
      { type: "callout", text: "The signal is simple: make the humans better." },
    ],
  },
};

export default function ArticleDetail({ slug }) {
  const { mobile, tablet } = useBreakpoint();
  const px = mobile ? 20 : tablet ? 32 : 40;
  
  const article = articlesContent[slug];
  
  if (!article) {
    return (
      <>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto", padding: `120px ${px}px`, textAlign: "center" }}>
          <h1 style={{ fontFamily: serif, fontSize: 36, color: "#fff" }}>Article not found</h1>
          <a href="#/insights" style={{ fontFamily: f, fontSize: 16, color: teal, textDecoration: "none" }}>Back to Insights</a>
        </div>
      </>
    );
  }

  const renderContent = (block, index) => {
    switch (block.type) {
      case "paragraph":
        return (
          <p key={index} style={{
            fontFamily: f, fontSize: mobile ? 16 : 18, lineHeight: 1.8,
            color: "rgba(255,255,255,0.75)", margin: "0 0 24px 0",
          }}>{block.text}</p>
        );
      case "heading":
        return (
          <h2 key={index} style={{
            fontFamily: serif, fontSize: mobile ? 26 : 32,
            fontWeight: 400, color: "#fff",
            margin: "48px 0 20px 0", lineHeight: 1.3,
          }}>{block.text}</h2>
        );
      case "subheading":
        return (
          <h3 key={index} style={{
            fontFamily: f, fontSize: mobile ? 18 : 20,
            fontWeight: 600, color: "#fff",
            margin: "36px 0 16px 0",
          }}>{block.text}</h3>
        );
      case "quote":
        return (
          <blockquote key={index} style={{
            fontFamily: serif, fontSize: mobile ? 20 : 24,
            fontStyle: "italic", lineHeight: 1.6,
            color: teal, margin: "32px 0",
            padding: "0 0 0 24px",
            borderLeft: `3px solid ${teal}40`,
          }}>{block.text}</blockquote>
        );
      case "list":
        return (
          <ul key={index} style={{
            fontFamily: f, fontSize: mobile ? 16 : 18, lineHeight: 1.8,
            color: "rgba(255,255,255,0.75)", margin: "0 0 24px 0",
            paddingLeft: 24, listStyle: "none",
          }}>
            {block.items.map((item, i) => (
              <li key={i} style={{ marginBottom: 12, position: "relative", paddingLeft: 20 }}>
                <span style={{ position: "absolute", left: 0, color: teal }}>-</span>
                {item}
              </li>
            ))}
          </ul>
        );
      case "advice":
        return (
          <div key={index} style={{
            margin: "0 0 20px 0", padding: "20px 24px",
            background: "rgba(13,154,165,0.06)",
            border: "1px solid rgba(13,154,165,0.15)",
            borderRadius: 12,
          }}>
            <p style={{
              fontFamily: f, fontSize: mobile ? 15 : 16, fontWeight: 600,
              color: "#fff", margin: "0 0 8px 0",
            }}>{block.title}</p>
            <p style={{
              fontFamily: f, fontSize: mobile ? 15 : 16, lineHeight: 1.7,
              color: "rgba(255,255,255,0.6)", margin: 0,
            }}>{block.text}</p>
          </div>
        );
      case "callout":
        return (
          <div key={index} style={{
            margin: "40px 0", padding: mobile ? "28px 24px" : "36px 40px",
            background: `linear-gradient(135deg, ${teal}15, ${teal}08)`,
            border: `1px solid ${teal}30`,
            borderRadius: 16, textAlign: "center",
          }}>
            <p style={{
              fontFamily: serif, fontSize: mobile ? 22 : 28,
              fontWeight: 500, fontStyle: "italic",
              color: "#fff", margin: 0,
            }}>{block.text}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", padding: `0 ${px}px` }}>
        
        {/* Header */}
        <header style={{ paddingTop: mobile ? 100 : 120, paddingBottom: mobile ? 40 : 56 }}>
          <a href="#/insights" style={{
            fontFamily: f, fontSize: 14, fontWeight: 500,
            color: "rgba(255,255,255,0.5)", textDecoration: "none",
            display: "inline-flex", alignItems: "center", gap: 8,
            marginBottom: 28,
          }}>
            <span style={{ fontSize: 16 }}>&larr;</span> Back to Insights
          </a>
          
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <span style={{
              fontFamily: f, fontSize: 10, fontWeight: 600, letterSpacing: 1.5,
              color: article.categoryColor, background: `${article.categoryColor}12`,
              borderRadius: 100, padding: "5px 14px",
            }}>{article.category}</span>
          </div>
          
          <h1 style={{
            fontFamily: serif, fontSize: mobile ? 32 : 44,
            fontWeight: 400, lineHeight: 1.2, color: "#fff",
            margin: "0 0 20px 0",
          }}>{article.title}</h1>
          
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontFamily: f, fontSize: 14, color: "rgba(255,255,255,0.4)" }}>{article.date}</span>
            <span style={{ fontFamily: f, fontSize: 14, color: "rgba(255,255,255,0.2)" }}>·</span>
            <span style={{ fontFamily: f, fontSize: 14, color: "rgba(255,255,255,0.4)" }}>{article.readTime}</span>
          </div>
        </header>
        
        {/* Divider */}
        <div style={{
          height: 1,
          background: `linear-gradient(90deg, transparent, ${teal}30, transparent)`,
          marginBottom: mobile ? 40 : 56,
        }} />
        
        {/* Content */}
        <article style={{ paddingBottom: mobile ? 60 : 80 }}>
          {article.content.map((block, index) => renderContent(block, index))}
        </article>
        
        {/* CTA Section */}
        <section style={{
          padding: mobile ? "40px 0 60px" : "56px 0 80px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}>
          <div style={{
            background: "linear-gradient(145deg, rgba(13,154,165,0.1) 0%, rgba(6,28,39,0.5) 100%)",
            border: "1px solid rgba(13,154,165,0.2)",
            borderRadius: mobile ? 16 : 20,
            padding: mobile ? "32px 24px" : "44px 48px",
            textAlign: "center",
          }}>
            <p style={{
              fontFamily: f, fontSize: 13, fontWeight: 500, letterSpacing: 1.5,
              textTransform: "uppercase", color: teal, margin: "0 0 12px 0",
            }}>Free Consultation</p>
            <h3 style={{
              fontFamily: serif, fontSize: mobile ? 24 : 30,
              fontWeight: 400, color: "#fff", margin: "0 0 14px 0",
            }}>Not sure where AI fits for your gym?</h3>
            <p style={{
              fontFamily: f, fontSize: mobile ? 14 : 16, lineHeight: 1.65,
              color: "rgba(255,255,255,0.5)", margin: "0 0 24px 0",
              maxWidth: 480, marginLeft: "auto", marginRight: "auto",
            }}>Book a free AI Readiness Snapshot call. We'll assess your current operations and give you a clear picture of where AI can (and can't) help.</p>
            <a href="#/book-snapshot" style={{
              fontFamily: f, fontSize: 15, fontWeight: 600,
              padding: "14px 32px", borderRadius: 100,
              background: "#fff", color: navy,
              textDecoration: "none", display: "inline-block",
            }}>Book Your Free Consultation</a>
          </div>
        </section>
        
        {/* Footer */}
        <footer style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "32px 0 48px", borderTop: "1px solid rgba(255,255,255,0.04)",
        }}>
          <span style={{ fontFamily: f, fontSize: 13, color: "rgba(255,255,255,0.25)" }}>© 2026 MMNT Inc. All rights reserved.</span>
        </footer>
      </div>
    </>
  );
}

export { articlesContent };
