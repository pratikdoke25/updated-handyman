const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');

// Register Route
router.post('/vendor-register', vendorController.registerVendor);

// Login Route
router.post('/vendor-login', vendorController.loginVendor);

// Get Vendor-Specific Requests
router.get('/vendor-requests', vendorController.getVendorRequests);

// Route to fetch all vendors
router.get('/vendors', vendorController.getAllVendors);
//toggle admin 
// In your routes file (e.g., vendorRoutes.js)
router.patch('/vendors/:id/status', vendorController.toggleVendorStatus);

module.exports = router;
