"use client";
import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, Package } from "lucide-react";
import { getStoredToken } from "../../lib/auth-utils";
import { showSuccessToast, showErrorToast } from "../../lib/toast-utils";
import CategoryModal from "../ui/CategoryModal";
import DeleteConfirmModal from "../ui/DeleteConfirmModal";

const BASE_URL = "http://localhost:8000/api/v1";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/categories`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.sucess) {
        setCategories(result.data || []);
      } else {
        showErrorToast(result.message || "Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      showErrorToast("Failed to fetch categories. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Create category
  const createCategory = async (categoryData) => {
    try {
      const token = getStoredToken();
      if (!token) {
        showErrorToast("Authentication token not found. Please log in again.");
        return;
      }

      console.log("Creating category with data:", categoryData);

      const formData = new FormData();
      formData.append("name", categoryData.name);

      if (categoryData.image && categoryData.image.length > 0) {
        console.log("Adding image to FormData:", categoryData.image[0]);
        formData.append("image", categoryData.image[0]);
      } else {
        console.log("No image to upload");
      }

      // Log FormData contents
      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await fetch(`${BASE_URL}/categories`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      console.log("API response:", result);

      if (result.sucess) {
        showSuccessToast(result.message || "Category created successfully!");
        await fetchCategories();
        setIsModalOpen(false);
      } else {
        showErrorToast(result.message || "Failed to create category");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      showErrorToast("Failed to create category. Please try again.");
    }
  };

  // Update category
  const updateCategory = async (categoryData) => {
    try {
      const token = getStoredToken();
      if (!token) {
        showErrorToast("Authentication token not found. Please log in again.");
        return;
      }

      console.log("Updating category with data:", categoryData);

      const formData = new FormData();
      formData.append("name", categoryData.name);

      if (categoryData.image && categoryData.image.length > 0) {
        console.log("Adding image to FormData:", categoryData.image[0]);
        formData.append("image", categoryData.image[0]);
      } else {
        console.log("No image to upload");
      }

      // Log FormData contents
      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await fetch(
        `${BASE_URL}/categories/${editingCategory._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await response.json();
      console.log("API response:", result);

      if (result.sucess) {
        showSuccessToast(result.message || "Category updated successfully!");
        await fetchCategories();
        setIsModalOpen(false);
        setEditingCategory(null);
      } else {
        showErrorToast(result.message || "Failed to update category");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      showErrorToast("Failed to update category. Please try again.");
    }
  };

  // Delete category
  const deleteCategory = async () => {
    try {
      const token = getStoredToken();
      if (!token) {
        showErrorToast("Authentication token not found. Please log in again.");
        return;
      }

      const response = await fetch(
        `${BASE_URL}/categories/${categoryToDelete._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (result.sucess) {
        showSuccessToast(result.message || "Category deleted successfully!");
        await fetchCategories();
        setDeleteModalOpen(false);
        setCategoryToDelete(null);
      } else {
        showErrorToast(result.message || "Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      showErrorToast("Failed to delete category. Please try again.");
    }
  };

  // Handle modal operations
  const handleAddCategory = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = (category) => {
    setCategoryToDelete(category);
    setDeleteModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
    setCategoryToDelete(null);
  };

  // Load categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        </div>
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-1">
            Manage product categories and their organization
          </p>
        </div>
        <button
          onClick={handleAddCategory}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </button>
      </div>

      {/* Categories Table */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            All Categories ({categories.length})
          </h3>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No categories
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new category.
            </p>
            <div className="mt-6">
              <button
                onClick={handleAddCategory}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Products
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {category.image ? (
                            <img
                              className="h-10 w-10 rounded-lg object-cover"
                              src={category.image}
                              alt={category.name}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                              <Package className="h-5 w-5 text-purple-600" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {category.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {category.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {category.products ? category.products.length : 0}{" "}
                        products
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(category.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditCategory(category)}
                          className="text-purple-600 hover:text-purple-900"
                          title="Edit category"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete category"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Category Modal */}
      <CategoryModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={editingCategory ? updateCategory : createCategory}
        category={editingCategory}
        title={editingCategory ? "Edit Category" : "Add New Category"}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteModalClose}
        onConfirm={deleteCategory}
        title="Delete Category"
        message={`Are you sure you want to delete "${categoryToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
