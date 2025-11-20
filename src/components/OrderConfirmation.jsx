import React from 'react';
import { Link } from 'react-router-dom';

export default function OrderConfirmation({ orderData }) {
  const formatCurrency = (amount) => {
    return `₱${amount.toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPaymentMethodDisplay = (method) => {
    switch (method) {
      case 'gcash': return 'GCash';
      case 'card': return 'Credit/Debit Card';
      case 'cod': return 'Cash on Delivery';
      default: return method;
    }
  };

  return (
    <div className="min-h-screen bg-coffee-cream py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-4xl font-bold text-coffee-brown mb-4">
            Order Confirmed!
          </h1>
          <p className="text-xl text-coffee-dark">
            Thank you for your order. We're preparing your coffee!
          </p>
        </div>

        {/* Order Details Card */}
        <div className="card mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-coffee-brown mb-2">
                Order #{orderData.id}
              </h2>
              <p className="text-coffee-dark">
                Placed on {formatDate(orderData.date)}
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
                {orderData.status.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Customer Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-bold text-coffee-brown mb-3">Customer Information</h3>
              <div className="space-y-2 text-coffee-dark">
                <p><strong>Name:</strong> {orderData.shipping.fullName}</p>
                <p><strong>Email:</strong> {orderData.shipping.email}</p>
                <p><strong>Phone:</strong> {orderData.shipping.phone}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-coffee-brown mb-3">Delivery Address</h3>
              <div className="space-y-2 text-coffee-dark">
                <p>{orderData.shipping.address}</p>
                <p>{orderData.shipping.city}, {orderData.shipping.postalCode}</p>
                {orderData.shipping.notes && (
                  <p className="text-sm italic">Notes: {orderData.shipping.notes}</p>
                )}
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h3 className="font-bold text-coffee-brown mb-3">Order Items</h3>
            <div className="space-y-3">
              {orderData.items.map(item => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200">
                  <div>
                    <span className="font-semibold text-coffee-brown">{item.name}</span>
                    <span className="text-gray-500 ml-2">x{item.quantity}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-coffee-brown">
                      {formatCurrency(item.discountedPrice * item.quantity)}
                    </span>
                    <div className="text-sm text-gray-500 line-through">
                      {formatCurrency(item.originalPrice * item.quantity)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Information */}
          <div className="mb-6">
            <h3 className="font-bold text-coffee-brown mb-3">Payment Information</h3>
            <div className="bg-coffee-cream p-4 rounded-lg">
              <p className="text-coffee-dark">
                <strong>Payment Method:</strong> {getPaymentMethodDisplay(orderData.payment)}
              </p>
              <p className="text-coffee-dark mt-1">
                <strong>Total Amount:</strong> {formatCurrency(orderData.total)}
              </p>
              <p className="text-green-600 font-semibold mt-2">
                You saved {formatCurrency(orderData.savings)} with our 50% discount!
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t border-coffee-brown pt-4">
            <div className="space-y-2">
              <div className="flex justify-between text-coffee-dark">
                <span>Subtotal:</span>
                <span>{formatCurrency(orderData.originalTotal)}</span>
              </div>
              <div className="flex justify-between text-green-600 font-semibold">
                <span>Discount (50%):</span>
                <span>-{formatCurrency(orderData.savings)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-coffee-brown">
                <span>Total Paid:</span>
                <span>{formatCurrency(orderData.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Expected Delivery */}
        <div className="card mb-6">
          <h3 className="font-bold text-coffee-brown mb-3">Expected Delivery</h3>
          <div className="flex items-center gap-4">
            <div className="text-4xl">🚚</div>
            <div>
              <p className="text-coffee-dark font-semibold">
                30-45 minutes
              </p>
              <p className="text-sm text-coffee-dark">
                We'll send you updates on your delivery status
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/menu"
            className="btn-secondary text-center flex-1"
          >
            Order More Coffee
          </Link>
          <button
            onClick={() => window.print()}
            className="btn-primary flex-1"
          >
            Print Receipt
          </button>
        </div>

        {/* Contact Information */}
        <div className="mt-8 text-center">
          <p className="text-coffee-dark mb-2">
            Need help? Contact us at:
          </p>
          <p className="text-coffee-brown font-semibold">
            📞 0912-345-6789 | ✉️ orders@kapeko.com
          </p>
        </div>
      </div>
    </div>
  );
}
