import api from "./api";

const productService = {
  async getProducts(params = {}) {
    try {
      const response = await api.getProducts(params);

      // Ensure the response has the expected structure
      if (response && typeof response === "object") {
        return {
          products: response.products || response.data || [],
          pagination: response.pagination || {
            total: response.total || 0,
            page: response.page || 1,
            pages: response.pages || 1,
          },
          searchSuggestions: response.searchSuggestions || {
            gemTypes: [],
            categories: [],
            colors: [],
          },
        };
      }

      // Fallback for unexpected response structure
      return {
        products: Array.isArray(response) ? response : [],
        pagination: { total: 0, page: 1, pages: 1 },
        searchSuggestions: { gemTypes: [], categories: [], colors: [] },
      };
    } catch (error) {
      console.error("Error in productService.getProducts:", error);
      throw error;
    }
  },

  async getProduct(id) {
    return await api.getProduct(id);
  },

  async createProduct(productData) {
    return await api.createProduct(productData);
  },

  async updateProduct(id, productData) {
    return await api.updateProduct(id, productData);
  },

  async deleteProduct(id) {
    return await api.deleteProduct(id);
  },

  async searchProducts(query, filters = {}) {
    const params = {
      search: query,
      ...filters,
    };
    return await this.getProducts(params);
  },

  // Helper method to get filter options
  async getFilterOptions() {
    try {
      const response = await this.getProducts({ limit: 1000 });
      const products = response.products || [];

      // Extract unique values for filters
      const categories = [
        ...new Set(products.map((p) => p.category).filter(Boolean)),
      ];
      const colors = [
        ...new Set(
          products.map((p) => p.specifications?.color).filter(Boolean)
        ),
      ];
      const shapes = [
        ...new Set(
          products.map((p) => p.specifications?.shape).filter(Boolean)
        ),
      ];
      const cuts = [
        ...new Set(products.map((p) => p.specifications?.cut).filter(Boolean)),
      ];
      const clarities = [
        ...new Set(
          products.map((p) => p.specifications?.clarity).filter(Boolean)
        ),
      ];
      const origins = [
        ...new Set(
          products.map((p) => p.specifications?.origin).filter(Boolean)
        ),
      ];
      const certifications = [
        ...new Set(
          products.map((p) => p.specifications?.certification).filter(Boolean)
        ),
      ];
      const rarities = [
        ...new Set(products.map((p) => p.rarity).filter(Boolean)),
      ];

      return {
        categories,
        colors,
        shapes,
        cuts,
        clarities,
        origins,
        certifications,
        rarities,
      };
    } catch (error) {
      console.error("Error getting filter options:", error);
      return {
        categories: [],
        colors: [],
        shapes: [],
        cuts: [],
        clarities: [],
        origins: [],
        certifications: [],
        rarities: [],
      };
    }
  },
};

export default productService;
