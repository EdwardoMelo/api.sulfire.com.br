const CategoryService = require("../services/categoryService");

class CategoryController {
    static async createCategory(req, res) {
        try {
            const { nome, descricao } = req.body;
            console.log('nome, descricao', nome, descricao)
            const category = await CategoryService.createCategory({ nome, descricao });
            res.status(201).json(category);
        } catch (error) {
            console.log('Erro ao criar categoria: ', error.message);
            res.status(400).json({ error: error.message });
        }
    }

    static async getAllCategories(req, res) {
        try {
            const categories = await CategoryService.getAllCategories();
            res.json(categories);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getCategoryById(req, res) {
        try {
            const { id } = req.params;
            const category = await CategoryService.getCategoryById(Number(id));
            if (!category)
                return res.status(404).json({ error: "Categoria não encontrada" });
            res.json(category);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateCategory(req, res) {
        try {
            const { id } = req.params;
            const { nome, descricao } = req.body;
            const category = await CategoryService.updateCategory(Number(id), {
                nome,
                descricao,
            });
            if (!category)
                return res.status(404).json({ error: "Categoria não encontrada" });
            res.json(category);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteCategory(req, res) {
        try {
            const { id } = req.params;
            const category = await CategoryService.deleteCategory(Number(id));
            if (!category)
                return res.status(404).json({ error: "Categoria não encontrada" });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = CategoryController;