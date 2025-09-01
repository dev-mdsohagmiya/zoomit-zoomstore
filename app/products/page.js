"use client";
import { useState } from "react";
import ProductCard from "../../components/ui/ProductCard";
import { Search, Filter, SortAsc, SortDesc } from "lucide-react";

const PRODUCTS = [
  {
    id: "1",
    title: "Classic Cotton Tee",
    subtitle: "Men • Apparel",
    price: 24,
    originalPrice: 35,
    rating: 4,
    reviews: 128,
    category: "Fashion & Clothing",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=400&fit=crop",
  },
  {
    id: "2",
    title: "Wireless Headphones",
    subtitle: "Audio",
    price: 89,
    originalPrice: 120,
    rating: 5,
    reviews: 89,
    category: "Electronics & Gadgets",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop",
  },
  {
    id: "3",
    title: "Sneaker Low-Top",
    subtitle: "Shoes",
    price: 69,
    originalPrice: 95,
    rating: 4,
    reviews: 203,
    category: "Fashion & Clothing",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=400&fit=crop",
  },
  {
    id: "4",
    title: "Leather Backpack",
    subtitle: "Bags",
    price: 129,
    originalPrice: 179,
    rating: 5,
    reviews: 67,
    category: "Fashion & Clothing",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop",
  },
  {
    id: "5",
    title: "Smartwatch S3",
    subtitle: "Wearables",
    price: 199,
    originalPrice: 299,
    rating: 4,
    reviews: 156,
    category: "Electronics & Gadgets",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop",
  },
  {
    id: "6",
    title: "Minimal Table Lamp",
    subtitle: "Home",
    price: 39,
    originalPrice: 55,
    rating: 4,
    reviews: 92,
    category: "Home & Living",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
  },
  {
    id: "7",
    title: "Eco Water Bottle",
    subtitle: "Accessories",
    price: 18,
    originalPrice: 25,
    rating: 5,
    reviews: 234,
    category: "Sports & Fitness",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=400&fit=crop",
  },
  {
    id: "8",
    title: "Yoga Mat Pro",
    subtitle: "Fitness",
    price: 45,
    originalPrice: 65,
    rating: 4,
    reviews: 178,
    category: "Sports & Fitness",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
  },
];

const CATEGORIES = [
  "All Categories",
  "Fashion & Clothing",
  "Electronics & Gadgets",
  "Home & Living",
  "Sports & Fitness",
];

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ৳2,000", min: 0, max: 2000 },
  { label: "৳2,000 - ৳5,000", min: 2000, max: 5000 },
  { label: "৳5,000 - ৳10,000", min: 5000, max: 10000 },
  { label: "Over ৳10,000", min: 10000, max: Infinity },
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All Prices");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter and sort products
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.subtitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All Categories" ||
      product.category === selectedCategory;

    const priceInBDT = product.price * 110;
    const selectedRange = PRICE_RANGES.find(
      (range) => range.label === selectedPriceRange
    );
    const matchesPrice =
      priceInBDT >= selectedRange.min && priceInBDT <= selectedRange.max;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "reviews":
        return b.reviews - a.reviews;
      default:
        return 0;
    }
  });

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
                    {sortedProducts.length} products available
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
                  {sortedProducts.length} products
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
                {
                  [selectedCategory, selectedPriceRange, sortBy].filter(
                    (item) =>
                      item !== "All Categories" &&
                      item !== "All Prices" &&
                      item !== "featured"
                  ).length
                }{" "}
                active
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
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All Categories");
                    setSelectedPriceRange("All Prices");
                    setSortBy("featured");
                  }}
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
                    {CATEGORIES.map((category) => (
                      <label
                        key={category}
                        className="flex items-center cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="sr-only"
                        />
                        <div
                          className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-200 ${
                            selectedCategory === category
                              ? "border-purple-600 bg-purple-600"
                              : "border-purple-300 group-hover:border-purple-400"
                          }`}
                        >
                          {selectedCategory === category && (
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          )}
                        </div>
                        <span
                          className={`text-sm transition-colors ${
                            selectedCategory === category
                              ? "text-purple-900 font-medium"
                              : "text-purple-700 group-hover:text-purple-800"
                          }`}
                        >
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm font-semibold text-purple-800 mb-3">
                    Price Range
                  </label>
                  <div className="space-y-2">
                    {PRICE_RANGES.map((range) => (
                      <label
                        key={range.label}
                        className="flex items-center cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="priceRange"
                          value={range.label}
                          checked={selectedPriceRange === range.label}
                          onChange={(e) =>
                            setSelectedPriceRange(e.target.value)
                          }
                          className="sr-only"
                        />
                        <div
                          className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-200 ${
                            selectedPriceRange === range.label
                              ? "border-purple-600 bg-purple-600"
                              : "border-purple-300 group-hover:border-purple-400"
                          }`}
                        >
                          {selectedPriceRange === range.label && (
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          )}
                        </div>
                        <span
                          className={`text-sm transition-colors ${
                            selectedPriceRange === range.label
                              ? "text-purple-900 font-medium"
                              : "text-purple-700 group-hover:text-purple-800"
                          }`}
                        >
                          {range.label}
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
                      { value: "featured", label: "Featured" },
                      { value: "price-low", label: "Price: Low to High" },
                      { value: "price-high", label: "Price: High to Low" },
                      { value: "rating", label: "Highest Rated" },
                      { value: "reviews", label: "Most Reviews" },
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
                          onChange={(e) => setSortBy(e.target.value)}
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
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 text-base sm:text-lg border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none text-purple-900 placeholder-purple-400 transition-all duration-300"
                />
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {sortedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {/* No Results */}
            {sortedProducts.length === 0 && (
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
