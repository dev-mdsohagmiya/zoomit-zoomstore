"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { getCart } from "../../app/actions/cart";
import { isAuthenticated } from "../auth-utils";

// Create cart context
const CartContext = createContext();

// Cart provider component
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [locallyAddedItems, setLocallyAddedItems] = useState(new Set());
  const [cacheKey, setCacheKey] = useState(0);

  // Get local cart from localStorage as fallback
  const getLocalCart = () => {
    if (typeof window === "undefined") return [];
    try {
      const localCart = localStorage.getItem("localCart");
      return localCart ? JSON.parse(localCart) : [];
    } catch (error) {
      console.error("Error reading local cart:", error);
      return [];
    }
  };

  // Save cart to localStorage as fallback
  const saveLocalCart = (items) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem("localCart", JSON.stringify(items));
    } catch (error) {
      console.error("Error saving local cart:", error);
    }
  };

  // Fetch cart data (optimized)
  const fetchCart = useCallback(async () => {
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
        // Save to local storage as backup
        saveLocalCart(result.data.items);
      } else {
        // If API fails, try to load from local storage
        console.warn("Cart API failed, trying local storage:", result.error);
        const localCart = getLocalCart();
        setCartItems(localCart);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      // Try to load from local storage as fallback
      const localCart = getLocalCart();
      setCartItems(localCart);
    } finally {
      if (isInitialLoad) {
        setIsLoading(false);
      }
    }
  }, [cartItems.length]);

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
    // Also add a temporary item to cartItems for navbar count
    setCartItems((prev) => {
      // Check if item already exists in cart
      const existingItem = prev.find(
        (item) => (item.product?._id || item.product?.id) === productId
      );

      if (existingItem) {
        // If item exists, increment quantity
        return prev.map((item) =>
          (item.product?._id || item.product?.id) === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If item doesn't exist, add a temporary item
        return [
          ...prev,
          {
            product: { _id: productId, id: productId },
            quantity: 1,
            price: 0, // Will be updated when real data comes from server
            selectedSize: null,
            selectedColor: null,
          },
        ];
      }
    });
  };

  // Remove item from local state
  const removeItemLocally = (productId) => {
    setLocallyAddedItems((prev) => {
      const newSet = new Set(prev);
      newSet.delete(productId);
      return newSet;
    });
    // Also remove from cartItems for navbar count
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => (item.product?._id || item.product?.id) === productId
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          // If quantity > 1, decrement quantity
          return prev.map((item) =>
            (item.product?._id || item.product?.id) === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        } else {
          // If quantity is 1, remove the item completely
          return prev.filter(
            (item) => (item.product?._id || item.product?.id) !== productId
          );
        }
      }
      return prev;
    });
  };

  // Clear local state (useful when cart is refreshed)
  const clearLocalState = () => {
    setLocallyAddedItems(new Set());
  };

  // Force refresh all cart state
  const forceRefreshCart = useCallback(() => {
    console.log("Force refreshing cart state");
    setCartItems([]);
    setLocallyAddedItems(new Set());
    setCacheKey((prev) => prev + 1); // Increment cache key to force re-renders
    if (typeof window !== "undefined") {
      localStorage.removeItem("localCart");
    }
    fetchCart();
  }, [fetchCart]);

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
  const refreshCart = useCallback(() => {
    // Only refresh if not already loading
    if (!isLoading) {
      fetchCart();
    }
  }, [isLoading, fetchCart]);

  // Load cart on mount
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Listen for cart cleared events
  useEffect(() => {
    const handleCartCleared = () => {
      console.log("Cart cleared event received, clearing all cart state");
      // Immediately clear local state
      setCartItems([]);
      setLocallyAddedItems(new Set());
      setCacheKey((prev) => prev + 1); // Increment cache key to force re-renders
      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("localCart");
      }
      // Then refresh from server to ensure consistency
      fetchCart();
    };

    const handleCartForceRefresh = () => {
      console.log("Cart force refresh event received");
      forceRefreshCart();
    };

    if (typeof window !== "undefined") {
      window.addEventListener("cartCleared", handleCartCleared);
      window.addEventListener("cartForceRefresh", handleCartForceRefresh);
      return () => {
        window.removeEventListener("cartCleared", handleCartCleared);
        window.removeEventListener("cartForceRefresh", handleCartForceRefresh);
      };
    }
  }, [fetchCart, forceRefreshCart]);

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
    forceRefreshCart,
    cacheKey,
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
