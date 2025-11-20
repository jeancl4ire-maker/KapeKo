import React, { useState } from 'react';
import { coffeeMenu, categories } from '../data/coffeeMenu';
import { useCart } from '../context/CartContext';

export default function MenuGrid() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    const success = addToCart(product);
    if (success) {
      // Show success feedback
      console.log('Added to cart!');
    }
    // If not successful (user not authenticated), auth modal will show automatically
  };

  const filteredMenu = coffeeMenu.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-coffee-brown mb-4">
          Our Coffee Menu
        </h1>
        <p className="text-xl text-coffee-dark mb-2">
          50% OFF ALL ITEMS - Limited Time Offer!
        </p>
        <div className="inline-block bg-coffee-gold px-6 py-2 rounded-full">
          <span className="text-lg font-bold text-coffee-dark">Special Discount Applied</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search for your favorite coffee..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field text-lg"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-coffee-brown text-white'
                  : 'bg-white text-coffee-brown border-2 border-coffee-brown hover:bg-coffee-brown hover:text-white'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMenu.map(item => (
          <div key={item.id} className="card relative overflow-hidden group">
            {/* Featured Badge */}
            {item.featured && (
              <div className="absolute top-4 right-4 z-10">
                <span className="bg-coffee-gold text-coffee-dark px-3 py-1 rounded-full text-sm font-bold">
                  Featured
                </span>
              </div>
            )}

            {/* Product Image */}
            <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              
              {/* 50% OFF Overlay */}
              <div className="absolute top-2 left-2">
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  50% OFF
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-coffee-brown mb-2">
                {item.name}
              </h3>
              <p className="text-coffee-dark text-sm mb-3 line-clamp-2">
                {item.description}
              </p>
              
              {/* Price Display */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl font-bold text-coffee-brown">
                  ₱{item.discountedPrice}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ₱{item.originalPrice}
                </span>
                <span className="text-sm text-green-600 font-semibold">
                  Save ₱{item.originalPrice - item.discountedPrice}
                </span>
              </div>

              {/* Stock Status */}
              <div className="mb-3">
                {item.inStock ? (
                  <span className="text-green-600 text-sm font-semibold">✓ In Stock</span>
                ) : (
                  <span className="text-red-500 text-sm font-semibold">Out of Stock</span>
                )}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => handleAddToCart(item)}
              disabled={!item.inStock}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {item.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredMenu.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-coffee-dark">
            No coffee items found matching your criteria.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchTerm('');
            }}
            className="btn-secondary mt-4"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
