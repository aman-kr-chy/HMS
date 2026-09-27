import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { BedDouble, Menu, X, LogOut, UserCircle } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useData } from '../../context/DataContext';
import AuthModal from './AuthModal';

const PublicHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { currentUser: user, setCurrentUser: setUser, isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Rooms & Suites', href: '#rooms' },
    { name: 'About Us', href: '#about' },
    { name: 'Facilities', href: '#facilities' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#footer' },
  ];

  return (
    <header 
      className={cn(
        "fixed z-50 transition-all duration-500 ease-in-out left-1/2 -translate-x-1/2",
        isScrolled 
          ? "top-4 w-[96%] md:w-[90%] max-w-7xl bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-full py-2 px-4 md:px-8 border border-white/50" 
          : "top-0 w-full bg-gradient-to-b from-black/50 to-transparent py-6 px-4 md:px-8"
      )}
    >
      <div className={cn("mx-auto", isScrolled ? "w-full" : "max-w-7xl")}>
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className={cn(
            "flex items-center gap-3 group",
            isScrolled ? "text-[#102a43]" : "text-white"
          )}>
            <div className="relative">
              <div className="absolute inset-0 bg-amber-500 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="bg-[#f2efe9] p-1.5 rounded-full shadow-lg relative z-10 group-hover:rotate-[360deg] transition-transform duration-700 ease-in-out border-2 border-transparent group-hover:border-amber-400">
                <img 
                  src="https://i.pinimg.com/736x/dd/8a/b9/dd8ab90ccd98321e07086b08d2bb1ea0.jpg" 
                  alt="Hotel Logo" 
                  className="h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 object-cover rounded-full"
                />
              </div>
            </div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight font-serif group-hover:text-amber-500 transition-colors drop-shadow-sm">GrandHotel</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className={cn(
                  "relative text-sm font-medium transition-colors hover:text-amber-500 group py-2",
                  isScrolled ? "text-gray-700 font-semibold" : "text-white/90 drop-shadow-sm"
                )}
              >
                {link.name}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-amber-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              to="/admin"
              className={cn(
                "relative text-sm font-semibold transition-colors hover:text-amber-500 group py-1",
                isScrolled ? "text-gray-700" : "text-white/90 drop-shadow-sm"
              )}
            >
              Admin Panel
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-amber-500 transform scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
            <div className="h-4 w-px bg-gray-400/50 mx-1"></div>
            
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative">
                    <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full border-2 border-transparent group-hover:border-amber-400 transition-colors" />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <span className={cn(
                    "text-sm font-semibold group-hover:text-amber-500 transition-colors",
                    isScrolled ? "text-gray-800" : "text-white"
                  )}>
                    {user.name}
                  </span>
                </div>
                <button 
                  onClick={() => setUser(null)}
                  className={cn(
                    "p-1.5 rounded-full transition-all hover:bg-red-500 hover:text-white",
                    isScrolled ? "text-gray-500" : "text-white/80"
                  )}
                  title="Sign Out"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }}
                  className={cn(
                    "text-sm font-semibold transition-colors hover:text-amber-500",
                    isScrolled ? "text-gray-700" : "text-white/90 drop-shadow-sm"
                  )}>
                  Sign In
                </button>
                <button 
                  onClick={() => { setAuthMode('register'); setIsAuthModalOpen(true); }}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-semibold transition-all border",
                    isScrolled 
                      ? "border-[#102a43] text-[#102a43] hover:bg-[#102a43] hover:text-white" 
                      : "border-white text-white hover:bg-white hover:text-[#102a43]"
                  )}>
                  Sign Up
                </button>
              </div>
            )}

            <a 
              href="#rooms"
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-bold transition-all ml-2 relative overflow-hidden group",
                isScrolled 
                  ? "bg-gradient-to-r from-[#102a43] to-[#243b53] text-white shadow-lg hover:shadow-xl hover:scale-105" 
                  : "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg hover:shadow-xl hover:scale-105"
              )}
            >
              <span className="relative z-10 flex items-center gap-2">
                Book Now
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? (
              <X size={24} className={isScrolled ? "text-gray-900" : "text-white"} />
            ) : (
              <Menu size={24} className={isScrolled ? "text-gray-900" : "text-white"} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden absolute top-[calc(100%+10px)] left-4 right-4 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-gray-100 py-4 px-4 flex flex-col gap-2 animate-in slide-in-from-top-2 fade-in duration-200 z-50 overflow-hidden">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className="text-gray-800 font-medium py-3 px-4 rounded-xl hover:bg-amber-50 hover:text-amber-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="flex flex-col gap-3 mt-2">
            <Link 
              to="/admin"
              onClick={() => setIsMobileOpen(false)}
              className="text-gray-800 font-medium py-2 border-b border-gray-50"
            >
              Admin Panel
            </Link>
            
            {user ? (
              <div className="flex items-center justify-between border border-gray-100 p-3 rounded-md bg-gray-50">
                <div className="flex items-center gap-3">
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                  <span className="text-gray-800 font-semibold">{user.name}</span>
                </div>
                <button 
                  onClick={() => setUser(null)}
                  className="p-2 text-gray-500 hover:text-red-500"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex gap-4">
                <button 
                  onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); setIsMobileOpen(false); }}
                  className="flex-1 text-center py-2 text-[#102a43] font-semibold border border-[#102a43] rounded-md"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => { setAuthMode('register'); setIsAuthModalOpen(true); setIsMobileOpen(false); }}
                  className="flex-1 text-center py-2 bg-gray-100 text-[#102a43] font-semibold rounded-md"
                >
                  Sign Up
                </button>
              </div>
            )}

            <a 
              href="#rooms"
              onClick={() => setIsMobileOpen(false)}
              className="bg-[#102a43] text-white text-center px-6 py-3 rounded-md font-semibold mt-2"
            >
              Book Now
            </a>
          </div>
        </div>
      )}

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={(userData) => setUser(userData)}
        defaultMode={authMode} 
      />
    </header>
  );
};

export default PublicHeader;
