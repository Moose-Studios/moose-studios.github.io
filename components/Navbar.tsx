import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';

interface NavbarProps {
  onGoHome: () => void;
  isHome: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onGoHome, isHome }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
        e.preventDefault();
        if (!isHome) {
          onGoHome();
          // Small delay to allow home view to mount before scrolling
          setTimeout(() => {
            const element = document.querySelector(href);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } else {
          const element = document.querySelector(href);
          if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
          }
        }
        setMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled || !isHome ? 'bg-coffee-950/95 backdrop-blur-sm shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            onClick={onGoHome}
            className="flex-shrink-0 flex items-center cursor-pointer group"
          >
            <span className={`font-hand text-2xl font-bold transition-colors ${scrolled || !isHome ? 'text-coffee-50' : 'text-coffee-900'}`}>
              <i className="fas fa-gamepad mr-2 transform group-hover:rotate-12 transition-transform"></i>
              Moose Studios
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3 py-2 rounded-md text-md font-medium transition-colors cursor-pointer ${
                    scrolled || !isHome
                      ? 'text-coffee-100 hover:text-white hover:bg-coffee-800'
                      : 'text-coffee-900 hover:text-coffee-700 hover:bg-coffee-200/50'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md ${scrolled || !isHome ? 'text-coffee-100' : 'text-coffee-900'}`}
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-coffee-900 border-t border-coffee-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-coffee-100 hover:bg-coffee-800 block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
