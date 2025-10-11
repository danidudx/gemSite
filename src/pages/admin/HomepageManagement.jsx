import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { useNotification } from "../../hooks/useNotification";
import api from "../../services/api";

const HomepageManagement = () => {
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [homepageData, setHomepageData] = useState({
    featuredGems: [],
    featuredJewelry: [],
    collections: [],
    promotions: [],
  });

  // Separate state for editing featured items
  const [editingFeaturedGems, setEditingFeaturedGems] = useState("");
  const [editingFeaturedJewelry, setEditingFeaturedJewelry] = useState("");

  // Form states for each section
  const [newCollection, setNewCollection] = useState({
    name: "",
    description: "",
    image: "",
    link: "",
    products: [],
  });

  const [newPromotion, setNewPromotion] = useState({
    title: "",
    description: "",
    image: "",
    link: "",
    isActive: true,
  });

  useEffect(() => {
    fetchHomepageData();
  }, []);

  const fetchHomepageData = async () => {
    try {
      setLoading(true);
      const data = await api.getHomepage();
      setHomepageData(data);

      // Set editing states for featured items (convert objects to IDs)
      setEditingFeaturedGems(
        data.featuredGems?.map((item) => item.id || item._id).join(", ") || ""
      );
      setEditingFeaturedJewelry(
        data.featuredJewelry?.map((item) => item.id || item._id).join(", ") ||
          ""
      );
    } catch (err) {
      console.error("Failed to fetch homepage data:", err);
      setError(err.message);
      showNotification("Failed to load homepage data", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveHomepage = async () => {
    try {
      setSaving(true);

      // Prepare data for saving - convert featured items back to IDs
      const dataToSave = {
        ...homepageData,
        featuredGems: editingFeaturedGems
          .split(",")
          .map((id) => id.trim())
          .filter((id) => id),
        featuredJewelry: editingFeaturedJewelry
          .split(",")
          .map((id) => id.trim())
          .filter((id) => id),
      };

      await api.updateHomepage(dataToSave);
      showNotification("Homepage content updated successfully", "success");
    } catch (err) {
      console.error("Failed to update homepage:", err);
      setError(err.message);
      showNotification("Failed to update homepage content", "error");
    } finally {
      setSaving(false);
    }
  };

  const addCollection = () => {
    if (newCollection.name && newCollection.description) {
      setHomepageData((prev) => ({
        ...prev,
        collections: [
          ...prev.collections,
          { ...newCollection, id: Date.now().toString() },
        ],
      }));
      setNewCollection({
        name: "",
        description: "",
        image: "",
        link: "",
        products: [],
      });
      showNotification("Collection added", "success");
    }
  };

  const removeCollection = (index) => {
    setHomepageData((prev) => ({
      ...prev,
      collections: prev.collections.filter((_, i) => i !== index),
    }));
    showNotification("Collection removed", "success");
  };

  const addPromotion = () => {
    if (newPromotion.title && newPromotion.description) {
      setHomepageData((prev) => ({
        ...prev,
        promotions: [
          ...prev.promotions,
          { ...newPromotion, id: Date.now().toString() },
        ],
      }));
      setNewPromotion({
        title: "",
        description: "",
        image: "",
        link: "",
        isActive: true,
      });
      showNotification("Promotion added", "success");
    }
  };

  const removePromotion = (index) => {
    setHomepageData((prev) => ({
      ...prev,
      promotions: prev.promotions.filter((_, i) => i !== index),
    }));
    showNotification("Promotion removed", "success");
  };

  const updateCollection = (index, field, value) => {
    setHomepageData((prev) => ({
      ...prev,
      collections: prev.collections.map((collection, i) =>
        i === index ? { ...collection, [field]: value } : collection
      ),
    }));
  };

  const updatePromotion = (index, field, value) => {
    setHomepageData((prev) => ({
      ...prev,
      promotions: prev.promotions.map((promotion, i) =>
        i === index ? { ...promotion, [field]: value } : promotion
      ),
    }));
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading homepage content...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Homepage Management
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage featured content, collections, and promotions on your
              homepage.
            </p>
          </div>
          <button
            onClick={handleSaveHomepage}
            disabled={saving}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <svg
              className={`w-4 h-4 mr-2 ${saving ? "animate-spin" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Featured Gems Section */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Featured Gems</h3>
            <p className="mt-1 text-sm text-gray-500">
              Select gems to feature on the homepage (Product IDs)
            </p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="Enter product IDs (comma-separated)"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editingFeaturedGems}
                  onChange={(e) => setEditingFeaturedGems(e.target.value)}
                />
              </div>
              <div className="text-sm text-gray-500">
                Current featured gems:{" "}
                {
                  editingFeaturedGems.split(",").filter((id) => id.trim())
                    .length
                }
              </div>

              {/* Display current featured gems */}
              {homepageData.featuredGems &&
                homepageData.featuredGems.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Current Featured Gems:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {homepageData.featuredGems.map((gem, index) => (
                        <div
                          key={gem.id || gem._id || index}
                          className="p-3 border border-gray-200 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                              {gem.image ? (
                                <img
                                  src={gem.image}
                                  alt={gem.name}
                                  className="w-12 h-12 object-cover rounded-lg"
                                />
                              ) : (
                                <span className="text-gray-400">💎</span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {gem.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                ${gem.price?.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>

        {/* Featured Jewelry Section */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Featured Jewelry
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Select jewelry items to feature on the homepage (Product IDs)
            </p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="Enter product IDs (comma-separated)"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editingFeaturedJewelry}
                  onChange={(e) => setEditingFeaturedJewelry(e.target.value)}
                />
              </div>
              <div className="text-sm text-gray-500">
                Current featured jewelry:{" "}
                {
                  editingFeaturedJewelry.split(",").filter((id) => id.trim())
                    .length
                }
              </div>

              {/* Display current featured jewelry */}
              {homepageData.featuredJewelry &&
                homepageData.featuredJewelry.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Current Featured Jewelry:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {homepageData.featuredJewelry.map((jewelry, index) => (
                        <div
                          key={jewelry.id || jewelry._id || index}
                          className="p-3 border border-gray-200 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                              {jewelry.image ? (
                                <img
                                  src={jewelry.image}
                                  alt={jewelry.name}
                                  className="w-12 h-12 object-cover rounded-lg"
                                />
                              ) : (
                                <span className="text-gray-400">💍</span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {jewelry.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                ${jewelry.price?.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>

        {/* Collections Section */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Collections</h3>
            <p className="mt-1 text-sm text-gray-500">
              Manage product collections displayed on the homepage
            </p>
          </div>
          <div className="p-6">
            {/* Add New Collection Form */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-md font-medium text-gray-900 mb-4">
                Add New Collection
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Collection Name
                  </label>
                  <input
                    type="text"
                    value={newCollection.name}
                    onChange={(e) =>
                      setNewCollection((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Diamond Collection"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={newCollection.image}
                    onChange={(e) =>
                      setNewCollection((prev) => ({
                        ...prev,
                        image: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/collection.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newCollection.description}
                    onChange={(e) =>
                      setNewCollection((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="2"
                    placeholder="Our finest diamond pieces"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Link
                  </label>
                  <input
                    type="text"
                    value={newCollection.link}
                    onChange={(e) =>
                      setNewCollection((prev) => ({
                        ...prev,
                        link: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="/collections/diamonds"
                  />
                </div>
              </div>
              <button
                onClick={addCollection}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Add Collection
              </button>
            </div>

            {/* Existing Collections */}
            <div className="space-y-4">
              {homepageData.collections.map((collection, index) => (
                <div
                  key={collection.id || index}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-gray-900">
                      {collection.name}
                    </h5>
                    <button
                      onClick={() => removeCollection(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={collection.name}
                        onChange={(e) =>
                          updateCollection(index, "name", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image URL
                      </label>
                      <input
                        type="url"
                        value={collection.image}
                        onChange={(e) =>
                          updateCollection(index, "image", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={collection.description}
                        onChange={(e) =>
                          updateCollection(index, "description", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Link
                      </label>
                      <input
                        type="text"
                        value={collection.link}
                        onChange={(e) =>
                          updateCollection(index, "link", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Promotions Section */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Promotions</h3>
            <p className="mt-1 text-sm text-gray-500">
              Manage promotional content displayed on the homepage
            </p>
          </div>
          <div className="p-6">
            {/* Add New Promotion Form */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-md font-medium text-gray-900 mb-4">
                Add New Promotion
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Promotion Title
                  </label>
                  <input
                    type="text"
                    value={newPromotion.title}
                    onChange={(e) =>
                      setNewPromotion((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Summer Sale"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={newPromotion.image}
                    onChange={(e) =>
                      setNewPromotion((prev) => ({
                        ...prev,
                        image: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/promo.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newPromotion.description}
                    onChange={(e) =>
                      setNewPromotion((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="2"
                    placeholder="Up to 50% off on selected items"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Link
                  </label>
                  <input
                    type="text"
                    value={newPromotion.link}
                    onChange={(e) =>
                      setNewPromotion((prev) => ({
                        ...prev,
                        link: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="/sale"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={newPromotion.isActive}
                    onChange={(e) =>
                      setNewPromotion((prev) => ({
                        ...prev,
                        isActive: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="isActive"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Active
                  </label>
                </div>
              </div>
              <button
                onClick={addPromotion}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Add Promotion
              </button>
            </div>

            {/* Existing Promotions */}
            <div className="space-y-4">
              {homepageData.promotions.map((promotion, index) => (
                <div
                  key={promotion.id || index}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-gray-900">
                      {promotion.title}
                    </h5>
                    <button
                      onClick={() => removePromotion(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={promotion.title}
                        onChange={(e) =>
                          updatePromotion(index, "title", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image URL
                      </label>
                      <input
                        type="url"
                        value={promotion.image}
                        onChange={(e) =>
                          updatePromotion(index, "image", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={promotion.description}
                        onChange={(e) =>
                          updatePromotion(index, "description", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Link
                      </label>
                      <input
                        type="text"
                        value={promotion.link}
                        onChange={(e) =>
                          updatePromotion(index, "link", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`isActive-${index}`}
                        checked={promotion.isActive}
                        onChange={(e) =>
                          updatePromotion(index, "isActive", e.target.checked)
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`isActive-${index}`}
                        className="ml-2 block text-sm text-gray-900"
                      >
                        Active
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default HomepageManagement;
