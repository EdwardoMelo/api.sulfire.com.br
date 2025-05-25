const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (usuario) => {
  const token = signToken(usuario.id);
  return {usuario, token}
};

module.exports = { signToken, createSendToken };