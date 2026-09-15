import { getJobById } from "@/lib/api/jobs";
import Link from "next/link";
import { Card, Button } from "@heroui/react";
import {
  LocationArrow,
  Briefcase,
  CircleDollar,
  Calendar,
  Globe,
  ArrowUpRight,
} from "@gravity-ui/icons";

const Page = async ({ params }) => {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) {
    return (
      <main className="min-h-screen bg-[#090909] px-5 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-semibold">Job not found</h1>
          <p className="mt-2 text-white/40">
            This job is no longer available.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#090909] px-5 py-10 text-white">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <Card className="rounded-3xl border border-white/10 bg-[#111]">
          <Card.Header className="p-7 md:p-8">

            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

              <div className="flex items-center gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white p-3">
                  <img
                    src={job.companyLogo}
                    alt={job.companyName}
                    className="h-full w-full object-contain"
                  />
                </div>

                <div>
                  <p className="text-sm text-white/40">
                    {job.companyName}
                  </p>

                  <h1 className="mt-1 text-3xl font-semibold md:text-4xl">
                    {job.title}
                  </h1>

                  <p className="mt-2 text-sm capitalize text-white/40">
                    {job.category} · {job.type}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4">
                <p className="text-xs text-white/40">
                  Salary
                </p>

                <p className="mt-1 text-xl font-semibold">
                  {job.currency} {job.min} - {job.max}
                </p>

                <p className="mt-1 text-xs text-white/30">
                  Per year
                </p>
              </div>

            </div>

          </Card.Header>
        </Card>

        {/* Main */}
        <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">

          {/* Left */}
          <Card className="rounded-3xl border border-white/10 bg-[#111]">

            <Card.Header className="px-7 pt-7">
              <Card.Title className="text-xl font-semibold">
                Job Description
              </Card.Title>
            </Card.Header>

            <Card.Content className="space-y-8 px-7 pb-8">

              <section>
                <h2 className="mb-2 text-base font-medium">
                  Responsibilities
                </h2>

                <p className="text-[15px] leading-7 text-white/55">
                  {job.responsibilities}
                </p>
              </section>

              <section>
                <h2 className="mb-2 text-base font-medium">
                  Requirements
                </h2>

                <p className="text-[15px] leading-7 text-white/55">
                  {job.requirements}
                </p>
              </section>

              <section>
                <h2 className="mb-2 text-base font-medium">
                  Benefits
                </h2>

                <p className="text-[15px] leading-7 text-white/55">
                  {job.benefits}
                </p>
              </section>

            </Card.Content>
          </Card>

          {/* Right */}
          <Card className="h-fit rounded-3xl border border-white/10 bg-[#111] lg:sticky lg:top-6">

            <Card.Header className="px-6 pt-6">
              <p className="text-sm text-white/40">
                Interested in this position?
              </p>

              <Card.Title className="mt-1 text-xl">
                Apply for this job
              </Card.Title>
            </Card.Header>

            <Card.Content className="space-y-5 px-6 pb-6">

              <InfoItem
                icon={<LocationArrow />}
                label="Location"
                value={job.location}
              />

              <InfoItem
                icon={<Briefcase />}
                label="Job Type"
                value={job.type}
              />

              <InfoItem
                icon={<Globe />}
                label="Work Mode"
                value={job.remote ? "Remote" : "On-site"}
              />

              <InfoItem
                icon={<CircleDollar />}
                label="Salary"
                value={`${job.currency} ${job.min} - ${job.max}`}
              />

              <InfoItem
                icon={<Calendar />}
                label="Deadline"
                value={job.deadline}
              />

              <div className="pt-2">
                <Link
                  href={`/jobs/${job._id}/apply`}
                  className="block"
                >
                  <Button
                    size="lg"
                    className="w-full"
                  >
                    Apply Now
                    <ArrowUpRight size={18} />
                  </Button>
                </Link>

                <p className="mt-3 text-center text-xs text-white/30">
                  Apply before {job.deadline}
                </p>
              </div>

            </Card.Content>
          </Card>

        </div>
      </div>
    </main>
  );
};

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 border-b border-white/[0.07] pb-4 last:border-0">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-[#f0a7e6]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-white/35">
          {label}
        </p>

        <p className="mt-1 text-sm capitalize text-white/75">
          {value}
        </p>
      </div>

    </div>
  );
}

export default Page;