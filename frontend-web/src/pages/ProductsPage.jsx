import React, { useState } from 'react';
import { Search, Heart, Star, ShoppingCart } from 'lucide-react';
import { Link } from '../components/Router';
import { useApp } from '../contexts/AppContext';

const ProductsPage = () => {
  const { products, searchQuery, setSearchQuery, toggleFavorite, favorites, addToCart } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="products-page">
      <div className="products-header">
        <h1 className="page-title">All Products</h1>
        <div className="products-controls">
          <div className="search-box">
            <Search size={18} />
            <input 
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="category-filter">
            {['All', 'Electronics', 'Fashion'].map(cat => (
              <button
                key={cat}
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product, index) => (
          <div key={product.id} className="product-card" style={{ animationDelay: `${index * 0.05}s` }}>
            <button 
              className={`favorite-btn ${favorites.includes(product.id) ? 'active' : ''}`}
              onClick={() => toggleFavorite(product.id)}
            >
              <Heart size={18} fill={favorites.includes(product.id) ? 'currentColor' : 'none'} />
            </button>
            <Link to={`/product/${product.id}`} className="product-image">
              <img src={product.image} alt={product.name} />
            </Link>
            <div className="product-info">
              <span className="product-category">{product.category}</span>
              <Link to={`/product/${product.id}`}>
                <h3 className="product-name">{product.name}</h3>
              </Link>
              <div className="product-meta">
                <div className="product-rating">
                  <Star size={14} fill="currentColor" />
                  {product.rating}
                </div>
                <span className="product-stock">{product.stock} left</span>
              </div>
              <div className="product-footer">
                <span className="product-price">Rp {product.price.toLocaleString('id-ID')}</span>
                <button onClick={() => addToCart(product)} className="add-to-cart-btn">
                  <ShoppingCart size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
