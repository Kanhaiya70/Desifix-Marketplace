import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async(req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if(!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.id).select('-password');
    if(!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    req.user = user;
    next();
  }
  catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const checkRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role)
      return res.status(403).json({ message: 'Access denied' });
    next();
  };
};