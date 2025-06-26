const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: [String],
  image: String,
  readyInMinutes: Number,
  instructions: [String],
  summary: String,
  sourceUrl: String,
});

module.exports = mongoose.model('Recipe', recipeSchema); 