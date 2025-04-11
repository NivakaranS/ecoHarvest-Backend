const Vendor = require('../../models/vendors.mongo');
const User = require('../../models/users.mongo');
const bcrypt = require('bcryptjs');


const getVendorById = async (req, res) => {
    try {
        
        const user = await User.findById(req.params.id);
        const vendor = await Vendor.findById(user.entityId);
        if (!vendor) return res.status(404).json({ message: 'Vendor not found' });

        res.status(200).json(vendor);
    } catch (error) {
        console.error('Error fetching vendor:', error);
        res.status(500).json({ message: 'Error fetching vendor', error });
    }
};

const updateVendor = async (req, res) => {
    try {
        
        const user = await User.findById(req.params.id);
        const userId = user.entityId;
        const vendorId =await Vendor.findById(user.entityId);
        console.log(userId,vendorId);
        // if (vendorId !== user.entityId) {
        //     return res.status(403).json({ message: 'You are not authorized to update this profile' });
        // }

        const updatedVendor = await Vendor.findByIdAndUpdate(vendorId, {...req.body, updatedAt: Date.now()}, { new: true });
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
            maxAge: 3600000 
        });

        return res.status(200).json({ message: 'Login successful', role: 'vendor' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error during login' });
    }
};


module.exports = {  getVendorById, updateVendor, deleteVendor };