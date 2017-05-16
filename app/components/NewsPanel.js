import React from 'react';

const io = require('socket.io-client');
const socket = io();

var NewsPanel = React.createClass ({
	getInitialState: function() {
		return {
			candidatesArray: [],
			votesArray: [],
			order: []
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
			console.log(this.state.order);
			console.log("ORDER CHANGED!!!!!!!!!!!!!!");
			var newRandom = Math.random()*100;
			// Run query to get scraped data from 'The Onion'
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

	// getDisplayName: function(fullName) {
	// 	var displayName = "";
	// 	var nameArray = fullName.split(" "); 
	// 	var firstInitial = nameArray[0].split("")[0]; 
	// 	displayName = `${firstInitial}.${nameArray[1]}`;
	// 	return displayName;
	// },

	// Render the charts
	render: function() {
		var leadingCandidateData = this.state.candidatesArray.filter((candidate) => candidate.id === this.state.order[0]);
		if(leadingCandidateData.length) {
			console.log(leadingCandidateData[0].id);
		}
		
	 	// console.log(candidateVotesData);
		return (
	      <h1>View Panel</h1>
	    );
	}
});


module.exports = NewsPanel;