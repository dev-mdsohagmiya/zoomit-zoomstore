import { doSignOut } from "../actions/auth";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="p-6 bg-slate-50 min-h-screen">
        <div className="max-w-3xl mx-auto space-y-8 py-8">
          <h1 className="text-3xl font-bold text-slate-900">Profile</h1>

          <div className="bg-white border border-slate-200 rounded-lg p-8 space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Account Details
            </h2>
            <div className="space-y-2">
              <label className="text-sm text-slate-700">Name</label>
              <input
                className="h-11 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 outline-none"
                defaultValue="Demo User"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-700">Email</label>
              <input
                className="h-11 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 outline-none"
                defaultValue="demo@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-700">Password</label>
              <input
                type="password"
                placeholder="Update your password"
                className="h-11 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-700">Photo</label>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-1 ring-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://i.pravatar.cc/80?img=12"
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-md file:border file:border-slate-300 file:bg-white file:px-3 file:py-2 file:text-sm file:font-medium hover:file:bg-slate-50"
                />
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <button className="rounded-lg bg-slate-900 text-white px-6 py-3 font-medium hover:bg-slate-800 transition-colors">
                Save
              </button>
              <form action={doSignOut}>
                <button className="rounded-lg border border-slate-300 px-6 py-3 font-medium hover:bg-slate-50 transition-colors">
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
