import { createContext, useContext, useState, useEffect } from "react";
import { cartService } from "../services/cartService";
import { useNotification } from "./NotificationContext";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    items: [],
    totalItems: 0,
    estimatedTotal: 0,
  });
  const [loading, setLoading] = useState(false);

  // Fetch cart data
  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await cartService.getCart();
      setCart(response);
    } catch (error) {
      console.error("Error fetching cart:", error);
      // Don't show error notification for cart fetch failures
    } finally {
      setLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      setLoading(true);
      await cartService.addToCart(productId, quantity);
      await fetchCart(); // Refresh cart data
      // Note: Notifications will be handled by the components using this context
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error; // Let the component handle the error notification
    } finally {
      setLoading(false);
    }
  };

  // Update cart item quantity
  const updateCartItem = async (itemId, quantity) => {
    try {
      setLoading(true);
      await cartService.updateCartItem(itemId, quantity);
      await fetchCart(); // Refresh cart data
    } catch (error) {
      console.error("Error updating cart item:", error);
      throw error; // Let the component handle the error notification
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    try {
      setLoading(true);
      await cartService.removeFromCart(itemId);
      await fetchCart(); // Refresh cart data
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw error; // Let the component handle the error notification
    } finally {
      setLoading(false);
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    try {
      setLoading(true);
      await cartService.clearCart();
      await fetchCart(); // Refresh cart data
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw error; // Let the component handle the error notification
    } finally {
      setLoading(false);
    }
  };

  // Load cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  const value = {
    cart,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
