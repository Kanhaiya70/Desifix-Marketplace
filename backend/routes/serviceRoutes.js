import express from 'express';
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';

import { protect } from '../middlewares/authMiddleware.js';
import { isProvider } from '../middlewares/roleMiddleware.js';
import { getMyServices } from '../controllers/serviceController.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.get('/my-services', protect, isProvider, getMyServices);
router
  .route('/')
  .post(protect, upload.single("image"), createService)
  .get(getAllServices);
router.get('/:id', getServiceById);

router.post('/', protect, isProvider, createService);
router.put('/:id', protect, isProvider, updateService);
router.delete('/:id', protect, isProvider, deleteService);

export default router;