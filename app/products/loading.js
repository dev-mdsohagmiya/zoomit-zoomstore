import { ProductListSkeleton } from "@/components/ui/LoadingStates";

export default function ProductsLoading() {
  return (
    <div
      className="w-full min-h-screen"
      style={{ backgroundColor: "rgb(244, 234, 244)" }}
    >
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
              <div className="h-5 bg-gray-200 rounded w-80 animate-pulse"></div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white rounded-xl border border-purple-200 px-4 py-2 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Results Counter Skeleton */}
          <div className="md:hidden mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>
              <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Mobile Filter Toggle Skeleton */}
        <div className="lg:hidden mb-3">
          <div className="w-full bg-white rounded-lg border border-purple-200 p-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div className="bg-gray-200 text-gray-200 px-2 py-0.5 rounded-full h-5 w-16 animate-pulse"></div>
              </div>
              <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Main Content Layout Skeleton */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Left Sidebar - Filters & Sort Skeleton */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border border-purple-200 p-3 sm:p-4 shadow-lg lg:sticky lg:top-24">
              <div className="flex items-center justify-between mb-4">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
              </div>

              <div className="space-y-4">
                {/* Category Filter Skeleton */}
                <div>
                  <div className="h-3 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
                  <div className="space-y-1">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="flex items-center">
                        <div className="w-3 h-3 bg-gray-200 rounded-full mr-2 animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter Skeleton */}
                <div>
                  <div className="h-3 bg-gray-200 rounded w-20 mb-2 animate-pulse"></div>
                  <div className="space-y-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-center">
                        <div className="w-3 h-3 bg-gray-200 rounded-full mr-2 animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sort By Skeleton */}
                <div>
                  <div className="h-3 bg-gray-200 rounded w-12 mb-2 animate-pulse"></div>
                  <div className="space-y-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex items-center">
                        <div className="w-3 h-3 bg-gray-200 rounded-full mr-2 animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded w-28 animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="flex-1 min-w-0">
            {/* Search Bar Skeleton */}
            <div className="bg-white rounded-xl border border-purple-200 p-3 sm:p-4 shadow-lg mb-4">
              <div className="h-9 sm:h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Products Grid Skeleton */}
            <ProductListSkeleton count={12} />
          </div>
        </div>
      </div>
    </div>
  );
}
