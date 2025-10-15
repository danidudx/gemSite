import api from "./api";

export const cartService = {
  // Get user's cart
  getCart: async () => {
    try {
      return await api.getCart();
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw error;
    }
  },

  // Add item to cart
  addToCart: async (productId, quantity = 1) => {
    try {
      return await api.addToCart(productId, quantity);
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  },

  // Update cart item quantity
  updateCartItem: async (itemId, quantity) => {
    try {
      return await api.updateCartItem(itemId, quantity);
    } catch (error) {
      console.error("Error updating cart item:", error);
      throw error;
    }
  },

  // Remove item from cart
  removeFromCart: async (itemId) => {
    try {
      return await api.removeFromCart(itemId);
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw error;
    }
  },

  // Clear entire cart
  clearCart: async () => {
    try {
      return await api.clearCart();
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw error;
    }
  },
};

export default cartService;
