import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Reset Password Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                </svg>
              </div>
              <span className="text-xl font-semibold text-slate-800">
                gubsafe
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-slate-900">
              Reset password
            </h1>
            <p className="text-slate-600">
              Enter your email and we'll send you a reset link.
            </p>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-slate-700"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="h-11 border-slate-300 focus:border-slate-900 focus:ring-slate-900"
              />
            </div>

            <Button className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white">
              Send Reset Link
            </Button>

            <div className="text-center text-sm text-slate-600">
              Remember your password?{" "}
              <Link
                href="/login"
                className="text-slate-900 hover:underline font-medium"
              >
                Back to login
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Decorative Panel */}
      <div className="flex-1 bg-slate-100 relative overflow-hidden hidden lg:block">
        {/* Security Pattern Background */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 800 600" fill="none">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="#64748b"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Security Feature Card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="bg-white rounded-xl shadow-lg p-6 w-72 transform rotate-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-slate-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15.1 8H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Password Recovery
                </h3>
                <p className="text-sm text-slate-600">Secure & Fast</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-slate-600">
                  Email verification
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-slate-600">
                  Secure token generation
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-slate-600">
                  Time-limited access
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Icons scattered around */}
        <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
          <svg
            className="w-4 h-4 text-slate-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
          </svg>
        </div>
        <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
          <svg
            className="w-4 h-4 text-slate-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2z" />
          </svg>
        </div>
        <div className="absolute bottom-1/3 left-1/3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
          <svg
            className="w-4 h-4 text-slate-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
