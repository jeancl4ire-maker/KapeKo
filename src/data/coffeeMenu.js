export const coffeeMenu = [
  {
    id: 1,
    name: "Creamy Latte",
    description: "Coffee with creamy milk mixture",
    originalPrice: 240,
    discountedPrice: 120,
    image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400&h=300&fit=crop",
    category: "special",
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: "Espresso Special", 
    description: "Bold coffee with distinctive aroma",
    originalPrice: 200,
    discountedPrice: 100,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop",
    category: "special",
    inStock: true,
    featured: true
  },
  {
    id: 3,
    name: "Cappuccino",
    description: "Perfect coffee and milk balance",
    originalPrice: 220,
    discountedPrice: 110,
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop",
    category: "classic",
    inStock: true,
    featured: false
  },
  {
    id: 4,
    name: "Mocha",
    description: "Chocolate and coffee delight",
    originalPrice: 260,
    discountedPrice: 130,
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=300&fit=crop",
    category: "special",
    inStock: true,
    featured: false
  },
  {
    id: 5, 
    name: "Cold Brew",
    description: "Smooth and refreshing iced coffee",
    originalPrice: 200,
    discountedPrice: 100,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop",
    category: "iced",
    inStock: true,
    featured: false
  },
  {
    id: 6,
    name: "Americano",
    description: "Rich and strong black coffee",
    originalPrice: 180,
    discountedPrice: 90,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop",
    category: "classic",
    inStock: true,
    featured: false
  }
];

export const categories = [
  { id: 'all', name: 'All Items' },
  { id: 'special', name: 'Special Coffee' },
  { id: 'classic', name: 'Classic' },
  { id: 'iced', name: 'Iced Coffee' }
];
