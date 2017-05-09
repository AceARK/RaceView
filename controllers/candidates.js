/*
* 	All sequelize routing for queries related to Candidate model
*	addCandidate, deleteCandidate, getCandidateList -> some of the methods to have routing here
*/

// Requiring all models
var db = require("../models");

module.exports = function(app) {
	app.get("/candidates/all", function(req, res) {

	});
}