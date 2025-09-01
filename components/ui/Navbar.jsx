"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import CartModal from "./CartModal";

export default function Navbar() {
  const pathname = usePathname();
  const linkClass = (href) =>
    `px-3 py-2 rounded-md text-sm transition-colors ${
      pathname === href
        ? "bg-slate-900 text-white"
        : "text-slate-700 hover:bg-slate-100"
    }`;
  // Temporary auth flag. Replace with real auth state.
  const isLoggedIn = false;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
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
            <span className="text-lg font-semibold text-slate-900">
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
            <Link href="/admin" className={linkClass("/admin")}>
              Admin
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <CartModal
              trigger={
                <button className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                  <ShoppingCart className="h-4 w-4" />
                  Cart
                </button>
              }
            />
            {isLoggedIn ? (
              <Link href="/profile" className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden ring-1 ring-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt="Profile"
                    src="https://i.pravatar.cc/80?img=12"
                    className="h-full w-full object-cover"
                  />
                </div>
              </Link>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/login">
                  <button className="h-9 rounded-md border border-slate-300 px-3 text-sm text-slate-700 hover:bg-slate-50">
                    Sign In
                  </button>
                </Link>
                <Link href="/register">
                  <button className="h-9 rounded-md bg-slate-900 px-3 text-sm text-white hover:bg-slate-800">
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
