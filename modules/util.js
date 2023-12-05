const fs = require("fs");
const path = require("path");
const errorProbability = process.env.ERROR_PROBABILITY || 0.1;

function getJson(fileName, folder = "") {
  const jsonPath = folder
    ? `../json/${folder}/${fileName}.json`
    : `../json/${fileName}.json`;
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
    res.setHeader("Content-Type", "application/json");
    setTimeout(() => {
      res.status(200).send(json);
    }, 300);
  }
}

function sendAnswerFast(res, json) {
  if (!json) {
    send404Error(res);
  } else {
    res.setHeader("Content-Type", "application/json");

    res.status(200).send(json);
  }
}

function send404Error(res) {
  setTimeout(() => {
    res.status(404).send(null);
  }, 300);
}

function generateError() {
  const num = Math.random();
  return num < errorProbability;
}

function processErrors(res) {
  const isError = generateError();
  if (isError) {
    send404Error(res);
  }
  return isError;
}

module.exports = {
  getJson,
  sendAnswer,
  processErrors,
  sendAnswerFast,
};
