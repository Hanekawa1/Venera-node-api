"use strict";

const Data = require("../schemas/dataSchema");
const moment = require("moment");
const returnUtil = require("../utils/return.util.js");

const index = async (req, res) => {
  const limitData = moment()
    .subtract(30, "days")
    .format("DD/MM/YYYY")
    .toString();

  await Data.find()
    .sort({ created_at: -1 })
    .skip(3)
    .exec(function (err, result) {
      return res.json(returnUtil.validateReturn(err, result));
    });
};

const getTopSearches = async (req, res) => {
  await Data.find({})
    .sort({ created_at: -1 })
    .limit(3)
    .exec(function (err, result) {
      return res.json(returnUtil.validateReturn(err, result));
    });
};

const getByID = async (req, res) => {
  const id = req.query.id;
  await Data.findOne({ _id: id }).exec(function (err, result) {
    return res.json(returnUtil.validateReturn(err, result));
  });
};

module.exports = {
  index,
  getTopSearches,
  getByID,
};
