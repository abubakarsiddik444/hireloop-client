import { getUsersList } from "@/lib/api/users";
import AdminUsersTable from "@/app/components/dashboard/adminUsersTable.jsx";

const AdminUsersPage = async () => {
  const data = await getUsersList();
  const users = data?.users || [];

  return (
    <div className="min-h-screen bg-[#111111] p-6 text-white">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Users</h1>
        <p className="mt-1 text-sm text-gray-400">
          Manage all registered users
        </p>
      </div>

      <AdminUsersTable users={users} />
    </div>
  );
};

export default AdminUsersPage;