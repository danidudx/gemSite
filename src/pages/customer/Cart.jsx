import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useNotification } from "../../contexts/NotificationContext";
import { Trash2, Plus, Minus, ShoppingBag, MessageCircle } from "lucide-react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

export default function Cart() {
  const { cart, loading, updateCartItem, removeFromCart, clearCart } =
    useCart();
  const { showNotification } = useNotification();
  const [updatingItems, setUpdatingItems] = useState(new Set());

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      await handleRemoveItem(itemId);
      return;
    }

    setUpdatingItems((prev) => new Set(prev).add(itemId));
    try {
      await updateCartItem(itemId, newQuantity);
      showNotification("Cart updated successfully!", "success");
    } catch (error) {
      showNotification(
        error.response?.data?.message || "Failed to update cart item",
        "error"
      );
    } finally {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removeFromCart(itemId);
      showNotification("Item removed from cart!", "success");
    } catch (error) {
      showNotification(
        error.response?.data?.message || "Failed to remove item from cart",
        "error"
      );
    }
  };

  const handleClearCart = async () => {
    if (window.confirm("Are you sure you want to clear your entire cart?")) {
      try {
        await clearCart();
        showNotification("Cart cleared successfully!", "success");
      } catch (error) {
        showNotification(
          error.response?.data?.message || "Failed to clear cart",
          "error"
        );
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getImageUrl = (product) => {
    // Debug: Log the product structure to understand the API response
    console.log("Cart product structure:", product);
    console.log("Product image field:", product.image);
    console.log("Product images field:", product.images);

    // Cart API uses 'image' (singular), Products API uses 'images' (plural array)
    let imageUrl = null;

    if (product.image) {
      // Cart API structure
      imageUrl = product.image;
      console.log("Using cart API image:", imageUrl);
    } else if (product.images && product.images.length > 0) {
      // Products API structure
      imageUrl = product.images[0];
      console.log("Using products API image:", imageUrl);
    }

    if (imageUrl) {
      // Check if it's already a full URL
      if (imageUrl.startsWith("http")) {
        console.log("Using full URL:", imageUrl);
        return imageUrl;
      }
      // If it starts with /uploads, it's a server path
      if (imageUrl.startsWith("/uploads")) {
        const fullUrl = `http://localhost:5000${imageUrl}`;
        console.log("Using server path:", fullUrl);
        return fullUrl;
      }
      // If it's a relative path, prepend the server URL
      const fullUrl = `http://localhost:5000/${imageUrl}`;
      console.log("Using relative path:", fullUrl);
      return fullUrl;
    }

    console.log("No image found, using fallback");
    return ""; // Empty string for fallback
  };

  const handleInquireAndBuy = (product) => {
    showNotification(
      `Inquiry and buy request sent for ${product.name}`,
      "success"
    );
    // TODO: Implement inquire and buy functionality
  };

  if (loading && cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="content-with-header">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
              <div className="space-y-4">
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="content-with-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <ShoppingBag className="mr-3" />
              Shopping Cart
            </h1>
            {cart.items.length > 0 && (
              <button
                onClick={handleClearCart}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Clear Cart
              </button>
            )}
          </div>

          {cart.items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="mx-auto h-24 w-24 text-gray-300 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-8">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      {getImageUrl(item.product) ? (
                        <img
                          src={getImageUrl(item.product)}
                          alt={item.product.name}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400 text-sm">
                            No Image
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {item.product.name}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        Unit Price: {formatPrice(item.product.price)}
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        Total: {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        disabled={updatingItems.has(item.id)}
                        className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-12 text-center font-medium text-lg">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        disabled={updatingItems.has(item.id)}
                        className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col space-y-3 lg:space-y-2">
                      <button
                        onClick={() => handleInquireAndBuy(item.product)}
                        className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        <MessageCircle size={18} className="mr-2" />
                        Inquire and Buy
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="flex items-center justify-center px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} className="mr-2" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping Link */}
              <div className="text-center pt-6">
                <Link
                  to="/products"
                  className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ShoppingBag className="mr-2" size={20} />
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
