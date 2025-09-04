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

export default function CategoryModal({
  isOpen,
  onClose,
  onSave,
  category,
  mode = "add",
}) {
  const [formData, setFormData] = useState({
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (category && mode === "edit") {
      setFormData({
        name: category.name || "",
      });
    } else {
      setFormData({
        name: "",
      });
    }
  }, [category, mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const categoryData = {
        ...(mode === "edit" ? category : {}),
        ...formData,
        id: mode === "edit" ? category.id : Date.now(),
        slug: formData.name.toLowerCase().replace(/\s+/g, "-"),
      };

      onSave(categoryData);
      handleClose();
    } catch (error) {
      console.error(
        `Error ${mode === "edit" ? "updating" : "adding"} category:`,
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

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit Category" : "Add New Category"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name *
            </label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter category name"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Slug: {formData.name.toLowerCase().replace(/\s+/g, "-")}
            </p>
          </div>

          {/* Category Preview */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Preview:</h4>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-lg">
                  {formData.name ? formData.name[0].toUpperCase() : "📦"}
                </span>
              </div>
              <div>
                <div className="font-medium text-gray-900">{formData.name}</div>
                <div className="text-sm text-gray-500">
                  {formData.name.toLowerCase().replace(/\s+/g, "-")}
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
                ? "Update Category"
                : "Add Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

