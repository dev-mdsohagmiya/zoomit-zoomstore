import Link from "next/link";

export default function TestCheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Test Checkout Flow
        </h1>
        <div className="space-y-4">
          <Link
            href="/checkout"
            className="inline-block px-6 py-3 bg-purple-900 text-white rounded-lg hover:bg-purple-800 transition-colors"
          >
            Go to Checkout Page
          </Link>
          <div className="text-sm text-gray-600">
            <p>Make sure you have items in your cart first</p>
            <p>Go to /products and add some items to cart</p>
          </div>
        </div>
      </div>
    </div>
  );
}
