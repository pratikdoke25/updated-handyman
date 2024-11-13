import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Hard-coded credentials
  const hardCodedUsername = 'admin@gmail.com';
  const hardCodedPassword = '12345678';

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === hardCodedUsername && password === hardCodedPassword) {
      localStorage.setItem('adminToken', 'your_admin_token');
      setIsLoggedIn(true);  // This should work as it's passed from the parent
      navigate('/admin-dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-height-screen">
      <div className="login-container">
        <h1 className="title gradient-text">Admin Login</h1>
        <form onSubmit={handleLogin} className="form">
          <div>
            <label className="label">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
              required
            />
          </div>
          <div className="password-container">
            <label className="label">Password:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </span>
          </div>
          <button type="submit" className="submit-button">Login</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
