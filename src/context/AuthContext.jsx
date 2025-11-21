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
      hideAuthModal();
      
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
      hideAuthModal();
      
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
      // Check registered users in localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('kapeko_registered_users') || '[]');
      const user = registeredUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        resolve({
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone
          },
          token: 'mock_jwt_token_' + Date.now()
        });
      } else if (email === 'demo@kapeko.com' && password === 'demo123') {
        // Keep demo account for testing
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
        // Get existing users
        const registeredUsers = JSON.parse(localStorage.getItem('kapeko_registered_users') || '[]');
        
        // Check if email already exists
        if (registeredUsers.some(u => u.email === userData.email)) {
          reject(new Error('Email already registered'));
          return;
        }
        
        // Create new user
        const newUser = {
          id: Date.now(),
          name: userData.name,
          email: userData.email,
          phone: userData.phone || '',
          password: userData.password // Store password for mock login
        };
        
        // Save to localStorage
        registeredUsers.push(newUser);
        localStorage.setItem('kapeko_registered_users', JSON.stringify(registeredUsers));
        
        resolve({
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone
          },
          token: 'mock_jwt_token_' + Date.now()
        });
      } else {
        reject(new Error('Please fill all required fields'));
      }
    }, 1000);
  });
}
