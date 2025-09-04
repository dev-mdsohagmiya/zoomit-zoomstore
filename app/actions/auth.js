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
