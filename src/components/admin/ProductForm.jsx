import { useState, useEffect } from "react";
import { useNotification } from "../../hooks/useNotification";
import { uploadFileToBackend, validateFile } from "../../utils/fileUpload";
import {
  validateProductForm as validateForm,
  validateRequired,
  validateNumber,
  validateUrl,
} from "../../utils/formValidation";

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "gem",
    category: "",
    price: "",
    images: [],
    image360: "",
    description: "",
    specifications: {
      color: "",
      carat: "",
      cut: "",
      clarity: "",
      origin: "",
      certification: "",
      shape: "",
      metalType: "",
      setting: "",
      gemstone: "",
    },
    availability: "in_stock",
    rarity: "",
    guides: "",
    certificateUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [image360File, setImage360File] = useState(null);
  const [certificateFile, setCertificateFile] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [uploadingImages, setUploadingImages] = useState(false);
  const { showNotification } = useNotification();

  // Helper function to format image URLs
  const formatImageUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) {
      return url;
    } else if (url.startsWith("/")) {
      return `http://localhost:5000${url}`;
    } else {
      return `http://localhost:5000/${url}`;
    }
  };

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        price: product.price?.toString() || "",
        carat: product.specifications?.carat?.toString() || "",
        specifications: {
          ...formData.specifications,
          ...product.specifications,
        },
      });

      // Set preview images for existing product images
      if (product.images && product.images.length > 0) {
        const imageUrls = product.images.map((img) => formatImageUrl(img));
        setPreviewImages(imageUrls);
      }

      // Set 360° image preview for existing product
      if (product.image360) {
        const image360Url = formatImageUrl(product.image360);
        setImage360File(image360Url);
      }
    }
  }, [product]);

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
      if (image360File) URL.revokeObjectURL(image360File);
    };
  }, [previewImages, image360File]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear validation error for this field when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSpecificationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [name]: value,
      },
    }));

    // Clear validation error for this specification field
    const specErrorKey = `specifications.${name}`;
    if (validationErrors[specErrorKey]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[specErrorKey];
        return newErrors;
      });
    }
  };

  const handleImageUpload = async (files) => {
    try {
      setUploadingImages(true);

      // Create immediate preview URLs for all files
      const localUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );

      // Add local previews immediately
      setPreviewImages((prev) => [...prev, ...localUrls]);

      const uploadPromises = Array.from(files).map(async (file) => {
        // Validate file
        const fileError = validateFile(file, {
          maxSize: 10,
          allowedTypes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
          fieldName: "Image",
        });

        if (fileError) {
          throw new Error(fileError);
        }

        return uploadFileToBackend(file, "image");
      });

      const uploadedImages = await Promise.all(uploadPromises);
      const newImageUrls = uploadedImages.map((img) => formatImageUrl(img.url));

      // Update form data with uploaded URLs
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImageUrls],
      }));

      // Replace local preview URLs with server URLs
      setPreviewImages((prev) => {
        const startIndex = prev.length - files.length;
        const beforeNewImages = prev.slice(0, startIndex);
        return [...beforeNewImages, ...newImageUrls];
      });

      // Clean up local blob URLs
      localUrls.forEach((url) => URL.revokeObjectURL(url));

      showNotification("Images uploaded successfully", "success");
    } catch (err) {
      const errorMessage = err.message || "Failed to upload images";
      setError(errorMessage);
      showNotification(errorMessage, "error");

      // Remove the failed preview images
      setPreviewImages((prev) => prev.slice(0, -files.length));
    } finally {
      setUploadingImages(false);
    }
  };

  const handleImage360Upload = async (file) => {
    try {
      setLoading(true);

      // Create immediate preview URL
      const localUrl = URL.createObjectURL(file);
      setImage360File(localUrl);

      // Validate file
      const fileError = validateFile(file, {
        maxSize: 10,
        allowedTypes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
        fieldName: "360° Image",
      });

      if (fileError) {
        throw new Error(fileError);
      }

      const result = await uploadFileToBackend(file, "image");
      const formattedUrl = formatImageUrl(result.url);
      setFormData((prev) => ({
        ...prev,
        image360: formattedUrl,
      }));
      showNotification("360° image uploaded successfully", "success");
    } catch (err) {
      const errorMessage = err.message || "Failed to upload 360° image";
      setError(errorMessage);
      showNotification(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCertificateUpload = async (file) => {
    try {
      setLoading(true);

      // Validate file
      const fileError = validateFile(file, {
        maxSize: 5,
        allowedTypes: ["application/pdf"],
        fieldName: "Certificate",
      });

      if (fileError) {
        throw new Error(fileError);
      }

      const result = await uploadFileToBackend(file, "pdf");
      setFormData((prev) => ({
        ...prev,
        certificateUrl: result.url,
      }));
      showNotification("Certificate uploaded successfully", "success");
    } catch (err) {
      const errorMessage = err.message || "Failed to upload certificate";
      setError(errorMessage);
      showNotification(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index) => {
    // Remove from both formData.images and previewImages
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));

    // Revoke the object URL if it's a local preview
    const imageToRemove = previewImages[index];
    if (imageToRemove && imageToRemove.startsWith("blob:")) {
      URL.revokeObjectURL(imageToRemove);
    }

    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Real-time validation functions
  const validateField = (name, value, specifications = null) => {
    const errors = {};

    if (name === "price") {
      const priceError = validateNumber(value, "Price", 0);
      if (priceError) errors.price = priceError;
    } else if (
      name === "name" ||
      name === "category" ||
      name === "description"
    ) {
      const error = validateRequired(
        value,
        name.charAt(0).toUpperCase() + name.slice(1)
      );
      if (error) errors[name] = error;
    } else if (name === "type") {
      const error = validateRequired(value, "Type");
      if (error) errors.type = error;
    } else if (name === "availability") {
      const error = validateRequired(value, "Availability");
      if (error) errors.availability = error;
    } else if (name === "certificateUrl" && value) {
      const error = validateUrl(value, "Certificate URL");
      if (error) errors.certificateUrl = error;
    } else if (specifications && name.startsWith("specifications.")) {
      const specName = name.replace("specifications.", "");
      if (specName === "carat" && value) {
        const error = validateNumber(value, "Carat", 0);
        if (error) errors[`specifications.${specName}`] = error;
      } else if (value) {
        const error = validateRequired(
          value,
          specName.charAt(0).toUpperCase() + specName.slice(1)
        );
        if (error) errors[`specifications.${specName}`] = error;
      }
    }

    return errors;
  };

  // Helper function to get field validation status
  const getFieldStatus = (fieldName) => {
    if (validationErrors[fieldName]) {
      return "error";
    }
    const value = fieldName.startsWith("specifications.")
      ? formData.specifications[fieldName.replace("specifications.", "")]
      : formData[fieldName];

    if (value && value.toString().trim() !== "") {
      return "success";
    }
    return "neutral";
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const errors = validateField(name, value, formData.specifications);

    if (Object.keys(errors).length > 0) {
      setValidationErrors((prev) => ({ ...prev, ...errors }));
    }
  };

  const handleSpecificationBlur = (e) => {
    const { name, value } = e.target;
    const errors = validateField(
      `specifications.${name}`,
      value,
      formData.specifications
    );

    if (Object.keys(errors).length > 0) {
      setValidationErrors((prev) => ({ ...prev, ...errors }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setValidationErrors({});

    // Validate form
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setLoading(false);
      showNotification("Please fix the validation errors", "error");
      return;
    }

    try {
      const submitData = {
        ...formData,
        price: parseFloat(formData.price),
        specifications: {
          ...formData.specifications,
          carat: formData.specifications.carat
            ? parseFloat(formData.specifications.carat)
            : undefined,
        },
      };

      await onSubmit(submitData);
      showNotification(
        product
          ? "Product updated successfully"
          : "Product created successfully",
        "success"
      );
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "An error occurred";
      setError(errorMessage);
      showNotification(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const isGem = formData.type === "gem";
  const isJewelry = formData.type === "jewelry";

  // Check if form has any validation errors
  const hasValidationErrors = Object.keys(validationErrors).length > 0;

  // Check if required fields are filled
  const isFormValid =
    formData.name &&
    formData.type &&
    formData.category &&
    formData.price &&
    formData.description &&
    formData.availability;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {product ? "Edit Product" : "Create New Product"}
            </h2>
            {hasValidationErrors && (
              <div className="flex items-center text-red-600 text-sm">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Please fix validation errors
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  validationErrors.name
                    ? "border-red-300 focus:ring-red-500"
                    : getFieldStatus("name") === "success"
                    ? "border-green-300 focus:ring-green-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {validationErrors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {validationErrors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  validationErrors.type
                    ? "border-red-300 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              >
                <option value="gem">Gem</option>
                <option value="jewelry">Jewelry</option>
              </select>
              {validationErrors.type && (
                <p className="mt-1 text-sm text-red-600">
                  {validationErrors.type}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  validationErrors.category
                    ? "border-red-300 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {validationErrors.category && (
                <p className="mt-1 text-sm text-red-600">
                  {validationErrors.category}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                min="0"
                step="0.01"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  validationErrors.price
                    ? "border-red-300 focus:ring-red-500"
                    : getFieldStatus("price") === "success"
                    ? "border-green-300 focus:ring-green-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {validationErrors.price && (
                <p className="mt-1 text-sm text-red-600">
                  {validationErrors.price}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Availability *
              </label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  validationErrors.availability
                    ? "border-red-300 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              >
                <option value="in_stock">In Stock</option>
                <option value="out_of_stock">Out of Stock</option>
                <option value="sold">Sold</option>
              </select>
              {validationErrors.availability && (
                <p className="mt-1 text-sm text-red-600">
                  {validationErrors.availability}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rarity
              </label>
              <input
                type="text"
                name="rarity"
                value={formData.rarity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Images
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {uploadingImages ? (
                  <>
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-sm text-gray-600">Uploading images...</p>
                  </>
                ) : (
                  <>
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>Upload images</span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e.target.files)}
                          className="sr-only"
                          disabled={uploadingImages}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB each
                    </p>
                  </>
                )}
              </div>
            </div>

            {previewImages.length > 0 && (
              <div className="mt-4 grid grid-cols-4 gap-4">
                {previewImages.map((image, index) => (
                  <div key={`image-${index}`} className="relative">
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-gray-300"
                      onError={(e) => {
                        console.error(
                          `Failed to load image at index ${index}:`,
                          image
                        );
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div
                      className="w-full h-24 bg-gray-200 rounded-lg border border-gray-300 items-center justify-center text-gray-500 text-sm"
                      style={{ display: "none" }}
                    >
                      Failed to load
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 360° Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              360° View Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>Upload 360° image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImage360Upload(e.target.files[0])}
                      className="sr-only"
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>

            {(formData.image360 || image360File) && (
              <div className="mt-4">
                <div className="relative inline-block">
                  <img
                    src={formData.image360 || image360File}
                    alt="360° view"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, image360: "" }));
                      setImage360File(null);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
              rows={4}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                validationErrors.description
                  ? "border-red-300 focus:ring-red-500"
                  : getFieldStatus("description") === "success"
                  ? "border-green-300 focus:ring-green-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {validationErrors.description && (
              <p className="mt-1 text-sm text-red-600">
                {validationErrors.description}
              </p>
            )}
          </div>

          {/* Specifications */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Specifications
            </h3>

            {isGem && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Color
                  </label>
                  <input
                    type="text"
                    name="color"
                    value={formData.specifications.color}
                    onChange={handleSpecificationChange}
                    onBlur={handleSpecificationBlur}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      validationErrors["specifications.color"]
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {validationErrors["specifications.color"] && (
                    <p className="mt-1 text-sm text-red-600">
                      {validationErrors["specifications.color"]}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Carat
                  </label>
                  <input
                    type="number"
                    name="carat"
                    value={formData.specifications.carat}
                    onChange={handleSpecificationChange}
                    onBlur={handleSpecificationBlur}
                    step="0.01"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      validationErrors["specifications.carat"]
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {validationErrors["specifications.carat"] && (
                    <p className="mt-1 text-sm text-red-600">
                      {validationErrors["specifications.carat"]}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cut
                  </label>
                  <input
                    type="text"
                    name="cut"
                    value={formData.specifications.cut}
                    onChange={handleSpecificationChange}
                    onBlur={handleSpecificationBlur}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      validationErrors["specifications.cut"]
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {validationErrors["specifications.cut"] && (
                    <p className="mt-1 text-sm text-red-600">
                      {validationErrors["specifications.cut"]}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Clarity
                  </label>
                  <input
                    type="text"
                    name="clarity"
                    value={formData.specifications.clarity}
                    onChange={handleSpecificationChange}
                    onBlur={handleSpecificationBlur}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      validationErrors["specifications.clarity"]
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {validationErrors["specifications.clarity"] && (
                    <p className="mt-1 text-sm text-red-600">
                      {validationErrors["specifications.clarity"]}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Origin
                  </label>
                  <input
                    type="text"
                    name="origin"
                    value={formData.specifications.origin}
                    onChange={handleSpecificationChange}
                    onBlur={handleSpecificationBlur}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      validationErrors["specifications.origin"]
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {validationErrors["specifications.origin"] && (
                    <p className="mt-1 text-sm text-red-600">
                      {validationErrors["specifications.origin"]}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Certification
                  </label>
                  <input
                    type="text"
                    name="certification"
                    value={formData.specifications.certification}
                    onChange={handleSpecificationChange}
                    onBlur={handleSpecificationBlur}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      validationErrors["specifications.certification"]
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {validationErrors["specifications.certification"] && (
                    <p className="mt-1 text-sm text-red-600">
                      {validationErrors["specifications.certification"]}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Shape
                  </label>
                  <input
                    type="text"
                    name="shape"
                    value={formData.specifications.shape}
                    onChange={handleSpecificationChange}
                    onBlur={handleSpecificationBlur}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      validationErrors["specifications.shape"]
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {validationErrors["specifications.shape"] && (
                    <p className="mt-1 text-sm text-red-600">
                      {validationErrors["specifications.shape"]}
                    </p>
                  )}
                </div>
              </div>
            )}

            {isJewelry && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Metal Type
                  </label>
                  <input
                    type="text"
                    name="metalType"
                    value={formData.specifications.metalType}
                    onChange={handleSpecificationChange}
                    onBlur={handleSpecificationBlur}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      validationErrors["specifications.metalType"]
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {validationErrors["specifications.metalType"] && (
                    <p className="mt-1 text-sm text-red-600">
                      {validationErrors["specifications.metalType"]}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Setting
                  </label>
                  <input
                    type="text"
                    name="setting"
                    value={formData.specifications.setting}
                    onChange={handleSpecificationChange}
                    onBlur={handleSpecificationBlur}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      validationErrors["specifications.setting"]
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {validationErrors["specifications.setting"] && (
                    <p className="mt-1 text-sm text-red-600">
                      {validationErrors["specifications.setting"]}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gemstone
                  </label>
                  <input
                    type="text"
                    name="gemstone"
                    value={formData.specifications.gemstone}
                    onChange={handleSpecificationChange}
                    onBlur={handleSpecificationBlur}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      validationErrors["specifications.gemstone"]
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {validationErrors["specifications.gemstone"] && (
                    <p className="mt-1 text-sm text-red-600">
                      {validationErrors["specifications.gemstone"]}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Guides */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Guides
            </label>
            <textarea
              name="guides"
              value={formData.guides}
              onChange={handleInputChange}
              onBlur={handleBlur}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Certificate Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Certificate (PDF)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>Upload certificate</span>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) =>
                        handleCertificateUpload(e.target.files[0])
                      }
                      className="sr-only"
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">PDF up to 10MB</p>
              </div>
            </div>

            {formData.certificateUrl && (
              <div className="mt-4">
                <a
                  href={formData.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  View Certificate
                </a>
              </div>
            )}
            {validationErrors.certificateUrl && (
              <p className="mt-1 text-sm text-red-600">
                {validationErrors.certificateUrl}
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || hasValidationErrors}
              className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 ${
                hasValidationErrors
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
              } disabled:opacity-50`}
            >
              {loading
                ? "Saving..."
                : hasValidationErrors
                ? "Fix errors to continue"
                : product
                ? "Update Product"
                : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
