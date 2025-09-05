"use client";
import { useState } from "react";
import { X, Star, Package, DollarSign, Tag, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Button } from "./button";

export default function ProductDetailsModal({ isOpen, onClose, product }) {
  if (!product) return null;

  const formatPrice = (price, discount = 0) => {
    const discountedPrice = price - (price * discount) / 100;
    return {
      original: price,
      discounted: discountedPrice,
      discount: discount,
    };
  };

  const priceInfo = formatPrice(product.price, product.discount);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto w-full max-w-[95vw]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-gray-900">
              Product Details
            </DialogTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 break-words">
          {/* Product Images */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Images</h3>
            {product.photos && product.photos.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {product.photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={photo}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-32 bg-gray-100 rounded-lg border border-gray-200">
                <div className="text-center">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">No images available</p>
                </div>
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Basic Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Product Name
                    </label>
                    <p className="text-gray-900 break-words">{product.name}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Description
                    </label>
                    <p className="text-gray-900 whitespace-pre-wrap break-words max-h-32 overflow-y-auto">
                      {product.description || "No description available"}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Slug
                    </label>
                    <p className="text-gray-900 font-mono text-sm break-all">
                      {product.slug}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing & Stock */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Pricing & Stock
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Price
                    </label>
                    <div className="flex items-center space-x-2">
                      {priceInfo.discount > 0 ? (
                        <div>
                          <div className="text-green-600 font-bold text-lg">
                            ৳{priceInfo.discounted.toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-500 line-through">
                            ৳{priceInfo.original.toFixed(2)}
                          </div>
                          <div className="text-xs text-red-600 font-medium">
                            {priceInfo.discount}% OFF
                          </div>
                        </div>
                      ) : (
                        <div className="text-gray-900 font-bold text-lg">
                          ৳{priceInfo.original.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Stock
                    </label>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-900 font-medium">
                        {product.stock} units
                      </span>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          product.inStock
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Categories
            </h3>
            {product.categories && product.categories.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {product.categories.map((category) => (
                  <span
                    key={category._id}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 break-words max-w-full"
                  >
                    <Tag className="h-3 w-3 mr-1 flex-shrink-0" />
                    <span className="truncate">{category.name}</span>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No categories assigned</p>
            )}
          </div>

          {/* Reviews & Rating */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Reviews & Rating
            </h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-1 text-lg font-medium text-gray-900">
                  {product.rating || 0}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                Based on {product.numReviews || 0} review
                {product.numReviews !== 1 ? "s" : ""}
              </div>
            </div>
          </div>

          {/* Status & Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Status</h3>
              <span
                className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                  product.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {product.status}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Dates</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-500">Created:</span>
                  <span className="ml-2 text-gray-900">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-500">Updated:</span>
                  <span className="ml-2 text-gray-900">
                    {new Date(product.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
