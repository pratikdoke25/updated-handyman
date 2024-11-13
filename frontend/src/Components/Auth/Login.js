import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const { user } = await response.json();
  
        // Check if the user is blocked
        if (user.status === 'blocked') {
          alert('Your account is blocked. Please contact the admin for assistance.');
          return;
        }
  
        // Store user info in local storage
        localStorage.setItem('userId', user.id); // Save userId to localStorage
        localStorage.setItem('userEmail', user.email); // Save userEmail to localStorage
        localStorage.setItem('user', JSON.stringify(user)); // Save full user data
  
        console.log('Login successful:', user);
  
        // Redirect to the user dashboard after successful login
        navigate('/user-dashboard');
      } else {
        console.error('Login failed');
        alert('Login failed, please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login.');
    }
  };
  

  return (
    <div className="min-height-screen bg-gradient">
      <div className="login-container">
        <h1
          style={{
            fontSize: '1.875rem',
            fontWeight: '700',
            background: 'linear-gradient(to right, #2563eb, #4f46e5)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          User Login
        </h1>

        <p style={{ color: '#a0aec0' }}>
          Welcome back! Please enter your credentials
        </p>

        <form onSubmit={handleLogin}>
          <div className="form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
            <div className="password-container">
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                required
              />
              <span
                className="password-toggle"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button type="submit" className="submit-button">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
