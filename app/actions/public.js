"use server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim();
}

// Get all products (public endpoint)
export async function getPublicProducts(page = 1, limit = 12, filters = {}) {
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

    const response = await fetch(`${API_BASE_URL}/products?${params}`, {
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
    console.log("Products API Response:", result);

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      success: false,
      error: "Failed to fetch products. Please try again later.",
    };
  }
}

// Get all categories (public endpoint)
export async function getPublicCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: "GET",
      cache: "no-store", // Ensure fresh data
    });

    if (!response.ok) {
      const errorResult = await response.json().catch(() => ({}));
      console.error("Categories API Error Response:", errorResult);
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
    console.log("Categories API Response:", result);

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      success: false,
      error: "Failed to fetch categories. Please try again later.",
    };
  }
}

// Get single product by ID (public endpoint)
export async function getPublicProduct(productId) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
      method: "GET",
      cache: "no-store", // Ensure fresh data
    });

    if (!response.ok) {
      const errorResult = await response.json().catch(() => ({}));
      console.error("Product API Error Response:", errorResult);
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
    console.log("Product API Response:", result);

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return {
      success: false,
      error: "Failed to fetch product. Please try again later.",
    };
  }
}

// Get single product by slug (public endpoint)
// Since backend doesn't have slug endpoint, we'll search by slug in all products
export async function getPublicProductBySlug(productSlug) {
  try {
    console.log("🔍 Searching for product with slug:", productSlug);

    // First, get all products and find the one with matching slug
    const response = await fetch(`${API_BASE_URL}/products?limit=1000`, {
      method: "GET",
      cache: "no-store", // Ensure fresh data
    });

    if (!response.ok) {
      const errorResult = await response.json().catch(() => ({}));
      console.error("Products API Error Response:", errorResult);
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
    console.log("🔍 API Response structure:", {
      success: result.success,
      hasData: !!result.data,
      hasProducts: !!result.data?.products,
      productsLength: result.data?.products?.length || 0,
      message: result.message,
    });

    // Handle backend typo: "sucess" instead of "success"
    const isSuccess = result.success || result.sucess;

    if (!isSuccess) {
      console.log("❌ API call failed:", result.message || "Unknown error");
      console.log("❌ Full API response:", result);
      return {
        success: false,
        error: result.message || "API call failed",
      };
    }

    if (!result.data?.products) {
      console.log("❌ No products found in API response");
      console.log("❌ Full API response:", result);

      // Try alternative response structure
      if (result.data && Array.isArray(result.data)) {
        console.log("🔄 Trying alternative structure - data is array");
        result.data.products = result.data;
      } else if (result.products) {
        console.log("🔄 Trying alternative structure - products at root level");
        result.data = { products: result.products };
      } else {
        return {
          success: false,
          error: "No products found",
        };
      }
    }

    console.log("📦 Total products found:", result.data.products.length);
    console.log(
      "🏷️ Available slugs:",
      result.data.products.map((p) => p.slug).slice(0, 5)
    );

    // Find product by slug (exact match first, then generated slug match)
    let product = result.data.products.find((p) => p.slug === productSlug);

    if (product) {
      console.log("✅ Exact slug match found:", product.name);
    } else {
      console.log("⚠️ Exact slug match failed, trying generated slug match...");

      // Try matching with generated slug from product name
      product = result.data.products.find((p) => {
        if (!p.name) return false;
        const generatedSlug = generateSlug(p.name);
        console.log(
          `🔍 Comparing "${productSlug}" with generated slug "${generatedSlug}" for product "${p.name}"`
        );
        return generatedSlug === productSlug;
      });

      if (product) {
        console.log("✅ Generated slug match found:", product.name);
      } else {
        console.log("⚠️ Generated slug match failed, trying partial match...");
        // If generated slug match fails, try partial match
        product = result.data.products.find(
          (p) =>
            (p.slug && p.slug.includes(productSlug)) ||
            productSlug.includes(p.slug) ||
            (p.name && generateSlug(p.name).includes(productSlug)) ||
            (p.name && productSlug.includes(generateSlug(p.name)))
        );

        if (product) {
          console.log("✅ Partial match found:", product.name);
        }
      }
    }

    if (!product) {
      console.log("❌ Product not found with slug:", productSlug);
      console.log("❌ Available slugs for comparison:");
      result.data.products.forEach((p, index) => {
        if (p.slug) {
          console.log(`  ${index + 1}. ${p.slug} (length: ${p.slug.length})`);
        }
      });
      return {
        success: false,
        error: "Product not found",
      };
    }

    console.log("🎉 Product found by slug:", product.name);
    return {
      success: true,
      data: product,
      message: "Product found by slug",
    };
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return {
      success: false,
      error: "Failed to fetch product. Please try again later.",
    };
  }
}
