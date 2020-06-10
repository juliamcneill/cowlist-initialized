const express = require("express");
const app = express();
const port = 3000;

var morgan = require("morgan");
var parser = require("body-parser");

app.use(morgan("dev"));
app.use(parser.json());
app.use(express.static("./client/dist"));

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
