import mongoose from 'mongoose';
import { type } from 'os';

const bookingSchema = new mongoose.Schema({
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  scheduleDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'scheduled', 'completed', 'cancelled'], default: 'pending'},
  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending",
  },
  paymentId: String,
  orderId: String,
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);