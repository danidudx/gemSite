const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem("authToken");

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // Product Management
  async getProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/products${queryString ? `?${queryString}` : ""}`);
  }

  async getProduct(id) {
    return this.request(`/products/${id}`);
  }

  async createProduct(productData) {
    return this.request("/products", {
      method: "POST",
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(id, productData) {
    return this.request(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(id) {
    return this.request(`/products/${id}`, {
      method: "DELETE",
    });
  }

  // Blog Management
  async getBlogs(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(
      `/content/blogs${queryString ? `?${queryString}` : ""}`
    );
  }

  async getBlog(id) {
    return this.request(`/content/blogs/${id}`);
  }

  async createBlog(blogData) {
    return this.request("/content/blogs", {
      method: "POST",
      body: JSON.stringify(blogData),
    });
  }

  async updateBlog(id, blogData) {
    return this.request(`/content/blogs/${id}`, {
      method: "PUT",
      body: JSON.stringify(blogData),
    });
  }

  async deleteBlog(id) {
    return this.request(`/content/blogs/${id}`, {
      method: "DELETE",
    });
  }

  // File Upload
  async uploadFile(file, type = "image") {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    return this.request("/upload", {
      method: "POST",
      headers: {}, // Let browser set Content-Type for FormData
      body: formData,
    });
  }
}

export default new ApiService();
