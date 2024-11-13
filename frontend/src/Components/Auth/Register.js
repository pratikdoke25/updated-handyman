import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Assuming you have a Register-specific CSS file

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');  // New state for mobile number

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {  // Updated to full backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, mobile }),  // Include mobile number in the request body
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful!');
        navigate('/user-dashboard');
      } else {
        alert(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-height-screen bg-gradient">
      <div className="login-container">
        <h1 style={{
          fontSize: '1.875rem', // Equivalent to text-3xl in Tailwind
          fontWeight: '700', // Equivalent to font-bold in Tailwind
          background: 'linear-gradient(to right, #2563eb, #4f46e5)', // Gradient from blue-600 to indigo-600
          WebkitBackgroundClip: 'text', // To clip the background gradient to the text
          color: 'transparent' // To make the text color transparent so the gradient is visible
        }}>
          User Register
        </h1>
        <p style={{ color: '#a0aec0' }}>
  Join us as a User
</p>

        <form onSubmit={handleRegister} className="form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
          <input
            type="text"
            placeholder="Mobile Number"  // New input for mobile number
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            className="input"
          />
          <button type="submit" className="submit-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
