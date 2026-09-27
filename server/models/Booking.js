import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  id: { type: String, required: true },
  customerId: { type: String, required: true },
  roomId: { type: String, required: true },
  roomType: { type: String, required: true },
  guestName: { type: String },
  guestEmail: { type: String },
  checkInDate: { type: String, required: true },
  checkOutDate: { type: String, required: true },
  guests: { type: Number, required: true },
  nights: { type: Number, required: true },
  pricePerNight: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Confirmed' },
  paymentStatus: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

export const Booking = mongoose.model('Booking', bookingSchema);
