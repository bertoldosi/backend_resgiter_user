const mongoose = require("../database");

const ClienteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  sobrenome: {
    type: String,
    required: true,
  },

  age: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },

  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Cliente = mongoose.model("Cliente", ClienteSchema);

module.exports = Cliente;
