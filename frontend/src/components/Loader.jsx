import React from 'react';
import { ChefHat } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-4">
      <div className="relative">
        <ChefHat className="h-12 w-12 text-primary-600 animate-bounce" />
        <div className="absolute inset-0 bg-primary-200 rounded-full animate-ping opacity-75"></div>
      </div>
      <p className="text-lg text-gray-600 font-medium">Searching for delicious recipes...</p>
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
};

export default Loader;