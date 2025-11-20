import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ModernNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, showAuthModal } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-coffee-cream/90 backdrop-blur-md border-b border-amber-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3 group">
              <img 
                src="/images/icon_logo.jpg" 
                alt="Kape Ko"
                className="h-8 w-auto sm:h-10 rounded-lg shadow-sm border border-amber-300 group-hover:shadow-md transition-all duration-300"
              />
              <span className="text-lg sm:text-xl font-bold text-modern-black hidden sm:block group-hover:text-coffee-brown transition-colors duration-300 font-inter">
                Kape Ko
              </span>
            </Link>
          </div>
          
          {/* Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-6 mx-4">
            <Link 
              to="/" 
              className="text-modern-black hover:text-coffee-brown transition-colors font-medium text-sm sm:text-base font-inter"
            >
              Home
            </Link>
            <span className="text-amber-300 text-lg">|</span>
            <Link 
              to="/menu" 
              className="text-modern-black hover:text-coffee-brown transition-colors font-medium text-sm sm:text-base font-inter"
            >
              Menu
            </Link>
          </div>
          
          {/* Sign In Button - Right */}
          <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-modern-black font-medium text-sm sm:text-base font-inter">Hello, {user.name}</span>
                <button 
                  onClick={logout}
                  className="bg-modern-black text-pure-white px-4 py-2 rounded-full text-sm sm:text-base hover:bg-coffee-brown transition-colors font-inter whitespace-nowrap"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button 
                onClick={() => showAuthModal()}
                className="bg-modern-black text-pure-white px-4 py-2 rounded-full text-sm sm:text-base hover:bg-coffee-brown transition-colors font-inter whitespace-nowrap"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col space-y-1 p-2 flex-shrink-0"
          >
            <span className={`w-6 h-0.5 bg-modern-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-modern-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-modern-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-amber-200">
            <div className="flex flex-col space-y-4 pt-4">
              <Link 
                to="/" 
                className="text-modern-black hover:text-coffee-brown transition-colors font-medium text-sm sm:text-base font-inter"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/menu" 
                className="text-modern-black hover:text-coffee-brown transition-colors font-medium text-sm sm:text-base font-inter"
                onClick={() => setIsMenuOpen(false)}
              >
                Menu
              </Link>
              {user ? (
                <div className="flex flex-col space-y-2">
                  <span className="text-modern-black font-medium text-sm sm:text-base font-inter">Hello, {user.name}</span>
                  <button 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="bg-modern-black text-pure-white px-4 py-2 rounded-full text-sm sm:text-base hover:bg-coffee-brown transition-colors font-inter w-fit"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => {
                    showAuthModal();
                    setIsMenuOpen(false);
                  }}
                  className="bg-modern-black text-pure-white px-4 py-2 rounded-full text-sm sm:text-base hover:bg-coffee-brown transition-colors font-inter w-fit"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default ModernNavbar;
