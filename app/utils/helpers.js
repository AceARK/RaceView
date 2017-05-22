/*
* 	All methods used by React components with sequelize query calls - tentative, subject to additions or deletions
*	Candidate model specific - addCandidate, deleteCandidate, getCandidateList
*	Vote model specific - addVoteByUser, getVotesPerCandidate, deleteVotesForCandidate, deleteAllVotes
*	User model specific - addUser, deleteUser, authenticateUser, changePassword 
*/

// Include axios
var axios = require("axios");

// Helper functions to make sequelize queries
var helpers = {

// General helpers
	
	// Get latest news on leading candidate
	getLatestNews: function(candidateName) {
		// console.log("Getting latest news on leading candidate");
		return axios.post("/scrape/latest", candidateName).then(function(response) {
			// console.log("AXIOS LATEST", response);
			return response;
		});
	},

// Candidate specific helpers

	// Get candidate list
	getCandidateList: function() {
		// console.log("Getting candidate list");
		return axios.get("/candidates/all").then(function(result){
      		// console.log("AXIOS GET CANDIDATES RESULTS", result);
      		return result;
    	});
	},

	// Add a candidate
	addCandidate: function(candidateData) {
		console.log("Adding candidate");
		// candidateData - json object with name, photoSrc, and party
		return axios.post("/add/candidate", candidateData).then(function(result) {
			console.log("CANDIDATE ADDED", result);
			return result;
		});
	},

	// Delete a candidate
	deleteCandidate: function(candidateData) {
		console.log("Deleting candidate");
		// candidateData - json object with candidateId
		return axios.delete("/delete/candidate", candidateData).then(function(result) {
			console.log("DELETED CANDIDATE", result);
			// return result;
		});
	},

// User spefic helpers

	// Adding a user
	addUser: function(userData) {
		console.log("Adding user");
		// userData - json object with username, email, password
		return axios.post("/register/user", userData).then(function(result) {
			console.log("ADDING USER", result);
			return result;
		});
	},

	// Delete a user
	deleteUser: function(userData) {
		console.log("Deleting user account");
		// userData - json object with userId
		return axios.delete("/delete/user", userData).then(function(result) {
			console.log("DELETED USER", result);
			// return result;
		});
	},

	// Authenticate user
	authenticateUser: function(userData) {
		console.log("Authenticating user");
		console.log(userData);
		// userData - json object with email and password
		return axios.post("/login", userData).then(function(result) {
			console.log("AUTHENTICATED USER", result);
			return result;
			// return result;
		});
	},

	// Changing user password
	changePassword: function(userData) {
		console.log("Changing user password");
		// TODO: will have user's email and new password
		return axios.post("/change/password", userData).then(function(result) {
			console.log("PASSWORD SUCCESSFULLY CHANGED", result);
			// return result;
		});
	},

// Vote specific helpers

	// Adding user vote
	addVoteByUser: function(voteData) {
		console.log("Adding user vote");
		// voteData - json object with userId and candidateId
		return axios.post("/vote", voteData).then(function(result) {
			console.log("ADDED USER VOTE", result);
			return result;
		});
	},

	// Getting vote for all candidates
	getAllVotes: function() {
		console.log("Getting all votes for all candidate");
		return axios.get("/votes/all").then(function(result) {
			console.log("ALL CANDIDATES VOTES", result);
			return result;
		});
	},

	// Get all votes for a candidate
	getVotesPerCandidate: function(candidateId) {
		console.log("Getting candidate votes for id : " + candidateId);
		// candidateData - json object with candidateId
		return axios.get("/candidate/votes", {params: { ID: candidateId }}).then(function(result) {
			// console.log("CANDIDATE VOTES", result);
			return result;
		});
	},

	// Delete a candidate
	deleteVotesForCandidate: function(candidateData) {
		console.log("Deleting candidate votes");
		// candidateData - json object with candidateId
		return axios.delete("/delete/candidate/votes", candidateData).then(function(result) {
			console.log("DELETED VOTES FOR CANDIDATE", result);
			return result;
		});
	},

	// Delete a candidate
	deleteAllVotes: function() {
		console.log("Deleting all candidate votes");
		return axios.delete("/delete/votes").then(function(result) {
			console.log("DELETED ALL CANDIDATE VOTES", result);
			return result;
		});
	}
}

module.exports = helpers;