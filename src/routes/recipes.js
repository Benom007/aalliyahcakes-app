import express from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, join(__dirname, '../../public/uploads/recipes'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

let recipes = [
    {
        id: 1,
        name: "Gâteau au Chocolat Classique",
        ingredients: [
            { name: "Farine", amount: 250, unit: "g", cost: 0.5 },
            { name: "Sucre", amount: 200, unit: "g", cost: 0.4 },
            { name: "Chocolat", amount: 200, unit: "g", cost: 3.0 },
            { name: "Beurre", amount: 200, unit: "g", cost: 2.0 },
            { name: "Oeufs", amount: 4, unit: "unités", cost: 1.0 }
        ],
        instructions: [
            "Préchauffer le four à 180°C",
            "Faire fondre le chocolat et le beurre",
            "Mélanger les ingrédients secs",
            "Incorporer les oeufs un à un",
            "Cuire 25-30 minutes"
        ],
        totalWeight: 850,
        totalCost: 6.9,
        image: "/images/recipes/chocolate-cake.jpg"
    }
];

router.get('/', (req, res) => {
  res.json(recipes);
});

router.post('/', upload.single('image'), (req, res) => {
  const { name, ingredients, instructions } = req.body;
  
  // Calculate total weight and cost
  const totalWeight = ingredients.reduce((sum, ing) => 
    sum + (ing.amount * (ing.unit === 'g' ? 1 : ing.unit === 'kg' ? 1000 : 0)), 0);
  
  const totalCost = ingredients.reduce((sum, ing) => sum + ing.cost, 0);
  
  const recipe = {
    id: recipes.length + 1,
    name,
    ingredients: JSON.parse(ingredients),
    instructions: JSON.parse(instructions),
    totalWeight,
    totalCost,
    image: req.file ? `/uploads/recipes/${req.file.filename}` : null
  };
  
  recipes.push(recipe);
  res.status(201).json(recipe);
});

router.get('/:id', (req, res) => {
  const recipe = recipes.find(r => r.id === parseInt(req.params.id));
  if (!recipe) return res.status(404).json({ message: "Recipe not found" });
  res.json(recipe);
});

router.put('/:id', upload.single('image'), (req, res) => {
  const recipe = recipes.find(r => r.id === parseInt(req.params.id));
  if (!recipe) return res.status(404).json({ message: "Recipe not found" });
  
  const { name, ingredients, instructions } = req.body;
  
  // Update recipe
  recipe.name = name || recipe.name;
  recipe.ingredients = ingredients ? JSON.parse(ingredients) : recipe.ingredients;
  recipe.instructions = instructions ? JSON.parse(instructions) : recipe.instructions;
  
  if (req.file) {
    recipe.image = `/uploads/recipes/${req.file.filename}`;
  }
  
  // Recalculate totals
  recipe.totalWeight = recipe.ingredients.reduce((sum, ing) => 
    sum + (ing.amount * (ing.unit === 'g' ? 1 : ing.unit === 'kg' ? 1000 : 0)), 0);
  
  recipe.totalCost = recipe.ingredients.reduce((sum, ing) => sum + ing.cost, 0);
  
  res.json(recipe);
});