"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "../../components/ui/ProductCard";
import { Search, Filter } from "lucide-react";
import { getPublicProducts } from "../actions/public";

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

  // Filter states
  const [searchTerm, setSearchTerm] = useState(searchParams?.search || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams?.category || ""
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState("All Prices");
  const [sortBy, setSortBy] = useState(searchParams?.sort || "");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Update URL with search parameters
  const updateURL = (params) => {
    const current = new URLSearchParams(searchParamsHook.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (
        value &&
        value !== "" &&
        value !== "All Categories" &&
        value !== "All Prices"
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
  const handleSearch = async () => {
    updateURL({
      search: searchTerm,
      category: selectedCategory,
      sort: sortBy,
      page: 1,
    });

    // Refresh data
    await refreshData();
  };

  // Handle category change
  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    updateURL({
      search: searchTerm,
      category: category,
      sort: sortBy,
      page: 1,
    });

    // Refresh data
    await refreshData();
  };

  // Handle sort change
  const handleSortChange = async (sort) => {
    setSortBy(sort);
    updateURL({
      search: searchTerm,
      category: selectedCategory,
      sort: sort,
      page: 1,
    });

    // Refresh data
    await refreshData();
  };

  // Refresh data from server
  const refreshData = async () => {
    setIsLoading(true);
    try {
      const currentSearch = searchParamsHook.get("search") || "";
      const currentCategory = searchParamsHook.get("category") || "";
      const currentSort = searchParamsHook.get("sort") || "";
      const currentPage = parseInt(searchParamsHook.get("page")) || 1;

      const filters = {};
      if (currentSearch) filters.search = currentSearch;
      if (currentCategory) filters.category = currentCategory;
      if (currentSort) filters.sort = currentSort;

      const result = await getPublicProducts(currentPage, 12, filters);

      if (result.success) {
        setProducts(result.data?.products || []);
        setPagination(
          result.data?.pagination || { page: 1, pages: 1, total: 0 }
        );
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSortBy("");
    updateURL({
      search: "",
      category: "",
      sort: "",
      page: 1,
    });
  };

  // Handle key press for search
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Get active filters count
  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchTerm) count++;
    if (selectedCategory) count++;
    if (sortBy) count++;
    return count;
  };

  return (
    <div
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
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full bg-white rounded-xl border border-purple-200 p-4 shadow-sm flex items-center justify-between hover:bg-purple-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Filter className="h-5 w-5 text-purple-600" />
              <span className="font-medium text-purple-900">
                Filters & Sort
              </span>
              <div className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
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
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Filters & Sort */}
          <div
            className={`lg:w-80 flex-shrink-0 ${
              showMobileFilters ? "block" : "hidden lg:block"
            }`}
          >
            <div className="bg-white rounded-2xl border border-purple-200 p-6 shadow-lg lg:sticky lg:top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-purple-900">
                  Filters & Sort
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-sm font-medium text-purple-600 hover:text-purple-800 hover:bg-purple-50 px-3 py-1 rounded-lg transition-colors"
                >
                  Clear all
                </button>
              </div>

              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-semibold text-purple-800 mb-3">
                    Category
                  </label>
                  <div className="space-y-2">
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
                        className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-200 ${
                          selectedCategory === ""
                            ? "border-purple-600 bg-purple-600"
                            : "border-purple-300 group-hover:border-purple-400"
                        }`}
                      >
                        {selectedCategory === "" && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span
                        className={`text-sm transition-colors ${
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
                          className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-200 ${
                            selectedCategory === category.slug
                              ? "border-purple-600 bg-purple-600"
                              : "border-purple-300 group-hover:border-purple-400"
                          }`}
                        >
                          {selectedCategory === category.slug && (
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          )}
                        </div>
                        <span
                          className={`text-sm transition-colors ${
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
                  <label className="block text-sm font-semibold text-purple-800 mb-3">
                    Sort By
                  </label>
                  <div className="space-y-2">
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
                          className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-200 ${
                            sortBy === option.value
                              ? "border-purple-600 bg-purple-600"
                              : "border-purple-300 group-hover:border-purple-400"
                          }`}
                        >
                          {sortBy === option.value && (
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          )}
                        </div>
                        <span
                          className={`text-sm transition-colors ${
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
              </div>
            </div>
          </div>

          {/* Right Content - Search & Products */}
          <div className="flex-1 min-w-0">
            {/* Search Bar */}
            <div className="bg-white rounded-2xl border border-purple-200 p-4 sm:p-6 shadow-lg mb-6">
              <div className="relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 sm:h-6 sm:w-6 text-purple-500" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 text-base sm:text-lg border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none text-purple-900 placeholder-purple-400 transition-all duration-300"
                />
              </div>
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <div className="text-center py-12">
                <div className="text-purple-400 mb-4">
                  <Search className="h-16 w-16 mx-auto animate-pulse" />
                </div>
                <h3 className="text-lg font-medium text-purple-900 mb-2">
                  Loading products...
                </h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}

            {/* No Results */}
            {!isLoading && products.length === 0 && (
              <div className="text-center py-12">
                <div className="text-purple-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-purple-900 mb-2">
                  No products found
                </h3>
                <p className="text-purple-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
