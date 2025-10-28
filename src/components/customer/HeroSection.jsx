import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroSection() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  
  const slides = [
    {
      id: 1,
      videoSrc: "/src/assets/hero1.mp4",
      title: "Magical, Grace And Charming!",
      description: "Each piece of jewelry is handmade in our production workshops where we maintain a close relationships with our manufacturers who keep the production process as sustainable and transparent as possible.",
      buttonText: "SHOP BESTSELLERS"
    },
    {
      id: 2,
      videoSrc: "/src/assets/hero2.mp4",
      title: "Timeless Elegance",
      description: "Discover our exquisite collection of handcrafted jewelry, featuring rare gems and precious metals that tell your unique story.",
      buttonText: "EXPLORE COLLECTION"
    },
    {
      id: 3,
      videoSrc: "/src/assets/hero3.mp4",
      title: "Luxury Redefined",
      description: "Experience the finest craftsmanship and most beautiful gemstones in our carefully curated collection.",
      buttonText: "SHOP NOW"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20 z-10"></div>
      
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <video
            key={slide.id}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 filter brightness-90 contrast-110 ${
              index === currentSlideIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              filter: 'brightness(0.8) contrast(1.1) saturate(1.2)'
            }}
          >
            <source src={slide.videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ))}
      </div>
      
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl">
            {/* Subtitle */}
            <div className="text-white text-sm uppercase tracking-wider mb-5 -mt-2 pb-5">
              <span className="opacity-80">LUXURY JEWELRY</span>
          </div>
          
            {/* Main Title */}
            <h1 
              className="text-white font-serif font-light leading-tight mb-6 -mt-3"
              style={{
                fontSize: 'clamp(40px, 8vw, 85px)',
                lineHeight: '1.05',
                letterSpacing: '-0.06em'
              }}
            >
              {slides[currentSlideIndex].title}
          </h1>
          
            {/* Description */}
            <div 
              className="text-white mb-8 -mt-3 pt-5 pb-5"
              style={{
                maxWidth: '510px',
                lineHeight: '1.6'
              }}
            >
              <p className="text-base md:text-lg">
                {slides[currentSlideIndex].description}
              </p>
            </div>
            
            {/* Button */}
            <div className="pt-5">
              <button className="bg-white text-gray-800 px-8 py-4 text-sm font-medium tracking-wider uppercase hover:bg-gray-100 transition-colors duration-300">
                {slides[currentSlideIndex].buttonText}
            </button>
          </div>
          
            {/* Features */}
            <div className="pt-6 flex flex-wrap gap-x-8 gap-y-2 justify-start">
              <div className="text-white text-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Free Shipping</span>
            </div>
              <div className="text-white text-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Lifetime Warranty</span>
            </div>
              <div className="text-white text-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Expert Craftsmanship</span>
            </div>
          </div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 text-white hover:text-gray-300 transition-colors duration-300"
      >
        <ChevronLeft size={32} />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 text-white hover:text-gray-300 transition-colors duration-300"
      >
        <ChevronRight size={32} />
      </button>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex items-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlideIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlideIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
