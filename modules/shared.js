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

sharedRoutes.post(
  "/api_frontend/requests/list",
  bodyParser.json(),
  (req, res) => {
    const isError = processErrors(res);
    if (!isError) {
      let json;
      switch (req.body.displayType) {
        case "FORMATION":
          const projectId = Number(req.body.projectId.split("-")[2]);
          json = getJson(`projectTeam${projectId + 1}`, "team-formation");
          break;
        case "REQUESTS":
          json = getJson("list", "request-resources");
          break;
        default:
          return send404Error(res);
      }
      sendAnswer(res, json);
    }
  }
);

sharedRoutes.get("/api_frontend/candidateSearch/list", (req, res) => {
  const isError = processErrors(res);
  if (!isError) {
    const json = getJson(`candidateSearchList`, "search-candidates");
    sendAnswer(res, json);
  }
});

sharedRoutes.post(
  "/api_frontend/candidateSearch/getPositions",
  bodyParser.json(),
  (req, res) => {
    const isError = processErrors(res);
    if (!isError) {
      const structuralUnits = getJson(
        `candidateSearchList`,
        "search-candidates"
      );
      const allStructuralUnits = JSON.parse(structuralUnits);
      json = [];
      allStructuralUnits.map((unit) => {
        if (req.body.structuralUnits.includes(unit.id)) {
          json.push({
            id: unit.id,
            positionName: unit.positionName,
            positionUnit: unit.positionUnit,
          });
        }
      });
      sendAnswer(res, json);
    }
  }
);
sharedRoutes.post("/api_frontend/candidateSearch/search", (req, res) => {
  const isError = processErrors(res);
  if (!isError) {
    const json = getJson(`search`, "search-candidates");
    sendAnswer(res, json);
  }
});
sharedRoutes.post("/api_frontend/candidateSearch/comparison", (req, res) => {
  const isError = processErrors(res);
  if (!isError) {
    const json = getJson(`comparison`, "search-candidates");
    sendAnswer(res, json);
  }
});

sharedRoutes.delete(
  "/api_frontend/candidateSearch/delete",
  bodyParser.json(),
  (req, res) => {
    const isError = processErrors(res);
    if (!isError) {
      const requests = getJson(`candidateSearchList`, "search-candidates");
      const allRequests = JSON.parse(requests);
      const filteredRequests = allRequests.filter((request) => {
        return request.id !== req.query.id;
      });

      try {
        fs.writeFileSync(
          path.join(
            __dirname,
            `../json/search-candidates/candidateSearchList.json`
          ),
          JSON.stringify([...filteredRequests])
        );
      } catch (error) {
        console.error("Error processing the request:", error);
        return send404Error(res);
      }
      const json = JSON.stringify(req.query);
      sendAnswerFast(res, json);
    }
  }
);

module.exports = sharedRoutes;
