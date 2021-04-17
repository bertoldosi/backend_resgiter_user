const { json } = require("body-parser");
const express = require("express");
const Cliente = require("../models/Cliente");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { email } = req.body;

  try {
    if (await Cliente.findOne({ email }))
      return res
        .status(400)
        .send({ error: "Cliente com esse email já está em uso" });

    const cliente = await Cliente.create(req.body);

    return res.send({ cliente });
  } catch (err) {
    return res
      .status(400)
      .send({ message: "Resgistration failed", error: err });
  }
});

router.get("/register", async (req, res) => {
  try {
    const cliente = await Cliente.find({});

    return res.send({ cliente });
  } catch (err) {
    return res.status(400).send({ message: "Search failed", error: err });
  }
});

router.put("/register/:id", async (req, res) => {
  const { nome, sobrenome, email, idade } = req.body;
  try {
    const cliente = await Cliente.findByIdAndUpdate(
      req.params.id,
      { nome, sobrenome, email, idade },
      {
        new: true, // {new: true} - retornando o cliente atualizado
      }
    );

    return res.send({ cliente });
  } catch (err) {
    return res.status(400).send({ message: "Erro ao atualizar cliente" });
  }
});

router.delete("/register/:id", async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id, {
      delete: true, //retornando usuário excluído
    });

    return res.send({ message: `${cliente.nome} removido` });
  } catch (err) {
    return res.status(400).send({ message: `Erro ao remover ${cliente.nome}` });
  }
});

module.exports = (app) => app.use("/cliente", router);
