import { ProductDetailsSkeleton } from "@/components/ui/LoadingStates";

export default function ProductDetailsLoading() {
  return (
    <div
      style={{ backgroundColor: "rgb(244, 234, 244)" }}
      className="min-h-screen"
    >
      {/* Breadcrumb Skeleton */}
      <div className="bg-white border-b border-purple-200">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        {/* Product Details Skeleton */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
          {/* Product Images Skeleton */}
          <div className="space-y-3 sm:space-y-4 lg:sticky lg:top-24 lg:h-fit">
            <div className="relative overflow-hidden rounded-2xl border border-purple-200 bg-white shadow-lg">
              <div className="h-80 w-full bg-gray-200 animate-pulse sm:h-96"></div>
            </div>

            {/* Thumbnail Images Skeleton */}
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-16 w-full rounded-lg bg-gray-200 animate-pulse sm:h-20"
                ></div>
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-4 sm:space-y-6">
            {/* Product Title */}
            <div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse sm:h-8"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse sm:h-4"></div>
            </div>

            {/* Price and Discount */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="h-6 bg-gray-200 rounded w-20 animate-pulse sm:h-8 sm:w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-12 animate-pulse sm:h-6 sm:w-16"></div>
              <div className="h-4 bg-red-100 rounded w-10 animate-pulse sm:h-5 sm:w-12"></div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-3 w-3 bg-gray-200 rounded animate-pulse sm:h-4 sm:w-4"
                  ></div>
                ))}
              </div>
              <div className="h-3 bg-gray-200 rounded w-12 animate-pulse sm:h-4 sm:w-16"></div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-full animate-pulse sm:h-4"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6 animate-pulse sm:h-4"></div>
              <div className="h-3 bg-gray-200 rounded w-4/6 animate-pulse sm:h-4"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse sm:h-4"></div>
            </div>

            {/* Sizes */}
            <div>
              <div className="h-4 bg-gray-200 rounded w-12 mb-2 animate-pulse sm:h-5 sm:w-16"></div>
              <div className="flex gap-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-8 w-12 bg-gray-200 rounded-lg animate-pulse sm:h-10 sm:w-16"
                  ></div>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <div className="h-4 bg-gray-200 rounded w-16 mb-2 animate-pulse sm:h-5 sm:w-20"></div>
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-8 w-8 bg-gray-200 rounded-full animate-pulse sm:h-10 sm:w-10"
                  ></div>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse sm:h-12 sm:w-24"></div>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse sm:h-12 sm:w-32"></div>
            </div>

            {/* Features */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-16 mb-2 animate-pulse sm:h-5 sm:w-20"></div>
              <div className="space-y-1">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="h-3 w-3 bg-gray-200 rounded animate-pulse sm:h-4 sm:w-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse sm:h-4"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section Skeleton */}
        <div className="mt-12 sm:mt-16">
          <div className="h-6 bg-gray-200 rounded w-40 mb-6 animate-pulse sm:h-8 sm:w-48 sm:mb-8"></div>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="h-40 w-full bg-gray-200 animate-pulse sm:h-48"></div>
                <div className="p-3 sm:p-4">
                  <div className="h-3 bg-gray-200 rounded w-3/4 mb-2 animate-pulse sm:h-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-3 animate-pulse"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-3 bg-gray-200 rounded w-12 animate-pulse sm:h-4 sm:w-16"></div>
                    <div className="h-6 bg-gray-200 rounded w-16 animate-pulse sm:h-8 sm:w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
