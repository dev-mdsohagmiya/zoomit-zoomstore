"use client";
import { useState } from "react";
import AdminLayout from "../../../components/ui/AdminLayout";
import ReviewModerationModal from "../../../components/ui/ReviewModerationModal";

export default function AdminReviewsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModerationModal, setShowModerationModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  // Mock data - in real app, this would come from API
  const reviews = [
    {
      id: 1,
      product: {
        name: "Air Jordan",
        description:
          "Air Jordan is a line of basketball shoes produced by Nike",
        image: "👟",
      },
      reviewer: {
        name: "Gisela Leppard",
        email: "gleppard8@yandex.ru",
        avatar: "GL",
      },
      rating: 3.5,
      comment: "Ut mauris Fusce consequat. Nulla nisl. Nunc nisl.",
      date: "Apr 20, 2020",
      status: "published",
    },
    {
      id: 2,
      product: {
        name: "Amazon Fire TV",
        description: "4K UHD smart TV, stream live TV without cable",
        image: "📺",
      },
      reviewer: {
        name: "Tracey Ventham",
        email: "tventhamc@thetimes.co.uk",
        avatar: "TV",
      },
      rating: 4,
      comment:
        "At nunc commodo placerat praesent Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
      date: "Mar 17, 2021",
      status: "published",
    },
    {
      id: 3,
      product: {
        name: "Apple iPad",
        description: "10.2-inch Retina Display, 64GB",
        image: "📱",
      },
      reviewer: {
        name: "Jabez Heggs",
        email: "jheggse@nba.com",
        avatar: "JH",
      },
      rating: 3,
      comment:
        "Ac consequat Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
      date: "Apr 21, 2020",
      status: "published",
    },
    {
      id: 4,
      product: {
        name: "Apple Watch Series 7",
        description: "Starlight Aluminum Case with Starlight Sport Band",
        image: "⌚",
      },
      reviewer: {
        name: "Ethel Zanardii",
        email: "ezanardii4@mapy.cz",
        avatar: "EZ",
      },
      rating: 2,
      comment:
        "Etiam faucibus cursus Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
      date: "Jun 12, 2020",
      status: "pending",
    },
    {
      id: 5,
      product: {
        name: "BANGE Anti Theft Backpack",
        description: "Smart Business Laptop Fits 15.6 Inch Notebook",
        image: "🎒",
      },
      reviewer: {
        name: "Micaela Rowesby",
        email: "mrowesbyf@surveymonkey.com",
        avatar: "MR",
      },
      rating: 4,
      comment:
        "Mattis egestas metus Morbi porttitor lorem id ligula. Suspendisse ornare consequat.",
      date: "Dec 11, 2021",
      status: "published",
    },
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      published: {
        bg: "bg-green-100",
        text: "text-green-700",
        label: "Published",
      },
      pending: {
        bg: "bg-orange-100",
        text: "text-orange-700",
        label: "Pending",
      },
      rejected: { bg: "bg-red-100", text: "text-red-700", label: "Rejected" },
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span
        className={`rounded-full px-2 py-0.5 text-xs font-medium ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={i}
          className="w-4 h-4 text-yellow-400 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg
          key="half"
          className="w-4 h-4 text-yellow-400 fill-current"
          viewBox="0 0 20 20"
        >
          <defs>
            <linearGradient id="half-fill">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            fill="url(#half-fill)"
            d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
          />
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg
          key={`empty-${i}`}
          className="w-4 h-4 text-gray-300 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      );
    }

    return stars;
  };

  const handleModerateReview = (updatedReview) => {
    // In a real app, this would make an API call
    console.log("Moderating review:", updatedReview);
    // For demo purposes, we'll just close the modal
  };

  const handleModerationClick = (review) => {
    setSelectedReview(review);
    setShowModerationModal(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
          <p className="text-gray-600">Manage and moderate product reviews</p>
        </div>

        {/* Review Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Average Rating
                </p>
                <div className="flex items-center space-x-2">
                  <div className="text-2xl font-bold text-gray-900">4.89</div>
                  <div className="flex">{renderStars(4.89)}</div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Total 187 reviews</p>
                <p className="text-xs text-gray-500">
                  All reviews are from genuine customers.
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-yellow-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <button className="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-purple-700 transition-colors">
                +5 This week
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Star Rating Breakdown
                </p>
                <div className="space-y-2 mt-3">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 w-8">
                        {stars} Star
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{
                            width: `${
                              ((stars === 5
                                ? 124
                                : stars === 4
                                ? 40
                                : stars === 3
                                ? 12
                                : stars === 2
                                ? 7
                                : 2) /
                                185) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-8">
                        {stars === 5
                          ? 124
                          : stars === 4
                          ? 40
                          : stars === 3
                          ? 12
                          : stars === 2
                          ? 7
                          : 2}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Review Statistics
                </p>
                <div className="mt-3 space-y-2">
                  <div>
                    <div className="text-lg font-bold text-gray-900">
                      12 New reviews
                    </div>
                    <div className="text-sm text-green-600">+8.4%</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">
                      87% Positive reviews
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Weekly Report</div>
                  </div>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search Review
                </label>
                <input
                  type="text"
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <select className="text-sm border border-gray-300 rounded-lg px-3 py-2">
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
              <select className="text-sm border border-gray-300 rounded-lg px-3 py-2">
                <option>All</option>
                <option>Published</option>
                <option>Pending</option>
                <option>Rejected</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                  />
                </svg>
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-4 py-3">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="px-4 py-3 font-medium">PRODUCT</th>
                  <th className="px-4 py-3 font-medium">REVIEWER</th>
                  <th className="px-4 py-3 font-medium">REVIEW</th>
                  <th className="px-4 py-3 font-medium">DATE</th>
                  <th className="px-4 py-3 font-medium">STATUS</th>
                  <th className="px-4 py-3 font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reviews.map((review) => (
                  <tr key={review.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-lg">
                            {review.product.image}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {review.product.name}
                          </div>
                          <div className="text-xs text-gray-500 max-w-xs truncate">
                            {review.product.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-purple-600">
                            {review.reviewer.avatar}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {review.reviewer.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {review.reviewer.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1">
                          {renderStars(review.rating)}
                        </div>
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {review.comment}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {review.date}
                    </td>
                    <td className="px-4 py-3">
                      {getStatusBadge(review.status)}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleModerationClick(review)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing 1 to 5 of 187 entries
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              ««
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              «
            </button>
            <button className="px-3 py-1 text-sm bg-purple-600 text-white rounded-lg">
              1
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              4
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              5
            </button>
            <span className="px-2 text-sm text-gray-500">...</span>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              19
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              »
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              »»
            </button>
          </div>
        </div>

        {/* Modal */}
        <ReviewModerationModal
          isOpen={showModerationModal}
          onClose={() => setShowModerationModal(false)}
          onModerate={handleModerateReview}
          review={selectedReview}
        />
      </div>
    </AdminLayout>
  );
}
