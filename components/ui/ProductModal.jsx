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

    console.log("Files selected:", files.length);
    console.log("Files:", files);
    console.log("Current selectedFiles state:", selectedFiles.length);

    if (files.length > 5) {
      showErrorToast("You can only upload up to 5 images");
      return;
    }

    // Check if adding these files would exceed the limit
    if (selectedFiles.length + files.length > 5) {
      showErrorToast(
        `You can only upload up to 5 images total. Currently have ${selectedFiles.length}, trying to add ${files.length}`
      );
      return;
    }

    // Check file sizes and types
    for (const file of files) {
      console.log("Validating file:", file.name, file.size, file.type);

      const maxSize = 2 * 1024 * 1024; // 2MB per file to stay under 10MB total limit
      if (file.size > maxSize) {
        showErrorToast(
          `File ${file.name} is too large. Maximum size is 2MB per file.`
        );
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

    // Check total size limit (8MB total to stay under 10MB limit)
    const totalSize = [...selectedFiles, ...files].reduce(
      (sum, file) => sum + file.size,
      0
    );
    const maxTotalSize = 8 * 1024 * 1024; // 8MB total
    if (totalSize > maxTotalSize) {
      showErrorToast(
        "Total file size too large. Maximum 8MB total for all images."
      );
      return;
    }

    // Create preview URLs for new files
    const newPreviews = files.map((file) => URL.createObjectURL(file));

    // Replace instead of append when multiple files are selected at once
    if (files.length > 1) {
      console.log("Multiple files selected, replacing current selection");
      setImagePreviews(newPreviews);
      setSelectedFiles(files);
    } else {
      console.log("Single file selected, appending to current selection");
      setImagePreviews((prev) => {
        const updated = [...prev, ...newPreviews];
        console.log("Updated imagePreviews:", updated.length);
        return updated;
      });
      setSelectedFiles((prev) => {
        const updated = [...prev, ...files];
        console.log(
          "Updated selected files:",
          updated.map((f) => ({ name: f.name, size: f.size, type: f.type }))
        );
        console.log("Total selected files:", updated.length);
        return updated;
      });
    }
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
    console.log("Form submitted with data:", data);
    console.log("Selected files:", selectedFiles.length);
    console.log("Selected categories:", selectedCategories);
    console.log("Form errors:", errors);

    // Check if there are any validation errors
    if (Object.keys(errors).length > 0) {
      console.error("Form validation errors:", errors);
      showErrorToast("Please fix the form errors before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Create FormData for multipart/form-data upload
      const formData = new FormData();

      // Add form fields
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("discount", (data.discount || 0).toString());
      formData.append("stock", (data.stock || 0).toString());

      // Add categories as array - send each category ID separately
      selectedCategories.forEach((categoryId) => {
        formData.append("categories", categoryId);
      });

      // Add photos as files - multer expects 'photos' field name
      console.log(
        "Adding photos to FormData. Total files:",
        selectedFiles.length
      );

      // Only add photos if there are files selected
      if (selectedFiles.length > 0) {
        selectedFiles.forEach((file, index) => {
          console.log(`Adding file ${index + 1}:`, {
            name: file.name,
            size: file.size,
            type: file.type,
          });
          // Multer expects files with the field name 'photos'
          formData.append("photos", file, file.name);
        });
      } else {
        console.log("No photos to add to FormData");
      }

      // Verify files were added to FormData
      const photoEntries = [];
      for (let [key, value] of formData.entries()) {
        if (key === "photos") {
          photoEntries.push(value);
        }
      }
      console.log("Photos in FormData:", photoEntries.length);

      // Debug: Log form data contents
      console.log("Form data being submitted:");
      console.log("- Name:", data.name);
      console.log("- Description:", data.description);
      console.log("- Price:", data.price);
      console.log("- Discount:", data.discount);
      console.log("- Stock:", data.stock);
      console.log("- Categories:", selectedCategories);
      console.log("- Photos count:", selectedFiles.length);

      // Log FormData entries
      for (let [key, value] of formData.entries()) {
        console.log(`FormData - ${key}:`, value);
      }

      console.log("Calling onSubmit with FormData");
      await onSubmit(formData);
      console.log("onSubmit completed successfully");

      // Reset file input and state after successful submission
      const fileInput = document.getElementById("images");
      if (fileInput) {
        fileInput.value = "";
      }
      setSelectedFiles([]);
      setImagePreviews([]);
    } catch (error) {
      console.error("Error submitting form:", error);
      showErrorToast("Failed to submit form. Please try again.");
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

        <form
          onSubmit={handleSubmit(handleFormSubmit, (errors) => {
            console.log("Form validation errors:", errors);
            showErrorToast("Please fix the form errors before submitting.");
          })}
          className="space-y-4"
          onInvalid={() => console.log("Form validation failed")}
        >
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price *</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">৳</span>
                </div>
                <Input
                  {...register("price", { valueAsNumber: true })}
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  className={`pl-7 ${errors.price ? "border-red-300" : ""}`}
                  disabled={isSubmitting}
                />
              </div>
              {errors.price && (
                <p className="text-sm text-red-600">{errors.price.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="discount">Discount (%)</Label>
              <div className="relative">
                <Input
                  {...register("discount", { valueAsNumber: true })}
                  id="discount"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="0"
                  className={`pr-7 ${errors.discount ? "border-red-300" : ""}`}
                  disabled={isSubmitting}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">%</span>
                </div>
              </div>
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
            {categories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-32 overflow-y-auto border border-gray-300 rounded-md p-3 bg-gray-50">
                {categories.map((category) => (
                  <label
                    key={category._id}
                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-white transition-colors cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category._id)}
                      onChange={() => handleCategoryChange(category._id)}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      disabled={isSubmitting}
                    />
                    <span className="text-sm text-gray-700 font-medium">
                      {category.name}
                    </span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-500 italic p-3 border border-gray-300 rounded-md bg-gray-50">
                No categories available. Create categories first to assign them
                to products.
              </div>
            )}
            {selectedCategories.length > 0 && (
              <div className="text-xs text-gray-600">
                {selectedCategories.length} categor
                {selectedCategories.length === 1 ? "y" : "ies"} selected
              </div>
            )}
          </div>

          {/* Product Images */}
          <div className="space-y-3">
            <Label>Product Images (max 5)</Label>

            {/* File Input */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <div className="flex flex-col items-center space-y-2">
                <Upload className="h-8 w-8 text-gray-400" />
                <div className="text-sm text-gray-600">
                  <Label
                    htmlFor="images"
                    className="cursor-pointer text-purple-600 hover:text-purple-500 font-medium"
                  >
                    Click to upload images
                  </Label>
                  <span className="block text-gray-500 mt-1">
                    or drag and drop
                  </span>
                </div>
                <input
                  key={`file-input-${selectedFiles.length}`}
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={isSubmitting}
                />
                <p className="text-xs text-gray-500">
                  JPG, PNG, GIF, WebP (max 5MB each, up to 5 images)
                </p>
              </div>
            </div>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="space-y-3">
                <div className="text-sm font-medium text-gray-700">
                  Selected Images ({imagePreviews.length}/5)
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="h-24 w-full rounded-lg object-cover border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 h-6 w-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                        disabled={isSubmitting}
                        title="Remove image"
                      >
                        <X className="h-3 w-3" />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        Image {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
              onClick={() => console.log("Submit button clicked")}
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
