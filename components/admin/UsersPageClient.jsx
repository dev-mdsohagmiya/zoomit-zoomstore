"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Plus,
  Edit,
  Trash2,
  Users,
  UserCheck,
  UserPlus,
  Search,
  Filter,
  X,
  Eye,
} from "lucide-react";
import { getStoredToken } from "../../lib/auth-utils";
import { showSuccessToast, showErrorToast } from "../../lib/toast-utils";
import {
  getAllUsersByAdminAndSuperAdmin,
  createUserByAdminAndSuperAdmin,
  updateUserByAdminAndSuperAdmin,
  deleteUserByAdminAndSuperAdmin,
  createAdminBySuperAdmin,
} from "../../app/actions/user";
import UserManagementModal from "../ui/UserManagementModal";
import DeleteConfirmModal from "../ui/DeleteConfirmModal";

export default function UsersPageClient({
  initialUsers,
  initialPagination,
  searchParams,
}) {
  const router = useRouter();
  const searchParamsHook = useSearchParams();

  const [users, setUsers] = useState(initialUsers || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [modalMode, setModalMode] = useState("add");
  const [userRole, setUserRole] = useState("user"); // Current user's role

  // Search and filter states from URL params
  const [searchTerm, setSearchTerm] = useState(searchParams?.search || "");
  const [roleFilter, setRoleFilter] = useState(searchParams?.role || "all");
  const [statusFilter, setStatusFilter] = useState(
    searchParams?.status || "all"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Pagination states from server
  const [currentPage, setCurrentPage] = useState(initialPagination?.page || 1);
  const [totalPages, setTotalPages] = useState(initialPagination?.pages || 1);
  const [totalUsersCount, setTotalUsersCount] = useState(
    initialPagination?.total || 0
  );
  const usersPerPage = 10;

  // Statistics states
  const [stats, setStats] = useState({
    totalUsers: 0,
    newThisMonth: 0,
    admins: 0,
  });

  // Get current user's role from token
  useEffect(() => {
    const token = getStoredToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserRole(payload.role || "user");
      } catch (error) {
        console.error("Error parsing token:", error);
        setUserRole("user");
      }
    }
  }, []);

  // Update statistics on mount
  useEffect(() => {
    updateStatistics(users);
  }, [users]);

  // Update statistics based on users data
  const updateStatistics = (usersData) => {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();

    const totalUsers = usersData.length;
    const newThisMonth = usersData.filter((user) => {
      const userDate = new Date(user.createdAt || user.joinDate);
      return (
        userDate.getMonth() === thisMonth && userDate.getFullYear() === thisYear
      );
    }).length;
    const admins = usersData.filter(
      (user) => user.role === "admin" || user.role === "superadmin"
    ).length;

    setStats({
      totalUsers,
      newThisMonth,
      admins,
    });
  };

  // URL navigation functions
  const updateURL = (params) => {
    const current = new URLSearchParams(Array.from(searchParamsHook.entries()));

    Object.entries(params).forEach(([key, value]) => {
      if (value && value !== "all") {
        current.set(key, value);
      } else {
        current.delete(key);
      }
    });

    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`/admin/users${query}`);
  };

  const handleSearch = async () => {
    updateURL({
      search: searchTerm,
      role: roleFilter,
      status: statusFilter,
      page: 1,
    });

    // Also refresh data immediately
    await refreshData();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearFilters = async () => {
    setSearchTerm("");
    setRoleFilter("all");
    setStatusFilter("all");
    updateURL({
      search: "",
      role: "all",
      status: "all",
      page: 1,
    });

    // Also refresh data immediately
    await refreshData();
  };

  // Pagination functions
  const handlePageChange = async (page) => {
    updateURL({
      search: searchTerm,
      role: roleFilter,
      status: statusFilter,
      page: page,
    });

    // Also refresh data immediately
    await refreshData();
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  // Function to refresh data from server
  const refreshData = async () => {
    try {
      const currentSearch = searchParams?.search || "";
      const currentRole = searchParams?.role || "all";
      const currentStatus = searchParams?.status || "all";
      const currentPage = searchParams?.page || 1;

      const filters = {};
      if (currentSearch) filters.search = currentSearch;
      if (currentRole !== "all") filters.role = currentRole;
      if (currentStatus !== "all") filters.status = currentStatus;

      const result = await getAllUsersByAdminAndSuperAdmin(
        currentPage,
        10,
        filters
      );

      if (result.success) {
        setUsers(result.data.users || []);
        setTotalUsersCount(result.data.pagination?.total || 0);
        setTotalPages(result.data.pagination?.pages || 1);
        setCurrentPage(result.data.pagination?.page || 1);

        // Update statistics with new data
        updateStatistics(result.data.users || []);
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  // User management functions
  const handleCreateUser = async (userData) => {
    try {
      const result = await createUserByAdminAndSuperAdmin(userData);

      if (result.success) {
        showSuccessToast(result.message);
        setIsModalOpen(false);
        // Refresh data immediately
        await refreshData();
        // Also refresh the page for server-side data
        router.refresh();
      } else {
        showErrorToast(result.error);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      showErrorToast("Failed to create user. Please try again.");
    }
  };

  const handleCreateAdmin = async (adminData) => {
    try {
      const result = await createAdminBySuperAdmin(adminData);

      if (result.success) {
        showSuccessToast(result.message);
        setIsModalOpen(false);
        // Refresh data immediately
        await refreshData();
        // Also refresh the page for server-side data
        router.refresh();
      } else {
        showErrorToast(result.error);
      }
    } catch (error) {
      console.error("Error creating admin:", error);
      showErrorToast("Failed to create admin. Please try again.");
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      const result = await updateUserByAdminAndSuperAdmin(
        editingUser._id,
        userData
      );

      if (result.success) {
        showSuccessToast(result.message);
        setIsModalOpen(false);
        // Refresh data immediately
        await refreshData();
        // Also refresh the page for server-side data
        router.refresh();
      } else {
        showErrorToast(result.error);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      showErrorToast("Failed to update user. Please try again.");
    }
  };

  const handleDeleteUser = async () => {
    try {
      const result = await deleteUserByAdminAndSuperAdmin(userToDelete._id);

      if (result.success) {
        showSuccessToast(result.message);
        setDeleteModalOpen(false);
        // Refresh data immediately
        await refreshData();
        // Also refresh the page for server-side data
        router.refresh();
      } else {
        showErrorToast(result.error);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      showErrorToast("Failed to delete user. Please try again.");
    }
  };

  // Modal functions
  const handleAddUser = () => {
    setModalMode("add");
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleAddAdmin = () => {
    setModalMode("addAdmin");
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setModalMode("edit");
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const handleUserSave = (userData) => {
    if (modalMode === "add") {
      handleCreateUser(userData);
    } else if (modalMode === "addAdmin") {
      handleCreateAdmin(userData);
    } else if (modalMode === "edit") {
      handleUpdateUser(userData);
    }
  };

  // Badge functions
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

  // Check if user can perform actions
  const canCreateAdmin = userRole === "superadmin";
  const canCreateUser = userRole === "superadmin" || userRole === "admin";
  const canEditUser = userRole === "superadmin" || userRole === "admin";
  const canDeleteUser = userRole === "superadmin" || userRole === "admin";

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="text-gray-600">Manage user accounts and permissions</p>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalUsersCount}
              </p>
              <p className="text-xs text-gray-500 mt-1">All registered users</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                New This Month
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.newThisMonth}
              </p>
              <p className="text-xs text-gray-500 mt-1">Joined this month</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Admins</p>
              <p className="text-2xl font-bold text-gray-900">{stats.admins}</p>
              <p className="text-xs text-gray-500 mt-1">Admin & Super Admin</p>
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
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search Users
              </label>
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="sm:w-48">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Role
              </label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="superadmin">Super Admin</option>
              </select>
            </div>

            <div className="sm:w-48">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>

            <div className="flex items-end gap-2">
              <button
                onClick={handleSearch}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSearch}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Search className="w-4 h-4" />
              Search
            </button>

            {canCreateUser && (
              <button
                onClick={handleAddUser}
                className="bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                + Add User
              </button>
            )}

            {canCreateAdmin && (
              <button
                onClick={handleAddAdmin}
                className="bg-purple-600 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
              >
                + Add Admin
              </button>
            )}
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
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-4 py-3 font-medium">USER</th>
                <th className="px-4 py-3 font-medium">EMAIL</th>
                <th className="px-4 py-3 font-medium">ROLE</th>
                <th className="px-4 py-3 font-medium">STATUS</th>
                <th className="px-4 py-3 font-medium">JOIN DATE</th>
                <th className="px-4 py-3 font-medium">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id || user.id} className="hover:bg-gray-50">
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
                            {user.name
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase() || "U"}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            ID: {user._id || user.id}
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
                      {new Date(
                        user.createdAt || user.joinDate
                      ).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        {canEditUser && (
                          <button
                            onClick={() => handleEditUser(user)}
                            className="p-1 text-gray-400 hover:text-gray-600"
                            title="Edit user"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                        {canDeleteUser && (
                          <button
                            onClick={() => handleDeleteClick(user)}
                            className="p-1 text-gray-400 hover:text-red-600"
                            title="Delete user"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing {(currentPage - 1) * usersPerPage + 1} to{" "}
          {Math.min(currentPage * usersPerPage, totalUsersCount)} of{" "}
          {totalUsersCount} entries
          {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1 || isLoading}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  disabled={isLoading}
                  className={`px-3 py-2 text-sm border rounded-lg ${
                    currentPage === pageNum
                      ? "bg-purple-600 text-white border-purple-600"
                      : "border-gray-300 hover:bg-gray-50"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages || isLoading}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modals */}
      <UserManagementModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleUserSave}
        user={editingUser}
        mode={modalMode}
        userRole={userRole}
      />

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteModalClose}
        onConfirm={handleDeleteUser}
        title="Delete User"
        message={`Are you sure you want to delete "${userToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
