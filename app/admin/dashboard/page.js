"use client";
import AdminLayout from "../../../components/ui/AdminLayout";

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening with your store today.
          </p>
        </div>

        {/* Congratulations Card */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                🎉 Congratulations Admin!
              </h2>
              <p className="text-purple-100 mb-4">
                Best performing store this month
              </p>
              <div className="text-3xl font-bold mb-2">$48.9k</div>
              <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                View Sales
              </button>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sales</p>
                <p className="text-2xl font-bold text-gray-900">230k</p>
                <p className="text-xs text-gray-500">Updated 1 month ago</p>
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Customers</p>
                <p className="text-2xl font-bold text-gray-900">8.549k</p>
                <p className="text-xs text-gray-500">Active users</p>
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
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Products</p>
                <p className="text-2xl font-bold text-gray-900">1.423k</p>
                <p className="text-xs text-gray-500">In catalog</p>
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
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">$9,745</p>
                <p className="text-xs text-gray-500">This month</p>
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profit Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Profit</h3>
              <span className="text-sm text-gray-500">Last Month</span>
            </div>
            <div className="h-32 bg-gradient-to-r from-teal-400 to-teal-600 rounded-lg flex items-center justify-center mb-4">
              <div className="text-white text-center">
                <div className="text-2xl font-bold">624k</div>
                <div className="text-sm text-teal-100">+8.24%</div>
              </div>
            </div>
          </div>

          {/* Expenses Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Expenses</h3>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">82.5k</div>
              <div className="w-24 h-24 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-lg font-semibold text-orange-600">
                  78%
                </span>
              </div>
              <p className="text-sm text-gray-600">
                $21k Expenses more than last month
              </p>
            </div>
          </div>
        </div>

        {/* Revenue Report */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Revenue Report
            </h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Earning</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Expense</span>
              </div>
              <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
                <option>2025</option>
                <option>2024</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <svg
                    className="w-12 h-12 mx-auto mb-2"
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
                  <p>Revenue Chart</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-2xl font-bold text-gray-900">$25,825</div>
                <div className="text-sm text-gray-600">Budget: 56,800</div>
              </div>
              <div className="h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                <div className="text-purple-600 text-sm">Chart Preview</div>
              </div>
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                Increase Button
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Generated Leads */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Generated Leads
            </h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">4,350</div>
              <div className="text-sm text-green-600 mb-4">^ 15.8%</div>
              <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-green-600">
                  184 Total
                </span>
              </div>
            </div>
          </div>

          {/* Earning Reports */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Earning Reports
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Net Profit
                    </p>
                    <p className="text-xs text-gray-500">12.4k Sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">
                    $1,619
                  </div>
                  <div className="text-xs text-green-600">^ 18.6%</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
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
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Total Income
                    </p>
                    <p className="text-xs text-gray-500">Sales, Affiliation</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">
                    $3,571
                  </div>
                  <div className="text-xs text-green-600">^ 39.6%</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-orange-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Total Expenses
                    </p>
                    <p className="text-xs text-gray-500">ADVT, Marketing</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">
                    $430
                  </div>
                  <div className="text-xs text-green-600">^ 52.8%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Products */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Popular Products
            </h3>
            <p className="text-sm text-gray-500 mb-4">Total 10.4k Visitors</p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                  <span className="text-xs">📱</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Apple iPhone 13
                  </p>
                  <p className="text-xs text-gray-500">Item: #FXZ-4567</p>
                </div>
                <div className="text-sm font-semibold text-gray-900">
                  $999.29
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-xs">👟</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Nike Air Jordan
                  </p>
                  <p className="text-xs text-gray-500">Item: #FXZ-3456</p>
                </div>
                <div className="text-sm font-semibold text-gray-900">
                  $72.40
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-xs">🎧</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Beats Studio 2
                  </p>
                  <p className="text-xs text-gray-500">Item: #FXZ-9485</p>
                </div>
                <div className="text-sm font-semibold text-gray-900">$99</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
