import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-coffee-cream flex items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto">
        {/* Logo Display */}
        <div className="mb-8">
          <img 
            src="/images/icon_logo.jpg" 
            alt="Kape Ko - Coffee Delivery & Pickup"
            className="mx-auto w-80 h-auto mb-8 animate-fade-in"
          />
        </div>
        
        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-heading font-bold text-coffee-dark mb-4">
          Special <span className="text-coffee-brown">COFFEE</span>
        </h1>
        
        {/* Description */}
        <p className="text-xl md:text-2xl text-coffee-dark mb-8 max-w-2xl mx-auto leading-relaxed">
          COFFEE WITH A CREAMY MILK MIXTURE WITH A DISTINCTIVE TASTE AND AROMA
        </p>
        
        {/* Promotion Badge */}
        <div className="bg-coffee-gold text-white py-3 px-8 rounded-full inline-block mb-8">
          <span className="text-2xl font-bold">50% OFF TODAY'S OFFER</span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/menu"
            className="bg-coffee-brown text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-coffee-dark transition-colors"
          >
            ORDER NOW
          </Link>
          <Link 
            to="/menu"
            className="border-2 border-coffee-brown text-coffee-brown px-8 py-4 rounded-lg text-xl font-semibold hover:bg-coffee-brown hover:text-white transition-colors"
          >
            NEW MENU
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
