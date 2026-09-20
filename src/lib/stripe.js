import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


export const PLAN_PRICE_ID = {
    'seeker_pro': 'price_1UH3aSHJwNpRZkaqFOiRNwZA',
    'seeker_premium': 'price_1UH6MGHJwNpRZkaqpoWMpXON',
    'recruiter_growth': 'price_1UH6OkHJwNpRZkaqgJ3hit5c',
    'recruiter_enterprise': 'price_1UH6PxHJwNpRZkaqjhzbN2Fa'
}

