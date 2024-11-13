const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const VendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Electrician', 'Painter', 'Worker', 'Salesman'],
        required: true
    },
    status: {
        type: String,
        default: 'active', // Vendor's initial status is active
        enum: ['active', 'blocked']
    }
});

// Password hashing before saving to DB
VendorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Password comparison for login
VendorSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const Vendor = mongoose.model('Vendor', VendorSchema);
module.exports = Vendor;
