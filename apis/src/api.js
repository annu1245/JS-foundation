const express = require("express");
const serverless = require("serverless-http");
const cors = require('cors');
const apiData = require("./assets/data.json");

const app = express();
app.use(cors());

const router = express.Router();

router.get("/get-quiz-questions", (req, res) => {
    res.json(apiData);
  });

// app.get("/api/get-quiz-questions", (req, res) => {
//     return res.json(apiData);
// });

app.use('/api/', router);

module.exports = app;
module.exports.handler = serverless(app);
