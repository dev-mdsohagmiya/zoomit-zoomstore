"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerSchema } from "../../lib/validations/auth";
import { registerUser } from "../../app/actions/auth";
import { storeAuthData, isAuthenticated } from "../../lib/auth-utils";
import { showSuccessToast, showErrorToast } from "../../lib/toast-utils";
import FormInput from "../ui/FormInput";
import FormCheckbox from "../ui/FormCheckbox";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/");
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    watch,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const result = await registerUser(data);

      if (result.success) {
        showSuccessToast(result.message);

        // Store token and user data if available (auto-login)
        if (result.data?.accessToken) {
          storeAuthData(result.data.accessToken, result.data.user);

          // Redirect based on user role
          const userRole = result.data.user?.role;
          setTimeout(() => {
            if (userRole === "admin" || userRole === "superadmin") {
              router.push("/admin/dashboard");
            } else {
              router.push("/");
            }
          }, 2000);
        } else {
          // Fallback: redirect to login page
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        }
      } else {
        // Handle API errors
        if (result.fieldErrors) {
          // Set field-specific errors
          Object.keys(result.fieldErrors).forEach((field) => {
            setError(field, {
              type: "server",
              message: result.fieldErrors[field],
            });
          });
        }
        showErrorToast(result.error);
      }
    } catch (error) {
      console.error("Registration error:", error);
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
            Create Account
          </h1>
          <p className="text-base text-purple-600">
            Join ZoomStore to start shopping with us
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <FormInput
              id="firstName"
              label="First Name"
              type="text"
              placeholder="First name"
              register={register("firstName")}
              error={errors.firstName}
            />
            <FormInput
              id="lastName"
              label="Last Name"
              type="text"
              placeholder="Last name"
              register={register("lastName")}
              error={errors.lastName}
            />
          </div>

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
            placeholder="Create a strong password"
            register={register("password")}
            error={errors.password}
          />

          <FormInput
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            register={register("confirmPassword")}
            error={errors.confirmPassword}
          />

          <FormCheckbox
            id="terms"
            label={
              <>
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
              </>
            }
            register={register("terms")}
            error={errors.terms}
          />

          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="w-full h-10 rounded-md bg-purple-900 hover:bg-purple-800 disabled:bg-purple-400 text-white text-base font-medium transition-colors"
          >
            {isSubmitting || isLoading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        {/* Sign In Link */}
        <div className="text-center mt-4">
          <p className="text-sm text-purple-600">
            Already have a ZoomStore account?{" "}
            <Link
              href="/login"
              className="font-medium text-purple-900 hover:text-purple-700 hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
