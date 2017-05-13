/*
* 	All sequelize routing for queries related to Candidate model
*	addCandidate, deleteCandidate, getCandidateList -> some of the methods to have routing here
*/

// Requiring all models
var db = require("../models");

module.exports = function(app) {
	// Get all candidates
	app.get("/candidates/all", function(req, res) {
		db.Candidate.findAll().then(function(response) {
			// console.log(response);
			res.send(response);
		}).catch(function(error) {
			console.log(error);
			res.send(error);
		});
	});

	// Add a new candidate
	app.post("/add/candidate", function(req, res) {
		db.Candidate.create(req.body).then(function(response) {
			console.log(response);
			res.send(response);
		}).catch(function(error) {
			console.log(error);
			res.send(error);
		});
	});

	// Delete a candidate
	app.delete("/delete/candidate", function(req, res) {
		db.Candidate.destroy({
			where: {
				id: req.body.candidateId
			}
		}).then(function(response) {
			console.log(response);
			res.send(response);
		}).catch(function(error) {
			console.log(error);
			res.send(error);
		});
	});
}