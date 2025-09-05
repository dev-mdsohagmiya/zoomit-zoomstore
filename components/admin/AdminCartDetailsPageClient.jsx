"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShoppingCart,
  User,
  Trash2,
  Minus,
  Plus,
  Loader2,
  Package,
  DollarSign,
  Calendar,
  ArrowLeft,
  X,
} from "lucide-react";
import {
  removeItemFromUserCart,
  clearUserCart,
  updateUserCartItemQuantity,
} from "../../app/actions/admin-cart";
import { showSuccessToast, showErrorToast } from "../../lib/toast-utils";
import { truncateText } from "../../lib/utils";

export default function AdminCartDetailsPageClient({ cart }) {
  const [isUpdating, setIsUpdating] = useState({});
  const [cartItems, setCartItems] = useState(cart.items);
  const [totalPrice, setTotalPrice] = useState(cart.totalPrice);
  const [totalItems, setTotalItems] = useState(cart.totalItems);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Check for modal parameter in URL
  useEffect(() => {
    const modal = searchParams.get("modal");
    if (modal === "true") {
      setShowModal(true);
    }
  }, [searchParams]);

  // Handle remove item from cart
  const handleRemoveItem = async (productId) => {
    const key = productId;
    setIsUpdating((prev) => ({ ...prev, [key]: true }));

    try {
      const result = await removeItemFromUserCart(cart.user._id, productId);
      if (result.success) {
        showSuccessToast("Item removed from cart successfully");
        // Update local state
        const updatedItems = cartItems.filter(
          (item) => item.product._id !== productId
        );
        setCartItems(updatedItems);
        updateTotals(updatedItems);
      } else {
        showErrorToast(result.error);
      }
    } catch (error) {
      showErrorToast("Failed to remove item from cart");
    } finally {
      setIsUpdating((prev) => ({ ...prev, [key]: false }));
    }
  };

  // Handle clear entire cart
  const handleClearCart = async () => {
    if (!confirm("Are you sure you want to clear this user's entire cart?")) {
      return;
    }

    setIsUpdating((prev) => ({ ...prev, clear: true }));

    try {
      const result = await clearUserCart(cart.user._id);
      if (result.success) {
        showSuccessToast("User cart cleared successfully");
        setCartItems([]);
        setTotalPrice(0);
        setTotalItems(0);
      } else {
        showErrorToast(result.error);
      }
    } catch (error) {
      showErrorToast("Failed to clear user cart");
    } finally {
      setIsUpdating((prev) => ({ ...prev, clear: false }));
    }
  };

  // Handle update quantity
  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    const key = productId;
    setIsUpdating((prev) => ({ ...prev, [key]: true }));

    try {
      const result = await updateUserCartItemQuantity(
        cart.user._id,
        productId,
        newQuantity
      );
      if (result.success) {
        showSuccessToast("Quantity updated successfully");
        // Update local state
        const updatedItems = cartItems.map((item) =>
          item.product._id === productId
            ? { ...item, quantity: newQuantity }
            : item
        );
        setCartItems(updatedItems);
        updateTotals(updatedItems);
      } else {
        showErrorToast(result.error);
      }
    } catch (error) {
      showErrorToast("Failed to update quantity");
    } finally {
      setIsUpdating((prev) => ({ ...prev, [key]: false }));
    }
  };

  // Update totals based on items
  const updateTotals = (items) => {
    const newTotalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const newTotalPrice = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalItems(newTotalItems);
    setTotalPrice(newTotalPrice);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    // Remove modal parameter from URL
    const params = new URLSearchParams(searchParams);
    params.delete("modal");
    const newUrl = params.toString()
      ? `?${params.toString()}`
      : window.location.pathname;
    router.replace(newUrl);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* User Info Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center">
              <User className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {cart.user.name}
              </h2>
              <p className="text-gray-600">{cart.user.email}</p>
              <p className="text-sm text-gray-500 capitalize">
                Role: {cart.user.role}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Last Updated</p>
            <p className="text-sm font-medium text-gray-900">
              {formatDate(cart.lastUpdated)}
            </p>
          </div>
        </div>
      </div>

      {/* Cart Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Products</p>
              <p className="text-2xl font-bold text-gray-900">
                {cartItems.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">
                ৳{totalPrice.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Cart Items</h3>
            <button
              onClick={handleClearCart}
              disabled={isUpdating.clear || cartItems.length === 0}
              className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {isUpdating.clear ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
              Clear Cart
            </button>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Cart is empty
            </h3>
            <p className="text-gray-600">
              This user has no items in their cart
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={
                        item.product.photos?.[0] || "/placeholder-product.jpg"
                      }
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {truncateText(item.product.name, 60)}
                    </h4>
                    <div className="text-sm text-gray-600 mt-1">
                      {item.selectedSize && (
                        <span>Size: {item.selectedSize}</span>
                      )}
                      {item.selectedSize && item.selectedColor && (
                        <span> • </span>
                      )}
                      {item.selectedColor && (
                        <span>Color: {item.selectedColor}</span>
                      )}
                    </div>
                    <div className="text-sm font-medium text-gray-900 mt-1">
                      ৳{item.price.toLocaleString()} each
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Added: {formatDate(item.addedAt)}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item.product._id,
                            item.quantity - 1
                          )
                        }
                        disabled={
                          isUpdating[item.product._id] || item.quantity <= 1
                        }
                        className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-3 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-lg min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item.product._id,
                            item.quantity + 1
                          )
                        }
                        disabled={isUpdating[item.product._id]}
                        className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-right min-w-[120px]">
                      <div className="text-lg font-semibold text-gray-900">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.product._id)}
                        disabled={isUpdating[item.product._id]}
                        className="mt-2 text-red-600 hover:text-red-900 text-sm disabled:opacity-50 transition-colors"
                      >
                        {isUpdating[item.product._id] ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Remove"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Back Button */}
      <div className="flex justify-start">
        <button
          onClick={() => router.push("/admin/carts")}
          className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to All Carts
        </button>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Cart Details - {cart.user.name}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {cart.user.email} • {totalItems} items • ৳
                {totalPrice.toLocaleString()}
              </p>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      <img
                        src={
                          item.product.photos?.[0] || "/placeholder-product.jpg"
                        }
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {truncateText(item.product.name, 50)}
                      </h4>
                      <div className="text-sm text-gray-600 mt-1">
                        {item.selectedSize && (
                          <span>Size: {item.selectedSize}</span>
                        )}
                        {item.selectedSize && item.selectedColor && (
                          <span> • </span>
                        )}
                        {item.selectedColor && (
                          <span>Color: {item.selectedColor}</span>
                        )}
                      </div>
                      <div className="text-sm font-medium text-gray-900 mt-1">
                        ৳{item.price.toLocaleString()} each
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item.product._id,
                            item.quantity - 1
                          )
                        }
                        disabled={
                          isUpdating[item.product._id] || item.quantity <= 1
                        }
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-3 py-1 text-sm font-medium text-gray-900 bg-gray-100 rounded">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item.product._id,
                            item.quantity + 1
                          )
                        }
                        disabled={isUpdating[item.product._id]}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.product._id)}
                        disabled={isUpdating[item.product._id]}
                        className="mt-1 text-red-600 hover:text-red-900 text-sm disabled:opacity-50"
                      >
                        {isUpdating[item.product._id] ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Remove"
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
