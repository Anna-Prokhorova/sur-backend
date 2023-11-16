const port = process.env.PORT || 3000;
const errorProbability = process.env.ERROR_PROBABILITY || 0.1;
const availablePaths = new Set(["/api_frontend/getProjects"]);

const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const http = require("http");

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname)));

function getJson(fileName, folder = "") {
  const jsonPath = folder
    ? `./json/${folder}/${fileName}.json`
    : `./json/${fileName}.json`;
  let res = null;
  try {
    res = fs.readFileSync(path.join(__dirname, jsonPath), "utf8");
  } catch (e) {
    res = null;
  }
  return res;
}

function sendAnswer(res, json) {
  if (!json) {
    send404Error(res);
  } else {
    setTimeout(() => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(json);
    }, 300);
  }
}

function checkPath(path) {
  return path in availablePaths;
}

function send404Error(res) {
  setTimeout(() => {
    res.status(404).send(null);
  }, 300);
}

app.get("/api_frontend/getProjects", (req, res) => {
  const pathNotFound = checkPath(req.path);
  const json = getJson(`projects`, "team-formation");
  sendAnswer(res, json);
});

app.get("/api_frontend/getCurrentUser", (req, res) => {
  const json = getJson(`current-user`, "team-formation");
  sendAnswer(res, json);
});

app.get("/api_frontend/getProjectTeam", (req, res) => {
  const projectId = Number(req.query.id.split("-")[2]);
  const json = getJson(`projectTeam${projectId + 1}`, "team-formation");
  sendAnswer(res, json);
});

app.get("/api_frontend/getProjectTeam", (req, res) => {
  const projectId = Number(req.query.id.split("-")[2]);
  const json = getJson(`projectTeam${projectId + 1}`, "team-formation");
  sendAnswer(res, json);
});

app.get("/api_frontend/getEmployees", (req, res) => {
  const json = getJson(`employees`, "team-formation");
  sendAnswer(res, json);
});

app.get("/api_frontend/catalogs/list/regions", (req, res) => {
  const json = getJson("regions", "catalogs");
  sendAnswer(res, json);
});

app.get("/api_frontend/catalogs/list/cities", (req, res) => {
  const json = getJson("cities", "catalogs");
  sendAnswer(res, json);
});

app.get("/api_frontend/catalogs/list/organizations", (req, res) => {
  const json = getJson("organizations", "catalogs");
  sendAnswer(res, json);
});

app.get("/api_frontend/catalogs/list/structuralUnits", (req, res) => {
  const json = getJson("structuralUnits", "catalogs");
  sendAnswer(res, json);
});

app.get("/api_frontend/catalogs/list/positions", (req, res) => {
  const json = getJson("positions", "catalogs");
  sendAnswer(res, json);
});

app.get("/api_frontend/catalogs/list/functions", (req, res) => {
  const json = getJson("functions", "catalogs");
  sendAnswer(res, json);
});

app.get("/api_frontend/catalogs/list/specializations", (req, res) => {
  const json = getJson("specializations", "catalogs");
  sendAnswer(res, json);
});

app.get("/api_frontend/catalogs/list/rolesLevel", (req, res) => {
  const json = getJson("rolesLevel", "catalogs");
  sendAnswer(res, json);
});

app.get("/api_frontend/catalogs/list/rolesName", (req, res) => {
  const json = getJson("rolesName", "catalogs");
  sendAnswer(res, json);
});

app.get("/api_frontend/catalogs/list/rolesType", (req, res) => {
  const json = getJson("rolesType", "catalogs");
  sendAnswer(res, json);
});

app.get("/api_frontend/catalogs/list/resourcePools", (req, res) => {
  const json = getJson("resourcePools", "catalogs");
  sendAnswer(res, json);
});

app.get("/api_frontend/catalogs/list/relocations", (req, res) => {
  const json = getJson("relocations", "catalogs");
  sendAnswer(res, json);
});

app.get("/api_frontend/catalogs/list/competencies", (req, res) => {
  const json = getJson("competencies", "catalogs");
  sendAnswer(res, json);
});

app.get("/api_frontend/catalogs/list/subCompetencies", (req, res) => {
  const json = getJson("subCompetencies", "catalogs");
  sendAnswer(res, json);
});

app.get("/api_frontend/catalogs/list/recruitments", (req, res) => {
  const json = getJson("recruitments", "catalogs");
  sendAnswer(res, json);
});

app.get("/api_frontend/catalogs/list/answers", (req, res) => {
  const json = getJson("answers", "catalogs");
  sendAnswer(res, json);
});

app.get("/api_frontend/catalogs/list/projectRoles", (req, res) => {
  const json = getJson("projectRoles", "catalogs");
  sendAnswer(res, json);
});

app.get("/api_frontend/catalogs/list/countries", (req, res) => {
  const json = getJson("countries", "catalogs");
  sendAnswer(res, json);
});

app.get("/api_frontend/catalogs/list/reasons", (req, res) => {
  const json = getJson("reasons", "catalogs");
  sendAnswer(res, json);
});

app.get("/api_frontend/getRequestResources", (req, res) => {
  const json = getJson("list", "request-resources");
  sendAnswer(res, json);
});

app.get("/api_frontend/workloads", (req, res) => {
  const json = getJson(`gant${req.query.id}`, "request-resources");
  sendAnswer(res, json);
});

app.post("/api_frontend/favorites/write", (req, res) => {
  const json = getJson("success", "team-formation");
  sendAnswer(res, json);
});

const server = http.createServer(app);
server.listen(port, () => {
  console.log("listening on *:" + port);
  console.log("error probability: " + errorProbability);
});
