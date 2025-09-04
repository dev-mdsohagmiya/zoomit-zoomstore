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
  getStoredToken,
  storeAuthData,
} from "../../lib/auth-utils";
import { showSuccessToast, showErrorToast } from "../../lib/toast-utils";
// Remove server action import - we'll make direct API calls
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

// Client-side API function for profile updates
const updateUserProfileAPI = async (formData, token) => {
  console.log("updateUserProfileAPI called with:", {
    formData,
    token: !!token,
  });

  try {
    if (!token) {
      console.log("No token found");
      return {
        success: false,
        error: "No authentication token found.",
      };
    }

    // Create FormData for multipart/form-data request
    const data = new FormData();

    // Add fields if they exist and are not empty
    if (formData.name && formData.name.trim()) {
      data.append("name", formData.name.trim());
    }

    if (formData.email && formData.email.trim()) {
      data.append("email", formData.email.trim());
    }

    // Add photo if provided
    if (formData.photo && formData.photo.length > 0) {
      data.append("photo", formData.photo[0]);
    }

    // Add address if provided
    if (formData.address) {
      const addressData = {};
      if (formData.address.street) addressData.street = formData.address.street;
      if (formData.address.city) addressData.city = formData.address.city;
      if (formData.address.state) addressData.state = formData.address.state;
      if (formData.address.zipCode)
        addressData.zipCode = formData.address.zipCode;
      if (formData.address.country)
        addressData.country = formData.address.country;

      // Only append address if it has at least one field
      if (Object.keys(addressData).length > 0) {
        data.append("address", JSON.stringify(addressData));
      }
    }

    // Log FormData contents
    console.log("FormData contents:");
    for (let [key, value] of data.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await fetch("http://localhost:8000/api/v1/users/profile", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        // Don't set Content-Type for FormData, let browser set it with boundary
      },
      body: data,
    });

    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);

    if (!response.ok) {
      try {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.message || `HTTP error! status: ${response.status}`,
        };
      } catch (parseError) {
        return {
          success: false,
          error: `HTTP error! status: ${response.status}`,
        };
      }
    }

    try {
      const result = await response.json();
      console.log("Success response:", result);
      return {
        success: true,
        data: result.data,
        message: result.message || "Profile updated successfully!",
      };
    } catch (parseError) {
      console.error("Error parsing response:", parseError);
      return {
        success: false,
        error: "Invalid response from server. Please try again.",
      };
    }
  } catch (error) {
    console.error("Profile update error:", error);

    // Check if it's a network error
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      return {
        success: false,
        error: "Network error. Please check your connection and try again.",
      };
    }

    // For other errors, show a more generic message
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
};

// Validation schema for profile update
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  photo: z.any().optional(),
  address: z
    .object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      zipCode: z.string().optional(),
      country: z.string().optional(),
    })
    .optional(),
});

