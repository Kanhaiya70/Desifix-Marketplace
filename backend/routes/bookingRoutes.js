import express from 'express';
import { createBooking } from '../controllers/bookingController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { getMyBookings } from '../controllers/bookingController.js';

const router = express.Router();

router.get('/my', protect, getMyBookings);

router.post('/', protect, createBooking);

export default router;