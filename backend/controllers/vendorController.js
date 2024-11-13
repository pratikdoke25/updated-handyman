const Vendor = require('../models/vendor');
const jwt = require('jsonwebtoken');
// const Request = require('../models/request'); // Import your Request model

// Register Vendor
exports.registerVendor = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const existingVendor = await Vendor.findOne({ email });
        if (existingVendor) {
            return res.status(400).json({ message: 'Vendor already exists' });
        }

        const vendor = new Vendor({ name, email, password, role });
        await vendor.save();
        res.status(201).json({ message: 'Vendor registered successfully' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Server error' });
    }
};

// Login Vendor
exports.loginVendor = async (req, res) => {
    const { email, password } = req.body;
    try {
        const vendor = await Vendor.findOne({ email });
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }

        if (vendor.status === 'blocked') {
            return res.status(403).json({ message: 'Your account is blocked. Please contact admin.' });
        }

        const isMatch = await vendor.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Include role in the token payload
        const token = jwt.sign({ vendorId: vendor._id, role: vendor.role }, 'secretkey', { expiresIn: '1h' });

        // Send back token and vendor details (including role)
        res.status(200).json({
            token,
            vendor: {
                name: vendor.name,
                email: vendor.email,
                role: vendor.role,
            },
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Server error' });
    }
};

// Fetch vendor-specific requests
exports.getVendorRequests = async (req, res) => {
    // Check if req.vendor is defined
    if (!req.vendor) {
        return res.status(401).json({ message: 'Vendor not authenticated' });
    }

    const { role } = req.vendor; // Get vendor's role from the token payload

    try {
        // Fetch requests associated with the vendor's role
        const requests = await Request.find({ handyman: role }); // Adjust based on your schema
        res.status(200).json(requests);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Server error fetching vendor requests' });
    }
};

//get all vendors
// Fetch all vendors
exports.getAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find({}, { password: 0 }); // Exclude password field for security
        res.status(200).json(vendors);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Server error fetching vendors' });
    }
};

// In your vendor controller (e.g., vendorController.js)
exports.toggleVendorStatus = async (req, res) => { 
    const { id } = req.params;
  
    try {
      const vendor = await Vendor.findById(id);
      if (!vendor) {
        return res.status(404).json({ message: 'Vendor not found' });
      }
  
      // Toggle the status
      vendor.status = vendor.status === 'active' ? 'blocked' : 'active';
  
      await vendor.save();
  
      res.status(200).json({
        success: true,
        data: vendor,
        message: `Vendor has been ${vendor.status === 'active' ? 'unblocked' : 'blocked'}.`,
      });
    } catch (error) {
      console.error('Error toggling vendor status:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to toggle vendor status',
        error: error.message,
      });
    }
};

  