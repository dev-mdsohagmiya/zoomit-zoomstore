export default function AdminProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold text-slate-900">Products</h1>
      <p className="text-slate-600">Manage your catalog (static)</p>
      <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr>
              <td className="px-4 py-3">Classic Cotton Tee</td>
              <td className="px-4 py-3">Apparel</td>
              <td className="px-4 py-3">$24.00</td>
              <td className="px-4 py-3">42</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                  Active
                </span>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">Wireless Headphones</td>
              <td className="px-4 py-3">Audio</td>
              <td className="px-4 py-3">$89.00</td>
              <td className="px-4 py-3">0</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                  Stock Out
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
