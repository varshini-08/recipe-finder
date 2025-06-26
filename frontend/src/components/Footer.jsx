import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2">
            <Heart className="h-4 w-4 text-red-400" />
            <span className="text-sm">Made with love for food enthusiasts</span>
          </div>
          <p className="text-sm text-gray-400">
            © 2025 Recipe Finder by Varshini
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;