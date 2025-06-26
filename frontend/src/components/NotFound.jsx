import React from 'react';
import { SearchX, RefreshCw } from 'lucide-react';

const NotFound = ({ type, message, onRetry }) => {
  const isError = type === 'error';
  
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 animate-fade-in">
      <div className="relative">
        <SearchX className={`h-16 w-16 ${isError ? 'text-red-400' : 'text-gray-400'}`} />
        {isError && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">!</span>
          </div>
        )}
      </div>
      
      <div className="text-center space-y-2">
        <h3 className={`text-xl font-semibold ${isError ? 'text-red-600' : 'text-gray-700'}`}>
          {isError ? 'Oops! Something went wrong' : 'No recipes found'}
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          {message || (isError 
            ? 'We encountered an error while searching for recipes. Please try again.'
            : 'We couldn\'t find any recipes with those ingredients. Try different ingredients or check your spelling.'
          )}
        </p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-200 font-medium"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Try Again</span>
        </button>
      )}

      {!isError && (
        <div className="text-center space-y-2 mt-6">
          <p className="text-sm text-gray-500 font-medium">Suggestions:</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Try using common ingredients like chicken, rice, or tomatoes</li>
            <li>• Check for typos in ingredient names</li>
            <li>• Use fewer ingredients for broader results</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotFound;