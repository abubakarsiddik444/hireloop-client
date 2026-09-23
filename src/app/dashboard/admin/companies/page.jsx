import CompanyTable from "@/app/components/dashboard/CompanyTable";
import { getCompanies } from "@/lib/api/companies";

const AdminCompaniesPage = async () => {
  const companies = await getCompanies();

  return (
    <div className="min-h-screen bg-[#111111] p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Companies for review: {companies.length}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Review and manage recruiter company approvals
        </p>
      </div>

      {/* Company Table */}
      <CompanyTable companies={companies} />
    </div>
  );
};

export default AdminCompaniesPage;