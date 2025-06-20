export const isProvider = (req, res, next) =>{
  if(req.user && req.user.role === 'provider') {
    next();
  } else {
    res.status(403).json({ message: 'Only providers are allowed to perform this action' });
  }
};

export const isAdmin = (req, res, next) =>{
  if(req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Only admins are allowed to perform this action' });
  }
};

export const isUser = (req, res, next) =>{
  if(req.user && req.user.role === 'user') {
    next();
  } else {
    res.status(403).json({ message: 'Only users are allowed to perform this action' });
  }
};