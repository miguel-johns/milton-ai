'use client'

import { useCallback, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js'
import { createCheckoutSession } from '@/app/actions/stripe'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

interface CheckoutProps {
  productId: string
}

export function Checkout({ productId }: CheckoutProps) {
  const [showCheckout, setShowCheckout] = useState(false)

  const fetchClientSecret = useCallback(async () => {
    const { clientSecret } = await createCheckoutSession(productId)
    return clientSecret!
  }, [productId])

  if (!showCheckout) {
    return (
      <button
        onClick={() => setShowCheckout(true)}
        style={{
          width: '100%',
          padding: '16px 32px',
          borderRadius: 10,
          border: 'none',
          background: '#0B1628',
          color: '#FFFFFF',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'background 0.2s ease, transform 0.15s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#1a2536'
          e.currentTarget.style.transform = 'translateY(-1px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#0B1628'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        Start 7-Day Free Trial
      </button>
    )
  }

  return (
    <div id="checkout" style={{ minHeight: 400 }}>
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ fetchClientSecret }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
