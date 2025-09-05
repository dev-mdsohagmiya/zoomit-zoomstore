"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, User, Settings, LogOut } from "lucide-react";
import CartModal from "./CartModal";
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

  const linkClass = (href) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      pathname === href
        ? "bg-purple-900 text-white"
        : "text-purple-900 hover:bg-purple-100"
    }`;

  const mobileLinkClass = (href) =>
    `block px-4 py-3 text-base font-medium transition-colors ${
      pathname === href
        ? "bg-purple-900 text-white"
        : "text-purple-900 hover:bg-purple-100"
    }`;

  // Handle logout
  const handleLogout = () => {
    clearAuthData();
    setIsLoggedIn(false);
    setUserRole(null);
    setUser(null);
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    // Redirect to home page
    window.location.href = "/";
  };

  useEffect(() => {
    // Check authentication status on component mount
    const checkAuthStatus = () => {
      const authenticated = isAuthenticated();
      const role = getUserRole();
      const userData = getStoredUser();

      setIsLoggedIn(authenticated);
      setUserRole(role);
      setUser(userData);
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
            <CartModal
              trigger={
                <button className="inline-flex items-center gap-2 rounded-md border border-purple-300 px-3 py-2 text-sm font-medium text-purple-900 hover:bg-purple-50 transition-colors">
                  <ShoppingCart className="h-4 w-4" />
                  Cart
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
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <button className="h-9 rounded-md border border-purple-300 px-3 text-sm font-medium text-purple-900 hover:bg-purple-50 transition-colors">
                    Sign In
                  </button>
                </Link>
                <Link href="/register">
                  <button className="h-9 rounded-md bg-purple-900 px-3 text-sm font-medium text-white hover:bg-purple-800 transition-colors">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <CartModal
              trigger={
                <button className="inline-flex items-center gap-1 rounded-md border border-purple-300 px-2 py-1.5 text-xs font-medium text-purple-900 hover:bg-purple-50 transition-colors">
                  <ShoppingCart className="h-3 w-3" />
                  <span className="hidden xs:inline">Cart</span>
                </button>
              }
            />

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-purple-900 hover:bg-purple-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-purple-200 bg-white">
            <div className="px-4 py-2 space-y-1">
              {/* Mobile Navigation Links */}
              <Link
                href="/"
                className={mobileLinkClass("/")}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className={mobileLinkClass("/products")}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>

              {/* Mobile Auth Section */}
              {isLoading ? (
                <div className="px-4 py-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 animate-pulse"></div>
                </div>
              ) : isLoggedIn ? (
                <div className="px-4 py-3 border-t border-purple-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-purple-200">
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
                    <div>
                      <div className="text-sm font-medium text-purple-900">
                        {user?.name || "User"}
                      </div>
                      <div className="text-xs text-purple-600 capitalize">
                        {userRole || "User"}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-3 py-2 text-sm text-purple-700 hover:bg-purple-50 rounded-md transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>

                    {(userRole === "admin" || userRole === "superadmin") && (
                      <Link
                        href="/admin/dashboard"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-purple-700 hover:bg-purple-50 rounded-md transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4" />
                        Admin Panel
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors w-full text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="px-4 py-3 border-t border-purple-100 space-y-2">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <button className="w-full h-10 rounded-md border border-purple-300 text-sm font-medium text-purple-900 hover:bg-purple-50 transition-colors">
                      Sign In
                    </button>
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <button className="w-full h-10 rounded-md bg-purple-900 text-sm font-medium text-white hover:bg-purple-800 transition-colors">
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
