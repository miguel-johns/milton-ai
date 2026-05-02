import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import NewHomePage from './NewHomePage.jsx'
import CoachesPage from './CoachesPage.jsx'
import GymsPage from './GymsPage.jsx'

// Note: The following imports are kept for reference but their routes are currently hidden.
// These pages can be re-enabled by adding their routes back to the App component.
// - MiltonHomepage (old home page in App.jsx)
// - DirectorDashboard, PricingCalculator, CaseStudy, AIConsultationPage
// - Insights, About, BookingPage, BookingSnapshotPage
// - ArticleDetail, Terms, Privacy, CoachCoPilot, AICoach
// - ConnectedPartners, WearableDevices, BodyScans, StrengthCardioEquipment
// - ManagementSoftware, NutritionFitnessApps, AIPoweredScheduling
// - AIReceptionist, AIBranding, AgenticCommerce, AIAcquisition
// - StripeCRM, ImplementationScience

function App() {
  const [route, setRoute] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => setRoute(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Handle link clicks for SPA navigation
  useEffect(() => {
    const handleClick = (e) => {
      const anchor = e.target.closest('a')
      if (anchor && anchor.href && anchor.origin === window.location.origin) {
        e.preventDefault()
        const path = anchor.pathname
        window.history.pushState({}, '', path)
        setRoute(path)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  // Route matching
  if (route === '/coaches') return <CoachesPage />
  if (route === '/gyms') return <GymsPage />
  
  // Default to home page
  return <NewHomePage />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>,
)
