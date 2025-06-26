import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, Search, Filter } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import RecipeCard from '../components/RecipeCard';
import RecipeModal from '../components/RecipeModal';

const FavoritesPage = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredFavorites = favorites
    .filter(recipe => 
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      }
      return a.readyInMinutes - b.readyInMinutes;
    });

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedRecipe(null);
  };

  const handleRemoveFavorite = (recipeId, e) => {
    e.stopPropagation();
    removeFromFavorites(recipeId);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full mb-6 shadow-lg"
            >
              <Heart className="h-5 w-5 text-red-500 fill-current" />
              <span className="text-red-700 font-medium">Your Favorite Recipes</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-red-600 to-pink-600 bg-clip-text text-transparent"
            >
              My Favorite
              <br />
              <span className="text-red-600">Recipes</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Your personal collection of beloved recipes, saved for easy access whenever you need culinary inspiration.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl"
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">{favorites.length}</div>
                <div className="text-gray-600">Recipe{favorites.length !== 1 ? 's' : ''} Saved</div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Search and Filter Section */}
      {favorites.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="py-8 bg-white/50 backdrop-blur-sm border-y border-gray-200/50"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search your favorites..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors bg-white/80 backdrop-blur-sm"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Filter className="h-5 w-5" />
                  <span className="font-medium">Sort by:</span>
                </div>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-white/80 backdrop-blur-sm"
                >
                  <option value="name">Recipe Name</option>
                  <option value="time">Cooking Time</option>
                </select>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Favorites Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {favorites.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-20"
            >
              <div className="max-w-md mx-auto">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="mb-8"
                >
                  <Heart className="h-24 w-24 text-gray-300 mx-auto" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-700 mb-4">No Favorites Yet</h3>
                <p className="text-gray-600 mb-8">
                  Start exploring recipes and save your favorites to see them here!
                </p>
                <motion.a
                  href="/explore"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Heart className="h-5 w-5" />
                  <span>Explore Recipes</span>
                </motion.a>
              </div>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Your Recipe Collection
                </h2>
                <p className="text-gray-600 text-lg">
                  {filteredFavorites.length} of {favorites.length} recipe{filteredFavorites.length !== 1 ? 's' : ''}
                </p>
              </div>

              <AnimatePresence>
                <motion.div
                  variants={containerVariants}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredFavorites.map((recipe) => (
                    <motion.div
                      key={recipe.id}
                      variants={itemVariants}
                      layout
                      whileHover={{ y: -5 }}
                      className="relative group"
                    >
                      <RecipeCard
                        recipe={recipe}
                        onClick={() => handleRecipeClick(recipe)}
                      />
                      <motion.button
                        initial={{ opacity: 0, scale: 0 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => handleRemoveFavorite(recipe.id, e)}
                        className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </motion.button>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Recipe Modal */}
      <RecipeModal
        recipe={selectedRecipe}
        isOpen={modalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default FavoritesPage;