"use server";

const BASE_URL = "http://localhost:8000/api/v1";

// Get all products (server-side)
export async function getProducts(page = 1, limit = 10, filters = {}) {
  try {
    // Build query parameters according to backend specification
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    // Add optional filters if provided
    if (filters.search) {
      params.append("search", filters.search);
    }
    if (filters.category) {
      params.append("category", filters.category);
    }
    if (filters.minPrice) {
      params.append("minPrice", filters.minPrice.toString());
    }
    if (filters.maxPrice) {
      params.append("maxPrice", filters.maxPrice.toString());
    }
    if (filters.sort) {
      params.append("sort", filters.sort);
    }

    const response = await fetch(`${BASE_URL}/products?${params}`, {
      method: "GET",
      cache: "no-store", // Ensure fresh data
    });

    if (!response.ok) {
      const errorResult = await response.json().catch(() => ({}));
      console.error("API Error Response:", errorResult);
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

    // Handle both 'success' and 'sucess' (typo in API) for backward compatibility
    const isSuccess = result.success || result.sucess;

    if (isSuccess) {
      // Sort products by creation date (latest first) if no specific sort is applied
      const sortedProducts = (result.data.products || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      return {
        success: true,
        data: {
          products: sortedProducts,
          pagination: result.data.pagination,
        },
      };
    } else {
      return {
        success: false,
        error: result.message || "Failed to fetch products",
      };
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      success: false,
      error: "Failed to fetch products. Please try again.",
    };
  }
}

// Get all categories for product form (server-side)
export async function getCategories() {
  try {
    const response = await fetch(`${BASE_URL}/categories`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      const errorResult = await response.json().catch(() => ({}));
      console.error("API Error Response:", errorResult);
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

    // Handle both 'success' and 'sucess' (typo in API) for backward compatibility
    const isSuccess = result.success || result.sucess;

    if (isSuccess) {
      return { success: true, data: result.data || [] };
    } else {
      return {
        success: false,
        error: result.message || "Failed to fetch categories",
      };
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      success: false,
      error: "Failed to fetch categories. Please try again.",
    };
  }
}

// Create product (server action)
export async function createProduct(formData, token) {
  try {
    if (!token) {
      return {
        success: false,
        error: "Authentication token not found. Please log in again.",
      };
    }

    console.log("Creating product with FormData:", formData);

    // Debug: Log FormData contents
    console.log("FormData entries:");
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(
          `${key}: File(${value.name}, ${value.size} bytes, ${value.type})`
        );
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    // Count photos specifically for multer debugging
    let photoCount = 0;
    for (let [key, value] of formData.entries()) {
      if (key === "photos" && value instanceof File) {
        photoCount++;
        console.log(
          `Photo ${photoCount}: ${value.name} (${value.size} bytes, ${value.type})`
        );
      }
    }
    console.log(`Total photos in FormData: ${photoCount}`);

    // Log all FormData keys for debugging
    const formDataKeys = [];
    for (let [key, value] of formData.entries()) {
      if (!formDataKeys.includes(key)) {
        formDataKeys.push(key);
      }
    }
    console.log("FormData keys:", formDataKeys);

    const response = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Don't set Content-Type for FormData, let browser set it with boundary
        // This is crucial for file uploads
      },
      body: formData,
    });

    console.log("Response status:", response.status);
    console.log(
      "Response headers:",
      Object.fromEntries(response.headers.entries())
    );

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

    // Log response body for debugging (only on success)
    const responseText = await response.clone().text();
    console.log("Response body:", responseText);

    const result = await response.json();
    console.log("Create product API response:", result);

    // Handle both 'success' and 'sucess' (typo in API) for backward compatibility
    const isSuccess = result.success || result.sucess;

    if (isSuccess) {
      return {
        success: true,
        data: result.data,
        message: result.message || "Product created successfully!",
      };
    } else {
      return {
        success: false,
        error: result.message || "Failed to create product",
      };
    }
  } catch (error) {
    console.error("Error creating product:", error);
    return {
      success: false,
      error: "Failed to create product. Please try again.",
    };
  }
}

// Update product (server action)
export async function updateProduct(productId, formData, token) {
  try {
    if (!token) {
      return {
        success: false,
        error: "Authentication token not found. Please log in again.",
      };
    }

    console.log("Updating product with FormData:", formData);

    // Debug: Log FormData contents for update
    console.log("Update FormData entries:");
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(
          `${key}: File(${value.name}, ${value.size} bytes, ${value.type})`
        );
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    // Count photos specifically for multer debugging
    let photoCount = 0;
    for (let [key, value] of formData.entries()) {
      if (key === "photos" && value instanceof File) {
        photoCount++;
        console.log(
          `Update Photo ${photoCount}: ${value.name} (${value.size} bytes, ${value.type})`
        );
      }
    }
    console.log(`Total photos in Update FormData: ${photoCount}`);

    const response = await fetch(`${BASE_URL}/products/${productId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        // Don't set Content-Type for FormData, let browser set it with boundary
        // This is crucial for file uploads
      },
      body: formData,
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
    console.log("Update product API response:", result);

    // Handle both 'success' and 'sucess' (typo in API) for backward compatibility
    const isSuccess = result.success || result.sucess;

    if (isSuccess) {
      return {
        success: true,
        data: result.data,
        message: result.message || "Product updated successfully!",
      };
    } else {
      return {
        success: false,
        error: result.message || "Failed to update product",
      };
    }
  } catch (error) {
    console.error("Error updating product:", error);
    return {
      success: false,
      error: "Failed to update product. Please try again.",
    };
  }
}

// Delete product (server action)
export async function deleteProduct(productId, token) {
  try {
    if (!token) {
      return {
        success: false,
        error: "Authentication token not found. Please log in again.",
      };
    }

    console.log("Deleting product:", productId);

    const response = await fetch(`${BASE_URL}/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorResult = await response.json().catch(() => ({}));
      console.error("API Error Response:", errorResult);
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
    console.log("Delete product API response:", result);

    // Handle both 'success' and 'sucess' (typo in API) for backward compatibility
    const isSuccess = result.success || result.sucess;

    if (isSuccess) {
      return {
        success: true,
        message: result.message || "Product deleted successfully!",
      };
    } else {
      return {
        success: false,
        error: result.message || "Failed to delete product",
      };
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    return {
      success: false,
      error: "Failed to delete product. Please try again.",
    };
  }
}
