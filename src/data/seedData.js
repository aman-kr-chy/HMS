import { addDays, subDays, format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

const today = new Date();

export const initialRooms = [
  { id: '101', roomNumber: '101', type: 'Standard', price: 1000, capacity: 2, floor: 1, status: 'Available', amenities: ['WiFi', 'TV', 'AC'] },
  { id: '102', roomNumber: '102', type: 'Standard', price: 1000, capacity: 2, floor: 1, status: 'Available', amenities: ['WiFi', 'TV', 'AC'] },
  { id: '201', roomNumber: '201', type: 'Deluxe', price: 1100, capacity: 3, floor: 2, status: 'Available', amenities: ['WiFi', 'TV', 'AC', 'Minibar', 'City View'] },
  { id: '202', roomNumber: '202', type: 'Deluxe', price: 1100, capacity: 3, floor: 2, status: 'Available', amenities: ['WiFi', 'TV', 'AC', 'Minibar', 'City View'] },
  { id: '301', roomNumber: '301', type: 'Suite', price: 1300, capacity: 4, floor: 3, status: 'Available', amenities: ['WiFi', 'TV', 'AC', 'Minibar', 'Ocean View', 'Bathtub'] },
  { id: '302', roomNumber: '302', type: 'Suite', price: 1300, capacity: 4, floor: 3, status: 'Available', amenities: ['WiFi', 'TV', 'AC', 'Minibar', 'Ocean View', 'Bathtub'] },
  { id: '401', roomNumber: '401', type: 'Executive', price: 1400, capacity: 2, floor: 4, status: 'Available', amenities: ['WiFi', 'TV', 'AC', 'Minibar', 'Ocean View', 'Jacuzzi', 'Lounge Access'] },
  { id: '402', roomNumber: '402', type: 'Executive', price: 1400, capacity: 2, floor: 4, status: 'Available', amenities: ['WiFi', 'TV', 'AC', 'Minibar', 'Ocean View', 'Jacuzzi', 'Lounge Access'] },
  { id: '501', roomNumber: '501', type: 'Penthouse', price: 1500, capacity: 4, floor: 5, status: 'Available', amenities: ['WiFi', 'TV', 'AC', 'Minibar', 'Ocean View', 'Private Pool', 'Butler'] },
  { id: '502', roomNumber: '502', type: 'Penthouse', price: 1500, capacity: 4, floor: 5, status: 'Available', amenities: ['WiFi', 'TV', 'AC', 'Minibar', 'Ocean View', 'Private Pool', 'Butler'] },
  { id: '103', roomNumber: '103', type: 'Family', price: 1200, capacity: 5, floor: 1, status: 'Available', amenities: ['WiFi', 'TV', 'AC', 'Kitchenette', 'Extra Beds'] },
  { id: '104', roomNumber: '104', type: 'Family', price: 1200, capacity: 5, floor: 1, status: 'Available', amenities: ['WiFi', 'TV', 'AC', 'Kitchenette', 'Extra Beds'] },
  { id: '203', roomNumber: '203', type: 'Honeymoon', price: 1350, capacity: 2, floor: 2, status: 'Available', amenities: ['WiFi', 'TV', 'AC', 'Minibar', 'Champagne', 'Jacuzzi'] },
  { id: '204', roomNumber: '204', type: 'Honeymoon', price: 1350, capacity: 2, floor: 2, status: 'Available', amenities: ['WiFi', 'TV', 'AC', 'Minibar', 'Champagne', 'Jacuzzi'] },
  { id: '303', roomNumber: '303', type: 'Studio', price: 1050, capacity: 2, floor: 3, status: 'Available', amenities: ['WiFi', 'TV', 'AC', 'Work Desk', 'Kitchenette'] },
];
export const initialCustomers = [];
export const initialBookings = [];
export const initialPayments = [];
