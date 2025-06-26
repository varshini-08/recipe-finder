import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  Heart, 
  Share2, 
  BookOpen,
  ChefHat,
  Star,
  ExternalLink
} from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import Loader from '../components/Loader';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    // Simulate loading recipe details
    const loadRecipe = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock recipe data - in real app, this would come from API
      const mockRecipe = {
        id: id || '1',
        title: 'Creamy Garlic Parmesan Pasta',
        image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
        readyInMinutes: 25,
        ingredients: [
          '12 oz fettuccine pasta',
          '4 cloves garlic, minced',
          '1 cup heavy cream',
          '1 cup freshly grated Parmesan cheese',
          '4 tablespoons butter',
          '2 tablespoons olive oil',
          'Salt and pepper to taste',
          'Fresh parsley for garnish'
        ],
        instructions: [
          'Bring a large pot of salted water to boil. Cook fettuccine according to package directions until al dente.',
          'While pasta cooks, heat olive oil and 2 tablespoons butter in a large skillet over medium heat.',
          'Add minced garlic and sauté for 1-2 minutes until fragrant, being careful not to burn.',
          'Pour in heavy cream and bring to a gentle simmer. Let it reduce slightly for 2-3 minutes.',
          'Gradually whisk in Parmesan cheese until melted and smooth. Season with salt and pepper.',
          'Drain pasta, reserving 1 cup pasta water. Add pasta to the cream sauce.',
          'Toss pasta with sauce, adding pasta water as needed to achieve desired consistency.',
          'Remove from heat, add remaining butter, and garnish with fresh parsley before serving.'
        ],
        summary: 'A rich and creamy pasta dish that combines the bold flavors of garlic and Parmesan cheese. This restaurant-quality meal can be prepared in just 25 minutes, making it perfect for weeknight dinners or special occasions.',
        sourceUrl: 'https://example.com/recipe'
      };
      
      setRecipe(mockRecipe);
      setLoading(false);
    };

    loadRecipe();
  }, [id]);

  const handleFavoriteToggle = () => {
    if (!recipe) return;
    
    if (isFavorite(recipe.id)) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
  };

  const handleShare = async () => {
    if (navigator.share && recipe) {
      try {
        await navigator.share({
          title: recipe.title,
          text: recipe.summary,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recipe Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-16 z-40"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFavoriteToggle}
                className={`p-3 rounded-full transition-all duration-200 ${
                  isFavorite(recipe.id)
                    ? 'bg-red-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500 shadow-md'
                }`}
              >
                <Heart className={`h-5 w-5 ${isFavorite(recipe.id) ? 'fill-current' : ''}`} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="p-3 rounded-full bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600 shadow-md transition-all duration-200"
              >
                <Share2 className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8"
          >
            <div className="relative h-64 md:h-80">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {recipe.title}
                </h1>
                <div className="flex items-center space-x-4 text-white/90">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{recipe.readyInMinutes} min</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>4 servings</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-current text-yellow-400" />
                    <span>4.8</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Summary */}
              {recipe.summary && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <BookOpen className="h-5 w-5 text-primary-600" />
                    <h2 className="text-xl font-bold text-gray-800">About This Recipe</h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{recipe.summary}</p>
                </motion.div>
              )}

              {/* Instructions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center space-x-2 mb-6">
                  <ChefHat className="h-5 w-5 text-primary-600" />
                  <h2 className="text-xl font-bold text-gray-800">Instructions</h2>
                </div>
                
                <div className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.4 }}
                      className={`flex space-x-4 p-4 rounded-lg transition-all duration-200 cursor-pointer ${
                        activeStep === index
                          ? 'bg-primary-50 border-l-4 border-primary-500'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveStep(index)}
                    >
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                        activeStep === index
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {index + 1}
                      </div>
                      <p className="text-gray-700 leading-relaxed pt-1">{instruction}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Ingredients */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bg-white rounded-xl p-6 shadow-lg sticky top-32"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-4">Ingredients</h2>
                <div className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index, duration: 0.3 }}
                      className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">{ingredient}</span>
                    </motion.div>
                  ))}
                </div>

                {recipe.sourceUrl && (
                  <motion.a
                    href={recipe.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 w-full flex items-center justify-center space-x-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>View Original Recipe</span>
                  </motion.a>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;