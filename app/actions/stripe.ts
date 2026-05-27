'use server'

import { stripe } from '@/lib/stripe'
import { PRODUCTS } from '@/lib/products'

export async function createCheckoutSession(productId: string) {
  const product = PRODUCTS.find((p) => p.id === productId)
  
  if (!product) {
    throw new Error('Product not found')
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  const session = await stripe.checkout.sessions.create({
    mode: product.interval ? 'subscription' : 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: product.priceInCents,
          ...(product.interval && {
            recurring: {
              interval: product.interval,
            },
          }),
        },
        quantity: 1,
      },
    ],
    ...(product.trialDays && {
      subscription_data: {
        trial_period_days: product.trialDays,
      },
    }),
    ui_mode: 'embedded',
    return_url: `${baseUrl}/for-coaches?session_id={CHECKOUT_SESSION_ID}`,
  })

  return {
    clientSecret: session.client_secret,
  }
}

export async function getCheckoutSession(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId)
  return {
    status: session.status,
    customerEmail: session.customer_details?.email,
  }
}
