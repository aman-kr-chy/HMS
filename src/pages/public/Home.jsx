import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../utils/format';
import { BedDouble, Users, Wifi, Coffee, Dumbbell, MapPin, Play, Star, ChevronRight, CheckCircle2, X, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const Home = () => {
  const { rooms } = useData();
  
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '2',
    roomType: 'All'
  });

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleBookRoom = (room) => {
    setSelectedRoom(room);
    setPaymentSuccess(false);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentSuccess(true);
      setTimeout(() => {
        setSelectedRoom(null);
        setPaymentSuccess(false);
      }, 3000);
    }, 1500);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    alert('Search functionality would redirect to booking engine with these params!');
  };

  const featuredRooms = rooms.filter(r => r.status === 'Available');

  return (
    <div className="w-full overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative h-screen min-h-[600px] max-h-[900px] flex items-center justify-center bg-[#0b1d30]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Luxury Hotel Exterior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <motion.div 
          className="relative z-10 text-center px-4 mt-20"
          initial="hidden" animate="visible" variants={staggerContainer}
        >
          <motion.p variants={fadeUp} className="text-amber-400 uppercase tracking-[0.3em] text-sm font-bold mb-4 drop-shadow-md">
            Welcome to Our Hotel
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-7xl font-bold text-white font-serif mb-6 drop-shadow-xl">
            Experience Comfort <br /> <span className="italic text-amber-200 font-light">&</span> Luxury
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/95 text-lg max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md font-medium">
            Discover a world of elegance and tranquility. Immerse yourself in our premium amenities and world-class hospitality tailored just for you.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center gap-4 w-full px-4 sm:px-0">
            <a href="#rooms" className="w-full sm:w-auto px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-sm font-semibold transition-colors uppercase tracking-wider text-sm shadow-lg text-center">
              Explore Rooms
            </a>
            <a href="#book" className="w-full sm:w-auto px-8 py-3 bg-white hover:bg-gray-100 text-[#102a43] rounded-sm font-semibold transition-colors uppercase tracking-wider text-sm shadow-lg text-center">
              Book Your Stay
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. OUR ROOMS & SUITES SECTION */}
      <section id="rooms" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="text-center mb-16"
          >
            <p className="text-amber-500 uppercase tracking-[0.2em] text-sm font-bold mb-2">Luxury Accommodation</p>
            <h2 className="text-4xl font-serif font-bold text-[#0b1d30] mb-4">Our Rooms & Suites</h2>
            <div className="w-16 h-1 bg-amber-500 mx-auto"></div>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {featuredRooms.map((room) => {
              const roomImages = {
                Standard: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop",
                Deluxe: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
                Suite: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop",
                Executive: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop"
              };
              
              return (
                <motion.div key={room.id} variants={fadeUp} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={roomImages[room.type] || roomImages.Standard} 
                      alt={`${room.type} Room`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded-sm text-sm font-bold text-[#102a43] shadow-md border border-white/20">
                      {formatCurrency(room.price)} <span className="text-xs font-normal text-gray-500">/ night</span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">{room.type} Room</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-2">
                      Experience ultimate relaxation in our {room.type.toLowerCase()} room, featuring premium bedding and modern amenities for a perfect stay.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-700 mb-6 border-b border-gray-100 pb-4 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Users size={16} className="text-amber-500" />
                        <span>Up to {room.capacity} Guests</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BedDouble size={16} className="text-amber-500" />
                        <span>{room.capacity > 2 ? '2 King Beds' : '1 King Bed'}</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="w-full sm:flex-1 border border-[#102a43] text-[#102a43] hover:bg-primary-50 py-2.5 rounded-sm font-semibold text-sm transition-colors">
                        View Details
                      </button>
                      <button 
                        onClick={() => handleBookRoom(room)}
                        className="w-full sm:flex-1 bg-[#102a43] hover:bg-[#243b53] text-white py-2.5 rounded-sm font-semibold text-sm transition-colors shadow-md"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section id="about" className="py-24 px-4 bg-white overflow-hidden">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center"
        >
          <motion.div variants={fadeUp} className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl">
              {/* Fixed image URL */}
              <img 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop" 
                alt="Hotel Lobby" 
                className="w-full h-auto object-cover aspect-[4/3] hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-2/3 h-2/3 border-4 border-amber-500 rounded-lg z-0 hidden lg:block opacity-50"></div>
            
            <motion.div 
              initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", delay: 0.5 }}
              className="absolute -left-6 top-12 bg-white p-6 shadow-2xl rounded-lg z-20 hidden md:block border border-gray-50"
            >
              <div className="text-center">
                <p className="text-4xl font-bold text-amber-500 font-serif mb-1">25+</p>
                <p className="text-sm font-bold text-[#0b1d30] uppercase tracking-wider">Years of<br/>Experience</p>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div variants={fadeUp} className="lg:w-1/2 space-y-6">
            <p className="text-amber-500 uppercase tracking-[0.2em] text-sm font-bold">About Our Hotel</p>
            <h2 className="text-4xl font-serif font-bold text-[#0b1d30] leading-tight">
              A Legacy of Luxury <br/> & Exceptional Hospitality
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg font-medium">
              Nestled in the heart of the city, GrandHotel has been synonymous with elegance and unparalleled service since 1998. We believe in creating memorable experiences that linger long after your departure.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-100">
              <div className="flex items-start gap-3 hover:-translate-y-1 transition-transform cursor-pointer">
                <CheckCircle2 className="text-amber-500 shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">150+ Premium Rooms</h4>
                  <p className="text-sm text-gray-500 font-medium">Designed for ultimate comfort.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 hover:-translate-y-1 transition-transform cursor-pointer">
                <CheckCircle2 className="text-amber-500 shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Award Winning</h4>
                  <p className="text-sm text-gray-500 font-medium">Recognized for excellence.</p>
                </div>
              </div>
            </div>
            <div className="pt-6">
              <a href="#gallery" className="inline-flex items-center gap-2 px-8 py-3 bg-[#102a43] hover:bg-[#243b53] text-white rounded-sm font-semibold transition-colors uppercase tracking-wider text-sm shadow-md">
                Discover More <ChevronRight size={18} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 4. FACILITIES SECTION */}
      <section id="facilities" className="py-24 px-4 bg-[#0b1d30] text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16">
            <p className="text-amber-500 uppercase tracking-[0.2em] text-sm font-bold mb-2">Our Amenities</p>
            <h2 className="text-4xl font-serif font-bold">Hotel Facilities</h2>
          </motion.div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { icon: Wifi, title: "Free Wi-Fi", desc: "High-speed internet in all areas." },
              { icon: Coffee, title: "Restaurant", desc: "Fine dining & buffet breakfast." },
              { icon: Users, title: "Spa & Wellness", desc: "Relaxing massages & treatments." },
              { icon: Dumbbell, title: "Fitness Center", desc: "Fully equipped modern gym." },
            ].map((facility, idx) => {
              const Icon = facility.icon;
              return (
                <motion.div key={idx} variants={fadeUp} className="bg-white/5 border border-white/10 p-8 rounded-xl hover:bg-white/10 transition-all group cursor-pointer hover:-translate-y-2">
                  <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                    <Icon size={32} className="stroke-[1.5]" />
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-3 text-white">{facility.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed font-medium">{facility.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 5. MASONRY GALLERY */}
      <section id="gallery" className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <p className="text-amber-500 uppercase tracking-[0.2em] text-sm font-bold mb-2">Discover</p>
            <h2 className="text-4xl font-serif font-bold text-[#0b1d30] mb-4">Photo Gallery</h2>
            <div className="w-16 h-1 bg-amber-500 mx-auto"></div>
          </motion.div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="grid gap-4">
              <motion.img variants={fadeUp} className="h-auto max-w-full rounded-lg object-cover hover:opacity-90 transition-opacity shadow-sm" src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Luxury Hotel Room" />
              <motion.img variants={fadeUp} className="h-auto max-w-full rounded-lg object-cover hover:opacity-90 transition-opacity shadow-sm" src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Resort Pool" />
            </div>
            <div className="grid gap-4">
              <motion.img variants={fadeUp} className="h-auto max-w-full rounded-lg object-cover hover:opacity-90 transition-opacity shadow-sm" src="https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Hotel Interior" />
              <motion.img variants={fadeUp} className="h-auto max-w-full rounded-lg object-cover hover:opacity-90 transition-opacity shadow-sm" src="https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Hotel Exterior" />
            </div>
            <div className="grid gap-4">
              <motion.img variants={fadeUp} className="h-auto max-w-full rounded-lg object-cover hover:opacity-90 transition-opacity shadow-sm" src="https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Bedroom Suite" />
              <motion.img variants={fadeUp} className="h-auto max-w-full rounded-lg object-cover hover:opacity-90 transition-opacity shadow-sm" src="https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Luxury Bathroom" />
            </div>
            <div className="grid gap-4">
              <motion.img variants={fadeUp} className="h-auto max-w-full rounded-lg object-cover hover:opacity-90 transition-opacity shadow-sm" src="https://images.pexels.com/photos/1058759/pexels-photo-1058759.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Hotel Lounge" />
              <motion.img variants={fadeUp} className="h-auto max-w-full rounded-lg object-cover hover:opacity-90 transition-opacity shadow-sm" src="https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Hotel Dining" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. VIDEO TOUR */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }} whileInView={{ scale: 1 }} transition={{ duration: 10, ease: "linear" }}
            src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop" 
            alt="Hotel Video Thumbnail" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0b1d30]/70 backdrop-blur-[2px]"></div>
        </div>
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="relative z-10 max-w-3xl mx-auto text-center"
        >
          <button className="w-24 h-24 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-8 text-white hover:scale-110 transition-transform shadow-xl shadow-amber-500/30 group">
            <Play size={36} className="ml-2 fill-white group-hover:scale-110 transition-transform" />
          </button>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 drop-shadow-md">Take a Virtual Tour</h2>
          <p className="text-white/90 text-lg font-medium drop-shadow-sm">Explore our luxurious amenities, breathtaking suites, and world-class facilities from the comfort of your home.</p>
        </motion.div>
      </section>

      {/* 7. LOCATION & MAP */}
      <section className="py-24 px-4 bg-white border-b border-gray-100">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12"
        >
          <motion.div variants={fadeUp} className="lg:w-1/3 space-y-8">
            <div>
              <p className="text-amber-500 uppercase tracking-[0.2em] text-sm font-bold mb-2">Location</p>
              <h2 className="text-4xl font-serif font-bold text-[#0b1d30] mb-6">Find Us</h2>
              <p className="text-gray-700 font-medium leading-relaxed">Located centrally with easy access to major transportation hubs and tourist attractions.</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-primary-50 text-[#102a43] rounded-full flex items-center justify-center shrink-0 group-hover:bg-[#102a43] group-hover:text-white transition-colors">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Address</h4>
                  <p className="text-gray-600 text-sm mt-1 font-medium">Parul University Vadodara, Gujarat, P.O, Ta, Waghodia, Limda,<br/>Vadodara, Gujarat 391760</p>
                </div>
              </div>
              <div className="flex gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-primary-50 text-[#102a43] rounded-full flex items-center justify-center shrink-0 group-hover:bg-[#102a43] group-hover:text-white transition-colors">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Nearby Landmarks</h4>
                  <p className="text-gray-600 text-sm mt-1 font-medium">• Central Park (0.5 miles)<br/>• International Airport (15 miles)</p>
                </div>
              </div>
            </div>
            <a 
              href="https://www.google.com/maps/dir//Parul+University+Vadodara,+Gujarat,+P.O,+Ta,+Waghodia,+Limda,+Vadodara,+Gujarat+391760/@22.2887936,73.3642752,6853m/data=!3m1!1e3!4m8!4m7!1m0!1m5!1m1!1s0x395fda2400192473:0xc319c9237f2928e8!2m2!1d73.3646937!2d22.2876424?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full inline-block text-center px-6 py-3 border-2 border-[#102a43] text-[#102a43] hover:bg-[#102a43] hover:text-white rounded-sm font-semibold transition-all uppercase tracking-wider text-sm shadow-sm"
            >
              Get Directions
            </a>
          </motion.div>
          
          <motion.div variants={fadeUp} className="lg:w-2/3 bg-gray-200 rounded-xl overflow-hidden min-h-[400px] relative shadow-lg group">
            <iframe 
              src="https://maps.google.com/maps?q=Parul%20University,%20Vadodara&t=&z=13&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              style={{ border: 0, position: 'absolute', top: 0, left: 0 }} 
              allowFullScreen 
              aria-hidden="false" 
              tabIndex="0"
              title="Hotel Location on Google Maps"
            ></iframe>
          </motion.div>
        </motion.div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <p className="text-amber-500 uppercase tracking-[0.2em] text-sm font-bold mb-2">Reviews</p>
            <h2 className="text-4xl font-serif font-bold text-[#0b1d30] mb-4">What Our Guests Say</h2>
            <div className="w-16 h-1 bg-amber-500 mx-auto"></div>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { name: "Sarah Johnson", role: "Business Traveler", text: "The service was impeccable. From the moment I stepped into the lobby, I felt like royalty. The Executive suite was absolutely stunning." },
              { name: "Michael Chen", role: "Vacation", text: "Best hotel experience we've ever had. The spa facilities are top-notch and the restaurant food was exquisite. Highly recommended!" },
              { name: "Emma Davis", role: "Honeymoon", text: "We spent our honeymoon here and it was perfect. The staff went above and beyond to make our stay special. The ocean view from our room was breathtaking." }
            ].map((review, idx) => (
              <motion.div key={idx} variants={fadeUp} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100 relative group cursor-default">
                <div className="absolute top-0 right-8 w-8 h-1 bg-amber-500 rounded-b-sm"></div>
                <div className="flex text-amber-400 mb-6">
                  <Star size={18} className="fill-amber-400" />
                  <Star size={18} className="fill-amber-400" />
                  <Star size={18} className="fill-amber-400" />
                  <Star size={18} className="fill-amber-400" />
                  <Star size={18} className="fill-amber-400" />
                </div>
                <p className="text-gray-700 mb-8 italic text-lg leading-relaxed font-medium">"{review.text}"</p>
                <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-[#102a43] font-bold text-xl group-hover:bg-[#102a43] group-hover:text-white transition-colors">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900">{review.name}</h5>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PAYMENT MODAL */}
      {selectedRoom && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="bg-white w-full max-w-md rounded-xl shadow-2xl relative max-h-[90vh] overflow-y-auto"
          >
            <button 
              onClick={() => !isProcessingPayment && setSelectedRoom(null)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
              disabled={isProcessingPayment}
            >
              <X size={24} />
            </button>
            
            {paymentSuccess ? (
              <div className="p-10 text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
                <p className="text-gray-600 mb-6">Your payment for the {selectedRoom.type} Room was successful.</p>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Redirecting...</p>
              </div>
            ) : (
              <>
                <div className="bg-[#0b1d30] p-6 text-white text-center">
                  <h3 className="text-xl font-serif font-bold mb-1">Complete Booking</h3>
                  <p className="text-white/70 text-sm">{selectedRoom.type} Room • {formatCurrency(selectedRoom.price)} / night</p>
                </div>
                
                <form onSubmit={handlePayment} className="p-6 space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-gray-900 uppercase tracking-wider mb-2 border-b pb-2">Guest Details</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input type="text" placeholder="First Name" defaultValue="Aman" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#102a43]" />
                      <input type="text" placeholder="Last Name" defaultValue="Kumar" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#102a43]" />
                    </div>
                    <input type="email" placeholder="Email Address" defaultValue="amankr698891@gmail.com" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#102a43]" />
                  </div>
                  
                  <div className="space-y-3 pt-2">
                    <h4 className="font-semibold text-sm text-gray-900 uppercase tracking-wider mb-2 border-b pb-2">Payment Info</h4>
                    <div className="relative">
                      <CreditCard size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="text" placeholder="Card Number" defaultValue="4111222233334444" maxLength="16" className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#102a43]" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input type="text" placeholder="MM/YY" defaultValue="12/25" maxLength="5" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#102a43]" />
                      <input type="text" placeholder="CVV" defaultValue="123" maxLength="3" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#102a43]" />
                    </div>
                  </div>
                  
                  <div className="pt-4 mt-2 border-t">
                    <div className="flex justify-between items-center mb-4 text-sm">
                      <span className="font-medium text-gray-600">Total Amount:</span>
                      <span className="font-bold text-xl text-gray-900">{formatCurrency(selectedRoom.price)}</span>
                    </div>
                    <button 
                      type="submit" 
                      disabled={isProcessingPayment}
                      className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white py-3 rounded-md font-bold transition-colors shadow-lg flex items-center justify-center gap-2"
                    >
                      {isProcessingPayment ? (
                        <>Processing...</>
                      ) : (
                        <>Pay Now</>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Home;
