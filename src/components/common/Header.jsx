import { useState, useContext } from "react";
import { Link } from "react-router-dom";
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm">
     

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              className="lg:hidden text-white hover:text-gray-200 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link
              to="/"
              className="text-3xl tracking-widest text-white font-serif font-light"
            >
              <span className="text-gradient">Dianne</span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm">
            <Link
              to="/"
              className="flex items-center gap-1 transition-all duration-300 hover:scale-105 font-medium tracking-wide text-white hover:text-gray-200 border-b-2 border-white pb-1"
            >
              HOME <ChevronDown size={14} className="opacity-70" />
            </Link>
            <Link
              to="/products"
              className="flex items-center gap-1 transition-all duration-300 hover:scale-105 font-medium tracking-wide text-white hover:text-gray-200"
            >
              SHOP <ChevronDown size={14} className="opacity-70" />
            </Link>
            <Link
              to="/products"
              className="flex items-center gap-1 transition-all duration-300 hover:scale-105 font-medium tracking-wide text-white hover:text-gray-200"
            >
              PRODUCTS <ChevronDown size={14} className="opacity-70" />
            </Link>
            <Link
              to="/pages"
              className="flex items-center gap-1 transition-all duration-300 hover:scale-105 font-medium tracking-wide text-white hover:text-gray-200"
            >
              PAGES <ChevronDown size={14} className="opacity-70" />
            </Link>
            <Link
              to="/blogs"
              className="flex items-center gap-1 transition-all duration-300 hover:scale-105 font-medium tracking-wide text-white hover:text-gray-200"
            >
              BLOG <ChevronDown size={14} className="opacity-70" />
            </Link>
          </nav>

          <div className="flex items-center gap-6">
            <Link to="/products" className="relative group">
              <Search
                size={20}
                className="cursor-pointer transition-all duration-300 group-hover:scale-110 text-white hover:text-gray-200"
              />
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 group-hover:w-full transition-all duration-300 bg-white"></div>
            </Link>

            <Link to="/saved" className="relative group">
              <Heart
                size={20}
                className="cursor-pointer transition-all duration-300 group-hover:scale-110 text-white hover:text-gray-200"
              />
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 group-hover:w-full transition-all duration-300 bg-white"></div>
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="relative group">
                  <User
                    size={20}
                    className="cursor-pointer transition-all duration-300 group-hover:scale-110 text-white hover:text-gray-200"
                  />
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 group-hover:w-full transition-all duration-300 bg-white"></div>
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
                  className="text-sm font-medium text-white hover:text-gray-200 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <Link to="/cart" className="relative group flex items-center gap-2">
              <ShoppingCart
                size={20}
                className="cursor-pointer transition-all duration-300 group-hover:scale-110 text-white hover:text-gray-200"
              />
              <span className="text-sm font-medium text-white hover:text-gray-200 transition-colors">
                CART ({cart.totalItems || 0})
              </span>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 group-hover:w-full transition-all duration-300 bg-white"></div>
            </Link>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md border-t border-gray-600 shadow-lg">
          <nav className="container mx-auto px-4 py-6 space-y-4">
            <Link
              to="/"
              className="block py-2 transition-colors font-medium tracking-wide text-white hover:text-gray-200"
              onClick={() => setIsMenuOpen(false)}
            >
              HOME
            </Link>
            <Link
              to="/products"
              className="block py-2 transition-colors font-medium tracking-wide text-white hover:text-gray-200"
              onClick={() => setIsMenuOpen(false)}
            >
              SHOP
            </Link>
            <Link
              to="/products"
              className="block py-2 transition-colors font-medium tracking-wide text-white hover:text-gray-200"
              onClick={() => setIsMenuOpen(false)}
            >
              PRODUCTS
            </Link>
            <Link
              to="/pages"
              className="block py-2 transition-colors font-medium tracking-wide text-white hover:text-gray-200"
              onClick={() => setIsMenuOpen(false)}
            >
              PAGES
            </Link>
            <Link
              to="/blogs"
              className="block py-2 transition-colors font-medium tracking-wide text-white hover:text-gray-200"
              onClick={() => setIsMenuOpen(false)}
            >
              BLOG
            </Link>
            {!user && (
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Link
                  to="/login"
                  className="block py-2 text-white hover:text-gray-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block py-2 text-white hover:text-gray-200 font-medium"
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
