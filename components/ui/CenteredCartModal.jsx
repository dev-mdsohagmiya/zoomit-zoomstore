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
  const router = useRouter();
  const { refreshCart } = useCartState();

  // Use external state if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = externalOnOpenChange || setInternalIsOpen;

  // Fetch cart data
  const fetchCart = async () => {
    setIsLoading(true);
    try {
      const result = await getCart();
      if (result.success) {
        setCart(result.data);
      } else {
        showErrorToast(result.error || "Failed to load cart");
      }
    } catch (error) {
      showErrorToast("Failed to load cart");
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

  // Handle quantity update
  const handleQuantityUpdate = async (
    productId,
    newQuantity,
    selectedSize,
    selectedColor
  ) => {
    if (newQuantity < 0 || newQuantity > 10) return;

    setIsUpdating((prev) => ({ ...prev, [productId]: true }));

    try {
      const result = await updateCartItem(
        productId,
        newQuantity,
        selectedSize,
        selectedColor
      );
      if (result.success) {
        setCart(result.data);
        showSuccessToast("Cart updated successfully");
        // Refresh global cart state to update all product cards
        refreshCart();
      } else {
        showErrorToast(result.error || "Failed to update cart");
      }
    } catch (error) {
      showErrorToast("Failed to update cart");
    } finally {
      setIsUpdating((prev) => ({ ...prev, [productId]: false }));
    }
  };

  // Handle remove item
  const handleRemoveItem = async (productId) => {
    setIsUpdating((prev) => ({ ...prev, [productId]: true }));

    try {
      const result = await removeFromCart(productId);
      if (result.success) {
        setCart(result.data);
        showSuccessToast("Item removed from cart");
        // Refresh global cart state to update all product cards
        refreshCart();
      } else {
        showErrorToast(result.error || "Failed to remove item");
      }
    } catch (error) {
      showErrorToast("Failed to remove item");
    } finally {
      setIsUpdating((prev) => ({ ...prev, [productId]: false }));
    }
  };

  // Handle clear cart
  const handleClearCart = async () => {
    setIsLoading(true);

    try {
      const result = await clearCart();
      if (result.success) {
        setCart(result.data);
        showSuccessToast("Cart cleared successfully");
        // Refresh global cart state to update all product cards
        refreshCart();
      } else {
        showErrorToast(result.error || "Failed to clear cart");
      }
    } catch (error) {
      showErrorToast("Failed to clear cart");
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate totals
  const calculateTotals = () => {
    if (!cart?.items) return { subtotal: 0, totalItems: 0 };

    const subtotal = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    const shipping = subtotal > 0 ? 200 : 0; // Free shipping over certain amount
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
    setIsOpen(false); // Close cart modal
  };

  const totals = calculateTotals();
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] bg-white shadow-2xl border border-purple-200 rounded-2xl focus:outline-none z-50 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95">
          <div className="flex items-center justify-between border-b border-purple-200 p-6 bg-gradient-to-r from-purple-50 to-white rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-900 flex items-center justify-center shadow-lg">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <div>
                <Dialog.Title className="text-lg font-bold text-purple-900">
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
                  className="text-xs text-red-600 hover:text-red-800 hover:bg-red-50 px-2 py-1 rounded-md transition-colors disabled:opacity-50"
                >
                  Clear All
                </button>
              )}
              <Dialog.Close className="rounded-xl p-2 text-purple-500 hover:bg-purple-100 hover:text-purple-700 transition-colors">
                <X className="w-5 h-5" />
              </Dialog.Close>
            </div>
          </div>

          <div className="max-h-[50vh] overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
                <span className="ml-2 text-purple-600">Loading cart...</span>
              </div>
            ) : !cart?.items || cart.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <ShoppingCart className="h-16 w-16 text-purple-300 mb-4" />
                <h3 className="text-lg font-medium text-purple-900 mb-2">
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
              cart.items.map((item) => (
                <div
                  key={`${item.product._id}-${item.selectedSize}-${item.selectedColor}`}
                  className="flex gap-4 rounded-xl border border-purple-200 p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-purple-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
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
                      <div>
                        <p
                          className="font-semibold text-purple-900 cursor-pointer hover:text-purple-700 transition-colors"
                          title={item.product.name}
                          onClick={() => handleProductClick(item.product)}
                        >
                          {truncateText(item.product.name, 30)}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-purple-600">
                          {item.selectedSize && (
                            <span>Size {item.selectedSize}</span>
                          )}
                          {item.selectedSize && item.selectedColor && (
                            <span>•</span>
                          )}
                          {item.selectedColor && (
                            <span>{item.selectedColor}</span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.product._id)}
                        disabled={isUpdating[item.product._id]}
                        className="text-purple-400 hover:text-red-500 transition-colors disabled:opacity-50"
                      >
                        {isUpdating[item.product._id] ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleQuantityUpdate(
                              item.product._id,
                              item.quantity - 1,
                              item.selectedSize,
                              item.selectedColor
                            )
                          }
                          disabled={
                            isUpdating[item.product._id] || item.quantity <= 1
                          }
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-purple-300 text-purple-700 hover:bg-purple-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <input
                          className="h-8 w-12 rounded-lg border border-purple-300 text-center text-purple-900 font-medium"
                          value={item.quantity}
                          readOnly
                        />
                        <button
                          onClick={() =>
                            handleQuantityUpdate(
                              item.product._id,
                              item.quantity + 1,
                              item.selectedSize,
                              item.selectedColor
                            )
                          }
                          disabled={
                            isUpdating[item.product._id] || item.quantity >= 10
                          }
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-purple-300 text-purple-700 hover:bg-purple-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-purple-900">
                          ৳{(item.price * item.quantity).toLocaleString()}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-purple-600">
                            ৳{item.price.toLocaleString()} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart?.items && cart.items.length > 0 && (
            <div className="border-t border-purple-200 p-6 bg-gradient-to-r from-purple-50 to-white space-y-4 rounded-b-2xl">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-purple-700">
                  <span>Subtotal ({totals.totalItems} items)</span>
                  <span>৳{totals.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-purple-700">
                  <span>Shipping</span>
                  <span>
                    {totals.shipping > 0
                      ? `৳${totals.shipping.toLocaleString()}`
                      : "Free"}
                  </span>
                </div>
                <div className="border-t border-purple-200 pt-3">
                  <div className="flex items-center justify-between text-lg font-bold text-purple-900">
                    <span>Total</span>
                    <span>৳{totals.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Dialog.Close asChild>
                  <button className="h-12 flex-1 rounded-lg border-2 border-purple-300 text-purple-700 font-medium hover:bg-purple-50 transition-colors">
                    Continue Shopping
                  </button>
                </Dialog.Close>
                <Link href="/checkout" className="flex-1">
                  <button className="h-12 w-full rounded-lg bg-purple-900 text-white font-semibold hover:bg-purple-800 transition-colors shadow-lg">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
