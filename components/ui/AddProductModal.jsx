"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./dialog";
import { Button } from "./button";
import { Input } from "./input";

export default function AddProductModal({
  isOpen,
  onClose,
  onSave,
  categories = [],
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    stock: "",
    categories: [],
  });
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate a random ID for the new product
      const newProduct = {
        id: Date.now(),
        ...formData,
        price: parseFloat(formData.price),
        discount: parseFloat(formData.discount) || 0,
        stock: parseInt(formData.stock) || 0,
        photos: photos.map((photo, index) => ({
          id: index + 1,
          url: URL.createObjectURL(photo),
          publicId: `product_${Date.now()}_${index}`,
        })),
      };

      onSave(newProduct);
      handleClose();
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      discount: "",
      stock: "",
      categories: [],
    });
    setPhotos([]);
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (categoryId) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter((id) => id !== categoryId)
        : [...prev.categories, categoryId],
    }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (photos.length + files.length > 5) {
      alert("Maximum 5 photos allowed");
      return;
    }
    setPhotos((prev) => [...prev, ...files]);
  };

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name *
            </label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price ($) *
              </label>
              <Input
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount ($)
              </label>
              <Input
                name="discount"
                type="number"
                step="0.01"
                value={formData.discount}
                onChange={handleChange}
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity
              </label>
              <Input
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categories
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border border-gray-300 rounded-md p-3">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    checked={formData.categories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                    className="text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">{category.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Photos (Max 5)
            </label>
            <div className="space-y-4">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />

              {photos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
              {isLoading ? "Adding..." : "Add Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
