"use strict";

const { mockApi } = require("../config/api");

const makeRequest = async () => {
  let data;
  await mockApi
    .get("/mock")
    .then((result) => {
      data = result.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};

module.exports = {
  makeRequest,
};
