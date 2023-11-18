const express = require("express");
const serverless = require("serverless-http");
const cors = require('cors');
const apiData = require("./assets/data.json");

const app = express();
app.use(cors());

app.get("/.netlify/functions/api/get-quiz-questions", (req, res) => {
    return res.json(apiData);
});

module.exports = app;
module.exports.handler = serverless(app);
