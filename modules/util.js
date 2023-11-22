const fs = require("fs");
const path = require("path");

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
    setTimeout(() => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(json);
    }, 300);
  }
}

function send404Error(res) {
  setTimeout(() => {
    res.status(404).send(null);
  }, 300);
}

module.exports = {
  getJson,
  sendAnswer,
};
