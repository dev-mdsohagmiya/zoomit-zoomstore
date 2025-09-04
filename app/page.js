import Link from "next/link";
import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  RefreshCcw,
  Headset,
} from "lucide-react";
import ProductCard from "../components/ui/ProductCard";
import HeroSection from "../components/home/HeroSection";

const FEATURED = [
  {
    id: "1",
    title: "Classic Cotton Tee",
    subtitle: "Men • Apparel",
    price: 24,
    originalPrice: 35,
    rating: 4,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=400&fit=crop",
  },
  {
    id: "2",
    title: "Wireless Headphones",
    subtitle: "Audio",
    price: 89,
    originalPrice: 120,
    rating: 5,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop",
  },
  {
    id: "3",
    title: "Sneaker Low-Top",
    subtitle: "Shoes",
    price: 69,
    originalPrice: 95,
    rating: 4,
    reviews: 203,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=400&fit=crop",
  },
  {
    id: "4",
    title: "Leather Backpack",
    subtitle: "Bags",
    price: 129,
    originalPrice: 179,
    rating: 5,
    reviews: 67,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <HeroSection />

      {/* Benefits */}
      <section
        className="border-y border-purple-200"
        style={{ backgroundColor: "rgb(244, 234, 244)" }}
      >
        <div className="mx-auto max-w-6xl px-4 py-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center group">
            <div className="w-16 h-16 rounded-2xl bg-purple-900 flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-800 transition-colors shadow-lg">
              <Truck className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-purple-900 mb-2">
              Fast Shipping
            </h3>
            <p className="text-purple-700">2–5 day delivery worldwide</p>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 rounded-2xl bg-purple-900 flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-800 transition-colors shadow-lg">
              <ShieldCheck className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-purple-900 mb-2">
              Secure Checkout
            </h3>
            <p className="text-purple-700">PCI-compliant & encrypted</p>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 rounded-2xl bg-purple-900 flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-800 transition-colors shadow-lg">
              <RefreshCcw className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-purple-900 mb-2">
              Easy Returns
            </h3>
            <p className="text-purple-700">30-day hassle-free policy</p>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 rounded-2xl bg-purple-900 flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-800 transition-colors shadow-lg">
              <Headset className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-purple-900 mb-2">
              24/7 Support
            </h3>
            <p className="text-purple-700">We&apos;re always here to help</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section
        className="w-full py-12"
        style={{ backgroundColor: "rgb(244, 234, 244)" }}
      >
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-bold text-purple-900">
              Shop by category
            </h2>
            <Link
              href="/products"
              className="text-sm text-purple-700 hover:text-purple-900 hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "Fashion & Clothing",
                img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
                count: "1,200+ items",
              },
              {
                label: "Electronics & Gadgets",
                img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop",
                count: "800+ items",
              },
              {
                label: "Home & Living",
                img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
                count: "650+ items",
              },
              {
                label: "Sports & Fitness",
                img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
                count: "400+ items",
              },
            ].map((c) => (
              <Link
                key={c.label}
                href="/products"
                className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={c.label}
                  src={c.img}
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {c.label}
                  </h3>
                  <p className="text-sm text-white/80">{c.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section
        className="w-full pb-16"
        style={{ backgroundColor: "rgb(244, 234, 244)" }}
      >
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-bold text-purple-900">
              Featured products
            </h2>
            <Link
              href="/products"
              className="text-sm text-purple-700 hover:text-purple-900 hover:underline"
            >
              Browse all
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
