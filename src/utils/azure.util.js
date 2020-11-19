"use strict";

require("dotenv").config();

const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");
const key = process.env.OCP; 
const endpoint = process.env.AZURE_ENDPOINT;

const textAnalyticsClient = new TextAnalyticsClient(endpoint,  new AzureKeyCredential(key));


const buildRequest = (comments) => {
  let allComments = [];

  let x = comments.map((m) => {
    m.content.map((el) => {
      allComments.push(el);
    });
  });

  let documents = [];

  allComments.map((comment, index) => {
    let cleanComment = comment
    .replace(/\n/gi, " ")
    .replace(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i, "[link]");

    let document = {
      language: "pt",
      id: index.toString(),
      text: cleanComment,
    };

    documents.push(document);
  });

  return documents;
};

const makeRequest = async (content) => {
  let documents = [];
  

  for(var x = 0; x < content.length; x += 10)
  {
    var slicedDocuments = content.slice(x, x+10);
    const slicedResult = await textAnalyticsClient.analyzeSentiment(slicedDocuments);
    slicedResult.forEach(element => {
      element.text = content.find((el) => el.id == element.id).text;
      documents.push(element);
    });
  }
  
  const sentimentResult = {
    documents: documents
  };

  return sentimentResult;
};

module.exports = {
  buildRequest,
  makeRequest,
};
