import { useEffect, useRef, useState } from 'react';
import customDesign1 from '../../assets/customDesign1.jpg';
import customDesign2 from '../../assets/customDesign2.jpg';
import customDesign3 from '../../assets/customDesign3.jpg';

const DiamondShapes = () => {
  const scrollContainerRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(true);

  // Diamond shapes images with details
  const diamondShapes = [
    {
      image: customDesign1,
      title: "Round Brilliant",
      description: "Classic and timeless, the most popular diamond shape for its exceptional sparkle and fire.",
      cta: "SHOP ROUND"
    },
    {
      image: customDesign2,
      title: "Princess Cut",
      description: "Modern and brilliant, square shape with sharp corners and exceptional fire.",
      cta: "SHOP PRINCESS"
    },
    {
      image: customDesign3,
      title: "Emerald Cut",
      description: "Elegant and sophisticated, step-cut facets create a hall-of-mirrors effect.",
      cta: "SHOP EMERALD"
    },
    {
      image: customDesign1,
      title: "Round Brilliant",
      description: "Classic and timeless, the most popular diamond shape for its exceptional sparkle and fire.",
      cta: "SHOP ROUND"
    },
    {
      image: customDesign2,
      title: "Princess Cut",
      description: "Modern and brilliant, square shape with sharp corners and exceptional fire.",
      cta: "SHOP PRINCESS"
    },
    {
      image: customDesign3,
      title: "Emerald Cut",
      description: "Elegant and sophisticated, step-cut facets create a hall-of-mirrors effect.",
      cta: "SHOP EMERALD"
    },
  ];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isScrolling) return;

    let scrollPos = 0;
    const scrollSpeed = 0.5; // Adjust speed as needed

    const scroll = () => {
      if (!isScrolling) return;
      
      scrollPos += scrollSpeed;
      
      // Reset position when reaching the end
      if (scrollPos >= container.scrollWidth - container.clientWidth) {
        scrollPos = 0;
      }
      
      container.scrollLeft = scrollPos;
      requestAnimationFrame(scroll);
    };

    const animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, [isScrolling]);

  const handleMouseEnter = () => setIsScrolling(false);
  const handleMouseLeave = () => setIsScrolling(true);

  return (
    <section className="pt-32 md:pt-40" style={{ backgroundColor: 'var(--diamond-section-bg)', width: '100%', paddingBottom: 0, marginBottom: 0 }}>
      <div
        ref={scrollContainerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex overflow-x-hidden scrollbar-hide gap-20 items-end"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          width: '100%',
        }}
      >
          {diamondShapes.map((shape, index) => (
            <div
              key={index}
              className="flex-shrink-0 group relative"
              style={{ minWidth: '350px', width: '350px' }}
            >
              {/* Inverted U curve at top of image */}
              <div
                className="relative overflow-hidden"
                style={{
                  clipPath: 'polygon(0 15%, 10% 8%, 20% 5%, 30% 3%, 40% 2%, 50% 1%, 60% 2%, 70% 3%, 80% 5%, 90% 8%, 100% 15%, 100% 100%, 0 100%)',
                }}
              >
                <div
                  className="relative overflow-hidden cursor-pointer transition-all duration-500"
                  style={{
                    width: '100%',
                    height: '600px',
                    clipPath: 'polygon(0 15%, 10% 8%, 20% 5%, 30% 3%, 40% 2%, 50% 1%, 60% 2%, 70% 3%, 80% 5%, 90% 8%, 100% 15%, 100% 100%, 0 100%)',
                  }}
                >
                  {/* Image */}
                  <img
                    src={shape.image}
                    alt={shape.title}
                    className="w-full h-full object-cover"
                    style={{ 
                      objectPosition: 'center',
                    }}
                  />

                </div>
              </div>

              {/* U-shaped information panel at top of image - U curve at top */}
              <div 
                className="absolute left-0 right-0 opacity-0 group-hover:opacity-100 transition-all duration-700 transform -translate-y-8 group-hover:translate-y-0 pointer-events-none diamond-overlay"
                style={{
                  top: '0',
                  zIndex: 10,
                  padding: '60px 40px 40px',
                  clipPath: 'polygon(0 15%, 10% 8%, 20% 5%, 30% 3%, 40% 2%, 50% 1%, 60% 2%, 70% 3%, 80% 5%, 90% 8%, 100% 15%, 100% 100%, 0 100%)',
                  marginTop: '0px',
                  height: '300px',
                }}
              >
                  {/* Decorative border on U-shaped curve at bottom */}
                  <div 
                    className="absolute bottom-0 left-0 right-0" 
                    style={{ 
                      height: '3px', 
                      backgroundColor: 'var(--diamond-border-color)',
                      clipPath: 'polygon(0 15%, 10% 8%, 20% 5%, 30% 3%, 40% 2%, 50% 1%, 60% 2%, 70% 3%, 80% 5%, 90% 8%, 100% 15%, 100% 100%, 0 100%)',
                    }} 
                  />

                  {/* Title */}
                  <h3 
                    className="text-2xl md:text-3xl font-bold mb-3 text-center diamond-title"
                  >
                    {shape.title}
                  </h3>

                  {/* Description */}
                  <p 
                    className="text-sm font-light text-center mb-4 px-4 diamond-description"
                  >
                    {shape.description}
                  </p>

                  {/* Call to Action */}
                  <div className="text-center">
                    <div 
                      className="inline-block diamond-cta"
                      style={{
                        fontSize: '13px',
                        fontWeight: '300',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        borderBottom: '2px solid',
                        paddingBottom: '4px',
                      }}
                    >
                      {shape.cta}
                    </div>
                  </div>
              </div>

            </div>
          ))}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default DiamondShapes;
