/*
* 	All sequelize queries related to Vote model
*	addVoteByUser, getVotesPerCandidate, deleteVotesForCandidate, deleteAllVotes -> some of the tentative methods for which to add routes here
*/

// Requiring all models
var db = require("../models");

module.exports = function(app) {
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

	// Get votes per candidate
	app.get("/candidate/votes", function(req, res) {
		db.Vote.findAll({
			attributes: ['votes'],
			where: {
				CandidateId: req.params.candidateId,
				voted_flag: 1
			}
		}).then(function(response) {
			console.log(response);
			response.reduce((a,b) => {return (a + b)});
			var voteCount = response.length;
			console.log(voteCount);
			res.send(voteCount);
		});
	});

	// Get votes of all candidates
	app.get("/votes/all", function(req, res) {
		// TODO: Get votes for all candidates
		// Maybe something resembling ->
		
		db.Vote.findAll({
		  attributes: ['CandidateId', [db.sequelize.fn('COUNT', db.sequelize.col('CandidateId')), 'VoteCount']], 
		  group: 'CandidateId'
		}).then(function(response) {
			console.log(response);
			res.send(response);
		}).catch(function(error) {
			console.log(error);
			res.send(error);
		});
		
	});

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

	// Delete all votes from table
	app.post("/delete/votes", function(req, res) {
		db.Vote.destroy({
			where: {},
			truncate: true
		}).then(function(response) {
			res.send(response);
		}).catch(function(error) {
			console.log(error);
			res.send(error);
		})
	});
}