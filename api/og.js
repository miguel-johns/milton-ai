// Dynamic OG meta tags for Insights articles
// This handles social media crawlers that need static HTML meta tags

const articles = {
  "ai-landscape-fitness": {
    title: "The AI Landscape in Fitness: What's Real, What's Hype, and What to Do About It",
    description: "We walked the floor at HFA 2026 and talked to every AI vendor in the space. Here's our honest breakdown of what's actually working in gyms right now — and what's still just a good demo.",
    image: "/images/blog/ai-landscape-fitness.jpg",
  },
  "four-pillars-fitness-director": {
    title: "The 4 Pillars Every Fitness Director Should Be Tracking — But Probably Isn't",
    description: "Self-management, coaching skill, communication, teamwork. A framework developed over 20 years of managing trainers, now powered by AI diagnostics.",
    image: "/images/blog/four-pillars.jpg",
  },
  "six-month-retention-cliff": {
    title: "The 6-Month Retention Cliff: Why It Matters and How to See It Coming",
    description: "If you keep a client past six months, they'll likely stay two years. But most gyms can't see the cliff until the client is already gone. Here's how to change that.",
    image: "/images/blog/retention-cliff.jpg",
  },
  "ai-receptionist-vs-copilot": {
    title: "AI Receptionist vs. AI Co-Pilot: Why the Industry Is Solving the Wrong Problem",
    description: "Every AI startup at HFA was selling the same thing — an AI that picks up your phone. Nobody was building the thing gym owners actually need: intelligence for the people already doing the work.",
    image: "/images/blog/ai-receptionist-vs-copilot.jpg",
  },
  "best-trainer-leaving-signals": {
    title: "Your Best Trainer Is About to Leave. Here Are the Signals You're Missing.",
    description: "Trainer churn rarely happens overnight. There are behavioral signals weeks before the resignation — and most fitness directors aren't tracking them.",
    image: "/images/blog/best-trainer-leaving.jpg",
  },
  "spreadsheets-to-dashboard-migration": {
    title: "From 8 Data Sources to 1 Dashboard: A Fitness Director's Migration Story",
    description: "How one fitness director replaced 20 years of manual tracking with an AI-powered command center — and what she learned along the way.",
    image: "/images/blog/data-sources-dashboard.jpg",
  },
  "introducing-fitness-director-copilot": {
    title: "Introducing the Fitness Director Co-Pilot",
    description: "We're launching the most requested feature in Milton's history — a single intelligent dashboard that shows every trainer's performance, gaps, and development path.",
    image: "/images/blog/fitness-director-copilot.jpg",
  },
  "revenue-per-trainer-how-to-move-it": {
    title: "Revenue Per Trainer: You Know the Number. Here's How to Move It.",
    description: "A trainer plateaus at $8,000/month. You know they could be at $12,000. Revenue is a scoreboard — it tells you who's winning, but not how to coach the game.",
    image: "/images/blog/revenue-per-trainer.jpg",
  },
};

export const config = {
  runtime: 'edge',
};

export default function handler(request) {
  const url = new URL(request.url);
  // Extract slug from query param or path
  const slug = url.searchParams.get('slug') || url.pathname.split('/').filter(Boolean).pop();
  const article = articles[slug];
  
  const baseUrl = "https://getmilton.com";
  
  // Default fallback
  const title = article?.title || "Milton — The AI Operating System for Personal Training Businesses";
  const description = article?.description || "The AI operating system for gyms and personal training studios. Co-pilots for coaches, directors, and members.";
  const image = article?.image ? `${baseUrl}${article.image}` : `${baseUrl}/og-image.png`;
  const articleUrl = article ? `${baseUrl}/#/insights/${slug}` : baseUrl;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} | Milton AI</title>
  <meta name="description" content="${description}" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${articleUrl}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:site_name" content="Milton AI" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="${articleUrl}" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${image}" />
  
  <!-- Redirect to actual article -->
  <meta http-equiv="refresh" content="0;url=${articleUrl}" />
</head>
<body>
  <p>Redirecting to <a href="${articleUrl}">${title}</a>...</p>
</body>
</html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
