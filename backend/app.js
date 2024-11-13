const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Import dotenv to load environment variables
const authRoutes = require('./routes/authRoutes');
const userFormRoutes = require('./routes/userFormRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const app = express();
const userRoutes = require('./routes/userRoutes'); // Import user routes

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for frontend (localhost:3000)
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests only from this origin
  methods: ['GET', 'POST', 'PATCH', 'DELETE','PUT'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed headers
}));

// MongoDB connection
const mongoURI = process.env.MONGO_URI;  // Import mongoURI from .env

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', userFormRoutes);
app.use('/api', vendorRoutes);
app.use('/api', userRoutes); // Use the user routes with the '/api' prefix
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
