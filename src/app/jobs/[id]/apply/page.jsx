import { getJobById } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import JobApply from './JobApply';
import { getApplicationsByApplicant } from '@/lib/api/applications';
import Link from 'next/link';

import {
    CircleExclamation,
    ArrowRight,
    Briefcase,
    CreditCard,
} from '@gravity-ui/icons';

import {
    Button,
    Card,
    ProgressBar,
} from '@heroui/react';
import { getPlanById } from '@/lib/api/plans';

const ApplyPage = async ({ params }) => {
    const { id } = await params;

    const user = await getUserSession();
    

    console.log('Current User Session:', user);

    // User not logged in
    if (!user) {
        redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
    }

    // Only seeker can apply
    if (user.role !== 'seeker') {
        return (
            <main className="min-h-screen bg-zinc-950 px-4 py-10 text-white">
                <div className="flex min-h-[80vh] items-center justify-center">

                    <Card className="w-full max-w-md border border-zinc-800 bg-zinc-900 p-8 text-center">

                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
                            <CircleExclamation
                                width={32}
                                height={32}
                                className="text-red-400"
                            />
                        </div>

                        <h2 className="text-2xl font-semibold">
                            Access Restricted
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-zinc-400">
                            Only job seekers can apply for positions.
                            Please sign in with a seeker account to continue.
                        </p>

                        <Link
                            href="/auth/signin"
                            className="mt-6 inline-block"
                        >
                            <Button color="primary">
                                Sign in as Seeker
                            </Button>
                        </Link>

                    </Card>

                </div>
            </main>
        );
    }

    // Get applications
    const applications = await getApplicationsByApplicant(user.id);

    // Current plan
    const plan = await getPlanById(user?.plan || 'seeker_free')
    

    // Get job
    const job = await getJobById(id);

    // Application calculations
    const applicationCount = applications.length;

    const remainingApplications = Math.max(
        plan.maxApplicationsPerMonth - applicationCount,
        0
    );

    const usagePercentage = Math.min(
        (applicationCount / plan.maxApplicationsPerMonth) * 100,
        100
    );

    const limitReached =
        applicationCount >= plan.maxApplicationsPerMonth;

    return (
        <main className="min-h-screen bg-zinc-950 px-4 py-10 text-white sm:px-6 lg:px-8">

            <div className="mx-auto max-w-4xl">

                {/* ================= HEADER ================= */}

                <div className="mb-8">

                    <div className="mb-4 flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
                            <Briefcase
                                width={24}
                                height={24}
                                className="text-blue-400"
                            />
                        </div>

                        <div>

                            <p className="text-sm font-medium text-blue-400">
                                Job Application
                            </p>

                            <h1 className="text-2xl font-bold sm:text-3xl">
                                Apply for this position
                            </h1>

                        </div>

                    </div>

                    <p className="text-sm text-zinc-400">
                        Complete the application form below to apply for
                        this job opportunity.
                    </p>

                </div>


                {/* ================= APPLICATION USAGE ================= */}

                <Card className="mb-6 border border-zinc-800 bg-zinc-900 p-5">

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                        {/* Left */}

                        <div className="flex items-start gap-4">

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">

                                <CreditCard
                                    width={22}
                                    height={22}
                                    className="text-blue-400"
                                />

                            </div>

                            <div>

                                <div className="flex flex-wrap items-center gap-3">

                                    <h2 className="font-semibold">
                                        Application Usage
                                    </h2>

                                    <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                                        {plan.name} Plan
                                    </span>

                                </div>

                                <p className="mt-1 text-sm text-zinc-400">

                                    You have applied to{' '}

                                    <span className="font-medium text-white">
                                        {applicationCount}
                                    </span>{' '}

                                    out of{' '}

                                    <span className="font-medium text-white">
                                        {plan.maxApplicationsPerMonth}
                                    </span>{' '}

                                    applications this month.

                                </p>

                            </div>

                        </div>


                        {/* Remaining */}

                        <div className="rounded-xl bg-zinc-800/70 px-5 py-3 text-center">

                            <p className="text-2xl font-bold text-blue-400">
                                {remainingApplications}
                            </p>

                            <p className="text-xs text-zinc-500">
                                Remaining
                            </p>

                        </div>

                    </div>


                    {/* Progress */}

                    <div className="mt-6">

                        <div className="mb-2 flex justify-between text-xs">

                            <span className="text-zinc-500">
                                Monthly usage
                            </span>

                            <span className="text-zinc-400">
                                {applicationCount}/
                                {plan.maxApplicationsPerMonth}
                            </span>

                        </div>

                        <ProgressBar
                            aria-label="Application usage"
                            value={usagePercentage}
                            className="w-full"
                        />

                    </div>

                </Card>


                {/* ================= UPGRADE BANNER ================= */}

                <Card className="mb-8 border border-blue-500/20 bg-blue-500/5 p-5">

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div>

                            <h3 className="font-semibold">
                                Need more applications?
                            </h3>

                            <p className="mt-1 text-sm text-zinc-400">
                                Upgrade your plan to apply for more positions.
                            </p>

                        </div>


                        {/* IMPORTANT:
                            Link outside Button
                            */}
                        <Link
                            href="/plans"
                            className="inline-block"
                        >
                            <Button
                                color="primary"
                                variant="flat"
                                endContent={
                                    <ArrowRight
                                        width={18}
                                        height={18}
                                    />
                                }
                            >
                                View Plans
                            </Button>
                        </Link>

                    </div>

                </Card>


                {/* ================= APPLICATION FORM ================= */}

                {!limitReached ? (

                    <Card className="overflow-hidden border border-zinc-800 bg-zinc-900">

                        {/* Form Header */}

                        <div className="border-b border-zinc-800 px-6 py-5">

                            <h2 className="text-xl font-semibold">
                                Application Form
                            </h2>

                            <p className="mt-1 text-sm text-zinc-400">
                                Fill in the required information to submit
                                your application.
                            </p>

                        </div>


                        {/* Job Apply */}

                        <div className="p-6">

                            <JobApply
                                applican={user}
                                job={job}
                            />

                        </div>

                    </Card>

                ) : (

                    /* ================= LIMIT REACHED ================= */

                    <Card className="border border-red-500/20 bg-zinc-900 p-8 text-center">

                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">

                            <CircleExclamation
                                width={32}
                                height={32}
                                className="text-red-400"
                            />

                        </div>


                        <h2 className="text-2xl font-bold">
                            Monthly Limit Reached
                        </h2>


                        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-zinc-400">

                            You have used all{' '}

                            {plan.maxApplicationsPerMonth}{' '}

                            applications available on your{' '}

                            {plan.name} plan this month.

                        </p>


                        <Link
                            href="/plans"
                            className="mt-6 inline-block"
                        >
                            <Button
                                color="primary"
                                endContent={
                                    <ArrowRight
                                        width={18}
                                        height={18}
                                    />
                                }
                            >
                                Upgrade Your Plan
                            </Button>
                        </Link>

                    </Card>

                )}

            </div>

        </main>
    );
};

export default ApplyPage;


