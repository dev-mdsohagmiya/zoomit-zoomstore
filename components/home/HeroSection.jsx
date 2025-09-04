"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { isAuthenticated, getUserRole } from "../../lib/auth-utils";

export default function HeroSection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on component mount
    const checkAuthStatus = () => {
      const authenticated = isAuthenticated();
      const role = getUserRole();

      setIsLoggedIn(authenticated);
      setUserRole(role);
      setIsLoading(false);
    };

    checkAuthStatus();

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "rgb(146, 40, 142)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-purple-800/20"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative mx-auto max-w-6xl px-4 py-20 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-8 text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg border-2 border-white/30">
                  <span className="text-2xl font-bold text-white">Z</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-white drop-shadow-lg">
                    Premium Shopping Experience
                  </span>
                  <span className="text-sm text-white/80 drop-shadow-md">
                    Quality • Trust • Innovation
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white drop-shadow-lg">
                  Shop Smart,{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                    Live Better
                  </span>
                </h1>
                <p className="text-xl text-white/90 leading-relaxed drop-shadow-md">
                  Discover amazing products at unbeatable prices. Fast delivery,
                  secure payments, and 24/7 customer support.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <button className="h-14 rounded-xl bg-white text-purple-900 px-8 text-lg font-semibold hover:bg-yellow-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 border-2 border-white/20">
                    🛍️ Shop Now
                  </button>
                </Link>
                <div className="h-14 rounded-xl border-2 border-white/40 text-white px-8 text-lg font-semibold flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
              </div>
            </div>
            {/* Rest of the hero content */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                <img
                  alt="E-commerce Shopping"
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/30">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-purple-200">
                        <img
                          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop"
                          alt="Product"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900">
                          Wireless Headphones
                        </div>
                        <div className="text-sm text-slate-600">
                          ৳9,790 • ⭐⭐⭐⭐⭐ (89 reviews)
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-purple-900">
                          ৳9,790
                        </div>
                        <div className="text-sm text-slate-500 line-through">
                          ৳13,200
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-xl animate-bounce border-4 border-white/30">
                <span className="text-2xl">🔥</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center shadow-xl animate-pulse border-4 border-white/30">
                <span className="text-xl">✓</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "rgb(146, 40, 142)" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-purple-800/20"></div>
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative mx-auto max-w-6xl px-4 py-20 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg border-2 border-white/30">
                <span className="text-2xl font-bold text-white">Z</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-white drop-shadow-lg">
                  Premium Shopping Experience
                </span>
                <span className="text-sm text-white/80 drop-shadow-md">
                  Quality • Trust • Innovation
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white drop-shadow-lg">
                Shop Smart,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                  Live Better
                </span>
              </h1>
              <p className="text-xl text-white/90 leading-relaxed drop-shadow-md">
                Discover amazing products at unbeatable prices. Fast delivery,
                secure payments, and 24/7 customer support.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <button className="h-14 rounded-xl bg-white text-purple-900 px-8 text-lg font-semibold hover:bg-yellow-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 border-2 border-white/20">
                  🛍️ Shop Now
                </button>
              </Link>

              {/* Conditionally render Join Free button or admin panel button */}
              {!isLoggedIn ? (
                <Link href="/register">
                  <button className="h-14 rounded-xl border-2 border-white/40 text-white px-8 text-lg font-semibold hover:bg-white/20 transition-all duration-300 backdrop-blur-sm hover:border-white/60">
                    Join Free
                  </button>
                </Link>
              ) : userRole === "admin" || userRole === "superadmin" ? (
                <Link href="/admin/dashboard">
                  <button className="h-14 rounded-xl border-2 border-white/40 text-white px-8 text-lg font-semibold hover:bg-white/20 transition-all duration-300 backdrop-blur-sm hover:border-white/60">
                    👨‍💼 Admin Panel
                  </button>
                </Link>
              ) : null}
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white drop-shadow-lg">
                  10K+
                </div>
                <div className="text-sm text-white/80">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white drop-shadow-lg">
                  5★
                </div>
                <div className="text-sm text-white/80">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white drop-shadow-lg">
                  24/7
                </div>
                <div className="text-sm text-white/80">Support</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
              <img
                alt="E-commerce Shopping"
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/30">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-purple-200">
                      <img
                        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop"
                        alt="Product"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900">
                        Wireless Headphones
                      </div>
                      <div className="text-sm text-slate-600">
                        ৳9,790 • ⭐⭐⭐⭐⭐ (89 reviews)
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-purple-900">
                        ৳9,790
                      </div>
                      <div className="text-sm text-slate-500 line-through">
                        ৳13,200
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-xl animate-bounce border-4 border-white/30">
              <span className="text-2xl">🔥</span>
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center shadow-xl animate-pulse border-4 border-white/30">
              <span className="text-xl">✓</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
