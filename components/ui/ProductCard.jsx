"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, ShoppingCart, Plus, Loader2 } from "lucide-react";
import { truncateText } from "../../lib/utils";
import { addToCart, getCart } from "../../app/actions/cart";
import { showSuccessToast, showErrorToast } from "../../lib/toast-utils";
import { isAuthenticated } from "../../lib/auth-utils";
import CenteredCartModal from "./CenteredCartModal";

export default function ProductCard({ product }) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  // Calculate prices first
  const originalPrice = product.price || 0;
  const discountPercentage = product.discount || 0;

  // Calculate discounted price
  const discountedPrice =
    discountPercentage > 0
      ? originalPrice - (originalPrice * discountPercentage) / 100
      : originalPrice;

  // Check if there's a discount
  const hasDiscount = discountPercentage > 0;

  // Fetch cart data to check if product is in cart
  const fetchCartData = async () => {
    if (!isAuthenticated()) return;

    try {
      const result = await getCart();
      if (result.success && result.data) {
        // Check if current product is in cart
        const productInCart =
          result.data.items?.some(
            (item) =>
              item.product._id === product._id || item.product.id === product.id
          ) || false;
        setIsInCart(productInCart);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  // Load cart data on component mount
  useEffect(() => {
    fetchCartData();
  }, []);

  // Handle add to cart
  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated()) {
      showErrorToast("Please login to add items to cart");
      return;
    }

    setIsAddingToCart(true);

    try {
      // Select default size and color if available
      let selectedSize = null;
      let selectedColor = null;

      // Select first available size if sizes exist
      if (product.sizes && product.sizes.length > 0) {
        selectedSize = product.sizes[0];
      }

      // Select first available color if colors exist
      if (product.colors && product.colors.length > 0) {
        selectedColor = product.colors[0];
      }

      const result = await addToCart(
        product._id || product.id,
        1,
        selectedSize,
        selectedColor
      );

      if (result.success) {
        showSuccessToast("Item added to cart successfully");
        // Update cart state
        await fetchCartData();
        setIsInCart(true);
      } else {
        showErrorToast(result.error || "Failed to add item to cart");
      }
    } catch (error) {
      showErrorToast("Failed to add item to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Get product image
  const productImage =
    product.photos && product.photos.length > 0
      ? product.photos[0]
      : "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=400&fit=crop";

  // Get product name
  const productName = product.name || "Unnamed Product";

  // Get product description
  const productDescription = product.description || "No description available";

  // Get category name
  const categoryName =
    product.categories && product.categories.length > 0
      ? product.categories[0].name
      : "Uncategorized";

  // Generate slug from product name if not available
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single
      .trim();
  };

  // Get product slug for URL (use generated slug if not available)
  const productSlug =
    product.slug || generateSlug(productName) || product._id || product.id;

  return (
    <div className="group relative rounded-xl border border-purple-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Discount Badge */}
      {hasDiscount && (
        <div className="absolute top-3 left-3 z-10 rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">
          -{Math.round(discountPercentage)}%
        </div>
      )}

      {/* Product Image */}
      <Link
        href={`/products/${productSlug}`}
        className="block overflow-hidden rounded-t-xl"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={productName}
          src={productImage}
          className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-3">
          <Link
            href={`/products/${productSlug}`}
            className="block font-medium text-purple-900 hover:text-purple-700 transition-colors line-clamp-2"
            title={productName}
          >
            {truncateText(productName, 40)}
          </Link>
          <p
            className="mt-1 text-sm text-purple-600 line-clamp-2"
            title={productDescription}
          >
            {truncateText(productDescription, 60)}
          </p>
        </div>

        {/* Rating */}
        <div className="mb-3 flex items-center gap-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating || 0)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-purple-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-purple-600 ml-1">
            ({product.numReviews || 0})
          </span>
        </div>

        {/* Pricing */}
        <div className="mb-4 flex items-center gap-2">
          <span className="text-lg font-bold text-purple-900">
            ৳{discountedPrice.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-purple-500 line-through">
              ৳{originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Sizes and Colors */}
        {(product.sizes?.length > 0 || product.colors?.length > 0) && (
          <div className="mb-3 flex flex-wrap gap-1">
            {product.sizes?.slice(0, 2).map((size, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {size}
              </span>
            ))}
            {product.colors?.slice(0, 2).map((color, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
              >
                {color}
              </span>
            ))}
            {(product.sizes?.length > 2 || product.colors?.length > 2) && (
              <span className="text-xs text-gray-500">
                +
                {(product.sizes?.length || 0) +
                  (product.colors?.length || 0) -
                  2}{" "}
                more
              </span>
            )}
          </div>
        )}

        {/* Category */}
        <div className="mb-3 text-xs text-purple-500 font-medium">
          {categoryName}
        </div>

        {/* Add to Cart / View Cart Button */}
        <button
          onClick={isInCart ? () => setShowCartModal(true) : handleAddToCart}
          disabled={isAddingToCart || !product.inStock}
          className={`w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center justify-center gap-2 ${
            !product.inStock
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : isAddingToCart
              ? "bg-purple-700 text-white cursor-not-allowed"
              : "bg-purple-900 text-white hover:bg-purple-800"
          }`}
        >
          {isAddingToCart ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : !product.inStock ? (
            "Out of Stock"
          ) : isInCart ? (
            <>
              <ShoppingCart className="h-4 w-4" />
              View Cart
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </>
          )}
        </button>

        {/* Cart Modal */}
        <CenteredCartModal
          trigger={<div style={{ display: "none" }} />}
          isOpen={showCartModal}
          onOpenChange={setShowCartModal}
        />
      </div>
    </div>
  );
}
