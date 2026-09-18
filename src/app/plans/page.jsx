"use client";


import React, { useState } from "react";
import Link from "next/link";

import {
    Check,
    ArrowRight,
    Briefcase,
    Person,
    CircleQuestion,
} from "@gravity-ui/icons";

import {
    Card,
    Button,
    Accordion,
    AccordionItem,
} from "@heroui/react";

const seekerPlans = [
    {
        name: "Free",
        price: "$0",
        period: "/forever",
        description: "Everything you need to start your job search.",
        icon: Person,
        features: [
            "Browse & save up to 10 jobs",
            "Apply to up to 3 jobs per month",
            "Basic profile",
            "Email alerts",
        ],
        popular: false,
    },
    {
        name: "Pro",
        price: "$19",
        period: "/month",
        description: "More applications and powerful job search tools.",
        icon: Briefcase,
        features: [
            "Apply to up to 30 jobs per month",
            "Unlimited saved jobs",
            "Application tracking",
            "Salary insights",
        ],
        popular: true,
    },
    {
        name: "Premium",
        price: "$39",
        period: "/month",
        description: "Everything you need to maximize your job search.",
        icon: CircleQuestion,
        features: [
            "Everything in Pro",
            "Unlimited applications",
            "Profile boost to recruiters",
            "Early access to new jobs",
            "Priority support",
        ],
        popular: false,
    },
];

const recruiterPlans = [
    {
        name: "Free",
        price: "$0",
        period: "/forever",
        description: "A simple way to start hiring for your company.",
        icon: Person,
        features: [
            "Up to 3 active job posts",
            "Basic applicant management",
            "Standard listing visibility",
            "Great for a company's first year of hiring",
        ],
        popular: false,
    },
    {
        name: "Growth",
        price: "$49",
        period: "/month",
        description: "Powerful tools for growing hiring teams.",
        icon: Briefcase,
        features: [
            "Up to 10 active job posts",
            "Applicant tracking",
            "Basic analytics",
            "Email support",
        ],
        popular: true,
    },
    {
        name: "Enterprise",
        price: "$149",
        period: "/month",
        description: "Advanced hiring tools for larger organizations.",
        icon: CircleQuestion,
        features: [
            "Up to 50 active job posts",
            "Advanced analytics dashboard",
            "Featured job listings",
            "Team collaboration",
            "Custom branding",
            "Priority support",
        ],
        popular: false,
    },
];

const faqs = [
    {
        question: "Can I cancel my plan at any time?",
        answer:
            "Yes. You can cancel your paid plan at any time. Your current plan will remain active until the end of your current billing period.",
    },
    {
        question: "Do you offer refunds?",
        answer:
            "Refund availability depends on the circumstances and applicable billing terms. Contact support if you believe you are eligible for a refund.",
    },
    {
        question: "What payment methods are accepted?",
        answer:
            "You can pay for a paid plan using the payment methods available at checkout. Available methods may vary depending on your location.",
    },
    {
        question: "Can I switch between plans?",
        answer:
            "Yes. You can change your plan when your needs change. Your account will use the applicable billing rules for the plan you switch to.",
    },
];

