import jwt from 'jsonwebtoken';
import config from 'config';

export const authMiddleware = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1]; // "Bearer TOKEN"

    if (!token) {
      return res.status(401).json('Нou are not authorized');
    }

    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json('You are not authorized');
  }
};
