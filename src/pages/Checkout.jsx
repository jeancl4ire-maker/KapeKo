import React, { useState } from 'react';
import CheckoutForm from '../components/CheckoutForm';
import OrderConfirmation from '../components/OrderConfirmation';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const [orderData, setOrderData] = useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!currentUser) {
      navigate('/menu');
    }
  }, [currentUser, navigate]);

  const handleOrderComplete = (order) => {
    setOrderData(order);
  };

  if (!currentUser) {
    return null; // Will redirect
  }

  if (orderData) {
    return <OrderConfirmation orderData={orderData} />;
  }

  return (
    <div className="min-h-screen bg-coffee-cream">
      <CheckoutForm onOrderComplete={handleOrderComplete} />
    </div>
  );
}
