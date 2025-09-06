"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { isAuthenticated } from "../../lib/auth-utils";
import { getCart } from "../actions/cart";
import CheckoutPageClient from "./CheckoutPageClient";

export default function CheckoutAuthWrapper() {
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loadCartData = async () => {
      try {
        const isUserAuthenticated = isAuthenticated();

        if (!isUserAuthenticated) {
          // Guest user - check if they have items in guest cart
          const guestCart = JSON.parse(
            localStorage.getItem("guestCart") || "[]"
          );

          if (guestCart.length === 0) {
            // No items in guest cart, redirect to products
            router.push("/products");
            return;
          }

          // Store guest cart data for checkout
          setCart({ items: guestCart });
          setIsLoading(false);
          return;
        }

        // Authenticated user - fetch from API
        const cartResult = await getCart();

        if (!cartResult.success) {
          setError(cartResult.error);
          setIsLoading(false);
          return;
        }

        if (
          !cartResult.data ||
          !cartResult.data.items ||
          cartResult.data.items.length === 0
        ) {
          // Empty cart, redirect to products
          router.push("/products");
          return;
        }

        setCart(cartResult.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading cart:", error);
        setError("Failed to load cart data");
        setIsLoading(false);
      }
    };

    loadCartData();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Cart
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
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

  // Check if user is authenticated for checkout
  const isUserAuthenticated = isAuthenticated();

  if (!isUserAuthenticated) {
    // Guest user - redirect to login with return URL
    const returnUrl = encodeURIComponent("/checkout");
    router.push(`/login?returnUrl=${returnUrl}`);
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Please Login to Continue
          </h1>
          <p className="text-gray-600 mb-6">Redirecting to login page...</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return <CheckoutPageClient cart={cart} />;
}
