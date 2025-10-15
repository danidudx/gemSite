export default function CreativeStudio() {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 py-20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-yellow-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-yellow-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <div className="space-y-8 animate-fadeInLeft">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full">
                <span className="text-yellow-600 text-sm font-medium tracking-wider">CREATIVE STUDIO</span>
              </div>
              <h2 className="text-5xl lg:text-6xl font-light leading-tight text-gray-900">
                Design Your
                <span className="block text-gradient bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  Dream Jewelry
                </span>
              </h2>
            </div>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              From exquisite diamond rings to custom gemstone necklaces, our Creative Studio 
              empowers you to design one-of-a-kind pieces that reflect your unique style and 
              celebrate life's precious moments.
            </p>
            
            <div className="grid grid-cols-2 gap-6 my-8">
              <div className="group">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <h4 className="text-lg font-medium text-gray-900">Custom Design</h4>
                </div>
                <p className="text-gray-600 text-sm">Personalized jewelry tailored to your vision</p>
              </div>
              <div className="group">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <h4 className="text-lg font-medium text-gray-900">Premium Gems</h4>
                </div>
                <p className="text-gray-600 text-sm">Hand-selected diamonds and precious stones</p>
              </div>
              <div className="group">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <h4 className="text-lg font-medium text-gray-900">Expert Craftsmanship</h4>
                </div>
                <p className="text-gray-600 text-sm">Master artisans bring your design to life</p>
              </div>
              <div className="group">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <h4 className="text-lg font-medium text-gray-900">3D Preview</h4>
                </div>
                <p className="text-gray-600 text-sm">See your creation before it's made</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 shadow-md">
                <span className="relative z-10">Start Designing</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button className="px-8 py-4 border-2 border-yellow-500/50 text-yellow-600 font-semibold rounded-lg hover:bg-yellow-50 hover:border-yellow-500 transition-all duration-300">
                View Gallery
              </button>
            </div>
          </div>
          
          {/* Visual Section */}
          <div className="relative animate-fadeInRight">
            <div className="grid grid-cols-2 gap-4">
              {/* Main showcase image */}
              <div className="col-span-2 relative group">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 p-8 shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop&crop=center"
                    alt="Custom Diamond Ring Design"
                    className="w-full h-64 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold">Diamond Engagement Ring</h3>
                    <p className="text-sm text-gray-200">Custom Design</p>
                  </div>
                </div>
              </div>
              
              {/* Secondary images */}
              <div className="relative group">
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 p-4 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=200&fit=crop&crop=center"
                    alt="Emerald Necklace"
                    className="w-full h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                  <div className="absolute bottom-2 left-2 text-white">
                    <p className="text-xs font-medium">Emerald Necklace</p>
                  </div>
                </div>
              </div>
              
              <div className="relative group">
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 p-4 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=200&fit=crop&crop=center"
                    alt="Sapphire Earrings"
                    className="w-full h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                  <div className="absolute bottom-2 left-2 text-white">
                    <p className="text-xs font-medium">Sapphire Earrings</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating design elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400/30 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-yellow-300/30 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
