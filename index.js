const port = process.env.PORT || 3000;
const errorProbability = process.env.ERROR_PROBABILITY || 0.1;

const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const http = require("http");
const teamFormation = require("./modules/team-formation.js");
const catalogs = require("./modules/catalogs.js");
const requestResources = require("./modules/request-resources.js");
const myTeam = require("./modules/my-team.js");
const shared = require("./modules/shared.js");

const app = express();
const routes = express.Router();

app.use(cors());
routes.use(express.static(path.join(__dirname)));

routes.use(catalogs);
routes.use(teamFormation);
routes.use(requestResources);
routes.use(myTeam);
routes.use(shared);

app.use(routes);

const server = http.createServer(app);
server.listen(port, () => {
  console.log("listening on *:" + port);
  console.log("error probability: " + errorProbability);
});
