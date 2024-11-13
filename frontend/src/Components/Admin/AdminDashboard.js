import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faUndo } from '@fortawesome/free-solid-svg-icons';
import './adminDashboard.css';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('users'); // Active tab (users or vendors)

    // Fetch data when the component loads
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch users
                const usersResponse = await fetch('http://localhost:5000/api/users');
                if (!usersResponse.ok) {
                    throw new Error('Failed to fetch users');
                }
                const usersData = await usersResponse.json();
                setUsers(usersData?.data || []); // Ensure data is an array

                // Fetch vendors
                const vendorsResponse = await fetch('http://localhost:5000/api/vendors');
                if (!vendorsResponse.ok) {
                    throw new Error('Failed to fetch vendors');
                }
                const vendorsData = await vendorsResponse.json();
                setVendors(vendorsData || []); // Ensure vendorsData is directly set if it's an array
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Function to toggle block/unblock user status
    const toggleUserStatus = async (id, currentStatus) => {
        const confirmAction = window.confirm(
            currentStatus === 'active' ? 'Are you sure you want to block this user?' : 'Are you sure you want to unblock this user?'
        );
        if (!confirmAction) return;

        try {
            const response = await fetch(`http://localhost:5000/api/users/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error('Failed to update user status');
            }

            const updatedUser = await response.json();
            setUsers(users.map(user => (user._id === updatedUser.data._id ? updatedUser.data : user)));
            alert(`User has been ${updatedUser.data.status === 'active' ? 'unblocked' : 'blocked'} successfully`);
        } catch (err) {
            setError(err.message);
        }
    };

    // Function to toggle block/unblock vendor status
    const toggleVendorStatus = async (id, currentStatus) => {
        const confirmAction = window.confirm(
            currentStatus === 'active' ? 'Are you sure you want to block this vendor?' : 'Are you sure you want to unblock this vendor?'
        );
        if (!confirmAction) return;

        try {
            const response = await fetch(`http://localhost:5000/api/vendors/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error('Failed to update vendor status');
            }

            const updatedVendor = await response.json();
            setVendors(vendors.map(vendor => (vendor._id === updatedVendor.data._id ? updatedVendor.data : vendor)));
            alert(`Vendor has been ${updatedVendor.data.status === 'active' ? 'unblocked' : 'blocked'} successfully`);
        } catch (err) {
            setError(err.message);
        }
    };

    // Loading state
    if (loading) {
        return <p>Loading data...</p>;
    }

    // Error state
    if (error) {
        return <p>Error: {error}</p>;
    }

    // Render the Users or Vendors table based on the active tab
    const renderUsersTable = () => (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {users?.length > 0 ? (
                    users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.status}</td>
                            <td>
                                {user.status === 'active' ? (
                                    <button className="block-button" onClick={() => toggleUserStatus(user._id, user.status)}>
                                        <FontAwesomeIcon icon={faBan} /> Block
                                    </button>
                                ) : (
                                    <button className="unblock-button" onClick={() => toggleUserStatus(user._id, user.status)}>
                                        <FontAwesomeIcon icon={faUndo} /> Unblock
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5">No users found</td>
                    </tr>
                )}
            </tbody>
        </table>
    );

    const renderVendorsTable = () => (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {vendors?.length > 0 ? (
                    vendors.map(vendor => (
                        <tr key={vendor._id}>
                            <td>{vendor.name}</td>
                            <td>{vendor.email}</td>
                            <td>{vendor.role}</td>
                            <td>{vendor.status || 'active'}</td>
                            <td>
                                {vendor.status === 'active' ? (
                                    <button className="block-button" onClick={() => toggleVendorStatus(vendor._id, vendor.status)}>
                                        <FontAwesomeIcon icon={faBan} /> Block
                                    </button>
                                ) : (
                                    <button className="unblock-button" onClick={() => toggleVendorStatus(vendor._id, vendor.status)}>
                                        <FontAwesomeIcon icon={faUndo} /> Unblock
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5">No vendors found</td>
                    </tr>
                )}
            </tbody>
        </table>
    );

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div className="tabs">
                <button onClick={() => setActiveTab('users')}>Users</button>
                <button onClick={() => setActiveTab('vendors')}>Vendors</button>
            </div>

            {activeTab === 'users' && renderUsersTable()}
            {activeTab === 'vendors' && renderVendorsTable()}
        </div>
    );
};

export default AdminDashboard;
