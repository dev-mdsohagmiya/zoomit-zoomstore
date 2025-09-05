import ProductDetailPageClient from "./ProductDetailPageClient";
import {
  getPublicProduct,
  getPublicProductBySlug,
  getPublicProducts,
  getPublicCategories,
} from "../../actions/public";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({ params }) {
  // Await params as required by Next.js
  const resolvedParams = await params;
  // Decode the identifier in case it's URL encoded
  const productIdentifier = decodeURIComponent(resolvedParams.id); // This could be either ID or slug

  console.log("🚀 Product identifier received:", productIdentifier);

  // Fetch product details
  let product = null;
  let relatedProducts = [];
  let categories = [];

  try {
    // Check if the identifier looks like an ObjectId (24 hex characters)
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(productIdentifier);
    console.log("🔍 Is ObjectId?", isObjectId);

    let productResult;

    if (isObjectId) {
      // If it looks like an ObjectId, try fetching by ID first
      console.log("📋 Fetching by ID:", productIdentifier);
      productResult = await getPublicProduct(productIdentifier);
      console.log(
        "📋 ID fetch result:",
        productResult.success ? "✅ Success" : "❌ Failed"
      );
    } else {
      // If it doesn't look like an ObjectId, try fetching by slug
      console.log("🏷️ Fetching by slug:", productIdentifier);
      productResult = await getPublicProductBySlug(productIdentifier);
      console.log(
        "🏷️ Slug fetch result:",
        productResult.success ? "✅ Success" : "❌ Failed"
      );

      // If slug fetch fails, try ID as fallback
      if (!productResult.success) {
        console.log("🔄 Slug failed, trying ID as fallback");
        productResult = await getPublicProduct(productIdentifier);
        console.log(
          "🔄 ID fallback result:",
          productResult.success ? "✅ Success" : "❌ Failed"
        );
      }
    }

    // Additional debugging
    console.log("🔍 Final product result:", {
      success: productResult.success,
      hasData: !!productResult.data,
      productName: productResult.data?.name,
      error: productResult.error,
    });

    if (productResult.success) {
      product = productResult.data;
      console.log("🎉 Product found:", product.name);
    } else {
      console.error("❌ Failed to fetch product:", productResult.error);
      console.error("❌ Product identifier was:", productIdentifier);
      console.error(
        "❌ Is ObjectId check:",
        /^[0-9a-fA-F]{24}$/.test(productIdentifier)
      );
      notFound();
    }

    // Fetch related products (same category, limit 3)
    if (product && product.categories && product.categories.length > 0) {
      const categorySlug = product.categories[0].slug;
      const relatedResult = await getPublicProducts(1, 4, {
        category: categorySlug,
      });
      if (relatedResult.success) {
        // Filter out current product and limit to 3
        relatedProducts = (relatedResult.data?.products || [])
          .filter((p) => p._id !== product._id)
          .slice(0, 3);
      }
    }

    // Fetch categories for "Shop by Category" section
    const categoriesResult = await getPublicCategories();
    if (categoriesResult.success) {
      categories = categoriesResult.data || [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    notFound();
  }

  if (!product) {
    notFound();
  }
  return (
    <ProductDetailPageClient
      product={product}
      relatedProducts={relatedProducts}
      categories={categories}
    />
  );
}
