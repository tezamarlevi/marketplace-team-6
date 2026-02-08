import React, { useState } from 'react';
import { Star, Check, ShoppingCart, Plus, Minus } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const ProductDetailPage = () => {
  const { products, addToCart, currentPath } = useApp();
  const productId = parseInt(currentPath.split('/').pop());
  const product = products.find(p => p.id === productId);
  const [quantity, setQuantity] = useState(1);

  if (!product) return <div className="not-found">Product not found</div>;

  return (
    <div className="product-detail-page">
      <div className="detail-container">
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="detail-content">
          <span className="detail-category">{product.category}</span>
          <h1 className="detail-title">{product.name}</h1>
          <div className="detail-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={18} 
                  fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                />
              ))}
            </div>
            <span>{product.rating} / 5.0</span>
          </div>
          <p className="detail-description">{product.description}</p>
          
          <div className="detail-features">
            <h3>Features</h3>
            <ul>
              {product.features.map((feature, idx) => (
                <li key={idx}>
                  <Check size={16} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="detail-price-section">
            <span className="detail-price">Rp {product.price.toLocaleString('id-ID')}</span>
            <span className="detail-stock">Stock: {product.stock} items</span>
          </div>

          <div className="detail-actions">
            <div className="quantity-selector">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus size={16} />
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}>
                <Plus size={16} />
              </button>
            </div>
            <button 
              className="add-to-cart-large"
              onClick={() => {
                addToCart(product, quantity);
                alert('Added to cart!');
              }}
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
