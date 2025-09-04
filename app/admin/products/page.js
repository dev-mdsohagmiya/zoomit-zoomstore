import AdminLayout from "../../../components/ui/AdminLayout";
import ProductsPageClient from "../../../components/admin/ProductsPageClient";
import { getProducts, getCategories } from "../../actions/product";

export default async function AdminProductsPage() {
  // Fetch products and categories on the server side
  const [productsResult, categoriesResult] = await Promise.all([
    getProducts(1, 10), // Get first 10 products for admin view with pagination
    getCategories(),
  ]);

  const products = productsResult.success ? productsResult.data.products : [];
  const categories = categoriesResult.success ? categoriesResult.data : [];
  const pagination = productsResult.success
    ? productsResult.data.pagination
    : { page: 1, pages: 1, total: 0 };

  return (
    <AdminLayout>
      <ProductsPageClient
        initialProducts={products}
        categories={categories}
        initialPagination={pagination}
      />
    </AdminLayout>
  );
}
