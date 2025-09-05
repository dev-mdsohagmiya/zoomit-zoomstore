"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  X,
  ShoppingCart,
  User,
  Trash2,
  Loader2,
  Eye,
  DollarSign,
  Package,
} from "lucide-react";
import { getAllUserCarts, clearUserCart } from "../../app/actions/admin-cart";
import { showSuccessToast, showErrorToast } from "../../lib/toast-utils";
import { truncateText } from "../../lib/utils";

export default function AdminCartsPageClient({
  initialCarts,
  initialPagination,
  searchParams,
}) {
  const [carts, setCarts] = useState(initialCarts);
  const [pagination, setPagination] = useState(initialPagination);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState({});
  const [searchTerm, setSearchTerm] = useState(searchParams.search || "");
  const [showFilters, setShowFilters] = useState(false);

  const router = useRouter();
  const currentSearchParams = useSearchParams();

  // Update URL with new search params
  const updateURL = (newParams) => {
    const params = new URLSearchParams(currentSearchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    router.push(`?${params.toString()}`);
  };

  // Refresh data
  const refreshData = async () => {
    setIsLoading(true);
    try {
      const result = await getAllUserCarts(
        pagination.currentPage,
        pagination.limit,
        searchTerm
      );
      if (result.success) {
        setCarts(result.data.carts);
        setPagination(result.data.pagination);
      } else {
        showErrorToast(result.error);
      }
    } catch (error) {
      showErrorToast("Failed to refresh data");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    updateURL({ search: searchTerm, page: 1 });
    refreshData();
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchTerm("");
    updateURL({ search: "", page: 1 });
    refreshData();
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    updateURL({ page: newPage });
    refreshData();
  };

  // Handle clear user cart
  const handleClearCart = async (userId) => {
    setIsUpdating((prev) => ({ ...prev, [`clear-${userId}`]: true }));

    try {
      const result = await clearUserCart(userId);
      if (result.success) {
        showSuccessToast("User cart cleared successfully");
        await refreshData();
      } else {
        showErrorToast(result.error);
      }
    } catch (error) {
      showErrorToast("Failed to clear user cart");
    } finally {
      setIsUpdating((prev) => ({ ...prev, [`clear-${userId}`]: false }));
    }
  };

  // Handle view cart details
  const handleViewCart = (cart) => {
    console.log("handleViewCart - Cart object:", cart);
    console.log("handleViewCart - User ID:", cart.user?._id);

    if (!cart.user?._id) {
      showErrorToast("User ID not found in cart data");
      return;
    }

    // Use window.location.href to ensure correct port
    const url = `/admin/carts/${cart.user._id}?modal=true`;
    console.log("handleViewCart - Navigating to:", url);
    console.log("handleViewCart - Current location:", window.location.href);

    // Try router.push first, fallback to window.location
    try {
      router.push(url);
    } catch (error) {
      console.error("Router push failed, using window.location:", error);
      window.location.href = url;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculate total value
  const calculateTotalValue = () => {
    return carts.reduce((total, cart) => total + cart.totalPrice, 0);
  };

  // Calculate total items
  const calculateTotalItems = () => {
    return carts.reduce((total, cart) => total + cart.totalItems, 0);
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Carts</p>
              <p className="text-2xl font-bold text-gray-900">
                {pagination.totalCarts}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">
                {calculateTotalItems()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">
                ৳{calculateTotalValue().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by user name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </form>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Filter className="h-5 w-5" />
            Filters
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Items per page
                </label>
                <select
                  value={pagination.limit}
                  onChange={(e) => {
                    updateURL({ limit: e.target.value, page: 1 });
                    refreshData();
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value={10}>10 per page</option>
                  <option value={20}>20 per page</option>
                  <option value={50}>50 per page</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Carts Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">User Carts</h3>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          </div>
        ) : carts.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No carts found
            </h3>
            <p className="text-gray-600">
              {searchTerm
                ? "No carts match your search criteria"
                : "No users have items in their carts"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {carts.map((cart) => (
                  <tr key={cart.user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <User className="h-5 w-5 text-purple-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {cart.user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {cart.user.email}
                          </div>
                          <div className="text-xs text-gray-400">
                            {cart.user.role}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {cart.totalItems} items
                      </div>
                      <div className="text-xs text-gray-500">
                        {cart.items.length} products
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ৳{cart.totalPrice.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(cart.lastUpdated)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewCart(cart)}
                          className="text-purple-600 hover:text-purple-900 transition-colors"
                          title="View cart details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleClearCart(cart.user._id)}
                          disabled={isUpdating[`clear-${cart.user._id}`]}
                          className="text-red-600 hover:text-red-900 transition-colors disabled:opacity-50"
                          title="Clear user cart"
                        >
                          {isUpdating[`clear-${cart.user._id}`] ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {(pagination.currentPage - 1) * pagination.limit + 1} to{" "}
                {Math.min(
                  pagination.currentPage * pagination.limit,
                  pagination.totalCarts
                )}{" "}
                of {pagination.totalCarts} results
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={!pagination.hasPrev}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-3 py-2 text-sm font-medium text-gray-700">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={!pagination.hasNext}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
