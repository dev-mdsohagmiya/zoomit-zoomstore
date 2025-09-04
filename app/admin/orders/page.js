"use client";
import { useState } from "react";
import AdminLayout from "../../../components/ui/AdminLayout";
import OrderStatusModal from "../../../components/ui/OrderStatusModal";
import OrderDetailsModal from "../../../components/ui/OrderDetailsModal";

export default function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Mock data - in real app, this would come from API
  const orders = [
    {
      id: "6979",
      date: "Apr 15, 2023, 10:21",
      customer: {
        name: "Cristine Easom",
        email: "ceasomw@theguardian.com",
        avatar: "CE",
      },
      payment: "pending",
      status: "delivered",
      method: "**** 2356",
      total: 125.5,
    },
    {
      id: "6624",
      date: "Apr 17, 2023, 6:43",
      customer: {
        name: "Fayre Screech",
        email: "fscreechs@army.mil",
        avatar: "FS",
      },
      payment: "failed",
      status: "delivered",
      method: "**** 2077",
      total: 89.99,
    },
    {
      id: "9305",
      date: "Apr 17, 2023, 8:05",
      customer: {
        name: "Pauline Pfaffe",
        email: "ppfaffe1i@wikia.com",
        avatar: "PP",
      },
      payment: "cancelled",
      status: "out-for-delivery",
      method: "****@gmail.com",
      total: 234.75,
    },
    {
      id: "8005",
      date: "Apr 22, 2023, 3:01",
      customer: {
        name: "Maurits Nealey",
        email: "mnealeyf@japanpost.jp",
        avatar: "MN",
      },
      payment: "paid",
      status: "dispatched",
      method: "**** 1555",
      total: 456.0,
    },
    {
      id: "5859",
      date: "Apr 29, 2023, 9:52",
      customer: {
        name: "Eydie Vogelein",
        email: "evogelein2g@forbes.com",
        avatar: "EV",
      },
      payment: "cancelled",
      status: "out-for-delivery",
      method: "****@gmail.com",
      total: 78.25,
    },
    {
      id: "8114",
      date: "Apr 8, 2023, 3:39",
      customer: {
        name: "Ulysses Goodlife",
        email: "ugoodlife2p@blogger.com",
        avatar: "UG",
      },
      payment: "failed",
      status: "out-for-delivery",
      method: "**** 4509",
      total: 199.99,
    },
    {
      id: "6890",
      date: "Aug 1, 2022, 7:24",
      customer: {
        name: "Etienne Duke",
        email: "eduke1z@dell.com",
        avatar: "ED",
      },
      payment: "cancelled",
      status: "ready-to-pickup",
      method: "**** 3507",
      total: 345.5,
    },
    {
      id: "5911",
      date: "Aug 14, 2022, 3:26",
      customer: {
        name: "Hilliard Merck",
        email: "hmerck2n@printfriendly.com",
        avatar: "HM",
      },
      payment: "cancelled",
      status: "delivered",
      method: "****@gmail.com",
      total: 67.8,
    },
    {
      id: "5531",
      date: "Aug 20, 2022, 3:21",
      customer: {
        name: "Cletus Arias",
        email: "carias21@rambler.ru",
        avatar: "CA",
      },
      payment: "failed",
      status: "dispatched",
      method: "**** 5851",
      total: 123.45,
    },
    {
      id: "8044",
      date: "Aug 22, 2022, 6:36",
      customer: {
        name: "Nowell Cornford",
        email: "ncornfordn@sogou.com",
        avatar: "NC",
      },
      payment: "cancelled",
      status: "out-for-delivery",
      method: "****@gmail.com",
      total: 89.99,
    },
  ];

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
    if (method.includes("@gmail.com")) {
      return (
        <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
          <span className="text-xs text-blue-600">P</span>
        </div>
      );
    }
    return (
      <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center">
        <span className="text-xs text-red-600">💳</span>
      </div>
    );
  };

  const handleStatusUpdate = (updatedOrder) => {
    // In a real app, this would make an API call
    console.log("Updating order status:", updatedOrder);
    // For demo purposes, we'll just close the modal
  };

  const handleStatusClick = (order) => {
    setSelectedOrder(order);
    setShowStatusModal(true);
  };

  const handleDetailsClick = (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600">Track and manage customer orders</p>
        </div>

        {/* Order Status Tracking Guide */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-blue-900">
                How to Check/Update Order Status:
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <strong>Click the checkmark icon (✓)</strong> in the Actions
                    column to update order status
                  </li>
                  <li>
                    <strong>Click the eye icon (👁)</strong> to view complete
                    order details
                  </li>
                  <li>
                    <strong>Click anywhere on the row</strong> to open order
                    details modal
                  </li>
                  <li>
                    Order statuses: Pending → Processing → Shipped → Out for
                    Delivery → Delivered
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Status Overview */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Order Status Overview
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[
              {
                status: "pending",
                label: "Pending",
                color: "bg-yellow-100 text-yellow-700",
                count: 3,
              },
              {
                status: "processing",
                label: "Processing",
                color: "bg-blue-100 text-blue-700",
                count: 2,
              },
              {
                status: "shipped",
                label: "Shipped",
                color: "bg-orange-100 text-orange-700",
                count: 1,
              },
              {
                status: "out-for-delivery",
                label: "Out for Delivery",
                color: "bg-purple-100 text-purple-700",
                count: 1,
              },
              {
                status: "delivered",
                label: "Delivered",
                color: "bg-green-100 text-green-700",
                count: 8,
              },
              {
                status: "cancelled",
                label: "Cancelled",
                color: "bg-red-100 text-red-700",
                count: 1,
              },
            ].map((item) => (
              <div key={item.status} className="text-center">
                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${item.color}`}
                >
                  {item.label}
                </div>
                <div className="text-2xl font-bold text-gray-900 mt-2">
                  {item.count}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Payment
                </p>
                <p className="text-2xl font-bold text-gray-900">56</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">12,689</p>
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Refunded</p>
                <p className="text-2xl font-bold text-gray-900">124</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600"
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
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Failed</p>
                <p className="text-2xl font-bold text-gray-900">32</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
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
                  Search Order
                </label>
                <input
                  type="text"
                  placeholder="Search orders..."
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
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
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
                  <th className="px-4 py-3 font-medium">ORDER</th>
                  <th className="px-4 py-3 font-medium">DATE</th>
                  <th className="px-4 py-3 font-medium">CUSTOMERS</th>
                  <th className="px-4 py-3 font-medium">PAYMENT</th>
                  <th className="px-4 py-3 font-medium">STATUS</th>
                  <th className="px-4 py-3 font-medium">METHOD</th>
                  <th className="px-4 py-3 font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleDetailsClick(order)}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">
                        #{order.id}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {order.date}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-purple-600">
                            {order.customer.avatar}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {order.customer.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {order.customer.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {getPaymentStatus(order.payment)}
                    </td>
                    <td className="px-4 py-3">
                      {getOrderStatus(order.status)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        {getPaymentMethodIcon(order.method)}
                        <span className="text-sm text-gray-900">
                          {order.method}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusClick(order);
                          }}
                          className="p-1 text-gray-400 hover:text-purple-600"
                          title="Update Status"
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
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDetailsClick(order);
                          }}
                          className="p-1 text-gray-400 hover:text-blue-600"
                          title="View Details"
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
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                      </div>
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
            Showing 1 to 10 of 100 entries
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
              10
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              »
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              »»
            </button>
          </div>
        </div>

        {/* Modals */}
        <OrderStatusModal
          isOpen={showStatusModal}
          onClose={() => setShowStatusModal(false)}
          onUpdate={handleStatusUpdate}
          order={selectedOrder}
        />

        <OrderDetailsModal
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          order={selectedOrder}
        />
      </div>
    </AdminLayout>
  );
}
