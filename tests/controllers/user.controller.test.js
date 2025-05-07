const request = require("supertest");
const app = require("../../src/index"); // Seu app Express
const prisma = require("../setup");

describe("UserController", () => {
  describe("POST /users", () => {
    it("should create a user", async () => {
      // Cria um tipo de usuário antes do teste
      const tipoUsuario = await prisma.tipos_usuarios.create({
        data: { tipo: "cliente" },
      });
      const response = await request(app).post("/users").send({
        nome: "João",
        email: "joao@example.com",
        senha: "123",
        tipo_usuario_id: tipoUsuario.id,
      });
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.nome).toBe("João");
      expect(response.body.email).toBe("joao@example.com");
    });

    it("should return 400 if creation fails", async () => {
      // Cria um tipo de usuário e um usuário para testar violação de unicidade
      const tipoUsuario = await prisma.tipos_usuarios.create({
        data: { tipo: "cliente" },
      });
      await prisma.usuarios.create({
        data: {
          nome: "Maria",
          email: "maria@example.com",
          senha: "456",
          tipo_usuario_id: tipoUsuario.id,
        },
      });

      // Tenta criar outro usuário com o mesmo email
      const response = await request(app).post("/users").send({
        nome: "João",
        email: "maria@example.com", // Email já existe
        senha: "123",
        tipo_usuario_id: tipoUsuario.id,
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain("Unique constraint failed");
    });
  });

  describe("GET /users", () => {
    it("should get all users", async () => {
      const tipoUsuario = await prisma.tipos_usuarios.create({
        data: { tipo: "cliente" },
      });

      await prisma.usuarios.create({
        data: {
          nome: "João",
          email: "joao@example.com",
          senha: "123",
          tipo_usuario_id: tipoUsuario.id,
        },
      });

      const response = await request(app).get("/users");
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].nome).toBe("João");
    });

    it("should return empty array if no users exist", async () => {
      const response = await request(app).get("/users");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe("GET /users/:id", () => {
    it("should get a user by id", async () => {
      const tipoUsuario = await prisma.tipos_usuarios.create({
        data: { tipo: "cliente" },
      });

      const user = await prisma.usuarios.create({
        data: {
          nome: "João",
          email: "joao@example.com",
          senha: "123",
          tipo_usuario_id: tipoUsuario.id,
        },
      });

      const response = await request(app).get(`/users/${user.id}`);
      expect(response.status).toBe(200);
      expect(response.body.nome).toBe("João");
    });

    it("should return 404 if user not found", async () => {
      const response = await request(app).get("/users/999");
      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Usuário não encontrado");
    });
  });

  describe("PUT /users/:id", () => {
    it("should update a user", async () => {
      const tipoUsuario = await prisma.tipos_usuarios.create({
        data: { tipo: "cliente" },
      });
      const user = await prisma.usuarios.create({
        data: {
          nome: "João",
          email: "joao@example.com",
          senha: "123",
          tipo_usuario_id: tipoUsuario.id,
        },
      });
      const response = await request(app).put(`/users/${user.id}`).send({
        nome: "João Silva",
        email: "joao.silva@example.com",
        senha: "456",
        tipo_usuario_id: tipoUsuario.id,
      });

      expect(response.status).toBe(200);
      expect(response.body.nome).toBe("João Silva");
      expect(response.body.email).toBe("joao.silva@example.com");
    });

    it("should return 404 if user not found", async () => {
      const response = await request(app).put("/users/999").send({
        nome: "João Silva",
      });
      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Usuário não encontrado");
    });
  });

  describe("DELETE /users/:id", () => {
    it("should delete a user", async () => {
      const tipoUsuario = await prisma.tipos_usuarios.create({
        data: { tipo: "cliente" },
      });
      const user = await prisma.usuarios.create({
        data: {
          nome: "João",
          email: "joao@example.com",
          senha: "123",
          tipo_usuario_id: tipoUsuario.id,
        },
      });

      const response = await request(app).delete(`/users/${user.id}`);
      expect(response.status).toBe(204);
    });

    it("should return 404 if user not found", async () => {
      const response = await request(app).delete("/users/999");
      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Usuário não encontrado");
    });
  });
});
