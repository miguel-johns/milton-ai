# Milton AI Website

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Deploy to Vercel

### Option A: Import from GitHub (Recommended)

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repo
4. Vercel auto-detects Vite — just click **Deploy**
5. Done. Every push to `main` auto-deploys.

### Option B: Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts. For production:

```bash
vercel --prod
```

### Custom Domain

In your Vercel project dashboard → **Settings → Domains** → add `getmilton.com` (or any domain). Then update your DNS to point to Vercel.
