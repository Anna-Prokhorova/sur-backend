const express = require("express");
const fs = require("fs");
const path = require("path");
const util = require("./util");
const bodyParser = require("body-parser");

const { getJson, sendAnswer, processErrors, sendAnswerFast } = util;
const teamFormationRoutes = express.Router();

teamFormationRoutes.get("/api_frontend/catalogs/list/projects", (req, res) => {
  const isError = processErrors(res);
  if (!isError) {
    const json = getJson(`projects`, "team-formation");
    sendAnswer(res, json);
  }
});

teamFormationRoutes.post(
  "/api_frontend/requests/list",
  bodyParser.json(),
  (req, res) => {
    const projectId = Number(req.body.projectId.split("-")[2]);
    const isError = processErrors(res);
    if (!isError) {
      const json = getJson(`projectTeam${projectId + 1}`, "team-formation");
      sendAnswer(res, json);
    }
  }
);

teamFormationRoutes.post("/api_frontend/persons/list", (req, res) => {
  const isError = processErrors(res);
  if (!isError) {
    const json = getJson(`employees`, "team-formation");
    sendAnswer(res, json);
  }
});

teamFormationRoutes.post("/api_frontend/favorites/write", (req, res) => {
  const isError = processErrors(res);
  if (!isError) {
    const json = getJson("success", "");
    sendAnswer(res, json);
  }
});

teamFormationRoutes.post(
  "/api_frontend/requests/write",
  bodyParser.json(),
  async (req, res) => {
    let targetRequest;
    const file = getJson("all-requests", "team-formation");
    const allRequests = JSON.parse(file).requests;

    if (req.body.request.id) {
      targetRequest =
        allRequests.find((request) => {
          return request.requestId === req.body.request.id;
        }) || null;
    }

    const isError = processErrors(res) && targetRequest !== null;

    if (!isError) {
      const currentDate = new Date();
      const timezoneOffset = currentDate.getTimezoneOffset();
      currentDate.setMinutes(currentDate.getMinutes() - timezoneOffset);
      const formattedDate = currentDate.toISOString().replace(/\.\d{3}Z$/, "");
      const timezoneSign = timezoneOffset > 0 ? "-" : "+";
      const formattedTimezone = `${timezoneSign}${Math.abs(timezoneOffset / 60)
        .toString()
        .padStart(2, "0")}:${Math.abs(timezoneOffset % 60)
        .toString()
        .padStart(2, "0")}`;
      const resultString = `${formattedDate}${formattedTimezone}`;

      const request = {
        requestId: targetRequest
          ? targetRequest.requestId
          : `request-id-${allRequests.length}`,
        projectId: targetRequest ? targetRequest.projectId : "project-id-0",
        name: targetRequest ? targetRequest.name : "Олег Олегович Олегов",
        mail: targetRequest ? targetRequest.mail : "mail",
        img: targetRequest ? targetRequest.img : "/assets/avatar.svg",
        projectRoleId: req.body.request.requestBody.projectRoleId,
        positionId: targetRequest ? targetRequest.positionId : "position-id-0",
        load: req.body.request.requestBody.load,
        dateStart: req.body.request.requestBody.dateStart,
        dateEnd: req.body.request.requestBody.dateEnd,
        status: "ON_APPROVAL",
        description: req.body.request.requestBody.description,
        comment: req.body.request.requestBody.comment,
        recruitmentId: req.body.request.requestBody.recruitmentId,
        rating: req.body.request.rating,
        history: targetRequest
          ? [
              ...targetRequest.history,
              {
                status: "ON_APPROVAL",
                statusDate: resultString,
                reasonId: "reason-id-0",
                comment: "Сотрудник на больничном",
              },
            ]
          : [
              {
                status: "ON_APPROVAL",
                statusDate: resultString,
                reasonId: "reason-id-0",
                comment: "Сотрудник на больничном",
              },
            ],
      };

      // try {
      //   fs.writeFileSync(
      //     path.join(__dirname, `../json/team-formation/all-requests.json`),
      //     JSON.stringify({ requests: [...allRequests, request] })
      //   );
      // } catch (error) {
      //   console.error("Error processing the request:", error);
      //   return send404Error(res);
      // }

      const json = JSON.stringify({ request: request });
      sendAnswerFast(res, json);
    }
  }
);

teamFormationRoutes.delete("/api_frontend/requests/delete", (req, res) => {
  const isError = processErrors(res);
  if (!isError) {
    const json = JSON.stringify(req.query);
    sendAnswer(res, json);
  }
});

module.exports = teamFormationRoutes;
