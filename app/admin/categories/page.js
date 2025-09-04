import AdminLayout from "../../../components/ui/AdminLayout";
import CategoriesPageClient from "../../../components/admin/CategoriesPageClient";
import { getCategories } from "../../actions/category";

export default async function AdminCategoriesPage() {
  // Fetch categories on the server side
  const categoriesResult = await getCategories();
  const categories = categoriesResult.success ? categoriesResult.data : [];

  return (
    <AdminLayout>
      <CategoriesPageClient initialCategories={categories} />
    </AdminLayout>
  );
}
