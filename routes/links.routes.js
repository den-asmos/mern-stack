import { Router } from 'express';
import config from 'config';
import ShortUniqueId from 'short-unique-id';
import Link from '../models/Link.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

export const router = Router();
const uid = new ShortUniqueId({ length: 10 });

router.post('/generate', authMiddleware, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl');
    const { from } = req.body;

    const code = uid();

    const existing = await Link.findOne({ from });

    if (existing) {
      return res.json({ link: existing });
    }

    const to = baseUrl + '/t/' + code;

    const link = new Link({ from, to, code, owner: req.user.userId });

    await link.save();

    res.status(201).json({ link });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Try again later' });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Try again later' });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Try again later' });
  }
});
