import { Eye } from 'lucide-react';

export default function ProductCard({ 
  product = {
    id: 1,
    name: "Classic Solitaire Engagement Ring",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    isNew: true,
    isBestSeller: false,
    isOnSale: true,
    discount: 12
  }
}) {
  return (
    <div 
      className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-2"
      style={{ 
        boxShadow: 'var(--shadow-secondary)',
        border: '1px solid var(--border-primary)'
      }}
    >
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-green-400 to-green-500 text-white shadow-lg backdrop-blur-sm">
              NEW
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-purple-400 to-purple-500 text-white shadow-lg backdrop-blur-sm">
              BESTSELLER
            </span>
          )}
          {product.isOnSale && (
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-red-400 to-red-500 text-white shadow-lg backdrop-blur-sm">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Quick View Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button className="px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 bg-glass backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-black">
            <Eye size={20} className="inline-block mr-2" />
            Quick View
          </button>
        </div>
      </div>

      {/* Product Name */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-xl font-semibold text-white group-hover:text-yellow-400 transition-colors duration-300" style={{fontFamily: 'var(--font-primary)'}}>
          {product.name}
        </h3>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{borderColor: 'var(--color-primary)'}}></div>
    </div>
  );
}
