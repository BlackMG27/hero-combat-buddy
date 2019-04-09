//sets the path variable
var path = require('path');

module.exports = function (app) {
    app.get('/survey', function (req, res) {
        res.sendFile(path.join(__dirname, '../views/survey.html'));
    });

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../views/index.html'));
    });
}