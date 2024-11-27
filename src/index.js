import express from 'express';
import cors from 'cors';
import { router as productsRouter } from './routes/products.js';
import { router as ordersRouter } from './routes/orders.js';
import serveStatic from 'serve-static';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use(serveStatic(join(__dirname, '../public')));

// API Routes
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);

app.listen(port, () => {
  console.log(`🧁 Aalliyah Cake's Creation server is running on port ${port}`);
});