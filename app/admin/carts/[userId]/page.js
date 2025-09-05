import { Suspense } from "react";
import AdminLayout from "../../../../components/ui/AdminLayout";
import AdminCartDetailsPageClient from "../../../../components/admin/AdminCartDetailsPageClient";
import { getUserCart } from "../../../actions/admin-cart";
import { notFound } from "next/navigation";

export default async function AdminCartDetailsPage({ params }) {
  const resolvedParams = await params;
  const userId = resolvedParams.userId;

  console.log("AdminCartDetailsPage - User ID:", userId);

  // Fetch user cart data
  const result = await getUserCart(userId);

  console.log("AdminCartDetailsPage - API Result:", result);

  if (!result.success) {
    console.log("AdminCartDetailsPage - Cart not found, calling notFound()");
    notFound();
  }

  const cart = result.data;
  console.log("AdminCartDetailsPage - Cart data:", cart);

  return (
    <AdminLayout>
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <a
            href="/admin/carts"
            className="text-purple-600 hover:text-purple-800 transition-colors"
          >
            ← Back to Carts
          </a>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          Cart Details - {cart.user.name}
        </h1>
        <p className="mt-2 text-gray-600">
          {cart.user.email} • {cart.totalItems} items • ৳
          {cart.totalPrice.toLocaleString()}
        </p>
      </div>

      <Suspense
        fallback={
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        }
      >
        <AdminCartDetailsPageClient cart={cart} />
      </Suspense>
    </AdminLayout>
  );
}
