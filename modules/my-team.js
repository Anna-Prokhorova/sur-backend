const express = require("express");
const fs = require("fs");
const path = require("path");
const util = require("./util");
const bodyParser = require("body-parser");

const { getJson, sendAnswer, processErrors, sendAnswerFast, sendFile } = util;
const myTeamRoutes = express.Router();

myTeamRoutes.get("/api_frontend/templates/list", (req, res) => {
  const isError = processErrors(res);
  if (!isError) {
    const json = getJson(`templates`, "my-team");
    sendAnswer(res, json);
  }
});

myTeamRoutes.post(
  "/api_frontend/templates/write",
  bodyParser.json(),
  (req, res) => {
    const isError = processErrors(res);
    if (!isError) {
      const templatesFile = getJson(`templates`, "my-team");
      const templates = JSON.parse(templatesFile);
      const template = req.body.id
        ? req.body
        : {
            id: `template-id-${templates.length}`,
            name: req.body.name,
            content: req.body.content,
          };
      try {
        fs.writeFileSync(
          path.join(__dirname, `../json/my-team/templates.json`),
          JSON.stringify([...templates, template])
        );
      } catch (error) {
        console.error("Error processing the request:", error);
        return send404Error(res);
      }
      const json = JSON.stringify(template);
      sendAnswerFast(res, json);
    }
  }
);

myTeamRoutes.delete("/api_frontend/templates/delete", (req, res) => {
  const isError = processErrors(res);
  if (!isError) {
    const templatesFile = getJson(`templates`, "my-team");
    const templates = JSON.parse(templatesFile);
    const filteredTemplates = templates.filter(
      (template) => template.id !== req.query.id
    );
    try {
      fs.writeFileSync(
        path.join(__dirname, `../json/my-team/templates.json`),
        JSON.stringify([...filteredTemplates])
      );
    } catch (error) {
      console.error("Error processing the request:", error);
      return send404Error(res);
    }
    const json = JSON.stringify(req.query);
    sendAnswerFast(res, json);
  }
});

myTeamRoutes.get("/api_frontend/persons/list/xlsx", (req, res) => {
  const isError = processErrors(res);
  if (!isError) {
    sendFile(res, "test.xlsx");
  }
});

myTeamRoutes.post("/api_frontend/persons/listMyTeam", (req, res) => {
  const isError = processErrors(res);
  if (!isError) {
    const json = getJson(`listMyTeam`, "my-team");
    sendAnswer(res, json);
  }
});
myTeamRoutes.post("/api_frontend/persons/listFormation", (req, res) => {
  const isError = processErrors(res);
  if (!isError) {
    const json = getJson(`listFormation`, "my-team");
    sendAnswer(res, json);
  }
});

myTeamRoutes.get("/api_frontend/persons/getPersonMyTeam", (req, res) => {
  const isError = processErrors(res);
  if (!isError) {
    let json;
    json = getJson(`personMyTeam`, "my-team");
    sendAnswer(res, json);
  }
});
myTeamRoutes.get("/api_frontend/persons/getPersonFormation", (req, res) => {
  const isError = processErrors(res);
  if (!isError) {
    let json;
    json = getJson(`personFormation`, "my-team");
    sendAnswer(res, json);
  }
});

module.exports = myTeamRoutes;
