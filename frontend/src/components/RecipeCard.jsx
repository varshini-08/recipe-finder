import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Heart, Star } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

const RecipeCard = ({ recipe, onClick }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  
  const ingredientPreview = recipe.ingredients.slice(0, 3).join(', ') + 
    (recipe.ingredients.length > 3 ? '...' : '');

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isFavorite(recipe.id)) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group relative"
      onClick={onClick}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      layout
    >
      {/* Favorite Button */}
      <motion.button
        onClick={handleFavoriteClick}
        className={`absolute top-4 right-4 z-10 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
          isFavorite(recipe.id)
            ? 'bg-red-500 text-white shadow-lg'
            : 'bg-white/80 text-gray-600 hover:bg-red-50 hover:text-red-500'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Heart className={`h-4 w-4 ${isFavorite(recipe.id) ? 'fill-current' : ''}`} />
      </motion.button>

      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={recipe.image && recipe.image.trim() !== '' ? recipe.image : 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'}
          alt={recipe.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Rating Badge */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
          <Star className="h-3 w-3 text-yellow-500 fill-current" />
          <span className="text-xs font-medium text-gray-700">4.8</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {recipe.title}
        </h3>
        
        <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{recipe.readyInMinutes} min</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{recipe.ingredients.length} ingredients</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          <span className="font-medium">Ingredients:</span> {ingredientPreview}
        </p>
        
        <motion.button 
          className="w-full px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 group-hover:from-primary-700 group-hover:to-primary-800"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View Recipe
        </motion.button>
      </div>
    </motion.div>
  );
};

export default RecipeCard;