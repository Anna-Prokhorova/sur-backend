const express = require("express");
const fs = require("fs");
const path = require("path");

const util = require("./util");

const { getJson, sendAnswer } = util;
const catalogsRoutes = express.Router();

catalogsRoutes.get("/api_frontend/catalogs/users/current", (req, res) => {
  const json = getJson(`current-user`, "team-formation");
  sendAnswer(res, json);
});

catalogsRoutes.get("/api_frontend/catalogs/list/regions", (req, res) => {
  const json = getJson("regions", "catalogs");
  sendAnswer(res, json);
});

catalogsRoutes.get("/api_frontend/catalogs/list/cities", (req, res) => {
  const json = getJson("cities", "catalogs");
  sendAnswer(res, json);
});

catalogsRoutes.get("/api_frontend/catalogs/list/organizations", (req, res) => {
  const json = getJson("organizations", "catalogs");
  sendAnswer(res, json);
});

catalogsRoutes.get(
  "/api_frontend/catalogs/list/structuralUnits",
  (req, res) => {
    const json = getJson("structuralUnits", "catalogs");
    sendAnswer(res, json);
  }
);

catalogsRoutes.get("/api_frontend/catalogs/list/positions", (req, res) => {
  const json = getJson("positions", "catalogs");
  sendAnswer(res, json);
});

catalogsRoutes.get("/api_frontend/catalogs/list/functions", (req, res) => {
  const json = getJson("functions", "catalogs");
  sendAnswer(res, json);
});

catalogsRoutes.get(
  "/api_frontend/catalogs/list/specializations",
  (req, res) => {
    const json = getJson("specializations", "catalogs");
    sendAnswer(res, json);
  }
);

catalogsRoutes.get(
  "/api_frontend/catalogs/list/subspecializations",
  (req, res) => {
    const json = getJson("specializations", "catalogs");
    sendAnswer(res, json);
  }
);

catalogsRoutes.get("/api_frontend/catalogs/list/rolesLevel", (req, res) => {
  const json = getJson("rolesLevel", "catalogs");
  sendAnswer(res, json);
});

catalogsRoutes.get("/api_frontend/catalogs/list/rolesName", (req, res) => {
  const json = getJson("rolesName", "catalogs");
  sendAnswer(res, json);
});

catalogsRoutes.get("/api_frontend/catalogs/list/rolesType", (req, res) => {
  const json = getJson("rolesType", "catalogs");
  sendAnswer(res, json);
});

catalogsRoutes.get("/api_frontend/catalogs/list/resourcePools", (req, res) => {
  const json = getJson("resourcePools", "catalogs");
  sendAnswer(res, json);
});

catalogsRoutes.get("/api_frontend/catalogs/list/relocations", (req, res) => {
  const json = getJson("relocations", "catalogs");
  sendAnswer(res, json);
});

catalogsRoutes.get("/api_frontend/catalogs/list/competencies", (req, res) => {
  const json = getJson("competencies", "catalogs");
  sendAnswer(res, json);
});

catalogsRoutes.get(
  "/api_frontend/catalogs/list/subCompetencies",
  (req, res) => {
    const json = getJson("subCompetencies", "catalogs");
    sendAnswer(res, json);
  }
);

catalogsRoutes.get("/api_frontend/catalogs/list/recruitments", (req, res) => {
  const json = getJson("recruitments", "catalogs");
  sendAnswer(res, json);
});

catalogsRoutes.get("/api_frontend/catalogs/list/answers", (req, res) => {
  const json = getJson("answers", "catalogs");
  sendAnswer(res, json);
});

catalogsRoutes.get("/api_frontend/catalogs/list/projectRoles", (req, res) => {
  const json = getJson("projectRoles", "catalogs");
  sendAnswer(res, json);
});

catalogsRoutes.get("/api_frontend/catalogs/list/countries", (req, res) => {
  const json = getJson("countries", "catalogs");
  sendAnswer(res, json);
});

catalogsRoutes.get("/api_frontend/catalogs/list/reasons", (req, res) => {
  const json = getJson("reasons", "catalogs");
  sendAnswer(res, json);
});

catalogsRoutes.get("/api_frontend/catalogs/list/persons", (req, res) => {
  const json = getJson("persons", "catalogs");
  sendAnswer(res, json);
});

module.exports = catalogsRoutes;
