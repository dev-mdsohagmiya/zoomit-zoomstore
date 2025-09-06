"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { loginSchema } from "../../lib/validations/auth";
import { loginUser } from "../../app/actions/auth";
import { storeAuthData, isAuthenticated } from "../../lib/auth-utils";
import { showSuccessToast, showErrorToast } from "../../lib/toast-utils";
import FormInput from "../ui/FormInput";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl");

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      const redirectUrl = returnUrl ? decodeURIComponent(returnUrl) : "/";
      router.push(redirectUrl);
    }
  }, [router, returnUrl]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const result = await loginUser(data);

      if (result.success) {
        showSuccessToast(result.message);

        // Store token and user data
        if (result.data?.accessToken) {
          storeAuthData(result.data.accessToken, result.data.user);
        }

        // Redirect to home page, dashboard, or return URL based on user role
        const userRole = result.data?.user?.role;
        if (userRole === "admin" || userRole === "superadmin") {
          router.push("/admin/dashboard");
        } else {
          const redirectUrl = returnUrl ? decodeURIComponent(returnUrl) : "/";
          router.push(redirectUrl);
        }
      } else {
        showErrorToast(result.error);
      }
    } catch (error) {
      console.error("Login error:", error);
      showErrorToast("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Header Section */}
      <div className="mb-8">
        <Link
          href="/"
          className="flex items-center space-x-3 mb-6 hover:opacity-80 transition-opacity"
        >
          <div className="">
            <img
              src="/logo.png"
              alt="ZoomStore"
              className="h-full w-32 object-contain "
            />
          </div>
        </Link>

        <div>
          <h1 className="text-3xl font-bold text-purple-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-base text-purple-600">
            Sign in to your ZoomStore account
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            id="email"
            label="Email Address"
            type="email"
            placeholder="Enter your email address"
            register={register("email")}
            error={errors.email}
          />

          <FormInput
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            register={register("password")}
            error={errors.password}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border border-purple-300 text-purple-600 focus:ring-purple-500 focus:ring-1"
              />
              <label
                htmlFor="remember"
                className="ml-2 text-sm text-purple-700"
              >
                Remember me
              </label>
            </div>
            <Link
              href="/reset-password"
              className="text-sm text-purple-900 hover:text-purple-700 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="w-full h-10 rounded-md bg-purple-900 hover:bg-purple-800 disabled:bg-purple-400 text-white text-base font-medium transition-colors"
          >
            {isSubmitting || isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-4">
          <p className="text-sm text-purple-600">
            Don't have a ZoomStore account?{" "}
            <Link
              href="/register"
              className="font-medium text-purple-900 hover:text-purple-700 hover:underline"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
