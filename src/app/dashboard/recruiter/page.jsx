"use client";

import DashboardStats from "@/app/components/dashboard/DashboardStats";
import { useSession } from "@/lib/auth-client";

import {
  FileText,
  Persons,
  Thunderbolt,
  CircleCheck,
} from "@gravity-ui/icons";

const RecruiterDashboardHomepage = () => {
  const { data: session, isPending } = useSession();

  // Loading state
  if (isPending) {
    return <div>Loading...</div>;
  }

  // Recruiter stats
  const recruiterStats = [
    {
      id: 1,
      title: "Total Job Posts",
      value: "48",
      icon: FileText,
    },
    {
      id: 2,
      title: "Total Applicants",
      value: "1,284",
      icon: Persons,
    },
    {
      id: 3,
      title: "Active Jobs",
      value: "18",
      icon: Thunderbolt,
    },
    {
      id: 4,
      title: "Jobs Closed",
      value: "32",
      icon: CircleCheck,
    },
  ];

  const user = session?.user;

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h2 className="text-3xl font-semibold text-white">
          Welcome back, {user?.name}
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Here&apos;s what&apos;s happening with your jobs today.
        </p>
      </div>

      {/* Dashboard Stats */}
      <DashboardStats statsData={recruiterStats} />
    </div>
  );
};

export default RecruiterDashboardHomepage;