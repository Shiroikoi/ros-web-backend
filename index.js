const express = require("express");

const app = express();
const port = 3000;
app.use(express.json());
let token = Math.random();
console.log(token);
let database = { "admin@ros-web.dev": { userID: 1, password: "admin321", token } };
app.post("/auth", (req, res) => {
  res.append("Access-Control-Allow-Origin", "*");
  res.append("Access-Control-Expose-Headers", "Content-Type,ROS-Token,ROS-UserID");
  if (!database[req.body.email]) {
    res.status(401).json({ state: -1 });
  } else if (req.body.password == database[req.body.email].password) {
    res.append("ROS-UserID", database[req.body.email].userID);
    res.append("ROS-Token", database[req.body.email].token);
    res.status(200).end();
  } else if (req.body.password != database[req.body.email].password) {
    res.status(401).json({ state: -1 });
  }

  res.status(200).end();
});

app.get("/auth", (req, res) => {
  res.append("Access-Control-Allow-Origin", "*");
  res.append("Access-Control-Expose-Headers", "Content-Type,ROS-Token,ROS-UserID");

  if (req.get("ROS-Token") == database["admin@ros-web.dev"].token) {
    console.log("OK");
    res.append("ROS-UserID", database["admin@ros-web.dev"].userID);
    res.status(200).end();
  } else {
    res.status(401).json({ state: 0 });
  }
});

app.options("/auth", (req, res) => {
  res.append("Access-Control-Allow-Origin", "*");
  res.append("Access-Control-Allow-Methods", "POST,GET");
  res.append("Access-Control-Allow-Headers", "Content-Type,ROS-Token,ROS-UserID");
  res.append("Access-Control-Expose-Headers", "Content-Type,ROS-Token,ROS-UserID");
  res.status(200).end();
});
app.listen(port,"100.2.43.221", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
