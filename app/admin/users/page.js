"use client";
import { useState } from "react";
import AdminLayout from "../../../components/ui/AdminLayout";
import UserManagementModal from "../../../components/ui/UserManagementModal";

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalMode, setModalMode] = useState("add");

  // Mock data - in real app, this would come from API
  const users = [
    {
      id: 1,
      name: "Ava Carter",
      email: "ava@example.com",
      role: "admin",
      status: "active",
      avatar: "AC",
      joinDate: "2024-01-15",
      lastLogin: "2024-01-20",
    },
    {
      id: 2,
      name: "Liam Patel",
      email: "liam@example.com",
      role: "user",
      status: "active",
      avatar: "LP",
      joinDate: "2024-01-10",
      lastLogin: "2024-01-19",
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma@example.com",
      role: "user",
      status: "inactive",
      avatar: "EW",
      joinDate: "2024-01-05",
      lastLogin: "2024-01-12",
    },
    {
      id: 4,
      name: "James Brown",
      email: "james@example.com",
      role: "user",
      status: "active",
      avatar: "JB",
      joinDate: "2024-01-08",
      lastLogin: "2024-01-20",
    },
    {
      id: 5,
      name: "Sarah Davis",
      email: "sarah@example.com",
      role: "user",
      status: "pending",
      avatar: "SD",
      joinDate: "2024-01-18",
      lastLogin: "Never",
    },
    {
      id: 6,
      name: "Michael Johnson",
      email: "michael@example.com",
      role: "user",
      status: "active",
      avatar: "MJ",
      joinDate: "2024-01-12",
      lastLogin: "2024-01-19",
    },
    {
      id: 7,
      name: "Lisa Anderson",
      email: "lisa@example.com",
      role: "user",
      status: "suspended",
      avatar: "LA",
      joinDate: "2024-01-03",
      lastLogin: "2024-01-15",
    },
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: "bg-green-100", text: "text-green-700", label: "Active" },
      inactive: { bg: "bg-gray-100", text: "text-gray-700", label: "Inactive" },
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        label: "Pending",
      },
      suspended: { bg: "bg-red-100", text: "text-red-700", label: "Suspended" },
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

  const getRoleBadge = (role) => {
    const roleConfig = {
      admin: { bg: "bg-purple-100", text: "text-purple-700", label: "Admin" },
      user: { bg: "bg-blue-100", text: "text-blue-700", label: "User" },
      superadmin: {
        bg: "bg-red-100",
        text: "text-red-700",
        label: "Super Admin",
      },
    };

    const config = roleConfig[role] || roleConfig.user;
    return (
      <span
        className={`rounded-full px-2 py-0.5 text-xs font-medium ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  const handleUserSave = (userData) => {
    // In a real app, this would make an API call
    console.log("Saving user:", userData);
    // For demo purposes, we'll just close the modal
  };

  const handleAddUser = () => {
    setModalMode("add");
    setSelectedUser(null);
    setShowUserModal(true);
  };

  const handleEditUser = (user) => {
    setModalMode("edit");
    setSelectedUser(user);
    setShowUserModal(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600">Manage user accounts and permissions</p>
        </div>

        {/* User Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
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
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Users
                </p>
                <p className="text-2xl font-bold text-gray-900">1,156</p>
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  New This Month
                </p>
                <p className="text-2xl font-bold text-gray-900">89</p>
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
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Admins</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
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
                  Search Users
                </label>
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Filter by Role
                </label>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="superadmin">Super Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Filter by Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </select>
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
              <button
                onClick={handleAddUser}
                className="bg-purple-600 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
              >
                + Add User
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
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
                  <th className="px-4 py-3 font-medium">USER</th>
                  <th className="px-4 py-3 font-medium">EMAIL</th>
                  <th className="px-4 py-3 font-medium">ROLE</th>
                  <th className="px-4 py-3 font-medium">STATUS</th>
                  <th className="px-4 py-3 font-medium">JOIN DATE</th>
                  <th className="px-4 py-3 font-medium">LAST LOGIN</th>
                  <th className="px-4 py-3 font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-purple-600">
                            {user.avatar}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            ID: {user.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-4 py-3">{getRoleBadge(user.role)}</td>
                    <td className="px-4 py-3">{getStatusBadge(user.status)}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {user.joinDate}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {user.lastLogin}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditUser(user)}
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
            Showing 1 to 7 of 1,234 entries
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
              124
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
        <UserManagementModal
          isOpen={showUserModal}
          onClose={() => setShowUserModal(false)}
          onSave={handleUserSave}
          user={selectedUser}
          mode={modalMode}
        />
      </div>
    </AdminLayout>
  );
}
