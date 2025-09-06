"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { getCart } from "../../app/actions/cart";
import { isAuthenticated } from "../auth-utils";

// Create cart context
const CartContext = createContext();

// Cart provider component
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [locallyAddedItems, setLocallyAddedItems] = useState(new Set());

  // Fetch cart data (optimized)
  const fetchCart = async () => {
    if (!isAuthenticated()) {
      setCartItems([]);
      return;
    }

    // Don't show loading for background refreshes
    const isInitialLoad = cartItems.length === 0;
    if (isInitialLoad) {
      setIsLoading(true);
    }

    try {
      const result = await getCart();
      if (result.success && result.data && result.data.items) {
        setCartItems(result.data.items);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCartItems([]);
    } finally {
      if (isInitialLoad) {
        setIsLoading(false);
      }
    }
  };

  // Check if product is in cart (including locally added items)
  const isProductInCart = (productId) => {
    // First check locally added items for immediate UI update
    if (locallyAddedItems.has(productId)) {
      return true;
    }

    // Then check actual cart items
    return cartItems.some((item) => {
      const itemProductId = item.product?._id || item.product?.id;
      return itemProductId === productId;
    });
  };

  // Update cart items
  const updateCartItems = (newCartItems) => {
    setCartItems(newCartItems || []);
  };

  // Add item to local state immediately
  const addItemLocally = (productId) => {
    setLocallyAddedItems((prev) => new Set([...prev, productId]));
  };

  // Remove item from local state
  const removeItemLocally = (productId) => {
    setLocallyAddedItems((prev) => {
      const newSet = new Set(prev);
      newSet.delete(productId);
      return newSet;
    });
  };

  // Clear local state (useful when cart is refreshed)
  const clearLocalState = () => {
    setLocallyAddedItems(new Set());
  };

  // Remove item from cart with immediate UI update
  const removeFromCartWithUI = async (productId) => {
    // Remove from local state immediately for instant UI update
    removeItemLocally(productId);

    // Import removeFromCart dynamically to avoid circular dependency
    const { removeFromCart } = await import("../../app/actions/cart");

    try {
      const result = await removeFromCart(productId);
      if (!result.success) {
        // If removal failed, add it back to local state
        addItemLocally(productId);
        throw new Error(result.error || "Failed to remove item from cart");
      }
      return result;
    } catch (error) {
      // If removal failed, add it back to local state
      addItemLocally(productId);
      throw error;
    }
  };

  // Refresh cart (debounced to prevent excessive calls)
  const refreshCart = () => {
    // Only refresh if not already loading
    if (!isLoading) {
      fetchCart();
    }
  };

  // Load cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  const value = {
    cartItems,
    isLoading,
    isProductInCart,
    updateCartItems,
    refreshCart,
    fetchCart,
    addItemLocally,
    removeItemLocally,
    clearLocalState,
    removeFromCartWithUI,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook to use cart context
export function useCartState() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartState must be used within a CartProvider");
  }
  return context;
}
