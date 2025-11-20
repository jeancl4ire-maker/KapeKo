import React from 'react';
import ModernNavbar from '../components/ModernNavbar';
import HeroWithLogo from '../components/HeroWithLogo';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-coffee-cream">
      <ModernNavbar />
      <HeroWithLogo />
    </div>
  );
};

export default HomePage;
