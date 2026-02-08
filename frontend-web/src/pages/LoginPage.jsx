import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';

const LoginPage = () => {
  const { login, navigate, user } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (user) {
    navigate('/');
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    navigate('/');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Login to continue shopping</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <input 
            type="email" 
            placeholder="Email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-submit">Login</button>
        </form>
        <p className="login-footer">
          Demo: gunakan email apapun untuk login
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
