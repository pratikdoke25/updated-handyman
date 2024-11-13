import React from 'react';
import './UserRequests.css'; // Import a separate CSS file for requests page styling

const UserRequests = () => {
  // Placeholder data for requests
  const requests = [
    'Request 1',
    'Request 2',
    'Request 3',
    // You can replace this with actual dynamic data
  ];

  return (
    <div className="user-requests-page">
      <h2>Your Requests</h2>
      <ul>
        {requests.map((request, index) => (
          <li key={index}>{request}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserRequests;
