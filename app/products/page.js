import ProductsPageClient from "./ProductsPageClient";
import { getPublicProducts, getPublicCategories } from "../actions/public";

export default async function ProductsPage({ searchParams }) {
  // Extract search parameters
  const page = parseInt(searchParams?.page) || 1;
  const search = searchParams?.search || "";
  const category = searchParams?.category || "";
  const minPrice = searchParams?.minPrice || "";
  const maxPrice = searchParams?.maxPrice || "";
  const sort = searchParams?.sort || "";

  // Build filters object
  const filters = {};
  if (search) filters.search = search;
  if (category) filters.category = category;
  if (minPrice) filters.minPrice = parseFloat(minPrice);
  if (maxPrice) filters.maxPrice = parseFloat(maxPrice);
  if (sort) filters.sort = sort;

  // Fetch products and categories
  let products = [];
  let pagination = { page: 1, pages: 1, total: 0 };
  let categories = [];

  try {
    // Fetch products
    const productsResult = await getPublicProducts(page, 10, filters);
    if (productsResult.success) {
      products = productsResult.data?.products || [];
      pagination = productsResult.data?.pagination || pagination;
    } else {
      console.error("Failed to fetch products:", productsResult.error);
    }

    // Fetch categories
    const categoriesResult = await getPublicCategories();
    if (categoriesResult.success) {
      categories = categoriesResult.data || [];
    } else {
      console.error("Failed to fetch categories:", categoriesResult.error);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <ProductsPageClient
      initialProducts={products}
      initialCategories={categories}
      initialPagination={pagination}
      searchParams={searchParams}
    />
  );
}
