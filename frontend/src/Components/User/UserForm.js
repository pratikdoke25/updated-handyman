import React, { useState } from 'react';
import UserFormPage from './UserFormPage'; // Ensure the path is correct

const ParentComponent = () => {
  const [userData, setUserData] = useState(null);

  // This is the onUpdate function that will be passed to UserFormPage
  const handleUpdate = (formData) => {
    console.log('Updated form data:', formData);
    setUserData(formData); // Update state with the form data
  };

  return (
    <div>
      <h1>User Profile</h1>
      {/* Pass handleUpdate as onUpdate prop to UserFormPage */}
      <UserFormPage onUpdate={handleUpdate} /> {/* Ensure this is passed correctly */}

      {/* Display submitted data */}
      {userData && (
        <div>
          <h2>Updated Information:</h2>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Phone: {userData.phone}</p>
          <p>Handyman: {userData.handyman}</p>
          <p>Query: {userData.query}</p>
        </div>
      )}
    </div>
  );
};

export default ParentComponent;
