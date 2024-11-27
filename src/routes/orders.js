import express from 'express';
export const router = express.Router();

const orders = [];

router.get('/', (req, res) => {
  res.json(orders);
});

router.post('/', (req, res) => {
  const order = {
    id: orders.length + 1,
    date: new Date(),
    status: 'pending',
    ...req.body
  };
  orders.push(order);
  res.status(201).json(order);
});

router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
});

router.patch('/:id/status', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ message: "Order not found" });
  
  order.status = req.body.status;
  res.json(order);
});