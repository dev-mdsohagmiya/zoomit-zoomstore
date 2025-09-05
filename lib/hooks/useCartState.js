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

  // Fetch cart data
  const fetchCart = async () => {
    if (!isAuthenticated()) {
      setCartItems([]);
      return;
    }

    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  // Check if product is in cart
  const isProductInCart = (productId) => {
    return cartItems.some((item) => {
      const itemProductId = item.product?._id || item.product?.id;
      return itemProductId === productId;
    });
  };

  // Update cart items
  const updateCartItems = (newCartItems) => {
    setCartItems(newCartItems || []);
  };

  // Refresh cart
  const refreshCart = () => {
    fetchCart();
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
