import { CheckoutFormSkeleton } from "@/components/ui/LoadingStates";

export default function CheckoutLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="h-8 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-80 animate-pulse"></div>
        </div>

        <CheckoutFormSkeleton />
      </div>
    </div>
  );
}
