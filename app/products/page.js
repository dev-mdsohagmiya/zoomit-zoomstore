import ProductCard from "../../components/ui/ProductCard";

const PRODUCTS = [
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
  {
    id: "5",
    title: "Smartwatch S3",
    subtitle: "Wearables",
    price: 199,
    originalPrice: 299,
    rating: 4,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop",
  },
  {
    id: "6",
    title: "Minimal Table Lamp",
    subtitle: "Home",
    price: 39,
    originalPrice: 55,
    rating: 4,
    reviews: 92,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
  },
  {
    id: "7",
    title: "Eco Water Bottle",
    subtitle: "Accessories",
    price: 18,
    originalPrice: 25,
    rating: 5,
    reviews: 234,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=400&fit=crop",
  },
  {
    id: "8",
    title: "Yoga Mat Pro",
    subtitle: "Fitness",
    price: 45,
    originalPrice: 65,
    rating: 4,
    reviews: 178,
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
  },
];

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">All Products</h1>
          <p className="text-lg text-slate-600 mt-2">
            Browse our curated selection from ZoomStore
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {PRODUCTS.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
