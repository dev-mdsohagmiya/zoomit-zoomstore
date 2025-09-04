"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./dialog";
import { Button } from "./button";

export default function OrderStatusModal({ isOpen, onClose, onUpdate, order }) {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (order) {
      setSelectedStatus(order.status || "");
      setSelectedPaymentStatus(order.payment || "");
    }
  }, [order]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedOrder = {
        ...order,
        status: selectedStatus,
        payment: selectedPaymentStatus,
      };

      onUpdate(updatedOrder);
      handleClose();
    } catch (error) {
      console.error("Error updating order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const orderStatuses = [
    {
      value: "pending",
      label: "Pending",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      value: "processing",
      label: "Processing",
      color: "bg-blue-100 text-blue-700",
    },
    {
      value: "shipped",
      label: "Shipped",
      color: "bg-orange-100 text-orange-700",
    },
    {
      value: "out-for-delivery",
      label: "Out for Delivery",
      color: "bg-purple-100 text-purple-700",
    },
    {
      value: "delivered",
      label: "Delivered",
      color: "bg-green-100 text-green-700",
    },
    {
      value: "cancelled",
      label: "Cancelled",
      color: "bg-red-100 text-red-700",
    },
  ];

  const paymentStatuses = [
    {
      value: "pending",
      label: "Pending",
      color: "bg-orange-100 text-orange-700",
    },
    { value: "paid", label: "Paid", color: "bg-green-100 text-green-700" },
    { value: "failed", label: "Failed", color: "bg-red-100 text-red-700" },
    {
      value: "cancelled",
      label: "Cancelled",
      color: "bg-gray-100 text-gray-700",
    },
  ];

  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Update Order Status</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">
              Order #{order.id}
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <strong>Customer:</strong> {order.customer?.name}
              </p>
              <p>
                <strong>Email:</strong> {order.customer?.email}
              </p>
              <p>
                <strong>Total:</strong> ${order.total}
              </p>
              <p>
                <strong>Date:</strong> {order.date}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Order Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                <option value="">Select status</option>
                {orderStatuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Payment Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Status
              </label>
              <select
                value={selectedPaymentStatus}
                onChange={(e) => setSelectedPaymentStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                <option value="">Select payment status</option>
                {paymentStatuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Preview */}
            {selectedStatus && selectedPaymentStatus && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">
                  Status Preview:
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600 w-20">Order:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        orderStatuses.find((s) => s.value === selectedStatus)
                          ?.color || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {
                        orderStatuses.find((s) => s.value === selectedStatus)
                          ?.label
                      }
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600 w-20">Payment:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        paymentStatuses.find(
                          (s) => s.value === selectedPaymentStatus
                        )?.color || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {
                        paymentStatuses.find(
                          (s) => s.value === selectedPaymentStatus
                        )?.label
                      }
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Order Status Timeline */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-3">
                Order Status Flow:
              </h4>
              <div className="flex items-center space-x-2 text-xs">
                {orderStatuses.map((status, index) => (
                  <div key={status.value} className="flex items-center">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                        orderStatuses.findIndex(
                          (s) => s.value === selectedStatus
                        ) >= index
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span
                      className={`ml-1 text-xs ${
                        orderStatuses.findIndex(
                          (s) => s.value === selectedStatus
                        ) >= index
                          ? "text-blue-700 font-medium"
                          : "text-gray-500"
                      }`}
                    >
                      {status.label}
                    </span>
                    {index < orderStatuses.length - 1 && (
                      <div
                        className={`w-4 h-0.5 mx-2 ${
                          orderStatuses.findIndex(
                            (s) => s.value === selectedStatus
                          ) > index
                            ? "bg-blue-600"
                            : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

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
                disabled={
                  isLoading || !selectedStatus || !selectedPaymentStatus
                }
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isLoading ? "Updating..." : "Update Status"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
