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
      <div className="absolute inset-0 bg-black/35 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10"></div>
      
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <video
            key={slide.id}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentSlideIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              filter: 'brightness(0.75) contrast(1.15) saturate(1.1)'
            }}
          >
            <source src={slide.videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ))}
      </div>
      
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            {/* Decorative line above subtitle */}
            <div className="flex items-center justify-center mb-8 animate-fade-in" style={{ opacity: 0 }}>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            </div>

            {/* Subtitle */}
            <div 
              key={`subtitle-${currentSlideIndex}`}
              className="text-white/85 text-[10px] md:text-xs uppercase tracking-[0.3em] mb-10 font-extralight animate-fade-in-up"
            >
              <span className="inline-block">LUXURY JEWELRY</span>
            </div>
          
            {/* Main Title */}
            <h1 
              key={`title-${currentSlideIndex}`}
              className="text-white font-serif font-extralight leading-[1.08] mb-12 animate-fade-in-up-delay"
              style={{
                fontSize: 'clamp(48px, 7.5vw, 100px)',
                letterSpacing: '-0.03em',
                textShadow: '0 4px 30px rgba(0,0,0,0.6), 0 2px 10px rgba(0,0,0,0.4)',
                fontWeight: 300
              }}
            >
              {slides[currentSlideIndex].title}
            </h1>
          
            {/* Decorative line */}
            <div className="flex items-center justify-center mb-10 animate-fade-in-delay" style={{ opacity: 0 }}>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"></div>
            </div>

            {/* Description */}
            <div 
              key={`desc-${currentSlideIndex}`}
              className="text-white/90 mb-12 mx-auto animate-fade-in-up-delay-2"
              style={{
                maxWidth: '640px',
                lineHeight: '1.85'
              }}
            >
              <p className="text-[15px] md:text-lg font-extralight leading-relaxed tracking-wide">
                {slides[currentSlideIndex].description}
              </p>
            </div>
            
            {/* Button */}
            <div key={`button-${currentSlideIndex}`} className="mb-8 animate-fade-in-up-delay-3">
              <button className="group relative bg-white/95 text-gray-900 px-12 py-4 text-xs font-light tracking-[0.2em] uppercase hover:bg-white transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] overflow-hidden">
                <span className="relative z-10">{slides[currentSlideIndex].buttonText}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </div>
          
            {/* Features */}
            {/* <div className="pt-4 flex flex-wrap gap-x-10 gap-y-4 justify-center items-center">
              <div className="text-white/90 text-sm flex items-center gap-2.5 font-light">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                <span>Free Shipping</span>
              </div>
              <div className="text-white/90 text-sm flex items-center gap-2.5 font-light">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                <span>Lifetime Warranty</span>
              </div>
              <div className="text-white/90 text-sm flex items-center gap-2.5 font-light">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                <span>Expert Craftsmanship</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      
      <button 
        onClick={prevSlide}
        className="absolute left-6 md:left-8 top-1/2 transform -translate-y-1/2 z-30 text-white/90 hover:text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm bg-white/5 rounded-full p-2"
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} strokeWidth={1.5} />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-6 md:right-8 top-1/2 transform -translate-y-1/2 z-30 text-white/90 hover:text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm bg-white/5 rounded-full p-2"
        aria-label="Next slide"
      >
        <ChevronRight size={28} strokeWidth={1.5} />
      </button>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlideIndex(index)}
            className={`rounded-full transition-all duration-300 ${
              index === currentSlideIndex 
                ? 'w-2.5 h-2.5 bg-white shadow-lg' 
                : 'w-2 h-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
