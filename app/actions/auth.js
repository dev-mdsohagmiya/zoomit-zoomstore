"use server";

import { redirect } from "next/navigation";

const BASE_URL = "http://localhost:8000/api/v1";

export async function registerUser(formData) {
  try {
    // Create FormData for multipart/form-data request
    const data = new FormData();

    // Add required fields
    data.append("name", `${formData.firstName} ${formData.lastName}`);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("role", "user"); // Default role for registration

    // Note: Photo upload can be added later if needed
    // if (formData.photo) {
    //   data.append("photo", formData.photo);
    // }

    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      body: data,
      // Don't set Content-Type header, let fetch set it automatically for FormData
    });

    const result = await response.json();

    if (!response.ok) {
      // Handle API errors
      return {
        success: false,
        error: result.message || "Registration failed. Please try again.",
        fieldErrors: result.errors || {},
      };
    }

    // Registration successful - handle the actual response structure
    if (result.sucess && result.data) {
      return {
        success: true,
        data: {
          user: result.data.user,
          accessToken: result.data.accessToken,
        },
        message:
          result.message || "Registration successful! Redirecting to login...",
      };
    }

    // Fallback for unexpected response structure
    return {
      success: true,
      data: result,
      message: "Registration successful! Redirecting to login...",
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      error: "Network error. Please check your connection and try again.",
    };
  }
}

export async function loginUser(formData) {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "Login failed. Please check your credentials.",
      };
    }

    // Login successful - handle the actual response structure
    if (result.sucess && result.data) {
      return {
        success: true,
        data: {
          user: result.data.user,
          accessToken: result.data.accessToken,
        },
        message: result.message || "Login successful!",
      };
    }

    // Fallback for unexpected response structure
    return {
      success: true,
      data: result,
      message: "Login successful!",
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: "Network error. Please check your connection and try again.",
    };
  }
}

export async function logoutUser(token) {
  try {
    if (!token) {
      return {
        success: false,
        error: "No authentication token found.",
      };
    }

    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return {
        success: false,
        error: "Logout failed. Please try again.",
      };
    }

    return {
      success: true,
      message: "Logged out successfully!",
    };
  } catch (error) {
    console.error("Logout error:", error);
    return {
      success: false,
      error: "Network error during logout.",
    };
  }
}

export async function updateUserProfile(formData, token) {
  try {
    if (!token) {
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

    const response = await fetch(`${BASE_URL}/users/profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        // Don't set Content-Type for FormData, let browser set it with boundary
      },
      body: data,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || `HTTP error! status: ${response.status}`,
      };
    }

    const result = await response.json();
    return {
      success: true,
      data: result.data,
      message: result.message || "Profile updated successfully!",
    };
  } catch (error) {
    console.error("Profile update error:", error);
    return {
      success: false,
      error: "Network error. Please check your connection and try again.",
    };
  }
}
