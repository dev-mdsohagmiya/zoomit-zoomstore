import Link from "next/link";
import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  RefreshCcw,
  Headset,
} from "lucide-react";
import ProductCard from "../components/ui/ProductCard";

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
      <section className="mx-auto max-w-6xl px-4 py-12 grid items-center gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/zoomitlogo.png"
                alt="ZoomStore"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="text-xl font-semibold text-slate-900">
              ZoomStore
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Discover quality products at the speed of life
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Shop curated essentials across apparel, tech, home and more — all
            with fast shipping and secure checkout.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/products">
              <button className="h-12 rounded-lg bg-slate-900 px-8 text-white font-medium hover:bg-slate-800 transition-colors">
                Shop Now
              </button>
            </Link>
            <Link href="/register">
              <button className="h-12 rounded-lg border border-slate-300 px-8 text-slate-700 font-medium hover:bg-slate-50 transition-colors">
                Create Account
              </button>
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Hero"
              src="https://picsum.photos/seed/zoomstore-hero/900/650"
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center group">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mx-auto mb-4 group-hover:bg-slate-800 transition-colors">
              <Truck className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Fast Shipping
            </h3>
            <p className="text-slate-600">2–5 day delivery worldwide</p>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mx-auto mb-4 group-hover:bg-slate-800 transition-colors">
              <ShieldCheck className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Secure Checkout
            </h3>
            <p className="text-slate-600">PCI-compliant & encrypted</p>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mx-auto mb-4 group-hover:bg-slate-800 transition-colors">
              <RefreshCcw className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Easy Returns
            </h3>
            <p className="text-slate-600">30-day hassle-free policy</p>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mx-auto mb-4 group-hover:bg-slate-800 transition-colors">
              <Headset className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              24/7 Support
            </h3>
            <p className="text-slate-600">We're always here to help</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-slate-900">
            Shop by category
          </h2>
          <Link
            href="/products"
            className="text-sm text-slate-700 hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Apparel",
              img: "https://picsum.photos/seed/zoomstore-cat1/600/400",
              count: "1,200+ items",
            },
            {
              label: "Electronics",
              img: "https://picsum.photos/seed/zoomstore-cat2/600/400",
              count: "800+ items",
            },
            {
              label: "Home",
              img: "https://picsum.photos/seed/zoomstore-cat3/600/400",
              count: "650+ items",
            },
            {
              label: "Fitness",
              img: "https://picsum.photos/seed/zoomstore-cat4/600/400",
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
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-slate-900">
            Featured products
          </h2>
          <Link
            href="/products"
            className="text-sm text-slate-700 hover:underline"
          >
            Browse all
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
