"use server";

import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Get auth token from cookies
const getAuthToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
};

// Create Order with Integrated Payment
export async function createOrderWithPayment(orderData) {
  try {
    if (process.env.NODE_ENV === "development") {
      console.log("=== ORDER CREATION DEBUG ===");
      console.log("Order data received:", orderData);
      console.log("Order items:", orderData.items);

      // Debug each order item
      orderData.items?.forEach((item, index) => {
        console.log(`Order Item ${index}:`, {
          product: item.product,
          qty: item.qty,
          productType: typeof item.product,
        });
      });
    }

    const token = await getAuthToken();
    if (!token) {
      return {
        success: false,
        error: "Authentication required",
      };
    }

    // Validate order data
    if (!orderData.items || orderData.items.length === 0) {
      return {
        success: false,
        error: "No items in order",
      };
    }

    // Check for valid product IDs
    const invalidItems = orderData.items.filter(
      (item) => !item.product || typeof item.product !== "string"
    );

    if (invalidItems.length > 0) {
      return {
        success: false,
        error: "Invalid product IDs in order",
      };
    }

    // Prepare request body for JSON
    const requestBody = {
      items: orderData.items,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod || "card",
    };

    // Add card details if payment method is card
    if (orderData.paymentMethod === "card") {
      requestBody.cardDetails = {
        number: orderData.cardDetails?.number || "4242424242424242", // Use provided card number or test number
        expMonth: parseInt(orderData.cardDetails?.expMonth) || 12,
        expYear: parseInt(orderData.cardDetails?.expYear) || 2025,
        cvc: orderData.cardDetails?.cvc || "123",
        name:
          orderData.cardDetails?.name ||
          orderData.shippingAddress.name ||
          "Test User",
        email: orderData.shippingAddress.email || "test@example.com",
      };
    } else if (orderData.paymentMethod === "cash") {
      // For cash on delivery, no additional details needed
      requestBody.paymentMethod = "cash";
    }

    if (process.env.NODE_ENV === "development") {
      console.log("Request body:", JSON.stringify(requestBody, null, 2));
    }

    const response = await fetch(`${API_BASE_URL}/orders/with-payment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const result = await response.json();

    if (process.env.NODE_ENV === "development") {
      console.log("API Response status:", response.status);
      console.log("API Response data:", result);
    }

    if (!response.ok) {
      console.error("Order creation failed:", {
        status: response.status,
        statusText: response.statusText,
        error: result,
      });
      return {
        success: false,
        error:
          result.message ||
          result.error ||
          "Failed to create order with payment",
      };
    }

    // Handle backend response structure
    if (result.statusCode === 201 && result.data) {
      return {
        success: true,
        data: result.data,
        message: result.message,
      };
    }

    return {
      success: false,
      error: result.message || "Invalid response format",
    };
  } catch (error) {
    console.error("Error creating order with payment:", error);

    // Handle specific error types
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      return {
        success: false,
        error:
          "Unable to connect to server. Please check your internet connection and try again.",
      };
    }

    if (error.message.includes("JSON")) {
      return {
        success: false,
        error: "Invalid response from server. Please try again.",
      };
    }

    return {
      success: false,
      error: error.message || "Failed to create order with payment",
    };
  }
}

// Create Order (Legacy - for backward compatibility)
export async function createOrder(orderData) {
  try {
    console.log("createOrder called with:", orderData);

    const token = await getAuthToken();
    if (!token) {
      return {
        success: false,
        error: "Authentication required",
      };
    }

    // Validate order data
    if (!orderData.items || orderData.items.length === 0) {
      return {
        success: false,
        error: "No items in order",
      };
    }

    // Check for valid product IDs
    const invalidItems = orderData.items.filter(
      (item) => !item.product || typeof item.product !== "string"
    );
    if (invalidItems.length > 0) {
      console.error("Invalid items in order data:", invalidItems);
      return {
        success: false,
        error: "Invalid product IDs in order",
      };
    }

    // Prepare form data for multipart/form-data
    const formData = new FormData();
    formData.append("items", JSON.stringify(orderData.items));
    formData.append(
      "shippingAddress",
      JSON.stringify(orderData.shippingAddress)
    );
    formData.append("paymentMethod", orderData.paymentMethod);

    console.log("FormData items:", formData.get("items"));
    console.log("FormData shippingAddress:", formData.get("shippingAddress"));
    console.log("FormData paymentMethod:", formData.get("paymentMethod"));

    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    console.log("API Response status:", response.status);
    const result = await response.json();
    console.log("API Response data:", result);

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "Failed to create order",
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
    console.error("Error creating order:", error);
    return {
      success: false,
      error: "Failed to create order",
    };
  }
}

// Get User's Orders
export async function getUserOrders(page = 1, limit = 10) {
  try {
    const token = await getAuthToken();
    if (!token) {
      return {
        success: false,
        error: "Authentication required",
      };
    }

    const response = await fetch(
      `${API_BASE_URL}/orders/myorders?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "Failed to fetch orders",
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
    console.error("Error fetching user orders:", error);
    return {
      success: false,
      error: "Failed to fetch orders",
    };
  }
}

// Get Order by ID
export async function getOrderById(orderId) {
  try {
    const token = await getAuthToken();
    if (!token) {
      return {
        success: false,
        error: "Authentication required",
      };
    }

    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
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
        error: result.message || "Failed to fetch order",
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
    console.error("Error fetching order:", error);
    return {
      success: false,
      error: "Failed to fetch order",
    };
  }
}

// Get Order Status
export async function getOrderStatus(orderId) {
  try {
    const token = await getAuthToken();
    if (!token) {
      return {
        success: false,
        error: "Authentication required",
      };
    }

    const response = await fetch(`${API_BASE_URL}/orders/status/${orderId}`, {
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
        error: result.message || "Failed to fetch order status",
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
    console.error("Error fetching order status:", error);
    return {
      success: false,
      error: "Failed to fetch order status",
    };
  }
}

// Confirm Payment
export async function confirmPayment(paymentId) {
  try {
    const token = await getAuthToken();
    if (!token) {
      return {
        success: false,
        error: "Authentication required",
      };
    }

    const response = await fetch(
      `${API_BASE_URL}/payments/confirm/${paymentId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "Failed to confirm payment",
      };
    }

    // Handle backend response structure
    if (result.statusCode === 200 && result.data) {
      return {
        success: true,
        data: result.data,
        message: result.message,
      };
    }

    return {
      success: false,
      error: result.message || "Invalid response format",
    };
  } catch (error) {
    console.error("Error confirming payment:", error);
    return {
      success: false,
      error: "Failed to confirm payment",
    };
  }
}

// Get Payment Details
export async function getPaymentDetails(paymentId) {
  try {
    const token = await getAuthToken();
    if (!token) {
      return {
        success: false,
        error: "Authentication required",
      };
    }

    const response = await fetch(`${API_BASE_URL}/payments/${paymentId}`, {
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
        error: result.message || "Failed to fetch payment details",
      };
    }

    // Handle backend response structure
    if (result.statusCode === 200 && result.data) {
      return {
        success: true,
        data: result.data,
        message: result.message,
      };
    }

    return {
      success: false,
      error: result.message || "Invalid response format",
    };
  } catch (error) {
    console.error("Error fetching payment details:", error);
    return {
      success: false,
      error: "Failed to fetch payment details",
    };
  }
}
