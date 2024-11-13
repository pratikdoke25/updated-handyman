import React, { useState } from 'react';
import './VendorRegister.css';

const VendorRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const [message, setMessage] = useState(null);

  const { name, email, password, role } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/api/vendor-register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (data.message) {
      setMessage({ type: 'success', text: data.message });
    } else {
      setMessage({ type: 'error', text: 'Registration failed. Please try again.' });
    }
  };

  return (
    <div className="min-height-screen bg-gradient flex items-center justify-center">
      <div className="login-container">
        <h2 className="title text-center gradient-text">Vendor Register</h2>
        <p className="subtitle text-center">Join us as a service provider</p>

        {message && (
          <div className={`${message.type === 'success' ? 'success-message' : 'error-message'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="form">
          <label className="label" htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            className="input"
            placeholder="Enter your name"
            onChange={handleChange}
            required
          />

          <label className="label" htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            className="input"
            placeholder="Enter your email"
            onChange={handleChange}
            required
          />

          <label className="label" htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            className="input"
            placeholder="Create a password"
            onChange={handleChange}
            required
          />

          <label className="label" htmlFor="role">Role</label>
          <select name="role" value={role} className="input" onChange={handleChange} required>
            <option value="" disabled>Select Role</option>
            <option value="Electrician">Electrician</option>
            <option value="Painter">Painter</option>
            <option value="Worker">Worker</option>
            <option value="Salesman">Salesman</option>
          </select>

          <button type="submit" className="submit-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default VendorRegister;
