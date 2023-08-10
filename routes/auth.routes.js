import { Router } from 'express';
import bcryptjs from 'bcryptjs';
import config from 'config';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import User from '../models/User.js';

export const router = Router();

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Incorrect email').isEmail(),
    check(
      'password',
      'Incorrect password. Minimum 6 characters required'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect registration data',
        });
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res
          .status(400)
          .json({ message: 'User with this email already exists' });
      }

      const hashedPassword = await bcryptjs.hash(password, 12);
      const user = new User({ email, password: hashedPassword });

      await user.save();

      res
        .status(201)
        .json({ message: 'User has been registered successfully' });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Something went wrong. Try again later' });
    }
  }
);

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Enter valid email').normalizeEmail().isEmail(),
    check('password', 'Enter your password').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect user data',
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      const isMatch = await bcryptjs.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: 'Incorrect password. Try again later' });
      }

      const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), {
        expiresIn: '1h',
      });

      res.json({ token, userId: user.id });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Something went wrong. Try again later' });
    }
  }
);
