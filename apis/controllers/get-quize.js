exports.getQuize = (req, res) => {
    const apiData = require('../assets/data.json');
    return res.json(apiData);
}