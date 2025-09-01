import { SocialAuths } from "../../components/ui/SocialAuths";
import { signInWithCredentials } from "../actions/auth";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-white">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/zoomitlogo.png"
                alt="ZoomStore"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="text-xl font-semibold text-slate-800">
              ZoomStore
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>
          <p className="text-lg text-slate-600">
            Sign in to your account to continue shopping
          </p>
        </div>

        <div className="space-y-6">
          <form action={signInWithCredentials}>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-slate-700"
              >
                Email
              </label>
              <input
                name="email"
                id="email"
                type="email"
                placeholder="hi@example.com"
                className="h-11 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="h-11 w-full rounded-md border border-slate-300 px-3 py-2 pr-10 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 outline-none"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  👁️
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2" htmlFor="remember">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border border-slate-300"
                />
                <span className="text-sm text-slate-600">Remember Me</span>
              </label>
              <a
                href="/reset-password"
                className="text-sm text-slate-900 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="space-y-3">
            <SocialAuths />
          </div>

          <div className="text-center text-sm text-slate-600">
            New to ZoomStore?{" "}
            <a
              href="/register"
              className="text-slate-900 hover:underline font-medium"
            >
              Create your account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
