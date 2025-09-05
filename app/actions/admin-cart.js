"use server";

import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

// Get auth token from cookies
const getAuthToken = () => {
  const cookieStore = cookies();
  return cookieStore.get("accessToken")?.value;
};

// Get all user carts (Admin only)
export async function getAllUserCarts(page = 1, limit = 10, search = "") {
  try {
    const token = getAuthToken();
    if (!token) {
      return {
        success: false,
        error: "Authentication required",
      };
    }

    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (search) {
      params.append("search", search);
    }

    const response = await fetch(
      `${API_BASE_URL}/cart/admin/all?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "Failed to fetch user carts",
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error("Error fetching user carts:", error);
    return {
      success: false,
      error: "Failed to fetch user carts",
    };
  }
}

// Get specific user's cart (Admin only)
export async function getUserCart(userId) {
  try {
    console.log("getUserCart - User ID:", userId);
    console.log(
      "getUserCart - API URL:",
      `${API_BASE_URL}/cart/admin/user/${userId}`
    );

    const token = getAuthToken();
    console.log("getUserCart - Token present:", !!token);

    if (!token) {
      return {
        success: false,
        error: "Authentication required",
      };
    }

    const response = await fetch(`${API_BASE_URL}/cart/admin/user/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("getUserCart - Response status:", response.status);
    const result = await response.json();
    console.log("getUserCart - Response data:", result);

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "Failed to fetch user cart",
      };
    }

    // Handle backend response structure
    if (result.statusCode === 200 && result.data) {
      return {
        success: true,
        data: result.data,
      };
    }

    return {
      success: false,
      error: result.message || "Invalid response format",
    };
  } catch (error) {
    console.error("Error fetching user cart:", error);
    return {
      success: false,
      error: "Failed to fetch user cart",
    };
  }
}

// Remove item from user's cart (Admin only)
export async function removeItemFromUserCart(userId, productId) {
  try {
    const token = getAuthToken();
    if (!token) {
      return {
        success: false,
        error: "Authentication required",
      };
    }

    const response = await fetch(
      `${API_BASE_URL}/cart/admin/user/${userId}/item/${productId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "Failed to remove item from user cart",
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error("Error removing item from user cart:", error);
    return {
      success: false,
      error: "Failed to remove item from user cart",
    };
  }
}

// Clear user's cart (Admin only)
export async function clearUserCart(userId) {
  try {
    const token = getAuthToken();
    if (!token) {
      return {
        success: false,
        error: "Authentication required",
      };
    }

    const response = await fetch(
      `${API_BASE_URL}/cart/admin/user/${userId}/clear`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "Failed to clear user cart",
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error("Error clearing user cart:", error);
    return {
      success: false,
      error: "Failed to clear user cart",
    };
  }
}

// Update user's cart item quantity (Admin only)
export async function updateUserCartItemQuantity(userId, productId, quantity) {
  try {
    const token = getAuthToken();
    if (!token) {
      return {
        success: false,
        error: "Authentication required",
      };
    }

    const response = await fetch(
      `${API_BASE_URL}/cart/admin/user/${userId}/item/${productId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "Failed to update user cart item quantity",
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error("Error updating user cart item quantity:", error);
    return {
      success: false,
      error: "Failed to update user cart item quantity",
    };
  }
}
