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
  Sparkles,
} from "lucide-react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b" style={{backgroundColor: 'var(--bg-glass-dark)', borderColor: 'var(--border-primary)'}}>
      <div className="text-xs py-2 px-4 text-center font-medium" style={{background: 'var(--gradient-primary)', color: 'var(--color-black)'}}>
        <p className="flex items-center justify-center gap-2">
          <Sparkles className="w-3 h-3" />
          Free Worldwide Shipping & Returns | Lifetime Warranty | Expert Craftsmanship
        </p>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              className="lg:hidden transition-colors"
              style={{color: 'var(--text-primary)'}}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-3xl tracking-widest" style={{color: 'var(--text-primary)', fontFamily: 'var(--font-secondary)', fontWeight: 'var(--font-thin)'}}>
              <span className="text-gradient">
                JWELLCO
              </span>
            </h1>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm">
            <a href="#" className="flex items-center gap-1 transition-all duration-300 hover:scale-105 font-light tracking-wide" style={{color: 'var(--text-secondary)'}}>
              ENGAGEMENT <ChevronDown size={14} className="opacity-70" />
            </a>
            <a href="#" className="flex items-center gap-1 transition-all duration-300 hover:scale-105 font-light tracking-wide" style={{color: 'var(--text-secondary)'}}>
              JEWELRY <ChevronDown size={14} className="opacity-70" />
            </a>
            <a href="#" className="flex items-center gap-1 transition-all duration-300 hover:scale-105 font-light tracking-wide" style={{color: 'var(--text-secondary)'}}>
              DIAMONDS <ChevronDown size={14} className="opacity-70" />
            </a>
            <a href="#" className="flex items-center gap-1 transition-all duration-300 hover:scale-105 font-light tracking-wide" style={{color: 'var(--text-secondary)'}}>
              GEMSTONES <ChevronDown size={14} className="opacity-70" />
            </a>
            <a href="#" className="flex items-center gap-1 transition-all duration-300 hover:scale-105 font-light tracking-wide" style={{color: 'var(--text-secondary)'}}>
              EDUCATION <ChevronDown size={14} className="opacity-70" />
            </a>
          </nav>

          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search 
                size={20} 
                className="cursor-pointer transition-all duration-300 group-hover:scale-110" 
                style={{color: 'var(--text-tertiary)'}}
              />
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 group-hover:w-full transition-all duration-300" style={{backgroundColor: 'var(--color-primary)'}}></div>
            </div>
            
            <div className="relative group">
              <Heart 
                size={20} 
                className="cursor-pointer transition-all duration-300 group-hover:scale-110" 
                style={{color: 'var(--text-tertiary)'}}
              />
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 group-hover:w-full transition-all duration-300" style={{backgroundColor: 'var(--color-primary)'}}></div>
            </div>
            
            {user ? (
              <button
                onClick={logout}
                className="flex items-center gap-2 transition-all duration-300 group"
                title="Logout"
                style={{color: 'var(--text-tertiary)'}}
              >
                <LogOut size={18} className="group-hover:scale-110 transition-transform duration-300" />
                <span className="hidden sm:inline text-sm font-light tracking-wide">Logout</span>
              </button>
            ) : (
              <div className="relative group">
                <User 
                  size={20} 
                  className="cursor-pointer transition-all duration-300 group-hover:scale-110" 
                  style={{color: 'var(--text-tertiary)'}}
                />
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 group-hover:w-full transition-all duration-300" style={{backgroundColor: 'var(--color-primary)'}}></div>
              </div>
            )}
            
            <div className="relative group">
              <ShoppingCart
                size={20}
                className="cursor-pointer transition-all duration-300 group-hover:scale-110"
                style={{color: 'var(--text-tertiary)'}}
              />
              <span className="absolute -top-2 -right-2 text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow-lg" style={{background: 'var(--gradient-primary)', color: 'var(--color-black)'}}>
                0
              </span>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 group-hover:w-full transition-all duration-300" style={{backgroundColor: 'var(--color-primary)'}}></div>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 backdrop-blur-md border-t" style={{backgroundColor: 'var(--bg-glass-dark)', borderColor: 'var(--border-primary)'}}>
          <nav className="container mx-auto px-4 py-6 space-y-4">
            <a href="#" className="block py-2 transition-colors font-light tracking-wide" style={{color: 'var(--text-secondary)'}}>
              ENGAGEMENT
            </a>
            <a href="#" className="block py-2 transition-colors font-light tracking-wide" style={{color: 'var(--text-secondary)'}}>
              JEWELRY
            </a>
            <a href="#" className="block py-2 transition-colors font-light tracking-wide" style={{color: 'var(--text-secondary)'}}>
              DIAMONDS
            </a>
            <a href="#" className="block py-2 transition-colors font-light tracking-wide" style={{color: 'var(--text-secondary)'}}>
              GEMSTONES
            </a>
            <a href="#" className="block py-2 transition-colors font-light tracking-wide" style={{color: 'var(--text-secondary)'}}>
              EDUCATION
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
