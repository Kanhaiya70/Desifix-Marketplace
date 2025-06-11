import express from 'express';
import { register, login } from '../controllers/authController.js';
import passport from 'passport';
import generateToken from '../utils/generateToken.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/oauth/google', passport.authenticate('google', { scope: ['profile', 'email']}));

router.get('/oauth/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false}),
(req, res) => {
  const user = req.user;
  const token = generateToken(user._id, user.name, user.email, user.role);
  res.redirect(`${ process.env.FRONTEND_URL}/oauth-success?token=${token}`);
} 
)

export default router;