"use server";

import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

// Get all users with pagination and filtering (Admin/SuperAdmin)
export async function getAllUsersByAdminAndSuperAdmin(
  page = 1,
  limit = 10,
  filters = {}
) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("accessToken")?.value;

    console.log("Access token found:", !!token);

    if (!token) {
      return {
        success: false,
        error: "Authentication token not found. Please log in again.",
      };
    }

    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    // Add filter parameters
    if (filters.search) {
      params.append("search", filters.search);
    }
    if (filters.role) {
      params.append("role", filters.role);
    }
    if (filters.status) {
      params.append("status", filters.status);
    }

    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      let errorResult = {};
      try {
        errorResult = await response.json();
        console.error("API Error Response:", errorResult);
      } catch (jsonError) {
        console.error("Failed to parse error response as JSON:", jsonError);
        const errorText = await response.text();
        console.error("Raw error response:", errorText);
        errorResult = { message: errorText || "Unknown error" };
      }

      console.error("Response status:", response.status);
      console.error("Response statusText:", response.statusText);

      return {
        success: false,
        error:
          errorResult.message ||
          `HTTP error! status: ${response.status} - ${response.statusText}`,
      };
    }

    const result = await response.json();
    console.log("Get users API response:", result);

    // Handle both 'success' and 'sucess' (typo in API) for backward compatibility
    const isSuccess = result.success || result.sucess;

    if (isSuccess) {
      return {
        success: true,
        data: result.data,
        message: result.message || "Users retrieved successfully",
      };
    } else {
      return {
        success: false,
        error: result.message || "Failed to retrieve users",
      };
    }
  } catch (error) {
    console.error("Error in getUsers:", error);
    return {
      success: false,
      error: "Failed to retrieve users. Please try again.",
    };
  }
}

// Create a new user (Admin/SuperAdmin - using /users endpoint)
export async function createUserByAdminAndSuperAdmin(userData) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return {
        success: false,
        error: "Authentication token not found. Please log in again.",
      };
    }

    console.log("Creating user with data:", userData);

    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Don't set Content-Type for FormData, let browser set it
      },
      body: userData, // This should be FormData for file uploads
    });

    if (!response.ok) {
      let errorResult = {};
      try {
        errorResult = await response.json();
        console.error("API Error Response:", errorResult);
      } catch (jsonError) {
        console.error("Failed to parse error response as JSON:", jsonError);
        const errorText = await response.text();
        console.error("Raw error response:", errorText);
        errorResult = { message: errorText || "Unknown error" };
      }

      console.error("Response status:", response.status);
      console.error("Response statusText:", response.statusText);

      return {
        success: false,
        error:
          errorResult.message ||
          `HTTP error! status: ${response.status} - ${response.statusText}`,
      };
    }

    const result = await response.json();
    console.log("Create user API response:", result);

    // Handle both 'success' and 'sucess' (typo in API) for backward compatibility
    const isSuccess = result.success || result.sucess;

    if (isSuccess) {
      return {
        success: true,
        data: result.data,
        message: result.message || "User created successfully",
      };
    } else {
      return {
        success: false,
        error: result.message || "Failed to create user",
      };
    }
  } catch (error) {
    console.error("Error in createUser:", error);
    return {
      success: false,
      error: "Failed to create user. Please try again.",
    };
  }
}

