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
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    status: "active",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && mode === "edit") {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "user",
        status: user.status || "active",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        role: "user",
        status: "active",
      });
    }
  }, [user, mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const userData = {
        ...(mode === "edit" ? user : {}),
        ...formData,
        id: mode === "edit" ? user.id : Date.now(),
        avatar:
          mode === "edit"
            ? user.avatar
            : formData.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase(),
        joinDate:
          mode === "edit"
            ? user.joinDate
            : new Date().toISOString().split("T")[0],
        lastLogin: mode === "edit" ? user.lastLogin : "Never",
      };

      onSave(userData);
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

  const roles = [
    { value: "user", label: "User" },
    { value: "admin", label: "Admin" },
    { value: "superadmin", label: "Super Admin" },
  ];

  const statuses = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
    { value: "suspended", label: "Suspended" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit User" : "Add New User"}
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

