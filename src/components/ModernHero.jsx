import React from 'react';
import { Link } from 'react-router-dom';

const ModernHero = () => {
  return (
    <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
      {/* Headline */}
      <h2 className="text-4xl md:text-5xl font-bold text-modern-black mb-6 font-inter">
        Special <span className="text-coffee-brown">COFFEE</span>
      </h2>
      
      {/* Description */}
      <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto font-inter">
        COFFEE WITH A CREAMY MILK MIXTURE WITH A DISTINCTIVE TASTE AND AROMA
      </p>
      
      {/* Promotion Badge */}
      <div className="inline-block bg-gradient-to-r from-premium-gold to-amber-500 text-white px-8 py-3 rounded-full mb-8 shadow-lg animate-subtle-float">
        <span className="text-xl font-bold tracking-wide font-inter">50% OFF TODAY'S OFFER</span>
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link 
          to="/menu"
          className="bg-modern-black text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-coffee-brown transition-all duration-300 transform hover:scale-105 shadow-lg font-inter"
        >
          ORDER NOW
        </Link>
        <Link 
          to="/menu"
          className="border-2 border-modern-black text-modern-black px-8 py-4 rounded-xl text-lg font-semibold hover:bg-modern-black hover:text-white transition-all duration-300 font-inter"
        >
          NEW MENU
        </Link>
      </div>
    </div>
  );
};

export default ModernHero;
