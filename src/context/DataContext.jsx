import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { initialRooms, initialCustomers, initialBookings, initialPayments } from '../data/seedData';
import { v4 as uuidv4 } from 'uuid';
import { differenceInDays, parseISO } from 'date-fns';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [rooms, setRooms] = useLocalStorage('hotel_rooms_v6', initialRooms);
  const [customers, setCustomers] = useLocalStorage('hotel_customers_v2', initialCustomers);
  const [bookings, setBookings] = useLocalStorage('hotel_bookings_v2', initialBookings);
  const [payments, setPayments] = useLocalStorage('hotel_payments_v2', initialPayments);
  
  // Auth State
  const [currentUser, setCurrentUser] = useLocalStorage('hotel_current_user', null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  useEffect(() => {
    // Fetch bookings from database on initial load
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/bookings');
        if (response.ok) {
          const data = await response.json();
          // Map MongoDB _id if needed, but the backend also has our custom id field
          if (data && data.length > 0) {
            setBookings(data);
          }
        }
      } catch (error) {
        console.error('Error fetching bookings from DB:', error);
      }
    };
    
    fetchBookings();
  }, []);

  // --- Rooms ---
  const addRoom = (roomData) => {
    const newRoom = { ...roomData, id: uuidv4() };
    setRooms(prev => [...prev, newRoom]);
  };

  const updateRoom = (id, updatedData) => {
    setRooms(prev => prev.map(room => (room.id === id ? { ...room, ...updatedData } : room)));
  };

  const deleteRoom = (id) => {
    setRooms(prev => prev.filter(room => room.id !== id));
  };

  const updateRoomStatus = (id, status) => {
    setRooms(prev => prev.map(room => (room.id === id ? { ...room, status } : room)));
  };

  // --- Customers ---
  const addCustomer = (customerData) => {
    const newCustomer = { ...customerData, id: `CUST-${Math.floor(Math.random() * 10000)}`, bookingsCount: 0 };
    setCustomers(prev => [...prev, newCustomer]);
    return newCustomer.id;
  };

  const updateCustomer = (id, updatedData) => {
    setCustomers(prev => prev.map(cust => (cust.id === id ? { ...cust, ...updatedData } : cust)));
  };

  const deleteCustomer = (id) => {
    setCustomers(prev => prev.filter(cust => cust.id !== id));
  };

  const incrementCustomerBookingCount = (id) => {
    setCustomers(prev => prev.map(cust => 
      cust.id === id ? { ...cust, bookingsCount: cust.bookingsCount + 1 } : cust
    ));
  };

  // --- Bookings ---
  const addBooking = async (bookingData) => {
    const { checkInDate, checkOutDate, roomId } = bookingData;
    
    // Check if room is available for these dates (simplified logic, just checking current status for demo)
    const room = rooms.find(r => r.id === roomId);
    if (!room || room.status === 'Occupied' || room.status === 'Maintenance') {
      throw new Error("Room is not available");
    }

    // Calculate nights and amount
    const nights = differenceInDays(parseISO(checkOutDate), parseISO(checkInDate));
    const totalAmount = nights * room.price;

    const newBooking = {
      ...bookingData,
      id: `BKG-${Math.floor(Math.random() * 10000) + 1000}`,
      nights,
      pricePerNight: room.price,
      totalAmount,
      roomType: room.type,
      status: 'Confirmed',
      paymentStatus: 'Pending',
    };

    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBooking),
      });

      if (!response.ok) {
        throw new Error('Failed to save booking to database');
      }

      const savedBooking = await response.json();
      console.log('Booking saved to MongoDB:', savedBooking);
    } catch (error) {
      console.error('Error saving booking to DB:', error);
      // We will still save it to local storage as fallback for the UI to work smoothly
    }

    setBookings(prev => [...prev, newBooking]);
    // Removed updateRoomStatus(roomId, 'Reserved') to allow multiple bookings for the same room type
    incrementCustomerBookingCount(bookingData.customerId);
    
    return newBooking;
  };

  const updateBookingStatus = (id, status) => {
    setBookings(prev => prev.map(bkg => bkg.id === id ? { ...bkg, status } : bkg));
  };

  // --- Check-in / Check-out Logic ---
  const checkIn = (bookingId) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      updateBookingStatus(bookingId, 'Confirmed'); // Or 'In Progress'
      updateRoomStatus(booking.roomId, 'Occupied');
    }
  };

  const checkOut = (bookingId) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      updateBookingStatus(bookingId, 'Completed');
      updateRoomStatus(booking.roomId, 'Available');
    }
  };

  const cancelBooking = (bookingId) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      updateBookingStatus(bookingId, 'Cancelled');
      updateRoomStatus(booking.roomId, 'Available');
    }
  }

  // --- Payments ---
  const addPayment = (paymentData) => {
    const newPayment = {
      ...paymentData,
      id: `PAY-${Math.floor(Math.random() * 10000) + 2000}`,
    };
    setPayments(prev => [...prev, newPayment]);

    // Update booking payment status
    setBookings(prev => prev.map(bkg => bkg.id === paymentData.bookingId ? { ...bkg, paymentStatus: 'Paid' } : bkg));
  };


  // --- Dashboard Stats ---
  const stats = useMemo(() => {
    return {
      totalRooms: rooms.length,
      availableRooms: rooms.filter(r => r.status === 'Available').length,
      occupiedRooms: rooms.filter(r => r.status === 'Occupied').length,
      reservedRooms: rooms.filter(r => r.status === 'Reserved').length,
      totalCustomers: customers.length,
      totalRevenue: payments.filter(p => p.status === 'Completed').reduce((sum, p) => sum + p.amount, 0),
      todaysCheckins: bookings.filter(b => b.checkInDate === new Date().toISOString().split('T')[0]).length,
      todaysCheckouts: bookings.filter(b => b.checkOutDate === new Date().toISOString().split('T')[0]).length,
    };
  }, [rooms, customers, bookings, payments]);

  const value = {
    rooms,
    customers,
    bookings,
    payments,
    addRoom, updateRoom, deleteRoom, updateRoomStatus,
    addCustomer, updateCustomer, deleteCustomer,
    addBooking, updateBookingStatus, checkIn, checkOut, cancelBooking,
    addPayment,
    stats,
    currentUser, setCurrentUser,
    isAuthModalOpen, setIsAuthModalOpen,
    authMode, setAuthMode
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
