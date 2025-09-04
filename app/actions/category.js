"use server";

const BASE_URL = "http://localhost:8000/api/v1";

// Get all categories (server-side)
export async function getCategories() {
  try {
    const response = await fetch(`${BASE_URL}/categories`, {
      method: "GET",
      cache: "no-store", // Ensure fresh data
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.sucess) {
      // Sort categories by creation date (latest first)
      const sortedCategories = (result.data || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      return { success: true, data: sortedCategories };
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

// Create category (server action)
export async function createCategory(formData, token) {
  try {
    if (!token) {
      return {
        success: false,
        error: "Authentication token not found. Please log in again.",
      };
    }

    console.log("Creating category with FormData:", formData);

    const response = await fetch(`${BASE_URL}/categories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await response.json();
    console.log("Create category API response:", result);

    if (result.sucess) {
      return {
        success: true,
        data: result.data,
        message: result.message || "Category created successfully!",
      };
    } else {
      return {
        success: false,
        error: result.message || "Failed to create category",
      };
    }
  } catch (error) {
    console.error("Error creating category:", error);
    return {
      success: false,
      error: "Failed to create category. Please try again.",
    };
  }
}

// Update category (server action)
export async function updateCategory(categoryId, formData, token) {
  try {
    if (!token) {
      return {
        success: false,
        error: "Authentication token not found. Please log in again.",
      };
    }

    console.log("Updating category with FormData:", formData);

    const response = await fetch(`${BASE_URL}/categories/${categoryId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await response.json();
    console.log("Update category API response:", result);

    if (result.sucess) {
      return {
        success: true,
        data: result.data,
        message: result.message || "Category updated successfully!",
      };
    } else {
      return {
        success: false,
        error: result.message || "Failed to update category",
      };
    }
  } catch (error) {
    console.error("Error updating category:", error);
    return {
      success: false,
      error: "Failed to update category. Please try again.",
    };
  }
}

// Delete category (server action)
export async function deleteCategory(categoryId, token) {
  try {
    if (!token) {
      return {
        success: false,
        error: "Authentication token not found. Please log in again.",
      };
    }

    console.log("Deleting category:", categoryId);

    const response = await fetch(`${BASE_URL}/categories/${categoryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    console.log("Delete category API response:", result);

    if (result.sucess) {
      return {
        success: true,
        message: result.message || "Category deleted successfully!",
      };
    } else {
      return {
        success: false,
        error: result.message || "Failed to delete category",
      };
    }
  } catch (error) {
    console.error("Error deleting category:", error);
    return {
      success: false,
      error: "Failed to delete category. Please try again.",
    };
  }
}
