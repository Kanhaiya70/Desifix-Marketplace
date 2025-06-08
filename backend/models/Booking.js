import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service'},
  date: Date,
  status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled'], default: 'Scheduled'},
  paid: { type: Boolean, default: false}
});

export default mongoose.model('Booking', bookingSchema);