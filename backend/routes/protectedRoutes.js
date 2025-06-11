import express from 'express';
import { protect, checkRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/provider-only', protect, checkRole('provider'), (req, res) => {
  res.json({ message: 'Hello Provider!' });
});

router.get('/admin-only', protect, checkRole('admin'), (req, res) => {
  res.json({ message: 'Hello Admin!' });
});

router.get('/user-only', protect, checkRole('user'), (req, res) => {
  res.json({ message: 'Hello User!' });
});

router.get('/me', protect, (req, res) => {
  const { id, name, email, role } = req.user;
  res.json({
    user: {
      id: id,
      name: name,
      email: email,
      role: role
    }
  });
});

export default router;