// In your User model file (e.g., User.js)
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  role: { type: String, default: 'user' },
  status: { type: String, default: 'active' }, // Add this field
});

const User = mongoose.model('User', userSchema);
module.exports = User;
