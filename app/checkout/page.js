import Link from "next/link";

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-semibold text-slate-900">Checkout</h1>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h2 className="font-semibold text-slate-900">Order Summary</h2>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Classic Cotton Tee × 1</span>
                <span>$24.00</span>
              </div>
              <div className="flex justify-between">
                <span>Wireless Headphones × 1</span>
                <span>$89.00</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$7.00</span>
              </div>
            </div>
            <div className="mt-3 flex justify-between text-base font-semibold text-slate-900">
              <span>Total</span>
              <span>$120.00</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h3 className="font-semibold text-slate-900">Next Step</h3>
            <p className="mt-2 text-sm text-slate-600">
              Continue to provide your shipping details.
            </p>
            <Link href="/shipping">
              <button className="mt-3 h-10 w-full rounded-md bg-slate-900 text-white hover:bg-slate-800">
                Continue to Shipping
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
