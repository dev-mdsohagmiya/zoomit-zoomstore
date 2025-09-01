import Link from "next/link";

export default function ResetPasswordPage() {
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
                Reset Password
              </h1>
              <p className="text-sm text-purple-600">
                Enter your email and we'll send you a reset link
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div>
            <form className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-medium text-purple-800"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="h-9 w-full rounded-md border border-purple-200 px-3 py-2 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-100 outline-none text-purple-900 placeholder-purple-400"
                />
              </div>

              <button
                type="submit"
                className="w-full h-9 rounded-md bg-purple-900 hover:bg-purple-800 text-white text-sm font-medium transition-colors"
              >
                Send Reset Link
              </button>
            </form>

            {/* Back to Login Link */}
            <div className="text-center mt-4">
              <p className="text-xs text-purple-600">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="font-medium text-purple-900 hover:text-purple-700 hover:underline"
                >
                  Back to login
                </Link>
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
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=300&fit=crop"
                  alt="Security"
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
              <h2 className="text-xl font-bold text-purple-900 mb-3">
                Secure Password Recovery
              </h2>
              <p className="text-purple-700 text-sm leading-relaxed">
                Don't worry, it happens to the best of us. We'll help you get
                back into your account quickly and securely.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-white rounded-lg p-3 border border-purple-200">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center">
                    <span className="text-purple-600 text-xs">📧</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-purple-900 text-sm">
                      Email Verification
                    </h3>
                    <p className="text-xs text-purple-600">
                      Secure link sent to your email
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 border border-purple-200">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center">
                    <span className="text-purple-600 text-xs">🔐</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-purple-900 text-sm">
                      Secure Process
                    </h3>
                    <p className="text-xs text-purple-600">
                      Your data is protected
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 border border-purple-200">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center">
                    <span className="text-purple-600 text-xs">⚡</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-purple-900 text-sm">
                      Quick Recovery
                    </h3>
                    <p className="text-xs text-purple-600">
                      Get back to shopping fast
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
