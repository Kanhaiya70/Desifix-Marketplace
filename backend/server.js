import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js';
import './config/passport.js';
import bookingRoutes from './routes/bookingRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import path from 'path';
import paymentRoutes from './routes/paymentRoutes.js';

console.log("Server restarted at", new Date().toLocaleTimeString());


dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));
app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 7050;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));