import React from 'react';
import { VictoryBar, VictoryChart, VictoryContainer, VictoryAxis, VictoryTheme, VictoryStack, VictoryPie } from 'victory';

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

	componentWillUnmount(){
    	socket.close();
  	},

	// Render the charts
	render: function() {
		var candidateVotesData = this.state.candidatesArray.map((candidate) => {
	 		return {
	 			"party": candidate.party,
	 			"votes": this.filterFunction(candidate)
	 		}
	 	});
	 	// Ingenious method using reduce to convert array above to array of format [{party:votes},{party,votes},...]
	 	var partyObject = candidateVotesData.reduce((obj, item) => {
			if(!obj[item.party]) {
	 			obj[item.party] = 0;
	 		}
	 		obj[item.party] = obj[item.party] + item.votes;
	 		return obj;
	 	},{});
	 	// Setting empty partyArray
	 	var partyArray = [];
	 	// Getting array of keys i.e. all the parties
	 	var keyArray = Object.keys(partyObject);
	 	// Creating an array with data party and votes labeled that way (to display pie)
	 	keyArray.forEach((key) => {
	 		partyArray.push({"party": key, "votes": partyObject[key]});
	 	});
		return (
	        <VictoryPie
				data={partyArray}
				x="party"
				y="votes"
				colorScale={"cool"}
				style={{
					// data: {fill: (d) => d.y > 0 ? "red" : "blue"},
					labels: {fontSize: 18, color: "grey", lineHeight: 10},
					// parent: {border: "1px solid #ccc"}
				}}
				labels={keyArray.map((party) => `${party}
					${partyObject[party]}`)}
				padding={90}
				// labelRadius={300}
				labelPadding={20}
				animate={{duration: 2000, onLoad: {duration: 1000}, onEnter: {duration: 500, before: () => ({y: 0})}}}
			/>
	    );
	}
});


module.exports = ViewPie;