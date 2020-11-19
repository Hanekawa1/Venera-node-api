"use strict";

require("dotenv").config();
const axios = require("axios").default;
const baseUrl = process.env.PYTHON_API;
const azureUrl = process.env.AZURE_API;
const subKey = process.env.OCP;

const api = axios.create({
  baseURL: baseUrl,
});

const mockApi = axios.create({
  baseURL: "http://localhost:3003",
});

const azure = axios.create({
  baseUrl: azureUrl,
  headers: {
    "Ocp-Apim-Subscription-Key": subKey,
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

module.exports = {
  api,
  azure,
  mockApi,
};
