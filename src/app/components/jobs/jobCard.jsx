"use client";

import Link from "next/link";
import { Card } from "@heroui/react";
import {
  Briefcase,
  LocationArrow,
  Calendar,
  ArrowUpRight,
  CircleDollar,
} from "@gravity-ui/icons";

export default function JobCard({ job }) {
  return (
    <Card className="w-full min-h-[430px] rounded-3xl border border-white/10 bg-[#0f0e0e] text-white">
      <Card.Header className="px-6 pt-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-white">
            <img
              src={job.companyLogo}
              alt={job.companyName}
              className="h-full w-full object-contain p-1.5"
            />
          </div>

          <div>
            <p className="text-sm text-white/70">{job.companyName}</p>
            <p className="text-xs capitalize text-white/40">
              {job.category}
            </p>
          </div>
        </div>

        <Card.Title className="mt-5 text-2xl font-medium">
          {job.title}
        </Card.Title>

        <Card.Description className="mt-2 line-clamp-2 text-sm leading-6 text-white/55">
          {job.responsibilities}
        </Card.Description>
      </Card.Header>

      <Card.Content className="px-6">
        {/* Job Info */}
        <div className="flex flex-wrap gap-2">
          <Tag icon={<LocationArrow />} text={job.location} />

          <Tag
            icon={<Briefcase />}
            text={job.remote ? "Remote" : job.type}
          />

          <Tag
            icon={<CircleDollar />}
            text={`${job.currency} ${job.min}–${job.max}`}
          />

          <Tag
            icon={<Calendar />}
            text={`Deadline: ${job.deadline}`}
          />
        </div>

        {/* Requirements */}
        <div className="mt-5">
          <h3 className="mb-1 text-sm font-medium text-white">
            Requirements
          </h3>

          <p className="line-clamp-2 text-xs leading-5 text-white/50">
            {job.requirements}
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-4">
          <h3 className="mb-1 text-sm font-medium text-white">
            Benefits
          </h3>

          <p className="line-clamp-2 text-xs leading-5 text-white/50">
            {job.benefits}
          </p>
        </div>
      </Card.Content>

      <Card.Footer className="mt-auto px-6 pb-6">
        <Link
          href={`/jobs/${job._id}`}
          className="group flex items-center gap-2 text-base font-medium"
        >
          Apply Now
          <ArrowUpRight className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </Card.Footer>
    </Card>
  );
}

function Tag({ icon, text }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white/[0.07] px-3 py-2 text-xs text-white/75">
      <span className="text-[#f0a7e6]">{icon}</span>
      {text}
    </div>
  );
}