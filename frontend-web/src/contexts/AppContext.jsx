import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../utils/data';
import { initAnalytics, trackEvent } from '../utils/analytics';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1) || '/');

  useEffect(() => {
    initAnalytics();
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
    
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));

    const handleHashChange = () => {
      setCurrentPath(window.location.hash.slice(1) || '/');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const navigate = (path) => {
    window.location.hash = path;
  };

  const login = (email, password) => {
    const userData = { email, name: email.split('@')[0], id: Date.now() };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    trackEvent('User', 'login', email);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    trackEvent('User', 'logout', user?.email);
  };

  const addToCart = (product, quantity = 1) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
    trackEvent('Cart', 'add_to_cart', product.name);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
    trackEvent('Cart', 'remove_from_cart', productId);
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addProduct = (product) => {
    const newProduct = { ...product, id: Date.now() };
    setProducts([...products, newProduct]);
    trackEvent('Product', 'create', product.name);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
    trackEvent('Product', 'update', updatedProduct.name);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
    trackEvent('Product', 'delete', id);
  };

  const value = {
    user, login, logout,
    products, addProduct, updateProduct, deleteProduct,
    cart, addToCart, removeFromCart, updateCartQuantity,
    favorites, toggleFavorite,
    isMenuOpen, setIsMenuOpen,
    searchQuery, setSearchQuery,
    currentPath, navigate
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
