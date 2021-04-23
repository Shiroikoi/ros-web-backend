const express = require("express");

const app = express();
const port = 3000;
app.use(express.json());

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "ROSADMIN123",
  database: "ROS",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as threadId " + connection.threadId);
});

connection.query("select * from account", function (error, results, fields) {
  if (error) throw error;
  let i = 1;
  for (x in results) {
    connection.query(
      `update account SET token="${Math.random()}" where id=${i} `,
      function (error, results, fields) {
        if (error) throw error;
      }
    );
    i++;
  }
});

connection.query("select * from account", function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});

app.post("/auth", (req, res) => {
  res.append("Access-Control-Allow-Origin", "*");
  res.append(
    "Access-Control-Expose-Headers",
    "Content-Type,ROS-Token,ROS-UserID,ROS-Name,ROS-Email"
  );
  let email = req.body.email;
  connection.query(
    `select * from account where email = "${req.body.email}"`,
    function (error, result, fields) {
      let results = result;
      if (error) throw error;

      if (results == false) {
        res.status(401).json({ state: -1 }).end();
      } else if (req.body.password != results[0].password) {
        res.status(401).json({ state: -2 }).end();
      } else {
        res.append("ROS-UserID", results[0].id);
        res.append("ROS-Token", results[0].token);
        res.append("ROS-Name", results[0].name);
        res.append("ROS-Email", results[0].email);
        res.status(200).end();
      }
    }
  );
});

app.get("/auth", (req, res) => {
  res.append("Access-Control-Allow-Origin", "*");
  res.append(
    "Access-Control-Expose-Headers",
    "Content-Type,ROS-Token,ROS-UserID"
  );
  connection.query(
    `select * from account where token = "${req.get("ROS-Token")}"`,
    function (error, result, fields) {
      let results = result;
      if (error) throw error;

      if (results == false) {
        res.status(401).json({ state: 0 }).end();
      } else {
        console.log("OK");
        res.append("ROS-UserID", results[0].id);
        res.status(200).end();
      }
    }
  );
});

app.options("/auth", (req, res) => {
  res.append("Access-Control-Allow-Origin", "*");
  res.append("Access-Control-Allow-Methods", "POST,GET");
  res.append(
    "Access-Control-Allow-Headers",
    "Content-Type,ROS-Token,ROS-UserID"
  );
  res.append(
    "Access-Control-Expose-Headers",
    "Content-Type,ROS-Token,ROS-UserID"
  );
  res.status(200).end();
});
app.listen(port, "100.2.43.221", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
