import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import AuthModal from './AuthModal';

export default function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const { getCartCount, setIsCartOpen } = useCart();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    <>
      <nav className={`${isHomePage ? 'absolute' : 'relative'} top-0 left-0 right-0 z-40 ${isHomePage ? '' : 'bg-coffee-cream shadow-lg'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl md:text-3xl font-black text-coffee-brown">
                Kape Ko
              </h1>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`font-semibold transition-colors ${
                  location.pathname === '/' 
                    ? 'text-coffee-brown' 
                    : 'text-coffee-dark hover:text-coffee-brown'
                }`}
              >
                Home
              </Link>
              <Link
                to="/menu"
                className={`font-semibold transition-colors ${
                  location.pathname === '/menu' 
                    ? 'text-coffee-brown' 
                    : 'text-coffee-dark hover:text-coffee-brown'
                }`}
              >
                Menu
              </Link>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-coffee-brown hover:text-coffee-dark transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-coffee-gold text-coffee-dark text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </button>

              {/* Auth Button */}
              {currentUser ? (
                <div className="flex items-center space-x-3">
                  <span className="hidden sm:block text-coffee-dark font-medium">
                    Hi, {currentUser.name}
                  </span>
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-coffee-brown border-2 border-coffee-brown rounded-lg hover:bg-coffee-brown hover:text-white transition-all duration-300 font-semibold"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-4 py-2 bg-coffee-brown text-white rounded-lg hover:bg-coffee-dark transition-all duration-300 font-semibold"
                >
                  Sign In
                </button>
              )}

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-coffee-brown"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-coffee-cream border-t border-coffee-brown">
              <div className="px-4 py-3 space-y-3">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block font-semibold transition-colors ${
                    location.pathname === '/' 
                      ? 'text-coffee-brown' 
                      : 'text-coffee-dark hover:text-coffee-brown'
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block font-semibold transition-colors ${
                    location.pathname === '/menu' 
                      ? 'text-coffee-brown' 
                      : 'text-coffee-dark hover:text-coffee-brown'
                  }`}
                >
                  Menu
                </Link>
                {currentUser && (
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left font-semibold text-coffee-brown hover:text-coffee-dark transition-colors"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
