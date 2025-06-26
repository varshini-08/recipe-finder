import React, { useEffect } from 'react';
import { X, Clock, Users, ExternalLink } from 'lucide-react';

const RecipeModal = ({ recipe, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !recipe) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto w-full mx-4 animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800 pr-8">{recipe.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          {/* Recipe Image */}
          <div className="mb-6">
            <img
              src={recipe.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'}
              alt={recipe.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Recipe Info */}
          <div className="flex items-center space-x-6 mb-6 text-gray-600">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span className="font-medium">{recipe.readyInMinutes} minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span className="font-medium">{recipe.ingredients.length} ingredients</span>
            </div>
          </div>

          {/* Summary */}
          {recipe.summary && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">About this recipe</h3>
              <p className="text-gray-600 leading-relaxed">{recipe.summary}</p>
            </div>
          )}

          {/* Ingredients */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Ingredients</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {recipe.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-md">
                  <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">{ingredient}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Instructions</h3>
            <div className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-medium text-sm">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed pt-1">{instruction}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Source Link */}
          {recipe.sourceUrl && (
            <div className="border-t border-gray-200 pt-4">
              <a
                href={recipe.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                <span>View full recipe</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;