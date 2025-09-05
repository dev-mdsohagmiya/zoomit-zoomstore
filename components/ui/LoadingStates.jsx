"use client";

import { Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "./button";

export function LoadingSpinner({ size = "md", className = "" }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
  };

  return (
    <Loader2
      className={`animate-spin text-purple-600 ${sizeClasses[size]} ${className}`}
    />
  );
}

export function LoadingButton({
  children,
  loading,
  loadingText = "Loading...",
  disabled = false,
  ...props
}) {
  return (
    <Button disabled={disabled || loading} className="relative" {...props}>
      {loading && <LoadingSpinner size="sm" className="mr-2" />}
      {loading ? loadingText : children}
    </Button>
  );
}

export function ErrorState({
  title = "Something went wrong",
  message = "An error occurred while loading data",
  onRetry = null,
  className = "",
}) {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="h-8 w-8 text-red-600" />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>

      <p className="text-gray-600 mb-6">{message}</p>

      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className="border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
}

export function EmptyState({
  title = "No data found",
  message = "There's nothing to show here",
  action = null,
  className = "",
}) {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg
          className="h-8 w-8 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>

      <p className="text-gray-600 mb-6">{message}</p>

      {action}
    </div>
  );
}

export function InlineLoading({ message = "Loading..." }) {
  return (
    <div className="flex items-center justify-center py-8">
      <LoadingSpinner size="md" className="mr-3" />
      <span className="text-gray-600">{message}</span>
    </div>
  );
}

export function PageLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="xl" className="mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Loading...</h2>
        <p className="text-gray-600">Please wait while we load your content</p>
      </div>
    </div>
  );
}

