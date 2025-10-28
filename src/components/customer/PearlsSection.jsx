import { useState, useEffect } from 'react';

export default function PearlsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isSliding, setIsSliding] = useState(true);

  const images = [
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=800&fit=crop"
  ];

  const gemImages = [
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=100&h=100&fit=crop"
  ];

  const sentences = [
    { line1: "Versatility &", line2: "Great Craftsmanship!" },
    { line1: "Timeless Beauty", line2: "for Every Moment" },
    { line1: "Elegant Designs", line2: "Handcrafted with Love" }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    const imageTimer = setInterval(() => {
      setIsSliding(false);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
        setTimeout(() => {
          setIsSliding(true);
        }, 100);
      }, 600);
    }, 6000); 

    return () => {
      clearTimeout(timer);
      clearInterval(imageTimer);
    };
  }, [images.length]);

  return (
    <section className="relative py-16 overflow-hidden h-[80vh] flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1748529415102-d53cb0ca16dd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332")',
        }}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center relative min-h-screen">
          {/* Image section */}
          <div 
            className={`transition-all duration-[4000ms] ${
              isVisible 
                ? 'scale-100 opacity-100' 
                : 'scale-0 opacity-0'
            }`}
            style={{ 
              transitionDelay: '500ms',
              transitionTimingFunction: 'ease-out'
            }}
          >
            <div className="w-80 h-96 md:w-[400px] md:h-[500px] relative animate-scale-in-out" style={{ borderRadius: '120px' }} key={currentImage}>
              <div className="absolute inset-0 bg-white overflow-hidden shadow-2xl" style={{ borderRadius: '120px' }}>
                <img
                  key={currentImage}
                  src={images[currentImage]}
                  alt="Elegant Jewelry"
                  className="w-full h-full object-cover transition-opacity duration-700"
                />
              </div>
            </div>
          </div>

          {/* Text overlay positioned on right side of image */}
          <div 
            className={`absolute top-1/2 right-1/4 transform -translate-y-1/2 w-96 h-96 md:w-[400px] md:h-[500px] flex flex-col items-center justify-center text-center transition-all duration-700 pointer-events-none z-20 ${
              isSliding 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-100 translate-x-0'
            }`}
            key={currentImage}
            style={{ borderRadius: '120px' }}
          >
            <h2 className={`text-5xl md:text-7xl font-light tracking-widest mb-3 drop-shadow-2xl text-white whitespace-nowrap transition-all duration-1000 ${
              isSliding 
                ? 'translate-x-0 opacity-100' 
                : 'translate-x-[100px] opacity-0'
            }`} key={`line1-${currentImage}`} style={{ fontFamily: 'serif' }}>
              {sentences[currentImage].line1}
            </h2>
            <h2 className={`text-5xl md:text-7xl font-light tracking-widest drop-shadow-2xl text-white whitespace-nowrap transition-all duration-1000 ${
              isSliding 
                ? 'translate-x-0 opacity-100' 
                : 'translate-x-[100px] opacity-0'
            }`} key={`line2-${currentImage}`} style={{ fontFamily: 'serif' }}>
              {sentences[currentImage].line2}
            </h2>

            {/* Small gem images under sentences on left side */}
            <div className="flex items-center mt-4 space-x-2">
              <img
                src={gemImages[currentImage]}
                alt="Small Gem"
                className={`w-8 h-8 md:w-12 md:h-12 rounded-full object-cover shadow-lg transition-all duration-1000 ${
                  isSliding 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-[-150px] opacity-0'
                }`}
                key={`gem1-${currentImage}`}
              />
              <img
                src={gemImages[(currentImage + 1) % gemImages.length]}
                alt="Small Gem"
                className={`w-6 h-6 md:w-10 md:h-10 rounded-full object-cover shadow-lg transition-all duration-1000 delay-200 ${
                  isSliding 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-[-150px] opacity-0'
                }`}
                key={`gem2-${currentImage}`}
              />
              <img
                src={gemImages[(currentImage + 2) % gemImages.length]}
                alt="Small Gem"
                className={`w-7 h-7 md:w-11 md:h-11 rounded-full object-cover shadow-lg transition-all duration-1000 delay-400 ${
                  isSliding 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-[-150px] opacity-0'
                }`}
                key={`gem3-${currentImage}`}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scaleInOut {
          0% {
            transform: scale(0.2);
            opacity: 0;
          }
          20% {
            transform: scale(0.5);
            opacity: 0.4;
          }
          40% {
            transform: scale(0.8);
            opacity: 0.7;
          }
          60% {
            transform: scale(1.05);
            opacity: 0.9;
          }
          80% {
            transform: scale(0.97);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .animate-scale-in-out {
          animation: scaleInOut 4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </section>
  );
}