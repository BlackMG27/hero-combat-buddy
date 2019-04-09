//set up the variables
var express = require('express');
var path = require('path');
var mysql = require('mysql');
//create the app instance
var app = express();
//set up the port
var PORT = process.env.PORT || 8000;

// Serve static content for the app from the "public" directory in the
// application directory.
app.use(express.static("./app/public"));

//---------------MUST USE OR ELSE DATA WILL BE UNDEFINED -----------------//
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// ---------MAKE THE CONNECTION TO SERVER--------------
// ----------ROUTES-------------
require("./routes/htmlRoutes")(app)
require('./routes/apiRoutes')(app);
// ----------LISTEN TO
// SERVER----------------
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});