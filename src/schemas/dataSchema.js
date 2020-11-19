const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let commentsSchema = new Schema({
  source: { type: String, max: 200 },
  content: [String],
});

let DataSchema = new Schema({
  note: { type: String, max: 200 },
  query: { type: String, max: 200 },
  maximum: { type: String, max: 4 },
  comments: [commentsSchema],
  date: Date,
  analysis: Object,
});

module.exports = mongoose.model("Data", DataSchema, "data");
