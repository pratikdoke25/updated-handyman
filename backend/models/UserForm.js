// models/UserForm.js
const mongoose = require('mongoose');

const UserFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['painter', 'electrician'], // Add more options if needed
    required: true,
  },
  query: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'Pending', // Default value for status
  },
  role: { type: String, required: false }, // Make role optional
});


module.exports = mongoose.model('UserForm', UserFormSchema);
