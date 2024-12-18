const Item = require('../models/item');
const logger = require('../utils/logger');

const createItem = async (name, description) => {
  try {
    const item = await Item.create({ name, description });
    logger.info(`Item created: ${name}`);
    return item;
  } catch (error) {
    logger.error('Error creating item: ' + error.message);
    throw error;
  }
};

const getAllItems = async () => {
  try {
    const items = await Item.findAll();
    return items;
  } catch (error) {
    logger.error('Error fetching items: ' + error.message);
    throw error;
  }
};

const getItemById = async (id) => {
  try {
    const item = await Item.findByPk(id);
    if (!item) throw new Error('Item not found');
    return item;
  } catch (error) {
    logger.error('Error fetching item by ID: ' + error.message);
    throw error;
  }
};

const updateItem = async (id, name, description) => {
  try {
    const item = await Item.findByPk(id);
    if (!item) throw new Error('Item not found');
    item.name = name || item.name;
    item.description = description || item.description;
    await item.save();
    return item;
  } catch (error) {
    logger.error('Error updating item: ' + error.message);
    throw error;
  }
};

const deleteItem = async (id) => {
  try {
    const item = await Item.findByPk(id);
    if (!item) throw new Error('Item not found');
    await item.destroy();
  } catch (error) {
    logger.error('Error deleting item: ' + error.message);
    throw error;
  }
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
};
