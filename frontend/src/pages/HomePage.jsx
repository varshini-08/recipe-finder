import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Sparkles, TrendingUp, Clock, Users } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import RecipeModal from '../components/RecipeModal';
import Loader from '../components/Loader';
import NotFound from '../components/NotFound';
import { searchRecipes } from '../utils/api';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: featuresRef, inView: featuresInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleSearch = async (ingredients) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const results = await searchRecipes({ ingredients });
      setRecipes(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedRecipe(null);
  };

  const handleRetry = () => {
    setError(null);
    setHasSearched(false);
    setRecipes([]);
  };

  const features = [
    {
      icon: Clock,
      title: 'Quick & Easy',
      description: 'Find recipes that fit your schedule, from 15-minute meals to weekend projects.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: 'For Everyone',
      description: 'Recipes for all skill levels, dietary preferences, and family sizes.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: TrendingUp,
      title: 'Trending Now',
      description: 'Discover what\'s popular and get inspired by community favorites.',
      color: 'from-purple-500 to-pink-500'
    },
  ];

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
        className="py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/5 to-secondary-600/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={heroInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full mb-6 shadow-lg"
            >
              <Sparkles className="h-5 w-5 text-primary-600" />
              <span className="text-primary-700 font-medium">Welcome to Recipe Finder</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-primary-600 to-secondary-600 bg-clip-text text-transparent"
            >
              Discover Amazing
              <br />
              <span className="text-primary-600">Recipes</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Turn your ingredients into culinary masterpieces. Search for recipes based on what you have in your kitchen and discover new flavors.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Link
                to="/explore"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span>Explore Recipes</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span>Learn More</span>
              </Link>
            </motion.div>
          </div>

          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <SearchBar onSearch={handleSearch} loading={loading} />
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        ref={featuresRef}
        className="py-20 bg-white/50 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Why Choose Recipe Finder?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make cooking accessible, enjoyable, and inspiring for everyone.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map(({ icon: Icon, title, description, color }, index) => (
              <motion.div
                key={title}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 text-center"
              >
                <div className={`bg-gradient-to-r ${color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Results Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading && <Loader />}
          
          {error && (
            <NotFound 
              type="error" 
              message={error} 
              onRetry={handleRetry}
            />
          )}
          
          {!loading && !error && hasSearched && recipes.length === 0 && (
            <NotFound type="no-results" />
          )}
          
          {!loading && !error && recipes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Found {recipes.length} Recipe{recipes.length !== 1 ? 's' : ''}
                </h3>
                <p className="text-gray-600 text-lg">Perfect matches for your ingredients</p>
              </div>
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {recipes.map((recipe) => (
                  <motion.div
                    key={recipe.id}
                    variants={itemVariants}
                  >
                    <RecipeCard
                      recipe={recipe}
                      onClick={() => handleRecipeClick(recipe)}
                    />
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

export default HomePage;