import api from "./api";

const productService = {
  async getProducts(params = {}) {
    return await api.getProducts(params);
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
    return await api.getProducts(params);
  },
};

export default productService;
