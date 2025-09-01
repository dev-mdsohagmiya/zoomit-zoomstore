"use client";
import Link from "next/link";
import { Star } from "lucide-react";

export default function ProductCard({ product }) {
  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  // Convert USD to BDT (approximate rate: 1 USD = 110 BDT)
  const priceInBDT = Math.round(product.price * 110);
  const originalPriceInBDT = product.originalPrice
    ? Math.round(product.originalPrice * 110)
    : null;

  return (
    <div className="group relative rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Discount Badge */}
      {hasDiscount && (
        <div className="absolute top-3 left-3 z-10 rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">
          -{discountPercentage}%
        </div>
      )}

      {/* Product Image */}
      <Link
        href={`/products/${product.id}`}
        className="block overflow-hidden rounded-t-xl"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={product.title}
          src={product.image}
          className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-3">
          <Link
            href={`/products/${product.id}`}
            className="block font-medium text-slate-900 hover:text-slate-700 transition-colors line-clamp-2"
          >
            {product.title}
          </Link>
          {product.subtitle && (
            <p className="mt-1 text-sm text-slate-500 line-clamp-1">
              {product.subtitle}
            </p>
          )}
        </div>

        {/* Rating */}
        <div className="mb-3 flex items-center gap-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < product.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-slate-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-slate-600 ml-1">
            ({product.reviews || 0})
          </span>
        </div>

        {/* Pricing */}
        <div className="mb-4 flex items-center gap-2">
          <span className="text-lg font-bold text-slate-900">
            ৳{priceInBDT.toLocaleString()}
          </span>
          {hasDiscount && originalPriceInBDT && (
            <span className="text-sm text-slate-500 line-through">
              ৳{originalPriceInBDT.toLocaleString()}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
