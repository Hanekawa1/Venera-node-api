"use strict";

const Data = require("../schemas/dataSchema");
const azureUtil = require("../utils/azure.util.js");
const returnUtil = require("../utils/return.util.js");

const index = async (req, res) => {
  try {
    const id = req.query.id;

    const result = await Data.findOne({ _id: id }, async function (err, result) {
      if(err) { return; }
      
      return result;
    });

    //console.log(result.comments[0].content)
  
    const documents = azureUtil.buildRequest(result.comments);
    const analysedData = await azureUtil.makeRequest(documents);

    const analysis = returnUtil.buildAnalysisObject(
      result,
      documents,
      analysedData
    );

    result.analysis = analysis;

    await Data.updateOne({ _id: id }, { analysis: analysis });

    res.status(200).json({ message: "OK!" });
  } catch(error) {
    res.status(500).json({ error: "Erro: " +error }); 
  }
};

module.exports = {
  index,
};
