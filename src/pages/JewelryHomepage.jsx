import { useState } from 'react';
import { Search, ShoppingCart, User, Heart, Menu, X, ChevronDown } from 'lucide-react';

export default function JewelryHomepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        {/* Top Bar */}
        <div className="bg-gray-50 text-xs py-2 px-4 text-center">
          <p>Free Shipping & Returns on All Orders | 30-Day Returns</p>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <button 
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-2xl font-serif">Blue Nile</h1>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center gap-6 text-sm">
              <a href="#" className="hover:text-blue-600 flex items-center gap-1">
                ENGAGEMENT <ChevronDown size={16} />
              </a>
              <a href="#" className="hover:text-blue-600 flex items-center gap-1">
                JEWELRY <ChevronDown size={16} />
              </a>
              <a href="#" className="hover:text-blue-600 flex items-center gap-1">
                DIAMONDS <ChevronDown size={16} />
              </a>
              <a href="#" className="hover:text-blue-600 flex items-center gap-1">
                GEMSTONES <ChevronDown size={16} />
              </a>
              <a href="#" className="hover:text-blue-600 flex items-center gap-1">
                EDUCATION <ChevronDown size={16} />
              </a>
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <Search size={20} className="cursor-pointer hover:text-blue-600" />
              <Heart size={20} className="cursor-pointer hover:text-blue-600" />
              <User size={20} className="cursor-pointer hover:text-blue-600" />
              <div className="relative">
                <ShoppingCart size={20} className="cursor-pointer hover:text-blue-600" />
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] bg-gray-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=600&fit=crop" 
          alt="Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center px-4">
          <p className="text-sm mb-2 tracking-widest">JEWELRY & GIFTS</p>
          <h2 className="text-4xl md:text-5xl font-light mb-6">STYLE THAT FEELS<br/>TRULY YOURS</h2>
          <div className="flex gap-4">
            <button className="bg-white text-gray-900 px-8 py-3 hover:bg-gray-100 transition">
              SHOP ENGAGEMENT
            </button>
            <button className="bg-transparent border-2 border-white px-8 py-3 hover:bg-white hover:text-gray-900 transition">
              SHOP JEWELRY
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-gray-50 mb-4 h-64 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop" 
                alt="Engagement Rings" 
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="text-lg font-medium mb-2">ENGAGEMENT RINGS</h3>
          </div>
          <div className="text-center">
            <div className="bg-gray-50 mb-4 h-64 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop" 
                alt="Wedding Rings" 
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="text-lg font-medium mb-2">WEDDING RINGS</h3>
          </div>
          <div className="text-center">
            <div className="bg-gray-50 mb-4 h-64 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=400&h=400&fit=crop" 
                alt="Diamonds" 
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="text-lg font-medium mb-2">DIAMONDS</h3>
          </div>
        </div>
      </section>

      {/* Creative Studio Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-light mb-4">CREATIVE STUDIO</h2>
              <h3 className="text-4xl font-light mb-6">TAILOR-MADE BY YOU</h3>
              <p className="mb-6 text-gray-300">
                From classic bands to modern statement rings, we've created a curated
                collection of customizable jewelry so you can craft pieces that are
                uniquely yours at any price point.
              </p>
              <button className="border-2 border-white px-8 py-3 hover:bg-white hover:text-gray-900 transition">
                CREATE MY RING
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <img 
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=300&fit=crop" 
                alt="Ring 1" 
                className="w-full h-48 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=300&fit=crop" 
                alt="Ring 2" 
                className="w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Diamond Shapes Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-gray-50 p-8">
            <img 
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop" 
              alt="Diamonds" 
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-light mb-8">EXPLORE DIAMOND SHAPES</h2>
            <div className="grid grid-cols-3 gap-6 mb-8">
              {['Round', 'Princess', 'Cushion', 'Emerald', 'Pear', 'Oval', 'Marquise', 'Radiant', 'Heart'].map((shape) => (
                <div key={shape} className="text-center cursor-pointer hover:text-blue-600">
                  <div className="w-16 h-16 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-gray-300"></div>
                  </div>
                  <p className="text-xs">{shape}</p>
                </div>
              ))}
            </div>
            <button className="border-2 border-gray-900 px-8 py-3 hover:bg-gray-900 hover:text-white transition">
              BUILD YOUR DIAMOND
            </button>
          </div>
        </div>
      </section>

      {/* Personalized Collection */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 text-center">
              <h3 className="text-2xl font-light mb-4">NEW: PERSONALIZED<br/>GEMSTONE COLLECTION</h3>
              <button className="border-2 border-gray-900 px-8 py-3 hover:bg-gray-900 hover:text-white transition">
                SHOP NOW
              </button>
            </div>
            <div className="h-64">
              <img 
                src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=400&fit=crop" 
                alt="Gemstones" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pearls Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop" 
              alt="Pearl Jewelry" 
              className="w-full h-96 object-cover"
            />
          </div>
          <div>
            <h3 className="text-sm mb-2 tracking-widest">PEARLS FOR HER</h3>
            <h2 className="text-4xl font-light mb-6">AKOYA PEARLS</h2>
            <button className="border-2 border-gray-900 px-8 py-3 hover:bg-gray-900 hover:text-white transition">
              SHOP NOW
            </button>
          </div>
        </div>
      </section>

      {/* Showroom Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gray-100 p-8 text-center">
          <h2 className="text-3xl font-light mb-4">SHOWROOMS & STORES</h2>
          <h3 className="text-4xl font-light mb-6">VISIT US IN STORE</h3>
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop" 
            alt="Store" 
            className="w-full h-64 object-cover mb-6"
          />
          <button className="border-2 border-gray-900 px-8 py-3 hover:bg-gray-900 hover:text-white transition">
            FIND A SHOWROOM
          </button>
        </div>
      </section>

      {/* Why Blue Nile Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-light text-center mb-12">WHY BLUE NILE</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-48 mb-4 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=300&fit=crop" 
                  alt="Expert Guidance" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium mb-2">EXPERT GUIDANCE</h3>
              <p className="text-sm text-gray-600">
                Get personalized advice from our jewelry experts, available 24/7
              </p>
            </div>
            <div className="text-center">
              <div className="h-48 mb-4 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=300&fit=crop" 
                  alt="Quality Assured" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium mb-2">INTEGRITY OF SERVICE</h3>
              <p className="text-sm text-gray-600">
                Every diamond and gemstone comes with a certificate of authenticity
              </p>
            </div>
            <div className="text-center">
              <div className="h-48 mb-4 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=300&fit=crop" 
                  alt="Best Value" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium mb-2">EXCEPTIONAL VALUE</h3>
              <p className="text-sm text-gray-600">
                High-quality jewelry at exceptional prices with transparent pricing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-light text-center mb-12">REVIEWS</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border p-6">
              <div className="flex mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-sm mb-4">
                "Beautiful ring, excellent quality and amazing service. Highly recommend!"
              </p>
              <p className="text-xs text-gray-500">- Customer {i}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-medium mb-4">CUSTOMER SERVICE</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">ABOUT</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Our Story</a></li>
                <li><a href="#" className="hover:text-white">Press</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">EDUCATION</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Diamond Guide</a></li>
                <li><a href="#" className="hover:text-white">Ring Guide</a></li>
                <li><a href="#" className="hover:text-white">Jewelry Care</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">CONNECT</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Instagram</a></li>
                <li><a href="#" className="hover:text-white">Facebook</a></li>
                <li><a href="#" className="hover:text-white">Pinterest</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Blue Nile. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}