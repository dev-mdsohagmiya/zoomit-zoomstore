"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../lib/validations/auth";
import { loginUser } from "../../app/actions/auth";
import {
  storeAuthData,
  isAuthenticated,
  getUserRole,
} from "../../lib/auth-utils";
import { showSuccessToast, showErrorToast } from "../../lib/toast-utils";

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Check if user is already logged in and redirect accordingly
  useEffect(() => {
    if (isAuthenticated()) {
      const userRole = getUserRole();
      if (userRole === "admin" || userRole === "superadmin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    }
  }, [router]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const result = await loginUser(data);

      if (result.success) {
        // Store token and user data
        if (result.data?.accessToken) {
          storeAuthData(result.data.accessToken, result.data.user);
        }

        // Check if user is admin or superadmin
        const userRole = result.data?.user?.role;
        if (userRole === "admin" || userRole === "superadmin") {
          showSuccessToast("Admin login successful!");
          router.push("/admin/dashboard");
        } else {
          showErrorToast("Access denied. Admin privileges required.");
          // Clear auth data if not admin
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
        }
      } else {
        showErrorToast(
          result.error || "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      showErrorToast("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-display font-bold text-purple-900">
              Admin Login
            </h1>
            <p className="text-purple-600 mt-2">
              Access the ZoomStore admin dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-body font-medium text-purple-900 mb-2"
              >
                Admin Email
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors font-body ${
                  errors.email
                    ? "border-red-300 focus:border-red-500"
                    : "border-purple-200"
                }`}
                placeholder="admin@zoomstore.com"
              />
              {errors.email && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-body font-medium text-purple-900 mb-2"
              >
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                id="password"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors font-body ${
                  errors.password
                    ? "border-red-300 focus:border-red-500"
                    : "border-purple-200"
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-900 text-white py-3 px-4 rounded-lg font-body font-medium hover:bg-purple-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In to Admin"}
            </button>
          </form>

          {/* Admin Access Info */}
          <div className="mt-6 p-4 bg-purple-50 rounded-lg">
            <h3 className="text-sm font-body font-medium text-purple-900 mb-2">
              Admin Access:
            </h3>
            <p className="text-xs text-purple-700 font-body">
              Only users with admin or superadmin roles can access this panel.
              <br />
              Please use your registered admin credentials to sign in.
            </p>
          </div>

          {/* Back to Store */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-purple-600 hover:text-purple-800 font-body transition-colors"
            >
              ← Back to ZoomStore
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
