import express from 'express';
import { createBooking } from '../controllers/bookingController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { getMyBookings } from '../controllers/bookingController.js';
import { updateBookingStatus } from '../controllers/bookingController.js';
import { getProviderBookings } from '../controllers/bookingController.js';
import { getBookingById } from '../controllers/bookingController.js';

const router = express.Router();

router.get('/my', protect, getMyBookings);
router.get('/provider', protect, getProviderBookings);
router.get('/:id', protect, getBookingById);

router.post('/', protect, createBooking);

router.patch('/:id/status', protect, updateBookingStatus);

export default router;