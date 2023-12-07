const express = require("express");
const fs = require("fs");
const path = require("path");

const util = require("./util");
const requestResources = express.Router();

const { getJson, sendAnswer } = util;

requestResources.get("/api_frontend/requests/list", (req, res) => {
  const json = getJson("list", "request-resources");
  sendAnswer(res, json);
});

requestResources.get("/api_frontend/workloads", (req, res) => {
  const json = getJson(`gant${req.query.id}`, "request-resources");
  sendAnswer(res, json);
});

requestResources.get("/api_frontend/workload/list", (req, res) => {
  const json = getJson("workload-list", "request-resources");
  sendAnswer(res, json);
});

module.exports = requestResources;
