import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-lg text-slate-600 mt-2">
          Manage ZoomStore data and operations
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/users"
          className="rounded-lg border border-slate-200 bg-white p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="font-semibold text-slate-900">Users</h2>
          <p className="text-sm text-slate-600">
            View and manage user accounts
          </p>
        </Link>
        <Link
          href="/admin/products"
          className="rounded-lg border border-slate-200 bg-white p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="font-semibold text-slate-900">Products</h2>
          <p className="text-sm text-slate-600">
            Create, update, and categorize products
          </p>
        </Link>
        <Link
          href="/admin/orders"
          className="rounded-lg border border-slate-200 bg-white p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="font-semibold text-slate-900">Orders</h2>
          <p className="text-sm text-slate-600">
            Track and fulfill customer orders
          </p>
        </Link>
      </div>
    </div>
  );
}
