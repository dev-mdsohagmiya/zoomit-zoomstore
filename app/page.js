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
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/20 backdrop-blur-sm border border-white/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/zoomitlogo.png"
                    alt="ZoomStore"
                    className="h-full w-full object-contain p-1"
                  />
                </div>
                <span className="text-2xl font-bold text-white drop-shadow-lg">
                  ZoomStore
                </span>
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
                <Link href="/register">
                  <button className="h-14 rounded-xl border-2 border-white/40 text-white px-8 text-lg font-semibold hover:bg-white/20 transition-all duration-300 backdrop-blur-sm hover:border-white/60">
                    Join Free
                  </button>
                </Link>
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
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
                        {/* eslint-disable-next-line @next/next/no-img-element */}
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
            <p className="text-purple-700">We're always here to help</p>
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
