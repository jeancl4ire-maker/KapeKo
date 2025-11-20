import React from 'react';

const ModernLogo = () => {
  return (
    <div className="text-center mb-12 animate-fade-in-up">
      {/* Main Logo */}
      <div className="mb-6">
        <h1 className="text-5xl md:text-6xl font-bold text-modern-black mb-2 tracking-tight font-inter">
          COFFEE DELIVERY
        </h1>
        <div className="w-16 h-0.5 bg-premium-gold mx-auto mb-3"></div>
        <p className="text-xl text-gray-600 font-light tracking-wide font-inter">PICKUP</p>
      </div>
    </div>
  );
};

export default ModernLogo;
