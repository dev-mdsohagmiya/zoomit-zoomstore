"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home, CreditCard } from "lucide-react";
import Link from "next/link";

export default function CheckoutError({ error, reset }) {
  useEffect(() => {
    console.error("Checkout page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CreditCard className="h-8 w-8 text-red-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Checkout Error
        </h1>

        <p className="text-gray-600 mb-8">
          We encountered an error while processing your checkout. Please try
          again.
        </p>

        <div className="space-y-3">
          <Button
            onClick={reset}
            className="w-full bg-purple-900 hover:bg-purple-800 text-white"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>

          <Link href="/products">
            <Button
              variant="outline"
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Continue Shopping
            </Button>
          </Link>

          <Link href="/">
            <Button
              variant="outline"
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Button>
          </Link>
        </div>

        {process.env.NODE_ENV === "development" && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              Error Details (Development)
            </summary>
            <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
