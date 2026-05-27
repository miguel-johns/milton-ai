export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  interval?: 'month' | 'year'
  trialDays?: number
}

// Milton subscription product
export const PRODUCTS: Product[] = [
  {
    id: 'milton-subscription',
    name: 'Milton Subscription',
    description: 'AI assistant coach for personal trainers - 7 days free then $99/month',
    priceInCents: 9900, // $99.00
    interval: 'month',
    trialDays: 7,
  },
]
