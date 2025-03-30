const Inventory = require('../../models/inventory.model'); // Adjust the path based on your file structure

// Create new inventory
exports.createInventory = async (req, res) => {
    try {
        const { 
            productName, 
            category, 
            quantity, 
            vendorName, 
            collectedFertilizerCompany,
            collectedTime, 
            status, 
            dispatchedTime
        } = req.body;

        // Create a new inventory item
        const newInventory = new Inventory({
            productName,
            category,
            quantity,
            vendorName,
            collectedFertilizerCompany,
            collectedTime: collectedTime || Date.now(),  // Default to current time if not provided
            status: status || 'Active',  // Default to 'Active' if not provided
            dispatchedTime
        });

        // Save to the database
        await newInventory.save();

        // Respond with the created inventory
        res.status(201).json({ message: 'Inventory created successfully!', inventory: newInventory });
    } catch (error) {
        // Handle errors and respond with the message
        res.status(500).json({ message: 'Error creating inventory', error: error.message });
    }
};


// Get all inventories
module.exports.getAllInventories = async (req, res) => {
  try {
    const inventories = await Inventory.find();
    res.status(200).json({ inventories });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inventories', error: error.message });
  }
};

// Get a specific inventory by ID
module.exports.getInventoryById = async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id);
    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }
    res.status(200).json({ inventory });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inventory', error: error.message });
  }
};

// Update an inventory
module.exports.updateInventory = async (req, res) => {
  try {
    const updatedInventory = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedInventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }
    res.status(200).json({ message: 'Inventory updated', inventory: updatedInventory });
  } catch (error) {
    res.status(500).json({ message: 'Error updating inventory', error: error.message });
  }
};

// Delete an inventory
module.exports.deleteInventory = async (req, res) => {
  try {
    const deletedInventory = await Inventory.findByIdAndDelete(req.params.id);
    if (!deletedInventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }
    res.status(200).json({ message: 'Inventory deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting inventory', error: error.message });
  }
};

