"use strict";

const { api } = require("../config/api.js");

const index = async (req, res) => {
  await api
    .get("/healthcheck")
    .then((result) => {
      if (result.status != 200) {
        return res.json({ message: "Python API error!" + result.status });
      } else {
        return res.json({ message: "Healthcheck ok!" });
      }
    })
    .catch((err) => {
      return res.json({ message: "Python API error! " + err });
    });
};

module.exports = {
  index,
};
