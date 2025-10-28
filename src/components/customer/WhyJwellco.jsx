export default function WhyJwellco() {
  const features = [
    {
      title: "Expert Guidance",
      subtitle: "Your Personal Jewelry Consultant",
      description:
        "Receive bespoke advice from our certified gemologists and jewelry specialists, available around the clock to help you make the perfect choice.",
      icon: "✨",
    },
    {
      title: "Uncompromising Integrity",
      subtitle: "Certified Authenticity",
      description:
        "Every diamond and precious gemstone is accompanied by internationally recognized certification, ensuring transparency and authenticity.",
      icon: "💎",
    },
    {
      title: "Exceptional Value",
      subtitle: "Transparent Excellence",
      description:
        "Premium craftsmanship and exquisite materials meet fair, transparent pricing—luxury that's both exceptional and accessible.",
      icon: "🌟",
    },
  ];

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-block mb-4">
            <span className="text-sm md:text-base uppercase tracking-[0.2em] text-gray-500 font-medium">
              The Jwellco Promise
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 mb-6 tracking-tight">
            Why Choose Jwellco
          </h2>
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
                  {/* Icon */}
                  <div className="mb-6 text-4xl transform group-hover:scale-105 transition-transform duration-300">
                    {feature.icon}
                  </div>

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

                {/* Subtle Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
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
