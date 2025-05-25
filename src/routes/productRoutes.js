const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");

router.post("/", ProductController.createProduct);
router.get("/", ProductController.getAllProducts);
router.get("/categoria/:categoria_id", ProductController.getProductsByCategory);
router.get("/:id", ProductController.getProductById);
router.put("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

module.exports = router;
