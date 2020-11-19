"use strict";

const express = require("express");
const router = express.Router();

const healthcheckController = require("../controllers/healthcheck.js");
const getDataController = require("../controllers/getData.js");
const analysisDataController = require("../controllers/analysisData.js");
const getSearchesController = require("../controllers/getSearches.js");
const deleteDataController = require('../controllers/deleteData.js');

router.get("/healthcheck", healthcheckController.index);
router.get("/getData", getDataController.index);
router.get("/analysisData", analysisDataController.index);
router.get("/getSearches", getSearchesController.index);
router.get("/getTopSearches", getSearchesController.getTopSearches);
router.get("/getByID", getSearchesController.getByID);
router.delete("/deleteSearch", deleteDataController.index);

module.exports = router;
