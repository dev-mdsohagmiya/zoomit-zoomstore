import CenteredCartModal from "../../../components/ui/CenteredCartModal";
import Link from "next/link";
import { Star, Heart, Truck, Shield, ArrowLeft } from "lucide-react";

const PRODUCT = {
  id: "1",
  title: "Premium Cotton Comfort Tee",
  price: 2640,
  originalPrice: 3200,
  description:
    "Experience ultimate comfort with our premium cotton tee. Made from 100% organic cotton, this breathable and soft fabric provides exceptional comfort for everyday wear. Perfect fit with a modern cut that flatters all body types.",
  specs: [
    "100% organic cotton",
    "Regular fit with modern cut",
    "Machine washable at 30°C",
    "Pre-shrunk fabric",
    "Sustainable and eco-friendly",
  ],
  rating: 4.8,
  reviews: 124,
  inStock: true,
  category: "Clothing",
  image:
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop",
  images: [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=800&fit=crop",
  ],
};

const RELATED_PRODUCTS = [
  {
    id: "2",
    title: "Classic Denim Jacket",
    price: 4200,
    originalPrice: 5200,
    image:
      "https://images.unsplash.com/photo-1544022613-e87ca540a39a?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 89,
  },
  {
    id: "3",
    title: "Premium Sneakers",
    price: 5800,
    originalPrice: 7200,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 156,
  },
  {
    id: "4",
    title: "Wireless Headphones",
    price: 9790,
    originalPrice: 12000,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 203,
  },
];

const CATEGORIES = [
  {
    name: "Clothing",
    count: 45,
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop",
  },
  {
    name: "Electronics",
    count: 32,
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop",
  },
  {
    name: "Home & Garden",
    count: 28,
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
  },
  {
    name: "Sports",
    count: 19,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
  },
];

export default function ProductDetailPage() {
  return (
    <div
      style={{ backgroundColor: "rgb(244, 234, 244)" }}
      className="min-h-screen"
    >
      {/* Breadcrumb */}
      <div className="bg-white border-b border-purple-200">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-purple-600">
            <Link href="/" className="hover:text-purple-800 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/products"
              className="hover:text-purple-800 transition-colors"
            >
              Products
            </Link>
            <span>/</span>
            <span className="text-purple-900 font-medium">{PRODUCT.title}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Product Details */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl border border-purple-200 bg-white shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={PRODUCT.title}
                src={PRODUCT.image}
                className="h-96 w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {PRODUCT.images.slice(1).map((img, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg border border-purple-200 bg-white cursor-pointer hover:border-purple-400 transition-colors"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={`${PRODUCT.title} ${index + 2}`}
                    src={img}
                    className="h-20 w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">
                  {PRODUCT.category}
                </span>
                <span className="text-sm text-purple-600">•</span>
                <span className="text-sm text-purple-600">
                  {PRODUCT.reviews} reviews
                </span>
              </div>

              <h1 className="text-3xl font-bold text-purple-900 mb-3">
                {PRODUCT.title}
              </h1>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(PRODUCT.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-purple-600">
                  {PRODUCT.rating} ({PRODUCT.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-purple-900">
                  ৳{PRODUCT.price}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  ৳{PRODUCT.originalPrice}
                </span>
                <span className="bg-red-100 text-red-700 text-sm font-medium px-2 py-1 rounded-full">
                  {Math.round(
                    ((PRODUCT.originalPrice - PRODUCT.price) /
                      PRODUCT.originalPrice) *
                      100
                  )}
                  % OFF
                </span>
              </div>

              <p className="text-base text-purple-700 leading-relaxed">
                {PRODUCT.description}
              </p>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-lg font-semibold text-purple-900 mb-3">
                Specifications
              </h3>
              <ul className="space-y-2">
                {PRODUCT.specs.map((spec, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-purple-700"
                  >
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <button className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-purple-300 text-purple-700 hover:bg-purple-50 transition-colors">
                    -
                  </button>
                  <input
                    className="h-10 w-16 rounded-lg border border-purple-300 text-center text-base font-medium"
                    defaultValue={1}
                    readOnly
                  />
                  <button className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-purple-300 text-purple-700 hover:bg-purple-50 transition-colors">
                    +
                  </button>
                </div>
                <button className="h-10 px-4 rounded-lg border border-purple-300 text-purple-700 hover:bg-purple-50 transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
              </div>

              <div className="flex gap-3">
                <button className="h-12 flex-1 rounded-lg bg-purple-900 text-white font-semibold hover:bg-purple-800 transition-colors">
                  Add to Cart
                </button>
                <CenteredCartModal
                  trigger={
                    <button className="h-12 px-6 rounded-lg border-2 border-purple-300 text-purple-700 font-semibold hover:bg-purple-50 transition-colors">
                      View Cart
                    </button>
                  }
                />
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 text-sm">
                <div
                  className={`w-2 h-2 rounded-full ${
                    PRODUCT.inStock ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <span
                  className={
                    PRODUCT.inStock ? "text-green-700" : "text-red-700"
                  }
                >
                  {PRODUCT.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-purple-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Truck className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-purple-900">
                    Free Shipping
                  </h4>
                  <p className="text-xs text-purple-600">
                    On orders over ৳2000
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-purple-900">
                    Secure Payment
                  </h4>
                  <p className="text-xs text-purple-600">
                    100% secure checkout
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-2">
              Shop by Category
            </h2>
            <p className="text-purple-600">Discover our curated collections</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map((category) => (
              <Link
                key={category.name}
                href={`/products?category=${category.name}`}
                className="group block overflow-hidden rounded-xl border border-purple-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-32 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white font-semibold text-sm">
                      {category.name}
                    </h3>
                    <p className="text-white/80 text-xs">
                      {category.count} products
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-2">
              You Might Also Like
            </h2>
            <p className="text-purple-600">Discover more amazing products</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RELATED_PRODUCTS.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group block overflow-hidden rounded-xl border border-purple-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <button className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                      <Heart className="h-4 w-4 text-purple-600" />
                    </button>
                  </div>
                  {product.originalPrice > product.price && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                        {Math.round(
                          ((product.originalPrice - product.price) /
                            product.originalPrice) *
                            100
                        )}
                        % OFF
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-purple-900 group-hover:text-purple-700 transition-colors">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-purple-600">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold text-purple-900">
                      ৳{product.price}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ৳{product.originalPrice}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
