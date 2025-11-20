import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authModal, setAuthModal] = useState({
    isOpen: false,
    mode: 'login', // 'login' or 'register'
    context: null // 'addToCart', 'checkout', etc.
  });

  useEffect(() => {
    const token = localStorage.getItem('kapeko_token');
    const user = localStorage.getItem('kapeko_user');
    
    if (token && user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulate API call - in production, this would be a real API
      const response = await mockLogin(email, password);
      
      const { user, token } = response;
      localStorage.setItem('kapeko_token', token);
      localStorage.setItem('kapeko_user', JSON.stringify(user));
      setCurrentUser(user);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      // Simulate API call
      const response = await mockRegister(userData);
      
      const { user, token } = response;
      localStorage.setItem('kapeko_token', token);
      localStorage.setItem('kapeko_user', JSON.stringify(user));
      setCurrentUser(user);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('kapeko_token');
    localStorage.removeItem('kapeko_user');
    setCurrentUser(null);
  };

  const showAuthModal = (context = null) => {
    setAuthModal({
      isOpen: true,
      mode: 'login',
      context
    });
  };

  const hideAuthModal = () => {
    setAuthModal({
      isOpen: false,
      mode: 'login',
      context: null
    });
  };

  const switchToRegister = () => {
    setAuthModal(prev => ({ ...prev, mode: 'register' }));
  };

  const switchToLogin = () => {
    setAuthModal(prev => ({ ...prev, mode: 'login' }));
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading,
    authModal,
    showAuthModal,
    hideAuthModal,
    switchToRegister,
    switchToLogin
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Mock API functions
async function mockLogin(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'demo@kapeko.com' && password === 'demo123') {
        resolve({
          user: {
            id: 1,
            name: 'Demo User',
            email: 'demo@kapeko.com',
            phone: '09123456789'
          },
          token: 'mock_jwt_token_' + Date.now()
        });
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 1000);
  });
}

async function mockRegister(userData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userData.email && userData.password && userData.name) {
        resolve({
          user: {
            id: Date.now(),
            name: userData.name,
            email: userData.email,
            phone: userData.phone || ''
          },
          token: 'mock_jwt_token_' + Date.now()
        });
      } else {
        reject(new Error('Please fill all required fields'));
      }
    }, 1000);
  });
}
