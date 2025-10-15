import { useState } from "react";
import { ZoomIn, RotateCcw } from "lucide-react";

export default function ImageGallery({
  images = [],
  image360,
  selectedImage = 0,
  onImageSelect,
  onToggle360,
  showImage360 = false,
}) {
  const [isZoomed, setIsZoomed] = useState(false);

  const getImageUrl = (image) => {
    if (image.startsWith("http")) {
      return image;
    }
    return `http://localhost:5000${image}`;
  };

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative group">
        <div className="aspect-square bg-white rounded-lg overflow-hidden border border-gray-200">
          {showImage360 && image360 ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <RotateCcw size={48} className="mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">360° View</p>
                <p className="text-sm text-gray-400">
                  Interactive view coming soon
                </p>
              </div>
            </div>
          ) : (
            <img
              src={getImageUrl(images[selectedImage])}
              alt={`Product view ${selectedImage + 1}`}
              className={`w-full h-full object-cover transition-transform duration-300 ${
                isZoomed ? "scale-150" : "group-hover:scale-105"
              }`}
              onClick={handleImageClick}
            />
          )}
        </div>

        {/* Zoom indicator */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-black bg-opacity-50 text-white p-2 rounded-full">
            <ZoomIn size={20} />
          </div>
        </div>

        {/* 360° View Toggle */}
        {image360 && (
          <button
            onClick={onToggle360}
            className={`absolute top-4 left-4 px-3 py-2 rounded-full text-sm font-medium transition-colors ${
              showImage360
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <RotateCcw size={16} className="inline mr-1" />
            360°
          </button>
        )}
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => onImageSelect(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                selectedImage === index
                  ? "border-blue-600"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <img
                src={getImageUrl(image)}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={getImageUrl(images[selectedImage])}
              alt={`Product view ${selectedImage + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
