// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var expressValidator = require('express-validator');
var expressSession = require('express-session');

// Set up express app and port
var app = express();
var PORT = process.env.PORT || 8080;

// Setting up socket.io for realtime data transfer
var http = require("http").Server(app);
var io = require("socket.io")(http);

// Requiring models for syncing
var db = require("./models");

// Set up Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
//After the body is parsed, it's time for validation
//this starts the express validator
app.use(expressValidator());

// Serving static files
app.use(express.static("./public"));

// Requiring controllers here and passing app
require("./controllers/user-controller.js")(app);
require("./controllers/candidates-controller.js")(app);
require("./controllers/vote-controller.js")(app);

// Syncing sequelize models, then starting express app
db.sequelize.sync({force: false}).then(function() {
  // Listening on port
	http.listen(PORT, function() {
		console.log("listening on port " + PORT);
	});
});

