import React from "react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Column - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-6">
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
            </div>

            <div>
              <h1 className="text-2xl font-bold text-purple-900 mb-2">
                Create Account
              </h1>
              <p className="text-sm text-purple-600">
                Join ZoomStore to start shopping with us
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label
                    htmlFor="firstName"
                    className="text-xs font-medium text-purple-800"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="First name"
                    className="h-9 w-full rounded-md border border-purple-200 px-3 py-2 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-100 outline-none text-purple-900 placeholder-purple-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="lastName"
                    className="text-xs font-medium text-purple-800"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Last name"
                    className="h-9 w-full rounded-md border border-purple-200 px-3 py-2 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-100 outline-none text-purple-900 placeholder-purple-400"
                  />
                </div>
              </div>

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
                  placeholder="Enter your email address"
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
                <input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  className="h-9 w-full rounded-md border border-purple-200 px-3 py-2 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-100 outline-none text-purple-900 placeholder-purple-400"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="confirmPassword"
                  className="text-xs font-medium text-purple-800"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  className="h-9 w-full rounded-md border border-purple-200 px-3 py-2 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-100 outline-none text-purple-900 placeholder-purple-400"
                />
              </div>

              <div className="flex items-start space-x-2">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 rounded border border-purple-300 text-purple-600 focus:ring-purple-500 focus:ring-1 mt-0.5"
                />
                <label
                  htmlFor="terms"
                  className="text-xs text-purple-700 leading-relaxed"
                >
                  I agree to the{" "}
                  <a
                    href="#"
                    className="font-medium text-purple-900 hover:underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="font-medium text-purple-900 hover:underline"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button
                type="submit"
                className="w-full h-9 rounded-md bg-purple-900 hover:bg-purple-800 text-white text-sm font-medium transition-colors"
              >
                Create Account
              </button>
            </form>

            {/* Sign In Link */}
            <div className="text-center mt-4">
              <p className="text-xs text-purple-600">
                Already have a ZoomStore account?{" "}
                <a
                  href="/login"
                  className="font-medium text-purple-900 hover:text-purple-700 hover:underline"
                >
                  Sign in here
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
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=300&fit=crop"
                  alt="Shopping"
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
              <h2 className="text-xl font-bold text-purple-900 mb-3">
                Welcome to ZoomStore
              </h2>
              <p className="text-purple-700 text-sm leading-relaxed">
                Discover amazing products, enjoy fast delivery, and shop with
                confidence. Join thousands of satisfied customers who trust
                ZoomStore for their shopping needs.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-white rounded-lg p-3 border border-purple-200">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center">
                    <span className="text-purple-600 text-xs">🚚</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-purple-900 text-sm">
                      Fast Delivery
                    </h3>
                    <p className="text-xs text-purple-600">
                      Get your orders delivered quickly
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 border border-purple-200">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center">
                    <span className="text-purple-600 text-xs">🔒</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-purple-900 text-sm">
                      Secure Shopping
                    </h3>
                    <p className="text-xs text-purple-600">
                      Your data is safe with us
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 border border-purple-200">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center">
                    <span className="text-purple-600 text-xs">⭐</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-purple-900 text-sm">
                      Quality Products
                    </h3>
                    <p className="text-xs text-purple-600">
                      Curated selection of premium items
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
