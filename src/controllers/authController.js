const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { email } = req.body;

  try {
    //retornando erro de usuario ja com email cadastrado
    if (await User.findOne({ email }))
      return res.status(400).send({ error: "User already exists" });

    //criando usuario
    const user = await User.create(req.body);

    //Removendo password para não ser incluido no response
    user.password = undefined;

    return res.send({ user });
  } catch (err) {
    return res
      .status(400)
      .send({ message: "Resgistration failed", error: err });
  }
});

router.get("/register", async (req, res) => {
  try {
    //pegando todos os usuarios do banco
    const user = await User.find({});

    return res.send({ user });
  } catch (err) {
    return res.status(400).send({ message: "Search failed", error: err });
  }
});

router.put("/register/:id", async (req, res) => {
  const { id } = req.params.id;
  return User.updateOne({ _id: id }, req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

module.exports = (app) => app.use("/auth", router);
