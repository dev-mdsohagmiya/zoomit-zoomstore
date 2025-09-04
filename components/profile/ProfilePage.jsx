"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  isAuthenticated,
  getStoredUser,
  logout,
  getUserRole,
  isTokenExpired,
} from "../../lib/auth-utils";
import { showSuccessToast, showErrorToast } from "../../lib/toast-utils";
import {
  User,
  Mail,
  Calendar,
  Shield,
  ShoppingBag,
  Settings,
  LogOut,
  Edit3,
  Save,
  X,
} from "lucide-react";

// Validation schema for profile update
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  address: z.string().optional(),
  bio: z.string().optional(),
});

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    const checkAuthAndLoadUser = () => {
      if (!isAuthenticated() || isTokenExpired()) {
        showErrorToast("Please log in to view your profile");
        router.push("/login");
        return;
      }

      const userData = getStoredUser();
      if (userData) {
        setUser(userData);
        // Pre-fill form with user data
        setValue("name", userData.name || "");
        setValue("email", userData.email || "");
        setValue("phone", userData.phone || "");
        setValue("address", userData.address || "");
        setValue("bio", userData.bio || "");
      }
      setIsLoading(false);
    };

    checkAuthAndLoadUser();
  }, [router, setValue]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form to original values
    if (user) {
      setValue("name", user.name || "");
      setValue("email", user.email || "");
      setValue("phone", user.phone || "");
      setValue("address", user.address || "");
      setValue("bio", user.bio || "");
    }
  };

  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      // Simulate API call for profile update
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update local user data
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);

      // Update localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));

      showSuccessToast("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      showErrorToast("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    logout(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <main
          className="p-6 min-h-screen"
          style={{ backgroundColor: "rgb(244, 234, 244)" }}
        >
          <div className="max-w-4xl mx-auto space-y-8 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-purple-200 rounded w-48 mb-8"></div>
              <div className="bg-white border border-purple-200 rounded-lg p-8 space-y-6 shadow-lg">
                <div className="h-6 bg-purple-200 rounded w-32"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-purple-200 rounded w-24"></div>
                  <div className="h-10 bg-purple-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <main
          className="p-6 min-h-screen"
          style={{ backgroundColor: "rgb(244, 234, 244)" }}
        >
          <div className="max-w-4xl mx-auto space-y-8 py-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-purple-900 mb-4">
                Profile Not Found
              </h1>
              <p className="text-purple-600 mb-6">
                Unable to load your profile information.
              </p>
              <button
                onClick={() => router.push("/login")}
                className="bg-purple-900 text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition-colors"
              >
                Go to Login
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const userRole = getUserRole();
  const isAdmin = userRole === "admin" || userRole === "superadmin";

  return (
    <div className="min-h-screen bg-background">
      <main
        className="p-6 min-h-screen"
        style={{ backgroundColor: "rgb(244, 234, 244)" }}
      >
        <div className="max-w-4xl mx-auto space-y-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-purple-900">My Profile</h1>
            {isAdmin && (
              <button
                onClick={() => router.push("/admin/dashboard")}
                className="bg-purple-900 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition-colors flex items-center gap-2"
              >
                <Shield className="h-4 w-4" />
                Admin Panel
              </button>
            )}
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Profile Overview */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-purple-200 rounded-lg p-6 shadow-lg">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-purple-200 bg-purple-100 mx-auto mb-4">
                    {user.photo ? (
                      <img
                        src={user.photo}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-purple-100 flex items-center justify-center">
                        <span className="text-purple-600 text-2xl font-bold">
                          {user.name?.charAt(0)?.toUpperCase() || "U"}
                        </span>
                      </div>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-purple-900 mb-1">
                    {user.name || "User"}
                  </h2>
                  <p className="text-purple-600 mb-2">{user.email}</p>
                  <div className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    <Shield className="h-3 w-3" />
                    {userRole?.charAt(0).toUpperCase() + userRole?.slice(1) ||
                      "User"}
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-purple-700">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Joined {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-purple-700">
                    <Mail className="h-4 w-4" />
                    <span>{user.email}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-purple-200">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <div className="bg-white border border-purple-200 rounded-lg p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-purple-900 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </h3>
                  {!isEditing ? (
                    <button
                      onClick={handleEdit}
                      className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors"
                    >
                      <Edit3 className="h-4 w-4" />
                      Edit
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSubmit(onSubmit)}
                        disabled={isSaving}
                        className="flex items-center gap-2 bg-purple-900 text-white px-3 py-1 rounded hover:bg-purple-800 transition-colors disabled:opacity-50"
                      >
                        <Save className="h-4 w-4" />
                        {isSaving ? "Saving..." : "Save"}
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 border border-purple-300 text-purple-600 px-3 py-1 rounded hover:bg-purple-50 transition-colors"
                      >
                        <X className="h-4 w-4" />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm text-purple-700 font-medium">
                        Full Name
                      </label>
                      <input
                        {...register("name")}
                        disabled={!isEditing}
                        className={`h-11 w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-purple-200 outline-none ${
                          errors.name
                            ? "border-red-300 focus:border-red-500"
                            : "border-purple-300 focus:border-purple-500"
                        } ${!isEditing ? "bg-gray-50" : ""}`}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-600">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-purple-700 font-medium">
                        Email Address
                      </label>
                      <input
                        {...register("email")}
                        disabled={!isEditing}
                        className={`h-11 w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-purple-200 outline-none ${
                          errors.email
                            ? "border-red-300 focus:border-red-500"
                            : "border-purple-300 focus:border-purple-500"
                        } ${!isEditing ? "bg-gray-50" : ""}`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-purple-700 font-medium">
                      Phone Number
                    </label>
                    <input
                      {...register("phone")}
                      disabled={!isEditing}
                      placeholder="Enter your phone number"
                      className={`h-11 w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-purple-200 outline-none ${
                        errors.phone
                          ? "border-red-300 focus:border-red-500"
                          : "border-purple-300 focus:border-purple-500"
                      } ${!isEditing ? "bg-gray-50" : ""}`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-purple-700 font-medium">
                      Address
                    </label>
                    <textarea
                      {...register("address")}
                      disabled={!isEditing}
                      placeholder="Enter your address"
                      rows={3}
                      className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-purple-200 outline-none resize-none ${
                        errors.address
                          ? "border-red-300 focus:border-red-500"
                          : "border-purple-300 focus:border-purple-500"
                      } ${!isEditing ? "bg-gray-50" : ""}`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-purple-700 font-medium">
                      Bio
                    </label>
                    <textarea
                      {...register("bio")}
                      disabled={!isEditing}
                      placeholder="Tell us about yourself"
                      rows={3}
                      className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-purple-200 outline-none resize-none ${
                        errors.bio
                          ? "border-red-300 focus:border-red-500"
                          : "border-purple-300 focus:border-purple-500"
                      } ${!isEditing ? "bg-gray-50" : ""}`}
                    />
                  </div>
                </form>
              </div>

              {/* Order History */}
              <div className="bg-white border border-purple-200 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-purple-900 flex items-center gap-2 mb-6">
                  <ShoppingBag className="h-5 w-5" />
                  Recent Orders
                </h3>

                <div className="space-y-4">
                  {/* Mock order data - replace with real API call */}
                  {[
                    {
                      id: "ORD-001",
                      date: "2024-01-15",
                      total: "৳2,500",
                      status: "Delivered",
                    },
                    {
                      id: "ORD-002",
                      date: "2024-01-10",
                      total: "৳1,800",
                      status: "Shipped",
                    },
                    {
                      id: "ORD-003",
                      date: "2024-01-05",
                      total: "৳3,200",
                      status: "Processing",
                    },
                  ].map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border border-purple-100 rounded-lg hover:bg-purple-50 transition-colors"
                    >
                      <div>
                        <p className="font-medium text-purple-900">
                          Order #{order.id}
                        </p>
                        <p className="text-sm text-purple-600">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-purple-900">
                          {order.total}
                        </p>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Shipped"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <button className="text-purple-600 hover:text-purple-800 font-medium">
                    View All Orders
                  </button>
                </div>
              </div>

              {/* Account Settings */}
              <div className="bg-white border border-purple-200 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-purple-900 flex items-center gap-2 mb-6">
                  <Settings className="h-5 w-5" />
                  Account Settings
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-purple-100 rounded-lg">
                    <div>
                      <p className="font-medium text-purple-900">
                        Change Password
                      </p>
                      <p className="text-sm text-purple-600">
                        Update your account password
                      </p>
                    </div>
                    <button className="text-purple-600 hover:text-purple-800 font-medium">
                      Change
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-purple-100 rounded-lg">
                    <div>
                      <p className="font-medium text-purple-900">
                        Email Notifications
                      </p>
                      <p className="text-sm text-purple-600">
                        Manage your notification preferences
                      </p>
                    </div>
                    <button className="text-purple-600 hover:text-purple-800 font-medium">
                      Manage
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-purple-100 rounded-lg">
                    <div>
                      <p className="font-medium text-purple-900">
                        Privacy Settings
                      </p>
                      <p className="text-sm text-purple-600">
                        Control your privacy and data
                      </p>
                    </div>
                    <button className="text-purple-600 hover:text-purple-800 font-medium">
                      Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
