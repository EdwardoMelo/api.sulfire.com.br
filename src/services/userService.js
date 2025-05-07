const prisma = require('../prisma/client');

class UserService {
  static async createUser(data) {
    const { nome, email, senha, tipo_usuario_id } = data;
    return await prisma.usuarios.create({
      data: {
        nome,
        email,
        senha,
        tipo_usuario_id,
      },
    });
  }

  static async getAllUsers() {
    return await prisma.usuarios.findMany({
      include: {
        tipos_usuarios: true,
      },
    });
  }

  static async getUserById(id) {
    return await prisma.usuarios.findUnique({
      where: { id },
      include: {
        tipos_usuarios: true,
      },
    });
  }

  static async updateUser(id, data) {
    console.log("updateUser service");
    const { nome, email, senha, tipo_usuario_id } = data;
    try {
      const user = await prisma.usuarios.update({
        where: { id },
        data: {
          nome,
          email,
          senha,
          tipo_usuario_id,
        },
      });
      return user;
    } catch (e) {
      return null;
    }
  }

  static async deleteUser(id) {
    try {
      const user = await prisma.usuarios.delete({
        where: { id },
      });
      return user;
    } catch (e) {
      return null;
    }
  }
}

module.exports = UserService;