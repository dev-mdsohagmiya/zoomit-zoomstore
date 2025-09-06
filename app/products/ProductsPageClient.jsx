"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "../../components/ui/ProductCard";
import { Search, Filter, X } from "lucide-react";
import { getPublicProducts } from "../actions/public";
import { useErrorHandler } from "../../lib/hooks/useErrorHandler";
import {
  ProductListSkeleton,
  ErrorState,
  EmptyState,
} from "../../components/ui/LoadingStates";

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ৳2,000", min: 0, max: 2000 },
  { label: "৳2,000 - ৳5,000", min: 2000, max: 5000 },
  { label: "৳5,000 - ৳10,000", min: 5000, max: 10000 },
  { label: "Over ৳10,000", min: 10000, max: Infinity },
];

export default function ProductsPageClient({
  initialProducts,
  initialCategories,
  initialPagination,
  searchParams,
}) {
  const router = useRouter();
  const searchParamsHook = useSearchParams();

  const [products, setProducts] = useState(initialProducts || []);
  const [categories, setCategories] = useState(initialCategories || []);
  const [pagination, setPagination] = useState(
    initialPagination || { page: 1, pages: 1, total: 0 }
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isClearingFilters, setIsClearingFilters] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const { error, handleError, clearError, executeWithErrorHandling } =
    useErrorHandler();

  // Handle URL changes to sync state
  useEffect(() => {
    const urlSearch = searchParamsHook.get("search") || "";
    const urlCategory = searchParamsHook.get("category") || "";
    const urlSort = searchParamsHook.get("sort") || "";
    const urlMinPrice = searchParamsHook.get("minPrice") || "";
    const urlMaxPrice = searchParamsHook.get("maxPrice") || "";
    const urlPage = parseInt(searchParamsHook.get("page")) || 1;

    // Update state if URL parameters have changed
    if (urlSearch !== searchTerm) {
      setSearchTerm(urlSearch);
    }
    if (urlCategory !== selectedCategory) {
      setSelectedCategory(urlCategory);
    }
    if (urlSort !== sortBy) {
      setSortBy(urlSort);
    }
    if (urlMinPrice !== minPrice) {
      setMinPrice(urlMinPrice);
    }
    if (urlMaxPrice !== maxPrice) {
      setMaxPrice(urlMaxPrice);
    }
    if (urlPage !== currentPage) {
      setCurrentPage(urlPage);
    }
  }, [searchParamsHook]);

  // Filter states
  const [searchTerm, setSearchTerm] = useState(searchParams?.search || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams?.category || ""
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState("All Prices");
  const [minPrice, setMinPrice] = useState(searchParams?.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(searchParams?.maxPrice || "");
  const [sortBy, setSortBy] = useState(searchParams?.sort || "");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams?.page) || 1
  );

  // Update URL with search parameters
  const updateURL = (params) => {
    const current = new URLSearchParams(searchParamsHook.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (
        value &&
        value !== "" &&
        value !== "All Categories" &&
        value !== "All Prices" &&
        value !== undefined
      ) {
        current.set(key, value);
      } else {
        current.delete(key);
      }
    });

    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`/products${query}`);
  };

  // Handle search
  const handleSearch = async (searchValue = null) => {
    const termToSearch = searchValue !== null ? searchValue : searchTerm;
    console.log("Search triggered with term:", termToSearch);
    console.log("Current searchTerm state:", searchTerm);
    console.log("Passed searchValue:", searchValue);
    setCurrentPage(1);

    // If search term is empty, clear the search filter
    const trimmedSearch = termToSearch.trim();
    console.log("Trimmed search:", trimmedSearch);

    // Update URL
    updateURL({
      search: trimmedSearch || undefined, // Send undefined if empty to clear the filter
      category: selectedCategory,
      sort: sortBy,
      page: 1,
    });

    // Fetch data directly with the search parameters instead of reading from URL
    await fetchDataWithFilters(1, {
      search: trimmedSearch || undefined,
      category: selectedCategory,
      sort: sortBy,
      minPrice: minPrice,
      maxPrice: maxPrice,
    });
  };

  // Handle category change
  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    updateURL({
      search: searchTerm,
      category: category,
      sort: sortBy,
      page: 1,
    });

    // Fetch data for page 1
    await fetchDataForPage(1);
  };

  // Handle sort change
  const handleSortChange = async (sort) => {
    setSortBy(sort);
    setCurrentPage(1);
    updateURL({
      search: searchTerm,
      category: selectedCategory,
      sort: sort,
      page: 1,
    });

    // Fetch data for page 1
    await fetchDataForPage(1);
  };

  // Refresh data from server
  const refreshData = async () => {
    setIsLoading(true);
    try {
      const currentSearch = searchParamsHook.get("search") || "";
      const currentCategory = searchParamsHook.get("category") || "";
      const currentSort = searchParamsHook.get("sort") || "";
      const pageFromURL = parseInt(searchParamsHook.get("page")) || 1;

      // Update current page state if it's different from URL
      if (pageFromURL !== currentPage) {
        setCurrentPage(pageFromURL);
      }

      const filters = {};
      if (currentSearch && currentSearch.trim())
        filters.search = currentSearch.trim();
      if (currentCategory) filters.category = currentCategory;
      if (currentSort) filters.sort = currentSort;

      const result = await getPublicProducts(pageFromURL, 10, filters);

      if (result.success) {
        setProducts(result.data?.products || []);
        setPagination(
          result.data?.pagination || { page: 1, pages: 1, total: 0 }
        );
        clearError();
      } else {
        throw new Error(result.error || "Failed to fetch products");
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
      handleError(error, "Failed to load products. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Clear all filters
  const clearFilters = async () => {
    console.log("Clearing filters...");
    setIsClearingFilters(true);
    try {
      // Reset all state immediately
      setSearchTerm("");
      setSelectedCategory("");
      setSortBy("");
      setSelectedPriceRange("All Prices");
      setMinPrice("");
      setMaxPrice("");
      setCurrentPage(1);

      // Clear URL parameters
      router.push("/products");

      // Fetch fresh data for page 1 with no filters
      console.log("Fetching fresh data...");
      const result = await getPublicProducts(1, 10, {});
      console.log("Clear filters result:", result);

      if (result.success) {
        setProducts(result.data?.products || []);
        setPagination(
          result.data?.pagination || { page: 1, pages: 1, total: 0 }
        );
        clearError();
        setRefreshKey((prev) => prev + 1);
        console.log("Filters cleared successfully");
      } else {
        console.error("Clear filters failed:", result.error);
        throw new Error(result.error || "Failed to fetch products");
      }
    } catch (error) {
      console.error("Error clearing filters:", error);
      handleError(error, "Failed to clear filters. Please try again.");
    } finally {
      setIsClearingFilters(false);
    }
  };

  // Handle key press for search
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e.target.value);
    }
  };

  // Handle page change
  const handlePageChange = async (newPage) => {
    if (newPage < 1 || newPage > pagination.pages) return;

    // Update URL first
    updateURL({
      search: searchTerm,
      category: selectedCategory,
      sort: sortBy,
      page: newPage,
    });

    // Update state
    setCurrentPage(newPage);

    // Fetch data with the new page
    await fetchDataForPage(newPage);
  };

  // Fetch data with direct filter parameters
  const fetchDataWithFilters = async (page, filters = {}) => {
    setIsLoading(true);
    try {
      // Clean up filters - only include non-empty values
      const cleanFilters = {};
      if (filters.search && filters.search.trim())
        cleanFilters.search = filters.search.trim();
      if (filters.category) cleanFilters.category = filters.category;
      if (filters.sort) cleanFilters.sort = filters.sort;
      if (filters.minPrice)
        cleanFilters.minPrice = parseFloat(filters.minPrice);
      if (filters.maxPrice)
        cleanFilters.maxPrice = parseFloat(filters.maxPrice);

      console.log(
        "Fetching data for page:",
        page,
        "with clean filters:",
        cleanFilters
      );

      const result = await getPublicProducts(page, 10, cleanFilters);

      console.log("API response:", result);

      if (result.success) {
        setProducts(result.data?.products || []);
        setPagination(
          result.data?.pagination || { page: 1, pages: 1, total: 0 }
        );
        clearError();
      } else {
        console.error("API error:", result.error);
        throw new Error(result.error || "Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching data with filters:", error);
      handleError(error, "Failed to load products. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data for specific page (reads from URL)
  const fetchDataForPage = async (page) => {
    setIsLoading(true);
    try {
      const currentSearch = searchParamsHook.get("search") || "";
      const currentCategory = searchParamsHook.get("category") || "";
      const currentSort = searchParamsHook.get("sort") || "";
      const currentMinPrice = searchParamsHook.get("minPrice") || "";
      const currentMaxPrice = searchParamsHook.get("maxPrice") || "";

      const filters = {};
      if (currentSearch && currentSearch.trim())
        filters.search = currentSearch.trim();
      if (currentCategory) filters.category = currentCategory;
      if (currentSort) filters.sort = currentSort;
      if (currentMinPrice) filters.minPrice = parseFloat(currentMinPrice);
      if (currentMaxPrice) filters.maxPrice = parseFloat(currentMaxPrice);

      console.log("Fetching data for page:", page, "with filters:", filters);

      const result = await getPublicProducts(page, 10, filters);

      console.log("API response:", result);

      if (result.success) {
        setProducts(result.data?.products || []);
        setPagination(
          result.data?.pagination || { page: 1, pages: 1, total: 0 }
        );
        clearError();
      } else {
        console.error("API error:", result.error);
        throw new Error(result.error || "Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching data for page:", error);
      handleError(error, "Failed to load products. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Get active filters count
  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchTerm) count++;
    if (selectedCategory) count++;
    if (sortBy) count++;
    if (minPrice) count++;
    if (maxPrice) count++;
    return count;
  };

  return (
    <div
      key={refreshKey}
      className="w-full min-h-screen"
      style={{ backgroundColor: "rgb(244, 234, 244)" }}
    >
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-purple-900">
                All Products
              </h1>
              <p className="text-lg text-purple-700 mt-2">
                Browse our curated selection from ZoomStore
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white rounded-xl border border-purple-200 px-4 py-2 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-purple-900">
                    {pagination.total} products available
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Results Counter */}
          <div className="md:hidden mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-purple-700">
                  {pagination.total} products
                </span>
              </div>
              <div className="text-xs text-purple-500">
                Tap filters to refine
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-3">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full bg-white rounded-lg border border-purple-200 p-3 shadow-sm flex items-center justify-between hover:bg-purple-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-900">
                Filters & Sort
              </span>
              <div className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-medium">
                {getActiveFiltersCount()} active
              </div>
            </div>
            <div
              className={`transform transition-transform duration-200 ${
                showMobileFilters ? "rotate-180" : ""
              }`}
            >
              <svg
                className="h-5 w-5 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </button>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Left Sidebar - Filters & Sort */}
          <div
            className={`lg:w-64 flex-shrink-0 ${
              showMobileFilters ? "block" : "hidden lg:block"
            }`}
          >
            <div className="bg-white rounded-xl border border-purple-200 p-4 shadow-lg lg:sticky lg:top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-purple-900">
                  Filters & Sort
                </h3>
                <button
                  onClick={() => clearFilters()}
                  disabled={isClearingFilters}
                  className="text-xs font-medium text-purple-600 hover:text-purple-800 hover:bg-purple-50 px-2 py-1 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isClearingFilters ? "Clearing..." : "Clear all"}
                </button>
              </div>

              <div className="space-y-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-xs font-semibold text-purple-800 mb-2">
                    Category
                  </label>
                  <div className="space-y-1">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        value=""
                        checked={selectedCategory === ""}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={`w-3 h-3 rounded-full border-2 mr-2 flex items-center justify-center transition-all duration-200 ${
                          selectedCategory === ""
                            ? "border-purple-600 bg-purple-600"
                            : "border-purple-300 group-hover:border-purple-400"
                        }`}
                      >
                        {selectedCategory === "" && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span
                        className={`text-xs transition-colors ${
                          selectedCategory === ""
                            ? "text-purple-900 font-medium"
                            : "text-purple-700 group-hover:text-purple-800"
                        }`}
                      >
                        All Categories
                      </span>
                    </label>
                    {categories.map((category) => (
                      <label
                        key={category._id}
                        className="flex items-center cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="category"
                          value={category.slug}
                          checked={selectedCategory === category.slug}
                          onChange={(e) => handleCategoryChange(e.target.value)}
                          className="sr-only"
                        />
                        <div
                          className={`w-3 h-3 rounded-full border-2 mr-2 flex items-center justify-center transition-all duration-200 ${
                            selectedCategory === category.slug
                              ? "border-purple-600 bg-purple-600"
                              : "border-purple-300 group-hover:border-purple-400"
                          }`}
                        >
                          {selectedCategory === category.slug && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                          )}
                        </div>
                        <span
                          className={`text-xs transition-colors ${
                            selectedCategory === category.slug
                              ? "text-purple-900 font-medium"
                              : "text-purple-700 group-hover:text-purple-800"
                          }`}
                        >
                          {category.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-xs font-semibold text-purple-800 mb-2">
                    Sort By
                  </label>
                  <div className="space-y-1">
                    {[
                      { value: "", label: "Featured" },
                      { value: "price-low", label: "Price: Low to High" },
                      { value: "price-high", label: "Price: High to Low" },
                      { value: "rating", label: "Highest Rated" },
                      { value: "newest", label: "Newest" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="sortBy"
                          value={option.value}
                          checked={sortBy === option.value}
                          onChange={(e) => handleSortChange(e.target.value)}
                          className="sr-only"
                        />
                        <div
                          className={`w-3 h-3 rounded-full border-2 mr-2 flex items-center justify-center transition-all duration-200 ${
                            sortBy === option.value
                              ? "border-purple-600 bg-purple-600"
                              : "border-purple-300 group-hover:border-purple-400"
                          }`}
                        >
                          {sortBy === option.value && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                          )}
                        </div>
                        <span
                          className={`text-xs transition-colors ${
                            sortBy === option.value
                              ? "text-purple-900 font-medium"
                              : "text-purple-700 group-hover:text-purple-800"
                          }`}
                        >
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-xs font-semibold text-purple-800 mb-2">
                    Price Range
                  </label>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs text-purple-700 mb-1">
                        Min Price (৳)
                      </label>
                      <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="0"
                        className="w-full px-3 py-2 text-xs border border-purple-200 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-purple-700 mb-1">
                        Max Price (৳)
                      </label>
                      <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="10000"
                        className="w-full px-3 py-2 text-xs border border-purple-200 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-200 outline-none"
                      />
                    </div>
                    <button
                      onClick={async () => {
                        setCurrentPage(1);
                        updateURL({
                          search: searchTerm,
                          category: selectedCategory,
                          sort: sortBy,
                          minPrice: minPrice,
                          maxPrice: maxPrice,
                          page: 1,
                        });
                        await fetchDataForPage(1);
                      }}
                      className="w-full px-3 py-2 text-xs font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Apply Price Filter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Search & Products */}
          <div className="flex-1 min-w-0">
            {/* Search Bar */}
            <div className="bg-white rounded-xl border border-purple-200 p-3 sm:p-4 shadow-lg mb-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-500" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-9 pr-10 py-2.5 text-sm border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none text-purple-900 placeholder-purple-400 transition-all duration-300"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        handleSearch("");
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <button
                  onClick={() => handleSearch(searchTerm)}
                  className="px-4 py-2.5 bg-purple-900 text-white rounded-lg hover:bg-purple-800 transition-colors text-sm font-medium"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <ProductListSkeleton count={10} />
            ) : error ? (
              <ErrorState
                title="Failed to load products"
                message={error}
                onRetry={() => {
                  clearError();
                  refreshData();
                }}
              />
            ) : products.length === 0 ? (
              <EmptyState
                title="No products found"
                message="Try adjusting your search or filter criteria"
                action={
                  <button
                    onClick={() => clearFilters()}
                    disabled={isClearingFilters}
                    className="mt-4 bg-purple-900 text-white px-6 py-2 rounded-lg hover:bg-purple-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isClearingFilters ? "Clearing..." : "Clear Filters"}
                  </button>
                }
              />
            ) : (
              <>
                <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {/* Pagination Controls */}
                {pagination.pages > 1 && (
                  <div className="mt-8 flex items-center justify-center sm:justify-end">
                    <div className="bg-white rounded-xl border border-purple-200 p-3 sm:p-4 shadow-lg w-full sm:w-auto sm:max-w-fit">
                      {/* Mobile Layout */}
                      <div className="flex flex-col gap-4 sm:hidden">
                        {/* Page Info - Mobile */}
                        <div className="text-center">
                          <p className="text-sm font-medium text-purple-700">
                            Page {currentPage} of {pagination.pages} •{" "}
                            {pagination.total} products
                          </p>
                        </div>

                        {/* Page Numbers - Mobile */}
                        <div className="flex items-center justify-center gap-2">
                          {Array.from(
                            { length: Math.min(5, pagination.pages) },
                            (_, i) => {
                              let pageNum;
                              if (pagination.pages <= 5) {
                                pageNum = i + 1;
                              } else if (currentPage <= 3) {
                                pageNum = i + 1;
                              } else if (currentPage >= pagination.pages - 2) {
                                pageNum = pagination.pages - 4 + i;
                              } else {
                                pageNum = currentPage - 2 + i;
                              }

                              return (
                                <button
                                  key={pageNum}
                                  onClick={() => handlePageChange(pageNum)}
                                  className={`w-10 h-10 text-sm font-medium rounded-lg transition-colors ${
                                    currentPage === pageNum
                                      ? "bg-purple-600 text-white"
                                      : "text-purple-700 bg-purple-50 border border-purple-200 hover:bg-purple-100"
                                  }`}
                                >
                                  {pageNum}
                                </button>
                              );
                            }
                          )}
                        </div>

                        {/* Navigation Buttons - Mobile */}
                        <div className="flex items-center justify-between gap-3">
                          <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage <= 1}
                            className="flex-1 px-4 py-3 text-sm font-medium text-purple-700 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            ← Previous
                          </button>
                          <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage >= pagination.pages}
                            className="flex-1 px-4 py-3 text-sm font-medium text-purple-700 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            Next →
                          </button>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden sm:flex sm:flex-col lg:flex-row lg:items-center lg:gap-6">
                        {/* Page Info - Desktop */}
                        <div className="text-center lg:text-left mb-2 lg:mb-0">
                          <p className="text-sm font-medium text-purple-700">
                            Page {currentPage} of {pagination.pages} •{" "}
                            {pagination.total} products
                          </p>
                        </div>

                        {/* Navigation Controls - Desktop */}
                        <div className="flex items-center gap-2">
                          {/* Previous Button */}
                          <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage <= 1}
                            className="px-3 py-2 text-sm font-medium text-purple-700 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            Previous
                          </button>

                          {/* Page Numbers */}
                          <div className="flex items-center gap-1">
                            {Array.from(
                              { length: Math.min(5, pagination.pages) },
                              (_, i) => {
                                let pageNum;
                                if (pagination.pages <= 5) {
                                  pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                  pageNum = i + 1;
                                } else if (
                                  currentPage >=
                                  pagination.pages - 2
                                ) {
                                  pageNum = pagination.pages - 4 + i;
                                } else {
                                  pageNum = currentPage - 2 + i;
                                }

                                return (
                                  <button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={`w-10 h-10 text-sm font-medium rounded-lg transition-colors ${
                                      currentPage === pageNum
                                        ? "bg-purple-600 text-white"
                                        : "text-purple-700 bg-purple-50 border border-purple-200 hover:bg-purple-100"
                                    }`}
                                  >
                                    {pageNum}
                                  </button>
                                );
                              }
                            )}
                          </div>

                          {/* Next Button */}
                          <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage >= pagination.pages}
                            className="px-3 py-2 text-sm font-medium text-purple-700 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
