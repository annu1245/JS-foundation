const express = require('express');
const cors = require('cors');
const { getQuize } = require('./controllers/get-quize');

const app = express();
app.use(cors());

app.get('/get-quiz-questions', getQuize)

const PORT = 3000;
app.listen(PORT, () => {
    console.log("yes its live");
});
