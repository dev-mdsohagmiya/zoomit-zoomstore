import AdminLayout from "../../../components/ui/AdminLayout";
import UsersPageClient from "../../../components/admin/UsersPageClient";
import { getAllUsersByAdminAndSuperAdmin } from "../../actions/user";

export default async function AdminUsersPage({ searchParams }) {
  // Extract search parameters
  const page = parseInt(searchParams?.page) || 1;
  const search = searchParams?.search || "";
  const role = searchParams?.role || "all";
  const status = searchParams?.status || "all";

  // Build filters object
  const filters = {};
  if (search) filters.search = search;
  if (role !== "all") filters.role = role;
  if (status !== "all") filters.status = status;

  // Fetch users data on server side
  let initialUsers = [];
  let initialPagination = {
    page: 1,
    pages: 1,
    total: 0,
  };

  try {
    const result = await getAllUsersByAdminAndSuperAdmin(page, 10, filters);

    console.log("Users data:", result);

    if (result.success) {
      initialUsers = result.data.users || [];
      initialPagination = result.data.pagination || initialPagination;
    } else {
      console.error("Failed to fetch users:", result.error);
    }
  } catch (error) {
    console.error("Error fetching users on server:", error);
    // Fallback to empty data
  }

  return (
    <AdminLayout>
      <UsersPageClient
        initialUsers={initialUsers}
        initialPagination={initialPagination}
        searchParams={searchParams}
      />
    </AdminLayout>
  );
}
