import React from 'react';
import { BedDouble, Globe, MessageCircle, Camera, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const PublicFooter = () => {
  return (
    <footer id="footer" className="bg-[#0b1d30] text-white/80 pt-20 pb-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-white group cursor-pointer">
              <div className="bg-[#f2efe9] p-1.5 rounded-full shadow-lg group-hover:scale-110 group-hover:shadow-amber-500/20 transition-all duration-300">
                <img 
                  src="https://i.pinimg.com/736x/dd/8a/b9/dd8ab90ccd98321e07086b08d2bb1ea0.jpg" 
                  alt="Hotel Logo" 
                  className="h-12 w-12 object-cover rounded-full"
                />
              </div>
              <span className="text-2xl font-bold tracking-tight font-serif group-hover:text-amber-500 transition-colors">GrandHotel</span>
            </div>
            <p className="text-sm leading-relaxed">
              Experience the pinnacle of luxury and comfort in the heart of the city. We offer world-class hospitality, exquisite dining, and unforgettable stays.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-colors">
                <Globe size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-colors">
                <MessageCircle size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-colors">
                <Camera size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6 font-serif">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-amber-500 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-amber-500 transition-colors">About Hotel</a></li>
              <li><a href="#rooms" className="hover:text-amber-500 transition-colors">Rooms & Suites</a></li>
              <li><a href="#facilities" className="hover:text-amber-500 transition-colors">Facilities</a></li>
              <li><a href="#gallery" className="hover:text-amber-500 transition-colors">Photo Gallery</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6 font-serif">Contact Info</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <a 
                  href="https://www.google.com/maps/dir//Parul+University+Vadodara,+Gujarat,+P.O,+Ta,+Waghodia,+Limda,+Vadodara,+Gujarat+391760/@22.2887936,73.3642752,6853m/data=!3m1!1e3!4m8!4m7!1m0!1m5!1m1!1s0x395fda2400192473:0xc319c9237f2928e8!2m2!1d73.3646937!2d22.2876424?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-amber-500 transition-colors"
                >
                  Parul University Vadodara, Gujarat, P.O, Ta, Waghodia, Limda, Vadodara, Gujarat 391760
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-amber-500 shrink-0" />
                <span>+91 7481 986 648</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-amber-500 shrink-0" />
                <span>reservations@grandhotel.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6 font-serif">Newsletter</h4>
            <p className="text-sm mb-4">Subscribe to get the latest offers and exclusive deals directly to your inbox.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/10 border-0 text-white placeholder:text-white/40 text-sm px-4 py-3 w-full rounded-l-md focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <button 
                type="submit" 
                className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-3 rounded-r-md transition-colors"
              >
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Project Team Highlight */}
        <div className="mb-10 p-6 border border-amber-500/30 rounded-xl bg-amber-500/5 flex flex-col items-center justify-center text-center">
          <h4 className="text-amber-500 font-bold uppercase tracking-[0.2em] text-sm mb-4">Developed By</h4>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <div className="flex flex-col items-center">
              <span className="text-white font-semibold text-lg">Amarditya Kumar</span>
              <span className="text-amber-500 text-xs font-bold uppercase tracking-wider mt-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">Leader</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-white/90 font-medium text-lg">Harsh kumar</span>
              <span className="text-white/50 text-xs font-bold uppercase tracking-wider mt-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">Member</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-white/90 font-medium text-lg">Vikalp kumar</span>
              <span className="text-white/50 text-xs font-bold uppercase tracking-wider mt-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">Member</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} GrandHotel. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
