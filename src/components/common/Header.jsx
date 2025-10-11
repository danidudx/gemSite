import { useState, useContext } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Menu,
  X,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="border-b">
      <div className="bg-gray-50 text-xs py-2 px-4 text-center">
        <p>Free Shipping & Returns on All Orders | 30-Day Returns</p>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-2xl font-serif">Jwellco</h1>
          </div>

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

          <div className="flex items-center gap-4">
            <Search size={20} className="cursor-pointer hover:text-blue-600" />
            <Heart size={20} className="cursor-pointer hover:text-blue-600" />
            {user ? (
              <button
                onClick={logout}
                className="flex items-center gap-1 text-sm hover:text-blue-600 transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            ) : (
              <User size={20} className="cursor-pointer hover:text-blue-600" />
            )}
            <div className="relative">
              <ShoppingCart
                size={20}
                className="cursor-pointer hover:text-blue-600"
              />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
