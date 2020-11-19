require("dotenv").config();

const initDataBase = () => {
  const mongoose = require("mongoose");

  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

  mongoose.Promise = global.Promise;

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Connection ok!");
  });
};
module.exports = {
  initDataBase,
};
