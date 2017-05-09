/*
* 	All sequelize query-call methods - tentative, subject to additions or deletions
*	Candidate model specific - addCandidate, deleteCandidate, getCandidateList
*	Vote model specific - addVoteByUser, getVotesPerCandidate, deleteVotesForCandidate, deleteAllVotes
*	User model specific - addUser, deleteUser, authenticateUser, changePassword 
*/

// Include axios
var axios = require("axios");

// Helper functions to make sequelize queries
var helpers = {

// Candidate specific helpers

	// Get candidate list
	getCandidateList: function() {
		console.log("Getting candidate list");
		return axios.get("/candidates/all").then(function(result){
      		console.log("AXIOS GET CANDIDATES RESULTS", result);
      		// return result;
    	});
	},

	// Add a candidate
	addCandidate: function(candidateData) {
		console.log("Adding candidate");
		return axios.post("/add/candidate", candidateData).then(function(result) {
			console.log("CANDIDATE ADDED", result);
			// return result;
		});
	},

	// Delete a candidate
	deleteCandidate: function(candidateData) {
		console.log("Deleting candidate");
		return axios.delete("/delete/candidate", candidateData).then(function(result) {
			console.log("DELETED CANDIDATE", result);
			// return result;
		});
	},

// User spefic helpers

	// Adding a user
	addUser: function(userData) {
		console.log("Adding user");
		return axios.post("/add/user", userData).then(function(result) {
			console.log("ADDING USER", result);
			// return result;
		});
	},

	// Delete a user
	deleteUser: function(userData) {
		console.log("Deleting user account");
		return axios.delete("/delete/user", userData).then(function(result) {
			console.log("DELETED USER", result);
			// return result;
		});
	},

	// Authenticate user
	authenticateUser: function(userData) {
		console.log("Authenticating user");
		return axios.post("/authenticate", userData).then(function(result) {
			console.log("AUTHENTICATED USER", result);
			// return result;
		});
	},

	// Changing user password
	changePassword: function(userData) {
		console.log("Changing user password");
		return axios.post("/change/password", userData).then(function(result) {
			console.log("PASSWORD SUCCESSFULLY CHANGED", result);
			// return result;
		});
	},

// Vote specific helpers

	// Adding user vote
	addVoteByUser: function(voteData) {
		console.log("Adding user vote");
		return axios.post("/vote").then(function(result) {
			console.log("ADDED USER VOTE", result);
			// return result;
		});
	},

	// Get all votes for a candidate
	getVotesPerCandidate: function(candidateData) {
		console.log("Getting candidate votes");
		return axios.get("/candidate/votes", candidateData).then(function(result) {
			console.log("CANDIDATE VOTES", result);
			// return result;
		});
	},

	// Delete a candidate
	deleteVotesForCandidate: function(candidateData) {
		console.log("Deleting candidate votes");
		return axios.delete("/delete/candidate/votes", candidateData).then(function(result) {
			console.log("DELETED VOTES FOR CANDIDATE", result);
			// return result;
		});
	},

	// Delete a candidate
	deleteAllVotes: function() {
		console.log("Deleting all candidate votes");
		return axios.delete("/delete/votes").then(function(result) {
			console.log("DELETED ALL CANDIDATE VOTES", result);
			// return result;
		});
	}
}

module.exports = helpers;