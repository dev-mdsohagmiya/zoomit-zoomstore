"use client";
import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, ShoppingCart, Minus, Plus, Trash2, Loader2 } from "lucide-react";
import {
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../../app/actions/cart";
import { showSuccessToast, showErrorToast } from "../../lib/toast-utils";
import { truncateText } from "../../lib/utils";
import { useCartState } from "../../lib/hooks/useCartState";

export default function CenteredCartModal({
  trigger,
  isOpen: externalIsOpen,
  onOpenChange: externalOnOpenChange,
}) {
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState({});
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  // Use external control if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = externalOnOpenChange || setInternalIsOpen;

  console.log(
    "CenteredCartModal - externalIsOpen:",
    externalIsOpen,
    "internalIsOpen:",
    internalIsOpen,
    "final isOpen:",
    isOpen
  );
  const router = useRouter();
  const {
    refreshCart,
    removeFromCartWithUI,
    clearLocalState,
    removeItemLocally,
  } = useCartState();

  // Fetch cart data - LOCAL ONLY
  const fetchCart = async () => {
    setIsLoading(true);
    try {
      // Load from localStorage only
      const localCart = JSON.parse(localStorage.getItem("localCart") || "[]");
      setCart({ items: localCart });
    } catch (error) {
      console.error("Error loading local cart:", error);
      setCart({ items: [] });
    } finally {
      setIsLoading(false);
    }
  };

  // Load cart when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchCart();
    }
  }, [isOpen]);

  // Handle quantity update - LOCAL ONLY
  const handleQuantityUpdate = async (
    itemId,
    productId,
    newQuantity,
    selectedSize,
    selectedColor
  ) => {
    if (newQuantity < 1) return;

    setIsUpdating((prev) => ({ ...prev, [itemId]: true }));

    try {
      // Update localStorage directly
      const localCart = JSON.parse(localStorage.getItem("localCart") || "[]");

      // Parse the itemId - format: "index-productId"
      const parts = itemId.split("-");
      const itemIndex = parseInt(parts[0]);

      if (itemIndex >= 0 && itemIndex < localCart.length) {
        localCart[itemIndex].quantity = newQuantity;
        localStorage.setItem("localCart", JSON.stringify(localCart));
        setCart({ items: localCart });
        showSuccessToast("Quantity updated successfully");
        refreshCart();
      } else {
        showErrorToast("Item not found in cart");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      showErrorToast("Failed to update quantity");
    } finally {
      setIsUpdating((prev) => ({ ...prev, [itemId]: false }));
    }
  };

  // Handle remove item - LOCAL ONLY
  const handleRemoveItem = async (itemId) => {
    setIsUpdating((prev) => ({ ...prev, [itemId]: true }));

    try {
      // Remove from localStorage directly
      const localCart = JSON.parse(localStorage.getItem("localCart") || "[]");

      // Parse the itemId - format: "index-productId"
      const parts = itemId.split("-");
      const itemIndex = parseInt(parts[0]);
      const productId = parts[1];

      console.log("Removing item:", { itemId, itemIndex, productId });
      console.log("Current cart length:", localCart.length);

      // Remove item by index
      const filteredCart = localCart.filter((_, index) => index !== itemIndex);

      console.log("Filtered cart length:", filteredCart.length);

      localStorage.setItem("localCart", JSON.stringify(filteredCart));
      setCart({ items: filteredCart });

      // Update local state to trigger UI updates
      removeItemLocally(productId);

      showSuccessToast("Item removed from cart");
      refreshCart();
    } catch (error) {
      console.error("Error removing item:", error);
      showErrorToast("Failed to remove item");
    } finally {
      setIsUpdating((prev) => ({ ...prev, [itemId]: false }));
    }
  };

  // Handle clear cart - LOCAL ONLY
  const handleClearCart = async () => {
    setIsLoading(true);

    try {
      // Clear localStorage directly
      localStorage.setItem("localCart", "[]");
      setCart({ items: [] });

      // Clear local state to trigger UI updates
      clearLocalState();

      showSuccessToast("Cart cleared successfully");
      refreshCart();
    } catch (error) {
      console.error("Error clearing cart:", error);
      showErrorToast("Failed to clear cart");
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate totals
  const calculateTotals = () => {
    if (!cart?.items || cart.items.length === 0) {
      return { subtotal: 0, totalItems: 0, shipping: 0, total: 0 };
    }

    const subtotal = cart.items.reduce(
      (sum, item) => sum + (item.product?.price || 0) * item.quantity,
      0
    );
    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    const shipping = subtotal > 0 ? 200 : 0;
    const total = subtotal + shipping;

    return { subtotal, totalItems, shipping, total };
  };

  // Generate slug from product name
  const generateSlug = (title) => {
    if (!title) return "";
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  // Handle product name click
  const handleProductClick = (product) => {
    const productSlug =
      product.slug || generateSlug(product.name) || product._id;
    router.push(`/products/${productSlug}`);
    setIsOpen(false);
  };

  const totals = calculateTotals();

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl focus:outline-none z-50 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-purple-200 p-6 bg-gradient-to-r from-purple-50 to-white rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-900 flex items-center justify-center shadow-lg">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <div>
                <Dialog.Title className="text-xl font-bold text-purple-900">
                  Shopping Cart
                </Dialog.Title>
                <p className="text-sm text-purple-600">
                  {isLoading
                    ? "Loading..."
                    : `${totals.totalItems} items in your cart`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {cart?.items && cart.items.length > 0 && (
                <button
                  onClick={handleClearCart}
                  disabled={isLoading}
                  className="text-xs text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1 rounded-md transition-colors disabled:opacity-50"
                >
                  Clear All
                </button>
              )}
              <Dialog.Close className="rounded-xl p-2 text-purple-500 hover:bg-purple-100 hover:text-purple-700 transition-colors">
                <X className="w-5 h-5" />
              </Dialog.Close>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
                <span className="ml-2 text-purple-600">Loading cart...</span>
              </div>
            ) : !cart?.items || cart.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <ShoppingCart className="h-20 w-20 text-purple-300 mb-4" />
                <h3 className="text-xl font-medium text-purple-900 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-purple-600 mb-6">
                  Add some products to get started!
                </p>
                <Dialog.Close asChild>
                  <button className="px-6 py-3 bg-purple-900 text-white rounded-lg hover:bg-purple-800 transition-colors">
                    Continue Shopping
                  </button>
                </Dialog.Close>
              </div>
            ) : (
              <div className="grid gap-4">
                {cart.items.map((item, index) => (
                  <div
                    key={`${index}-${item.product._id}`}
                    className="flex gap-4 rounded-xl border border-purple-200 p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-purple-50">
                      <img
                        alt={item.product.name}
                        src={
                          item.product.photos?.[0] || "/placeholder-product.jpg"
                        }
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p
                            className="font-semibold text-purple-900 cursor-pointer hover:text-purple-700 transition-colors text-lg"
                            title={item.product.name}
                            onClick={() => handleProductClick(item.product)}
                          >
                            {truncateText(item.product.name, 40)}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-purple-600 mt-1">
                            {item.selectedSize && (
                              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-md">
                                Size: {item.selectedSize}
                              </span>
                            )}
                            {item.selectedColor && (
                              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-md">
                                Color: {item.selectedColor}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <p className="text-xl font-bold text-purple-900">
                              ৳
                              {(
                                (item.product?.price || 0) * item.quantity
                              ).toFixed(2)}
                            </p>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    handleQuantityUpdate(
                                      `${index}-${item.product._id}`,
                                      item.product._id,
                                      item.quantity - 1,
                                      item.selectedSize,
                                      item.selectedColor
                                    )
                                  }
                                  disabled={
                                    item.quantity <= 1 ||
                                    isUpdating[`${index}-${item.product._id}`]
                                  }
                                  className="w-8 h-8 rounded-full border border-purple-300 flex items-center justify-center text-purple-600 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-8 text-center font-medium text-purple-900">
                                  {isUpdating[
                                    `${index}-${item.product._id}`
                                  ] ? (
                                    <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                                  ) : (
                                    item.quantity
                                  )}
                                </span>
                                <button
                                  onClick={() =>
                                    handleQuantityUpdate(
                                      `${index}-${item.product._id}`,
                                      item.product._id,
                                      item.quantity + 1,
                                      item.selectedSize,
                                      item.selectedColor
                                    )
                                  }
                                  disabled={
                                    isUpdating[`${index}-${item.product._id}`]
                                  }
                                  className="w-8 h-8 rounded-full border border-purple-300 flex items-center justify-center text-purple-600 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                              <button
                                onClick={() =>
                                  handleRemoveItem(
                                    `${index}-${item.product._id}`
                                  )
                                }
                                disabled={
                                  isUpdating[`${index}-${item.product._id}`]
                                }
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-md transition-colors disabled:opacity-50"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart?.items && cart.items.length > 0 && (
            <div className="border-t border-purple-200 p-6 bg-gradient-to-r from-purple-50 to-white rounded-b-2xl">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-purple-600">Subtotal</span>
                    <span className="font-medium text-purple-900">
                      ৳{totals.subtotal}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-600">Shipping</span>
                    <span className="font-medium text-purple-900">
                      {totals.shipping === 0 ? "Free" : `৳${totals.shipping}`}
                    </span>
                  </div>
                </div>
                <div className="border-t border-purple-200 pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span className="text-purple-900">Total</span>
                    <span className="text-purple-900">৳{totals.total}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Dialog.Close asChild>
                    <button className="text-purple-600 py-3 px-4 rounded-lg font-medium hover:bg-purple-50 transition-colors border border-purple-200">
                      Continue Shopping
                    </button>
                  </Dialog.Close>
                  <Link
                    href="/checkout"
                    className="bg-purple-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-800 transition-colors text-center block"
                    onClick={() => setIsOpen(false)}
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
