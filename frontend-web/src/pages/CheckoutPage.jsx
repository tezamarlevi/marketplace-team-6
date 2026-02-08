import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { trackEvent } from '../utils/analytics';

const CheckoutPage = () => {
  const { cart, user, navigate } = useApp();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postal: ''
  });

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 50000;

  const handleSubmit = (e) => {
    e.preventDefault();
    trackEvent('Checkout', 'complete_order', total);
    alert('Order placed successfully!');
    navigate('/');
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="checkout-page">
      <h1 className="page-title">Checkout</h1>
      <div className="checkout-container">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Shipping Information</h2>
            <div className="form-grid">
              <input 
                type="text" 
                placeholder="Full Name" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <input 
                type="email" 
                placeholder="Email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <input 
                type="tel" 
                placeholder="Phone Number" 
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="Address" 
                required
                className="full-width"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="City" 
                required
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="Postal Code" 
                required
                value={formData.postal}
                onChange={(e) => setFormData({...formData, postal: e.target.value})}
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Payment Method</h2>
            <div className="payment-options">
              <label className="payment-option">
                <input type="radio" name="payment" value="bank" required />
                <span>Bank Transfer</span>
              </label>
              <label className="payment-option">
                <input type="radio" name="payment" value="ewallet" />
                <span>E-Wallet</span>
              </label>
              <label className="payment-option">
                <input type="radio" name="payment" value="cod" />
                <span>Cash on Delivery</span>
              </label>
            </div>
          </div>

          <button type="submit" className="place-order-btn">
            Place Order - Rp {total.toLocaleString('id-ID')}
          </button>
        </form>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-items">
            {cart.map(item => (
              <div key={item.id} className="summary-item">
                <img src={item.image} alt={item.name} />
                <div className="summary-item-info">
                  <span>{item.name}</span>
                  <span>x{item.quantity}</span>
                </div>
                <span className="summary-item-price">
                  Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                </span>
              </div>
            ))}
          </div>
          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>Rp {(total - 50000).toLocaleString('id-ID')}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Rp 50,000</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>Rp {total.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
