const Vendor = require('../../models/vendors.model');
const bcrypt = require('bcrypt');

//Login 
const loginVendor = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the vendor exists
        const vendor = await Vendor.findOne({ email });
        if (!vendor) return res.status(404).json({ message: 'Vendor not found' });

        // Compare passwords
        const isMatch = await bcrypt.compare(password, vendor.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        // Save last login time
        vendor.lastLogin = new Date();
        await vendor.save();

        // Set up session
        req.session.vendorId = vendor._id;
        req.session.role = vendor.role;

        res.status(200).json({ message: 'Login successful', redirect: '/vendor/dashboard' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};


const registerVendor = async (req, res) => {
    try {
        const { firstName, lastName, businessName, phoneNumber, email, password, category } = req.body;

        // Basic validation check
        if (!firstName || !lastName || !businessName || !phoneNumber || !email || !password || !category) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingVendor = await Vendor.findOne({ email });
        if (existingVendor) {
            return res.status(400).json({ message: 'Vendor with this email already exists' });
        }

        const newVendor = new Vendor(req.body);
        await newVendor.save();

        res.status(201).json({ message: 'Vendor registered successfully!', vendor: newVendor });
    } catch (error) {
        console.error('Error registering vendor:', error);
        res.status(500).json({ message: 'Error registering vendor', error });
    }
};


// Get vendor by ID
const getVendorById = async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id);
        if (!vendor) return res.status(404).json({ message: 'Vendor not found' });

        res.status(200).json(vendor);
    } catch (error) {
        console.error('Error fetching vendor:', error);
        res.status(500).json({ message: 'Error fetching vendor', error });
    }
};

// Update vendor details
const updateVendor = async (req, res) => {
    try {
        const updatedVendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedVendor) return res.status(404).json({ message: 'Vendor not found' });

        res.status(200).json({ message: 'Vendor updated successfully!', vendor: updatedVendor });
    } catch (error) {
        console.error('Error updating vendor:', error);
        res.status(500).json({ message: 'Error updating vendor', error });
    }
};

// Delete vendor
const deleteVendor = async (req, res) => {
    try {
        const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);
        if (!deletedVendor) return res.status(404).json({ message: 'Vendor not found' });

        res.status(200).json({ message: 'Vendor deleted successfully!' });
    } catch (error) {
        console.error('Error deleting vendor:', error);
        res.status(500).json({ message: 'Error deleting vendor', error });
    }
};


module.exports = { registerVendor, getVendorById, updateVendor, deleteVendor, loginVendor };