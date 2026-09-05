"use client";

import Image from "next/image";
import {
  Magnifier,
  PersonMagnifier,
  Star,
} from "@gravity-ui/icons";
import { motion } from "motion/react"


export default function StatsSection() {
  const stats = [
    {
      type: "icon",
      icon: <Magnifier size={20} />,
      value: "50K",
      label: "Active Jobs",
    },
    {
      type: "building",
      value: "12K",
      label: "Companies",
    },
    {
      type: "icon",
      icon: <PersonMagnifier size={20} />,
      value: "2M",
      label: "Job Seekers",
    },
    {
      type: "icon",
      icon: <Star size={20} />,
      value: "97%",
      label: "Satisfaction Rate",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-black text-white">

      {/* Background */}
      <div className="absolute inset-0">

        {/* Globe */}
        <Image
          src="/images/globe.png"
          alt="Global hiring network"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Purple Glow */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/30 blur-[120px]" />

      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-10 pt-32 sm:px-8 sm:pt-40 lg:px-10 lg:pt-48">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">

          <h2 className="text-2xl font-medium leading-tight tracking-tight text-white/90 lg:text-[42px]">
            Assisting over{" "}
            <span className="text-white">
              15,000
            </span>{" "}
            job seekers
            <br className="hidden sm:block" />
            find their dream positions.
          </h2>

          <motion.p animate={{ rotate: 360 }} className="mt-4 text-lg text-white/70 sm:mt-6 sm:text-xl">
            HireLoop is a global hiring network that connects job seekers with top companies worldwide.
          </motion.p>

        </div>

        {/* Statistics Cards */}
        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative min-h-[195px] overflow-hidden rounded-xl border border-white/10 bg-black/65 p-5 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-purple-400/30 hover:bg-black/75"
            >

              {/* Small Glow */}
              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-purple-500/10 blur-2xl transition group-hover:bg-purple-500/20" />

              {/* Icon */}
              <div className="relative z-10 text-white/80">

                {stat.type === "building" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                  >
                    <path d="M4 21V5l8-3v19" />
                    <path d="M12 9h8v12" />
                    <path d="M7 8h1" />
                    <path d="M7 12h1" />
                    <path d="M7 16h1" />
                    <path d="M15 13h1" />
                    <path d="M19 13h1" />
                    <path d="M15 17h1" />
                    <path d="M19 17h1" />
                  </svg>
                ) : (
                  stat.icon
                )}

              </div>

              {/* Number & Label */}
              <div className="relative z-10 mt-10">

                <p className="text-4xl font-medium tracking-tight text-white sm:text-5xl">
                  {stat.value}
                </p>

                <p className="mt-3 text-sm text-white/70">
                  {stat.label}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}