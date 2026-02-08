import React from 'react';
import { Camera, ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import { Link } from './Router';
import { useApp } from '../contexts/AppContext';

const Navbar = () => {
  const { user, logout, cart, isMenuOpen, setIsMenuOpen } = useApp();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <Camera size={28} />
          <span>BION</span>
          <span className="logo-accent">MART</span>
        </Link>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Products</Link>
          {user && <Link to="/admin/products" className="nav-link">Manage</Link>}
        </div>

        <div className="nav-actions">
          <Link to="/cart" className="cart-button">
            <ShoppingCart size={22} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          
          {user ? (
            <div className="user-menu">
              <span className="user-name">{user.name}</span>
              <button onClick={logout} className="logout-btn">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="login-btn">
              <User size={18} />
              Login
            </Link>
          )}

          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