// Helper function to parse address from JSON string
const parseAddress = (addressData) => {
  if (!addressData) return null;

  // If it's already an object, return it
  if (typeof addressData === "object") {
    return addressData;
  }

  // If it's a string, try to parse it as JSON
  if (typeof addressData === "string") {
    try {
      return JSON.parse(addressData);
    } catch (error) {
      console.error("Error parsing address JSON:", error);
      return null;
    }
  }

  return null;
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
    },
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

        // Parse address from JSON string
        const parsedAddress = parseAddress(userData.address);

        // Pre-fill form with user data
        setValue("name", userData.name || "");
        setValue("email", userData.email || "");
        setValue("address", {
          street: parsedAddress?.street || "",
          city: parsedAddress?.city || "",
          state: parsedAddress?.state || "",
          zipCode: parsedAddress?.zipCode || "",
          country: parsedAddress?.country || "",
        });
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
    setPhotoPreview(null);
    // Reset form to original values
    if (user) {
      // Parse address from JSON string
      const parsedAddress = parseAddress(user.address);

      setValue("name", user.name || "");
      setValue("email", user.email || "");
      setValue("address", {
        street: parsedAddress?.street || "",
        city: parsedAddress?.city || "",
        state: parsedAddress?.state || "",
        zipCode: parsedAddress?.zipCode || "",
        country: parsedAddress?.country || "",
      });
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        showErrorToast("File size must be less than 5MB");
        e.target.value = ""; // Clear the input
        return;
      }

      // Check file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ];
      if (!allowedTypes.includes(file.type)) {
        showErrorToast("Please select a valid image file (JPG, PNG, or GIF)");
        e.target.value = ""; // Clear the input
        return;
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  };

  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      const token = getStoredToken();
      if (!token) {
        showErrorToast("Authentication token not found. Please log in again.");
        router.push("/login");
        return;
      }

      console.log("Starting profile update with data:", data);
      console.log("Token available:", !!token);

      // Call the client-side API to update profile
      const result = await updateUserProfileAPI(data, token);

      console.log("API result:", result);

      if (result.success) {
        // Update local user data with the response from server
        const updatedUser = { ...user, ...result.data };
        setUser(updatedUser);

        // Update localStorage with new user data
        storeAuthData(token, updatedUser);

        showSuccessToast(result.message || "Profile updated successfully!");
        setIsEditing(false);
      } else {
        console.log("API returned error:", result.error);
        showErrorToast(
          result.error || "Failed to update profile. Please try again."
        );
      }
    } catch (error) {
      console.error("Profile update error in onSubmit:", error);
      showErrorToast("An unexpected error occurred. Please try again.");
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
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Profile Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : user.photo ? (
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
                  {user.address &&
                    (() => {
                      const parsedAddress = parseAddress(user.address);
                      return (
                        parsedAddress && (
                          <div className="flex items-start gap-3 text-sm text-purple-700">
                            <svg
                              className="h-4 w-4 mt-0.5 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            <div>
                              {parsedAddress.street && (
                                <div>{parsedAddress.street}</div>
                              )}
                              {parsedAddress.city && parsedAddress.state && (
                                <div>
                                  {parsedAddress.city}, {parsedAddress.state}
                                </div>
                              )}
                              {parsedAddress.zipCode &&
                                parsedAddress.country && (
                                  <div>
                                    {parsedAddress.zipCode},{" "}
                                    {parsedAddress.country}
                                  </div>
                                )}
                            </div>
                          </div>
                        )
                      );
                    })()}
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
                        value={watch("name") || ""}
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
                        value={watch("email") || ""}
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

                  {/* Photo Upload */}
                  <div className="space-y-2">
                    <label className="text-sm text-purple-700 font-medium">
                      Profile Photo
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-purple-100 flex items-center justify-center">
                        {photoPreview ? (
                          <img
                            src={photoPreview}
                            alt="Profile Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : user?.photo ? (
                          <img
                            src={user.photo}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="h-8 w-8 text-purple-600" />
                        )}
                      </div>
                      {isEditing && (
                        <div className="flex-1">
                          <input
                            {...register("photo")}
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            JPG, PNG or GIF. Max size 5MB.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Address Fields */}
                  <div className="space-y-4">
                    <label className="text-sm text-purple-700 font-medium">
                      Address
                    </label>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-xs text-purple-600 font-medium">
                          Street
                        </label>
                        <input
                          {...register("address.street")}
                          disabled={!isEditing}
                          placeholder="Enter street address"
                          value={watch("address.street") || ""}
                          className={`h-11 w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-purple-200 outline-none ${
                            errors.address?.street
                              ? "border-red-300 focus:border-red-500"
                              : "border-purple-300 focus:border-purple-500"
                          } ${!isEditing ? "bg-gray-50" : ""}`}
                        />
                        {errors.address?.street && (
                          <p className="text-xs text-red-600">
                            {errors.address.street.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-purple-600 font-medium">
                          City
                        </label>
                        <input
                          {...register("address.city")}
                          disabled={!isEditing}
                          placeholder="Enter city"
                          value={watch("address.city") || ""}
                          className={`h-11 w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-purple-200 outline-none ${
                            errors.address?.city
                              ? "border-red-300 focus:border-red-500"
                              : "border-purple-300 focus:border-purple-500"
                          } ${!isEditing ? "bg-gray-50" : ""}`}
                        />
                        {errors.address?.city && (
                          <p className="text-xs text-red-600">
                            {errors.address.city.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-purple-600 font-medium">
                          State
                        </label>
                        <input
                          {...register("address.state")}
                          disabled={!isEditing}
                          placeholder="Enter state"
                          value={watch("address.state") || ""}
                          className={`h-11 w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-purple-200 outline-none ${
                            errors.address?.state
                              ? "border-red-300 focus:border-red-500"
                              : "border-purple-300 focus:border-purple-500"
                          } ${!isEditing ? "bg-gray-50" : ""}`}
                        />
                        {errors.address?.state && (
                          <p className="text-xs text-red-600">
                            {errors.address.state.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-purple-600 font-medium">
                          ZIP Code
                        </label>
                        <input
                          {...register("address.zipCode")}
                          disabled={!isEditing}
                          placeholder="Enter ZIP code"
                          value={watch("address.zipCode") || ""}
                          className={`h-11 w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-purple-200 outline-none ${
                            errors.address?.zipCode
                              ? "border-red-300 focus:border-red-500"
                              : "border-purple-300 focus:border-purple-500"
                          } ${!isEditing ? "bg-gray-50" : ""}`}
                        />
                        {errors.address?.zipCode && (
                          <p className="text-xs text-red-600">
                            {errors.address.zipCode.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs text-purple-600 font-medium">
                          Country
                        </label>
                        <input
                          {...register("address.country")}
                          disabled={!isEditing}
                          placeholder="Enter country"
                          value={watch("address.country") || ""}
                          className={`h-11 w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-purple-200 outline-none ${
                            errors.address?.country
                              ? "border-red-300 focus:border-red-500"
                              : "border-purple-300 focus:border-purple-500"
                          } ${!isEditing ? "bg-gray-50" : ""}`}
                        />
                        {errors.address?.country && (
                          <p className="text-xs text-red-600">
                            {errors.address.country.message}
                          </p>
                        )}
                      </div>
                    </div>
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
