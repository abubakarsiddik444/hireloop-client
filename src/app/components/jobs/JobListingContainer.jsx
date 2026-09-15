"use client";

import JobCard from "./jobCard";

export default function JobListingContainer({ jobs }) {
  if (!jobs?.length) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-xl font-medium text-white">
          No jobs found
        </h3>

        <p className="mt-2 text-sm text-white/40">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
}