import React from 'react';
import helpers from '../utils/helpers.js';

const io = require('socket.io-client');
const socket = io();

var NewsPanel = React.createClass ({
	getInitialState: function() {
		return {
			candidatesArray: [],
			votesArray: [],
			order: [],
			latestData: []
		}
	},

	// Setting up socket io listener
	componentDidMount: function() {
	  // var socket = io.connect('/');
	    socket.on('broadcast', function(voteData) {
	//         console.log('Somebody Voted Yo!', voteData);
			var orderedVoteData = voteData.sort((a,b) => b.VoteCount -a.VoteCount);
			var order = orderedVoteData.map((data) => data.CandidateId);
	       	// Setting vote Data
	        this.setState({
	        	votesArray: orderedVoteData,
	        	order: order
	        });

	    }.bind(this));

		// Scrape latest news for all candidates and store as state
		var newsArray = [];
		helpers.getLatestNews(this.props.candidatesArray, newsArray);
	},

	// Area to stop cyclic updation and max call stack error
	shouldComponentUpdate: function(nextProps, nextState) {
		// console.log(nextProps);
		// console.log(nextState);
		return true;
	},


	areArraysEqual: function(one, two) {
		for(var i=0; i<one.length; i++) {
			if(one[i] !== two[i]) {
				return false;
			}
		}
		return true;
	},

	// Based on emit, update votes for tiles
	componentDidUpdate: function(prevProps, prevState) {
		// console.log(this.props.candidatesArray);
		// console.log(this.state.candidatesArray);
		// Avoiding max call stack error
		if(prevProps !== this.props) {
			var parentArray = this.props.candidatesArray;
			this.setState({
				candidatesArray: parentArray
			});
		} 


		if(!this.areArraysEqual(prevState.order, this.state.order) ) {
			console.log(prevState.order);
			var previousLeader = this.getLeadingCandidate(this.state.candidatesArray, prevState.order);
			console.log(this.state.order);
			console.log("ORDER CHANGED!!!!!!!!!!!!!!");
			// Run query to get scraped data from 'The Onion'
			var leadingCandidate = this.getLeadingCandidate(this.state.candidatesArray, this.state.order);
			if(leadingCandidate !== previousLeader) {
				// Scrape and get latest
				helpers.getLatestOnLeader().then(function(latest) {
					console.log(latest);
				});
			}
			
		}

	// console.log("VictoryTest UPDATED");
	},

	// Filtering votesArray to get only voteCount specific to CandidateId
	filterFunction: function(item) {
		var filteredArray = this.state.votesArray.filter((voteItem) => voteItem.CandidateId === item.id);
		if(!filteredArray.length) {
			return 0;
		}

		return filteredArray[0].VoteCount;
	},

	getLeadingCandidate: function(candidatesArray, order) {
		var leadingCandidateData = candidatesArray.filter((candidate) => candidate.id === order[0]);
		if(leadingCandidateData.length) {
			console.log(leadingCandidateData[0].name);
		}
		return leadingCandidateData[0].name;
	},


	// Render the charts
	render: function() {
	 	// console.log(candidateVotesData);
		return (
	      <h1>View Panel</h1>
	    );
	}
});


module.exports = NewsPanel;