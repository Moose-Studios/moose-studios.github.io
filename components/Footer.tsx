import React from 'react';

const Footer: React.FC = () => {
  const handleSocialClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Social link clicked (placeholder)");
  };

  return (
    <footer id="contact" className="bg-coffee-950 text-coffee-200 py-12 border-t border-coffee-800">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h2 className="text-2xl font-hand font-bold text-white mb-2">Moose Studios</h2>
          <p className="text-sm text-coffee-400">© {new Date().getFullYear()} Moose Studios. All rights reserved.</p>
          <p className="text-xs text-coffee-600 mt-1">Made with React, Tailwind & Gemini</p>
        </div>

        <div className="flex space-x-6">
          <a href="#" onClick={handleSocialClick} className="hover:text-amber-500 transition-colors transform hover:scale-110 cursor-pointer">
            <i className="fab fa-twitter text-2xl"></i>
          </a>
          <a href="#" onClick={handleSocialClick} className="hover:text-amber-500 transition-colors transform hover:scale-110 cursor-pointer">
            <i className="fab fa-itch-io text-2xl"></i>
          </a>
          <a href="#" onClick={handleSocialClick} className="hover:text-amber-500 transition-colors transform hover:scale-110 cursor-pointer">
            <i className="fab fa-github text-2xl"></i>
          </a>
          <a href="#" onClick={handleSocialClick} className="hover:text-amber-500 transition-colors transform hover:scale-110 cursor-pointer">
            <i className="fas fa-envelope text-2xl"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;