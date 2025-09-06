"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingCart,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  Home,
  Package,
  UserCircle,
  Shield,
} from "lucide-react";
import CartSidePanel from "./CartSidePanel";
import { useCartState } from "../../lib/hooks/useCartState";
import {
  isAuthenticated,
  getUserRole,
  getStoredUser,
  clearAuthData,
} from "../../lib/auth-utils";

export default function Navbar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Get cart state for item count
  const { cartItems, refreshCart, cacheKey } = useCartState();
  const totalItems =
    cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;

  // Debug: Log cart state
  console.log("Navbar - Cart items:", cartItems);
  console.log("Navbar - Total items:", totalItems);
  console.log("Navbar - Loading state:", isLoading);
  console.log("Navbar - Should show badge:", totalItems > 0);
  console.log("Navbar - Cache key:", cacheKey);

  // Refresh cart when component mounts
  useEffect(() => {
    console.log("Navbar - Refreshing cart...");
    refreshCart();
  }, []); // Remove refreshCart from dependencies to avoid infinite loop

  // Force re-render when cart state changes
  useEffect(() => {
    console.log("Navbar - Cart state changed, updating badge");
  }, [cartItems, cacheKey, totalItems]);

  const linkClass = (href) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      pathname === href
        ? "bg-purple-900 text-white"
        : "text-purple-900 hover:bg-purple-100"
    }`;

  const mobileLinkClass = (href) =>
    `flex items-center gap-3 px-4 py-3 text-base font-medium transition-colors rounded-lg mx-2 ${
      pathname === href
        ? "bg-purple-900 text-white"
        : "text-gray-700 hover:bg-purple-50"
    }`;

  // Handle logout
  const handleLogout = () => {
    clearAuthData();
    setIsLoggedIn(false);
    setUserRole(null);
    setUser(null);
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    // Redirect to root page
    window.location.href = "/";
  };

  useEffect(() => {
    // Check authentication status on component mount
    const checkAuthStatus = () => {
      try {
        const authenticated = isAuthenticated();
        const role = getUserRole();
        const userData = getStoredUser();

        setIsLoggedIn(authenticated);
        setUserRole(role);
        setUser(userData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsLoading(false); // Set loading to false even if there's an error
      }
    };

    checkAuthStatus();

    // Fallback timeout to ensure loading state is cleared
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-purple-200 bg-white/95 backdrop-blur">
      <div className="h-16">
        <div className="mx-auto h-full max-w-6xl px-4 sm:px-6 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Logo"
              className="h-6 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/" className={linkClass("/")}>
              Home
            </Link>
            <Link href="/products" className={linkClass("/products")}>
              Products
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <CartSidePanel
              trigger={
                <button className="relative inline-flex items-center gap-2 rounded-md border border-purple-300 px-3 py-2 text-sm font-medium text-purple-900 hover:bg-purple-50 transition-colors">
                  <ShoppingCart className="h-4 w-4" />
                  Cart
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg border-2 border-white z-20 min-w-[24px] min-h-[24px] animate-pulse">
                      {totalItems > 99 ? "99+" : totalItems}
                    </span>
                  )}
                </button>
              }
            />

            {isLoading ? (
              <div className="w-9 h-9 rounded-full bg-purple-100 animate-pulse"></div>
            ) : isLoggedIn ? (
              <div className="flex items-center gap-3">
                {/* Admin Panel Link for Admin Users */}
                {userRole === "admin" || userRole === "superadmin" ? (
                  <Link href="/admin/dashboard">
                    <button className="h-9 rounded-md border border-purple-300 px-3 text-sm font-medium text-purple-900 hover:bg-purple-50 transition-colors">
                      Admin Panel
                    </button>
                  </Link>
                ) : (
                  /* User Profile for Regular Users */
                  <Link href="/profile" className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full overflow-hidden ring-1 ring-purple-200">
                      {user?.photo ? (
                        <img
                          alt="Profile"
                          src={user.photo}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-purple-100 flex items-center justify-center">
                          <span className="text-purple-600 text-sm font-medium">
                            {user?.name?.charAt(0)?.toUpperCase() || "U"}
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-medium text-purple-900">
                      {user?.name || "User"}
                    </span>
                  </Link>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <button className="h-9 rounded-md border border-purple-300 px-3 text-sm font-medium text-purple-900 hover:bg-purple-50 transition-colors">
                    Sign In
                  </button>
                </Link>
                <br />
                <Link href="/register" className="">
                  <button className="h-9 rounded-md bg-purple-900 px-3 text-sm font-medium text-white hover:bg-purple-800 transition-colors ">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <CartSidePanel
              trigger={
                <button className="relative inline-flex items-center gap-2 rounded-lg border border-purple-300 px-3 py-2 text-sm font-medium text-purple-900 hover:bg-purple-50 transition-colors">
                  <ShoppingCart className="h-4 w-4" />
                  <span className="hidden xs:inline">Cart</span>
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg border-2 border-white z-20 min-w-[24px] min-h-[24px] animate-pulse">
                      {totalItems > 99 ? "99+" : totalItems}
                    </span>
                  )}
                </button>
              }
            />

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-purple-900 hover:bg-purple-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-purple-200 bg-white shadow-lg">
            <div className="px-2 py-4 space-y-2">
              {/* Mobile Navigation Links */}
              <Link
                href="/"
                className={mobileLinkClass("/")}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home className="h-5 w-5" />
                Home
              </Link>
              <Link
                href="/products"
                className={mobileLinkClass("/products")}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Package className="h-5 w-5" />
                Products
              </Link>

              {/* Mobile Auth Section */}
              {isLoading ? (
                <div className="px-4 py-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 animate-pulse"></div>
                </div>
              ) : isLoggedIn ? (
                <div className="px-2 py-3 border-t border-gray-200 mt-4">
                  {/* User Profile Section */}
                  <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-purple-200">
                      {user?.photo ? (
                        <img
                          alt="Profile"
                          src={user.photo}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-purple-100 flex items-center justify-center">
                          <span className="text-purple-600 text-lg font-medium">
                            {user?.name?.charAt(0)?.toUpperCase() || "U"}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-base font-semibold text-gray-900">
                        {user?.name || "User"}
                      </div>
                      <div className="text-sm text-gray-600 capitalize">
                        {userRole || "User"}
                      </div>
                    </div>
                  </div>

                  {/* Profile Menu Items */}
                  <div className="space-y-1">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-3 text-base text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <UserCircle className="h-5 w-5" />
                      Profile
                    </Link>

                    {(userRole === "admin" || userRole === "superadmin") && (
                      <Link
                        href="/admin/dashboard"
                        className="flex items-center gap-3 px-4 py-3 text-base text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Shield className="h-5 w-5" />
                        Admin Panel
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 text-base text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full text-left"
                    >
                      <LogOut className="h-5 w-5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="px-2 py-3 flex flex-col  border-t border-gray-200 mt-4 space-y-3">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <button className="w-full h-12 rounded-lg border-2 border-purple-300 text-base font-medium text-purple-900 hover:bg-purple-50 transition-colors">
                      Sign In
                    </button>
                  </Link>
                  <Link
                    className=""
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <button className="w-full h-12 rounded-lg bg-purple-900 text-base font-medium text-white hover:bg-purple-800 transition-colors">
                      Register
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
