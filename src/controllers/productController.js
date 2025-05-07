const ProductService = require("../services/productService");

class ProductController {
  static async createProduct(req, res) {
    try {
      const { nome, descricao, preco, marca, imagem, estoque, categoria_id } =
        req.body;
      const product = await ProductService.createProduct({
        nome,
        descricao,
        preco,
        marca,
        imagem,
        estoque,
        categoria_id,
      });
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllProducts(req, res) {
    try {
      const products = await ProductService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductById(Number(id));
      if (!product)
        return res.status(404).json({ error: "Produto não encontrado" });
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { nome, descricao, preco, marca, imagem, estoque, categoria_id } =
        req.body;
      const product = await ProductService.updateProduct(Number(id), {
        nome,
        descricao,
        preco,
        marca,
        imagem,
        estoque,
        categoria_id,
      });
      if (!product)
        return res.status(404).json({ error: "Produto não encontrado" });
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductService.deleteProduct(Number(id));
      if (!product)
        return res.status(404).json({ error: "Produto não encontrado" });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProductController;
