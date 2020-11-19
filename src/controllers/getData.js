"use strict";

const { api } = require("../config/api.js");

const index = async (req, res) => {
  try {
    const query = req.query.query;
    const maximum = req.query.maximum;
    const note = req.query.note;

    await api
      .get("/crawl", {
        params: {
          query: query,
          maximum: parseInt(maximum),
          note: note,
        },
      })
      .then((result) => {
        if (result.status != 200) {
          return res.json({ message: "Python API error!" + result.status });
        } else {
          return res.json({ message: "Comments gather!", id: result.data });
        }
      })
      .catch((err) => {
        return res.status(500).json({ message: "Erro: " + err });
      });
  } catch(error) {
    res.status(500).json({ error: "Erro: " +error }); 
  }
};

module.exports = {
  index,
};
