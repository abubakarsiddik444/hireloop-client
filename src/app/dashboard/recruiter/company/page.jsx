"use client";

import { Button } from "@heroui/react";
import { Pencil } from "@gravity-ui/icons";

const Info = ({ label, value }) => (
    <div>
        <p className="mb-2 text-sm text-gray-400">{label}</p>
        <div className="rounded-lg border border-white/10 bg-[#111112] px-4 py-3 text-sm text-white">
            {value}
        </div>
    </div>
);

const RecruiterCompany = () => {
    return (
        <div className="min-h-screen bg-[#111112] p-5 text-white">
            <div className="mx-auto max-w-5xl">

                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold">
                            Company Profile
                        </h2>
                        <p className="mt-1 text-sm text-gray-400">
                            Manage your company information
                        </p>
                    </div>

                    <Button className="flex items-center gap-2 rounded-md bg-white px-4 text-sm font-medium text-black">
                        <Pencil size={16} />
                        Edit Profile
                    </Button>
                </div>

                {/* Company Card */}
                <div className="overflow-hidden rounded-xl border border-white/10 bg-[#171718]">
                    <div className="h-28 bg-gradient-to-r from-[#29292b] to-[#171718]" />

                    <div className="px-6 pb-6">
                        <div className="-mt-10 flex items-end gap-4">
                            <div className="flex h-20 w-20 items-center justify-center rounded-xl border-4 border-[#171718] bg-white text-2xl font-bold text-black">
                                AC
                            </div>

                            <div className="pb-1">
                                <h1 className="text-xl font-semibold">
                                    Acme Corporation
                                </h1>
                                <p className="text-sm text-gray-400">
                                    Technology & Software
                                </p>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                            <div className="rounded-lg border border-white/10 bg-[#111112] p-4">
                                <p className="text-xs text-gray-500">
                                    Active Jobs
                                </p>
                                <p className="mt-1 text-xl font-semibold">
                                    7
                                </p>
                            </div>

                            <div className="rounded-lg border border-white/10 bg-[#111112] p-4">
                                <p className="text-xs text-gray-500">
                                    Employees
                                </p>
                                <p className="mt-1 text-xl font-semibold">
                                    50+
                                </p>
                            </div>

                            <div className="rounded-lg border border-white/10 bg-[#111112] p-4">
                                <p className="text-xs text-gray-500">
                                    Applications
                                </p>
                                <p className="mt-1 text-xl font-semibold">
                                    124
                                </p>
                            </div>

                            <div className="rounded-lg border border-white/10 bg-[#111112] p-4">
                                <p className="text-xs text-gray-500">
                                    Plan
                                </p>
                                <p className="mt-1 text-xl font-semibold">
                                    Growth
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Company Information */}
                <div className="mt-5 grid gap-5 lg:grid-cols-2">

                    <div className="rounded-xl border border-white/10 bg-[#171718] p-6">
                        <h3 className="mb-5 text-lg font-semibold">
                            Company Information
                        </h3>

                        <div className="space-y-4">
                            <Info
                                label="Company Name"
                                value="Acme Corporation"
                            />

                            <Info
                                label="Industry"
                                value="Technology & Software"
                            />

                            <Info
                                label="Company Email"
                                value="hello@acme.com"
                            />

                            <Info
                                label="Phone"
                                value="+880 1XXXXXXXXX"
                            />
                        </div>
                    </div>

                    {/* Company Details */}
                    <div className="rounded-xl border border-white/10 bg-[#171718] p-6">
                        <h3 className="mb-5 text-lg font-semibold">
                            Company Details
                        </h3>

                        <div className="space-y-4">
                            <Info
                                label="Location"
                                value="Dhaka, Bangladesh"
                            />

                            <Info
                                label="Website"
                                value="acme.com"
                            />

                            <Info
                                label="Founded"
                                value="2020"
                            />

                            <Info
                                label="Company Size"
                                value="50 - 100 Employees"
                            />
                        </div>
                    </div>
                </div>

                {/* About Company */}
                <div className="mt-5 rounded-xl border border-white/10 bg-[#171718] p-6">
                    <h3 className="text-lg font-semibold">
                        About Company
                    </h3>

                    <p className="mt-1 text-sm text-gray-400">
                        Learn more about our company
                    </p>

                    <div className="mt-5 rounded-lg border border-white/10 bg-[#111112] p-5">
                        <p className="text-sm leading-7 text-gray-300">
                            Acme Corporation is a technology company focused
                            on building modern digital products and innovative
                            solutions. We are a growing team of passionate
                            developers, designers, and professionals working
                            together to create meaningful products and
                            experiences.
                        </p>

                        <p className="mt-4 text-sm leading-7 text-gray-300">
                            Our goal is to create a collaborative environment
                            where talented people can work, learn, and grow
                            together while solving real-world problems through
                            technology.
                        </p>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-5 flex flex-col justify-between gap-3 rounded-xl border border-white/10 bg-[#171718] p-5 sm:flex-row sm:items-center">
                    <div>
                        <p className="font-medium">
                            Company Profile
                        </p>
                        <p className="text-sm text-gray-400">
                            Keep your company information up to date.
                        </p>
                    </div>

                    <Button className="rounded-md bg-white px-5 text-sm font-medium text-black">
                        Update Company
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default RecruiterCompany;