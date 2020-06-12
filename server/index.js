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
  connection.query("SELECT * FROM cows", function (error, results) {
    callback(error, results);
  });
};

var create = (data, callback) => {
  connection.query(
    `INSERT INTO cows(name, description) VALUES ("${data.name}", "${data.description}")`,
    function (error, results) {
      callback(error, results);
    }
  );
};

var update = (data, callback) => {
  connection.query(
    `UPDATE cows SET name="${data.name}" WHERE id=${data.id}`,
    function (error, results) {
      callback(error, results);
    }
  );
};

var remove = (data, callback) => {
  connection.query(`DELETE FROM cows WHERE id=${data.id}`, function (
    error,
    results
  ) {
    callback(error, results);
  });
};

app.get("/api/cows", (req, res) => {
  readAll(function (error, results) {
    if (error) {
      res.status(404).json(error);
    } else {
      res.status(200).json(results);
    }
  });
});

app.post("/api/cows", (req, res) => {
  create(req.body, function (error, results) {
    if (error) {
      res.status(404).json(error);
    } else {
      res.status(201).send("Successfully added!");
    }
  });
});

app.put("/api/cows:id", (req, res) => {
  update(req.body, function (error, cow) {
    if (error) {
      res.status(404).json(error);
    } else {
      res.status(200).send(cow);
    }
  });
});

app.delete("/api/cows:id", (req, res) => {
  remove(req.body, function (error, result) {
    if (error) {
      res.status(404).json(error);
    } else {
      res.status(200).send();
    }
  });
});