// Update user (Admin/SuperAdmin - using /users/:id endpoint)
export async function updateUserByAdminAndSuperAdmin(userId, userData) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return {
        success: false,
        error: "Authentication token not found. Please log in again.",
      };
    }

    console.log("Updating user with ID:", userId);
    console.log("User data:", userData);

    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        // Don't set Content-Type for FormData, let browser set it
      },
      body: userData, // This should be FormData for file uploads
    });

    if (!response.ok) {
      let errorResult = {};
      try {
        errorResult = await response.json();
        console.error("API Error Response:", errorResult);
      } catch (jsonError) {
        console.error("Failed to parse error response as JSON:", jsonError);
        const errorText = await response.text();
        console.error("Raw error response:", errorText);
        errorResult = { message: errorText || "Unknown error" };
      }

      console.error("Response status:", response.status);
      console.error("Response statusText:", response.statusText);

      return {
        success: false,
        error:
          errorResult.message ||
          `HTTP error! status: ${response.status} - ${response.statusText}`,
      };
    }

    const result = await response.json();
    console.log("Update user API response:", result);

    // Handle both 'success' and 'sucess' (typo in API) for backward compatibility
    const isSuccess = result.success || result.sucess;

    if (isSuccess) {
      return {
        success: true,
        data: result.data,
        message: result.message || "User updated successfully",
      };
    } else {
      return {
        success: false,
        error: result.message || "Failed to update user",
      };
    }
  } catch (error) {
    console.error("Error in updateUser:", error);
    return {
      success: false,
      error: "Failed to update user. Please try again.",
    };
  }
}

// Delete user (Admin/SuperAdmin - using /users/:id endpoint)
export async function deleteUserByAdminAndSuperAdmin(userId) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return {
        success: false,
        error: "Authentication token not found. Please log in again.",
      };
    }

    console.log("Deleting user with ID:", userId);

    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      let errorResult = {};
      try {
        errorResult = await response.json();
        console.error("API Error Response:", errorResult);
      } catch (jsonError) {
        console.error("Failed to parse error response as JSON:", jsonError);
        const errorText = await response.text();
        console.error("Raw error response:", errorText);
        errorResult = { message: errorText || "Unknown error" };
      }

      console.error("Response status:", response.status);
      console.error("Response statusText:", response.statusText);

      return {
        success: false,
        error:
          errorResult.message ||
          `HTTP error! status: ${response.status} - ${response.statusText}`,
      };
    }

    const result = await response.json();
    console.log("Delete user API response:", result);

    // Handle both 'success' and 'sucess' (typo in API) for backward compatibility
    const isSuccess = result.success || result.sucess;

    if (isSuccess) {
      return {
        success: true,
        message: result.message || "User deleted successfully",
      };
    } else {
      return {
        success: false,
        error: result.message || "Failed to delete user",
      };
    }
  } catch (error) {
    console.error("Error in deleteUser:", error);
    return {
      success: false,
      error: "Failed to delete user. Please try again.",
    };
  }
}

// Get current user profile
export async function getUserProfile() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return {
        success: false,
        error: "Authentication token not found. Please log in again.",
      };
    }

    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "Failed to fetch user profile",
      };
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return {
      success: false,
      error: "Failed to fetch user profile",
    };
  }
}

// Create admin (Super Admin only - using /admin/create endpoint)
export async function createAdminBySuperAdmin(adminData) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return {
        success: false,
        error: "Authentication token not found. Please log in again.",
      };
    }

    console.log("Creating admin with data:", adminData);

    const response = await fetch(`${API_BASE_URL}/admin/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Don't set Content-Type for FormData, let browser set it
      },
      body: adminData, // This should be FormData for file uploads
    });

    if (!response.ok) {
      let errorResult = {};
      try {
        errorResult = await response.json();
        console.error("API Error Response:", errorResult);
      } catch (jsonError) {
        console.error("Failed to parse error response as JSON:", jsonError);
        const errorText = await response.text();
        console.error("Raw error response:", errorText);
        errorResult = { message: errorText || "Unknown error" };
      }

      console.error("Response status:", response.status);
      console.error("Response statusText:", response.statusText);

      return {
        success: false,
        error:
          errorResult.message ||
          `HTTP error! status: ${response.status} - ${response.statusText}`,
      };
    }

    const result = await response.json();
    console.log("Create admin API response:", result);

    // Handle both 'success' and 'sucess' (typo in API) for backward compatibility
    const isSuccess = result.success || result.sucess;

    if (isSuccess) {
      return {
        success: true,
        data: result.data,
        message: result.message || "Admin created successfully",
      };
    } else {
      return {
        success: false,
        error: result.message || "Failed to create admin",
      };
    }
  } catch (error) {
    console.error("Error in createAdmin:", error);
    return {
      success: false,
      error: "Failed to create admin. Please try again.",
    };
  }
}
