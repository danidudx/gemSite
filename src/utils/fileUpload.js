// File upload utility for backend storage
export const uploadFileToBackend = async (file, type = "image") => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);

  try {
    const response = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const result = await response.json();
    return {
      url: result.url,
      fileName: result.fileName,
      fileInfo: {
        name: result.fileName,
        originalName: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
      },
    };
  } catch (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }
};

// Fallback: File upload utility for local storage (temporary)
export const uploadFileToLocal = async (file, type = "image") => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const base64 = e.target.result;
      const fileExtension = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}.${fileExtension}`;

      // Create a local URL for the file
      const localUrl = URL.createObjectURL(file);

      // Store file info for potential future use
      const fileInfo = {
        name: fileName,
        originalName: file.name,
        size: file.size,
        type: file.type,
        localUrl: localUrl,
        base64: base64,
        uploadedAt: new Date().toISOString(),
      };

      resolve({
        url: localUrl,
        fileName: fileName,
        fileInfo: fileInfo,
      });
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsDataURL(file);
  });
};

// Validate file types
export const validateFileType = (file, allowedTypes) => {
  const fileType = file.type;
  return allowedTypes.some((type) => fileType.startsWith(type));
};

// Validate file size
export const validateFileSize = (file, maxSizeInMB) => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return file.size <= maxSizeInBytes;
};

// Get file type category
export const getFileTypeCategory = (file) => {
  if (file.type.startsWith("image/")) return "image";
  if (file.type.startsWith("video/")) return "video";
  if (file.type === "application/pdf") return "pdf";
  if (file.type.startsWith("text/")) return "text";
  return "other";
};

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Validate file with comprehensive checks
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
