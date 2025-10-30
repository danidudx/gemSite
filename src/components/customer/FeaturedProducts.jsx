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
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-block mb-4">
            <span className="text-sm md:text-base uppercase tracking-[0.2em] text-gray-500 font-medium">
              Curated Collection
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 mb-6 tracking-tight">
            Featured Products
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto"></div>
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
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {sampleProducts.map((product) => (
            <div
              key={product.id}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative h-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-gray-200 overflow-hidden">
                {/* Product Image Container */}
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
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

                {/* Content */}
                <div className="relative p-8 md:p-10">
                  {/* Category */}
                  <div className="mb-2">
                    <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">
                      {product.category}
                    </p>
                  </div>

                  {/* Product Name */}
                  <div className="mb-4">
                    <h3 className="text-xl md:text-2xl font-serif text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-2 mb-6">
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                    <span className="text-lg font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Decorative Line */}
                  <div className="w-8 h-px bg-gray-300 transform group-hover:w-12 group-hover:bg-gray-400 transition-all duration-300"></div>
                </div>

                {/* Subtle Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-16">
          <button className="px-8 py-3 border border-gray-300 text-gray-700 font-medium uppercase tracking-wide hover:bg-gray-50 transition-colors duration-300">
            Load More
          </button>
        </div>

        {/* Bottom Decorative Line */}
        <div className="mt-16 text-center">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-auto"></div>
        </div>
      </div>
    </section>
  );
}
