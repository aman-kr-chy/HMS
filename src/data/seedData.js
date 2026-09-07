import { addDays, subDays, format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

const today = new Date();

export const initialRooms = [
  { id: '101', roomNumber: '101', type: 'Standard', price: 100, capacity: 2, floor: 1, status: 'Available', amenities: ['WiFi', 'TV', 'AC'] },
  { id: '102', roomNumber: '102', type: 'Standard', price: 100, capacity: 2, floor: 1, status: 'Occupied', amenities: ['WiFi', 'TV', 'AC'] },
  { id: '103', roomNumber: '103', type: 'Standard', price: 100, capacity: 2, floor: 1, status: 'Available', amenities: ['WiFi', 'TV', 'AC'] },
  { id: '104', roomNumber: '104', type: 'Standard', price: 100, capacity: 2, floor: 1, status: 'Reserved', amenities: ['WiFi', 'TV', 'AC'] },
  { id: '105', roomNumber: '105', type: 'Standard', price: 100, capacity: 2, floor: 1, status: 'Maintenance', amenities: ['WiFi', 'TV', 'AC'] },
  { id: '201', roomNumber: '201', type: 'Deluxe', price: 150, capacity: 3, floor: 2, status: 'Available', amenities: ['WiFi', 'TV', 'AC', 'Minibar', 'City View'] },
  { id: '202', roomNumber: '202', type: 'Deluxe', price: 150, capacity: 3, floor: 2, status: 'Occupied', amenities: ['WiFi', 'TV', 'AC', 'Minibar', 'City View'] },
  { id: '203', roomNumber: '203', type: 'Deluxe', price: 150, capacity: 3, floor: 2, status: 'Available', amenities: ['WiFi', 'TV', 'AC', 'Minibar', 'City View'] },
  { id: '204', roomNumber: '204', type: 'Deluxe', price: 150, capacity: 3, floor: 2, status: 'Available', amenities: ['WiFi', 'TV', 'AC', 'Minibar', 'City View'] },
  { id: '205', roomNumber: '205', type: 'Deluxe', price: 150, capacity: 3, floor: 2, status: 'Reserved', amenities: ['WiFi', 'TV', 'AC', 'Minibar', 'City View'] },
  { id: '301', roomNumber: '301', type: 'Suite', price: 250, capacity: 4, floor: 3, status: 'Available', amenities: ['WiFi', 'TV', 'AC', 'Minibar', 'Ocean View', 'Bathtub'] },
  { id: '302', roomNumber: '302', type: 'Suite', price: 250, capacity: 4, floor: 3, status: 'Occupied', amenities: ['WiFi', 'TV', 'AC', 'Minibar', 'Ocean View', 'Bathtub'] },
  { id: '303', roomNumber: '303', type: 'Suite', price: 250, capacity: 4, floor: 3, status: 'Reserved', amenities: ['WiFi', 'TV', 'AC', 'Minibar', 'Ocean View', 'Bathtub'] },
  { id: '304', roomNumber: '304', type: 'Suite', price: 250, capacity: 4, floor: 3, status: 'Available', amenities: ['WiFi', 'TV', 'AC', 'Minibar', 'Ocean View', 'Bathtub'] },
  { id: '305', roomNumber: '305', type: 'Suite', price: 250, capacity: 4, floor: 3, status: 'Maintenance', amenities: ['WiFi', 'TV', 'AC', 'Minibar', 'Ocean View', 'Bathtub'] },
  { id: '401', roomNumber: '401', type: 'Executive', price: 400, capacity: 2, floor: 4, status: 'Available', amenities: ['WiFi', 'TV', 'AC', 'Minibar', 'Ocean View', 'Jacuzzi', 'Lounge Access'] },
  { id: '402', roomNumber: '402', type: 'Executive', price: 400, capacity: 2, floor: 4, status: 'Occupied', amenities: ['WiFi', 'TV', 'AC', 'Minibar', 'Ocean View', 'Jacuzzi', 'Lounge Access'] },
  { id: '403', roomNumber: '403', type: 'Executive', price: 400, capacity: 2, floor: 4, status: 'Reserved', amenities: ['WiFi', 'TV', 'AC', 'Minibar', 'Ocean View', 'Jacuzzi', 'Lounge Access'] },
  { id: '404', roomNumber: '404', type: 'Executive', price: 400, capacity: 2, floor: 4, status: 'Available', amenities: ['WiFi', 'TV', 'AC', 'Minibar', 'Ocean View', 'Jacuzzi', 'Lounge Access'] },
  { id: '405', roomNumber: '405', type: 'Executive', price: 400, capacity: 2, floor: 4, status: 'Available', amenities: ['WiFi', 'TV', 'AC', 'Minibar', 'Ocean View', 'Jacuzzi', 'Lounge Access'] },
];

export const initialCustomers = [
  { id: 'CUST-001', fullName: 'John Doe', email: 'john@example.com', phone: '+1 234 567 8900', address: '123 Main St, NY', gender: 'Male', idProof: 'Passport', nationality: 'American', bookingsCount: 2 },
  { id: 'CUST-002', fullName: 'Jane Smith', email: 'jane@example.com', phone: '+1 234 567 8901', address: '456 Oak St, CA', gender: 'Female', idProof: 'Driver License', nationality: 'American', bookingsCount: 1 },
  { id: 'CUST-003', fullName: 'Robert Johnson', email: 'robert@example.com', phone: '+44 7700 900077', address: '789 Pine St, London', gender: 'Male', idProof: 'Passport', nationality: 'British', bookingsCount: 3 },
  { id: 'CUST-004', fullName: 'Emily Davis', email: 'emily@example.com', phone: '+61 412 345 678', address: '321 Elm St, Sydney', gender: 'Female', idProof: 'Passport', nationality: 'Australian', bookingsCount: 1 },
  { id: 'CUST-005', fullName: 'Michael Wilson', email: 'michael@example.com', phone: '+1 234 567 8902', address: '654 Maple St, TX', gender: 'Male', idProof: 'Driver License', nationality: 'American', bookingsCount: 1 },
  { id: 'CUST-006', fullName: 'Sarah Brown', email: 'sarah@example.com', phone: '+1 234 567 8903', address: '987 Cedar St, FL', gender: 'Female', idProof: 'ID Card', nationality: 'American', bookingsCount: 0 },
  { id: 'CUST-007', fullName: 'David Taylor', email: 'david@example.com', phone: '+49 151 23456789', address: '159 Birch St, Berlin', gender: 'Male', idProof: 'Passport', nationality: 'German', bookingsCount: 2 },
  { id: 'CUST-008', fullName: 'Jessica Anderson', email: 'jessica@example.com', phone: '+1 234 567 8904', address: '753 Walnut St, WA', gender: 'Female', idProof: 'Driver License', nationality: 'American', bookingsCount: 1 },
  { id: 'CUST-009', fullName: 'James Thomas', email: 'james@example.com', phone: '+33 6 12 34 56 78', address: '852 Cherry St, Paris', gender: 'Male', idProof: 'Passport', nationality: 'French', bookingsCount: 4 },
  { id: 'CUST-010', fullName: 'Olivia Martinez', email: 'olivia@example.com', phone: '+34 612 345 678', address: '951 Orange St, Madrid', gender: 'Female', idProof: 'ID Card', nationality: 'Spanish', bookingsCount: 1 },
];

export const initialBookings = [
  // Completed Bookings (Past)
  { id: 'BKG-1001', customerId: 'CUST-001', roomId: '101', roomType: 'Standard', checkInDate: format(subDays(today, 10), 'yyyy-MM-dd'), checkOutDate: format(subDays(today, 8), 'yyyy-MM-dd'), guests: 2, nights: 2, pricePerNight: 100, totalAmount: 200, status: 'Completed', paymentStatus: 'Paid' },
  { id: 'BKG-1002', customerId: 'CUST-003', roomId: '201', roomType: 'Deluxe', checkInDate: format(subDays(today, 15), 'yyyy-MM-dd'), checkOutDate: format(subDays(today, 12), 'yyyy-MM-dd'), guests: 2, nights: 3, pricePerNight: 150, totalAmount: 450, status: 'Completed', paymentStatus: 'Paid' },
  { id: 'BKG-1003', customerId: 'CUST-009', roomId: '301', roomType: 'Suite', checkInDate: format(subDays(today, 5), 'yyyy-MM-dd'), checkOutDate: format(subDays(today, 3), 'yyyy-MM-dd'), guests: 3, nights: 2, pricePerNight: 250, totalAmount: 500, status: 'Completed', paymentStatus: 'Paid' },
  { id: 'BKG-1004', customerId: 'CUST-007', roomId: '401', roomType: 'Executive', checkInDate: format(subDays(today, 20), 'yyyy-MM-dd'), checkOutDate: format(subDays(today, 18), 'yyyy-MM-dd'), guests: 2, nights: 2, pricePerNight: 400, totalAmount: 800, status: 'Completed', paymentStatus: 'Paid' },

  // Currently Occupied (Checked-in)
  { id: 'BKG-1005', customerId: 'CUST-002', roomId: '102', roomType: 'Standard', checkInDate: format(subDays(today, 1), 'yyyy-MM-dd'), checkOutDate: format(addDays(today, 2), 'yyyy-MM-dd'), guests: 1, nights: 3, pricePerNight: 100, totalAmount: 300, status: 'Confirmed', paymentStatus: 'Pending' },
  { id: 'BKG-1006', customerId: 'CUST-004', roomId: '202', roomType: 'Deluxe', checkInDate: format(today, 'yyyy-MM-dd'), checkOutDate: format(addDays(today, 4), 'yyyy-MM-dd'), guests: 2, nights: 4, pricePerNight: 150, totalAmount: 600, status: 'Confirmed', paymentStatus: 'Paid' },
  { id: 'BKG-1007', customerId: 'CUST-005', roomId: '302', roomType: 'Suite', checkInDate: format(subDays(today, 2), 'yyyy-MM-dd'), checkOutDate: format(addDays(today, 1), 'yyyy-MM-dd'), guests: 4, nights: 3, pricePerNight: 250, totalAmount: 750, status: 'Confirmed', paymentStatus: 'Pending' },
  { id: 'BKG-1008', customerId: 'CUST-008', roomId: '402', roomType: 'Executive', checkInDate: format(today, 'yyyy-MM-dd'), checkOutDate: format(addDays(today, 3), 'yyyy-MM-dd'), guests: 2, nights: 3, pricePerNight: 400, totalAmount: 1200, status: 'Confirmed', paymentStatus: 'Paid' },

  // Reserved (Upcoming)
  { id: 'BKG-1009', customerId: 'CUST-001', roomId: '104', roomType: 'Standard', checkInDate: format(addDays(today, 2), 'yyyy-MM-dd'), checkOutDate: format(addDays(today, 5), 'yyyy-MM-dd'), guests: 2, nights: 3, pricePerNight: 100, totalAmount: 300, status: 'Confirmed', paymentStatus: 'Pending' },
  { id: 'BKG-1010', customerId: 'CUST-010', roomId: '205', roomType: 'Deluxe', checkInDate: format(addDays(today, 5), 'yyyy-MM-dd'), checkOutDate: format(addDays(today, 10), 'yyyy-MM-dd'), guests: 2, nights: 5, pricePerNight: 150, totalAmount: 750, status: 'Confirmed', paymentStatus: 'Paid' },
  { id: 'BKG-1011', customerId: 'CUST-003', roomId: '303', roomType: 'Suite', checkInDate: format(addDays(today, 1), 'yyyy-MM-dd'), checkOutDate: format(addDays(today, 4), 'yyyy-MM-dd'), guests: 3, nights: 3, pricePerNight: 250, totalAmount: 750, status: 'Confirmed', paymentStatus: 'Pending' },
  { id: 'BKG-1012', customerId: 'CUST-009', roomId: '403', roomType: 'Executive', checkInDate: format(addDays(today, 10), 'yyyy-MM-dd'), checkOutDate: format(addDays(today, 15), 'yyyy-MM-dd'), guests: 1, nights: 5, pricePerNight: 400, totalAmount: 2000, status: 'Confirmed', paymentStatus: 'Pending' },

  // Pending/Cancelled
  { id: 'BKG-1013', customerId: 'CUST-007', roomId: '101', roomType: 'Standard', checkInDate: format(addDays(today, 1), 'yyyy-MM-dd'), checkOutDate: format(addDays(today, 3), 'yyyy-MM-dd'), guests: 2, nights: 2, pricePerNight: 100, totalAmount: 200, status: 'Pending', paymentStatus: 'Pending' },
  { id: 'BKG-1014', customerId: 'CUST-003', roomId: '203', roomType: 'Deluxe', checkInDate: format(addDays(today, 20), 'yyyy-MM-dd'), checkOutDate: format(addDays(today, 25), 'yyyy-MM-dd'), guests: 2, nights: 5, pricePerNight: 150, totalAmount: 750, status: 'Cancelled', paymentStatus: 'Refunded' },
  { id: 'BKG-1015', customerId: 'CUST-009', roomId: '304', roomType: 'Suite', checkInDate: format(addDays(today, 30), 'yyyy-MM-dd'), checkOutDate: format(addDays(today, 35), 'yyyy-MM-dd'), guests: 4, nights: 5, pricePerNight: 250, totalAmount: 1250, status: 'Pending', paymentStatus: 'Pending' },
];

export const initialPayments = [
  { id: 'PAY-2001', bookingId: 'BKG-1001', customerId: 'CUST-001', amount: 200, method: 'Credit Card', date: format(subDays(today, 10), 'yyyy-MM-dd'), status: 'Completed' },
  { id: 'PAY-2002', bookingId: 'BKG-1002', customerId: 'CUST-003', amount: 450, method: 'Credit Card', date: format(subDays(today, 15), 'yyyy-MM-dd'), status: 'Completed' },
  { id: 'PAY-2003', bookingId: 'BKG-1003', customerId: 'CUST-009', amount: 500, method: 'UPI', date: format(subDays(today, 5), 'yyyy-MM-dd'), status: 'Completed' },
  { id: 'PAY-2004', bookingId: 'BKG-1004', customerId: 'CUST-007', amount: 800, method: 'Debit Card', date: format(subDays(today, 20), 'yyyy-MM-dd'), status: 'Completed' },
  { id: 'PAY-2005', bookingId: 'BKG-1006', customerId: 'CUST-004', amount: 600, method: 'Credit Card', date: format(today, 'yyyy-MM-dd'), status: 'Completed' },
  { id: 'PAY-2006', bookingId: 'BKG-1008', customerId: 'CUST-008', amount: 1200, method: 'Credit Card', date: format(today, 'yyyy-MM-dd'), status: 'Completed' },
  { id: 'PAY-2007', bookingId: 'BKG-1010', customerId: 'CUST-010', amount: 750, method: 'UPI', date: format(subDays(today, 2), 'yyyy-MM-dd'), status: 'Completed' },
  { id: 'PAY-2008', bookingId: 'BKG-1014', customerId: 'CUST-003', amount: 750, method: 'Credit Card', date: format(subDays(today, 15), 'yyyy-MM-dd'), status: 'Refunded' },
  { id: 'PAY-2009', bookingId: 'BKG-1005', customerId: 'CUST-002', amount: 100, method: 'Cash', date: format(subDays(today, 1), 'yyyy-MM-dd'), status: 'Completed' }, // Partial payment maybe
  { id: 'PAY-2010', bookingId: 'BKG-1007', customerId: 'CUST-005', amount: 250, method: 'UPI', date: format(subDays(today, 2), 'yyyy-MM-dd'), status: 'Completed' },
];
