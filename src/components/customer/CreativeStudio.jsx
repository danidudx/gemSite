import { ChevronUp } from 'lucide-react';

export default function CreativeStudio() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative bg-white min-h-screen flex">
      {/* Left Side - Two Centered Images */}
      <div className="w-1/2 relative bg-gray-50 p-8 flex items-center justify-center overflow-hidden">
        {/* Main Image - Hand with Gold Bracelet (Centered) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[550px] z-10 animate-fadeInLeft">
          <img
            src="src/assets/customDesign1.jpg"
            alt="Hand wearing gold bracelet and rings"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>

        {/* Overlapping Image - Ear with Gold Earring (Centered Overlap) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-x-8 translate-y-12 w-[300px] h-[350px] z-20 animate-fadeInRight">
          <img
            src="src/assets/customDesign3.jpg"
            alt="Ear wearing intricate gold earring"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
      </div>
      
      {/* Right Side - Content */}
      <div className="w-1/2 bg-gradient-to-br from-white via-gray-50 to-white p-20 flex flex-col justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-32 h-32 border border-gray-300 rounded-full"></div>
          <div className="absolute bottom-32 left-16 w-24 h-24 border border-gray-300 rounded-full"></div>
          <div className="absolute top-1/2 right-8 w-16 h-16 border border-gray-300 rounded-full"></div>
              </div>

        <div className="max-w-lg relative z-10">
          {/* Elegant Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full mb-8">
            
            <span className="text-sm md:text-base uppercase tracking-[0.2em] text-gray-500 font-medium">
            Luxury Collection
            </span>
            </div>
            
          {/* Main Headline */}
          <h2 className="text-6xl lg:text-7xl font-serif font-extralight text-gray-900 mb-6 leading-none tracking-tight">
            Unique & Genuine
            <span className="block text-gray-600 font-light">Jewelry</span>
          </h2>

          {/* Elegant Description */}
          <p className="text-lg text-gray-500 mb-12 leading-relaxed tracking-wide font-light">
            Crafting exceptional jewelry with timeless elegance and modern sophistication.
          </p>

          {/* Refined Features */}
          <div className="mb-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-4 group">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-blue-500 rounded-full"></div>
                <span className="text-gray-700 font-medium tracking-wide group-hover:text-gray-900 transition-colors">Custom Design</span>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-blue-500 rounded-full"></div>
                <span className="text-gray-700 font-medium tracking-wide group-hover:text-gray-900 transition-colors">Premium Materials</span>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-blue-500 rounded-full"></div>
                <span className="text-gray-700 font-medium tracking-wide group-hover:text-gray-900 transition-colors">Expert Craftsmanship</span>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-blue-500 rounded-full"></div>
                <span className="text-gray-700 font-medium tracking-wide group-hover:text-gray-900 transition-colors">Lifetime Warranty</span>
              </div>
            </div>
          </div>
          
          {/* Elegant Call to Action */}
          <div className="flex items-center space-x-6">
            <button className="group relative bg-gray-900 text-white px-10 py-5 text-sm font-medium tracking-widest uppercase hover:bg-gray-800 transition-all duration-500 overflow-hidden">
              <span className="relative z-10">Explore Collection</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </button>
            
            <div className="flex items-center space-x-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
              <span className="text-sm font-medium tracking-wide">Learn More</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Elegant Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="absolute bottom-8 right-8 w-14 h-14 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg"
        >
          <ChevronUp size={22} />
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 1s ease-out;
        }

        .animate-fadeInRight {
          animation: fadeInRight 1s ease-out 0.3s both;
        }
      `}</style>
    </section>
  );
}
