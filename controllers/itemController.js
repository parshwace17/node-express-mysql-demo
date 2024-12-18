const { validationResult } = require('express-validator');
const itemService = require('../services/itemService');
const logger = require('../utils/logger');

// Create item with validation
const createItem = async (req, res) => {
  // Validate the request input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: errors.array(),
    });
  }

  try {
    const { name, description } = req.body;

    // Create the item using the service
    const item = await itemService.createItem(name, description);

    // Return a standardized response
    res.status(201).json({
      status: 'success',
      message: 'Item created successfully',
      data: item,
    });
  } catch (error) {
    logger.error('Error creating item: ' + error.message);
    res.status(400).json({
      status: 'error',
      message: 'Error creating item',
      errors: error.message,
    });
  }
};

// Get all items
const getAllItems = async (req, res) => {
  try {
    const items = await itemService.getAllItems();
    res.status(200).json({
      status: 'success',
      message: 'Items fetched successfully',
      data: items,
    });
  } catch (error) {
    logger.error('Error fetching items: ' + error.message);
    res.status(400).json({
      status: 'error',
      message: 'Error fetching items',
      errors: error.message,
    });
  }
};

// Get item by ID
const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await itemService.getItemById(id);
    res.status(200).json({
      status: 'success',
      message: 'Item fetched successfully',
      data: item,
    });
  } catch (error) {
    logger.error('Error fetching item by ID: ' + error.message);
    res.status(400).json({
      status: 'error',
      message: 'Error fetching item',
      errors: error.message,
    });
  }
};

// Update item
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const item = await itemService.updateItem(id, name, description);
    res.status(200).json({
      status: 'success',
      message: 'Item updated successfully',
      data: item,
    });
  } catch (error) {
    logger.error('Error updating item: ' + error.message);
    res.status(400).json({
      status: 'error',
      message: 'Error updating item',
      errors: error.message,
    });
  }
};

// Delete item
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    await itemService.deleteItem(id);
    res.status(204).json({
      status: 'success',
      message: 'Item deleted successfully',
      data: null,
    });
  } catch (error) {
    logger.error('Error deleting item: ' + error.message);
    res.status(400).json({
      status: 'error',
      message: 'Error deleting item',
      errors: error.message,
    });
  }
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
};
