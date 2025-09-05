import { Suspense } from "react";
import AdminLayout from "../../../components/ui/AdminLayout";
import AdminCartsPageClient from "../../../components/admin/AdminCartsPageClient";
import { getAllUserCarts } from "../../actions/admin-cart";

export default async function AdminCartsPage({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  const limit = parseInt(searchParams.limit) || 10;
  const search = searchParams.search || "";

  // Fetch initial cart data
  const result = await getAllUserCarts(page, limit, search);

  if (!result.success) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Error Loading Cart Data
            </h1>
            <p className="text-gray-600">{result.error}</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const { carts, pagination } = result.data;

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Cart Management</h1>
        <p className="mt-2 text-gray-600">
          View and manage all user shopping carts
        </p>
      </div>

      <Suspense
        fallback={
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        }
      >
        <AdminCartsPageClient
          initialCarts={carts}
          initialPagination={pagination}
          searchParams={searchParams}
        />
      </Suspense>
    </AdminLayout>
  );
}
