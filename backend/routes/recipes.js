const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// Mock data for demonstration
const mockRecipes = [
  {
    id: '1',
    title: 'Spaghetti Bolognese',
    ingredients: ['spaghetti', 'beef', 'tomato'],
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg', // Spaghetti Bolognese
    readyInMinutes: 30,
    instructions: ['Boil pasta', 'Cook beef', 'Mix with sauce'],
    summary: 'A classic Italian dish.',
    sourceUrl: '',
  },
  {
    id: '2',
    title: 'Tomato Soup',
    ingredients: ['tomato', 'onion', 'garlic'],
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', // Tomato Soup
    readyInMinutes: 20,
    instructions: ['Chop veggies', 'Boil', 'Blend'],
    summary: 'Simple and delicious tomato soup.',
    sourceUrl: '',
  },
  {
    id: '3',
    title: 'Chicken Caesar Salad',
    ingredients: ['chicken', 'lettuce', 'parmesan', 'croutons', 'caesar dressing'],
    image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg', // Chicken Caesar Salad
    readyInMinutes: 15,
    instructions: ['Grill chicken', 'Toss lettuce', 'Add dressing and toppings'],
    summary: 'A fresh and healthy salad with grilled chicken.',
    sourceUrl: '',
  },
  {
    id: '4',
    title: 'Vegetable Stir Fry',
    ingredients: ['broccoli', 'carrot', 'bell pepper', 'soy sauce', 'ginger'],
    image: 'https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg', // Vegetable Stir Fry
    readyInMinutes: 18,
    instructions: ['Chop veggies', 'Stir fry in wok', 'Add sauce'],
    summary: 'A quick and colorful vegetable stir fry.',
    sourceUrl: '',
  },
  {
    id: '5',
    title: 'Egg Fried Rice',
    ingredients: ['rice', 'egg', 'peas', 'carrot', 'soy sauce'],
    image: 'https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg', // Egg Fried Rice
    readyInMinutes: 12,
    instructions: ['Cook rice', 'Scramble eggs', 'Mix with veggies and sauce'],
    summary: 'A simple and tasty fried rice dish.',
    sourceUrl: '',
  },
  {
    id: '6',
    title: 'Pancakes',
    ingredients: ['flour', 'egg', 'milk', 'sugar', 'baking powder'],
    image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg', // Pancakes
    readyInMinutes: 20,
    instructions: ['Mix ingredients', 'Cook on griddle', 'Serve with syrup'],
    summary: 'Fluffy pancakes perfect for breakfast.',
    sourceUrl: '',
  },
  {
    id: '7',
    title: 'Caprese Salad',
    ingredients: ['tomato', 'mozzarella', 'basil', 'olive oil', 'balsamic vinegar'],
    image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg', // Caprese Salad
    readyInMinutes: 10,
    instructions: ['Slice tomato and mozzarella', 'Layer with basil', 'Drizzle with oil and vinegar'],
    summary: 'A classic Italian salad with fresh ingredients.',
    sourceUrl: '',
  },
  {
    id: '8',
    title: 'Beef Tacos',
    ingredients: ['beef', 'taco shells', 'lettuce', 'cheese', 'salsa'],
    image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg', // Beef Tacos
    readyInMinutes: 25,
    instructions: ['Cook beef', 'Fill shells', 'Add toppings'],
    summary: 'Tasty tacos with seasoned beef and fresh toppings.',
    sourceUrl: '',
  },
  {
    id: '9',
    title: 'Mushroom Risotto',
    ingredients: ['rice', 'mushroom', 'parmesan', 'onion', 'garlic'],
    image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg', // Mushroom Risotto
    readyInMinutes: 35,
    instructions: ['Cook mushrooms', 'Add rice and broth', 'Stir until creamy'],
    summary: 'Creamy risotto with savory mushrooms.',
    sourceUrl: '',
  },
  {
    id: '10',
    title: 'Greek Yogurt Parfait',
    ingredients: ['greek yogurt', 'honey', 'granola', 'berries'],
    image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg', // Greek Yogurt Parfait
    readyInMinutes: 5,
    instructions: ['Layer yogurt, granola, and berries', 'Drizzle with honey'],
    summary: 'A quick and healthy breakfast or snack.',
    sourceUrl: '',
  },
  // Additional recipes
  {
    id: '11',
    title: 'Margherita Pizza',
    ingredients: ['pizza dough', 'tomato sauce', 'mozzarella', 'basil', 'olive oil'],
    image: 'https://images.pexels.com/photos/724216/pexels-photo-724216.jpeg', // Margherita Pizza
    readyInMinutes: 25,
    instructions: ['Roll dough', 'Spread sauce', 'Add cheese and basil', 'Bake'],
    summary: 'Classic Italian pizza with fresh mozzarella and basil.',
    sourceUrl: '',
  },
  {
    id: '12',
    title: 'Avocado Toast',
    ingredients: ['bread', 'avocado', 'lemon', 'salt', 'pepper'],
    image: 'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg', // Avocado Toast
    readyInMinutes: 7,
    instructions: ['Toast bread', 'Mash avocado', 'Spread and season'],
    summary: 'A quick and healthy breakfast or snack.',
    sourceUrl: '',
  },
  {
    id: '13',
    title: 'Butter Chicken',
    ingredients: ['chicken', 'butter', 'tomato', 'cream', 'spices'],
    image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg', // Butter Chicken
    readyInMinutes: 40,
    instructions: ['Cook chicken', 'Prepare sauce', 'Combine and simmer'],
    summary: 'Rich and creamy Indian butter chicken.',
    sourceUrl: '',
  },
  {
    id: '14',
    title: 'Fish Tacos',
    ingredients: ['fish', 'taco shells', 'cabbage', 'lime', 'sour cream'],
    image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg', // Fish Tacos
    readyInMinutes: 22,
    instructions: ['Cook fish', 'Prepare toppings', 'Assemble tacos'],
    summary: 'Fresh and zesty fish tacos.',
    sourceUrl: '',
  },
  {
    id: '15',
    title: 'Lentil Soup',
    ingredients: ['lentils', 'carrot', 'celery', 'onion', 'spices'],
    image: 'https://images.pexels.com/photos/1117866/pexels-photo-1117866.jpeg', // Lentil Soup
    readyInMinutes: 30,
    instructions: ['Cook vegetables', 'Add lentils and broth', 'Simmer'],
    summary: 'Hearty and healthy lentil soup.',
    sourceUrl: '',
  },
  {
    id: '16',
    title: 'Shrimp Scampi',
    ingredients: ['shrimp', 'garlic', 'butter', 'lemon', 'pasta'],
    image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg', // Shrimp Scampi
    readyInMinutes: 18,
    instructions: ['Cook pasta', 'Sauté shrimp', 'Combine with sauce'],
    summary: 'A quick and flavorful shrimp pasta dish.',
    sourceUrl: '',
  },
  {
    id: '17',
    title: 'Falafel Wrap',
    ingredients: ['falafel', 'pita', 'lettuce', 'tomato', 'tahini'],
    image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg', // Falafel Wrap
    readyInMinutes: 15,
    instructions: ['Prepare falafel', 'Assemble wrap with veggies and sauce'],
    summary: 'A tasty vegetarian wrap with Middle Eastern flavors.',
    sourceUrl: '',
  },
  {
    id: '18',
    title: 'Stuffed Peppers',
    ingredients: ['bell pepper', 'rice', 'beef', 'tomato', 'cheese'],
    image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg', // Stuffed Peppers
    readyInMinutes: 35,
    instructions: ['Prepare filling', 'Stuff peppers', 'Bake until tender'],
    summary: 'Colorful peppers stuffed with a savory filling.',
    sourceUrl: '',
  },
  {
    id: '19',
    title: 'Banana Bread',
    ingredients: ['banana', 'flour', 'sugar', 'egg', 'butter'],
    image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg', // Banana Bread
    readyInMinutes: 50,
    instructions: ['Mix ingredients', 'Bake until golden'],
    summary: 'Moist and delicious banana bread.',
    sourceUrl: '',
  },
  {
    id: '20',
    title: 'Quinoa Salad',
    ingredients: ['quinoa', 'cucumber', 'tomato', 'feta', 'olive oil'],
    image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg', // Quinoa Salad
    readyInMinutes: 15,
    instructions: ['Cook quinoa', 'Chop veggies', 'Mix and dress'],
    summary: 'A light and refreshing salad with quinoa and veggies.',
    sourceUrl: '',
  },
];

// GET /recipes - fetch all recipes from MongoDB Atlas
router.get('/recipes', async (req, res) => {
  try {
    let recipes = await Recipe.find();
    // If DB is empty, return mock data
    if (recipes.length === 0) {
      return res.json(mockRecipes);
    }
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

// POST /recipes - add a new recipe to MongoDB Atlas
router.post('/recipes', async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add recipe' });
  }
});

module.exports = router; 