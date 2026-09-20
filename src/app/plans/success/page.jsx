import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'

import { Card } from '@heroui/react'
import {
    CircleCheck,
    Envelope,
    ArrowRight,
    ShieldCheck,
} from '@gravity-ui/icons'
import { createSubscription } from '@/lib/actions/subscriptions'

export default async function Success({ searchParams }) {
    const params = await searchParams
    const session_id = params?.session_id

    if (!session_id) {
        throw new Error('Please provide a valid session_id (`cs_test_...`)')
    }

    const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent'],
    })


    const status = session.status
    const customerEmail = session.customer_details?.email

    if (status === 'open') {
        redirect('/')
    }

    if (status === 'complete') {
        const subsInfo = {
            sessionId: session.id,
            email: session.customer_email || customerEmail,
            planId: session.metadata.planId,
        }

        // update the user tabel about the new plan

        const result = await createSubscription(subsInfo);
        console.log(result);

        return (
            <main className="min-h-screen bg-[#09090b] px-4 py-10 sm:py-16">
                <div className="mx-auto flex min-h-[80vh] w-full max-w-xl items-center justify-center">
                    <div className="w-full">

                        {/* Main Card */}
                        <Card
                            shadow="lg"
                            className="overflow-hidden border border-white/10 bg-[#111113]"
                        >
                            {/* Header */}
                            <div className="px-6 pb-8 pt-10 text-center sm:px-10 sm:pt-12">

                                {/* Success Icon */}
                                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/20">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/20">
                                        <CircleCheck
                                            width={36}
                                            height={36}
                                            className="text-white"
                                        />
                                    </div>
                                </div>

                                {/* Title */}
                                <h1 className="mt-7 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                    Payment Successful!
                                </h1>

                                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-400 sm:text-base">
                                    Thank you for your purchase. Your payment has been
                                    successfully processed.
                                </p>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-white/10" />

                            {/* Content */}
                            <div className="space-y-4 px-6 py-7 sm:px-10 sm:py-8">

                                {/* Payment Status */}
                                <div className="flex items-center justify-between rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                                    <div>
                                        <p className="text-sm text-zinc-500">
                                            Payment status
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-emerald-400 sm:text-base">
                                            Completed
                                        </p>
                                    </div>

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
                                        <CircleCheck
                                            width={22}
                                            height={22}
                                            className="text-emerald-400"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="rounded-2xl border border-white/10 bg-[#18181b] p-5">
                                    <div className="flex items-center gap-4">

                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#202023]">
                                            <Envelope
                                                width={21}
                                                height={21}
                                                className="text-zinc-400"
                                            />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-sm text-zinc-500">
                                                Confirmation email
                                            </p>

                                            <p className="mt-1 break-all text-sm font-semibold text-white sm:text-base">
                                                {customerEmail || 'Your email address'}
                                            </p>
                                        </div>

                                    </div>
                                </div>

                                {/* Information */}
                                <div className="rounded-2xl border border-white/10 bg-[#0d0d0f] p-5">
                                    <div className="flex gap-3">

                                        <ShieldCheck
                                            width={20}
                                            height={20}
                                            className="mt-0.5 shrink-0 text-zinc-500"
                                        />

                                        <p className="text-sm leading-6 text-zinc-500">
                                            A confirmation email will be sent to your email
                                            address with your payment details and receipt.
                                        </p>

                                    </div>
                                </div>

                                {/* Home Button */}
                                <Link
                                    href="/"
                                    className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-black transition hover:bg-zinc-200"
                                >
                                    <span>Continue to Home</span>

                                    <ArrowRight
                                        width={18}
                                        height={18}
                                    />
                                </Link>

                            </div>

                            {/* Footer */}
                            <div className="border-t border-white/10 bg-[#0d0d0f] px-6 py-5 text-center">
                                <p className="text-xs text-zinc-600">
                                    Need help?{' '}
                                    <a
                                        href="mailto:orders@example.com"
                                        className="font-medium text-zinc-400 transition hover:text-white hover:underline"
                                    >
                                        Contact support
                                    </a>
                                </p>
                            </div>
                        </Card>

                        {/* Bottom */}
                        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-zinc-600">
                            <ShieldCheck
                                width={15}
                                height={15}
                            />

                            <span>Secure payment processed by Stripe</span>
                        </div>

                    </div>
                </div>
            </main>
        )
    }

    return null
}