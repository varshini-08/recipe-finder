import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, TrendingUp, Clock, Users, Filter } from 'lucide-react';
import RecipeCard from '../components/RecipeCard';
import RecipeModal from '../components/RecipeModal';
import Loader from '../components/Loader';

const ExplorePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: recipesRef, inView: recipesInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    // Simulate loading popular recipes
    const loadPopularRecipes = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockRecipes = [
        {
          id: '1',
          title: 'Creamy Garlic Parmesan Pasta',
          image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
          readyInMinutes: 25,
          ingredients: ['Pasta', 'Garlic', 'Parmesan', 'Heavy Cream', 'Butter'],
          instructions: ['Boil pasta', 'Sauté garlic', 'Add cream and cheese', 'Combine with pasta'],
          summary: 'A rich and creamy pasta dish perfect for dinner.'
        },
        {
          id: '2',
          title: 'Mediterranean Quinoa Bowl',
          image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
          readyInMinutes: 20,
          ingredients: ['Quinoa', 'Cucumber', 'Tomatoes', 'Feta', 'Olive Oil'],
          instructions: ['Cook quinoa', 'Chop vegetables', 'Mix with feta', 'Drizzle with olive oil'],
          summary: 'A healthy and colorful Mediterranean-inspired bowl.'
        },
        {
          id: '3',
          title: 'Spicy Thai Basil Chicken',
          image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg',
          readyInMinutes: 15,
          ingredients: ['Chicken', 'Thai Basil', 'Chili', 'Garlic', 'Fish Sauce'],
          instructions: ['Heat oil', 'Cook chicken', 'Add aromatics', 'Stir in basil'],
          summary: 'An authentic Thai dish with bold flavors and fresh herbs.'
        },
        {
          id: '4',
          title: 'Classic Chocolate Chip Cookies',
          image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg',
          readyInMinutes: 30,
          ingredients: ['Flour', 'Butter', 'Sugar', 'Chocolate Chips', 'Eggs'],
          instructions: ['Mix dry ingredients', 'Cream butter and sugar', 'Combine all', 'Bake until golden'],
          summary: 'Soft and chewy cookies that are perfect for any occasion.'
        },
        {
          id: '5',
          title: 'Fresh Caprese Salad',
          image: 'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg',
          readyInMinutes: 10,
          ingredients: ['Tomatoes', 'Mozzarella', 'Basil', 'Balsamic', 'Olive Oil'],
          instructions: ['Slice tomatoes and mozzarella', 'Arrange with basil', 'Drizzle with balsamic'],
          summary: 'A simple Italian salad showcasing fresh summer ingredients.'
        },
        {
          id: '6',
          title: 'Beef Stir Fry with Vegetables',
          image: 'https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg',
          readyInMinutes: 20,
          ingredients: ['Beef', 'Bell Peppers', 'Broccoli', 'Soy Sauce', 'Ginger'],
          instructions: ['Slice beef thinly', 'Heat wok', 'Stir fry beef', 'Add vegetables and sauce'],
          summary: 'A quick and nutritious stir fry packed with protein and vegetables.'
        }
      ];
      
      setRecipes(mockRecipes);
      setLoading(false);
    };

    loadPopularRecipes();
  }, []);

  const filteredRecipes = recipes.filter(recipe => {
    if (filter === 'quick') return recipe.readyInMinutes <= 20;
    if (filter === 'popular') return recipe.id === '1' || recipe.id === '3' || recipe.id === '5';
    return true;
  });

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedRecipe(null);
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0, y: 50 }}
        animate={heroInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative py-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={heroInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full mb-6 shadow-lg"
            >
              <Sparkles className="h-5 w-5 text-primary-600" />
              <span className="text-primary-700 font-medium">Discover Amazing Recipes</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-primary-600 to-secondary-600 bg-clip-text text-transparent"
            >
              Explore Culinary
              <br />
              <span className="text-primary-600">Masterpieces</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              From quick weeknight dinners to impressive weekend feasts, discover recipes that will transform your kitchen into a culinary adventure.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Filter Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="py-8 bg-white/50 backdrop-blur-sm border-y border-gray-200/50"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <Filter className="h-5 w-5" />
              <span className="font-medium">Filter by:</span>
            </div>
            
            {[
              { key: 'all', label: 'All Recipes', icon: Sparkles },
              { key: 'quick', label: 'Quick & Easy', icon: Clock },
              { key: 'popular', label: 'Most Popular', icon: TrendingUp },
            ].map(({ key, label, icon: Icon }) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(key)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  filter === key
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600 shadow-md'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Recipes Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <Loader />
          ) : (
            <motion.div
              ref={recipesRef}
              variants={containerVariants}
              initial="hidden"
              animate={recipesInView ? "visible" : "hidden"}
            >
              <motion.div
                variants={itemVariants}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  {filter === 'all' && 'All Recipes'}
                  {filter === 'quick' && 'Quick & Easy Recipes'}
                  {filter === 'popular' && 'Most Popular Recipes'}
                </h2>
                <p className="text-gray-600 text-lg">
                  {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found
                </p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredRecipes.map((recipe) => (
                  <motion.div
                    key={recipe.id}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <RecipeCard
                      recipe={recipe}
                      onClick={() => handleRecipeClick(recipe)}
                    />
                    <div className="mt-2 text-xs text-gray-500">
                      <span className="font-semibold">Ingredients:</span> {recipe.ingredients.join(', ')}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
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

export default ExplorePage;