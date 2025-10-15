import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import StatCard from "../../components/admin/StatCard";
import api from "../../services/api";
import {
  populateSampleData,
  clearAllData,
  testAPI,
} from "../../utils/populateSampleData";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalBlogs: 0,
    totalInquiries: 0,
    totalFeaturedGems: 0,
    totalFeaturedJewelry: 0,
    totalCollections: 0,
    totalPromotions: 0,
    recentProducts: [],
    recentBlogs: [],
    recentInquiries: [],
    homepageData: {},
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [populating, setPopulating] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      console.log("Fetching dashboard data...");

      // Use the new dashboard stats method
      const statsData = await api.getDashboardStats();
      console.log("Dashboard stats:", statsData);

      setStats(statsData);
    } catch (err) {
      console.error("Dashboard data fetch error:", err);
      setError(err.message);

      // Set fallback data when API calls fail
      setStats({
        totalProducts: 0,
        totalBlogs: 0,
        totalInquiries: 0,
        totalFeaturedGems: 0,
        totalFeaturedJewelry: 0,
        totalCollections: 0,
        totalPromotions: 0,
        recentProducts: [],
        recentBlogs: [],
        recentInquiries: [],
        homepageData: {},
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePopulateSampleData = async () => {
    try {
      setPopulating(true);
      const result = await populateSampleData();

      // Check if any data was actually created
      const productsCreated = result.products.length;
      const blogsCreated = result.blogs.length;

      if (productsCreated === 0 && blogsCreated === 0) {
        alert("No data was created. Check the console for error details.");
        return;
      }

      // Refresh dashboard data
      await fetchDashboardData();
      alert(
        `Sample data created successfully!\n- Products: ${productsCreated}\n- Blogs: ${blogsCreated}`
      );
    } catch (error) {
      console.error("Error populating sample data:", error);
      alert("Error creating sample data: " + error.message);
    } finally {
      setPopulating(false);
    }
  };

  const handleClearAllData = async () => {
    if (
      window.confirm(
        "Are you sure you want to clear all data? This action cannot be undone."
      )
    ) {
      try {
        setClearing(true);
        await clearAllData();
        // Refresh dashboard data
        await fetchDashboardData();
        alert("All data cleared successfully!");
      } catch (error) {
        console.error("Error clearing data:", error);
        alert("Error clearing data: " + error.message);
      } finally {
        setClearing(false);
      }
    }
  };

  const handleTestAPI = async () => {
    try {
      setTesting(true);
      const success = await testAPI();
      if (success) {
        alert("API connectivity test passed! Check console for details.");
      } else {
        alert("API connectivity test failed! Check console for details.");
      }
    } catch (error) {
      console.error("Error testing API:", error);
      alert("Error testing API: " + error.message);
    } finally {
      setTesting(false);
    }
  };

  const formatPrice = (price) => {
    if (typeof price !== "number" || isNaN(price)) {
      return "N/A";
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const normalizeBlogData = (blog) => {
    return {
      ...blog,
      id: blog.id || blog._id,
      _id: blog._id || blog.id,
      publishedAt:
        blog.publishedAt || blog.createdAt || new Date().toISOString(),
      featuredImage: blog.featuredImage
        ? blog.featuredImage.startsWith("http")
          ? blog.featuredImage
          : `http://localhost:5000${blog.featuredImage}`
        : "",
      views: blog.views || 0,
      tags: Array.isArray(blog.tags)
        ? blog.tags
        : blog.tags
        ? blog.tags.split(",").map((tag) => tag.trim())
        : [],
    };
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return "N/A";
    }
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading dashboard...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Welcome to your admin dashboard. Here's an overview of your site.
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={fetchDashboardData}
              disabled={loading}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <svg
                className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              {loading ? "Refreshing..." : "Refresh"}
            </button>
            <button
              onClick={handleTestAPI}
              disabled={testing}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-yellow-600 border border-transparent rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50"
            >
              <svg
                className={`w-4 h-4 mr-2 ${testing ? "animate-spin" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {testing ? "Testing..." : "Test API"}
            </button>
            <button
              onClick={handlePopulateSampleData}
              disabled={populating}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
            >
              <svg
                className={`w-4 h-4 mr-2 ${populating ? "animate-spin" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              {populating ? "Creating..." : "Create Sample Data"}
            </button>
            <button
              onClick={handleClearAllData}
              disabled={clearing}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
            >
              <svg
                className={`w-4 h-4 mr-2 ${clearing ? "animate-spin" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              {clearing ? "Clearing..." : "Clear All Data"}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Total Products"
            value={stats.totalProducts}
            icon="💎"
            color="blue"
            link="/admin/products"
          />
          <StatCard
            title="Total Blog Posts"
            value={stats.totalBlogs}
            icon="📝"
            color="green"
            link="/admin/blogs"
          />
          <StatCard
            title="Total Inquiries"
            value={stats.totalInquiries}
            icon="📧"
            color="purple"
            link="/admin/inquiries"
          />
        </div>

        {/* Homepage Content Stats */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Homepage Content
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Manage featured content on your homepage
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-xl">💎</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Featured Gems</h4>
                  <p className="text-2xl font-bold text-blue-600">
                    {stats.totalFeaturedGems}
                  </p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-green-50 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-xl">💍</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Featured Jewelry
                  </h4>
                  <p className="text-2xl font-bold text-green-600">
                    {stats.totalFeaturedJewelry}
                  </p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-xl">📚</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Collections</h4>
                  <p className="text-2xl font-bold text-purple-600">
                    {stats.totalCollections}
                  </p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-orange-50 rounded-lg">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-xl">🎯</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Promotions</h4>
                  <p className="text-2xl font-bold text-orange-600">
                    {stats.totalPromotions}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/admin/homepage"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Manage Homepage Content
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Products */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Recent Products
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    (Last 5)
                  </span>
                </h3>
                <Link
                  to="/admin/products"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  View all
                </Link>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {stats.recentProducts.length > 0 ? (
                stats.recentProducts.slice(0, 5).map((product, index) => (
                  <div
                    key={product._id || product.id || `product-${index}`}
                    className="px-6 py-4"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center relative">
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
                              alt=""
                              className="w-12 h-12 object-cover rounded-lg absolute inset-0"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          ) : null;
                        })()}
                        <span className="text-2xl">
                          {product.type === "gem" ? "💎" : "💍"}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {product.name || "Unnamed Product"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {product.category || "No Category"} •{" "}
                          {formatPrice(product.price)}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(product.createdAt)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-8 text-center text-gray-500">
                  No products yet
                </div>
              )}
            </div>
          </div>

          {/* Recent Blogs */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Recent Blog Posts
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    (Last 5)
                  </span>
                </h3>
                <Link
                  to="/admin/blogs"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  View all
                </Link>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {stats.recentBlogs.length > 0 ? (
                stats.recentBlogs.slice(0, 5).map((blog, index) => {
                  const normalizedBlog = normalizeBlogData(blog);
                  return (
                    <div
                      key={normalizedBlog.id || `blog-${index}`}
                      className="px-6 py-4"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          {normalizedBlog.featuredImage ? (
                            <img
                              src={normalizedBlog.featuredImage}
                              alt={normalizedBlog.title || "Blog post"}
                              className="w-12 h-12 object-cover rounded-lg"
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "block";
                              }}
                            />
                          ) : null}
                          <span
                            className="text-gray-400"
                            style={{
                              display: normalizedBlog.featuredImage
                                ? "none"
                                : "block",
                            }}
                          >
                            📷
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {normalizedBlog.title || "Untitled Blog Post"}
                          </p>
                          <p className="text-sm text-gray-500">
                            by {normalizedBlog.author || "Unknown Author"}
                          </p>
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatDate(normalizedBlog.publishedAt)}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="px-6 py-8 text-center text-gray-500">
                  No blog posts yet
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                to="/admin/products"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-xl">💎</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Manage Products</h4>
                  <p className="text-sm text-gray-500">
                    Add, edit, or delete products
                  </p>
                </div>
              </Link>

              <Link
                to="/admin/blogs"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-xl">📝</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Manage Blogs</h4>
                  <p className="text-sm text-gray-500">
                    Create and edit blog posts
                  </p>
                </div>
              </Link>

              <Link
                to="/admin/homepage"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-xl">🏠</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Homepage Content
                  </h4>
                  <p className="text-sm text-gray-500">
                    Manage featured content
                  </p>
                </div>
              </Link>

              <Link
                to="/admin/inquiries"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-xl">📧</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">View Inquiries</h4>
                  <p className="text-sm text-gray-500">
                    Check customer inquiries
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
