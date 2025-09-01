import { SocialAuths } from "../../components/ui/SocialAuths";
import { signInWithCredentials } from "../actions/auth";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Column - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Header Section */}
          <div className="mb-8">
            <Link
              href="/"
              className="flex items-center space-x-3 mb-6 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-purple-100 p-1.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/zoomitlogo.png"
                  alt="ZoomStore"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-lg font-bold text-purple-900">
                ZoomStore
              </span>
            </Link>

            <div>
              <h1 className="text-2xl font-bold text-purple-900 mb-2">
                Welcome Back
              </h1>
              <p className="text-sm text-purple-600">
                Sign in to your account to continue shopping
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div>
            <form action={signInWithCredentials} className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-medium text-purple-800"
                >
                  Email Address
                </label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="h-9 w-full rounded-md border border-purple-200 px-3 py-2 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-100 outline-none text-purple-900 placeholder-purple-400"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="text-xs font-medium text-purple-800"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="h-9 w-full rounded-md border border-purple-200 px-3 py-2 pr-8 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-100 outline-none text-purple-900 placeholder-purple-400"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-600 transition-colors text-sm"
                  >
                    👁️
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label
                  className="flex items-center space-x-2"
                  htmlFor="remember"
                >
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border border-purple-300 text-purple-600 focus:ring-purple-500 focus:ring-1"
                  />
                  <span className="text-xs font-medium text-purple-700">
                    Remember Me
                  </span>
                </label>
                <a
                  href="/reset-password"
                  className="text-xs font-medium text-purple-600 hover:text-purple-800 hover:underline transition-colors"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full h-9 rounded-md bg-purple-900 hover:bg-purple-800 text-white text-sm font-medium transition-colors"
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-purple-200"></div>
              <span className="px-3 text-xs text-purple-500 font-medium">
                Or continue with
              </span>
              <div className="flex-1 border-t border-purple-200"></div>
            </div>

            {/* Social Auth */}
            <div className="mb-4">
              <SocialAuths />
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-4">
              <p className="text-xs text-purple-600">
                New to ZoomStore?{" "}
                <a
                  href="/register"
                  className="font-medium text-purple-900 hover:text-purple-700 hover:underline"
                >
                  Create your account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Visual/Decorative */}
      <div
        className="hidden lg:flex flex-1 items-center justify-center p-8"
        style={{ backgroundColor: "rgb(244, 234, 244)" }}
      >
        <div className="w-full max-w-lg">
          {/* Decorative Content */}
          <div className="text-center">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-6 rounded-xl overflow-hidden bg-white border border-purple-200 p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=300&fit=crop"
                  alt="Shopping"
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
              <h2 className="text-xl font-bold text-purple-900 mb-3">
                Welcome Back to ZoomStore
              </h2>
              <p className="text-purple-700 text-sm leading-relaxed">
                Continue your shopping journey with us. Access your wishlist,
                track your orders, and enjoy exclusive member benefits.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-white rounded-lg p-3 border border-purple-200">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center">
                    <span className="text-purple-600 text-xs">📦</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-purple-900 text-sm">
                      Order Tracking
                    </h3>
                    <p className="text-xs text-purple-600">
                      Track your orders in real-time
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 border border-purple-200">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center">
                    <span className="text-purple-600 text-xs">💝</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-purple-900 text-sm">
                      Wishlist
                    </h3>
                    <p className="text-xs text-purple-600">
                      Save your favorite items
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 border border-purple-200">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center">
                    <span className="text-purple-600 text-xs">🎁</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-purple-900 text-sm">
                      Member Benefits
                    </h3>
                    <p className="text-xs text-purple-600">
                      Exclusive deals and offers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
