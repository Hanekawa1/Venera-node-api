"use strict";

const Data = require("../schemas/dataSchema");

const index = async (req, res) => {
  try {
    const id = req.query.id;

    const result = await Data.deleteOne({ _id: id }, async function(err, result) {
      if(err) { return; }

      return result;
    });

    res.status(200).json({ message: "Pesquisa excluída com sucesso!", data: result });
    
  } catch(error) {
    res.status(500).json({ error: "Erro: " +error }); 
  }
};

module.exports = {
  index,
};