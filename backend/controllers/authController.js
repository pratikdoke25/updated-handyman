const User = require('../models/User'); // Assuming User is your MongoDB model
const jwt = require('jsonwebtoken');    // For creating JWT

// Controller for user login
// Controller for user login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found.' });
    }

    // Check if user is blocked
    if (user.status === 'blocked') {
      return res.status(403).json({ message: 'Your account has been blocked. Please contact support.' });
    }

    // Check if password matches
    if (user.password !== password) {
      return res.status(400).json({ message: 'Incorrect password.' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );

    return res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, mobile: user.mobile },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Controller for user registration
exports.register = async (req, res) => {
  const { name, email, password, mobile, role } = req.body; // Include mobile in the request body

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      password, // Store the password without hashing
      mobile,   // Save mobile number
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Controller to get user profile
exports.getProfile = async (req, res) => {
  const { userId } = req.params; // Assuming user ID is passed as a URL parameter

  try {
    // Retrieve the user by ID
    const user = await User.findById(userId).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile, // Include mobile number in the response
      // Include other fields you want to display
    });
  } catch (error) {
    console.error('Error retrieving user profile:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};


// Controller to toggle user status (block/unblock)
