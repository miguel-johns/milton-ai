import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'

console.log("[v0] main.jsx starting - imports beginning")

import MiltonHomepage from './App.jsx'
console.log("[v0] MiltonHomepage imported")
import PricingCalculator from './Pricing.jsx'
console.log("[v0] PricingCalculator imported")
import CaseStudy from './CaseStudy.jsx'
console.log("[v0] CaseStudy imported")
import AIConsultation from './Consultation.jsx'
console.log("[v0] AIConsultation imported")
import Insights from './Insights.jsx'
console.log("[v0] Insights imported")
import About from './About.jsx'
console.log("[v0] About imported")
import BookingPage from './Booking.jsx'
console.log("[v0] BookingPage imported")
import BookingSnapshotPage from './BookingSnapshot.jsx'
console.log("[v0] BookingSnapshotPage imported")
import SharedNav from './SharedNav.jsx'
console.log("[v0] SharedNav imported")
import SharedFooter from './SharedFooter.jsx'
console.log("[v0] SharedFooter imported")
import ArticleDetail from './ArticleDetail.jsx'
console.log("[v0] ArticleDetail imported")
import Terms from './Terms.jsx'
console.log("[v0] Terms imported")
import Privacy from './Privacy.jsx'
console.log("[v0] Privacy imported")
import ThePlatform from './ThePlatform.jsx'
console.log("[v0] ThePlatform imported - all imports complete")

function App() {
  console.log("[v0] App component rendering")
  const [page, setPage] = useState(() => {
    const hash = window.location.hash.slice(1) || '/'
    return hash
  })

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || '/'
      setPage(hash)
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Determine which page content to render
  let PageContent;
  if (page === '/pricing') {
    PageContent = <PricingCalculator />
  } else if (page === '/case-study/optimal-performance') {
    PageContent = <CaseStudy />
  } else if (page === '/consultation') {
    PageContent = <AIConsultation />
  } else if (page === '/insights') {
    PageContent = <Insights />
  } else if (page === '/about') {
    PageContent = <About />
  } else if (page === '/book') {
    PageContent = <BookingPage />
  } else if (page === '/book-snapshot') {
    PageContent = <BookingSnapshotPage />
  } else if (page.startsWith('/insights/')) {
    const slug = page.replace('/insights/', '')
    PageContent = <ArticleDetail slug={slug} />
  } else if (page === '/terms') {
    PageContent = <Terms />
  } else if (page === '/privacy') {
    PageContent = <Privacy />
  } else if (page === '/the-platform') {
    PageContent = <ThePlatform />
  } else {
    PageContent = <MiltonHomepage />
  }

  return (
    <div style={{ minHeight: "100vh", background: "#061c27", color: "#fff", position: "relative", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap" rel="stylesheet" />
      
      {/* Aurora bg */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 50% at 20% 20%, rgba(13,154,165,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(154,241,152,0.04) 0%, transparent 50%), radial-gradient(ellipse 90% 60% at 50% 0%, rgba(8,69,94,0.3) 0%, transparent 70%)",
      }} />

      <SharedNav />
      {PageContent}
      <SharedFooter />
    </div>
  )
}

console.log("[v0] About to mount React app")
const rootElement = document.getElementById('root')
console.log("[v0] Root element found:", rootElement)

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>,
)
console.log("[v0] React render called")
