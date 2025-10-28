import { useState } from 'react';

const sampleProducts = [
  {
    id: 1,
    name: "Medium Hoop Earrings",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    category: "BEST SELLERS, EARRINGS, GIFTS SET",
    price: 200.00,
    originalPrice: null,
    badge: "SOLD OUT",
    badgeColor: "red"
  },
  {
    id: 2,
    name: "Golden Stack Ring",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1596944924616-7b3840a4d1b8?w=400&h=400&fit=crop",
    category: "RINGS",
    price: 210.00,
    originalPrice: 420.00,
    badge: "50% OFF",
    badgeColor: "red"
  },
  {
    id: 3,
    name: "Textured Chunky Necklace",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    category: "NECKLACES",
    price: 410.00,
    originalPrice: null,
    badge: "BACK IN STOCK",
    badgeColor: "green"
  },
  {
    id: 4,
    name: "Beaded Bracelet",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1596944924616-7b3840a4d1b8?w=400&h=400&fit=crop",
    category: "BRACELETS",
    price: 150.00,
    originalPrice: null,
    badge: null,
    badgeColor: null
  },
  {
    id: 5,
    name: "Hammered Hoop Earrings",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    category: "EARRINGS",
    price: 180.00,
    originalPrice: null,
    badge: "NEW",
    badgeColor: "green"
  },
  {
    id: 6,
    name: "Gemstone Statement Ring",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
    category: "RINGS",
    price: 350.00,
    originalPrice: 700.00,
    badge: "50% OFF",
    badgeColor: "red"
  }
];

export default function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  
  const categories = ['ALL', 'BRACELETS', 'EARRINGS', 'NECKLACES', 'RINGS'];

  const getBadgeStyles = (badgeColor) => {
    switch (badgeColor) {
      case 'red':
        return 'bg-red-500 text-white';
      case 'green':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-gray-900 mb-6 tracking-wider">
            Featured Products
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed tracking-wide">
            Discover our exquisite collection of handcrafted jewelry, featuring the finest materials and timeless designs.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex justify-center items-center mb-12">
          <div className="flex items-center space-x-1">
            {categories.map((category, index) => (
              <div key={category} className="flex items-center">
              <button
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-sm font-medium uppercase tracking-wide transition-colors ${
                    activeCategory === category 
                      ? 'text-gray-900 font-semibold' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {category}
              </button>
                {index < categories.length - 1 && (
                  <div className="w-px h-4 bg-gray-300 mx-2"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleProducts.map((product) => (
            <div key={product.id} className="bg-gray-50 rounded-lg overflow-hidden group hover:shadow-lg transition-shadow duration-300">
              {/* Product Image Container */}
              <div className="relative aspect-square bg-gray-100 overflow-hidden group">
                {/* Main Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                />
                
                {/* Hover Image */}
                <img
                  src={product.hoverImage}
                  alt={`${product.name} - Alternative view`}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                
                {/* Badge */}
                {product.badge && (
                  <div className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-medium uppercase tracking-wide z-10 ${getBadgeStyles(product.badgeColor)}`}>
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Category */}
                <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">
                  {product.category}
                </div>
                
                {/* Product Name */}
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  {product.name}
                </h3>
                
                {/* Price */}
                <div className="flex items-center space-x-2">
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {product.originalPrice.toFixed(2)}$
                    </span>
                  )}
                  <span className="text-lg font-medium text-gray-900">
                    {product.price.toFixed(2)}$
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 border border-gray-300 text-gray-700 font-medium uppercase tracking-wide hover:bg-gray-50 transition-colors duration-300">
            Load More
          </button>
        </div>
      </div>
    </section>
  );
}
