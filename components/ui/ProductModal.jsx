"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, Package, X } from "lucide-react";
import { showErrorToast } from "../../lib/toast-utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./dialog";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";

// Validation schema
const productSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .min(2, "Product name must be at least 2 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters"),
  price: z.number().min(0.01, "Price must be greater than 0"),
  discount: z
    .number()
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot exceed 100%")
    .optional(),
  stock: z.number().min(0, "Stock cannot be negative").optional(),
  categories: z.array(z.string()).optional(),
});

export default function ProductModal({
  isOpen,
  onClose,
  onSubmit,
  product,
  categories = [],
  title,
}) {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      discount: 0,
      stock: 0,
      categories: [],
    },
  });

  // Reset form when modal opens/closes or product changes
  useEffect(() => {
    if (isOpen) {
      if (product) {
        setValue("name", product.name || "");
        setValue("description", product.description || "");
        setValue("price", product.price || 0);
        setValue("discount", product.discount || 0);
        setValue("stock", product.stock || 0);

        // Set existing photos as previews
        setImagePreviews(product.photos || []);
        setSelectedFiles([]);

        // Set selected categories
        const categoryIds = product.categories?.map((cat) => cat._id) || [];
        setSelectedCategories(categoryIds);
      } else {
        reset();
        setImagePreviews([]);
        setSelectedFiles([]);
        setSelectedCategories([]);
      }
    } else {
      reset();
      setImagePreviews([]);
      setSelectedFiles([]);
      setSelectedCategories([]);
    }
  }, [isOpen, product, setValue, reset]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 5) {
      showErrorToast("You can only upload up to 5 images");
      return;
    }

    // Check file sizes and types
    for (const file of files) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        showErrorToast(`File ${file.name} is too large. Maximum size is 5MB.`);
        return;
      }

      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        showErrorToast(`File ${file.name} is not a valid image type.`);
        return;
      }
    }

    // Create preview URLs for new files
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Include the selected files and categories in the data
      const formData = {
        ...data,
        photos: selectedFiles,
        categories: selectedCategories,
      };
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Product Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input
              {...register("name")}
              id="name"
              type="text"
              placeholder="Enter product name"
              className={errors.name ? "border-red-300" : ""}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <textarea
              {...register("description")}
              id="description"
              rows={3}
              placeholder="Enter product description"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                errors.description ? "border-red-300" : "border-gray-300"
              }`}
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className="text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Price and Discount */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price *</Label>
              <Input
                {...register("price", { valueAsNumber: true })}
                id="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                className={errors.price ? "border-red-300" : ""}
                disabled={isSubmitting}
              />
              {errors.price && (
                <p className="text-sm text-red-600">{errors.price.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="discount">Discount (%)</Label>
              <Input
                {...register("discount", { valueAsNumber: true })}
                id="discount"
                type="number"
                min="0"
                max="100"
                placeholder="0"
                className={errors.discount ? "border-red-300" : ""}
                disabled={isSubmitting}
              />
              {errors.discount && (
                <p className="text-sm text-red-600">
                  {errors.discount.message}
                </p>
              )}
            </div>
          </div>

          {/* Stock */}
          <div className="space-y-2">
            <Label htmlFor="stock">Stock Quantity</Label>
            <Input
              {...register("stock", { valueAsNumber: true })}
              id="stock"
              type="number"
              min="0"
              placeholder="0"
              className={errors.stock ? "border-red-300" : ""}
              disabled={isSubmitting}
            />
            {errors.stock && (
              <p className="text-sm text-red-600">{errors.stock.message}</p>
            )}
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <Label>Categories</Label>
            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border rounded-md p-2">
              {categories.map((category) => (
                <label
                  key={category._id}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category._id)}
                    onChange={() => handleCategoryChange(category._id)}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    disabled={isSubmitting}
                  />
                  <span className="text-sm text-gray-700">{category.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Product Images */}
          <div className="space-y-2">
            <Label>Product Images (max 5)</Label>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mb-3">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="h-20 w-20 rounded-lg object-cover border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                      disabled={isSubmitting}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* File Input */}
            <div className="flex items-center space-x-2">
              <Label
                htmlFor="images"
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
              >
                <Upload className="h-4 w-4 mr-2" />
                Choose Images
                <input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={isSubmitting}
                />
              </Label>
              <span className="text-sm text-gray-500">
                JPG, PNG, GIF, WebP (max 5MB each)
              </span>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isSubmitting
                ? "Saving..."
                : product
                ? "Update Product"
                : "Create Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