// Skeleton Components
export function Skeleton({ className, ...props }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 ${className}`}
      {...props}
    />
  );
}

// Product Card Skeleton
export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-4">
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-1/2 mb-3" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
    </div>
  );
}

// Product List Skeleton for Products Page
export function ProductListSkeleton({ count = 12 }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          {/* Product Image */}
          <Skeleton className="h-48 w-full sm:h-52 lg:h-48" />

          <div className="p-3 sm:p-4">
            {/* Product Title */}
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3 w-1/2 mb-3" />

            {/* Price and Discount */}
            <div className="flex items-center gap-2 mb-3">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-4 w-12" />
            </div>

            {/* Size and Color indicators */}
            <div className="flex gap-2 mb-3">
              <Skeleton className="h-6 w-8 rounded-full" />
              <Skeleton className="h-6 w-8 rounded-full" />
              <Skeleton className="h-6 w-8 rounded-full" />
            </div>

            {/* Add to Cart Button */}
            <Skeleton className="h-9 w-full rounded-lg sm:h-10" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Product Details Page Skeleton
export function ProductDetailsSkeleton() {
  return (
    <div
      style={{ backgroundColor: "rgb(244, 234, 244)" }}
      className="min-h-screen"
    >
      {/* Breadcrumb Skeleton */}
      <div className="bg-white border-b border-purple-200">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-1" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-1" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Side - Images */}
          <div className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-2xl border border-purple-200 bg-white shadow-lg">
              <Skeleton className="h-96 w-full" />
            </div>
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-20 w-full rounded-lg" />
              ))}
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div className="space-y-6">
            {/* Product Title */}
            <div>
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>

            {/* Price and Discount */}
            <div className="flex items-center gap-4">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-5 w-12 bg-red-100 rounded" />
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="h-4 w-4 rounded" />
                ))}
              </div>
              <Skeleton className="h-4 w-16" />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Sizes */}
            <div>
              <Skeleton className="h-5 w-16 mb-3" />
              <div className="flex gap-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="h-10 w-16 rounded-lg" />
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <Skeleton className="h-5 w-20 mb-3" />
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-10 w-10 rounded-full" />
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex gap-4">
              <Skeleton className="h-12 w-24" />
              <Skeleton className="h-12 w-32" />
            </div>

            {/* Features */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-20 mb-2" />
              <div className="space-y-1">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <Skeleton className="h-8 w-48 mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Checkout Form Skeleton
export function CheckoutFormSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
      {/* Main Content Skeleton */}
      <div className="lg:col-span-2 space-y-4 lg:space-y-8">
        {/* Personal Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 lg:mb-6">
            <Skeleton className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full" />
            <Skeleton className="h-5 w-40 sm:h-6 sm:w-48" />
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
              <div>
                <Skeleton className="h-3 w-16 mb-2 sm:h-4 sm:w-20" />
                <Skeleton className="h-9 w-full sm:h-10" />
              </div>
              <div>
                <Skeleton className="h-3 w-12 mb-2 sm:h-4 sm:w-16" />
                <Skeleton className="h-9 w-full sm:h-10" />
              </div>
            </div>
            <div>
              <Skeleton className="h-3 w-20 mb-2 sm:h-4 sm:w-24" />
              <Skeleton className="h-9 w-full sm:h-10" />
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 lg:mb-6">
            <Skeleton className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full" />
            <Skeleton className="h-5 w-32 sm:h-6 sm:w-40" />
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div>
              <Skeleton className="h-3 w-12 mb-2 sm:h-4 sm:w-16" />
              <Skeleton className="h-9 w-full sm:h-10" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
              <div>
                <Skeleton className="h-3 w-8 mb-2 sm:h-4 sm:w-12" />
                <Skeleton className="h-9 w-full sm:h-10" />
              </div>
              <div>
                <Skeleton className="h-3 w-16 mb-2 sm:h-4 sm:w-20" />
                <Skeleton className="h-9 w-full sm:h-10" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
              <div>
                <Skeleton className="h-3 w-12 mb-2 sm:h-4 sm:w-16" />
                <Skeleton className="h-9 w-full sm:h-10" />
              </div>
              <div>
                <Skeleton className="h-3 w-12 mb-2 sm:h-4 sm:w-16" />
                <Skeleton className="h-9 w-full sm:h-10" />
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 lg:mb-6">
            <Skeleton className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full" />
            <Skeleton className="h-5 w-28 sm:h-6 sm:w-36" />
          </div>

          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center p-2 sm:p-3 lg:p-4 border border-gray-300 rounded-lg">
              <Skeleton className="w-3 h-3 rounded mr-2 sm:w-4 sm:h-4 sm:mr-2 lg:mr-3" />
              <Skeleton className="w-3 h-3 mr-2 sm:w-4 sm:h-4 sm:mr-2 lg:mr-3" />
              <Skeleton className="h-3 w-24 sm:h-4 sm:w-32" />
            </div>
            <div className="flex items-center p-2 sm:p-3 lg:p-4 border border-gray-300 rounded-lg">
              <Skeleton className="w-3 h-3 rounded mr-2 sm:w-4 sm:h-4 sm:mr-2 lg:mr-3" />
              <Skeleton className="w-3 h-3 mr-2 sm:w-4 sm:h-4 sm:mr-2 lg:mr-3" />
              <Skeleton className="h-3 w-20 sm:h-4 sm:w-28" />
            </div>
          </div>
        </div>

        {/* Place Order Button */}
        <Skeleton className="h-10 w-full rounded-lg sm:h-12" />
      </div>

      {/* Sidebar Skeleton */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6 sticky top-4 lg:top-8">
          <Skeleton className="h-5 w-24 mb-3 sm:h-6 sm:w-32 sm:mb-4" />

          {/* Cart Items */}
          <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="flex items-center gap-2 lg:gap-3">
                <Skeleton className="h-8 w-8 rounded-lg sm:h-10 sm:w-10 lg:h-12 lg:w-12" />
                <div className="flex-1">
                  <Skeleton className="h-3 w-3/4 mb-1 sm:h-4" />
                  <Skeleton className="h-2 w-1/2 sm:h-3" />
                </div>
                <Skeleton className="h-3 w-8 sm:h-4 sm:w-12" />
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2 border-t border-gray-200 pt-3 sm:pt-4">
            <div className="flex justify-between">
              <Skeleton className="h-3 w-16 sm:h-4 sm:w-20" />
              <Skeleton className="h-3 w-12 sm:h-4 sm:w-16" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-3 w-12 sm:h-4 sm:w-16" />
              <Skeleton className="h-3 w-8 sm:h-4 sm:w-12" />
            </div>
            <div className="flex justify-between pt-2">
              <Skeleton className="h-4 w-8 sm:h-6 sm:w-12" />
              <Skeleton className="h-4 w-16 sm:h-6 sm:w-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
