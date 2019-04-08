//set up the variables 
var express = require('express');
var path = require('path');
var mysql = require('mysql');
//create the app instance
var app = express();
//set up the port 
var PORT = process.env.PORT || 8000;

//---------------MUST USE OR ELSE DATA WILL BE UNDEFINED -----------------//
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

//---------MAKE THE CONNECTION TO SERVER--------------


//----------ROUTES-------------
require('./app/routes/HTMLRoutes')(app);
require('./app/routes/apiRoutes')(app);


//----------LISTEN TO SERVER----------------
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});