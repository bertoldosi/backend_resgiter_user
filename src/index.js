const express = require("express");
const bodyParser = require("body-parser");

const host = "0.0.0.0";
const port = process.env.PORT || 3333;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./controllers/authController")(app);

app.listen(port, host, function () {
  console.log("Server started.......");
});
