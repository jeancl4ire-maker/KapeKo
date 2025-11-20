# Kape Ko - Premium Coffee Shop E-commerce

A complete React.js coffee shop e-commerce website with 3D visuals, user authentication, and full ordering functionality.

## 🎨 Design Features

- **Exact Poster Recreation**: Landing page matches the provided design specifications
- **Color Scheme**: Coffee brown (#8B4513), cream (#F5F5DC), dark brown (#654321), and gold (#D4AF37)
- **Typography**: Playfair Display for headings, Open Sans for body text
- **3D Coffee Scene**: Interactive Three.js coffee cup with steam effects
- **50% Discount**: All items displayed with original and discounted prices

## 🚀 Features

### User Experience
- **Authentication**: Login/Register system with JWT simulation
- **Shopping Cart**: Real-time cart management with localStorage persistence
- **Product Catalog**: 8 coffee items with categories and search functionality
- **Checkout Process**: Complete order flow with multiple payment methods
- **Order Confirmation**: Detailed receipt with order tracking

### Technical Implementation
- **React 18**: Modern React with hooks and functional components
- **React Router**: Client-side routing for SPA navigation
- **Three.js**: 3D coffee cup with particle steam effects
- **Tailwind CSS**: Custom color scheme and responsive design
- **Context API**: State management for auth and cart functionality

## 📦 Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open http://localhost:3000 in your browser

## 🔐 Demo Account

For quick testing, use the demo account:
- **Email**: demo@kapeko.com
- **Password**: demo123

## 📱 Pages & Routes

- **/** - Landing page with 3D coffee scene and special offers
- **/menu** - Interactive coffee menu with 50% discount pricing
- **/checkout** - Complete checkout process with payment options

## 🛒 Shopping Flow

1. Browse the menu and add items to cart
2. View real-time cart updates with savings calculation
3. Sign in or create an account
4. Complete checkout with shipping information
5. Choose payment method (GCash, Card, or Cash on Delivery)
6. Receive order confirmation with detailed receipt

## 💳 Payment Methods

- **GCash**: QR code payment simulation
- **Credit/Debit Card**: Secure card payment form
- **Cash on Delivery**: Pay upon receipt

## 🎯 Key Components

- `HeroSection.jsx` - Landing page with exact poster design
- `CoffeeScene.jsx` - Three.js 3D coffee cup visualization
- `AuthModal.jsx` - Login/Register modal system
- `MenuGrid.jsx` - Product catalog with filtering
- `ShoppingCart.jsx` - Sidebar cart with real-time updates
- `CheckoutForm.jsx` - Complete checkout process
- `OrderConfirmation.jsx` - Receipt and order details

## 🔧 Technologies Used

- **Frontend**: React 18, React Router, Three.js
- **Styling**: Tailwind CSS with custom configuration
- **State Management**: React Context API
- **Icons**: Unicode emoji and inline SVG
- **Images**: Unsplash placeholder images

## 📱 Responsive Design

- Mobile-first approach with Tailwind CSS
- Responsive grid layouts for all screen sizes
- Touch-friendly interface elements
- Optimized 3D scene performance

## 🎨 Custom Styling

The project uses a custom Tailwind configuration with:
- Coffee-themed color palette
- Custom font families (Playfair Display, Open Sans)
- Component utility classes for consistent styling
- Hover effects and transitions

## 📄 License

This project is for demonstration purposes. Feel free to use and modify for your own coffee shop e-commerce needs.
