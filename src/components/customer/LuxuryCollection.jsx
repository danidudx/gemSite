export default function LuxuryCollection() {
  const features = [
    {
      title: "Exquisite Craftsmanship",
      subtitle: "Master Artisans",
      description:
        "Our master artisans bring decades of experience and passion to every piece, creating jewelry that embodies the perfect balance of traditional techniques and contemporary design.",
    },
    {
      title: "Premium Materials",
      subtitle: "Finest Quality",
      description:
        "We source only the world's finest diamonds, precious gemstones, and precious metals, ensuring each piece meets the highest standards of quality and authenticity.",
    },
    {
      title: "Timeless Elegance",
      subtitle: "Enduring Beauty",
      description:
        "Our luxury collection features designs that transcend trends, creating pieces that will be treasured for generations and never go out of style.",
    },
  ];

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-block mb-4">
            <span className="text-sm md:text-base uppercase tracking-[0.2em] text-gray-500 font-medium">
              Premium Selection
            </span>
          </div>
          <span className="text-sm md:text-base uppercase tracking-[0.2em] text-gray-500 font-medium">
          Luxury Collection
            </span>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto"></div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative h-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-gray-200 overflow-hidden">
                {/* Content */}
                <div className="relative p-8 md:p-10">
                  {/* Title and Subtitle */}
                  <div className="mb-4">
                    <h3 className="text-xl md:text-2xl font-serif text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">
                      {feature.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base group-hover:text-gray-700 transition-colors">
                    {feature.description}
                  </p>

                  {/* Decorative Line */}
                  <div className="mt-6 w-8 h-px bg-gray-300 transform group-hover:w-12 group-hover:bg-gray-400 transition-all duration-300"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Decorative Line */}
        <div className="mt-16 text-center">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-auto"></div>
        </div>
      </div>
    </section>
  );
}
