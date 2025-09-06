import { Suspense } from "react";
import Link from "next/link";
import CheckoutPageClient from "./CheckoutPageClient";
import { getCart } from "../actions/cart";

export default async function CheckoutPage() {
  // Fetch user's cart data
  const cartResult = await getCart();

  if (!cartResult.success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Cart
          </h1>
          <p className="text-gray-600">{cartResult.error}</p>
        </div>
      </div>
    );
  }

  const cart = cartResult.data;

  // If cart is empty, redirect to products page
  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-6">
            Add some products to your cart before checkout
          </p>
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 bg-purple-900 text-white rounded-lg hover:bg-purple-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Checkout
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Complete your order and make payment
          </p>
        </div>

        <Suspense
          fallback={
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
          }
        >
          <CheckoutPageClient cart={cart} />
        </Suspense>
      </div>
    </div>
  );
}
