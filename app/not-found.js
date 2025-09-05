import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="h-8 w-8 text-gray-600" />
        </div>

        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Page Not Found
        </h2>

        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="space-y-3">
          <Link href="/">
            <Button className="w-full bg-purple-900 hover:bg-purple-800 text-white">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Button>
          </Link>

          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
