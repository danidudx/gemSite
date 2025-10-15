import { Eye, Star, Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { useNotification } from "../../contexts/NotificationContext";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  product,
  onQuickView,
  onToggleFavorite,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart } = useCart();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    onToggleFavorite?.(product._id, !isFavorite);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    onQuickView?.(product);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    setIsAddingToCart(true);
    try {
      await addToCart(product._id, 1);
      showNotification("Item added to cart successfully!", "success");
    } catch (error) {
      console.error("Error adding to cart:", error);
      showNotification(
        error.response?.data?.message || "Failed to add item to cart",
        "error"
      );
    } finally {
      setIsAddingToCart(false);
    }
  };

  const getImageUrl = () => {
    if (product.images && product.images.length > 0) {
      return product.images[0].startsWith("http")
        ? product.images[0]
        : `http://localhost:5000${product.images[0]}`;
    }
    return "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop";
  };

  const getRarityColor = (rarity) => {
    switch (rarity?.toLowerCase()) {
      case "common":
        return "from-gray-400 to-gray-500";
      case "premium":
        return "from-blue-400 to-blue-500";
      case "rare":
        return "from-purple-400 to-purple-500";
      case "very rare":
        return "from-red-400 to-red-500";
      default:
        return "from-gray-400 to-gray-500";
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

  return (
    <div
      className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-2 bg-white"
      style={{
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        border: "1px solid #e5e7eb",
      }}
    >
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={getImageUrl()}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.availability === "in_stock" && (
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-green-400 to-green-500 text-white shadow-lg backdrop-blur-sm">
              IN STOCK
            </span>
          )}
          {product.rarity && (
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${getRarityColor(
                product.rarity
              )} text-white shadow-lg backdrop-blur-sm`}
            >
              {product.rarity.toUpperCase()}
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteToggle}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
        >
          <Heart
            size={20}
            className={`transition-colors ${
              isFavorite ? "text-red-500 fill-red-500" : "text-gray-600"
            }`}
          />
        </button>

        {/* Quick View Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleQuickView}
            className="px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 bg-white/90 backdrop-blur-md text-gray-800 border border-white/20 hover:bg-white hover:text-black"
          >
            <Eye size={20} className="inline-block mr-2" />
            Quick View
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="mb-2">
          <span className="text-sm text-gray-500 uppercase tracking-wide">
            {product.category}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Specifications */}
        {product.specifications && (
          <div className="mb-4 space-y-1">
            {product.specifications.carat && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Carat:</span>
                <span className="font-medium">
                  {product.specifications.carat}ct
                </span>
              </div>
            )}
            {product.specifications.color && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Color:</span>
                <span className="font-medium">
                  {product.specifications.color}
                </span>
              </div>
            )}
            {product.specifications.cut && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Cut:</span>
                <span className="font-medium">
                  {product.specifications.cut}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isAddingToCart ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Adding...
              </>
            ) : (
              <>
                <ShoppingCart size={16} className="mr-2" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border-blue-500"></div>
    </div>
  );
}
