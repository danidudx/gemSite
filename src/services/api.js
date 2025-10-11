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
    console.log("API: Updating blog with ID:", id);
    console.log("API: Blog data being sent:", blogData);
    console.log("API: JSON stringified:", JSON.stringify(blogData));

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

  // Homepage Management
  async getHomepage() {
    return this.request("/homepage");
  }

  async updateHomepage(homepageData) {
    return this.request("/homepage", {
      method: "PUT",
      body: JSON.stringify(homepageData),
    });
  }

  // Dashboard Statistics
  async getDashboardStats() {
    try {
      const [productsResponse, blogsResponse, homepageResponse] =
        await Promise.all([
          this.getProducts({ limit: 1000 }), // Get all products for count
          this.getBlogs({ limit: 1000 }), // Get all blogs for count
          this.getHomepage().catch(() => ({
            featuredGems: [],
            featuredJewelry: [],
            collections: [],
            promotions: [],
          })), // Get homepage data
        ]);

      return {
        totalProducts:
          productsResponse.total ||
          productsResponse.totalProducts ||
          (productsResponse.products ? productsResponse.products.length : 0) ||
          (Array.isArray(productsResponse) ? productsResponse.length : 0),
        totalBlogs:
          blogsResponse.total ||
          blogsResponse.totalBlogs ||
          (blogsResponse.blogs ? blogsResponse.blogs.length : 0) ||
          (Array.isArray(blogsResponse) ? blogsResponse.length : 0),
        totalInquiries: 0, // Mock data for now
        totalFeaturedGems: homepageResponse.featuredGems
          ? homepageResponse.featuredGems.length
          : 0,
        totalFeaturedJewelry: homepageResponse.featuredJewelry
          ? homepageResponse.featuredJewelry.length
          : 0,
        totalCollections: homepageResponse.collections
          ? homepageResponse.collections.length
          : 0,
        totalPromotions: homepageResponse.promotions
          ? homepageResponse.promotions.length
          : 0,
        recentProducts: productsResponse.products || productsResponse || [],
        recentBlogs: blogsResponse.blogs || blogsResponse || [],
        recentInquiries: [],
        homepageData: homepageResponse,
      };
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
      throw error;
    }
  }
}

export default new ApiService();
