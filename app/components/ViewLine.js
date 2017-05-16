import React from 'react';
import { VictoryVoronoi, VictoryChart, VictoryContainer, VictoryAxis, VictoryTheme, VictoryStack, VictoryPie } from 'victory';

const io = require('socket.io-client');
const socket = io();

var ViewPie = React.createClass ({
	getInitialState: function() {
		return {
			candidatesArray: [],
			votesArray: []
		}
	},

	// Setting up socket io listener
	componentDidMount: function() {
	  // var socket = io.connect('/');
	    socket.on('broadcast', function(voteData) {
	//         console.log('Somebody Voted Yo!', voteData);
	       	// Setting vote Data
	        this.setState({
	        	votesArray: voteData
	        });

	    }.bind(this));
	},

	// Area to stop cyclic updation and max call stack error
	shouldComponentUpdate: function(nextProps, nextState) {
		// console.log(nextProps);
		// console.log(nextState);
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

	getDisplayName: function(fullName) {
		var displayName = "";
		var nameArray = fullName.split(" "); 
		var firstInitial = nameArray[0].split("")[0]; 
		displayName = `${firstInitial}.${nameArray[1]}`;
		return displayName;
	},

	// Render the charts
	render: function() {
		var candidateVotesData = this.state.candidatesArray.map((candidate) => {
	 		return {
	 			"name": candidate.name,
	 			"party": candidate.party,
	 			"votes": this.filterFunction(candidate)
	 		}
	 	});
	 	// console.log(candidateVotesData);
		return (
	        <VictoryChart
			 theme={VictoryTheme.material}
			> 
			</VictoryChart>
	    );
	}
});


module.exports = ViewPie;