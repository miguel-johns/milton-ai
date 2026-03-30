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
  "four-pillars-fitness-director": {
    id: 3,
    slug: "four-pillars-fitness-director",
    category: "FITNESS DIRECTOR PLAYBOOK",
    categoryColor: "#f0a030",
    title: "The 4 Pillars Every Fitness Director Should Be Tracking — But Probably Isn't",
    date: "March 12, 2026",
    readTime: "7 min read",
    content: [
      { type: "paragraph", text: "A fitness director in Wichita told us something last year that changed how we think about trainer development." },
      { type: "quote", text: "I can tell you which trainers are bringing in revenue. I can tell you who's hitting their session targets. I can even tell you why a trainer is slipping, whether it's skill, motivation, or communication. But getting to that answer takes me hours every week. Three spreadsheets, cross-referencing MindBody, doing the math in my head. By the time I've built the picture, half the week is gone." },
      { type: "paragraph", text: "She'd been managing trainers for nearly two decades. She was one of the best in the business. She wasn't guessing. She was doing the work. The problem was that the work took an absurd amount of time." },
      { type: "paragraph", text: "Not because she wasn't smart enough. Because the tools she had only showed her raw outcomes. Revenue. Sessions. Attendance. The what. Getting to the why meant hours of manual detective work, every single week." },

      { type: "heading", text: "The Metrics That Miss the Point" },
      { type: "paragraph", text: "Most gym software tracks the same things: how many sessions a trainer delivered, how much revenue they generated, how many clients they have. These are important numbers. Nobody's arguing otherwise." },
      { type: "paragraph", text: "But they're lagging indicators. By the time revenue drops, the problem has been festering for weeks. By the time a client cancels, the warning signs were there a month ago. By the time a trainer quits, the disengagement started long before the resignation text." },
      { type: "paragraph", text: "Lagging indicators tell you what already happened. They don't tell you what's about to happen. And they definitely don't tell you what to do about it." },
      { type: "callout", text: "They can see the scoreboard, but they can't see the game." },

      { type: "heading", text: "A Framework Born on the Training Floor" },
      { type: "paragraph", text: "The four-pillar framework didn't come from a whiteboard or a consulting firm. It came from a fitness director who spent nearly 20 years hiring, developing, and trying to retain personal trainers in a market where 80% of them leave within a year." },
      { type: "paragraph", text: "Over those two decades, she noticed a pattern. The trainers who thrived and stayed long-term weren't just good at one thing. They were solid across four distinct categories. And the trainers who struggled or left almost always had a specific breakdown in one of those categories, not a general failure across the board." },
      { type: "paragraph", text: "The problem was that traditional metrics couldn't distinguish between them. A trainer losing clients because their programming wasn't producing results looked the same on a spreadsheet as a trainer losing clients because they never followed up after a missed session. Same outcome. Completely different root cause. Completely different fix." },
      { type: "paragraph", text: "So she built a framework. Four pillars. Four diagnostic categories. Each one measuring a different dimension of what makes a personal trainer successful." },

      { type: "heading", text: "The Four Pillars" },

      { type: "subheading", text: "Pillar 1: Self-Management" },
      { type: "paragraph", text: "This is the foundation. Before a trainer can be effective with clients, they need to be effective with themselves." },
      { type: "paragraph", text: "Self-management is about the operational basics: Are they showing up on time? Managing their schedule without constant reminders? Completing administrative tasks (session notes, program updates, client intake paperwork) without being chased? Are they prepared for each session or scrambling when the client walks in?" },
      { type: "paragraph", text: "This sounds basic. It is basic. And it's where a surprising number of trainers fall apart, especially in their first year." },
      { type: "paragraph", text: "The tricky thing about self-management problems is that they're invisible to the client at first. A trainer who's disorganized behind the scenes can still deliver a solid session. But the cracks show over time: the missed follow-up, the forgotten detail, the program that hasn't been updated in three weeks. Clients feel it before they can articulate it. And then they leave." },
      { type: "advice", title: "When self-management is the issue", text: "The fix isn't a conversation about coaching skill. It's a conversation about systems and habits. Give them better tools, clearer workflows, and consistent accountability. Most self-management problems are solved by structure, not talent." },

      { type: "subheading", text: "Pillar 2: Coaching Skill" },
      { type: "paragraph", text: "This is what most people think of when they think of trainer quality: Can they actually train people well?" },
      { type: "paragraph", text: "Coaching skill covers programming knowledge, exercise selection, progressive overload logic, the ability to modify on the fly, understanding periodization, and the technical competence to keep clients safe while pushing them toward results." },
      { type: "paragraph", text: "Are clients seeing measurable progress? Are programs actually progressing or just repeating the same workout every week? Is the trainer tracking load, volume, and intensity, or are they winging it?" },
      { type: "paragraph", text: "This is the one pillar that most gyms do evaluate, at least informally. Fitness directors can usually spot a trainer with weak technical skills. The challenge is separating coaching skill from other problems. A trainer whose clients aren't seeing results might have a programming issue. Or they might have a communication issue (clients aren't following the nutrition plan). Or a self-management issue (they're not reviewing session data before appointments and are repeating old workouts)." },
      { type: "advice", title: "The diagnostic trap", text: "If you treat a communication problem like a coaching skill problem, you'll send a trainer to a programming workshop when what they actually need is a follow-up workflow. You'll waste time, money, and trust." },

      { type: "subheading", text: "Pillar 3: Communication" },
      { type: "paragraph", text: "This is the pillar that separates good trainers from great ones. And it's the one almost nobody tracks." },
      { type: "paragraph", text: "Communication covers everything that happens between sessions: follow-ups after workouts, check-ins between appointments, responses to client messages, re-engagement after a no-show, and the quality and timeliness of all of it." },
      { type: "paragraph", text: "The single most predictive metric in this pillar is follow-up rate. How consistently does a trainer reach out to clients after a session or after a missed appointment? The gyms we work with that track this number see a direct correlation between follow-up rate and client retention. It's not subtle. It's dramatic." },
      { type: "callout", text: "A trainer with a 90%+ follow-up rate will retain clients at nearly double the rate of a trainer at 40%." },
      { type: "paragraph", text: "Most fitness directors know this intuitively. But almost none of them can tell you any trainer's actual follow-up rate. It's not tracked. It's not measured. It's just hoped for." },
      { type: "advice", title: "When communication is the breakdown", text: "The fix isn't more certifications or better programming. It's workflow: templates, reminders, draft messages, systems that make follow-up effortless instead of another thing on an already overloaded to-do list." },

      { type: "subheading", text: "Pillar 4: Teamwork" },
      { type: "paragraph", text: "This is the pillar that matters most for culture and longevity, and it's the hardest to quantify." },
      { type: "paragraph", text: "Teamwork measures how a trainer contributes to the gym beyond their own client book. Are they helping onboard new trainers? Sharing what works with the rest of the team? Picking up sessions when someone's sick? Contributing positively to the gym's culture and energy?" },
      { type: "paragraph", text: "A trainer who scores high on the other three pillars but low on teamwork is a flight risk. They're building their own brand, not investing in the gym's. They might be producing great individual results, but they're not creating the kind of team dynamic that makes other trainers want to stay." },
      { type: "paragraph", text: "On the flip side, a trainer with developing skills but strong teamwork is often worth more long-term investment than a technical star who operates as an island. The team player creates a culture of development. The island creates a culture of every-trainer-for-themselves." },
      { type: "advice", title: "The canary in the coal mine", text: "Teamwork is also the early warning system for cultural problems. When teamwork scores drop across multiple trainers, something systemic is wrong: management, compensation, workload, or leadership." },

      { type: "heading", text: "Why This Changes Everything" },
      { type: "paragraph", text: "The power of the four pillars isn't in any individual metric. It's in the diagnostic clarity they create together." },
      { type: "paragraph", text: "When a fitness director can look at a trainer and see: \"Coaching skill is strong. Self-management is solid. Communication is falling off a cliff. Teamwork is steady.\" That's not a mystery anymore. That's a specific, actionable conversation: \"Your clients love your sessions. But you're not following up between appointments and it's costing you retention. Let's fix that.\"" },
      { type: "paragraph", text: "Compare that to the typical approach: \"Jake, your numbers are down this month. What's going on?\" That conversation goes nowhere. The trainer gets defensive. The director gets frustrated. Nobody learns anything. The numbers keep dropping." },
      { type: "callout", text: "Four pillars turns vague concern into precise diagnosis. It turns difficult conversations into productive ones. And it turns trainer development from a guessing game into a system." },

      { type: "heading", text: "The Spreadsheet Problem" },
      { type: "paragraph", text: "If you're a fitness director reading this and thinking \"I should track these four things,\" you're right. You should." },
      { type: "paragraph", text: "But here's the honest reality: doing it manually is brutal." },
      { type: "paragraph", text: "The fitness director who developed this framework with us was tracking all four pillars. In spreadsheets. Cross-referenced with MindBody data. Every week. For every trainer." },
      { type: "paragraph", text: "It worked. Her retention was better than the industry average by a wide margin. Her trainers stayed longer. Her clients stayed longer. The framework was right." },
      { type: "paragraph", text: "But the process was unsustainable. Hours per week of manual data entry and cross-referencing. One person holding the entire system together in their head. No way to scale it, share it, or maintain it if she took a week off." },
      { type: "paragraph", text: "This is the problem Milton was built to solve. Not to replace the framework, but to operationalize it. To take the diagnostic intelligence that took 20 years to develop and make it available in real time, automatically, for every trainer on the floor." },
      { type: "paragraph", text: "When a trainer's communication score drops, the director sees it that week. Not that month. Not that quarter. That week. With the specific data behind it: follow-up rate, response times, no-show re-engagement. The diagnosis is right there. The conversation is ready." },

      { type: "heading", text: "Start With One Pillar" },
      { type: "paragraph", text: "You don't need software to start using this framework. You don't even need to track all four pillars at once." },
      { type: "paragraph", text: "Start with communication. Specifically, start with follow-up rate." },
      { type: "paragraph", text: "Pick one week. For every trainer on your team, track how many sessions they delivered and how many post-session follow-ups they sent (text, email, app message, anything). Divide follow-ups by sessions. That's their follow-up rate." },
      { type: "paragraph", text: "You will be surprised by the spread. Some trainers will be at 90%+. Others will be below 30%. And when you compare those numbers to client retention, the pattern will be unmistakable." },
      { type: "paragraph", text: "That one number will tell you more about your team's health than a month of revenue reports." },
      { type: "paragraph", text: "Then add the other three pillars over time. Build the system. See the full picture." },
      { type: "callout", text: "The trainers who are struggling will finally get the right kind of help. The trainers who are thriving will finally get the recognition they deserve. And you'll stop managing by gut feeling and start managing by signal." },
    ],
  },
  "six-month-retention-cliff": {
    id: 4,
    slug: "six-month-retention-cliff",
    category: "INDUSTRY DATA",
    categoryColor: "#e85454",
    title: "The 6-Month Retention Cliff: Why It Matters and How to See It Coming",
    date: "March 5, 2026",
    readTime: "7 min read",
    content: [
      { type: "paragraph", text: "A fitness director we work with in Wichita noticed something strange in her data." },
      { type: "paragraph", text: "She was tracking client tenure across her entire training team. Not just who canceled, but when. Not just the number, but the pattern. And after years of paying attention, a shape emerged." },
      { type: "paragraph", text: "Clients didn't leave at random. They left at predictable moments. There was a spike in the first few weeks (buyer's remorse, bad fit, sticker shock). There was another spike around three months. And then there was the big one: six months." },
      { type: "paragraph", text: "The six-month mark was where her team lost more clients than any other window. Not the first week. Not the first month. Six months." },
      { type: "paragraph", text: "The strange part? The clients who made it past six months almost never left. They'd stick around for two years. Three years. Some of them were still training five years later." },
      { type: "paragraph", text: "She called it the cliff. And once she saw it, she couldn't unsee it." },

      { type: "heading", text: "The Data Behind the Drop" },
      { type: "paragraph", text: "This isn't just one director's observation. The research backs it up across the board." },
      { type: "paragraph", text: "Multiple studies and industry sources cite the same finding: approximately 50% of people who begin an exercise program will drop out within the first six months. A study published through the National Institutes of Health (PMC) reported that this statistic has been widely replicated across different populations and settings." },
      { type: "paragraph", text: "Research on older adults found that 48% drop out within the first six months. A large-scale study of over 500,000 fitness app users found that only 18.1% of beginners were still adherent at the six-month mark, with a median dropout time of just 14 weeks." },
      { type: "paragraph", text: "Industry data from PerfectGym identifies 3 months and 6 months as the two key cancellation milestones for gym members. GymMaster reports that 30% of new members cancel within three months alone." },
      { type: "paragraph", text: "The pattern is consistent: the first six months are a gauntlet. And the six-month mark is the steepest drop." },
      { type: "paragraph", text: "But here's the part that changes everything." },

      { type: "heading", text: "The Other Side of the Cliff" },
      { type: "paragraph", text: "The same body of research that documents the dropout also documents what happens to the people who survive it." },
      { type: "paragraph", text: "The STRRIDE randomized trials (Studies of a Targeted Risk Reduction Intervention through Defined Exercise) tracked nearly 950 adults through 6-to-8-month structured exercise interventions. Among participants who made it through the initial ramp-up period, adherence did not decline over the remaining months of training. They stayed." },
      { type: "paragraph", text: "Behavior change theory has a framework for this. The Transtheoretical Model (Prochaska & DiClemente, 1982) identifies the first six months of a new behavior as the \"action\" phase. After six months of sustained behavior, individuals transition into the \"maintenance\" phase, where the behavior becomes more automatic and the risk of relapse drops significantly." },
      { type: "callout", text: "Getting a client to month seven is worth more than getting three new clients to month one." },

      { type: "heading", text: "Why Nobody Sees It" },
      { type: "paragraph", text: "If the cliff is this well-documented, why do most gym owners and fitness directors miss it? Three reasons." },

      { type: "subheading", text: "They're measuring the wrong timeframe." },
      { type: "paragraph", text: "Most gyms look at retention on a monthly or annual basis. Monthly reports show churn as a flat percentage: \"we lost 8% of clients this month.\" Annual reports show a yearly average. Neither view reveals the curve." },
      { type: "paragraph", text: "The cliff only becomes visible when you track client tenure as a distribution. You have to look at every client who's ever canceled and plot when they canceled relative to their start date. When you do that, the spike at six months jumps off the page. But almost nobody does that analysis. They're too busy running the gym." },

      { type: "subheading", text: "They're focused on acquisition, not tenure." },
      { type: "paragraph", text: "When a gym loses a client, the instinct is to replace them. Sign someone new. Run a promotion. Fill the slot. The replacement treadmill is so consuming that nobody steps back to ask: \"When exactly are we losing people, and what's happening at that moment?\"" },
      { type: "paragraph", text: "Acquisition is visible and urgent. Retention is invisible until the damage compounds. And by the time you notice the compound damage, you've already paid for it." },

      { type: "subheading", text: "Their tools don't surface it." },
      { type: "paragraph", text: "Standard gym management software tracks billing and scheduling. It can tell you who canceled. It can tell you when their last payment was. But it doesn't flag \"this client is at 4.5 months and their attendance has dropped 40% in the last three weeks.\" It doesn't connect the behavioral signals to the tenure timeline." },

      { type: "heading", text: "What Happens at Six Months" },
      { type: "paragraph", text: "Understanding that the cliff exists is step one. Understanding why it exists is what lets you do something about it. Here's what we've observed across the training businesses we work with." },

      { type: "subheading", text: "The novelty has worn off." },
      { type: "paragraph", text: "At month one, everything is new. New gym, new trainer, new routine, new soreness. Novelty is a powerful motivator. By month six, the novelty is gone. The routine is just a routine. The early rapid gains have plateaued. The client has to find a deeper reason to keep going, and if nobody helps them find it, they drift." },

      { type: "subheading", text: "Results have stalled (or feel like they have)." },
      { type: "paragraph", text: "Most clients see visible progress in the first 8 to 12 weeks: weight lost, strength gained, clothes fitting differently. Around month four or five, that visible progress slows. The body adapts. The gains become more incremental. Without context (\"you've added 40 lbs to your squat in five months, that's exceptional\"), the client interprets the plateau as failure. They think it stopped working." },

      { type: "subheading", text: "Life intervenes." },
      { type: "paragraph", text: "Six months is long enough for life to throw curveballs: a work project, a family obligation, a vacation, an illness. Each interruption creates an off-ramp. If the gym doesn't actively pull the client back after a disruption, the disruption becomes permanent. Two missed sessions become four. Four become \"I'll start again Monday.\" Monday never comes." },

      { type: "subheading", text: "The trainer relationship hasn't deepened." },
      { type: "paragraph", text: "In the best scenarios, the trainer-client relationship evolves over time. The trainer learns the client's patterns, preferences, and triggers. The client feels known. Feeling known is what makes someone say \"I can't quit, my trainer would notice.\"" },
      { type: "paragraph", text: "When that relationship stays surface-level after six months (still just counting reps, still no personalized communication between sessions), the client has no emotional anchor. They're paying for a service, not invested in a relationship. Services are easy to cancel." },

      { type: "heading", text: "How to See It Coming" },
      { type: "paragraph", text: "The cliff is predictable. That means it's preventable. But only if you can see the warning signs before the client reaches the edge. Here's what to watch for in the 4-to-6-month window." },
      { type: "list", items: [
        "Attendance frequency drops. Not a sudden stop. A gradual fade. Three sessions a week becomes two. Two becomes \"I'll make it up next week.\" This is the earliest signal and the most reliable one.",
        "Communication goes one-directional. The client stops initiating. They still respond when the trainer reaches out, but the texts, the questions, the session requests dry up. The engagement is passive, not active.",
        "Cancellations and reschedules increase. One or two are normal. A pattern of three or more in a month at the 4-to-6-month mark is a red flag.",
        "The client stops talking about goals. Early on, clients talk about what they're working toward. When they stop mentioning goals, they've mentally disconnected the training from an outcome.",
      ]},
      { type: "paragraph", text: "None of these signals are definitive on their own. But in combination, during the 4-to-6-month window, they paint a clear picture: this client is approaching the cliff." },

      { type: "heading", text: "What the Best Directors Do About It" },
      { type: "paragraph", text: "The fitness directors who beat the cliff don't wait for it. They engineer the client experience around it." },
      { type: "list", items: [
        "They create a milestone at month five or six. A reassessment. A progress review. A new phase of programming. Something that gives the client a reason to look forward, not backward.",
        "They arm their trainers with data. Not just \"check in with your client.\" Specific data: \"Sarah's attendance dropped from 3x to 1.8x per week over the last three weeks. She's at month five. Reach out today.\"",
        "They track tenure, not just attendance. Knowing a client came twice this week is good. Knowing that same client is at 5.5 months and their frequency just dropped below their 90-day average is what lets you act before the cliff.",
        "They celebrate the milestone. Getting to six months is an achievement. Most people don't make it. The clients who do should know that.",
      ]},

      { type: "heading", text: "The Compounding Value of Month Seven" },
      { type: "paragraph", text: "Here's the math that should change how every gym owner thinks about retention." },
      { type: "paragraph", text: "If a client pays $500 per month for personal training and leaves at month six, that's $3,000 in lifetime revenue." },
      { type: "paragraph", text: "If that same client makes it to month seven and stays for two years (which the data suggests is the likely outcome once they cross the cliff), that's $12,000 in lifetime revenue." },
      { type: "callout", text: "Same client. Same acquisition cost. Four times the value. The only difference is whether someone was paying attention during months four, five, and six." },

      { type: "heading", text: "One Number to Start With" },
      { type: "paragraph", text: "If you take one thing from this article, track this: for every client who cancels, note how many months they'd been training." },
      { type: "paragraph", text: "Do it for three months. Plot the data. You'll see the cliff." },
      { type: "paragraph", text: "And once you see it, you'll know exactly where to focus." },

      { type: "sources", text: "Sources: 50% dropout within 6 months cited by multiple studies via NIH/PMC. 48% dropout rate among older adults from Morey et al. (2002), cited in PMC. 18.1% beginner adherence at 6 months from a 2026 SportRxiv study of 522,994 fitness app users. STRRIDE trial adherence data from PMC (2022). Transtheoretical Model of behavior change from Prochaska & DiClemente (1982). 3-month and 6-month cancellation milestones from PerfectGym. 30% cancel within 3 months from GymMaster." },
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
