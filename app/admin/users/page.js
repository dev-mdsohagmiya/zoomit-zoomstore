export default function AdminUsersPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold text-slate-900">Users</h1>
      <p className="text-slate-600">List of registered users (static)</p>
      <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr>
              <td className="px-4 py-3">Ava Carter</td>
              <td className="px-4 py-3">ava@example.com</td>
              <td className="px-4 py-3">Admin</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                  Active
                </span>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">Liam Patel</td>
              <td className="px-4 py-3">liam@example.com</td>
              <td className="px-4 py-3">Customer</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                  Invited
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
