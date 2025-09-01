import { doSignOut } from "../actions/auth";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <main
        className="p-6 min-h-screen"
        style={{ backgroundColor: "rgb(244, 234, 244)" }}
      >
        <div className="max-w-3xl mx-auto space-y-8 py-8">
          <h1 className="text-3xl font-bold text-purple-900">Profile</h1>

          <div className="bg-white border border-purple-200 rounded-lg p-8 space-y-6 shadow-lg">
            <h2 className="text-xl font-semibold text-purple-900">
              Account Details
            </h2>
            <div className="space-y-2">
              <label className="text-sm text-purple-700 font-medium">
                Name
              </label>
              <input
                className="h-11 w-full rounded-md border border-purple-300 px-3 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                defaultValue="Demo User"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-purple-700 font-medium">
                Email
              </label>
              <input
                className="h-11 w-full rounded-md border border-purple-300 px-3 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                defaultValue="demo@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-purple-700 font-medium">
                Password
              </label>
              <input
                type="password"
                placeholder="Update your password"
                className="h-11 w-full rounded-md border border-purple-300 px-3 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-purple-700 font-medium">
                Photo
              </label>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-purple-200 bg-purple-100">
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
                  className="block w-full text-sm text-purple-600 file:mr-3 file:rounded-md file:border file:border-purple-300 file:bg-white file:px-3 file:py-2 file:text-sm file:font-medium hover:file:bg-purple-50"
                />
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <button className="rounded-lg bg-purple-900 text-white px-6 py-3 font-medium hover:bg-purple-800 transition-colors shadow-md">
                Save
              </button>
              <form action={doSignOut}>
                <button className="rounded-lg border border-purple-300 px-6 py-3 font-medium hover:bg-purple-50 transition-colors text-purple-700">
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