const PricingPage = () => {
    const [activeTab, setActiveTab] = useState("seekers");

    const plans =
        activeTab === "seekers"
            ? seekerPlans
            : recruiterPlans;

    return (
        <main className="min-h-screen bg-zinc-950 px-4 py-12 text-white sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* ================= HEADER ================= */}
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-5 flex justify-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
                            <Briefcase
                                width={28}
                                height={28}
                                className="text-blue-400"
                            />
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                        Simple, transparent pricing
                    </h1>

                    <p className="mt-4 text-base leading-7 text-zinc-400 sm:text-lg">
                        Choose a plan that fits your goals. Upgrade or
                        downgrade whenever you need.
                    </p>
                </div>

                {/* ================= TOGGLE ================= */}
                <div className="mt-10 flex justify-center">
                    <div className="flex w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-1">

                        {/* Job Seekers */}
                        <button
                            type="button"
                            onClick={() => setActiveTab("seekers")}
                            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition ${
                                activeTab === "seekers"
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                    : "text-zinc-400 hover:text-white"
                            }`}
                        >
                            <Person
                                width={18}
                                height={18}
                            />

                            For Job Seekers
                        </button>

                        {/* Recruiters */}
                        <button
                            type="button"
                            onClick={() => setActiveTab("recruiters")}
                            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition ${
                                activeTab === "recruiters"
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                    : "text-zinc-400 hover:text-white"
                            }`}
                        >
                            <Briefcase
                                width={18}
                                height={18}
                            />

                            For Recruiters
                        </button>
                    </div>
                </div>

                {/* ================= PRICING CARDS ================= */}
                <div className="mt-12 grid gap-6 lg:grid-cols-3">

                    {plans.map((plan) => {
                        const PlanIcon = plan.icon;

                        return (
                            <Card
                                key={plan.name}
                                className={`relative overflow-visible border bg-zinc-900 p-6 transition duration-300 hover:-translate-y-1 ${
                                    plan.popular
                                        ? "border-blue-500 shadow-xl shadow-blue-500/10"
                                        : "border-zinc-800"
                                }`}
                            >

                                {/* Popular Badge */}
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <span className="whitespace-nowrap rounded-full border border-blue-500/30 bg-blue-600 px-4 py-1 text-xs font-semibold text-white">
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                {/* Card Icon */}
                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10">
                                    <PlanIcon
                                        width={25}
                                        height={25}
                                        className="text-blue-400"
                                    />
                                </div>

                                {/* Plan Name */}
                                <h2 className="text-2xl font-bold">
                                    {plan.name}
                                </h2>

                                {/* Description */}
                                <p className="mt-2 min-h-[48px] text-sm leading-6 text-zinc-400">
                                    {plan.description}
                                </p>

                                {/* Price */}
                                <div className="mt-6 flex items-end">
                                    <span className="text-4xl font-bold tracking-tight">
                                        {plan.price}
                                    </span>

                                    <span className="mb-1 ml-1 text-sm text-zinc-500">
                                        {plan.period}
                                    </span>
                                </div>

                                {/* ================= BUTTON ================= */}

                                {plan.name === "Pro" ? (
                                    <form
                                        action="/api/checkout_sessions"
                                        method="POST"
                                        className="mt-7"
                                    >
                                        <section>
                                            <Button
                                                type="submit"
                                                role="link"
                                                fullWidth
                                                variant="bordered"
                                                color="primary"
                                                className="border-blue-500 text-blue-400 transition hover:bg-blue-500 hover:text-white"
                                            >
                                                <span className="flex items-center justify-center gap-2">
                                                    Checkout

                                                    <ArrowRight
                                                        width={18}
                                                        height={18}
                                                    />
                                                </span>
                                            </Button>
                                        </section>
                                    </form>
                                ) : (
                                    <Link
                                        href={
                                            plan.name === "Free"
                                                ? activeTab === "seekers"
                                                    ? "/jobs"
                                                    : "/dashboard/recruiter"
                                                : "/checkout"
                                        }
                                        className="mt-7 block"
                                    >
                                        <Button
                                            fullWidth
                                            variant="bordered"
                                            color="primary"
                                            className="border-blue-500 text-blue-400 transition hover:bg-blue-500 hover:text-white"
                                        >
                                            <span className="flex items-center justify-center gap-2">
                                                {plan.name === "Free"
                                                    ? "Get Started"
                                                    : `Choose ${plan.name}`}

                                                <ArrowRight
                                                    width={18}
                                                    height={18}
                                                />
                                            </span>
                                        </Button>
                                    </Link>
                                )}

                                {/* Divider */}
                                <div className="my-7 border-t border-zinc-800" />

                                {/* Features Title */}
                                <p className="mb-4 text-sm font-semibold text-white">
                                    Whats included
                                </p>

                                {/* Features */}
                                <ul className="space-y-3">
                                    {plan.features.map(
                                        (feature, index) => (
                                            <li
                                                key={index}
                                                className="flex items-start gap-3 text-sm text-zinc-300"
                                            >
                                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
                                                    <Check
                                                        width={14}
                                                        height={14}
                                                        className="text-blue-400"
                                                    />
                                                </span>

                                                <span>
                                                    {feature}
                                                </span>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </Card>
                        );
                    })}
                </div>

                {/* ================= FAQ ================= */}
                <section className="mx-auto mt-24 max-w-4xl">

                    <div className="mb-8 text-center">
                        <div className="mb-3 flex justify-center">
                            <CircleQuestion
                                width={30}
                                height={30}
                                className="text-blue-400"
                            />
                        </div>

                        <h2 className="text-3xl font-bold">
                            Frequently asked questions
                        </h2>

                        <p className="mt-3 text-zinc-400">
                            Everything you need to know about our plans.
                        </p>
                    </div>

                    <Accordion
                        variant="splitted"
                        className="gap-3"
                    >
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                title={faq.question}
                                className="border border-zinc-800 bg-zinc-900 px-4 text-white"
                            >
                                <p className="pb-4 pr-6 text-sm leading-6 text-zinc-400">
                                    {faq.answer}
                                </p>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </section>

                {/* ================= BOTTOM CTA ================= */}
                <section className="mt-20 overflow-hidden rounded-2xl border border-blue-500/20 bg-blue-500/5 p-8 text-center sm:p-12">

                    <div className="mx-auto max-w-2xl">

                        <h2 className="text-3xl font-bold">
                            Ready to get started?
                        </h2>

                        <p className="mt-3 text-zinc-400">
                            Start with a free plan and upgrade whenever
                            you need more.
                        </p>

                        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

                            {/* Browse Jobs */}
                            <Link href="/jobs">
                                <Button
                                    variant="bordered"
                                    color="primary"
                                    className="w-full border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white sm:w-auto"
                                >
                                    <span className="flex items-center gap-2">
                                        Browse Jobs

                                        <ArrowRight
                                            width={18}
                                            height={18}
                                        />
                                    </span>
                                </Button>
                            </Link>

                            {/* Start Hiring */}
                            <Link href="/dashboard/recruiter">
                                <Button
                                    variant="bordered"
                                    className="w-full border-zinc-700 text-white hover:bg-zinc-800 sm:w-auto"
                                >
                                    <span className="flex items-center gap-2">
                                        Start Hiring

                                        <Briefcase
                                            width={18}
                                            height={18}
                                        />
                                    </span>
                                </Button>
                            </Link>

                        </div>
                    </div>
                </section>

                <div className="h-10" />
            </div>
        </main>
    );
};

export default PricingPage;