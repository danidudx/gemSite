// Form validation utilities
export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === "string" && value.trim() === "")) {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return null;
};

export const validateNumber = (value, fieldName, min = null, max = null) => {
  if (!value && value !== 0) return `${fieldName} is required`;
  const num = parseFloat(value);
  if (isNaN(num)) return `${fieldName} must be a valid number`;
  if (min !== null && num < min) return `${fieldName} must be at least ${min}`;
  if (max !== null && num > max) return `${fieldName} must be at most ${max}`;
  return null;
};

export const validateMinLength = (value, minLength, fieldName) => {
  if (!value) return `${fieldName} is required`;
  if (value.length < minLength)
    return `${fieldName} must be at least ${minLength} characters`;
  return null;
};

export const validateMaxLength = (value, maxLength, fieldName) => {
  if (value && value.length > maxLength)
    return `${fieldName} must be no more than ${maxLength} characters`;
  return null;
};

export const validateUrl = (url, fieldName) => {
  if (!url) return null; // Optional field
  try {
    new URL(url);
    return null;
  } catch {
    return `${fieldName} must be a valid URL`;
  }
};

export const validateFile = (file, options = {}) => {
  const {
    maxSize = 10, // MB
    allowedTypes = ["image/jpeg", "image/png", "image/gif"],
    fieldName = "File",
  } = options;

  if (!file) return null; // Optional field

  // Check file size
  const maxSizeInBytes = maxSize * 1024 * 1024;
  if (file.size > maxSizeInBytes) {
    return `${fieldName} must be smaller than ${maxSize}MB`;
  }

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    const allowedExtensions = allowedTypes
      .map((type) => type.split("/")[1])
      .join(", ");
    return `${fieldName} must be one of: ${allowedExtensions}`;
  }

  return null;
};

// Validate product form
export const validateProductForm = (formData) => {
  const errors = {};

  // Required fields
  const requiredFields = [
    "name",
    "type",
    "category",
    "price",
    "description",
    "availability",
  ];

  requiredFields.forEach((field) => {
    const error = validateRequired(
      formData[field],
      field.charAt(0).toUpperCase() + field.slice(1)
    );
    if (error) errors[field] = error;
  });

  // Validate price
  const priceError = validateNumber(formData.price, "Price", 0);
  if (priceError) errors.price = priceError;

  // Validate specifications based on type
  if (formData.type === "gem") {
    const gemSpecs = [
      "color",
      "carat",
      "cut",
      "clarity",
      "origin",
      "certification",
    ];
    gemSpecs.forEach((spec) => {
      if (formData.specifications[spec]) {
        const error = validateRequired(
          formData.specifications[spec],
          spec.charAt(0).toUpperCase() + spec.slice(1)
        );
        if (error) errors[`specifications.${spec}`] = error;
      }
    });

    // Validate carat as number
    if (formData.specifications.carat) {
      const caratError = validateNumber(
        formData.specifications.carat,
        "Carat",
        0
      );
      if (caratError) errors["specifications.carat"] = caratError;
    }
  }

  return errors;
};

// Validate blog form
export const validateBlogForm = (formData) => {
  const errors = {};

  // Required fields
  const requiredFields = ["title", "content", "excerpt", "author"];

  requiredFields.forEach((field) => {
    const error = validateRequired(
      formData[field],
      field.charAt(0).toUpperCase() + field.slice(1)
    );
    if (error) errors[field] = error;
  });

  // Validate title length
  const titleError = validateMinLength(formData.title, 3, "Title");
  if (titleError) errors.title = titleError;

  // Validate content length
  const contentError = validateMinLength(formData.content, 10, "Content");
  if (contentError) errors.content = contentError;

  return errors;
};
