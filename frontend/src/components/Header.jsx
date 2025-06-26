import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChefHat, Menu, X, Heart, Compass, Home, Info } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { favorites } = useFavorites();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/explore', label: 'Explore', icon: Compass },
    { path: '/favorites', label: 'Favorites', icon: Heart, badge: favorites.length },
    { path: '/about', label: 'About', icon: Info },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
          : 'bg-white shadow-md border-b border-gray-200'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <ChefHat className="h-8 w-8 text-primary-600" />
              <motion.div
                className="absolute inset-0 bg-primary-200 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.2, opacity: 0.3 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Recipe Finder
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map(({ path, label, icon: Icon, badge }) => (
              <Link
                key={path}
                to={path}
                className={`relative flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 group ${
                  isActive(path)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{label}</span>
                {badge !== undefined && badge > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    {badge}
                  </motion.span>
                )}
                {isActive(path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary-100 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
            {/* Login/Signup Buttons */}
            <Link to="/login" className="ml-4 px-4 py-2 rounded-full border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white transition font-medium">Login</Link>
            <Link to="/signup" className="ml-2 px-4 py-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition font-medium">Sign Up</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.nav
          initial={false}
          animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="pt-4 pb-2 space-y-2">
            {navItems.map(({ path, label, icon: Icon, badge }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive(path)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{label}</span>
                </div>
                {badge !== undefined && badge > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {badge}
                  </span>
                )}
              </Link>
            ))}
            {/* Login/Signup for mobile */}
            <div className="flex justify-center space-x-4 mt-4">
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 rounded-full border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white transition font-medium">Login</Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition font-medium">Sign Up</Link>
            </div>
          </div>
        </motion.nav>
      </div>
    </motion.header>
  );
};

export default Header;