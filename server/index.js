const express = require("express");
const app = express();
const port = 3000;

var morgan = require("morgan");
var parser = require("body-parser");

app.use(morgan("dev"));
app.use(parser.json());
app.use(express.static("./client/dist"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cow_list",
});

connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Connected!");
  }
});

var readAll = (callback) => {
  connection.query("SELECT * FROM cows", function (err, results) {
    callback(err, results);
  });
};

var create = (data, callback) => {
  connection.query(
    `INSERT INTO cows(name, description) VALUES ("${data.name}", "${data.description}")`,
    function (err, results) {
      callback(err, results);
    }
  );
};

app.get("/api/cows", (req, res) => {
  readAll(function (err, results) {
    if (err) {
      res.status(404).json(err);
    } else {
      res.status(200).json(results);
    }
  });
});

app.post("/api/cows", (req, res) => {
  create(req.body, function (err, results) {
    if (err) {
      res.status(404).json(err);
    } else {
      res.status(201).send("Successfully added!");
    }
  });
});
