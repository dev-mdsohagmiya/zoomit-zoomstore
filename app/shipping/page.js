export default function ShippingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold text-slate-900">
        Shipping Details
      </h1>
      <form className="mt-6 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="text-sm text-slate-700">
              First Name
            </label>
            <input
              id="firstName"
              className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3"
              placeholder="John"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="text-sm text-slate-700">
              Last Name
            </label>
            <input
              id="lastName"
              className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3"
              placeholder="Doe"
            />
          </div>
        </div>
        <div>
          <label htmlFor="address" className="text-sm text-slate-700">
            Address
          </label>
          <input
            id="address"
            className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3"
            placeholder="123 Main St"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="city" className="text-sm text-slate-700">
              City
            </label>
            <input
              id="city"
              className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3"
              placeholder="City"
            />
          </div>
          <div>
            <label htmlFor="state" className="text-sm text-slate-700">
              State
            </label>
            <input
              id="state"
              className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3"
              placeholder="State"
            />
          </div>
          <div>
            <label htmlFor="zip" className="text-sm text-slate-700">
              ZIP
            </label>
            <input
              id="zip"
              className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3"
              placeholder="12345"
            />
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            className="h-10 flex-1 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            Back to Cart
          </button>
          <button
            type="button"
            className="h-10 flex-1 rounded-md bg-slate-900 text-white hover:bg-slate-800"
          >
            Proceed to Payment
          </button>
        </div>
      </form>
    </div>
  );
}
