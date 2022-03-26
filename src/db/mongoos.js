const mongoose = require("mongoose");

const localurl = "mongodb://127.0.0.1:27017/task-manger";
const url =
  "mongodb://ahmedd72:devdev2018@cluster0-shard-00-00.rkpkv.mongodb.net:27017,cluster0-shard-00-01.rkpkv.mongodb.net:27017,cluster0-shard-00-02.rkpkv.mongodb.net:27017/task-manger?ssl=true&replicaSet=atlas-uuy6l8-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(url);
