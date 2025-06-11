import jwt from 'jsonwebtoken';

const generateToken = (id, name, email, role) => {
  return jwt.sign({ id, name, email, role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

export default generateToken;