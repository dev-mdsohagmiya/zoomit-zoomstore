"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import CartModal from "./CartModal";
import {
  isAuthenticated,
  getUserRole,
  getStoredUser,
} from "../../lib/auth-utils";

export default function Navbar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const linkClass = (href) =>
    `px-3 py-2 rounded-md text-sm font-body font-medium transition-colors ${
      pathname === href
        ? "bg-purple-900 text-white"
        : "text-purple-900 hover:bg-purple-100"
    }`;

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
    <header className="sticky top-0 z-40 border-b border-purple-200 bg-white/90 backdrop-blur">
      <div className="h-16">
        <div className="mx-auto h-full max-w-6xl px-4 sm:px-6 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/zoomitlogo.png"
                alt="ZoomStore"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="text-lg font-display font-semibold text-purple-900">
              ZoomStore
            </span>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/" className={linkClass("/")}>
              Home
            </Link>
            <Link href="/products" className={linkClass("/products")}>
              Products
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <CartModal
              trigger={
                <button className="inline-flex items-center gap-2 rounded-md border border-purple-300 px-3 py-2 text-sm font-body font-medium text-purple-900 hover:bg-purple-50">
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
                    <button className="h-9 rounded-md border border-purple-300 px-3 text-sm font-body font-medium text-purple-900 hover:bg-purple-50">
                      Go to Admin Panel
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
                    <span className="hidden sm:block text-sm font-medium text-purple-900">
                      {user?.name || "User"}
                    </span>
                  </Link>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/login">
                  <button className="h-9 rounded-md border border-purple-300 px-3 text-sm font-body font-medium text-purple-900 hover:bg-purple-50">
                    Sign In
                  </button>
                </Link>
                <Link href="/register">
                  <button className="h-9 rounded-md bg-purple-900 px-3 text-sm font-body font-medium text-white hover:bg-purple-800">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
