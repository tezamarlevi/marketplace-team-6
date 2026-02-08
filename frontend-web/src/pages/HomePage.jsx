import React from 'react';
import { Plus, Star, ArrowRight } from 'lucide-react';
import { Link } from '../components/Router';
import { useApp } from '../contexts/AppContext';

const HomePage = () => {
  const { products, addToCart } = useApp();
  const featured = products.slice(0, 3);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Discover Your
            <span className="hero-highlight">Next Favorite</span>
            Thing
          </h1>
          <p className="hero-subtitle">
            Curated products that blend style, quality, and innovation
          </p>
          <Link to="/products" className="cta-button">
            Explore Collection
            <ArrowRight size={20} />
          </Link>
        </div>
        <div className="hero-decoration">
          <div className="floating-card card-1"></div>
          <div className="floating-card card-2"></div>
          <div className="floating-card card-3"></div>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-header">
          <h2 className="section-title">Featured Products</h2>
          <Link to="/products" className="view-all">View All →</Link>
        </div>
        <div className="featured-grid">
          {featured.map((product, index) => (
            <div key={product.id} className="featured-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="featured-image">
                <img src={product.image} alt={product.name} />
                <div className="featured-overlay">
                  <button onClick={() => addToCart(product)} className="quick-add">
                    <Plus size={20} /> Add to Cart
                  </button>
                </div>
              </div>
              <div className="featured-content">
                <span className="featured-category">{product.category}</span>
                <h3 className="featured-name">{product.name}</h3>
                <div className="featured-footer">
                  <span className="featured-price">Rp {product.price.toLocaleString('id-ID')}</span>
                  <div className="featured-rating">
                    <Star size={14} fill="currentColor" />
                    {product.rating}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="categories-section">
        <h2 className="section-title">Shop by Category</h2>
        <div className="categories-grid">
          <Link to="/products?category=Electronics" className="category-card electronics">
            <h3>Electronics</h3>
            <span>Explore →</span>
          </Link>
          <Link to="/products?category=Fashion" className="category-card fashion">
            <h3>Fashion</h3>
            <span>Explore →</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
