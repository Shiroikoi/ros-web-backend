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

connection.query("select * from account where email = '1'", function (error, results, fields) {
  if (error) throw error;
  console.log("The solution is: ", results);
});

connection.end();
