import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import MiltonHomepage from './App.jsx'
import PricingCalculator from './Pricing.jsx'
import CaseStudy from './CaseStudy.jsx'

function App() {
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

  if (page === '/pricing') {
    return <PricingCalculator />
  }

  if (page === '/case-study/optimal-performance') {
    return <CaseStudy />
  }
  
  return <MiltonHomepage />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>,
)
