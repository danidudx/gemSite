import { useState, useEffect } from 'react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      name: "Sarah Mitchell",
      role: "Engagement Ring Buyer",
      rating: 5,
      text: "The craftsmanship exceeded all expectations. The diamond engagement ring is absolutely stunning, and the personalized service made choosing the perfect piece effortless.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces"
    },
    {
      id: 2,
      name: "James Anderson",
      role: "Anniversary Gift",
      rating: 5,
      text: "Amazing quality and exceptional attention to detail. The custom wedding band we commissioned turned out to be even more beautiful than I imagined. Highly recommend!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Bridal Collection",
      rating: 5,
      text: "From consultation to delivery, the entire experience was outstanding. My pearl necklace is elegant and timeless. Truly a luxury experience from start to finish.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces"
    },
    {
      id: 4,
      name: "Michael Chen",
      role: "Custom Jewelry",
      rating: 5,
      text: "The team helped bring my vision to life. The custom gemstone piece is unique and perfectly captures what I wanted. Excellent communication throughout the process.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces"
    },
    {
      id: 5,
      name: "Olivia Thompson",
      role: "Wedding Rings",
      rating: 5,
      text: "Absolutely beautiful jewelry! The platinum rings are stunning and the quality is exceptional. Fast shipping and gorgeous packaging. Will definitely purchase again.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces"
    },
    {
      id: 6,
      name: "David Park",
      role: "Diamond Jewelry",
      rating: 5,
      text: "Outstanding service and incredible quality. The diamond bracelet I purchased is flawless, and the customer service team was extremely helpful and knowledgeable.",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=faces"
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000); // Change testimonial every 4 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-block mb-4">
            <span className="text-sm md:text-base uppercase tracking-[0.2em] text-gray-500 font-medium">
              Customer Stories
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 mb-6 tracking-tight">
            What Our Customers Say
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto"></div>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          <div 
            key={currentIndex}
            className="animate-fade-in"
          >
            {/* Quote Icon */}
            <div className="text-6xl text-gray-300 mb-6 font-serif text-center">
              "
            </div>

            {/* Rating Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>

            {/* Testimonial Text */}
            <p className="text-gray-600 leading-relaxed text-sm md:text-base text-center mb-8 italic max-w-3xl mx-auto">
              {currentTestimonial.text}
            </p>

            {/* Customer Info */}
            <div className="flex flex-col items-center gap-4 pt-8">
              <img
                src={currentTestimonial.image}
                alt={currentTestimonial.name}
                className="w-20 h-20 rounded-full object-cover shadow-lg ring-2 ring-white"
              />
              <div className="text-center">
                <p className="text-xl md:text-2xl font-serif text-gray-900">{currentTestimonial.name}</p>
                <p className="text-sm text-gray-500 uppercase tracking-wider font-medium mt-1">{currentTestimonial.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-gray-900 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
          </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6 text-sm md:text-base">
            Join thousands of satisfied customers
          </p>
          <button className="border-2 border-gray-900 px-10 py-3 hover:bg-gray-900 hover:text-white transition-colors duration-300 font-light tracking-wide">
            SHOP COLLECTION
          </button>
        </div>

        {/* Bottom Decorative Line */}
        <div className="mt-16 text-center">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-auto"></div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-in-out;
          }
        `
      }} />
    </section>
  );
}
