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

const router = express.Router();

router.get('/', getAllServices);
router.get('/:id', getServiceById);

router.post('/', protect, isProvider, createService);
router.put('/:id', protect, isProvider, updateService);
router.delete('/:id', protect, isProvider, deleteService);

export default router;