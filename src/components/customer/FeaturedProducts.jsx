import ProductCard from './ProductCard';

const sampleProducts = [
  {
    id: 1,
    name: "Classic Solitaire Engagement Ring",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    isNew: true,
    isBestSeller: false,
    isOnSale: true,
    discount: 12
  },
  {
    id: 2,
    name: "Eternity Wedding Band",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
    isNew: false,
    isBestSeller: true,
    isOnSale: false
  },
  {
    id: 3,
    name: "Princess Cut Diamond",
    image: "https://images.unsplash.com/photo-1596944924616-7b3840a4d1b8?w=400&h=400&fit=crop",
    isNew: false,
    isBestSeller: false,
    isOnSale: true,
    discount: 11
  },
  {
    id: 4,
    name: "Sapphire Pendant Necklace",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
    isNew: true,
    isBestSeller: false,
    isOnSale: false
  },
  {
    id: 5,
    name: "Vintage Art Deco Ring",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    isNew: false,
    isBestSeller: true,
    isOnSale: false
  },
  {
    id: 6,
    name: "Emerald Tennis Bracelet",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
    isNew: false,
    isBestSeller: false,
    isOnSale: true,
    discount: 15
  },
  {
    id: 7,
    name: "Pearl Drop Earrings",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
    isNew: true,
    isBestSeller: false,
    isOnSale: false
  },
  {
    id: 8,
    name: "Ruby Statement Ring",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    isNew: false,
    isBestSeller: true,
    isOnSale: true,
    discount: 8
  },
  {
    id: 9,
    name: "Diamond Tennis Bracelet",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
    isNew: false,
    isBestSeller: false,
    isOnSale: true,
    discount: 18
  },
  {
    id: 10,
    name: "Gold Chain Necklace",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
    isNew: true,
    isBestSeller: false,
    isOnSale: false
  }
];

import { useEffect, useRef } from 'react';

export default function ProductsGrid({ title = "Featured Products", showFilters = true, autoScroll = true }) {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (!autoScroll || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    let scrollAmount = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const scroll = () => {
      scrollAmount += scrollSpeed;
      container.scrollLeft = scrollAmount;
      
      // Reset scroll position when we've scrolled past all items
      if (scrollAmount >= container.scrollWidth - container.clientWidth) {
        scrollAmount = 0;
      }
    };

    const interval = setInterval(scroll, 16); // ~60fps

    return () => clearInterval(interval);
  }, [autoScroll]);

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-thin mb-4 text-gray-900" style={{fontFamily: 'var(--font-secondary)'}}>
            {title}
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-600" style={{fontFamily: 'var(--font-primary)'}}>
            Discover our exquisite collection of handcrafted jewelry, featuring the finest diamonds, precious gemstones, and precious metals.
          </p>
        </div>

        {/* Filter Tabs */}
        {showFilters && (
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['All', 'Engagement Rings', 'Wedding Rings', 'Diamonds', 'Gemstones'].map((category) => (
              <button
                key={category}
                className="px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: category === 'All' ? 'var(--color-primary)' : 'transparent',
                  color: category === 'All' ? 'var(--color-black)' : '#6b7280',
                  border: `2px solid ${category === 'All' ? 'var(--color-primary)' : '#e5e7eb'}`,
                  fontFamily: 'var(--font-primary)'
                }}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Horizontal Scrolling Products Container */}
        <div className="relative">
          {/* Gradient Overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{
            background: 'linear-gradient(to right, #f9fafb, transparent)'
          }}></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{
            background: 'linear-gradient(to left, #f9fafb, transparent)'
          }}></div>

          {/* Scrollable Products Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollBehavior: autoScroll ? 'auto' : 'smooth'
            }}
          >
            {sampleProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-80">
                <ProductCard product={product} />
              </div>
            ))}
            
            {/* Duplicate products for seamless loop */}
            {autoScroll && sampleProducts.map((product) => (
              <div key={`duplicate-${product.id}`} className="flex-shrink-0 w-80">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 gap-2">
          {[1, 2, 3, 4, 5].map((dot) => (
            <button
              key={dot}
              className="w-3 h-3 rounded-full transition-all duration-300"
              style={{
                backgroundColor: dot === 1 ? 'var(--color-primary)' : '#d1d5db'
              }}
            ></button>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105" style={{
            background: 'var(--gradient-primary)',
            color: 'var(--color-black)',
            fontFamily: 'var(--font-primary)'
          }}>
            View All Products
          </button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
