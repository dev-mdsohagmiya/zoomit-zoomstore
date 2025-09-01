export default function AdminOrdersPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold text-slate-900">Orders</h1>
      <p className="text-slate-600">Track and fulfill orders (static)</p>
      <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="px-4 py-3">Order #</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr>
              <td className="px-4 py-3">#10023</td>
              <td className="px-4 py-3">Ava Carter</td>
              <td className="px-4 py-3">$120.00</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                  Processing
                </span>
              </td>
              <td className="px-4 py-3">2025-09-01</td>
            </tr>
            <tr>
              <td className="px-4 py-3">#10022</td>
              <td className="px-4 py-3">Liam Patel</td>
              <td className="px-4 py-3">$89.00</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                  Shipped
                </span>
              </td>
              <td className="px-4 py-3">2025-08-30</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
