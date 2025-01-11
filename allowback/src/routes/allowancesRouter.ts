import express from 'express';
import Allowance from '../models/Allowance';

const router = express.Router();

router.get('/', async (_, res) => {
  const allowances = await Allowance.findAll();
  res.json(allowances);
});

router.post('/', async (req, res) => {
  const { category, store, description, amount, date, memberId } = req.body;
  const allowance = await Allowance.create({ category, store, description, amount, date, memberId });
  res.json(allowance);
});

export default router;
