import React from 'react';
import { Link } from 'react-router-dom';

const HeroWithLogo = () => {
  return (
    <section className="min-h-screen bg-coffee-cream pt-20 flex items-center justify-center px-4 sm:px-6 py-8">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Centered Styled Logo */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-block p-8 bg-amber-50 rounded-2xl shadow-2xl border border-amber-200 transform hover:scale-105 transition-transform duration-300">
            <img 
              src="/images/icon_logo.jpg" 
              alt="Kape Ko - Coffee Delivery & Pickup"
              className="w-80 h-auto mx-auto rounded-xl shadow-lg"
            />
          </div>
        </div>

        {/* Hero Content */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-modern-black mb-6 font-inter">
            Special <span className="text-coffee-brown">COFFEE</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed font-inter">
            COFFEE WITH A CREAMY MILK MIXTURE WITH A DISTINCTIVE TASTE AND AROMA
          </p>
          
          {/* Promotion */}
          <div className="bg-gradient-to-r from-premium-gold to-amber-500 text-white px-8 py-4 rounded-full inline-block mb-8 shadow-lg">
            <span className="text-xl font-bold tracking-wide font-inter">50% OFF TODAY'S OFFER</span>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/menu"
              className="bg-modern-black text-pure-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-coffee-brown transition-all duration-300 shadow-lg hover:shadow-xl font-inter"
            >
              ORDER NOW
            </Link>
            <Link 
              to="/menu"
              className="border-2 border-modern-black text-modern-black px-8 py-4 rounded-xl text-lg font-semibold hover:bg-modern-black hover:text-pure-white transition-all duration-300 font-inter"
            >
              NEW MENU
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroWithLogo;
