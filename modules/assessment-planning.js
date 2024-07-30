const express = require("express");
const fs = require("fs");
const path = require("path");
const util = require("./util");
const bodyParser = require("body-parser");

const { getJson, sendAnswer, processErrors, sendAnswerFast, sendFile } = util;
const assessmentPlanningRoutes = express.Router();

assessmentPlanningRoutes.get(
  "/api_frontend/assessmentPlanning/list",
  (req, res) => {
    const isError = processErrors(res);
    if (!isError) {
      const json = getJson(`list`, "assessment-planning");
      sendAnswer(res, json);
    }
  }
);

assessmentPlanningRoutes.delete(
  "/api_frontend/assessmentPlanning/deleteApplication",
  bodyParser.json(),
  (req, res) => {
    const isError = processErrors(res);
    if (!isError) {
      const requests = getJson(`list`, "assessment-planning");
      const allRequests = JSON.parse(requests);
      const filteredRequests = allRequests.filter((request) => {
        return request.id !== req.query.applicationID;
      });
      try {
        fs.writeFileSync(
          path.join(__dirname, `../json/assessment-planning/list.json`),
          JSON.stringify([...filteredRequests])
        );
      } catch (error) {
        console.error("Error processing the request:", error);
        return send404Error(res);
      }
      const json = JSON.stringify({ id: req.query.applicationID });
      sendAnswerFast(res, json);
    }
  }
);

assessmentPlanningRoutes.delete(
  "/api_frontend/assessmentPlanning/list/deleteEmployees",
  bodyParser.json(),
  (req, res) => {
    const isError = processErrors(res);
    if (!isError) {
      const employees = getJson(`employees`, "assessment-planning");
      const allEmployees = JSON.parse(employees);
      const filteredEmployees = allEmployees.employees.filter((employee) => {
        return (
          employee.id !== req.query.employeeID &&
          employee.positionID !== req.query.positionID
        );
      });
      try {
        fs.writeFileSync(
          path.join(__dirname, `../json/assessment-planning/employees.json`),
          JSON.stringify({
            ...allEmployees,
            employees: [...filteredEmployees],
            itemsCount: filteredEmployees.length,
          })
        );
      } catch (error) {
        console.error("Error processing the request:", error);
        return send404Error(res);
      }
      const json = JSON.stringify({ message: "Удалено" });
      sendAnswerFast(res, json);
    }
  }
);

assessmentPlanningRoutes.get(
  "/api_frontend/assessmentPlanning/history",
  (req, res) => {
    const isError = processErrors(res);
    if (!isError) {
      const json = getJson(`history`, "assessment-planning");
      sendAnswer(res, json);
    }
  }
);

assessmentPlanningRoutes.post(
  "/api_frontend/assessmentPlanning/employees",
  bodyParser.json(),
  (req, res) => {
    const isError = processErrors(res);
    if (!isError) {
      const json = getJson(`employees`, "assessment-planning");
      sendAnswer(res, json);
    }
  }
);

assessmentPlanningRoutes.post(
  "/api_frontend/assessmentPlanning/search",
  bodyParser.json(),
  (req, res) => {
    const isError = processErrors(res);
    if (!isError) {
      const json = getJson(`search`, "assessment-planning");
      sendAnswer(res, json);
    }
  }
);

assessmentPlanningRoutes.get(
  "/api_frontend/assessmentPlanning/approvalList",
  (req, res) => {
    const isError = processErrors(res);
    if (!isError) {
      const json = getJson(`approvalList`, "assessment-planning");
      sendAnswer(res, json);
    }
  }
);

assessmentPlanningRoutes.get(
  "/api_frontend/assessmentPlanning/operation",
  (req, res) => {
    const isError = processErrors(res);
    if (!isError) {
      const json = JSON.stringify({ message: "Заявка согласована" });
      sendAnswerFast(res, json);
    }
  }
);

assessmentPlanningRoutes.post(
  "/api_frontend/assessmentPlanning/create",
  bodyParser.json(),
  (req, res) => {
    const isError = processErrors(res);
    if (!isError) {
      const requests = getJson(`list`, "assessment-planning");
      const list = JSON.parse(requests);

      const request = {
        id: `id-${list.length}`,
        applicationName: `№0000${list.length}`,
        date: "2023-10-11T16:26:07+03:00",
        status: "NEEDTOEDIT",
        functionLeader: {
          name: "Якушев Денис Олегович",
          position: "Руководитель",
          img64: "url",
          functionLeaderID: `function-leader-id-${list.length}`,
        },
      };
      const requestForList = {
        id: `id-${list.length}`,
        application: {
          date: "2023-10-11T16:26:07+03:00",
          applicationName: `№0000${list.length}`,
        },
        employeesNumber: 0,
        assessmentTool: "Инструменты оценки",
        functionLeader: {
          name: "Константинопольский А.А.",
          position: "Руководитель направления",
          initiatorID: `function-leader-id-${list.length}`,
          img64: "url",
        },
        status: "ONAPPROVAL",
      };

      try {
        fs.writeFileSync(
          path.join(__dirname, `../json/assessment-planning/list.json`),
          JSON.stringify([...list, requestForList])
        );
      } catch (error) {
        console.error("Error processing the request:", error);
        return send404Error(res);
      }
      const json = JSON.stringify(request);
      sendAnswerFast(res, json);
    }
  }
);

assessmentPlanningRoutes.post(
  "/api_frontend/assessmentPlanning/sendApplication",
  bodyParser.json(),
  (req, res) => {
    const isError = processErrors(res);
    if (!isError) {
      const json = JSON.stringify({
        message: "Заявка отправлена на согласование",
      });
      sendAnswerFast(res, json);
    }
  }
);

assessmentPlanningRoutes.post(
  "/api_frontend/assessmentPlanning/addEmployee",
  bodyParser.json(),
  (req, res) => {
    const isError = processErrors(res);
    if (!isError) {
      const employeesJson = getJson(`employees`, "assessment-planning");
      const employeesList = JSON.parse(employeesJson);

      const searchJson = getJson(`search`, "assessment-planning");
      const searchList = JSON.parse(searchJson);

      if (req.body.select) {
        selectedId = req.body.select.map((obj) => obj.employeeID);
        filteredSearchList = searchList.data.filter((employee) =>
          selectedId.includes(employee.id)
        );
        try {
          fs.writeFileSync(
            path.join(__dirname, `../json/assessment-planning/employees.json`),
            JSON.stringify({
              ...employeesList,
              employees: [...employeesList.employees, ...filteredSearchList],
              itemsCount:
                employeesList.employees.length + filteredSearchList.length,
            })
          );
        } catch (error) {
          console.error("Error processing the request:", error);
          return send404Error(res);
        }
      } else {
        try {
          fs.writeFileSync(
            path.join(__dirname, `../json/assessment-planning/employees.json`),
            JSON.stringify({
              ...employeesList,
              employees: [...employeesList.employees, ...searchList.data],
              itemsCount:
                employeesList.employees.length + searchList.data.length,
            })
          );
        } catch (error) {
          console.error("Error processing the request:", error);
          return send404Error(res);
        }
      }
      const json = JSON.stringify({ message: "Сотрудники добавлены" });
      sendAnswerFast(res, json);
    }
  }
);

module.exports = assessmentPlanningRoutes;
