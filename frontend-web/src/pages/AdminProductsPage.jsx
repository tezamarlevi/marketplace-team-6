import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const AdminProductsPage = () => {
  const { user, products, addProduct, updateProduct, deleteProduct, navigate } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    category: 'Electronics',
    rating: 4.5,
    stock: 10,
    description: '',
    features: ''
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: parseInt(formData.price),
      stock: parseInt(formData.stock),
      rating: parseFloat(formData.rating),
      features: formData.features.split(',').map(f => f.trim())
    };

    if (isEditing) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      image: '',
      category: 'Electronics',
      rating: 4.5,
      stock: 10,
      description: '',
      features: ''
    });
    setIsEditing(false);
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsEditing(true);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      image: product.image,
      category: product.category,
      rating: product.rating,
      stock: product.stock,
      description: product.description,
      features: product.features.join(', ')
    });
  };

  return (
    <div className="admin-page">
      <h1 className="page-title">Manage Products</h1>
      
      <div className="admin-container">
        <form className="admin-form" onSubmit={handleSubmit}>
          <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
          
          <input 
            type="text" 
            placeholder="Product Name" 
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          
          <input 
            type="number" 
            placeholder="Price (Rp)" 
            required
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
          />
          
          <input 
            type="url" 
            placeholder="Image URL" 
            required
            value={formData.image}
            onChange={(e) => setFormData({...formData, image: e.target.value})}
          />
          
          <select 
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          >
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
          </select>
          
          <input 
            type="number" 
            placeholder="Stock" 
            required
            step="1"
            value={formData.stock}
            onChange={(e) => setFormData({...formData, stock: e.target.value})}
          />
          
          <input 
            type="number" 
            placeholder="Rating (1-5)" 
            required
            step="0.1"
            min="1"
            max="5"
            value={formData.rating}
            onChange={(e) => setFormData({...formData, rating: e.target.value})}
          />
          
          <textarea 
            placeholder="Description" 
            required
            rows="3"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
          
          <input 
            type="text" 
            placeholder="Features (comma separated)" 
            required
            value={formData.features}
            onChange={(e) => setFormData({...formData, features: e.target.value})}
          />
          
          <div className="form-actions">
            <button type="submit" className="submit-btn">
              {isEditing ? 'Update Product' : 'Add Product'}
            </button>
            {isEditing && (
              <button type="button" onClick={resetForm} className="cancel-btn">
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="admin-products-list">
          <h2>All Products</h2>
          {products.map(product => (
            <div key={product.id} className="admin-product-item">
              <img src={product.image} alt={product.name} />
              <div className="admin-product-info">
                <h3>{product.name}</h3>
                <p>Rp {product.price.toLocaleString('id-ID')}</p>
                <span className="admin-category">{product.category}</span>
              </div>
              <div className="admin-product-actions">
                <button onClick={() => handleEdit(product)} className="edit-btn">
                  <Edit size={16} />
                </button>
                <button onClick={() => {
                  if (window.confirm('Delete this product?')) {
                    deleteProduct(product.id);
                  }
                }} className="delete-btn">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProductsPage;
