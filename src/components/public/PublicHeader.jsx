import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { BedDouble, Menu, X } from 'lucide-react';
import { cn } from '../../utils/cn';

const PublicHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className={cn(
            "flex items-center gap-2 group",
            isScrolled ? "text-[#102a43]" : "text-white"
          )}>
            <div className="bg-[#f2efe9] p-1.5 rounded-full shadow-lg hover:scale-110 hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-300 group-hover:-rotate-3 border border-white/50">
              <img 
                src="https://i.pinimg.com/736x/dd/8a/b9/dd8ab90ccd98321e07086b08d2bb1ea0.jpg" 
                alt="Hotel Logo" 
                className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 object-cover rounded-full"
              />
            </div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight font-serif group-hover:text-amber-500 transition-colors">GrandHotel</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-amber-500",
                  isScrolled ? "text-gray-600" : "text-white/90"
                )}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="#book"
              className={cn(
                "px-6 py-2.5 rounded-md text-sm font-semibold transition-all shadow-sm",
                isScrolled 
                  ? "bg-[#102a43] text-white hover:bg-[#243b53]" 
                  : "bg-white text-[#102a43] hover:bg-gray-100"
              )}
            >
              Book Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 py-4 px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className="text-gray-800 font-medium py-2 border-b border-gray-50"
            >
              {link.name}
            </a>
          ))}
          <div className="flex flex-col gap-3 mt-2">
            <a 
              href="#book"
              onClick={() => setIsMobileOpen(false)}
              className="bg-[#102a43] text-white text-center px-6 py-3 rounded-md font-semibold"
            >
              Book Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicHeader;
