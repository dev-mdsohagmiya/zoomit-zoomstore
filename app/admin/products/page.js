"use client";
import { useState } from "react";
import AdminLayout from "../../../components/ui/AdminLayout";
import AddProductModal from "../../../components/ui/AddProductModal";
import EditProductModal from "../../../components/ui/EditProductModal";

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Mock categories data - in real app, this would come from API
  const categories = [
    { id: 1, name: "Electronics", slug: "electronics" },
    { id: 2, name: "Shoes", slug: "shoes" },
    { id: 3, name: "Accessories", slug: "accessories" },
    { id: 4, name: "Household", slug: "household" },
    { id: 5, name: "Clothing", slug: "clothing" },
    { id: 6, name: "Books", slug: "books" },
  ];

  // Mock data - in real app, this would come from API
  const products = [
    {
      id: 1,
      name: "Air Jordan",
      description: "Air Jordan is a line of basketball shoes produced by Nike",
      category: "Shoes",
      price: 125,
      stock: 942,
      status: "inactive",
      sku: "31063",
      image: "👟",
    },
    {
      id: 2,
      name: "Amazon Fire TV",
      description: "4K UHD smart TV, stream live TV without cable",
      category: "Electronics",
      price: 263.49,
      stock: 587,
      status: "scheduled",
      sku: "5829",
      image: "📺",
    },
    {
      id: 3,
      name: "Apple iPad",
      description: "10.2-inch Retina Display, 64GB",
      category: "Electronics",
      price: 248.39,
      stock: 468,
      status: "publish",
      sku: "35946",
      image: "📱",
    },
    {
      id: 4,
      name: "Apple Watch Series 7",
      description: "Starlight Aluminum Case with Starlight Sport Band",
      category: "Accessories",
      price: 799,
      stock: 851,
      status: "scheduled",
      sku: "46658",
      image: "⌚",
    },
    {
      id: 5,
      name: "BANGE Anti Theft Backpack",
      description: "Smart Business Laptop Fits 15.6 Inch Notebook",
      category: "Accessories",
      price: 79.99,
      stock: 519,
      status: "inactive",
      sku: "41867",
      image: "🎒",
    },
    {
      id: 6,
      name: "Canon EOS Rebel T7",
      description: "18-55mm Lens | Built-in Wi-Fi | 24.1 MP CMOS Sensor",
      category: "Electronics",
      price: 399,
      stock: 810,
      status: "scheduled",
      sku: "63474",
      image: "📷",
    },
    {
      id: 7,
      name: "Dohioue Wall Clock",
      description: "Modern 10 Inch Battery Operated Wall Clocks",
      category: "Household",
      price: 16.34,
      stock: 804,
      status: "publish",
      sku: "29540",
      image: "🕐",
    },
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      publish: { bg: "bg-green-100", text: "text-green-700", label: "Publish" },
      scheduled: {
        bg: "bg-orange-100",
        text: "text-orange-700",
        label: "Scheduled",
      },
      inactive: { bg: "bg-red-100", text: "text-red-700", label: "Inactive" },
    };

    const config = statusConfig[status] || statusConfig.inactive;
    return (
      <span
        className={`rounded-full px-2 py-0.5 text-xs font-medium ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  const getCategoryIcon = (category) => {
    const icons = {
      Shoes: "👟",
      Electronics: "📱",
      Accessories: "⌚",
      Household: "🏠",
    };
    return icons[category] || "📦";
  };

  const handleAddProduct = (newProduct) => {
    // In a real app, this would make an API call
    console.log("Adding product:", newProduct);
    // For demo purposes, we'll just close the modal
  };

  const handleEditProduct = (updatedProduct) => {
    // In a real app, this would make an API call
    console.log("Updating product:", updatedProduct);
    // For demo purposes, we'll just close the modal
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">
            Manage your product catalog and inventory
          </p>
        </div>

        {/* Sales Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  In-store Sales
                </p>
                <p className="text-2xl font-bold text-gray-900">$5,345.43</p>
                <p className="text-xs text-gray-500">5k orders</p>
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
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-sm text-green-600">+5.7%</span>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Website Sales
                </p>
                <p className="text-2xl font-bold text-gray-900">$674,347.12</p>
                <p className="text-xs text-gray-500">21k orders</p>
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
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-sm text-green-600">+12.4%</span>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Discount</p>
                <p className="text-2xl font-bold text-gray-900">$14,235.12</p>
                <p className="text-xs text-gray-500">6k orders</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Affiliate</p>
                <p className="text-2xl font-bold text-gray-900">$8,345.23</p>
                <p className="text-xs text-gray-500">150 orders</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-sm text-red-600">-3.5%</span>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Filter
                </label>
                <div className="flex gap-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="all">Status</option>
                    <option value="publish">Publish</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="inactive">Inactive</option>
                  </select>

                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="all">Category</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Household">Household</option>
                  </select>

                  <select
                    value={stockFilter}
                    onChange={(e) => setStockFilter(e.target.value)}
                    className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="all">Stock</option>
                    <option value="in-stock">In Stock</option>
                    <option value="low-stock">Low Stock</option>
                    <option value="out-of-stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search Product
                </label>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <select className="text-sm border border-gray-300 rounded-lg px-3 py-2">
                <option>7</option>
                <option>10</option>
                <option>25</option>
                <option>50</option>
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
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-purple-600 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
              >
                + Add Product
              </button>
            </div>
          </div>
        </div>

        {/* Products Table */}
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
                  <th className="px-4 py-3 font-medium">CATEGORY</th>
                  <th className="px-4 py-3 font-medium">STOCK</th>
                  <th className="px-4 py-3 font-medium">SKU</th>
                  <th className="px-4 py-3 font-medium">PRICE</th>
                  <th className="px-4 py-3 font-medium">QTY</th>
                  <th className="px-4 py-3 font-medium">STATUS</th>
                  <th className="px-4 py-3 font-medium">ACTIONS</th>
            </tr>
          </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-lg">{product.image}</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-xs text-gray-500 max-w-xs truncate">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </td>
              <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">
                          {getCategoryIcon(product.category)}
                        </span>
                        <span className="text-sm text-gray-900">
                          {product.category}
                </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked={product.stock > 0}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {product.sku}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      ${product.price}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {product.stock}
                    </td>
                    <td className="px-4 py-3">
                      {getStatusBadge(product.status)}
              </td>
              <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditClick(product)}
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
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600">
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
            Showing 1 to 7 of 100 entries
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
              15
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
        <AddProductModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddProduct}
          categories={categories}
        />

        <EditProductModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSave={handleEditProduct}
          product={selectedProduct}
          categories={categories}
        />
      </div>
    </AdminLayout>
  );
}
