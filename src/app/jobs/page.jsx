import { getJobs } from "@/lib/api/jobs";
import JobFilters from "../components/jobs/JobFilters";

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-5 py-8">

      <div className="mx-auto mb-5 max-w-7xl">
        <h2 className="text-3xl font-semibold text-white">
          Explore Open Positions
        </h2>

        <p className="mt-2 text-sm text-white/40">
          Discover opportunities and find the right job for you.
        </p>
      </div>

      <JobFilters jobs={jobs} />

    </main>
  );
}
// this is the current jobsPage: and it is a server component. so give me updated version of integration as well as JobFilters component: