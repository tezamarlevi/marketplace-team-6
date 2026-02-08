import React from 'react';
import { Link } from './Router';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>BIONEMART</h3>
          <p>Your destination for curated products</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
        </div>
        <div className="footer-section">
          <h4>Analytics</h4>
          <p>Powered by Google Analytics & LogRocket</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 BionMart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
