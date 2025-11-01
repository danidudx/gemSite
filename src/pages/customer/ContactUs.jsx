import { useState, useEffect, useRef } from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { useNotification } from "../../hooks/useNotification";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, User, AtSign } from "lucide-react";

export default function ContactUs() {
  const { showNotification } = useNotification();
  const contactCardsRef = useRef(null);
  const cardRefs = useRef([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  
  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      details: ["123 Luxury Jewelry Avenue", "New York, NY 10001", "United States"],
      link: "#",
      linkText: "Get Directions",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 123-4568"],
      link: "tel:+15551234567",
      linkText: "Call Now",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: ["info@jwellco.com", "support@jwellco.com"],
      link: "mailto:info@jwellco.com",
      linkText: "Send Email",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: ["Monday - Friday: 9:00 AM - 7:00 PM", "Saturday: 10:00 AM - 6:00 PM", "Sunday: 11:00 AM - 5:00 PM"],
      link: "#",
      linkText: null,
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const currentRef = contactCardsRef.current;
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

  useEffect(() => {
    if (!hasStarted || !contactCardsRef.current || isHovered) return;

    const interval = setInterval(() => {
      setActiveCardIndex((prevIndex) => (prevIndex + 1) % contactInfo.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [hasStarted, isHovered, contactInfo.length]);

  useEffect(() => {
    if (!contactCardsRef.current || cardRefs.current.length === 0) return;

    const activeCard = cardRefs.current[activeCardIndex];
    if (!activeCard) return;

    const container = contactCardsRef.current;
    const cardTop = activeCard.offsetTop;
    const cardHeight = activeCard.offsetHeight;
    const containerHeight = container.clientHeight;
    const scrollPosition = cardTop - (containerHeight / 2) + (cardHeight / 2);

    container.scrollTo({
      top: Math.max(0, scrollPosition),
      behavior: 'smooth'
    });
  }, [activeCardIndex, hasStarted]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      showNotification("Thank you! Your message has been sent successfully.", "success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch {
      showNotification("Failed to send message. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
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
                Get in Touch
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 tracking-tight leading-tight animate-fade-in-up-delay drop-shadow-lg">
              We'd Love to Hear From You
            </h1>

            <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-8 animate-fade-in-up-delay-2"></div>

            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto font-light animate-fade-in-up-delay-3">
              Have a question about our jewelry? Need help with customization? 
              Or simply want to share your story? Our team is here to assist you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Form */}
            <div className="order-2 lg:order-1">
              <div className="inline-block mb-4">
                <span className="text-sm md:text-base uppercase tracking-[0.2em] text-gray-500 font-medium">
                  Send Us a Message
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 mb-6 tracking-tight">
                Let's Connect
              </h2>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8"></div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="group">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-gray-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <User className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 font-light"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-gray-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <AtSign className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 font-light"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="group">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <Phone className="w-5 h-5" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 font-light"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="group">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject <span className="text-gray-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 font-light"
                    placeholder="What is this regarding?"
                  />
                </div>

                {/* Message */}
                <div className="group">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message <span className="text-gray-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-4 flex items-start pointer-events-none text-gray-400">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 font-light resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-all duration-300 font-light tracking-wide flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="order-1 lg:order-2">
              <div className="sticky top-32 max-w-md mx-auto lg:mx-0">
                <div className="inline-block mb-4">
                  <span className="text-sm md:text-base uppercase tracking-[0.2em] text-gray-500 font-medium">
                    Contact Information
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 mb-6 tracking-tight">
                  Reach Out
                </h2>
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8"></div>

                <div 
                  ref={contactCardsRef}
                  className="space-y-8 max-h-[600px] overflow-y-auto scrollbar-hide"
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {contactInfo.map((info, index) => {
                    const isActive = index === activeCardIndex;
                    return (
                    <div
                      key={index}
                      ref={(el) => {
                        if (el) cardRefs.current[index] = el;
                      }}
                      className={`group relative rounded-xl shadow-lg transition-all duration-700 border overflow-hidden ${
                        isActive
                          ? 'bg-gradient-to-br from-gray-50 to-white border-gray-300 shadow-gray-200/50 scale-[1.02] opacity-100'
                          : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-xl hover:scale-[1.01] opacity-70'
                      }`}
                    >
                      {/* Content */}
                      <div className="relative p-6 md:p-8 z-10">
                        <div className={`mb-4 text-gray-900 transform transition-transform duration-300 ${
                          isActive ? 'scale-110' : 'group-hover:scale-110'
                        }`}>
                          {info.icon}
                        </div>
                        <h3 className={`text-xl md:text-2xl font-serif mb-4 transition-colors duration-300 ${
                          isActive ? 'text-gray-900' : 'text-gray-900 group-hover:text-gray-700'
                        }`}>
                          {info.title}
                        </h3>
                        <div className="space-y-2">
                          {info.details.map((detail, idx) => (
                            <p
                              key={idx}
                              className={`leading-relaxed text-sm md:text-base font-light transition-colors duration-300 ${
                                isActive ? 'text-gray-700' : 'text-gray-600 group-hover:text-gray-700'
                              }`}
                            >
                              {detail}
                            </p>
                          ))}
                        </div>
                        {info.linkText && (
                          <a
                            href={info.link}
                            className="inline-block mt-4 text-sm font-medium text-gray-900 hover:text-gray-700 border-b border-gray-900 hover:border-gray-700 transition-all duration-300"
                          >
                            {info.linkText}
                          </a>
                        )}
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

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    </div>
                  )})}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-sm md:text-base uppercase tracking-[0.2em] text-gray-500 font-medium">
                Find Us
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 mb-6 tracking-tight">
              Visit Our Showroom
            </h2>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto"></div>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-200">
              {/* Placeholder Map - Replace with actual map integration */}
              <div className="w-full h-[500px] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `
                    linear-gradient(45deg, rgba(26, 61, 82, 0.1) 25%, transparent 25%),
                    linear-gradient(-45deg, rgba(26, 61, 82, 0.1) 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, rgba(26, 61, 82, 0.1) 75%),
                    linear-gradient(-45deg, transparent 75%, rgba(26, 61, 82, 0.1) 75%)
                  `,
                  backgroundSize: '60px 60px',
                  backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
                }}></div>
                
                {/* Map Placeholder Content */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg text-gray-600 font-light mb-2">123 Luxury Jewelry Avenue</p>
                    <p className="text-base text-gray-500 font-light">New York, NY 10001</p>
                    <p className="text-sm text-gray-400 font-light mt-4">
                      (Map integration can be added here)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 mb-6 tracking-tight">
              Ready to Start Your Journey?
            </h2>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-12 font-light max-w-2xl mx-auto">
              Whether you're looking for the perfect engagement ring, a custom design, 
              or expert advice, we're here to help you find exactly what you're looking for.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/products"
                className="border-2 border-gray-900 px-10 py-3 hover:bg-gray-900 hover:text-white transition-colors duration-300 font-light tracking-wide"
              >
                EXPLORE COLLECTION
              </a>
              <a
                href="/about-us"
                className="bg-gray-900 text-white px-10 py-3 hover:bg-gray-800 transition-colors duration-300 font-light tracking-wide"
              >
                LEARN MORE
              </a>
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
