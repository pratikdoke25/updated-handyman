// controllers/userFormController.js

const UserForm = require('../models/UserForm');

// Create a new form entry
exports.createUserForm = async (req, res) => {
  try {
    const { name, email, phone, role, query } = req.body;

    // Create a new form entry for each submission
    const newUserForm = new UserForm({
      name,
      email,
      phone,
      role,
      query,
    });

    // Save to the database
    await newUserForm.save();
    res.status(201).json({ message: 'Form submitted successfully', newUserForm });
  } catch (error) {
    console.error('Error in form submission:', error); // Log the error to the console for debugging
    res.status(400).json({ message: 'Error submitting the form', error: error.message });
  }
};

// Get all form entries with optional role filter
exports.getAllForms = async (req, res) => {
  try {
    const { role } = req.query; // Get role from query parameters

    // Filter forms based on the handyman role if role is provided
    const filter = role ? { handyman: role } : {};
    const forms = await UserForm.find(filter);
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving forms', error });
  }
};

// Get a single form by ID
exports.getFormsByEmail = async (req, res) => {
  try {
    const email = req.params.email;

    // Fetch all forms submitted by the user using email
    const forms = await UserForm.find({ email });

    if (!forms || forms.length === 0) {
      return res.status(404).json({ message: 'No forms found for this email' });
    }

    // Return the found forms as a response
    res.status(200).json(forms);
  } catch (error) {
    console.error('Error retrieving forms:', error);
    res.status(500).json({ message: 'Error retrieving forms', error });
  }
};
// Get forms by handyman type
exports.getFormsByHandyman = async (req, res) => {
  try {
    const handymanType = req.params.handyman;
    const forms = await UserForm.find({ handyman: handymanType });
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving forms', error });
  }
};

exports.updateFormStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // Get the new status from request body

    console.log('Updating form:', { id, status }); // Debug log

    const form = await UserForm.findByIdAndUpdate(id, { status }, { new: true });
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json({ message: 'Form status updated successfully', form });
  } catch (error) {
    console.error('Error updating form status:', error);
    res.status(500).json({ message: 'Error updating form status', error: error.message });
  }
};
