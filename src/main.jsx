import React from 'react'
import ReactDOM from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import NewHomePage from './NewHomePage.jsx'

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
  // Currently only the new home page is accessible
  // All other routes have been hidden as requested
  return <NewHomePage />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>,
)
