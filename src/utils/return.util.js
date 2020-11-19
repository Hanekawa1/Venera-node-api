"use strict";

const validateReturn = (err, result) => {
  if (err) {
    return { message: err, status: 500 };
  } else if (result == undefined || result == null || result.length == 0) {
    return { message: "No data found", status: 404 };
  } else {
    return result;
  }
};

const buildAnalysisObject = (result, documents, analysedData) => {
  let analysis = {
    totalAverage: 0,
    approvationAverage: 0,
    data: [],
    chartsData: {},
  };

  let sentiment = {
    positive: 0,
    negative: 0,
    neutral: 0,
  };

  let source = {
    twitter: 0,
    facebook: 0,
    instagram: 0,
    google: 0,
  };

  let positiveScore = 0;
  let negativeScore = 0;
  let neutralScore = 0;

  result.comments.map((sources) => {
    if (sources.source === "Twitter") {
      source.twitter += sources.content.length;
    } else if (sources.source === "Facebook") {
      source.facebook += sources.content.length;
    } else if (sources.source === "Instagram") {
      source.instagram += sources.content.length;
    } else if (sources.source === "Google") {
      source.google += sources.content.length;
    }
  });

  analysedData.documents
  .filter((document) => document.confidenceScores != null)
  .map((document) => {
    let data = {};

    data.id = document.id;
    data.comment = documents.find((element) => element.id == document.id).text;
    data.sentiment = document.sentiment;
    data.confidenceScores = document.confidenceScores;
    data.sentences = document.sentences;

    if (data.sentiment === "positive") {
      sentiment.positive += 1;
    } else if (data.sentiment === "negative") {
      sentiment.negative += 1;
    } else if (data.sentiment === "neutral") {
      sentiment.neutral += 1;
    }

    positiveScore += data.confidenceScores != undefined ? data.confidenceScores.positive : 0;
    neutralScore += data.confidenceScores != undefined ? data.confidenceScores.neutral : 0;
    negativeScore += data.confidenceScores != undefined ? data.confidenceScores.negative : 0;

    analysis.data.push(data);
  });

  analysis.approvationAverage = positiveScore / analysis.data.length;
  analysis.totalAverage = Math.max(positiveScore / analysis.data.length, negativeScore / analysis.data.length, neutralScore / analysis.data.length);
  analysis.chartsDataSentiment = buildChartSentimentObject(sentiment);
  analysis.chartsDataSource = buildChartSourceObject(source);

  return analysis;
};

const buildChartSentimentObject = (sentiment) => {
  let chartDataSentiment = {
    labels: ["Positiva", "Negativa", "Neutra"],
    datasets: [
      {
        backgroundColor: ["#4CAF50", "#F44336", "#9A9A9A"],
        data: [sentiment.positive, sentiment.negative, sentiment.neutral],
      },
    ],
  };

  return chartDataSentiment;
};

const buildChartSourceObject = (source) => {
  let chartDataSource = {
    labels: ["Twitter", "Instagram", "Facebook", "Google"],
    datasets: [
      {
        backgroundColor: ["#1DA1F2", "#CE3E96", "#0E8CF1", "#EA4335"],
        data: [
          source.twitter,
          source.instagram,
          source.facebook,
          source.google,
        ],
      },
    ],
  };

  return chartDataSource;
};

module.exports = {
  validateReturn,
  buildAnalysisObject,
};
