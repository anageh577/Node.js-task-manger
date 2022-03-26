const express = require("express");
const User = require("./models/user");
const Task = require("./models/task");
const app = new express();
const port = process.env.PORT || 3001;
const userRouter = require("./routers/users");
const taskRouter = require("./routers/tasks");
require("./db/mongoos");

const multer = require("multer");
app.use(express.json());


var cors = require("cors");
app.use(cors());
var permitCrossDomainRequests = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if ("OPTIONS" === req.method) {
    res.send(200);
  } else {
    next();
  }
};
app.use(permitCrossDomainRequests);
app.use(userRouter);
app.use(taskRouter);
app.get("/try", (req, res) => {
  res.send({ response: "new mess" });
});
app.get("*", (req, res) => {
  res.send({ error: "No such api" });
});

app.listen(port, () => {
  console.log("run", port);
});
