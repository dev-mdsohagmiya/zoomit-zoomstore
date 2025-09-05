export function Skeleton({ className, ...props }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 ${className}`}
      {...props}
    />
  );
}

// Product Card Skeleton
export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-4">
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-1/2 mb-3" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
    </div>
  );
}

// Product List Skeleton
export function ProductListSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

// Table Skeleton
export function TableSkeleton({ rows = 5, columns = 4 }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <Skeleton className="h-6 w-48 mb-6" />
        <div className="space-y-4">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex space-x-4">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Skeleton key={colIndex} className="h-4 flex-1" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Form Skeleton
export function FormSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <Skeleton className="h-6 w-32 mb-6" />
      <div className="space-y-4">
        <div>
          <Skeleton className="h-4 w-20 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div>
          <Skeleton className="h-4 w-20 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div>
          <Skeleton className="h-4 w-20 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}

// Cart Item Skeleton
export function CartItemSkeleton() {
  return (
    <div className="flex items-center gap-3 p-4 border-b border-gray-200">
      <Skeleton className="h-12 w-12 rounded-lg" />
      <div className="flex-1">
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="h-4 w-16" />
    </div>
  );
}

// Checkout Form Skeleton
export function CheckoutFormSkeleton() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <Skeleton className="h-6 w-48 mb-6" />
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <Skeleton className="h-6 w-32 mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
