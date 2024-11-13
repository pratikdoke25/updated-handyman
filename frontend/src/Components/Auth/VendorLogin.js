import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import './VendorLogin.css'; // Import the plain CSS

const VendorLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [touched, setTouched] = useState({
    email: false,
    password: false
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBlur = (field) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    return errors;
  };

  const vendorLogin = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/vendor-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('vendorToken', data.token);
      localStorage.setItem('vendorRole', data.vendor.role);
      localStorage.setItem('vendorEmail', data.vendor.email);
      localStorage.setItem('vendorName', data.vendor.name);
      
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => {
        navigate(`/vendor-dashboard?role=${data.vendor.role}`);
      }, 1500);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      setError('');
      setSuccess('');
      vendorLogin();
    } else {
      setError('Please correct the errors in the form');
      setTouched({
        email: true,
        password: true
      });
    }
  };

  return (
    <div className="vendor-login-container">
      <div className="vendor-login-card">
        <div className="vendor-login-header">
          <h1>Vendor Login</h1>
          <p>Login to manage your vendor account</p>
        </div>

        {error && (
          <div className="alert alert-error">
            <AlertCircle className="icon" />
            {error}
          </div>
        )}
        {success && (
          <div className="alert alert-success">
            <CheckCircle2 className="icon" />
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="vendor-login-form">
          <div className="form-group">
            <label>Email</label>
            <div className="input-container">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                className={touched.email && !formData.email ? 'input-error' : ''}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-container password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={() => handleBlur('password')}
                className={touched.password && !formData.password ? 'input-error' : ''}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <button
              type="submit"
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="loader" />
                  Please wait...
                </>
              ) : (
                'Login'
              )}
            </button>
          </div>
        </form>
        <div className="floating-shapes">
          <div className="floating-shape shape-1 animate-blob"></div>
          <div className="floating-shape shape-2 animation-delay-2000"></div>
          <div className="floating-shape shape-3 animation-delay-4000"></div>
        </div>
      </div>
    </div>
  );
};

export default VendorLogin;
