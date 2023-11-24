const express = require("express");
const fs = require("fs");
const path = require("path");
const util = require("./util");
const bodyParser = require("body-parser");

const { getJson, sendAnswer } = util;
const teamFormationRoutes = express.Router();

teamFormationRoutes.get("/api_frontend/getProjects", (req, res) => {
  const json = getJson(`projects`, "team-formation");
  sendAnswer(res, json);
});

teamFormationRoutes.post(
  "/api_frontend/requests/list",
  bodyParser.json(),
  (req, res) => {
    const projectId = Number(req.body.projectId.split("-")[2]);
    const json = getJson(`projectTeam${projectId + 1}`, "team-formation");
    sendAnswer(res, json);
  }
);

teamFormationRoutes.get("/api_frontend/getEmployees", (req, res) => {
  const json = getJson(`employees`, "team-formation");
  sendAnswer(res, json);
});

teamFormationRoutes.post("/api_frontend/favorites/write", (req, res) => {
  const json = getJson("success", "team-formation");
  sendAnswer(res, json);
});

module.exports = teamFormationRoutes;
