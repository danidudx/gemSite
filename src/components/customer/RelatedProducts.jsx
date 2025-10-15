import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import productService from "../../services/productService";

export default function RelatedProducts({ category, currentProductId }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRelatedProducts();
  }, [category, currentProductId]);

  const fetchRelatedProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getProducts({
        category,
        limit: 4,
      });

      // Filter out the current product
      const filtered = response.products.filter(
        (product) => product._id !== currentProductId
      );

      setRelatedProducts(filtered.slice(0, 3)); // Show max 3 related products
    } catch (error) {
      console.error("Error fetching related products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickView = (product) => {
    navigate(`/products/${product._id}`);
  };

  const handleAddToCart = (product) => {
    // This would typically add to cart
    console.log("Add to cart:", product);
  };

  const handleToggleFavorite = (productId, isFavorite) => {
    // This would typically toggle favorite
    console.log("Toggle favorite:", productId, isFavorite);
  };

  if (loading) {
    return (
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Related Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 rounded-2xl aspect-square mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Related Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onQuickView={handleQuickView}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}
