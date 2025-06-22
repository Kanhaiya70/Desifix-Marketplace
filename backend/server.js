import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js';
import './config/passport.js';
import bookingRoutes from './routes/bookingRoutes.js';

console.log("Server restarted at", new Date().toLocaleTimeString());


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 7050;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));