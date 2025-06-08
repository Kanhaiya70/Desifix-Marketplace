import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: String,
  category: String,
  description: String,
  price: Number
});

export default mongoose.model('Service', serviceSchema);