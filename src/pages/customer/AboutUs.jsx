import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { Sparkles, Award, Heart, Users, TrendingUp, Shield, Gem } from "lucide-react";

// Stats data - defined outside component to avoid recreation
const stats = [
  { number: "25+", value: 25, suffix: "+", label: "Years of Excellence", icon: <TrendingUp className="w-6 h-6" /> },
  { number: "50K+", value: 50, suffix: "K+", label: "Happy Customers", icon: <Users className="w-6 h-6" /> },
  { number: "500+", value: 500, suffix: "+", label: "Unique Designs", icon: <Sparkles className="w-6 h-6" /> },
  { number: "100%", value: 100, suffix: "%", label: "Satisfaction Rate", icon: <Award className="w-6 h-6" /> }
];

export default function AboutUs() {
  const navigate = useNavigate();
  
  const values = [
    {
      icon: <Gem className="w-8 h-8" />,
      title: "Authenticity",
      description: "Every piece is certified authentic, sourced from ethical suppliers and verified by our expert gemologists.",
      image: "https://images.unsplash.com/photo-1588444837495-c4e13b9f8c2a?w=800&h=600&fit=crop"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Passion",
      description: "We're driven by a deep love for fine jewelry and the stories that each piece tells.",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excellence",
      description: "We never compromise on quality, ensuring each creation meets the highest standards of craftsmanship.",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=600&fit=crop"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Trust",
      description: "Transparency and integrity guide everything we do, building lasting relationships with our clients.",
      image: "https://images.unsplash.com/photo-1596944924616-7b3840a4d1b8?w=800&h=600&fit=crop"
    }
  ];

  // Counter animation state
  const [counters, setCounters] = useState({});
  const statsRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Animate counters function
  const animateCounters = useCallback(() => {
    stats.forEach((stat) => {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = stat.value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(timer);
        }
        setCounters((prev) => ({
          ...prev,
          [stat.label]: Math.floor(current),
        }));
      }, duration / steps);
    });
  }, []);

  // Intersection Observer for stats section
  useEffect(() => {
    const currentRef = statsRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated, animateCounters]);

  const milestones = [
    {
      year: "2000",
      title: "The Beginning",
      description: "Founded with a vision to make luxury jewelry accessible while maintaining uncompromising quality."
    },
    {
      year: "2010",
      title: "Global Expansion",
      description: "Expanded internationally, bringing our handcrafted jewelry to customers worldwide."
    },
    {
      year: "2015",
      title: "Sustainable Practices",
      description: "Committed to ethical sourcing and sustainable manufacturing practices."
    },
    {
      year: "2025",
      title: "Digital Innovation",
      description: "Pioneering the future of jewelry retail with cutting-edge technology and personalized experiences."
    }
  ];

  // Auto-scroll through milestones
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);
  const milestonesRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  // Intersection Observer for milestones section
  useEffect(() => {
    const currentRef = milestonesRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasStarted]);

  // Auto-advance milestones
  useEffect(() => {
    if (!hasStarted) return;

    const interval = setInterval(() => {
      setActiveMilestoneIndex((prevIndex) => (prevIndex + 1) % milestones.length);
    }, 1000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [hasStarted, milestones.length]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Banner Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden" style={{
        background: 'linear-gradient(rgb(13, 45, 63), rgb(26, 61, 82), rgb(13, 45, 63))'
      }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl animate-float-1 opacity-20" style={{ 
            background: 'radial-gradient(circle, rgba(42, 77, 98, 0.4), transparent)' 
          }}></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl animate-float-2 opacity-20" style={{ 
            background: 'radial-gradient(circle, rgba(58, 93, 114, 0.3), transparent)' 
        }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl animate-float-3 opacity-15" style={{ 
            background: 'radial-gradient(circle, rgba(74, 109, 130, 0.25), transparent)' 
        }}></div>

        <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
        }}></div>

          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-0 w-px h-1/2 bg-gradient-to-b animate-line-fade" style={{ 
              backgroundImage: 'linear-gradient(to bottom, transparent, rgba(90, 125, 146, 0.25), transparent)' 
        }}></div>
            <div className="absolute top-1/4 right-0 w-px h-1/2 bg-gradient-to-b animate-line-fade-delay" style={{ 
              backgroundImage: 'linear-gradient(to bottom, transparent, rgba(90, 125, 146, 0.25), transparent)' 
          }}></div>
          </div>
          
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 animate-fade-in-up">
              <span className="text-sm md:text-base uppercase tracking-[0.2em] text-gray-300 font-medium">
                Discover Our Story
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 tracking-tight leading-tight animate-fade-in-up-delay drop-shadow-lg">
              About Us
            </h1>

            <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-8 animate-fade-in-up-delay-2"></div>

            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto font-light animate-fade-in-up-delay-3">
              For over two decades, we've been dedicated to creating exquisite jewelry that captures 
              life's most precious moments. Every piece is handcrafted with meticulous attention to detail, 
              reflecting our commitment to excellence and timeless beauty.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="inline-block mb-4">
                <span className="text-sm md:text-base uppercase tracking-[0.2em] text-gray-500 font-medium">
                  Our Story
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 mb-6 tracking-tight">
                Where It All Began
              </h2>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8"></div>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-base md:text-lg font-light">
                  Founded in 2000, our journey began with a simple yet powerful vision: to create jewelry 
                  that transcends trends and becomes cherished heirlooms. What started as a small 
                  workshop has evolved into a trusted name in luxury jewelry, yet our core values 
                  remain unchanged.
                </p>
                <p className="text-base md:text-lg font-light">
                  Each piece in our collection is born from passion, crafted by skilled artisans who 
                  bring decades of experience to every design. We believe that fine jewelry should 
                  not only be beautiful but also meaningful—telling stories and commemorating the 
                  moments that matter most.
                </p>
                <p className="text-base md:text-lg font-light">
                  Today, we continue to blend traditional craftsmanship with contemporary design, 
                  always staying true to our commitment to quality, authenticity, and the art of 
                  fine jewelry making.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {/* Image 1 - Top Left */}
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                  <img
                    src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop"
                    alt="Craftsmanship"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Image 2 - Top Right */}
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group mt-8">
                  <img
                    src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop"
                    alt="Jewelry Collection"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Image 3 - Bottom Left */}
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group -mt-8">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1698521646524-9ee79a2b4767?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=688"
                    alt="Workshop"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Image 4 - Bottom Right */}
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                  <img
                    src="https://images.unsplash.com/photo-1655111396188-8dd88ceb8b4d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
                    alt="Gemstones"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              
              
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-white">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-16 md:mb-20 animate-fade-in-up">
            <div className="inline-block mb-4 animate-fade-in-up">
              <span className="text-sm md:text-base uppercase tracking-[0.2em] text-gray-500 font-medium relative">
                Our Commitment
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 mb-6 tracking-tight animate-fade-in-up-delay">
              Mission & Vision
            </h2>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto animate-fade-in-up-delay-2"></div>
          </div>

          {/* Cards Grid with staggered animations */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Mission Card */}
            <div className="group relative bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl transition-all duration-700 border overflow-hidden animate-fade-in-up-delay-2 hover:scale-[1.02]" style={{ borderColor: 'rgba(26, 61, 82, 0.2)' }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ boxShadow: '0 20px 25px -5px rgba(26, 61, 82, 0.2)' }}></div>
              {/* Animated background gradient */}
              <div className="absolute inset-0 transition-all duration-700" style={{ background: 'linear-gradient(to bottom right, rgba(232, 240, 245, 0), rgba(232, 240, 245, 0), rgba(232, 240, 245, 0))' }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: 'linear-gradient(to bottom right, rgba(232, 240, 245, 0.4), rgba(208, 224, 234, 0.2), transparent)' }}></div>
              </div>
              
              {/* Decorative corner element */}
              <div className="absolute top-0 right-0 w-32 h-32 transition-all duration-700 rounded-bl-full" style={{ background: 'linear-gradient(to bottom right, rgba(74, 109, 130, 0), transparent)' }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: 'linear-gradient(to bottom right, rgba(74, 109, 130, 0.3), transparent)' }}></div>
              </div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/0 to-white/0 transition-all duration-700">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: 'linear-gradient(to bottom right, transparent, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))' }}></div>
              </div>
              
              <div className="relative p-8 md:p-10 z-10">
                {/* Animated Icon */}
                <div className="mb-6 text-gray-900 relative">
                  <div className="absolute inset-0 rounded-full blur-xl transition-all duration-700 group-hover:scale-150 opacity-0 group-hover:opacity-100 bg-gray-200"></div>
                  <Sparkles className="w-10 h-10 relative z-10 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
                </div>
                
                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-serif text-gray-900 mb-4 group-hover:text-gray-700 transition-colors duration-300 relative">
                  Our Mission
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-900 to-gray-700 group-hover:w-16 transition-all duration-500"></span>
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 leading-relaxed text-base md:text-lg font-light group-hover:text-gray-700 transition-colors duration-300">
                  To create exceptional jewelry that celebrates life's most meaningful moments, 
                  combining timeless design with uncompromising quality and ethical craftsmanship. 
                  We strive to make luxury accessible while honoring the art of fine jewelry making.
                </p>
                
                {/* Animated divider */}
                <div className="mt-6 relative">
                  <div className="w-8 h-px bg-gray-300 group-hover:w-16 group-hover:bg-gray-400 transition-all duration-500"></div>
                  <div className="absolute top-0 left-0 w-0 h-full bg-gradient-to-r from-gray-900 to-gray-700 group-hover:w-full transition-all duration-700 delay-100"></div>
                </div>
              </div>
              
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" style={{ backgroundImage: 'linear-gradient(to right, transparent, rgba(232, 240, 245, 0.3), transparent)' }}></div>
              </div>
            </div>

            {/* Vision Card */}
            <div className="group relative bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl transition-all duration-700 border overflow-hidden animate-fade-in-up-delay-3 hover:scale-[1.02]" style={{ borderColor: 'rgba(26, 61, 82, 0.2)' }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ boxShadow: '0 20px 25px -5px rgba(26, 61, 82, 0.2)' }}></div>
              {/* Animated background gradient */}
              <div className="absolute inset-0 transition-all duration-700" style={{ background: 'linear-gradient(to bottom right, rgba(232, 240, 245, 0), rgba(232, 240, 245, 0), rgba(232, 240, 245, 0))' }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: 'linear-gradient(to bottom right, rgba(232, 240, 245, 0.4), rgba(208, 224, 234, 0.2), transparent)' }}></div>
              </div>
              
              {/* Decorative corner element */}
              <div className="absolute top-0 left-0 w-32 h-32 transition-all duration-700 rounded-br-full" style={{ background: 'linear-gradient(to bottom right, rgba(74, 109, 130, 0), transparent)' }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: 'linear-gradient(to bottom right, rgba(74, 109, 130, 0.3), transparent)' }}></div>
              </div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/0 to-white/0 transition-all duration-700">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: 'linear-gradient(to bottom left, transparent, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))' }}></div>
              </div>
              
              <div className="relative p-8 md:p-10 z-10">
                {/* Animated Icon */}
                <div className="mb-6 text-gray-900 relative">
                  <div className="absolute inset-0 rounded-full blur-xl transition-all duration-700 group-hover:scale-150 opacity-0 group-hover:opacity-100 bg-gray-200"></div>
                  <Sparkles className="w-10 h-10 relative z-10 transform group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500" />
                </div>
                
                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-serif text-gray-900 mb-4 group-hover:text-gray-700 transition-colors duration-300 relative">
                  Our Vision
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-900 to-gray-700 group-hover:w-16 transition-all duration-500"></span>
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 leading-relaxed text-base md:text-lg font-light group-hover:text-gray-700 transition-colors duration-300">
                  To be the most trusted and admired jewelry brand globally, recognized for our 
                  commitment to excellence, innovation, and sustainability. We envision a future 
                  where every piece of jewelry tells a story and becomes a treasured family heirloom.
                </p>
                
                {/* Animated divider */}
                <div className="mt-6 relative">
                  <div className="w-8 h-px bg-gray-300 group-hover:w-16 group-hover:bg-gray-400 transition-all duration-500"></div>
                  <div className="absolute top-0 left-0 w-0 h-full bg-gradient-to-r from-gray-900 to-gray-700 group-hover:w-full transition-all duration-700 delay-100"></div>
                </div>
              </div>
              
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-block mb-4">
              <span className="text-sm md:text-base uppercase tracking-[0.2em] text-gray-500 font-medium">
                What We Stand For
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 mb-6 tracking-tight">
              Our Core Values
            </h2>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {values.map((value, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-gray-200 overflow-hidden"
              >
                {/* Background Image - Appears on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden">
                  <img
                    src={value.image}
                    alt={value.title}
                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                  />
                  {/* Overlay to ensure text readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
                </div>

                {/* Content */}
                <div className="relative p-8 md:p-10 z-10">
                  <div className="mb-6 text-gray-900 transform group-hover:scale-110 group-hover:text-white transition-all duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-gray-900 mb-4 group-hover:text-white transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base font-light group-hover:text-gray-100 transition-colors duration-300">
                    {value.description}
                  </p>
                  <div className="mt-6 w-8 h-px bg-gray-300 transform group-hover:w-12 group-hover:bg-white/70 transition-all duration-300"></div>
                </div>

                {/* Additional gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent opacity-0 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => {
              const currentValue = counters[stat.label] || 0;
              const displayValue = `${currentValue}${stat.suffix}`;

              return (
                <div
                  key={index}
                  className="group text-center"
                >
                  <div className="mb-4 flex justify-center text-gray-900 transform group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-3 tracking-tight">
                    {displayValue}
                  </div>
                  <div className="text-sm md:text-base uppercase tracking-wider text-gray-500 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={milestonesRef} className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-block mb-4">
              <span className="text-sm md:text-base uppercase tracking-[0.2em] text-gray-500 font-medium">
                Our Journey
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 mb-6 tracking-tight">
              Milestones
            </h2>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-12 relative">
              {/* Timeline Line */}
              <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              
              {/* Active timeline progress */}
              <div 
                className="hidden md:block absolute left-8 top-0 w-0.5 bg-gradient-to-b from-gray-900 to-gray-700 transition-all duration-1000 ease-in-out"
                style={{
                  height: `${((activeMilestoneIndex + 1) / milestones.length) * 100}%`
                }}
              ></div>

              {milestones.map((milestone, index) => {
                const isActive = index === activeMilestoneIndex;
                const isPast = index < activeMilestoneIndex;

                return (
                  <div
                    key={index}
                    className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 group transition-all duration-700 ${
                      isActive ? 'opacity-100 scale-100' : 'opacity-60 scale-95'
                    }`}
                  >
                    {/* Timeline Dot */}
                    <div className={`hidden md:flex absolute left-6 w-4 h-4 rounded-full border-4 border-white shadow-lg z-10 transition-all duration-500 ${
                      isActive 
                        ? 'bg-gray-900 scale-125 w-5 h-5' 
                        : isPast 
                        ? 'bg-gray-700 scale-110' 
                        : 'bg-gray-400 scale-100 group-hover:scale-110'
                    }`}></div>

                    {/* Year */}
                    <div className="md:w-32 flex-shrink-0">
                      <div className={`text-2xl md:text-3xl font-serif font-light transition-all duration-500 ${
                        isActive 
                          ? 'text-gray-900 scale-110' 
                          : isPast 
                          ? 'text-gray-700' 
                          : 'text-gray-600'
                      }`}>
                        {milestone.year}
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`flex-1 rounded-xl shadow-lg transition-all duration-700 border overflow-hidden ${
                      isActive
                        ? 'bg-gradient-to-br from-gray-50 to-white border-gray-300 shadow-gray-200/50 scale-[1.02]'
                        : 'bg-white border-gray-100 hover:border-gray-200 group-hover:shadow-xl group-hover:scale-[1.01]'
                    }`}>
                      <div className="p-8 md:p-10">
                        <h3 className={`text-xl md:text-2xl font-serif mb-3 transition-colors duration-300 ${
                          isActive ? 'text-gray-900' : 'text-gray-900 group-hover:text-gray-700'
                        }`}>
                          {milestone.title}
                        </h3>
                        <p className={`leading-relaxed text-base md:text-lg font-light transition-colors duration-300 ${
                          isActive ? 'text-gray-700' : 'text-gray-600'
                        }`}>
                          {milestone.description}
                        </p>
                        <div className={`mt-6 h-px transition-all duration-500 ${
                          isActive 
                            ? 'w-16 bg-gray-400' 
                            : 'w-8 bg-gray-300 group-hover:w-12 group-hover:bg-gray-400'
                        }`}></div>
                      </div>
                      
                      {/* Active indicator shimmer */}
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/30 to-transparent animate-shimmer pointer-events-none"></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white">
        {/* Elegant Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Subtle floating orbs */}
          <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl animate-float-1 opacity-10" style={{ 
            background: 'radial-gradient(circle, rgba(42, 77, 98, 0.3), transparent)' 
          }}></div>
          <div className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full blur-3xl animate-float-2 opacity-10" style={{ 
            background: 'radial-gradient(circle, rgba(58, 93, 114, 0.25), transparent)' 
          }}></div>
          
          {/* Decorative grid pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: 'linear-gradient(to right, rgba(26, 61, 82, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(26, 61, 82, 0.1) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }}></div>

          {/* Elegant side lines */}
          <div className="absolute top-0 left-[10%] w-px h-full animate-line-fade" style={{ 
            backgroundImage: 'linear-gradient(to bottom, transparent, rgba(90, 125, 146, 0.15), transparent)' 
          }}></div>
          <div className="absolute top-0 right-[10%] w-px h-full animate-line-fade-delay" style={{ 
            backgroundImage: 'linear-gradient(to bottom, transparent, rgba(90, 125, 146, 0.15), transparent)' 
          }}></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10"> 
          <div className="max-w-4xl mx-auto text-center">
            {/* Elegant Subtitle */}
            <div className="inline-block mb-6 animate-fade-in-up">
              <span className="text-sm md:text-base uppercase tracking-[0.2em] text-gray-500 font-medium">
                Begin Your Journey
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-6 tracking-tight leading-tight animate-fade-in-up-delay">
              Join Our Journey
            </h2>

            {/* Decorative Line */}
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-8 animate-fade-in-up-delay-2"></div>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-16 font-light max-w-2xl mx-auto animate-fade-in-up-delay-3">
              Experience the difference of handcrafted excellence. Discover our collection 
              and let us help you find the perfect piece that tells your story.
            </p>

            {/* Elegant Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up-delay-3">
              {/* Explore Collection Button */}
              <button 
                onClick={() => navigate("/products")}
                className="group relative px-12 py-4 bg-transparent border-2 border-gray-900 text-gray-900 font-light tracking-wider uppercase text-sm overflow-hidden transition-all duration-500 hover:text-white"
              >
                {/* Background fill on hover */}
                <div className="absolute inset-0 bg-gray-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                
                {/* Button content */}
                <span className="relative z-10 flex items-center gap-3">
                  <Sparkles className="w-4 h-4 transform group-hover:rotate-12 transition-transform duration-500" />
                  EXPLORE COLLECTION
                  <Sparkles className="w-4 h-4 transform group-hover:-rotate-12 transition-transform duration-500" />
                </span>

                {/* Shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </button>

              {/* Contact Us Button */}
              <button 
                onClick={() => navigate("/contact-us")}
                className="group relative px-12 py-4 bg-gray-900 text-white font-light tracking-wider uppercase text-sm overflow-hidden transition-all duration-500 hover:bg-gray-800"
              >
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Button content */}
                <span className="relative z-10 flex items-center gap-3">
                  <Award className="w-4 h-4 transform group-hover:scale-110 transition-transform duration-500" />
                  CONTACT US
                  <Award className="w-4 h-4 transform group-hover:scale-110 transition-transform duration-500" />
                </span>

                {/* Glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-xl"></div>
                </div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </button>
            </div>

            {/* Decorative Bottom Element */}
            <div className="mt-16 flex justify-center items-center gap-4 animate-fade-in-up-delay-3">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-gray-300"></div>
              <Gem className="w-5 h-5 text-gray-400 animate-pulse-slow" />
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-gray-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Decorative Line */}
      <div className="py-8 text-center">
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-auto"></div>
      </div>

      <Footer />
    </div>
  );
}
