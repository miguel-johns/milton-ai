import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import NewHomepage from './NewHomepage.jsx'
import ForTrainerManagers from './ForTrainerManagers.jsx'
import MiltonHomepage from './App.jsx'
import DirectorDashboard from './DirectorDashboard.jsx'
import PricingCalculator from './Pricing.jsx'
import CaseStudy from './CaseStudy.jsx'
import AIConsultationPage from './AIConsultation.jsx'
import Insights from './Insights.jsx'
import About from './About.jsx'
import BookingPage from './Booking.jsx'
import BookingSnapshotPage from './BookingSnapshot.jsx'
import SharedNav from './SharedNav.jsx'
import SharedFooter from './SharedFooter.jsx'
import ArticleDetail from './ArticleDetail.jsx'
import Terms from './Terms.jsx'
import Privacy from './Privacy.jsx'
import CoachCoPilot from './CoachCoPilot.jsx'
import AICoach from './AICoach.jsx'
import ConnectedPartners from './ConnectedPartners.jsx'
import WearableDevices from './WearableDevices.jsx'
import BodyScans from './BodyScans.jsx'
import StrengthCardioEquipment from './StrengthCardioEquipment.jsx'
import ManagementSoftware from './ManagementSoftware.jsx'
import NutritionFitnessApps from './NutritionFitnessApps.jsx'
import AIPoweredScheduling from './AIPoweredScheduling.jsx'
import AIReceptionist from './AIReceptionist.jsx'
import AIBranding from './AIBranding.jsx'
import AgenticCommerce from './AgenticCommerce.jsx'
import AIAcquisition from './AIAcquisition.jsx'
import StripeCRM from './StripeCRM.jsx'
import ImplementationScience from './ImplementationScience.jsx'
import InquireModal from './InquireModal.jsx'

function App() {
  const [inquireModalOpen, setInquireModalOpen] = useState(false)
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

  // Listen for custom event to open inquire modal from any component
  useEffect(() => {
    const handleOpenInquireModal = () => setInquireModalOpen(true)
    window.addEventListener('openInquireModal', handleOpenInquireModal)
    return () => window.removeEventListener('openInquireModal', handleOpenInquireModal)
  }, [])

  // Determine which page content to render
  let PageContent;
  if (page === '/pricing') {
    PageContent = <PricingCalculator />
  } else if (page === '/case-study/optimal-performance') {
    PageContent = <CaseStudy />
  } else if (page === '/consultation') {
    PageContent = <AIConsultationPage />
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
  } else if (page === '/coach-copilot') {
    PageContent = <CoachCoPilot />
  } else if (page === '/ai-coach') {
    PageContent = <AICoach />
  } else if (page === '/scheduling') {
    PageContent = <AIPoweredScheduling />
  } else if (page === '/receptionist') {
    PageContent = <AIReceptionist />
  } else if (page === '/websites') {
    PageContent = <AIBranding />
  } else if (page === '/agentic-commerce') {
    PageContent = <AgenticCommerce />
  } else if (page === '/acquisition') {
    PageContent = <AIAcquisition />
  } else if (page === '/stripe-crm') {
    PageContent = <StripeCRM />
  } else if (page === '/implementation') {
    PageContent = <ImplementationScience />
  } else if (page === '/director-dashboard') {
    PageContent = <DirectorDashboard />
  } else if (page === '/partners') {
    PageContent = <ConnectedPartners />
  } else if (page === '/partners/wearables') {
    PageContent = <WearableDevices />
  } else if (page === '/partners/body-scans') {
    PageContent = <BodyScans />
  } else if (page === '/partners/equipment') {
    PageContent = <StrengthCardioEquipment />
  } else if (page === '/partners/software') {
    PageContent = <ManagementSoftware />
  } else if (page === '/partners/apps') {
    PageContent = <NutritionFitnessApps />
  } else if (page === '/for-trainer-managers') {
    PageContent = <ForTrainerManagers />
  } else if (page === '/old-home') {
    // Hidden route for old home page
    PageContent = <MiltonHomepage />
  } else {
    // New chat-based home page is the default
    PageContent = <NewHomepage />
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0B1628", color: "#fff", position: "relative", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap" rel="stylesheet" />
      
      {/* Aurora bg */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 50% at 20% 20%, rgba(13,154,165,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(154,241,152,0.03) 0%, transparent 50%), radial-gradient(ellipse 90% 60% at 50% 0%, rgba(11,22,40,0.4) 0%, transparent 70%)",
      }} />

      <SharedNav onInquireClick={() => setInquireModalOpen(true)} />
      {PageContent}
      <SharedFooter />
      <InquireModal isOpen={inquireModalOpen} onClose={() => setInquireModalOpen(false)} />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>,
)
