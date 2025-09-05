"use server";

import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

// Helper function to get auth token from cookies
function getAuthToken() {
  const cookieStore = cookies();
  return cookieStore.get("accessToken")?.value;
}

// Get user's cart
export async function getCart() {
  try {
    const token = getAuthToken();

    if (!token) {
      return {
        success: false,
        error: "Authentication required",
        data: null,
      };
    }

    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (process.env.NODE_ENV === "development") {
      console.log("=== CART API DEBUG ===");
      console.log("Cart API Response status:", response.status);
      console.log("Cart API Response data:", result);
    }

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "Failed to fetch cart",
        data: null,
      };
    }

    // Validate cart data structure
    if (result.data && result.data.items) {
      if (process.env.NODE_ENV === "development") {
        console.log("Cart items from API:", result.data.items);

        // Debug each item structure
        result.data.items.forEach((item, index) => {
          console.log(`API Item ${index}:`, {
            product: item.product,
            productId: item.product?._id,
            quantity: item.quantity,
            price: item.price,
            selectedSize: item.selectedSize,
            selectedColor: item.selectedColor,
          });
        });
      }

      // Check if items have proper product structure
      const invalidItems = result.data.items.filter(
        (item) =>
          !item.product ||
          !item.product._id ||
          typeof item.product._id !== "string"
      );

      if (invalidItems.length > 0) {
        return {
          success: false,
          error: "Invalid cart data structure",
          data: null,
        };
      }
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error fetching cart:", error);
    return {
      success: false,
      error: "Failed to fetch cart",
      data: null,
    };
  }
}

// Add item to cart
export async function addToCart(
  productId,
  quantity = 1,
  selectedSize = null,
  selectedColor = null
) {
  try {
    const token = getAuthToken();

    if (!token) {
      return {
        success: false,
        error: "Authentication required",
        data: null,
      };
    }

    const body = {
      productId,
      quantity,
    };

    if (selectedSize) {
      body.selectedSize = selectedSize;
    }

    if (selectedColor) {
      body.selectedColor = selectedColor;
    }

    const response = await fetch(`${API_BASE_URL}/cart/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "Failed to add item to cart",
        data: null,
      };
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error adding to cart:", error);
    return {
      success: false,
      error: "Failed to add item to cart",
      data: null,
    };
  }
}

// Update cart item quantity
export async function updateCartItem(
  productId,
  quantity,
  selectedSize = null,
  selectedColor = null
) {
  try {
    const token = getAuthToken();

    if (!token) {
      return {
        success: false,
        error: "Authentication required",
        data: null,
      };
    }

    const body = {
      productId,
      quantity,
    };

    if (selectedSize) {
      body.selectedSize = selectedSize;
    }

    if (selectedColor) {
      body.selectedColor = selectedColor;
    }

    const response = await fetch(`${API_BASE_URL}/cart/update`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "Failed to update cart item",
        data: null,
      };
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error updating cart item:", error);
    return {
      success: false,
      error: "Failed to update cart item",
      data: null,
    };
  }
}

// Remove item from cart
export async function removeFromCart(productId) {
  try {
    const token = getAuthToken();

    if (!token) {
      return {
        success: false,
        error: "Authentication required",
        data: null,
      };
    }

    const response = await fetch(`${API_BASE_URL}/cart/remove/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "Failed to remove item from cart",
        data: null,
      };
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error removing from cart:", error);
    return {
      success: false,
      error: "Failed to remove item from cart",
      data: null,
    };
  }
}

// Clear entire cart
export async function clearCart() {
  try {
    const token = getAuthToken();

    if (!token) {
      return {
        success: false,
        error: "Authentication required",
        data: null,
      };
    }

    const response = await fetch(`${API_BASE_URL}/cart/clear`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "Failed to clear cart",
        data: null,
      };
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error clearing cart:", error);
    return {
      success: false,
      error: "Failed to clear cart",
      data: null,
    };
  }
}

// Get cart summary
export async function getCartSummary() {
  try {
    const token = getAuthToken();

    if (!token) {
      return {
        success: false,
        error: "Authentication required",
        data: null,
      };
    }

    const response = await fetch(`${API_BASE_URL}/cart/summary`, {
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
        error: result.message || "Failed to fetch cart summary",
        data: null,
      };
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error fetching cart summary:", error);
    return {
      success: false,
      error: "Failed to fetch cart summary",
      data: null,
    };
  }
}
