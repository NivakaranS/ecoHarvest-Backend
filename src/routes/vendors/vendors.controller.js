const Vendor = require('../../models/vendors.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const registerVendor = async (req, res) => {
    try {
        const { firstName, lastName, businessName, phoneNumber, email, password, businessCategory } = req.body;

        if (!firstName || !lastName || !businessName || !phoneNumber || !email || !password || !businessCategory ) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingVendor = await Vendor.findOne({ email });
        if (existingVendor) {
            return res.status(400).json({ message: 'Vendor with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newVendor = new Vendor ({
            firstName,
            lastName,
            businessName,
            phoneNumber,
            email,
            password: hashedPassword,
            businessCategory
        });

        await newVendor.save();

        res.status(201).json({ message: 'Vendor registered successfully!', vendor: newVendor });
    } catch (error) {
        console.error('Error registering vendor:', error);
        res.status(500).json({ message: 'Error registering vendor', error });
    }
};


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

const updateVendor = async (req, res) => {
    try {
        const vendorId = req.user.id; 
        if (vendorId !== req.params.id) {
            return res.status(403).json({ message: 'You are not authorized to update this profile' });
        }

        const updatedVendor = await Vendor.findByIdAndUpdate(req.params.id, {...req.body, updatedAt: Date.now()}, { new: true });
        if (!updatedVendor) return res.status(404).json({ message: 'Vendor not found' });

        res.status(200).json({ message: 'Vendor updated successfully!', vendor: updatedVendor });
    } catch (error) {
        console.error('Error updating vendor:', error);
        res.status(500).json({ message: 'Error updating vendor', error });
    }
};

const deleteVendor = async (req, res) => {
    try {
        const vendorId = req.user.id; 
        if (vendorId !== req.params.id) {
            return res.status(403).json({ message: 'You are not authorized to delete this profile' });
        }

        const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);
        if (!deletedVendor) return res.status(404).json({ message: 'Vendor not found' });

        res.status(200).json({ message: 'Vendor deleted successfully!' });
    } catch (error) {
        console.error('Error deleting vendor:', error);
        res.status(500).json({ message: 'Error deleting vendor', error });
    }
};

const loginVendor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const vendor = await Vendor.findOne({ email });

        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }

        const isMatch = await bcrypt.compare(password, vendor.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: vendor._id, role: 'vendor' }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 3600000  // 1 hour
        });

        return res.status(200).json({ message: 'Login successful', role: 'vendor' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error during login' });
    }
};


module.exports = { registerVendor, getVendorById, updateVendor, deleteVendor, loginVendor };