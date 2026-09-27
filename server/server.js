import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Booking } from './models/Booking.js';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

try {
  await mongoose.connect('mongodb://127.0.0.1:27017/hotel-management');
  console.log('Connected to MongoDB local database');
} catch (err) {
  console.error('MongoDB connection error:', err);
}

// Routes
app.post('/api/bookings', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ message: 'Failed to save booking', error: error.message });
  }
});

app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Failed to fetch bookings', error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
