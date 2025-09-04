"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Button } from "./button";

export default function OrderDetailsModal({ isOpen, onClose, order }) {
  if (!order) return null;

  const getPaymentStatus = (status) => {
    const statusConfig = {
      paid: {
        bg: "bg-green-100",
        text: "text-green-700",
        dot: "bg-green-500",
        label: "Paid",
      },
      pending: {
        bg: "bg-orange-100",
        text: "text-orange-700",
        dot: "bg-orange-500",
        label: "Pending",
      },
      failed: {
        bg: "bg-red-100",
        text: "text-red-700",
        dot: "bg-red-500",
        label: "Failed",
      },
      cancelled: {
        bg: "bg-gray-100",
        text: "text-gray-700",
        dot: "bg-gray-500",
        label: "Cancelled",
      },
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${config.dot}`}></div>
        <span className={`text-xs font-medium ${config.text}`}>
          {config.label}
        </span>
      </div>
    );
  };

  const getOrderStatus = (status) => {
    const statusConfig = {
      delivered: {
        bg: "bg-green-100",
        text: "text-green-700",
        label: "Delivered",
      },
      "out-for-delivery": {
        bg: "bg-purple-100",
        text: "text-purple-700",
        label: "Out for Delivery",
      },
      dispatched: {
        bg: "bg-orange-100",
        text: "text-orange-700",
        label: "Dispatched",
      },
      "ready-to-pickup": {
        bg: "bg-blue-100",
        text: "text-blue-700",
        label: "Ready to Pickup",
      },
      processing: {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        label: "Processing",
      },
    };

    const config = statusConfig[status] || statusConfig.processing;
    return (
      <span
        className={`rounded-full px-2 py-0.5 text-xs font-medium ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  const getPaymentMethodIcon = (method) => {
    if (method.includes("@")) {
      return (
        <svg
          className="w-4 h-4 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      );
    } else {
      return (
        <svg
          className="w-4 h-4 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order Details - #{order.id}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  Order Information
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>Order ID:</strong> #{order.id}
                  </p>
                  <p>
                    <strong>Date:</strong> {order.date}
                  </p>
                  <p>
                    <strong>Total:</strong> ${order.total}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Status</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-600">Order: </span>
                    {getOrderStatus(order.status)}
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Payment: </span>
                    {getPaymentStatus(order.payment)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">
              Customer Information
            </h3>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-purple-600">
                  {order.customer?.avatar}
                </span>
              </div>
              <div>
                <div className="font-medium text-gray-900">
                  {order.customer?.name}
                </div>
                <div className="text-sm text-gray-500">
                  {order.customer?.email}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">
              Payment Information
            </h3>
            <div className="flex items-center space-x-2">
              {getPaymentMethodIcon(order.method)}
              <span className="text-sm text-gray-900">{order.method}</span>
            </div>
          </div>

          {/* Order Items (Mock data - in real app, this would come from API) */}
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">Order Items</h3>
            <div className="space-y-3">
              {/* Mock order items */}
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-lg">📱</span>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    Apple iPhone 13
                  </div>
                  <div className="text-sm text-gray-500">Quantity: 1</div>
                </div>
                <div className="text-sm font-medium text-gray-900">$999.00</div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-lg">🎧</span>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">AirPods Pro</div>
                  <div className="text-sm text-gray-500">Quantity: 1</div>
                </div>
                <div className="text-sm font-medium text-gray-900">$249.00</div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">Total:</span>
                <span className="font-bold text-lg text-gray-900">
                  ${order.total}
                </span>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">
              Shipping Information
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <strong>Address:</strong> 123 Main Street, City, State 12345
              </p>
              <p>
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
              <p>
                <strong>Shipping Method:</strong> Standard Shipping
              </p>
              <p>
                <strong>Estimated Delivery:</strong> 3-5 business days
              </p>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">Order Timeline</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">Order Placed</div>
                  <div className="text-gray-500">{order.date}</div>
                </div>
              </div>

              {order.status === "delivered" && (
                <>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        Order Confirmed
                      </div>
                      <div className="text-gray-500">Apr 15, 2023, 10:30</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">Shipped</div>
                      <div className="text-gray-500">Apr 16, 2023, 14:20</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">Delivered</div>
                      <div className="text-gray-500">Apr 18, 2023, 16:45</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

