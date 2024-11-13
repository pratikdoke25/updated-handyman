import React, { useEffect, useState } from 'react';
import UserFormPage from './UserFormPage'; // Corrected import
import './UserDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEdit, faList, faEnvelope, faPhone, faLock, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userForms, setUserForms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const email = localStorage.getItem('userEmail');

    if (userId && email) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/users/${userId}`);
          if (response.ok) {
            const userData = await response.json();
            setUser(userData.data);
            setLoading(false);
          } else {
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
        }
      };

      const fetchUserForms = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/forms/email/${email}`);
          if (response.ok) {
            const formsData = await response.json();
            setUserForms(formsData);
          }
        } catch (error) {
          setError('Error fetching user forms');
        }
      };

      fetchUserData();
      fetchUserForms();
    } else {
      setLoading(false);
      setError('User ID or email not found in local storage');
    }
  }, []);

  const handleUserUpdate = (updatedInfo) => {
    const updatedUser = { ...user, ...updatedInfo };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  if (loading) {
    return <p>Loading user information...</p>;
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
          {user.role && <p><FontAwesomeIcon icon={faList} /> Role: {user.role}</p>}
        </div>
      </div>

      <div className="user-forms">
        <h3>Submitted Forms <FontAwesomeIcon icon={faEdit} /></h3>
        {userForms.length > 0 ? (
          <ul>
            {userForms.map((form) => (
              <li key={form._id} className="form-item">
                <p><strong>Query:</strong> {form.query}</p>
                <p><strong>Submitted At:</strong> {new Date(form.submittedAt).toLocaleString()}</p>
                <p><strong>Status:</strong> {form.status}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No forms submitted yet.</p>
        )}
      </div>

      <UserFormPage user={user} onUpdate={handleUserUpdate} />
    </div>
  );
};

export default UserDashboard;
