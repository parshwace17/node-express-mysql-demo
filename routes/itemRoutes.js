const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const itemController = require('../controllers/itemController');
const authService = require('../services/authService');

// Authenticate user
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await authService.authenticate(username, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// CRUD operations
router.post('/items', itemController.createItem);
router.get('/items', itemController.getAllItems);
router.get('/items/:id', itemController.getItemById);
router.put('/items/:id', itemController.updateItem);
router.delete('/items/:id', itemController.deleteItem);

module.exports = router;
