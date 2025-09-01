import React from "react";

export default function RegisterPage() {
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
          <h1 className="text-3xl font-bold text-slate-900">
            Join ZoomStore today
          </h1>
          <p className="text-lg text-slate-600">
            Create your account to start shopping with us
          </p>
        </div>

        <form className="space-y-4">
          <div className="space-y-3">
            <button
              type="button"
              className="w-full h-11 rounded-md border border-slate-300 hover:bg-slate-50 bg-transparent flex items-center justify-center"
            >
              <span className="mr-2 font-bold text-lg">G</span>
              Continue with Google
            </button>
            <button
              type="button"
              className="w-full h-11 rounded-md border border-slate-300 hover:bg-slate-50 bg-transparent flex items-center justify-center"
            >
              <span className="mr-2 font-bold text-lg">f</span>
              Continue with Facebook
            </button>
            <button
              type="button"
              className="w-full h-11 rounded-md border border-slate-300 hover:bg-slate-50 bg-transparent flex items-center justify-center"
            >
              <span className="mr-2 font-bold text-lg">#</span>
              Continue with GitHub
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">
                Or continue with email
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-slate-700"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              className="h-11 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
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
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              className="h-11 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-slate-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              className="h-11 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium transition-colors"
          >
            Create Account
          </button>

          <div className="text-center text-sm text-slate-600">
            Already have a ZoomStore account?{" "}
            <a
              href="/login"
              className="text-slate-900 hover:underline font-medium"
            >
              Sign in here
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
