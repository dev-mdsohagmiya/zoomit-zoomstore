import CartModal from "../../../components/ui/CartModal";
import Link from "next/link";

const PRODUCT = {
  id: "1",
  title: "Classic Cotton Tee",
  price: 24,
  description:
    "A soft, breathable tee made from 100% organic cotton. Perfect for everyday wear.",
  specs: ["100% organic cotton", "Regular fit", "Machine washable"],
  image: "https://picsum.photos/seed/zoomstore-1/1000/800",
};

export default function ProductDetailPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="overflow-hidden rounded-lg border border-slate-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={PRODUCT.title}
            src={PRODUCT.image}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            {PRODUCT.title}
          </h1>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            ${PRODUCT.price}.00
          </p>
          <p className="mt-4 text-slate-600">{PRODUCT.description}</p>

          <ul className="mt-4 list-inside list-disc space-y-1 text-slate-600">
            {PRODUCT.specs.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <button className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50">
                -
              </button>
              <input
                className="h-9 w-12 rounded-md border border-slate-300 text-center"
                defaultValue={1}
                readOnly
              />
              <button className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50">
                +
              </button>
            </div>
            <button className="h-10 flex-1 rounded-md bg-slate-900 text-white hover:bg-slate-800">
              Add to Cart
            </button>
            <CartModal
              trigger={
                <button className="h-10 rounded-md border border-slate-300 px-4 text-slate-700 hover:bg-slate-50">
                  View Cart
                </button>
              }
            />
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-slate-900">
              Related products
            </h2>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[2, 3, 4].map((n) => (
                <Link
                  key={n}
                  href={`/products/${n}`}
                  className="block overflow-hidden rounded-md border border-slate-200"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt="Related"
                    src={`https://picsum.photos/seed/zoomstore-${n}/400/300`}
                    className="h-32 w-full object-cover"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
