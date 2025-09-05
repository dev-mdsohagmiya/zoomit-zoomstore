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
import { Input } from "./input";

export default function UserManagementModal({
  isOpen,
  onClose,
  onSave,
  user,
  mode = "add",
  userRole = "user",
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    status: "active",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && mode === "edit") {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "", // Don't pre-fill password for edit
        role: user.role || "user",
        status: user.status || "active",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        password: "",
        role: mode === "addAdmin" ? "admin" : "user",
        status: "active",
      });
    }
  }, [user, mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create FormData for multipart/form-data
      const formDataToSend = new FormData();

      // Add all form fields
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("role", formData.role);
      formDataToSend.append("status", formData.status);

      // Add password only for create operations
      if ((mode === "add" || mode === "addAdmin") && formData.password) {
        formDataToSend.append("password", formData.password);
      }

      // Add address if provided
      if (formData.address) {
        formDataToSend.append("address", JSON.stringify(formData.address));
      }

      // Add photo file if selected
      if (formData.photo && formData.photo instanceof File) {
        formDataToSend.append("photo", formData.photo);
      }

      onSave(formDataToSend);
      handleClose();
    } catch (error) {
      console.error(
        `Error ${mode === "edit" ? "updating" : "adding"} user:`,
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Role options based on current user's role
  const getRoleOptions = () => {
    if (userRole === "superadmin") {
      return [
        { value: "user", label: "User" },
        { value: "admin", label: "Admin" },
        { value: "superadmin", label: "Super Admin" },
      ];
    } else if (userRole === "admin") {
      return [
        { value: "user", label: "User" },
        { value: "admin", label: "Admin" },
      ];
    } else {
      return [{ value: "user", label: "User" }];
    }
  };

  const roles = getRoleOptions();

  const statuses = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
    { value: "suspended", label: "Suspended" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit"
              ? "Edit User"
              : mode === "addAdmin"
              ? "Add New Admin"
              : "Add New User"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                required
              />
            </div>
          </div>

          {/* Password field - only show for add modes */}
          {(mode === "add" || mode === "addAdmin") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                minLength={6}
              />
            </div>
          )}

          {/* Photo field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photo
            </label>
            <input
              name="photo"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setFormData({
                  ...formData,
                  photo: file,
                });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            {formData.photo && (
              <p className="text-sm text-gray-500 mt-1">
                Selected: {formData.photo.name}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role *
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
                disabled={mode === "addAdmin"} // Disable role selection for admin creation
              >
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                {statuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* User Preview */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Preview:</h4>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-purple-600">
                  {formData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </span>
              </div>
              <div>
                <div className="font-medium text-gray-900">{formData.name}</div>
                <div className="text-sm text-gray-500">{formData.email}</div>
                <div className="flex space-x-2 mt-1">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      formData.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : formData.role === "superadmin"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {roles.find((r) => r.value === formData.role)?.label}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      formData.status === "active"
                        ? "bg-green-100 text-green-700"
                        : formData.status === "inactive"
                        ? "bg-gray-100 text-gray-700"
                        : formData.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {statuses.find((s) => s.value === formData.status)?.label}
                  </span>
                </div>
              </div>
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
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isLoading
                ? mode === "edit"
                  ? "Updating..."
                  : "Adding..."
                : mode === "edit"
                ? "Update User"
                : "Add User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
