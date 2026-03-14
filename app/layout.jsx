import { DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata = {
  title: 'Milton AI – AI-Powered Coaching for Fitness Businesses',
  description: 'Milton AI helps fitness coaches and gym owners scale their business with intelligent automation, member engagement, and personalized coaching at scale.',
  keywords: 'AI coaching, fitness AI, gym management, personal training, fitness business',
  openGraph: {
    title: 'Milton AI – AI-Powered Coaching for Fitness Businesses',
    description: 'Scale your fitness business with intelligent AI coaching automation.',
    type: 'website',
  },
}

export const viewport = {
  themeColor: '#08455e',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
