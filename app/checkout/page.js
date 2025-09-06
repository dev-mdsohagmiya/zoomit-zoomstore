import { Suspense } from "react";
import Link from "next/link";
import CheckoutPageClient from "./CheckoutPageClient";
import CheckoutAuthWrapper from "./CheckoutAuthWrapper";

export default function CheckoutPage() {
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
          <CheckoutAuthWrapper />
        </Suspense>
      </div>
    </div>
  );
}
