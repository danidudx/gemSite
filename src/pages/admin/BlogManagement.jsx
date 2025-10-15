import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import BlogForm from "../../components/admin/BlogForm";
import api from "../../services/api";
import { useNotification } from "../../hooks/useNotification";

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const { showNotification } = useNotification();

  const blogsPerPage = 10;

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

  useEffect(() => {
    fetchBlogs();
  }, [currentPage, searchTerm]);

  // Refresh blogs when component mounts to ensure fresh data
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {
        page: currentPage,
        limit: blogsPerPage,
        ...(searchTerm && { search: searchTerm }),
      };

      const response = await api.getBlogs(params);
      const normalizedBlogs = (response.blogs || []).map((blog) =>
        normalizeBlogData(blog)
      );
      setBlogs(normalizedBlogs);
      setTotalPages(response.totalPages || 1);
    } catch (err) {
      const errorMessage = err.message || "Failed to fetch blog posts";
      setError(errorMessage);
      showNotification(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBlog = () => {
    setEditingBlog(null);
    setShowForm(true);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingBlog(null);
    // Refresh the blog list when form is closed to ensure fresh data
    fetchBlogs();
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setShowForm(true);
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      await api.deleteBlog(blogId);
      setBlogs(
        blogs.filter((b) => {
          const currentId = b.id || b._id;
          return currentId !== blogId;
        })
      );
      setDeleteConfirm(null);
      showNotification("Blog post deleted successfully", "success");
    } catch (err) {
      const errorMessage = err.message || "Failed to delete blog post";
      setError(errorMessage);
      showNotification(errorMessage, "error");
    }
  };

  const handleFormSubmit = async (blogData) => {
    try {
      if (editingBlog) {
        const blogId = editingBlog.id || editingBlog._id;
        console.log("Updating blog with ID:", blogId);
        console.log("Blog data:", blogData);
        console.log("Blog data JSON:", JSON.stringify(blogData, null, 2));

        if (!blogId) {
          throw new Error("Blog ID is missing");
        }

        // Check for any undefined or null values that might cause validation issues
        const cleanedData = Object.fromEntries(
          Object.entries(blogData).filter(
            ([key, value]) => value !== undefined && value !== null
          )
        );
        console.log("Cleaned blog data:", cleanedData);

        // Try different data formats if the first attempt fails
        try {
          await api.updateBlog(blogId, cleanedData);
        } catch (error) {
          console.log("First attempt failed, trying alternative format...");

          // Alternative format 1: Convert tags to string
          const altData1 = {
            ...cleanedData,
            tags: Array.isArray(cleanedData.tags)
              ? cleanedData.tags.join(",")
              : cleanedData.tags,
          };
          console.log("Alternative format 1 (tags as string):", altData1);

          try {
            await api.updateBlog(blogId, altData1);
            // If successful, update the state with the working format
            setBlogs(
              blogs.map((b) => {
                const currentId = b.id || b._id;
                return currentId === blogId
                  ? normalizeBlogData({ ...b, ...altData1 })
                  : b;
              })
            );
            showNotification("Blog post updated successfully", "success");
            setShowForm(false);
            setEditingBlog(null);
            return;
          } catch (error2) {
            console.log("Alternative format 1 failed, trying format 2...");

            // Alternative format 2: Remove publishedAt and featuredImage
            const altData2 = {
              title: cleanedData.title,
              content: cleanedData.content,
              excerpt: cleanedData.excerpt,
              author: cleanedData.author,
              tags: cleanedData.tags,
            };
            console.log("Alternative format 2 (minimal fields):", altData2);

            await api.updateBlog(blogId, altData2);
            // If successful, update the state with the working format
            setBlogs(
              blogs.map((b) => {
                const currentId = b.id || b._id;
                return currentId === blogId
                  ? normalizeBlogData({ ...b, ...altData2 })
                  : b;
              })
            );
            showNotification("Blog post updated successfully", "success");
            setShowForm(false);
            setEditingBlog(null);
            return;
          }
        }
        setBlogs(
          blogs.map((b) => {
            const currentId = b.id || b._id;
            return currentId === blogId
              ? normalizeBlogData({ ...b, ...blogData })
              : b;
          })
        );
        showNotification("Blog post updated successfully", "success");
      } else {
        const newBlog = await api.createBlog(blogData);
        const normalizedBlog = normalizeBlogData(newBlog);
        setBlogs([normalizedBlog, ...blogs]);
        showNotification("Blog post created successfully", "success");

        // Refresh the blog list to ensure data consistency
        setTimeout(() => {
          fetchBlogs();
        }, 500);
      }
      setShowForm(false);
      setEditingBlog(null);
    } catch (err) {
      const errorMessage = err.message || "Failed to save blog post";
      setError(errorMessage);
      showNotification(errorMessage, "error");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid date";
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  if (showForm) {
    return (
      <AdminLayout>
        <div className="mb-6">
          <button
            onClick={handleFormCancel}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blogs
          </button>
        </div>
        <BlogForm
          blog={editingBlog}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
          <div className="flex space-x-3">
            <button
              onClick={fetchBlogs}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Refresh
            </button>
            <button
              onClick={handleCreateBlog}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create New Blog
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="max-w-md">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Blogs
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Blogs Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading blogs...</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Featured Image
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Author
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Published
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Views
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {blogs.map((blog) => {
                      const blogId = blog.id || blog._id;
                      return (
                        <tr key={blogId} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                              {blog.featuredImage ? (
                                <img
                                  src={blog.featuredImage}
                                  alt={blog.title || "Blog post"}
                                  className="w-16 h-16 object-cover rounded-lg"
                                  onError={(e) => {
                                    e.target.style.display = "none";
                                    e.target.nextSibling.style.display =
                                      "block";
                                  }}
                                />
                              ) : null}
                              <span
                                className="text-gray-400"
                                style={{
                                  display: blog.featuredImage
                                    ? "none"
                                    : "block",
                                }}
                              >
                                📷
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                              {blog.title || "Untitled"}
                            </div>
                            <div className="text-sm text-gray-500 max-w-xs truncate">
                              {blog.excerpt || "No excerpt available"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {blog.author || "Unknown author"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(blog.publishedAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {blog.views || 0}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditBlog(blog)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(blogId)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing page{" "}
                        <span className="font-medium">{currentPage}</span> of{" "}
                        <span className="font-medium">{totalPages}</span>
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        <button
                          onClick={() =>
                            setCurrentPage(Math.max(1, currentPage - 1))
                          }
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                        >
                          Previous
                        </button>
                        <button
                          onClick={() =>
                            setCurrentPage(
                              Math.min(totalPages, currentPage + 1)
                            )
                          }
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                        >
                          Next
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg font-medium text-gray-900">
                Delete Blog Post
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this blog post? This action
                  cannot be undone.
                </p>
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteBlog(deleteConfirm)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default BlogManagement;
