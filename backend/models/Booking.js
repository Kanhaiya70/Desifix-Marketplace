import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  scheduledDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending'},
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);