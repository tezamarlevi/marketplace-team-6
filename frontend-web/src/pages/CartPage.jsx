import React from 'react';
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { Link } from '../components/Router';
import { useApp } from '../contexts/AppContext';

const CartPage = () => {
  const { cart, updateCartQuantity, removeFromCart, navigate } = useApp();
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <ShoppingCart size={64} />
        <h2>Your cart is empty</h2>
        <p>Add some products to get started</p>
        <Link to="/products" className="cta-button">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="page-title">Shopping Cart</h1>
      <div className="cart-container">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <span className="cart-item-price">Rp {item.price.toLocaleString('id-ID')}</span>
              </div>
              <div className="cart-item-actions">
                <div className="quantity-control">
                  <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)}>
                    <Minus size={14} />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)}>
                    <Plus size={14} />
                  </button>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="cart-item-total">
                Rp {(item.price * item.quantity).toLocaleString('id-ID')}
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>Rp {total.toLocaleString('id-ID')}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Rp 50,000</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>Rp {(total + 50000).toLocaleString('id-ID')}</span>
          </div>
          <button className="checkout-btn" onClick={() => navigate('/checkout')}>
            Proceed to Checkout
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
