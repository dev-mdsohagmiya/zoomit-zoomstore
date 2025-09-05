"use client";
import { useState, useEffect } from "react";
import CenteredCartModal from "../../../components/ui/CenteredCartModal";
import Link from "next/link";
import {
  Star,
  Heart,
  Truck,
  Shield,
  ShoppingCart,
  Loader2,
} from "lucide-react";
import { truncateText } from "../../../lib/utils";
import { addToCart } from "../../../app/actions/cart";
import { showSuccessToast, showErrorToast } from "../../../lib/toast-utils";
import { isAuthenticated } from "../../../lib/auth-utils";

export default function ProductDetailPageClient({
  product,
  relatedProducts,
  categories,
}) {
  // State for selected options
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Set default size and color when product loads
  useEffect(() => {
    if (product) {
      // Set first available size as default
      if (product.sizes && product.sizes.length > 0 && !selectedSize) {
        setSelectedSize(product.sizes[0]);
      }

      // Set first available color as default
      if (product.colors && product.colors.length > 0 && !selectedColor) {
        setSelectedColor(product.colors[0]);
      }
    }
  }, [product, selectedSize, selectedColor]);

  // Calculate discount
  const hasDiscount = product.discount && product.discount > 0;
  const discountPercentage = product.discount || 0;

  // Calculate prices
  const originalPrice = product.price;
  const discountedPrice = hasDiscount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  // Get product images
  const productImages =
    product.photos && product.photos.length > 0
      ? product.photos
      : [
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop",
        ];

  // Handle add to cart
  const handleAddToCart = async () => {
    if (!isAuthenticated()) {
      showErrorToast("Please login to add items to cart");
      return;
    }

    // Get the current selected size and color (with defaults)
    const currentSize =
      selectedSize ||
      (product.sizes && product.sizes.length > 0 ? product.sizes[0] : null);
    const currentColor =
      selectedColor ||
      (product.colors && product.colors.length > 0 ? product.colors[0] : null);

    setIsAddingToCart(true);

    try {
      const result = await addToCart(
        product._id || product.id,
        quantity,
        currentSize,
        currentColor
      );

      if (result.success) {
        showSuccessToast("Item added to cart successfully");
      } else {
        showErrorToast(result.error || "Failed to add item to cart");
      }
    } catch (error) {
      showErrorToast("Failed to add item to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Keyboard navigation for images
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft" && selectedImageIndex > 0) {
        setSelectedImageIndex(selectedImageIndex - 1);
      } else if (
        e.key === "ArrowRight" &&
        selectedImageIndex < productImages.length - 1
      ) {
        setSelectedImageIndex(selectedImageIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedImageIndex, productImages.length]);

  // Get product name
  const productName = product.name || "Unnamed Product";

  // Get product description
  const productDescription = product.description || "No description available";

  // Get category name
  const categoryName =
    product.categories && product.categories.length > 0
      ? product.categories[0].name
      : "Uncategorized";

  // Get category slug
  const categorySlug =
    product.categories && product.categories.length > 0
      ? product.categories[0].slug
      : "";

  return (
    <>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .image-transition {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .thumbnail-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .thumbnail-hover:hover {
          transform: translateY(-2px) scale(1.05);
        }
      `}</style>
      <div
        style={{ backgroundColor: "rgb(244, 234, 244)" }}
        className="min-h-screen"
      >
        {/* Breadcrumb */}
        <div className="bg-white border-b border-purple-200">
          <div className="mx-auto max-w-6xl px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-purple-600">
              <Link
                href="/"
                className="hover:text-purple-800 transition-colors"
              >
                Home
              </Link>
              <span>/</span>
              <Link
                href="/products"
                className="hover:text-purple-800 transition-colors"
              >
                Products
              </Link>
              <span>/</span>
              <span className="text-purple-900 font-medium">
                {truncateText(productName, 50)}
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-8">
          {/* Product Details */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Product Images */}
            <div className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
              <div className="relative overflow-hidden rounded-2xl border border-purple-200 bg-white shadow-lg group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={productName}
                  src={productImages[selectedImageIndex]}
                  className="h-96 w-full object-cover image-transition transform group-hover:scale-105"
                  key={selectedImageIndex}
                  style={{
                    animation: "fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />

                {/* Navigation Arrows */}
                {productImages.length > 1 && (
                  <>
                    {selectedImageIndex > 0 && (
                      <button
                        onClick={() =>
                          setSelectedImageIndex(selectedImageIndex - 1)
                        }
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-purple-600 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl"
                      >
                        <svg
                          className="w-5 h-5 transition-transform duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                    )}
                    {selectedImageIndex < productImages.length - 1 && (
                      <button
                        onClick={() =>
                          setSelectedImageIndex(selectedImageIndex + 1)
                        }
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-purple-600 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl"
                      >
                        <svg
                          className="w-5 h-5 transition-transform duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    )}
                  </>
                )}

                {/* Image Counter */}
                {productImages.length > 1 && (
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm transition-all duration-300 ease-in-out">
                    <span className="font-medium">
                      {selectedImageIndex + 1}
                    </span>
                    <span className="mx-1">/</span>
                    <span className="opacity-70">{productImages.length}</span>
                  </div>
                )}
              </div>
              {productImages.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {productImages.map((img, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`overflow-hidden rounded-lg border-2 bg-white cursor-pointer thumbnail-hover ${
                        selectedImageIndex === index
                          ? "border-purple-500 ring-2 ring-purple-200 scale-105 shadow-lg"
                          : "border-purple-200 hover:border-purple-400"
                      }`}
                      style={{
                        animation:
                          selectedImageIndex === index
                            ? "pulse 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                            : "none",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt={`${productName} ${index + 1}`}
                        src={img}
                        className="h-20 w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                        style={{
                          animation:
                            selectedImageIndex === index
                              ? "slideIn 0.3s ease-out"
                              : "none",
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6 lg:min-h-screen">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">
                    {categoryName}
                  </span>
                  <span className="text-sm text-purple-600">•</span>
                  <span className="text-sm text-purple-600">
                    {product.numReviews || 0} reviews
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-purple-900 mb-3">
                  {productName}
                </h1>

                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating || 0)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-purple-600">
                    {product.rating || 0} ({product.numReviews || 0} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-bold text-purple-900">
                    ৳{discountedPrice.toFixed(2)}
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        ৳{originalPrice.toFixed(2)}
                      </span>
                      <span className="bg-red-100 text-red-700 text-sm font-medium px-2 py-1 rounded-full">
                        {discountPercentage}% OFF
                      </span>
                    </>
                  )}
                </div>

                <div className="text-base text-purple-700 leading-relaxed whitespace-pre-line rounded-lg border border-purple-100 p-3 bg-purple-50/30">
                  {productDescription}
                </div>
              </div>

              {/* Sizes and Colors */}
              {(product.sizes?.length > 0 || product.colors?.length > 0) && (
                <div>
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">
                    Available Options
                  </h3>
                  <div className="space-y-4">
                    {product.sizes?.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-purple-800 mb-2">
                          Select Size:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {product.sizes.map((size, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedSize(size)}
                              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                                selectedSize === size
                                  ? "border-purple-600 bg-purple-100 text-purple-800"
                                  : "border-purple-200 bg-white text-purple-700 hover:border-purple-400 hover:bg-purple-50"
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                        {selectedSize && (
                          <p className="text-xs text-purple-600 mt-1">
                            Selected: {selectedSize}
                          </p>
                        )}
                      </div>
                    )}
                    {product.colors?.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-purple-800 mb-2">
                          Select Color:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {product.colors.map((color, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedColor(color)}
                              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                                selectedColor === color
                                  ? "border-purple-600 bg-purple-100 text-purple-800"
                                  : "border-purple-200 bg-white text-purple-700 hover:border-purple-400 hover:bg-purple-50"
                              }`}
                            >
                              {color}
                            </button>
                          ))}
                        </div>
                        {selectedColor && (
                          <p className="text-xs text-purple-600 mt-1">
                            Selected: {selectedColor}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Quantity & Actions */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-purple-300 text-purple-700 hover:bg-purple-50 transition-colors"
                    >
                      -
                    </button>
                    <input
                      className="h-10 w-16 rounded-lg border border-purple-300 text-center text-base font-medium"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      min="1"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-purple-300 text-purple-700 hover:bg-purple-50 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button className="h-10 px-4 rounded-lg border border-purple-300 text-purple-700 hover:bg-purple-50 transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart || !product.inStock}
                    className={`h-12 flex-1 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                      !product.inStock
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : isAddingToCart
                        ? "bg-purple-700 text-white cursor-not-allowed"
                        : "bg-purple-900 text-white hover:bg-purple-800"
                    }`}
                  >
                    {isAddingToCart ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Adding...
                      </>
                    ) : !product.inStock ? (
                      "Out of Stock"
                    ) : (
                      <>
                        <ShoppingCart className="h-5 w-5" />
                        Add to Cart
                      </>
                    )}
                  </button>
                  <CenteredCartModal
                    trigger={
                      <button className="h-12 px-6 rounded-lg border-2 border-purple-300 text-purple-700 font-semibold hover:bg-purple-50 transition-colors">
                        View Cart
                      </button>
                    }
                  />
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-2 text-sm">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      product.inStock ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></div>
                  <span
                    className={
                      product.inStock ? "text-green-700" : "text-red-700"
                    }
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-purple-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Truck className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-900">
                      Free Shipping
                    </h4>
                    <p className="text-xs text-purple-600">
                      On orders over ৳2000
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-900">
                      Secure Payment
                    </h4>
                    <p className="text-xs text-purple-600">
                      100% secure checkout
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Categories Section */}
          {categories.length > 0 && (
            <div className="mt-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-purple-900 mb-2">
                  Shop by Category
                </h2>
                <p className="text-purple-600">
                  Discover our curated collections
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.slice(0, 4).map((category) => (
                  <Link
                    key={category._id}
                    href={`/products?category=${category.slug}`}
                    className="group block overflow-hidden rounded-xl border border-purple-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={
                          category.image ||
                          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop"
                        }
                        alt={category.name}
                        className="h-32 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white font-semibold text-sm">
                          {category.name}
                        </h3>
                        <p className="text-white/80 text-xs">
                          {category.products?.length || 0} products
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-purple-900 mb-2">
                  You Might Also Like
                </h2>
                <p className="text-purple-600">
                  Discover more amazing products
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProducts.map((relatedProduct) => {
                  const relatedHasDiscount =
                    relatedProduct.discount && relatedProduct.discount > 0;
                  const relatedDiscountedPrice = relatedHasDiscount
                    ? relatedProduct.price -
                      (relatedProduct.price * relatedProduct.discount) / 100
                    : relatedProduct.price;
                  const relatedProductImage =
                    relatedProduct.photos && relatedProduct.photos.length > 0
                      ? relatedProduct.photos[0]
                      : "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop";

                  // Generate slug for related product
                  const generateSlug = (title) => {
                    return title
                      .toLowerCase()
                      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
                      .replace(/\s+/g, "-") // Replace spaces with hyphens
                      .replace(/-+/g, "-") // Replace multiple hyphens with single
                      .trim();
                  };

                  return (
                    <Link
                      key={relatedProduct._id}
                      href={`/products/${
                        relatedProduct.slug ||
                        generateSlug(relatedProduct.name) ||
                        relatedProduct._id
                      }`}
                      className="group block overflow-hidden rounded-xl border border-purple-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      <div className="relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={relatedProductImage}
                          alt={relatedProduct.name}
                          className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3">
                          <button className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                            <Heart className="h-4 w-4 text-purple-600" />
                          </button>
                        </div>
                        {relatedHasDiscount && (
                          <div className="absolute top-3 left-3">
                            <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                              {relatedProduct.discount}% OFF
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-purple-900 group-hover:text-purple-700 transition-colors">
                          {truncateText(relatedProduct.name, 30)}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(relatedProduct.rating || 0)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-purple-600">
                            ({relatedProduct.numReviews || 0})
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="font-bold text-purple-900">
                            ৳{relatedDiscountedPrice.toFixed(2)}
                          </span>
                          {relatedHasDiscount && (
                            <span className="text-sm text-gray-500 line-through">
                              ৳{relatedProduct.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
