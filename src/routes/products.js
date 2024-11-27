import express from 'express';
export const router = express.Router();

const products = [
  {
    id: 1,
    name: "Birthday Cake",
    description: "Custom birthday cake with your choice of flavors",
    category: "Cakes",
    price: 45.99
  }
];

router.get('/', (req, res) => {
  res.json(products);
});

router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

router.post('/', (req, res) => {
  const product = {
    id: products.length + 1,
    ...req.body
  };
  products.push(product);
  res.status(201).json(product);
});