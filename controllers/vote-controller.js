/*
* 	All sequelize queries related to Vote model
*	addVoteByUser, getVotesPerCandidate, deleteVotesForCandidate, deleteAllVotes -> some of the tentative methods for which to add routes here
*/

// Requiring all models
var db = require("../models");

module.exports = function(app, io) {
	// Add user vote
	app.post("/vote", function(req, res) {
		console.log(req.body);
		db.Vote.create({
			votes: 1,
			UserId: req.body.userId,
			CandidateId: req.body.candidateId,
			voted_flag: 1
		}).then(function(result) {
			res.send(result);
		}).catch(function(error) {
			console.log(error);
			res.send(error);
		});
	});

	// For demo of realtime purpose - open voting
	app.post("/open/vote", function(req, res) {
		db.Vote.create({
			votes: 1,
			CandidateId: req.body.candidateId,
			voted_flag: 1
		}).then(function(result) {
			res.send(result);
		}).catch(function(error) {
			console.log(error);
			res.send(error);
		});
	});

	// Get votes per candidate
	app.get("/candidate/votes", function(req, res) {
		// console.log(req.query.ID);
		db.Vote.findAll({
			attributes: ['votes'],
			where: {
				CandidateId: req.query.ID,
				voted_flag: 1
			}
		}).then(function(response) {
			// console.log(response.length);
			var voteCount = response.length;
			res.json(voteCount);
		});
	});

	// Get votes of all candidates
	app.get("/votes/all", function(req, res) {
		// Then the promise 
		getAllVotesPromise().then(function(response) {
			console.log(response);
			res.send(response);
		}).catch(function(error) {
			console.log(error);
			res.send(error);
		});
	});

// This portion of the code handles realtime updation
	// Function to find all votes
	function getAllVotesPromise() {
		console.log("Within getAllVotesPromise");
		return db.Vote.findAll({
		  attributes: ['CandidateId', [db.sequelize.fn('COUNT', db.sequelize.col('CandidateId')), 'VoteCount']], 
		  group: 'CandidateId'
		});
	}

	function executeBroadcast() {
		getAllVotesPromise().then(function(response) {
			io.emit('broadcast', response);
		});
	}

	setInterval(executeBroadcast, 2000);

// End of realtime updation

	// Delete candidate votes
	app.delete("/delete/candidate/votes", function(req, res) {
		db.Vote.destroy({
			where: {
				CandidateId: req.body.candidateId
			}
		}).then(function(response) {
			res.send(response);
		}).catch(function(error) {
			console.log(error);
			res.send(error);
		});
	});

	app.delete("/delete/unwanted", function(req, res) {
		db.Vote.destroy({
			where: {
				id: {
					$gt: 450
				}
			}
		}).then(function(response) {
			res.sendStatus(200);
		}).catch(function(error) {
			console.log(error);
			res.send(error);
		});
	});

	// Delete all votes from table
	app.delete("/delete/votes", function(req, res) {
		db.Vote.destroy({
			truncate: true
		}).then(function(response) {
			res.json(response);
		}).catch(function(error) {
			console.log(error);
			res.send(error);
		})
	});
}