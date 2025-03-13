const Vendor = require('../../models/vendors.model');

// Register a new vendor
exports.registerVendor = async (req, res) => {
    try {
        const newVendor = new Vendor(req.body);
        await newVendor.save();
        res.status(201).json({ message: 'Vendor registered successfully!', vendor: newVendor });
    } catch (error) {
        res.status(500).json({ message: 'Error registering vendor', error });
    }
};

// Get a vendor by ID
exports.getVendorById = async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id);
        if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
        res.status(200).json(vendor);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching vendor', error });
    }
};

// Update vendor details
exports.updateVendor = async (req, res) => {
    try {
        const updatedVendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedVendor) return res.status(404).json({ message: 'Vendor not found' });
        res.status(200).json({ message: 'Vendor updated successfully!', vendor: updatedVendor });
    } catch (error) {
        res.status(500).json({ message: 'Error updating vendor', error });
    }
};

// Delete a vendor
exports.deleteVendor = async (req, res) => {
    try {
        const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);
        if (!deletedVendor) return res.status(404).json({ message: 'Vendor not found' });
        res.status(200).json({ message: 'Vendor deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting vendor', error });
    }
};
