"use server";

const BASE_URL = "http://localhost:8000/api/v1";

// Get all products (server-side)
export async function getProducts(page = 1, limit = 10, filters = {}) {
  try {
    // Build query parameters
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters,
    });

    const response = await fetch(`${BASE_URL}/products?${params}`, {
      method: "GET",
      cache: "no-store", // Ensure fresh data
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.sucess) {
      // Sort products by creation date (latest first)
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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.sucess) {
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

    const response = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await response.json();
    console.log("Create product API response:", result);

    if (result.sucess) {
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

    const response = await fetch(`${BASE_URL}/products/${productId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await response.json();
    console.log("Update product API response:", result);

    if (result.sucess) {
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

    const result = await response.json();
    console.log("Delete product API response:", result);

    if (result.sucess) {
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
