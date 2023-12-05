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
    let targetEmployee;
    const fileTeam1 = getJson("projectTeam1", "team-formation");
    const fileTeam2 = getJson("projectTeam2", "team-formation");
    const fileTeam3 = getJson("projectTeam3", "team-formation");
    const allRequests = [
      ...JSON.parse(fileTeam1),
      ...JSON.parse(fileTeam2),
      ...JSON.parse(fileTeam3),
    ];

    const fileEmployees = getJson("employees", "team-formation");
    const allEmployees = JSON.parse(fileEmployees);
    if (req.body.requestBody) {
      targetEmployee =
        allEmployees.find((employee) => {
          return employee.id === req.body.requestBody.employeeId;
        }) || null;
    }

    if (req.body.id) {
      targetRequest =
        allRequests.find((request) => {
          return request.requestId === req.body.id;
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
        projectId: targetRequest
          ? targetRequest.projectId
          : req.body.requestBody.projectId,
        name: targetRequest ? targetRequest.name : targetEmployee.name,
        mail: targetRequest ? targetRequest.mail : targetEmployee.mail,
        employeeId: targetRequest
          ? targetRequest.employeeId
          : targetEmployee.id,
        employeeNumber: targetRequest
          ? targetRequest.employeeNumber
          : targetEmployee.employeeNumber,
        employeeRating: targetRequest
          ? targetRequest.employeeRating
          : targetEmployee.employeeRating,
        img: targetRequest ? targetRequest.img : targetEmployee.img,
        projectRoleId: targetRequest
          ? targetRequest.projectRoleId
          : req.body.requestBody.projectRoleId,
        positionId: targetRequest
          ? targetRequest.positionId
          : targetEmployee.positionId,
        roleNameId: targetRequest
          ? targetRequest.roleNameId
          : targetEmployee.roleNameId,
        load: targetRequest ? targetRequest.load : req.body.requestBody.load,
        dateStart: targetRequest
          ? targetRequest.dateStart
          : req.body.requestBody.dateStart,
        dateEnd: targetRequest
          ? targetRequest.dateEnd
          : req.body.requestBody.dateEnd,
        status: "ON_APPROVAL",
        description: targetRequest
          ? targetRequest.description
          : req.body.requestBody.description,
        comment: targetRequest
          ? targetRequest.comment
          : req.body.requestBody.comment,
        recruitmentId: targetRequest
          ? targetRequest.recruitmentId
          : req.body.requestBody.recruitmentId,
        rating: targetRequest
          ? targetRequest.rating
            ? targetRequest.rating
            : {
                ratingList: req.body.rating.ratingList,
                commentRating: req.body.rating.commentRating,
              }
          : req.body.rating,
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

      if (!targetRequest) {
        try {
          const fileProjectTeam = getJson(
            `projectTeam${Number(request.projectId.split("-")[2]) + 1}`,
            "team-formation"
          );
          const ProjectTeam = JSON.parse(fileProjectTeam);

          fs.writeFileSync(
            path.join(
              __dirname,
              `../json/team-formation/projectTeam${
                Number(request.projectId.split("-")[2]) + 1
              }.json`
            ),
            JSON.stringify([...ProjectTeam, request])
          );
        } catch (error) {
          console.error("Error processing the request:", error);
          return send404Error(res);
        }
      }

      const json = JSON.stringify(request);
      sendAnswerFast(res, json);
    }
  }
);

teamFormationRoutes.delete("/api_frontend/requests/delete", (req, res) => {
  const isError = processErrors(res);
  if (!isError) {
    const fileTeam1 = getJson("projectTeam1", "team-formation");
    const fileTeam2 = getJson("projectTeam2", "team-formation");
    const fileTeam3 = getJson("projectTeam3", "team-formation");
    const allRequests = {
      projectTeam1: JSON.parse(fileTeam1),
      projectTeam2: JSON.parse(fileTeam2),
      projectTeam3: JSON.parse(fileTeam3),
    };
    for (let key in allRequests) {
      const filteredRequests = allRequests[key].filter(
        (request) => request.requestId !== req.query.id
      );
      if (filteredRequests.length !== allRequests[key].length) {
        try {
          fs.writeFileSync(
            path.join(__dirname, `../json/team-formation/${key}.json`),
            JSON.stringify([...filteredRequests])
          );
        } catch (error) {
          console.error("Error processing the request:", error);
          return send404Error(res);
        }
      }
    }
    const json = JSON.stringify(req.query);
    sendAnswerFast(res, json);
  }
});

module.exports = teamFormationRoutes;
