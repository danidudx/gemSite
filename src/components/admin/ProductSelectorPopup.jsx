import { useState, useEffect } from "react";
import api from "../../services/api";

const ProductSelectorPopup = ({
  isOpen,
  onClose,
  onSelect,
  selectedProducts = [],
  title = "Select Products",
  multiple = true,
  productType = null, // 'gem' or 'jewelry'
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedIds, setSelectedIds] = useState(
    new Set(selectedProducts.map((p) => p.id || p._id))
  );

  useEffect(() => {
    if (isOpen) {
      fetchProducts();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIds(new Set(selectedProducts.map((p) => p.id || p._id)));
  }, [selectedProducts]);

  useEffect(() => {
    const searchProducts = async () => {
      if (searchTerm.trim()) {
        try {
          setLoading(true);
          const params = {
            limit: 1000,
            search: searchTerm,
            ...(productType && { type: productType }),
          };
          const response = await api.getProducts(params);
          const productsList = response.products || response || [];
          setFilteredProducts(productsList);
        } catch (error) {
          console.error("Failed to search products:", error);
          setFilteredProducts([]);
        } finally {
          setLoading(false);
        }
      } else {
        setFilteredProducts(products);
      }
    };

    const timeoutId = setTimeout(searchProducts, 300); // Debounce search
    return () => clearTimeout(timeoutId);
  }, [searchTerm, productType]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {
        limit: 1000,
        ...(productType && { type: productType }),
      };
      const response = await api.getProducts(params);
      const productsList = response.products || response || [];
      setProducts(productsList);
      setFilteredProducts(productsList);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductSelect = (product) => {
    const productId = product.id || product._id;

    if (multiple) {
      const newSelectedIds = new Set(selectedIds);
      if (newSelectedIds.has(productId)) {
        newSelectedIds.delete(productId);
      } else {
        newSelectedIds.add(productId);
      }
      setSelectedIds(newSelectedIds);
    } else {
      setSelectedIds(new Set([productId]));
    }
  };

  const handleConfirm = () => {
    const selectedProductsList = products.filter((product) =>
      selectedIds.has(product.id || product._id)
    );
    onSelect(selectedProductsList);
    onClose();
  };

  const handleClear = () => {
    setSelectedIds(new Set());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 flex-1 overflow-hidden flex flex-col">
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder={`Search ${
                  productType === "gem"
                    ? "gems"
                    : productType === "jewelry"
                    ? "jewelry"
                    : "products"
                } by name, description, or category...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="absolute right-3 top-2.5 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {selectedIds.size > 0 && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-900">
                  {selectedIds.size} product{selectedIds.size !== 1 ? "s" : ""}{" "}
                  selected
                </span>
                <button
                  onClick={handleClear}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {searchTerm
                  ? "No products found matching your search."
                  : "No products available."}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => {
                  const productId = product.id || product._id;
                  const isSelected = selectedIds.has(productId);

                  return (
                    <div
                      key={productId}
                      onClick={() => handleProductSelect(product)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        isSelected
                          ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                          : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                          {(() => {
                            const hasValidImage =
                              product.images &&
                              product.images.length > 0 &&
                              product.images[0] &&
                              product.images[0].trim() !== "" &&
                              !product.images[0].includes("undefined") &&
                              !product.images[0].includes("null");

                            return hasValidImage ? (
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-16 h-16 object-cover rounded-lg"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                  e.target.nextSibling.style.display = "inline";
                                }}
                              />
                            ) : null;
                          })()}
                          <span className="text-3xl">
                            {product.type === "gem" ? "💎" : "💍"}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {product.name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm font-semibold text-gray-900">
                              ${product.price?.toLocaleString() || "N/A"}
                            </span>
                            <span className="text-xs text-gray-500">
                              {product.category}
                            </span>
                          </div>
                          {product.specifications && (
                            <div className="mt-1 text-xs text-gray-400">
                              {product.specifications.color && (
                                <span className="mr-2">
                                  Color: {product.specifications.color}
                                </span>
                              )}
                              {product.specifications.carat && (
                                <span className="mr-2">
                                  {product.specifications.carat}ct
                                </span>
                              )}
                              {product.specifications.cut && (
                                <span>{product.specifications.cut}</span>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="flex-shrink-0">
                          {isSelected && (
                            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                              <svg
                                className="w-3 h-3 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={selectedIds.size === 0}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {multiple
              ? `Select ${selectedIds.size} Product${
                  selectedIds.size !== 1 ? "s" : ""
                }`
              : "Select Product"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSelectorPopup;
