import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import FilterSidebar from "../../components/customer/FilterSidebar";
import ProductGrid from "../../components/customer/ProductGrid";
import Pagination from "../../components/customer/Pagination";
import SearchBar from "../../components/common/SearchBar";
import { Filter, X, Search } from "lucide-react";
import productService from "../../services/productService";
import { useNotification } from "../../hooks/useNotification";

export default function Products() {
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  // State management
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchSuggestions, setSearchSuggestions] = useState({});
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pages: 1,
  });

  // Filter state
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    color: "",
    shape: "",
    carat: "",
    cut: "",
    clarity: "",
    origin: "",
    certification: "",
    minPrice: "",
    maxPrice: "",
    availability: "",
    rarity: "",
    search: "",
  });

  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(true); // Show sidebar by default on desktop
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch products with current filters
  const fetchProducts = useCallback(
    async (page = 1, searchTerm = "") => {
      try {
        setLoading(true);

        const params = {
          page,
          limit: 20,
          ...filters,
          search: searchTerm || filters.search,
          sort: sortBy,
        };

        // Remove empty values
        Object.keys(params).forEach((key) => {
          if (
            params[key] === "" ||
            params[key] === null ||
            params[key] === undefined
          ) {
            delete params[key];
          }
        });

        const response = await productService.getProducts(params);

        setProducts(response.products || []);
        setPagination(response.pagination || { total: 0, page: 1, pages: 1 });
        setSearchSuggestions(response.searchSuggestions || {});
      } catch (error) {
        console.error("Error fetching products:", error);
        showNotification("Failed to load products", "error");
      } finally {
        setLoading(false);
      }
    },
    [filters, sortBy, showNotification]
  );

  // Initial load
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    if (key === "clearAll") {
      setFilters({
        type: "",
        category: "",
        color: "",
        shape: "",
        carat: "",
        cut: "",
        clarity: "",
        origin: "",
        certification: "",
        minPrice: "",
        maxPrice: "",
        availability: "",
        rarity: "",
        search: "",
      });
      setSearchQuery("");
    } else {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    setFilters((prev) => ({
      ...prev,
      search: query,
    }));
    fetchProducts(1, query);
  };

  // Handle pagination
  const handlePageChange = (page) => {
    fetchProducts(page, searchQuery);
  };

  // Handle sorting
  const handleSortChange = (sortValue) => {
    setSortBy(sortValue);
  };

  // Handle view mode change
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  // Handle product actions
  const handleQuickView = (product) => {
    navigate(`/products/${product._id}`);
  };

  const handleToggleFavorite = (productId, isFavorite) => {
    showNotification(
      isFavorite ? "Added to favorites" : "Removed from favorites",
      "success"
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex content-with-header">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Filter Sidebar */}
        <div
          className={`fixed lg:static inset-y-0 left-0 z-50 lg:z-auto ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          } transition-transform duration-300`}
          style={{ minHeight: "100vh" }}
        >
          {/* Debug indicator */}
          <div className="bg-red-500 text-white p-2 text-xs">
            Sidebar Debug: {sidebarOpen ? "Open" : "Closed"}
          </div>
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            searchSuggestions={searchSuggestions}
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Search and Filter Bar */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              {/* Mobile filter button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Filter size={20} />
                Filters
              </button>

              {/* Search Bar */}
              <div className="flex-1 max-w-md">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onSearch={handleSearch}
                  placeholder="Search products..."
                />
              </div>

              {/* Results count */}
              <div className="text-sm text-gray-600">
                {pagination.total} products found
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <ProductGrid
            products={products}
            loading={loading}
            onQuickView={handleQuickView}
            onToggleFavorite={handleToggleFavorite}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
          />

          {/* Pagination */}
          <div className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.pages}
                onPageChange={handlePageChange}
                totalItems={pagination.total}
                itemsPerPage={20}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
