import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Sparkles,
} from "lucide-react";
import { AuthContext } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { cart } = useCart();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="text-xs py-2 px-4 text-center font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <p className="flex items-center justify-center gap-2">
          <Sparkles className="w-3 h-3" />
          Free Worldwide Shipping & Returns | Lifetime Warranty | Expert
          Craftsmanship
        </p>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              className="lg:hidden text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link
              to="/"
              className="text-3xl tracking-widest text-gray-900 font-thin"
            >
              <span className="text-gradient">JWELLCO</span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm">
            <Link
              to="/products"
              className="flex items-center gap-1 transition-all duration-300 hover:scale-105 font-medium tracking-wide text-gray-700 hover:text-blue-600"
            >
              PRODUCTS <ChevronDown size={14} className="opacity-70" />
            </Link>
            <Link
              to="/products?type=jewelry"
              className="flex items-center gap-1 transition-all duration-300 hover:scale-105 font-medium tracking-wide text-gray-700 hover:text-blue-600"
            >
              JEWELRY <ChevronDown size={14} className="opacity-70" />
            </Link>
            <Link
              to="/products?type=gem"
              className="flex items-center gap-1 transition-all duration-300 hover:scale-105 font-medium tracking-wide text-gray-700 hover:text-blue-600"
            >
              GEMSTONES <ChevronDown size={14} className="opacity-70" />
            </Link>
            <Link
              to="/blogs"
              className="flex items-center gap-1 transition-all duration-300 hover:scale-105 font-medium tracking-wide text-gray-700 hover:text-blue-600"
            >
              EDUCATION <ChevronDown size={14} className="opacity-70" />
            </Link>
            <Link
              to="/about"
              className="flex items-center gap-1 transition-all duration-300 hover:scale-105 font-medium tracking-wide text-gray-700 hover:text-blue-600"
            >
              ABOUT
            </Link>
          </nav>

          <div className="flex items-center gap-6">
            <Link to="/products" className="relative group">
              <Search
                size={20}
                className="cursor-pointer transition-all duration-300 group-hover:scale-110 text-gray-600 hover:text-blue-600"
              />
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 group-hover:w-full transition-all duration-300 bg-blue-600"></div>
            </Link>

            <Link to="/saved" className="relative group">
              <Heart
                size={20}
                className="cursor-pointer transition-all duration-300 group-hover:scale-110 text-gray-600 hover:text-red-500"
              />
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 group-hover:w-full transition-all duration-300 bg-red-500"></div>
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="relative group">
                  <User
                    size={20}
                    className="cursor-pointer transition-all duration-300 group-hover:scale-110 text-gray-600 hover:text-blue-600"
                  />
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 group-hover:w-full transition-all duration-300 bg-blue-600"></div>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 transition-all duration-300 group text-gray-600 hover:text-red-600"
                  title="Logout"
                >
                  <LogOut
                    size={18}
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                  <span className="hidden sm:inline text-sm font-medium tracking-wide">
                    Logout
                  </span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <Link to="/cart" className="relative group">
              <ShoppingCart
                size={20}
                className="cursor-pointer transition-all duration-300 group-hover:scale-110 text-gray-600 hover:text-blue-600"
              />
              <span className="absolute -top-2 -right-2 text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow-lg bg-blue-600 text-white">
                {cart.totalItems || 0}
              </span>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 group-hover:w-full transition-all duration-300 bg-blue-600"></div>
            </Link>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg">
          <nav className="container mx-auto px-4 py-6 space-y-4">
            <Link
              to="/products"
              className="block py-2 transition-colors font-medium tracking-wide text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              PRODUCTS
            </Link>
            <Link
              to="/products?type=jewelry"
              className="block py-2 transition-colors font-medium tracking-wide text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              JEWELRY
            </Link>
            <Link
              to="/products?type=gem"
              className="block py-2 transition-colors font-medium tracking-wide text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              GEMSTONES
            </Link>
            <Link
              to="/blogs"
              className="block py-2 transition-colors font-medium tracking-wide text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              EDUCATION
            </Link>
            <Link
              to="/about"
              className="block py-2 transition-colors font-medium tracking-wide text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              ABOUT
            </Link>
            {!user && (
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Link
                  to="/login"
                  className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
