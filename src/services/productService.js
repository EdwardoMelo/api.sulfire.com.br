const prisma = require("../prisma/client");

class ProductService {
  static async createProduct(data) {
    console.log("createProduct service");
    const { nome, descricao, preco, marca, imagem, estoque, categoria_id } =
      data;
    return await prisma.produtos.create({
      data: {
        nome,
        descricao,
        preco,
        marca,
        imagem,
        estoque,
        categoria_id,
      },
    });
  }

  static async getAllProducts() {
    return prisma.produtos.findMany({
      include: {
        categorias: true,
      },
    });
  }

  static async getProductById(id) {
    return prisma.produtos.findUnique({
      where: { id },
      include: {
        categorias: true,
      },
    });
  }

  static async updateProduct(id, data) {
    const { nome, descricao, preco, marca, imagem, estoque, categoria_id } =
      data;
    try {
      const user = await prisma.produtos.update({
        where: { id },
        data: {
          nome,
          descricao,
          preco,
          marca,
          imagem,
          estoque,
          categoria_id,
        },
      });
      return user;
    } catch (e) {
      return null;
    }
  }

  static async deleteProduct(id) {
    try {
      const product = await prisma.produtos.delete({
        where: { id },
      });
      return product;
    } catch (e) {
      return null;
    }
  }
}

module.exports = ProductService;
