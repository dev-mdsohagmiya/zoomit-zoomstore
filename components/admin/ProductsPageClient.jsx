"use client";
import { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Package,
  Star,
  Eye,
  Search,
  Filter,
  X,
} from "lucide-react";
import { getStoredToken } from "../../lib/auth-utils";
import { showSuccessToast, showErrorToast } from "../../lib/toast-utils";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
} from "../../app/actions/product";
import ProductModal from "../ui/ProductModal";
import DeleteConfirmModal from "../ui/DeleteConfirmModal";
import ProductDetailsModal from "../ui/ProductDetailsModal";

export default function ProductsPageClient({
  initialProducts,
  categories,
  initialPagination,
}) {
  const [products, setProducts] = useState(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [allProductsForStats, setAllProductsForStats] = useState([]);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProductsCount, setTotalProductsCount] = useState(0);
  const [productsPerPage] = useState(10);

  // Statistics calculation - use all products for accurate stats
  const getCategoryStats = () => {
    const categoryStats = {};
    const productsForStats =
      allProductsForStats.length > 0 ? allProductsForStats : products;

    productsForStats.forEach((product) => {
      if (product.categories && product.categories.length > 0) {
        product.categories.forEach((category) => {
          categoryStats[category.name] =
            (categoryStats[category.name] || 0) + 1;
        });
      }
    });
    return categoryStats;
  };

  const categoryStats = getCategoryStats();
  // Use totalProductsCount from pagination (backend total) instead of current products length
  const currentTotalProducts = totalProductsCount || products.length;
  const totalCategories = Object.keys(categoryStats).length;

  // Use all products for accurate categorized/uncategorized counts
  const productsForStats =
    allProductsForStats.length > 0 ? allProductsForStats : products;

  // Initialize pagination data from initial products and backend response
  useEffect(() => {
    if (initialPagination) {
      setTotalProductsCount(initialPagination.total);
      setTotalPages(initialPagination.pages);
      setCurrentPage(initialPagination.page);
    } else {
      setTotalProductsCount(initialProducts.length);
      setTotalPages(Math.ceil(initialProducts.length / productsPerPage));
    }
  }, [initialProducts, initialPagination, productsPerPage]);

  // Fetch all products for accurate statistics
  useEffect(() => {
    const fetchAllProductsForStats = async () => {
      try {
        const result = await getProducts(1, 1000); // Get up to 1000 products for stats
        if (result.success) {
          setAllProductsForStats(result.data.products);
        }
      } catch (error) {
        console.error("Error fetching products for statistics:", error);
        // Fallback to current products if API fails
        setAllProductsForStats(products);
      }
    };

    fetchAllProductsForStats();
  }, []);

  // Handle search term changes - when search becomes empty, show default products
  useEffect(() => {
    if (searchTerm === "" && !selectedCategory && !minPrice && !maxPrice) {
      // Only fetch default products if no other filters are active
      const fetchDefaultProducts = async () => {
        try {
          setIsLoading(true);
          const result = await getProducts(1, productsPerPage, {});

          if (result.success) {
            setProducts(result.data.products);
            setCurrentPage(result.data.pagination.page);
            setTotalPages(result.data.pagination.pages);
            setTotalProductsCount(result.data.pagination.total);
          }
        } catch (error) {
          console.error("Error fetching default products:", error);
        } finally {
          setIsLoading(false);
        }
      };

      // Add a small delay to avoid too many API calls
      const timeoutId = setTimeout(fetchDefaultProducts, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [searchTerm, selectedCategory, minPrice, maxPrice, productsPerPage]);

  // Search and filter functions
  const handleSearch = async (page = 1) => {
    setIsLoading(true);
    try {
      const filters = {};

      // Only add search filter if search term is not empty
      if (searchTerm.trim()) {
        filters.search = searchTerm.trim();
      }

      if (selectedCategory) {
        const category = categories.find((cat) => cat._id === selectedCategory);
        if (category) {
          filters.category = category.slug;
        }
      }

      if (minPrice) {
        filters.minPrice = parseFloat(minPrice);
      }

      if (maxPrice) {
        filters.maxPrice = parseFloat(maxPrice);
      }

      if (sortBy) {
        filters.sort = sortBy;
      }

      const result = await getProducts(page, productsPerPage, filters);

      if (result.success) {
        setProducts(result.data.products);
        setCurrentPage(result.data.pagination.page);
        setTotalPages(result.data.pagination.pages);
        setTotalProductsCount(result.data.pagination.total);
      } else {
        showErrorToast(result.error);
      }
    } catch (error) {
      console.error("Error searching products:", error);
      showErrorToast("Failed to search products. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearFilters = async () => {
    setSearchTerm("");
    setSelectedCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("newest");
    setCurrentPage(1);

    // Fetch first page of products from API
    try {
      setIsLoading(true);
      const result = await getProducts(1, productsPerPage, {});

      if (result.success) {
        setProducts(result.data.products);
        setCurrentPage(result.data.pagination.page);
        setTotalPages(result.data.pagination.pages);
        setTotalProductsCount(result.data.pagination.total);
      } else {
        showErrorToast(result.error);
        // Fallback to initial products
        setProducts(initialProducts);
        setTotalProductsCount(initialProducts.length);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error clearing filters:", error);
      showErrorToast("Failed to clear filters. Please try again.");
      // Fallback to initial products
      setProducts(initialProducts);
      setTotalProductsCount(initialProducts.length);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setCurrentPage(1);
      handleSearch(1);
    }
  };

  // Pagination functions
  const handlePageChange = (page) => {
    setCurrentPage(page);
    handleSearch(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  // Create product using server action
  const handleCreateProduct = async (formData) => {
    console.log("handleCreateProduct called with FormData");
    try {
      const token = getStoredToken();
      if (!token) {
        showErrorToast("Authentication token not found. Please log in again.");
        return;
      }

      console.log("Calling createProduct server action");
      const result = await createProduct(formData, token);
      console.log("createProduct result:", result);

      if (result.success) {
        showSuccessToast(result.message);
        // Add the new product to the top of the list (latest first)
        setProducts((prev) => [result.data, ...prev]);
        // Update total count for statistics
        setTotalProductsCount((prev) => prev + 1);
        setIsModalOpen(false);
      } else {
        showErrorToast(result.error);
      }
    } catch (error) {
      console.error("Error creating product:", error);
      showErrorToast("Failed to create product. Please try again.");
    }
  };

  // Update product using server action
  const handleUpdateProduct = async (formData) => {
    console.log("handleUpdateProduct called with FormData");
    console.log("Editing product ID:", editingProduct._id);
    try {
      const token = getStoredToken();
      if (!token) {
        showErrorToast("Authentication token not found. Please log in again.");
        return;
      }

      console.log("Calling updateProduct server action");
      const result = await updateProduct(editingProduct._id, formData, token);
      console.log("updateProduct result:", result);

      if (result.success) {
        showSuccessToast(result.message);
        // Update the product in the list and maintain sorting
        setProducts((prev) => {
          const updated = prev.map((prod) =>
            prod._id === editingProduct._id ? result.data : prod
          );
          // Re-sort by creation date (latest first) to maintain order
          return updated.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        });
        setIsModalOpen(false);
        setEditingProduct(null);
      } else {
        showErrorToast(result.error);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      showErrorToast("Failed to update product. Please try again.");
    }
  };

  // Delete product using server action
  const handleDeleteProduct = async () => {
    try {
      const token = getStoredToken();
      if (!token) {
        showErrorToast("Authentication token not found. Please log in again.");
        return;
      }

      const result = await deleteProduct(productToDelete._id, token);

      if (result.success) {
        showSuccessToast(result.message);
        // Remove the product from the list
        setProducts((prev) =>
          prev.filter((prod) => prod._id !== productToDelete._id)
        );
        // Update total count for statistics
        setTotalProductsCount((prev) => Math.max(0, prev - 1));
        setDeleteModalOpen(false);
        setProductToDelete(null);
      } else {
        showErrorToast(result.error);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      showErrorToast("Failed to delete product. Please try again.");
    }
  };

  // Handle modal operations
  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProductClick = (product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const handleShowDetails = (product) => {
    setSelectedProduct(product);
    setDetailsModalOpen(true);
  };

  const handleDetailsModalClose = () => {
    setDetailsModalOpen(false);
    setSelectedProduct(null);
  };

  // Format price with discount
  const formatPrice = (price, discount = 0) => {
    const discountedPrice = price - (price * discount) / 100;
    return {
      original: price,
      discounted: discountedPrice,
      discount: discount,
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">
            Manage your product catalog and inventory
          </p>
        </div>
        <button
          onClick={handleAddProduct}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Products Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-4 sm:p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Package className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Products
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {currentTotalProducts}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Total Categories Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-4 sm:p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Package className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Categories
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {totalCategories}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Products with Categories Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-4 sm:p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Categorized Products
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {
                      productsForStats.filter(
                        (p) => p.categories && p.categories.length > 0
                      ).length
                    }
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Uncategorized Products Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-4 sm:p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Package className="h-8 w-8 text-orange-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Uncategorized
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {
                      productsForStats.filter(
                        (p) => !p.categories || p.categories.length === 0
                      ).length
                    }
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white shadow rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h3 className="text-lg font-medium text-gray-900">Search & Filter</h3>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 w-full sm:w-auto"
          >
            <Filter className="h-4 w-4 mr-2" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <button
            onClick={() => {
              setCurrentPage(1);
              handleSearch(1);
            }}
            disabled={isLoading}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Searching...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Search
              </>
            )}
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="border-t pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Min Price Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min Price
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              {/* Max Price Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Price
                </label>
                <input
                  type="number"
                  placeholder="1000.00"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              {/* Sort Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
              <button
                onClick={clearFilters}
                className="inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 w-full sm:w-auto"
              >
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </button>

              <div className="text-sm text-gray-500 text-center sm:text-right">
                {totalProductsCount} product
                {totalProductsCount !== 1 ? "s" : ""} total
                {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Products Table */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            All Products ({products.length})
          </h3>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No products
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new product.
            </p>
            <div className="mt-6">
              <button
                onClick={handleAddProduct}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => {
                  const priceInfo = formatPrice(
                    product.price,
                    product.discount
                  );
                  return (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td
                        className="px-4 sm:px-6 py-4"
                        style={{ maxWidth: "300px", width: "300px" }}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-12 w-12">
                            {product.photos && product.photos.length > 0 ? (
                              <img
                                className="h-12 w-12 rounded-lg object-cover"
                                src={product.photos[0]}
                                alt={product.name}
                              />
                            ) : (
                              <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                                <Package className="h-6 w-6 text-purple-600" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4 min-w-0 flex-1">
                            <div className="text-sm font-medium text-gray-900 break-words">
                              {product.name}
                            </div>
                            <div
                              className="text-sm text-gray-500 cursor-pointer hover:text-gray-700 transition-colors mt-1"
                              title="Click to view full details"
                              onClick={() => handleShowDetails(product)}
                            >
                              <div
                                className="break-words"
                                style={{
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                  lineHeight: "1.2em",
                                  maxHeight: "2.4em",
                                }}
                              >
                                {product.description || "No description"}
                              </div>
                            </div>
                            <div className="text-xs text-gray-400 break-words mt-1">
                              {product.categories
                                ?.map((cat) => cat.name)
                                .join(", ") || "No categories"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {priceInfo.discount > 0 ? (
                            <div>
                              <div className="text-green-600 font-medium">
                                ৳{priceInfo.discounted.toFixed(2)}
                              </div>
                              <div className="text-xs text-gray-500 line-through">
                                ৳{priceInfo.original.toFixed(2)}
                              </div>
                            </div>
                          ) : (
                            <div className="font-medium">
                              ৳{priceInfo.original.toFixed(2)}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {product.stock} units
                        </div>
                        <div
                          className={`text-xs ${
                            product.inStock && product.stock > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {product.inStock && product.stock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm text-gray-900">
                            {product.rating || 0}
                          </span>
                          <span className="ml-1 text-xs text-gray-500">
                            ({product.numReviews || 0})
                          </span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            product.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="text-purple-600 hover:text-purple-900"
                            title="Edit product"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProductClick(product)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete product"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages >= 1 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1 || isLoading}
              className="relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages || isLoading}
              className="relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="flex-1 flex items-center justify-between">
            <div className="hidden sm:block">
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {(currentPage - 1) * productsPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(currentPage * productsPerPage, totalProductsCount)}
                </span>{" "}
                of <span className="font-medium">{totalProductsCount}</span>{" "}
                results
              </p>
            </div>
            <div className="block sm:hidden">
              <p className="text-sm text-gray-700">
                Page <span className="font-medium">{currentPage}</span> of{" "}
                <span className="font-medium">{totalPages}</span>
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1 || isLoading}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {/* Page numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      disabled={isLoading}
                      className={`relative inline-flex items-center px-2 sm:px-4 py-2 border text-sm font-medium ${
                        currentPage === pageNum
                          ? "z-10 bg-purple-50 border-purple-500 text-purple-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages || isLoading}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
        product={editingProduct}
        categories={categories}
        title={editingProduct ? "Edit Product" : "Add New Product"}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteModalClose}
        onConfirm={handleDeleteProduct}
        title="Delete Product"
        message={`Are you sure you want to delete "${productToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />

      {/* Product Details Modal */}
      <ProductDetailsModal
        isOpen={detailsModalOpen}
        onClose={handleDetailsModalClose}
        product={selectedProduct}
      />
    </div>
  );
}
