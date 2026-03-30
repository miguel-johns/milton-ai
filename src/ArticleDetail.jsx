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
  "trainer-turnover-crisis": {
    id: 2,
    slug: "trainer-turnover-crisis",
    category: "TRAINER DEVELOPMENT",
    categoryColor: "#9af198",
    title: "80% of Personal Trainers Quit Within a Year. Here's What the Other 20% Do Differently.",
    date: "March 18, 2026",
    readTime: "6 min read",
    content: [
      { type: "paragraph", text: "His name was Derek. Twenty-four years old. NASM certified. Great with clients. The kind of trainer who remembered every detail: the knee that acted up on Tuesdays, the daughter's soccer schedule that shifted session times, the protein goal that kept slipping on weekends." },
      { type: "paragraph", text: "Three months in, his client retention was the best on the floor. Six months in, his book was full. Nine months in, he quit." },
      { type: "paragraph", text: "His fitness director didn't see it coming. Nobody did. Derek didn't complain. Didn't cause problems. Didn't show obvious signs of burnout. He just stopped showing up one Monday and sent a text that said, \"I got a job at a SaaS company. Sorry.\"" },
      { type: "paragraph", text: "This story repeats itself in gyms across the country every single year. And the numbers behind it are staggering." },

      { type: "heading", text: "The Number Nobody Wants to Talk About" },
      { type: "paragraph", text: "The fitness industry has an annual personal trainer turnover rate of roughly 80%, a figure cited by multiple industry sources including the American Spa, IHRSA, and W.I.T.S. (World Instructor Training Schools). Among those who survive year one, an estimated three out of five won't make it to year three." },
      { type: "quote", text: "You hire five trainers. Four are gone in twelve months. The one who stays? Coin flip whether they make it to three years." },
      { type: "paragraph", text: "This isn't a hiring problem. This isn't a \"kids these days\" problem. This is a systemic failure in how the industry develops, supports, and retains its most valuable asset: the people doing the actual coaching." },
      { type: "paragraph", text: "And it's costing gym owners a fortune. Estimates for the cost of replacing an employee range from 33% to as high as 200% of their annual salary, depending on the source and the role's complexity. For a trainer earning $46,000 a year (the BLS median for fitness trainers and instructors as of 2024), that's anywhere from $15,000 to $92,000 per replacement when you factor in recruiting, onboarding, training, lost productivity, and the client relationships that walk out the door with them." },
      { type: "paragraph", text: "Multiply that by the number of trainers you've cycled through in the last three years. That's your turnover tax. You're paying it every year whether you realize it or not." },

      { type: "heading", text: "Why They Actually Leave" },
      { type: "paragraph", text: "Ask a gym owner why trainers leave and you'll get a familiar list: the pay is low, the hours are bad, they can't build a client base, they burn out." },
      { type: "paragraph", text: "That list isn't wrong. But it's incomplete." },
      { type: "paragraph", text: "The trainers who stay don't necessarily make more money on day one. They don't necessarily have better hours. They don't start with more clients. What they have is something harder to see and harder to build: a career." },
      { type: "callout", text: "Not a job. A career." },
      { type: "paragraph", text: "We've spent the last two years working inside personal training businesses. Not selling to them. Inside them. Watching how trainers are managed (or not managed), how development happens (or doesn't), and why the best ones still leave." },
      { type: "paragraph", text: "Here's what we found." },

      { type: "subheading", text: "Personal training doesn't look like a profession." },
      { type: "paragraph", text: "Most trainers can see their numbers. They know how many clients they have, how much they're grossing, what their attendance looks like. The data isn't the problem." },
      { type: "paragraph", text: "The problem is that nobody has shown them how to turn those numbers into a trajectory. There's no clear path from year one to year five. No progression framework. No milestones that say \"when you hit this, you're ready for that.\" No roadmap that connects being a good trainer today to building a real, sustainable, well-compensated career tomorrow." },
      { type: "paragraph", text: "Compare this to almost any other profession. A nurse knows the path from RN to NP to specialist. An engineer knows the path from junior to senior to lead. A salesperson knows the path from SDR to AE to VP." },
      { type: "paragraph", text: "A personal trainer? They know they're training clients. They might know they want to make more money. But there's no structure showing them how to get there, what skills to develop, what benchmarks matter, or what \"senior trainer\" even means in a concrete, measurable way." },
      { type: "paragraph", text: "So when a SaaS company shows up offering $65K, a laptop, a title, and a career ladder? They leave. Not because they stopped caring about fitness. Because fitness never showed them a future." },

      { type: "subheading", text: "The coaches aren't being coached." },
      { type: "paragraph", text: "Ironic, isn't it? The coaches don't get coached." },
      { type: "paragraph", text: "Most fitness directors are drowning in admin: cross-referencing spreadsheets, checking schedules in MindBody, tracking attendance manually, running payroll, handling client complaints. The time left for actual trainer development? Almost zero." },
      { type: "paragraph", text: "One fitness director we work with was managing her entire training team using three separate Google Sheets and cross-referencing MindBody data. Weekly tasks in one. Consultations in another. Client intake in a third. She'd spend hours every week just trying to figure out who was struggling. By the time she identified a problem, it was usually too late. The trainer was already disengaged." },
      { type: "paragraph", text: "Trainers don't need a manager who watches their numbers. They need a coach who helps them understand what to do with those numbers. Someone who says, \"Your follow-up rate dropped 12% this month. Here's what that means, here's what's causing it, and here's how we fix it together.\"" },
      { type: "paragraph", text: "That conversation almost never happens. Not because directors don't care, but because they don't have the time or tools to make it happen consistently." },

      { type: "subheading", text: "There's no identity to hold onto." },
      { type: "paragraph", text: "Physical therapy has an identity. Nursing has an identity. Even real estate has an identity." },
      { type: "paragraph", text: "Personal training? The public still thinks of it as \"the person who counts your reps at the gym.\" The profession hasn't built the kind of credibility, standards, or public perception that makes someone proud to say \"I'm a personal trainer\" at a dinner party ten years into their career." },
      { type: "paragraph", text: "This matters more than it sounds. When a profession has a strong identity, its practitioners stick with it through the hard seasons. They invest in getting better because they believe the profession is worth investing in. They see themselves in it for the long haul." },
      { type: "paragraph", text: "When the identity is weak, trainers treat the work as transitional. Something they do while they figure out what they really want to do. And the industry's 80% turnover rate reflects exactly that." },

      { type: "heading", text: "What the 20% Have in Common" },
      { type: "paragraph", text: "The gyms with low trainer turnover aren't doing anything exotic. They're doing something simple that almost nobody else does: they treat the trainer career path like something worth building." },

      { type: "subheading", text: "They define what \"growth\" actually means." },
      { type: "paragraph", text: "Not just \"get more clients.\" Growth with structure. The best fitness directors we've worked with track four dimensions of trainer performance: self-management, coaching skill, communication, and teamwork." },
      { type: "paragraph", text: "When a trainer can see that their coaching skill score is elite but their client communication needs work, they have something specific to develop. That specificity transforms personal training from \"I show up and train people\" into \"I'm building a professional skill set with measurable dimensions.\" That's the difference between a job and a career." },

      { type: "subheading", text: "They diagnose problems, not just symptoms." },
      { type: "paragraph", text: "Knowing that a trainer has a 41% follow-up rate is useful. Knowing that it's a communication issue (not a coaching skill issue) is what lets you actually fix it." },
      { type: "paragraph", text: "The gyms that retain trainers don't just flag problems. They categorize them. A trainer losing clients because their programs aren't producing results needs a different conversation than a trainer losing clients because they never follow up after a missed session. The first needs technical development. The second needs a workflow fix. Treating both the same way is how you lose both." },

      { type: "subheading", text: "They make the future visible." },
      { type: "paragraph", text: "The trainers who stay past year one almost always have one thing in common: someone showed them a future in the profession." },
      { type: "paragraph", text: "Not just \"you could make more money.\" A real picture of what mastery looks like: deeper specializations, leadership roles, higher-value clients, mentor responsibilities, revenue milestones that compound year over year. A version of personal training that looks like a career, not a gig." },
      { type: "paragraph", text: "The best fitness directors create this visibility intentionally. Monthly growth reviews. Development paths with real milestones. Conversations that connect today's effort to next year's opportunity. Most gym software doesn't support this. So the directors who care do it manually, for hours, every week. Until they burn out too." },

      { type: "heading", text: "The Hidden Cost Nobody Calculates" },
      { type: "paragraph", text: "When a trainer leaves, the obvious costs are replacement and lost revenue. The hidden cost is what you can't see on a P&L." },
      { type: "list", items: [
        "The client who was three weeks from a breakthrough and now has to start over with someone new. They don't restart. They cancel.",
        "The other trainers on the floor who watched a colleague leave and started updating their own resumes. Research shows that burnt-out or disengaged employees are over twice as likely to influence coworkers to leave.",
        "The fitness director who just spent six months developing that trainer's skills, now starting over from scratch with a new hire who needs three months before they're even productive.",
        "The institutional knowledge that walked out the door: which clients need extra encouragement, which ones respond to data, which ones are quietly thinking about quitting.",
      ]},
      { type: "paragraph", text: "None of this shows up on a spreadsheet. All of it shows up in your retention rate, your revenue, and your culture." },

      { type: "heading", text: "The Window Is Closing" },
      { type: "paragraph", text: "Here's the uncomfortable truth: the gyms that figure out trainer retention in the next 12 to 24 months will have a compounding advantage over everyone else." },
      { type: "paragraph", text: "Good trainers will gravitate toward gyms that invest in their development. Clients will gravitate toward gyms with consistent, experienced coaching teams. Revenue will follow." },
      { type: "paragraph", text: "The gyms that keep cycling through trainers every nine months will keep paying the turnover tax, keep losing clients, and keep wondering why nothing sticks." },
      { type: "paragraph", text: "The 20% who stay aren't luckier than the 80% who leave. They're not tougher. They're not more passionate. They just landed somewhere that showed them a future worth staying for." },
      { type: "callout", text: "That's not a talent problem. That's a systems problem. And systems can be built." },

      { type: "sources", text: "Sources: Trainer turnover rate of 80% cited by American Spa / W.I.T.S., Alloy Franchise, FitSW, and Hapana. Employee replacement costs cited by Alloy Franchise (up to 200% of salary) and Club-OS (33% of salary). Median trainer wage of $46,180 from U.S. Bureau of Labor Statistics (May 2024). Coworker influence stat from Club Automation." },
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
      case "sources":
        return (
          <div key={index} style={{
            margin: "48px 0 24px 0", padding: "20px 24px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 12,
          }}>
            <p style={{
              fontFamily: f, fontSize: mobile ? 13 : 14, lineHeight: 1.7,
              color: "rgba(255,255,255,0.4)", margin: 0, fontStyle: "italic",
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
