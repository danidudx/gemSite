import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import StatCard from "../../components/admin/StatCard";
import api from "../../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalBlogs: 0,
    totalInquiries: 0,
    recentProducts: [],
    recentBlogs: [],
    recentInquiries: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch products
      const productsResponse = await api.getProducts({ limit: 5 });

      // Fetch blogs
      const blogsResponse = await api.getBlogs({ limit: 5 });

      // Mock data for inquiries (replace with actual API call)
      const inquiriesResponse = { inquiries: [] };

      setStats({
        totalProducts: productsResponse.total || 0,
        totalBlogs: blogsResponse.total || 0,
        totalInquiries: inquiriesResponse.total || 0,
        recentProducts: productsResponse.products || [],
        recentBlogs: blogsResponse.blogs || [],
        recentInquiries: inquiriesResponse.inquiries || [],
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome to your admin dashboard. Here's an overview of your site.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Products */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Recent Products
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
                stats.recentProducts.map((product) => (
                  <div key={product.id} className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                        ) : (
                          <span className="text-gray-400">📷</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {product.category} • {formatPrice(product.price)}
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
                stats.recentBlogs.map((blog) => (
                  <div key={blog.id} className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        {blog.featuredImage ? (
                          <img
                            src={blog.featuredImage}
                            alt={blog.title}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                        ) : (
                          <span className="text-gray-400">📷</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {blog.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          by {blog.author}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(blog.publishedAt || blog.createdAt)}
                      </div>
                    </div>
                  </div>
                ))
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
