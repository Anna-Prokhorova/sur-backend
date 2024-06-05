const express = require("express");
const fs = require("fs");
const path = require("path");

const util = require("./util");

const { getJson, sendAnswer, processErrors } = util;
const catalogsRoutes = express.Router();

catalogsRoutes.get("/api_frontend/catalogs/users/current", (req, res) => {
  const isError = processErrors(res);
  if (!isError) {
    const json = getJson(`current-user`, "team-formation");
    sendAnswer(res, json);
  }
});

catalogsRoutes.get("/api_frontend/catalogs/list/regions", (req, res) => {
  const json = getJson("regions", "catalogs");
  sendAnswer(res, json);
});

catalogsRoutes.get("/api_frontend/catalogs/list/citizenship", (req, res) => {
  const json = getJson("citizenship", "catalogs");
  sendAnswer(res, json);
});

catalogsRoutes.get("/api_frontend/catalogs/list/personnelType", (req, res) => {
  const json = getJson("personnelType", "catalogs");
  sendAnswer(res, json);
});

catalogsRoutes.get(
  "/api_frontend/catalogs/list/personnelCategory",
  (req, res) => {
    const json = getJson("personnelCategory", "catalogs");
    sendAnswer(res, json);
  }
);

catalogsRoutes.get("/api_frontend/catalogs/list/costType", (req, res) => {
  const json = getJson("costType", "catalogs");
  sendAnswer(res, json);
});

catalogsRoutes.get(
  "/api_frontend/catalogs/list/businessDirections",
  (req, res) => {
    const json = getJson("businessDirections", "catalogs");
    sendAnswer(res, json);
  }
);

catalogsRoutes.get("/api_frontend/catalogs/list/blocks", (req, res) => {
  const json = getJson("blocks", "catalogs");
  sendAnswer(res, json);
});

catalogsRoutes.get(
  "/api_frontend/catalogs/list/optionSpecifications",
  (req, res) => {
    const json = getJson("optionSpecifications", "catalogs");
    sendAnswer(res, json);
  }
);

catalogsRoutes.get(
  "/api_frontend/catalogs/list/functionalDirections",
  (req, res) => {
    const json = getJson("functionalDirections", "catalogs");
    sendAnswer(res, json);
  }
);

catalogsRoutes.get("/api_frontend/catalogs/list/educations", (req, res) => {
  const json = getJson("educations", "catalogs");
  sendAnswer(res, json);
});

catalogsRoutes.get("/api_frontend/catalogs/list/scienceDegree", (req, res) => {
  const json = getJson("scienceDegree", "catalogs");
  sendAnswer(res, json);
});

catalogsRoutes.get("/api_frontend/catalogs/list/educationLevel", (req, res) => {
  const json = getJson("educationLevel", "catalogs");
  sendAnswer(res, json);
});

catalogsRoutes.get("/api_frontend/catalogs/list/skills", (req, res) => {
  const json = getJson("skills", "catalogs");
  sendAnswer(res, json);
});

catalogsRoutes.get("/api_frontend/catalogs/list/academicTitle", (req, res) => {
  const json = getJson("academicTitle", "catalogs");
  sendAnswer(res, json);
});

catalogsRoutes.get(
  "/api_frontend/catalogs/list/workBookCompany",
  (req, res) => {
    const json = getJson("workBookCompany", "catalogs");
    sendAnswer(res, json);
  }
);

catalogsRoutes.get(
  "/api_frontend/catalogs/list/workBookSpeciality",
  (req, res) => {
    const json = getJson("workBookSpeciality", "catalogs");
    sendAnswer(res, json);
  }
);

catalogsRoutes.get("/api_frontend/catalogs/list/cathedraName", (req, res) => {
  const json = getJson("cathedraName", "catalogs");
  sendAnswer(res, json);
});

catalogsRoutes.get("/api_frontend/catalogs/list/coachingStatus", (req, res) => {
  const json = getJson("coachingStatus", "catalogs");
  sendAnswer(res, json);
});

catalogsRoutes.get("/api_frontend/catalogs/list/coachingType", (req, res) => {
  const json = getJson("coachingType", "catalogs");
  sendAnswer(res, json);
});

catalogsRoutes.get("/api_frontend/catalogs/list/reserveType", (req, res) => {
  const json = getJson("reserveType", "catalogs");
  sendAnswer(res, json);
});

catalogsRoutes.get("/api_frontend/catalogs/list/languageName", (req, res) => {
  const json = getJson("languageName", "catalogs");
  sendAnswer(res, json);
});

catalogsRoutes.get("/api_frontend/catalogs/list/languageLevel", (req, res) => {
  const json = getJson("languageLevel", "catalogs");
  sendAnswer(res, json);
});

catalogsRoutes.get("/api_frontend/catalogs/list/program", (req, res) => {
  const json = getJson("program", "catalogs");
  sendAnswer(res, json);
});

catalogsRoutes.get("/api_frontend/catalogs/list/portfolio", (req, res) => {
  const json = getJson("portfolio", "catalogs");
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
    const json = getJson("subSpecializations", "catalogs");
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
