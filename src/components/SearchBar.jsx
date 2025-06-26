import React, { useState, KeyboardEvent } from 'react';
import { Search, X, Plus } from 'lucide-react';

const SearchBar = ({ onSearch, loading }) => {
  const [inputValue, setInputValue] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const handleAddIngredient = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddIngredient();
    } else if (e.key === ',' && inputValue.trim()) {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSearch = () => {
    if (ingredients.length > 0) {
      onSearch(ingredients);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <div className="mb-4">
          <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-2">
            What ingredients do you have?
          </label>
          <div className="flex space-x-2">
            <input
              id="ingredients"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter ingredients (press Enter or comma to add)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
            />
            <button
              onClick={handleAddIngredient}
              disabled={!inputValue.trim()}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-1"
            >
              <Plus className="h-4 w-4" />
              <span>Add</span>
            </button>
          </div>
        </div>

        {ingredients.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 animate-scale-in"
                >
                  {ingredient}
                  <button
                    onClick={() => removeIngredient(index)}
                    className="ml-2 hover:text-primary-600 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleSearch}
          disabled={ingredients.length === 0 || loading}
          className="w-full px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 group"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Finding Recipes...</span>
            </>
          ) : (
            <>
              <Search className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span>Find Recipes</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;