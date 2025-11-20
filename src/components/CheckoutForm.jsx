import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function CheckoutForm({ onOrderComplete }) {
  const { cartItems, getCartTotal, getOriginalTotal, getSavings, clearCart } = useCart();
  const { currentUser } = useAuth();
  
  const [shippingInfo, setShippingInfo] = useState({
    fullName: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: '',
    city: '',
    postalCode: '',
    notes: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('gcash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!shippingInfo.fullName) newErrors.fullName = 'Full name is required';
    if (!shippingInfo.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(shippingInfo.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!shippingInfo.phone) newErrors.phone = 'Phone number is required';
    if (!shippingInfo.address) newErrors.address = 'Address is required';
    if (!shippingInfo.city) newErrors.city = 'City is required';
    if (!shippingInfo.postalCode) newErrors.postalCode = 'Postal code is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const orderData = {
        id: 'ORD' + Date.now(),
        items: cartItems,
        shipping: shippingInfo,
        payment: paymentMethod,
        total: getCartTotal(),
        originalTotal: getOriginalTotal(),
        savings: getSavings(),
        status: 'confirmed',
        date: new Date().toISOString()
      };
      
      clearCart();
      onOrderComplete(orderData);
      setIsProcessing(false);
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-coffee-dark mb-4">Your cart is empty</p>
        <a href="/menu" className="btn-secondary inline-block">
          Return to Menu
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-coffee-brown mb-8 text-center">Checkout</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Order Summary */}
        <div className="card">
          <h2 className="text-2xl font-bold text-coffee-brown mb-4">Order Summary</h2>
          <div className="space-y-3">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200">
                <div>
                  <span className="font-semibold text-coffee-brown">{item.name}</span>
                  <span className="text-gray-500 ml-2">x{item.quantity}</span>
                </div>
                <span className="font-bold text-coffee-brown">
                  ₱{(item.discountedPrice * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            
            <div className="pt-3 space-y-2">
              <div className="flex justify-between text-coffee-dark">
                <span>Original Total:</span>
                <span>₱{getOriginalTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-green-600 font-semibold">
                <span>Your Savings:</span>
                <span>-₱{getSavings().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-coffee-brown pt-2 border-t border-coffee-brown">
                <span>Total:</span>
                <span>₱{getCartTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="card">
          <h2 className="text-2xl font-bold text-coffee-brown mb-4">Shipping Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-coffee-dark font-semibold mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={shippingInfo.fullName}
                onChange={handleInputChange}
                className={`input-field ${errors.fullName ? 'border-red-500' : ''}`}
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>
            
            <div>
              <label className="block text-coffee-dark font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={shippingInfo.email}
                onChange={handleInputChange}
                className={`input-field ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <label className="block text-coffee-dark font-semibold mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={shippingInfo.phone}
                onChange={handleInputChange}
                className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
            
            <div>
              <label className="block text-coffee-dark font-semibold mb-2">City</label>
              <input
                type="text"
                name="city"
                value={shippingInfo.city}
                onChange={handleInputChange}
                className={`input-field ${errors.city ? 'border-red-500' : ''}`}
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-coffee-dark font-semibold mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={shippingInfo.address}
                onChange={handleInputChange}
                className={`input-field ${errors.address ? 'border-red-500' : ''}`}
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>
            
            <div>
              <label className="block text-coffee-dark font-semibold mb-2">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={shippingInfo.postalCode}
                onChange={handleInputChange}
                className={`input-field ${errors.postalCode ? 'border-red-500' : ''}`}
              />
              {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-coffee-dark font-semibold mb-2">Delivery Notes (Optional)</label>
              <textarea
                name="notes"
                value={shippingInfo.notes}
                onChange={handleInputChange}
                rows={3}
                className="input-field"
                placeholder="Special instructions for delivery..."
              />
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="card">
          <h2 className="text-2xl font-bold text-coffee-brown mb-4">Payment Method</h2>
          <div className="space-y-4">
            <label className="flex items-center p-4 border-2 border-coffee-brown rounded-lg cursor-pointer hover:bg-coffee-cream transition-colors">
              <input
                type="radio"
                name="payment"
                value="gcash"
                checked={paymentMethod === 'gcash'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3"
              />
              <div className="flex-1">
                <div className="font-bold text-coffee-brown">GCash</div>
                <div className="text-sm text-coffee-dark">Pay using GCash QR code</div>
              </div>
              <div className="text-2xl">💰</div>
            </label>
            
            <label className="flex items-center p-4 border-2 border-coffee-brown rounded-lg cursor-pointer hover:bg-coffee-cream transition-colors">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3"
              />
              <div className="flex-1">
                <div className="font-bold text-coffee-brown">Credit/Debit Card</div>
                <div className="text-sm text-coffee-dark">Secure payment with card</div>
              </div>
              <div className="text-2xl">💳</div>
            </label>
            
            <label className="flex items-center p-4 border-2 border-coffee-brown rounded-lg cursor-pointer hover:bg-coffee-cream transition-colors">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3"
              />
              <div className="flex-1">
                <div className="font-bold text-coffee-brown">Cash on Delivery</div>
                <div className="text-sm text-coffee-dark">Pay when you receive</div>
              </div>
              <div className="text-2xl">💵</div>
            </label>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          type="submit"
          disabled={isProcessing}
          className="btn-primary w-full text-xl py-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Processing Order...' : `Place Order - ₱${getCartTotal().toFixed(2)}`}
        </button>
      </form>
    </div>
  );
}
