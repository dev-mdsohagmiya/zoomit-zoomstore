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
import { getPublicProducts, getPublicCategories } from "./actions/public";

export default async function HomePage() {
  // Fetch featured products (random 8 products)
  let featuredProducts = [];
  let categories = [];
  let heroProduct = null;

  try {
    // Fetch random products for featured section
    const productsResult = await getPublicProducts(1, 8, {});
    if (productsResult.success) {
      featuredProducts = productsResult.data?.products || [];
    }

    // Fetch categories
    const categoriesResult = await getPublicCategories();
    if (categoriesResult.success) {
      categories = categoriesResult.data || [];
    }

    // Get a random product for hero section
    if (featuredProducts.length > 0) {
      const randomIndex = Math.floor(Math.random() * featuredProducts.length);
      heroProduct = featuredProducts[randomIndex];
    }
  } catch (error) {
    console.error("Error fetching home page data:", error);
  }
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <HeroSection heroProduct={heroProduct} />

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
            {categories.length > 0
              ? categories.slice(0, 4).map((category, index) => {
                  // Category-specific images with better variety
                  const categoryImages = [
                    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop", // Fashion & Clothing
                    "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop", // Electronics & Gadgets
                    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop", // Home & Living
                    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop", // Sports & Fitness
                    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop", // Beauty & Cosmetics
                    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop", // Baby & Kids
                    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop", // Kitchen & Cooking
                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop", // Audio & Music
                  ];

                  return (
                    <Link
                      key={category._id}
                      href={`/products?category=${category.slug}`}
                      className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt={category.name}
                        src={categoryImages[index % categoryImages.length]}
                        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {category.name}
                        </h3>
                        <p className="text-sm text-white/80">Shop now</p>
                      </div>
                    </Link>
                  );
                })
              : // Fallback categories if API fails
                [
                  {
                    _id: "1",
                    name: "Fashion & Clothing",
                    slug: "fashion-clothing",
                    image:
                      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
                  },
                  {
                    _id: "2",
                    name: "Electronics & Gadgets",
                    slug: "electronics-gadgets",
                    image:
                      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop",
                  },
                  {
                    _id: "3",
                    name: "Home & Living",
                    slug: "home-living",
                    image:
                      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
                  },
                  {
                    _id: "4",
                    name: "Sports & Fitness",
                    slug: "sports-fitness",
                    image:
                      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
                  },
                ].map((category) => (
                  <Link
                    key={category._id}
                    href={`/products?category=${category.slug}`}
                    className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={category.name}
                      src={category.image}
                      className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {category.name}
                      </h3>
                      <p className="text-sm text-white/80">Shop now</p>
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
            {featuredProducts.length > 0
              ? featuredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              : // Fallback products if API fails
                [
                  {
                    _id: "1",
                    name: "Classic Cotton Tee",
                    price: 24,
                    discount: 31,
                    rating: 4,
                    numReviews: 128,
                    photos: [
                      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=400&fit=crop",
                    ],
                    categories: [{ name: "Apparel" }],
                  },
                  {
                    _id: "2",
                    name: "Wireless Headphones",
                    price: 89,
                    discount: 26,
                    rating: 5,
                    numReviews: 89,
                    photos: [
                      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop",
                    ],
                    categories: [{ name: "Audio" }],
                  },
                  {
                    _id: "3",
                    name: "Sneaker Low-Top",
                    price: 69,
                    discount: 27,
                    rating: 4,
                    numReviews: 203,
                    photos: [
                      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=400&fit=crop",
                    ],
                    categories: [{ name: "Shoes" }],
                  },
                  {
                    _id: "4",
                    name: "Leather Backpack",
                    price: 129,
                    discount: 28,
                    rating: 5,
                    numReviews: 67,
                    photos: [
                      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop",
                    ],
                    categories: [{ name: "Bags" }],
                  },
                ].map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
          </div>
        </div>
      </section>
    </div>
  );
}
