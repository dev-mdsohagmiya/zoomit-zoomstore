"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./dialog";
import { Button } from "./button";

export default function ReviewModerationModal({
  isOpen,
  onClose,
  onModerate,
  review,
}) {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedReview = {
        ...review,
        status: selectedStatus,
      };

      onModerate(updatedReview);
      handleClose();
    } catch (error) {
      console.error("Error moderating review:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedStatus("");
    onClose();
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

  const statusOptions = [
    {
      value: "published",
      label: "Approve & Publish",
      color: "bg-green-100 text-green-700",
    },
    {
      value: "rejected",
      label: "Reject Review",
      color: "bg-red-100 text-red-700",
    },
    {
      value: "pending",
      label: "Keep Pending",
      color: "bg-orange-100 text-orange-700",
    },
  ];

  if (!review) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Moderate Review</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Review Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  Review Information
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>Review ID:</strong> #{review.id}
                  </p>
                  <p>
                    <strong>Date:</strong> {review.date}
                  </p>
                  <p>
                    <strong>Current Status:</strong>{" "}
                    {getStatusBadge(review.status)}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Rating</h3>
                <div className="flex items-center space-x-1">
                  {renderStars(review.rating)}
                  <span className="ml-2 text-sm text-gray-600">
                    ({review.rating}/5)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">Product</h3>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-lg">{review.product?.image}</span>
              </div>
              <div>
                <div className="font-medium text-gray-900">
                  {review.product?.name}
                </div>
                <div className="text-sm text-gray-500 max-w-xs truncate">
                  {review.product?.description}
                </div>
              </div>
            </div>
          </div>

          {/* Reviewer Information */}
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">Reviewer</h3>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-purple-600">
                  {review.reviewer?.avatar}
                </span>
              </div>
              <div>
                <div className="font-medium text-gray-900">
                  {review.reviewer?.name}
                </div>
                <div className="text-sm text-gray-500">
                  {review.reviewer?.email}
                </div>
              </div>
            </div>
          </div>

          {/* Review Content */}
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">Review Content</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-1">
                {renderStars(review.rating)}
                <span className="ml-2 text-sm text-gray-600">
                  ({review.rating}/5 stars)
                </span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-900">{review.comment}</p>
              </div>
            </div>
          </div>

          {/* Moderation Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Moderation Action
              </label>
              <div className="space-y-2">
                {statusOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="radio"
                      name="status"
                      value={option.value}
                      checked={selectedStatus === option.value}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${option.color}`}
                    >
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Preview */}
            {selectedStatus && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">
                  Action Preview:
                </h4>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    Review will be marked as:
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      statusOptions.find((s) => s.value === selectedStatus)
                        ?.color || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {
                      statusOptions.find((s) => s.value === selectedStatus)
                        ?.label
                    }
                  </span>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !selectedStatus}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isLoading ? "Processing..." : "Moderate Review"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

