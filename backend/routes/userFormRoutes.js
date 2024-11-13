// routes/userFormRoutes.js

const express = require('express');
const router = express.Router();
const {
  createUserForm,
  getAllForms,
  getFormsByHandyman,
  updateFormStatus,
  getFormsByEmail
} = require('../controllers/userFormController');

// POST request to create a new form entry
router.post('/form', createUserForm);

// GET request to retrieve all form entries with optional role filter
router.get('/forms', getAllForms);

// GET request to retrieve a form by ID
router.put('/forms/:id/status',updateFormStatus);
// GET request to retrieve forms by handyman type
router.get('/forms/:handyman', getFormsByHandyman);
router.get('/forms/email/:email', getFormsByEmail);
module.exports = router;
