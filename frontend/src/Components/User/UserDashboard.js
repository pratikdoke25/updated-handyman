import React, { useEffect, useState } from 'react';
import UserFormPage from './UserFormPage'; // Corrected import
import './UserDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEdit, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Get userId from localStorage
    const email = localStorage.getItem('userEmail'); // Get email from localStorage
    
    // Check if userId and email exist in localStorage
    if (!userId || !email) {
      setLoading(false);
      setError('User ID or email not found in local storage');
      return;
    }

    // Fetch user data using userId
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${userId}`);
        if (response.ok) {
          const userData = await response.json();
          if (userData.data) {
            setUser(userData.data); // Store the fetched user data
            localStorage.setItem('user', JSON.stringify(userData.data)); // Update localStorage with user data
          } else {
            setError('User data not found');
          }
        } else {
          setError('Error fetching user data');
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError('Error fetching user data');
      }
    };

    fetchUserData(); // Fetch user data
  }, []); // This will run once on mount

  const handleUserUpdate = (updatedInfo) => {
    const updatedUser = { ...user, ...updatedInfo };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser)); // Update user data in localStorage
  };

  if (loading) {
    return <p>Loading user information...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>User data not found.</p>;
  }

  return (
    <div className="user-dashboard">
      <h2>Welcome, <FontAwesomeIcon icon={faUser} /> {user.name || 'User'}</h2>

      <div className="user-profile">
        <div className="profile-icon">
          <FontAwesomeIcon icon={faUser} />
        </div>
        <div className="user-info">
          <h3>{user.name || 'User Name Not Available'}</h3>
          <p><FontAwesomeIcon icon={faEnvelope} /> Email: {user.email || 'Email Not Available'}</p>
          <p><FontAwesomeIcon icon={faPhone} /> Mobile: {user.mobile || 'Phone Number Not Available'}</p>
        </div>
      </div>

      <UserFormPage user={user} onUpdate={handleUserUpdate} />
    </div>
  );
};

export default UserDashboard;
