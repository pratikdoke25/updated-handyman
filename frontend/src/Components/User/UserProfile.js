// UserProfile.js (previously App.js)
import React, { useState } from 'react';
import UserFormPage from './UserFormPage';  // Correct import

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  // Define onUpdate to handle the data received from UserFormPage
  const handleUpdate = (formData) => {
    console.log('Updated form data:', formData);
    setUserData(formData);  // Store the updated form data
  };

  return (
    <div>
      <h1>User Profile</h1>
      {/* Pass the onUpdate function as a prop */}
      <UserFormPage onUpdate={handleUpdate} />

      {/* Display updated user data */}
      {userData && (
        <div>
          <h2>Updated Information:</h2>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Role: {userData.role}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
