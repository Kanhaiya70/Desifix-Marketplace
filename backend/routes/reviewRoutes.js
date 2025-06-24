import express from 'express';
import { createReview, getReviewsForService } from '../controllers/reviewController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createReview);
router.get('/:serviceId', getReviewsForService);

export default router;