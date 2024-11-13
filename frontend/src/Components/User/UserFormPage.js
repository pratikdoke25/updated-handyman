import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaHammer, FaQuestionCircle } from 'react-icons/fa';

const UserFormPage = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    handyman: '',
    query: '',
    role: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: '',
        handyman: '',
        query: '',
        role: user.role || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Response from server:', data);

      if (response.ok) {
        if (typeof onUpdate === 'function') {
          onUpdate(formData);
        }
        setFormData({
          name: '',
          email: '',
          phone: '',
          handyman: '',
          query: '',
          role: '',
        });
      } else {
        console.error('Error submitting form:', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form-page">
      <h2>User Information Form</h2>
      
      <div className="form-group">
        <label>
          <FaUser /> Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </label>
      </div>

      <div className="form-group">
        <label>
          <FaEnvelope /> Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </label>
      </div>

      <div className="form-group">
        <label>
          <FaPhone /> Phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </label>
      </div>

      <div className="form-group">
        <label>
          <FaHammer /> Handyman:
          <select
            name="handyman"
            value={formData.handyman}
            onChange={handleChange}
            required
          >
            <option value="">Select a handyman</option>
            <option value="painter">Painter</option>
            <option value="electrician">Electrician</option>
            {/* Add more options if needed */}
          </select>
        </label>
      </div>

      <div className="form-group">
        <label>
          <FaQuestionCircle /> Query:
          <textarea
            name="query"
            value={formData.query}
            onChange={handleChange}
            placeholder="Describe your query"
            required
          />
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default UserFormPage;
