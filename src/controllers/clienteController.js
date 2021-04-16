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
    //pegando todos os usuarios do banco
    const cliente = await Cliente.find({});

    return res.send({ cliente });
  } catch (err) {
    return res.status(400).send({ message: "Search failed", error: err });
  }
});

router.put("/register/:id", async (req, res) => {
  const { id } = req.params.id;
  return Cliente.updateOne({ id: id }, req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.delete("/register/:id", async (req, res) => {
  const { id } = req.params.id;
  return Cliente.deleteOne({ id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

module.exports = (app) => app.use("/cliente", router);
