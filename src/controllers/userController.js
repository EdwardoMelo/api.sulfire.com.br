const userService = require("../services/userService");

class UserController {
  static async createUser(req, res) {
    try {
      const { nome, email, senha, tipo_usuario_id } = req.body;
      const user = await userService.createUser({
        nome,
        email,
        senha,
        tipo_usuario_id,
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(Number(id));
      if (!user)
        return res.status(404).json({ error: "Usuário não encontrado" });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, senha, tipo_usuario_id } = req.body;
      const user = await userService.updateUser(Number(id), {
        nome,
        email,
        senha,
        tipo_usuario_id,
      });
      if (!user){ 
                return res
                  .status(404)
                  .json({ error: "Usuário não encontrado" });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.deleteUser(Number(id));
      if (!user)
        return res.status(404).json({ error: "Usuário não encontrado" });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;
