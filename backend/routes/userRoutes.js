const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById ,toggleUserStatus} = require('../controllers/userController');

// Route to get all users
router.get('/users', getAllUsers);

// Route to get a user by ID
router.get('/users/:id', getUserById);
router.patch('/users/:id/status', toggleUserStatus);
module.exports = router;
