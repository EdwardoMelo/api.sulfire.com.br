const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

// Route to get all categories
router.get('/', categoryController.getAllCategories);

// Route to get a category by ID
router.get('/:id', categoryController.getCategoryById);

// Route to create a new category
router.post('/', categoryController.createCategory);

// Route to update a category by ID
router.put('/:id', categoryController.updateCategory);

// Route to delete a category by ID
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;