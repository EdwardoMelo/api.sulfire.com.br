const express = require('express');
const subCategoryController = require('../controllers/subCategoryController');

const router = express.Router();

// Route to get all subcategories
router.get("/", subCategoryController.getAll);

// Route to get a single subcategory by ID
router.get('/:id', subCategoryController.getById);

// Route to create a new subcategory
router.post('/', subCategoryController.create);

router.post('/categoria/:categoria_id', subCategoryController.createManyByCategoryId)

// Route to update a subcategory by ID
router.put('/:id', subCategoryController.update);

// Route to delete a subcategory by ID
router.delete('/:id', subCategoryController.delete);

module.exports = router;