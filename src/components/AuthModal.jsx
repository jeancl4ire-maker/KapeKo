import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { 
    authModal, 
    hideAuthModal, 
    switchToRegister, 
    switchToLogin, 
    login, 
    register 
  } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
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
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (authModal.mode === 'register') {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      let result;
      if (authModal.mode === 'login') {
        result = await login(formData.email, formData.password);
      } else {
        result = await register(formData);
      }
      
      if (result.success) {
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: ''
        });
        // Close modal after successful login/register
        hideAuthModal();
      } else {
        setErrors({ general: result.error });
      }
    } catch (error) {
      setErrors({ general: error.message || 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  
  if (!authModal.isOpen) return null;

  const getModalTitle = () => {
    if (authModal.context === 'addToCart') {
      return 'Sign in to add items to cart';
    }
    return authModal.mode === 'login' ? 'Welcome Back' : 'Create Account';
  };

  const getModalDescription = () => {
    if (authModal.context === 'addToCart') {
      return 'Please sign in or create an account to start shopping.';
    }
    return authModal.mode === 'login' 
      ? 'Sign in to your account to continue' 
      : 'Create your account to get started';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
        {/* Close Button */}
        <button
          onClick={hideAuthModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-coffee-dark">{getModalTitle()}</h2>
          <p className="text-gray-600 mt-2">{getModalDescription()}</p>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {authModal.mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-brown focus:border-transparent"
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-brown focus:border-transparent"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          
          {authModal.mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-brown focus:border-transparent"
                placeholder="Enter your phone number"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-brown focus:border-transparent"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          
          {authModal.mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-brown focus:border-transparent"
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          )}
          
          {errors.general && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {errors.general}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-coffee-brown text-white py-3 rounded-lg font-semibold hover:bg-coffee-dark transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Please wait...' : authModal.mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        
        {/* Toggle Mode */}
        <div className="text-center mt-4">
          {authModal.mode === 'login' ? (
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={switchToRegister}
                className="text-coffee-brown font-semibold hover:underline"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={switchToLogin}
                className="text-coffee-brown font-semibold hover:underline"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
        
        {/* Demo Account Info */}
        {authModal.mode === 'login' && (
          <div className="mt-4 p-4 bg-coffee-cream rounded-lg text-sm">
            <p className="text-coffee-dark font-semibold mb-1">Demo Account:</p>
            <p className="text-coffee-dark">Email: demo@kapeko.com</p>
            <p className="text-coffee-dark">Password: demo123</p>
          </div>
        )}
      </div>
    </div>
  );
}
