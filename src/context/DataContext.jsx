import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { initialRooms, initialCustomers, initialBookings, initialPayments } from '../data/seedData';
import { v4 as uuidv4 } from 'uuid';
import { differenceInDays, parseISO } from 'date-fns';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [rooms, setRooms] = useLocalStorage('hotel_rooms', initialRooms);
  const [customers, setCustomers] = useLocalStorage('hotel_customers', initialCustomers);
  const [bookings, setBookings] = useLocalStorage('hotel_bookings', initialBookings);
  const [payments, setPayments] = useLocalStorage('hotel_payments', initialPayments);

  // --- Rooms ---
  const addRoom = (roomData) => {
    const newRoom = { ...roomData, id: uuidv4() };
    setRooms([...rooms, newRoom]);
  };

  const updateRoom = (id, updatedData) => {
    setRooms(rooms.map(room => (room.id === id ? { ...room, ...updatedData } : room)));
  };

  const deleteRoom = (id) => {
    setRooms(rooms.filter(room => room.id !== id));
  };

  const updateRoomStatus = (id, status) => {
    setRooms(rooms.map(room => (room.id === id ? { ...room, status } : room)));
  };

  // --- Customers ---
  const addCustomer = (customerData) => {
    const newCustomer = { ...customerData, id: `CUST-${Math.floor(Math.random() * 10000)}`, bookingsCount: 0 };
    setCustomers([...customers, newCustomer]);
    return newCustomer.id;
  };

  const updateCustomer = (id, updatedData) => {
    setCustomers(customers.map(cust => (cust.id === id ? { ...cust, ...updatedData } : cust)));
  };

  const deleteCustomer = (id) => {
    setCustomers(customers.filter(cust => cust.id !== id));
  };

  const incrementCustomerBookingCount = (id) => {
    setCustomers(customers.map(cust => 
      cust.id === id ? { ...cust, bookingsCount: cust.bookingsCount + 1 } : cust
    ));
  };

  // --- Bookings ---
  const addBooking = (bookingData) => {
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

    setBookings([...bookings, newBooking]);
    updateRoomStatus(roomId, 'Reserved');
    incrementCustomerBookingCount(bookingData.customerId);
    
    return newBooking;
  };

  const updateBookingStatus = (id, status) => {
    setBookings(bookings.map(bkg => bkg.id === id ? { ...bkg, status } : bkg));
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
    setPayments([...payments, newPayment]);

    // Update booking payment status
    const booking = bookings.find(b => b.id === paymentData.bookingId);
    if (booking) {
      // In a real app, calculate if full amount is paid
      setBookings(bookings.map(bkg => bkg.id === booking.id ? { ...bkg, paymentStatus: 'Paid' } : bkg));
    }
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
    stats
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
