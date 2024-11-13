import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faWrench, faCheckCircle, faTimesCircle, faClock, faSignOutAlt, faUser, faHome } from '@fortawesome/free-solid-svg-icons';
import './VendorDashboard.css';
import { useNavigate } from 'react-router-dom';

const fetchVendorRequests = async (token, role) => {
  try {
    const response = await fetch(`http://localhost:5000/api/forms?role=${role}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch vendor requests');
    return await response.json();
  } catch (error) {
    console.error('Error fetching vendor requests:', error);
    return null;
  }
};

const updateStatus = async (id, token) => {
  try {
    const response = await fetch(`http://localhost:5000/api/forms/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ status: 'Done' }),
    });
    if (!response.ok) throw new Error('Failed to update request status');
    return await response.json();
  } catch (error) {
    console.error('Error updating request status:', error);
    return null;
  }
};

const VendorDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const vendorRole = localStorage.getItem('vendorRole');
  const vendorToken = localStorage.getItem('vendorToken');
  const vendorEmail = localStorage.getItem('vendorEmail');
  const vendorName = localStorage.getItem('vendorName');
  const urlParams = new URLSearchParams(window.location.search);
  const roleFromURL = urlParams.get('role');

  const handleLogout = () => {
    localStorage.removeItem('vendorToken');
    localStorage.removeItem('vendorRole');
    localStorage.removeItem('vendorEmail');
    localStorage.removeItem('vendorName');
    navigate('/vendor-login');
  };

  useEffect(() => {
    const getRequests = async () => {
      if (vendorToken && roleFromURL) {
        const data = await fetchVendorRequests(vendorToken, roleFromURL);
        if (Array.isArray(data)) setRequests(data);
        else setError('Invalid data format received');
      } else setError('No vendor token or role found');
    };
    getRequests();
  }, [vendorToken, roleFromURL]);

  const handleScrape = () => {
    navigate('/business-lead');  // Corrected the route spelling
  };
  
  const handleStatusChange = async (id) => {
    const updatedRequest = await updateStatus(id, vendorToken);
    if (updatedRequest) {
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === id ? { ...request, status: 'Done' } : request
        )
      );
    }
  };

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="dashboard">
      <h2>Welcome, <FontAwesomeIcon icon={faUser} /> {vendorName}</h2>
      <p><FontAwesomeIcon icon={faEnvelope} /> Email: {vendorEmail}</p>
      <p><FontAwesomeIcon icon={faHome} /> Role: {vendorRole}</p>

      <div className="button-group">
        <button onClick={handleScrape} className="scrape-btn">
          Scrape Data
        </button>
        <button onClick={handleLogout} className="logout-btn">
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </button>
      </div>

      {requests.length === 0 ? (
        <div className="no-requests">No requests available for your role.</div>
      ) : (
        requests.map((request) => (
          <div key={request._id} className="request-card">
            <h3><FontAwesomeIcon icon={faWrench} /> Request Details</h3>
            <p><strong>Name:</strong> {request.name}</p>
            <p><FontAwesomeIcon icon={faEnvelope} /> <strong>Email:</strong> {request.email}</p>
            <p><FontAwesomeIcon icon={faPhone} /> <strong>Phone:</strong> {request.phone}</p>
            <p><strong>Handyman:</strong> {request.handyman}</p>
            <p><strong>Query:</strong> {request.query}</p>
            <p><FontAwesomeIcon icon={faClock} /> <strong>Status:</strong> {request.status}</p>
            <p><strong>Submitted At:</strong> {new Date(request.submittedAt).toLocaleString()}</p>
            {request.status === 'Pending' && (
              <button onClick={() => handleStatusChange(request._id)}>
                <FontAwesomeIcon icon={faCheckCircle} /> Mark as Done
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default VendorDashboard;
