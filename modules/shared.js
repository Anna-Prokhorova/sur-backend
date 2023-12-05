const express = require("express");
const fs = require("fs");
const path = require("path");
const util = require("./util");
const bodyParser = require("body-parser");

const { getJson, sendAnswer, processErrors, sendAnswerFast } = util;
const sharedRoutes = express.Router();

sharedRoutes.post(
  "/api_frontend/persons/list",
  bodyParser.json(),
  (req, res) => {
    const isError = processErrors(res);
    if (!isError) {
      let json;
      switch (req.body.displayType) {
        case "FORMATION":
          json = getJson(`employees`, "team-formation");
          break;
        case "MYTEAM":
          json = getJson(`team-members`, "my-team");
          break;
        default:
          return send404Error(res);
      }
      sendAnswer(res, json);
    }
  }
);

module.exports = sharedRoutes;
